import styled, { keyframes } from "styled-components";
import { Container } from "../Containers.styled";

export const ScoreWidgetStyled = styled(Container)<{ ended?: boolean }>`
  p {
    position: absolute;
    left: 50%;
    transform: ${(props) =>
      props.ended ? "translate(-50%, -50%)" : "translate(-50%, 0)"};
    top: ${(props) => (props.ended ? "50%" : "5rem")};
    font-size: ${(props) => (props.ended ? "3rem" : "1rem")};
    transition: all 0.5s ease-in-out;
  }
`;

ScoreWidgetStyled.defaultProps = {
  ended: false,
};

export const HeartContainer = styled(Container)<{ ended?: boolean }>`
  position: absolute;
  transform: ${(props) =>
    props.ended
      ? "translate(-50%, -50%) scale(1.5)"
      : "translate(0, 0) scale(1)"};
  top: ${(props) => (props.ended ? "calc(50% + 5rem)" : "2.5rem")};
  left: ${(props) => (props.ended ? "50%" : "2.5rem")};
  transition: all 0.5s ease-in-out;
  svg {
    height: 2rem;
    width: 2rem;
    fill: ${({ theme }) => theme.colors.light};
  }
`;

const growEmoji = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
  }
`;

export const StatusEmoji = styled.div`
  position: absolute;
  top: calc(50% - 5rem);
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation-name: ${growEmoji};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;

HeartContainer.defaultProps = {
  ended: false,
};
