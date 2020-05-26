// Created - 05.2020 - by Svenja

const recommendation = require('../models/recommendation_model.js');

exports.buildRecommendation = (req, res) => {
    console.log("test1")
    recommendation.getRecommendation(req, (err, data) => {
        console.log("test")
        if (err) {
            if (err === "not_found") {
                res.status(404).send({
                    message: "Did not find matching recommendation" 
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving parameters " 
                });
            }
        } else res.send(data);

    });
}
