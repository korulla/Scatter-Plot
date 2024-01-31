import React, { useState } from 'react';
import { ScatterData } from '../data';

interface Props {
  onDataAdd: (data: ScatterData) => void;
}

const DataInput: React.FC<Props> = ({ onDataAdd }) => {
  const [temperature, setTemperature] = useState<number>(0);
  const [iceCreamSales, setIceCreamSales] = useState<number>(0);

  const handleAddData = () => {
    if (temperature !== 0 && iceCreamSales !== 0) {
      const newData: ScatterData = { temperature, iceCreamSales };
      onDataAdd(newData);
      setTemperature(0);
      setIceCreamSales(0);
    }
  };

  return (
    <div>
      <label>
        Temperature:
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(parseInt(e.target.value))}
        />
      </label>
      <label>
        Ice Cream Sales:
        <input
          type="number"
          value={iceCreamSales}
          onChange={(e) => setIceCreamSales(parseInt(e.target.value))}
        />
      </label>
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
};

export default DataInput;
