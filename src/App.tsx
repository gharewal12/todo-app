import React from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from '@mui/material/styles';

// Images
import BgWhite from "./images/bg-desktop-light.jpg";
import BgDark from "./images/bg-desktop-dark.jpg";
import { ReactComponent as Moon } from "./images/icon-moon.svg";
import { ReactComponent as Sun } from "./images/icon-sun.svg";
import { Typography, TextField } from "@mui/material";

// Styles
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
                height: "50vh",
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${mode === "light" ? BgWhite : BgDark})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
            >
              <Grid container justifyContent={"flex-start"} >
                <Grid item xs={4} md={4} lg={4}></Grid>
                <Grid item xs={4} md={4} lg={4}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Grid container direction="row" justifyContent={"space-evenly"}>
                        <Grid item xs>
                          <Typography variant='h4' fontWeight={700} letterSpacing={'0.1em'} color={'#fff'}>T  O  D  O</Typography>
                        </Grid>
                        <Grid item >
                          <IconButton
                            onClick={colorMode.toggleColorMode}
                            color="inherit"
                          >
                            {mode === "dark" && <Sun />}
                            {mode === "light" && <Moon />}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} mt={2}>
                      <TextField type="text" fullWidth placeholder="Create a new todo..." id="fullWidth"  />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} md={4} lg={4}></Grid>
              </Grid>
            </Box>
          </Container>
        </div >
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
