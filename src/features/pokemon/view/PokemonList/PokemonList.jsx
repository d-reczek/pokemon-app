import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../../pokemonsSlice";
import {
  listOfAllPokemons,
  listOfAllPokemonsFetching,
  listOfAllPokemonsError,
} from "../../pokemonsSlice";
import { showPokemon } from "../../pokemonsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Typography } from "@mui/material";

const PokemonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 24px;
  background-color: lightgrey;
  border-radius: 15px;
`;
const PokemonList = () => {
  const dispatch = useDispatch();

  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);
  const pokemonList = useSelector(listOfAllPokemons);
  const pokemonsIsFetching = useSelector(listOfAllPokemonsFetching);
  const fetchingError = useSelector(listOfAllPokemonsError);
  const showHidePokemon = useSelector(showPokemon);
  if (pokemonsIsFetching) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress size={100} />
      </Box>
    );
  }
  if (fetchingError) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {fetchingError}
      </Box>
    );
  }
  console.log(pokemonsIsFetching);
  return (
    <div>
      <Typography style={{ fontSize: "30px", margin: "10px" }} variant="h1">
        List of all pokemons
      </Typography>
      <PokemonContainer>
        {Array.isArray(pokemonList) &&
          pokemonList.map(pokemon => <p key={pokemon.name}>{pokemon.name}</p>)}
      </PokemonContainer>
    </div>
  );
};

export default PokemonList;
