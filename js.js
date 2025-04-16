
let value1;
let operator;
let value2;
let result;


let displayValue = "";

let display = document.getElementById("display");
display.textContent = 0;



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

function Equation(equation) {
  
  this.x = equation.split(" ")[0],
  this.y = equation.split(" ")[2],
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



const allBtns = document.querySelectorAll("button");
let buttons = Array.from(allBtns);
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
      displayValue = displayValue + input.textContent;
      display.textContent =  displayValue;
      break;
    case "operands" :
      if (!input.classList.contains("equal")) {
      displayValue = displayValue + " " + input.textContent + " ";
      display.textContent = displayValue;
      }
      break;
    default:
      break;
    }

    if (input.classList.contains("clearBtn")) {
      displayValue = "";
      display.textContent = 0;
    }
    if (input.classList.contains("equal") && display.textContent.split(" ").length == 3) {
      let equation = new Equation(display);
      display = equation.operate;
    }


    // if (input.classList.contains("num")) {
    // displayValue = displayValue + input.textContent;
    // display.textContent =  displayValue;
    // } else if {
    //   displayValue = displayValue + " " + input.textContent + " ";
    //   display.textContent = displayValue;
    // }
}



// if (x === undefined) { 
//   if ( btns.classList.contains("numbers")) {
//     x = x + Number(btns.textContent);
//   } else if (operator === undefined) {continue;}
// } else if (operator === undefined) {
//   if ( btns.classList.contains("operands")) {
//     operator = btns.textContent;
//   }
// } else if (y === undefined) {
//   if ( btns.classList.contains("operands")) {
//     y = y + Number(btns.textContent);
//   }
// }
