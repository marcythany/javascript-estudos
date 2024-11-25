// Função assíncrona para fazer requisições HTTP usando fetch
const request = async ({ method, url }) => {
	try {
		const response = await fetch(url, { method });

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.text();
	} catch (error) {
		console.error('Erro na requisição HTTP:', error);
		throw error;
	}
};

// Listener para cliques no documento
document.addEventListener('click', async (event) => {
	const targetElement = event.target;
	const tagName = targetElement.tagName.toLowerCase();

	// Verifica se o elemento clicado é um link
	if (tagName === 'a') {
		event.preventDefault();
		await loadPageContent(targetElement);
	}
});

// Função para carregar a página com o conteúdo da resposta
const loadPageContent = async (element) => {
	const href = element.getAttribute('href');
	const resultContainer = document.querySelector('.resultado');

	try {
		// Adiciona indicador de carregamento
		resultContainer.textContent = 'Carregando...';

		// Faz a requisição GET e obtém a resposta
		const response = await request({ method: 'GET', url: href });

		// Cria um parser de DOM
		const parser = new DOMParser();
		const documentContent = parser.parseFromString(response, 'text/html');

		// Obtém o conteúdo do body
		const bodyContent = documentContent.body?.innerHTML;

		if (bodyContent) {
			resultContainer.innerHTML = bodyContent;
		} else {
			throw new Error('Não foi possível carregar o conteúdo da página');
		}

		// Atualiza a URL no navegador sem recarregar a página
		window.history.pushState({}, '', href);
	} catch (error) {
		console.error('Erro ao carregar a página:', error);
		resultContainer.textContent = 'Erro ao carregar o conteúdo';
	}
};
