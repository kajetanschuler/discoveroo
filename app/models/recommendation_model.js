//Created - 05.2020 - by Svenja

const sql = require('./db.js');

var parameters = [];
var values = [];
//var whereStatement =; 

const Recommendation = function() {
  //this.parameters = Recommendation.parameters
};

// Function that returns recommendation according to preferences 
Recommendation.getParameters = (req) => {
 //console.log(req)

  if (req.query.beach !== undefined) {
    parameters.push('beach_Index = ?');
    values.push(req.query.beach);
  }

  if (req.query.culture !== undefined) {
    parameters.push('culture_nIndex = ?');
    values.push(req.query.culture);
  }

  //console.log("getParameters vor Return")

  /*return {
    where: parameters.length ?
             parameters.join( ' AND ') : '',
    values: values
  };*/

} 


Recommendation.getRecommendation =  result => {
  //getParameters(req),
  console.log(parameters)
  console.log(values)
  //console.log('Anfang von getRecommendation')
  sql.query('SELECT * FROM city_data INNER JOIN country_data ON city_data.countryCode = country_data.countryCode' + (parameters.length ? (' WHERE ' + parameters.join(' AND ')) : ""), values, (err, res)  => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return
    }

    if (res.length) {
      //console.log("Recommended: ", res);
      result(err, res);
      return;
    }
    
    //console.log("Ende von getRecommendation")
    result({kind: "not_found"}, null);

  }); 
};


module.exports = Recommendation;
//module.exports.whereStatement = whereStatement; 

/*module.exports = {
  Recommendation,
  whereStatement
};*/



//sql.query(('SELECT * FROM city_data INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + whereStatement.where ), (err, res)  => {