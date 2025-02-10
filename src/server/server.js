const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require("../routes/userRoutes") ;

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

module.exports = app;