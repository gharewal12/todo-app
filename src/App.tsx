import React, { useState, useMemo, createContext, useCallback } from "react";

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
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// Images
import BgWhite from "./images/bg-desktop-light.jpg";
import BgDark from "./images/bg-desktop-dark.jpg";
import { ReactComponent as MoonIcon } from "./images/icon-moon.svg";
import { ReactComponent as SunIcon } from "./images/icon-sun.svg";
import { ReactComponent as CheckIcon } from "./images/icon-check.svg";

// Styles
import { theme } from './theme/MainTheme';
import './App.css';

// Types
import { TaskType } from "./types/TaskListType";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [createTask, setCreateTask] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [display, setDisplay] = useState<"all" | "active" | "completed">("all");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const handleToggle = (taskId: number) => () => {
    setTaskList((prev) => {
      return prev.map((x) => {
        if (x.id === taskId) {
          return {
            ...x, completed: !x.completed
          }
        }
        return x;
      });
    });
  };

  const handleTaskCreation = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setTaskList([...taskList, { id: taskList.length + 1, value: createTask, completed: false }]);
      setCreateTask("");
    }
  }

  const filteredList = useCallback(() => {
    const filteredList = taskList;
    switch (display) {
      case "active":
        return filteredList.filter(x => !x.completed);
      case "completed":
        return filteredList.filter(x => x.completed);
      default:
        return filteredList;
    }
  }, [display, taskList]);

  const handleClearCompleted = () => {
    setTaskList([...taskList.filter(x => !x.completed)]);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
          <Box
            sx={{
              height: "45vh",
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
              sx={{ '& > *': { width: '35%', position: 'relative' }, position: 'absolute', top: '4.2rem' }}>
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
                      {mode === "dark" && <SunIcon />}
                      {mode === "light" && <MoonIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid mt={2}>
                <TextField
                  id="createTask"
                  type="text"
                  fullWidth
                  placeholder="Create a new todo..."
                  value={createTask}
                  onChange={(e) => setCreateTask(e.target.value)}
                  onKeyDown={handleTaskCreation}
                />
              </Grid>
              <Grid item mt={2}>
                {taskList.length > 0 && <List sx={{ width: '100%', paddingBottom: '0px' }}>
                  {filteredList().map((task) => {
                    const labelId = `checkbox-list-label-${task}`;

                    return (
                      <ListItem
                        key={task.id}
                        disablePadding
                        divider
                      >
                        <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={task.completed}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                              checkedIcon={<span style={task.completed ? { background: 'linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))', borderRadius: '50%', padding: '0 7px 0 7px' } : {}}><CheckIcon /></span>}
                              icon={<RadioButtonUncheckedIcon />}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} sx={{ textDecorationLine: task.completed ? 'line-through' : '' }} primary={task.value} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  <Grid item >
                    <Grid container direction='row' justifyContent={'space-evenly'} sx={{ padding: '0.5rem' }}>
                      <Grid item xs={3} md={3} lg={3}><Button variant="text" size='small' disabled>{taskList.filter(x => !x.completed).length} items left</Button></Grid>
                      <Grid item xs={6} md={6} lg={6}>
                        <Grid container justifyContent={'flex-start'} spacing={0}>
                          <Grid item><Button variant="text" size='small' onClick={() => setDisplay("all")} sx={display === "all" ? { color: 'hsl(220, 98%, 61%)' } : {}}>All</Button></Grid>
                          <Grid item> <Button variant="text" size='small' onClick={() => setDisplay("active")} sx={display === "active" ? { color: 'hsl(220, 98%, 61%)' } : {}}>Active</Button></Grid>
                          <Grid item><Button variant="text" size='small' onClick={() => setDisplay("completed")} sx={display === "completed" ? { color: 'hsl(220, 98%, 61%)' } : {}}>Completed</Button></Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={3} lg={3} ><Button variant="text" size='small' onClick={handleClearCompleted}>Clear Completed</Button></Grid>
                    </Grid>
                  </Grid>
                </List>}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
