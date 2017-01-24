const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'The Weather',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my home page.',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About The Weather',
    currentYear: new Date().getFullYear(),
  });
});

// create a /bad route for bad stuff
  // send back json data with errorMessage()

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.',
  });
});

app.listen(3000, ()=> {
  console.log('The server is up!');
});
