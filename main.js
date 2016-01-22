
document.addEventListener('DOMContentLoaded', function() {
	console.log('ready');
	
	var grid = new Grid(5, 5)
			, gridWrapper = document.querySelector('#grid-wrapper')

	function update() {
		gridWrapper.innerHTML = ''
		gridWrapper.appendChild(grid.draw())
	}
	
	update()
	
	var next = document.querySelector('.next')
	next.addEventListener('click', function() {
		grid.next()
		update()
	})
	
	gridWrapper.addEventListener('change', function(event) {
		var input = event.target
				, x = input.getAttribute('data-x')
				, y = input.getAttribute('data-y')
				, checked = input.checked

		if(checked) {
			grid.spawn(x,y)
		} else {
			grid.kill(x,y)
		}
	})
	
	var autoplay = document.querySelector('.autoplay')
			, interval
	autoplay.addEventListener('change', function (event) {
		var input = event.target
				, checked = input.checked
		
		if(checked) {
			interval = setInterval(function(){
				grid.next()
				update()
			}, 500)
		} else {
			clearInterval(interval)
		}
	})
})