var mongoose = require("../db/mongoose");
var express = require("express");
const request = require('request');
const router = express.Router();
var {
    ObjectID
} = require('mongodb');
const weather = require("../sms-bsiness_Logic/weather");
router.get("/get/temperature/:latitute/:longitute", (req, res) => {
    var latitute = req.params.latitute;
    var longitute = req.params.longitute;
    var userUrl = "https://api.darksky.net/forecast/c6f1302645535a94b1e6e8a2c5450e96/39.9396284,-75.18663959999999";
    var userUrl = "https://api.darksky.net/forecast/c6f1302645535a94b1e6e8a2c5450e96/" + latitute + "," + longitute;
    console.log("UserUrl --------" + userUrl);
    request({
        url: userUrl,
        json: true
    }, (error, response, body) => {
        console.log(response.body);
        if (error) {
            res.send({
                "error": null,
                "errorMessage": "e2132",
                "Exception": null,
                "response": "unable to connect with forecast.io"
            });
        }
        res.send({
            "error": null,
            "errorMessage": null,
            "Exception": null,
            "response": {
                "temperatur": body.currently.temperature,
                "latitude": req.params.latitude,
                "longitute": req.params.longitute,
                "pressure:": body.currently.pressure,
                "apparentTemperature": body.currently.apparentTemperature
            }
        });
    });
    //var responseData = weather.getWeather(latitute, longitute);
    //res.send(responseData);
});
module.exports = router;