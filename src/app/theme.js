import { teal } from "@mui/material/colors";
const { createTheme } = require("@mui/material");

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[900],
    },
  },
});
