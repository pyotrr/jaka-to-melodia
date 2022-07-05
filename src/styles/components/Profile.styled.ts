import styled from "styled-components";
import { grow } from "../animations";

export const ProfileContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 2;
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
    padding: 0.5rem;
    color: ${({ theme }) => theme.colors.light};
  }
  img {
    border-radius: 50%;
  }
`;

const menuTransitionTime = 0.15;

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
  animation-duration: ${menuTransitionTime}s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.light};
    text-decoration: none;
    font-size: 1.125rem;
    transition: color ${menuTransitionTime}s ease-in-out;
    width: 8rem;
    svg {
      transition: transform ${menuTransitionTime}s ease-in-out;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      svg {
        transform: translateX(2px);
      }
    }
  }
`;
