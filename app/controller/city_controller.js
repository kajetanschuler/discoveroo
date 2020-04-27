// Created - 02.04.2020 - by Kajetan

const City = require('../models/city_model.js');

// Find City by ID
exports.findOne = (req, res) => {
    City.getCity(req.params.city, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with id ${req.params.city}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving City with id " + req.params.city
          });
        }
      } else res.send(data);
    });
  };

  // Find City by Name
  exports.findName = (req, res) => {
    City.getByName(req.params.cityName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with name ${req.params.cityName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving City with name " + req.params.cityName
          });
        }
      } else res.send(data);
    });
  };

  // Retrieve all Cities (Name, ID, CountryCode)
  exports.findAll = (req, res) => {
    City.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: "Some error occurred while retrieving cities."
        });
      else res.send(data);
    });
  };

