const nome = 'Marcy';
const sobreNome = 'Sobral';
const idade = 34;
const peso = 210;
const alturaEmM = 1.8;
let imc;
imc = peso / (alturaEmM * alturaEmM);
let imcFix = Math.round(imc * 100) / 100;

let anoNascimento;
anoNascimento = 2024 - idade;

console.log(imcFix, anoNascimento);
