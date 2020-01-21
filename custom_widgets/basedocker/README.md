
# A Docker control widget for HADashboard and Appdaemon Version 4

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/docker_widget.jpg?raw=true)

## Features
* Start, stop or restart a docker container
* Shows the uptime and current status of the container
* Creates docker entities in Home Assistant for each discovered container
* Can handle multiple docker hosts, i.e. docker container running on more than one server

## How it works
An Appdaemon app is grabbing all containers on a host through the docker API ans creates docker entities in Home Assistant
The app adds 3 Appdaemon service calls:
* docker/start
* docker/stop
* docker/restart

## How to set it up

You need to have Appdaemon 4 installed and working

### Install the Appdaemon app
