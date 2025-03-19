const express = require("express");

const usersRouter = express.Router();

const {createUser, validateUser} = require("../controllers/usersController.js")

usersRouter.post("/create-user", createUser)
usersRouter.get("/validate-user", validateUser)

module.exports = {usersRouter};