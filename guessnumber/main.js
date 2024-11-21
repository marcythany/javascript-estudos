let computerNumber;
let userNumbers = [];
let attempts = 0;
let maxguesses = 10;
let gameOver = false;

function newGame() {
	window.location.reload();
}

function init() {
	computerNumber = Math.floor(Math.random() * 100 + 1);
	console.log(computerNumber);
}

function compareNumbers() {
	// Verifica se o jogo já terminou para evitar que continue após ganhar
	if (gameOver) return;

	const userNumber = Number(document.getElementById('inputBox').value);
	userNumbers.push(' ' + userNumber);
	document.getElementById('guesses').innerHTML = userNumbers;

	if (attempts < maxguesses) {
		if (userNumber > computerNumber) {
			document.getElementById('textOutput').innerHTML =
				'Seu palpite está muito alto';
			document.getElementById('inputBox').value = '';
			attempts++;
			document.getElementById('attempts').innerHTML = attempts;
		} else if (userNumber < computerNumber) {
			document.getElementById('textOutput').innerHTML =
				'Seu palpite está muito baixo';
			document.getElementById('inputBox').value = '';
			attempts++;
			document.getElementById('attempts').innerHTML = attempts;
		} else {
			document.getElementById('textOutput').innerHTML =
				'Parabéns, você acertou!!!';
			document.getElementById('inputBox').value = '';
			attempts++;
			document.getElementById('attempts').innerHTML = attempts;
			document.getElementById('inputBox').setAttribute('Readonly', 'Readonly');
			gameOver = true;
		}
	} else {
		document.getElementById('textOutput').innerHTML =
			'Você perdeu :( </br> O número correto era ' + computerNumber;
		document.getElementById('inputBox').setAttribute('Readonly', 'Readonly');
		gameOver = true;
	}
}
