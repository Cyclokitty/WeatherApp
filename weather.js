const request = require('request');
const dotenv = require('dotenv').config();

const getWeather = (lat, lng, callback) => {
  let key = process.env.WEATHER_KEY;
  request({
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${key}`,
    json: true,
  }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.main.temp,
          summary: body.weather[0].description,
          main: body.weather[0].main,
          icon: body.weather[0].icon,
          humidity: body.main.humidity,
        });
      } else {
        console.log(`Unable to fetch weather data.`);
      }
  });
};

const celsius = (temp) => {
  return (temp - 273.15).toFixed(1);
};

module.exports = {
  getWeather,
  celsius,
};
