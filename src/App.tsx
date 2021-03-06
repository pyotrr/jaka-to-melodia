import React from "react";
import AppRouter from "./routing/AppRouter";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Global";
import { AuthProvider } from "./contexts/AuthContext";

const theme = {
  colors: {
    primary: "#417D7A",
    light: "#EDE6DB",
    background: "#1A3C40",
    altBackground: "#1D5C63",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
