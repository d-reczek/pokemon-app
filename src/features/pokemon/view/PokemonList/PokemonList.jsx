import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listOfAllPokemons } from "../../pokemonsSlice";
import { fetchPokemons } from "../../pokemonsSlice";
import { listOfAllPokemonsFetching } from "../../pokemonsSlice";
import { showPokemon } from "../../pokemonsSlice";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(listOfAllPokemons);
  const pokemonsIsFetching = useSelector(listOfAllPokemonsFetching);
  const showHidePokemon = useSelector(showPokemon);
  const fetchAllPokemons = useCallback(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);
  console.log("showPoke", showPokemon);
  return <button onClick={() => dispatch(showHidePokemon)}>Shwo</button>;
};

export default PokemonList;
