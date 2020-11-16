import appdaemon.plugins.hass.hassapi as hass
from requests import get
from requests import post
import json
import datetime

""" App to manage docker containers. 
    The app extracts data from the docker API and creates sensors
    and services in HA and Appdaemon to monitor and manage 
    docker containers.
"""

class Docker(hass.Hass):
    URL_TEMPLATE            = "http://{}:2376/containers/{}/{}?t=0"
    SVC_DOCKER_START        = "docker/start"
    SVC_DOCKER_STOP         = "docker/stop"
    SVC_DOCKER_RESTART      = "docker/restart" 
    EVNT_DOCKER_START       = "docker_start"
    EVNT_DOCKER_STOP        = "docker_stop"
    EVNT_DOCKER_RESTART     = "docker_restart"
    DOCKER_SIGNAL_SENSOR    = "sensor.docker_signal"
    SERVICE_MAP             = {EVNT_DOCKER_START, "start", EVNT_DOCKER_STOP, "stop", EVNT_DOCKER_RESTART, "restart"}

    def initialize(self):  
        self.register_service(self.SVC_DOCKER_START, self.docker_manage)
        self.register_service(self.SVC_DOCKER_STOP, self.docker_manage)
        self.register_service(self.SVC_DOCKER_RESTART, self.docker_manage)
        self.listen_event(self.docker_events, self.EVNT_DOCKER_START)
        self.listen_event(self.docker_events, self.EVNT_DOCKER_STOP)
        self.listen_event(self.docker_events, self.EVNT_DOCKER_RESTART)
        self.set_state(self.DOCKER_SIGNAL_SENSOR, state="none")
        self.listen_state(self.docker_signal, self.DOCKER_SIGNAL_SENSOR)
        runtime = datetime.time(0, 0, 0)
        self.run_minutely(self.get_containers, runtime)

    async def docker_signal(self, entity, attribute, old, new, kwargs):
        entity_id = await self.get_state(self.DOCKER_SIGNAL_SENSOR, attribute="entity_id")
        service = await self.get_state(self.DOCKER_SIGNAL_SENSOR, attribute="service")
        self.log("Logging")
        self.log(entity_id) 
        self.log(service)
        if service != "":
            await self.docker_events("docker_" + service,{"entity_id": entity_id}, "")

    async def docker_events(self, event_name, data, kwargs):
        self.log(data)
        if 'entity_id' in data:
            c_id = await self.get_state(data['entity_id'], attribute='id')
            host = await self.get_state(data['entity_id'], attribute='host')
            url = self.URL_TEMPLATE.format(host, c_id, self.SERVICE_MAP[event_name])           
            post(url=url)
            await self.sleep(1)
            self.get_containers("")

    async def docker_manage(self, plugin, domain, service, data):
        self.log(domain)
        self.log(service)

        container   = await self.get_state(data['entity_id'], attribute='container')
        host        = await self.get_state(data['entity_id'], attribute='host')
        c_id        = await self.get_state(data['entity_id'], attribute='id')

        self.log(service + ": " + container)

        self.URL_TEMPLATE.format(host, c_id, service)
        self.log(url)
        p = post(url=url)
        self.log("Action done")
        await self.sleep(1)
        self.get_containers("") 

    def get_containers(self, kwargs):
        QUERY           = 'v1.24/containers/json?all=1'
        STATE           = 'State'
        NAMES           = 'Names'
        RUNNING         = 'running'
        STATE_ON        = 'on'
        STATE_OFF       = 'off'
        IMAGE           = 'Image'
        HOSTS           = 'hosts'
        ATTR_UPTIME     = 'uptime'
        ATTR_IMAGE      = 'image'
        ATTR_HOST       = 'host'
        ATTR_STATE      = 'state'
        ATTR_CONTAINER  = 'container'
        ATTR_TIMESTAMP  = 'last_updated'
        ATTR_ICON       = 'icon'
        ATTR_ID         = 'id'
        DOCKER_DOMAIN   = 'docker.'
        ERR_RESPONSE    = "response error"
        ERR_JSON        = "json error"
        DOCKER_ICON     = 'mdi:docker'
        URL_TEMPLATE    = "http://{}:{}/{}"

        names = []
        for item  in self.args[HOSTS]:
            url = URL_TEMPLATE.format(item, self.args[HOSTS][item], QUERY)
            try:
                response = get(url)
            except:
                self.log(ERR_RESPONSE)
            else:
                try:
                    js = json.loads(response.text)
                except:
                    self.log(ERR_JSON)
                else:
                    for entry in js:
                        args = {}
                        name = str(entry[NAMES]).replace("/", "").replace("'", "").replace("[", "").replace("]","").replace("-", "_").replace(" ", "").replace(",","").lower()
                        self.log(str(name))
                        org_name =  name
                        cnt = 1
                        n = name
                        while n in names:
                            n = name + "_" + str(cnt)
                            cnt = cnt + 1
                        names.append(n)
                        name = n
                        state = entry[STATE]
                        if state == RUNNING:
                            state = STATE_ON
                        else:
                            state = STATE_OFF
                        image = entry[IMAGE]
                        status = str(entry['Status']).replace("Up ", "").replace("Exited (137)", "Stopped ")
                        args[ATTR_UPTIME] = status
                        args[ATTR_IMAGE] = image
                        args[ATTR_HOST] = item
                        args[ATTR_ID] = entry['Id']
                        args[ATTR_STATE] = str(entry[STATE]).replace("exited", "Stopped").replace("running","Running")
                        args[ATTR_CONTAINER] = org_name
                        args[ATTR_TIMESTAMP] = str(datetime.datetime.now())
                        args[ATTR_ICON] = DOCKER_ICON
                        self.set_state(DOCKER_DOMAIN + name, state=state, attributes=args)
       
