function basegooglemaps(widget_id, url, skin, parameters)
{
    self = this
    self.widget_id=widget_id
    self.parameters = parameters;
    var callbacks = []
    self.OnStateAvailable = OnStateAvailable
    self.OnStateUpdate = OnStateUpdate
    var monitored_entities = []
    for (device_tracker in parameters.entities){
        monitored_entities.push({"entity":  parameters.entities[device_tracker], "initial": self.OnStateAvailable, "update": self.OnStateUpdate})
    }
   
    self.api_loaded = false
    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)  
    
    function OnStateAvailable(self, state){    
        // Grab the coordinates for later use.
        if ("latitude" in state.attributes){
            self.long = state.attributes.longitude
            self.lat = state.attributes.latitude
            window.self = self
            // Load Google Maps API Asyncronously.
            if (!self.api_loaded){
                loadScript('http://maps.googleapis.com/maps/api/js?v=3&key=' + self.parameters.api_key + '&callback=initialize',
                function(){log('done')})
                self.api_loaded = true
            }
        }
    }
    
    function loadScript(src,callback){
        var script = document.createElement("script")
        script.type = "text/javascript"
        if(callback)script.onload=callback
        document.getElementsByTagName("head")[0].appendChild(script)
        script.src = src
    }

    function OnStateUpdate(self, state){
      var center = new google.maps.LatLng(state.attributes.latitude, state.attributes.longitude)
      self.map.panTo(center)
      self.markers[state.entity_id].setPosition(new google.maps.LatLng(state.attributes.latitude, state.attributes.longitude) )
    }

    function log(str){
    }

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    function element(self,el){
        return document.getElementById(document.widget_id).getElementsByClassName(el)[0]
    }
}

