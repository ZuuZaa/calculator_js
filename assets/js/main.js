"use strict"


let operator = "";
let operand = 0;
let screenNumber = "0";
let operandIsTaken = false;
let operatorIsTaken = false;

// html elements
const container = document.querySelector(".main-container");
const screen = document.querySelector(".calc-screen input");
const themeSwitcher = document.querySelector(".switcher");
const toggleButtons = document.querySelectorAll(".input-wrapper input");
// buttons 
const pointButton = document.querySelector(".btn-point");
const deleteButton = document.querySelector(".btn-delete");
const resetButton = document.querySelector(".btn-reset");
const resultButton = document.querySelector(".btn-result");
const numbers = document.querySelectorAll(".btn-number");
const operators = document.querySelectorAll(".btn-operator");

// function for showing current operant on screen 
const showScreenNumber = (number) => {

    if (number == Infinity) {
        screen.value = "zero division error";
        reset();
    } else {
        number = number.toString();
        let splitedNumber = number.split(".");
        splitedNumber[0] = parseInt(splitedNumber[0]).toLocaleString();
        number = splitedNumber.join(".")
        screen.value = number;
    }
}

// reset function 
const reset = () => {
    operator = "";
    operand = 0;
    screenNumber = "0";
    operandIsTaken = false;
    operatorIsTaken = false;
}

// function calculating depend on operator 
const calculate = () => {
    operand = +operand;
    switch (operator) {
        case "+":
            operand += +screenNumber
            break
        case "-":
            operand -= +screenNumber
            break
        case "x":
            operand *= +screenNumber
            break
        case "/":
            operand /= +screenNumber
            break
        default:
            console.log("operator is undefined")
    }
}

// function for switching the theme
const toogleTheme = () => {
    toggleButtons.forEach(item => {
        item.checked
            ? container.classList.add(item.value)
            : container.classList.remove(item.value)
    })
}


// numbers on click event
numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        operatorIsTaken = false;
        screenNumber == "0"
            ? screenNumber = btn.value
            : screenNumber += btn.value;
        showScreenNumber(screenNumber);
    })
})

// operators on click event 
operators.forEach(btn => {

    btn.addEventListener("click", () => {

        if (!operandIsTaken) {
            operand = screenNumber;
            operandIsTaken = true;
        }
        if (!operatorIsTaken) {
            operatorIsTaken = true;
            calculate()
            screenNumber = "0";
        }

        showScreenNumber(operand);
        operator = btn.value;
    })
})

// point button on click event
pointButton.addEventListener("click", () => {
    screenNumber.indexOf(".") == -1 ? screenNumber += "." : "";
    showScreenNumber(screenNumber);
})

// delete button on click event
deleteButton.addEventListener("click", () => {
    screenNumber.length > 1
        ? screenNumber = screenNumber.slice(0, -1)
        : screenNumber = "0"
    showScreenNumber(screenNumber);
})

// reset button on click event
resetButton.addEventListener("click", () => {
    reset();
    showScreenNumber(screenNumber);
})

// result button on click event
resultButton.addEventListener("click", () => {

    calculate();
    showScreenNumber(operand);
    reset();

})


// swith theme event
themeSwitcher.addEventListener("change", toogleTheme);

// show default number on screen
showScreenNumber(screenNumber);


