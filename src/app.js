const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mike'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page, fuck you',
        name: 'Mike',
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Bloop Help',
        name: 'Mike'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found',
        name: 'Mike',
        errorMessage: "404 situation, check it out."
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send("<p>You must search.<p>")
    } 
    res.send({
        products: [],
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "Fucking idiot, you have to search."
        })
    } else {
        geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: "Some sort of error occurred talking to forecast"
                    })
                }
                res.send({
                    location,
                    latitude,
                    longitude,
                    forecast: forecastData.forecast
                })
            })
        })
    }

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Mike',
        errorMessage: "Jam Jam Error."

    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000, idiot!')
})