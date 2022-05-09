import styled from "styled-components";

export const PlaylistDialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    position: absolute;
    border-radius: 1rem;
    border: 2px solid black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 33%);
    top: -3rem;
    z-index: 3;
    left: 50%;
    transform: translateX(-50%);
    height: 8rem;
    width: 8rem;
  }
  p {
    text-align: center;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.light};
    &:first-of-type {
      margin-top: 5rem;
      font-size: 1.5rem;
    }
  }
  button {
    margin-top: 1.75rem;
    font-size: 1.25rem;
    &:hover {
      color: ${({ theme }) => theme.colors.altBackground};
      border-color: ${({ theme }) => theme.colors.altBackground};
    }
  }
`;
