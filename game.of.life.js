(function () {
	// Grid defines the 2D world in which the game
	// plays out
	var _ = self.Grid = function (width, height) {
		var rows = new Array(width)
				, columns

		for (var i = 0; i < rows.length; i++) {
			columns = rows[i] = new Array(height)
		}
		this._grid = rows
		this.height = columns.length // columns
		this.width = rows.length // rows
	}

	_.prototype = {
		// create life on the grid
		spawn: function (x, y) {
			if (y < this.height && x < this.width) {
				this._grid[x][y] = true
			} else {
				throw new Error("Invalid grid position")
			}
		}
		// is a location on the grid alive?
		, isAlive: function (x, y) {
			var alive = false
			if (y > -1 && x > -1 && y < this.height && x < this.width) {
				alive = this._grid[x][y]
			}
			return alive
		}
		// how many neighbours at this location
		, aliveNeighbours: function (x, y) {
			var me = this
					, sum = 0
					, left = x - 1
					, right = x + 1
					, top = y + 1
					, bottom = y - 1
					// the positions around this point in the
					// grid where neighbours can be found
					, neighbours = [
						[left, y]
						, [left, top]
						, [x, top]
						, [right, top]
						, [right, y]
						, [right, bottom]
						, [x, bottom]
						, [left, bottom]
					]
					
			neighbours.forEach(function (n) {
				if(me.isAlive(n[0], n[1])) {
					sum += 1
				}
			})

			return sum
		}
		, kill: function(x, y) {
			this._grid[x][y] = false
		}
		, next: function() {
			var neighbours, me = this
			
			// cover x and y poisitions incrementally
			function gridWalk(x, y, callback){
				if(x < me.width - 1) {
					callback(x, y)
					gridWalk(x + 1, y, callback)
				} else if(y < me.height - 1) {
					callback(x, y)
					gridWalk(0, y + 1, callback)
				}
			}
			
			function checkCell(xx, yy){
				neighbours = me.aliveNeighbours(xx, yy)
				
				if(neighbours < 2 || neighbours >= 3) {
					me.kill(xx, yy)
				}
			}
			
			// start at 0, 0 then check edge case 
			gridWalk(0, 0, checkCell)
			checkCell(me.width - 1, me.height - 1)
		}
	}
})()