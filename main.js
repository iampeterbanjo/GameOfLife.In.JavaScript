(function() {
	var _ = self.GameView = function() {
		function $$(selector){
			return document.querySelector(selector)
		}
		
		function getInput(event) {
			var input = event.target
			
			return {
				x: input.getAttribute('data-x')
				, y: input.getAttribute('data-y')
				, checked: input.checked
				, coords: input.coords
			}
		}
		
		return {
			init: function(args) {
				this.view = $$(args.selector)
				this.update()
				this.watchNext()
				this.watchGridChange()
				this.watchAutoplay()
				this.watchKeyup()
			}
			, update: function() {
				this.view.innerHTML = ''
				this.rendered = _.game.draw()
				this.view.appendChild(this.rendered.html)
			}
			, next: function() {
				_.game.next()
				this.update()
			}
			, watchNew: function() {
				var me = this
				$$('.new').addEventListener('click', function(){
					var size = $$('#size').value * 1
					_.game = new Game(size, size)
					me.init({selector: '#grid-wrapper'})
				})
			}
			, watchNext: function() {
				var me = this
				$$('.next').addEventListener('click', function() {
					_.game.next()
					me.update()
				})
			}
			, watchGridChange: function () {
			this.view.addEventListener('change', function(event) {
				var input = getInput(event)
						
				if(input.checked) {
					_.game.spawn(input.x, input.y)
				} else {
					_.game.kill(input.x, input.y)
				}
			})
		}
		, watchAutoplay: function() {
				var me = this
				var autoplay = $$('#autoplay')
						, interval
				autoplay.addEventListener('change', function (event) {
					var input = getInput(event)
							, checked = input.checked
					
					$$('#status').innerHTML = checked ? 'Stop' : 'Start'

					if(checked) {
						interval = setInterval(function(){
							_.game.next()
							me.update()
						}, 500)
					} else {
						clearInterval(interval)
					}
				})
			}
			, watchKeyup: function() {
				var me = this
				this.view.addEventListener('keyup', function(event) {
					var input = getInput(event)

					console.log(event);
					console.log(input.x);
					if(event.keyCode === 37) {
						if(input.x > 0){
							me.rendered.checkboxes[input.y][input.x - 1].focus()
							// event.target.parentElement.previousElementSibling.querySelector('input').focus()
						}
					} else if(event.keyCode === 38) {
						if(input.y < _.game.height - 1){
							me.rendered.checkboxes[input.y - 1][input.x].focus()
							// event.target.parentElement.parentElement.querySelector('td:nth-child(' + input.x + ') input').focus()
						}
					} else if(event.keyCode === 39) {
						if(input.x < _.game.width - 1){
							me.rendered.checkboxes[input.y][input.x + 1].focus()
							// event.target.parentElement.nextElementSibling.querySelector('input').focus()
						}
					} else if(event.keyCode === 40) {
						if(input.y > 0){
							me.rendered.checkboxes[input.y - 1][input.x].focus()
						}
					}
				})
			}
		}
	};
	
})();

document.addEventListener('DOMContentLoaded', function() {
	console.log('ready');
	
	var gameView = new GameView()
	gameView.watchNew()
})