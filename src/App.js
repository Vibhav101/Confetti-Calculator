import './App.css';
import React, { useState } from 'react';
import * as math from 'mathjs';
import Confetti from 'react-confetti';

const buttons = [
  { value: '(', className: '' },
  { value: ')', className: '' },
  { value: 'mc', className: '' },
  { value: 'm+', className: '' },
  { value: 'm-', className: '' },
  { value: 'mr', className: '' },
  { value: 'C', className: '' },
  { value: '+/-', className: '' },
  { value: '%', className: '' },
  { value: '/', className: 'orange' },
  { value: '2nd', className: '' },
  { value: 'x^2', className: '' },
  { value: 'x^3', className: '' },
  { value: 'x^y', className: '' },
  { value: 'e^X', className: '' },
  { value: '10^X', className: '' },
  { value: '7', className: 'num' },
  { value: '8', className: 'num' },
  { value: '9', className: 'num' },
  { value: '*', className: 'orange' },
  { value: '1/x', className: '' },
  { value: '2√x', className: '' },
  { value: '3√x', className: '' },
  { value: 'y√x', className: '' },
  { value: 'ln', className: '' },
  { value: 'log10', className: '' },
  { value: '4', className: 'num' },
  { value: '5', className: 'num' },
  { value: '6', className: 'num' },
  { value: '-', className: 'orange' },
  { value: 'x!', className: '' },
  { value: 'sin', className: '' },
  { value: 'cos', className: '' },
  { value: 'tan', className: '' },
  { value: 'e', className: '' },
  { value: 'EE', className: '' },
  { value: '1', className: 'num' },
  { value: '2', className: 'num' },
  { value: '3', className: 'num' },
  { value: '+', className: 'orange' },
  { value: 'Rad', className: '' },
  { value: 'sinh', className: '' },
  { value: 'cosh', className: '' },
  { value: 'tanh', className: '' },
  { value: 'π', className: '' },
  { value: 'Rand', className: '' },
  { value: '0', className: 'zero num' },
  { value: '.', className: 'num' },
  { value: '=', className: 'orange equal-button' },
];

const inverseTrigMapping = {
  'sin': 'asin',
  'cos': 'acos',
  'tan': 'atan',
  'sinh': 'asinh',
  'cosh': 'acosh',
  'tanh': 'atanh',
};

function App() {
  const [value, setValue] = useState('');
  const [memory, setMemory] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isSecondFunction, setIsSecondFunction] = useState(false);
  const [isRadians, setIsRadians] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleRadians = () => setIsRadians(prev => !prev);
  const toggleSecondFunction = () => setIsSecondFunction(prev => !prev);

  const degToRad = (degrees) => degrees * (Math.PI / 180);
  const radToDeg = (radians) => radians * (180 / Math.PI);

  const handleButtonClick = (e) => {
    const buttonValue = e.target.value;
    try {
      switch (buttonValue) {
        case 'C':
          setValue('');
          break;
        case '=':
          setValue(math.evaluate(value).toString());
          if (value.includes('5') && value.includes('6')) {
            setShowConfetti(true);
          }
          else {
            setShowConfetti(false);
          }
          break;
        case 'mc':
          setMemory(null);
          break;
        case 'm+':
          setMemory((memory || 0) + parseFloat(value));
          setValue('');
          break;
        case 'm-':
          setMemory((memory || 0) - parseFloat(value));
          setValue('');
          break;
        case 'mr':
          if (memory !== null) {
            setValue(memory.toString());
          }
          break;
        case '2nd':
          toggleSecondFunction();
          break;
        case 'x^2':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`${prev}^2`).toString());
          break;
        case 'x^3':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`${prev}^3`).toString());
          break;
        case 'x^y':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => `${prev}^`);
          break;
        case 'e^X':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`e^(${prev})`).toString());
          break;
        case '10^X':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`10^(${prev})`).toString());
          break;
        case '1/x':
          if (value === '' || parseFloat(value) === 0) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`1/(${prev})`).toString());
          break;
        case '2√x':
          if (value === '' || parseFloat(value) < 0) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`sqrt(${prev})`).toString());
          break;
        case '3√x':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`cbrt(${prev})`).toString());
          break;
        case 'y√x':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => `${prev}^(1/${prev})`);
          break;
        case 'ln':
          if (value === '' || parseFloat(value) <= 0 || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`log(${prev}, e)`).toString());
          break;
        case 'log10':
          if (value === '' || parseFloat(value) <= 0 || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`log10(${prev})`).toString());
          break;
        case 'x!':
          if (value === '' || parseFloat(value) < 0 || !Number.isInteger(parseFloat(value)) || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          setValue(prev => math.evaluate(`factorial(${prev})`).toString());
          break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'sinh':
        case 'cosh':
        case 'tanh':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          if (isRadians) {
            setValue(prev => math.evaluate(`${buttonValue}(${prev})`).toString());
          } else {
            const radiansValue = degToRad(parseFloat(value));
            setValue(math.evaluate(`${buttonValue}(${radiansValue})`).toString());
          }
          break;
        case 'asin':
        case 'acos':
        case 'atan':
        case 'asinh':
        case 'acosh':
        case 'atanh':
          if (value === '' || value == Error('Invalid Input')) {
            throw new Error('Invalid Input');
          }
          const mappedFunction = inverseTrigMapping[buttonValue];
          const result = math.evaluate(`${mappedFunction}(${value})`);
          setValue(isRadians ? result.toString() : radToDeg(result).toString());
          break;
        case 'Rad':
          toggleRadians();
          break;
        case 'π':
          setValue(prev => `${prev}${math.pi}`);
          break;
        case 'e':
          setValue(prev => `${prev}${math.e}`);
          break;
        case '+/-':
          setValue(prev => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
          break;
        case 'EE':
          setValue(prev => `${prev}e`);
          break;
        case 'Rand':
          setValue(Math.random().toString());
          break;
        default:
          setValue(prev => prev + buttonValue);
          break;
      }
    } catch (error) {
      setValue('Error: ' + error.message);
    }
  };  

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`container ${theme}`}>
      <div className="theme-toggle">
        <button className="theme-button" onClick={toggleTheme}>
          {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
        </button>
      </div>
      <div className="calculator">
        {showConfetti && <Confetti />}
        <div className="display">
          <div className="mode-indicator">
            {isRadians ? 'RAD' : ''}
          </div>
          <input type="text" value={value} readOnly />
        </div>
        <div className="button-grid">
          {buttons.map((button) => (
            <input
              key={button.value}
              type="button"
              value={isSecondFunction && inverseTrigMapping[button.value] ? inverseTrigMapping[button.value] : button.value}
              className={`button ${button.className}`}
              onClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
