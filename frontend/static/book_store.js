document.addEventListener("DOMContentLoaded", async () => {
  const cardContainer = document.querySelector(".card-container");
  const noBooksMessage = document.getElementById("no-books-message");

  try {
    // Fetch books data from the API
    const response = await fetch("http://127.0.0.1:8000/api/addbooks/");
    if (!response.ok) throw new Error("Failed to fetch books data");

    const books = await response.json();

    if (books.length === 0) {
      noBooksMessage.style.display = "block"; // Show "Books not found" message
    } else {
      noBooksMessage.style.display = "none"; // Hide the message
      books.forEach((book) => {
        // Create card for each book
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", book.id);
        card.setAttribute("data-title", book.book_name);
        card.setAttribute("data-author", book.author);

        card.innerHTML = `
          <img src="${book.book_img}" alt="${book.book_name}" class="book-image">
          <div class="book-details">
            <h2 class="book-title">${book.book_name}</h2>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-price">Price: ₹${book.price}</p>
            <button class="buy-button" onclick="buyBook(${book.id})">Buy Now</button>
            <button class="chat-button hidden" onclick="openChat('${book.book_name}', '${book.author}')">Chat with Seller</button>
            <button class="wishlist-button" onclick="addToWishlist('${book.book_name}')">Add to Wishlist</button>
          </div>
        `;

        cardContainer.appendChild(card); // Add card to container
      });
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    alert("Failed to load books. Please try again later.");
  }
});

// Simulate buying the book
function buyBook(bookId) {
  const bookCard = document.querySelector(`.card[data-id="${bookId}"]`);
  const buyButton = bookCard.querySelector(".buy-button");
  const chatButton = bookCard.querySelector(".chat-button");

  // Hide the Buy Now button and show the Chat with Seller button
  buyButton.classList.add("hidden");
  chatButton.classList.remove("hidden");

  alert("You have purchased this book! You can now chat with the seller.");
}

// Open the chat modal
function openChat(bookTitle, sellerName) {
  document.getElementById("book-title-chat").textContent = `Book Title: ${bookTitle}`;
  document.getElementById("book-author-chat").textContent = `Seller: ${sellerName}`;
  document.getElementById("chat-modal").style.display = "flex";
}

// Close the chat modal
function closeChat() {
  document.getElementById("chat-modal").style.display = "none";
}

// Simulate sending a message
function sendMessage() {
  const message = document.getElementById("chat-input").value;
  if (message.trim()) {
    alert("Message sent to the seller: " + message);
    document.getElementById("chat-input").value = ""; // Clear the input
  } else {
    alert("Please write a message before sending.");
  }
}

// Add book to Wishlist
function addToWishlist(bookTitle) {
  alert(`${bookTitle} has been added to your wishlist!`);
}

// Filter books based on search input
function filterBooks() {
  const searchQuery = document.getElementById("search-bar").value.toLowerCase();
  const bookCards = document.querySelectorAll(".card");
  const noBooksMessage = document.getElementById("no-books-message");

  let found = false;

  bookCards.forEach((card) => {
    const title = card.getAttribute("data-title").toLowerCase();
    const author = card.getAttribute("data-author").toLowerCase();

    if (title.includes(searchQuery) || author.includes(searchQuery)) {
      card.style.display = "block"; // Show matching cards
      found = true;
    } else {
      card.style.display = "none"; // Hide non-matching cards
    }
  });

  // Show "Books not found" message if no books are visible
  noBooksMessage.style.display = found ? "none" : "block";
}
