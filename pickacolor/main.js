const cores = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'];
const btn = document.getElementById('btn');
const cor = document.querySelector('.color');

btn.addEventListener('click', () => {
	const randomColor = getRandomColor();
	document.body.style.background = cores[randomColor];
	cor.textContent = cores[randomColor];
});

function getRandomColor() {
	return Math.floor(Math.random() * cores.length);
}
