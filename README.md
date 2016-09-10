# GTFS Visualizer

*Data viewer for gtfs*

Library responsible for generating HTML data based on the GTFS format.

## Example
| Before        | After         |
| ------------- |:-------------:|
| ![json-stops](img/readme/json-stops.PNG) | ![stops](img/readme/stops.PNG) |

## Functions
### Agencies
  - **Draw Agency Stop**: Draws a stop on the map, with the position and agency name.

  ```javascript
    Generator.drawAgencyStop(data);
  ```

  - **Draw Agency Popup**: Draws a popup on the stop, with the agency's information.

  ```javascript
    Generator.drawAgencyPopup(data);
  ```

### Routes
  - **Draw Routes**: Generates the HTML code a list of routes.

  ```javascript
    Generator.drawRoutes(data);
  ```

  - **Draw Shapes**: Draws on the map a line between the points of shape.

  ```javascript
    Generator.drawShapes(data);
  ```


![GTFS Visualizer](img/gtfs-v.PNG)
