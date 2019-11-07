# A Camera Stream widget for HADashboard.

To use this widget, you need to:
1. Copy the basecamerastream folder to your custom_widgets folder. Your custom_widgets folder should be in your Appdaemon conf directory      and need to be created if it does not exist.
2. copy the camerastream.yaml file from the custom_widgets folder to your custom_widgets folder
   After copying the above, your custom_widgets folder should have the following structure:
````yaml
 conf
   custom_widgets
     basecamerastream    # Folder
     camerastream.yaml   # File
````
   
3. Configure a widget:

Example widget configuration in a .dash file:

````yaml
my_camera:
  widget_type: camerastream
  entity: camera.my_camera
  title: My Camera
  base_url: "http://my_home_assistant_ip:my_ha_port"  
  # i.e. "https://my_duck_dns_domain.duckdns.org:8123" or "http://192.168.1.20:8123"
  log: 1  # optional. Will print some logging info in the console for debugging purposes if set to 1.
  
layout:
  - my_camera(4x3)
  ````
  
  The widget just sets the ````src```` of an ````img```` element to:
  ````javascript
  base_url + "/api/camera_proxy_stream/" + name_of_entity + "?token=" + current_camera_token
  ````
  and updates the token when it changes which happens roughly every 5 minutes.
