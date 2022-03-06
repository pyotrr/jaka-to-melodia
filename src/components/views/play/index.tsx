import React from "react";
import { Playlist } from "../../../api/Playlists";
import usePlaylists from "../../../utils/hooks/usePlaylists";
import Loading from "../../layout/Loading";

const Home: React.FC = () => {
  const { loading, playlists } = usePlaylists();

  if (loading) return <Loading />;

  return (
    <div>
      {playlists.map((playlist: Playlist) => (
        <div
          key={playlist.id}
          style={{ display: "flex", marginBottom: "0.5rem" }}
        >
          <img
            src={playlist.images[0]?.url}
            alt={"img"}
            style={{ width: "100px", height: "100px" }}
          />
          <p>{playlist.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
