import React from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

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

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
          <Box
            sx={{
              height: "50vh",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${mode === "light" ? BgWhite : BgDark})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              flexWrap: 'wrap',
            }}
          >
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: '5rem', '& > *': { width: '30%' } }}>
              <Grid item >
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
              <Grid mt={2}>
                <TextField type="text" fullWidth placeholder="Create a new todo..." id="fullWidth" />
              </Grid>
              <Grid item mt={2}>
                <List sx={{ width: '100%' }}>
                  {[0, 1, 2, 3, 4].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem
                        key={value}
                        disablePadding
                        divider
                      >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
