import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../components/generic/Loading";
import { useState } from 'react';

const TimersContainer = styled.div`
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// const TimerButton = styled(Link)`
const TimerButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  text-align: center;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  width: 200px;
  display: block;
  text-transform: uppercase;
  &:hover {
    background-color: #45a049;
  }
`;

const TimersView = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };

  return (
    <TimersContainer>
      {loading ? ( 
        <Loading size="large" color="#4acf50" />
      ) : (
        <>
          <Title>Select a Timer</Title>
          <ButtonContainer>
            <TimerButton onClick={() => handleClick("/stopwatch")}>Stopwatch</TimerButton>
            <TimerButton onClick={() => handleClick("/countdown")}>Countdown</TimerButton>
            <TimerButton onClick={() => handleClick("/xy")}>XY Timer</TimerButton>
            <TimerButton onClick={() => handleClick("/tabata")}>Tabata</TimerButton>
          </ButtonContainer>
        </>
      )}
    </TimersContainer>
  );
};

export default TimersView;
