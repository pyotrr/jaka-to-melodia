import styled from "styled-components";
import { Container } from "../Containers.styled";

export const ScoreWidgetStyled = styled(Container)<{ lost?: boolean }>`
  p {
    position: absolute;
    left: 50%;
    transform: ${(props) =>
      props.lost ? "translate(-50%, -50%)" : "translate(-50%, 0)"};
    top: ${(props) => (props.lost ? "50%" : "5rem")};
    font-size: ${(props) => (props.lost ? "3rem" : "1rem")};
    transition: all 0.5s ease-in-out;
  }
`;

ScoreWidgetStyled.defaultProps = {
  lost: false,
};

export const HeartContainer = styled(Container)`
  position: absolute;
  top: 2.5rem;
  svg {
    height: 2rem;
    width: 2rem;
    fill: ${({ theme }) => theme.colors.light};
  }
`;
