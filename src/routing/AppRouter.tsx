import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../components/layout/Main";
import SuspendedElement from "./SuspendedElement";
import LoginRedirect from "../components/views/login/LoginRedirect";
import AuthGuard from "./AuthGuard";
import NoAuthGuard from "./NoAuthGuard";
import Logout from "../components/views/logout";

const Login = lazy(() => import("../components/views/login"));
const Play = lazy(() => import("../components/views/play"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route element={<NoAuthGuard />}>
            <Route
              path="login"
              element={<SuspendedElement element={<Login />} />}
            />
            <Route
              path="redirect"
              element={<SuspendedElement element={<LoginRedirect />} />}
            />
          </Route>
          <Route element={<AuthGuard />}>
            <Route
              path="play"
              element={<SuspendedElement element={<Play />} />}
            />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
