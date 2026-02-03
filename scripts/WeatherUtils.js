var WeatherUtils = Class.create();
WeatherUtils.prototype = {
    initialize: function () { },

    /**
     * Parses the weather API response and handles data type conversion.
     * 
     * @param {string} responseBody - The raw JSON string from the weather API.
     * @return {Object} An object containing wind_speed, temperature, and success status.
     * 
     * Why: I moved this logic into one organized script to keep 
     * the integration simple. This handles the important part 
     * of converting text into numbers so our rules can use 
     * math to check the weather conditions.
     */
    parseWeatherResponse: function (responseBody) {
        var results = {
            wind_speed: 0,
            temperature: 0,
            success: false,
            error: ""
        };

        try {
            var parsed = JSON.parse(responseBody);

            if (parsed && parsed.current_weather) {
                // Force conversion to decimal for math logic support
                results.wind_speed = parseFloat(parsed.current_weather.windspeed);
                results.temperature = parseFloat(parsed.current_weather.temperature);
                results.success = true;
            } else {
                results.error = "API responded but 'current_weather' data was missing.";
            }
        } catch (e) {
            results.error = "Failed to parse JSON: " + e.message;
        }

        return results;
    },

    type: 'WeatherUtils'
};
