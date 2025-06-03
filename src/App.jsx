import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function tokenize(expr) {
  return expr
    .replace(/x/g, '*')
    .replace(/\s+/g, '')
    .match(/(\d+\.?\d*|\.\d+|[()+\-*/])/g);
}

function infixToPostfix(tokens) {
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  const output = [];
  const operators = [];

  for (const token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else if ('+-*/'.includes(token)) {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        output.push(operators.pop());
      }
      operators.pop(); // Discard the '('
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  const stack = [];

  for (const token of postfix) {
    console.log("current stack: ", stack);

    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop() || 0;
      const a = stack.pop() || 0;


      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  }

  return stack[0];
}


function App() {
  const [input, setInput] = useState("0")

  function onEquals() {
    const ans = evaluatePostfix(infixToPostfix(tokenize(input))).toString();

    setInput(ans);
  }

  function onNumber(ev) {
    setInput(function (i) {
      if (i == 0) {
        return ev.target.value
      }
      return i + ev.target.value
    })
  }

  function onAllDelete() {
    setInput("0")
  }

  function onDelete() {
    if (input == 0) { return }
    if (input.length == 1) { setInput("0"); return }
    if (input == "Infinity" || input == "-Infinity" || input == "NaN") {setInput("0"); return}
    setInput((i) => i.slice(0, -1))
  }

  function onOperator(ev) {
    const operator = input.charAt(input.length - 1)
    if (operator == "+" || operator == "-" || operator == "x" || operator == "/") {
      return
    }

    if (input == "0") {
        if (ev.target.value == "-") {
            setInput("-")
        }

        return;
    }

    setInput((i) => i + ev.target.value)
  }

  function onDecimal() {
    const operation1 = input.lastIndexOf("+")
    const operation2 = input.lastIndexOf("-")
    const operation3 = input.lastIndexOf("x")
    const operation4 = input.lastIndexOf("/")


    const point = input.substring(Math.max(operation1, operation2, operation3, operation4)).includes(".")
    if (point) {
      return
    }

    setInput((i) => i + ".")
  }

  return (
    <>
      <div id="display-container">{input}</div>
      <div id="buttons">
        <button id="allclear" onClick={onAllDelete}> AC </button>
        <button id="clear" onClick={onDelete}> C </button>
        <button id="decimal" value="." onClick={onDecimal}> . </button>
        <button id="seven" value="7" onClick={onNumber}> 7 </button>
        <button id="eight" value="8" onClick={onNumber}> 8 </button>
        <button id="nine" value="9" onClick={onNumber}> 9 </button>
        <button id="four" value="4" onClick={onNumber}> 4 </button>
        <button id="five" value="5" onClick={onNumber}> 5 </button>
        <button id="six" value="6" onClick={onNumber}> 6 </button>
        <button id="equals" onClick={onEquals}>=</button>
        <button id="zero" value="0" onClick={onNumber}> 0 </button>
        <button id="one" value="1" onClick={onNumber}> 1 </button>
        <button id="two" value="2" onClick={onNumber}> 2 </button>
        <button id="three" value="3" onClick={onNumber}> 3 </button>
        <button id="add" value="+" onClick={onOperator}> + </button>
        <button id="minus" value="-" onClick={onOperator}> - </button>
        <button id="multiply" value="x" onClick={onOperator}> x </button>
        <button id="divide" value="/" onClick={onOperator}> / </button>
      </div>
    </>
  )
}

export default App
