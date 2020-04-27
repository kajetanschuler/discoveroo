const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Welcome to discoveroo!')
})

require("./app/routes/city_routes.js")(app);
require("./app/routes/country_routes")(app);
require("./app/routes/weather_routes")(app);

/* app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); */

module.exports.handler = serverless(app);