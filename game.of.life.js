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
		, search: function(args){
			var me = this
			// cover x and y poisitions incrementally
			for (var w = 0; w < this.width; w++) {
				for (var h = 0; h < this.height; h++) {
					if(typeof args.each == 'function') {
						args.each(w, h)
					}
				}
			}
		}
		, next: function() {
			var neighbours, me = this
			
			function checkCell(xx, yy){
				neighbours = me.aliveNeighbours(xx, yy)
					
				if(me.isAlive(xx,yy)){
					if(neighbours < 2 || neighbours > 3) {
						console.log('%s %s with %s neighbours is %s', xx, yy, neighbours, 'killed');
						me.kill(xx, yy)
					}
				} else {
					if (neighbours === 3) {
						console.log('%s %s with %s neighbours is %s', xx, yy, neighbours, 'spawned');
						me.spawn(xx, yy)
					}
				}
			}
			
			me.search({each: checkCell})
		}
		, draw: function () {
			var table = document.createElement('table')
			table.setAttribute('id', 'grid')
			
			for (var h = 0; h < this.height; h++) {
				var row = document.createElement('tr')
				row.classList.add('row')
				
				for (var w = 0; w < this.width; w++) {
					var cell = document.createElement('td')
							, input = document.createElement('input')
							
					cell.classList.add('cell')
					input.type = "checkbox"
					input.setAttribute('data-x', w)
					input.setAttribute('data-y', h)
					
					if(this.isAlive(w,h)) {
						input.setAttribute('checked', 'checked')
					}
					cell.appendChild(input)
					row.appendChild(cell)
				}
				table.appendChild(row)
			}
			
			return table
		}
	}
})()