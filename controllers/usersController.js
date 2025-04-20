const usersModel = require("../models/usersModels.js");
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
    const { user, password, programa, fechaNacimiento, ciudad, horario } =
      req.body;

    const newPass = await ecnryptPass(password);

    // Crear el prototipo base según horario
    let prototypeUser;
    if (horario === "diurna") {
      prototypeUser = new usersModel({
        user: "default",
        password: "default",
        programa: "Ingeniería",
        fechaNacimiento: "2000-01-01",
        ciudad: "Bogotá",
        horario: "diurna",
      });
    } else {
      prototypeUser = new usersModel({
        user: "default",
        password: "default",
        programa: "Administración",
        fechaNacimiento: "2000-01-01",
        ciudad: "Bogotá",
        horario: "nocturna",
      });
    }

    // Clonamos el prototipo
    const newUser = prototypeUser.clone();

    // Reemplazamos los valores con los datos del request
    newUser.user = user;
    newUser.password = newPass;
    newUser.programa = programa;
    newUser.fechaNacimiento = fechaNacimiento;
    newUser.ciudad = ciudad;
    newUser.horario = horario;

    // Guardar el nuevo usuario
    await newUser.save();

    res.sendStatus(200); // Enviar estado 200 si todo salió bien
  } catch (error) {
    console.error("Error en el backend al intentar crear el usuario: " + error);
    res.sendStatus(404); // Enviar estado 404 si hay un error
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
