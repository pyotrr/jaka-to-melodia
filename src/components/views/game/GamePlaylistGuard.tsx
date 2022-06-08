import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Game from "./index";
import { Playlist } from "../../../utils/types";

interface GameLocationState {
  playlist?: Playlist;
}

const GamePlaylistGuard: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as GameLocationState;
  if (!locationState.playlist) {
    return <Navigate to="/play" replace />;
  }
  return <Game playlist={locationState.playlist} />;
};

export default GamePlaylistGuard;
