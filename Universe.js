var Universe =  {
	bodyArray: [],
	tickRate: 100,
	timeScale: 1,
	time: 0,
	selectedTexture:"object",
	addBody: function(name, texture, mass, rad, x, y, velX, velY) {
		u.bodyArray.push(new u.body(name, texture, mass, rad, x, y, velX, velY))
	 },
	 removeBody: function(id) {
		u.bodyArray.splice(id, 1) 
	 },
	 getBody: function(i) {
		return u.bodyArray[i]
	 },
	 tick: function () {
		 Render.clear()
		 Render.drawGrid()
		 u.time += u.timeScale / u.tickRate
		 get("time").innerHTML = "Time: " + formatTime(u.time)
		 Render.renderTick()
	 },
	 buttonAdd: function() {
		 u.addBody(get("name").value, u.selectedTexture, getFloatVal("massCo") * Math.pow(10, getFloatVal("massEx")), getFloatVal("radius"), getFloatVal("x"), getFloatVal("y"), getFloatVal("velX"), getFloatVal("velY"))
		 get("newBody").style.visibility = "hidden"
	 },
	 buttonSet: function() {
		 u.timeScale = getFloatVal("timeScale")
		 Render.scale = getFloatVal("renderScale")
		 Render.centerX = getFloatVal("centerX")
		 Render.centerY = getFloatVal("centerY")
	 },
	 buttonZoom: function(amount) {
		Render.scale *= amount
		get("renderScale").value = Render.scale
	 },
	  buttonTime: function(amount) {
		if (amount == 0 && u.timeScale == 0) {
			u.timeScale = 1
		}
		else {
			u.timeScale *= amount
		}
		get("timeScale").value = u.timeScale
	 },
	 click: function (evt) {
		get("newBody").style.left = evt.offsetX + (evt.offsetX > window.innerWidth / 2 ? -202 : 0)
		get("newBody").style.top = evt.offsetY + (evt.offsetY > window.innerHeight / 2 ? -238 : 0)
		get("newBody").style.visibility = "visible"
		get("x").value = (evt.offsetX - Math.round(window.innerWidth / 2)) / Render.scale - Render.centerX
		get("y").value = (evt.offsetY - Math.round(window.innerHeight / 2)) / Render.scale - Render.centerY
		get("textureSelect").style.visibility = "hidden"
	 },
	 changeTexture: function(id) {
		u.selectedTexture = id
		get("textureSelect").style.visibility = "hidden"
		get("newBody").style.visibility = "visible"
	 }
}
var u = Universe
u.tickLoop = setInterval(u.tick, (1000 / u.tickRate))