// Created - 08.04.2020 - by Kajetan

const Country = require('../models/country_model.js');

// Find all countries
exports.findAll = (req, res) => {
    Country.getAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Did not find Countries"
                });
            } else {
                res.status(500).send({
                    message: "Error rtetrieving countries"
                });
            }
        } else res.send(data);
    });
};

// Find one country by countryCode or countryName
exports.findCountry = (req, res) => {
    Country.getCountryDetails(req.params.countryCode, (err, data) => {
        if (err) {
            if (err === "not_found") {
                res.status(404).send({
                    message: "Did not find country with code " + req.params.countryCode
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving country with code " + req.params.countryCode
                });
            }
        } else res.send(data);
    });
};

// Find all regions in a country by countryCode

// Find all regions in a country by countryName

// Find all cities in a country
exports.findCitiesInCountry = (req, res) => {
    Country.getCitiesByCountry(req.params.country, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Did not find country with name " + req.params.country
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving country with name " + req.params.country
                });
            } 
        } else res.send(data);
    });
};
