import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import BgWhite from "./images/bg-desktop-light.jpg";
import BgDark from "./images/bg-desktop-dark.jpg";
import { ReactComponent as Moon } from "./images/icon-moon.svg";
import { ReactComponent as Sun } from "./images/icon-sun.svg";
import { Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/MainTheme';
import './App.css';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme(mode)}>
        <div className="App">
          <CssBaseline />
          <Container maxWidth={false} disableGutters>
            <Box
              sx={{
                bgcolor: "#cfe8fc",
                height: "40vh",
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${mode === "light" ? BgWhite : BgDark})`,
              }}
            >
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <Typography component='div' variant='h4'>TODO</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {mode === "dark" && <Sun />}
                    {mode === "light" && <Moon />}
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div >
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
