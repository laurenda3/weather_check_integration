# Technical Brief: Weather Safety Integration

## The Problem
Field technician safety is the highest priority in industrial operations. Previously, technicians were dispatched to repair sensitive network equipment (cell towers, rooftop antennas) without real-time visibility into hazardous weather conditions. High wind speeds or sudden electrical storms created immediate physical risks, and because weather checks were manual, they were often skipped in the rush to meet Service Level Agreements (SLAs).

## The Solution
I built an **Automatic Safety Check** on the **ServiceNow Zurich release** using **Workflow Studio**. This system automatically checks the weather the moment a maintenance ticket is created. By adding real-time weather info directly to the ticket, I made safety a part of the process instead of just a manual checklist.

---

## Technical Architecture

### Connecting to Weather Data
I set up a custom connection in **Workflow Studio** to get live weather information.
*   **How it works:** I used the site's location to make the weather check accurate. The system automatically pulls the exact coordinates (latitude and longitude) from the ticket's location and uses them to get the hyper-local weather.
*   **Making sure the numbers work:** My biggest challenge was that the weather data came to us as text, which meant the system couldn't do math with it (like checking if the wind was too high). I built a custom script to convert that text into numbers so the system could automatically flag risks.

### Handling Errors
In this type of work, "No Data" is as dangerous as "Bad Data."
*   **Fail-Safe Plan:** I designed the system to handle errors gracefully. If the weather service is down, the system doesn't crash. Instead, it adds a note to the ticket saying "Weather Check Unavailable" so the dispatcher knows they need to check the weather manually.

---

## Key Features
*   **Automated Wind Speed Guardrails:** Automatically flags wind speeds exceeding 10 km/h, preventing unsafe dispatches to elevated equipment sites.
*   **Precision Geography:** Uses location-based coordinates (Lat/Long) to ensure weather data is hyper-local to the incident site.
*   **Environmental Incident Enrichment:** Automatically injects temperature and wind data into the Incident Work Notes, providing dispatchers with immediate context.
*   **Reusable Safety Step:** The "Get Weather" step is built so it can be used in other apps later (like planning maintenance ahead of time when the weather is good).

## How to Review
To evaluate the resiliency and data handling of this integration, please review:
*   **Organized Code:** `scripts/WeatherUtils.js` - See how I handled the data conversion in one organized script.
*   **Integration Logs:** Review the screenshots below to see how the weather check works and how the system makes decisions.

---

## Screenshots

### REST API Configuration
![Weather API Setup](assets/weather_api_setup.png)  
*REST step configuration showing GET endpoint and query parameters*

### JSON Parser Data Mapping
![JSON Parser](assets/json_parser.png)  
*Complex JSON response mapped to ServiceNow data pills for use in Flow Designer logic*

### Flow Conditional Logic
![Flow Logic](assets/network_incident_weather_check_trigger_then.png)  
*If/Then conditional evaluating wind speed > 10 km/h threshold with dynamic work note update*

---

- Error Handling

---
**Developed by Laurenda Landry**  
*10 years experience in Industrial Operations & Compliance*
