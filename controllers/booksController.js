const { booksModel } = require("../models/booksModels.js");

const createBook = async (req, res) => {
  try {
    const { title, author, category, avaiable } = req.body;

    const newBook = await booksModel({ title, author, category, avaiable });

    await newBook.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar añadir un libro ${error}`
    );

    res.sendStatus(404);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await booksModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.log(`ocurrio un error al momento de mostrar los libros ${error}`);

    res.sendStatus(404);
  }
};

module.exports = { createBook, getAllBooks };
