//import { Express } from 'express'
const express = require("express");

const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Hola desde Node API");
});

mongoose
  .connect(
    "mongodb+srv://danielns871:lMoAjJ9UsxLUWTo7@cluster0.ptr3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("OK conexión exitosa");
    app.listen(4000, () => {
      console.log("Sever Corriendo en el Puerto 4000");
    });
  })
  .catch(() => {
    console.log("Fallo");
  });
