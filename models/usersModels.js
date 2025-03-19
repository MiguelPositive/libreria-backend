const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({

    user: {
        type: String,
        trim: true
    },

    password: {
        type: String,
        trim: true
    }


})

const usersModel = mongoose.model("users", usersSchema);

module.exports = {usersModel}