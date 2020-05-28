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

  if (req.query.history !== undefined) {
    parameters.push('culture_hIndex = ?');
    values.push(req.query.history);
  }

  if (req.query.culture !== undefined) {
    parameters.push('culture_cIndex = ?');
    values.push(req.query.culture);
  }

  if (req.query.religion !== undefined) {
    parameters.push('culture_rIndex = ?');
    values.push(req.query.religion);
  }

  if (req.query.architecture !== undefined) {
    parameters.push('culture_aIndex = ?');
    values.push(req.query.architecture);
  }

  if (req.query.industry !== undefined) {
    parameters.push('culture_iIndex = ?');
    values.push(req.query.industry);
  }

  if (req.query.nature !== undefined) {
    parameters.push('culture_nIndex = ?');
    values.push(req.query.nature);
  }

  if (req.query.culture !== undefined) {
    parameters.push('formations_mIndex = ?');
    values.push(req.query.mountains);
  }

  if (req.query.rocks !== undefined) {
    parameters.push('culture_rIndex = ?');
    values.push(req.query.rocks);
  }

  if (req.query.beach !== undefined) {
    parameters.push('beach_Index = ?');
    values.push(req.query.beach);
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