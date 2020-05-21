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
                    console.log("MAX ID: "+ maxPopulationId);
                    var cityId = json[citySelect]["cityId"];
                    console.log("CITY ID: " + cityId)
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
    
    //console.log(citiesFiltered);

}

var t0 = performance.now()

filterCities(json);

var t1 = performance.now()
console.log("Call to filter cities took " + (t1 - t0) + " milliseconds.")


// TODO: Ohne delete --> 80ms, mit delete 9-10ms, mit if auf stationId --> 8-9ms



