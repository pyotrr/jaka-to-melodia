import styled from "styled-components";
import { shrink } from "../animations";
import { Container } from "../Containers.styled";
import { boxShadow } from "../abstract.styled";

export const ThreeTwoOne = styled.div`
  text-align: center;
  font-size: 8rem;
  & > p {
    color: ${({ theme }) => theme.colors.light};
    text-align: center;
    position: absolute;
    width: 10rem;
    top: calc(50% - 5rem);
    left: calc(50% - 5rem);
    margin: auto;
    animation-name: ${shrink};
    animation-iteration-count: 1;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
    &:nth-last-of-type(2) {
      animation-delay: 1s;
    }
    &:nth-last-of-type(3) {
      animation-delay: 2s;
    }
  }
`;

export const TrackTileStyled = styled(Container)`
  img {
    box-shadow: ${boxShadow};
  }
  margin-bottom: 3rem;
`;
