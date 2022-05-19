import { makeAPIRequest, RequestResult } from "./index";
import getLocationCode from "../utils/getLocationCode";
import { Track } from "../utils/types";

interface ITracks {
  getRecommendations({
    trackId,
    token,
    artistId,
  }: {
    trackId: string;
    token: string;
    artistId: string;
  }): Promise<RequestResult & { tracks: Track[] }>;
}

const Tracks: ITracks = {
  async getRecommendations({ trackId, token, artistId }): Promise<any> {
    const path = `/recommendations?seed_tracks=${trackId}&seed_artists=${artistId}&limit=3&market=${getLocationCode()}`;
    const response = await makeAPIRequest({
      path,
      accessToken: token,
      method: "GET",
    });

    return {
      success: Boolean(response.tracks),
      tracks: response.tracks,
    };
  },
};

export default Tracks;
