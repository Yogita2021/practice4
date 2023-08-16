// App.js
import React, { useState } from "react";
import AddBook from "./components/AddBook";
import MyBooks from "./components/MyBook";

const App = () => {
  const [books, setBooks] = useState([]); // Initialize books state

  return (
    <div>
      <AddBook setBooks={setBooks} /> {/* Pass setBooks as a prop */}
      <MyBooks books={books} setBooks={setBooks} />{" "}
      {/* Pass books and setBooks as props */}
    </div>
  );
};

export default App;
