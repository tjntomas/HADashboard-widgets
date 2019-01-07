function baseswipe_light(widget_id, url, skin, parameters)
{
    self = this

    self.widget_id = widget_id

    self.parameters = parameters

    self.OnButtonClick = OnButtonClick
    self.OnClick = OnClick

    var callbacks =
        [
            {"selector": '#' + widget_id + ' #cp', "action": "click", "callback": self.OnButtonClick},
            {"selector": '#' + widget_id + ' #icon', "action": "touchstart", "callback": self.OnClick},
            {"selector": '#' + widget_id + ' #icon', "action": "click", "callback": self.OnClick}
        ]

    self.OnStateAvailable = OnStateAvailable
    self.OnStateUpdate = OnStateUpdate

    if ("entity" in parameters)
    {
        var monitored_entities =
            [
                {"entity": parameters.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
            ]
    }
    else
    {
        var monitored_entities =  []
    }

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks)
    wd = document.getElementById(widget_id)
    rect = wd.getBoundingClientRect()
    self.widget_height = Math.min(parseInt(rect.height), parseInt(rect.width))
    element(self, "frame").style.height = self.widget_height-2 + "px"
    element(self, "frame").style.width = self.widget_height-2 + "px"
    element(self, "w3-modal").style.left = (rect.width -self.widget_height) / 2 + "px"

    for ( event of ["touchmove", "touchstart", "touchend"] ){
        element(self, "w3-modal").addEventListener(event, color_wheel_touch.bind(self), false)
     }

     for ( event of ["touchmove", "touchstart", "touchend"] ){
        element(self, "swipezone").addEventListener(event, slider_touch.bind(self), false)
     }

     for ( event of ["mousemove", "mouseup", "mousedown"] ){
        element(self, "w3-modal").addEventListener(event, color_wheel_click.bind(self), false)
     }

     for ( event of ["mousemove", "mouseup", "mousedown"] ){ 
        element(self, "swipezone").addEventListener(event, slider_click.bind(self), false)
     }
     
    
    function OnClick(self){
       if (self.state == "on"){
        var args = self.parameters.post_service_inactive
       }else
       {
        var args = self.parameters.post_service_active
       }
      
        self.call_service(self, args)
    }

    function OnButtonClick(self)
    {        
        if (self.modal.style.display == "none")
        {
            self.modal.style.display ="block"
            self.el.style.display = "none"
            self.timer_start = setTimeout(function () {
                self.modal.style.display ="none"
                self.el.style.display = "block"
              }, 3000)
        }
        else
        {
            self.modal.style.display ="none"
            self.el.style.display = "block"
            clearTimeout(self.timer_start)
        }
    }

    function OnStateAvailable(self, state)
    {
        self.min = 0
        self.max = 255
        self.step = 1
        self.level = 0
        self.state = state.state
        set_view(self)
        self.state_entity = state
        if ( !("brightness" in state.attributes))
        {
            state.attributes.brightness = 0
        }
               
        var el = element(self,'swipezone')
        var modal = element(self,'w3-modal')
        var picker = element(self,'picker')

        var circle = element(self,'circle')
        var info = element(self,'info')
        var line = element(self,'line')
        var center = element(self,'center')

        if( !("rgb_color" in state.attributes))
        {
            state.attributes.rgb_color = [100,100,100]
        }
        self.rgb = state.attributes.rgb_color
        self.last_rgb_color = state.attributes.rgb_color
    
        self.swipe_width = line.offsetWidth  -20
        self.el = el
        self.modal = modal
        self.line = line
        self.info = info
        self.circle = circle
        self.center = center
        self.picker = picker
        self.circle.style.position = "absolute"
        //self.circle.style.background = self.parameters.static_css.button_color
        self.modal.style.display ="none"
        self.fine_adj = 1
        var rv =self.rgb[0]
        var gv =self.rgb[1]
        var bv =self.rgb[2]
       
        var i = parseFloat(self.state_entity.attributes.brightness/255 + 0.2)
        var bg_color = GetGradient(rv,gv,bv, i)
       
        self.center.style.background = bg_color

        self.circle.style.left = state.attributes.brightness/254*self.swipe_width + "px"
        self.current_level = parseInt(state.attributes.brightness)
        
        var b = document.body;
        var c = picker
        var a = c.getContext('2d')
       
/*
        window.onclick = function(event)
        {
            if (event.target == document.getElementById(self.widget_id)) {
                self.modal.style.display = "none"
                
            }
        }*/
        document.body.clientWidth;

        (function() {

            var doc = document
            doc.c = doc.createElement
            b.a = b.appendChild
            
            var width = c.width = c.height = self.widget_height,
                        imageData = a.createImageData(width, width),
                        pixels = imageData.data,
                        oneHundred = 100,
                        circleOffset = 0,
                        diameter = width-circleOffset*2,
                        radius = diameter / 2,
                        radiusPlusOffset = radius + circleOffset
                        radiusSquared = radius * radius,
                        two55 = 255,
                        currentY = -0,
                        currentX = -0,
                        wheelPixel = circleOffset*4*width+circleOffset*4;
                        self.radiusPlusOffset = radiusPlusOffset
                        self.radius = radius
                        self.radiusSquared = radiusSquared

            var math =  Math,
                        PI = math.PI,
                        PI2 = PI * 2,
                        sqrt = math.sqrt,
                        atan2 = math.atan2;
                        self.math = math
                        self.PI = PI
                        self.PI2 = PI2
           
            for (y = 0; y < width; y++)
            {
                for (x = 0; x < width; x++) 
                {
                    var rx = x - radius,
                        ry = y - radius,
                        d = rx * rx + ry * ry,
                        rgb = hsvToRgb(
                            (atan2(ry, rx) + PI) / PI2,     // Hue
                            sqrt(d) / radius,               // Saturation
                            1                               // Value
                        )

                    pixels[wheelPixel++] = rgb[0]
                    pixels[wheelPixel++] = rgb[1]
                    pixels[wheelPixel++] = rgb[2]
                    pixels[wheelPixel++] = d > radiusSquared ? 0 : two55
                }
            }
            
            c.onmousedown = doc.onmouseup = function(e)
            {
                doc.onmousemove = /p/.test(e.type) ? 0 : (redraw(e), redraw)
            }
        
            function redraw(e) {
                w = self.picker.getBoundingClientRect()
                self.ox = w.left
                self.oy = w.top
                if( self.mouse_state == "down")
                {
                    currentX = self.mouse_x - c.offsetLeft - self.radiusPlusOffset - self.ox 
                    currentY = self.mouse_y - c.offsetTop - self.radiusPlusOffset - self.oy
                }
                else
                {
                    currentX = e.pageX - c.offsetLeft - self.radiusPlusOffset - self.ox 
                    currentY = e.pageY - c.offsetTop - self.radiusPlusOffset - self.oy
                }
               

 
                var theta = atan2(currentY, currentX),
                d = currentX * currentX + currentY * currentY;
 
                if (d > self.radiusSquared) {
                    currentX = self.radius * self.math.cos(theta)
                    currentY = self.radius * self.math.sin(theta)
                    theta = atan2(currentY, currentX);
                    d = currentX * currentX + currentY * currentY
                }
                if(isNaN(e.pageX))
                {}
                else
                {
                self.rgb = hsvToRgb(
                    (theta + self.PI) / self.PI2,         
                    sqrt(d) / self.radius,1)
                }       

                if(isNaN(e.pageX))
                {
                    a.putImageData(imageData, 0, 0)
                }

                var rv = self.rgb[0]
                var gv = self.rgb[1]
                var bv = self.rgb[2]
                var i = parseFloat(self.state_entity.attributes.brightness/255 + 0.2)
                bg_color = GetGradient(rv,gv,bv, i)
                self.center.style.background = bg_color
            }
            

            function hsvToRgb(h, s, v) {
                h*=6;
                var i = ~~h,
                    f = h - i,
                    p = v * (1 - s),
                    q = v * (1 - f * s),
                    t = v * (1 - (1 - f) * s),
                    mod = i % 6,
                    r = parseInt(Math.min(254,Math.max(0,[v, q, p, p, t, v][mod] * two55))),
                    g = parseInt(Math.min(254,Math.max(0,[t, v, v, q, p, p][mod] * two55))),
                    b = parseInt(Math.min(254,Math.max(0,[p, p, t, v, v, q][mod] * two55)));
                return [r, g, b, "rgb("+ ~~r + "," + ~~g + "," + ~~b + ")"]
            }
            self.redraw = redraw
            redraw(0)
        })()

        set_view(self)

        //swipedetect(el, function(swipedir){}, self, state)
    }

    async function color_wheel_touch(event){
        event.preventDefault()
       
        var self = this
        if (event.type == "touchend"){
            var args = self.parameters.post_service_active
            args["rgb_color"] = parseInt(self.rgb[0]) + "," + parseInt(self.rgb[1]) + "," + parseInt(self.rgb[2])
            self.last_rgb_color = self.rgb
            self.call_service(self, args)
            restart_timer(self)
        }
        else
        {
            self.redraw(event.changedTouches[0])
        }
      
    }

    async function color_wheel_click(event){
        var self = this
        event.preventDefault()
        if (event.type == "mouseup"){
            var args = self.parameters.post_service_active
            args["rgb_color"] = parseInt(self.rgb[0]) + "," + parseInt(self.rgb[1]) + "," + parseInt(self.rgb[2])
            self.last_rgb_color = self.rgb
            self.call_service(self, args)
            restart_timer(self)
        }

        if (event.type == "mousedown"){
            restart_timer(self)
        }
    }

    async function slider_touch(event){
        event.preventDefault()
        if (event.target.id === "click_area"){
            return 
        }
       
        var self = this
        if (event.type == "touchstart"){
            self.mouse_state = "down"
        }
        if (event.type == "touchend"){
            self.mouse_state = "up"
            var args = self.parameters.post_service_active
            args["brightness"] = parseInt(self.level *2.55)
            self.call_service(self, args)
        }

        if (event.type == "touchmove" && self.mouse_state == "down"){
            var swipe_area = self.el.getBoundingClientRect()
            var x = event.changedTouches[0].pageX - swipe_area.left -12
            var x_pos = Math.min(x,self.swipe_width)
            x_pos = Math.max(0,x_pos)
            self.level = parseInt(x_pos/self.swipe_width*100)
            self.circle.style.left = x_pos - self.circle.style.width  + "px"
        }
    }

    async function slider_click(event){
        var self = this
        if (event.type == "mousedown"){
            self.mouse_state = "down"
        }
        if (event.type == "mouseup"){
            self.mouse_state = "up"
            var args = self.parameters.post_service_active
            args["brightness"] = parseInt(self.level *2.55)
            self.call_service(self, args)
        }
        if (event.type == "mousemove" && self.mouse_state == "down"){
           
            var swipe_area = self.el.getBoundingClientRect()
            var x = event.clientX-swipe_area.left -12
            var x_pos = Math.min(x,self.swipe_width)
            x_pos = Math.max(0,x_pos)
            self.level = parseInt(x_pos/self.swipe_width*100)
            self.circle.style.left = x_pos - self.circle.style.width  + "px"
        }
    }

    function restart_timer(self){
        clearTimeout(self.timer_start)
        self.timer_start = setTimeout(function () {
            self.modal.style.display ="none"
            self.el.style.display = "block"
        }, 3000)
    }

    function OnStateUpdate(self, state)
    {
        self.min = 0
        self.max = 255
        self.step = 1
        if ( !("brightness" in state.attributes) )
        {
            state.attributes.brightness = 0
        }

        if( !("rgb_color" in state.attributes))
        {
            if ( !("last_rgb_color" in self))
            {
                state.attributes.rgb_color = [100,100,100]
            }
            else
            {
                state.attributes.rgb_color = self.last_rgb_color
            }
        }
        self.rgb = state.attributes.rgb_color
        self.state = state.state
        self.state_entity = state
        self.circle.style.position = "absolute"
        self.circle.style.left = state.attributes.brightness/254*self.swipe_width + "px"
        self.current_level = parseInt(state.attributes.brightness)
        
        var rv =self.rgb[0]
        var gv =self.rgb[1]
        var bv =self.rgb[2]
        var i = parseFloat(self.state_entity.attributes.brightness/255 + 0.2)
        bg_color = GetGradient(rv,gv,bv, i)
        self.center.style.background = bg_color
        set_view(self)
    }

	function set_view(self)
    {
    
        if (self.state == "on"){
            self.set_icon(self, "icon", self.icons.icon_on)
            self.set_field(self, "icon_style", self.css.icon_style_active)
        }
        else
        {
            self.set_icon(self, "icon", self.icons.icon_off)
            self.set_field(self, "icon_style", self.css.icon_style_inactive)
        }
       

    }
       
    function element(self,class_name)
    {
        return document.getElementById(self.widget_id).getElementsByClassName(class_name)[0] 
    }

    function GetGradient(r,g,b,i)
    {
        i = Math.min(1,i)
        return "linear-gradient( \
        rgba(" + r + ", " + g + ", " + b + "," + i + "), \
        rgba(" + parseInt((r*0.9)) + ", " + parseInt((g*0.9)) + ", " + parseInt((b*0.9)) + "," + (i*0.9) + "), \
        rgba(" + parseInt((r*0.75)) + ", " + parseInt((g*0.75)) + ", " + parseInt((b*0.75)) + "," + (i*0.85) + "), \
        rgba(" + parseInt((r*0.60)) + ", " + parseInt((g*0.6)) + ", " + parseInt((b*0.6)) + "," + (i*0.80) + "), \
        rgba(" + parseInt((r*0.45)) + ", " + parseInt((g*0.45)) + ", " + parseInt((b*0.45)) + "," + (i*0.75) + ")"
        
    }

    

}