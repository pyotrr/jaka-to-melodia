import styled, { keyframes } from "styled-components";
import { Container } from "./Containers.styled";

interface LoaderBarProps {
  animationTime: number;
}

const bounceAnimation = keyframes`
  0% {transform: scaleY(25%)}
  50% {transform: scaleY(100%)}
  100% {transform: scaleY(25%)}
`;

export const LoaderBar = styled.div<LoaderBarProps>`
  display: flex;
  width: 0.25rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  animation-name: ${bounceAnimation};
  animation-duration: ${(props) => `${props.animationTime}s`};
  animation-iteration-count: infinite;
  border-radius: 0.125rem;
`;

export const LoadingContainer = styled(Container)`
  width: 100%;
  gap: 0.25rem;
  padding: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
