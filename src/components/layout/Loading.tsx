import React from "react";
import {
  LoaderBar,
  LoadingContainer,
} from "../../styles/components/Loader.styled";
import { Space } from "../../styles/Containers.styled";

const Loading: React.FC = () => {
  return (
    <LoadingContainer row>
      <LoaderBar animationTime={1} />
      <LoaderBar animationTime={1.25} />
      <LoaderBar animationTime={1.5} />
      <LoaderBar animationTime={1.25} />
      <LoaderBar animationTime={1} />
    </LoadingContainer>
  );
};

export const CenteredLoader: React.FC = () => {
  return (
    <>
      <Space />
      <Loading />
      <Space />
    </>
  );
};

export default Loading;
