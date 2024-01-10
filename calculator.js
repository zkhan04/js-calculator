// where the text is being displayed.
let inputBox = document.querySelector('#input-box');

// now let's allow the user to type into it
let digits = document.querySelectorAll('.number');
digits.forEach(digit => {
    digit.addEventListener('click', (e) => fillInputBox(e));
});

// let's move this functionality into another function in case we change things around!
function fillInputBox(e) {
    inputBox.textContent += e.target.id;
}

// clicking AC should clear the input box.
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCalculator);

// once again, let's move this functionality into another function in case we change it around
function clearCalculator(){
    inputBox.textContent = '';
    enableDecimal();
}

// let's add decimals into our thingimabobber now!
let decimalButton = document.querySelector('#dot');
decimalButton.addEventListener('click', disableDecimal)

// this is good, but pressing it should disable the button. let's move this as well!
function disableDecimal(){
    inputBox.textContent += '.';
    decimalButton.disabled = true;
    decimalButton.setAttribute('style', 'background-color: gray');
}

// doing great! now we just need to re-enable the button when we press AC DONE :)
// however, there are multiple occasions where we need to enable the decimal button without clearing the calculator, so we'll make
// a separate function

function enableDecimal(){
    decimalButton.disabled = false;
    decimalButton.setAttribute('style', 'background-color: buttonface');
}
