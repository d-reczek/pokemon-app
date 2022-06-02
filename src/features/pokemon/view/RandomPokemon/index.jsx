import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../../pokemonsSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import {
  togglePokemonVisibility,
  selectSinglePokemon,
  selectPokemonsFetching,
  selectPokemonsError,
  selectTogglePokemonVisibility,
} from "../../pokemonsSlice";
import { Button } from "@mui/material";

const RandomPokemon = () => {
  let { pokemon } = useParams();

  const dispatch = useDispatch();

  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemons(pokemon));
  }, [dispatch, pokemon]);

  useEffect(() => {
    fetchAllPokemons();
  }, [dispatch, fetchAllPokemons]);

  const fetchdPokemon = useSelector(selectSinglePokemon);
  const pokemonsIsFetching = useSelector(selectPokemonsFetching);
  const fetchingError = useSelector(selectPokemonsError);
  const pokemonVisibility = useSelector(selectTogglePokemonVisibility);
  console.log("url", pokemonVisibility);
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
      <Button
        onClick={() => dispatch(togglePokemonVisibility())}
        sx={{ margin: "30px" }}>
        {pokemonVisibility ? "Hide pokemon" : "Show pokemon"}
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
