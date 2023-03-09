import React, { useEffect, useState } from "react";
import "./App.css";

async function fetchPokemonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return {
    name: data.name,
    image: data.sprites.front_default,
    exp: data.base_experience,
  };
}

async function fetchAllPokemonData(pokemonList) {
  const promises = pokemonList.map((pokemon) => fetchPokemonData(pokemon.url));
  const data = await Promise.all(promises);
  return data;
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => fetchAllPokemonData(data.results))
      .then((pokemonData) => setPokemonList(pokemonData))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <img src={pokemon.image} alt={pokemon.name} />
            <div>
              <h2>{pokemon.name}</h2>
              <p>EXP: {pokemon.exp}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;