function basemyframe(widget_id, url, skin, parameters)
{
    self = this
    self.parameters = parameters;
    
    var callbacks = []
    
    var monitored_entities = []
    self.OnStateAvailable = OnStateAvailable
    self.OnStateUpdate = OnStateUpdate

    monitored_entities.push({"entity": parameters.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate})
    
    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks);


    function OnStateAvailable(self, state){
        self.set_field(self, "frame_src", state.state);
    }

    function OnStateUpdate(self, state){
        self.set_field(self, "frame_src", state.state);
    }
}