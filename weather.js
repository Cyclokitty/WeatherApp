const request = require('request');

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/0f48f14a2478df23f2ea57fa481e7904/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          summary: body.currently.summary,
          tomorrow: body.hourly.summary
        })
      } else {
        console.log(`Unable to fetch weather data.`);
      }
  });

}

module.exports = {
  getWeather
};
