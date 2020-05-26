// Created - 05.2020 - by Svenja

const recommendation = require('../models/recommendation_model.js');


//hier wird festgelegt, dass der HTTP request req heißt (ebenso für HTTP Response = res)
exports.buildRecommendation = (req, res) => {
    //console.log(req)
    recommendation.getParameters(req)
    recommendation.getRecommendation( (err, data) => {
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
