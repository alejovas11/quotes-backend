//requerimos express
const express = require("express");
const app = express();

//requerimos validaciones para updates
const _ = require("underscore");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//llamamos el archivo del modelo de usuario
const Quotes = require("../models/quotes-model");

//===================================
//inicio de la api
//===================================

app.get("/welcomeToApp/", function (req, res) {
  res.status(200).json({
    ok: true,
    status: "200",
    response: "Welcome To Api",
  });
});

//===================================
//agregar cita
//===================================

app.post("/addQuotes/",(req, res) => {
    //convertimos datos a json
  let body = req.body;
  
  const { name, lastName, identification, birthDate, phone, city, neighborhood } = body;

    let quotes = new Quotes({
      name: name,
      lastName: lastName,
      identification: identification,
      birthDate: birthDate,
      phone: phone,
      city: city,
      neighborhood: neighborhood,
    });

    quotes.save((err, quotesDB) => {
      //validamos si no hay error
      if (err) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Error al intentar guardar!",
          err,
        });
      } else {
        res.json({
          ok: true,
          status: "200",
          response: "Cita guardado correctamente!",
          quotes: quotesDB,
        });
      }
    });
});

//===================================
//todas las citas
//===================================

app.get("/getQuotesAll/", (req, res) => {
  
  //datos a traer
  const data = "name lastName identification birthDate phone city neighborhood";

    Quotes.find({}, data)
      .exec((err, quotesDB) => {
        if (err) {
          res.status(200).json({
            ok: false,
            status: "400",
            response: "Error al listar las citas!",
            err,
          });
        } else {
          //hacemos conteo de la cantidad de usuarios
          Quotes.countDocuments({}, (err, count) => {
            res.json({
              ok: true,
              status: "200",
              response: "Lista de citas!",
              totalServicios: count,
              quotesDB,
            });
          });
        }
      });
  }
);

//===================================
//citas por id
//===================================

app.get("/getQuotesById/:id", (req, res) => {
  
  //id del producto
  let id = req.params.id;

  //datos a traer
  const data = "name lastName identification birthDate phone city neighborhood";

    Quotes.findOne({_id : id }, data)
      .exec((err, quotesDB) => {
        if (err) {
          res.status(200).json({
            ok: false,
            status: "400",
            response: "Error al buscar la cita!",
            err,
          });
        } else if (quotesDB === null) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Cita no encontrada!",
        });
      } else {
          //hacemos conteo de la cantidad de servicios
            res.json({
              ok: true,
              status: "200",
              response: "Cita encontrada!",
              quotesDB,
            });
        }
      });
  }
);

//=============================
//actualizar citas por id
//=============================

app.put("/updateQuitesById/:id", (req, res) => {

  let id = req.params.id;

  let body = _.pick(req.body, [
    "name",
    "lastName",
    "identification",
    "birthDate",
    "phone",
    "city",
    "neighborhood"
  ]);

  Quotes.findByIdAndUpdate(id,body,
    { new: true, runValidators: true },
    (err, quotesDB) => {
      //validamos si no hay error
      if (err) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Error de base de datos!",
          err,
        });
      } else {
        res.json({
          ok: true,
          status: "200",
          response: "Cita actualizada correctamente!",
          quote: quotesDB,
        });
      }
    }
  );
});

//=============================
//eliminar citas
//=============================

app.delete("/deleteQuotesById/:id",(req, res) => {

    let id = req.params.id;

    Quotes.findByIdAndRemove(id, (err, deleted) => {

      if (err) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Error de base de datos!",
          err,
        });
      } else if (deleted === null) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Cita no encontrada!",
        });
      } else {
        res.json({
          ok: true,
          status: "200",
          response: "Cita eliminada correctamente!",
          servicio: deleted,
        });
      }
    });
  }
);

module.exports = app;