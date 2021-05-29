import React, { useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice';

function App() {
  const [incrementValue, setIncrementValue] = useState(0);
  const [dogsNumber, setDogsNumber] = useState(10);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data = [], isFetching } = useFetchBreedsQuery(dogsNumber);
  console.log({ data, isFetching });

  function handleIncrementByOne() {
    dispatch(incremented());
  }

  function handleIncrementByValue(value: number) {
    dispatch(amountAdded(value));
  }

  return (
    <div className="App">
      <header>
        <h1>Let's Learn Modern Redux!</h1>
      </header>
      <main>
        <section className="counter">
          <h2>Counter example</h2>
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
        </section>
        <section className="dogs">
          <h2>Dogs example</h2>
          <div>
            <p>Dogs to fetch</p>
            <select
              name="dogsNumber"
              id="dogsNumber"
              value={dogsNumber}
              onChange={(e) => setDogsNumber(parseInt(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          {isFetching ? (
            <p>Fetching dogs...</p>
          ) : (
            <>
              <p>Number of dogs fetched: {data.length}</p>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Picture</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((breed) => (
                    <tr key={breed.id}>
                      <td>{breed.name}</td>
                      <td>
                        <img
                          src={breed.image.url}
                          alt={breed.name}
                          height="250"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
