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
  filters: {
    offset: 20,
    limit: 20,
  },
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async filters => {
    const { offset, limit } = filters;
    const response = await (
      await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      )
    ).json();

    console.log(response);

    return response;
  }
);
export const fetchPokemon = createAsyncThunk(
  "pokemons/fetchPokemon",
  async pokemonName => {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
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

    updateFilters: (state, action) => {
      if (action.payload.next) {
        state.filters.offset += action.payload.offset;
      } else if (action.payload.prev) {
        if (state.filters.offset === 0) {
          state.filters.offset = 0;
          alert("this is first page with pokemons");
        } else {
          state.filters.offset -= action.payload.offset;
        }
      }
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
  updateFilters,
} = pokemonsSlice.actions;

export const selectSinglePokemon = state =>
  state.pokemons.singlePokemon.pokemon;
export const selectSinglePokemonFetching = state =>
  state.pokemons.singlePokemon.isFetching;
export const selectSinglePokemonError = state =>
  state.pokemons.singlePokemon.error;

export const selectTogglePokemonVisibility = state =>
  state.pokemons.pokemonVisibilty;

export const selectFilters = state => state.pokemons.filters;

export default pokemonsSlice.reducer;
