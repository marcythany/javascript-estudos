const inputTarefa = document.querySelector('.input-tarefa');
const btn = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// Função para criar o botão de apagar dentro do span
const criaBotaoApagar = (span) => {
	const botaoApagar = document.createElement('button');
	botaoApagar.textContent = 'Apagar';
	botaoApagar.classList.add('btn-apagar');

	// Remove a tarefa ao clicar no botão
	botaoApagar.addEventListener('click', () => {
		span.parentElement.remove();
		gravarTarefas(); // Atualiza a lista de tarefas gravadas após remover
	});

	span.appendChild(botaoApagar);
};

// Função para criar uma nova tarefa
const criaTarefa = (texto) => {
	const li = document.createElement('li');

	// Cria o span que conterá o texto e o botão
	const span = document.createElement('span');
	span.classList.add('conteudo-tarefa');
	span.textContent = texto + ' ';

	// Adiciona o botão de apagar dentro do span
	criaBotaoApagar(span);

	// Adiciona o span ao li e depois adiciona o li à lista de tarefas
	li.appendChild(span);
	tarefas.appendChild(li);
	gravarTarefas(); // Atualiza a lista de tarefas gravadas após adicionar
};

// Função para verificar e criar tarefa, chamada nos eventos
const verificaECriaTarefa = () => {
	const texto = inputTarefa.value.trim();
	if (texto) {
		criaTarefa(texto); // Cria a tarefa com o texto
		inputTarefa.value = ''; // Limpa o campo de input após adicionar a tarefa
		inputTarefa.focus(); // Foca novamente no input
	}
};

// Função para gravar as tarefas no local storage
const gravarTarefas = () => {
	const liTarefas = tarefas.querySelectorAll('li');
	const listaDeTarefas = [];

	for (let tarefa of liTarefas) {
		let spanTexto = tarefa.querySelector('.conteudo-tarefa').textContent.trim();
		let textoTarefa = spanTexto.replace('Apagar', '').trim(); // Remove o texto do botão
		listaDeTarefas.push(textoTarefa);
	}

	// Grava a lista de tarefas no local storage
	localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
};

// Função para carregar tarefas do local storage ao iniciar a página
const carregarTarefas = () => {
	const tarefasGravadas = JSON.parse(localStorage.getItem('tarefas'));
	if (tarefasGravadas) {
		for (let tarefa of tarefasGravadas) {
			criaTarefa(tarefa);
		}
	}
};

// Adiciona o evento para pressionamento da tecla Enter
inputTarefa.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		verificaECriaTarefa();
	}
});

// Adiciona o evento de click no botão
btn.addEventListener('click', verificaECriaTarefa);

// Carrega as tarefas salvas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTarefas);
