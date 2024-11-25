import { useState } from "react";
import styled from "styled-components";
import Button from "./StartButton";


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Dropdown = styled.select`
  margin: 5px;
  padding: 5px;
  font-size: 1.2rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const RoundTimeInput = ({
  onSetTime,
  label,
}: {
  onSetTime: (
    workMinutes: number,
    workSeconds: number,
    restMinutes: number,
    restSeconds: number,
    rounds: number
  ) => void;
  label: string;
}) => {
  const [workMinutes, setWorkMinutes] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [rounds, setRounds] = useState(8);

  const handleSetTime = () => {
    onSetTime(workMinutes, workSeconds, restMinutes, restSeconds, rounds);
  };

  return (
    <InputContainer>
      <label>{label}</label>
      <div>
        <Dropdown value={workMinutes} onChange={(e) => setWorkMinutes(Number(e.target.value))}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i} Work min
            </option>
          ))}
        </Dropdown>
        <Dropdown value={workSeconds} onChange={(e) => setWorkSeconds(Number(e.target.value))}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i} Work sec
            </option>
          ))}
        </Dropdown>
        <Dropdown value={restMinutes} onChange={(e) => setRestMinutes(Number(e.target.value))}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i} Rest min
            </option>
          ))}
        </Dropdown>
        <Dropdown value={restSeconds} onChange={(e) => setRestSeconds(Number(e.target.value))}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i} Rest sec
            </option>
          ))}
        </Dropdown>
        <Dropdown value={rounds} onChange={(e) => setRounds(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i} value={i}>
              {i} Rounds
            </option>
          ))}
        </Dropdown>
      </div>
      <Button onClick={handleSetTime}>Set Timer</Button>
    </InputContainer>
  );
};

export default RoundTimeInput;
