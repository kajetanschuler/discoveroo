//Created - 05.2020 - by Svenja

const sql = require('./db.js');
const mysql = require('mysql');

var cityParameters = []; var cityValues = []; var recomCity ={};
var countryParameters = []; var countryValues = []; var recomCountry={};
var weatherParameters = []; var weatherValues = []; var recomWeather={};
var order={};

class Recommendation {
  constructor() {
  }
  static getRecommendation(req, result) {
    var cityParameters = getCityParameters(req);
    var countryParameters = getCountryParameters(req);
    var weatherParameters = getWeatherParameters(req);
    var orderParameter = getOrderParameter(req);
    //city, country und weather Parameter
    if (cityValues.length > 0 && countryValues.length > 0 && weatherValues.length > 0) {
      var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where;
      var weatherSqlQuery = ' AND stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where + ')';
      var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))';
      var cityInserts = cityParameters.values;
      var countryInserts = countryParameters.values;
      var weatherInserts = weatherParameters.values;
      var citySqlStatement = mysql.format(citySqlQuery, cityInserts);
      var weatherSqlStatement = mysql.format(weatherSqlQuery, weatherInserts);
      var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts);
      var orderSqlStatement = orderParameter.orderSqlStatement;
      var sqlStatement = citySqlStatement + weatherSqlStatement + countrySqlStatement + orderSqlStatement;
      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
    //city und country Parameter
    if (cityValues.length > 0 && countryValues.length > 0 && weatherValues.length == 0) {
      var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where;
      var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))';
      var cityInserts = cityParameters.values;
      var countryInserts = countryParameters.values;
      var citySqlStatement = mysql.format(citySqlQuery, cityInserts);
      var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts);
      var orderSqlStatement = orderParameter.orderSqlStatement;
      var sqlStatement = citySqlStatement + countrySqlStatement + orderSqlStatement;
      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
    //city und weather Parameter
    if (cityValues.length > 0 && countryValues.length == 0 && weatherValues.length > 0) {
      var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where;
      var weatherSqlQuery = ' AND stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where + '))';
      var cityInserts = cityParameters.values;
      var weatherInserts = weatherParameters.values;
      var citySqlStatement = mysql.format(citySqlQuery, cityInserts);
      var weatherSqlStatement = mysql.format(weatherSqlQuery, weatherInserts);
      var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts);
      var orderSqlStatement = orderParameter.orderSqlStatement;
      var sqlStatement = citySqlStatement + weatherSqlStatement + orderSqlStatement;
      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
    //country und weather Parameter
    if (cityValues.length == 0 && countryValues.length > 0 && weatherValues.length > 0) {
      var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode';
      var weatherSqlQuery = ' WHERE city_data.stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where;
      var countrySqlQuery = ' AND city_data.countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))';
      var countryInserts = countryParameters.values;
      var weatherInserts = weatherParameters.values;
      var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts);
      var weatherSqlStatement = mysql.format(weatherSqlQuery, weatherInserts);
      var orderSqlStatement = orderParameter.orderSqlStatement;
      var sqlStatement = citySqlQuery + weatherSqlStatement + countrySqlStatement + orderSqlStatement;
      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
    //nur city Parameter
    if (cityValues.length > 0 && countryValues.length == 0 && weatherValues.length == 0) {
      var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + cityParameters.where;
      var cityInserts = cityParameters.values;
      var orderSqlStatement = orderParameter.orderSqlStatement;
      var citySqlStatement = mysql.format(citySqlQuery, cityInserts);
      var sqlStatement = citySqlStatement + orderSqlStatement;
      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
    //nur country Parameter
    if (cityValues.length == 0 && countryValues.length > 0 && weatherValues.length == 0) {
      var countrySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + countryParameters.where;
      var countryInserts = countryParameters.values;
      var orderSqlStatement = orderParameter.orderSqlStatement;
      var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts);
      var sqlStatement = countrySqlStatement + orderSqlStatement;
      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
    //nur weather Parameter
    if (cityValues.length == 0 && countryValues.length == 0 && weatherValues.length > 0) {
      var weatherSqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + weatherParameters.where;
      var weatherInserts = weatherParameters.values;
      var sqlStatement = mysql.format(weatherSqlQuery, weatherInserts);

      sql.query(sqlStatement, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    ;
  }
}

function getCityParameters (req) {

  recomCity.where=null
  recomCity.values=null
  cityParameters.length = 0;
  cityValues.length=0;

  if (req.query.hculture !== undefined && req.query.hculture !== '0') {
    cityParameters.push('culture_hIndex >= ?');
    cityValues.push(req.query.hculture);
  }
  if (req.query.cculture !== undefined && req.query.cculture !== '0') {
    cityParameters.push('culture_cIndex >= ?');
    cityValues.push(req.query.cculture);
  }
  if (req.query.rculture !== undefined && req.query.rculture !== '0') {
    cityParameters.push('culture_rIndex >= ?');
    cityValues.push(req.query.rculture);
  }
  if (req.query.aculture !== undefined && req.query.aculture !== '0') {
    cityParameters.push('culture_aIndex >= ?');
    cityValues.push(req.query.aculture);
  }
  if (req.query.iculture !== undefined && req.query.iculture !== '0') {
    cityParameters.push('culture_iIndex >= ?');
    cityValues.push(req.query.iculture);
  }
  if (req.query.nculture !== undefined & req.query.nculture !=='0') {
    cityParameters.push('culture_nIndex >= ?');
    cityValues.push(req.query.nculture);
  }
  if (req.query.mformations !== undefined && req.query.mformation !== '0') {
    cityParameters.push('formations_mIndex >= ?');
    cityValues.push(req.query.mformations);
  }
  if (req.query.beach !== undefined && req.query.beach !== 0) {
    cityParameters.push('beach_Index >= ?');
    cityValues.push(req.query.beach);
  }

  recomCity = {
    where: cityParameters.length ?
             cityParameters.join( ' AND ') : '',
    values: cityValues
  };
  return recomCity
};

function getCountryParameters (req) {

  recomCountry.where=null
  recomCountry.values=null
  countryParameters.length = 0;
  countryValues.length=0;

  if (req.query.infra !== undefined && req.query.infra !== '0') {
    countryParameters.push('infrastructureValue >= ?');
    countryValues.push(req.query.infra);
  }
  if (req.query.cpi !== undefined && req.query.cpi !== '0') {
    countryParameters.push('cpiIndex <= ?');
    countryValues.push(req.query.cpi);
  }
  if (req.query.safety !== undefined && req.query.safety !== '0') {
    countryParameters.push('safetyIndex >= ?');
    countryValues.push(req.query.safety);
  }
  recomCountry = {
    where: countryParameters.length ?
             countryParameters.join( ' AND ') : '',
    values: countryValues
  };
  return recomCountry
};

function getWeatherParameters (req){
  
  recomWeather.where=0; 
  recomWeather.values=0; 
  weatherParameters.length=0;
  weatherValues.length=0;
  var tempMax; var tempMin; var date; 
  var monthStart=0; monthEnd=0;

  if (req.query.temp !== undefined && req.query.start !== undefined) {
    dateStart = req.query.start
    monthStart = dateStart.substr(5,2);
    if (req.query.end !== undefined) {
      dateEnd = req.query.end
      monthEnd = dateEnd.substr(5,2)
    }
    if (req.query.temp == 1){
      tempMax = '-10'
      tempMin = '-30'
    }
    if (req.query.temp == 2){
      tempMax = '10'
      tempMin = '-10'
    }
    if (req.query.temp == 3){
      tempMax = '15'
      tempMin = '5'
    }
    if (req.query.temp == 4){
      tempMax = '25'
      tempMin = '10'
    }
    if (req.query.temp == 5){
      tempMax = '30'
      tempMin = '20'
    }
    if (req.query.temp == 6){
      tempMax = '35'
      tempMin = '25'
    }
    if (req.query.temp == 7){
      tempMin = '35'
    }
    if (monthStart == '01' || monthEnd == '01') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_jan_value <= ?')
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_jan_value >= ?')
    }
    if (monthStart == '02' || monthEnd == '02') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_feb_value <= ?')
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_feb_value >= ?')
    }
    if (monthStart == '03' || monthEnd == '03') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_mar_value <= ?')
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_mar_value >= ?')
    }
    if (monthStart == '04' || monthEnd == '04') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_apr_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_apr_value >= ?')
    }
    if (monthStart == '05' || monthEnd == '05') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_may_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_may_value >= ?')
    }
    if (monthStart == '06' || monthEnd == '06') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_jun_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_jun_value >= ?')
    }
    if (monthStart == '6' || monthEnd == '6') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_jul_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_jul_value >= ?')
    }
    if (monthStart == '8' || monthEnd == '8') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_aug_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_aug_value >= ?')
    }
    if (monthStart == '9' || monthEnd == '9') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_sep_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_sep_value >= ?')
    }
    if (monthStart == '10' || monthEnd == '10') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_oct_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_oct_value >= ?')
    }
    if (monthStart == '11' || monthEnd == '11') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_nov_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_nov_value >= ?')
    }
    if (monthStart == '12' || monthEnd == '12') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_dez_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_dez_value >= ?')
    }
    recomWeather = {
      where: weatherParameters.length ?
              weatherParameters.join( ' AND ') : '',
      values: weatherValues
    };
    return recomWeather
  };  
};

