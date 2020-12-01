const express = require("express");
const app = express();
const _ = require("underscore");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const Citas = require("../models/model");

app.post("/addCita/",(req, res) => {
  let body = req.body;
  
  const { name, lastName, identification, birthDate, phone, city, neighborhood } = body;

    let citas = new Citas({
      name: name,
      lastName: lastName,
      identification: identification,
      birthDate: birthDate,
      phone: phone,
      city: city,
      neighborhood: neighborhood,
    });

    citas.save((err, quotesDB) => {
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
          citas
        });
      }
    });
});

app.get("/getCitas/", (req, res) => {
  
  const data = "name lastName identification birthDate phone city neighborhood";

    Citas.find({}, data)
      .exec((err, citas) => {
        if (err) {
          res.status(200).json({
            ok: false,
            status: "400",
            response: "Error al listar las citas!",
            err,
          });
        } else {
          Citas.countDocuments({}, (err, count) => {
            res.json({
              ok: true,
              status: "200",
              response: "Lista de citas!",
              totalServicios: count,
              citas
            });
          });
        }
      });
  }
);

app.get("/getCitaById/:id", (req, res) => {
  
  let id = req.params.id;

  const data = "name lastName identification birthDate phone city neighborhood";

    Citas.findOne({_id : id }, data)
      .exec((err, citas) => {
        if (err) {
          res.status(200).json({
            ok: false,
            status: "400",
            response: "Error al buscar la cita!",
            err,
          });
        } else if (citas === null) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Cita no encontrada!",
        });
      } else {
            res.json({
              ok: true,
              status: "200",
              response: "Cita encontrada!",
              citas
            });
        }
      });
  }
);

app.put("/updateCita/:id", (req, res) => {

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

  Citas.findByIdAndUpdate(id,body,
    { new: true, runValidators: true },
    (err, citas) => {
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
          citas
        });
      }
    }
  );
});

app.delete("/deleteCita/:id",(req, res) => {

    let id = req.params.id;

    Citas.findByIdAndRemove(id, (err, deleted) => {

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
          deleted
        });
      }
    });
  }
);

module.exports = app;