import React, { useCallback, useEffect, useRef, useState } from "react";
import { Playlist, Track } from "../../../utils/types";
import PageContainer from "../../layout/PageContainer";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import GamePending from "./GamePending";
import Game from "./Game";
import ScoreWidget from "./GameStateWidget";
import { NUMBER_OF_LIVES } from "../../../utils/contants";
import History from "../../../idb/respositories/history";
import shuffleArray from "../../../utils/shuffleArray";
import range from "../../../utils/range";

export enum GameStatus {
  Pending,
  Started,
  Lost,
  Won,
}

interface GameState {
  status: GameStatus;
  score: number;
  songNumber: number;
  numberOfLives: number;
}

const fetchNewTracks = async (
  playlist: Playlist,
  token: string,
  index: number
): Promise<{ track: Track; recommended: Track[] }> => {
  const newTrackResponse = await api.Playlists.getPlaylistTrack({
    token,
    index,
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
  const trackOrderRef = useRef<number[]>(
    shuffleArray<number>(range(0, playlist.tracks.total - 1))
  );
  const [trackOrderIndex, setTrackOrderIndex] = useState(0);

  useEffect(() => {
    fetchNewTracks(playlist, token, trackOrderRef.current[0]).then(
      ({ track, recommended }) => {
        setRecommended(recommended);
        setCurrentTrack(track);
        setTrackOrderIndex((prevIndex) => prevIndex + 1);
      }
    );
  }, [playlist, token]);

  const startGame = useCallback(() => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      status: GameStatus.Started,
      songNumber: prevGameState.songNumber + 1,
    }));
  }, []);

  const getNextTracks = useCallback(async () => {
    const { recommended, track } = await fetchNewTracks(
      playlist,
      token,
      trackOrderRef.current[trackOrderIndex]
    );
    setCurrentTrack(track);
    setRecommended(recommended);
    setTrackOrderIndex((prevIndex) => prevIndex + 1);
  }, [playlist, token, trackOrderIndex]);

  const onSuccessfulGuess = useCallback(async () => {
    setRecommended(null);
    if (trackOrderIndex === trackOrderRef.current.length) {
      await History.addHistoryEntry({
        playlistId: playlist.id,
        score: gameState.score + 1,
        name: playlist.name,
        date: Date.now(),
        thumbnailUrl: playlist.thumbnailUrl,
        numberOfLives: gameState.numberOfLives,
      });
      setGameState((prevGameState) => ({
        ...prevGameState,
        score: prevGameState.score + 1,
        songNumber: prevGameState.songNumber + 1,
        status: GameStatus.Won,
      }));
      return;
    }
    setGameState((prevGameState) => ({
      ...prevGameState,
      score: prevGameState.score + 1,
      songNumber: prevGameState.songNumber + 1,
    }));
    await getNextTracks();
  }, [
    gameState.numberOfLives,
    gameState.score,
    getNextTracks,
    playlist.id,
    playlist.name,
    playlist.thumbnailUrl,
    trackOrderIndex,
  ]);

  const onWrongGuess = useCallback(async () => {
    setRecommended(null);
    if (gameState.numberOfLives === 1) {
      await History.addHistoryEntry({
        playlistId: playlist.id,
        score: gameState.score,
        name: playlist.name,
        date: Date.now(),
        thumbnailUrl: playlist.thumbnailUrl,
        numberOfLives: 0,
      });
      setGameState((prevGameState) => ({
        ...prevGameState,
        numberOfLives: 0,
        status: GameStatus.Lost,
      }));
      return;
    }
    if (trackOrderIndex === trackOrderRef.current.length) {
      await History.addHistoryEntry({
        playlistId: playlist.id,
        score: gameState.score,
        name: playlist.name,
        date: Date.now(),
        thumbnailUrl: playlist.thumbnailUrl,
        numberOfLives: gameState.numberOfLives,
      });
      setGameState((prevGameState) => ({
        ...prevGameState,
        numberOfLives: prevGameState.numberOfLives - 1,
        status: GameStatus.Won,
      }));
      return;
    }
    setGameState((prevGameState) => ({
      ...prevGameState,
      numberOfLives: prevGameState.numberOfLives - 1,
    }));
    await getNextTracks();
  }, [
    gameState.numberOfLives,
    gameState.score,
    getNextTracks,
    playlist.id,
    playlist.name,
    playlist.thumbnailUrl,
    trackOrderIndex,
  ]);

  return (
    <PageContainer title={playlist.name}>
      {gameState.status === GameStatus.Pending ? (
        <GamePending startGame={startGame} />
      ) : (
        <ScoreWidget
          score={gameState.score}
          songNumber={gameState.songNumber}
          numberOfLives={gameState.numberOfLives}
          gameStatus={gameState.status}
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
