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

const { hello } = require("../controllers/dashboardController.js");

//libros

routes.post("/create-book", createBook);
routes.post("/create-book-with-builder", createBookWithBuilder);
routes.get("/getall-books", getAllBooks);
routes.post("/update-book", updateBook);

//usuarios

routes.post("/create-user", createUser);
routes.post("/validate-user", validateUser);

//estudiantes

routes.post("/create-student", createStudent);
routes.get("/getall-students", getAllStudents);

//dashboard

routes.get("/dashboard", hello);

module.exports = { routes };
