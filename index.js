/----------Global Variables----------/

var maxRange = document.querySelector('#max-range');
var minRange = document.querySelector('#min-range');
var updateButton = document.querySelector('#update-button');
var minSpan = document.querySelector('#span-min');
var maxSpan = document.querySelector('#span-max');
var oneNameInput = document.querySelector('#one-input');
var twoNameInput = document.querySelector('#two-input');
var chalOneGuess = document.querySelector('#one-guess');
var chalTwoGuess = document.querySelector('#two-guess');
var submitButton = document.querySelector('#submit-button');
var resetButton = document.querySelector('#reset-button');
var clearButton = document.querySelector('#clear-button');
var chalOneName = document.querySelectorAll('.chal-one-name');
var chalTwoName = document.querySelectorAll('.chal-two-name');
var bigNumber1 = document.querySelector('.big-number-1');
var bigNumber2 = document.querySelector('.big-number-2');
var feedback1 = document.querySelector('.guess-feedback-1');
var feedback2 = document.querySelector('.guess-feedback-2');
var random = parseInt('');

/----------Event Listeners----------/

updateButton.addEventListener('click', function() {
	rangeFunc();
	randomNumber(minRange.value, maxRange.value);
	disableButton(updateButton);
	enableButton(resetButton);
	enableButton(clearButton);
	enableButton(submitButton);

});

submitButton.addEventListener('click', function() {
	setName(oneNameInput.value, twoNameInput.value);
	enableButton(resetButton);
	enableButton(clearButton);
	bigNumber1.innerText = chalOneGuess.value;
	bigNumber2.innerText = chalTwoGuess.value;
	numberCheck(chalOneGuess.value, chalTwoGuess.value);
});

resetButton.addEventListener('click', function(){
	resetGame();
	enableButton(updateButton);
	randomNumber(1, 100);
});

clearButton.addEventListener('click', function() {
	clearGame();
});

/----------Functions----------/
function randomNumber(min, max) {
	random = Math.floor((Math.random()*((max - min) + 1)) + parseInt(min));
	console.log(random);
};

function rangeFunc() {
	minSpan.innerText = minRange.value;
	maxSpan.innerText = maxRange.value;
};

function disableButton(button) {
	button.disabled = true;
};

function enableButton(button) {
	button.disabled = false;
};

function resetGame() {
	minRange.value = 1;
	maxRange.value = 100;
	oneNameInput.value = '';
	twoNameInput.value = '';
	minSpan.innerText = minRange.value;
	maxSpan.innerText = maxRange.value;
	setName('Challenger 1','Challenger 2');

};

function clearGame() {
	oneNameInput.value = '';
	twoNameInput.value = '';
	chalOneGuess.value = '';
	chalTwoGuess.value = '';
};

function setName(one, two) {
	for (i = 0; i < chalOneName.length; i++) {
		chalOneName[i].innerText = one;
		console.log(chalOneName[i]);
	};

	for (i = 0; i < chalTwoName.length; i++) {
		chalTwoName[i].innerText = two;
		console.log(chalTwoName[i]);
	};
};

function numberCheck(one, two) {
	if (one > random) {
		feedback1.innerText = "that's too high"
	} else {
		feedback1.innerText = "that's too low"
	}

	if (two > random) {
		feedback2.innerText = "that's too high"
	} else {
		feedback2.innerText = "that's too low"
	}
};


function startGame() {
	resetButton.disabled = true;
	clearButton.disabled = true;
	submitButton.disabled = true;
	randomNumber(1, 100);
};

/----------Starting Conditions-------/

startGame();

