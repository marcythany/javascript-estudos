class ValidaFormulario {
	constructor() {
		this.formulario = document.querySelector('.formulario');
		this.eventos();
	}

	// Definir eventos do formulário
	eventos() {
		this.formulario.addEventListener('submit', (e) => this.handleSubmit(e));
	}

	// Submissão do formulário com validação
	handleSubmit(e) {
		e.preventDefault();
		const camposValidos = this.isValid();
		const senhasValidas = this.isValidSenhas();

		// Submeter formulário se tudo estiver válido
		if (camposValidos && senhasValidas) {
			this.formulario.submit();
		}
	}

	// Validação dos campos de senha
	isValidSenhas() {
		const senha = this.formulario.querySelector('.senha');
		const repetirSenha = this.formulario.querySelector('.repetir-senha');
		let valid = true;

		// Verificar se as senhas são iguais
		if (senha.value !== repetirSenha.value) {
			valid = this.addSenhaError(senha, repetirSenha);
		}

		// Verificar o comprimento das senhas
		if (!this.isSenhaLengthValid(senha)) {
			valid = false;
		}

		return valid;
	}

	// Validar o comprimento da senha
	isSenhaLengthValid(senha) {
		const valid = senha.value.length >= 6 && senha.value.length <= 12;
		if (!valid) {
			this.createError(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
		}
		return valid;
	}

	// Adicionar erro de senha se não coincidem
	addSenhaError(senha, repetirSenha) {
		this.createError(
			senha,
			'Campos senha e repetir senha precisam ser iguais.'
		);
		this.createError(
			repetirSenha,
			'Campos senha e repetir senha precisam ser iguais.'
		);
		return false;
	}

	// Validação dos campos de formulário
	isValid() {
		let valid = true;

		// Remover mensagens de erro anteriores
		this.clearErrors();

		// Verificar cada campo
		this.formulario.querySelectorAll('.validar').forEach((campo) => {
			const label = campo.previousElementSibling.textContent;

			if (!campo.value) {
				this.createError(
					campo,
					`Campo <strong>${label}</strong> não pode estar em branco.`
				);
				valid = false;
			}

			if (campo.classList.contains('cpf') && !this.validaCPF(campo)) {
				valid = false;
			}

			if (campo.classList.contains('usuario') && !this.validaUsuario(campo)) {
				valid = false;
			}
		});

		return valid;
	}

	// Validação de CPF
	validaCPF(campo) {
		const cpf = new ValidadorCpf(campo.value);
		const valid = cpf.validar() === 'CPF válido!';
		if (!valid) {
			this.createError(campo, 'CPF Inválido');
		}
		return valid;
	}

	// Validação do nome de usuário
	validaUsuario(campo) {
		const usuario = campo.value;
		let valid = true;

		if (usuario.length < 3 || usuario.length > 12) {
			this.createError(
				campo,
				'Nome de usuário precisa ter de 3 a 12 caracteres'
			);
			valid = false;
		}

		if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
			this.createError(
				campo,
				'Nome de usuário precisa conter apenas letras ou números'
			);
			valid = false;
		}

		return valid;
	}

	// Limpar erros do formulário
	clearErrors() {
		this.formulario
			.querySelectorAll('.error-text')
			.forEach((errorText) => errorText.remove());
	}

	// Criar e exibir mensagens de erro
	createError(campo, msg) {
		const div = document.createElement('div');
		div.innerHTML = msg;
		div.classList.add('error-text');
		campo.insertAdjacentElement('afterend', div);
	}
}

const valida = new ValidaFormulario();
