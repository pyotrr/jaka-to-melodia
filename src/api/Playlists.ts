import { makeAPIRequest, RequestResult } from "./index";

type GetUserPlaylistsResult = {
  playlists: any[];
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
    }).then((res) => res.json());

    return {
      success: Boolean(response.items),
      playlists: response.items,
      total: response.total,
    };
  },
};

export default Playlists;
