import { useState, useEffect } from "react";
import HomeButton from "../generic/HomeButton";
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import Button from "../generic/StartButton";
import ResetButton from "../generic/ResetButton";
import styled from "styled-components";
import { formatTime, toggleTimerActiveState } from "../../utils/helpers";

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

const Countdown = () => {
    const [time, setTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isTimeSet, setIsTimeSet] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if(isActive && remainingTime > 0) {
            interval = setInterval(() => setRemainingTime((prev) => prev -1), 1000);
        } else if (remainingTime <= 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingTime]);

    const handleStart = () => {
        toggleTimerActiveState(remainingTime, isActive, setIsActive);
      };

    const handleResetTime = () => {
        setIsActive(false);
        setRemainingTime(time);
    }

    const handleSetNewTime = () => {
        setIsActive(false);
        setIsTimeSet(false); // this should show the input component again to set a new time. 
        setRemainingTime(0);
    }

    const handleTime = (hours: number, minutes: number, seconds: number) => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setTime(totalSeconds);
        setRemainingTime(totalSeconds);
        setIsTimeSet(true);
    }
    
    return (
        <Panel title="Countdown Timer">
        <HomeButton />
        {isTimeSet ? (
          <>
            <TimeDisplay>{formatTime(remainingTime)}</TimeDisplay>
            <Button onClick={handleStart}>{isActive ? "Pause" : "Start"}</Button>
            <ResetButton onClick={handleResetTime}>Reset</ResetButton>
            <SetNewTimeButton onClick={handleSetNewTime}>New Time</SetNewTimeButton>
          </>
        ) : (
          <Input onChange={handleTime} label="Set Countdown Time" />
        )}
      </Panel>
    )
};

export default Countdown;
