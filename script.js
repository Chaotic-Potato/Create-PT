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

Universe.body = function (name, mass, x, y, velX, velY) {
	this.name = name
	this.mass = mass
	this.x = x
	this.y = y
	this.velX = velX
	this.velY = velY
}

Universe.body.prototype = {
	preTick: function () {
		for (i in  Universe.bodyArray){
			if (Universe.bodyArray[i] != this) {
				if (Universe.bodyArray[i].x > this.x) {
					var direction = Math.atan((Universe.bodyArray[i].y - this.y) / (Universe.bodyArray[i].x - this.x))  % (Math.PI * 2)
				}
				else {
					var direction = Math.atan((Universe.bodyArray[i].y - this.y) / (Universe.bodyArray[i].x - this.x)) + Math.PI
				}
				var velD = Universe.bodyArray[i].mass / (Math.pow((Universe.bodyArray[i].x - this.x), 2) + Math.pow((Universe.bodyArray[i].y - this.y), 2))
				this.velX += Math.cos(direction) *  velD / Universe.tickRate * Universe.timeScale
				this.velY += Math.sin(direction) *  velD  / Universe.tickRate * Universe.timeScale
			}
		}
	},
	postTick: function () {
		this.x += this.velX / Universe.tickRate * Universe.timeScale
		this.y += this.velY / Universe.tickRate * Universe.timeScale
	}
}

var Render = {
	canvas: document.getElementById("canvas"),
	context: canvas.getContext("2d"),
	scale: 1,
	centerX: 0,
	centerY: 0,
	clear: function () {
		Render.context.clearRect(0, 0, Render.canvas.width, Render.canvas.height)
	},
	renderObject: function (texture, x, y, size) {
		var img = document.getElementById(texture)
		Render.context.drawImage(img, (x - (size / 2)) / Render.scale + 640 + Render.centerX, (y - (size / 2)) / Render.scale + 360 + Render.centerY, size / Render.scale, size / Render.scale)
	}
}

function getFloatVal(id) {
	return parseFloat(document.getElementById(id).value)
}

tickLoop = setInterval(Universe.tick, (1000 / Universe.tickRate))