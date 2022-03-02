import config from "./config";
import { Buffer } from "buffer";

export const encodedAuthHeader = (): string => {
  return `Basic ${Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64")}`;
};
