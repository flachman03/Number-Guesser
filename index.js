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

/----------Event Listeners----------/

updateButton.addEventListener('click', function() {
	rangeFunc();
});

// submitButton.addEventListener('click', function() {
// 	chalNames();
// });

/----------Functions----------/
function randomNumber() {
	var random = Math.ceil(Math.random()*((maxRange.value - minRange.value) + 1) + minRange.value);
	console.log(random);
	return random;
};

function rangeFunc() {
	minSpan.innerText = minRange.value;
	maxSpan.innerText = maxRange.value;
	randomNumber();
};

// function chalNames() {
// 	for (i = 0; i < chalOneName.length; i++) {
// 		oneNameInput[i].innerText = chalOneName.value;
// 		console.log(oneNameInput[i])
// 	};

// 	for (i = 0; i < chalTwoName.length; i++) {
// 		twoNameInput[i].innerText = chalTwoName.value;
// 	};
// };

for (i = 0; i < chalOneName.length; i++) {
	
}

