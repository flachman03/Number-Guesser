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
var random = parseInt("");
var mainRight = document.querySelector('.main-right');
var rangeBox = document.querySelector('.range-box');
var guessCount = 0;

/----------Event Listeners----------/

updateButton.addEventListener('click', function() {
	rangeCheck();
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
	errorNoValue();
	guessCheck();
});

resetButton.addEventListener('click', function(){
	resetGame();
	enableButton(updateButton);
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
	startGame();
	rangeFunc();
	setName('Challenger 1','Challenger 2');
	clearGame();

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
		chalTwoName[i].innerText = two;
	};
};

function numberCheck(one, two) {
	if (one > random) {
		feedback1.innerText = "that's too high"
		guessCount = guessCount + 1;
	} else if (one == random) {
		feedback1.innerText = "BOOM!"
		createCard(oneNameInput.value, twoNameInput.value, oneNameInput.value);
		changeRange();
		guessCount = guessCount + 1;
	} else {
		feedback1.innerText = "that's too low"
		guessCount = guessCount + 1;
	}

	if (two > random) {
		feedback2.innerText = "that's too high"
	} else if (two == random) {
		feedback2.innerText = "BOOM!";
		createCard(oneNameInput.value, twoNameInput.value, twoNameInput.value);
	} else {
		feedback2.innerText = "that's too low"
	}
};

function createCard(one, two, three) {
	mainRight.innerHTML = `
		<div class="cards flex">
        <div class="card-top flex">
          <p><span class="chal-one-name">${chalOneName.innerText = one}</span></p>
          <p>VS</p>
          <p><span class="chal-two-name">${chalTwoName.innerText = two}</span></p>
        </div>
        <div class="card-middle flex">
          <h3><span>${chalTwoName.innerText = three}</span></h3>
          <h4>WINNER</h43>
        </div>
        <div class="card-bottom flex">
          <p><span>${guessCount}</span>GUESSES</p>
          <p><span></span>MINUTES</p>
          <button></button>
        </div>
      </div>`;
}

function errorNoValue() {
	var guessForm = document.querySelector('.guess-1-form');
	var guessBox = document.querySelector('#one-guess')
	if (chalOneGuess.value == "") {
		guessForm.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		guessBox.style.cssText = "border-color: #dd1972;"
	} else {
		numberCheck(chalOneGuess.value, chalTwoGuess.value);
		var errorRemove = document.querySelector('.error');
		errorRemove.remove();
		guessBox.style.cssText = "border-color: #e8e8e8;"
	}
}


function startGame() {
	resetButton.disabled = true;
	clearButton.disabled = true;
	minRange.value = 1;
	maxRange.value = 100;
	randomNumber(1, 100);
};

function rangeCheck() {
	var rangeBox = document.querySelector('.range-box');
	if (minRange.value < maxRange.value) {
		rangeFunc(); 
	} else {
		rangeBox.insertAdjacentHTML('afterend', '<h5>Error</h5>');
	}
};

function guessCheck() {
	var guessBox = document.querySelector('.forms-flex');
	if ((maxRange.value < chalOneGuess.value) || (minRange.value > chalOneGuess.value)) {
		guessBox.insertAdjacentHTML('afterend', '<h5>Error</5>');
	} else {
		numberCheck(chalOneGuess.value, chalTwoGuess.value);
	};
};

function changeRange() {
	maxRange.value = parseInt(maxRange.value) + 10;
	if (minRange.value > 10) {
		minRange.value = minRange.value - 10} 
		else {minRange.value = 0;
		}
	randomNumber(minRange.value, maxRange.value);
	rangeFunc();
};

/----------Starting Conditions-------/

startGame();

