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

export const PageContainer = styled.div`
  padding: 0 2rem 2rem;
  flex-direction: column;
`;

export const ListContainer = styled.div`
  overflow: auto;
  max-height: 80vh;
  &::-webkit-scrollbar {
    width: 0.625rem;
  }
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.background};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledContainer = styled(Container)`
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.33);
  border: 2px solid black;
  overflow: hidden;
`;
