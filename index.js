const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/connection.js");
const { routes } = require("./routes/routes.js");

const db = require("./config/connectionWithSiglenton.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

dotenv.config();
//connection(); conexion normal

app.use("/", routes);

(async () => {
  try {
    await db._connect(); // Asegurar la conexión antes de iniciar el servidor
    console.log("✅ Base de datos conectada correctamente");

    app.listen(PORT, () => {
      console.log(`servidor escuchando en el puerto ${PORT}`);
    }); //
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos", error);
    process.exit(1); // Cerrar la aplicación si hay un error crítico
  }
})();
