import React, { useState } from "react";
import { Playlist, PLAYLIST_PAGINATION_LIMIT } from "../../../api/Playlists";
import usePlaylists from "../../../utils/hooks/usePlaylists";
import PlaylistTile from "./PlaylistTile";
import { Container } from "../../../styles/Containers.styled";
import InfiniteScroll from "../../ui/infiniteScroll";

const Play: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const { loading, playlists, hasMore } = usePlaylists({ offset });

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + PLAYLIST_PAGINATION_LIMIT);
  };

  return (
    <Container>
      <InfiniteScroll
        list={playlists}
        renderElement={(playlist: Playlist) => (
          <PlaylistTile playlist={playlist} />
        )}
        hasMore={hasMore}
        loading={loading}
        onLoad={handleLoadMore}
      />
    </Container>
  );
};

export default Play;
