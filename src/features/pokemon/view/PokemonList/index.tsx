import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { TitleContainer } from "../../../basicViews/Home";
import { theme } from "../../../../app/theme";

const PokemonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 24px;
  background-color: #f2aeae;
`;
const PokemonName = styled.div`
  color: #fff;
  background-color: ${theme.palette.secondary.main};
  width: 100px;
  :hover {
    background-color: ${theme.palette.primary.main};
  }
`;
const PokemonList = () => {
  const dispatch = useAppDispatch();
  let { offset, pageSize } = useAppSelector(selectPokemonFilters);

  useEffect(() => {
    dispatch(fetchPokemons({ offset, pageSize }));
    dispatch(resetPokemonVisibility());
  }, [dispatch, offset, pageSize]);

  const pokemonList = useAppSelector(selectListOfAllPokemons);
  const pokemonsIsFetching = useAppSelector(selectPokemonsFetching);
  const fetchingError = useAppSelector(selectPokemonsError);

  const handleQuantityOfPokemons = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      <TitleContainer style={{ fontSize: "30px", margin: "10px" }}>
        List of all pokemons
      </TitleContainer>

      <div
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}>
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
      <FormControl
        variant="outlined"
        color="secondary"
        sx={{ width: "250px", m: "2%" }}>
        <InputLabel>Select quantity of pokemons</InputLabel>
        <Select
          label="Select quantity of pokemons"
          onChange={e => handleQuantityOfPokemons}
          value={pageSize}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
      </FormControl>

      <PokemonContainer>
        {pokemonList!.map(pokemon => (
          <Tooltip key={pokemon.name} title="Show pokemon" placement="top">
            <Button
              sx={{
                color: "inherit",
              }}
              component={Link}
              to={`/pokemons/${pokemon.name}`}>
              <PokemonName>
                <p style={{ textTransform: "capitalize" }}>{pokemon.name}</p>
              </PokemonName>
            </Button>
          </Tooltip>
        ))}
      </PokemonContainer>
    </div>
  );
};

export default PokemonList;
