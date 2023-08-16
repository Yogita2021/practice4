import React, { useState, useEffect, useCallback } from "react";

import { fetchBooks } from "./api";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filterData, setFilterData] = useState("");

  const fetchBooksData = useCallback(async () => {
    try {
      const booksData = await fetchBooks(sortCriteria, selectedGenre);
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [sortCriteria, selectedGenre]);

  useEffect(() => {
    fetchBooksData();
  }, [fetchBooksData]);

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(
        `https://reactdeploy-429c.onrender.com/books/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchBooksData();
      } else {
        console.error("Error deleting book. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  // filter function

  const handlefilter = async (selectedGenre) => {
    try {
      console.log(selectedGenre);
      const filter = books.filter((el) => {
        return el.genre === selectedGenre;
      });
      setFilterData(filter);
      renderBooks(filterData);
    } catch (error) {
      console.error("Error filtered book:", error);
    }
  };

  // Render the list of books
  const renderBooks = () => {
    if (books.length === 0) {
      return <p>No books available.</p>;
    }

    return (
      <div>
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <p>Price: ${book.price}</p>
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>My Books</h2>
      {/* Sorting controls */}
      <div>
        <label>Sort by Price:</label>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {/* Genre filtering controls */}
      <div>
        <label>Filter by Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => handlefilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>
      </div>
      {/* Render the list of books */}
      {renderBooks()}
    </div>
  );
};

export default MyBooks;
