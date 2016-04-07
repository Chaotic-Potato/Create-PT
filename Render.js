var Render = {
	canvas: document.getElementById("canvas"),
	context: canvas.getContext("2d"),
	scale: 1,
	centerX: 0,
	centerY: 0,
	showTrails: false,
	clear: function () {
		Render.context.clearRect(0, 0, Render.canvas.width, Render.canvas.height)
	},
	renderObject: function (texture, x, y, size) {
		var img = get(texture)
		Render.context.drawImage(img, (x - (size / 2)) * Render.scale + window.innerWidth / 2 + Render.centerX * Render.scale, (y - (size / 2)) * Render.scale + window.innerHeight / 2 + Render.centerY * Render.scale, size * Render.scale, size * Render.scale)
	},
	drawLine: function (a, b, x, y, color) {
		Render.context.strokeStyle=color
		Render.context.beginPath()
		Render.context.moveTo(a,b)
		Render.context.lineTo(x,y)
		Render.context.stroke()
	},
	drawGrid: function () {
		var lineDist = 50 / Math.pow(2, Math.floor(Math.log(Render.scale) / Math.log(2))) * Render.scale
		for (var i = lineDist * Math.floor(-window.innerWidth / 2 / lineDist) + window.innerWidth / 2 + (Render.centerX * Render.scale % lineDist); i < window.innerWidth ; i+= lineDist) {
			Render.drawLine(i,0, i, window.innerHeight, "grey")
		}
		for (var i = lineDist * Math.floor(-window.innerHeight / 2 / lineDist) + window.innerHeight / 2 + (Render.centerY * Render.scale % lineDist); i < window.innerHeight; i+= lineDist) {
			Render.drawLine(0,i, window.innerWidth , i, "grey")
		}
		Render.drawLine(0, window.innerHeight / 2 + Render.centerY * Render.scale , window.innerWidth , window.innerHeight / 2 + Render.centerY * Render.scale, "white")
		Render.drawLine(window.innerWidth / 2 + Render.centerX * Render.scale, 0, window.innerWidth / 2 + Render.centerX * Render.scale, window.innerHeight, "white")
	},
	resize: function() {
		Render.repos("renderScale", window.innerWidth - 103, 16)
		Render.repos("canvas", 0, 0)
		Render.repos("zoomIn", window.innerWidth - 53, 16)
		Render.repos("zoomOut", window.innerWidth - 27, 16)
		Render.repos("settingsBtn", window.innerWidth - 75, window.innerHeight - 30)
		Render.repos("time", 16, window.innerHeight - 28)
		Render.repos("pause", 16, window.innerHeight - 50)
		Render.repos("reverse", 48, window.innerHeight - 50)
		Render.repos("slow", 72, window.innerHeight - 50)
		Render.repos("fast", 104, window.innerHeight - 50)
		Render.repos("timeScale", 136, window.innerHeight - 50)
		get("canvas").width = window.innerWidth
		get("canvas").height = window.innerHeight
	},
	repos: function(id, l, t) {
		get(id).style.position = "absolute"
		get(id).style.left = l
		get(id).style.top = t
	},
	renderPath: function(x, y, velX, velY) {
		Render.drawLine(x * Render.scale + window.innerWidth / 2 + Render.centerX * Render.scale, y * Render.scale + window.innerHeight / 2 + Render.centerY * Render.scale, ((velX * Universe.timeScale) + x) * Render.scale + window.innerWidth / 2, ((velY * Universe.timeScale) + y) * Render.scale + window.innerHeight / 2 + Render.centerY * Render.scale, "white")
	}
}

window.onresize = Render.resize
Render.resize()
