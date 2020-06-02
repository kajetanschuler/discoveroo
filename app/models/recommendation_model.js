//Created - 05.2020 - by Svenja

const sql = require('./db.js').pool;
const mysql = require('./db.js').mysql; 


var cityParameters = []; var cityValues = []; var recomCity ={};
var countryParameters = []; var countryValues = []; var recomCountry={};
var weatherParameters = []; var weatherValues = []; var recomWeather={};


const Recommendation = function() {
  //this.parameters = Recommendation.parameters
};


function getCityParameters (req) {

  if (recomCountry != undefined){
    recomCity.where=null
    recomCity.values=null
    cityParameters.length = 0;
    cityValues.length=0;}

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

  recomCity = {
    where: cityParameters.length ?
             cityParameters.join( ' AND ') : '1',
    values: cityValues
  };

  return recomCity

};

function getCountryParameters (req) {

  if (recomCountry != undefined){
    recomCountry.where=null
    recomCountry.values=null
    countryParameters.length = 0;
    countryValues.length=0;
    /*console.log(recomCountry, countryParameters)*/};

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

  recomCountry = {
    where: countryParameters.length ?
             countryParameters.join( ' AND ') : '',
    values: countryValues
  };
  
  //console.log(recomCountry, countryParameters)
  return recomCountry

};


function getWeatherParameters (req){
  
  recomWeather.where=0; 
  recomWeather.values=0; 
  weatherParameters.length=0;
  weatherValues.length=0;

  if (req.query.tempMax !== undefined && req.params.month == 'jan') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_jan_value <= ?')
    
  }

  if (req.query.tempMin !== undefined && req.params.month == 'jan') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_jan_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month !== 'feb') {
  weatherValues.push(req.query.tempMax)
  weatherParameters.push('tmax_feb_value <= ?')
    
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'feb') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_feb_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'mar') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_mar_value <= ?')
    
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'mar') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_mar_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'apr') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_apr_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'apr') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_apr_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'may') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_may_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'may') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_may_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'jun') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_jun_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'jun') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_jun_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month =='jul') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_jul_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month =='jul') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_jul_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'aug') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_aug_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'aug') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_aug_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'sep') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_sep_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'sep') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_sep_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'sep') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_oct_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'oct') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_oct_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'nov') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_nov_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'nov') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_nov_value >= ?')
  }

  if (req.query.tempMax !== undefined && req.params.month == 'dez') {
    weatherValues.push(req.query.tempMax)
    weatherParameters.push('tmax_dez_value <= ?') 
  }

  if (req.query.tempMin !== undefined &&  req.params.month == 'dez') {
    weatherValues.push(req.query.tempMin);
    weatherParameters.push('tmin_dez_value >= ?')
  }

  recomWeather = {
     where: weatherParameters.length ?
            weatherParameters.join( ' AND ') : '',
    values: weatherValues
  };

  return recomWeather
  
}


Recommendation.getRecommendation =  (req, result) => {
  var cityParameters = getCityParameters(req);
  var countryParameters = getCountryParameters(req);
  var weatherParameters = getWeatherParameters(req);
  console.log(weatherParameters.where); console.log(weatherParameters.value)
  //city, country und weather Parameter
  if (countryValues.length > 0 && weatherValues.length > 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where 
    var weatherSqlQuery = ' AND stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where + ')' 
    var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))'
    var cityInserts = cityParameters.values; var countryInserts = countryParameters.values; var weatherInserts = weatherParameters.values; 
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); var weatherSqlStatement=mysql.format(weatherSqlQuery, weatherInserts); var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts)
    var sqlStatement = citySqlStatement + weatherSqlStatement + countrySqlStatement;
    console.log(sqlStatement);
    sql.query(sqlStatement, (err, res)  => {
      if (err) {
        result(err, null);
        return
      }

      if (res.length) {
        result(err, res);
        return;
      }
      
      result({kind: "not_found"}, null);

    })
  }
  //city und country Parameter
  if (countryValues.length > 0 && weatherValues.length == 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where
    var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))'
    var cityInserts = cityParameters.values; var countryInserts = countryParameters.values;
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); varWeatherSqlStatement=mysql.format(weatherSqlQuery, ); var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts)
    var sqlStatement = citySqlStatement + countrySqlStatement
    console.log(sqlStatement)
    sql.query(sqlStatement, (err, res)  => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return
      }

      if (res.length) {
        result(err, res);
        return;
      }
      
      result({kind: "not_found"}, null);

    })
  }
  //nur city Parameter
  if (countryValues.length == 0 && weatherValues.length == 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + cityParameters.where
    var cityInserts = cityParameters.values; var countryInserts = countryParameters.values;
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); 
    console.log(citySqlStatement)
    sql.query(citySqlStatement, (err, res)  => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return
      }

      if (res.length) {
        result(err, res);
        return;
      }
      
      result({kind: "not_found"}, null);
    })
  }
};


module.exports = Recommendation;


