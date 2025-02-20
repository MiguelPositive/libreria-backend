const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/connection.js");

const app = express();
const PORT = process.env.PORT || 4000;



dotenv.config();
connection();


app.listen(PORT,()=>{

    console.log(`servidor escuchando en el puerto ${PORT}`);
    
})

