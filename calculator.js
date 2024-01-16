// CONSTANTS
let enabledStyle = 'background-color: black';
let disabledStyle = 'background-color: gray';

//----------STATE VARIABLES----------
// prev & current used to store calculator memory, operator used to store current operation
let prev = current = currentOperator = null;

// if the calculator should keep writing on top of whatever's displayed, or clear and start again.
let awaitingInput = true;

//----------SELECTING OBJECTS FROM DOM----------
// calculator components
let inputBox = document.querySelector('#input-box');
let digits = document.querySelectorAll('.number');
let binaryOperators = document.querySelectorAll('.binary-operator');
let unaryOperators = document.querySelectorAll('.unary-operator');
let clearButton = document.querySelector('#clear');
let decimalButton = document.querySelector('[id = \'.\']');

// adding event listeners
digits.forEach(digit => {
    digit.addEventListener('click', (e) => fillInputBox(e.target.id));
});
binaryOperators.forEach(operator => {
    operator.addEventListener('click', (e) => binaryOperatorPress(e));
})
unaryOperators.forEach(operator => {
    operator.addEventListener('click', (e) => unaryOperatorPress(e));
})
clearButton.addEventListener('click', clearCalculator);
decimalButton.addEventListener('click', (e) => fillInputBox(e.target.id));

//----------CALLBACK FUNCTIONS----------
// fills the input box whenever one of the numbers, or the dot is pressed
function fillInputBox(char) {
    if (awaitingInput) {inputBox.textContent = '';}
    if (char === '.') {disableDecimal();}
    inputBox.textContent += char;
    awaitingInput = false;
}

// callback when a binary operator is pressed
function binaryOperatorPress(e){
    readInputBox();
    refreshButtons();
    e.target.setAttribute('style', disabledStyle);
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
    if (/./.test(temp.toString())) {disableDecimal();}
}

// callback for AC, clears the calculator
function clearCalculator(){
    refreshButtons()
    inputBox.textContent = '';
    prev = current = null;
    
}

//----------HELPER FUNCTIONS----------
// turns decimal back off
function disableDecimal(){
    decimalButton.disabled = true;
    decimalButton.setAttribute('style', disabledStyle);
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
    } else {current = parseFloat(inputBox.textContent);}
    awaitingInput = true;
}

// enables all of the buttons
function refreshButtons(){
    binaryOperators.forEach(operator => {
        operator.setAttribute('style', enabledStyle);
    })
    decimalButton.disabled = false;
    decimalButton.setAttribute('style', enabledStyle);
}

let body = document.querySelector('body')
body.addEventListener('keyup', (e) => (readKeyboardUp(e.key)));
body.addEventListener('keydown', (e) => readKeyboardDown(e.key))

// check if shift is being pressed or not!
let shiftPressed = false;

function readKeyboardUp(key){
    if (key === 'SHIFT') shiftPressed = false;
    if (!shiftPressed) {
        if (/[0-9.]/.test(key)) fillInputBox(key);
    }
}

function readKeyboardDown(key){
    if (key === 'SHIFT') shiftPressed = true;
}

// we should also highlight the operator that is currently selected, would be nice DONE


