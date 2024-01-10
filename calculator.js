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
}