function initialize() {
  
    var localroadcolor = '#775533'
    var transitcolor = "#654333"
    var roadcolor = '#775500'
    var placetextcolor = '#dddddd'
    var label_color = "#999999"
    var water_color ="#444499"
    var park_color = "#113311"
    var fillColors = 	["rgba(20,20,240,1)", "rgba(220,70,220,1)",  "rgba(220,20,20,1)",
                       "rgba(220,220,40,1)","rgba(40,220,220,1)", "rgba(220,70,120,1)", "rgba(220,100,20,1)",
                       "rgba(250,160,40,1)","rgba(60,150,90,1)", "rgba(220,200,20,1)", "rgba(100,100,220,1)", "rgba(40,220,40,1)"]
    
  var mapOptions = {zoom: window.self.parameters.zoom,disableDefaultUI: true,backgroundColor: 'hsla(0, 0, 0, 0)',center: new google.maps.LatLng(
    window.self.lat , window.self.long ),
        styles: [{'featureType':'all','elementType':'all','stylers':[{'visibility':'on'}]},
        {'featureType':'all','elementType':'labels.text.fill','stylers':[{'saturation':46},{'color':'#dddccc'},{'lightness':3}]},
        {'featureType':'all','elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'color':'#444444'},{'lightness':2}]},
        {'featureType':'all','elementType':'labels.icon','stylers':[{'visibility':'on'}]},
        {'featureType':'administrative','elementType':'all','stylers':[{'visibility':'off'}]},
        {'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':placetextcolor},{'lightness':20}]},
        {'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'visibility':'on'},{'color':'#ff0000'},{'lightness':17},{'weight':0.2}]},
        {'featureType':'landscape','elementType':'all','stylers':[{'visibility':'off'}]},
        {'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#0000ff'},{'lightness':20}]},
        {'featureType':'poi','elementType':'all','stylers':[{'visibility':'on'}]},
        {'featureType':'poi','elementType':'geometry','stylers':[{'color': park_color},{'lightness':4}]},
        {'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#664411'},{'lightness':17}]},
        {'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':label_color},{'lightness':29},{'weight':0.2},{'visibility':'on'}]},
        {'featureType':'road.highway','elementType':'labels.text.fill','stylers':[{'color':label_color}]},
        {'featureType':'road.highway','elementType':'labels.text.stroke','stylers':[{'visibility':'off'}]},
        {'featureType':'road.highway.controlled_access','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'color':roadcolor}]},
        {'featureType':'road.highway.controlled_access','elementType':'geometry.stroke','stylers':[{'visibility':'on'}]},
        {'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':roadcolor},{'lightness':18}]},
        {'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':roadcolor}]},
        {'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':roadcolor}]},
        {'featureType':'road.arterial','elementType':'labels.text','stylers':[{'color':roadcolor}]},
        {'featureType':'road.arterial','elementType':'labels.text.fill','stylers':[{'visibility':'on'},{'color':label_color}]},
        {'featureType':'road.arterial','elementType':'labels.text.stroke','stylers':[{'visibility':'on'}]},
        {'featureType':'road.local','elementType':'geometry','stylers':[{'color':localroadcolor},{'lightness':16}]},
        {'featureType':'road.local','elementType':'geometry.fill','stylers':[{'color':localroadcolor}]},
        {'featureType':'road.local','elementType':'geometry.stroke','stylers':[{'visibility':'off'}]},
        {'featureType':'road.local','elementType':'labels.text','stylers':[{'color':localroadcolor}]},
        {'featureType':'road.local','elementType':'labels.text.fill','stylers':[{'visibility':'on'},{'color':label_color}]},
        {'featureType':'transit','elementType':'all','stylers':[{'visibility':'on'}]},
        {'featureType':'water','elementType':'all','stylers':[{'visibility':'on'}]},
        {'featureType':'water','elementType':'geometry','stylers':[{'color':water_color},{'lightness':6}]},
        {'featureType':'transit','elementType':'geometry','stylers':[{'lightness':19},{'color': transitcolor},{'weight':'3.00'},{'visibility':'on'}]},
        {'featureType':'transit','elementType':'labels','stylers':[{'visibility':'on'}]},
        {'featureType':'transit.station','elementType':'all','stylers':[{'visibility':'on'}]}
        ]};

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    window.self.map =  map
    window.self.markers = {}
    marker_colors = ['orange', 'green', 'blue', 'yellow', 'red']
    index = 0
    for (tracker in window.self.entity_state){

        if ( "latitude" in window.self.entity_state[tracker].attributes)
        {
            console.log(window.self.entity_state[tracker])

            if ("entity_picture" in window.self.entity_state[tracker].attributes)
            {
                var markerIcon = {
                    url: window.self.parameters.base_url + window.self.entity_state[tracker].attributes.entity_picture,
                    scaledSize: new google.maps.Size(40, 40)
                }
                lat = window.self.entity_state[tracker].attributes.latitude
                long = window.self.entity_state[tracker].attributes.longitude
                window.self.markers[window.self.entity_state[tracker].entity_id]  = new google.maps.Marker({
                    position: new google.maps.LatLng(lat,long), map: map,
                    icon: markerIcon})
            }
            else
            {
                markerIcon = {
                    url: 'http://maps.google.com/mapfiles/ms/icons/' + marker_colors[index] + '.png',
                    scaledSize: new google.maps.Size(40, 40)
                } 
                lat = window.self.entity_state[tracker].attributes.latitude
                long = window.self.entity_state[tracker].attributes.longitude
                window.self.markers[window.self.entity_state[tracker].entity_id] = new google.maps.Marker({
                    position: new google.maps.LatLng(lat,long), map: map,
                    icon: markerIcon,
                    label: {
                        text: window.self.entity_state[tracker].attributes.friendly_name,
                        color: "#aaaaaa",
                        fontSize: "10px",
                        fontWeight: "bold"
                    }})
            }
        
            index = index + 1
            if (index > 4) { index  = 0 }
        }
    }

    url=  window.self.parameters.base_url + "/api/states" 
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, false)
    xhr.setRequestHeader("X-HA-access", window.self.parameters.pw)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
    entities = JSON.parse(xhr.response)
    ci = 0
    sw = 0
    colorIndex = 0
    n = 0
    cords = []
    fill_opacity = 0.4
    for(key in entities){
        if(entities[key]["entity_id"].slice(0,5) == "zone." )
        {
            longitude = entities[key]["attributes"]["longitude"]
            latitude = entities[key]["attributes"]["latitude"]
            cords[n] = [ latitude,longitude]
            radius = entities[key]["attributes"]["radius"]
            colorIndex = colorIndex + 1
            if(colorIndex > 9){colorIndex = 0}
            ci = colorIndex
            var zoneCircle = new google.maps.Circle({
                strokeColor: "rgba(220,0,0,0.7)",
                strokeOpacity: 0.6,
                strokeWeight: 0,
                fillColor: fillColors[ci],
                fillOpacity: fill_opacity,
                map: map,
                center: {lat:  latitude , lng:  longitude },
                radius: radius
            })
            n = n + 1
        }
    }
}
   