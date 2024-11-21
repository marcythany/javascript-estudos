function formatarMoeda(value) {
	value = Math.ceil(value * 100) / 100;
	value = value.toFixed(2);
	return value + ' R$';
}

function formatSplit(value) {
	if (value == 1) return value + ' pessoa';
	return value + ' pessoas';
}

function update() {
	const yourBill = Number(document.getElementById('yourBill').value);
	const tipPercentage = document.getElementById('tipInput').value;
	const split = Number(document.getElementById('splitInput').value);
	const tipValue = (yourBill * tipPercentage) / 100;
	const totalWithTip = yourBill + tipValue;
	const billEach = totalWithTip / split;

	const billEachWrapper = document.getElementById('bill-each-wrapper');
	if (split > 1) {
		billEachWrapper.style.display = 'flex';
	} else {
		billEachWrapper.style.display = 'none';
	}

	document.getElementById('tipPercent').innerHTML = `${tipPercentage}%`;
	document.getElementById('tipValue').innerHTML = formatarMoeda(tipValue);
	document.getElementById('totalWithTip').innerHTML =
		formatarMoeda(totalWithTip);
	document.getElementById('splitValue').innerHTML = formatSplit(split);
	document.getElementById('billEach').innerHTML = formatarMoeda(billEach);
}

// Adicionar listener para inputs
const splitInput = document.getElementById('splitInput');
splitInput.addEventListener('input', update);

document.querySelectorAll('input').forEach((input) => {
	input.addEventListener('input', update);
});
