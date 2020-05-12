//created by Svenja
const sql = require("../../../../Discoveroo API/discoveroo/app/models/db.js");

// constructor for region
const Region = function(region) {
  this.regionName = Region.regionName;
  this.regionCode = Region.regionCode;
  this.region = Region.region;
};

//find all region 
Region.getAllRegions = result => {
  sql.query("SELECT regionCode, regionName, countryCode FROM city_data", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log("Found region/regions: ", res);
      result(err, res);
      return;
    }
    result({kind: "not_found"}, null);
  });

};

// Find details for one region by regionCode or regionName
Region.getRegionDetails = resut => {
  sql.query('SELECT * FROM city_data WHERE regionCode = "${country}" OR regionNameName = "${country}"`, (err, res) => "${region}" ', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null,err);
      return;
    }
    if(res.length){
      console.log("Found details for this gregion: ", res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};



// Find all cities in region by regionCode or regionName
Region.getCitiesInRegion = resut => {
  sql.query('SELECT cityID, cityName FROM city_data as cd INNER JOIN region_data as rd ON cd.regionCode = rd.regionCode where rd.regionName ="${region}" OR rd.regionCode = "${region}', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null,err);
      return;
    }
    if(res.length){
      console.log("Found cities in this region: ", res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = Region
