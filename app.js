const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '/src/.env')
});
const express = require("express");
const bookRoutes = require("./src/routes/bookRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const app = express(); // սերվեր ենք սարքում
app.use(express.json()); // Թողնում ենք որ json ուղարկեն մեզ
// console.log(envPath);
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});
console.log(process.env.DB_USERNAME);
app.use("/products", productRoutes);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res, next) => {
  res.send("Page is Empty");
  next();
});

app.get("/kim", (req, res, next) => {
  res.send("Kim Kardashyan");
  next();
});

app.use((err, req, res, next) => {
  res.json({
    error: true,
    message: err.message,
  });
  next(err);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
