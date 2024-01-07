document.getElementById('favorites-link').addEventListener('click', function(event) {
    event.preventDefault();
    const container = document.querySelector(".card-container");
    container.innerHTML = "";
    displayFavorites();
});