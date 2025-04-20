const mongoose = require("mongoose");

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  programa: { type: String, required: true },
  fechaNacimiento: { type: String, required: true },
  ciudad: { type: String, required: true },
  horario: { type: String, required: true, enum: ["diurna", "nocturna"] },
});

// Método clone: patrón prototype
userSchema.methods.clone = function () {
  return new this.constructor({
    user: this.user,
    password: this.password,
    programa: this.programa,
    fechaNacimiento: this.fechaNacimiento,
    ciudad: this.ciudad,
    horario: this.horario,
  });
};

// Creamos el modelo
const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
