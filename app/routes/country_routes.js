// Created - 08.04.2020 - by Kajetan

module.exports = app => {
    const country = require('../controller/country_controller.js');

    // Find all countries and corresponding codes
    app.get("/api/v1/countries", country.findAll);

    // Find details for one country by countryCode or countryName
    app.get("/api/v1/countries/:countryCode", country.findCountry);

    // Find all regions in country


    // Find all cities in country by CountryCode or CountryName
    app.get("/api/v1/countries/:country/cities", country.findCitiesInCountry);

}