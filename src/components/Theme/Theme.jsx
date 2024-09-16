"use client"
import { ThemeProvider, createTheme } from "@mui/material/styles";

const myTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

export default function Theme({ children }) {
    return (
        <ThemeProvider theme={myTheme}>
            {children}
        </ThemeProvider>
    );
}
