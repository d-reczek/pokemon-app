import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  togglePokemonVisibility,
  selectSinglePokemon,
  selectSinglePokemonFetching,
  selectSinglePokemonError,
  selectTogglePokemonVisibility,
  fetchPokemon,
} from "../../pokemonsSlice";
import { Button } from "@mui/material";
import SinglePokemonContainer from "../components/SingldePokemonContainer";
import { theme } from "../../../../app/theme";

const RandomPokemon = () => {
  const [randomNumber, setRandomNumber] = useState<number>();
  const fetchdPokemon = useAppSelector(selectSinglePokemon);
  const pokemonIsFetching = useAppSelector(selectSinglePokemonFetching);
  const fetchingError = useAppSelector(selectSinglePokemonError);
  const pokemonVisibility = useAppSelector(selectTogglePokemonVisibility);
  const random = (max: number) => Math.floor(Math.random() * max) + 1;
  const amountOfPokemons: number = 898;
  const dispatch = useAppDispatch();

  const fetchSinglePokemon = useCallback(() => {
    if (randomNumber) {
      dispatch(fetchPokemon(randomNumber));
    } else {
      setRandomNumber(random(amountOfPokemons));
    }
  }, [dispatch, randomNumber]);

  useEffect(() => {
    fetchSinglePokemon();
  }, [dispatch, fetchSinglePokemon]);

  const handleGetNewRandomPokemon = () => {
    dispatch(togglePokemonVisibility());
    if (pokemonVisibility) {
      setRandomNumber(random(amountOfPokemons));
    }
  };

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
  return (
    <>
      <Button
        onClick={handleGetNewRandomPokemon}
        sx={{
          fontSize: "1.5rem",
          margin: "30px",

          ":hover": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
          },
        }}>
        {pokemonVisibility ? "Get new random pokemon" : "Who's that Pokemon?"}
      </Button>
      <div>
        {pokemonVisibility && (
          <SinglePokemonContainer
            id={fetchdPokemon!.id}
            name={fetchdPokemon!.name}
            img={fetchdPokemon!.sprites.other["official-artwork"].front_default}
            height={fetchdPokemon!.height}
            weight={fetchdPokemon!.weight}
          />
        )}
      </div>
    </>
  );
};

export default RandomPokemon;
