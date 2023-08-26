// Sageata care ma duce spre varf

window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 200) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // fetch afisare carduri in Store.html
  
  function fetchAllCategoriesData() {
    const apiKey = "L/nmI91T3YBxgjwlE/S4vA==6k95lo9Jji9kREL6";
    const categories = ["dog", "cat", "rabbit", "fish"];
    const allData = [];
  
    const fetchPromises = categories.map(category => {
      const url = `https://api.api-ninjas.com/v1/animals?name=${category}`;
      const headers = new Headers({
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      });
  
      return fetch(url, {
        method: "GET",
        headers: headers,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(result => {
        allData.push(...result); 
      })
      .catch(error => {
        console.error("Error:", error);
      });
    });
  
    return Promise.all(fetchPromises).then(() => allData);
  }
  
  fetchAllCategoriesData().then(allData => {
    createAnimalInfoElement(allData);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const bannerCategory = document.getElementById("banner-category");
    let html = "";
  
    switch (category) {
      case "dog":
        html = `<div class="jumbotron">
              <h1 class="display-4">Our dogs</h1>
            </div>`;
        break;
      case "cat":
        html = `<div class="jumbotron-2">
              <h1 class="display-4">Our cats</h1>
            </div>`;
        break;
      case "rabbit":
        html = `<div class="jumbotron-3">
          <h1 class="display-4">Our rabbits</h1>
        </div>`;
        break;
      case "fish":
        html = `<div class="jumbotron-4">
          <h1 class="display-5">Our fish</h1>
        </div>`;
        break;
    }
  
    bannerCategory.innerHTML = html;
  });