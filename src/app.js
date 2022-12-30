const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Carl John Cruz'
    })
})

app.get('/about', (re, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Carl John Cruz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Carl John Cruz'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Carl John Cruz',
        errorMessage: 'Help article not found.'
    })
})

//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})