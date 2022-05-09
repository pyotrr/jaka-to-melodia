import React, { ReactNode } from "react";
import {
  PageContainer as PageContainerStyled,
  Container,
} from "../../styles/Containers.styled";
import { PageTitle } from "../../styles/Typography.styled";

type PageContainerProps = {
  children: ReactNode;
  title: string;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => {
  return (
    <Container>
      <PageTitle>{title}</PageTitle>
      <PageContainerStyled>{children}</PageContainerStyled>
    </Container>
  );
};

export default PageContainer;
