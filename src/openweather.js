const request = require('request');


const openweathermap = (address, callback) => {

 //   if(!address){
 //       console.log('Input Location')

   // }else 
    if(address){
        
            const url ='http://api.openweathermap.org/data/2.5/weather?q=' + address + '&units=metric&appid=e65f10ef85d0e8415089f10f454a1a74'
            
            request({url, json: true}, (error, response) => {
               // console.log(response.body.main);
               if(error){
                    callback('Unable To Connect To Weather Service' , undefined)
               }else if (response.body.message){
                   callback('Unable To Get Data For That Location. Try Again With A Nearby Location' , undefined)
               }else{
                    const responseBody = response.body
                    callback(undefined, `${responseBody.name} in the country of ${responseBody.sys.country}, With temperature of ${responseBody.main.temp}°c which feels-like ${responseBody.main['feels_like']}°c , also ${responseBody.weather[0].description}, with pressure of ${responseBody.main.pressure}hPa , humidity of ${responseBody.main.humidity}%  and ${responseBody.rain['1h']}% precipitation within an hour`)      
               }
                   
               
            })

    }

}

module.exports = openweathermap