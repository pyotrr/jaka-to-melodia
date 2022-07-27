import React from "react";
import { HistoryEntry as EntryType } from "../../../idb";
import {
  HistoryEntry as HistoryEntryContainer,
  EntryWinStatusEmoji,
} from "../../../styles/views/History.styled";
import Thumbnail from "../../../styles/Images.styled";
import Text from "../../../styles/Typography.styled";
import formatDate from "../../../utils/formatDate";
import Hearts from "../../ui/Hearts";

interface HistoryEntryProps {
  entry: EntryType;
  onClick: (entry: EntryType) => void;
}

const HistoryEntry: React.FC<HistoryEntryProps> = ({ entry, onClick }) => {
  return (
    <HistoryEntryContainer type="button" onClick={() => onClick(entry)}>
      <Thumbnail
        src={entry.thumbnailUrl}
        alt={`${entry.name} playlist thumbnail`}
        height={100}
        width={100}
      />
      <EntryWinStatusEmoji>
        {entry.numberOfLives ? "🏆" : "🥈"}
      </EntryWinStatusEmoji>
      <Text secondary>{entry.name}</Text>
      <Text secondary>{`score: ${entry.score}`}</Text>
      <Text secondary>{formatDate(new Date(entry.date))}</Text>
      <Hearts numberOfLives={entry.numberOfLives} />
    </HistoryEntryContainer>
  );
};

export default HistoryEntry;
