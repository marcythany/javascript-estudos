const ePaisagem = (largura, altura) => {
	if (largura > altura)
		return true; // Caso a largura seja maior que a altura (paisagem)
	else return false; // Caso a largura seja igual ou menor que a altura (não é paisagem)
};

console.log(ePaisagem(1080, 1080));
console.log(ePaisagem(1920, 1080));
console.log(ePaisagem(720, 1080));
