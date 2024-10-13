"use client";

import { useState } from "react";
import Style from './page.module.css';

type displayResultType = {
  temperature: number;
  result: string;
};

export default function Main() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [unit, setUnit] = useState<string>('Celsius');
  const [displayResult, setDisplayResult] = useState<displayResultType[]>([]);
  const [error, setError] = useState('');

  const btnHandler = () => {
    if (temperature === null || isNaN(temperature)) {
      setError("Enter A valid Value");
      setTimeout(() => setError(''), 2000);
      return;
    }

    let result = "";

    if (unit === "Celsius") {
      const celsius = temperature + 273.15;
      result = `Celsius: ${celsius.toFixed(2)}`;
    } else if (unit === "Kelvin") {
      const kelvin = temperature - 273.15;
      result = `Kelvin: ${kelvin.toFixed(2)}`;
    } else if (unit === "Fahrenheit") {
      const fahrenheit = (temperature * 9 / 5) + 32;
      result = `Fahrenheit: ${fahrenheit.toFixed(2)}`;
    } else {
      return;
    }

    setDisplayResult(prevResults => [
      ...prevResults,
      { temperature, result }
    ]);

    setTemperature(null);
    setError('');
  }

  return (
    <div className="container">
      <input
        className={Style.userInp}
        type="text"
        placeholder="Enter Temperature"
        value={temperature !== null ? temperature : ''}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          setTemperature(isNaN(value) ? null : value);
          setError('');
        }}
      />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className={Style.select}
      >
        <option value="Celsius">Celsius</option>
        <option value="Kelvin">Kelvin</option>
        <option value="Fahrenheit">Fahrenheit</option>
      </select>
      <button onClick={btnHandler} className={Style.button}>Calculate</button>
      {error && <p className={Style.error}>{error}</p>}
      {displayResult.map((item, index) => (
        <p key={index} className="result">{`${item.result}`}</p>
      ))}
    </div>
  );
}
