//Created - 05.2020 - by Svenja

const sql = require('./db.js');

var parameters = [];
var values = [];

const Recommendation = function() {
  //this.parameters = Recommendation.parameters
};

// Function that returns recommendation according to preferences 
Recommendation.getParameters = (req) => {
 //console.log(req)

  if (req.query.beach !== 'undefined') {
    parameters.push("beach = ?");
    values.push("%" + req.query.beach + "%");
  }

  if (req.query.nature !== 'undefined') {
    parameters.push("nature = ?");
    values.push(req.query.nature);
  }

  console.log("getParameters vor Return")

  return {
    where: parameters.length ?
             parameters.join(parameters, ' AND ') : '1',
    values: values
  };

} 

//var parameters = getReommendation(params);

Recommendation.getRecommendation = (recommendation, result) => {
  //getParameters(req),
  sql.query(('SELECT * FROM city_data INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + parameters.where ), parameters.values, (err, res)  => {
    if (err) {
      console.log("error: ", err);gut 
      result(err, null);
      return
    }

    if (res.length) {
      console.log("Recommended: ", res);
      result(err, res);
      return;
    }

    result({kind: "not_found"}, null);

  }); 
};


module.exports = Recommendation; 
