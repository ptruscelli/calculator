

const numberButtons = document.querySelectorAll("div.number");
const operatorButtons = document.querySelectorAll("div.operator");
const equalButton = document.querySelector(".equal");
const acButton = document.querySelector("#ac");
const mainDisplay = document.querySelector("#mainDisplay");
const secondDisplay = document.querySelector("#secondDisplay");

let firstOperand = null;
let secondOperand = null; 
let operator = null;
let result = null;

let displayFix = false;
/*
displayfix value is used when the display is already showing
an answer/value and the user clicks a new number without 
clicking the clear button first, so the calculator knows to start
a new operation instead of adding digits to the previous answer.
*/



// FUNCTIONS

function operate(a, b, func) {
    return result = func(a, b);
}

function add(a, b) {
    return a + b;
};
  
function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



function numberPress(event) {
    let numberKey = event.target.textContent;
        
    if (firstOperand == null) {
        firstOperand = numberKey;
        updateDisplay(numberKey);
        displayFix = false;
        // 1st click, all values should be null
    } else if (firstOperand != null && operator == null) {
        firstOperand += numberKey;
        updateDisplay(numberKey);
        // if user hasn't clicked an operator yet
        // keep adding digits to first number
    } else if (operator != null && secondOperand == null) {
        secondOperand = numberKey;
        updateDisplay(numberKey);
        // once operator has been selected, add digits to second operand
    } else if (secondOperand != null) {
        secondOperand += numberKey;
        updateDisplay(numberKey);
    }
    
};



function equalsPress() {
    a = +(firstOperand);
    b = +(secondOperand);
    
    if (firstOperand != null && secondOperand != null && operator != null) {
        // equal button only activates once there's a valid expression in the calculator
        switch(operator) {
            case '+':
                operate(a, b, add);
                break;
            case '-':
                operate(a, b, subtract);
                break;
            case 'x':
                operate(a, b, multiply);
                break;
            case '/':
                operate(a, b, divide);
                break;
        }
        secondDisplay.textContent = mainDisplay.textContent;
        mainDisplay.textContent = +parseFloat(result.toFixed(7));
        // toFixed by itself adds unnecessary trailing zeroes if number
        // isn't a long decimal

        firstOperand = null;
        secondOperand = null; 
        operator = null;
        displayFix = true; // calculator is ready to start new operation
                           // even if user has not pressed clear
    }

    
}



function updateDisplay(expression) {
    if (mainDisplay.textContent == "0" || displayFix == true) {
        mainDisplay.textContent = expression;
    } else {
        mainDisplay.textContent += expression;
    };
}



function allClear() {
    firstOperand = null;
    secondOperand = null; 
    operator = null;
    result = null;
    mainDisplay.textContent = "0";
    secondDisplay.textContent = "0";
}




// EVENT LISTENERS

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", numberPress);
};

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", (event) => {
        if (operator == null && firstOperand != null) {
            operator = event.target.textContent;
            updateDisplay(operator);
        }
    });
};


equalButton.addEventListener("click", equalsPress);
acButton.addEventListener("click", allClear);
