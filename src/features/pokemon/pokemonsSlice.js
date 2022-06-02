import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const pokemonInitialState = {
  listOfAllPokemons: {
    data: null,
    isFetching: false,
    error: null,
  },
  singlePokemon: {
    pokemon: null,
    isFetching: false,
    error: null,
  },
  pokemonVisibilty: false,
};

export const fetchPokemons = createAsyncThunk(
  "counter/fetchPokemons",
  async amount => {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${amount}`)
    ).json();

    console.log(response);

    return response;
  }
);

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: pokemonInitialState,
  reducers: {
    togglePokemonVisibility: state => {
      state.pokemonVisibilty = !state.pokemonVisibilty;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.listOfAllPokemons.isFetching = true;
        state.pokemonVisibilty = false;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.listOfAllPokemons.isFetching = false;
        state.listOfAllPokemons.data = action.payload.results;
        state.singlePokemon.pokemon = action.payload;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        state.listOfAllPokemons.error = "wystapil błąd";
        state.listOfAllPokemons.isFetching = false;
        state.pokemonVisibilty = false;
      });
  },
});

export const selectPokemonsFetching = state =>
  state.pokemons.listOfAllPokemons.isFetching;
export const selectPokemonsError = state =>
  state.pokemons.listOfAllPokemons.error;
export const selectListOfAllPokemons = state =>
  state.pokemons.listOfAllPokemons.data;

export const { togglePokemonVisibility } = pokemonsSlice.actions;

export const selectSinglePokemon = state =>
  state.pokemons.singlePokemon.pokemon;

export const selectTogglePokemonVisibility = state =>
  state.pokemons.pokemonVisibilty;

export default pokemonsSlice.reducer;
