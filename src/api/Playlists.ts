import { makeAPIRequest, RequestResult } from "./index";
import getRandomInt from "../utils/getRandomInt";

type RawPlaylist = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  tracks: {
    href: string;
    total: number;
  };
  owner: {
    display_name: string;
  };
};

export type Playlist = {
  id: string;
  name: string;
  thumbnailUrl: string;
  tracks: {
    href: string;
    total: number;
  };
  owner: {
    name: string;
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

type GetRandomPlaylistTrackResult = RequestResult & {
  track: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
  };
};

type GetRandomPlaylistParams = {
  token: string;
  playlistId: string;
  totalNumberOfTracks: number;
};

interface IPlaylists {
  getUserPlaylists(
    params: GetUserPlaylistParams
  ): Promise<GetUserPlaylistsResult>;
  getRandomPlaylistTrack(
    params: GetRandomPlaylistParams
  ): Promise<GetRandomPlaylistTrackResult>;
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
      playlists: response.items
        .filter((playlist: RawPlaylist) => playlist.images.length)
        .map((playlist: RawPlaylist) => ({
          id: playlist.id,
          name: playlist.name,
          owner: { name: playlist.owner.display_name },
          tracks: playlist.tracks,
          thumbnailUrl: playlist.images[playlist.images.length - 1].url,
        })),
      total: response.total,
      offset: response.offset,
    };
  },

  async getRandomPlaylistTrack({
    playlistId,
    totalNumberOfTracks,
    token,
  }): Promise<GetRandomPlaylistTrackResult> {
    const offset = getRandomInt(0, totalNumberOfTracks - 1);
    const path = `/playlists/${playlistId}/tracks?limit=${1}&offset=${offset}`;
    const response = await makeAPIRequest({
      path,
      accessToken: token,
      method: "GET",
    });
    return {
      success: Boolean(response.items),
      track: response.items[0]?.track,
    };
  },
};

export default Playlists;
