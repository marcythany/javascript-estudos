// Função factory que cria a calculadora
const criaCalculadora = () => {
	// Cache do seletor DOM
	const display = document.querySelector('.tela');

	// Set de operadores válidos para validação
	const operadoresValidos = new Set(['+', '-', '*', '/', '(', ')']);

	return {
		display,

		inicia() {
			this.cliqueBotoes();
			this.teclaEnter();
			this.restringeTeclas(); // Adiciona a restrição de teclas
		},

		cliqueBotoes() {
			// Usando delegação de eventos de forma otimizada
			document.addEventListener('click', (e) => {
				const el = e.target;

				// Map de ações para cada tipo de botão
				const acoes = {
					'btn-num': () => this.atualizaDisplay(el),
					'btn-operacao': () => this.adicionaOperacao(el),
					'btn-clear': () => this.limparDisplay(),
					'btn-del': () => this.removerUltimoCaractere(),
					'btn-eq': () => this.executarCalculo(),
					'btn-paren': () => this.atualizaDisplay(el),
				};

				// Executa a ação correspondente se existir
				Object.entries(acoes).forEach(([classe, acao]) => {
					if (el.classList.contains(classe)) acao();
				});
			});
		},

		teclaEnter() {
			const handleEnter = (e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					if (e.type === 'keydown') this.executarCalculo();
				}
			};

			// Consolidado em uma única função handler
			this.display.addEventListener('keydown', handleEnter);
			this.display.addEventListener('keyup', handleEnter);
		},

		restringeTeclas() {
			this.display.addEventListener('keypress', (e) => {
				const char = e.key;

				// Permite apenas números, operadores válidos e alguns controles como backspace
				const permitido =
					/\d/.test(char) || // verifica se é um dígito
					operadoresValidos.has(char) || // verifica se é um operador válido
					char === '.' || // permite ponto decimal
					char === 'Backspace'; // permite backspace

				if (!permitido) {
					e.preventDefault(); // Bloqueia a tecla se não for permitida
				}
			});
		},

		atualizaDisplay(el) {
			const valor = el.textContent.trim();
			if (valor) this.display.value += valor;
		},

		adicionaOperacao(el) {
			const operador = el.textContent.trim();
			if (operadoresValidos.has(operador)) {
				this.display.value += ` ${operador} `;
			}
		},

		limparDisplay() {
			this.display.value = '';
		},

		removerUltimoCaractere() {
			this.display.value = this.display.value.slice(0, -1);
		},

		executarCalculo() {
			try {
				// Sanitização básica da expressão
				const expressao = this.display.value.replace(/[^0-9+\-*/() \.]/g, '');
				const resultado = new Function('return ' + expressao)();

				this.display.value = Number.isFinite(resultado) ? resultado : 'Erro';
			} catch (e) {
				this.display.value = 'Erro';
			}
		},
	};
};

// Inicialização
const calculadora = criaCalculadora();
calculadora.inicia();
