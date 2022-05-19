import React, { useCallback, useEffect, useState } from "react";
import { Playlist, Track } from "../../../utils/types";
import PageContainer from "../../layout/PageContainer";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import GamePending from "./GamePending";
import Game from "./Game";

enum GameStatus {
  Pending,
  Started,
  Lost,
}

interface GameState {
  status: GameStatus;
  score: number;
  numberOfGuessedTracks: number;
}

const GameLogic: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  const { token } = useAuth();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [recommended, setRecommended] = useState<Track[] | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.Pending,
    score: 0,
    numberOfGuessedTracks: 0,
  });

  useEffect(() => {
    api.Playlists.getRandomPlaylistTrack({
      token,
      playlistId: playlist.id,
      totalNumberOfTracks: playlist.tracks.total,
    }).then((res) => {
      const { track, success } = res;
      if (success) {
        setCurrentTrack(track);
        api.Tracks.getRecommendations({
          trackId: track.id,
          artistId: track.artists[0].id,
          token,
        }).then((res) => {
          if (res.success) {
            setRecommended(res.tracks);
          }
        });
      }
    });
  }, [playlist.id, playlist.tracks.total, token]);

  const startGame = useCallback(() => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      status: GameStatus.Started,
    }));
  }, []);

  const onSuccessfulGuess = useCallback(async () => {
    setRecommended(null);
    setGameState((prevGameState) => ({
      ...prevGameState,
      score: prevGameState.score + 1,
    }));
    const newTrackResponse = await api.Playlists.getRandomPlaylistTrack({
      token,
      totalNumberOfTracks: playlist.tracks.total,
      playlistId: playlist.id,
    });
    if (newTrackResponse.success) {
      setCurrentTrack(newTrackResponse.track);
    }
    const newRecommendationsResponse = await api.Tracks.getRecommendations({
      trackId: newTrackResponse.track.id,
      artistId: newTrackResponse.track.artists[0].id,
      token,
    });
    if (newRecommendationsResponse.success) {
      setRecommended(newRecommendationsResponse.tracks);
    }
  }, [playlist.id, playlist.tracks.total, token]);

  return (
    <PageContainer title={playlist.name}>
      {gameState.status === GameStatus.Pending && (
        <GamePending startGame={startGame} />
      )}
      {gameState.status === GameStatus.Started && (
        <Game
          track={currentTrack}
          recommendedTracks={recommended}
          onSuccess={onSuccessfulGuess}
        />
      )}
    </PageContainer>
  );
};

export default GameLogic;
