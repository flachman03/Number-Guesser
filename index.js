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
var closeButton = document.querySelector('#card-close-button');


minRange.value = 1;
maxRange.value = 100;

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
		chalTwoName[i].innerText = two;
	};
};

function numberCheck(one, two) {
	if (one > random) {
		feedback1.innerText = "that's too high"
	} else if (one == random) {
		feedback1.innerText = "BOOM!";		
		createCard(oneNameInput.value, twoNameInput.value, oneNameInput.value);
		changeRange();
	} else {
		feedback1.innerText = "that's too low"
	}
	if (two > random) {
		feedback2.innerText = "that's too high"
	} else if (two == random) {
		feedback2.innerText = "BOOM!";
		createCard(oneNameInput.value, twoNameInput.value, twoNameInput.value);
		changeRange();
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
          <p><span></span>GUESSES</p>
          <p><span></span>MINUTES</p>
          <button id="card-close-button"><img src="images/close-icon.png"></button>
        </div>
      </div>`;
    closeButton.addEventListener('click', function() {
    	var card = document.querySelector('.cards');
    	card.style.cssText = "display: none;";
    });
};

/-------------Working on function-----------/


function errorNoValue() {
	var guessMessage = document.querySelector('.guess-1-form');
	var guessBox1 = document.querySelector('#one-guess');
	var nameBox1 = document.querySelector('#one-input');
	// var errorRemove = document.querySelector('.error');
	if (chalOneGuess.value == "") {
		guessMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		guessBox1.style.cssText = "border-color: #dd1972;";
	} else if (oneNameInput.value == "") {
		guessMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		nameBox1.style.cssText = "border-color: #dd1972;";
	} else {
		// errorRemove.remove();
		guessBox1.style.cssText = "border-color: #e8e8e8;";
		numberCheck(chalOneGuess.value, chalTwoGuess.value);
	}
};

function startGame() {
	resetButton.disabled = true;
	clearButton.disabled = true;
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

