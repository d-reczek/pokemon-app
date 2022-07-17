import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "../features/pokemon/pokemonsSlice";
import userSlice from "../features/basicViews/userSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice,
    user: userSlice,
  },
});
