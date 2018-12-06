function Styles(self){
    self.styles = {}
    var localroadcolor = '#775533'
    var transitcolor = "#654333"
    var roadcolor = '#775500'
    var placetextcolor = '#dddddd'
    var label_color = "#999999"
    var water_color ="#444499"
    var park_color = "#113311"
    self.styles['default'] = [{'featureType':'all','elementType':'all','stylers':[{'visibility':'on'}]},
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
    ]
    self.styles['dark'] = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on",
                    "color": "#fff" 
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "saturation": "100"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000",
                    'visibility':'off'
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    
                    'visibility':'off'
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    
                    'visibility':'off'
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7f8d89"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#2b3638"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2b3638"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#24282b"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#24282b"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]
    self.styles['topaco'] = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0c1e34"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#263c3f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b9a76"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#38414e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#212a37"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9ca5b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f2835"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f3d19c"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0c1e34"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0c1e34"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#515c6d"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        }
    ]
}

function DrawZones()
{
    var fillColors = 	["rgba(20,20,240,1)", "rgba(220,70,220,1)",  "rgba(220,20,20,1)",
                         "rgba(220,220,40,1)","rgba(40,220,220,1)", "rgba(220,70,120,1)", 
                         "rgba(220,100,20,1)","rgba(250,160,40,1)","rgba(60,150,90,1)", 
                         "rgba(220,200,20,1)", "rgba(100,100,220,1)", "rgba(40,220,40,1)"]

    var url = self.parameters.base_url + "/api/states" 
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, false)
    xhr.setRequestHeader("X-HA-access", self.parameters.pw)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
    var entities = JSON.parse(xhr.response)
    var ci = 0
    var sw = 0
    var colorIndex = 0
    var n = 0
    var cords = []
    var fill_opacity = 0.6
    self.zone_coords = {}
    for(key in entities){
        if(entities[key]["entity_id"].slice(0,5) == "zone." )
        {
            var longitude = entities[key]["attributes"]["longitude"]
            var latitude = entities[key]["attributes"]["latitude"]
            self.zone_coords[key] = [latitude,longitude,entities[key]]
            cords[n] = [ latitude,longitude]
            var radius = entities[key]["attributes"]["radius"]
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

function AddTracker(img){
    var item = document.createElement("img")
    item.src= img
    self.trackers.push(self.entity_state[tracker].entity_id)

    item.setAttribute("class", "image")
    title = document.createElement("div")
    title.setAttribute("class", "title")
    tick = document.createElement("div")
    tick.setAttribute("tick", "")
    tick.innerHTML = "&#9679;"
    title.innerHTML = self.entity_state[tracker].attributes.friendly_name
    var itm_frame = document.createElement("div")
    itm_frame.setAttribute("itm_frame","")
    itm_frame.style.background =  self.parameters.static_css.tracker_style
    itm_frame.setAttribute("id", self.entity_state[tracker].entity_id)
    itm_frame.setAttribute("title", "frame")
    tick.setAttribute("class", self.entity_state[tracker].entity_id)
    itm_frame.appendChild(title)
    itm_frame.appendChild(item)
    itm_frame.appendChild(tick)
    self.top.appendChild(itm_frame)
}




