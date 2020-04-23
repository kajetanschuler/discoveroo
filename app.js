const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

require("./app/routes/city_routes.js")(app);

module.exports.handler = serverless(app);