/* global querySelector */
describe("the game of life", function () {

	describe("the grid", function () {
		it("should be defined", function () {
			var grid = new Game()
			expect(grid).toBeDefined()
		})

		it("should have a width and height", function () {
			var w = 10
					, h = 20
					, grid = new Game(w, h)
			expect(grid.width).toEqual(w)
			expect(grid.height).toEqual(h)
		})

		it("should allow positions on the grid to be spawned", function () {
			expect(new Game().spawn).toBeDefined()
		})
		
		it("should be able to getClone", function() {
			expect(new Game().getClone).toBeDefined()
		})
		
		it("should get a clone of the grid with correct width and height", function() {
			var grid = new Game(2,2)
					, board = grid.getClone()
					
			expect(board.length).toBe(grid.width)
			expect(board[0].length).toBe(grid.height)
		})
		
		it("should get a clone with the cells spawned", function() {
			var grid = new Game(3,3)
					, board
			
			grid.spawn(1,1)
			grid.spawn(0,1)
			board = new Game()
			board.setBoard(grid.getClone())
			
			expect(grid.isAlive(1,1)).toBe(true)
			expect(board.isAlive(0,1)).toBe(true)
			
			grid.kill(1,1)
			expect(board.isAlive(1,1)).toBe(true)
		})

		it("should spawn at a location", function () {
			var grid = new Game(10, 20)
			grid.spawn(1, 2) // y, x
			expect(grid.isAlive(1, 2)).toBe(true)
		})

		it("should spawn only at valid locations", function () {
			var grid = new Game(2, 2)
			grid.spawn(1, 1)
			expect(grid.isAlive(1, 1)).toBe(true)
			expect(function () { grid.spawn(5, 4) }).toThrow(new Error("Invalid grid position"))
		})

		it("should get the number of neighbours", function () {
			var grid = new Game(3, 3)
			grid.spawn(1, 1)
			expect(grid.aliveNeighbours(1, 1)).toBe(0)
			grid.spawn(0, 0)
			expect(grid.aliveNeighbours(1, 1)).toBe(1)
			grid.spawn(0, 1)
			expect(grid.aliveNeighbours(1, 1)).toBe(2)
			grid.spawn(0, 2)
			expect(grid.aliveNeighbours(1, 1)).toBe(3)
			grid.spawn(1, 0)
			expect(grid.aliveNeighbours(1, 1)).toBe(4)
		})
		
		it("should handle out of bounds inputs", function () {
			var grid = new Game(2, 2)
			expect(grid.aliveNeighbours(-1, 0)).toBe(0)
		})
		
		it("should be able to calculate the next round", function() {
			var grid = new Game(2, 2)
			expect(grid.next).toBeDefined()
		})
		
		it("should be able to kill", function() {
			var grid = new Game(2, 2)
			expect(grid.kill).toBeDefined();
		})
		
		it("should be able to kill a cell", function() {
			var grid = new Game(2, 2)
			grid.spawn(1, 1)
			grid.kill(1, 1)
			expect(grid.isAlive(1,1)).toBe(false);
		})
		
		it("should kill a cell with less than 2 neighbours", function() {
			var grid = new Game(2, 2)
			grid.spawn(1, 1)
			grid.next()
			expect(grid.isAlive(1,1)).toBe(false)
		})
		
		it("should continue a cell with two neighbours", function() {
			var grid = new Game(2, 2)
			grid.spawn(1, 1)
			grid.spawn(0, 1)
			grid.spawn(1, 0)
			grid.next()
			expect(grid.isAlive(1,1)).toBe(true)
		})
		
		it("should continue a cell with three neighbours", function() {
			var grid = new Game(2, 2)
			grid.spawn(1, 1)
			grid.spawn(0, 1)
			grid.spawn(1, 0)
			grid.spawn(0, 0)
			grid.next()
			expect(grid.isAlive(1,1)).toBe(true)
		})
		
		it("should kill cells with four neighbours", function() {
			var grid = new Game(3, 3)
			grid.spawn(1, 1)
			
			// neighbours
			grid.spawn(0, 0)
			grid.spawn(0, 1)
			grid.spawn(0, 2)
			grid.spawn(1, 0)
			grid.next()
			expect(grid.isAlive(0,1)).toBe(false)
		})
		
		it("should spawn any dead cell with 3 live neighbours", function () {
			var grid = new Game(3, 3)
			grid.spawn(0, 1)
			grid.spawn(1, 0)
			grid.spawn(0, 0)
			grid.next()
			expect(grid.isAlive(1,1)).toBe(true)
		})
		
		it("should be able to draw", function () {
			var grid = new Game(2,2)
			expect(grid.draw).toBeDefined()
		})
		
		it("should be able to draw the grid", function () {
			var grid = new Game(2,2)
					, gridHtml = grid.draw().html
					
			expect(gridHtml.id).toBe('grid')
		})
		
		it("should draw the grid with correct number of rows", function () {
			var grid = new Game(2,2)
					, gridHtml = grid.draw().html
					
			expect(gridHtml.querySelectorAll('.row').length).toBe(2)
		})
		
		it("should draw the grid with correct number of cells", function () {
			var grid = new Game(2,2)
					, gridHtml = grid.draw().html
					
			expect(gridHtml.querySelectorAll('.cell').length).toBe(4)
		})
		
		it("should draw the grid with live cells checked", function () {
			var grid = new Game(2,2)

			grid.spawn(1,1)
			grid.spawn(0,1)
			
			gridHtml = grid.draw().html
			expect(gridHtml.querySelectorAll('[type="checkbox"]:checked').length).toBe(2)
		})
		
		it("should draw the cells at [2, 1] coordinates checked", function () {
			var grid = new Game(3,3)
					, positionX = 2
					, positionY = 1
					, gridHtml, x, y, input
					
			grid.spawn(positionX, positionY)
			
			gridHtml = grid.draw().html
			input = gridHtml.querySelector('[type="checkbox"]:checked')
			x = input.getAttribute('data-x') * 1
			y = input.getAttribute('data-y') * 1
			expect(x).toBe(positionX)
			expect(y).toBe(positionY)
		})
		
		it("should check every cell", function() {
			var grid = new Game(5,5)
					, self = this
					
			grid.search({ each: function(x, y) {
				grid.spawn(x, y)
			}})
			
			grid.search({each: function(x, y) {
				self.expect(grid.isAlive(x, y)).toBe(true)
			}})
		})
		
		it("should emulate block still life", function () {
			var grid = new Game(4,4)
					, cells = [
						[1,1]
						,[2,1]
						,[1,2]
						,[2,2]
					]
			
			for (var index = 0; index < cells.length; index++) {
				grid.spawn(cells[index][0], cells[index][1])
			}
			
			grid.next()
			
			for (var index = 0; index < cells.length; index++) {
				expect(grid.isAlive(cells[index][0], cells[index][1])).toBe(true)
			}
		})
		
		it("should emulate boat still life", function () {
			var grid = new Game(5,5)
					, cells = [
						[2,1]
						,[1,2]
						,[3,2]
						,[1,3]
						,[2,3]
					]
			
			for (var index = 0; index < cells.length; index++) {
				grid.spawn(cells[index][0], cells[index][1])
			}
			
			grid.next()
			
			for (var index = 0; index < cells.length; index++) {
				expect(grid.isAlive(cells[index][0], cells[index][1])).toBe(true)
			}
		})
		
		it("should create looper oscillator", function () {
			var grid = new Game(5,5)
			
			grid.spawn(2, 3)
			grid.spawn(2, 2)
			grid.spawn(2, 1)
			
			expect(grid.aliveNeighbours(2,1)).toBe(1)
			expect(grid.aliveNeighbours(2,2)).toBe(2)
			expect(grid.aliveNeighbours(1,2)).toBe(3)
			
			grid.next()
			
			expect(grid.isAlive(1,2)).toBe(true)
			expect(grid.isAlive(2,2)).toBe(true)
			expect(grid.isAlive(3,2)).toBe(true)
		})
	})
})