import styled, { keyframes } from "styled-components";
import { StyledContainer } from "../Containers.styled";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const DialogBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  animation-name: ${fadeIn};
  animation-duration: 0.15s;
  animation-iteration-count: 1;
  background-color: rgba(0, 0, 0, 25%);
`;

export const DialogContent = styled(StyledContainer)`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  width: min(80vw, 40rem);
  position: relative;
  overflow: visible;
`;
