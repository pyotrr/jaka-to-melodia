import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const Main = () => {
  return (
    <div>
      <Profile />
      <Outlet />
    </div>
  );
};

export default Main;
