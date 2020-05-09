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
  let clearButton = document.getElementById('clear-btn');
  let equalsButton = document.getElementById('equals-btn');

  numberButtons.forEach(number => {
    number.addEventListener('click', () =>{
      inputCalculator.value = inputCalculator.value.concat(number.innerText);
    });
  });

  operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
      if(operator.innerText != '=') inputCalculator.value = `${inputCalculator.value}${operator.innerText}`;
    });
  });

  clearButton.addEventListener('click', clearInput);
  equalsButton.addEventListener('click', () => {
    outputCalculator.value = doOperation(inputCalculator.value);
  });
}

function clearInput(clearAll = true) {
  let inputCalculator = document.getElementById('input-calculation');
  let outputCalculator = document.getElementById('output-calculation');
  inputCalculator.value = '';
  if(clearAll) outputCalculator.value = '';
}


function doOperation(inputString) {
  let operations = new RegExp(/[+-/*^()]/gm)
  let inputArray = inputString.split(new RegExp(/([+-/*^()])/gm));
  while(inputArray.length > 1) {
    for(let i=0; i<inputArray.length; i++) {
      if(operations.exec(inputArray[i])) {
        if(inputArray[i] == '+') inputArray[i] = doAddition(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '-') inputArray[i] = doSubtraction(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '*') inputArray[i] = doMultiplication(inputArray[i-1], inputArray[i+1]);
        if(inputArray[i] == '/') inputArray[i] = doDivision(inputArray[i-1], inputArray[i+1]);

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