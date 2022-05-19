import styled from "styled-components";

export const AudioVisualizerContainer = styled.div`
  display: flex;
  height: 10rem;
  justify-content: center;
  align-items: end;
  gap: 0.25rem;
  width: min(80rem, 80vw);
  margin: 0 auto;
`;

export const AudioVisualizerBar = styled.div`
  display: flex;
  flex: 1 1 0;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 5%;
  transform-origin: 50% 100%;
  box-shadow: 0 -1px 0 ${({ theme }) => theme.colors.altBackground};
  transform: scaleY(0);
`;
