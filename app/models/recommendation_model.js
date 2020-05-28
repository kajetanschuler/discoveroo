//Created - 05.2020 - by Svenja

const sql = require('./db.js');

var cityParameters = [];
var cityValues = [];
var countryParameters = [];
var countryValues = [];
var weatherParameters = [];
var weatherValues = [];
//var whereStatement =; 

const Recommendation = function() {
  //this.parameters = Recommendation.parameters
};

// Function that returns recommendation according to preferences 
Recommendation.getParameters = (req) => {
 //console.log(req)

  if (req.query.history !== undefined) {
    cityParameters.push('culture_hIndex = ?');
    cityValues.push(req.query.history);
  }

  if (req.query.culture !== undefined) {
    cityParameters.push('culture_cIndex = ?');
    cityValues.push(req.query.culture);
  }

  if (req.query.religion !== undefined) {
    cityParameters.push('culture_rIndex = ?');
    cityValues.push(req.query.religion);
  }

  if (req.query.architecture !== undefined) {
    cityParameters.push('culture_aIndex = ?');
    cityValues.push(req.query.architecture);
  }

  if (req.query.industry !== undefined) {
    cityParameters.push('culture_iIndex = ?');
    cityValues.push(req.query.industry);
  }

  if (req.query.nature !== undefined) {
    cityParameters.push('culture_nIndex = ?');
    cityValues.push(req.query.nature);
  }

  if (req.query.culture !== undefined) {
    cityParameters.push('formations_mIndex = ?');
    cityValues.push(req.query.mountains);
  }

  if (req.query.rocks !== undefined) {
    cityParameters.push('culture_rIndex = ?');
    values.push(req.query.rocks);
  }

  if (req.query.beach !== undefined) {
    cityParameters.push('beach_Index = ?');
    cityValues.push(req.query.beach);
  }

  if (req.query.infrastructure !== undefined) {
    countryParameters.push('inrastructureValue= ?');
    countryValues.push(req.query.infrastructure);
  }
  
  if (req.query.cost !== undefined) {
    countryParameters.push('cpiIndex = ?');
    countryValues.push(req.query.cost);
  }

  if (req.query.safety !== undefined) {
    countryParameters.push('safety = ?');
    countryValues.push(req.query.safety);
  }


  //console.log("getParameters vor Return")

  /*return {
    where: parameters.length ?
             parameters.join( ' AND ') : '',
    values: values
  };*/

} 


Recommendation.getRecommendation =  (req, result) => {
  Recommendation.getParameters(req)
  console.log(cityParameters)
  console.log(cityValues)
  //console.log('Anfang von getRecommendation')
  sql.query('SELECT * FROM city_data INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE city_data.cityId' + (cityParameters.length ? (' IN (SELECT cityId FROM city_data WHERE ' + cityParameters.join(' AND ') + ')') : ""), cityValues, (err, res)  => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      cityValues.length = 0;
      cityParameters.length = 0;
      return
    }

    if (res.length) {
      //console.log("Recommended: ", res);
      result(err, res);
      cityValues.length = 0;
      cityParameters.length = 0;
      return;
    }
    
    //console.log("Ende von getRecommendation")
    cityValues.length = 0;
    cityParameters.length = 0;
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