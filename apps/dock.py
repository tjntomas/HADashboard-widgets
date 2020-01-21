import appdaemon.plugins.hass.hassapi as hass
from requests import get
from requests import post
import sensor as ha
import json
import datetime
# App to perform action based on events

class Docker(hass.Hass):
# listen for state change 
    def initialize(self):
        self.register_service("docker/start", self.docker_manage)
        self.register_service("docker/stop", self.docker_manage)
        self.register_service("docker/restart", self.docker_manage)
        runtime = datetime.time(0, 0, 0)
        self.run_minutely(self.get_containers, runtime)

    async def docker_manage(self, plugin, domain, service, data):
        self.log(domain)
        self.log(service)
        container   = await self.get_state(data['entity_id'], attribute='container')
        host        = await self.get_state(data['entity_id'], attribute='host')
        c_id        = await self.get_state(data['entity_id'], attribute='id')

        self.log(service + ": " + container)

        url = "http://" + host + ":2376"  + "/containers/" + c_id + "/" + service
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
        DOMAIN_DOCKER   = 'docker.'
        ERR_RESPONSE    = "response error"
        ERR_JSON        = "json error"

        names = []
        for item  in self.args[HOSTS]:
            url = "http://{}:{}/{}".format(item, self.args[HOSTS][item], QUERY)
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
                        name = str(entry[NAMES]).replace("/", "").replace("'", "").replace("[", "").replace("]","").replace("-", "_").lower()
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
                        args['id'] = entry['Id']
                        args[ATTR_STATE] = str(entry[STATE]).replace("exited", "Stopped").replace("running","Running")
                        args[ATTR_CONTAINER] = org_name
                        r =ha.set_state(DOMAIN_DOCKER + name, state, args)



        