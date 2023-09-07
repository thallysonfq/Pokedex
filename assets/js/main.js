const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");
const content = document.getElementById("content");

const maxRecords = 151;
const limit = 5;
let offset = 0;

const loadPokemonItens = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => {
        return `        
      <li class="pokemon ${pokemon.type}" >
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
         ${pokemon.types
           .map((type) => `<li class="type ${type}">${type}</li>`)
           .join("")}
        </ol>
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
    </li>`;
      })
      .join("");
    pokemonList.innerHTML += newHtml;

    const pokemon = document.querySelectorAll(".pokemon");
    pokemon.forEach((pokemon) => {
      pokemon.addEventListener("click", () => {
        content.innerHTML = `  <h1>${pokemon.name}</h1>
        `;
      });
    });
  });
};

loadPokemonItens(offset, limit);

loadMore.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = limit + offset;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, limit);
    loadMore.parentElement.removeChild(loadMore);
  } else {
    loadPokemonItens(offset, limit);
  }
});
