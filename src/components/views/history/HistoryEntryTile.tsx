import React from "react";
import { HistoryEntry } from "../../../idb";
import { HistoryEntryTile as HistoryEntryTileStyled } from "../../../styles/views/History.styled";
import Thumbnail from "../../../styles/Images.styled";
import { Container } from "../../../styles/Containers.styled";
import Text from "../../../styles/Typography.styled";
import formatDate from "../../../utils/formatDate";

interface HistoryEntryTileProps {
  entry: HistoryEntry;
}

const HistoryEntryTile: React.FC<HistoryEntryTileProps> = ({ entry }) => {
  return (
    <HistoryEntryTileStyled>
      <Thumbnail
        src={entry.thumbnailUrl}
        height={100}
        width={100}
        size={100}
        alt={`${entry.name} playlist thumbnail`}
      />
      <Container col justifyCenter gap={0.25}>
        <Text secondary>{`Score: ${entry.score}`}</Text>
        <Text secondary>{formatDate(new Date(entry.date))}</Text>
      </Container>
    </HistoryEntryTileStyled>
  );
};

export default HistoryEntryTile;
