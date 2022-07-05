import styled from "styled-components";

interface TextProps {
  center?: boolean;
  secondary?: boolean;
}

const Text = styled.p<TextProps>`
  margin: 0;
  text-align: ${(props) => (props.center ? "center" : "left")};
  color: ${(props) => (props.secondary ? props.theme.colors.light : "black")};
`;

Text.defaultProps = {
  secondary: false,
};

export const PageTitle = styled.h3`
  margin: 2.25rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  font-weight: normal;
  width: 100%;
`;

export default Text;
