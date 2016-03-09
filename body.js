Universe.body = function (name, mass, rad, x, y, velX, velY) {
	this.name = name
	this.mass = mass
	this.rad = rad
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