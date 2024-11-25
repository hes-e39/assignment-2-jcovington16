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

interface StatusDisplayProps {
  $isWorkPhase: boolean;  // Changed from isWorkPhase to $isWorkPhase
}

const StatusDisplay = styled.div<StatusDisplayProps>`
  font-size: 2rem;
  color: ${(props) => (props.$isWorkPhase ? "#4caf50" : "#ff6b6b")};
  margin-bottom: 10px;
`;

const RoundDisplay = styled.div`
  font-size: 1.5rem;
  margin-top: 10px;
`;

interface TabataProps {
  rounds?: number;
  workTime?: number;
  restTime?: number;
  onComplete?: () => void;
}

const Tabata: React.FC<TabataProps> = ({
  rounds: initialRounds = 8,
  workTime: initialWorkTime = 20,
  restTime: initialRestTime = 10,
  onComplete
}) => {
  const [workTime, setWorkTime] = useState(initialWorkTime);
  const [restTime, setRestTime] = useState(initialRestTime);
  const [totalRounds, setTotalRounds] = useState(initialRounds);
  const [remainingTime, setRemainingTime] = useState(initialWorkTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(!!initialRounds);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  useEffect(() => {
    if (initialRounds && initialWorkTime && initialRestTime) {
      setWorkTime(initialWorkTime);
      setRestTime(initialRestTime);
      setTotalRounds(initialRounds);
      setRemainingTime(initialWorkTime);
      setIsTimeSet(true);
    }
  }, [initialRounds, initialWorkTime, initialRestTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (isActive && remainingTime === 0) {
      if (isWorkPhase) {
        setRemainingTime(restTime);
        setIsWorkPhase(false);
      } else {
        if (currentRound < totalRounds) {
          setCurrentRound((prev) => prev + 1);
          setRemainingTime(workTime);
          setIsWorkPhase(true);
        } else {
          setIsActive(false);
          if (onComplete) onComplete();
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime, isWorkPhase, currentRound, totalRounds, workTime, restTime, onComplete]);

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
      {!initialRounds && <HomeButton />}
      {isTimeSet ? (
        <>
          <StatusDisplay $isWorkPhase={isWorkPhase}>  {/* Changed prop name here too */}
            {isWorkPhase ? "Work" : "Rest"}
          </StatusDisplay>
          <TimeDisplay>{formatTime(remainingTime)}</TimeDisplay>
          <RoundDisplay>
            Round {currentRound} of {totalRounds}
          </RoundDisplay>
          <Button onClick={handleStart}>{isActive ? "Pause" : "Start"}</Button>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </>
      ) : (
        <RoundTimeInput
          onSetTime={handleTimeChange}
          label="Set Work/Rest Time and Rounds"
        />
      )}
    </Panel>
  );
};

export default Tabata;