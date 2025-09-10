document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    let marker;
    let selectedLatLng = null;

    // Reverse Geocoding Function
    async function reverseGeocode(lat, lng) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            document.getElementById("address").textContent = data.display_name || "No results found";
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("address").textContent = "Failed to fetch address";
        }
    }

    // Map click event
    map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        selectedLatLng = { lat, lng };

        document.getElementById("location").value = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;

        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }
    });

    // Form Submission
    const form = document.getElementById("donate-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (!selectedLatLng) {
            alert("Please select a location on the map.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("book_title", document.getElementById("book-title").value);
        formData.append("author", document.getElementById("author").value);
        formData.append("condition", document.getElementById("condition").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("cover_image", document.getElementById("book-cover").files[0]);
        formData.append("selected_location", JSON.stringify(selectedLatLng)); // Store coordinates as a JSON string

        // POST data to the backend
        try {
            const response = await fetch("http://127.0.0.1:8000/api/donations/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Thank you for your donation!");
                form.reset(); // Clear the form
                if (marker) {
                    map.removeLayer(marker); // Remove marker from the map
                    marker = null;
                }
            } else {
                const errorData = await response.json();
                alert(`Failed to submit: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
            alert("An error occurred while submitting your donation.");
        }
    });
});
