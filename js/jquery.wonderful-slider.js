(function($) {
	
	var Beef = function(el,options) {
		
		var $beef = this;
		
		// settings and local vars
		var settings = $.extend({}, $.fn.beef.defaults, options);
		var vars = {
			activeClass		: 'wonderful-slide-active',
			currSlide		: 1,
			isAnimating		: false,
			isPaused		: false,
			nextSlide		: null,
			prevClass		: 'wonderful-slide-previous',
			prevSlide		: null,
			reverseOnce		: false,
			timerStart		: 0,
			timeout 		: null,
			wrapperClass	: 'wonderful-slide-wrapper'
		};
		
		// define main elements
		var $parent = $(el);
		
		// create / define wrapper
		var clone = $parent.html();
		var wrapped = '<div class="'+vars.wrapperClass+'">'+clone+'</div>';
		$parent.html(wrapped);
		var $wrapper = $parent.children('.'+vars.wrapperClass).first();
		
		// define children
		var $children = $wrapper.children(settings.childrenEls);
		
		// my private parts
		var determineNextAction = function() {
			if(!vars.isPaused) {
				$beef.start();
			}
		}
		
		var hidePreviousSlide = function() {
			if(settings.hideInactiveSlides) {
				$children
					.eq(vars.prevSlide-1)
					.removeClass(vars.prevClass)
					.animate({'opacity':'0'},300);
			}
		}
		
		var setup = function() {
			setupParent();
			setupChildren();
			setupControls();
		}
		
		var setupChildren = function() {
			trace('Setting up children');
			
			$children.each(function() {
				var $child = $(this);
				$child.css({
					position	: 'absolute',							
					'top'		: '0',
					'left'		: '0'
				});
				if($child.index() > 0 && settings.hideInactiveSlides) {
					$child.css({
						opacity		: 0,
					});
				}else{
					$child.addClass(vars.activeClass);
				}
			});
		}
		
		var setupControls = function() {
			trace('Setting up controls');
			
			if(settings.nextButton !== null) {
				$(settings.nextButton).click(function(e) {
					e.preventDefault();
					if(!vars.isAnimating) {
						showNextSlide();
					}
				});
			}

			if(settings.prevButton != null) {
				$(settings.prevButton).click(function(e) {
					e.preventDefault();
					if(!vars.isAnimating) {
						showPrevSlide();
					}
				});
			}
		}
		
		var setupParent = function() {
			trace('Setting up parent');
			
			$parent.css({
				position	: 'relative',
				overflow	: 'hidden'
			});
			
			if(settings.pauseOnHover) {
				$parent.hover(function() {
					$beef.pause();
				},
				function() {
					$beef.start();
				});
			}
		}
		
		var showNextSlide = function() {
			nextSlide = (vars.currSlide >= $children.length) ? 1 : vars.currSlide+1;
			showSlide(nextSlide);
		}
		
		var showPrevSlide = function() {
			prevSlide = (vars.currSlide <= 0) ? $children.length-1 : vars.currSlide-1;
			vars.reverseOnce = true;
			showSlide(prevSlide);
		}
		
		var showSlide = function(i) {
			trace('Show slide '+i);

			// stop timer
			$beef.stop();
			
			vars.isAnimating = true;

			// queue next
			vars.nextSlide = i;
			
			// fade in
			if(settings.transition == 'fadeIn') {
				
				$children.eq(vars.currSlide-1)
					.removeClass(vars.activeClass)
					.addClass(vars.prevClass).css({
					'z-index'	: '0'
				});
				vars.prevSlide = vars.currSlide;
				
				var startFadeParams = {
					opacity		: 0,
					'z-index'	: '100'
				};
				if(settings.transitionDir == 'right') {
					startFadeParams.left = '+=50';
					
				} else if(settings.transitionDir == 'left') {
					startFadeParams.left = '-=50';
					
				}
				
				$children
					.eq(vars.nextSlide-1)
					.addClass(vars.activeClass)
					.css(startFadeParams)
					.animate({
						opacity		: 1,
						top			: 0,
						left 		: 0
					},settings.transitionSpeed,function() {
						vars.currSlide = vars.nextSlide;
						hidePreviousSlide();
						determineNextAction();
						vars.isAnimating = false;
					});
				
			
			// fade out
			} else if(settings.transition == 'fadeOut') {
				
				$children.eq(vars.currSlide-1)
					.removeClass(vars.activeClass)
					.addClass(vars.prevClass).css({
					'z-index'	: '101'
				});
				vars.prevSlide = vars.currSlide;
				
				$children.eq(vars.nextSlide-1).css({
					opacity		: 1,
					top			: 0,
					left 		: 0
				});
				
				// setup params
				var fadeParams = {
					opacity		: 0
				};
				if(settings.transitionDir == 'right') {
					fadeParams.left = '+=50'
					
				} else if(settings.transitionDir == 'left') {
					fadeParams.left = '-=50'
				}
				
				$children
					.eq(vars.prevSlide-1)
					.animate(fadeParams,settings.transitionSpeed,function() {
						vars.currSlide = vars.nextSlide;
						hidePreviousSlide();
						determineNextAction();
						vars.isAnimating = false;
				});
				
			} else if(settings.transition == 'slide') {
				
				vars.prevSlide = vars.currSlide;
				
				var nextStartParams = {};
				var nextEndParams = {
					opacity	: 1
				};
				var prevEndParams = {};
				
				// start w/ opacity?
				if(!settings.hideInactiveSlides) {
					nextStartParams.opacity = 1;
				}else{
					prevEndParams.opacity = 0;
				}
				
				// default is to slide from right
				nextStartParams.left = '100%';
				prevEndParams.left = '-100%';
				
				// slide from right?
				if(settings.transitionDir == 'left' && vars.reverseOnce) {
					nextStartParams.left = '100%';
					nextStartParams.top = 0;
					nextEndParams.left = 0;
					prevEndParams.left = '-100%';
					prevEndParams.top = 0;
						
				// slide from left?
				}else if((settings.transitionDir == 'left' && !vars.reverseOnce)
					|| (settings.transitionDir == 'right' && vars.reverseOnce)) {
					nextStartParams.top = 0;
					nextStartParams.left = '-100%';
					nextEndParams.left = 0;
					prevEndParams.top = 0;
					prevEndParams.left = '100%';
				
				// slide from top?
				}else if((settings.transitionDir == 'top' && !vars.reverseOnce)
					|| (settings.transitionDir == 'bottom' && vars.reverseOnce)) {
					nextStartParams.left = 0;
					nextStartParams.top = '-100%';
					nextEndParams.top = 0;
					prevEndParams.left = 0;
					prevEndParams.top = '100%';

				// slide from bottom?
				}else if((settings.transitionDir == 'bottom' && !vars.reverseOnce)
					|| (settings.transitionDir == 'top' && vars.reverseOnce)) {
					nextStartParams.left = 0;
					nextStartParams.top = '100%';
					nextEndParams.top = 0;
					prevEndParams.left = 0;
					prevEndParams.top = '-100%';
				}
				
				// animate next slide
				$children.eq(vars.nextSlide-1).css(
					nextStartParams
				).animate(nextEndParams,settings.transitionSpeed,function() {
					vars.currSlide = vars.nextSlide;
					determineNextAction();
					vars.isAnimating = false;
				});
				
				$children.eq(vars.prevSlide-1).animate(prevEndParams,settings.transitionSpeed);
			}
			
			// reset reverse-ness
			vars.reverseOnce = false;
		}
		
        var trace = function(msg){
			if(settings.debug) {
            	if(this.console && typeof console.log !== 'undefined') { console.log(msg); }
			}
        }
		
		this.pause = function() {
			trace('Pause');
			$beef.stop();
			vars.isPaused = true;
		}
		
		this.start = function() {
			trace('Start');
			vars.isPaused = false;
			
			vars.timeout = setTimeout(function() {
				showNextSlide();
			},settings.rotationDelay);
		}
		
		this.stop = function() {
			trace('Stop');
			window.clearTimeout(vars.timeout);
		}

		setup();
		
		if(settings.autoplay) {
			$beef.start();
		}
		
	}
	
	// plug it in
	$.fn.beef = function(options) {
        return this.each(function(key, value){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('beef')) { return element.data('beef'); }
            // Pass options to plugin constructor
            var beef = new Beef(this, options);
            // Store plugin object in this element's data
            element.data('beef', beef);
        });
    };

	$.fn.beef.defaults = {
		autoplay			: true,
		childrenEls			: 'div',
		debug				: false,
		hideInactiveSlides	: true,
		nextButton			: null,
		prevButton			: null,
		pauseOnHover		: true,
		rotationDelay		: 2000,
		transition			: 'fadeIn',
		transitionDir		: 'none',
		transitionSpeed		: 1000
    };
	
}(jQuery));