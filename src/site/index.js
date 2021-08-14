require("dotenv").config();
const ejs = require("ejs");

const path = require("path");
const colors = require("colors");
const express = require("express");

const app = express();
const port = process.env.PORT || 8081;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

app.use(require("./routes/index"));
app.use(require("./routes/links")); 

app.listen(port, () => console.log(colors.yellow(`[SERVER] - Servidor Iniciado na Porta: ${port};`)));