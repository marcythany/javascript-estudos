function calcularIMC() {
	// Seleciona o formulário e o elemento onde será mostrado o resultado
	const form = document.querySelector('.form');
	const resultado = document.querySelector('.resultado');

	// Função que será chamada quando o formulário for submetido
	function recebeEventoForm(event) {
		event.preventDefault(); // Evita o envio padrão do formulário

		// Pega os valores do formulário após o evento de submit
		const peso = parseFloat(form.querySelector('.peso').value);
		const altura = parseFloat(form.querySelector('.altura').value);

		// Verifica se os valores inseridos são válidos
		if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
			resultado.textContent = 'Por favor, insira valores válidos.';
			resultado.style.backgroundColor = ''; // Remove qualquer cor de fundo
			return;
		}

		// Calcula o IMC após receber os valores do formulário
		const imc = (peso / altura ** 2).toFixed(2);

		// Determina a mensagem apropriada com base no IMC calculado
		const { mensagem, cor } = obterMensagemECorIMC(imc);

		// Exibe o resultado na página e altera a cor de fundo
		resultado.textContent = `${imc} - ${mensagem}`;
		resultado.style.backgroundColor = cor; // Define a cor de fundo
	}

	// Função para determinar a mensagem e a cor de fundo de acordo com o IMC
	function obterMensagemECorIMC(imc) {
		if (imc < 18.5)
			return { mensagem: 'Você está abaixo do peso.', cor: 'lightblue' };
		if (imc < 25)
			return {
				mensagem: 'Parabéns, você está no peso ideal!',
				cor: 'lightgreen',
			};
		if (imc < 30)
			return { mensagem: 'Você está com sobrepeso.', cor: 'yellow' };
		if (imc < 35)
			return { mensagem: 'Você está com obesidade grau 1.', cor: 'orange' };
		if (imc < 40)
			return { mensagem: 'Você está com obesidade grau 2.', cor: 'darkorange' };
		return { mensagem: 'Você está com obesidade grau 3.', cor: 'red' };
	}

	// Adiciona o evento de submit ao formulário
	form.addEventListener('submit', recebeEventoForm);
}

// Inicializa a função de cálculo do IMC
calcularIMC();
