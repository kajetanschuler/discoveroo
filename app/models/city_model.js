// Created - 02.04.2020 - by Kajetan, Malik

const sql = require('./db.js');

// Contstructor for city
const City = function(city) {
    this.city = City.city;
    // mehr?
};


City.getCity = (city, result) => {
    sql.query(`
        SELECT * FROM city_data WHERE city_data.cityId = "${city}" OR city_data.cityName = "${city}"; 
        SELECT city_data.cityId, weather_data.* FROM weather_data INNER JOIN city_data ON city_data.stationId = weather_data.stationId WHERE city_data.cityId = "${city}" OR city_data.cityName = "${city}";
        SELECT city_data.cityId, country_data.* FROM country_data INNER JOIN city_data ON city_data.countryCode = country_data.countryCode WHERE city_data.cityId = "${city}" OR city_data.cityName = "${city}";
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