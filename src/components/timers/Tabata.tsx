import { useState, useEffect } from "react";
import styled from "styled-components";
import HomeButton from "../generic/HomeButton";
import Panel from "../generic/Panel";
import ResetButton from "../generic/ResetButton";
import RoundTimeInput from "../generic/RoundTimeInput";
import { formatTime } from "../../utils/helpers";
import Button from "../generic/StartButton";

const TimeDisplay = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const FastForwardButton = styled(Button)`
  background-color: #ff9800;
  &:hover {
    background-color: #fb8c00;
  }
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

const StatusDisplay = styled.div<{ isWorkPhase: boolean }>`
  font-size: 2rem;
  color: ${(props) => (props.isWorkPhase ? "#4caf50" : "#ff6b6b")};
  margin-bottom: 10px;
`;


const Tabata = () => {
    const [workTime, setWorkTime] = useState(20);
    const [restTime, setRestTime] = useState(10);
    const [totalRounds, setTotalRounds] = useState(8);
    const [remainingTime, setRemainingTime] = useState(workTime); 
    const [currentRound, setCurrentRound] = useState(1); 
    const [isActive, setIsActive] = useState(false);
    const [isTimeSet, setIsTimeSet] = useState(false); 
    const [isWorkPhase, setIsWorkPhase] = useState(true); 

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (isActive && remainingTime === 0) {
      if (isWorkPhase) {
        setRemainingTime(restTime);
        setIsWorkPhase(false);
      } else {
        setCurrentRound((prev) => prev + 1);
        if (currentRound < totalRounds) {
          setRemainingTime(workTime);
          setIsWorkPhase(true);
        } else {
          setIsActive(false);
        }
      }
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isActive, remainingTime, isWorkPhase, currentRound, totalRounds, workTime, restTime]);

  const handleStart = () => {
    if (remainingTime > 0) {
      setIsActive(!isActive);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setRemainingTime(workTime);
    setCurrentRound(1);
    setIsWorkPhase(true);
  };

  const handleFastForward = () => {
    setIsActive(false);
    setRemainingTime(0);
    setCurrentRound(totalRounds);
  };

  const handleSetNewTime = () => {
    setIsActive(false);
    setIsTimeSet(false);
    setRemainingTime(workTime);
    setCurrentRound(1);
    setIsWorkPhase(true);
  };

  const handleTimeChange = (
    workMinutes: number,
    workSeconds: number,
    restMinutes: number,
    restSeconds: number,
    rounds: number
  ) => {
    const totalWorkSeconds = workMinutes * 60 + workSeconds;
    const totalRestSeconds = restMinutes * 60 + restSeconds;
    setWorkTime(totalWorkSeconds);
    setRestTime(totalRestSeconds);
    setTotalRounds(rounds);
    setRemainingTime(totalWorkSeconds);
    setIsTimeSet(true);
  };
  
  return (
    <Panel title="Tabata Timer">
      <HomeButton />
      {isTimeSet ? (
        <>
        <StatusDisplay isWorkPhase={isWorkPhase}>
         {isWorkPhase ? "Work" : "Rest"}
        </StatusDisplay>
          <TimeDisplay>{formatTime(remainingTime)}</TimeDisplay>
          <RoundDisplay>
            Round {currentRound} of {totalRounds}
          </RoundDisplay>
          <Button onClick={handleStart}>{isActive ? "Pause" : "Start"}</Button>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <FastForwardButton onClick={handleFastForward}>Fast Forward</FastForwardButton>
          <SetNewTimeButton onClick={handleSetNewTime}>Set New Time</SetNewTimeButton>
        </>
      ) : (
        <RoundTimeInput
            onSetTime={(workMinutes, workSeconds, restMinutes, restSeconds, rounds) =>
                handleTimeChange(workMinutes, workSeconds, restMinutes, restSeconds, rounds)
            }
            label="Set Work/Rest Time and Rounds"
        />

      )}
    </Panel>
  );
};

export default Tabata;
