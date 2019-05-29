const express = require('express');
const forecast = require('./src/forecast');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;





app.get('/',(req,res)=>{
    res.status(400).send({
        status: 400,
        error:'City not entered!'
    });
})
app.get('/:city',(req,res)=>{
   
    const city = req.params.city;

    if(!city){
        return res.send({
            error: 'Please provide an address!'
        });
    }
        forecast(city,(error,result)=>{
           
            if(error){
                return res.send({
                    error: error
                });
            }else {
                return res.send({
                    name: result.cityName,
                    latitude: result.latitude,
                    longitude: result.longitude
                });
            }
        });
    }
    
);


app.listen(port,()=>{
    console.log('Listening on port ',port);
});