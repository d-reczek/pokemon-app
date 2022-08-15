
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  selectSinglePokemon,
  selectSinglePokemonFetching,
  selectSinglePokemonError,
  fetchPokemon,
} from "../../pokemonsSlice";
import { Button } from "@mui/material";
import SinglePokemonContainer from "../components/SingldePokemonContainer";
import { Link, useParams } from "react-router-dom";

const SinglePokemon = () => {
  const dispatch = useAppDispatch();
  const { pokemonId } = useParams();

  const fetchdPokemon = useAppSelector(selectSinglePokemon);
  const pokemonIsFetching = useAppSelector(selectSinglePokemonFetching);
  const fetchingError = useAppSelector(selectSinglePokemonError);

  useEffect(() => {
    dispatch(fetchPokemon(pokemonId));
  }, [dispatch, pokemonId]);

  if (pokemonIsFetching) {
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
  console.log(fetchdPokemon);
  return (
    <>
      <Button
        variant="outlined"
        sx={{ m: "1rem" }}
        component={Link}
        to={`/pokemons/`}>
        Back to pokemon list
      </Button>
      {fetchdPokemon && (
        <SinglePokemonContainer
          id={fetchdPokemon.id}
          name={fetchdPokemon.name}
          img={fetchdPokemon.sprites.other["official-artwork"].front_default}
          height={fetchdPokemon.height}
          weight={fetchdPokemon.weight}
        />
      )}
    </>
  );
};

export default SinglePokemon;
