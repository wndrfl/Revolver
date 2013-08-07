/**
 * Revolver - jQuery Plugin
 * version 1.0.0
 * 
 * Copyright 2013 Wonderful Co.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 **/

;(function($) {
	
	var Revolver = function(el,options) {
		
		var $revolver = this;
		
		// settings and local vars
		var settings = $.extend({}, $.fn.revolver.defaults, options);
		var vars = {
			activeClass		: 'revolver-slide-active',
			currSlide		: 1,
			inactiveClass	: 'revolver-slide-inactive',
			isAnimating		: false,
			isPaused		: false,
			nextSlide		: null,
			prevSlide		: null,
			reverseOnce		: false,
			timerStart		: 0,
			timeout 		: null,
			wrapperClass	: 'revolver-slide-wrapper'
		};
		
		// define main elements
		var $parent = $(el);
		
		// create / define wrapper
		var c = [];
		$parent.children(settings.childrenEls).each(function() {
			c.push($(this).clone());
			$(this).remove();
		});
		var wrapped = '<div class="'+vars.wrapperClass+'"></div>';
		$parent.prepend(wrapped);
		var $wrapper = $parent.children('.'+vars.wrapperClass).first();
		$.each(c,function(i,v) {
			$wrapper.append(c);
		});
		
		// define children
		var $children = $wrapper.children(settings.childrenEls);
		
		// my private parts
		var determineNextAction = function() {
			if(!vars.isPaused) {
				$revolver.start();
			}
		}
		
		var hidePreviousSlide = function() {
			if(settings.hideInactiveSlides) {
				$children
					.eq(vars.prevSlide-1)
					.removeClass(vars.inactiveClass)
					.animate({'opacity':'0'},300);
			}
		}
		
		var setup = function() {
			setupParent();
			setupChildren();
			setupControls();
			
			// callback
			settings.afterLoad.call(this,vars);
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
				if($child.index() > 0) {
					$child.addClass(vars.inactiveClass);
					if(settings.hideInactiveSlides) {
						$child.css({
							opacity		: 0,
						});
					}
				}else{
					$child.addClass(vars.activeClass);
				}
			});
		}
		
		var setupControls = function() {
			trace('Setting up controls');
			
			if(settings.manualButton !== null) {
				$(settings.manualButton).click(function(e) {
					e.preventDefault();
					var slide = $(this).attr('data-slide');
					if(slide) {
						showSlide(slide);
					}
				});
			}

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
					$revolver.pause();
				},
				function() {
					$revolver.start();
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
			
			// callback
			settings.beforeChange.call(this,vars);

			// stop timer
			$revolver.stop();
			
			// lock
			vars.isAnimating = true;

			// queue next
			vars.nextSlide = i;
			
			// fade in
			if(settings.transition == 'fadeIn') {
				
				$children.eq(vars.currSlide-1)
					.removeClass(vars.activeClass)
					.addClass(vars.inactiveClass).css({
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
					},settings.transitionDuration,function() {
						vars.currSlide = vars.nextSlide;
						hidePreviousSlide();
						determineNextAction();
						vars.isAnimating = false;
						
						// callback
						settings.afterChange.call(this,vars);
					});
				
			
			// fade out
			} else if(settings.transition == 'fadeOut') {
				
				$children.eq(vars.currSlide-1)
					.removeClass(vars.activeClass)
					.addClass(vars.inactiveClass).css({
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
					.animate(fadeParams,settings.transitionDuration,function() {
						vars.currSlide = vars.nextSlide;
						hidePreviousSlide();
						determineNextAction();
						vars.isAnimating = false;
						
						// callback
						settings.afterChange.call(this,vars);
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
				nextEndParams.left = 0;
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
				
				$children.eq(vars.currSlide-1)
					.removeClass(vars.activeClass)
					.addClass(vars.inactiveClass);
				
				// animate next slide
				$children.eq(vars.nextSlide-1)
					.removeClass(vars.inactiveClass)
					.addClass(vars.activeClass)
					.css(nextStartParams)
					.animate(nextEndParams,settings.transitionDuration,function() {
						vars.currSlide = vars.nextSlide;
						determineNextAction();
						vars.isAnimating = false;
					
						// callback
						settings.afterChange.call(this,vars);
				});
				
				$children.eq(vars.prevSlide-1).animate(prevEndParams,settings.transitionDuration);
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
			$revolver.stop();
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
			$revolver.start();
		}
		
	}
	
	// plug it in
	$.fn.revolver = function(options) {
        return this.each(function(key, value){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('revolver')) { return element.data('revolver'); }
            // Pass options to plugin constructor
            var revolver = new Revolver(this, options);
            // Store plugin object in this element's data
            element.data('revolver', revolver);
        });
    };

	$.fn.revolver.defaults = {
		autoplay			: true,
		childrenEls			: 'div',
		debug				: false,
		hideInactiveSlides	: true,
		nextButton			: null,
		manualButton		: null,
		prevButton			: null,
		pauseOnHover		: true,
		rotationDelay		: 2000,
		transition			: 'fadeIn',
		transitionDir		: 'none',
		transitionDuration		: 1000,
		afterLoad			: function() {},
		afterChange			: function() {},
		beforeChange		: function() {}
    };
	
}(jQuery));