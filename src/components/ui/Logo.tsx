import React, { MouseEventHandler } from "react";
import { WelcomeLogo } from "../../styles/components/WelcomeLogo.styles";
import PageContainer from "../layout/PageContainer";
import { CenteredContainer } from "../../styles/Containers.styled";
import { Button } from "../../styles/components/Button.styled";
import { useAuth } from "../../contexts/AuthContext";
import Text from "../../styles/Typography.styled";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Logo = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/play");
      return;
    }
    window.location.href = api.Auth.authorizeLink();
  };

  return (
    <PageContainer>
      <CenteredContainer grow>
        <WelcomeLogo>
          <Text>Co to za melodia?</Text>
          <Button onClick={onClick}>{isLoggedIn ? "Play" : "Log in"}</Button>
        </WelcomeLogo>
      </CenteredContainer>
    </PageContainer>
  );
};

export default Logo;
