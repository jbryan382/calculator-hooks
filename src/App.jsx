// @ts-nocheck
import React, { useState } from 'react'

export function App() {
  const [display, setDisplay] = useState(['0']);
  const [equation, setEquation] = useState([])
  // const [operator, setOperator] = useState('');

  function handleNumClick(event) {
    if (equation[equation.length - 1] !== '.' && !isNaN(equation[equation.length - 1])) {
      setDisplay([...display, event.target.innerText])
      setEquation([...equation, event.target.innerText])
    } else {
      setDisplay(event.target.innerText)
      setEquation([...equation, event.target.innerText])
    }
  }

  function handleOperationClick(event) {
    setEquation([...equation, event.target.innerText])
  }

  function handleEquation() {
    let total = 0;
    for (let i = 0; i < equation.length - 1; i++) {
      switch (equation[i]) {
        case '÷':
          equation.length === 2 ?
            total += (Number(equation[i - 1]) / Number(equation[i + 1]))
            : total += (Number(equation.slice(0, i - 1).join('')) / Number(equation.slice(i + 1).join('')))
          break;
      }
    }
    console.log(total)
    setDisplay(total)
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
