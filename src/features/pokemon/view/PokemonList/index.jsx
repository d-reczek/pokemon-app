import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemons,
  selectListOfAllPokemons,
  selectPokemonsFetching,
  selectPokemonsError,
  selectGetNewPokemons,
  getNewPokemons,
  getPreviousPokemons,
  resetPokemonVisibility,
} from "../../pokemonsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";

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
  let offset = useSelector(selectGetNewPokemons);

  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemons(`?offset=${offset}&limit=20`));
    dispatch(resetPokemonVisibility());
  }, [dispatch, offset]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);

  const pokemonList = useSelector(selectListOfAllPokemons);
  const pokemonsIsFetching = useSelector(selectPokemonsFetching);
  const fetchingError = useSelector(selectPokemonsError);

  const handleGetNewPokemons = () => {
    dispatch(getNewPokemons());
  };
  const handleGetPreviousPokemons = () => {
    if (offset === 0) {
      offset = 0;
      alert("this is first page with pokemons");
    } else {
      dispatch(getPreviousPokemons());
    }
  };
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

  return (
    <div>
      <Typography style={{ fontSize: "30px", margin: "10px" }} variant="h1">
        List of all pokemons
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Button variant="outlined" onClick={handleGetNewPokemons}>
          Get new Pokemons
        </Button>
        <Button variant="outlined" onClick={handleGetPreviousPokemons}>
          Get previous Pokemons
        </Button>
      </div>

      <PokemonContainer>
        {Array.isArray(pokemonList) &&
          pokemonList.map(pokemon => (
            <p style={{ textTransform: "capitalize" }} key={pokemon.name}>
              {pokemon.name}
            </p>
          ))}
      </PokemonContainer>
    </div>
  );
};

export default PokemonList;
