import { useState, useEffect } from "react";
import styled from "styled-components";
import HomeButton from "../generic/HomeButton";
import Panel from "../generic/Panel";
import Button from "../generic/StartButton";
import ResetButton from "../generic/ResetButton";
import { formatTime } from "../../utils/helpers";

const TimeDisplay = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

interface StopwatchProps {
  duration?: number;  // Optional duration limit
  onComplete?: () => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ duration = 0, onComplete }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 10;
          if (duration > 0 && newTime >= duration * 1000) {
            clearInterval(interval);
            setIsActive(false);
            if (onComplete) onComplete();
            return duration * 1000;
          }
          return newTime;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);

  const toggle = () => setIsActive(!isActive);
  
  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <Panel title="Stopwatch">
      {!duration && <HomeButton />}
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <Button onClick={toggle}>{isActive ? "Pause" : "Start"}</Button>
      <ResetButton onClick={reset}>Reset</ResetButton>
    </Panel>
  );
};

export default Stopwatch;