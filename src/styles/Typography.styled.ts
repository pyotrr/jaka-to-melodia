import styled from "styled-components";

const Text = styled.p`
  margin: 0;
  text-align: left;
`;

export const PageTitle = styled.h3`
  margin: 2.25rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  font-weight: normal;
  width: 100%;
`;

export default Text;
