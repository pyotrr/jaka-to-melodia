import styled from "styled-components";

interface ContainerProps {
  row?: boolean;
  col?: boolean;
  gap?: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  gap: ${(props) => `${props.gap}rem`};
`;
Container.defaultProps = {
  row: false,
  col: true,
  gap: 0,
};

interface PageContainerProps {
  hasTitle: boolean;
}

export const PageContainer = styled.div<PageContainerProps>`
  display: flex;
  padding: ${(props) => (props.hasTitle ? 0 : "2rem")} 2rem 2rem;
  width: 100%;
  height: 100%;
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
  isolation: isolate;
`;

export const CenteredContainer = styled(Container)<{ grow?: boolean }>`
  flex-grow: ${(props) => (props.grow ? "1 1 0" : "unset")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

CenteredContainer.defaultProps = {
  grow: false,
};

export const Space = styled.div`
  display: flex;
  flex: 1 1 0;
`;
