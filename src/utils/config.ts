const config = {
  clientId: "ab368a72359c448da0632c229b861c83",
  redirectURI:
    process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000/redirect",
  clientSecret: process.env.REACT_APP_CLIENT_SECRET as string,
};

export default config;
