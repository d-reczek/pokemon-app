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
  offset: 20,
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
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

    getNewPokemons: state => {
      state.offset += 20;
    },
    getPreviousPokemons: state => {
      state.offset -= 20;
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
        state.singlePokemon.pokemon = action.payload;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        state.listOfAllPokemons.error = "wystapil błąd";
        state.listOfAllPokemons.isFetching = false;
      });
  },
});

export const selectPokemonsFetching = state =>
  state.pokemons.listOfAllPokemons.isFetching;
export const selectPokemonsError = state =>
  state.pokemons.listOfAllPokemons.error;
export const selectListOfAllPokemons = state =>
  state.pokemons.listOfAllPokemons.data;

export const {
  togglePokemonVisibility,
  getNewPokemons,
  getPreviousPokemons,
  resetPokemonVisibility,
} = pokemonsSlice.actions;

export const selectSinglePokemon = state =>
  state.pokemons.singlePokemon.pokemon;

export const selectTogglePokemonVisibility = state =>
  state.pokemons.pokemonVisibilty;

export const selectGetNewPokemons = state => state.pokemons.offset;

export default pokemonsSlice.reducer;
