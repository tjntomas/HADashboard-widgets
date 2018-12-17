### A color picker / slider for HADashboard
![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/color_picker1.png?raw=true)

Features:

* Pops up a color wheel when the small colored button on the top right of the widget is clicked
* Control the brightness with the slider

To use it you need to:
1. Copy the folder baseswipe_light to your custom_widgets folder
2. Copy the file swipe_light.yaml to your custom_widgets folder
3. Add the following to the variables.yaml file of the skin you are using:
````yaml
swipe_light_title_style: $style_title
swipe_light_title2_style: $style_title2
swipe_light_widget_style: $background_style
swipe_light_level_style: "font-size: 15px;"
swipe_light_unit_style: "font-size: 10px;"
swipe_light_button_style: ""
swipe_light_slider_style: "background: rgba(100,100,100,0.5)"
swipe_light_icon_on: mdi-lightbulb
swipe_light_icon_off: mdi-lightbulb
swipe_light_icon_style_active: "font-size: 250%!important; $style_active"
swipe_light_icon_style_inactive: "font-size: 250%!important; $style_inactive"
````
4. Define a widget:
````yaml
my_light:
    widget_type: swipe_light
    entity: light.tv_lights
    title: "TV LED-strip"
 ````
 
 That's it!
 
 
