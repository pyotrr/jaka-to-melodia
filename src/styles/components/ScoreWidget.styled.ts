import styled from "styled-components";
import { Container } from "../Containers.styled";

export const ScoreWidgetStyled = styled(Container)`
  p {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5rem;
  }
`;

export const HeartContainer = styled(Container)`
  position: absolute;
  top: 3rem;
  svg {
    height: 2rem;
    width: 2rem;
    fill: ${({ theme }) => theme.colors.light};
  }
`;
