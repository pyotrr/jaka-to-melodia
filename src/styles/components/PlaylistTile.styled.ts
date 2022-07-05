import styled from "styled-components";
import { Container } from "../Containers.styled";

export const PlaylistTileStyled = styled(Container)`
  padding: 0.5rem;
  margin: 0;
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
  transition: opacity 0.1s ease-in;
  p {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1rem;
  }
  &:hover {
    opacity: 0.75;
  }
  &:focus-visible {
    outline: none;
  }
`;
