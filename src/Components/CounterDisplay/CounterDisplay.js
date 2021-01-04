import React from "react";

const CounterDisplay = ({time}) => {
  return (
    <div>
      <span>{("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 1) % 60)).slice(-2)}</span>
    </div>
  );
};

export default CounterDisplay;