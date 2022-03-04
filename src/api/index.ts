import Auth from "./Auth";
import Playlists from "./Playlists";
import { apiAuthHeader } from "../utils/authorization";

export type RequestResult = {
  success: boolean;
};

type RequestMethod = "POST" | "GET";

export const makeAPIRequest = async ({
  path,
  method,
  body,
  headers,
  makeAuthRequest = false,
  accessToken,
}: {
  path: string;
  method: RequestMethod;
  body?: any;
  headers?: any;
  makeAuthRequest?: boolean;
  accessToken?: string;
}): Promise<Response> => {
  const requestPath = "https://api.spotify.com/v1";
  const authRequestPath = "https://accounts.spotify.com";

  const defaultHeaders = new Headers();
  defaultHeaders.append("Content-Type", "application/json");
  if (accessToken) {
    defaultHeaders.append("Authorization", apiAuthHeader(accessToken));
  }

  return window.fetch(
    `${makeAuthRequest ? authRequestPath : requestPath}${path}`,
    {
      method,
      headers: headers ? headers : defaultHeaders,
      ...(method === "GET" || !body ? {} : { body: JSON.stringify(body) }),
    }
  );
};

const api = {
  Auth,
  Playlists,
};

export default api;
