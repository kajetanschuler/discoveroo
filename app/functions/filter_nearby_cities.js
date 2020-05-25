// Function that takes a JSON and filters nearby cities 
// Created - 11.05.2020 - by Kajetan
json = require("./test.json");
const { PerformanceObserver, performance } = require('perf_hooks');

var lat;
var lon; 
var citiesFiltered = [];

function filterCities(json) {
    var cityList = [];
    var stationIdList = [];

    for (var city in json) {
        var maxPopulation = 0;
        var maxPopulationId = 0;

        var stationId = json[city]["stationId"];
        var population = json[city]["population"]
        var cityId = json[city]["cityId"]
        
        if (!stationIdList.includes(stationId)) {
            for (var stationCity in json) {
                var innerStationId = json[stationCity]["stationId"];
                var innerPopulation = json[stationCity]["population"];
                var innerCityId = json[stationCity]["cityId"]
                if (innerStationId == stationId && !stationIdList.includes(innerStationId)) {
                    var innerCityObj = {};
                    innerCityObj["innerCityId"] = innerCityId;
                    innerCityObj["innerPopulation"] = innerPopulation;
                    cityList.push(innerCityObj);
                }
            }
            
            for (var population in cityList) {
                var pop = cityList[population]["innerPopulation"];
                var cityId = cityList[population]["innerCityId"];
                if (pop > maxPopulation) {
                    maxPopulation = pop;
                    maxPopulationId = cityId;
                }
            } 
            
            if (cityList.length != 0) {
                for (var citySelect in json) {
                    //console.log("MAX ID: "+ maxPopulationId);
                    var cityId = json[citySelect]["cityId"];
                    //console.log("CITY ID: " + cityId)
                    if (cityId == maxPopulationId) {
                        var cityFilter = json[citySelect];
                        citiesFiltered.push(cityFilter);
                        break;
                    }
                }
            }

            stationIdList.push(stationId);
            //console.log(cityList);
            cityList.length = 0;

        }
            delete json[city];
        
    }
    
    console.log("Cities filtered: " + citiesFiltered.length);
    

}
// Es müssen übergeben werden: plz, cdist
const geolib = require('geolib');
json2 = require('./german_postal.json')

var lat
var lon
//Find out lat lon of Zip Code
function findCoordinates (json2, plz){
var plz
var lat
var lon
	for (var stadt in json2){
		if (json2[stadt]['Postal_Code'] == plz) {
			lat = json2[stadt]['Latitude']
			lon = json2[stadt]['Longitude']
			

		}
	}
	return [lat, lon]	
}


// Json Filterung auf Basis der Entfernungen
function myfunction (json, clat, clon, cdist) {
var json;
var clat;
var clon;
var cdist;
var test = [];

for( var city in json ){
	var lat = json[city]['lat'];
	var lon = json[city]['lon'];
	
	var dist = geolib.getDistance(
		{ latitude: clat, longitude: clon },
		{ latitude: lat, longitude: lon})
    dist /= 1000;
    
	
	if ( dist < cdist) {
		//console.log(json[city].city_data[0].cityId + ' ist in Reichweite')
		test.push(json[city]);
	}
}
console.log("Distanz: " + test.length)
return test
}


var plz = "71149" 
let ccord = findCoordinates(json2, plz)
let clat = ccord[0]
let clon = ccord[1]

var t0 = performance.now()

filterCities(myfunction(json, clat, clon, 2000));

var t1 = performance.now()
console.log("Call to filter cities took " + (t1 - t0) + " milliseconds.")


// TODO: Ohne delete --> 80ms, mit delete 9-10ms, mit if auf stationId --> 8-9ms, mit filter davor --> 6-7ms



