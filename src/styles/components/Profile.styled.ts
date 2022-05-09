import styled, { keyframes } from "styled-components";

export const ProfileContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
`;

export const Profile = styled.button`
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.altBackground};
  border: 2px solid black;
  padding: 0;
  &:hover {
    transform: scale(1.05);
  }
  svg {
    height: 100%;
    width: 100%;
    padding: 0.25rem;
  }
  img {
    border-radius: 50%;
  }
`;

const grow = keyframes`
  0% {
    opacity: 0; 
    transform: scale(80%);
  }
  100% {
    opacity: 1;
    transform: scale(100%);
  }
`;

export const ProfileMenu = styled.div`
  background-color: ${({ theme }) => theme.colors.altBackground};
  position: absolute;
  right: 0;
  border: 2px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  top: 3.5rem;
  animation-name: ${grow};
  animation-iteration-count: 1;
  animation-duration: 0.2s;
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    color: black;
    text-decoration: none;
    font-size: 1.125rem;
    transition: color 0.1s ease-in-out;
    width: 6rem;
    svg {
      transition: transform 0.25s ease-in-out;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.background};
      svg {
        transform: translateX(2px);
      }
    }
  }
`;
