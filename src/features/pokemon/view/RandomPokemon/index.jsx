import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../../pokemonsSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  togglePokemonVisibility,
  selectSinglePokemon,
  selectPokemonsFetching,
  selectPokemonsError,
  selectTogglePokemonVisibility,
} from "../../pokemonsSlice";
import { Button } from "@mui/material";

const RandomPokemon = () => {
  const [number, setNumber] = useState();
  const fetchdPokemon = useSelector(selectSinglePokemon);
  const pokemonsIsFetching = useSelector(selectPokemonsFetching);
  const fetchingError = useSelector(selectPokemonsError);
  const pokemonVisibility = useSelector(selectTogglePokemonVisibility);
  let random = max => Math.floor(Math.random() * max) + 1;

  const dispatch = useDispatch();

  const fetchAllPokemons = useCallback(() => {
    if (number) {
      dispatch(fetchPokemons(number));
    } else {
      setNumber(random(898));
      dispatch(togglePokemonVisibility());
    }
  }, [dispatch, pokemonVisibility, number]);

  useEffect(() => {
    dispatch(togglePokemonVisibility());
  }, []);

  useEffect(() => {
    fetchAllPokemons();
  }, [dispatch, fetchAllPokemons]);

  const handleGetNewRandomPokemon = () => {
    dispatch(togglePokemonVisibility());
    if (pokemonVisibility) {
      setNumber(random(898));
    }
  };

  console.log("number", number);
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
    <>
      <Button onClick={handleGetNewRandomPokemon} sx={{ margin: "30px" }}>
        {pokemonVisibility ? "Get new random pokemon" : "Who's that Pokemon"}
      </Button>
      <div
        style={{
          backgroundColor: "lightgrey",
          borderRadius: "15px",
          width: "30%",
          margin: "0 auto",
        }}>
        {pokemonVisibility && (
          <div key={fetchdPokemon.id}>
            <p>
              Pokemon name:
              <span style={{ textTransform: "capitalize" }}>
                {` ${fetchdPokemon.name}`}
              </span>{" "}
            </p>
            <img src={fetchdPokemon.sprites.front_default} alt="pokemon" />
          </div>
        )}
      </div>
    </>
  );
};

export default RandomPokemon;
