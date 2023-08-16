// api.js

export const fetchBooks = async (sortCriteria, selectedGenre) => {
  try {
    const queryParams = new URLSearchParams();
    if (sortCriteria) {
      queryParams.append("sort", sortCriteria);
    }
    if (selectedGenre) {
      queryParams.append("filter", selectedGenre);
    }

    const response = await fetch(`https://reactdeploy-429c.onrender.com/books`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
// export const fetchBooks = async () => {
//   try {
//     const response = await fetch(`http://localhost:8080/books`);
//     const responseData = await response.json();

//     if (!responseData.isError) {
//       return responseData.data;
//     } else {
//       throw new Error(responseData.error);
//     }
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     throw error;
//   }
// };
