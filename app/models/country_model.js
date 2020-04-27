// Created - 08.04.2020 - by Kajetan

const sql = require('./db.js');

// Constructor for country
const Country = function(country) {
    this.countryCode = Country.countryCode;
    this.countryName = Country.countryName;
    this.country = Country.country;
};

Country.getAll = result => {
    sql.query("SELECT countryName, countryCode FROM country_data;", (err, res) => {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found country/countries: ", res);
            result(err, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

// Function that returns details for one country for given Country
Country.getCountryDetails = (country, result) => {
    sql.query(`SELECT * FROM country_data WHERE countryCode = "${country}" OR countryName = "${country}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found country: ", res);
            result(err, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

// Function that return regions of country specified with the countryCode
Country.getRegionsByCountryCode = result => {
    sql.query();

}

// Function that return regions of country specified with the countryName
Country.getRegionsByCountryName = result => {
    sql.query();

}

// Function that returns all cities for given CountryName or CountryCode
Country.getCitiesByCountry = (country, result) => {
    sql.query(`SELECT cityId, cityName FROM city_data INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE country_data.countryName = "${country}" OR country_data.countryCode = "${country}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found city/cities: ", res);
            result(err, res)
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = Country;