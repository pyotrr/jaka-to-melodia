import React, { MouseEventHandler, useState } from "react";
import { PLAYLIST_PAGINATION_LIMIT } from "../../../api/Playlists";
import { Playlist } from "../../../utils/types";
import usePlaylists from "../../../utils/hooks/usePlaylists";
import PlaylistTile from "./PlaylistTile";
import InfiniteScroll from "../../ui/infiniteScroll";
import PageContainer from "../../layout/PageContainer";
import Dialog from "../../ui/Dialog";
import Thumbnail from "../../../styles/Images.styled";
import { PlaylistDialog } from "../../../styles/views/PlaylistDialog.styled";
import Text from "../../../styles/Typography.styled";
import { Button } from "../../../styles/components/Button.styled";
import { useNavigate } from "react-router-dom";

const Play: React.FC = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState<number>(0);
  const { loading, playlists, hasMore } = usePlaylists({
    offset,
  });
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + PLAYLIST_PAGINATION_LIMIT);
  };

  const onPlaylistTileClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const onPlayButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    navigate("/game", { state: { playlist: selectedPlaylist } });
  };

  return (
    <PageContainer title="Select a playlist">
      {selectedPlaylist && (
        <Dialog closeDialog={() => setSelectedPlaylist(null)}>
          <PlaylistDialog>
            <Thumbnail
              src={selectedPlaylist.coverUrl}
              alt="Selected playlist cover"
            />
            <Text>{selectedPlaylist.name}</Text>
            <Text>{`by ${selectedPlaylist.owner.name}`}</Text>
            <Text>{`${selectedPlaylist.tracks.total} tracks`}</Text>
            <Button onClick={onPlayButtonClick}>Play</Button>
          </PlaylistDialog>
        </Dialog>
      )}
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
