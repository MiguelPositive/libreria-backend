const express = require("express");

const usersRouter = express.Router();

const {createUser} = require("../controllers/usersController.js")

usersRouter.post("/create-user", createUser)

module.exports = {usersRouter};