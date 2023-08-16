const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { booksRouter } = require("./Routes/books");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/books", booksRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
    console.log(`Server is listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
