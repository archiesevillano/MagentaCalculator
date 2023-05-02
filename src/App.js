import React from 'react';
import { useState } from 'react';
import './App.css';
import CalcButton from './components/Calculator Buttons/calcButton';
import WelcomeDialog from './components/Welcome Dialog/welcomeDialog';


function App() {
  const [inputs, setInputs] = useState("0");
  const [result, setResult] = useState("0");
  const [visibility, setVisibility] = useState(true);

  const handleWrite = (e) => {
    const btnValue = e.target.textContent;

    if ((!isNaN(Array.from(inputs).splice(-1)) && !isNaN(btnValue) || !isNaN(btnValue))) {

      if ((inputs.length == 1 && inputs == "0") || result == "" && !isNaN(Array.from(inputs).splice(-1))) {
        setInputs(btnValue);
        setResult(btnValue);
      }
      else {
        setInputs(inputs + btnValue);
        handleCalculate(inputs + btnValue);
      }

    }
    else {
      if (isNaN(Array.from(inputs).splice(-1))) {
        if (!(btnValue == Array.from(inputs).splice(-1))) {
          inputs.replace(Array.from(inputs).splice(-1), btnValue);
        }
      }
      else {
        if (inputs == "0") {
          if (isNaN(btnValue)) {
            if (btnValue == ".") {
              setInputs(btnValue);
            }
          }
          else {
            setInputs(inputs + btnValue);
          }
        }
        else {
          setInputs(inputs + btnValue);
        }
      }
    }

  }

  const handleCalculate = calc => {
    const ops = ["+", "−", "×", "÷", "%"];
    const opsCalc = ["+", "-", "*", "/", "%"];

    let inputCopy = calc;

    ops.forEach((operator, index) => {
      inputCopy = inputCopy.replaceAll(operator, opsCalc[index]);
    });

    try {
      const res = eval(inputCopy);
      setResult(res);

    } catch (err) {
      if (!err.toString().includes("SyntaxError: Unexpected end of input")) {
        console.log(err);
      }
    }
  }

  const buttonDigits = () => {
    const buttons = [];

    for (let i = 1; i < 10; i++) {
      buttons.push(
        <CalcButton key={`button${i}`} textContent={i.toString()} value={i} action={handleWrite}></CalcButton>
      )
    }

    return buttons;
  }

  const buttonOperators = () => {
    const operatorButtons = [];
    const ops = [
      <span>&#43;</span>,
      <span>&minus;</span>,
      <span>&times;</span>,
      <span>&divide;</span>,
      <span style={{ fontSize: 28, }}>&#37;</span>,
    ];

    ops.forEach((op, index) => {
      operatorButtons.push(
        <CalcButton key={`button${index}`} textContent={op} action={handleWrite}></CalcButton>
      )
    });

    return operatorButtons;
  }

  const handleBackSpc = () => {

    if (!(inputs == "0")) {

      if (inputs.length == 1 && inputs == "0") {
        setInputs(inputs);
        setResult(inputs);
      }
      else if (inputs.length == 1 && inputs != "0") {
        setInputs("0");
        setResult("0");
      }
      else {
        setInputs(inputs.substring(0, inputs.length - 1));
      }

    }

  }

  const handleToInteger = () => {
    if (inputs == "0") {
      setInputs('-');
    }
    else {
      setInputs(inputs + '-');
    }
  }

  const handleClearAll = () => {
    setInputs("0");
    setResult("0");
  }

  const handleEqual = () => {
    if (result !== "") {
      setResult("");
      setInputs(result);
    }
  }

  setTimeout(() => {
    setVisibility(false);
  }, 5000);

  return (
    <div className="App">

      {visibility && <WelcomeDialog />}

      {!visibility && <main className="calculator">
        <header className="calculator-header">
          <img className="magenta-logo" src="./magenta/Magenta Logo with background.svg"></img>
          <div className="field">
            <p id="result">{result}</p>
            <p id="userInputs">{inputs}</p>
          </div>
        </header>
        <section className="button-collections">
          <section className="button-group-left">
            <div className="btn-upper-group">
              <section className="extra-btns">
                <CalcButton key="clearAllBtn" textContent="C" action={handleClearAll}></CalcButton>
                <CalcButton key="unknown" textContent={<i className="fa-solid fa-plus-minus fa-xs"></i>} action={handleToInteger}></CalcButton>
                <CalcButton key="backspc" textContent={<i className="fa-solid fa-delete-left fa-xs"></i>} action={handleBackSpc}></CalcButton>
              </section>
              <section className="digit-btns">
                {buttonDigits()}
              </section>
            </div>
            <div className="btn-lower-group">
              <CalcButton id="buttonVal0" textContent="0" value="0" action={handleWrite}></CalcButton>
              <CalcButton id="periodVal" textContent="." value="." action={handleWrite}></CalcButton>
              <CalcButton id="equalBtn" textContent="=" value="=" action={handleEqual}></CalcButton>
            </div>
          </section>
          <div className="operator-btns">
            {buttonOperators()}
          </div>
        </section>
      </main>}
    </div>
  );
}

export default App;
