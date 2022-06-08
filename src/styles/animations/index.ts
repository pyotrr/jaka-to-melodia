import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const slideIn = keyframes`
  0% {
    transform: translateY(5rem);
    opacity: 0
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
`;

export const bounceAnimation = keyframes`
  0% {transform: scaleY(25%)}
  50% {transform: scaleY(100%)}
  100% {transform: scaleY(25%)}
`;

export const grow = keyframes`
  0% {
    opacity: 0; 
    transform: scale(80%);
  }
  100% {
    opacity: 1;
    transform: scale(100%);
  }
`;

export const shrink = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.25);
  }
  25% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.25);
  }
`;
