import { makeAPIRequest, RequestResult } from "./index";
import { Track } from "../utils/types";
import Users from "../idb/respositories/users";

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
    const { country } = await Users.getUser();
    const path = `/recommendations?seed_tracks=${trackId}&seed_artists=${artistId}&limit=3&market=${country}`;
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
