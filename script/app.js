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

const output = document.querySelector('.output');
let display = document.querySelector('.display');
let operation = '';

// Output displays 0 on start
if (output.innerText === '') {
  output.innerText = '0';
}

const buttons = document.querySelectorAll('button');

for (let button of buttons) {
  let btn = button.innerText;
  let includesDot = false;

  button.addEventListener('click', function () {
    // If output is empty it shows 0
    if (output.innerText === '0') {
      output.innerText = '';
    }

    // Checks if there is already dot
    if (!output.innerText.includes('.')) {
      includesDot = false;
    } else {
      includesDot = true;
    }

    // Appending number
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(btn))) {
      output.append(btn);
      operation += btn;
      display.innerText = operation;
      // Adding dot but only when there is no other dot
    } else if (btn === '.' && !includesDot) {
      output.append(btn);
      includesDot = true;
      operation += '.';
      display.innerText = operation;
      // Reseting
    } else if (btn === 'RESET') {
      output.innerText = '0';
      operation = '';
      display.innerText = operation;
      // Deleting
    } else if (btn === 'DEL') {
      // If you delete everything, it displays 0
      if (output.innerText.length <= 1) {
        output.innerText = '0';
        operation = '';
        display.innerText = operation;
        // Deleting last character
      } else {
        output.innerText = output.innerText.slice(0, -1);
        operation = operation.slice(0, -1);
        display.innerText = operation;
      }
      // Operators
    } else if (['+', '-', '/'].includes(btn)) {
      output.innerText = '';
      operation += btn;
      display.innerText = operation;
    } else if (btn === 'x') {
      output.innerText = btn;
      operation += '*';
      display.innerText = operation;
    } else if (btn === '=') {
      operation = `${eval(operation)}`;
      output.innerText = `${eval(operation)}`;
      display.innerText = operation;
    }
  });
}
