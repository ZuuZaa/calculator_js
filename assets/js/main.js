"use strict"

let operand; 
let operator;
let calc = false;
let screenNumber = "0";


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
const showScreenNumber = (number) => screen.value = number;

// reset function 
const reset = () => {
    screenNumber = "0";
    operand = undefined;
    operator = undefined;
    calc = false;
}

// function calculating depend on operator 
const calculate = () => {
    if (!operand) {
        operand = +screenNumber;
    } else {
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
                console.log("default")
        }
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
    if (calc) {
        calculate();
        showScreenNumber(operand);
        calc = false
        reset();
    }
})

// numbers on click event
numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        calc = true;
        screenNumber == "0"
            ? screenNumber = btn.value
            : screenNumber += btn.value;

        screenNumber.split(".").map(str => {
            // console.log(str)

        })

        showScreenNumber(screenNumber);
    })
})

// operators on click event 
operators.forEach(btn => {
    btn.addEventListener("click", () => {
        if (calc) {
            calculate();
            screenNumber = "0";
            showScreenNumber(operand);
            calc = false
        }
        operator = btn.value;
    })
})

// swith theme event
themeSwitcher.addEventListener("change", toogleTheme);

// show default number on screen
showScreenNumber(screenNumber);