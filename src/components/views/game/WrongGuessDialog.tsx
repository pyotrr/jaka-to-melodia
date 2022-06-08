import React from "react";
import { Track } from "../../../utils/types";
import Dialog from "../../ui/Dialog";
import { PageTitle } from "../../../styles/Typography.styled";
import TrackTile from "./TrackTile";
import { Button } from "../../../styles/components/Button.styled";

interface WrongGuessDialogProps {
  track: Track;
  onNextClick: () => void;
}

const WrongGuessDialog: React.FC<WrongGuessDialogProps> = ({
  track,
  onNextClick,
}) => {
  return (
    <Dialog>
      <PageTitle>Wrong 😥</PageTitle>
      <TrackTile track={track} />
      <Button secondary onClick={onNextClick}>
        Next!
      </Button>
    </Dialog>
  );
};

export default WrongGuessDialog;
