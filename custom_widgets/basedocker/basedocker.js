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
    EL_STOP         = "mdi mdi-stop-circle-outline"
    EL_PLAY         = "mdi mdi-play-circle-outline"
    EL_RESTART      = "mdi mdi-restart"
    EL_UPTIME       = "uptime"
    EL_STATE        = "state"
    EL_HOST         ="host" 
    EL_CONTAINER    = "container"
    EV_CLICK        = "click"
    EV_MOUSEOVER    = "mouseover"
    EV_MOUSEOUT     = "mouseout"

    self.stop_icon      = elem(self, EL_STOP)
    self.play_icon      = elem(self, EL_PLAY)
    self.restart_icon   = elem(self, EL_RESTART)
    self.uptime         = elem(self, EL_UPTIME)
    self.state          = elem(self, EL_STATE)
    self.host           = elem(self, EL_HOST)
    self.container      = elem(self, EL_CONTAINER)

    self.stop_icon.addEventListener(EV_CLICK, btn_stop.bind(self), true)
    self.play_icon.addEventListener(EV_CLICK, btn_play.bind(self), true)
    self.restart_icon.addEventListener(EV_CLICK, btn_restart.bind(self), true)
    self.container.addEventListener(EV_MOUSEOVER, mouseover.bind(self), true)
    self.container.addEventListener(EV_MOUSEOUT, mouseout.bind(self), true)

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)

    self.icon_colors = {}
    
    async function mouseover(e){
        this.icon_colors[e.target] = e.target.style.color 
        e.target.style.color = "rgba(60,60,255)"
    }

    async function mouseout(e){
        e.target.style.color = this.icon_colors[e.target]
    }

    async function btn_stop(){
        this.call_service(this, this.parameters.post_service_stop)
        this.set_field(this, "stop_style", "color: orange")
        this.icon_colors[this.stop_icon] = "orange"
        this.state.innerHTML = "Stopping..."
        await blink(this.state, this.stop_icon,  this.state.innerHTML)
    }

    async function btn_play(){
        this.call_service(this, this.parameters.post_service_start)
        this.set_field(this, "play_style", "color: orange")
        this.icon_colors[this.play_icon] = "orange"
        this.state.innerHTML = "Starting..."
        await blink(this.state, this.play_icon,  this.state.innerHTML)
    }

    async function btn_restart(){
        this.call_service(this, this.parameters.post_service_restart)
        this.set_field(this, "restart_style", "color: orange")
        this.icon_colors[this.restart_icon] = "orange"
        this.state.innerHTML = "Restarting..."
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
