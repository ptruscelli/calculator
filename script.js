const numberButtons = document.querySelectorAll("div.number");
const operatorButtons = document.querySelectorAll("div.operator");
const equalButton = document.querySelector(".equal")
const mainDisplay = document.querySelector("#mainDisplay");

let firstOperand = null;
let secondOperand = null; 
let operator = null;
let result = null;



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
        // 1st click, all values should be null
    } else if (firstOperand != null && operator == null) {
        firstOperand += numberKey;
        // if user hasn't clicked an operator yet
        // keep adding digits to first number
    } else if (operator != null && secondOperand == null) {
        secondOperand = numberKey;
        // once operator has been selected, add digits to second operand
    } else if (secondOperand != null) {
        secondOperand += numberKey;
    }
    
    console.log(`first operand is ${firstOperand} and second operand is ${secondOperand}`)
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
    }
    console.log(result);
}

/*
function numberPress(event) {
    let numberKey = event.target;

    if (mainDisplay.textContent == "0") {
        mainDisplay.textContent = numberKey.textContent;
    } else {
        mainDisplay.textContent += numberKey.textContent;
    };
    firstOperand.num += numberKey.textContent;
    console.log(`first operand = ${firstOperand.num}`);
};
*/



// EVENT LISTENERS

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", numberPress);
};

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", (event) => {
        if (operator == null) {
            operator = event.target.textContent;
        }

        console.log('operator is now ' + operator);
    });
};

equalButton.addEventListener("click", equalsPress);

