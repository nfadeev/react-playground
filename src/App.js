import React, { useState } from 'react';
import './App.css';
import { DonutChart } from './components/donut-chart';

function App() {
  const [data, setData] = useState([
    { color: "red", value: 1 },
    { color: "green", value: 1 },
    { color: "blue", value: 1 },
  ]);
  return (
    <div className="label">
      <DonutChart data={data} />
      <button onClick={() => increment(0)}> Red </button>
      <button onClick={() => increment(1)}> Green </button>
      <button onClick={() => increment(2)}> Blue </button>
    </div>
  );

  function increment(index) {
    data[index].value += 1;
    setData(data.slice());
  }  
}

export default App;
