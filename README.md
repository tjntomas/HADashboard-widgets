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
cpu_temp_g:
    widget_type: graph
    entities:
      - sensor.pi3_cpu_temp
      - sensor.cpu_temp_pi2
      - sensor.ubuntu_core_0_temp
      - sensor.ubuntu_core_1_temp
    influxdb_units: 
      - "°C"
      - "°C"
      - "°C"
      - "°C"
    titles:
      - "RPI 3"
      - "VPN"
      - "UBUNTU 0"
      - "UBUNTU 1"
    time: 1h
    samples: 200
    title: "CPU-temperaturer"
    fill: "tozeroy"
    max: 75
    min: 30
    colorIndex: 0
    height: 324



````
