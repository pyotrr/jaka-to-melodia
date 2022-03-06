import { makeAPIRequest, RequestResult } from "./index";

export type Playlist = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  tracks: {
    href: string;
    total: number;
  };
};

type GetUserPlaylistsResult = {
  playlists: Playlist[];
  total: number;
};

interface IPlaylists {
  getUserPlaylists(
    token: string
  ): Promise<RequestResult & GetUserPlaylistsResult>;
}

const Playlists: IPlaylists = {
  async getUserPlaylists(
    token: string
  ): Promise<RequestResult & GetUserPlaylistsResult> {
    const response = await makeAPIRequest({
      path: "/me/playlists",
      accessToken: token,
      method: "GET",
    });

    return {
      success: Boolean(response.items),
      playlists: response.items,
      total: response.total,
    };
  },
};

export default Playlists;
