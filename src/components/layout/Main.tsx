import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const Main = () => {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  );
};

export default Main;
