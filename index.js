const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/connection.js");
const { routes } = require("./routes/routes.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

dotenv.config();
connection();

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
