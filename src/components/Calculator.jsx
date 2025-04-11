import React, { useEffect, useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import "./Calc.css";

const Calculator = () => {
  const [data, setData] = useState("");
  const [history, setHistory] = useState("");

  // console.log(data);
  // console.log(history);

  const operators = ["+", "-", "*", "/", "%"];

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace") {
      handleBack();
    } else if (key === "Enter") {
      calculate();
    } else if (key === "Escape") {
      handleClear();
    } else if (/^[0-9]$/.test(key)) {
      getValueByKey(key);
    } else if (operators.includes(key)) {
      setData((prev) => {
        const lastChar = prev.slice(-1);
        if (operators.includes(lastChar)) {
          return prev.slice(0, -1) + key;
        } else {
          return prev + key;
        }
      });
    }
  };

  const getValue = (e) => {
    let input = e.target.value;

    if (operators.includes(input)) {
      setData((prev) => {
        const lastChar = prev.slice(-1);
        if (operators.includes(lastChar)) {
          return prev.slice(0, -1) + input;
        } else {
          return prev + input;
        }
      });
    } else {
      setData(data.concat(input));
    }
  };

  const getValueByKey = (key) => {
    setData((prevInput) => prevInput + key);
  };

  const handleBack = () => {
    setData(data.slice(0, -1));
  };

  const handleClear = () => {
    setData("");
  };

  const calculate = () => {
    try {
      if (data !== "") {
        setData(eval(data).toString());
        setHistory([...history, data]);
      }
    } catch (err) {
      setData("error");
    }
  };

  const add = (calc) => {
    setData(calc);
    setHistory(history.filter((item) => item !== calc));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data]);

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
          <button value="0" className="double" onClick={getValue}>
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
        <h2 className="text-center" style={{ color: "grey" }}>
          History
        </h2>
        <hr />
        {history.length === 0 ? (
          <h3>No Records</h3>
        ) : (
          history.map((item, index) => {
            return (
              <h3 className="his" key={index}>
                <MdEdit
                  onClick={() => add(item)}
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    marginRight: "20px",
                    border: "1px solid black",
                  }}
                />
                {item} = {eval(item).toString()}
                <hr />
              </h3>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Calculator;
