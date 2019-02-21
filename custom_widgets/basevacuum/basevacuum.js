function basevacuum(widget_id, url, skin, parameters)
{
    self = this
    self.widget_id = widget_id
    self.parameters = parameters
    self.FanOneClick = FanOneClick
    self.FanTwoClick = FanTwoClick
    self.FanThreeClick = FanThreeClick
    self.FanFourClick = FanFourClick
    self.DockClick = DockClick
    self.ButtonClick = ButtonClick
    self.MopClick = MopClick
    var callbacks =
    [
        {"selector": '#' + widget_id + ' #robo_fan_0', "action": "click", "callback": self.MopClick},
        {"selector": '#' + widget_id + ' #robo_fan_1', "action": "click", "callback": self.FanOneClick},
        {"selector": '#' + widget_id + ' #robo_fan_2', "action": "click", "callback": self.FanTwoClick},
        {"selector": '#' + widget_id + ' #robo_fan_3', "action": "click", "callback": self.FanThreeClick},
        {"selector": '#' + widget_id + ' #robo_fan_4', "action": "click", "callback": self.FanFourClick},
        {"selector": '#' + widget_id + ' #robo_dock', "action": "click", "callback": self.DockClick},
        {"selector": '#' + widget_id + ' #button', "action": "click", "callback": self.ButtonClick}
    ]
    self.OnStateAvailable = OnStateAvailable
    self.OnStateUpdate = OnStateUpdate
    var monitored_entities =
            [
                {"entity": parameters.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
               
            ]

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)
    self.fan_speeds = [0,"Quiet", "Balanced", "Turbo", "Max"]
    self.fan_speeds = [105,101, 102, 103, 104]
    self.img = element(self, "robo_img")
    self.angle = 0
    self.status = ""
    self.direction = 1
    self.step = 0.5

    function ButtonClick(self){
        if (self.status === "Charging" || self.status === "Idle" || self.status === "Paused" ){
            start_cleaning(self)
            element(self, "button").style.background = "green"
        }
        else{  
            pause_cleaning(self)
            element(self, "button").style.background = "orange"
        }
    }
    function DockClick(self){
        if (element(self,"robo_dock").style.filter != "invert(100%)"){
            element(self,"robo_dock").style.filter ="invert(100%)"
            element(self, "button").style.background = "orange"
            return_to_dock(self)
        }
        else{
            element(self,"robo_dock").style.filter =""
        }
    }

    function MopClick(self){
        set_fan_speed(self,0)
        reset_fans(self)
        element(self,"robo_fan_0").style.filter =""
    }
    function FanOneClick(self){
        set_fan_speed(self,1)
        reset_fans(self)
        element(self,"robo_fan_1").style.filter ="invert(100%)"
    }
    function FanTwoClick(self){
        set_fan_speed(self,2)
        reset_fans(self)
        element(self,"robo_fan_2").style.filter ="invert(100%)"
    }
    function FanThreeClick(self){
        set_fan_speed(self,3)
        reset_fans(self)
        element(self,"robo_fan_3").style.filter ="invert(100%)"
    }
    function FanFourClick(self){
        set_fan_speed(self,4)
        reset_fans(self)
        element(self,"robo_fan_4").style.filter ="invert(100%)"
    }

    function set_fan_speed(self, speed){
        var args = {}
        args["service"] = "vacuum/set_fan_speed"
        args["entity_id"] = self.parameters.entity
        args["fan_speed"] = self.fan_speeds[speed]
        self.call_service(self, args)
    }

    function start_cleaning(self){
        var args = {}
        args["service"] = "vacuum/start"
        args["entity_id"] = self.parameters.entity
        self.call_service(self, args)
        console.log(args)
    }
    function pause_cleaning(self){
        var args = {}
        args["service"] = "vacuum/pause"
        args["entity_id"] = self.parameters.entity
        self.call_service(self, args)
        console.log(args)
    }

    function stop_cleaning(self){
        var args = {}
        args["service"] = "vacuum/stop"
        args["entity_id"] = self.parameters.entity
        self.call_service(self, args)
    }
    function return_to_dock(self){
        var args = {}
        args["service"] = "vacuum/return_to_base"
        args["entity_id"] = self.parameters.entity
        self.call_service(self, args)
    }
    function reset_fans(self){
        var i = 0
        while ( i < 5){
            element(self,"robo_fan_" + i).style.filter = ""
             i =i + 1
        }
    }
    function OnStateAvailable(self, state)
    {
        self.status = state.attributes.status
        self.status_color = element(self, "status").style.color
        for (attribute in state.attributes){
            console.log(attribute,state.attributes[attribute])
        }
        
        set_view(self,state)
    }
    
    function OnStateUpdate(self, state)
    {
        self.status = state.attributes.status
        for (attribute in state.attributes){
            //console.log(attribute,state.attributes[attribute])
        }
        set_view(self,state)
    }
  
    // Helper function to get the element id from the class name.
    function element(self,class_name)
    {
        return document.getElementById(self.widget_id).getElementsByClassName(class_name)[0] 
    }

    async function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    function set_view(self, state){
        status = state.attributes.status
        var i = 0
        while (i < 5){
            if (state.attributes.fan_speed === self.fan_speeds[i]){
                var fan_speed = i
            }

            i = i +1
        }
        console.log("Fans speed", state.attributes.fan_speed,fan_speed)
        reset_fans(self)
        element(self,"robo_fan_" + fan_speed).style.filter ="invert(100%)"
        element(self, "battery").style.color = self.status_color
        element(self, "status").style.color = self.status_color
        if (state.attributes.status === "Charging" && state.attributes.battery_level === 100){
            status = "Docked"  
            element(self, "status").style.color = "green"
        }
        if (state.attributes.battery_level === 100){
            element(self, "battery").style.color = "green"
        }
        if (state.attributes.status === "Cleaning" ){
            element(self, "status").style.color = "orange"
            element(self, "button").style.background = "green"
        }
        if (state.attributes.status === "Paused"){
            element(self, "button").style.background = "orange"
        }
        if (state.attributes.status === "Charging"){
            element(self,"robo_dock").style.filter =""
            element(self, "button").style.background = "none transparent"
        }
        element(self,"battery").innerHTML = state.attributes.battery_level + "%"
        element(self,"status").innerHTML = status
        element(self,"time").innerHTML = state.attributes.cleaning_time + " min <sup>(" + state.attributes.total_cleaning_time + ")</sup>"
        element(self,"m2").innerHTML = state.attributes.cleaned_area + " m<sup>2 (" + state.attributes.total_cleaned_area + ")</sup>"
        element(self,"count").innerHTML = state.attributes.cleaning_count + " times"
	}
}