import styled from "styled-components";
import { Container } from "../Containers.styled";

export const PlaylistTileStyled = styled(Container)`
  padding: 0.5rem;
  img {
    border-radius: 1rem;
    border: 2px solid black;
  }
  align-items: center;
  background-color: ${({ theme }) => theme.colors.altBackground};
  gap: 1rem;
  border: none;
  border-bottom: 1px solid black;
  cursor: pointer;
  p {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1rem;
    transition: transform 0.1s ease-in-out;
  }
  &:hover {
    p {
      transform: scale(1.05);
    }
  }
  &:focus-visible {
    outline: none;
  }
`;
