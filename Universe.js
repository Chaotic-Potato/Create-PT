var Universe =  {
	bodyArray: [],
	tickRate: 100,
	timeScale: 1,
	addBody: function(name, mass, x, y, velX, velY) {
		Universe.bodyArray.push(new Universe.body(name, mass, x, y, velX, velY))
	 },
	 tick: function () {
		 Render.clear()
		 if (Universe.bodyArray.length > 250) {
			Universe.bodyArray.splice(0, 1)
		 }
		 for (i in Universe.bodyArray) {
			Universe.bodyArray[i].preTick()
		 }
		 for (i in Universe.bodyArray) {
			Render.renderObject("object", Universe.bodyArray[i].x, Universe.bodyArray[i].y, Math.pow((Universe.bodyArray[i].mass), (1/3)), Math.pow((Universe.bodyArray[i].mass), (1/3)))
			Universe.bodyArray[i].postTick()
		 }
	 },
	 buttonAdd: function() {
		 Universe.addBody(document.getElementById("name").value, getFloatVal("mass"), getFloatVal("x"), getFloatVal("y"), getFloatVal("velX"), getFloatVal("velY"))
	 },
	 buttonSet: function() {
		 Universe.timeScale = getFloatVal("timeScale")
		 Render.scale = getFloatVal("renderScale")
		 Render.centerX = getFloatVal("centerX")
		 Render.centerY = getFloatVal("centerY")
	 }
}