import React, { useState } from "react";
import { fetchBooks } from "./api";
const AddBook = ({ setBooks }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    price: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/books/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          author: "",
          genre: "",
          description: "",
          price: "",
        });

        const booksData = await fetchBooks();
        console.log(booksData);
        alert("booked added");
        setBooks(booksData);
        window.location.reload();
      } else {
        console.error("Error adding book. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Title input */}
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Author input */}
        <label>Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />

        {/* Genre select */}
        <label>Genre</label>
        <select
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        >
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>

        {/* Description textarea */}
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* Price input */}
        <label>Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        {/* Submit button */}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
