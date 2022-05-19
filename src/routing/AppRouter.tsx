import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../components/layout/Main";
import SuspendedElement from "./SuspendedElement";
import LoginRedirect from "../components/views/login/LoginRedirect";
import AuthGuard from "./AuthGuard";
import NoAuthGuard from "./NoAuthGuard";
import Logout from "../components/views/logout";
import Logo from "../components/ui/Logo";

const Play = lazy(() => import("../components/views/play"));
const Game = lazy(() => import("../components/views/game/GamePlaylistGuard"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Logo />} />
          <Route element={<NoAuthGuard />}>
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
            <Route
              path="game"
              element={<SuspendedElement element={<Game />} />}
            />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
