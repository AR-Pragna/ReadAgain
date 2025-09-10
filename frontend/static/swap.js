document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("swap-form");
    const locationInput = document.getElementById("location");
    let selectedLocation = null;

    // Initialize the map
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Default center (India)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marker for selected location
    let marker;

    map.on("click", (event) => {
        const { lat, lng } = event.latlng;
        selectedLocation = { lat, lng };
        locationInput.value = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!selectedLocation) {
            alert("Please select a location on the map.");
            return;
        }

        const swapBook = document.getElementById("swap-book").value.trim();
        const fileInput = document.getElementById("book-image");
        const file = fileInput.files[0];

        if (!swapBook) {
            alert("Please enter a book name to swap.");
            return;
        }

        if (!file) {
            alert("Please upload a book cover.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            // Save details in localStorage
            localStorage.setItem("swapDetails", JSON.stringify({
                location: locationInput.value,
                bookName: swapBook,
                bookImage: e.target.result // Base64 encoded image
            }));

            // Navigate to results page
            window.location.href = "results.html";
        };

        reader.readAsDataURL(file); // Convert the image to Base64
    });
});
