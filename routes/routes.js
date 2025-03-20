const express = require("express");
const routes = express.Router();

const { createStudent } = require("../controllers/studentsController.js");
const {
  createBook,
  getAllBooks,
} = require("../controllers/booksController.js");
const {
  createUser,
  validateUser,
} = require("../controllers/usersController.js");

//libros

routes.post("/create-book", createBook);
routes.get("/getall-books", getAllBooks);

//usuarios

routes.post("/create-user", createUser);
routes.get("/validate-user", validateUser);

//estudiantes

routes.post("/create-student", createStudent);

module.exports = { routes };
