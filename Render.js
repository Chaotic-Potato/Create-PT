var Render = {
	canvas: document.getElementById("canvas"),
	context: canvas.getContext("2d"),
	scale: 1,
	centerX: 0,
	centerY: 0,
	showPath: false,
	showTrail: false,
<<<<<<< HEAD
	trailLength: 1,
=======
	trailLength: 1, 
>>>>>>> master
	clear: function () {
		r.context.clearRect(0, 0, r.canvas.width, r.canvas.height)
	},
	renderObject: function (texture, x, y, size) {
		var img = get(texture)
		r.context.drawImage(img, r.getDrawX(x - (size / 2)), r.getDrawY(y - (size / 2)), size * r.scale, size * r.scale)
	},
	drawLine: function (a, b, x, y, color) {
		r.context.strokeStyle=color
		r.context.beginPath()
		r.context.moveTo(a,b)
		r.context.lineTo(x,y)
		r.context.stroke()
	},
	drawGrid: function () {
		var lineDist = 50 / Math.pow(2, Math.floor(Math.log(r.scale) / Math.log(2))) * r.scale
		for (var i = lineDist * Math.floor(-window.innerWidth / 2 / lineDist) + window.innerWidth / 2 + (r.centerX * r.scale % lineDist); i < window.innerWidth ; i+= lineDist) {
			r.drawLine(i,0, i, window.innerHeight, "grey")
		}
		for (var i = lineDist * Math.floor(-window.innerHeight / 2 / lineDist) + window.innerHeight / 2 + (r.centerY * r.scale % lineDist); i < window.innerHeight; i+= lineDist) {
			r.drawLine(0,i, window.innerWidth , i, "grey")
		}
		r.drawLine(0, window.innerHeight / 2 + r.centerY * r.scale , window.innerWidth , window.innerHeight / 2 + r.centerY * r.scale, "white")
		r.drawLine(window.innerWidth / 2 + r.centerX * r.scale, 0, window.innerWidth / 2 + r.centerX * r.scale, window.innerHeight, "white")
	},
	resize: function() {
		r.repos("renderScale", window.innerWidth - 133, 16)
		r.repos("canvas", 0, 0)
		r.repos("zoomIn", window.innerWidth - 53, 16)
		r.repos("zoomOut", window.innerWidth - 27, 16)
		r.repos("settings", window.innerWidth - 280, window.innerHeight - 220)
		r.repos("settingsBtn", window.innerWidth - 75, window.innerHeight - 30)
		r.repos("time", 16, window.innerHeight - 28)
		r.repos("pause", 16, window.innerHeight - 50)
		r.repos("reverse", 48, window.innerHeight - 50)
		r.repos("slow", 72, window.innerHeight - 50)
		r.repos("fast", 104, window.innerHeight - 50)
		r.repos("timeScale", 136, window.innerHeight - 50)
		get("canvas").width = window.innerWidth
		get("canvas").height = window.innerHeight
	},

	repos: function(id, l, t) {
		get(id).style.position = "absolute"
		get(id).style.left = l
		get(id).style.top = t
	},
	getDrawX: function(x) {
		return (x * r.scale + window.innerWidth / 2) + r.centerX * r.scale
	},
	getDrawY: function(y) {
		return (y * r.scale + window.innerHeight / 2) + r.centerY * r.scale
	},
	renderPath: function(x, y, velX, velY) {
		r.drawLine(r.getDrawX(x), r.getDrawY(y), r.getDrawX((velX * u.timeScale) + x), r.getDrawY((velY * u.timeScale) + y), "white")
	},
	move: function(event) {
		var key = String.fromCharCode(event.keyCode)
		func = {
			"w": [r.vert, 1],
			"s": [r.vert, -1], "a" : [r.hor, 1],
			"d" : [r.hor, -1], "f" : [u.buttonZoom, 0.5],
			"r" : [u.buttonZoom, 2],
			"z" : [u.buttonTime, 0.5],
			"x" : [u.buttonTime, 2]
		}
		if (func[key] != undefined) {
			func[key][0](func[key][1])
		}
	},
	hor: function(dir) {
		r.centerX += dir * 50 / r.scale
		get("centerX").value = r.centerX
	},
	vert: function(dir) {
		r.centerY += dir * 50 / r.scale
		get("centerY").value = r.centerY
	},
	togglePath: function () {
		 r.showPath = !r.showPath
		 get("vlBtn").textContent = (r.showPath ? "On" : "Off")
	},
	toggleTrail: function () {
		 r.showTrail = !r.showTrail
		 get("otBtn").textContent = (r.showTrail ? "On" : "Off")
	},
	renderTick: function() {
		if (u.bodyArray.length > 250) {
			u.bodyArray.splice(0, 1)
		 }
		 for (i in u.bodyArray) {
			u.getBody(i).preTick()
		 }
		 for (var i = u.bodyArray.length - 1; i > -1; i--) {
			 if (u.getBody(i).mass == 0 && u.getBody(i).rad ==0) {
				u.removeBody(i)
			 }
		 }
		 for (i in u.bodyArray) {
			u.getBody(i).postTick()
			r.renderObject(u.getBody(i).texture, u.getBody(i).x, u.getBody(i).y, u.getBody(i).rad * 2, u.getBody(i).rad * 2)
			if (r.showPath) {
				r.renderPath(u.getBody(i).x, u.getBody(i).y, u.getBody(i).velX, u.getBody(i).velY)
			}
			if (r.showTrail) {
				for (var j = 1; j < u.getBody(i).prevPoints.length; j++) {
					r.drawLine(r.getDrawX(u.getBody(i).prevPoints[j - 1][0]), r.getDrawY(u.getBody(i).prevPoints[j - 1][1]), r.getDrawX(u.getBody(i).prevPoints[j][0]), r.getDrawY(u.getBody(i).prevPoints[j][1]), "white")
				}
			}
		}
	},
	changeTrailLength: function() {
		r.trailLength = get("tdInp").value / 10
	}
}
var r = Render
document.onkeypress = r.move
window.onresize = r.resize
r.resize()
