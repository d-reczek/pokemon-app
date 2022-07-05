import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const pokemonInitialState = {
  listOfAllPokemons: {
    data: null,
    isFetching: true,
    error: null,
  },
  singlePokemon: {
    pokemon: null,
    isFetching: false,
    error: null,
  },
  pokemonVisibilty: false,
  filters: {
    offset: 20,
    pageSize: 20,
  },
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async filters => {
    const { offset, pageSize } = filters;
    const response = await (
      await axios(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pageSize}`
      )
    ).data;

    console.log(response);

    return response;
  }
);
export const fetchPokemon = createAsyncThunk(
  "pokemons/fetchPokemon",
  async pokemonName => {
    const response = await (
      await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    ).data;

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
    //tu miałem problem z komponentem RandomPokemoen
    //gdy po ustawieniu pokemonVisibility na true przalaczalem sie na widok
    //komponentu PokemonList a nastpenie wracalem do PokemonRandom
    //to wyskakiwal blad poniewaz pokemonVisibility pozostalo na true nie mogl wykonac sie fetch nowego pokemona
    // i pojawial sie blad ze nie mozna wykonac map poniwaz zmienna nie jest tablica czy cos podobnego
    //dlatego przy kazdym uruchomieniu jakby resetuje pokemonVisibility na false
    // tak by uniknac tego bledu nie wiem czy jest to zrobione "zgodnie ze sztuka"
    resetPokemonVisibility: state => {
      state.pokemonVisibilty = false;
    },

    updateOffset: (state, action) => {
      if (state.filters.offset === 0) {
        state.filters.offset = 20;
        alert(
          "This is first page with pokemons, you will return to the first page"
        );
      } else {
        state.filters.offset = action.payload;
      }
    },
    updatePageSize: (state, action) => {
      state.filters.pageSize = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.listOfAllPokemons.isFetching = true;
      })
      .addCase(fetchPokemon.pending, state => {
        state.singlePokemon.isFetching = true;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.listOfAllPokemons.isFetching = false;
        state.listOfAllPokemons.data = action.payload.results;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.singlePokemon.isFetching = false;
        state.singlePokemon.pokemon = action.payload;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        state.listOfAllPokemons.error = "wystapil błąd";
        state.listOfAllPokemons.isFetching = false;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.singlePokemon.error = "wystapil błąd";
        state.singlePokemon.isFetching = false;
      });
  },
});

export const {
  togglePokemonVisibility,
  getNewPokemons,
  getPreviousPokemons,
  resetPokemonVisibility,
  updateOffset,
  updatePageSize,
} = pokemonsSlice.actions;
export const selectPokemonsFetching = state =>
  state.pokemons.listOfAllPokemons.isFetching;
export const selectPokemonsError = state =>
  state.pokemons.listOfAllPokemons.error;
export const selectListOfAllPokemons = state =>
  state.pokemons.listOfAllPokemons.data;
export const selectSinglePokemon = state =>
  state.pokemons.singlePokemon.pokemon;
export const selectSinglePokemonFetching = state =>
  state.pokemons.singlePokemon.isFetching;
export const selectSinglePokemonError = state =>
  state.pokemons.singlePokemon.error;

export const selectTogglePokemonVisibility = state =>
  state.pokemons.pokemonVisibilty;

export const selectPokemonFilters = state => state.pokemons.filters;

export default pokemonsSlice.reducer;
