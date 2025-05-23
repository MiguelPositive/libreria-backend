const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/connection.js");
const connectionWithSiglenton = require("./config/connectionWithSiglenton.js");
const cors = require("cors");

const { routes } = require("./routes/routes.js");

const {
  ConsoleLoggerFactory,
  FileLoggerFactory,
} = require("./factoryMethod/loggerFactory.js");

//  Escoge qué fábrica usar:
const loggerFactory = new ConsoleLoggerFactory(); // Cambia a ConsoleLoggerFactory si quieres logs en consola
const logger = loggerFactory.createLogger();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

dotenv.config();
//connection(); conexion normal

// se utiliza para desactivar los cors
app.use(cors());

app.use("/", routes);

(async () => {
  try {
    //utilizo singlenton en la conexion a la base de datos

    await connectionWithSiglenton._connect(); // Asegurar la conexión antes de iniciar el servidor
    console.log("✅ Base de datos conectada correctamente");

    app.listen(PORT, () => {
      logger.log("🚀 Servidor iniciado correctamente");
      console.log(`servidor escuchando en el puerto ${PORT}`);
    }); //
  } catch (error) {
    logger.log("❌ Error en la base de datos");
    console.error("❌ No se pudo conectar a la base de datos", error);
    process.exit(1); // Cerrar la aplicación si hay un error crítico
  }
})();
