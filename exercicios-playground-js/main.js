//1. Par ou Ímpar
function verificarNumero(numero) {
	if (numero % 2 === 0) {
		return 'par';
	} else {
		return 'ímpar';
	}
}

console.log(verificarNumero(3));

//2. Reverter uma String
function inverterString() {
	let palavra = 'Javascript'; // String original
	let invertida = ''; // Nova string onde armazenar os caracteres invertidos

	// Percorrer a string de trás para frente
	for (let char of [...palavra].reverse()) {
		invertida += char; // Adiciona o caractere atual
	}
	return invertida; // Retorna a string invertida
}

function inverterStringAlternativa() {
	let palavraAlt = 'Javascript'; // String original
	let invertidaAlt = palavraAlt.split('').reverse().join(''); // Inverte a string
	return invertidaAlt;
}

// Exibe os resultados das duas funções
console.log('Manual:', inverterString());
console.log('Alternativa:', inverterStringAlternativa());

//3. Fatorial de um Número
function fatorial(n) {
	if (n < 0) {
		return 'Fatorial não é definido para números negativos';
	}

	let resultado = 1; // Inicializa com 1, pois é o elemento neutro da multiplicação

	for (let i = 1; i <= n; i++) {
		resultado *= i; // Multiplica o resultado pelo número atual
	}

	return resultado; // Retorna o fatorial
}

// Testando a função
console.log(fatorial(5));
console.log(fatorial(0));
console.log(fatorial(-3));
