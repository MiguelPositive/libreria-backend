const express = require("express");

const routes = express.Router();

const {
  createUser,
  validateUser,
} = require("../controllers/usersController.js");
const { createStudent } = require("../controllers/studentsController.js");

const { createBook } = require("../controllers/booksController.js");

routes.post("/create-user", createUser);
routes.get("/validate-user", validateUser);

routes.post("/create-student", createStudent);

routes.post("/create-book", createBook);

module.exports = { routes };
