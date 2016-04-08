var Universe =  {
	bodyArray: [],
	tickRate: 100,
	timeScale: 1,
	time: 0,
	selectedTexture:"object",
	addBody: function(name, texture, mass, rad, x, y, velX, velY) {
		Universe.bodyArray.push(new Universe.body(name, texture, mass, rad, x, y, velX, velY))
	 },
	 removeBody: function(id) {
		Universe.bodyArray.splice(id, 1) 
	 },
	 getBody: function(i) {
		return Universe.bodyArray[i]
	 },
	 tick: function () {
		 Render.clear()
		 Render.drawGrid()
		 Universe.time += Universe.timeScale / Universe.tickRate
		 get("time").innerHTML = "Time: " + formatTime(Universe.time)
		 if (Universe.bodyArray.length > 250) {
			Universe.bodyArray.splice(0, 1)
		 }
		 for (i in Universe.bodyArray) {
			Universe.getBody(i).preTick()
		 }
		 for (var i = Universe.bodyArray.length - 1; i > -1; i--) {
			 if (Universe.getBody(i).mass == 0 && Universe.getBody(i).rad ==0) {
				Universe.removeBody(i)
			 }
		 }
		 for (i in Universe.bodyArray) {
			Universe.getBody(i).postTick()
			Render.renderObject(Universe.getBody(i).texture, Universe.getBody(i).x, Universe.getBody(i).y, Universe.getBody(i).rad * 2, Universe.getBody(i).rad * 2)
			if (Render.showTrails) {
				Render.renderPath(Universe.getBody(i).x, Universe.getBody(i).y, Universe.getBody(i).velX, Universe.getBody(i).velY)
			}
		}
	 },
	 buttonAdd: function() {
		 Universe.addBody(get("name").value, Universe.selectedTexture, getFloatVal("massCo") * Math.pow(10, getFloatVal("massEx")), getFloatVal("radius"), getFloatVal("x"), getFloatVal("y"), getFloatVal("velX"), getFloatVal("velY"))
		 get("newBody").style.visibility = "hidden"
	 },
	 buttonSet: function() {
		 Universe.timeScale = getFloatVal("timeScale")
		 Render.scale = getFloatVal("renderScale")
		 Render.centerX = getFloatVal("centerX")
		 Render.centerY = getFloatVal("centerY")
	 },
	 buttonZoom: function(amount) {
		Render.scale *= amount
		get("renderScale").value = Render.scale
	 },
	  buttonTime: function(amount) {
		if (amount == 0 && Universe.timeScale == 0) {
			Universe.timeScale = 1
		}
		else {
			Universe.timeScale *= amount
		}
		get("timeScale").value = Universe.timeScale
	 },
	 click: function (evt) {
		get("newBody").style.left= evt.offsetX + 8
		get("newBody").style.top = evt.offsetY + 8
		get("newBody").style.visibility = "visible"
		get("x").value = (evt.offsetX - Math.round(window.innerWidth / 2)) / Render.scale - Render.centerX
		get("y").value = (evt.offsetY - Math.round(window.innerHeight / 2)) / Render.scale - Render.centerY
		get("textureSelect").style.visibility = "hidden"
	 },
	 changeTexture: function(id) {
		Universe.selectedTexture = id
		get("textureSelect").style.visibility = "hidden"
		get("newBody").style.visibility = "visible"
	 },
	 toggleLines: function () {
		 Render.showTrails = (Universe.showTrails ? false : true)
	 }
}

Universe.tickLoop = setInterval(Universe.tick, (1000 / Universe.tickRate))