const limparCpf = (cpf) => cpf.replace(/\D+/g, '');

// Função para calcular um dígito verificador (genérica para primeiro e segundo dígito)
const calcularDigito = (cpfParcial, pesoInicial) => {
	const soma = [...cpfParcial].reduce((acumulador, digito, index) => {
		// Multiplica cada dígito pelo peso adequado e acumula a soma
		return acumulador + parseInt(digito) * (pesoInicial - index);
	}, 0);

	const resto = soma % 11;
	return resto < 2 ? 0 : 11 - resto;
};

// Função principal de validação do CPF
const validarCpf = (cpf) => {
	try {
		const cpfLimpo = limparCpf(cpf);

		// Verifica se o CPF tem exatamente 11 dígitos
		if (cpfLimpo.length !== 11) throw new Error('CPF deve ter 11 dígitos.');

		// Calcula o primeiro dígito verificador
		const primeiroDigito = calcularDigito(cpfLimpo.slice(0, 9), 10);

		// Calcula o segundo dígito verificador
		const segundoDigito = calcularDigito(
			cpfLimpo.slice(0, 9) + primeiroDigito,
			11
		);

		// Verifica se os dígitos calculados são iguais aos fornecidos no CPF
		const cpfValido =
			primeiroDigito === parseInt(cpfLimpo.charAt(9)) &&
			segundoDigito === parseInt(cpfLimpo.charAt(10));

		return cpfValido ? 'CPF válido!' : 'CPF inválido.';
	} catch (error) {
		return `Erro na validação do CPF: ${error.message}`;
	}
};

// Testando a função de validação
const cpfTeste = '670.348.343-42';
console.log(validarCpf(cpfTeste));
