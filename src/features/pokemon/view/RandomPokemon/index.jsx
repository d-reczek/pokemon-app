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
  const [randomNumber, setRandomNumber] = useState();
  const fetchdPokemon = useSelector(selectSinglePokemon);
  const pokemonsIsFetching = useSelector(selectPokemonsFetching);
  const fetchingError = useSelector(selectPokemonsError);
  const pokemonVisibility = useSelector(selectTogglePokemonVisibility);
  const random = max => Math.floor(Math.random() * max) + 1;
  const amountOfPokemons = 898;
  const dispatch = useDispatch();

  const fetchPokemon = useCallback(() => {
    if (randomNumber) {
      dispatch(fetchPokemons(randomNumber));
    } else {
      setRandomNumber(random(amountOfPokemons));
      dispatch(togglePokemonVisibility());
    }
  }, [dispatch, randomNumber]);

  useEffect(() => {
    dispatch(togglePokemonVisibility());
  }, [dispatch]);

  useEffect(() => {
    fetchPokemon();
  }, [dispatch, fetchPokemon]);

  const handleGetNewRandomPokemon = () => {
    dispatch(togglePokemonVisibility());
    if (pokemonVisibility) {
      setRandomNumber(random(amountOfPokemons));
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
    <>
      <Button onClick={handleGetNewRandomPokemon} sx={{ margin: "30px" }}>
        {pokemonVisibility ? "Get new random pokemon" : "Who's that Pokemon?"}
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
