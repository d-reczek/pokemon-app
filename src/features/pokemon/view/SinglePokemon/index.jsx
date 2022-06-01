import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon } from "../../pokemonSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import {
  showPokemon,
  showOrHidePokemon,
  singlePokemonFetching,
  singlePokemonError,
  singlePokemonId,
  singlePokemonPhoto,
  singlePokemonName,
} from "../../pokemonSlice";
import { Button } from "@mui/material";

const SinglePokemon = () => {
  let { pokemon } = useParams();
  const dispatch = useDispatch();
  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemon(pokemon));
  }, [dispatch, pokemon]);
  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);
  const pokemonName = useSelector(singlePokemonName);
  const pokemonPhoto = useSelector(singlePokemonPhoto);
  const pokemonId = useSelector(singlePokemonId);
  const pokemonsIsFetching = useSelector(singlePokemonFetching);
  const fetchingError = useSelector(singlePokemonError);
  const pokemonVisible = useSelector(showPokemon);
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
      <Button
        onClick={() => dispatch(showOrHidePokemon())}
        sx={{ margin: "30px" }}>
        {pokemonVisible ? "Hide pokemon" : "Show pokemon"}
      </Button>
      {pokemonVisible && (
        <div key={pokemonId}>
          <p>{pokemonName}</p>
          <img src={pokemonPhoto} alt="pokemon" />
        </div>
      )}
    </div>
  );
};

export default SinglePokemon;
