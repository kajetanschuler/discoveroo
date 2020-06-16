// Function that takes a JSON and filters nearby cities 
// Created - 11.05.2020 - by Kajetan
const { PerformanceObserver, performance } = require('perf_hooks');
//const json = require('./test.json')

const geolib = require('geolib');
postalCodes = require('./german_postal.json')


function filterCities(json) {
    var citiesFiltered = [];
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
    
    //console.log("Cities filtered: " + citiesFiltered.length);
    return citiesFiltered;
    

}
// Es müssen übergeben werden: plz, cdist

//Find out lat lon of Zip Code
function findCoordinates (zip){
    var lat
    var lon
        for (var city in postalCodes){
            if (postalCodes[city]['Postal_Code'] == zip) {
                lat = postalCodes[city]['Latitude']
                lon = postalCodes[city]['Longitude']
            }
        }
        return [lat, lon]	
}


// Json Filterung auf Basis der Entfernungen
function filterDistance (json, clat, clon, cdist) {
    var json;
    var clat;
    var clon;
    var cdist;
    var filteredDistance = [];

    for( var city in json ){
        var lat = json[city]['lat'];
        var lon = json[city]['lon'];
        
        var dist = geolib.getDistance(
            { latitude: clat, longitude: clon },
            { latitude: lat, longitude: lon})
        dist /= 1000;
        
        
        if ( dist < cdist) {
            //console.log(json[city].city_data[0].cityId + ' ist in Reichweite')
            filteredDistance.push(json[city]);
        }
    }
    //console.log("Distanz: " + filteredDistance.length)
    return filteredDistance
}

class CityFilter {
    constructor() {
    }
        static filterRecommendedCities (json, zip, distance) {
            var ccord = findCoordinates(zip)
            var clat = ccord[0]
            var clon = ccord[1]
            var filterComplete = filterCities(filterDistance(json, clat, clon, distance));
            
            return filterComplete
        };
    
}

module.exports = CityFilter;


/* var plz = "71149" 
let ccord = findCoordinates(json2, plz)
let clat = ccord[0]
let clon = ccord[1]

var t0 = performance.now()

filterCities(filterDistance(json, clat, clon, 2000));

var t1 = performance.now()
console.log("Call to filter cities took " + (t1 - t0) + " milliseconds.")
 */
 
// TODO: Ohne delete --> 80ms, mit delete 9-10ms, mit if auf stationId --> 8-9ms, mit filter davor --> 6-7ms



