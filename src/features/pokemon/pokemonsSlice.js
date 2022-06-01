import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const pokemonInitialState = {
  listOfAllPokemons: {
    data: null,
    isFetching: false,
    error: null,
  },
  showHidePokemon: false,
};

export const fetchPokemons = createAsyncThunk(
  "counter/fetchPokemons",
  async amount => {
    const response = await (
      await fetch("https://pokeapi.co/api/v2/pokemon")
    ).json();

    console.log(response);

    return response;
  }
);

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: pokemonInitialState,
  reducers: {
    showPokemon: state => {
      state.showHidePokemon = !state.showHidePokemon;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.listOfAllPokemons.isFetching = true;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.listOfAllPokemons.isFetching = false;
        state.listOfAllPokemons.data = action.payload.results;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        state.listOfAllPokemons.error = "wystapil błąd";
        state.listOfAllPokemons.isFetching = false;

      });
  },
});

export const { showPokemon } = pokemonsSlice.actions;
export const listOfAllPokemonsFetching = state =>
  state.pokemons.listOfAllPokemons.isFetching;
export const listOfAllPokemonsError = state =>
  state.pokemons.listOfAllPokemons.error;
export const listOfAllPokemons = state => state.pokemons.listOfAllPokemons.data;

export default pokemonsSlice.reducer;
