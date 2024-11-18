// Configurações da API
const CONFIG = {
	API_KEY: '9f99f95582004ac286580703241811',
	BASE_URL: 'https://api.weatherapi.com/v1',
	LANG: 'pt',
	DAYS: 5,
	DEFAULT_CITY: 'São Paulo',
};

// Classe para gerenciar elementos do DOM
class DOMElements {
	constructor() {
		this.elements = {
			currentLocation: document.getElementById('current-location'),
			currentDescription: document.getElementById('current-description'),
			currentTemperature: document.getElementById('current-temperature'),
			forecastContainer: document.getElementById('forecast-container'),
			errorMessage: document.getElementById('error-message'),
			currentTime: document.getElementById('current-time'),
			sunriseTime: document.getElementById('sunrise-time'),
			sunsetTime: document.getElementById('sunset-time'),
			sunriseRelativeTime: document.getElementById('sunrise-relative-time'),
			sunsetRelativeTime: document.getElementById('sunset-relative-time'),
			weatherIcon: document.getElementById('weather-icon'),
			searchButton: document.getElementById('search-button'),
			cityInput: document.getElementById('city-input'),
		};

		// Valida se todos os elementos existem
		this.validateElements();
	}

	validateElements() {
		for (const [key, element] of Object.entries(this.elements)) {
			if (!element) {
				throw new Error(`Elemento ${key} não encontrado no DOM`);
			}
		}
	}

	get(elementName) {
		return this.elements[elementName];
	}
}

// Classe para gerenciar a API do tempo
class WeatherAPI {
	constructor(config) {
		this.config = config;
	}

	// Monta a URL da API com os parâmetros necessários
	buildURL(params) {
		const url = new URL(`${this.config.BASE_URL}/forecast.json`);
		const defaultParams = {
			key: this.config.API_KEY,
			days: this.config.DAYS,
			lang: this.config.LANG,
			...params,
		};

		Object.entries(defaultParams).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});

		return url.toString();
	}

	// Busca dados do tempo por cidade
	async getWeatherByCity(city) {
		const encodedCity = encodeURIComponent(city);
		const url = this.buildURL({ q: encodedCity });

		return this.fetchWeatherData(url);
	}

	// Busca dados do tempo por coordenadas
	async getWeatherByCoordinates(lat, lon) {
		const coordinates = `${lat},${lon}`;
		const url = this.buildURL({ q: coordinates });

		return this.fetchWeatherData(url);
	}

	// Método genérico para fazer requisições à API
	async fetchWeatherData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.error) {
				throw new Error(data.error.message);
			}

			return data;
		} catch (error) {
			throw new Error(`Erro ao buscar dados do tempo: ${error.message}`);
		}
	}
}

// Classe para formatar datas e horários
class DateFormatter {
	static convertAPITimeToDate(timeStr) {
		const today = new Date();
		const [time, period] = timeStr.split(' ');
		const [hours, minutes] = time.split(':');

		let hour = parseInt(hours);
		const minute = parseInt(minutes);

		if (period === 'PM' && hour !== 12) {
			hour += 12;
		} else if (period === 'AM' && hour === 12) {
			hour = 0;
		}

		return new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			hour,
			minute
		);
	}

	static formatRelativeTime(time) {
		const now = new Date();
		const diff = time - now;
		const diffInMinutes = Math.round(diff / 60000);

		if (Math.abs(diffInMinutes) < 1) return 'Agora';

		if (diffInMinutes < 0) {
			if (diffInMinutes > -60) {
				return `${Math.abs(diffInMinutes)} minutos atrás`;
			}
			const hours = Math.abs(Math.floor(diffInMinutes / 60));
			return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
		}

		if (diffInMinutes < 60) {
			return `Em ${diffInMinutes} minutos`;
		}
		const hours = Math.floor(diffInMinutes / 60);
		return `Em ${hours} hora${hours > 1 ? 's' : ''}`;
	}

	static formatToLocalTime(date) {
		return date.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	static formatForecastDate(date) {
		return new Date(date).toLocaleDateString('pt-BR', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
		});
	}
}

// Classe principal do aplicativo
class WeatherApp {
	constructor() {
		this.dom = new DOMElements();
		this.api = new WeatherAPI(CONFIG);
		this.setupEventListeners();
	}

