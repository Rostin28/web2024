const db = require('../config/db.config.js');
const libros = db.libros;

exports.create = async (req, res) => {
  try {
    const { Codigo_Libro, Nombre_libro, Editorial, Autor, Genero, Pais, No_Pag, Anio, Precio } = req.body;

    if (!Codigo_Libro || !Nombre_libro || !Editorial || !Autor || !Genero || !Pais || !No_Pag || !Anio || !Precio) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newLibro = { Codigo_Libro, Nombre_libro, Editorial, Autor, Genero, Pais, No_Pag, Anio, Precio };
    const result = await libros.create(newLibro);

    res.status(201).json({
      message: "Exito libro creado con el id = " + result.id,
      libro: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error :c",
      error: error.message,
    });
  }
};

exports.getAllLibros = async (req, res) => {
  try {
    const allLibros = await libros.findAll();
    res.status(200).json({
      message: "Todos los libros obtenidos",
      libros: allLibros
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error!",
      error: error.message
    });
  }
};

exports.getLibroByNombre = async (req, res) => {
  try {
    const { Nombre_libro } = req.params;
    const libro = await libros.findOne({ where: { Nombre_libro } });

    if (!libro) {
      return res.status(404).json({
        message: `No hay libro con el nombre = ${Nombre_libro}`,
      });
    }

    res.status(200).json({
      message: "Libro encontrado = " + Nombre_libro,
      libro: libro
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error pa",
      error: error.message
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { Codigo_Libro, Nombre_libro, Editorial, Autor, Genero, Pais, No_Pag, Anio, Precio } = req.body;

    const libro = await libros.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        message: "Not Found for updating a libro with id = " + id,
        error: "404"
      });
    }

    const updatedLibro = { Codigo_Libro, Nombre_libro, Editorial, Autor, Genero, Pais, No_Pag, Anio, Precio };
    await libros.update(updatedLibro, { where: { id } });

    res.status(200).json({
      message: "Update successfully a Libro with id = " + id,
      libro: updatedLibro,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error -> Cannot update a libro with id = " + req.params.id,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await libros.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        message: "Does Not exist a Libro with id = " + id,
        error: "404",
      });
    }

    await libro.destroy();
    res.status(200).json({
      message: "Delete Successfully a Libro with id = " + id,
      libro: libro,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error -> Cannot delete a libro with id = " + req.params.id,
      error: error.message,
    });
  }
};
