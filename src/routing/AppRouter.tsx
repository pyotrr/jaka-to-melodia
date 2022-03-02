import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../components/layout/Main";
import SuspendedElement from "./SuspendedElement";
import LoginRedirect from "../components/views/login/LoginRedirect";

const Login = lazy(() => import("../components/views/login"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route
            path="login"
            element={<SuspendedElement element={<Login />} />}
          />
          <Route
            path={"redirect"}
            element={<SuspendedElement element={<LoginRedirect />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
