import React, { ReactNode } from "react";
import { PageContainer as PageContainerStyled } from "../../styles/Containers.styled";
import { PageTitle } from "../../styles/Typography.styled";

type PageContainerProps = {
  children: ReactNode;
  title?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => {
  return (
    <>
      {title && <PageTitle>{title}</PageTitle>}
      <PageContainerStyled hasTitle={Boolean(title)}>
        {children}
      </PageContainerStyled>
    </>
  );
};

export default PageContainer;
