const request = require("request");
var getWeather = (latitute, longitute) => {
    var userUrl = "https://api.darksky.net/forecast/c6f1302645535a94b1e6e8a2c5450e96/" + latitute + "," + longitute;
    var responseData;
    request({
        url: userUrl,
        json: true
    }, (error, response, body) => {

        if (error) {
            responseData = {
                "error": null,
                "errorMessage": null,
                "errorCode": 2201,
                "response": "unable to connected with forecase.io"
            };
            return responseData;
        } else if (response.statusCode == 400) {
            responseData = {
                "error": null,
                "errorMessage": null,
                "errorCode": 2201,
                "response": "Unable to fetch Weather"
            };
            return responseData;
        } else if (response.statusCode == 200) {
            responseData = {
                "error": null,
                "errorMessage": null,
                "errorCode": 2201,
                "response": body.currently.temperature
            };
            return responseData;
        } else {
            return "unable to find temperature";
        }
    });

};
module.exports.getWeather = getWeather;