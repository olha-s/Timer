import React, { useEffect, useState } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import "./App.scss";
import CounterDisplay from "./Components/CounterDisplay/CounterDisplay";

const countup$ = interval(1000).pipe(
  map(time => time + 1)
);
const observable$ = countup$;

const App = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [count, setCount] = useState(0);
  const [clickTime, setClickTime] = useState(0);

  useEffect(() => {
    const sub = observable$.subscribe(() => setTime(prevTime => prevTime + 1));
    if (!timerOn) {
      sub.unsubscribe();
    }
    return () => sub.unsubscribe();
  }, [timerOn]);

  const reset = () => {
    setTime(0);
  };

  const startToggle = () => {
    if (!timerOn) {
      setTimerOn(true);
    } else {
      setTimerOn(false);
      setTime(0);
    }
  };

  const wait = () => {
    setCount(prevCount => prevCount + 1);

    if (count === 0) {
      const timeClick = Date.now();
      setClickTime(timeClick);
    } else if (count === 1) {
      const timeCount = Date.now() - clickTime;
      if (timeCount < 300) {
        setTimerOn(false);
      }
      setCount(prevCount => prevCount - 2);
      setClickTime(0);
    }
  };

  return (
    <div className="timer__container">
    <div className="timer__wrapper">
      <CounterDisplay time={time}/>
      <div className="timer__wrapper-btn">
        <button className="timer__btn" onClick={startToggle}>Start/Stop</button>
        <button className="timer__btn" onClick={wait}>Wait</button>
        <button className="timer__btn" onClick={reset}>Reset</button>
      </div>
    </div>
    </div>

  );
};

export default App;
