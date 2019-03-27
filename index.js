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
var chalOneError = document.querySelector('.chal-one-error');
var chalTwoError = document.querySelector('.chal-two-error');
var guessOneError = document.querySelector('.guess-one-error');
var guessTwoError = document.querySelector('.guess-two-error');

var closeButton = document.querySelector('#card-close-button');
var mainRight = document.querySelector('.main-right');


/----------Event Listeners----------/

updateButton.addEventListener('click', function() {
	updateErrors();
 	randomNumber(minRange.value, maxRange.value);
	// disableButton(updateButton);
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
	emptyField(oneNameInput, chalOneError);
	emptyField(twoNameInput, chalTwoError);
	guessChecks(chalOneGuess, guessOneError);
	guessChecks(chalTwoGuess, guessTwoError);
	numberCheck(chalOneGuess.value, chalTwoGuess.value);
});

resetButton.addEventListener('click', function(){
	resetGame();
	enableButton(updateButton);
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
	startGame();
	changeRange();
	setName('Challenger 1','Challenger 2');
	clearGame();
	// enableButton(updateButton);

};

function clearGame() {
	oneNameInput.value = '';
	twoNameInput.value = '';
	chalOneGuess.value = '';
	chalTwoGuess.value = '';
	bigNumber1.innerText = 'none';
	bigNumber2.innerText = 'none';
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
	var winnerCard = `
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
          <p><span>${seconds}</span>SECONDS</p>
          <button class="card-close-button" id="card-close-button">
          	&times;         	
          </button>
        </div>
      </div>`;
    mainRight.insertAdjacentHTML('afterBegin', winnerCard);
};


/----------SUBMIT BUTTON-----------/

function guessChecks(field, errorSpot) {
  rangeChecker(field, errorSpot);
  emptyField(field, errorSpot);
  nanCheck(field, errorSpot);
}

function emptyField(field, errorSpot) {
  if (field.value == '') {
    field.style.cssText = 'border-color: #dd1972;';
    errorSpot.innerText = 'Enter value';
  }
}

function nanCheck(field, errorSpot) {
  if (isNaN(field.value)) {
    field.style.cssText = 'border-color: #dd1972;';
    errorSpot.innerText = 'Enter a number';
  }
}


function rangeChecker(field, errorSpot) {
  if (field.value > maxRange.value || field.value < minRange.value) {
    field.style.cssText = 'border-color: #dd1972;';
    errorSpot.innerText = 'Guess must be within range';
  }
  if ((field.value < maxRange.value) && (field.value > minRange.value)) {
    field.style.cssText = 'border-color: #e8e8e8;';
    errorSpot.innerText = '';
  }
}


//----------UPDATE BUTTON-----------//

function updateErrors() {
  var updateMessage = document.querySelector('.range-error-message');
  var minBox = document.querySelector('#min-range');
  var maxBox = document.querySelector('#max-range');

  if (minBox.value == "") {
    updateMessage.style.cssText = "display: initial;";
    minBox.style.cssText = "border-color: #dd1972;";
    enableButton(updateButton);
  } else if (maxBox.value == "") {
    updateMessage.style.cssText = "display: initial;";
    maxBox.style.cssText = "border-color: #dd1972;";
    enableButton(updateButton);
  } else {
  	updateMessage.style.cssText = "display: none;";
    minBox.style.cssText = "border-color: #e8e8e8;";
    maxBox.style.cssText = "border-color: #e8e8e8;";
    rangeCheck();
  };
};


function rangeCheck() {
  var message = document.querySelector('.range-error-message');
  if (minRange.value < maxRange.value) {
    rangeFunc(); 
  } else {
    message.style.cssText = "display: initial;";
  }
  enableButton(updateButton);
};


/-------------Working on function-----------/


function startGame() {
	disableButton(resetButton);
	disableButton(clearButton);
	randomNumber(1, 100);
	minSpan.value = 1;
	maxSpan.value = 100;
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


/-----------Konami Code--------------/
var konamiKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	65: 'a',
	66: 'b',
}

var myKonamiCode = ['up','up','down','down','left','right','left','right','b','a'];
var konamiPosition = 0;

document.addEventListener('keydown', function(e) {
	var key = konamiKeys[e.keyCode];
	var requiredKey = myKonamiCode[konamiPosition];
	if (key == requiredKey) {
		konamiPosition++;
		} else {
			konamiPosition = 0;
		};
	if (konamiPosition == myKonamiCode.length) {
		activateCheats();
		};
	});
function activateCheats() {
	alert('cheats activated');
};

/--------------Timer-----------------/
var seconds = 0;
var counter;
function startTimer() {
	counter = setInterval(addSecond, 1000);
};
function addSecond() {
	seconds++
	console.log(seconds)
};

function stopTimer() {
	clearInterval(counter)
	seconds = 0;
}

/----------Starting Conditions-------/

startGame();
