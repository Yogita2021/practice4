const { Router } = require("express");
const { BookModel } = require("../model/bookSchema");

const booksRouter = Router();

// booksRouter.get("/", async (req, res) => {
//   try {
//     let { sort, filter } = req.query;

//     if (sort && filter) {
//       let sortby = sort == "asc" ? 1 : -1;
//       let data = await BookModel.find({ Genre: `${filter}` }).sort({
//         Price: `${sortby}`,
//       });
//       return res.status(200).send({
//         isError: false,
//         data: data,
//       });
//     }
//     if (sort) {
//       let sortby = sort == "asc" ? 1 : -1;

//       let data = await BookModel.find().sort({ Price: `${sortby}` });
//       return res.status(200).send({
//         isError: false,
//         data: data,
//       });
//     }
//     if (filter) {
//       let data = await BookModel.find({ Genre: `${filter}` });
//       return res.status(200).send({
//         isError: false,
//         data: data,
//       });
//     }

//     let data = await BookModel.find();

//     res.status(200).send({
//       isError: false,
//       data: data,
//     });
//   } catch (error) {
//     res.status(400).send({
//       isError: true,
//       error: error.msg,
//     });
//   }
// });

booksRouter.get("/", async (req, res) => {
  try {
    const { sort, filter } = req.query;
    let query = {};

    if (filter) {
      query.Genre = filter;
    }

    let sortOptions = {};
    if (sort === "asc") {
      sortOptions.Price = 1;
    } else if (sort === "desc") {
      sortOptions.Price = -1;
    }

    const data = await BookModel.find(query).sort(sortOptions);

    res.status(200).send({
      isError: false,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      isError: true,
      error: error.msg,
    });
  }
});

booksRouter.post("/add", async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(200).send({
      isError: false,
      msg: "Book added successfully",
    });
  } catch (error) {
    res.status(400).send({
      isError: true,
      error: error.msg,
    });
  }
});

booksRouter.delete("/deletebook/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await BookModel.findByIdAndDelete(id);

    if (data) {
      res.status(200).send({
        isError: false,
        msg: "Book Deleted Successfully",
      });
    } else {
      res.status(200).send({
        isError: false,
        msg: "Book Id not found to delete",
      });
    }
  } catch (error) {
    res.status(400).send({
      isError: true,
      error: error.msg,
    });
  }
});

module.exports = { booksRouter };
