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
  countTypesAndDisplay();
}

  const setTypeIcon = (type) => {
    switch (type) {
        case "grass":
          return "./assets/icons/type/grass.png";
        case "poison":
          return "./assets/icons/type/poison.png";
        case "fire":
          return "./assets/icons/type/fire.png";
        case "flying":
          return "./assets/icons/type/flying.png";
        case "water":
          return "./assets/icons/type/water.png";
        case "bug":
          return "./assets/icons/type/bug.png";
        case "normal":
          return "./assets/icons/type/normal.png";
        case "electric":
          return "./assets/icons/type/electric.png";
        case "ground":
          return "./assets/icons/type/ground.png";
        case "fairy":
          return "./assets/icons/type/fairy.png";
        case "fighting":
          return "./assets/icons/type/fighting.png";
        case "psychic":
          return "./assets/icons/type/psychic.png";
        case "rock":
          return "./assets/icons/type/rock.png";
        case "steel":
          return "./assets/icons/type/steel.png";
        case "ice":
          return "./assets/icons/type/ice.png";
        case "ghost":
          return "./assets/icons/type/ghost.png";
        case "dragon":
          return "./assets/icons/type/dragon.png";
        default:
          return "./assets/icons/type/unknown.png";
        }
      }

function addToFavorites(index) {
  const card = document.querySelector(`.card[data-index="${index}"]`);
  favoritesContainer.appendChild(card);
  favorites.push(pokemonData[index]);
  pokemonData.splice(index, 1);
  const button = card.querySelector('button');
  button.textContent = 'Remove from Favorites';
  button.setAttribute('onclick', `removeFromFavorites(${index})`);
};

function removeFromFavorites(index) {
  const card = document.querySelector(`.card[data-index="${index}"]`);
  favoritesContainer.removeChild(card);
  mainContainer.appendChild(card);
  favorites.splice(index, 1);
  pokemonData.push(card);
  const button = card.querySelector('button');
  button.textContent = 'Add to Favorites';
  button.setAttribute('onclick', `addToFavorites(${index})`);
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

function countTypesAndDisplay() {
  const typeCount = {};

  pokemonData.forEach(pokemon => {
    pokemon.types.forEach(type => {
      const typeName = type.type.name;
      if (typeCount[typeName]) {
        typeCount[typeName]++;
      } else {
        typeCount[typeName] = 1;
      }
    });
  });

  const countContainer = document.querySelector('.count');
  countContainer.innerHTML = '';

  for (const type in typeCount) {
    const countDiv = document.createElement('div');
    const typeIcon = setTypeIcon(type);
    countDiv.innerHTML = `<img class="type-icon" src="${typeIcon}"> ${typeCount[type]}`;
    countContainer.appendChild(countDiv);
  }
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
};

function setActiveLink() {
  const containerLinks = document.querySelectorAll('.container-link');
  containerLinks.forEach(link => {
    link.addEventListener('click', () => {
      containerLinks.forEach(link => {
        link.removeAttribute('id');
      });
      link.setAttribute('id', 'active');
    });
  });
}

setActiveLink();