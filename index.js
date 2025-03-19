const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/connection.js");
const { usersRouter } = require("./routes/usersRoutes.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());


dotenv.config();
connection();


app.use("/",usersRouter)

app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
