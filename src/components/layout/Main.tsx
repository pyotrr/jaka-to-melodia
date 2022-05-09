import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";
import { CenteredContainer } from "../../styles/Containers.styled";

const Main = () => {
  return (
    <CenteredContainer grow col>
      <Profile />
      <Outlet />
    </CenteredContainer>
  );
};

export default Main;
