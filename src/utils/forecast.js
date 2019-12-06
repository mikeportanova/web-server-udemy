const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f355243a483c7b830d666d54037f843d/${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error)
        } else if (body.error) {
            callback(body.error)
        } else {
            data = {
                latitude,
                longitude,
                forecast: `${body.currently.summary}. It is currently ${body.currently.temperature} degrees out. 
                There is a ${body.currently.precipProbability}% chance of rain.`

            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast