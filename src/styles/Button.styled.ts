import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  border-radius: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1rem;
  cursor: pointer;
`;
