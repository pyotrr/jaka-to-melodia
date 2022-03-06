import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import useIsMounted from "../../../utils/hooks/useIsMounted";
import { Playlist } from "../../../api/Playlists";

const Home: React.FC = () => {
  const { token } = useAuth();
  const isMountedPredicate = useIsMounted();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (!token) return;
    api.Playlists.getUserPlaylists(token).then((res) => {
      if (isMountedPredicate()) {
        setPlaylists(res.playlists);
      }
    });
  }, [isMountedPredicate, token]);

  return (
    <div>
      {playlists.map((playlist: Playlist) => (
        <div key={playlist.id}>
          <p>{playlist.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
