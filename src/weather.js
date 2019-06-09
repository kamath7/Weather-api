const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const forecast = (latitude,longitude,callback)=>{
    const url = `https://api.darksky.net/forecast/${process.env.WEATHER_ID}/${latitude},${longitude}`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Error connecting',undefined);
        }else if(body.error){
            callback("Location not found",undefined);
        }else{
            callback(undefined,{
                temperature: body.currently.temperature,
                summary: body.currently.summary

            });
        }
    });
};


module.exports=forecast;