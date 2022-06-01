import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

const Navigation = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="pokemon-list">
            Pokemon list
          </Button>
          <Button color="inherit" component={Link} to="/bulbasaur/">
            Single Pokemon
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navigation;
