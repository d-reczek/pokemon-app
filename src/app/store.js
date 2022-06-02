import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "../features/pokemon/pokemonsSlice";
export const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice,
  },
});
