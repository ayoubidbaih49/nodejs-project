const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World ");
});

app.get("/name", (req, res) => {
    res.send("Welcome back ayoub");
});
app.get("/home", (req, res) => {
    res.send("home page");
});

app.listen(3000, (req, res) => {
    console.log("is start runinig")
});