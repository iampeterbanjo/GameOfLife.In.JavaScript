(function () {
	// Grid defines the 2D world in which the game
	// plays out
	var _ = self.Grid = function (height, width) {
		var rows = new Array(height)
				, columns

		for (var i = 0; i < rows.length; i++) {
			columns = rows[i] = new Array(width)
		}
		this._grid = rows
		this.width = columns.length // columns
		this.height = rows.length // rows
	}

	_.prototype = {
		// create life on the grid
		spawn: function (y, x) {
			if (y < this.height && x < this.width) {
				this._grid[y][x] = true
			} else {
				throw new Error("Invalid grid position")
			}
		}
		// is a location on the grid alive?
		, isAlive: function (y, x) {
			var alive = false
			console.log(this._grid);
			if (y < this.height && x < this.width) {
				alive = this._grid[y][x]
			}
			return alive
		}
		// how many neighbours at this location
		, aliveNeighbours: function (y, x) {
			var me = this
					, sum = 0
					, left = [x - 1]
					, right = [x + 1]
					, top = [y + 1]
					, bottom = [y - 1]
					// the positions around this point in the
					// grid where neighbours can be found
					, neighbours = [
						[[y], left]
						, [top, left]
						, [top, [x]]
						, [top, right]
						, [[y], right]
						, [bottom, right]
						, [bottom, [x]]
						, [bottom, left]
					]
			
			neighbours.forEach(function (n) {
				if (!(left < 0 || right > this.width || top > this.height || bottom < 0) 
				&& me.isAlive(n[0], n[1])) {
					sum += 1
				}
			})

			return sum
		}
		, kill: function(y, x) {
			this._grid[y][x] = false
		}
		, next: function() {
			for (var x = 0; x < this.width; x++) {
				for (var y = 0; y < this.height; y++) {
					if(this.aliveNeighbours(y, x) <= 2 ) {
						this.kill(y, x)
					}
				}
			}
		}
	}
})()