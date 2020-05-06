module.exports = app => {
    const region = require('../../../../travelapi_expressjs/app/controller/region_controller.js');

    // Find all regions 
    app.get("/api/v1/regions", region.findAllRegions);

    //Find details for one region by regionCode or regionName
    app.get("/api/v1/regions/name/:regionName", region.findRegionDetails);

    //Find all cities in region by regionCode or regionName
    app.get("/api/v1/regions/:region/:cities", region.findCitiesInRegion);

}