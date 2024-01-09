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

  const setTypeIcon = (type) => {
    switch (type) {
      case "grass":
        return "https://archives.bulbagarden.net/media/upload/7/74/GrassIC_Big.png";
      case "poison":
        return "https://archives.bulbagarden.net/media/upload/3/3d/PoisonIC_Big.png";
      case "fire":
        return "https://archives.bulbagarden.net/media/upload/2/26/FireIC_Big.png";
      case "flying":
        return "https://archives.bulbagarden.net/media/upload/c/cb/FlyingIC_Big.png";
      case "water":
        return "https://archives.bulbagarden.net/media/upload/5/56/WaterIC_Big.png";
      case "bug":
        return "https://archives.bulbagarden.net/media/upload/c/c8/BugIC_Big.png";
      case "normal":
        return "https://archives.bulbagarden.net/media/upload/3/39/NormalIC_Big.png";
      case "electric":
        return "https://archives.bulbagarden.net/media/upload/4/4a/ElectricIC_Big.png";
      case "ground":
        return "https://archives.bulbagarden.net/media/upload/8/8f/GroundIC_Big.png";
      case "fairy":
        return "https://archives.bulbagarden.net/media/upload/4/4a/FairyIC_Big.png";
      case "fighting":
        return "https://archives.bulbagarden.net/media/upload/4/4a/FightingIC_Big.png";
      case "psychic":
        return "https://archives.bulbagarden.net/media/upload/4/4a/PsychicIC_Big.png";
      case "rock":
        return "https://archives.bulbagarden.net/media/upload/4/4a/RockIC_Big.png";
      case "steel":
        return "https://archives.bulbagarden.net/media/upload/4/4a/SteelIC_Big.png";
      case "ice":
        return "https://archives.bulbagarden.net/media/upload/4/4a/IceIC_Big.png";
      case "ghost":
        return "https://archives.bulbagarden.net/media/upload/4/4a/GhostIC_Big.png";
      case "dragon":
        return "https://archives.bulbagarden.net/media/upload/4/4a/DragonIC_Big.png";
      case "fairy":
        return "https://archives.bulbagarden.net/media/upload/4/4a/FairyIC_Big.png";
      case "fighting":
        return "https://archives.bulbagarden.net/media/upload/4/4a/FightingIC_Big.png";
      case "psychic":
        return "https://archives.bulbagarden.net/media/upload/4/4a/PsychicIC_Big.png";
        case "rock":
        return "https://archives.bulbagarden.net/media/upload/4/4a/RockIC_Big.png";
      case "steel":
        return "https://archives.bulbagarden.net/media/upload/4/4a/SteelIC_Big.png";
      case "ice":
        return "https://archives.bulbagarden.net/media/upload/4/4a/IceIC_Big.png";
      case "ghost":
        return "https://archives.bulbagarden.net/media/upload/4/4a/GhostIC_Big.png";
      case "dragon":
        return "https://archives.bulbagarden.net/media/upload/4/4a/DragonIC_Big.png";
      default:
        return "https://archives.bulbagarden.net/media/upload/4/4a/UnknownIC_Big.png";
      }
    }

function displayData() {
  const container = document.querySelector(".card-container");
  container.innerHTML = "";

  pokemonData.forEach((pokemon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const types = pokemon.types.map((type) => type.type.name);

    card.innerHTML = `
      <div class="card-image">
        <img class='card-sprite' src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}">
      </div>
      <div class="card-content">
        <h2 class='card-title'>${(pokemon.name).toUpperCase()}</h2>
        <div class="types">
          ${types.map((type) => `<img class="typeicon" src="${setTypeIcon(type)}">`).join("")}
        </div>
        <button onclick="addToFavorites(${index})">Add to Favorites</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToFavorites(index) {
  const card = document.querySelector(`.card[data-index="${index}"]`);
  favoritesContainer.appendChild(card);
  favorites.push(pokemonData[index]);
  pokemonData.splice(index, 1);
};

function removeFromFavorites(index) {
  const card = document.querySelector(`.card[data-index="${index}"]`);
  mainContainer.appendChild(card);
  pokemonData.push(favorites[index]);
  favorites.splice(index, 1);
};

function displayData() {
  const container = document.querySelector('.card-container');
  container.innerHTML = '';

  pokemonData.forEach((pokemon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    const types = pokemon.types.map((type) => type.type.name);

    card.innerHTML = `
      <div class="card-image">
        <img class='card-sprite' src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}">
      </div>
      <div class="card-content">
        <h2 class='card-title'>${(pokemon.name).toUpperCase()}</h2>
        <div class="types">
          ${types.map((type) => `<img class="typeicon" src="${setTypeIcon(type)}">`).join("")}
        </div>
        <button onclick="addToFavorites(${index})">Add to Favorites</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function displayFavorites() {
  const favoritesContainer = document.querySelector('.favorites-card-container');
  favoritesContainer.innerHTML = '';

  favorites.forEach((pokemon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    const types = pokemon.types.map((type) => type.type.name);

    card.innerHTML = `
      <div class="card-image">
        <img class='card-sprite' src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      </div>
      <div class="card-content">
        <h2 class='card-title'>${(pokemon.name).toUpperCase()}</h2>
        <div class="types">
          ${types.map((type) => `<img class="type-icon" src="${setTypeIcon(type)}">`).join('')}
        </div>
        <button onclick="removeFromFavorites(${index})">Remove from Favorites</button>
      </div>
    `;
    favoritesContainer.appendChild(card);
  });
}

fetchData();

const mainContainer = document.querySelector('.card-container');
const favoritesContainer = document.querySelector('.favorites-card-container');
const showFavoritesContainer = () => {
  mainContainer.style.display = 'none';
  favoritesContainer.style.display = 'flex';
}

const showMainContainer = () => {
  mainContainer.style.display = 'flex';
  favoritesContainer.style.display = 'none';
};


function sortByNameAsc() {
  const cards = mainContainer.querySelectorAll('.card');
  const sortedCards = Array.from(cards).sort((a, b) => a.querySelector('.card-title').textContent.localeCompare(b.querySelector('.card-title').textContent));
  sortedCards.forEach((card) => {
    mainContainer.appendChild(card);
  });
}

function sortByNameDesc() {
  const cards = mainContainer.querySelectorAll('.card');
  const sortedCards = Array.from(cards).sort((a, b) => b.querySelector('.card-title').textContent.localeCompare(a.querySelector('.card-title').textContent));
  sortedCards.forEach((card) => {
    mainContainer.appendChild(card);
  });
}

function sortCardsAlphabetically() {
  const cards = favoritesContainer.querySelectorAll('.card');
  const sortedCards = Array.from(cards).sort((a, b) => a.querySelector('.card-title').textContent.localeCompare(b.querySelector('.card-title').textContent));
  sortedCards.forEach((card) => {
    favoritesContainer.appendChild(card);
  });
}

function sortCardsReverseAlphabetically() {
  const cards = favoritesContainer.querySelectorAll('.card');
  const sortedCards = Array.from(cards).sort((a, b) => b.querySelector('.card-title').textContent.localeCompare(a.querySelector('.card-title').textContent));
  sortedCards.forEach((card) => {
    favoritesContainer.appendChild(card);
  });
}
