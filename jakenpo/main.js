import './style.css';

// URLs para os sprites dos treinadores
const trainerSprites = {
	player: 'https://play.pokemonshowdown.com/sprites/trainers/red-gen7.png',
	computer: 'https://play.pokemonshowdown.com/sprites/trainers/blue-gen7.png',
};

// Pokémon IDs para tipos específicos
const pokemonChoices = {
	Agua: 7, // Squirtle
	Fogo: 4, // Charmander
	Planta: 1, // Bulbasaur
};

// Função para buscar informações do Pokémon usando a PokeAPI
async function getPokemonInfo(type) {
	const pokemonId = pokemonChoices[type];
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemonId}`
	);
	const data = await response.json();
	return {
		name: data.name,
		image: data.sprites.front_default,
	};
}

// Atualiza o HTML com o layout do jogo
document.querySelector('#app').innerHTML = `
  <div class="wrapper">
	<aside class="sidebar">
	<h1>JakenPoké</h1>
	    <div class="buttons">
      <button class="pokemonButton" value="Agua">🌊 <span>Água</span></button>
      <button class="pokemonButton" value="Fogo">🔥 <span>Fogo</span></button>
      <button class="pokemonButton" value="Planta">🌿 <span>Planta</span></button>
    </div>
	<div id="score-board" class="score-board">Placar: <span id="player-score">0</span></div>
	</aside>

    <div class="game-container">

      <div id="player-area" class="trainer-area">
        <div class="trainer-info">
          <img src="${trainerSprites.player}" alt="Player Trainer" class="trainer-sprite">
          <div id="player-pokemon" class="pokemon-info"></div>
        </div>
      </div>
      
      <div id="computer-area" class="trainer-area">
        <div class="trainer-info">
          <img src="${trainerSprites.computer}" alt="Computer Trainer" class="trainer-sprite">
          <div id="computer-pokemon" class="pokemon-info"></div>
        </div>
      </div>
    </div>

    <div id="result" class="result"></div>
    <button id="endGameButton" class="reset-button">🔴 Resetar Jogo</button>
  </div>
`;

// ** Função para selecionar um Pokémon aleatório para o computador **
function getComputerChoice() {
	const types = ['Agua', 'Fogo', 'Planta'];
	const randomNumber = Math.floor(Math.random() * 3);
	return types[randomNumber];
}

// ** Função para determinar o resultado do jogo **
function getResult(playerChoice, computerChoice, currentScore = 0) {
	let score = currentScore;

	// Lógica de vitória baseada nos tipos de Pokémon
	if (playerChoice === computerChoice) {
		// Empate: não modifica o placar
	} else if (
		(playerChoice === 'Agua' && computerChoice === 'Fogo') ||
		(playerChoice === 'Fogo' && computerChoice === 'Planta') ||
		(playerChoice === 'Planta' && computerChoice === 'Agua')
	) {
		score += 1; // Jogador ganha
	} else {
		score = Math.max(0, score - 1); // Jogador perde, mas o placar não vai abaixo de 0
	}

	return score;
}

// ** Atualiza o resultado na tela **
async function showResult(score, playerChoice, computerChoice) {
	const result = document.getElementById('result');
	const playerScore = document.getElementById('player-score');
	const playerPokemonDiv = document.getElementById('player-pokemon');
	const computerPokemonDiv = document.getElementById('computer-pokemon');

	// Busca informações dos Pokémon escolhidos
	const playerPokemon = await getPokemonInfo(playerChoice);
	const computerPokemon = await getPokemonInfo(computerChoice);

	// Atualiza as informações dos Pokémon
	playerPokemonDiv.innerHTML = `${playerPokemon.name} <img src="${playerPokemon.image}" alt="${playerPokemon.name}">`;
	computerPokemonDiv.innerHTML = `${computerPokemon.name} <img src="${computerPokemon.image}" alt="${computerPokemon.name}">`;

	if (score > 0) {
		result.innerText = 'Você Venceu!';
	} else if (score < 1) {
		result.innerText = 'Você Perdeu!';
	} else {
		result.innerText = 'Empate!';
	}

	// Atualiza o placar do jogador
	playerScore.innerText = score;
}

// ** Função para executar a lógica do jogo ao clicar em um botão de escolha **
function onClickPokemon(playerChoice) {
	const computerChoice = getComputerChoice();
	const score = getResult(
		playerChoice,
		computerChoice,
		parseInt(document.getElementById('player-score').innerText)
	);
	showResult(score, playerChoice, computerChoice);
}

// ** Inicia o jogo adicionando eventos aos botões **
function playGame() {
	const pokemonButtons = document.querySelectorAll('.pokemonButton');

	pokemonButtons.forEach((button) => {
		button.onclick = () => onClickPokemon(button.value);
	});

	const endGameButton = document.getElementById('endGameButton');
	endGameButton.onclick = () => endGame();
}

// ** Função para limpar o resultado e o placar da tela **
function endGame() {
	const result = document.getElementById('result');
	const playerScore = document.getElementById('player-score');
	const playerPokemonDiv = document.getElementById('player-pokemon');
	const computerPokemonDiv = document.getElementById('computer-pokemon');

	result.innerText = '';
	playerScore.innerText = '0';
	playerPokemonDiv.innerHTML = '';
	computerPokemonDiv.innerHTML = '';
}

playGame();
