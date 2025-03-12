const express = require("express");
const dotenv = require('dotenv')
const Db = require("./controllers/Db");

const app = express();
dotenv.config()
Db()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
