import React from "react";
import { Playlist } from "../../../api/Playlists";
import { Container } from "../../../styles/Containers.styled";
import Text from "../../../styles/Typography.styled";
import Thumbnail from "../../../styles/Images.styled";

interface PlaylistTileProps {
  playlist: Playlist;
}

const PlaylistTile: React.FC<PlaylistTileProps> = ({ playlist }) => {
  return (
    <Container row>
      <Thumbnail src={playlist.images[0].url} />
      <Text>{playlist.name}</Text>
    </Container>
  );
};

export default PlaylistTile;
