// THEME CHANGER

const body = document.querySelector('body');

const defaultSwitch = document.querySelector('.default-switch');
const lightSwitch = document.querySelector('.light-switch');
const darkSwitch = document.querySelector('.dark-switch');

const dot = document.querySelector('.dot');

function applyTheme(theme) {
  // Removing and adding theme class
  document.body.classList.remove('theme-default', 'theme-light', 'theme-dark');
  document.body.classList.add(theme);

  // Changing dot position
  if (theme === 'theme-default') {
    dot.style.left = '0';
  } else if (theme === 'theme-light') {
    dot.style.left = '100%';
  } else if (theme === 'theme-dark') {
    dot.style.left = '200%';
  }
  // Saving theme
  localStorage.setItem('selectedTheme', theme);
}

// Load saved theme if there is one
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
  applyTheme(savedTheme);
}

// Choosing theme
defaultSwitch.addEventListener('click', function () {
  applyTheme('theme-default');
});
lightSwitch.addEventListener('click', function () {
  applyTheme('theme-light');
});
darkSwitch.addEventListener('click', function () {
  applyTheme('theme-dark');
});

// MATH

const mainDisplay = document.querySelector('h2');
let secDisplay = document.querySelector('.display');

let currentNum = '';
let previousNums = '';

// Operation display
let operation = '';

// Button functions

// If current number is empty, display 0
function isEmpty() {
  if (currentNum === '') {
    mainDisplay.innerText = 0;
  }
}

// Adding number after clicking button, adding 0 only if it's not first value
function addNum(btn) {
  if (parseInt(btn) === 0 && currentNum === '') {
  } else {
    currentNum += btn;
    mainDisplay.innerText = currentNum;
  }
}

// Adding comma only if there is no othe comma in current number
function comma() {
  if (!currentNum.includes('.')) {
    currentNum += '.';
    mainDisplay.innerText = currentNum;
  }
}

function operate(btn) {
  if (
    (['+', '-', '*', '/'].includes(previousNums.slice(-2, -1)) &&
      currentNum === '') ||
    currentNum === 0
  ) {
    if (btn === 'x') {
      operation = '*';
      previousNums = previousNums.slice(0, -3);
      previousNums += ` ${operation} `;
      secDisplay.innerText = previousNums;
    } else {
      operation = btn;
      previousNums = previousNums.slice(0, -3);
      previousNums += ` ${operation} `;
      secDisplay.innerText = previousNums;
    }
  } else if (currentNum !== 0 && currentNum !== '') {
    previousNums += currentNum;
    previousNums = eval(previousNums);
    currentNum = '';

    if (btn === 'x') {
      operation = '*';
      previousNums += ` ${operation} `;
      secDisplay.innerText = previousNums;
    } else {
      operation = btn;
      previousNums += ` ${operation} `;
      secDisplay.innerText = previousNums;
    }

    mainDisplay.innerText = currentNum;
    isEmpty();
  }
}

function equals() {
  if (currentNum === '') {
    currentNum = 0;
  }

  previousNums += currentNum;
  currentNum = eval(previousNums);
  secDisplay.innerText = `${previousNums} =`;
  mainDisplay.innerText = currentNum;
  currentNum = currentNum.toString();
  previousNums = '';

  if (mainDisplay.innerText === 'Infinity') {
    reset();
    mainDisplay.innerText = 'Cannot divide by 0.';
  }

  smallerFont();
}

// Changing font size depending on current number length
function smallerFont() {
  if (mainDisplay.innerText.length > 17) {
    mainDisplay.style.fontSize = '1.55rem';
  } else if (mainDisplay.innerText.length > 13) {
    mainDisplay.style.fontSize = '1.85rem';
  } else if (mainDisplay.innerText.length < 17) {
    mainDisplay.style.fontSize = '3.3rem';
  } else if (mainDisplay.innerText.length < 13) {
    mainDisplay.style.fontSize = '1.85rem';
  }
}

// Reseting calculator
function reset() {
  previousNums = '';
  currentNum = '';
  secDisplay.innerText = '';
  isEmpty();
  smallerFont();
}

// Deleting last index of current number
function del() {
  currentNum = currentNum.slice(0, -1);
  mainDisplay.innerText = currentNum;
  isEmpty();
  smallerFont();
}

// Initializing button onclick events
const buttons = document.querySelectorAll('button');
for (let button of buttons) {
  let btn = button.innerText;
  button.addEventListener('click', function () {
    smallerFont();
    if (
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(btn)) &&
      mainDisplay.innerText.length < 20
    ) {
      addNum(btn);
    } else if (btn === '.') {
      comma();
    } else if (btn === 'RESET') {
      reset();
    } else if (btn === 'DEL') {
      del();
    } else if (['+', '-', 'x', '/'].includes(btn)) {
      operate(btn);
    } else if (btn === '=') {
      equals();
    }
  });
}
