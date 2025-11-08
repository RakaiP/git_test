


document.addEventListener('DOMContentLoaded', () => {
    updateDisplay('0');

    let currentInput = '';
    let previousInput = '';
    let operator = null;
    let lastOperator = null;
    let lastOperand = '';
    let shouldResetInput = false;

    const buttons = document.querySelectorAll('.calculator button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('digit')) {
                if (shouldResetInput) {
                    currentInput = value;
                    shouldResetInput = false;
                } else {
                    currentInput += value;
                }
                updateDisplay(currentInput);
            } else if (button.classList.contains('operator')) {
                if (currentInput) {
                    if (previousInput && operator) {
                        const result = calculate(previousInput, operator, currentInput);
                        previousInput = result;
                        updateDisplay(result);
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                }
            } else if (button.classList.contains('equals')) {
                if (operator && previousInput && currentInput) {
                    lastOperator = operator;
                    lastOperand = currentInput;
                    const result = calculate(previousInput, operator, currentInput);
                    updateDisplay(result);
                    previousInput = result;
                    currentInput = result;
                    operator = null;
                    shouldResetInput = true;
                } else if (lastOperator && lastOperand && currentInput) {
                    const result = calculate(currentInput, lastOperator, lastOperand);
                    updateDisplay(result);
                    previousInput = result;
                    currentInput = result;
                    shouldResetInput = true;
                }
            } else if (button.classList.contains('clear')) {
                currentInput = '';
                previousInput = '';
                operator = null;
                lastOperator = null;
                lastOperand = '';
                shouldResetInput = false;
                updateDisplay('0');
            }
        });
    });
});

function updateDisplay(value) {
    const display = document.querySelector('.display');
    display.textContent = value;
}

function calculate(num1, operator, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let result = 0;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = b !== 0 ? a / b : 'Error';
            break;
        default:
            return 'Error';
    }
    return result.toString();
}
