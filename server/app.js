require("./config/config");
const express = require("express");
const app = express();

app.use(require("./routes/routes"));

const mongoose = require("mongoose");

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

app.listen(process.env.PORT, () => {
  console.log("Conect port: ", process.env.PORT);
});
