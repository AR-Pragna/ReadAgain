document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Centered on India

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let userLocation = null;
    let marker;

    // Map click handler to set user location
    map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        userLocation = { lat, lng };

        // Update or create the marker
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }

        alert(`Location Selected: Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`);
    });

    // Search button handler
    document.getElementById("find-books").addEventListener("click", async () => {
        if (!userLocation) {
            alert("Please click on the map to select your location.");
            return;
        }

        const radius = document.getElementById("radius").value;
        const booksList = document.getElementById("books-list");

        try {
            // Fetch books from the server
            const response = await fetch(
                `http://127.0.0.1:8000/api/donations/?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch books: ${response.statusText}`);
            }

            const books = await response.json();

            // Clear the current book list
            booksList.innerHTML = "";

            if (books.length === 0) {
                booksList.innerHTML = "<p>No books found in the selected area.</p>";
                return;
            }

            // Display the books
            books.forEach((book) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${book.cover_image}" alt="Cover of ${book.title}" class="book-cover">
                    <div class="book-info">
                        <h3>${book.book_title}</h3>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Condition:</strong> ${book.condition}</p>
                        <p>${book.description}</p>
                    </div>
                `;
                booksList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("An error occurred while fetching books. Please try again later.");
        }
    });
});
