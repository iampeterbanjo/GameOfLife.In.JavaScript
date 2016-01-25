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
				this.view.appendChild(_.game.draw())
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
					var input = getInput(event.target)
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
					console.log(event);
					switch(event.keyCode) {
						case 37:
							break;
						case 38:
							break;
						case 39:
							break;
						case 40:
							break;
						default:
							break;
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