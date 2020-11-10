//llamamos configuracion del puerto
require("./config/config");

//requerimos libreria de espress
const express = require("express");
const app = express();

//llamamos archivo de rutas
app.use(require("./routes/quotes-routes"));

//usamos mongoose para conexion a base de datos
const mongoose = require("mongoose");

//nueva conexion a la base de datos
mongoose
  .connect(process.env.CONEXIONDB, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Db is conect...!"))
  .catch((err) => {
    console.log(Error, err.message);
  });

//conectamos el puerto
app.listen(process.env.PORT, () => {
  console.log("Conect port: ", process.env.PORT);
});
