import styled from "styled-components";
import { boxShadow } from "../abstract.styled";

export const HistoryEntry = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;
  padding: 0.75rem;
  transition: opacity 0.1s ease-in;
  cursor: pointer;
  img {
    border-radius: 10px;
    border: 2px solid black;
  }

  p {
    display: flex;
    flex: 1 1 0;
    justify-content: center;

    &:first-of-type {
      justify-content: flex-start;
    }
    &:last-of-type {
      justify-content: flex-end;
    }
  }

  &:hover,
  &:focus-visible {
    opacity: 0.75;
  }
  &:focus-visible {
    outline: none;
  }
`;

export const HistoryEntryTile = styled.div`
  img {
    box-shadow: ${boxShadow};
  }
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
`;
