<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>

        <div id="slider" style="background:#666; height:500px;">
			<div><img src="http://placehold.it/960x500&text=slide+1"></div>
			<div><img src="http://placehold.it/500x960&text=slide+2"></div>
			<div><img src="http://placehold.it/960x500&text=slide+3"></div>
		</div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

        <script src="js/main.js"></script>

		<script type="text/javascript">
		(function($) {
			
			var Beef = function(el,options) {
				
				var settings = $.extend({}, $.fn.beef.defaults, options);
				
				var vars = {
					activeClass	: 'active-slide',
					currSlide	: 1,
					nextSlide	: null,
					prevSlide	: null,
					previousClass	: 'previous-slide',
					timeout 	: null
				};
				
				// setup parent
				$parent = $(el);
				$parent.css({
					position	: 'relative',
					overflow	: 'hidden'
				});
				
				var currSlide = 1;
				var $children = $parent.children('div');
				
				$children.each(function() {
					var $child = $(this);
					$child.css({
						position	: 'absolute',							
						'top'		: '0',
						'left'		: '0'
					});
					if($child.index() > 0) {
						$child.css({
							opacity		: 0,
						});
					}else{
						$child.addClass(vars.activeClass);
					}
				});
				
				var hidePreviousSlide = function() {
					$children
						.eq(vars.prevSlide-1)
						.removeClass(vars.previousClass)
						.animate({'opacity':'0'},300);
				}
				
				var setCurrSlideToPrevSlide = function(foward) {
					dir = (foward) ? '101' : '0';
					$children.eq(vars.currSlide-1)
						.removeClass(vars.activeClass)
						.addClass(vars.previousClass).css({
						'z-index'	: dir
					});
					vars.prevSlide = vars.currSlide;
				}
				
				var showNextSlide = function() {
					nextSlide = (vars.currSlide >= $children.length) ? 1 : vars.currSlide+1;
					showSlide(nextSlide);
				}
				
				var showSlide = function(i) {

					// queue next
					vars.nextSlide = i;
					
					// fade in
					if(settings.transition == 'fadeIn' || settings.transition == 'fadeInRight' || settings.transition == 'fadeInLeft') {
						
						setCurrSlideToPrevSlide(false);
						
						var startFadeParams = {
							opacity		: 0,
							'z-index'	: '100'
						};
						if(settings.transition == 'fadeInRight') {
							startFadeParams.left = '+=50';
							
						} else if(settings.transition == 'fadeInLeft') {
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
							});
						
					
					// fade out
					} else if(settings.transition == 'fadeOut' || settings.transition == 'fadeOutRight' || settings.transition == 'fadeOutLeft') {
						
						setCurrSlideToPrevSlide(true);
						
						$children.eq(vars.nextSlide-1).css({
							opacity		: 1,
							top			: 0,
							left 		: 0
						});
						
						// setup params
						var fadeParams = {
							opacity		: 0
						};
						if(settings.transition == 'fadeOutRight') {
							fadeParams.left = '+=50'
							
						} else if(settings.transition == 'fadeOutLeft') {
							fadeParams.left = '-=50'
						}
						
						$children
							.eq(vars.prevSlide-1)
							.animate(fadeParams,settings.transitionSpeed,function() {
							vars.currSlide = vars.nextSlide;
							hidePreviousSlide();
						});
						
					}
				}
				
				var start = function() {
					settings.timeout = setInterval(function() {
						showNextSlide();
					},settings.rotationDelay);
				}
				
				start(vars.currSlide);
				
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
				rotationDelay	: 2000,
				transition		: 'fadeInLeft',
				transitionSpeed	: 1000
	        };
			
		}(jQuery));
		
		$(document).ready(function() {
			$('#slider').beef();
		});
		</script>
    </body>
</html>
