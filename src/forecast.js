const request = require('request');


const forecast =  (location,callback)=>{
    console.log(location);
    const url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=rZ9AkPqMfqOoPaBD8Hv3&app_code=oJq3EIMO05cBqRsoHPxBrg&searchtext=${location}
    `;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined);
        }
        else if (body.Response.View.length === 0){
            callback('Not able to give result',undefined);
        }
        else{
            
           
            callback(undefined,{
                cityName: body.Response.View[0].Result[0].Location.Address.Label,
                latitude: body.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
                longitude: body.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude
            });
            
            // console.log(body.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
            // console.log(body.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
            // console.log(body.Response.View[0].Result[0].Location.Address.Label);
    
        }
    });
};


module.exports = forecast;

