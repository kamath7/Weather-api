const express = require('express');
const forecast = require('./src/forecast');
const weather = require('./src/weather');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;





app.get('/',(req,res)=>{
    res.status(400).send('Enter /city to get weather for city');
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
                const city = result.cityName;
                weather(result.latitude,result.longitude,(error,result)=>{
                    if(error){
                        return res.send({
                            error:error
                        });
                    }else{
                        return res.send({
                            summary: result.summary,
                            temperature: result.temperature,
                            city
                        });
                    }
                });

                // return res.send({
                //     name: result.cityName,
                //     latitude: result.latitude,
                //     longitude: result.longitude
                // });
            }
        });
    }
    
);


app.listen(port,()=>{
    console.log('Listening on port ',port);
});