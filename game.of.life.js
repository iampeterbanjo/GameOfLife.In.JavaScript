(function () {
	// Grid defines the 2D world in which the game
	// plays out
	var _ = self.Grid = function (height, width) {
		var rows = new Array(height)

		for (var i = 0; i < rows.length; i++) {
			rows[i] = new Array(width)
		}
		this._grid = rows
		this.width = width // columns
		this.height = height // rows
	}

	_.prototype = {
		// create life on the grid
		spawn: function (y, x) {
			if (y < this.height && x < this.width) {
				this._grid[y][x] = true
			}
		}
		, isAlive: function (y, x) {
			var alive = false
			if (y < this.height && x < this.width) {
				alive = this._grid[y][x]
			}
			return alive
		}
	}
})()