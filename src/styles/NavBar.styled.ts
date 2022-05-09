import styled from "styled-components";

export const NavBar = styled.nav`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  a {
    color: ${({theme}) => theme.colors.secondary};
  }
`;
