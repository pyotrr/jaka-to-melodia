import styled from "styled-components";
import { slideIn } from "../animations";

export const WelcomeLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 3rem;
    font-weight: 200;
    color: ${({ theme }) => theme.colors.light};
    letter-spacing: 1.5px;
    animation-name: ${slideIn};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    margin-bottom: 1.5rem;
    transform: translateY(5rem);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  button {
    transform: translateY(5rem);
    opacity: 0;
    font-size: 1.5rem;
    animation-name: ${slideIn};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 0.25s;
    animation-timing-function: ease-in-out;
  }
`;
