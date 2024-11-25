class ValidadorCpf {
	// Construtor para inicializar o CPF
	constructor(cpf) {
		this.cpf = cpf;
		this.cpfLimpo = this.limparCpf(cpf);
	}

	// Método para limpar os caracteres não numéricos do CPF
	limparCpf(cpf) {
		return cpf.replace(/\D+/g, '');
	}

	// Método genérico para calcular um dígito verificador
	calcularDigito(cpfParcial, pesoInicial) {
		const soma = [...cpfParcial].reduce((acumulador, digito, index) => {
			return acumulador + parseInt(digito) * (pesoInicial - index);
		}, 0);

		const resto = soma % 11;
		return resto < 2 ? 0 : 11 - resto;
	}

	// Método para validar o CPF
	validar() {
		try {
			// Verifica se o CPF tem exatamente 11 dígitos
			if (this.cpfLimpo.length !== 11)
				throw new Error('CPF deve ter 11 dígitos.');

			// Calcula o primeiro dígito verificador
			const primeiroDigito = this.calcularDigito(this.cpfLimpo.slice(0, 9), 10);

			// Calcula o segundo dígito verificador
			const segundoDigito = this.calcularDigito(
				this.cpfLimpo.slice(0, 9) + primeiroDigito,
				11
			);

			// Verifica se os dígitos calculados são iguais aos fornecidos no CPF
			const cpfValido =
				primeiroDigito === parseInt(this.cpfLimpo.charAt(9)) &&
				segundoDigito === parseInt(this.cpfLimpo.charAt(10));

			return cpfValido ? 'CPF válido!' : 'CPF inválido.';
		} catch (error) {
			return `Erro na validação do CPF: ${error.message}`;
		}
	}
}

// Testando a classe ValidadorCpf
//const cpfTeste = '670.348.343-42';
