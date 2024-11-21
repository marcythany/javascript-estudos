function outcome() {
	let numOne = Number(document.getElementById('num-one').value);
	let numTwo = Number(document.getElementById('num-two').value);
	let total = 0;

	if (document.getElementById('box1').checked) {
		total = numOne + numTwo;
	} else if (document.getElementById('box2').checked) {
		total = numOne - numTwo;
	} else if (document.getElementById('box3').checked) {
		total = numOne * numTwo;
	} else if (document.getElementById('box4').checked) {
		total = numOne / numTwo;
	}
	document.getElementById('resultArea').innerHTML = 'Result: ' + String(total);
}

function reset() {
	document.getElementById('num-one').value = '';
	document.getElementById('num-two').value = '';
	document.getElementById('resultArea').innerHTML = '';
	document.getElementById('box1').checked = false;
	document.getElementById('box2').checked = false;
	document.getElementById('box3').checked = false;
	document.getElementById('box4').checked = false;
}
