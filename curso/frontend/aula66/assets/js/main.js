const contador = () => {
	// Seleção dos elementos HTML
	const relogio = document.querySelector('.relogio');
	const iniciar = document.querySelector('.iniciar');
	const pausar = document.querySelector('.pausar');
	const reiniciar = document.querySelector('.reiniciar');

	// Variáveis de controle do relógio
	let segundos = 0;
	let timer = null;
	let pausado = false; // Estado que indica se o relógio está pausado ou não

	// Função para formatar o tempo em 'hh:mm:ss' a partir de segundos
	const formatarTempo = (segundos) => {
		const data = new Date(segundos * 1000); // Converte segundos para milissegundos
		return data.toISOString().slice(11, 19); // Extrai a parte do tempo no formato 'hh:mm:ss'
	};

	// Função para atualizar o relógio na tela
	const atualizarRelogio = () => {
		relogio.textContent = formatarTempo(segundos); // Atualiza o conteúdo do relógio com o tempo formatado
	};

	// Função para alternar a classe 'pausar-numeros' no relógio, dependendo do estado de pausa
	const alternarClassePausa = () => {
		// Se estiver pausado, adiciona a classe, caso contrário, remove
		pausado
			? relogio.classList.add('pausar-numeros')
			: relogio.classList.remove('pausar-numeros');
	};

	// Função para definir o intervalo de contagem
	const definirIntervalo = () => {
		if (!timer) {
			// Só cria um novo intervalo se o timer não estiver ativo
			timer = setInterval(() => {
				segundos++; // Incrementa os segundos a cada 1 segundo
				atualizarRelogio(); // Atualiza o relógio na tela com o novo tempo
			}, 1000); // Intervalo de 1 segundo
		}
	};

	// Função para iniciar o relógio
	const iniciarRelogio = () => {
		if (pausado) {
			// Se estava pausado, retoma a contagem
			pausado = false;
			alternarClassePausa(); // Atualiza a classe do relógio para refletir o estado atual
		}
		definirIntervalo(); // Inicia o intervalo de contagem de segundos
	};

	// Função para pausar o relógio
	const pausarRelogio = () => {
		clearInterval(timer); // Limpa o intervalo atual
		timer = null; // Reseta o timer
		pausado = true; // Marca que o relógio foi pausado
		alternarClassePausa(); // Atualiza a classe do relógio para indicar que está pausado
	};

	// Função para reiniciar o relógio
	const reiniciarRelogio = () => {
		clearInterval(timer); // Para o contador
		timer = null; // Reseta o timer
		segundos = 0; // Reseta os segundos
		pausado = false; // Reseta o estado de pausa
		alternarClassePausa(); // Remove a classe de pausa
		atualizarRelogio(); // Atualiza o relógio para mostrar 00:00:00
	};

	// Adicionando os event listeners aos botões
	iniciar.addEventListener('click', iniciarRelogio); // Inicia o relógio quando o botão "iniciar" é clicado
	pausar.addEventListener('click', pausarRelogio); // Pausa o relógio quando o botão "pausar" é clicado
	reiniciar.addEventListener('click', reiniciarRelogio); // Reinicia o relógio quando o botão "reiniciar" é clicado
};
contador();
