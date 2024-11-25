import { useState, useEffect } from "react";
import styled from "styled-components";
import HomeButton from "../generic/HomeButton";
import Panel from "../generic/Panel";
import ResetButton from "../generic/ResetButton";
import RoundTimeInput from "../generic/XYInput";
import Button from "../generic/StartButton";
import { formatTime, toggleTimerActiveState } from '../../utils/helpers';

const TimeDisplay = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const RoundDisplay = styled.div`
  font-size: 1.5rem;
  margin-top: 10px;
`;

interface XYProps {
  rounds?: number;
  timePerRound?: number;
  onComplete?: () => void;
}

const XY: React.FC<XYProps> = ({ rounds: initialRounds, timePerRound: initialTimePerRound, onComplete }) => {
  const [roundTime, setRoundTime] = useState(initialTimePerRound || 0);
  const [totalRounds, setTotalRounds] = useState(initialRounds || 0);
  const [remainingTime, setRemainingTime] = useState(initialTimePerRound || 0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(!!initialRounds && !!initialTimePerRound);

  useEffect(() => {
    if (initialRounds && initialTimePerRound) {
      setRoundTime(initialTimePerRound);
      setTotalRounds(initialRounds);
      setRemainingTime(initialTimePerRound);
      setIsTimeSet(true);
    }
  }, [initialRounds, initialTimePerRound]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (isActive && remainingTime === 0) {
      if (currentRound < totalRounds) {
        setCurrentRound((prev) => prev + 1);
        setRemainingTime(roundTime);
      } else {
        setIsActive(false);
        if (onComplete) onComplete();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime, currentRound, totalRounds, roundTime, onComplete]);

  const handleStart = () => {
    toggleTimerActiveState(remainingTime, isActive, setIsActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setRemainingTime(roundTime);
    setCurrentRound(1);
  };

  const handleTimeChange = (hours: number, minutes: number, seconds: number, rounds: number) => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setRoundTime(totalSeconds);
    setRemainingTime(totalSeconds);
    setTotalRounds(rounds);
    setIsTimeSet(true);
  };

  return (
    <Panel title="XY Timer">
      {!initialRounds && <HomeButton />}
      {isTimeSet ? (
        <>
          <TimeDisplay>{formatTime(remainingTime)}</TimeDisplay>
          <RoundDisplay>
            Round {currentRound} of {totalRounds}
          </RoundDisplay>
          <Button onClick={handleStart}>{isActive ? "Pause" : "Start"}</Button>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </>
      ) : (
        <RoundTimeInput onSetTime={handleTimeChange} label="Set Time Per Round and Rounds" />
      )}
    </Panel>
  );
};

export default XY;