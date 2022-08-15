import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokemonsSlice from "../features/pokemon/pokemonsSlice";
import userSlice from "../features/basicViews/userSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice,
    user: userSlice,
  },
});
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
