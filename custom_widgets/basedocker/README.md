
# A Docker control widget for HADashboard and Appdaemon Version 4

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/docker_widget.jpg?raw=true)

## Features
* Start, stop or restart docker containers
* Shows the uptime and current status of the containers
* Creates docker entities in Home Assistant for each discovered container
* Can handle multiple docker hosts, i.e. docker container running on more than one server

## How it works
An Appdaemon app is grabbing all containers on a host through the docker API and creates docker entities in Home Assistant
The app adds 3 Appdaemon service calls:
* docker/start
* docker/stop
* docker/restart

### Prerequisites

* You need to have Appdaemon 4 installed and working
* You need to enable the remote API for dockerd. See instructions here: https://success.docker.com/article/how-do-i-enable-the-remote-api-for-dockerd

## How to set it up

### Install the Appdaemon app

Copy the dock.py file from https://github.com/tjntomas/HADashboard-widgets/tree/master/apps to your apps folder in your Appdaemon config folder.

Add the following to your apps.yaml file:
````yaml
docker:
  module: dock
  class: Docker
  hosts:
    ip_or_host_name_of_machine_running_docker:2376  # For example 192.168.1.20:2376. 2376 is the defaul api port used by docker.
    ip_or_host_name_of_another_machine_running_docker:2376:
  # PLEASE NOTE THAT THE ABOVE HOST KEY IS NOT A YAML LIST, I.E. NO INITIAL DASH.
````

