const express = require("express");
const routes = express.Router();

const {
  createStudent,
  getAllStudents,
} = require("../controllers/studentsController.js");
const {
  createBook,
  createBookWithBuilder,
  getAllBooks,
  updateBook,
} = require("../controllers/booksController.js");
const {
  createUser,
  validateUser,
} = require("../controllers/usersController.js");

//libros

routes.post("/create-book", createBook);
routes.post("/create-book-with-builder", createBookWithBuilder);
routes.get("/getall-books", getAllBooks);
routes.post("/update-book", updateBook);

//usuarios

routes.post("/create-user", createUser);
routes.get("/validate-user", validateUser);

//estudiantes

routes.post("/create-student", createStudent);
routes.get("/getall-students", getAllStudents);

module.exports = { routes };
