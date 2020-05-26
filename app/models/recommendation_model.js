//Created - 05.2020 - by Svenja

const sql = require('./db.js');

const Recommendation = function() {
  //this.parameters = Recommendation.parameters
};

// Function that returns recommendation according to preferences 
function getParameters(req, res) {
  console.log("test4")
  var parameters = [];
  var values = [];

  if (req.query.beach !== 'undefined') {
    parameters.push("beach = ?");
    values.push("%" + req.query.beach + "%");
  }

  if (req.query.nature !== 'undefined') {
    parameters.push("nature = ?");
    values.push(req.query.nature);
  }

  console.log("test5")

  return {
    where: parameters.length ?
             sql.join(parameters, ' AND ') : '1',
    values: values
  };
}

//var parameters = getReommendation(params);

Recommendation.getRecommendation = (req, res) => {
  console.log("test3")
  getParameters(req, res),
  console.log("test6")
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
