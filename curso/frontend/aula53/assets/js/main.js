const elementos = [
	{ tag: 'p', texto: 'Frase 1' },
	{ tag: 'div', texto: 'Frase 2' },
	{ tag: 'section', texto: 'Frase 4' },
	{ tag: 'footer', texto: 'Frase 3' },
];

const container = document.querySelector('.container');
const div = document.createElement('div');

for (let i = 0; i < elementos.length; i++) {
	let { tag, texto } = elementos[i];
	let tagCriada = document.createElement(tag);
	tagCriada.textContent = texto;
	div.appendChild(tagCriada);
}
container.appendChild(div);
