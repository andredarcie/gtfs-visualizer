# GTFS Visualizer

*Data viewer for gtfs* [![CodeClimate](https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer/badges/gpa.svg)]
(https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer) [![IssueCount](https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer/badges/issue_count.svg)](https://codeclimate.com/github/AndreNDarcie/gtfs-visualizer)

:bus: Library responsible for generating HTML data based on the GTFS format.

## GTFS Overview

  The General Transit Feed Specification (GTFS), also known as GTFS static or static transit to differentiate it from the GTFS realtime extension, defines a common format for public transportation schedules and associated geographic information. GTFS "feeds" let public transit agencies publish their transit data and developers write applications that consume that data in an interoperable way. *(from google developers)*

  Read more about [here](https://developers.google.com/transit/gtfs/).

## Getting started

  Include the following javascript in your html
  ```html
  <script src="js/icons.js"></script>
  <script src="js/generator.js"></script>
  <script src="js/get-api.js"></script>
  ```
  *under construction*

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

## Result of use
![GTFS Visualizer](img/readme/gtfs-v.PNG)
