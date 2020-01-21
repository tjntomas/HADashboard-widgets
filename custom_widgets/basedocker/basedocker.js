function basedocker(widget_id, url, skin, parameters)
{
    self = this;
    self.widget_id = widget_id
    self.parameters = parameters
    self.OnStateAvailable = OnStateAvailable
    self.OnStateUpdate = OnStateUpdate
    
    var monitored_entities = 
        [
            {"entity": parameters.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
        ]

    callbacks = []
    
    self.stop_icon      = elem(self, "mdi mdi-stop-circle-outline")
    self.play_icon      = elem(self, "mdi mdi-play-circle-outline")
    self.restart_icon   = elem(self, "mdi mdi-restart")
    self.uptime         = elem(self, "uptime")
    self.state          = elem(self, "state")
    self.host           = elem(self, "host")

    self.stop_icon.addEventListener("click", btn_stop.bind(self), true)
    self.play_icon.addEventListener("click", btn_play.bind(self), true)
    self.restart_icon.addEventListener("click", btn_restart.bind(self), true)

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)
    
    async function btn_stop(){
        this.call_service(this, this.parameters.post_service_stop)
        this.set_field(this, "stop_style", "color: orange")
        this.state.innerHTML = "Stopping"
        await blink(this.state, this.stop_icon,  this.state.innerHTML)
    }

    async function btn_play(){
        this.call_service(this, this.parameters.post_service_start)
        this.set_field(this, "play_style", "color: orange")
        this.state.innerHTML = "Starting"
        await blink(this.state, this.play_icon,  this.state.innerHTML)
    }

    async function btn_restart(){
        this.call_service(this, this.parameters.post_service_restart)
        this.set_field(this, "restart_style", "color: orange")
        this.state.innerHTML = "Restarting"
        await blink(this.state, this.restart_icon,  this.state.innerHTML)
    }

    async function blink(state, icon, wait_state ){
        while (state.innerHTML == wait_state){
            icon.style.opacity = 0.2
            await sleep(200)
            icon.style.opacity = 1
            await sleep(200)
        }
    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }


    function OnStateAvailable(self, state){        
        set_view(self,state)    
    }
    
    function OnStateUpdate(self, state){
        set_view(self,state) 
    }
    
    function set_view(self, state){
        switch (state.state) {
            case "on":
                self.set_field(self, "play_style", "color: green")
                self.set_field(self, "stop_style", "color: gray")
                self.set_field(self, "restart_style", "color: gray")
                break
            case "off":
                self.set_field(self, "play_style", "color: gray")
                self.set_field(self, "stop_style", "color: red")
                self.set_field(self, "restart_style", "color: gray")
                break
        }
        self.uptime.innerHTML = state.attributes.uptime
        self.state.innerHTML = state.attributes.state
        self.host.innerHTML = state.attributes.host
    }

    function elem(self, class_name){
        return document.getElementById(self.widget_id).getElementsByClassName(class_name)[0]
    }
}
