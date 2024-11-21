import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
  display: inline-block;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const HomeButton = () => {
  return <Button to="/">Home</Button>;
};

export default HomeButton;
