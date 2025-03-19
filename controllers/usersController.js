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

module.exports = {createUser};