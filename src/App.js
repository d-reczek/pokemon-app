import React from "react";
import "./App.css";
import PokemonList from "./features/pokemon/view/PokemonList/PokemonList";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <>
            <Route path="pokemon-list" element={<PokemonList />} />
            <Route path="/" element={<Home />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
