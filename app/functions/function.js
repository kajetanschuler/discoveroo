// Es müssen übergeben werden: plz, cdist
var json= require('./test.json')
//[{"city_data":[{"cityId":659,"stationId":"AEM00041217","countryCode":"AE","type":"CITY","cityName":"Abu Dhabi","regionCode":"AE_AZ","regionName":"Abu Dhabi Emirate","lat":24.451179999999997,"lon":54.39696,"population":1000000,"elevation":"14.0","timezone":"Asia__Dubai","culture_hIndex":1,"culture_cIndex":1,"culture_rIndex":1,"culture_aIndex":1,"culture_iIndex":0,"culture_nIndex":1,"formations_mIndex":0,"formations_rIndex":0,"beach_Index":3,"image_links":"https://travelapiimages.s3.eu-central-1.amazonaws.com/659.jpg"}],"weather_data":[{"cityId":659,"stationId":"AEM00041217","tmax_jan_value":25.5,"tmin_jan_value":15.5,"tmax_feb_value":25.7,"tmin_feb_value":15.9,"tmax_mar_value":30.3,"tmin_mar_value":18.3,"tmax_apr_value":35.7,"tmin_apr_value":23.9,"tmax_may_value":39.8,"tmin_may_value":26.3,"tmax_jun_value":42.8,"tmin_jun_value":29.8,"tmax_jul_value":44,"tmin_jul_value":31.7,"tmax_aug_value":43.6,"tmin_aug_value":31.3,"tmax_sep_value":42.7,"tmin_sep_value":29.7,"tmax_oct_value":37,"tmin_oct_value":26.1,"tmax_nov_value":31.9,"tmin_nov_value":20.6,"tmax_dec_value":26.7,"tmin_dec_value":17}],"country_data":[{"cityId":659,"countryCode":"AE","infrastructureValue":5,"cpiRentIndex":3,"cpiIndex":3,"groceriesIndex":2,"purchasingPowerIndex":5,"restaurantIndex":3,"rentIndex":3,"safetyIndex":5,"crimeIndex":1,"countryName":"United Arab Emirates","population":9630959,"countrySizeKmSq":71020,"urbanSizeKmSq":8568.2,"ruralSizeKmSq":70575.1,"forestSizeSqKm":3236.6,"flagLink":"https://restcountries.eu/data/are.svg"}]}, {"city_data":[{"cityId":6264,"stationId":"BKM00014654","countryCode":"BA","type":"CITY","cityName":"Sarajevo","regionCode":"BA_BIH","regionName":"Federation of Bosnia and Herzegovina","lat":43.84864,"lon":18.35644,"population":696731,"elevation":"518.0","timezone":"Europe__Sarajevo","culture_hIndex":1,"culture_cIndex":1,"culture_rIndex":2,"culture_aIndex":1,"culture_iIndex":1,"culture_nIndex":1,"formations_mIndex":1,"formations_rIndex":0,"beach_Index":0,"image_links":"https://travelapiimages.s3.eu-central-1.amazonaws.com/6264.jpg"}],"weather_data":[{"cityId":6264,"stationId":"BKM00014654","tmax_jan_value":3.3,"tmin_jan_value":-4.2,"tmax_feb_value":7.3,"tmin_feb_value":-0.4,"tmax_mar_value":13.5,"tmin_mar_value":2.4,"tmax_apr_value":18.5,"tmin_apr_value":6.3,"tmax_may_value":21.4,"tmin_may_value":9.5,"tmax_jun_value":26.6,"tmin_jun_value":14.1,"tmax_jul_value":28.2,"tmin_jul_value":14.8,"tmax_aug_value":29.8,"tmin_aug_value":15.5,"tmax_sep_value":23.5,"tmin_sep_value":10.8,"tmax_oct_value":19.9,"tmin_oct_value":6.7,"tmax_nov_value":11.4,"tmin_nov_value":3.7,"tmax_dec_value":4.6,"tmin_dec_value":-1.3}],"country_data":[{"cityId":6264,"countryCode":"BA","infrastructureValue":2,"cpiRentIndex":2,"cpiIndex":2,"groceriesIndex":2,"purchasingPowerIndex":2,"restaurantIndex":1,"rentIndex":1,"safetyIndex":4,"crimeIndex":3,"countryName":"Bosnia and Herzegovina","population":3323929,"countrySizeKmSq":51200,"urbanSizeKmSq":1723.1,"ruralSizeKmSq":49338.4,"forestSizeSqKm":21850,"flagLink":"https://restcountries.eu/data/bih.svg"}]},{"city_data":[{"cityId":35,"stationId":"MUM00041242","countryCode":"AE","type":"CITY","cityName":"Ras Al Khaimah City","regionCode":"AE_RK","regionName":"Ras al-Khaimah","lat":25.78953,"lon":55.9432,"population":351943,"elevation":"","timezone":"Asia__Dubai","culture_hIndex":1,"culture_cIndex":1,"culture_rIndex":1,"culture_aIndex":1,"culture_iIndex":0,"culture_nIndex":1,"formations_mIndex":1,"formations_rIndex":0,"beach_Index":2,"image_links":"https://travelapiimages.s3.eu-central-1.amazonaws.com/35.jpg"}],"weather_data":[{"cityId":35,"stationId":"MUM00041242","tmax_jan_value":25.7,"tmin_jan_value":16.4,"tmax_feb_value":25.4,"tmin_feb_value":16.6,"tmax_mar_value":28.4,"tmin_mar_value":19.2,"tmax_apr_value":34.2,"tmin_apr_value":23.9,"tmax_may_value":38.7,"tmin_may_value":27.8,"tmax_jun_value":39.9,"tmin_jun_value":30.9,"tmax_jul_value":38.1,"tmin_jul_value":31.3,"tmax_aug_value":37.3,"tmin_aug_value":30.1,"tmax_sep_value":36.7,"tmin_sep_value":27.7,"tmax_oct_value":34.8,"tmin_oct_value":24.5,"tmax_nov_value":29.7,"tmin_nov_value":19.2,"tmax_dec_value":26.7,"tmin_dec_value":16.3}],"country_data":[{"cityId":35,"countryCode":"AE","infrastructureValue":5,"cpiRentIndex":3,"cpiIndex":3,"groceriesIndex":2,"purchasingPowerIndex":5,"restaurantIndex":3,"rentIndex":3,"safetyIndex":5,"crimeIndex":1,"countryName":"United Arab Emirates","population":9630959,"countrySizeKmSq":71020,"urbanSizeKmSq":8568.2,"ruralSizeKmSq":70575.1,"forestSizeSqKm":3236.6,"flagLink":"https://restcountries.eu/data/are.svg"}]}]
const geolib = require('geolib');
json2 = require('./german_postal.json')
const { PerformanceObserver, performance } = require('perf_hooks');

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
return test}


var plz = "71149" 
let ccord = findCoordinates(json2, plz)
let clat = ccord[0]
let clon = ccord[1]

var t0 = performance.now()

myfunction(json, clat, clon, 10000);

var t1 = performance.now()
console.log("Call to filter cities took " + (t1 - t0) + " milliseconds.")




