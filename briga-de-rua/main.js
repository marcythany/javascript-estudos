// ** Captura de elementos do DOM **
const playButton = document.getElementById('play');
const resultDiv = document.getElementById('result');
const p1NameDiv = document.getElementById('p1Name');
const p2NameDiv = document.getElementById('p2Name');
const p1HealthDiv = document.getElementById('p1Health');
const p2HealthDiv = document.getElementById('p2Health');
const resetButton = document.getElementById('reset');

// Botões dos jogadores
const p1AttackButton = document.getElementById('p1AttackButton');
const p1HealButton = document.getElementById('p1HealButton');
const p2AttackButton = document.getElementById('p2AttackButton');
const p2HealButton = document.getElementById('p2HealButton');

// Áudios
const p1AttackAudio = document.getElementById('p1attack');
const p1HealAudio = document.getElementById('p1heal');
const p2AttackAudio = document.getElementById('p2attack');
const p2HealAudio = document.getElementById('p2heal');
const victoryAudio = document.getElementById('victory');

// ** Função que atualiza o jogo no DOM **
const updateGame = (p1, p2, gameState) => {
	// Atualiza a barra de saúde
	p1HealthDiv.style.width = `${p1.health}%`;
	p1HealthDiv.innerText = p1.health;
	p2HealthDiv.style.width = `${p2.health}%`;
	p2HealthDiv.innerText = p2.health;

	// Verifica se algum jogador perdeu
	if (p1.health <= 0 || p2.health <= 0) {
		gameState.isOver = true;
		resultDiv.innerText = gameState.declareWinner(p1, p2);
		victoryAudio.play(); // Toca som de vitória

		// Desabilita todos os botões de ataque e cura
		p1AttackButton.disabled = true;
		p1HealButton.disabled = true;
		p2AttackButton.disabled = true;
		p2HealButton.disabled = true;
		playButton.disabled = true;
	}
};

// ** Classe Jogador **
class Jogador {
	constructor(nome, saude, danoAtaque) {
		this.nome = nome;
		this.health = saude;
		this.attackDmg = danoAtaque;
	}

	// ** Atacar um inimigo **
	atacar(jogadorAtacante, jogadorAlvo) {
		if (this.gameState.isOver) return; // Evita ataques após o jogo terminar

		const quantidadeDano =
			Math.floor(Math.random() * jogadorAtacante.attackDmg) + 1;
		jogadorAlvo.health = Math.max(0, jogadorAlvo.health - quantidadeDano);

		updateGame(
			this.gameState.jogador1,
			this.gameState.jogador2,
			this.gameState
		);
		return `${jogadorAtacante.nome} ataca ${jogadorAlvo.nome} causando ${quantidadeDano} de dano`;
	}

	// ** Curar o jogador **
	curar(jogador) {
		if (this.gameState.isOver) return; // Evita curas após o jogo terminar

		const quantidadeCura = Math.floor(Math.random() * 5) + 1;
		jogador.health = Math.min(100, jogador.health + quantidadeCura);

		updateGame(
			this.gameState.jogador1,
			this.gameState.jogador2,
			this.gameState
		);
		return `${jogador.nome} cura ${quantidadeCura} de HP`;
	}
}

// ** Classe Jogo **
class Jogo {
	constructor(jogador1, jogador2) {
		this.isOver = false;
		this.jogador1 = jogador1;
		this.jogador2 = jogador2;

		// Adiciona referência do gameState em cada jogador
		this.jogador1.gameState = this;
		this.jogador2.gameState = this;
	}

	// ** Declarar o vencedor **
	declareWinner(p1, p2) {
		if (p1.health <= 0) {
			return `${p2.nome} VENCEU!`;
		} else if (p2.health <= 0) {
			return `${p1.nome} VENCEU!`;
		}
	}

	// ** Resetar o jogo **
	reset() {
		this.jogador1.health = 100;
		this.jogador2.health = 100;
		this.isOver = false;
		resultDiv.innerText = '';
		updateGame(this.jogador1, this.jogador2, this);

		// Reabilita todos os botões
		p1AttackButton.disabled = false;
		p1HealButton.disabled = false;
		p2AttackButton.disabled = false;
		p2HealButton.disabled = false;
		playButton.disabled = false;
	}

	// ** Jogar uma partida completa **
	play() {
		this.reset();
		while (!this.isOver) {
			console.log(this.jogador1.atacar(this.jogador1, this.jogador2));
			if (this.isOver) break;
			console.log(this.jogador2.atacar(this.jogador2, this.jogador1));
			if (this.isOver) break;
		}
	}
}

// ** Criação dos jogadores **
const p1 = new Jogador('Jogador 1', 100, 10);
const p2 = new Jogador('Jogador 2', 100, 10);

// ** Criação do jogo **
const game = new Jogo(p1, p2);

// ** Inicializa o jogo **
updateGame(p1, p2, game);

// ** Botões de ataque e cura dos jogadores **
p1AttackButton.addEventListener('click', function () {
	if (!game.isOver && p2.health > 0) {
		console.log(p1.atacar(p1, p2));
		p1AttackAudio.play();
	}
});

p1HealButton.addEventListener('click', function () {
	if (!game.isOver && p1.health > 0) {
		console.log(p1.curar(p1));
		p1HealAudio.play();
	}
});

p2AttackButton.addEventListener('click', function () {
	if (!game.isOver && p1.health > 0) {
		console.log(p2.atacar(p2, p1));
		p2AttackAudio.play();
	}
});

p2HealButton.addEventListener('click', function () {
	if (!game.isOver && p2.health > 0) {
		console.log(p2.curar(p2));
		p2HealAudio.play();
	}
});

// ** Evento para botão de "Lutar" **
playButton.addEventListener('click', function () {
	game.play();
});

// ** Evento para botão de "Resetar" **
resetButton.addEventListener('click', function () {
	game.reset();
});
