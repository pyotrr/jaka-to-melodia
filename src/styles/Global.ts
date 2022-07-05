import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  html {
    margin: 0;
    height: 100vh;
  }
  body {
    background: radial-gradient(circle at center, rgba(29,92,99,1) 0%, rgba(26,60,64,1) 100%);
    margin: 0;
    height: 100vh;
    max-height: 100vh;
  }
  p {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
  div#root {
    height: 100vh;
    & > div {
      height: 100%;
    }
  }
`;

export default GlobalStyles;