function getOrderParameter (req) {
  var countVeryImportant = 0; 
  var orderParam; 
  
  if (req.query.hculture >= '4') {
  countVeryImportant++ 
  orderParam = 'culure_hIndex'
  };
  if (req.query.cculture >= '4'){
  countVeryImportant++ 
  orderParam = 'culture_cIndex'
  };
  if (req.query.aculture >= '4') {
  countVeryImportant++ 
  orderParam = 'culture_aIndex'
  }
  if (req.query.iculture >= '4'){
  countVeryImportant++ 
  orderParam = 'culture_iIndex'
  }
  if (req.query.nculture >= '4'){
  countVeryImportant++ 
  orderParam = 'culture_nIndex'
  }
  if (req.query.mculture >= '4'){
  countVeryImportant++ 
  orderParam = 'formations_mIndex'
  }
  if(req.query.infra >= '4'){
  countVeryImportant++ 
  orderParam = 'infrastructureValue'
  }
  if (req.query.cpi <= '2' && req.query.cpi !== '0') {
  countVeryImportant++ 
  orderParam = 'cpiIndex'
  }
  if (req.query.safety >= '4') {
  countVeryImportant++ 
  orderParam = 'safetyIndex'
  }
  if(countVeryImportant == 1 ) {
  orderSqlQuery = ' order by ' + orderParam + ' DESC '
  order = {
      orderSqlStatement: orderSqlQuery
    };
  }
   else {
    order = {
      orderSqlStatement: ''
    }
  }
  return order 
};  



module.exports = Recommendation;


