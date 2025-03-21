const { studentsModel } = require("../models/studentsModels.js");

const createStudent = async (req, res) => {
  try {
    const { name, semester, academicProgram } = req.body;

    const newStudent = await studentsModel({ name, semester, academicProgram });

    await newStudent.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar un estudiante ${error}`
    );

    res.sendStatus(404);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await studentsModel.find();
    res.status(200).json(students);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar mostrar los estudiantes ${error}`
    );
    res.sendStatus(404);
  }
};

module.exports = { createStudent, getAllStudents };
