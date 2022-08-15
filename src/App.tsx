import React from "react";
import "./App.css";
import PokemonList from "./features/pokemon/view/PokemonList";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/basicViews/Home";
import RandomPokemon from "./features/pokemon/view/RandomPokemon";
import SinglePokemon from "./features/pokemon/view/SinglePokemon";
import { ThemeProvider as MaterialUIProvider } from "@mui/material";
import { theme } from "./app/theme";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider } from "styled-components";
import Add from "./features/basicViews/Add/Add";
function App() {
  return (
    <StylesProvider injectFirst>
      <MaterialUIProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <Navigation />
              <Routes>
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemons" element={<PokemonList />} />
                  <Route path="/pokemons/random" element={<RandomPokemon />} />
                  <Route
                    path="/pokemons/:pokemonId"
                    element={<SinglePokemon />}
                  />
                  <Route path="/add" element={<Add />} />
                </>
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </MaterialUIProvider>
    </StylesProvider>
  );
}

export default App;
