// Fetch API + eveniment butoane

const buttons = document.querySelectorAll(".btn-primary");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    window.location.href = "store.html?category=" + category;
  });
});

function displayDataFromQueryParameter() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "dog";

  if (category) {
    fetchDataFor(category);
  } else {
    console.error("Category or data missing.");
  }
}

window.onload = function () {
  displayDataFromQueryParameter();
};

function fetchDataFor(category) {
  const apiKey = "L/nmI91T3YBxgjwlE/S4vA==6k95lo9Jji9kREL6";
  let url;

  if (category) {
    url = `https://api.api-ninjas.com/v1/animals?name=${category}`;
  } else {
    const defaultCategory = "dog";
    url = `https://api.api-ninjas.com/v1/animals?name=${defaultCategory}`;
  }

  const headers = {
    "X-Api-Key": apiKey,
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      createAnimalInfoElement(result);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

// Raspuns API

function createAnimalInfoElement(data) {
  const response = document.getElementById("responseContent");
  let html = "";

  data.forEach((element) => {
    const animalInfo = {
      nume: element.name,
      caracter: element.characteristics.temperament,
      locatie: element.locations[0],
      imagine: element.image_url,
    };
    html += `
    <div class="col-md-3 mb-4">
    <div class="card custom-card">
      <img src="${animalInfo.imagine}" class="card-img-top" alt="${animalInfo.nume}">
      <div class="card-body">
        <h3 class="card-title">${animalInfo.nume}</h3>
        <p class="card-text">${animalInfo.caracter}</p>
        <p class="card-text">${animalInfo.locatie}</p>
      </div>
    </div>
  </div>
    `;
  });

  response.innerHTML = html;
}

// Adaugarea în Favorite

const favoriteButtons = document.querySelectorAll(".favorite-button");
favoriteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const cardIndex = this.getAttribute("data-card-index");
    const favoriteProducts =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    favoriteProducts.push(cardIndex);
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
  });
});

// Add to cart

const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const cardIndex = this.getAttribute("data-card-index");
    const cardPrice = parseFloat(this.getAttribute("data-price"));
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProducts.push({ cardIndex, cardPrice });
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  });
});
