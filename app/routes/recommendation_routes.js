// Created - 05.2020 - by Svenja

module.exports = app => {
    const recommendation = require('../controller/recommendation_controller.js');

    app.get("/api/v1/recommendation/:month",  recommendation.buildRecommendation);

}