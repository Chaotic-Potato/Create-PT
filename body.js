Universe.body = function (name, texture, mass, rad, x, y, velX, velY) {
	this.name = name
	this.texture = texture
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
			if (Universe.getBody(i) != this && (this.rad != 0 || this.mass !=0) && (Universe.getBody(i).rad != 0 || Universe.getBody(i).mass !=0)) {
				if (Math.sqrt(Math.pow((Universe.getBody(i).x - this.x), 2) + Math.pow((Universe.getBody(i).y - this.y), 2)) > Universe.getBody(i).rad) {
					var direction = Math.atan((Universe.getBody(i).y - this.y) / (Universe.getBody(i).x - this.x))
					direction = (Universe.getBody(i).x > this.x ? direction  % (Math.PI * 2) : direction + Math.PI)
					var velD = Universe.getBody(i).mass / (Math.pow((Universe.getBody(i).x - this.x), 2) + Math.pow((Universe.getBody(i).y - this.y), 2))
					this.velX += Math.cos(direction) *  velD / Universe.tickRate * Universe.timeScale
					this.velY += Math.sin(direction) *  velD  / Universe.tickRate * Universe.timeScale
				}
				else {
					var texture = (this.mass > Universe.getBody(i).mass ? this.texture : Universe.getBody(i).texture)
					var mass = this.mass + Universe.getBody(i).mass
					var rad = Math.pow((Math.pow(this.rad, 3) + Math.pow(Universe.getBody(i).rad, 3)), (1/3))
					var x =newVelPos(this.x, Universe.getBody(i).x, this.mass, Universe.getBody(i).mass)
					var y = newVelPos(this.y, Universe.getBody(i).y, this.mass, Universe.getBody(i).mass)
					var velX = newVelPos(this.velX, Universe.getBody(i).velX, this.mass, Universe.getBody(i).mass)
					var velY = newVelPos(this.velY, Universe.getBody(i).velY, this.mass, Universe.getBody(i).mass)
					Universe.addBody("New Object",  texture ,mass , rad, x, y, velX, velY)
					this.mass = 0
					this.rad = 0
					Universe.getBody(i). mass = 0
					Universe.getBody(i).rad = 0
				}
			}
		}
	},
	postTick: function () {
		this.x += this.velX / Universe.tickRate * Universe.timeScale
		this.y += this.velY / Universe.tickRate * Universe.timeScale
	}
}