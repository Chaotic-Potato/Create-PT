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
			if (Universe.bodyArray[i] != this && (this.rad != 0 || this.mass !=0) && (Universe.bodyArray[i].rad != 0 || Universe.bodyArray[i].mass !=0)) {
				if (Math.sqrt(Math.pow((Universe.bodyArray[i].x - this.x), 2) + Math.pow((Universe.bodyArray[i].y - this.y), 2)) > Universe.bodyArray[i].rad) {
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
				else {
					Universe.addBody("New Object", this.mass + Universe.bodyArray[i].mass, Math.pow((Math.pow(this.rad, 3) + Math.pow(Universe.bodyArray[i].rad, 3)), (1/3)), newVelPos(this.x, Universe.bodyArray[i].x, this.mass, Universe.bodyArray[i].mass), newVelPos(this.y, Universe.bodyArray[i].y, this.mass, Universe.bodyArray[i].mass), newVelPos(this.velX, Universe.bodyArray[i].velX, this.mass, Universe.bodyArray[i].mass), newVelPos(this.velY, Universe.bodyArray[i].velY, this.mass, Universe.bodyArray[i].mass))
					this.mass = 0
					this.rad = 0
					Universe.bodyArray[i]. mass = 0
					Universe.bodyArray[i].rad = 0
				}
			}
		}
	},
	postTick: function () {
		this.x += this.velX / Universe.tickRate * Universe.timeScale
		this.y += this.velY / Universe.tickRate * Universe.timeScale
	}
}