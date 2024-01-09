// first get the input box to display what's being input
let inputBox = document.querySelector('#input-box');

let ac_button = document.querySelector('#clear');
ac_button.addEventListener('click', clearInputBox);

let sign_toggle_button = document.querySelector('#sign-toggle');
sign_toggle_button.addEventListener('click', toggle_sign);

let percent_button = document.querySelector('#percent');
percent_button.addEventListener('click', percent);

let awaiting_input = true;
let can_put_decimal = true;

let decimal_button = document.querySelector('#dot');
decimal_button.addEventListener('click', () => {
    if (can_put_decimal){
        inputBox.textContent += '.';
        can_put_decimal = false;
        decimal_button.disabled = true;
        decimal_button.setAttribute('style', 'background-color: grey');
    }
})



let operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', (e) => operator_press(e));
})

let numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', (e) => fillInputBox(e));
});

function fillInputBox(event) {
    if (awaiting_input) {inputBox.textContent = '';}
    inputBox.textContent += event.target.id;
    awaiting_input = false;
}

// clicking AC should clear input box
function clearInputBox() {
    inputBox.textContent = '';
    can_put_decimal = true;
    decimal_button.disabled = false;
    decimal_button.setAttribute('style', 'background-color: buttonface');
    number_1 = null;
    number_2 = null;
}

// +/- button should toggle the sign
function toggle_sign(){
    let regexp = /^[^-]/
    if (regexp.test(inputBox.textContent)){
        inputBox.textContent = "-" + inputBox.textContent;
    } else {
        inputBox.textContent = inputBox.textContent.replace('-', '');
    }
    if (number_1 != null) { number_1 *= -1; }
}

// % button should divide by 100
function percent(){
    temp = parseFloat(inputBox.textContent);
    if (number_1 != null) {number_1 = temp / 100;}
    inputBox.textContent = (temp / 100).toString();
}


// when any operator is called, the current expression must first be evaluated.
// for example, 237 + 3 - 5, 237+3 is evaluated to 240 before subtracting 5

function run_calculator(e){
    if (number_1 === null){
        number_1 = parseFloat(inputBox.textContent);
        console.log('n1 is ' + number_1);
    } else {
        number_2 = parseFloat(inputBox.textContent);
        number_1 = operator(number_1, number_2);
        console.log('n1 is ' + number_1 + " n2 is " + number_2);
        inputBox.textContent = number_1;
        number_2 = null;
    }
}

// have something where you have operand 1 and operand 2 !
let number_1 = null;
let number_2 = null;

function add(num1, num2){
    console.log('add called: ' + num1 + ' ' + num2);
    return num1 + num2;
}

function subtract(num1, num2){
    console.log('subtract called: ' + num1 + ' ' + num2);
    return num1 - num2;
}

function multiply(num1, num2){
    console.log('multiply called: ' + num1 + ' ' + num2);
    return num1 * num2;
}

function divide(num1, num2){
    console.log('divide called: ' + num1 + ' ' + num2);
    return num1 / num2;
}

function eq(num1, num2){
    temp = num1;
    num1 = null;
    return temp;
}

// we wanna run the calculator whenever any operator or equals is run.

function operator_press(e){
    awaiting_input = true;
    run_calculator(e);
    let id = e.target.id;
    if (id === 'add') {operator = add;}
    if (id === 'subtract') {operator = subtract;}
    if (id === 'multiply') {operator = multiply;}
    if (id === 'divide') {operator = divide;}
    if (id === 'equals') {operator = eq;}
}

// if the decimal button is pressed, it should not be pressed again until awaiting input