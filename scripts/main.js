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
    doOperation(inputCalculator.value);
  });
}

function clearInput(clearAll = true) {
  let inputCalculator = document.getElementById('input-calculation');
  let outputCalculator = document.getElementById('output-calculation');
  inputCalculator.value = '';
  if(clearAll) outputCalculator.value = '';
}


function doOperation(inputString) {
  let inputArray = inputString.split(new RegExp(/([+-/*^])/gm));
  console.table(inputArray);
  while(inputArray.length > 1) {
    
  }
}

function doAddition(a, b) {
  return a + b;
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