
# A Docker control widget for HADashboard and Appdaemon Version 4

![HADashboard-widgets](https://github.com/tjntomas/HADashboard-widgets/blob/master/img/docker_widget.jpg?raw=true)

## Features
* Start, stop or restart docker containers
* Shows the uptime and current status of the containers
* Creates docker entities in Home Assistant for each discovered container
* Can handle multiple docker hosts, i.e. docker containers running on multiple machines on your local network.
* The controls blinks when status is changing, i.e. during restart, start or stop of a container
* Use the docker entities in your Home Assistant Lovelace UI if you like
* Trigger automations when a container starts or stops or reaches a certain uptime duration etc.

## How it works
An Appdaemon app is grabbing all containers on a host through the docker API and creates docker entities in Home Assistant
The app adds 3 Appdaemon internal service calls which is called by the widget when one of the control icons is pressed:
* docker/start
* docker/stop
* docker/restart

### Prerequisites

* You need to have Appdaemon 4 installed and working
* You need to enable the remote API for dockerd. See instructions here: https://success.docker.com/article/how-do-i-enable-the-remote-api-for-dockerd. (Activating the dockerd API is also useful if you are using portainer since you can then control multiple machines running docker through portainer)

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
    ip_or_host_name_of_another_machine_running_docker:2376
    
  # PLEASE NOTE THAT THE ABOVE HOSTS KEY IS NOT A YAML LIST, I.E. NO INITIAL DASH.
````

Now, you should see entities created in Home Asssistant with the domain "docker", for instance docker.home_assistant with the following attributes:
````yaml
	uptime: About an hour
  image: acockburn/appdaemon:4.0.1
  host: ub2
  id: b8f60c5846cc4166c421742aca6d5c520d04cb8bea892720fe42b89fefe33e37
  state: Running
  container: appdaemon
  ````
  
  ### Install the docker widget
  * Copy the docker.yaml file and the basedocker folder from here https://github.com/tjntomas/HADashboard-widgets/tree/master/custom_widgets to your custom_widget folder inside your Appdaemon config folder.
  * add the following to your custom_css variables.yaml file:
  ````yaml:
  docker_title_style: $style_title
  docker_widget_style: $background_style
  ````
  
  ### Add a widget
  
  Add the following to your .dash file:
  
  ````yaml
  ha:
    widget_type: docker
    entity: docker.home_assistant
    title: Home Assistant
  ````
  and add ha(2x2) to the display sections in the .dash file:
  ````yaml
  layout:
  - ha(2x2)
  
  ````

### Done!

If you want, you can change the Uptime, Host and State text to your own language by adding the corresponding keys to the widget definition:
  ````yaml
  ha:
    widget_type: docker
    entity: docker.home_assistant
    title: Home Assistant
    uptime: Gångtid
    state: Status
    host: Värd
  ````

