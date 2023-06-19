import React, { useState, useEffect } from "react";
import './App.css';


const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const decrementBreakLength = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreakLength = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setIsRunning(false);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let countdownInterval;

    if (isRunning) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime >= 0) {
            return newTime;
          } else {
            const audio = document.getElementById("beep");
            audio.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              setTimeLeft(breakLength * 60);
            } else {
              setTimerLabel("Session");
              setTimeLeft(sessionLength * 60);
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    return () => clearInterval(countdownInterval);
  }, [isRunning, timerLabel, sessionLength, breakLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className="container">
      <div className="row">
        <div id='timer-settings' className="col-md-5">
          <div className="break-session-label">
            <h2>Break Length</h2>
            <div className="break-session-buttons">
              <button
                id="break-decrement"
                className="btn btn-primary"
                onClick={decrementBreakLength}
              >
                -
              </button>
              <span id="break-length" className="break-session-value">
                {breakLength}
              </span>
              <button
                id="break-increment"
                className="btn btn-primary"
                onClick={incrementBreakLength}
              >
                +
              </button>
            </div>
          </div>
          <div className="break-session-label">
            <h2>Session Length</h2>
            <div className="break-session-buttons">
              <button
                id="session-decrement"
                className="btn btn-primary"
                onClick={decrementSessionLength}
              >
                -
              </button>
              <span id="session-length" className="break-session-value">
                {sessionLength}
              </span>
              <button
                id="session-increment"
                className="btn btn-primary"
                onClick={incrementSessionLength}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div id='timer-display' className="col-md-5 offset-1">
          <div className="timer-label">
            <h2>{timerLabel}</h2>
            <div id="time-left" className="timer">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="controls">
            <button id="start_stop" className="btn btn-primary" onClick={toggleTimer}>
              Start/Stop
            </button>
            <button id="reset" className="btn btn-secondary" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
      </div>     
      <audio id="beep" className="audio" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
};

export default App;
