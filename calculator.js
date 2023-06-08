//  TIME

const currentDate = new Date();
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();
document.querySelector(".time").innerHTML = `${currentHour}:${currentMinute}`;

//  KEY-PRESS-ANIMATE

let clickIn = (mouseIsDown = (id) => {
  id.style.opacity = "0.5";
});

let clickOut = (mouseIsUp = (id) => {
  id.style.opacity = "1";
});

//  SCREEN

let screen = "";
let lastOperator = "";

//  Screen-Character-Length

let myScreen = document.querySelector(".screen");
let character = 9;

myScreen.addEventListener("input", function () {
  let content = myScreen.innerText;
  if (content.length > character) {
    myScreen.innerText = content.slice(0, character);
  }
});

//  Input-Numbers

number = (value) => {
  if (screen === "0") {
    screen = value;
  } else {
    screen += value;
  }
  updateScreen();
};

//  Decimal-Function

decimal = () => {
  const numbers = screen.split(/[\+\-\*\/]/);
  const lastNumber = numbers[numbers.length - 1];
  if (!lastNumber.includes(".")) {
    screen += ".";
    updateScreen();
  }
};

//  Negative-Function

negative = () => {
  if (screen === "") {
    return;
  }
  if (screen.startsWith("-")) {
    screen = screen.slice(1);
  } else {
    screen = "-" + screen;
  }
  updateScreen();
};

//  Operator-Function

appendOperator = (operator) => {
  if (
    lastOperator === "" ||
    lastOperator === "=" ||
  ) {
    screen += operator;
    lastOperator = operator;
  } else if (!/[\+\-\*\/]$/.test(screen)) {
    screen += operator;
    lastOperator = operator;
  }  
  else {
    screen = screen.slice(0, -1) + operator;
    lastOperator = operator;
  }
  updateScreen();
};

//  Update-Screen-Function

updateScreen = () => {
  myScreen.innerText = screen;
  myScreen.dispatchEvent(new Event("input"));
};

//  AC-Function

allClear = () => {
  screen = "0";
  lastOperator = "";
  updateScreen();
};

//  Delete-Function

deleteItem = () => {
  if (screen === "0") {
    screen = screen.slice();
  } else {
    screen = screen.slice(0, -1);
    if (screen === "") {
      screen = "0";
    }
    updateScreen();
  }
};

//  Percentage-Function

percentage = () => {
  try {
    let percent = screen / 100;
    screen = percent;
    updateScreen();
  } catch (error) {
    screen = "Error";
    lastOperator = "";
    updateScreen();
  }
};

//  Equal-To-Function

equalTo = () => {
  try {
    const finalScreen = eval(screen);
    screen = finalScreen.toString();
    lastOperator = "=";
    updateScreen();
    if (screen.length >= 8) {
      screen = parseFloat(screen).toExponential(2);
      updateScreen();
    }
  } catch (error) {
    screen = "Error";
    lastOperator = "";
    updateScreen();
  }
};
