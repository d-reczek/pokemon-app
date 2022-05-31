import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import pokemonsSlice from "../features/pokemon/pokemonsSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsSlice,
  },
});
