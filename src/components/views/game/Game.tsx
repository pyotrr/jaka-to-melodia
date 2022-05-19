import React, { MouseEventHandler, useMemo, useState } from "react";
import { Track } from "../../../utils/types";
import { CenteredLoader } from "../../layout/Loading";
import { Space } from "../../../styles/Containers.styled";
import AudioVisualizer from "./AudioVisualizer";
import shuffleArray from "../../../utils/shuffleArray";
import { Container } from "../../../styles/Containers.styled";
import { Button } from "../../../styles/components/Button.styled";
import Dialog from "../../ui/Dialog";
import Text, { PageTitle } from "../../../styles/Typography.styled";
import Thumbnail from "../../../styles/Images.styled";

interface GameProps {
  track: Track | null;
  recommendedTracks: Track[] | null;
  onSuccess: () => Promise<void>;
}

const Game: React.FC<GameProps> = ({ track, recommendedTracks, onSuccess }) => {
  const [success, setSuccess] = useState(false);
  const [badGuess, setBadGuess] = useState<Track | null>(null);

  const randomOrderTracks = useMemo(() => {
    if (!track || !recommendedTracks) return [];
    return shuffleArray<Track>([track, ...recommendedTracks]);
  }, [recommendedTracks, track]);

  if (!track || !recommendedTracks) return <CenteredLoader />;

  const onTrackButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    const clickedButton = e.target as HTMLButtonElement;
    if (clickedButton.value === track.id) {
      setSuccess(true);
    }
    setBadGuess(
      recommendedTracks.find(
        (fakeTrack) => fakeTrack.id === clickedButton.value
      ) || null
    );
  };

  return (
    <>
      {success && (
        <Dialog>
          <PageTitle>Correct!</PageTitle>
          <Container row>
            <Thumbnail
              src={track.album.images[0].url}
              alt={"Track album cover"}
            />
            <Container col>
              <Text>{track.name}</Text>
              <Text>{track.album.name}</Text>
            </Container>
          </Container>
          <Button
            onClick={() => {
              setSuccess(false);
              onSuccess();
            }}
          >
            Next!
          </Button>
        </Dialog>
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
      <AudioVisualizer audioPath={track.previewUrl} />
    </>
  );
};

export default Game;
