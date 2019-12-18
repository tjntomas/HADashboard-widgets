function basecamerastream(widget_id, url, skin, parameters)
{
    self = this
    
    self.parameters = parameters;
    
    var callbacks = []

    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;
    
    var monitored_entities = 
        [
            {"entity": parameters.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
        ]; 

    self.log = log

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks);

    function OnStateAvailable(self, state)
    {        
        set_view(self, state)
    }
    
    function OnStateUpdate(self, state)
    {
        console.log("New access token: ", state.attributes['access_token'])
        set_view(self, state)
    }
 
    function set_view(self, state)
    {
        var stream_url = self.parameters.base_url + "/api/camera_proxy_stream/" + state.entity_id  + "?token=" + state.attributes["access_token"]
        self.log("Stream url:", stream_url)
        self.set_field(self, "img_internal_src", ""); // Needed to prevent a 504 server error.
        self.set_field(self, "img_internal_src", stream_url);
    }

    function log(){
        if ("log" in this.parameters){
            var msg = ""
            for (s of arguments){
                msg = msg + " " + s
            }
            console.info(msg)
        }
    }
}
