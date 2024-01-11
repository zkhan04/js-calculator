// STATE VARIABLES
// two variables used to store calculator memory
let prev = null;
let current = null;

// the operator that the calculator should call (+, -, *, /)
let operator;

// if the calculator should keep writing on top of whatever's displayed, or clear and start again.
let awaitingInput = true;

// where the text is being displayed.
let inputBox = document.querySelector('#input-box');

// now let's allow the user to type into it
let digits = document.querySelectorAll('.number');
digits.forEach(digit => {
    digit.addEventListener('click', (e) => fillInputBox(e));
});

// fills the input box whenever one of the numbers is pressed
function fillInputBox(e) {
    if (awaitingInput) {
        inputBox.textContent = '';
        awaitingInput = false;
    }
    inputBox.textContent += e.target.id;
}

// clicking AC should clear the input box.
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCalculator);

// clears the calculator
function clearCalculator(){
    inputBox.textContent = '';
    enableDecimal();
    prev = null;
    current = null;
}

// let's add decimals into our thingimabobber now!
let decimalButton = document.querySelector('#dot');
decimalButton.addEventListener('click', disableDecimal);

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

// buttons for each of the operators. when one is pressed, it calls the operator_press button
let binaryOperators = document.querySelectorAll('.binary-operator');
binaryOperators.forEach(operator => {
    operator.addEventListener('click', (e) => binaryOperatorPress(e));
})

// an object which matches each button ID to one of the arrow functions will be helpful as well!
let binaryOperatorMatches = {
    'add': ((n1, n2) => n1 + n2),
    'subtract': ((n1, n2) => n1 - n2),
    'multiply': ((n1, n2) => n1 * n2),
    'divide': ((n1, n2) => n1 / n2),
};

// reads from the input box.
function readInputBox(){
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
}

// what happens when an operator is pressed
function binaryOperatorPress(e){
    readInputBox();
    if (e.target.id === 'equals') current = null;
    else operator = binaryOperatorMatches[e.target.id];
}

// let's apply a similar approach to unary operators!
let unaryOperators = document.querySelectorAll('.unary-operator');
unaryOperators.forEach(operator => {
    operator.addEventListener('click', (e) => unaryOperatorPress(e));
})

function unaryOperatorPress(e){
    let temp = parseFloat(inputBox.textContent);
    let func = unaryOperatorMatches[e.target.id];
    temp = func(temp);
    inputBox.textContent = temp.toString();
}

let unaryOperatorMatches = {
    'percent': ((n) => n / 100),
    'sign-toggle': ((n) => n * -1),
}