	setupEventListeners() {
		this.dom
			.get('searchButton')
			.addEventListener('click', () => this.handleSearch());
		this.dom.get('cityInput').addEventListener('keypress', (e) => {
			if (e.key === 'Enter') this.handleSearch();
		});

		// Adiciona debounce na busca para evitar muitas requisições
		this.dom.get('cityInput').addEventListener(
			'input',
			this.debounce(() => {
				const city = this.dom.get('cityInput').value.trim();
				if (city.length > 2) this.handleSearch();
			}, 500)
		);
	}

	// Método para evitar múltiplas chamadas em sequência
	debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	async handleSearch() {
		const city = this.dom.get('cityInput').value.trim();
		if (!city) {
			this.showError('Por favor, insira o nome de uma cidade.');
			return;
		}

		try {
			const data = await this.api.getWeatherByCity(city);
			this.updateUI(data);
		} catch (error) {
			this.showError(error.message);
		}
	}

	async getUserLocation() {
		if (!('geolocation' in navigator)) {
			console.warn('Geolocalização não suportada');
			this.fallbackToDefaultCity();
			return;
		}

		try {
			const position = await this.getCurrentPosition();
			const data = await this.api.getWeatherByCoordinates(
				position.coords.latitude,
				position.coords.longitude
			);
			this.updateUI(data);
		} catch (error) {
			console.warn('Erro na geolocalização:', error);
			this.fallbackToDefaultCity();
		}
	}

	getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			});
		});
	}

	async fallbackToDefaultCity() {
		try {
			const data = await this.api.getWeatherByCity(CONFIG.DEFAULT_CITY);
			this.updateUI(data);
		} catch (error) {
			this.showError(`Erro ao carregar cidade padrão: ${error.message}`);
		}
	}

	updateUI(data) {
		this.updateCurrentWeather(data);
		this.updateForecast(data);
		this.updateSunStages(data);
		this.updateTime();
	}

	updateCurrentWeather(data) {
		const { location, current } = data;
		this.dom.get(
			'currentLocation'
		).textContent = `${location.name}, ${location.country}`;
		this.dom.get('currentDescription').textContent = current.condition.text;
		this.dom.get('currentTemperature').textContent = `${current.temp_c}°C`;
		this.dom.get('weatherIcon').src = current.condition.icon;
		this.dom.get('weatherIcon').alt = current.condition.text;
	}

	updateForecast(data) {
		const container = this.dom.get('forecastContainer');
		container.innerHTML = '';

		data.forecast.forecastday.forEach((day) => {
			const forecastCard = this.createForecastCard(day);
			container.appendChild(forecastCard);
		});
	}

	createForecastCard(day) {
		const card = document.createElement('div');
		card.className = 'forecast-day';
		card.innerHTML = `
          <p>${DateFormatter.formatForecastDate(day.date)}</p>
          <p>${day.day.condition.text}</p>
          <p>${day.day.avgtemp_c.toFixed(1)}°C</p>
      `;
		return card;
	}

	updateSunStages(data) {
		const { sunrise, sunset } = data.forecast.forecastday[0].astro;

		const sunriseDate = DateFormatter.convertAPITimeToDate(sunrise);
		const sunsetDate = DateFormatter.convertAPITimeToDate(sunset);

		this.dom.get('sunriseTime').textContent =
			DateFormatter.formatToLocalTime(sunriseDate);
		this.dom.get('sunsetTime').textContent =
			DateFormatter.formatToLocalTime(sunsetDate);

		this.dom.get(
			'sunriseRelativeTime'
		).textContent = `Em relação ao horário atual: ${DateFormatter.formatRelativeTime(
			sunriseDate
		)}`;
		this.dom.get(
			'sunsetRelativeTime'
		).textContent = `Em relação ao horário atual: ${DateFormatter.formatRelativeTime(
			sunsetDate
		)}`;
	}

	updateTime() {
		const currentDate = new Date();
		this.dom.get(
			'currentTime'
		).textContent = `Hora Local: ${DateFormatter.formatToLocalTime(
			currentDate
		)}`;
	}

	showError(message) {
		const errorElement = this.dom.get('errorMessage');
		errorElement.textContent = `Erro: ${message}`;
		errorElement.style.color = 'red';

		// Remove a mensagem de erro após 5 segundos
		setTimeout(() => {
			errorElement.textContent = '';
		}, 5000);
	}
}

// Inicializa o aplicativo
document.addEventListener('DOMContentLoaded', () => {
	try {
		const app = new WeatherApp();
		app.getUserLocation();
	} catch (error) {
		console.error('Erro ao inicializar o aplicativo:', error);
	}
});
