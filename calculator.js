// where the text is being displayed.
let inputBox = document.querySelector('#input-box');

// now let's allow the user to type into it
let digits = document.querySelectorAll('.number');
digits.forEach(digit => {
    digit.addEventListener('click', (e) => fillInputBox(e));
});

// clicking AC should clear the input box.
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCalculator);

// let's add decimals into our thingimabobber now!
let decimalButton = document.querySelector('#dot');
decimalButton.addEventListener('click', disableDecimal);

// now let's get the unary operators to work.
// first will be the percent
let percentButton = document.querySelector('#percent');
percentButton.addEventListener('click', () => {
    let temp = parseFloat(inputBox.textContent);
    temp /= 100;
    inputBox.textContent = temp.toString();
})

// now let's do the sign toggle
let signButton = document.querySelector('#sign-toggle');
signButton.addEventListener('click', () => {
    let temp = parseFloat(inputBox.textContent);
    temp *= -1;
    inputBox.textContent = temp.toString();
})

// let's move this functionality into another function in case we change things around!
function fillInputBox(e) {
    if (awaitingInput) {
        inputBox.textContent = '';
        awaitingInput = false;
    }
    inputBox.textContent += e.target.id;
}

// clears the calculator
function clearCalculator(){
    inputBox.textContent = '';
    enableDecimal();
    prev = null;
    current = null;
}

// turn off the decimal
function disableDecimal(){
    if (awaitingInput) {
        inputBox.textContent = '';
        awaitingInput = false;
    }
    inputBox.textContent += '.';
    decimalButton.disabled = true;
    decimalButton.setAttribute('style', 'background-color: gray');
}

// turn the decimal back on!
function enableDecimal(){
    decimalButton.disabled = false;
    decimalButton.setAttribute('style', 'background-color: buttonface');
}

// time for binary operators!
// when we call a binary operator, we will store the value in current.
// once a value 'replaces' current, it should be placed into prev;

let prev = null;
let current = null;

// having arrow functions for the four operators will help.

let add = (n1, n2) => n1 + n2;
let subtract = (n1, n2) => n1 - n2;
let multiply = (n1, n2) => n1 * n2;
let divide = (n1, n2) => n1 / n2;

// okay, let's make buttons for each of the operators.
let operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', (e) => operator_press(e));
})

// what should happen when an operator is pressed?
// if current is null, read the inputBox into current.
// if current is not null, read current into prev then read inputBox into current.
// at this point, combine prev and current into one and store the result into current.
// then, the operator to run should be set to whatever was pressed.
let operatorMatches = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide,
};

let operator;
function operator_press(e){
    if (current != null) {
        prev = current;
        current = parseFloat(inputBox.textContent);
        current = operator(prev, current);
        inputBox.textContent = current.toString()
    } else {
        current = parseFloat(inputBox.textContent);
    }
    awaitingInput = true;
    enableDecimal();
    let id = e.target.id;
    operator = operatorMatches[id];
}

// after an operator is pressed, the next thing to be entered after that should 'clear' the input
// after an operator is pressed, the decimal button should also be freed up
let awaitingInput = true;

// what should the equals thing do?
// it should:
// do the normal read into current + prev thing
// if 

function equal_press(){
    if(current != null){
        prev = current;
        current = parseFloat(inputBox.textContent);
        current = operator(prev, current);
        inputBox.textContent = current.toString();
        current = null;
    } else {
        current = parseFloat(inputBox.textContent);
    }
    awaitingInput = true;
    enableDecimal();
}

let equalButton = document.querySelector('#equals');
equalButton.addEventListener('click', equal_press);

