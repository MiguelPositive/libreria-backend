const express = require("express");

const routes = express.Router();

const {
  createUser,
  validateUser,
} = require("../controllers/usersController.js");
const { createStudent } = require("../controllers/studentsController.js");

routes.post("/create-user", createUser);
routes.get("/validate-user", validateUser);

routes.post("/create-student", createStudent);

module.exports = { routes };
