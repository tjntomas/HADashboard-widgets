
# A Google Maps widget for HADashboard

This is a Google Maps widget for HADashboard.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/googlemapwidgets2.png?raw=true)

## Features
* Displays the location of one or more tracker entities
* Grabs all defined zones from Home Assistant and draws them with the corresponding radius on the map
* Make "Tracker Icons" for each provided device tracker entity that can be selected as the "active" tracker
* Display distance from home and name of nearest zone for the active tracker
* If an entity picture is defined for a device tracker, the image is used, if not, the standard google maps icon is used.
* Zoom and scroll just like any google maps
* If your device tracker moves, the map will update the location

### To use the widget, you need to:
1. Copy the basegooglemaps folder to your custom_widgets folder
2. Copy the googlemaps.yaml file to your custom_widgets folder
3. Copy the custom_css/googlemaps folder to your custom_css folder
4. Get a Google Maps API key from here (https://developers.google.com/maps/documentation/javascript/get-api-key). You need to register with a credit card to get a Google API key but the free usuage limits are huge and I have never exceeded the free usage limits even though I "hammer" the API quite a lot.
5. Define a widget:
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
  latitude: xx.105331  # Your home coordinates are used to calculate the distance from home.
  longitude: xx.045402
  template: default   # You can chose other styles or make your own, see the styling section below.
                      # Some sample styles: topeco | dark | vintage | retro

layout:
  - google_map(10x7)  # Or whatever size you want for your map.
````

in the skin you are using, add:
````yaml
googlemaps_widget_style:  "border-radius: 10px; $background_style"
````
That's it!

I will be adding more options to customize the map later. If you want to change the appearance now, you need to edit the mapOptions section of the basegooglemaps.js file and the basegooglemaps.css file.

## A little bit of help regarding the folder structure
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
   googlemaps
     styles.js
     tracker.png
````
  
 ## Controls
 All the normal Google Maps controls are available, including Street View.
 
 ![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/googlestreetview.png?raw=true?raw=true)



## Style examples from [Snazzy Maps](http://snazzymaps.com)

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/dark_map_style.png?raw=true)
To apply this style:
````yaml
  template: dark
  ````

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/topaco_map_style.png?raw=true)
To apply this style:
````yaml
  template: topaco
  ````
  
## Styling
The style for the maps are located in the custom_css folder in the file styles.js.
You can copy a style from snazzymaps.com by clicking on a map that you like and then click on "expand code" at the bottom left of the map page and then copy the resulting JAVASCRIPT STYLE ARRAY, including the outer [] brackets. In the Styles function in the styles.js file, add:
````
self.styles['name_of_your_style'] = PASTE_THE_JAVASCRIPT_STYLE_ARRAY_HERE
````
and save the file. 

it should look somehing like this, but longer:
````javascript
self.styles['topaco'] = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        }]
````
Then edit your widget file and change the line
````yaml
  template: NAME_OF_YOUR_STYLE
  ````
  
I will add the options to store styles in a more convenient way in separarate yaml files later.

## Development
### Time travel
I have written a time travel feature that makes the map travel through time. I am currently adding some interpolations to smooth over gaps in the tracker data. Once testing is completed, this feature will be added. If you feel like testing it, send me a message and I will create a test branch.

### Easy configuration
I am considering adding a feature to read all device trackers from Home Assistant, thus, no need to manually add the trackers to the widget definition.
### Customization
I will expose most of the styling features so that styling can be done through the skins.
