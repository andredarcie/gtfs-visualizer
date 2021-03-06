# GTFS Visualizer

*Data viewer for gtfs* [![CodeClimate](https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer/badges/gpa.svg)]
(https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer) [![IssueCount](https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer/badges/issue_count.svg)](https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer)

:bus: Library responsible for generating HTML data based on the GTFS format. Depends on [this](https://github.com/andredarcie/node-gtfs-api) API.

## GTFS Overview

  The General Transit Feed Specification (GTFS), also known as GTFS static or static transit to differentiate it from the GTFS realtime extension, defines a common format for public transportation schedules and associated geographic information. GTFS "feeds" let public transit agencies publish their transit data and developers write applications that consume that data in an interoperable way. *(from google developers)*

  Read more about [here](https://developers.google.com/transit/gtfs/).

## Getting started

  Clone from github:

    git clone git@github.com:andredarcie/gtfs-visualizer.git

    cd gtfs-visualizer

  Start the database with agency's data:

    mongod

  Start the [node gtfs api](https://github.com/andredarcie/node-gtfs-api):

    node index.js

  Configure the `js/settings.js` file

  Open the index.html in your browser

  (Optional) Gulp task runner

    npm install

    // Run gulp:
    gulp

    // To run individual tasks:
    gulp <task> <othertask>

  This example depends on [Bootstrap](http://getbootstrap.com/), [jQuery](http://jquery.com/),
  [Leaflet](http://leafletjs.com/), [typeahead](https://twitter.github.io/typeahead.js/) and [Gulp](http://gulpjs.com/).

## Library Functions
### Agencies
  - **Draw Agency Stop**: Draws a stop on the map, with the position and agency name.

  ```javascript
    Generator.drawAgencyStop(data);
  ```
  ![Agency Stop](img/readme/functions/agency-stop.PNG)

  - **Draw Agency Popup**: Draws a popup on the stop, with the agency's information.

  ```javascript
    Generator.drawAgencyPopup(data);
  ```
  ![Agency Popup](img/readme/functions/agency-popup.PNG)

### Routes
  - **Draw Routes List**: Generates the HTML code a list of routes.

  ```javascript
    Generator.drawRoutesList(data);
  ```
  ![Routes List](img/readme/functions/routes-list.PNG)

  - **Draw Shapes**: Draws on the map a line between the points of shape.

  ```javascript
    Generator.drawShapes(data);
  ```
  ![Shapes](img/readme/functions/shapes.PNG)  

  - **Draw Stops**: Draws on the map all the stops in a route.

  ```javascript
    Generator.drawStops(data);
  ```
  ![Shapes](img/readme/functions/stops.PNG)   

  - **Draw Stops Popup**: Draws a popup on the stop, with the stop information.

  ```javascript
    Generator.drawStopsPopup(stop_id,stop_name,stops_desc);
  ```
  ![Shapes](img/readme/functions/stop-popup.PNG)

### Plan a Trip
  - **Draw Stops Near**: Draw the stops near of other stop.

  ```javascript
    Generator.drawStopsNear(data);
  ```

## Result
![GTFS Visualizer](img/readme/gtfs-v.PNG)

## License
The gtfs-visualizer is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
