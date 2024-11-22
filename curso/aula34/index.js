function formulario() {
	const form = document.querySelector('#formulario');
	const resultado = document.querySelector('.resultado');

	const dados = [];

	function recebeEventoForm(evento) {
		evento.preventDefault();

		const nome = form.querySelector('.nome');
		const sobrenome = form.querySelector('.sobrenome');
		const peso = form.querySelector('.peso');
		const altura = form.querySelector('.altura');

		dados.push({
			nome,
			sobrenome,
			peso,
			altura,
		});

		resultado.innerHTML += `<p>${nome.value}</p> <p>${sobrenome.value}</p> <p>${peso.value} quilos</p> <p>${altura.value}m</p>`;
	}
	form.addEventListener('submit', recebeEventoForm);
}
formulario();
