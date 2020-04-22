// Created - 14.04.2020 - by Kajetan
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content type: application/json
app.use(bodyParser.json());

// parse requests of conten type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to TravelAPI"});
});

// Include the routes
require("./app/routes/city_routes.js")(app);
require("./app/routes/country_routes.js")(app);
require("./app/routes/weather_routes.js")(app);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });