# HADashboard-widgets
Widgets for HADashboard / Appdaemon

This is a graph widget for HADashboard that uses influxdb as data source and plot.ly as the graph engine.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/influx_graph.png?raw=true)
The image shows six different widgets with one or more time series for each widget.

Features:
* Add any number of traces to a graph
* Zoom and scroll
* hide/show individual traces
* Automatically updates when new values are written  to influx/when the entity is updated in Home Assistant
* Can span over any number of columns
* The height can be set for each widget
* Supply your own SLQ query to filter and group data

To use it, you need to:
1. Have influxdb installed and configured in Home Assistant
2. Copy the basepgraph folder to your custom_widgets folder
3. Copy the graph.yaml file to your custom_widgets folder
4. Copy influxdb-latest.js (found in the custom_css folder) to your custom_css folder or download from plot.ly
5. Add the following to your variables.yaml file in your custom_css folder for the skin you are using:
````yaml
graph_style: "border-radius: 0px; "background-color: rgba(30,30,30,0.45 );"  # Change to whichever color/opacity you like.
graph_legend_text_color: "#888888"
graph_grid_color: "#888"
graph_influxdb_path: http:<URL_TO_YOUR_INFLUXDB_SERVER>:8086 # Example: 192.168.1.20:8086  or http://www.mydomain.com:8086
graph_widget_style: "border-bottom-left-radius: 10px;border-bottom-right-radius: §;border-top-left-radius: 10px;border-top-right-radius: 10px;"
graph_trace_colors: "1"  # Set the opacity for the trace colors.
graph_fill_colors: "1"   # Set the opacity for the fill colors.
graph_bar_colors: "1"    # Set the opacity for the bar colors.
graph_bar_multi: "1"     # Leave this as is.
````
6. Define a widget:
````yaml
# Graph showing the CPU temperatures for 4 devices.
cpu_temp_g:
    widget_type: graph
    entities:   # You can add any number of entites to the list.
      - sensor.pi3_cpu_temp
      - sensor.cpu_temp_pi2
      - sensor.ubuntu_core_0_temp
      - sensor.ubuntu_core_1_temp
    influxdb_units: # You need to add the unit_of_measurement for the entity_id's here. 
      - "°C"
      - "°C"
      - "°C"
      - "°C"
    titles:   # Specify the title for each trace. 
      - "RPI 3"
      - "VPN"
      - "UBUNTU 0"
      - "UBUNTU 1"
    time: 1h  # Specify time for the traces. can be anything that influxdb accepts, i.e. 20m, 2d, 4h, 1w etc.
    samples: 200  # Optional. Used to speed up drawing. If your widget is 200 pixels wide, use 200.
    title: "CPU-temperaturer"  # The title for the widget.
    fill: "tozeroy"
    max: 75                    # Set the max y-axis. Leave blank to fit the traces automatically.
    min: 30                    # Set the min y-axis. Leave blank to fit the traces automatically.
    colorIndex: 0              # Set a color index between 0 and 7.
    height: 324                # Specify the height of the widget in pixels. 
    
# Graph to show the daily power consumption from a Sparsnäs device.
# In this widget, we do specifoy the SQL query explicitly instead of just grabbing the trace from influxdb.
# In this way, we can use all features of the SQL query language that influxdb supports.
power_usage_per_day:
    widget_type: graph
    entities:
      - sensor.sparsnas_energy_consumption_over_time
    time: 24h
    samples: 200
    title: "Energiförbrukning per dag (kWh)"
    colorIndex: 7
    min: 0
    fill: "tozeroy"  # You can find more fill options at plot.ly 
    shape: "hv"      # You can find more shape options at plot.ly 
    sql: "select difference(last(value)) from kWh where entity_id = 'sparsnas_energy_consumption_over_time' and time > now() - 2w  group by time(1d)"
    type: "bar"
    decimals: 0

````
Additional parameters:
    time_zone: "Europe/Stockholm" # This is the default.
    locale: "se"                  # This is the default.
    db_name: "home_assistant"     # You only need to add this parameter is your database name is different from the default name.
    
7. Add the widget to your dashboard.yaml file

