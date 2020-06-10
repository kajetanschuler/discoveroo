// Created - 11.04.2020 - by Kajetan

const sql = require('./db.js');

const Weather = function(weather) {
    this.city = Weather.city;
    this.station = Weather.station;
}

// Function that returns all weather stations with assigned cities
Weather.getAll = result => {
    sql.query(`
    SELECT stationId FROM weather_data;
    SELECT cityId, cityName, countryCode, stationId FROM city_data;
    `, (err, res) => {
        if (err) {
            console.log("errors: ", err.message);
            result(err, null);
            return;
        }

        if (res.length) {
            
            var stations = res[0];
            var cities = res[1];
            var json = { };
            var json2 = { };
            Object.keys(stations).forEach(function(key) {
                var row = stations[key];
                var stationId = row.stationId;
                var c_array = [];
                //console.log(stationId);
                Object.keys(cities).forEach(function(key) {
                    var c_row = cities[key];
                    var c_stationId = c_row.stationId;
                    if (stationId === c_stationId) {
                        c_array.push(c_row);
                    }
                });
                //console.log(c_array);
                json[stationId] = c_array;
                
                json2["weather_stations:"] = json;
            });

            result(err, json);
        }
    });
};

Weather.getCity = (city, result) => {
    sql.query(`SELECT weather_data.* FROM weather_data INNER JOIN city_data ON weather_data.stationId = city_data.stationId WHERE city_data.cityname = "${city}" OR city_data.cityId = "${city}";`, (err, res) => {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found data for city:", res);
            result(err, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

Weather.getStation = (station, result) => {
    sql.query(`SELECT * FROM weather_data WHERE stationId = "${station}";`, (err, res) => {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found weather for station: ", res);
            result(err, res);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = Weather;