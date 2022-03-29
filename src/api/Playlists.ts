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

type GetUserPlaylistsResult = RequestResult & {
  playlists: Playlist[];
  total: number;
  offset: number;
};

type GetUserPlaylistParams = {
  token: string;
  offset: number;
};

interface IPlaylists {
  getUserPlaylists(
    params: GetUserPlaylistParams
  ): Promise<GetUserPlaylistsResult>;
}

export const PLAYLIST_PAGINATION_LIMIT = 20;

const Playlists: IPlaylists = {
  async getUserPlaylists({
    token,
    offset,
  }): Promise<RequestResult & GetUserPlaylistsResult> {
    const path = `/me/playlists?limit=${PLAYLIST_PAGINATION_LIMIT}&offset=${offset}`;
    const response = await makeAPIRequest({
      path,
      accessToken: token,
      method: "GET",
    });

    return {
      success: Boolean(response.items),
      playlists: response.items,
      total: response.total,
      offset: response.offset,
    };
  },
};

export default Playlists;
