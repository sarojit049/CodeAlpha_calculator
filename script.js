let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (num === '.' && currentInput.includes('.')) return;
    currentInput = (currentInput === '0' && num !== '.') ? num : currentInput + num;
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    if (operator === '+') result = prev + current;
    else if (operator === '-') result = prev - current;
    else if (operator === '*') result = prev * current;
    else if (operator === '/') {
        if (current === 0) { alert("Can't do that!"); return; }
        result = prev / current;
    }

    currentInput = Math.round(result * 100000000) / 100000000 + '';
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

// Handles typing on your physical keyboard
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearDisplay();
});