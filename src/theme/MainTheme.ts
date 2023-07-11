import { createTheme } from "@mui/material";

export const theme = (mode: any) => createTheme({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: "#fff",
                },
                divider: 'rgba(0, 0, 0, 0.12)',
                background: {
                    default: 'hsl(0, 0%, 98%)',
                    paper: 'hsl(0, 0%, 98%)',
                },
                text: {
                    primary: 'hsl(235, 19%, 35%)',
                    secondary: 'rgba(0, 0, 0, 0.6)',
                    disabled: 'rgba(0, 0, 0, 0.38)',
                },
                action: {
                    active: 'hsl(0, 0%, 98%)',
                    hover: 'hsl(0, 0%, 98%)',
                    selected: 'rgba(0, 0, 0, 0.08)',
                    disabled: 'rgba(0, 0, 0, 0.26)',
                    disabledBackground: 'rgba(0, 0, 0, 0.12)',
                },
            }
            : {
                // palette values for dark mode
                divider: 'rgba(255, 255, 255, 0.12)',
                background: {
                    default: 'hsl(235, 21%, 11%)',
                    paper: 'hsl(235, 21%, 11%)',
                },
                text: {
                    primary: 'hsl(234, 39%, 85%)',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                    disabled: 'rgba(255, 255, 255, 0.5)',
                },
                action: {
                    active: 'hsl(235, 24%, 19%)',
                    hover: 'hsl(235, 24%, 19%)',
                    selected: 'rgba(255, 255, 255, 0.16)',
                    disabled: 'rgba(255, 255, 255, 0.3)',
                    disabledBackground: 'rgba(255, 255, 255, 0.12)',
                },
            }),
    },
    typography: {
        fontFamily: 'Outfit, sans-serif',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: getTextFieldStyle(mode),
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    display: 'none'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: getTextFieldStyle(mode),
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    color: ' hsl(234, 11%, 52%)',
                    backgroundColor: 'transparent',
                    fontWeight: 400
                },
            }
        }
    }
});

const getTextFieldStyle = (mode: string) => {
    if (mode === 'light') {
        return {
            background: 'hsl(0, 0%, 98%)',
        };
    }
    else {
        return {
            background: 'hsl(237, 14%, 26%)',
        };
    }
};