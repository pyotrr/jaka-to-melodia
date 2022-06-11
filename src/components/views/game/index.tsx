import React, { useCallback, useEffect, useState } from "react";
import { Playlist, Track } from "../../../utils/types";
import PageContainer from "../../layout/PageContainer";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import GamePending from "./GamePending";
import Game from "./Game";
import ScoreWidget from "./GameStateWidget";
import { NUMBER_OF_LIVES } from "../../../utils/contants";

enum GameStatus {
  Pending,
  Started,
  Lost,
}

interface GameState {
  status: GameStatus;
  score: number;
  songNumber: number;
  numberOfLives: number;
}

const fetchNewTracks = async (
  playlist: Playlist,
  token: string
): Promise<{ track: Track; recommended: Track[] }> => {
  const newTrackResponse = await api.Playlists.getRandomPlaylistTrack({
    token,
    totalNumberOfTracks: playlist.tracks.total,
    playlistId: playlist.id,
  });
  const newRecommendationsResponse = await api.Tracks.getRecommendations({
    trackId: newTrackResponse.track.id,
    artistId: newTrackResponse.track.artists[0].id,
    token,
  });
  return {
    recommended: newRecommendationsResponse.tracks,
    track: newTrackResponse.track,
  };
};

const GameLogic: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  const { token } = useAuth();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [recommended, setRecommended] = useState<Track[] | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.Pending,
    score: 0,
    songNumber: 0,
    numberOfLives: NUMBER_OF_LIVES,
  });

  useEffect(() => {
    fetchNewTracks(playlist, token).then(({ track, recommended }) => {
      setRecommended(recommended);
      setCurrentTrack(track);
    });
  }, [playlist, token]);

  const startGame = useCallback(() => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      status: GameStatus.Started,
      songNumber: prevGameState.songNumber + 1,
    }));
  }, []);

  const onSuccessfulGuess = useCallback(async () => {
    setRecommended(null);
    setGameState((prevGameState) => ({
      ...prevGameState,
      score: prevGameState.score + 1,
      songNumber: prevGameState.songNumber + 1,
    }));
    const { recommended, track } = await fetchNewTracks(playlist, token);
    setCurrentTrack(track);
    setRecommended(recommended);
  }, [playlist, token]);

  const onWrongGuess = useCallback(async () => {
    setRecommended(null);
    if (gameState.numberOfLives === 1) {
      setGameState((prevGameState) => ({
        ...prevGameState,
        numberOfLives: 0,
        status: GameStatus.Lost,
      }));
      return;
    }
    setGameState((prevGameState) => ({
      ...prevGameState,
      numberOfLives: prevGameState.numberOfLives - 1,
    }));
    const { recommended, track } = await fetchNewTracks(playlist, token);
    setCurrentTrack(track);
    setRecommended(recommended);
  }, [gameState.numberOfLives, playlist, token]);

  return (
    <PageContainer title={playlist.name}>
      {gameState.status === GameStatus.Pending ? (
        <GamePending startGame={startGame} />
      ) : (
        <ScoreWidget
          score={gameState.score}
          songNumber={gameState.songNumber}
          numberOfLives={gameState.numberOfLives}
        />
      )}
      {gameState.status === GameStatus.Started && (
        <Game
          track={currentTrack}
          recommendedTracks={recommended}
          onSuccess={onSuccessfulGuess}
          onWrongGuess={onWrongGuess}
        />
      )}
    </PageContainer>
  );
};

export default GameLogic;
