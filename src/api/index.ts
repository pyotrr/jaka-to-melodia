import Auth from "./Auth";
import { encodedAuthHeader } from "../utils/constants";

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
  authorize = false,
}: {
  path: string;
  method: RequestMethod;
  body?: any;
  headers?: any;
  makeAuthRequest?: boolean;
  authorize?: boolean;
}): Promise<Response> => {
  const requestPath = "https://api.spotify.com/v1";
  const authRequestPath = "https://accounts.spotify.com";

  const defaultHeaders = new Headers();
  defaultHeaders.append("Content-Type", "application/json");
  if (authorize) {
    defaultHeaders.append("Authorization", encodedAuthHeader());
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
};

export default api;
