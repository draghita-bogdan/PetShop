// Formular

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
      event.preventDefault(); // Previne trimiterea formularului

      // Alerta
      alert("Please fill out all fields before submitting the form.");
    }
  });

// Map
document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([45.77006557379909, 21.252267772023718], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);
});
