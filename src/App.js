import React from "react";
import "./App.css";
import PokemonList from "./features/pokemon/view/PokemonList";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RandomPokemon from "./features/pokemon/view/RandomPokemon";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            <Route path="/pokemons" element={<PokemonList />} />
            <Route path="/pokemons/:pokemon" element={<RandomPokemon />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
