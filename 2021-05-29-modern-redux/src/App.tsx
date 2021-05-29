import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';

function App() {
  const [incrementValue, setIncrementValue] = useState(0);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  function handleIncrementByOne() {
    dispatch(incremented());
  }

  function handleIncrementByValue(value: number) {
    dispatch(amountAdded(value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <strong>count is: {count}</strong>
        </p>
        <div>
          <button onClick={handleIncrementByOne}>Increment by 1</button>
        </div>
        <div>
          <input
            type="number"
            placeholder="Set increment value"
            value={incrementValue}
            onChange={(e) => setIncrementValue(parseInt(e.target.value))}
          />
          <button onClick={() => handleIncrementByValue(incrementValue)}>
            Increment by {incrementValue}
          </button>
        </div>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
