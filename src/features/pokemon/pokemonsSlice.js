import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const pokemonInitialState = {
  listOfAllPokemons: {
    data: null,
    isFetching: false,
    error: null,
  },
  // singlePokemon: {
  //   id: null,
  //   name: "",
  //   photo: "",
  // },
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
        // state.singlePokemon.id = action.payload.id;
        // state.singlePokemon.name = action.payload.name;
        // state.singlePokemon.photo = action.payload.sprites.front_default;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        state.listOfAllPokemons.error = "wystapil błąd";
        state.listOfAllPokemons.isFetching = false;
      });
  },
});

export const listOfAllPokemonsFetching = state =>
  state.pokemons.listOfAllPokemons.isFetching;
export const listOfAllPokemonsError = state =>
  state.pokemons.listOfAllPokemons.error;
export const listOfAllPokemons = state => state.pokemons.listOfAllPokemons.data;
// export const singlePokemonId = state => state.pokemons.singlePokemon.id;
// export const singlePokemonName = state => state.pokemons.singlePokemon.name;
// export const singlePokemonPhoto = state => state.pokemons.singlePokemon.photo;

export default pokemonsSlice.reducer;
