import { useState, useEffect } from "react";
import styled from "styled-components";
import HomeButton from "../generic/HomeButton";
import Panel from "../generic/Panel";
import ResetButton from "../generic/ResetButton";
import RoundTimeInput from "../generic/XYInput";
import Button from "../generic/StartButton";
import { formatTime, toggleTimerActiveState } from '../../utils/helpers'

const TimeDisplay = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const SetNewTimeButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const RoundDisplay = styled.div`
  font-size: 1.5rem;
  margin-top: 10px;
`;

const XY = () => {
  const [roundTime, setRoundTime] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(false); // Flag to check if time has been set

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => setRemainingTime((prev) => prev - 1), 1000); // Decrease by 1 second
    } else if (isActive && remainingTime === 0) {
      if (currentRound < totalRounds) {
        setCurrentRound((prev) => prev + 1); // Move to the next round
        setRemainingTime(roundTime); // Reset remaining time to initial round time
      } else {
        setIsActive(false); // Stop the timer after the final round
      }
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isActive, remainingTime, currentRound, totalRounds, roundTime]);

  const handleStart = () => {
    toggleTimerActiveState(remainingTime, isActive, setIsActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setRemainingTime(roundTime);
    setCurrentRound(1);
  };

  const handleSetNewTime = () => {
    setIsActive(false);
    setIsTimeSet(false); // Show the RoundTimeInput component again for setting a new time
    setRemainingTime(0);
    setCurrentRound(1);
  };

  // Handler for setting the initial round time and number of rounds
  const handleTimeChange = (hours: number, minutes: number, seconds: number, rounds: number) => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setRoundTime(totalSeconds);
    setRemainingTime(totalSeconds);
    setTotalRounds(rounds);
    setIsTimeSet(true); // Set time has been confirmed
  };

  return (
    <Panel title="XY Timer">
      <HomeButton />
      {isTimeSet ? (
        <>
          <TimeDisplay>{formatTime(remainingTime)}</TimeDisplay>
          <RoundDisplay>
            Round {currentRound} of {totalRounds}
          </RoundDisplay>
          <Button onClick={handleStart}>{isActive ? "Pause" : "Start"}</Button>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <SetNewTimeButton onClick={handleSetNewTime}>Set New Time</SetNewTimeButton>
        </>
      ) : (
        <RoundTimeInput onSetTime={handleTimeChange} label="Set Time Per Round and Rounds" />
      )}
    </Panel>
  );
};

export default XY;
