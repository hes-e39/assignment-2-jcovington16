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

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 10), 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <Panel title="Stopwatch">
      <HomeButton />
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <Button onClick={toggle}>{isActive ? "Pause" : "Start"}</Button>
      <ResetButton onClick={reset}>Reset</ResetButton>
    </Panel>
  );
};

export default Stopwatch;
