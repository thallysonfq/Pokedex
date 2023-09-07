const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

function buscarDescricaoPokemon(pokemonId) {
  const urlBase = "https://pokeapi.co/api/v2/pokemon-species/";
  const urlCompleta = `${urlBase}${pokemonId}/`;
  fetch(urlCompleta)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível obter a descrição do Pokémon.");
      }
      return response.json();
    })
    .then((data) => {
      const descricao = data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const descricaoLimpa = descricao.flavor_text.replace(/\n/g, " ");

      console.log(descricaoLimpa);
    })
    .catch((error) => {
      console.error("Erro ao buscar a descrição do Pokémon:", error);
    });
}

// Exemplo de uso: buscar a descrição do Pokémon com ID 1 (Bulbasaur)
buscarDescricaoPokemon(4);
