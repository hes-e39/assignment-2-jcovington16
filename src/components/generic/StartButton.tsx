import styled from "styled-components";

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}

const StartButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Button = ({ onClick, children }: ButtonProps) => {
    return <StartButton onClick={onClick}>{children}</StartButton>
}

export default Button;