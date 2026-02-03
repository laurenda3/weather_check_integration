/**
 * @WorkflowAction: JSON Response Parser
 * 
 * Why: During engineering, I identified a critical data type mismatch 
 * where JSON values were arriving as Strings. I implemented explicit 
 * data type casting to Decimal to unlock mathematical comparison 
 * operators in Flow Designer.
 */
(function (outputs, steps, params) {
    var body = steps.rest_step.response_body;
    var parsed = JSON.parse(body);

    // Safety check: Validate API returned current weather object
    if (parsed && parsed.current_weather) {
        // Explicit cast to Decimal for 'Greater Than' logic support
        outputs.wind_speed = parseFloat(parsed.current_weather.windspeed);
        outputs.temperature = parseFloat(parsed.current_weather.temperature);
        outputs.success = true;
    } else {
        outputs.success = false;
        outputs.error_message = "API responded but current_weather block was missing.";
    }
})(outputs, steps, params);
