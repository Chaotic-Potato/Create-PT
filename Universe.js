var Universe =  {
	bodyArray: [],
	tickRate: 100,
	timeScale: 1,
	time: 0,
	addBody: function(name, mass, rad, x, y, velX, velY) {
		Universe.bodyArray.push(new Universe.body(name, mass, rad, x, y, velX, velY))
	 },
	 tick: function () {
		 Render.clear()
		 Universe.time += Universe.timeScale / Universe.tickRate
		 document.getElementById("time").innerHTML = "Time: " + formatTime(Universe.time)
		 if (Universe.bodyArray.length > 250) {
			Universe.bodyArray.splice(0, 1)
		 }
		 for (i in Universe.bodyArray) {
			Universe.bodyArray[i].preTick()
		 }
		 for (i in Universe.bodyArray) {
			Render.renderObject("object", Universe.bodyArray[i].x, Universe.bodyArray[i].y, Universe.bodyArray[i].rad, Universe.bodyArray[i].rad)
			Universe.bodyArray[i].postTick()
		 }
	 },
	 buttonAdd: function() {
		 Universe.addBody(document.getElementById("name").value, getFloatVal("mass"), getFloatVal("radius"), getFloatVal("x"), getFloatVal("y"), getFloatVal("velX"), getFloatVal("velY"))
	 },
	 buttonSet: function() {
		 Universe.timeScale = getFloatVal("timeScale")
		 Render.scale = getFloatVal("renderScale")
		 Render.centerX = getFloatVal("centerX")
		 Render.centerY = getFloatVal("centerY")
	 },
	 buttonZoom: function(dir) {
		if (dir == 1) {
			Render.scale *= 2
		}
		else {
			Render.scale /= 2
		}
		document.getElementById("renderScale").value = Render.scale
	 }
}