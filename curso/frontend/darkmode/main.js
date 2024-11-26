document.addEventListener('DOMContentLoaded', () => {
	const toggle = document.getElementById('toggle');
	const body = document.documentElement;
	const title = document.querySelector('.title');
	const text = document.querySelector('.text');

	// Define o tema inicial
	const setInitialTheme = () => {
		// Verifica o tema salvo no localStorage
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;

		// Prioriza o tema salvo, depois a preferência do sistema, por fim o tema padrão
		const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
		body.dataset.theme = initialTheme;
		toggle.checked = initialTheme === 'dark';

		updateTitleText();
	};

	// Troca o tema e salva no localStorage
	const toggleTheme = () => {
		const newTheme = toggle.checked ? 'dark' : 'light';
		body.dataset.theme = newTheme;
		localStorage.setItem('theme', newTheme);

		updateTitleText();
	};

	// Atualiza o texto do título e descrição conforme o tema
	const updateTitleText = () => {
		const isDarkMode = body.dataset.theme === 'dark';
		title.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
		text.textContent = isDarkMode ? `I'm Dark Mode` : `I'm Light Mode`;
	};

	// Adiciona o evento de mudança do tema do sistema
	const handleSystemThemeChange = (e) => {
		const prefersDark = e.matches;
		const newTheme = prefersDark ? 'dark' : 'light';
		body.dataset.theme = newTheme;
		toggle.checked = prefersDark;
		localStorage.setItem('theme', newTheme);

		updateTitleText();
	};

	// Configura o tema inicial
	setInitialTheme();

	// Evento de mudança do toggle
	toggle.addEventListener('change', toggleTheme);

	// Evento para monitorar mudança no tema do sistema
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', handleSystemThemeChange);
});
