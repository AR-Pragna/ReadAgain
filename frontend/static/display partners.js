document.addEventListener("DOMContentLoaded", () => {
    const userLocation = document.getElementById("user-location");
    const userBook = document.getElementById("user-book");
    const userImage = document.getElementById("user-image");
    const partnersList = document.getElementById("partners");

    // Get data from localStorage
    const swapDetails = JSON.parse(localStorage.getItem("swapDetails"));

    if (swapDetails) {
        userLocation.textContent = `Location: ${swapDetails.location}`;
        userBook.textContent = `Book: ${swapDetails.bookName}`;
        userImage.src = swapDetails.bookImage;
    }

    // Simulate fetching nearby swap partners
    const swapPartners = [
        { name: "Alice", book: "To Kill a Mockingbird" },
        { name: "Bob", book: "1984" },
        { name: "Charlie", book: "The Great Gatsby" }
    ];

    swapPartners.forEach((partner) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${partner.name}</strong> has "<em>${partner.book}</em>" available for swapping.`;
        partnersList.appendChild(listItem);
    });
});
