import React, { MouseEventHandler, useMemo, useRef, useState } from "react";
import { Track } from "../../../utils/types";
import { CenteredLoader } from "../../layout/Loading";
import { Space } from "../../../styles/Containers.styled";
import AudioPlayer from "./AudioPlayer";
import shuffleArray from "../../../utils/shuffleArray";
import { Container } from "../../../styles/Containers.styled";
import { Button } from "../../../styles/components/Button.styled";
import CorrectGuessDialog from "./CorrectGuessDialog";
import NOOP from "../../../utils/NOOP";
import WrongGuessDialog from "./WrongGuessDialog";

interface GameProps {
  track: Track | null;
  recommendedTracks: Track[] | null;
  onSuccess: () => Promise<void>;
  onWrongGuess: () => Promise<void>;
}

const isBadGuessATrack = (badGuess: Track | null): badGuess is Track => {
  return Boolean(badGuess);
};

const Game: React.FC<GameProps> = ({
  track,
  recommendedTracks,
  onSuccess,
  onWrongGuess,
}) => {
  const [success, setSuccess] = useState(false);
  const [badGuess, setBadGuess] = useState<Track | null>(null);

  const audioElement = useRef<HTMLAudioElement>(new Audio());

  const randomOrderTracks = useMemo(() => {
    if (!track || !recommendedTracks) return [];
    return shuffleArray<Track>([track, ...recommendedTracks]);
  }, [recommendedTracks, track]);

  if (!track || !recommendedTracks) return <CenteredLoader />;

  const onTrackButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    audioElement.current.pause();
    audioElement.current = new Audio();
    const clickedButton = e.target as HTMLButtonElement;
    if (clickedButton.value === track.id) {
      setSuccess(true);
    }
    const guessedTrack = recommendedTracks.find(
      (fakeTrack) => fakeTrack.id === clickedButton.value
    );
    setBadGuess(guessedTrack || null);
  };

  return (
    <>
      {success && (
        <CorrectGuessDialog
          track={track}
          onNextClick={() => {
            setSuccess(false);
            onSuccess().catch(NOOP);
          }}
        />
      )}
      {isBadGuessATrack(badGuess) && (
        <WrongGuessDialog
          track={badGuess}
          onNextClick={() => {
            setBadGuess(null);
            onWrongGuess().catch(NOOP);
          }}
        />
      )}
      <Space />
      <Container col gap={1.5}>
        {randomOrderTracks.map((track) => (
          <Button key={track.id} value={track.id} onClick={onTrackButtonClick}>
            {track.name}
          </Button>
        ))}
      </Container>
      <Space />
      <AudioPlayer audioPath={track.previewUrl} audioElement={audioElement} />
    </>
  );
};

export default Game;
