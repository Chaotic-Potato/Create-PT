u.body = function (name, texture, mass, rad, x, y, velX, velY) {
	this.name = name
	this.texture = texture
	this.mass = mass
	this.rad = rad
	this.x = x
	this.y = y
	this.velX = velX
	this.velY = velY
	this.prevPoints = []
}

u.body.prototype = {
	preTick: function () {
		for (i in  u.bodyArray){
			if (u.getBody(i) != this && (this.rad != 0 || this.mass !=0) && (u.getBody(i).rad != 0 || u.getBody(i).mass !=0)) {
				if (Math.sqrt(Math.pow((u.getBody(i).x - this.x), 2) + Math.pow((u.getBody(i).y - this.y), 2)) > u.getBody(i).rad) {
					var direction = Math.atan((u.getBody(i).y - this.y) / (u.getBody(i).x - this.x))
					direction = (u.getBody(i).x > this.x ? direction  % (Math.PI * 2) : direction + Math.PI)
					var velD = u.getBody(i).mass / (Math.pow((u.getBody(i).x - this.x), 2) + Math.pow((u.getBody(i).y - this.y), 2))
					this.velX += Math.cos(direction) *  velD / u.tickRate * u.timeScale
					this.velY += Math.sin(direction) *  velD  / u.tickRate * u.timeScale
				}
				else {
					var texture = (this.mass > u.getBody(i).mass ? this.texture : u.getBody(i).texture)
					var mass = this.mass + u.getBody(i).mass
					var rad = Math.pow((Math.pow(this.rad, 3) + Math.pow(u.getBody(i).rad, 3)), (1/3))
					var x =newVelPos(this.x, u.getBody(i).x, this.mass, u.getBody(i).mass)
					var y = newVelPos(this.y, u.getBody(i).y, this.mass, u.getBody(i).mass)
					var velX = newVelPos(this.velX, u.getBody(i).velX, this.mass, u.getBody(i).mass)
					var velY = newVelPos(this.velY, u.getBody(i).velY, this.mass, u.getBody(i).mass)
					u.addBody("New Object",  texture ,mass , rad, x, y, velX, velY)
					this.mass = 0
					this.rad = 0
					u.getBody(i). mass = 0
					u.getBody(i).rad = 0
				}
			}
		}
	},
	postTick: function () {
		this.x += this.velX / u.tickRate * u.timeScale
		this.y += this.velY / u.tickRate * u.timeScale
		this.prevPoints.push([this.x, this.y])
		while (this.prevPoints.length > r.trailLength * 100 + 1) {
			this.prevPoints.splice(0, 1)
		}
	}
}