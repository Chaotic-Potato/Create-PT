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
		Render.context.drawImage(img, (x - (size / 2)) * Render.scale + 640 + Render.centerX * Render.scale, (y - (size / 2)) * Render.scale + 360 + Render.centerY * Render.scale, size * Render.scale, size * Render.scale)
	}
}