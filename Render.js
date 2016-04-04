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
		var img = get(texture)
		Render.context.drawImage(img, (x - (size / 2)) * Render.scale + 640 + Render.centerX * Render.scale, (y - (size / 2)) * Render.scale + 360 + Render.centerY * Render.scale, size * Render.scale, size * Render.scale)
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
		for (var i = lineDist * Math.floor(-640 / lineDist) + 640 + (Render.centerX * Render.scale % lineDist); i < 1280; i+= lineDist) {
			Render.drawLine(i,0, i, 720, "grey")
		}
		for (var i = lineDist * Math.floor(-360 / lineDist) + 360 + (Render.centerY * Render.scale % lineDist); i < 720; i+= lineDist) {
			Render.drawLine(0,i, 1280, i, "grey")
		}
		Render.drawLine(0, 360 + Render.centerY * Render.scale , 1280, 360 + Render.centerY * Render.scale, "white")
		Render.drawLine(640 + Render.centerX * Render.scale, 0, 640 + Render.centerX * Render.scale, 720, "white")
	}
}