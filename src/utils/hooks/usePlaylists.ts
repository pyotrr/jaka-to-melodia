import { useEffect, useMemo, useState } from "react";
import { Playlist } from "../../api/Playlists";
import useIsMounted from "./useIsMounted";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

type PlaylistsState = {
  playlists: Playlist[];
  loading: boolean;
  hasMore: boolean;
};

type UsePlaylistsParams = {
  offset: number;
};

export default function usePlaylists({
  offset,
}: UsePlaylistsParams): PlaylistsState {
  const { token } = useAuth();
  const isMountedPredicate = useIsMounted();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.Playlists.getUserPlaylists({ token, offset })
      .then((res) => {
        if (!isMountedPredicate()) return;
        setPlaylists((prevPlaylists) => [...prevPlaylists, ...res.playlists]);
        setHasMore(res.playlists.length > 0);
      })
      .finally(() => setLoading(false));
  }, [isMountedPredicate, offset, token]);

  return useMemo(
    () => ({
      playlists,
      loading,
      hasMore,
    }),
    [hasMore, loading, playlists]
  );
}
