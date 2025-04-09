import React, { useState } from "react";
import { FaBackspace } from "react-icons/fa";

import "./Calc.css";

const Calculator = () => {
  const [data, setData] = useState("");
  const [history, setHistory] = useState("");

  // console.log(data);
  //   console.log(history);

  const getValue = (event) => {
    setData(data.concat(event.target.value));
  };
  const handleBack = () => {
    setData(data.slice(0, -1));
  };
  const handleClear = () => {
    setData("");
  };
  const calculate = () => {
    setHistory([...history, data]);
    setData(eval(data).toString());
  };

  const add = (calc) => {
    setData(calc);
    setHistory(history.filter((item) => item !== calc));
  };

  return (
    <div className="calc d-flex gap-5">
      <div className="calculator">
        <input type="text" className="display" value={data} readOnly />
        <div className="buttons">
          <button className="clear" onClick={handleClear}>
            C
          </button>
          <button onClick={handleBack}>
            <FaBackspace />
          </button>
          <button value="%" onClick={getValue}>
            %
          </button>
          <button value="/" onClick={getValue}>
            /
          </button>
          <button value="7" onClick={getValue}>
            7
          </button>
          <button value="8" onClick={getValue}>
            8
          </button>
          <button value="9" onClick={getValue}>
            9
          </button>
          <button value="*" onClick={getValue}>
            *
          </button>
          <button value="4" onClick={getValue}>
            4
          </button>
          <button value="5" onClick={getValue}>
            5
          </button>
          <button value="6" onClick={getValue}>
            6
          </button>
          <button value="-" onClick={getValue}>
            -
          </button>
          <button value="1" onClick={getValue}>
            1
          </button>
          <button value="2" onClick={getValue}>
            2
          </button>
          <button value="3" onClick={getValue}>
            3
          </button>
          <button value="+" onClick={getValue}>
            +
          </button>
          <button value="00" onClick={getValue}>
            00
          </button>
          <button value="0" onClick={getValue}>
            0
          </button>
          <button value="." onClick={getValue}>
            .
          </button>
          <button value="=" onClick={calculate} className="equal">
            =
          </button>
        </div>
      </div>
      <div>
        {history &&
          history.map((item) => {
            return (
              <h1 style={{ cursor: "pointer" }} onClick={() => add(item)}>
                {item} = {eval(item).toString()}
              </h1>
            );
          })}
      </div>
    </div>
  );
};

export default Calculator;
