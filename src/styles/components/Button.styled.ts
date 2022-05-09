import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  border-radius: 1rem;
  letter-spacing: 1.25px;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.light};
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
