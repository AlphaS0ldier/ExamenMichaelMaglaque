var express = require('express');
var router = express.Router();
const Personaje = require('../model/personaje');
const bodyParser = require('body-parser');


router.get('/', async (req, res) => {
  res.redirect('./personaje/todos');
}
);


router.get('/todos', async (req, res) => {
  try {
    let personaje = await Personaje.find({});

    res.render("personaje", { personaje });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al obtener el personaje de la base de datos");
  }
}
);


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let pers = await Personaje.find({
      id: id
    });
    let personaje = pers[0];

    let fech = new Date(personaje.created);
    let fecha=fech.toLocaleDateString('Es-es');

    console.log(fecha);

    res.render("personajecard", { personaje, fecha });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al obtener el personaje de la base de datos");
  }
}
);

module.exports = router;
