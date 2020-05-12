//created by Svenja
const sql = require("./db.js");

// constructor for region
const Region = function(region) {
  this.regionName = Region.regionName;
  this.regionCode = Region.regionCode;
  this.region = Region.region;
};

//find all region 
Region.getAllRegions = result => {
  sql.query("SELECT regionCode, regionName, countryCode FROM region_data", (err, res) => {
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
Region.getRegionDetails = (region, result) => {
  sql.query(`SELECT * FROM region_data WHERE regionCode = ${region} OR regionName = ${region}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if(res.length){
      console.log("Found details for this region: ", res);
      result(err, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};



// Find all cities in region by regionCode or regionName
Region.getCitiesInRegion = result => {
  sql.query(`SELECT cityID, cityName FROM city_data cd INNER JOIN region_data rd ON cd.regionCode = rd.regionCode where rd.regionName ="${region}" OR cd.regionCode = "${region}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if(res.length){
      console.log("Found cities in this region: ", res);
      result(err, null);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = Region

