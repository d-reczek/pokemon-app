import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

interface PokemonsListTypes {
  name: string;
  url: string;
}
interface PokemonListTypes {
  id: string;
  name: string;
  sprites: SpirtesTypes;
  height: number;
  weight: number;
}

interface SpirtesTypes {
  other: {
    ["official-artwork"]: {
      front_default: string;
    };
  };
}
interface PokemonInitialStateTypes {
  listOfAllPokemons: {
    data: null | PokemonsListTypes[];
    isFetching: boolean;
    error: string | null;
  };
  singlePokemon: {
    pokemon: null | PokemonListTypes;
    isFetching: boolean;
    error: string | null;
  };
  pokemonVisibilty: boolean;
  filters: {
    offset: number;
    pageSize: number;
  };
}

const pokemonInitialState: PokemonInitialStateTypes = {
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

type FiltersType = {
  offset: number;
  pageSize: number;
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (filters: FiltersType) => {
    const { offset, pageSize } = filters;
    const response = await (
      await axios(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pageSize}`
      )
    ).data;

    console.log(response.results);

    return response;
  }
);
export const fetchPokemon = createAsyncThunk(
  "pokemons/fetchPokemon",
  async (pokemonName: string | undefined | number) => {
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
  resetPokemonVisibility,
  updateOffset,
  updatePageSize,
} = pokemonsSlice.actions;
export const selectPokemonsFetching = (state: RootState) =>
  state.pokemons.listOfAllPokemons.isFetching;
export const selectPokemonsError = (state: RootState) =>
  state.pokemons.listOfAllPokemons.error;
export const selectListOfAllPokemons = (state: RootState) =>
  state.pokemons.listOfAllPokemons.data;
export const selectSinglePokemon = (state: RootState) =>
  state.pokemons.singlePokemon.pokemon;
export const selectSinglePokemonFetching = (state: RootState) =>
  state.pokemons.singlePokemon.isFetching;
export const selectSinglePokemonError = (state: RootState) =>
  state.pokemons.singlePokemon.error;

export const selectTogglePokemonVisibility = (state: RootState) =>
  state.pokemons.pokemonVisibilty;

export const selectPokemonFilters = (state: RootState) =>
  state.pokemons.filters;

export default pokemonsSlice.reducer;
