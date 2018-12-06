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
    self.styles['vintage'] = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#2c3645"
                },
                {
                    "weight": "2"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "weight": "2"
                },
                {
                    "gamma": "1"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#ded7c8"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "1"
                },
                {
                    "color": "#e9dfd3"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#bfbfbf"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b4714f"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#0d6f32"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#59a091"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#95c4a7"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#334767"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#334767"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "color": "#f8f7f2"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#f4f2eb"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#b7b7b7"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f2ebda"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#969285"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ededed"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#535353"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#3fc672"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#4d6489"
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
        }
    ]
    self.styles['retro'] = [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#84afa3"
                },
                {
                    "lightness": 52
                }
            ]
        },
        {
            "stylers": [
                {
                    "saturation": -17
                },
                {
                    "gamma": 0.36
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3f518c"
                }
            ]
        }
    ]
    self.styles['monochrome'] = [{"featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "color": "#71ff00"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels",
            "stylers": [
                {
                    "color": "#f6ff00"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffff00"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -97
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "lightness": -25
                },
                {
                    "saturation": -100
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
    divider = document.createElement("div")
    divider.setAttribute("class", "divider")
    self.top.appendChild(divider)
}




