//Created - 05.2020 - by Svenja

const sql = require('./db.js').pool;
const mysql = require('./db.js').mysql; 

var cityParameters = []; var cityValues = []; var recomCity ={};
var countryParameters = []; var countryValues = []; var recomCountry={};
var weatherParameters = []; var weatherValues = []; var recomWeather={};
var order={};

const Recommendation = function() {
};

function getCityParameters (req) {

  if (recomCountry != undefined){
    recomCity.where=null
    recomCity.values=null
    cityParameters.length = 0;
    cityValues.length=0;}

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

  if (recomCountry != undefined){
    recomCountry.where=null
    recomCountry.values=null
    countryParameters.length = 0;
    countryValues.length=0;
  };
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
  var tempMax; var tempMin; var date; var month; 

  if (req.query.temp > 0 && req.query.start !== undefined) {
    //Verbesserungsidee: Start oder Enddatum als Grundlage auswählen, je nach dem, in welchem Monat der größere Anteil des Urlaubs ist? Oder Mittelwert? 
    date = req.query.start
    month = date.substr(5,2);

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
    if (req.query.temp !== undefined && month == '01') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_jan_value <= ?')
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_jan_value >= ?')
    }
    if (req.query.temp !== undefined && month == '02') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_feb_value <= ?')
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_feb_value >= ?')
    }
    if (req.query.temp !== undefined && month == '03') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_mar_value <= ?')
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_mar_value >= ?')
    }
    if (req.query.temp !== undefined && month == '04') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_apr_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_apr_value >= ?')
    }
    if (req.query.temp !== undefined && month == '05') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_may_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_may_value >= ?')
    }
    if (req.query.temp !== undefined && month == '06') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_jun_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_jun_value >= ?')
    }
    if (req.query.temp !== undefined && month =='07') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_jul_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_jul_value >= ?')
    }
    if (req.query.temp !== undefined && month == '08') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_aug_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_aug_value >= ?')
    }
    if (req.query.temp !== undefined && month == '09') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_sep_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_sep_value >= ?')
    }
    if (req.query.temp !== undefined && month == '10') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_oct_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_oct_value >= ?')
    }
    if (req.query.temp !== undefined && month == '11') {
      weatherValues.push(tempMax)
      weatherParameters.push('tmax_nov_value <= ?') 
      weatherValues.push(tempMin);
      weatherParameters.push('tmax_nov_value >= ?')
    }
    if (req.query.temp !== undefined && month == '12') {
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
  
  if (req.query.culure_hIndex >= '4') {
  countVeryImportant++ 
  orderParam = 'culure_hIndex'
  };
  if (req.query.culture_cIndex >= '4'){
  countVeryImportant++ 
  orderParam = 'culture_cIndex'
  };
  if (req.query.culture_aIndex >= '4') {
  countVeryImportant++ 
  orderParam = 'culture_aIndex'
  }
  if (req.query.culture_iIndex >= '4'){
  countVeryImportant++ 
  orderParam = 'culture_iIndex'
  }
  if (req.query.culture_nIndex >= '4'){
  countVeryImportant++ 
  orderParam = 'culture_nIndex'
  }
  if (req.query.formations_mIndex >= '4'){
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
  console.log('count '+ countVeryImportant)

  if(countVeryImportant == 1 ) {
  orderSqlQuery = ' order by ' + orderParam + ' DESC '
  order = {
      orderSqlStatement: orderSqlQuery
    };
  console.log(orderSqlQuery) 
  }
   else {
    order = {
      orderSqlStatement: ''
    }
  }
  return order 
};  


Recommendation.getRecommendation =  (req, result) => {
  var cityParameters = getCityParameters(req);
  var countryParameters = getCountryParameters(req);
  var weatherParameters = getWeatherParameters(req);
  var orderParameter = getOrderParameter(req);
  console.log(orderParameter)
  //city, country und weather Parameter
  if (cityValues.length > 0 && countryValues.length > 0 && weatherValues.length > 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where 
    var weatherSqlQuery = ' AND stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where + ')' 
    var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))'
    var cityInserts = cityParameters.values; var countryInserts = countryParameters.values; var weatherInserts = weatherParameters.values; 
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); var weatherSqlStatement=mysql.format(weatherSqlQuery, weatherInserts); var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts)
    var orderSqlStatement = orderParameter.orderSqlStatement
    var sqlStatement = citySqlStatement + weatherSqlStatement + countrySqlStatement + orderSqlStatement;
    console.log('city, country und weather: ' + sqlStatement);
    sql.query(sqlStatement, (err, res)  => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } 
      result({kind: "not_found"}, null);
    });
  };
  //city und country Parameter
  if (cityValues.length > 0 && countryValues.length > 0 && weatherValues.length == 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where
    var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))'
    var cityInserts = cityParameters.values; var countryInserts = countryParameters.values;
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); varWeatherSqlStatement=mysql.format(weatherSqlQuery, ); var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts)
    var sqlStatement = citySqlStatement + countrySqlStatement
    console.log('city und country: ' + sqlStatement)
    sql.query(sqlStatement, (err, res)  => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }  
      result({kind: "not_found"}, null);
    });
  };
  //city und weather Parameter
  if (cityValues.length > 0 && countryValues.length == 0 && weatherValues.length > 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE cityId IN (SELECT cityId FROM city_data WHERE ' + cityParameters.where 
    var weatherSqlQuery = ' AND stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where + '))' 
    var cityInserts = cityParameters.values; var weatherInserts = weatherParameters.values; 
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); var weatherSqlStatement=mysql.format(weatherSqlQuery, weatherInserts); var countrySqlStatement = mysql.format(countrySqlQuery, countryInserts)
    var sqlStatement = citySqlStatement + weatherSqlStatement
    console.log('city und weather: ' + sqlStatement);
    sql.query(sqlStatement, (err, res)  => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }   
      result({kind: "not_found"}, null);
    });
  };
  //country und weather Parameter
  if (cityValues.length == 0 && countryValues.length > 0 && weatherValues.length > 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode'
    var weatherSqlQuery = ' WHERE stationId IN (SELECT stationId FROM weather_data WHERE ' + weatherParameters.where  
    var countrySqlQuery = ' AND countryCode IN (SELECT countryCode FROM country_data WHERE ' + countryParameters.where + '))'
    var countryInserts = countryParameters.values; var weatherInserts = weatherParameters.values; 
    var countrySqlStatement= mysql.format(countrySqlQuery, countryInserts); var weatherSqlStatement=mysql.format(weatherSqlQuery, weatherInserts);
    var sqlStatement = citySqlQuery + weatherSqlStatement + countrySqlStatement 
    console.log('country und weather: ' + sqlStatement);
    sql.query(sqlStatement, (err, res)  => {
      if (err) {
        result(err, null);
        return
      }
      if (res.length) {
        result(null, res);
        return;
      }    
      result({kind: "not_found"}, null);
    });
  };
  //nur city Parameter
  if (cityValues.length > 0 && countryValues.length == 0 && weatherValues.length == 0) {
    var citySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + cityParameters.where
    var cityInserts = cityParameters.values;
    var citySqlStatement= mysql.format(citySqlQuery, cityInserts); 
    console.log('nur city: ' + citySqlStatement)
    sql.query(citySqlStatement, (err, res)  => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({kind: "not_found"}, null);
    });
  };
  //nur country Parameter
  if (cityValues.length == 0 && countryValues.length > 0 && weatherValues.length == 0) {
    var countrySqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + countryParameters.where
    var countryInserts = countryParameters.values;
    var SqlStatement= mysql.format(countrySqlQuery, countryInserts); 
    console.log('nur city: ' + citySqlStatement)
    sql.query(SqlStatement, (err, res)  => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({kind: "not_found"}, null);
    });
  };
   //nur weather Parameter
   if (cityValues.length == 0 && countryValues.length == 0 && weatherValues.length > 0) {
    var weatherSqlQuery = 'SELECT * FROM city_data INNER JOIN weather_data ON city_data.stationId = weather_data.stationId INNER JOIN country_data ON city_data.countryCode = country_data.countryCode WHERE ' + weatherParameters.where
    var weatherInserts = weatherParameters.values;
    var SqlStatement= mysql.format(weatherSqlQuery, weatherInserts); 
    console.log('nur city: ' + citySqlStatement)
    sql.query(SqlStatement, (err, res)  => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({kind: "not_found"}, null);
    });
  };
};

module.exports = Recommendation;


