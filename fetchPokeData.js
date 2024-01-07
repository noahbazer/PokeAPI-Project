const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=30";

let pokemonData = [];

let favorites = [];

async function fetchData() {
  const response = await fetch(API_URL);
  const data = await response.json();
  pokemonData = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      return await pokemonResponse.json();
    })
  );
  displayData();
}

function displayData() {
  const container = document.querySelector(".card-container");
  container.innerHTML = "";

  pokemonData.forEach((pokemon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const hpStat = pokemon.stats.find((stat) => stat.stat.name === "hp");
    const type =
      pokemon.types.length > 0 ? pokemon.types[0].type.name : "Unknown";

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>HP: ${hpStat ? hpStat.base_stat : "Unknown"}</p>
        <p>Type: ${type}</p>
        <button onclick="addToFavorites(${index})">Add to Favorites</button>
      `;
    container.appendChild(card);
  });
}

function addToFavorites(index) {
  favorites.push(pokemonData[index]);
  pokemonData.splice(index, 1);
  displayData();
  displayFavorites();
}

function displayFavorites() {}

function removeFromFavorites(index) {}

function sortData() {}

fetchData();
