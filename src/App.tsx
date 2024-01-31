import React, { useState } from 'react';
import ScatterPlot from './Components/ScatterPlot';
import { scatterPlotData, ScatterData } from './data';
import DataInput from './Components/DataInput';

const App: React.FC = () => {
  const [data, setData] = useState<ScatterData[]>(scatterPlotData);

  const handleDataAdd = (newData: ScatterData) => {
    setData(prevData => [...prevData, newData]);
  };

  return (
    <div>
      <h1>Scatter Plot</h1>
      <ScatterPlot data={data} />
      <DataInput onDataAdd={handleDataAdd} />
    </div>
  );
};

export default App;