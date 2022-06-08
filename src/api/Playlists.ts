import { makeAPIRequest, RequestResult } from "./index";
import getRandomInt from "../utils/getRandomInt";
import { Playlist, Track } from "../utils/types";
import getLocationCode from "../utils/getLocationCode";

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
    const path = `/playlists/${playlistId}/tracks?limit=${1}&offset=${offset}&market=${getLocationCode()}`;
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
