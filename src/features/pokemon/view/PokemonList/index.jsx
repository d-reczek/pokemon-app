import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemons,
  selectListOfAllPokemons,
  selectPokemonsFetching,
  selectPokemonsError,
  selectPokemonFilters,
  resetPokemonVisibility,
  updateOffset,
  updatePageSize,
} from "../../pokemonsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
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
  let { offset, pageSize } = useSelector(selectPokemonFilters);
  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemons({ offset, pageSize }));
    dispatch(resetPokemonVisibility());
  }, [dispatch, offset, pageSize]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);

  const pokemonList = useSelector(selectListOfAllPokemons);
  const pokemonsIsFetching = useSelector(selectPokemonsFetching);
  const fetchingError = useSelector(selectPokemonsError);

  const handleQuantityOfPokemons = e => {
    dispatch(updatePageSize(e.target.value));
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
        <Button
          variant="outlined"
          onClick={() => dispatch(updateOffset((offset -= 20)))}>
          Get previous Pokemons
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(updateOffset((offset += 20)))}>
          Get new Pokemons
        </Button>
      </div>
      <FormControl sx={{ width: "40%", m: "2%" }}>
        <InputLabel>Select quantity of pokemons</InputLabel>
        <Select
          label="Select quantity of pokemons"
          onChange={handleQuantityOfPokemons}
          value={pageSize}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
      </FormControl>
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
