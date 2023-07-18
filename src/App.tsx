import React, { useState, useMemo, createContext, useCallback, RefObject, useEffect } from "react";
import { Identifier } from "dnd-core";

//Components
import { DndContainer } from "./DndContainer";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, styled } from '@mui/material/styles';
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
import { ReactComponent as CrossIcon } from "./images/icon-cross.svg";

// Styles
import { theme } from './theme/MainTheme';
import './App.css';

// Types
import { TaskType } from "./types/TaskListType";
import InputAdornment from "@mui/material/InputAdornment";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [createTask, setCreateTask] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [display, setDisplay] = useState<"all" | "active" | "completed">("all");
  const [mobileView, setMobileView] = useState<boolean>(false);

  /**To handle mobile view on change of screen width */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setMobileView(true);
      }
      else {
        setMobileView(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**handling dark and light mode */
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const OutlinedCircle = styled(RadioButtonUncheckedIcon)(({ theme }) => ({
    color: theme.palette.action.active,
  }));

  /**Handle todo item completion */
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

  /**To handle creation of a todo item */
  const handleTaskCreation = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setTaskList([...taskList, { id: taskList.length + 1, value: createTask, completed: false }]);
      setCreateTask("");
    }
  }

  /**Filtering task list based on different filter */
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

  /**To clear completed tasks from list */
  const handleClearCompleted = () => {
    setTaskList([...taskList.filter(x => !x.completed)]);
  }

  /**Dynamic List item for drag and drop */
  const renderListItem = useCallback((task: any, ref: RefObject<any>, handlerId: Identifier | null, index: number) => {
    const labelId = `checkbox-list-label-${task}`;
    return (
      <ListItem
        ref={ref} key={index} data-handler-id={handlerId}
        disablePadding
        divider
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => { setTaskList([...taskList.filter(x => x.id !== task.id)]) }} size={mobileView ? "small" : "medium"}>
            <CrossIcon />
          </IconButton>
        }
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              checkedIcon={<span style={task.completed ? { background: 'linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))', borderRadius: '50%', padding: '0 7px 0 7px' } : {}}><CheckIcon /></span>}
              icon={<OutlinedCircle />}
              onClick={handleToggle(task.id)}
            />
          </ListItemIcon>
          <ListItemText id={labelId} sx={task.completed ? { textDecorationLine: 'line-through', color: mode === "light" ? 'hsl(235.71deg 10.45% 73.73%)' : 'hsl(235deg 10.26% 54.12%)' } : {}} primary={task.value} />
        </ListItemButton>
      </ListItem>)
  }, [taskList]);

  const updateCards = (cards: any) => {
    const updatedCards = cards.map((data: any, index: any) => {
      data.priority = index + 1;
      return data;
    })
    setTaskList([...updatedCards]);
  }


  const actionButtonUI =
    <Grid container sx={mobileView ? { justifyContent: 'space-around', padding: '0 2.8rem 0 2.3rem', height: '50px', alignItems: 'center' } : { justifyContent: 'flex-start' }} spacing={0}>
      <Grid item><Button variant="text" size='small' onClick={() => setDisplay("all")} sx={display === "all" ? { color: 'hsl(220, 98%, 61%)' } : {}}>All</Button></Grid>
      <Grid item> <Button variant="text" size='small' onClick={() => setDisplay("active")} sx={display === "active" ? { color: 'hsl(220, 98%, 61%)' } : {}}>Active</Button></Grid>
      <Grid item><Button variant="text" size='small' onClick={() => setDisplay("completed")} sx={display === "completed" ? { color: 'hsl(220, 98%, 61%)' } : {}}>Completed</Button></Grid>
    </Grid>

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
              backgroundPositionX: mobileView ? '25%' : ''
            }}
          >
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems={"center"}
              sx={{ '& > *': { width: mobileView ? '80%' : '35%', position: 'relative' }, position: 'absolute', top: '4.2rem' }}>
              <Grid item>
                <Grid container direction="row" justifyContent={mobileView ? "space-around" : "space-evenly"}>
                  <Grid item xs>
                    <Typography variant='h4' fontWeight={700} letterSpacing={'0.1em'} color={'#fff'} fontSize={mobileView ? '1.8rem' : '2.125rem'}>T  O  D  O</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={colorMode.toggleColorMode}
                      color="inherit"
                      size={mobileView ? "small" : "medium"}
                    >
                      {mode === "dark" && <SunIcon />}
                      {mode === "light" && <MoonIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid mt={3.5}>
                <TextField
                  id="createTask"
                  type="text"
                  fullWidth
                  placeholder="Create a new todo..."
                  value={createTask}
                  onChange={(e) => setCreateTask(e.target.value)}
                  onKeyDown={handleTaskCreation}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <OutlinedCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item mt={3.5}>
                {taskList.length > 0 && <List sx={{ width: '100%', padding: '0px' }}>
                  <DndContainer cards={filteredList()} setCards={updateCards} renderCard={renderListItem} cardGroup="TodoItem" />

                  <Grid item >
                    <Grid container direction='row' sx={mobileView ? { justifyContent: 'space-between', padding: '0.5rem 1rem 0.5rem 1rem' } : { padding: '0.5rem', justifyContent: 'space-evenly' }}>
                      <Grid item md={3} lg={3}><Button variant="text" size='small' disabled>{taskList.filter(x => !x.completed).length} items left</Button></Grid>
                      {!mobileView && <Grid item xs={6} md={6} lg={6}>
                        {actionButtonUI}
                      </Grid>
                      }
                      <Grid item md={3} lg={3} ><Button variant="text" size='small' onClick={handleClearCompleted}>Clear Completed</Button></Grid>
                    </Grid>
                  </Grid>
                </List>}
                {taskList.length > 0 && mobileView && <Grid item mt={3.5} sx={{ background: mode === 'light' ? 'hsl(0, 0%, 100%)' : 'hsl(237, 14%, 26%)', borderRadius: '0.5rem', boxShadow: mode === 'dark' ? '0px 5px 10px  hsl(240, 21%, 7%)' : '0px 5px 10px hsl(236, 9%, 61%)' }}>
                  {actionButtonUI}
                </Grid>}
                {taskList.length > 0 && <Grid item xs={12} md={12} lg={12} mt={6} sx={{ textAlign: 'center', color: 'hsl(234, 11%, 52%)' }}> <Typography fontSize={'small'}>Drag and drop to reorder list</Typography></Grid>}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
