import React from "react";
import AppRouter from "./routing/AppRouter";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Global";
import { AuthProvider } from "./contexts/AuthContext";

const theme = {
  colors: {
    primary: "forestgreen",
    secondary: "limegreen",
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
