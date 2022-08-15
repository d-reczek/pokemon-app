import React from "react";
import styled from "styled-components";
import { theme } from "../../../../../app/theme";

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 20px;
  font-size: 1.2rem;
`;
const Paragrpah = styled.p`
  margin: 0px;
`;
const Title = styled.span`
  text-transform: capitalize;
  font-weight: bold;
  color: ${theme.palette.secondary.main};
`;
const TitleContainer = styled(PokemonContainer)``;
const Image = styled.img`
  width: 25%;
  padding: 20px;
  background-color: #f2aeae;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
interface SinglePokemonContainerProps {
  id: string;
  name: string;
  img: string;
  height: number;
  weight: number;
}

const SinglePokemonContainer: React.FC<SinglePokemonContainerProps> = ({
  id,
  name,
  img,
  height,
  weight,
}) => {
  return (
    <PokemonContainer key={id}>
      <TitleContainer>
        <Paragrpah>
          Paragrpahokemon name:
          <Title>{` ${name}`}</Title>
        </Paragrpah>
        <Paragrpah>
          Height:
          <Title>{` ${height}`}</Title>
        </Paragrpah>
        <Paragrpah>
          Weight:
          <Title>{` ${weight}`}</Title>
        </Paragrpah>
      </TitleContainer>

      <Image src={img} alt="pokemon" />
    </PokemonContainer>
  );
};

export default SinglePokemonContainer;
