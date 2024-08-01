import React, { useState, useEffect } from "react";
import { ReactComponent as ClearIcon } from "./icons/close.svg";
import { RiDivideFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { VscPercentage } from "react-icons/vsc";
import { MdExpandLess } from "react-icons/md";
import { PiEqualsBold } from "react-icons/pi";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    if (error) setError(null);
    setDisplay((prev) => (prev === "0" ? value : prev + value));
  };

  const handleCalculation = () => {
    try {
      let expression = display;
      // Handle exponentiation
      expression = expression.replace(/\^/g, "**");
      // Handle percentage
      expression = expression.replace(/(\d+)%/g, "($1/100)");

      const result = eval(expression);
      setDisplay(result.toString());
    } catch (e) {
      setError("Error: Invalid calculation");
    }
  };

  const handleClear = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setError(null);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= "0" && key <= "9") {
        handleButtonClick(key);
      } else if (key === "Enter" || key === "=") {
        handleCalculation();
      } else if (key === "Backspace" || key === "c") {
        handleClear();
      } else if (["+", "-", "*", "/", "%", "^"].includes(key)) {
        handleButtonClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleButtonClick, handleCalculation, handleClear]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div
          className={`text-right text-white p-4 bg-indigo-800 rounded-3xl mb-4 text-3xl ${
            error ? "text-red-500 truncate" : ""
          }`}
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            wordBreak: "break-all",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {error ? error : display}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="grid grid-cols-3 gap-2 col-span-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map(
              (btn, index) => (
                <button
                  key={index}
                  className="bg-gray-700 text-white text-2xl rounded-3xl w-16 h-11 shadow-md"
                  onClick={() => handleButtonClick(btn)}
                >
                  {btn}
                </button>
              )
            )}
            <button
              className="bg-gray-700 text-white text-2xl rounded-3xl w-16 h-11 shadow-md flex items-center justify-center"
              onClick={handleClear}
            >
              <ClearIcon />
            </button>
          </div>
          <div className="grid grid-rows-3 gap-3">
            {[
              { icon: <IoCloseSharp />, value: "*" },
              { icon: <RiDivideFill />, value: "/" },
              { icon: <AiOutlinePlus />, value: "+" },
              { icon: <FiMinus />, value: "-" },
              { icon: <VscPercentage />, value: "%" },
              { icon: <MdExpandLess />, value: "^" },
            ].map((btn, index) => (
              <button
                key={index}
                className="bg-yellow-500 text-white text-2xl rounded-full flex items-center justify-center w-11 h-11 shadow-md"
                onClick={() => handleButtonClick(btn.value)}
              >
                {btn.icon}
              </button>
            ))}
            <button
              className="col-span-2 bg-customGray text-2xl rounded-3xl text-black flex items-center justify-center w-28 h-11"
              onClick={handleCalculation}
            >
              <PiEqualsBold />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
