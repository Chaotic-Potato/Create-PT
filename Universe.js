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
		 document.getElementById("time").innerHTML = "Time: " + formatTime(Universe.time)
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
		 }
	 },
	 buttonAdd: function() {
		 Universe.addBody(document.getElementById("name").value, Universe.selectedTexture, getFloatVal("massCo") * Math.pow(10, getFloatVal("massEx")), getFloatVal("radius"), getFloatVal("x"), getFloatVal("y"), getFloatVal("velX"), getFloatVal("velY"))
		 document.getElementById("newBody").style.visibility = "hidden"
	 },
	 buttonSet: function() {
		 Universe.timeScale = getFloatVal("timeScale")
		 Render.scale = getFloatVal("renderScale")
		 Render.centerX = getFloatVal("centerX")
		 Render.centerY = getFloatVal("centerY")
	 },
	 buttonZoom: function(amount) {
		Render.scale *= amount
		document.getElementById("renderScale").value = Render.scale
	 },
	  buttonTime: function(amount) {
		if (amount == 0 && Universe.timeScale == 0) {
			Universe.timeScale = 1
		}
		else {
			Universe.timeScale *= amount
		}
		document.getElementById("timeScale").value = Universe.timeScale
	 },
	 click: function (evt) {
		document.getElementById("newBody").style.left= evt.offsetX + 8
		document.getElementById("newBody").style.top = evt.offsetY + 8
		document.getElementById("newBody").style.visibility = "visible"
		document.getElementById("x").value = (evt.offsetX - 640) / Render.scale - Render.centerX * Render.scale
		document.getElementById("y").value = (evt.offsetY - 360) / Render.scale - Render.centerY * Render.scale
		document.getElementById("textureSelect").style.visibility = "hidden"
	 },
	 closeNewBodyDiv: function() {
		 document.getElementById("newBody").style.visibility = "hidden"
	 },
	 changeTexture: function(id) {
		Universe.selectedTexture = id
		document.getElementById("textureSelect").style.visibility = "hidden"
		document.getElementById("newBody").style.visibility = "visible"
	 }
}