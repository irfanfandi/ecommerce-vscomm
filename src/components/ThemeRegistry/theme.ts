import { createTheme } from "@mui/material/styles";
import { Playfair_Display, Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#41A0E4",
    },
    secondary: {
      main: "#F9F9F9",
    },
    error: {
      main: "rgb(238, 54, 140)",
    },
    warning: {
      main: "rgb(255, 188, 43)",
    },
    success: {
      main: "rgb(0, 182, 155)",
    },
    info: {
      main: "rgb(45, 182, 245)",
    },
    text: {
      primary: "#1F1C17",
      secondary: "#757575",
    },
    background: {
      default: "#F8F8F8",
      paper: "#FFF",
    },
    divider: "rgb(229, 234, 242)",
  },
  typography: {
    fontFamily: [poppins.style.fontFamily, playfair.style.fontFamily].join(","),
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          boxShadow: "none",
          ":hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
