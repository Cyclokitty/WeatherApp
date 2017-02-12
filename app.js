const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const geocode = require('./geocode');
const weather = require('./weather');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));

// app.use to register Express middleware
// next is used to tell Express when the middleware is done
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
  });
});

app.post('/', (req, res) => {
  const city = req.body.city;
  geocode.geocodeAddress(city, (err, results) => {
    if (err) {
      res.send('OOps error');
    } else {
      weather.getWeather(results.latitude, results.longitude, (err, weatherResults) => {
        if (err) {
          console.log(err);
        } else {
          console.log(weatherResults);
          res.render('weather.hbs', {
            pageTitle: `Weather Results`,
            lat: `${results.latitude}`,
            lon: `${results.longitude}`,
            city: `${city}`,
            icon: 'http://openweathermap.org/img/w/' + weatherResults.icon + '.png',
            temp: `${weather.celsius(weatherResults.temperature)}`,
            summary: `${weatherResults.summary}`,
            main: `${weatherResults.main}`,
            humidity: `${weatherResults.humidity}`,
          });
        }
      });
  }
    // `The lat is: ${results.latitude} and the long is ${results.longitude}`);
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
  });
});

// create a /bad route for bad stuff
  // send back json data with errorMessage()

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.',
  });
});

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}.`);
});
