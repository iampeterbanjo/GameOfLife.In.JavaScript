describe("the game of life", function () {

	describe("the grid", function () {
		it("should be defined", function () {
			var grid = new Grid()
			expect(grid).toBeDefined()
		})

		it("should have a width and height", function () {
			var w = 10
					, h = 20
					, grid = new Grid(w, h)
			expect(grid.width).toEqual(w)
			expect(grid.height).toEqual(h)
		})
	})
})