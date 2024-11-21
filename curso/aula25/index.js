let nomeDoUsuario = prompt('Digite seu Nome Completo');
let letraParaProcurar = prompt(
	'Digite a letra que deseja procurar no seu nome'
);

function dadosUsuario(nome, letra) {
	// Calcula várias informações sobre o nome
	let comprimento = nome.length;
	let segundaLetra = nome.charAt(1);
	let indicePrimeiraLetra = nome.indexOf(letra);
	let indiceUltimaLetra = nome.lastIndexOf(letra);
	let ultimasTresLetras = nome.slice(-3);
	let palavras = nome.split(' ');
	let maiusculas = nome.toUpperCase();
	let minusculas = nome.toLowerCase();

	// Retorna um objeto com todos os valores calculados
	return {
		comprimento: comprimento,
		segundaLetra: segundaLetra,
		indicePrimeiraLetra: indicePrimeiraLetra,
		indiceUltimaLetra: indiceUltimaLetra,
		ultimasTresLetras: ultimasTresLetras,
		palavras: palavras,
		maiusculas: maiusculas,
		minusculas: minusculas,
	};
}

// Chama a função e armazena o resultado
let dados = dadosUsuario(nomeDoUsuario, letraParaProcurar);

// Monta o HTML usando os dados retornados
document.getElementById('dados-usuario').innerHTML += `
Seu nome é: <strong>${nomeDoUsuario}</strong><br />
Seu nome tem <strong>${dados.comprimento}</strong> letras <br />
A segunda letra do seu nome é: <strong>${dados.segundaLetra}</strong><br />
Qual o primeiro índice da letra <strong>'${letraParaProcurar}'</strong> no seu nome? <strong>${
	dados.indicePrimeiraLetra
}</strong><br />
Qual o último índice da letra <strong>'${letraParaProcurar}'</strong> no seu nome? <strong>${
	dados.indiceUltimaLetra
}</strong><br />
As últimas 3 letras do seu nome são: <strong>${
	dados.ultimasTresLetras
}</strong><br />
As palavras do seu nome são: <strong>${dados.palavras.join(', ')}</strong><br />
Seu nome com letras maiúsculas: <strong>${dados.maiusculas}</strong><br />
Seu nome com letras minúsculas: <strong>${dados.minusculas}</strong><br />
`;
