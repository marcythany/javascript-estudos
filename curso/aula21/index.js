let num1 = prompt('Digite um número:');
let num2 = prompt('Digite um número:');

num1 = Number(num1);
num2 = Number(num2);

const resultado = num1 + num2;
document.getElementById('resultado').innerHTML = resultado.toString();
console.log('O resultado é ' + resultado);
