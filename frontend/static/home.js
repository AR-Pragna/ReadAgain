// Updated JavaScript for the homepage

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const link = card.querySelector("a").getAttribute("href");
            window.location.href = link;
        });
    });

    const navButton = document.querySelector(".nav-bar .btn");

    navButton.addEventListener("click", function () {
        alert("Redirecting to Login Page");
    });

    // Additional features can be added here.
});
