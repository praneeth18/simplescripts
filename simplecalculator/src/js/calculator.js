//MAIN OBJ
const simpleCalculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

//DIGIT INPUT
const inputDigit = digit => {
    const { displayValue, waitingForSecondOperand } = simpleCalculator;

    if (waitingForSecondOperand === true) {
        simpleCalculator.displayValue = digit;
        simpleCalculator.waitingForSecondOperand = false;
    } else {
        simpleCalculator.displayValue =
            displayValue === '0' ? digit : displayValue + digit;
    }
};

//DECIMAL INPUT
const inputDecimal = dot => {
    if (simpleCalculator.waitingForSecondOperand === true) return;

    // If the `displayValue` does not contain a decimal point
    if (!simpleCalculator.displayValue.includes(dot)) {
        // Append the decimal point
        simpleCalculator.displayValue += dot;
    }
};

//Operator Method
const handleOperator = nextOperator => {
    const { firstOperand, displayValue, operator } = simpleCalculator;
    const inputValue = parseFloat(displayValue);

    if (operator && simpleCalculator.waitingForSecondOperand) {
        simpleCalculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        simpleCalculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = calculateResult[operator](currentValue, inputValue);

        simpleCalculator.displayValue = String(result);
        simpleCalculator.firstOperand = result;
    }

    simpleCalculator.waitingForSecondOperand = true;
    simpleCalculator.operator = nextOperator;
};

//CALCULATION
const calculateResult = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
};

//RESET
const simpleCalculatorReset = () => {
    simpleCalculator.displayValue = '0';
    simpleCalculator.firstOperand = null;
    simpleCalculator.waitingForSecondOperand = false;
    simpleCalculator.operator = null;
};

//HANDLE DISPLAY
const displayHandler = () => {
    const display = document.querySelector('.simple-calculator-result');
    display.value = simpleCalculator.displayValue;
};

//ON READY
document.addEventListener(
    'DOMContentLoaded',
    function() {
        //INITIATE
        displayHandler();

        // FOR KEY CLICK METHODS
        const keys = document.querySelector('.key-buttons');
        keys.addEventListener('click', event => {
            const { target } = event;
            if (!target.matches('button')) {
                return;
            }

            if (target.classList.contains('symbol')) {
                handleOperator(target.value);
                displayHandler();
                return;
            }

            if (target.classList.contains('dot')) {
                inputDecimal(target.value);
                displayHandler();
                return;
            }

            if (target.classList.contains('reset')) {
                simpleCalculatorReset();
                displayHandler();
                return;
            }

            inputDigit(target.value);
            displayHandler();
        });

        //// FOR ESCAPE AND DELETE HANDLING
        document.onkeydown = function(event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                document.querySelector('.reset').click();
                return false;
            }
            if (event.key === 'Backspace' || event.key === 'Delete') {
                let a = document.querySelector('.simple-calculator-result');
                let b = a.value;
                a.value = b.substring(0, b.length - 1);
                simpleCalculator.displayValue = a.value;
                console.log(simpleCalculator.displayValue);

                return false;
            }
        };

        //// FOR KEY PRESS
        document.addEventListener('keypress', function(event) {
            const all = document.getElementsByTagName('button');

            if (event.key === 'Escape' || event.key === 'Esc') {
                document.querySelector('.reset').click();
                return false;
            }
            for (var i = 0, max = all.length; i < max; i++) {
                if (event.keyCode == all[i].dataset.key) {
                    all[i].click();
                } else if (event.keyCode == 13) {
                    document.querySelector('.equal-to').click();
                }
            }
        });
    },
    false
);
