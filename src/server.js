const express = require('express');
const morgan  = require('morgan');
const cors = require("cors");
const dotenv = require('dotenv');
const router = require('./routes/router');

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.json());    //parse JSON requests
app.use(express.urlencoded({ extended: true }));    //parse URL-encoded data
app.use(morgan("dev"));     // logger

app.use(
    cors({
        origin: "http://localhost:5157",    // change to URL of th frontend
        credentials: true,
    })
);

app.use("/api", router);

app.get("/", (req, res) => {
    res.send("API is running");
});

module.exports = app;

//server - router - controller - model - bd