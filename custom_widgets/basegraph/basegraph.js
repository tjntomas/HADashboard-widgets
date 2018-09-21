function basegraph(widget_id, url, skin, parameters)
{
	self = this
	self.widget_id = widget_id
	self.parameters = parameters

		var callbacks = []
     
	self.OnStateAvailable = OnStateAvailable
	self.OnStateUpdate = OnStateUpdate

	var l = Object.keys(self.parameters.entities).length
	var monitored_entities = 
		[
			{"entity": parameters.entities[0], "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
		]
	
	// Some default values
	self.NUMBER_OF_DECIMALS = 2
	self.PAPER_BACKGROUND_COLOR = 'rgba(200,200,200,0)'
	self.X_GRID_COLOR = "rgba(255,255,255,0)"
	self.CANVAS_HEIGHT = 215
	self.TITLE_COLOR = '#aaaaaa'
	// Some default colors for the traces.
	self.TRACE_COLORS = 
						["rgba(50,50,220,0.7)", "rgba(220,70,220,0.7)",  "rgba(40,200,40,0.7)",  "rgba(220,20,20,0.7)",
						 "rgba(220,220,40,0.7)", "rgba(40,220,220,0.7)", "rgba(220,70,120,0.7)", "rgba(200,100,20,0.7)",
						 "rgba(100,220,40,0.7)", "rgba(100,20,220,0.7)", "rgba(120,70,120,0.7)", "rgba(100,100,200,0.7)"
						 ]

	self.FILL_COLORS = ["rgba(50,50,220,0.4)",  "rgba(220,70,220,0.4)", "rgba(40,120,40,0.6)",  "rgba(220,20,20,0.4)",
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

	self.PLOT_BG_COLOR = 'rgba(40,40,40,0)'
	self.TRACE_NAME_COLOR = '#888888'
	self.CANVAS_HTML_BODY_START = '<div id="GRAPH_CANVAS" class="canvasclass" data-bind="attr:{style: graph_style}" width="100%" height="100%" style="'
	self.CANVAS_HTML_BODY_END = '"></div>'

	// Check if time zone and locale are present in parameters or use default settings.
	self.TIME_ZONE = Settings(self, 'time_zone','Europe/Stockholm')
	self.LOCALE = Settings(self, 'locale','sv')

	// Default query patterns.
	DB_NAME = Settings(self, 'db_name', 'home_assistant')
	self.INFLUX_QUERY_PATTERN = "/query?db=" + DB_NAME + "&data=urlencode&pretty=false&q="
	self.INFLUX_SELECT_PATTERN = "SELECT%20value%20FROM%20%22"
	self.INFLUX_SELECT_PATTERN_DS = "SELECT%20first(value)%20FROM%20%22"
	self.INFLUX_WHERE_PATTERN = "%22%20WHERE%20entity_id%20=%20%27"
	self.INFLUX_TIME_PATTERN = "%27%20AND%20time%20%3E%20now()%20-"
								
    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)  

	function OnStateUpdate(self, state)
	{
		// Log that new data has been received.
		console.log("New value for " + self.parameters.entities[0] + ": " + state.state)
		draw(self, state)
	}

	function OnStateAvailable(self, state)
	{
		draw(self, state)
	}
	
	function MultiPlot(self,DataSeries, measurement)
	{  
		var GRAPH_CANVAS = element(self, 'canvasclass')
		GRAPH_CANVAS.outerHTML = self.CANVAS_HTML_BODY_START + self.css.background_style + self.CANVAS_HTML_BODY_END
		GRAPH_CANVAS = element(self, 'canvasclass') // Yes, this duplicate line is needed since the line 
													// above destroys the element by modifying outerHTML.

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
						color: self.TITLE_COLOR
					  }
		  		 }
		    
		var y_axis = {
					title: measurement,
					titlefont: {
			
						size: 12,
						color: self.TITLE_COLOR
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
						color: self.TITLE_COLOR
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

		while ( i < (DataSeries.length/2) )
		{
			if ( "titles" in self.parameters ){
				var d_title =self.parameters.titles[i]
				colorIndex =  i + Settings(self,"colorIndex",0)
			}
			else
			{
				colorIndex = Settings(self,'colorIndex',7)
			}

			d_shape = Settings(self,'shape','spline')
			d_fill = Settings(self,'fill','')

			if ( Settings(self,'type', "scatter") == "bar" )
			{
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
			else
			{
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
		catch(err) {
			
		}
	}

	function InfluxDB_Data(self,time_filter, entity_id,units)
	{
		var TIME_DATA = '0'
		var VALUE_DATA = '1'
		var http = document.referrer.slice(7,10)
		// If the client request origins from the local network, use a local url to influxdb.
		// The local url is defined in the skin in lack of a better place.
		if (http == "192")
		{
			self.css.influxdb_url = self.css.influxdb_url_local 
		}
		// If an SQL query is present in the parameters, we query the datebase directly with the supplied SQL query.
		if ("sql" in self.parameters)
		{
			var url = self.css.influxdb_url + self.INFLUX_QUERY_PATTERN + self.parameters.sql

			// THIS SHOULD BE CHANGED TO AN ASYNCHRONOUS REQUEST WITH A CALLBACK TO PROCESS THE DATA.
			var r = new XMLHttpRequest()
			r.open("GET", url, false)
			r.send()
			var array = JSON.parse(r.response)
			var values = array['results'][0]['series'][0]['values']
		}
		else
		{
	    	// For entities without the "unit of measurement" attribute, the InfluxDB home_assistant database
			// uses the entity name as the table name.
			if( units == "undefined")
			{
				units = entity_id
			}
			// Remove "domain." from entity name since in the InfluxDB home_assistant database the
			// field names are without the "domain." part of the entity_id.
			var entity = entity_id.substring(entity_id.indexOf(".") + 1)
			
			// if "ds" is present in parameters, we should downsample the data in the query to speed up the query.
			if ("ds" in self.parameters)
			{
				var base_url = self.css.influxdb_url + self.INFLUX_QUERY_PATTERN
				var sql_query = self.INFLUX_SELECT_PATTERN_DS + units + self.INFLUX_WHERE_PATTERN + entity + self.INFLUX_TIME_PATTERN + time_filter 
				var url = base_url + sql_query + " group by time(" + self.parameters.ds + ") fill(linear)"
			}
			else
			// If "ds" is not present in parameters, we use the default query pattern.
			{
				var base_url = self.css.influxdb_url + self.INFLUX_QUERY_PATTERN
				var sql_query = self.INFLUX_SELECT_PATTERN + units + self.INFLUX_WHERE_PATTERN + entity + self.INFLUX_TIME_PATTERN + time_filter 
				var url = base_url + sql_query 
			}
			// THIS SHOULD BE CHANGED TO AN ASYNCHRONOUS REQUEST WITH A CALLBACK TO PROCESS THE DATA.
			var xhr = new XMLHttpRequest()
			xhr.open("GET", url, false)
			xhr.send()
			
			// We only want the "values" part of the response.
			var array = JSON.parse(xhr.response)
			var values = array['results'][0]['series'][0]['values']
		}
		// Now we have the samples in values as [timestamp, value].
		// Calculate suitable downsample to speed up drawing
		// but use the actual number of samples if samples is less then the actual number of samples.
		var number_of_samples = Object.keys(values).length
		var downsample_rate = Math.max(1, parseInt(l / self.parameters.samples))
		var downsample_index = 0
		var current_sample = 0
		var vX = []
		var vY = []

		// Get desired precision from parameters or use default precision.
		var decimals = Settings(self,"decimals", self.NUMBER_OF_DECIMALS)
		// Read the values into our object and adjust timezone since timezone can not be changed in the influx query
		// and downsample as required.
		while ( downsample_index < number_of_samples )
		{
			time = values[downsample_index][TIME_DATA]
			time = new Date(time).toLocaleString(self.LOCALE, { hour12: false,timeZone: self.TIME_ZONE })
			if ( values[downsample_index][VALUE_DATA] != null )
			{
				value = values[downsample_index][VALUE_DATA].toFixed(decimals)
			}
			else{
				value = 0
			}
			
			vY[current_sample] = parseFloat(value)
			vX[current_sample] = time
			downsample_index = downsample_index + downsample_rate
			current_sample = current_sample + 1
		}
		// Return the x and y data series arrays
		return {vX: vX, vY: vY}
	}

	function draw(self, state)
	{
		// Get number of entities to process
	 	var number_of_entities = Object.keys(self.parameters.entities).length
	 	var current_entity_index = 0
		var time_filter = self.parameters.time
		var DataSeriesArray = new Array ()
		
		while(current_entity_index < number_of_entities)
		{
			if(number_of_entities == 1){
			// If we only have one entity to process, get the 'unit_of_measurement' attribute from HA. 
			// If entity has no units attribute
			// we use the entity name as unit since this is how HA has implemented the influxd database column names.
				if( typeof state.attributes !== "undefined" )
				{
					units = state.attributes["unit_of_measurement"]
				}
				else
				{
					units = self.parameters.entities[current_entity_index]
				}
			}
			else
			{
				// If we have multiple entities to process, we expect the unit of measurement to be present as a list 
				// in the parameters.
				units = self.parameters.influxdb_units[current_entity_index]
			}

			units = encodeURI(units)
			// Read data from influxdb.
			var x_y_data =  InfluxDB_Data(self,time_filter, self.parameters.entities[current_entity_index], units)
			DataSeriesArray[current_entity_index * 2] = x_y_data.vX
			DataSeriesArray[current_entity_index * 2 + 1] = x_y_data.vY
			current_entity_index = current_entity_index + 1
		}
		// These unit of measurement replacements could be improved. 
		y_axis_title = decodeURI(units)
		switch (decodeURI(units))
		{
			case "°C":
				y_axis_title = "Grader Celsius"
				break;

			case "W":
				y_axis_title = "Watt"
				break;

			case "%":
				y_axis_title = "Procent"
				break;
		}
		// Plot the graphs.
		MultiPlot(self,DataSeriesArray, decodeURI(y_axis_title))
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

	// Helper function to return element id from class name
	function element(self, class_name)
    {
        return document.getElementById(self.widget_id).getElementsByClassName(class_name)[0] 
    }
}
