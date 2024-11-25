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

interface CountdownProps {
  initialTime?: number;
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ initialTime, onComplete }) => {
    console.log('Countdown props:', { initialTime, onComplete }); // Debug log

    const [time, setTime] = useState(initialTime || 0);
    const [remainingTime, setRemainingTime] = useState(initialTime || 0);
    const [isTimeSet, setIsTimeSet] = useState(!!initialTime);
    const [isActive, setIsActive] = useState(false);

    // Effect to handle initialTime changes
    useEffect(() => {
      console.log('Effect triggered - initialTime:', initialTime);
      if (initialTime && initialTime > 0) {
          console.log('Setting time to:', initialTime);
          setTime(initialTime);
          setRemainingTime(initialTime);
          setIsTimeSet(true);
      }
  }, [initialTime]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isActive && remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime((prev) => {
                    const newTime = prev - 1;
                    if (newTime <= 0 && onComplete) {
                        setIsActive(false);
                        onComplete();
                    }
                    return newTime;
                });
            }, 1000);
        } else if (remainingTime <= 0) {
            setIsActive(false);
            clearInterval(interval);
            if (onComplete) {
                onComplete();
            }
        }
        return () => clearInterval(interval);
    }, [isActive, remainingTime, onComplete]);

    const handleStart = () => {
        toggleTimerActiveState(remainingTime, isActive, setIsActive);
    };

    const handleResetTime = () => {
        setIsActive(false);
        setRemainingTime(time);
    };

    const handleSetNewTime = () => {
        setIsActive(false);
        setIsTimeSet(false);
        setRemainingTime(0);
    };

    const handleTime = (hours: number, minutes: number, seconds: number) => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setTime(totalSeconds);
        setRemainingTime(totalSeconds);
        setIsTimeSet(true);
    };

    console.log('Countdown render state:', { 
        time, 
        remainingTime, 
        isTimeSet, 
        isActive 
    }); // Debug log
    
    return (
        <Panel title="Countdown Timer">
            {!initialTime && <HomeButton />}
            {isTimeSet ? (
                <>
                    <TimeDisplay>{formatTime(remainingTime)}</TimeDisplay>
                    <Button onClick={handleStart}>{isActive ? "Pause" : "Start"}</Button>
                    <ResetButton onClick={handleResetTime}>Reset</ResetButton>
                    {!initialTime && <SetNewTimeButton onClick={handleSetNewTime}>New Time</SetNewTimeButton>}
                </>
            ) : (
                <Input onChange={handleTime} label="Set Countdown Time" />
            )}
        </Panel>
    );
};

export default Countdown;