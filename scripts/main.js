let storedText = '';

initializePage();

function initializePage() {
  initializeEventListeners();
}

function initializeEventListeners() {
  let inputCalculator = document.getElementById('input-calculation');
  let outputCalculator = document.getElementById('output-calculation');
  let numberButtons = document.querySelectorAll('#numbers *');
  let operatorButtons = document.querySelectorAll('#operations *');
  let deleteButton = document.getElementById('delete-btn');
  let equalsButton = document.getElementById('equals-btn');
  let allKeyboardButtons = Array.from(numberButtons).concat(Array.from(operatorButtons)).concat(deleteButton);
  let clearButton = document.getElementById('clear-btn');
  let specialMode = true; //holder, implement button

  numberButtons.forEach(number => {
    number.addEventListener('click', () =>{
      inputCalculator.value = inputCalculator.value.concat(number.innerText);
    });
  });

  operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
      if(specialMode == true) {
        if(operator.innerText != '=') inputCalculator.value = `${inputCalculator.value}${operator.innerText}`;
      } else {
        outputCalculator.value = inputCalculator.value;
      }
    });
  });

  clearButton.addEventListener('click', clearInput);
  deleteButton.addEventListener('click', backspaceInput);

  equalsButton.addEventListener('click', () => {
    if(specialMode == true) outputCalculator.value = doSpecialOperation(inputCalculator.value);
    else outputCalculator = doOperation(inputCalculator.value);
  });

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    allKeyboardButtons.forEach(keybtn => {
      if(e.key == keybtn.innerText || (e.key == 'Enter' && keybtn.innerText == '=') || (e.key == 'Backspace' && keybtn.innerText == 'DEL')) {
        keybtn.classList.add('hover-effect');
        keybtn.click();
      }
    });
  });

  document.addEventListener('keyup', (e) => {
    e.preventDefault();
    allKeyboardButtons.forEach(keybtn => {
      if(e.key == keybtn.innerText || (e.key == 'Enter' && keybtn.innerText == '=') || (e.key == 'Backspace' && keybtn.innerText == 'DEL')) keybtn.classList.remove('hover-effect');
    });
  });
}

function clearInput(clearAll = true) {
  let inputCalculator = document.getElementById('input-calculation');
  let outputCalculator = document.getElementById('output-calculation');
  inputCalculator.value = '';
  if(clearAll) outputCalculator.value = '';
}

function backspaceInput() {
  let inputCalculator = document.getElementById('input-calculation');
  inputCalculator.value = inputCalculator.value.slice(0, -1);
}

function doOperation(inputString, operation) {
  if(storedText.length == 0) storedText = inputString;
  else {
    if(operation == '+') storedText = doAddition(storedText, inputString);
    if(operation == '-') storedText = doSubtraction(storedText, inputString);
    if(operation == '*') storedText = doMultiplication(storedText, inputString);
    if(operation == '/') storedText = doDivision(storedText, inputString);
    if(operation == '^') storedText = doExponential(storedText, inputString);
  }
}

function doSpecialOperation(inputString) {
  let operations = new RegExp(/[\+\-\/\*\^\(\)]/gm);
  let inputArray = inputString.split(new RegExp(/([\+\-\/\*^\(\)])/gm));
  while(inputArray.length > 1) {
    for(let i=0; i<inputArray.length; i++) {
      if(operations.exec(inputArray[i])) {
        if(inputArray[i] == '+') inputArray[i] = doAddition(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '-') inputArray[i] = doSubtraction(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '*') inputArray[i] = doMultiplication(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '/') inputArray[i] = doDivision(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '^') inputArray[i] = doExponential(inputArray[i-1], inputArray[i+1]);

        inputArray.splice(i-1,1);
        inputArray.splice(i,1);
        break;
      }
    }
  }

  return inputArray[0];
}

function doAddition(a, b) {
  return Number(a) + Number(b);
}

function doSubtraction(a, b) {
  return a - b;
}

function doMultiplication(a, b) {
  return a * b;
}

function doDivision(a, b) {
  return a / b;
}

function doExponential(a, b) {
  return a ** b;
}

function getSquareRoot(a) {
  return a ** (1/2);
}