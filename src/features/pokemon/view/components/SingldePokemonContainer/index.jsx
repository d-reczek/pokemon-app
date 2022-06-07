const SinglePokemonContainer = ({ id, name, img, height, weight }) => {
  return (
    <div style={{ margin: "3%" }} key={id}>
      <p>
        Pokemon name:
        <span style={{ textTransform: "capitalize" }}>{` ${name}`}</span>{" "}
      </p>
      <p>
        height:
        <span style={{ textTransform: "capitalize" }}>{` ${height}`}</span>{" "}
      </p>
      <p>
        weight:
        <span style={{ textTransform: "capitalize" }}>{` ${weight}`}</span>{" "}
      </p>
      <img style={{ width: "45%" }} src={img} alt="pokemon" />
    </div>
  );
};

export default SinglePokemonContainer;
