// Date despre cardurile adaugate in Cart

const cartContent = document.getElementById("cartContent");
const cartTotalElement = document.getElementById("cartTotal");
const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const cartAnimals =
  JSON.parse(localStorage.getItem("cartAnimalsProducts")) || [];
let cartTotal = 0;




const cardsData = [
  {
    name: "Dog food <br><hr> Price: 15,99$ / 10kg",
    image:
      "https://pentruanimale.ro/beta/files/product/original/CLUB-4-PAWS-Pui-hrana-uscataa-caini-L-XL-14-kg-11059.jpeg",
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
  },
];

cartProducts.forEach((product) => {
  const cardData = cardsData[product.cardIndex];
  if (cardData) {
    cartTotal += product.cardPrice;
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4", "custom-card");
    card.innerHTML = `
            <div class="card">
                <img src="${cardData.image}" class="card-img-top" alt="Image">
                <div class="card-body">
                    <h5 class="card-title">${cardData.name}</h5>
                    <button class="btn remove-button" data-card-index="${product.cardIndex}">Remove</button>
                </div>
            </div>
        `;
    cartContent.appendChild(card);
  }
});

cartAnimals.forEach((animal) => {
  if (animal) {
    const animalCard = document.createElement("div");
    animalCard.classList.add("col-md-3", "mb-4", "custom-card");
    animalCard.innerHTML = `
    <div class="card">
    <img src="${animal.imagine}" class="card-img-top" alt="Image">
    <div class="card-body">
        <h5 class="card-title">${animal.nume}</h5>
        <button class="btn remove-animal-button" nume="${animal.nume}">Remove</button>
    </div>
</div>
    `;
    cartContent.appendChild(animalCard);
  }
});

const removeAnimalButtons = document.querySelectorAll(".remove-animal-button");
removeAnimalButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const numeAnimal = this.getAttribute("nume");
    removeAnimalFromCart(numeAnimal);
    this.closest(".card").remove(); // Eliminarea cardurilor
    updateCartTotal(); // Actualizarea totalului
  });
});

function removeAnimalFromCart(nume) {
  const cartAnimals =
    JSON.parse(localStorage.getItem("cartAnimalsProducts")) || [];
  const indexToRemove = cartAnimals.findIndex((animal) => animal.nume === nume);
  if (indexToRemove !== -1) {
    cartAnimals.splice(indexToRemove, 1);
    localStorage.setItem("cartAnimalsProducts", JSON.stringify(cartAnimals));
    updateCartTotal(); // Actualizarea totalului dupa eliminarea produselor
  }
}

console.log(emptyCartMessage);
if (cartContent.innerHTML.trim() === "") {
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  emptyCartMessage.style.display = "block";
}
cartTotalElement.textContent = cartTotal.toFixed(2);

// Butonul Remove

const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const cardIndex = this.getAttribute("data-card-index");
    removeProductFromCart(cardIndex);
    this.closest(".card").remove(); // Eliminarea cardurilor
    updateCartTotal(); // Actualizarea totalului
  });
});

// Eliminarea produselor din cart

function removeProductFromCart(index) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const indexToRemove = cartProducts.findIndex(
    (product) => product.cardIndex === index
  );
  if (indexToRemove !== -1) {
    cartProducts.splice(indexToRemove, 1);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    updateCartTotal(); // Actualizarea totalului dupa eliminarea produselor
  }
}

updateCartTotal();

// Actualizarea totalului din cos

function updateCartTotal() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let cartTotal = 0;
  cartProducts.forEach((product) => {
    cartTotal += product.cardPrice;
  });

  const cartTotalElement = document.getElementById("cartTotal");
  if (cartTotalElement) {
    cartTotalElement.textContent = cartTotal.toFixed(2);
  }

  const emptyCartMessage = document.getElementById("emptyCartMessage");
  if (emptyCartMessage) {
    if (cartProducts.length === 0 && cartAnimals.length === 0) {
      emptyCartMessage.style.display = "block";
    } else {
      emptyCartMessage.style.display = "none";
    }
  }

  updatePaymentTotal(); // Actualizarea totalului de plata
}

function updatePaymentTotal() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let paymentTotal = 0;
  cartProducts.forEach((product) => {
    paymentTotal += product.cardPrice;
  });

  const paymentTotalElement = document.getElementById("paymentTotal");
  if (paymentTotalElement) {
    paymentTotalElement.textContent = paymentTotal.toFixed(2);
  }
}

updatePaymentTotal();

// Formularul de plata

const paymentForm = document.getElementById("paymentForm");
const paymentMessage = document.getElementById("paymentMessage");

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Mesajul cu Thank you

  paymentMessage.style.display = "block";
  paymentForm.reset();
});



