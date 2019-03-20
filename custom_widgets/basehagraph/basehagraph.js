function basehagraph(widget_id, url, skin, parameters)
{
	self = this
	self.widget_id = widget_id
	self.parameters = parameters
	self.OnStateAvailable = OnStateAvailable
	self.OnStateUpdate = OnStateUpdate
	self.states = {}
	var l = Object.keys(self.parameters.entities).length
	var callbacks = []
	var monitored_entities =  []

	for (entity of self.parameters.entities){
		monitored_entities.push({"entity": entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate})
	}
	
		// Some default values
	self.NUMBER_OF_DECIMALS = 2
	self.PAPER_BACKGROUND_COLOR = 'rgba(200,200,200,0)'
	self.X_GRID_COLOR = "rgba(255,255,255,0)"
	self.CANVAS_HEIGHT = 215
	self.TITLE_COLOR = self.parameters.css.title_color
	self.X_AXIS_TEXT_COLOR = self.parameters.css.x_axis_text_color
	self.Y_AXIS_LEGEND_COLOR = self.parameters.css.y_axis_legend_color
	self.Y_AXIS_TEXT_COLOR = self.parameters.css.y_axis_text_color
	// Some default colors for the traces.
	self.TRACE_COLORS = 
						["rgba(50,50,220,0.7)",  "rgba(220,70,220,0.7)", "rgba(40,200,40,0.7)",  "rgba(220,20,20,0.7)",
						 "rgba(220,220,40,0.7)", "rgba(40,220,220,0.7)", "rgba(220,70,120,0.7)", "rgba(200,100,20,0.7)",
						 "rgba(100,220,40,0.7)", "rgba(100,20,220,0.7)", "rgba(120,70,120,0.7)", "rgba(100,100,200,0.7)"
						 ]

	self.FILL_COLORS = [ "rgba(50,50,220,0.4)",  "rgba(220,70,220,0.4)", "rgba(40,120,40,0.6)",  "rgba(220,20,20,0.4)",
						 "rgba(220,220,40,0.4)", "rgba(40,220,220,0.4)", "rgba(220,70,120,0.4)", "rgba(200,100,20,0.4)",
						 "rgba(100,220,40,0.4)", "rgba(100,20,220,0.4)", "rgba(120,70,120,0.4)", "rgba(100,100,200,0.4)"
						 ]
	self.BAR_COLORS = 	["rgba(50,50,220,0.4)",  "rgba(220,70,220,0.4)", "rgba(40,120,40,0.6)",  "rgba(220,20,20,0.4)",
						 "rgba(220,220,40,0.4)", "rgba(40,220,220,0.4)", "rgba(220,70,120,0.4)", "rgba(200,100,20,0.4)",
						 "rgba(100,220,40,0.4)", "rgba(100,20,220,0.4)", "rgba(120,70,120,0.4)", "rgba(100,100,200,0.4)"
						 ]
	// If colors are passed as parameters, we use these instead of the default colors.
	self.TRACE_COLORS = css(self,"trace_colors", self.TRACE_COLORS)
	self.FILL_COLORS = css(self,"fill_colors", self.FILL_COLORS)
	self.BAR_COLORS = css(self,"bar_colors", self.BAR_COLORS)
	
	self.HA_Data = HA_Data
	
	self.PLOT_BG_COLOR = 'rgba(40,40,40,0)'
	self.TRACE_NAME_COLOR = '#888888'
	self.CANVAS_HTML_BODY_START = '<div id="GRAPH_CANVAS" class="canvasclass" data-bind="attr:{style: graph_style}" width="100%" height="100%" style="'
	self.CANVAS_HTML_BODY_END = '"></div>'
								
	WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)
	self.DataSeriesArray = new Array ()
	self.index = 1
	draw(self) 

	function OnStateUpdate(self, state){
		// Log that new data has been received.
		Logger(self,"New value for " + self.parameters.entities[0] + ": " + state.state)
		draw(self)
	}

	function OnStateAvailable(self, state){
	}
	
	function MultiPlot(self,DataSeries)
	{  
		var GRAPH_CANVAS = element(self, 'canvasclass')
		GRAPH_CANVAS.outerHTML = self.CANVAS_HTML_BODY_START + self.css.background_style + self.CANVAS_HTML_BODY_END
		GRAPH_CANVAS = element(self, 'canvasclass') // Yes, this duplicate line is needed since the line 
													// above destroys the element by modifying outerHTML.

		var y_axis_title = decodeURI(self.parameters.units)
		switch (decodeURI(self.parameters.units))
		{
			case "°C":
				y_axis_title = CSS_Settings(self, "degrees_celsius_text", "Degrees Celsius")
				break;
			case "°F":
				y_axis_title = CSS_Settings(self,"degrees_fahrenheit_text","Degrees Fahrenheit")
				break;

			case "W":
				y_axis_title = "Watt"
				break;

			case "%":
				y_axis_title = CSS_Settings(self, "percent_text", "Percent")
				break;
		}

		var d_width = document.getElementById(self.widget_id).offsetWidth
		var min = self.parameters.min
		var max = self.parameters.max
		self.parameters.plot = GRAPH_CANVAS
		var canvas_height = Settings(self, 'height', self.CANVAS_HEIGHT)

		// Adjust the legend y position if more than one legend should be displayed
		if(DataSeries.length >2)
		{
			var legend_y = -0.2
		}
		else
		{
			var legend_y = -0.1
		}
		var x_grid_color = self.css.grid_color
		var y_grid_color = self.css.grid_color

		// If the graph type is "bar", we hide the x-axis by changing its color to the background color
		if(Settings(self, 'type', "scatter") == "bar")
		{
			x_grid_color = self.X_GRID_COLOR
			y_grid_color = self.X_GRID_COLOR
		}
		var x_axis = {
					showgrid: false,
					zeroline: true,
					showline: true,
					mirror: 'ticks',
					gridcolor: x_grid_color,
					gridwidth: 1,
					zerolinecolor: self.css.grid_color,
					linecolor: self.css.grid_color,
					zerolinewidth: 1,
					linewidth: 1,
					tickfont: {
			
						size: 10,
						color: self.X_AXIS_TEXT_COLOR
					  }
		  		 }
		    
		var y_axis = {
					title: y_axis_title,
					titlefont: {
			
						size: 12,
						color: self.Y_AXIS_LEGEND_COLOR
					  },
					range: [min,max],
					showgrid: true,
					zeroline: true,
					showline: false,
					mirror: 'ticks',
					gridcolor: y_grid_color,
					gridwidth: 1, 
					zerolinecolor: self.css.grid_color,
					linecolor: self.css.grid_color,
					zerolinewidth: 1,
					linewidth: 1,
					tickfont: {
			
						size: 10,
						color: self.Y_AXIS_TEXT_COLOR
					  },
		  		 }


		var display = {
					margin: { t:32,l: 35, r: 21 , b: 32 },
					titlefont: {"size": 14,"color": self.TITLE_COLOR, "font-weight":500},
					title: self.parameters.title,
					paper_bgcolor: self.PAPER_BACKGROUND_COLOR,
					plot_bgcolor: self.PLOT_BG_COLOR,
					width: d_width, height: canvas_height,
					legend: {
								x: -0.05,
								y: legend_y,traceorder: 'normal',orientation: 'h',
								font: 	{
											family: 'sans-serif',
											size: 12,
											color: self.css.legend_text_color
										}
							},
					xaxis: x_axis,
					yaxis: y_axis
		}
		
		var traces = new Array()
		var traceColors = 	self.TRACE_COLORS
		var fillColors = 	self.FILL_COLORS
		var barColors = 	self.BAR_COLORS
		var i = 0
		var colorIndex = 0
		var d_fill = ""

		while ( i < (DataSeries.length/2) ){
			if ( "titles" in self.parameters ){
				if ("value_in_legend" in self.parameters){
					var value = " " + parseFloat(DataSeries[i * 2 + 1].pop()).toFixed(1) + " " + self.parameters.units
				}else{
					var value = ""}
				var d_title =self.parameters.titles[i] + value
				
				colorIndex =  i + Settings(self,"colorIndex",0)
			}
			else{
				colorIndex = Settings(self,'colorIndex',7)
			}

			d_shape = Settings(self,'shape','spline')
			d_fill = Settings(self,'fill','')

			if ( Settings(self,'type', "scatter") == "bar" ){
				traces[i] = {
					type: Settings(self,'type',"scatter"),
					text:  DataSeries[i * 2 + 1],
					textposition: 'auto',
					  hoverinfo: 'none',
					  textfont: {
						
						size: 10,
						color: self.TRACE_NAME_COLOR
					  },
					marker: {
						color: barColors[colorIndex],
						line: {
						  color: traceColors[colorIndex],
						  width: 1
						}
					  },
					
					x: DataSeries[i * 2],
					y: DataSeries[i * 2 + 1],
					mode: 'lines', line:{
											color: traceColors[colorIndex],
											width: 2,
											shape: d_shape
										},
										name: d_title, 
										fill: d_fill, 
										fillcolor: fillColors[colorIndex] 
				}
				i = i + 1
			}
			else{
				traces[i] = {
					type: Settings(self,'type',"scatter"),
					x: DataSeries[i * 2],
					y: DataSeries[i * 2 + 1],
					mode: 'lines', line:{
											color: traceColors[colorIndex],
											width: 2,shape: d_shape},
											name: d_title, 
											fill: d_fill, 
											fillcolor: fillColors[colorIndex] 
										}
				i = i + 1
			}
		}
	
		try {
			Plotly.plot( GRAPH_CANVAS, traces,display, {displayModeBar: false})
		}
		catch(err) {}
	}

	function HA_Data(self, values, index){
		values = values[0]
		self.DataSeriesArray[index*2] =  new Array ()
		self.DataSeriesArray[index*2+1] =  new Array ()
		for (data in values){
			self.DataSeriesArray[index*2+1].push(parseFloat(values[data]['state']))
			self.DataSeriesArray[index*2].push(values[data]['last_changed'])
		}
		if (index == self.number_of_entities){
			MultiPlot(self, self.DataSeriesArray)
		}
	}

	function draw(self)
	{
		// Get number of entities to process
	 	var number_of_entities = Object.keys(self.parameters.entities).length
	 	var current_entity_index = 0
		var time_filter = self.parameters.time
		self.number_of_entities = number_of_entities-1
		
		for (current_entity_index in self.parameters.entities){
			get_history(self, self.parameters.entities[current_entity_index],time_filter,current_entity_index, self.HA_Data )
		}
	}

    // Helper function to return either a default value or a value passed in parameters.
	function Settings(self,parameter,default_value)
	{
		if(parameter in self.parameters){
			return self.parameters[parameter]
		}
		else{
			return default_value
		}
	}

	function CSS_Settings(self,parameter,default_value)
	{
		if(parameter in self.parameters.css){
			return self.parameters.css[parameter]
		}
		else{
			return default_value
		}
	}
	//  Helper function to adjust color and opacity of the traces.
	function css(self, parameter, default_value)
	{
		if(parameter in self.parameters.css){
			var m = self.parameters.css[parameter]
			var n = self.parameters.css.multi
			var colors = []
			for (i in self[parameter.toUpperCase()]){
				arr = self[parameter.toUpperCase()][i].slice(5).slice(0, -1).split(",")
				rgb = []
				for(v = 0; v < 3; v++){
					rgb.push(parseInt(parseFloat(arr[v])/m))
				}
				color = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + arr[v]*n +")"
				colors.push(color)
			}
			return colors
		}
		else{
			return default_value
		}
	}

	// Helper function to return an element from class name
	function element(self, class_name)
    {
        return document.getElementById(self.widget_id).getElementsByClassName(class_name)[0] 
	}
	
	function Logger(self,message){
	
		if ("log" in self.parameters){
			console.log(message)
		}
	}

	async function get_history(self, entity, time_filter, index, callback){
		
		var start_time = GetTimeDiff(time_filter)
		var HISTORY_API_URL = "/api/history/period/"
		var END_TIME_URL = "&end_time="
		var ENTITY_FILTER_URL = "&filter_entity_id="
		BASE_URL = self.parameters.css.ha_url.split("://") [1]
		BASE_SCHEME = self.parameters.css.ha_url.split("://") [0]
		console.log("Scheme", BASE_SCHEME)
		if (BASE_SCHEME == "https"){
			self.http_scheme = "https"
			self.ws_scheme = "wss://"
		}
		else
		{
			self.http_scheme = "http"
			self.ws_scheme = "ws://"
		}
		self.TOKEN = self.parameters.css.token
		var websocket_url = self.ws_scheme + BASE_URL + "/api/websocket"
		var request = HISTORY_API_URL + start_time 
		var filter =  ENTITY_FILTER_URL + entity
		var auth_ok = false
		var ws = new WebSocket(websocket_url)
	
		 ws.onmessage = function(event) {
			 var msg = JSON.parse(event.data)
			 if (!auth_ok ){
				 switch (msg['type']){ 
	
				 case "auth_required":
					 ws.send(JSON.stringify({"type": "auth","access_token": self.TOKEN}))
					 break
	
				 case "auth_ok":
					 auth_ok = true
					 ws.send(JSON.stringify({"id": self.index, "type": "auth/sign_path", "path": request,  "expires": 20}))
					 self.index = self.index + 1
					 break
				 }
			 }
			 else{
				if (msg['success'] == true){
					var path = msg['result']['path']
					var url = self.http_scheme  + "://" + BASE_URL + path + filter
					var xhr = new XMLHttpRequest() 
					xhr.open("GET", url, false)
					xhr.send()
					var res = JSON.parse(xhr.response)
					callback(self, res, index)
				}
			 }
		 }
		 ws.onclose = function() {
			 console.log('Connection to Home Assistant closed')
			 self.auth_ok = false
		 }
		 ws.onopen = function() {
			 console.log('Connected to Home Assistant')
		 }
	}
	
	 function GetTimeDiff(time){
		var today = new Date()
		var sec = 60000
		var hour = sec * 60
		var day = hour * 24
	
		var w = time.split("w")
		if (w.length > 1){
			time = w[1]
			today.setTime(today.getTime() - day * w[0] * 7)
		}
		var d = time.split("d")
		if (d.length>1){
			time = d[1]
			today.setTime(today.getTime() - day * d[0])
		}
		var h = time.split("h")
		if (h.length>1){
			time = h[1]
			today.setTime(today.getTime() - hour * h[0])
		}
		var m = time.split("m")
		if (m.length>1){
			time = m[1]
			today.setTime(today.getTime() - sec * m[0])
		}
		return today.toLocaleDateString("sv-SE") + "T" + today.toLocaleTimeString()
	}
}
