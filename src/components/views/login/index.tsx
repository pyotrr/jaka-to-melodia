import React from "react";
import { Button } from "../../../styles/Button.styled";
import api from "../../../api";

const Login: React.FC = () => {
  return (
    <Button as="a" href={api.Auth.authorizeLink()}>
      Login
    </Button>
  );
};

export default Login;
