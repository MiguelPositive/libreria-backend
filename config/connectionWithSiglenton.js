// db.js (Módulo Singleton)
const mongoose = require("mongoose");

class connectionWithSiglenton {
  constructor() {
    if (!connectionWithSiglenton.instance) {
      this._connect();
      connectionWithSiglenton.instance = this;
    }
    return connectionWithSiglenton.instance;
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

module.exports = new connectionWithSiglenton(); // Exportamos la única instancia
