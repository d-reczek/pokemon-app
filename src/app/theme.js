import { red } from "@mui/material/colors";
const { createTheme } = require("@mui/material");

export const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: red[900],
    },
  },
});
