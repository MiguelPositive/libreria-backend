// db.js (Módulo Singleton)
const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      this._connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  async _connect() {
    try {
      this.connection = await mongoose.connect(
        "mongodb://localhost:27017/miDB",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("✅ Conectado a MongoDB");
    } catch (error) {
      console.error("❌ Error al conectar a MongoDB:", error);
    }
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new Database(); // Exportamos la única instancia
