"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f7f9fc", // very light blue/gray
      paper: "#fff",
    },
    primary: {
      main: "#2563eb", // blue-600
      contrastText: "#fff",
    },
    text: {
      primary: "#1e293b", // slate-800
      secondary: "#64748b", // slate-400
    },
    grey: {
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  typography: {
    fontFamily: [
      "Geist",
      "Inter",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: -1,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: -0.5,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1rem",
      color: "#1e293b",
    },
    body2: {
      fontSize: "0.95rem",
      color: "#64748b",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: "#fff",
        },
        notchedOutline: {
          borderColor: "#cbd5e1",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px 0 rgba(16,30,54,0.04)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px 0 rgba(16,30,54,0.04)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#64748b",
          fontWeight: 500,
        },
      },
    },
  },
});

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}