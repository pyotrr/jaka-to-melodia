import React, { useState } from "react";
import { Playlist, PLAYLIST_PAGINATION_LIMIT } from "../../../api/Playlists";
import usePlaylists from "../../../utils/hooks/usePlaylists";
import PlaylistTile from "./PlaylistTile";
import InfiniteScroll from "../../ui/infiniteScroll";
import PageContainer from "../../layout/PageContainer";

const Play: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const { loading, playlists, hasMore } = usePlaylists({
    offset,
  });
  // TODO playlist dialog
  const [, setSelectedPlaylist] = useState<Playlist | null>(null);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + PLAYLIST_PAGINATION_LIMIT);
  };

  const onPlaylistTileClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <PageContainer title="Select a playlist">
      <InfiniteScroll
        list={playlists}
        renderElement={(playlist: Playlist) => (
          <PlaylistTile playlist={playlist} onClick={onPlaylistTileClick} />
        )}
        hasMore={hasMore}
        loading={loading}
        onLoad={handleLoadMore}
      />
    </PageContainer>
  );
};

export default Play;
