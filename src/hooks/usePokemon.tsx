import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const getPokemonById = async (id: number) => {
    setIsLoading(true);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    //props
    isLoading,
    pokemon,

    formattedId: id.toString().padStart(3, "0"),
  }; //padStart es una funcion de los string para añadir en este caso '0' y mantener un formato en este caso de 3 digitos en el numero id del pokemon
};
