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