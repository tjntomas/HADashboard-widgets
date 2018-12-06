# A Vacuum widget for Xiaomi Roborock S50 (Version 2). Might work for other vacuum cleaners also.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/vacuum_widget.png?raw=true)

###Features:
- Click in the middle of the vacuum cleaner to start/pause
- Click on the dock image to return the vacuum cleaner to the dock
- Click on one of the fan icons to set the fan speed
- Some basic info from the entity's attributes are displayed

To use this widget you need to:
- copy the folder /custom_widgets/basevacuum to your /conf/custom_widgets folder
- copy the /custom_widgets/vacuum.yaml to your /conf/custom_widgets folder
- Create an folder named img in your /conf/custom_css folder
- Copy the content of the custom_css/img to your /conf/custom_css/img folder

Make sure you are logged in as the user running appdaemon while copying files and creating the folders or you might have to adjust the file and folder permissions later.

In your dashboard file add:
````yaml
vacuum:
  widget_type: vacuum
  entity: vacuum.your_vaccum_cleaner
  title: My vacuum cleaner

layout:
- vacuum(3x2)
````

You also need to add a few mappings to the skins that you use:
````yaml
vacuum_widget_style: $background_style
vacuum_title_style: $style_title
````

That's basically it.
