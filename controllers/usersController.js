const { usersModel } = require("../models/usersModels.js");
const bcrypt = require("bcrypt");

const ecnryptPass = async (password) => {
  const saltRounds = 10; // Número de rondas de cifrado (mayor = más seguro)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// contraseña ingresada, contraseña guardada -- las compara y verifica si son las mismas
const verifyEncryptedPass = async (passwordEntered, passwordSaved) => {
  const isOk = await bcrypt.compare(passwordEntered, passwordSaved);
  return isOk;
};

const createUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    newPass = await ecnryptPass(password);

    const newUser = await usersModel({ user, password: newPass });

    await newUser.save();

    res.sendStatus(200);
  } catch (error) {
    console.log("Error en el backend al intentar crear el usuario " + error);
    res.sendStatus(404);
  }
};

const validateUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    // verifica que el usuario exista y devuelve un objeto
    const userFound = await usersModel.findOne({ user });

    // si no existe el usuario se envia un mensaje donde se dice que no se encontro

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else if (await verifyEncryptedPass(password, userFound.password)) {
      return res.status(200).json({ message: "validación correcta" });
    } else {
      return res.status(404).json({ message: "contraseña incorrecta" });
    }
  } catch (error) {
    console.log("ocurrio un error al intentar validar los usuarios" + error);
    res.sendStatus(404);
  }
};

module.exports = { createUser, validateUser };
