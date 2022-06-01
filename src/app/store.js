import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "../features/pokemon/pokemonsSlice";
import pokemonSlice from "../features/pokemon/pokemonSlice";
export const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice,
    pokemon: pokemonSlice,
  },
});
