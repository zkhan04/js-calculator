//----------STATE VARIABLES----------
// two variables used to store calculator memory
let prev = current = null;

// the operator that the calculator should call (+, -, *, /)
let operator;

// if the calculator should keep writing on top of whatever's displayed, or clear and start again.
let awaitingInput = true;

//----------SELECTING OBJECTS FROM DOM----------
// calculator components
let inputBox = document.querySelector('#input-box');
let digits = document.querySelectorAll('.number');
let binaryOperators = document.querySelectorAll('.binary-operator');
let unaryOperators = document.querySelectorAll('.unary-operator');
let clearButton = document.querySelector('#clear');
let decimalButton = document.querySelector('#dot');

// adding event listeners
digits.forEach(digit => {
    digit.addEventListener('click', (e) => fillInputBox(e));
});
binaryOperators.forEach(operator => {
    operator.addEventListener('click', (e) => binaryOperatorPress(e));
})
unaryOperators.forEach(operator => {
    operator.addEventListener('click', (e) => unaryOperatorPress(e));
})
clearButton.addEventListener('click', clearCalculator);
decimalButton.addEventListener('click', (e) => fillInputBox(e));

//----------CALLBACK FUNCTIONS----------
// fills the input box whenever one of the numbers, or the dot is is pressed
function fillInputBox(e) {
    if (awaitingInput) {
        inputBox.textContent = '';
        awaitingInput = false;
    }
    if (e.target.id === 'dot') {
        inputBox.textContent += '.';
        decimalButton.disabled = true;
        decimalButton.setAttribute('style', 'background-color: gray')
    } else inputBox.textContent += e.target.id;
}

// callback when a binary operator is pressed
function binaryOperatorPress(e){
    readInputBox();
    if (e.target.id === 'equals') current = null;
    else operator = operatorMatches[e.target.id];
}

// callback for when a unary operator is pressed
function unaryOperatorPress(e){
    let temp = parseFloat(inputBox.textContent);
    let func = operatorMatches[e.target.id];
    temp = func(temp);
    temp = Math.round(temp * 1e8)/1e8;
    inputBox.textContent = temp.toString();
}

// callback for AC, clears the calculator
function clearCalculator(){
    inputBox.textContent = '';
    prev = null;
    current = null;
    enableDecimal();
}

//----------HELPER FUNCTIONS----------
// turns the decimal back on - whenever a binary operator is pressed, or calculator is cleared
function enableDecimal(){
    decimalButton.disabled = false;
    decimalButton.setAttribute('style', 'background-color: black');
}

// an object which matches each operator ID to an arrow function
let operatorMatches = {
    'add': ((n1, n2) => n1 + n2),
    'subtract': ((n1, n2) => n1 - n2),
    'multiply': ((n1, n2) => n1 * n2),
    'divide': ((n1, n2) => n1 / n2),
    'percent': ((n) => n / 100),
    'sign-toggle': ((n) => n * -1),
};

// reads from the input box into current. Evaluates an expression if necessary, then rounds
function readInputBox(){
    if (current != null) {
        prev = current;
        current = parseFloat(inputBox.textContent);
        current = operator(prev, current);
        current = Math.round(current * 1e8)/1e8
        inputBox.textContent = current.toString()
    } else {
        current = parseFloat(inputBox.textContent);
    }
    awaitingInput = true;
    enableDecimal();
}