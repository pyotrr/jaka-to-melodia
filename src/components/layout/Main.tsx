import React from "react";
import { Link, Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { useAuth } from "../../contexts/AuthContext";

const Main = () => {
  const { token } = useAuth();

  console.log(token);

  return (
    <div>
      <TopBar />
      siema
      <Link to={"/"}>home</Link>
      <Link to={"/login"}>login</Link>
      <Outlet />
    </div>
  );
};

export default Main;
