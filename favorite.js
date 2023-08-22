// Datele cardurilor adaugate la Favorite

const favoriteCardsContainer = document.getElementById("favoriteCards");
const favoriteProducts =
  JSON.parse(localStorage.getItem("favoriteProducts")) || [];
const cardsData = [
  {
    name: "Dog food <br><hr> Price: 15,99$ / 10kg",
    image:
      "https://pentruanimale.ro/beta/files/product/original/CLUB-4-PAWS-Pui-hrana-uscataa-caini-L-XL-14-kg-11059.jpeg",
    price: "10 lei",
  },
  {
    name: "Rabbit food <br><hr> Price: 15,99$ / 10kg",
    image:
      "https://www.maxi-pet.ro/BinaryLibrary/777e6934-fad1-4192-be89-242e6e5989f1/Resized_eb3dbdd3-0fc7-4087-8ffd-6cc70e0dd22f/1600_1600.jpg",
  },
  {
    name: "Cat food <br><hr> Price: 15,99$ / 10kg",
    image:
      "https://gomagcdn.ro/domains2/fourpaws.ro/files/product/original/club-4-paws-hrana-uscata-pisici-sterilizate-14kg-942254.jpg",
  },
  {
    name: "Fish food <br><hr> Price: 15,99$ / 8kg ",
    image: "https://m.media-amazon.com/images/I/71Lwt4snhJL.jpg",
  },
  {
    name: "Cat Nutrition <br><hr> Price: 5,99$ / 700g",
    image:
      "https://pentruanimale.ro/beta/files/product/original/CLUB-4-PAWS-Premium-Sensitive-Digestion-Pui-plic-hrana-umeda-pisici-sistem-digestiv-in-sos-80g-19217.jpeg",
  },
  {
    name: "Dog Nutrition <br><hr> Price: 5,99$ / 700g",
    image:
      "https://gomagcdn.ro/domains2/petpal.ro/files/product/large/club-4-paws-premium-selection-plic-caine-adult-talie-mica-bucati-de-vita-si-legume-in-sos-85g-537024.jpg",
  },
  {
    name: "Bone Cat food <br><hr> Price: 3,99$ / 500g",
    image:
      "https://gomagcdn.ro/domains2/fourpaws.ro/files/product/original/recompense-pentru-pisici-club-4-paws-premium-stick-cu-somon-si-cod-5g-155-2352.png",
  },
  {
    name: "Bone Dog food <br><hr> Price: 3,99$ / 500g",
    image:
      "https://gomagcdn.ro/domains2/epetshop.ro/files/product/large/club-4-paws-premium-dental-stick-recompense-caini-0-117kg-804559.png",
    price: "5$",
  },
];

favoriteProducts.forEach((cardIndex) => {
  const cardData = cardsData[cardIndex];
  if (cardData) {
    const card = document.createElement("div");
    card.classList.add("col-md-3");
    card.innerHTML = `
                <div class="card-carousel">
                    <img src="${cardData.image}" class="card-img-top" alt="Image">
                    <div class="card-body">
                        <h5 class="card-title">${cardData.name}</h5>
                        <button class="btn remove-button" data-card-index="${cardIndex}">Remove</button>
                    </div>
                </div>
            `;
    favoriteCardsContainer.appendChild(card);
  }
});

// Eveniment pentru butonul Remove

const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const cardIndex = this.getAttribute("data-card-index");
    removeProductFromFavorites(cardIndex);
    this.closest(".col-md-3").remove(); // Eliminarea cardurilor
  });
});

// Eliminarea unui produs din lista de Favorite

function removeProductFromFavorites(index) {
  const favoriteProducts =
    JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  const indexToRemove = favoriteProducts.indexOf(index);
  if (indexToRemove !== -1) {
    favoriteProducts.splice(indexToRemove, 1);
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
  }
}
