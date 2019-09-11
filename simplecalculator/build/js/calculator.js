/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var simpleCalculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

var inputDigit = function inputDigit(digit) {
    var displayValue = simpleCalculator.displayValue,
        waitingForSecondOperand = simpleCalculator.waitingForSecondOperand;


    if (waitingForSecondOperand === true) {
        simpleCalculator.displayValue = digit;
        simpleCalculator.waitingForSecondOperand = false;
    } else {
        simpleCalculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
};

var inputDecimal = function inputDecimal(dot) {
    if (simpleCalculator.waitingForSecondOperand === true) return;

    // If the `displayValue` does not contain a decimal point
    if (!simpleCalculator.displayValue.includes(dot)) {
        // Append the decimal point
        simpleCalculator.displayValue += dot;
    }
};

var handleOperator = function handleOperator(nextOperator) {
    var firstOperand = simpleCalculator.firstOperand,
        displayValue = simpleCalculator.displayValue,
        operator = simpleCalculator.operator;

    var inputValue = parseFloat(displayValue);

    if (operator && simpleCalculator.waitingForSecondOperand) {
        simpleCalculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        simpleCalculator.firstOperand = inputValue;
    } else if (operator) {
        var currentValue = firstOperand || 0;
        var result = calculateResult[operator](currentValue, inputValue);

        simpleCalculator.displayValue = String(result);
        simpleCalculator.firstOperand = result;
    }

    simpleCalculator.waitingForSecondOperand = true;
    simpleCalculator.operator = nextOperator;
};

var calculateResult = {
    '/': function _(firstOperand, secondOperand) {
        return firstOperand / secondOperand;
    },

    '*': function _(firstOperand, secondOperand) {
        return firstOperand * secondOperand;
    },

    '+': function _(firstOperand, secondOperand) {
        return firstOperand + secondOperand;
    },

    '-': function _(firstOperand, secondOperand) {
        return firstOperand - secondOperand;
    },

    '=': function _(firstOperand, secondOperand) {
        return secondOperand;
    }
};

var simpleCalculatorReset = function simpleCalculatorReset() {
    simpleCalculator.displayValue = '0';
    simpleCalculator.firstOperand = null;
    simpleCalculator.waitingForSecondOperand = false;
    simpleCalculator.operator = null;
};

var displayHandler = function displayHandler() {
    var display = document.querySelector('.simple-calculator-result');
    display.value = simpleCalculator.displayValue;
};

document.addEventListener('DOMContentLoaded', function () {
    displayHandler();

    var keys = document.querySelector('.key-buttons');
    keys.addEventListener('click', function (event) {
        var target = event.target;

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

    document.onkeydown = function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            document.querySelector('.reset').click();
            return false;
        }
        if (event.key === 'Backspace' || event.key === 'Delete') {
            var a = document.querySelector('.simple-calculator-result');
            var b = a.value;
            a.value = b.substring(0, b.length - 1);
            simpleCalculator.displayValue = a.value;
            console.log(simpleCalculator.displayValue);

            return false;
        }
    };

    document.addEventListener('keypress', function (event) {
        var all = document.getElementsByTagName('button');

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
}, false);

/***/ })
/******/ ]);