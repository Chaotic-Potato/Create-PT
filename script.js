var Universe =  {
	 bodyArray: [],
	 addBody: function(name, mass, x, y, velX, velY) {
		Universe.bodyArray.push(new Universe.body(name, mass, x, y, velX, velY))
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

var Render = {
	canvas: document.getElementById("canvas"),
	context: canvas.getContext("2d"),
	clear: function () {
		Render.context.clearRect(0, 0, Render.canvas.width, Render.canvas.height)
	},
	renderObject: function (texture, x, y, size) {
		var img = document.getElementById(texture)
		Render.context.drawImage(img, x - (size / 2), y - (size / 2), size, size)
	}
}