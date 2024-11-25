import { appendFile, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import readline from 'readline';

// Configura a interface do terminal para receber entradas do usuário
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Função para exibir o menu
function mostrarMenu() {
	console.log(`
=== To-Do List ===
1. Adicionar uma tarefa
2. Listar todas as tarefas
3. Remover uma tarefa
4. Marcar tarefa como concluída
5. Sair`);
}

// Função para perguntar ao usuário
function perguntar(pergunta) {
	return new Promise((resolve) => {
		rl.question(pergunta, (resposta) => resolve(resposta));
	});
}

// Função genérica para carregar tarefas do arquivo
async function carregarTarefas() {
	if (!existsSync('tarefas.txt')) {
		// Cria o arquivo se não existir
		await writeFile('tarefas.txt', '');
	}

	const conteudo = await readFile('tarefas.txt', 'utf-8');
	return conteudo.split('\n').filter((tarefa) => tarefa.trim() !== '');
}

// Função genérica para salvar tarefas no arquivo
async function salvarTarefas(tarefas) {
	await writeFile('tarefas.txt', tarefas.join('\n'));
}

// Adiciona uma nova tarefa
async function adicionarTarefa(tarefa) {
	await appendFile('tarefas.txt', `[ ] ${tarefa}\n`);
	console.log(`Tarefa "${tarefa}" adicionada com sucesso!`);
}

// Lista todas as tarefas
async function listarTarefas() {
	const tarefas = await carregarTarefas();
	if (tarefas.length === 0) {
		console.log('Nenhuma tarefa encontrada.');
	} else {
		console.log('\nLista de Tarefas:');
		tarefas.forEach((tarefa, index) => {
			console.log(`${index + 1}. ${tarefa}`);
		});
	}
}

// Remove uma tarefa pelo número
async function removerTarefa(numero) {
	const tarefas = await carregarTarefas();

	if (numero < 1 || numero > tarefas.length) {
		console.log('Número de tarefa inválido.');
		return;
	}

	const [tarefaRemovida] = tarefas.splice(numero - 1, 1);
	await salvarTarefas(tarefas);
	console.log(`Tarefa "${tarefaRemovida}" removida com sucesso!`);
}

// Marca uma tarefa como concluída pelo número
async function marcarTarefaConcluida(numero) {
	const tarefas = await carregarTarefas();

	if (numero < 1 || numero > tarefas.length) {
		console.log('Número de tarefa inválido.');
		return;
	}

	const tarefaAtualizada = tarefas[numero - 1].replace('[ ]', '[X]');
	tarefas[numero - 1] = tarefaAtualizada;
	await salvarTarefas(tarefas);
	console.log(`Tarefa "${tarefaAtualizada}" marcada como concluída!`);
}

// Loop principal do menu
async function iniciarMenu() {
	let continuar = true;

	while (continuar) {
		mostrarMenu();
		const opcao = await perguntar('Escolha uma opção: ');

		switch (opcao) {
			case '1': // Adicionar tarefa
				const novaTarefa = await perguntar('Digite a nova tarefa: ');
				await adicionarTarefa(novaTarefa);
				break;

			case '2': // Listar tarefas
				await listarTarefas();
				break;

			case '3': // Remover tarefa
				const numTarefaRemover = parseInt(
					await perguntar('Digite o número da tarefa a remover: '),
					10
				);
				await removerTarefa(numTarefaRemover);
				break;

			case '4': // Marcar tarefa como concluída
				const numTarefaConcluir = parseInt(
					await perguntar(
						'Digite o número da tarefa a marcar como concluída: '
					),
					10
				);
				await marcarTarefaConcluida(numTarefaConcluir);
				break;

			case '5': // Sair
				continuar = false;
				console.log('Saindo do To-Do List...');
				rl.close();
				break;

			default:
				console.log('Opção inválida! Tente novamente.');
		}
	}
}

// Inicia o programa
iniciarMenu();
