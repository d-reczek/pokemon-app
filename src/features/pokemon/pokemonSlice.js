import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const singlePokemonInitialState = {
  singlePokemon: {
    id: null,
    name: "",
    photo: "",
    isFetching: false,
    error: null,
  },
  showPokemon: false,
};

export const fetchPokemon = createAsyncThunk(
  "counter/fetchPokemon",
  async amount => {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${amount}`)
    ).json();

    console.log(response);

    return response;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: singlePokemonInitialState,
  reducers: {
    showOrHidePokemon: state => {
      state.showPokemon = !state.showPokemon;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.singlePokemon.isFetching = true;
      })

      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.singlePokemon.isFetching = false;
        state.singlePokemon.id = action.payload.id;
        state.singlePokemon.name = action.payload.name;
        state.singlePokemon.photo = action.payload.sprites.front_default;
      })

      .addCase(fetchPokemon.rejected, (state, action) => {
        state.singlePokemon.error = "wystapil błąd";
        state.singlePokemon.isFetching = false;
      });
  },
});

export const { showOrHidePokemon } = pokemonSlice.actions;
export const singlePokemonFetching = state =>
  state.pokemon.singlePokemon.isFetching;
export const singlePokemonError = state => state.pokemon.singlePokemon.error;
export const singlePokemonId = state => state.pokemon.singlePokemon.id;
export const singlePokemonName = state => state.pokemon.singlePokemon.name;
export const singlePokemonPhoto = state => state.pokemon.singlePokemon.photo;
export const showPokemon = state => state.pokemon.showPokemon;

export default pokemonSlice.reducer;
