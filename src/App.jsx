// @ts-nocheck
import React, { useState } from 'react'

export function App() {
  const [display, setDisplay] = useState(['0']);
  const [equation, setEquation] = useState([])
  const [lastTotal, setLastTotal] = useState(null)

  function handleNumClick(event) {
    // OPERATION: If the user has entered a number before, or starts their input with a '.',
    // or enters a '.' after entering numbers for a decimal/float input
    if (!isNaN(equation[equation.length - 1]) || event.target.innerText === '.' || equation[equation.length - 1] === '.') {
      // setting the input to the display and equation keeping the previous state
      setDisplay([...display, event.target.innerText])
      setEquation([...equation, event.target.innerText])
    } else {
      // else: this is the users second input and clear the display with the new input, and set
      // the equation with the second input
      setDisplay(event.target.innerText)
      setEquation([...equation, event.target.innerText])
    }
  }

  function handleOperationClick(event) {
    switch (event.target.innerText) {
      case '±':
        // OPERATION: convert the first input into abs(input)
        setDisplay(['-', ...display])
        setEquation(['-', ...equation])
        break;
      case '%':
        // OPERATION: convert the first input into input/100
        setDisplay((Number(equation.join('')) / 100).toString())
        setEquation((Number(equation.join('')) / 100).toString())
        break;
      default:
        // DEFAULT OPERATION: apply an arithmetic operation to the first input
        // IF the display has not been cleared and there is a lastTotal add the lastTotal to the equation
        display && lastTotal ? setEquation([...equation, lastTotal, event.target.innerText]) : setEquation([...equation, event.target.innerText])
        break;
    }
  }

  function handleEquation() {
    let total = 0;
    for (let i = 0; i < equation.length - 1; i++) {
      switch (equation[i]) {
        case '+':
          equation.length === 2 ?
            total += (Number(equation[i - 1]) + Number(equation[i + 1]))
            : total += (Number(equation.slice(0, i).join('')) + Number(equation.slice(i + 1).join('')))
          break;
        case '−':
          equation.length === 2 ?
            total += (Number(equation[i - 1]) - Number(equation[i + 1]))
            : total += (Number(equation.slice(0, i).join('')) - Number(equation.slice(i + 1).join('')))
          break;
        case '÷':
          equation.length === 2 ?
            total += (Number(equation[i - 1]) / Number(equation[i + 1]))
            : total += (Number(equation.slice(0, i).join('')) / Number(equation.slice(i + 1).join('')))
          break;
        case '×':
          equation.length === 2 ?
            total += (Number(equation[i - 1]) * Number(equation[i + 1]))
            : total += (Number(equation.slice(0, i).join('')) * Number(equation.slice(i + 1).join('')))
          break;
      }
    }
    setDisplay(total)
    setEquation([])
    setLastTotal(total)
  }

  function handleAllClear() {
    setDisplay(['0'])
    setEquation([])
  }

  return (
    <main>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button className="button fn" onClick={handleAllClear}>AC</button>
          <button className="button fn" onClick={handleOperationClick}>&plusmn;</button>
          <button className="button fn" onClick={handleOperationClick}>%</button>
          <button className="button op" onClick={handleOperationClick}>&divide;</button>
          <button className="button" onClick={handleNumClick}>7</button>
          <button className="button" onClick={handleNumClick}>8</button>
          <button className="button" onClick={handleNumClick}>9</button>
          <button className="button op" onClick={handleOperationClick}>&times;</button>
          <button className="button" onClick={handleNumClick}>4</button>
          <button className="button" onClick={handleNumClick}>5</button>
          <button className="button" onClick={handleNumClick}>6</button>
          <button className="button op" onClick={handleOperationClick}>&minus;</button>
          <button className="button" onClick={handleNumClick}>1</button>
          <button className="button" onClick={handleNumClick}>2</button>
          <button className="button" onClick={handleNumClick}>3</button>
          <button className="button op" onClick={handleOperationClick}>+</button>
          <button className="button x2" onClick={handleNumClick}>0</button>
          <button className="button" onClick={handleNumClick}>.</button>
          <button className="button op" onClick={handleEquation}>=</button>
        </div>
      </div>
    </main>
  )
}
