// Created - 02.04.2020 - by Kajetan, Malik

const sql = require('./db.js');

// Contstructor for city
const City = function(city) {
    this.cityName = city.cityName;
    this.cityId = city.cityId;
    // mehr?
};


City.getById = (cityId, result) => {
    sql.query(`
        SELECT * FROM city_data WHERE city_data.cityId = ${cityId}; 
        SELECT city_data.cityId, weather_data.* FROM weather_data INNER JOIN city_data ON city_data.stationId = weather_data.stationId WHERE city_data.cityId = ${cityId};
        SELECT city_data.cityId, country_data.* FROM country_data INNER JOIN city_data ON city_data.countryCode = country_data.countryCode WHERE city_data.cityId = ${cityId};
        `, (err, res) => {
        if (err) {
            console.log("error: ". err);
            result(err, null);
            return;
        }

        if (res.length) {
            var key_city = "city_data";
            var key_country = "country_data";
            var key_weather = "weather_data";
            var json = { };
            json[key_city] = res[0];
            json[key_weather] = res[1];
            json[key_country] = res[2];
            console.log("Found city: ", json);
            result(err, json);
            return;
        }

        // not found city with id
        result({kind: "not_found"}, null);
    });
};

City.getByName = (cityName, result) => {
    sql.query(`SELECT * FROM city_data WHERE cityName = "${cityName}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found city/cities: ", res);
            result(err, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

City.getAll =  result => {
    sql.query("SELECT cityId, cityName, countryCode FROM city_data", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found city/cities: ", res);
            result(err, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = City;