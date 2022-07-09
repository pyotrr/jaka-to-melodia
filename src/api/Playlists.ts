import { makeAPIRequest, RequestResult } from "./index";
import getRandomInt from "../utils/getRandomInt";
import { Playlist, Track } from "../utils/types";
import Users from "../idb/respositories/users";

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
  track: Track;
};

type GetRandomPlaylistParams = {
  token: string;
  playlistId: string;
  totalNumberOfTracks: number;
};

type GetPlaylistParams = {
  token: string;
  id: string;
};

type GetPlaylistResult = RequestResult & {
  playlist: Playlist;
};

interface IPlaylists {
  getUserPlaylists(
    params: GetUserPlaylistParams
  ): Promise<GetUserPlaylistsResult>;
  getRandomPlaylistTrack(
    params: GetRandomPlaylistParams
  ): Promise<GetRandomPlaylistTrackResult>;
  getPlaylistTrack(params: {
    token: string;
    playlistId: string;
    index: number;
  }): Promise<GetRandomPlaylistTrackResult>;
  getPlaylist(params: GetPlaylistParams): Promise<GetPlaylistResult>;
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
        .filter(
          (playlist: RawPlaylist) =>
            playlist.images.length && playlist.tracks.total
        )
        .map((playlist: RawPlaylist) => ({
          id: playlist.id,
          name: playlist.name,
          owner: { name: playlist.owner.display_name },
          tracks: playlist.tracks,
          thumbnailUrl: playlist.images[playlist.images.length - 1].url,
          coverUrl: playlist.images[0].url,
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
    const { country } = await Users.getUser();
    const path = `/playlists/${playlistId}/tracks?limit=${1}&offset=${offset}&market=${country}`;
    const response = await makeAPIRequest({
      path,
      accessToken: token,
      method: "GET",
    });

    const track = response.items[0].track;

    return {
      success: Boolean(track),
      track: { ...track, previewUrl: track.preview_url },
    };
  },

  async getPlaylist({
    id,
    token,
  }: GetPlaylistParams): Promise<GetPlaylistResult> {
    const { country } = await Users.getUser();
    const path = `/playlists/${id}?market=${country}`;

    const response: RawPlaylist = await makeAPIRequest({
      path: path,
      method: "GET",
      accessToken: token,
    });

    return {
      success: Boolean(response),
      playlist: {
        id: response.id,
        name: response.name,
        owner: { name: response.owner.display_name },
        tracks: response.tracks,
        thumbnailUrl: response.images[response.images.length - 1].url,
        coverUrl: response.images[0].url,
      },
    };
  },

  async getPlaylistTrack({
    token,
    playlistId,
    index,
  }): Promise<GetRandomPlaylistTrackResult> {
    const { country } = await Users.getUser();
    const path = `/playlists/${playlistId}/tracks?limit=${1}&offset=${index}&market=${country}`;
    const response = await makeAPIRequest({
      path,
      accessToken: token,
      method: "GET",
    });

    const track = response.items[0].track;

    return {
      success: Boolean(track),
      track: { ...track, previewUrl: track.preview_url },
    };
  },
};

export default Playlists;
