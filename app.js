// server.js

require('dotenv').config();
const express = require("express");
const connection = require("./config/db");
const Razorpay = require('razorpay');
const port = process.env.PORT || 9999;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("okk done...");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/product', require('./routes/productsRoute'));
app.use('/api/orders', require('./routes/orderRoute'));

app.listen(port, () => {
  console.log("Server Started At -", port);
  connection();
});
