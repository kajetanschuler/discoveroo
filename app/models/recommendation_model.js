//Created - 05.2020 - by Svenja

const sql = require('./db.js').pool;
const mysql = require('./db.js').mysql; 

//console.log(mysql)

var cityParameters = [];
var cityValues = [];
var countryParameters = [];
var countryValues = [];
var weatherParameters = [];
var weatherValues = [];

const Recommendation = function() {
  //this.parameters = Recommendation.parameters
};


// Function that returns recommendation according to preferences 
function getCityParameters (req) {

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

  if (req.query.formations !== undefined) {
    cityParameters.push('formations_mIndex = ?');
    cityValues.push(req.query.mountains);
  }

  if (req.query.rocks !== undefined) {
    cityParameters.push('culture_rIndex = ?');
    cityValues.push(req.query.rocks);
  }

  if (req.query.beach !== undefined) {
    cityParameters.push('beach_Index = ?');
    cityValues.push(req.query.beach);
  }

  return {
    where: cityParameters.length ?
             cityParameters.join( ' AND ') : '1',
    values: cityValues
  };

};

// Function that returns recommendation according to preferences 
function getCountryParameters (req) {

  if (req.query.infrastructure !== undefined) {
    countryParameters.push('infrastructureValue= ?');
    countryValues.push(req.query.infrastructure);
  }
  
  if (req.query.cost !== undefined) {
    countryParameters.push('cpiIndex = ?');
    countryValues.push(req.query.cost);
  }

  if (req.query.safety !== undefined) {
    countryParameters.push('safetyIndex = ?');
    countryValues.push(req.query.safety);
  }

  return {
    where: countryParameters.length ?
             countryParameters.join( ' AND ') : '1',
    values: countryValues
  };

};


Recommendation.getRecommendation =  (req, result) => {
  var cityParameters = getCityParameters(req);
  var countryParameters = getCountryParameters(req);
  var citySqlQuery = 'SELECT * FROM city_data INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where
  var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))'
  var cityInserts = cityParameters.values; var countryInserts = countryParameters.values;
  var citySqlStatement= mysql.format(citySqlQuery, cityInserts); var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts)
  var sqlStatement = citySqlStatement + countrySqlStatement
  sql.query(sqlStatement,
  (err, res)  => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      cityValues.length = 0;
      cityParameters.length = 0;
      countryValues.length = 0;
      countryParameters.length = 0;
      return
    }

    if (res.length) {
      result(err, res);
      cityValues.length = 0;
      cityParameters.length = 0;
      countryValues.length = 0;
      countryParameters.length = 0;
      return;
    }
    
    cityValues.length = 0;
    cityParameters.length = 0;
    countryValues.length = 0;
    countryParameters.length = 0;
    countryParameters.values =0; 
    cityParameters.values=0; 
    cityParameters.where=0; 
    countryValues.where=0;
    sql.Statement=0; 
    citySqlStatement=0; 
    countrySqlStatement=0;
    countrySqlQuery=0;
    citySqlQuery=0;
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


