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
    color: beige;
    font-size: 1rem;
  }
`;
