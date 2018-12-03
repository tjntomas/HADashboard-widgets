
# A Google Maps widget for HADashboard

This is a Google Maps widget for HADashboard.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/googlemapswidget.png?raw=true)

Features:
* Displays the location of one or more tracker entities
* Grabs all defined zones from Home Assistant and draws them with the corresponding radius on the map
* If an entity picture is edfined for a device tracker, the image is used, if not, the standard google maps icon is used.

To use the widget, you need to:
1. Copy the basegooglemaps folder to your custom_widget folder
2. Copy the googlemaps.yaml file to your custom_css folder
3. Get a Google Maps API key from here (https://developers.google.com/maps/documentation/javascript/get-api-key)
4. Define a widget:
````yaml
google_map:
  widget_type: googlemaps
  entities:
  - device_tracker.you_tracker_entity_id
  - device_tracker.your_other_tracker_entity_id
  base_url: your_url_to_home_assistant:and_your_port   #  http://192.168.1.20:8123
  pw: YOUR_HOME_ASSISTANT_API_KEY
  api_key: YOUR_GOOGLE_MAPS_API_KEY
  zoom: 16  # Initial zoom level.

layout:
  - google_map(12x8)
````

That's it!



