const API_KEY = '79c5c0032c0ab4ad9bd050236eb930c8';

// Função para exibir/ocultar o estado de carregamento
const exibirLoading = (exibir) => {
	document.querySelector('.loading-overlay').style.display = exibir
		? 'flex'
		: 'none';
};

// Função para fazer requisições com controle de taxa
const fazerRequisicaoComDelay = async (url, elementoDom, tipoCaminho) => {
	const tempoLimite = 1000 / 50; // 50 requisições por segundo
	const tempoAgora = Date.now();
	let tempoUltimaRequisicao = 0;
	const tempoRestante = tempoUltimaRequisicao + tempoLimite - tempoAgora;

	if (tempoRestante > 0)
		await new Promise((resolve) => setTimeout(resolve, tempoRestante));

	tempoUltimaRequisicao = Date.now();
	exibirLoading(true);

	try {
		await buscarFilmes(url, elementoDom, tipoCaminho);
	} catch (erro) {
		console.error('Erro ao buscar filmes:', erro);
	} finally {
		exibirLoading(false);
	}
};

// Função para inicializar a página
window.onload = () => {
	carregarOriginaisNetflix();
	carregarTendencias();
	carregarMelhoresAvaliados();
	carregarDestaqueInicial();
};

// Função para buscar filme destacado na página inicial
const carregarDestaqueInicial = async () => {
	const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=pt-BR`;

	try {
		const dados = await fetch(url).then((res) => res.json());
		const filmeDestaque = dados.results[0];
		const secaoDestaque = document.querySelector('.featured');

		if (filmeDestaque) {
			secaoDestaque.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${filmeDestaque.backdrop_path}')`;

			secaoDestaque.querySelector('h2').textContent =
				filmeDestaque.name || filmeDestaque.title;
			secaoDestaque.querySelector('.featured__description').textContent =
				filmeDestaque.overview;
		}
	} catch (erro) {
		console.error('Erro ao carregar destaque:', erro);
	}
};

// Função auxiliar para buscar filmes dinamicamente
const buscarFilmes = async (url, elementoDom, tipoCaminho) => {
	try {
		const dados = await fetch(url).then((res) => res.json());
		exibirFilmes(dados.results, elementoDom, tipoCaminho);
	} catch (erro) {
		console.error('Erro ao buscar filmes:', erro);
	}
};

// Função para exibir filmes no DOM
const exibirFilmes = (filmes, elementoDom, tipoCaminho) => {
	const container = document.querySelector(elementoDom);
	container.innerHTML = ''; // Limpar conteúdo existente

	filmes.forEach((filme) => {
		const {
			id,
			title,
			name,
			poster_path,
			backdrop_path,
			production_companies,
		} = filme;

		// Verificar se production_companies existe e é um array
		const isNetflixOriginal =
			Array.isArray(production_companies) &&
			production_companies.some((company) => company.id === 213);

		// Verificar se existe poster_path ou backdrop_path
		const caminhoDaImagem =
			tipoCaminho === 'poster'
				? poster_path
					? `https://image.tmdb.org/t/p/w500${poster_path}`
					: ''
				: backdrop_path
				? `https://image.tmdb.org/t/p/w500${backdrop_path}`
				: '';

		if (!caminhoDaImagem) {
			console.warn(`Imagem não encontrada para o filme: ${title || name}`);
			return;
		}

		const containerCartaz = document.createElement('div');
		containerCartaz.classList.add('movie-poster-container');

		const elementoImagem = document.createElement('img');
		elementoImagem.setAttribute('data-id', id);
		elementoImagem.classList.add('movie-poster');
		elementoImagem.src = caminhoDaImagem;
		elementoImagem.alt = title || name;

		// Adiciona o título se não for um Original Netflix
		if (!isNetflixOriginal) {
			const tituloFilme = document.createElement('div');
			tituloFilme.classList.add('movie-title');
			tituloFilme.textContent = title || name;
			containerCartaz.appendChild(tituloFilme);
		}

		containerCartaz.appendChild(elementoImagem);
		container.appendChild(containerCartaz);

		// Tratamento de evento de clique
		elementoImagem.addEventListener('click', () =>
			tratarSelecaoFilme(id, title || name)
		);
	});
};

// Função para buscar Originais Netflix
const carregarOriginaisNetflix = () => {
	const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213&language=pt-BR`;
	fazerRequisicaoComDelay(url, '.original__movies', 'poster');
};

// Função para buscar Filmes em Tendência
const carregarTendencias = () => {
	const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
	fazerRequisicaoComDelay(url, '#trending', 'backdrop');
};

// Função para buscar Filmes Mais Bem Avaliados
const carregarMelhoresAvaliados = () => {
	const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR`;
	fazerRequisicaoComDelay(url, '#top_rated', 'backdrop');
};

// Função para tratar seleção de filme
const tratarSelecaoFilme = async (idFilme, nomeFilme) => {
	const trailers = await buscarTrailerFilme(idFilme);
	const iframe = document.getElementById('movieTrailer');
	const mensagemNaoEncontrado = document.querySelector('.movieNotFound');
	const tituloModal = document.getElementById('exampleModalLongTitle');

	tituloModal.textContent = nomeFilme;

	if (trailers.length > 0) {
		const chaveTrailer = trailers[0].key;
		iframe.src = `https://www.youtube.com/embed/${chaveTrailer}`;
		iframe.classList.remove('d-none');
		mensagemNaoEncontrado.classList.add('d-none');
	} else {
		iframe.classList.add('d-none');
		mensagemNaoEncontrado.classList.remove('d-none');
	}

	openModal();
};

// Função para abrir o modal
const openModal = () => {
	document.getElementById('trailerModal').style.display = 'block';
};

// Função para fechar o modal
const closeModal = () => {
	document.getElementById('trailerModal').style.display = 'none';
};
