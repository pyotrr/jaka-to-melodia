import React from "react";
import { NavBar } from "../../styles/NavBar.styled";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const TopBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavBar>
      <Link to="/">welcome</Link>
      <Link to="/play">play</Link>
      {isLoggedIn ? (
        <Link to="/logout">logout</Link>
      ) : (
        <Link to="/login">login</Link>
      )}
    </NavBar>
  );
};

export default TopBar;
