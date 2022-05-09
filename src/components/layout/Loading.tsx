import React from "react";
import { LoaderBar, LoadingContainer } from "../../styles/components/Loader.styled";

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

export default Loading;
