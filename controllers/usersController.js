const {usersModel} = require("../models/usersModels.js");

const createUser = async (req, res) =>{

try {
    
    const {user, password} = req.body;

    console.log(user);
    console.log(password);
    console.log();
    console.log('====================================');

    const newUser = await usersModel({user, password});
    
    await newUser.save();


    console.log("ejecion exitosa")
    
    res.sendStatus(200);

} catch (error) {


   console.log("Error en el backend al intentar crear el usuario "+error)
    
}


}

const validateUser = async (req, res) => {

try {

    const {user, password} = req.body;

    // verifica que el usuario exista y devuelve un objeto
    const userFound = await usersModel.findOne({user});


    // si no existe el usuario se envia un mensaje donde se dice que no se encontro 

    if (!userFound){

        return res.status(404).json({ message: "Usuario no encontrado" });

    } else if (userFound.password == password) {

        return res.status(200).json({ message: "validación correcta" });

    } else {
        return res.status(404).json({ message: "contraseña incorrecta" });

    }
    
} catch (error) {
 
    
   console.log("ocurrio un error al intentar validar los usuarios"+error)
}


}


module.exports = {createUser, validateUser};