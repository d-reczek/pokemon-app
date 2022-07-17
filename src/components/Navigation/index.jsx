import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/pokemons">
            Pokemon list
          </Button>
          <Button color="inherit" component={Link} to={`/pokemons/random`}>
            Random Pokemon
          </Button>
          <Button color="inherit" component={Link} to={`/add`}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navigation;
