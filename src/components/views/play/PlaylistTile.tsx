import React, { MouseEventHandler } from "react";
import { Playlist } from "../../../api/Playlists";
import Text from "../../../styles/Typography.styled";
import Thumbnail from "../../../styles/Images.styled";
import { PlaylistTileStyled } from "../../../styles/components/PlaylistTile.styled";

interface PlaylistTileProps {
  playlist: Playlist;
  onClick: (playlist: Playlist) => any;
}

const PlaylistTile: React.FC<PlaylistTileProps> = ({ playlist, onClick }) => {
  const onPlaylistClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick(playlist);
  };

  return (
    <PlaylistTileStyled as="button" row onClick={onPlaylistClick}>
      <Thumbnail src={playlist.thumbnailUrl} />
      <Text>{playlist.name}</Text>
    </PlaylistTileStyled>
  );
};

export default PlaylistTile;
