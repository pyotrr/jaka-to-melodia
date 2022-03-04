import config from "../utils/config";
import { makeAPIRequest, RequestResult } from "./index";
import { encodedAuthHeader } from "../utils/authorization";

type GetAccessTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type RefreshAccessTokenResponse = {
  accessToken: string;
};

interface IAuth {
  authorizeLink(): string;
  getAccessToken(code: string): Promise<RequestResult & GetAccessTokenResponse>;
  refreshAccessToken(
    refreshToken: string
  ): Promise<RequestResult & RefreshAccessTokenResponse>;
}

const Auth: IAuth = {
  authorizeLink(): string {
    const endpointPath = "https://accounts.spotify.com/authorize?";
    return `${endpointPath}response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectURI}&state=state&scope=user-read-private user-read-email playlist-read-private`;
  },

  async getAccessToken(
    code: string
  ): Promise<RequestResult & GetAccessTokenResponse> {
    const formUrlEncodedPath = `/api/token?code=${encodeURIComponent(
      code
    )}&redirect_uri=${encodeURIComponent(
      config.redirectURI
    )}&grant_type=authorization_code`;

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", encodedAuthHeader());

    const result = await makeAPIRequest({
      path: formUrlEncodedPath,
      method: "POST",
      headers,
      makeAuthRequest: true,
    }).then((res) => res.json());

    return {
      success: Boolean(result.access_token),
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    };
  },

  async refreshAccessToken(
    refreshToken: string
  ): Promise<RequestResult & RefreshAccessTokenResponse> {
    const formUrlEncodedPath = `/api/token?refresh_token=${encodeURIComponent(
      refreshToken
    )}&grant_type=refresh_token`;

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", encodedAuthHeader());

    const result = await makeAPIRequest({
      path: formUrlEncodedPath,
      method: "POST",
      headers,
      makeAuthRequest: true,
    }).then((res) => res.json());

    return {
      success: Boolean(result.access_token),
      accessToken: result.access_token,
    };
  },
};

export default Auth;
