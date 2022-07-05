import React, { useCallback } from "react";
import { HistoryEntry } from "../../../idb";
import Dialog from "../../ui/Dialog";
import { PageTitle } from "../../../styles/Typography.styled";
import { Button } from "../../../styles/components/Button.styled";
import HistoryEntryTile from "./HistoryEntryTile";
import Playlists from "../../../api/Playlists";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface HistoryEntryDialogProps {
  entry: HistoryEntry;
  closeDialog: () => void;
}

const HistoryEntryDialog: React.FC<HistoryEntryDialogProps> = ({
  entry,
  closeDialog,
}) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const onTryAgain = useCallback(async () => {
    const { playlist } = await Playlists.getPlaylist({
      id: entry.playlistId,
      token,
    });
    navigate("/game", { state: { playlist } });
  }, [entry.playlistId, token, navigate]);
  return (
    <Dialog closeDialog={closeDialog}>
      <PageTitle>{entry.name}</PageTitle>
      <HistoryEntryTile entry={entry} />
      <Button secondary type={"button"} onClick={onTryAgain}>
        Try again
      </Button>
    </Dialog>
  );
};

export default HistoryEntryDialog;
