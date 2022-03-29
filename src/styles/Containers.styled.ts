import styled from "styled-components";

interface ContainerProps {
  row?: boolean;
  col?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
`;
Container.defaultProps = {
  row: false,
  col: true,
};

export const PageContainer = styled(Container)`
  padding: 2rem;
  flex-direction: column;
`;
