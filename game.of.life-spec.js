describe("the game of life", function () {

	describe("the grid", function () {
		it("should be defined", function () {
			var grid = new Grid()
			expect(grid).toBeDefined()
		})

		it("should have a width and height", function () {
			var w = 10
					, h = 20
					, grid = new Grid(h, w)
			expect(grid.width).toEqual(w)
			expect(grid.height).toEqual(h)
		})

		it("should allow positions on the grid to be spawned", function () {
			expect(new Grid().spawn).toBeDefined()
		})

		it("should spawn at a location", function () {
			var grid = new Grid(10, 20)
			grid.spawn(1, 2) // y, x
			expect(grid.isAlive(1, 2)).toBe(true)
		})

		it("should spawn only at valid locations", function () {
			var grid = new Grid(2, 2)
			grid.spawn(1, 1)
			expect(grid.isAlive(1, 1)).toBe(true)
			expect(function () { grid.spawn(5, 4) }).toThrow(new Error("Invalid grid position"))
		})

		it("should get the number of neighbours", function () {
			var grid = new Grid(2, 2)
			grid.spawn(1, 1)
			expect(grid.aliveNeighbours(1, 1)).toBe(0)
			grid.spawn(0, 1)
			expect(grid.aliveNeighbours(1, 1)).toBe(1)
		})
	})
})