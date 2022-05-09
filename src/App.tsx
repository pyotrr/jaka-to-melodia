import React from "react";
import AppRouter from "./routing/AppRouter";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Global";
import { AuthProvider } from "./contexts/AuthContext";
import { DatabaseProvider } from "./contexts/DatabaseContext";

const theme = {
  colors: {
    primary: "forestgreen",
    secondary: "limegreen",
    background: "darkslategray",
    altBackground: "lightslategray",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DatabaseProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </DatabaseProvider>
    </ThemeProvider>
  );
}

export default App;
