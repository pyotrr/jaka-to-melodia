import React from "react";
import Dialog from "../../ui/Dialog";
import { PageTitle } from "../../../styles/Typography.styled";
import { Button } from "../../../styles/components/Button.styled";
import { Track } from "../../../utils/types";
import TrackTile from "./TrackTile";

interface CorrectGuessDialogProps {
  track: Track;
  onNextClick: () => void;
}

const CorrectGuessDialog: React.FC<CorrectGuessDialogProps> = ({
  onNextClick,
  track,
}) => {
  return (
    <Dialog>
      <PageTitle>Correct!</PageTitle>
      <TrackTile track={track} />
      <Button secondary onClick={onNextClick}>
        Next!
      </Button>
    </Dialog>
  );
};

export default CorrectGuessDialog;
