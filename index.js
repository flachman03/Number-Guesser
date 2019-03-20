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

function randomNumber() {
	var random = Math.floor(Math.random(maxRange-minRange) + minRange);
	console.log(random);
	return random;
};

updateButton.addEventListener('click', function() {
	minSpan.innerText = minRange.value;
	maxSpan.innerText = maxRange.value;
	console.log(minRange);
	console.log(maxRange);
	randomNumber();
})



