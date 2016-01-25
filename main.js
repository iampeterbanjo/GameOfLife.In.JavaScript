(function() {
	var _ = self.GameView = function(args) {
		var $$ = function(selector){
			return document.querySelector(selector)
		}
		
		return {
			init: function() {
				_.game = new Game(args.width, args.height)
				this.view = $$(args.selector)
				this.status = $$('#status')
				this.update()
				this.watchNext()
				this.watchGridChange()
				this.watchAutoplay()
			}
			, update: function() {
				this.view.innerHTML = ''
				this.view.appendChild(_.game.draw())
			}
			, next: function() {
				_.game.next()
				this.update()
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
				var input = event.target
						, x = input.getAttribute('data-x')
						, y = input.getAttribute('data-y')
						, checked = input.checked

				if(checked) {
					_.game.spawn(x,y)
				} else {
					_.game.kill(x,y)
				}
			})
		}
		, watchAutoplay: function() {
				var me = this
				var autoplay = $$('#autoplay')
						, interval
				autoplay.addEventListener('change', function (event) {
					var input = event.target
							, checked = input.checked
					
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
		}
	};
	
})();

document.addEventListener('DOMContentLoaded', function() {
	console.log('ready');
	
	var gameView = new GameView({width: 5, height: 5, selector: '#grid-wrapper'})
	gameView.init()
})