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
var mainRight = document.querySelector('.main-right');


minRange.value = 1;
maxRange.value = 100;

/----------Event Listeners----------/

updateButton.addEventListener('click', function() {
	updateErrors();
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
	chalOneErrors();
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

mainRight.addEventListener('click', function(event) {
	if (event.target.className === 'card-close-button') {
		event.target.parentNode.parentNode.remove();
	}
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
	buttonStyle(button);
};

function enableButton(button) {
	button.disabled = false;
	buttonStyle(button);
};

function resetGame() {
	minRange.value = 1;
	maxRange.value = 100;
	clearGame();
	minSpan.innerText = minRange.value;
	maxSpan.innerText = maxRange.value;
	setName('Challenger 1','Challenger 2');
	enableButton(updateButton);
};

function clearGame() {
	oneNameInput.value = '';
	twoNameInput.value = '';
	chalOneGuess.value = '';
	chalTwoGuess.value = '';
	startGame();
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
	} else {
		feedback1.innerText = "that's too low"
	};

	if (two > random) {
		feedback2.innerText = "that's too high"
	} else if (two == random) {
		feedback2.innerText = "BOOM!";
		createCard(oneNameInput.value, twoNameInput.value, twoNameInput.value);
	} else {
		feedback2.innerText = "that's too low"
	};
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
          <button style="border-radius: 30px 30px; height: 20px; background-color: #6e6e6e; color: white;" class="card-close-button" id="card-close-button">
          	&times;         	
          </button>
        </div>
      </div>`;
};

function updateErrors() {
	var updateMessage = document.querySelector('.range-box');
	var minBox = document.querySelector('#min-range');
	var maxBox = document.querySelector('#max-range');

	if (minBox.value == "") {
		updateMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		minBox.style.cssText = "border-color: #dd1972;";
	} else if (maxBox.value == "") {
		updateMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		maxBox.style.cssText = "border-color: #dd1972;";
	} else {
		// errorRemove.remove();
		minBox.style.cssText = "border-color: #e8e8e8;";
		maxBox.style.cssText = "border-color: #e8e8e8;";
	};
};

function chalOneErrors() {
	var guessMessage = document.querySelector('.guess-1-form');
	var guessBox1 = document.querySelector('#one-guess');
	var nameBox1 = document.querySelector('#one-input');

	if (chalOneGuess.value == "") {
		guessMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		guessBox1.style.cssText = "border-color: #dd1972;";
	} else if (oneNameInput.value == "") {
		guessMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		nameBox1.style.cssText = "border-color: #dd1972;";
	} else {
		// errorRemove.remove();
		guessBox1.style.cssText = "border-color: #e8e8e8;";
		chalTwoErrors();
		numberCheck(chalOneGuess.value, chalTwoGuess.value);
	};
};

function chalTwoErrors() {
	var guessMessage2 = document.querySelector('.guess-2-form');
	var guessBox2 = document.querySelector('#two-guess');
	var nameBox2 = document.querySelector('#two-input');

	if (chalTwoGuess.value == "") {
		guessMessage2.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		guessBox2.style.cssText = "border-color: #dd1972;";
	} else if (twoNameInput.value == "") {
		guessMessage2.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">No value</h5>');
		nameBox2.style.cssText = "border-color: #dd1972;";
	} else {
		// errorRemove.remove();
		guessBox2.style.cssText = "border-color: #e8e8e8;";
		numberCheck(chalOneGuess.value, chalTwoGuess.value);
	};
};

// function chalOneNaN() {
// 	var guessMessage = document.querySelector('.guess-1-form');
// 	var guessBox1 = document.querySelector('#one-guess');

// 	if (chalOneGuess.value == "NaN") {
// 		guessMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">Not a number</h5>');
// 	} else {
// 		chalTwoNan();
// 	};
// };

// function chalTwoNaN(); {
//     var guessMessage = document.querySelector('.guess-1-form');
// 	var guessBox1 = document.querySelector('#one-guess');

// 	if (chalOneGuess.value == "NaN") {
// 		guessMessage.insertAdjacentHTML('afterend', '<h5 style="color: #dd1972;" class="error">Not a number</h5>');
// 	} else {
// 		numberCheck();
// 	};
// };


/-------------Working on function-----------/


function startGame() {
	disableButton(resetButton);
	disableButton(clearButton);
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
	if ((chalOneGuess.value > maxRange.value) || (chalOneGuess.value < minRange.value)) {
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

function buttonStyle(button) {
	if (button.disabled === true) {
		button.style.cssText = "background-color: #d0d2d3;";
	} else {
		button.style.cssText = "background-color: #6e6e6e;"
	};
};

/----------Starting Conditions-------/

startGame();
