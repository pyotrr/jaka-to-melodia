import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import useIsMounted from "../../../utils/hooks/useIsMounted";

const Home: React.FC = () => {
  const { token } = useAuth();
  const isMountedPredicate = useIsMounted();
  const [playlists, setPlaylists] = useState<any>([]);

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
      {playlists.map(
        (playlist: { name: any; id: React.Key | null | undefined }) => (
          <div key={playlist.id}>
            <p>{playlist.name}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
