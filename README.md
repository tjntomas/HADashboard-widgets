# HADashboard-widgets
Widgets for HADashboard / Appdaemon

This is a graph widget for HADashboard that uses influxdb as data source.

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/influx_graph.png?raw=true)

To use it, you need to:
1. Copy the basepgraph folder to your custom_widgets folder
2. Copy the graph.yaml file to your custom_widgets folder
3. Copy influxdb-latest.js (found in the custom_css folder) to your custom_css folder
4. Define a widget:
````yaml
# Graph showing the CPU temperatures for 4 devices.
cpu_temp_g:
    widget_type: graph
    entities:   # You can add any munbe of entites to the list.
      - sensor.pi3_cpu_temp
      - sensor.cpu_temp_pi2
      - sensor.ubuntu_core_0_temp
      - sensor.ubuntu_core_1_temp
    influxdb_units: # You need to add the unit_of_measurement from the enity_ids here.
      - "°C"
      - "°C"
      - "°C"
      - "°C"
    titles:   # Specify the title for each trace.
      - "RPI 3"
      - "VPN"
      - "UBUNTU 0"
      - "UBUNTU 1"
    time: 1h  # Specify time for the traces. can be anythign that influxdb accepts, i.e. 2d, 4h, 1w etc.
    samples: 200
    title: "CPU-temperaturer"  # The title for the widget.
    fill: "tozeroy"
    max: 75                    # Set the max y-axis. Leave blank to fit the traces automatically.
    min: 30                    # Set the min y-axis. Leave blank to fit the traces automatically.
    colorIndex: 0              # Set a color index between 0 and 7.
    height: 324                # Speficy the height of the widget. Should be set to amultiple of the widget height.
    
# Graph to show the daily power consumption from Sparsnäs 
att_g:
    widget_type: graph
    entities:
      - sensor.sparsnas_energy_consumption_over_time
    time: 24h
    samples: 200
    title: "Energiförbrukning per dag (kWh)"
    colorIndex: 7
    min: 0
    fill: "tozeroy"
    shape: "hv"
    sql: "select difference(last(value)) from kWh where entity_id = 'sparsnas_energy_consumption_over_time' and time > now() - 2w  group by time(1d)"
    type: "bar"
    decimals: 0



````
