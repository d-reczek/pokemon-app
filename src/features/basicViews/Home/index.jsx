import styled from "styled-components";
import { theme } from "../../../app/theme";

export const TitleContainer = styled.div`
  color: ${theme.palette.secondary.main};
  text-transform: uppercase;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: normal;
`;
const Description = styled.p`
  font-size: 1.5rem;
  text-transform: initial
`;
const Home = () => {
  return (
    <TitleContainer>
      <Title>Hello in Pokemon App</Title>
      <Description>
        Here you can view a list of Pokémon, view information about each Pokémon
        and draw a random Pokémon. <br />
        Have fun!
      </Description>
    </TitleContainer>
  );
};

export default Home;
