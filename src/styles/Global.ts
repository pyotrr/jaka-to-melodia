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
    background-color: #f3f3f3;
    margin: 0;
    height: 100vh;
  }
  p {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
`;

export default GlobalStyles;
