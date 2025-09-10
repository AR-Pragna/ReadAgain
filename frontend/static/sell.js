document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const bookList = document.getElementById("book-list");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form values
        const bookName = document.getElementById("book-title").value;
        const price = document.getElementById("price").value;
        const author = document.getElementById("author").value;
        const publisher = document.getElementById("publisher").value;
        const bookImg = document.getElementById("book-img").files[0];

        if (!bookName || !price || !author || !publisher || !bookImg) {
            alert("Please fill in all fields and upload an image before submitting.");
            return;
        }

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append("book_name", bookName);
        formData.append("price", price);
        formData.append("author", author);
        formData.append("publisher", publisher);
        formData.append("book_img", bookImg);

        try {
            // Send POST request to the endpoint
            const response = await fetch("http://127.0.0.1:8000/api/addbooks/", {
                method: "POST",
                body: formData, // FormData handles encoding for multipart/form-data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert("Book added successfully!");

            // Add the new book to the book list
            // const li = document.createElement("li");
            // li.innerHTML = `
            //     <img src="${result.book_img}" alt="Cover of ${result.book_name}">
            //     <div>
            //         <strong>${result.book_name}</strong> by ${result.author}<br>
            //         Price: ₹${result.price}<br>
            //         Publisher: ${result.publisher}
            //     </div>
            // `;
            // bookList.appendChild(li);

            form.reset(); // Clear the form
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while adding the book. Please try again.");
        }
    });
});
