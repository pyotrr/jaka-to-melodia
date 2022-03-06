import Auth from "./Auth";
import Playlists from "./Playlists";
import { apiAuthHeader } from "../utils/authorization";

export type RequestResult = {
  success: boolean;
};

type RequestMethod = "POST" | "GET";

const REQUEST_TIMEOUT_TIME = 5000;

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
}): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_TIME);

  const requestPath = "https://api.spotify.com/v1";
  const authRequestPath = "https://accounts.spotify.com";

  const defaultHeaders = new Headers();
  defaultHeaders.append("Content-Type", "application/json");
  if (accessToken) {
    defaultHeaders.append("Authorization", apiAuthHeader(accessToken));
  }

  return window
    .fetch(`${makeAuthRequest ? authRequestPath : requestPath}${path}`, {
      method,
      headers: headers ? headers : defaultHeaders,
      ...(method === "GET" || !body ? {} : { body: JSON.stringify(body) }),
      signal: controller.signal,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      clearTimeout(timeoutId);
      return res.json();
    })
    .catch((e) => {
      if (e.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw e;
    });
};

const api = {
  Auth,
  Playlists,
};

export default api;
