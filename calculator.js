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
    inputBox.textContent += e.target.id;
}

// clears the calculator
function clearCalculator(){
    inputBox.textContent = '';
    enableDecimal();
}

// turn off the decimal
function disableDecimal(){
    inputBox.textContent += '.';
    decimalButton.disabled = true;
    decimalButton.setAttribute('style', 'background-color: gray');
}

// turn the decimal back on!
function enableDecimal(){
    decimalButton.disabled = false;
    decimalButton.setAttribute('style', 'background-color: buttonface');
}
