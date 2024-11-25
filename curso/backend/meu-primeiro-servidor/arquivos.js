// Importa o módulo 'fs' usando sintaxe moderna
import { writeFile, readFile, unlink } from 'fs/promises';

async function criarArquivo() {
	try {
		// Cria e escreve no arquivo 'mensagem.txt'
		await writeFile('mensagem.txt', 'Olá! Este é o conteúdo do arquivo ');
		console.log('Arquivo criado e conteúdo escrito com sucesso!');
	} catch (erro) {
		console.error('Erro ao criar arquivo', erro);
	}
}

criarArquivo();

async function lerArquivo() {
	try {
		const conteudo = await readFile('mensagem.txt', 'utf8');
		console.log('Conteúdo do arquivo:', conteudo);
	} catch (erro) {
		console.error('Erro ao ler o arquivo:', erro);
	}
}

lerArquivo();

async function deletarArquivo() {
	try {
		await unlink('mensagem.txt');
		console.log('Arquivo deletado com sucesso!');
	} catch (erro) {
		console.erro('Erro ao deletar o arquivo:', erro);
	}
}

deletarArquivo();
