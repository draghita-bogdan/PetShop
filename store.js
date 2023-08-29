let allCategoriesCardsHtml = "";

function showBannerCategory(category) {
  let bannerHtml = "";

  switch (category) {
    case "dog":
      bannerHtml = `<div class="jumbotron">
            <h1 class="display-4">Our dogs</h1>
          </div>`;
      return bannerHtml;
    case "cat":
      bannerHtml = `<div class="jumbotron-2">
            <h1 class="display-4">Our cats</h1>
          </div>`;
      return bannerHtml;
    case "rabbit":
      bannerHtml = `<div class="jumbotron-3">
        <h1 class="display-4">Our rabbits</h1>
      </div>`;
      return bannerHtml;
    case "fish":
      bannerHtml = `<div class="jumbotron-4">
        <h1 class="display-5">Our fish</h1>
      </div>`;
      return bannerHtml;
  }
}

function showAllAnimalCategories(data, category) {
  const response = document.getElementById("allAnimalCategories");
  const categoryBannerHtml = showBannerCategory(category);

  allCategoriesCardsHtml += categoryBannerHtml;
  allCategoriesCardsHtml += `<div class="row">`;
  data.forEach((element) => {
    const animalInfo = {
      nume: element.name,
      caracter: element.characteristics.temperament,
      locatie: element.locations[0],
    
    };
    allCategoriesCardsHtml += `
    <div class="col-md-4">
    <div class="card custom-card">
    
      <div class="card-body">
        <h3 class="card-title">${animalInfo.nume}</h3>
        <p class="card-text">${animalInfo.caracter}</p>
        <p class="card-text">${animalInfo.locatie}</p>
        <p class="card-text"> Price: 150 USD</p> 
        <button class="add-to-cart-btn" onclick="addToCart('${animalInfo.nume}')">Add to Cart</button>
      </div>
    </div>
  </div>
 
    `;
  });

  allCategoriesCardsHtml += `</div>`;

  response.innerHTML = allCategoriesCardsHtml;
}

// Sageata care ma duce spre varf

window.addEventListener("scroll", function () {
  const backToTopButton = document.querySelector(".back-to-top");
  if (window.scrollY > 200) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// fetch afisare carduri in Store.html

async function fetchAllCategoriesData() {
  const apiKey = "L/nmI91T3YBxgjwlE/S4vA==6k95lo9Jji9kREL6";
  const categories = ["dog", "cat", "rabbit", "fish"];
  const allData = [];

  const fetchPromises = categories.map((category) => {
    const url = `https://api.api-ninjas.com/v1/animals?name=${category}`;
    const headers = new Headers({
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    });

    return fetch(url, {
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
        showAllAnimalCategories(result, category);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  await Promise.all(fetchPromises);
  return allData;
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const bannerCategory = document.getElementById("banner-category");
  const categoryBannerHtml = showBannerCategory(category);
  if (category) bannerCategory.innerHTML = categoryBannerHtml;
  else fetchAllCategoriesData();
});

// Cautare animale

function searchAnimals() {
  const searchInput = document.querySelector(".search-input");
  const searchTerm = searchInput.value.trim().toLowerCase();

  const allCards = document.querySelectorAll(".custom-card");
  allCards.forEach(card => {
      const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
      if (cardTitle.includes(searchTerm)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("input", searchAnimals); 
});
