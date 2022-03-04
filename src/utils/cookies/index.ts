export const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value}`;
};

export const getCookie = (name: string): string => {
  const allCookies = document.cookie;
  if (!allCookies) return "";
  const cookie = allCookies
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!cookie) return "";
  const possibleCookieValue = cookie.split("=");
  return possibleCookieValue?.[1] ?? "";
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
