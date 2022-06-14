import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemons,
  selectListOfAllPokemons,
  selectPokemonsFetching,
  selectPokemonsError,
  selectPokemonFilters,
  resetPokemonVisibility,
  updateFilters,
} from "../../pokemonsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Button, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
  let { offset, limit } = useSelector(selectPokemonFilters);
  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemons({ offset, limit }));
    dispatch(resetPokemonVisibility());
  }, [dispatch, offset, limit]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);

  const pokemonList = useSelector(selectListOfAllPokemons);
  const pokemonsIsFetching = useSelector(selectPokemonsFetching);
  const fetchingError = useSelector(selectPokemonsError);

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
        <Button
          variant="outlined"
          onClick={() => dispatch(updateFilters((offset -= 20)))}>
          Get previous Pokemons
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(updateFilters((offset += 20)))}>
          Get new Pokemons
        </Button>
      </div>

      <PokemonContainer>
        {pokemonList.map(pokemon => (
          <Tooltip key={pokemon.name} title="Show pokemon" placement="top">
            <Button
              sx={{ color: "inherit" }}
              component={Link}
              to={`/pokemons/${pokemon.name}`}>
              <div>
                <p style={{ textTransform: "capitalize" }}>{pokemon.name}</p>
              </div>
            </Button>
          </Tooltip>
        ))}
      </PokemonContainer>
    </div>
  );
};

export default PokemonList;
