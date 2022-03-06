import { useEffect, useMemo, useState } from "react";
import { Playlist } from "../../api/Playlists";
import useIsMounted from "./useIsMounted";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

type PlaylistsState = {
  playlists: Playlist[];
  loading: boolean;
};

export default function usePlaylists(): PlaylistsState {
  const { token } = useAuth();
  const isMountedPredicate = useIsMounted();
  const [loading, setLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (!token) return;
    api.Playlists.getUserPlaylists(token)
      .then((res) => {
        if (isMountedPredicate()) {
          setPlaylists(res.playlists);
        }
      })
      .finally(() => setLoading(false));
  }, [isMountedPredicate, token]);

  return useMemo(
    () => ({
      playlists,
      loading,
    }),
    [loading, playlists]
  );
}
