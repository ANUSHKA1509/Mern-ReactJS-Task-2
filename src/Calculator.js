import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayUpper: '',
      displayLower: '', // Initialize lower display as an empty string
      currentInput: '',
      prevInput: '',
      operator: null,
      afterEquals: false,
    };
  }

  handleDigit = (digit) => {
    this.setState((prevState) => {
      
      if (prevState.afterEquals) return {};

      return {
        currentInput: prevState.currentInput + digit,
        displayUpper: prevState.displayUpper + digit,
      };
    });
  };

  handleOperator = (operator) => {
    this.setState((prevState) => {
      let { prevInput, currentInput, operator: prevOperator } = prevState;
      let result;
  
      if (prevOperator) {
        const num1 = parseFloat(prevInput);
        const num2 = parseFloat(currentInput);
  
        if (prevOperator === '+') {
          result = num1 + num2;
        } else if (prevOperator === '-') {
          result = num1 - num2;
        } else if (prevOperator === '*') {
          result = num1 * num2;
        } else if (prevOperator === '/') {
          result = num1 / num2;
        }
  
        prevInput = result.toString();
      } else if (currentInput !== '') {
        prevInput = currentInput;
      }
  
      return {
        prevInput: prevInput,
        currentInput: '',
        operator: operator,
        displayUpper: prevState.displayUpper + ' ' + operator + ' ',
        afterEquals: false, 
      };
    });
  };
  

  handleEqual = () => {
    const { prevInput, currentInput, operator } = this.state;
    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(currentInput);
  
    let result;
    if (operator === '+') {
      result = num1 + num2;
    } else if (operator === '-') {
      result = num1 - num2;
    } else if (operator === '*') {
      result = num1 * num2;
    } else if (operator === '/') {
      result = num1 / num2;
    }
  
    const expression = `${prevInput} ${operator} ${currentInput}`;
  
    this.setState({
      displayUpper: expression,
      displayLower: result.toString(),
      currentInput: '',
      prevInput: result.toString(),
      operator: null,
      afterEquals: true, // Set afterEquals to true when equals is pressed
    });
  };
  
  handleClear = () => {
    this.setState({
      displayUpper: '',
      displayLower: '', // Clear lower display as well
      currentInput: '',
      prevInput: '',
      operator: null,
    });
  };

  handleBackspace = () => {
    this.setState((prevState) => {
      const currentInput = prevState.currentInput;
      const updatedInput = currentInput.slice(0, -1);
      return {
        currentInput: updatedInput,
        displayUpper: prevState.displayUpper.slice(0, -1),
      };
    });
  };

  render() {
    return (
    <div>
        <h1 style={{textAlign: "center"}}>ReactJS Task - 2</h1>
          <br/><br/>
    
      <div className="calculator-container">
        <div className="display">{this.state.displayUpper}</div>
        <div className="display">{this.state.displayLower}</div>
        <div className="button-row">
          <button className="button clear" onClick={this.handleClear}>C</button>
          <button className="button backspace" onClick={this.handleBackspace}>⌫</button>
          <button className="button percent" onClick={() => this.handleOperator('%')}>%</button>
          <button className="button operator" onClick={() => this.handleOperator('/')}>÷</button>
        </div>
        <div className="button-row">
          <button className="button number" onClick={() => this.handleDigit('7')}>7</button>
          <button className="button number" onClick={() => this.handleDigit('8')}>8</button>
          <button className="button number" onClick={() => this.handleDigit('9')}>9</button>
          <button className="button operator" onClick={() => this.handleOperator('*')}>×</button>
        </div>
        <div className="button-row">
          <button className="button number" onClick={() => this.handleDigit('4')}>4</button>
          <button className="button number" onClick={() => this.handleDigit('5')}>5</button>
          <button className="button number" onClick={() => this.handleDigit('6')}>6</button>
          <button className="button operator" onClick={() => this.handleOperator('-')}>-</button>
        </div>
        <div className="button-row">
          <button className="button number" onClick={() => this.handleDigit('1')}>1</button>
          <button className="button number" onClick={() => this.handleDigit('2')}>2</button>
          <button className="button number" onClick={() => this.handleDigit('3')}>3</button>
          <button className="button operator" onClick={() => this.handleOperator('+')}>+</button>
        </div>
        <div className="button-row">
          <button className="button number" onClick={() => this.handleDigit('00')}>00</button>
          <button className="button number" onClick={() => this.handleDigit('0')}>0</button>
          <button className="button number" onClick={() => this.handleDigit('.')}>.</button>
          <button className="button equal" onClick={this.handleEqual}>=</button>
        </div>
      </div>
      </div>
    );
  }
}

export default Calculator;
