import React from "react";
import { Track } from "../../../utils/types";
import { TrackTileStyled } from "../../../styles/views/Game.styled";
import Thumbnail from "../../../styles/Images.styled";
import { Container } from "../../../styles/Containers.styled";
import Text from "../../../styles/Typography.styled";

interface TrackTileProps {
  track: Track;
}

const TrackTile: React.FC<TrackTileProps> = ({ track }) => {
  return (
    <TrackTileStyled row gap={1}>
      <Thumbnail
        src={track.album.images[0].url}
        alt="Correct track album cover"
        size={120}
      />
      <Container col gap={0.25} justifyCenter>
        <Text secondary>{track.name}</Text>
        <Text secondary>{track.album.name}</Text>
        <Text secondary>{track.artists[0].name}</Text>
      </Container>
    </TrackTileStyled>
  );
};

export default TrackTile;
