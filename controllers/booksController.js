const { booksModel } = require("../models/booksModels.js");
const BookBuilder = require("../patterns/BookBuilder.js");

// ⚠ Ejecuta con: node --expose-gc tuArchivo.js
function measureMemoryUsage(func, label) {
  global.gc(); // Forzar recolección de basura
  const startMemory = process.memoryUsage().heapUsed;
  const startTime = Date.now();

  func(); // Ejecutar función

  global.gc();
  const endMemory = process.memoryUsage().heapUsed;
  const endTime = Date.now();

  console.log(
    `${label} - Memoria usada: ${(endMemory - startMemory) / 1024} KB`
  );
  console.log(`${label} - Tiempo: ${endTime - startTime} ms`);
}

const createBook = async (req, res) => {
  try {
    measureMemoryUsage(async () => {
      const { title, author, category, avaiable } = req.body;
      const newBook = new booksModel({ title, author, category, avaiable });
      await newBook.save();
    }, "Sin Builder");

    res.sendStatus(200);
  } catch (error) {
    console.log(`Error sin Builder: ${error}`);
    res.sendStatus(404);
  }
};

const createBookWithBuilder = async (req, res) => {
  try {
    measureMemoryUsage(async () => {
      const { title, author, category, avaiable } = req.body;
      const builder = new BookBuilder()
        .setTitle(title)
        .setAuthor(author)
        .setCategory(category)
        .setAvailable(avaiable)
        .build();

      const newBook = new booksModel(builder);
      await newBook.save();
    }, "Con Builder");

    res.sendStatus(200);
  } catch (error) {
    console.log(`Error con Builder: ${error}`);
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

//prestar
const updateBook = async (req, res) => {
  try {
    const { _id, infoStudent, departureDate, available } = req.body;

    console.log(req.body);

    await booksModel.findByIdAndUpdate(_id, {
      infoStudent,
      departureDate,
      available,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(`ocurrio un erro al momento de prestar el libro ${error}`);
    res.send(404);
  }
};

const removeStudentFromBook = async (req, res) => {
  const { _id } = req.body;

  console.log(_id);

  try {
    const updated = await booksModel.findByIdAndUpdate(_id, {
      $unset: {
        infoStudent: "",
        departureDate: "",
      },
      $set: {
        available: true,
      },
    });

    if (!updated) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(
      "error en el backend al eliminar estudiante del libro:",
      error
    );
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  createBook,
  createBookWithBuilder,
  getAllBooks,
  updateBook,
  removeStudentFromBook,
};
