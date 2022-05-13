import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Playlist, Track } from "../../../utils/types";
import PageContainer from "../../layout/PageContainer";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

interface GameLocationState {
  playlist?: Playlist;
}

const Game: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    api.Playlists.getRandomPlaylistTrack({
      playlistId: playlist.id,
      totalNumberOfTracks: playlist.tracks.total,
      token,
    }).then((res) => {
      const { track, success } = res;
      if (success) {
        setCurrentTrack(track);
      }
    });
  }, [playlist.id, playlist.tracks.total, token]);

  console.log(currentTrack);

  return <PageContainer title={playlist.name}>siema</PageContainer>;
};

const GamePlaylistGuard: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as GameLocationState;
  if (!locationState.playlist) {
    return <Navigate to="/play" replace />;
  }
  return <Game playlist={locationState.playlist} />;
};

export default GamePlaylistGuard;
