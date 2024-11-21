const numero = prompt('Digite um número:');
const numeroTitulo = document.getElementById('numero-titulo');
const texto = document.getElementById('texto');

numeroTitulo.innerHTML = numero;

texto.innerHTML += `<p>Raiz quadrada: ${numero ** 0.5}.</p>
<p>${numero} é inteiro: ${Number.isInteger(Number(numero))}.</p>
<p>Arredondando para baixo: ${Math.floor(Number(numero))}.</p>
<p>Arredondando para cima: ${Math.ceil(Number(numero))}.</p>
<p>Com duas casas decimais: ${Number(numero).toFixed(2)}.</p>
`;
