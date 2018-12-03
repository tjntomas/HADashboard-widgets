
# A Google Maps widget for HADashboard

This is a Google Maps widget for HADashboard.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/googlemapswidget.png?raw=true)

Features:
* Displays the location of one or more tracker entities
* Grabs all defined zones from Home Assistant and draws them with the corresponding radius on the map
* If an entity picture is defined for a device tracker, the image is used, if not, the standard google maps icon is used.
* Zoom and scroll just like any google maps
* If your device tracker moves, the map will update the location

To use the widget, you need to:
1. Copy the basegooglemaps folder to your custom_widgets folder
2. Copy the googlemaps.yaml file to your custom_widgets folder
3. Get a Google Maps API key from here (https://developers.google.com/maps/documentation/javascript/get-api-key). You need to register with credit card to get a Google API key but the free usuage limits are huge.
4. Define a widget:
````yaml
google_map:
  widget_type: googlemaps
  entities:
  - device_tracker.your_device_tracker_entity_id
  - device_tracker.your_other_device_tracker_entity_id
  base_url: your_url_to_home_assistant:and_your_port   #  http://192.168.1.20:8123
  pw: YOUR_HOME_ASSISTANT_API_KEY  # This is used to grab all the defined zones from Home Assistant's REST API.
  api_key: YOUR_GOOGLE_MAPS_API_KEY
  zoom: 16  # Initial zoom level.

layout:
  - google_map(10x7)  # Or whatever size you want for your map.
````

in the skin you ar using, add:
````yaml
googlemaps_widget_style:  "border-radius: 10px; $background_style"
````
That's it!

I will be adding more options to customize the map later. If you want to change the appearance now, you need to edit the mapOptions section of the basegooglemaps.js file and the basegooglemaps.css file.

# A little bit of help regarding the folder structure
this what your folder structure inside you appdaemon conf folder should look like:
````yaml
conf
  custom_widgets  # You need to create this folder if it doesn't exist.
     googlemaps.yaml
     basegooglemaps
       basegooglemaps.js
       basegooglemaps.html
       basegooglemaps.css
 custom_css
   this_is_where_your_custom_skins_folders_should_be
````




