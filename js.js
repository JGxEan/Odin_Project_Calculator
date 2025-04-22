/* JS for calculator web app */

/* displayValue exists as a separate string to be updated independently 
   for chaining calculations. So if you had 2 + 2 = 4, displayValue can
   store the '4' for the next equation. */
let displayValue = "";
let justSolved = false;

let display = document.getElementById("display");
display.textContent = 0;


// calc functions
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(x, y, operator) {
  return operator(x, y);
}

// create an equation object for calculations
function Equation(equation) {

  this.x = +equation.split(" ")[0],
  this.y = +equation.split(" ")[2],
  this.operator = equation.split(" ")[1],

  
  this.operate = function () {
    switch(this.operator) {
      case "+":
        return add(this.x, this.y);
      case "-":
        return subtract(this.x, this.y);
      case "*":
        return multiply(this.x, this.y);
      case "/":
        return divide(this.x, this.y);
      default:
        break;
    }
    
  }
}


/* saves all button element nodes to a node list, copies the reference 
   to an array, and then maps through it with the clicker function. */
const allBtns = document.querySelectorAll("button");
const buttons = Array.from(allBtns);
buttons.map(clicker);


function clicker(button) {
  button.addEventListener("click", () => {
    updateScreen(button)
  });
}

function updateScreen(input) {
    let className = input.parentNode.className;

    switch(className) {
    case "numbers" :
      if (!justSolved){
        displayValue = displayValue + input.textContent;
      }
      break;
    case "operands" : //prevents multiple operands
      if (!input.classList.contains("equal") && 
      (Number(displayValue.slice(-1)) || Number(displayValue.slice(-1)) == 0)) {
        if (displayValue.match(" ") == null) {
          displayValue = displayValue + " " + input.textContent + " ";
          justSolved = false;
        }
      }
      break;
    default:
      break;
    }

 

    if (input.classList.contains("clearBtn")) {
      displayValue = "";
      display.textContent = 0;
      justSolved = false;
    } else if (input.classList.contains("equal") && display.textContent.split(" ").length == 3) {
      solver();
    } else if (displayValue != "") { display.textContent = displayValue; }
}

// creates an equation object and stores the result 
function solver() {
  let equation = new Equation(display.textContent);
  display.textContent = equation.operate();

  displayValue = display.textContent;
  justSolved = true;
}
