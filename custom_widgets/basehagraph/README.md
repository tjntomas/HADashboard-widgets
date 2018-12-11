# Ag raph widget for HADashboard

This is a graph widget for HADashboard that uses plot.ly as the graph engine.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/hagraph_widget.png?raw=true)
The image shows six different widgets with one or more time series for each widget.

Features:
* Add any number of traces to a graph
* Zoom and scroll
* hide/show individual traces
* Automatically updates when the entity is updated in Home Assistant
* Can span over any number of columns
* The height can be set for each widget
* Adjust most of the colors for text, x-axis, y-axis and legends etc.
* Hide/show the value for each trace next to the legend

To use it, you need to:
1. Copy the basehagraph folder to your custom_widgets folder
2. Copy the hagraph.yaml file to your custom_widgets folder
3. Copy plotly-latest.min.js (from the custom_css folder)  to your custom_css folder
4. Add the following to your variables.yaml file in your custom_css folder for the skin you are using:
````yaml
graph_style: "border-radius: 0px; background-color: rgba(30,30,30,0.45 );"  # Change to whichever css you like.
graph_legend_text_color: "#888888"
graph_grid_color: "#888"
graph_title_color: "#cccccc"
graph_x_axis_text_color: "#cccccc"
graph_y_axis_legend_color: "#cccccc"
graph_y_axis_text_color: "#cccccc"
graph_widget_style: "border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;border-top-right-radius: 10px;"
graph_trace_colors: "1"  # Set the opacity for the trace colors.
graph_fill_colors: "1"   # Set the opacity for the fill colors.
graph_bar_colors: "1"    # Set the opacity for the bar colors.
graph_bar_multi: "1"     # Leave this as is
graph_degrees_celsius_text: "Degrees Celsius"  # Adjust to your own language
graph_degrees_fahrenheit_text: "Degrees Fahrenheit"  # Adjust to your own language
graph_percent_text: "Percent"  # Adjust to your own language
hagraph_path: http://url_to_your_home_assistant_instance:8123  # Adjust the port if needed.
hagraph_token: YUOR_LONG_LIVED_ACCESS_TOKEN
````
5. Define a widget:
````yaml
# Example of the most simple widget definition showing a single entity:
mvp:
    widget_type:hagraph
    entities:
      - sensor.indoor_temperature  # The entity_id to be plotted.
    units:  °C"   # The unit_of_measurement for your sensors/entities
    titles:
      - "Indoor temperature" # Title of the trace.
    time: 24h   # Time interval to plot. you can combine w,h, d, and m as 2w1d3h20m (This would be 2 weeks, 1 day, 3 hours and 20 minutes)
    title: "Temperatures"  # Widget title
    fill: "tozeroy" # options are  "none" | "tozeroy" | "tozerox" | "tonexty" | "tonextx" | "toself" 
    colorIndex: 0   # A number between 0 and 11. 12 colors for the traces are predefined and the colorIndex defines 
    # which is used for the first trace. If more than 12 traces/entities are specified, the colors are rotated. 
````

### A more complex graph showing 4 CPU temperatures
This is the bottom left widget in the image above.
````yaml
cpu_temp_g:
    widget_type: graph
    entities:   # You can add any number of entities to the list.
      - sensor.pi3_cpu_temp
      - sensor.cpu_temp_pi2
      - sensor.ubuntu_core_0_temp
      - sensor.ubuntu_core_1_temp
    units: "°C"
    titles:   # Specify the title for each trace. 
      - "RPI 3"
      - "VPN"
      - "UBUNTU 0"
      - "UBUNTU 1"
    time: 1h  # Specify time interval for the traces.
    title: "CPU temperatures"  # The title for the widget.
    fill: "tozeroy"   # options are  "none" | "tozeroy" | "tozerox" | "tonexty" | "tonextx" | "toself" 
    max: 75                    # Optional. Set the max y-axis. Remove to fit the traces automatically.
    min: 30                    # Optional. Set the min y-axis. Remove to fit the traces automatically.
    colorIndex: 0              # A number between 0 and 11.
    height: 324                # Optional. Specify the height of the widget in pixels. Default is 215 pixels. 
````
6. Add the widget to your dashboard.yaml file. 

## Interacting with the graph
The graph library used in the widget is plotly, www.plot.ly, and there are a number of ways to interact with the graph. Zooming in to an area in the plot by marking an area in the same way as you would do to crop an image or zooming into a time interval, expanding the x and y axis, scrolling through time etc. Please visit www.plot.ly to find out more.
