const request = require('request')

const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude)
    const url = 'https://api.darksky.net/forecast/0d9655a876518eaea56ba8b1ae469df1/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast