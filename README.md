#Revolver slider

A jQuery content slider with built in, easy to customize transitions based on jQuery 1.6+.

#Requirements

Revolve requires jQuery 1.6+.

#Getting started

To get started, download the plugin, unzip it, and copy the files to your web application directory. Make sure that you include a copy of the jQuery library, and then add your copy of `jquery.revolver.js`:

	<head>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
        <script type="text/javascript" src="/revolver/jquery.revolver.js"></script>
    </head>

Add the HTML for your new Revolver. The standard HTML that Revolver works with is a "wrapper" `div` with children elements that will be doing the revolving. For example:

	<div id="revolver">
		<div class="revolver-slide">Revolver slide 1</div>
		<div class="revolver-slide">Revolver slide 2</div>
		<div class="revolver-slide">Revolver slide 3</div>
	</div>
	
Give your slideshow some simple styles:

	#revolver {
		background-color:#ccc;
		width:100%;
		height:500px;
	}
	
	.revolver-slide {
		background-color:#fff;
		width:100%;
		height:100%;
	}
	
Finally, initialize Revolver with basic settings at the bottom of your page, like this:

	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			autoplay		: true,
			rotationDelay 	: 2000
		});
	});
	</script>
	
Voila.

#Set up controls

Revolver allows you to use HTML elements to control it's movements. For example, you can set up a button that tells Revolver to show the next slide when clicked:

	<!-- basic Revolver structure -->
	<div id="revolver">
		<div class="revolver-slide">Revolver slide 1</div>
		<div class="revolver-slide">Revolver slide 2</div>
		<div class="revolver-slide">Revolver slide 3</div>
	</div>
	
	<!-- Will play next slide when clicked -->
	<a href="#" id="next-button">Show next</a>

	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			nextButton : '#next-button', // the class or ID of the "next" button
		});
	});
	</script>
	
You can also add a button that tells Revolver to show the previous slide when clicked by adding a simple configuration setting:

	<div id="revolver">
		<div class="revolver-slide">Revolver slide 1</div>
		<div class="revolver-slide">Revolver slide 2</div>
		<div class="revolver-slide">Revolver slide 3</div>
	</div>

	<!-- will show previous slide when clicked -->
	<a href="#" id="prev-button">Show previous</a>
	
	<a href="#" id="next-button">Show next</a>

	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			nextButton : '#next-button',
			prevButton : '#prev-button', // the class or ID of the "previous" button
		});
	});
	</script>
	
Now that you have your "next" and "previous" buttons set up, you can set up "manual advance" buttons that tell Revolver to show *specific* slides. These elements also require a `data-slide` attribute in each, to indicate which slide they represent:

	<div id="revolver">
		<div class="revolver-slide">Revolver slide 1</div>
		<div class="revolver-slide">Revolver slide 2</div>
		<div class="revolver-slide">Revolver slide 3</div>
	</div>

	
	<a href="#" id="prev-button">Show previous</a>
	
	<!-- will advance Revolver to specific slides when clicked -->
	<a href="#" class="manual-button" data-slide="1">Show slide 1</a>
	<a href="#" class="manual-button" data-slide="2">Show slide 2</a>
	<a href="#" class="manual-button" data-slide="3">Show slide 3</a>
	
	<a href="#" id="next-button">Show next</a>

	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			nextButton 		: '#next-button',
			prevButton 		: '#prev-button',
			manualButton	: '.manual-button', // the class or ID of the "manual" button(s)
		});
	});
	</script>
	
#Transitions

Revolver comes with various built-in options for transitioning between slides. In addition, transitions can be further customized by choosing a "direction" - which adds vertical or horizontal motion to the animation:

<table>
	<tr>
		<th>Transition</th>
		<th>Setting</th>
		<th>Available directions</th>
	</tr>
	<tr>
		<td>Fade In</td>
		<td>fadeIn</td>
		<td>left, right, none (default)</td>
	</tr>
	<tr>
		<td>Fade Out</td>
		<td>fadeOut</td>
		<td>left, right, none (default)</td>
	</tr>
	<tr>
		<td>Slide</td>
		<td>slide</td>
		<td>top, bottom, left, right (default)</td>
	</tr>
</table>

You can set a transition, transition direction, and transition duration by adding the following settings:

	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			transition			: 'fadeIn',
			transitionDir		: 'none',
			transitionDuration	: 1000, // 1000 = 1 second, 2000 = 2 seconds, etc.
		});
	});
	</script>

#Complete custom settings

If you'd like to customize your Revolver, you can pass it a set of configurable settings when you initialize it:

	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			autoplay			: true, // start revolving automatically. Default: true
			childrenEls			: 'div', // a jQuery pointer to indicate the children divs. Default: 'div'
			debug				: false, // output debug messages in console. Default: false
			hideInactiveSlides	: true, // visibly hide slides when they aren't in focus. Default: true
			nextButton			: null, // a class or ID of an element. Default: null
			manualButton		: null, // a class or ID of an element. Default: null
			prevButton			: null, // a class or ID of an element. Default: null
			pauseOnHover		: true, // pause Revolver on mouseover. Default: true
			rotationDelay		: 2000, // milliseconds between revolutions. Default: 2000 (2 seconds)
			transition			: 'fadeIn', // transition type (fadeIn, fadeOut, slide). Default: 'fadeIn'
			transitionDir		: 'none', // transistion direction (top, right, bottom, left, none). Default: 'none'
			transitionDuration	: 1000, // how fast the transition should be in milliseconds. Default: 1000 (1 second)
			afterLoad			: function(data) {}, // called after Revolver is initialized
			afterChange			: function(data) {}, // called after each slide rotation
			beforeChange		: function(data) {} // called before each slide rotation
		});
	});
	</script>

<table>
	<tr>
		<td><b>autoplay</b></td>
		<td>Whether or now Revolver should start automatically after successfully loading. <i>Boolean; Default value: true</td>
	</tr>
	<tr>
		<td><b>childrenEls</b></td>
		<td>Children elements of the parent element. These elements will be turned into the slides. <i>DOM, String; Default value: 'div'</i></td>
	</tr>
	<tr>
		<td><b>debug</b></td>
		<td>Output debug messages to the console. <i>Boolean; Default value: false</i></td>
	</tr>
	<tr>
		<td><b>hideInactiveSlides</b></td>
		<td>Visibly hide slides when they aren't in focus. <i>Boolean; Default value: true</i></td>
	</tr>
	<tr>
		<td><b>nextButton</b></td>
		<td>An Html element that will cause Revolver to progress forward when clicked. <i>DOM, String, null; Default value: null</i></td>
	</tr>
	<tr>
		<td><b>prevButton</b></td>
		<td>An Html element that will cause Revolver to progress backward when clicked. <i>DOM, String, null; Default value: true</i></td>
	</tr>
	<tr>
		<td><b>pauseOnHover</b></td>
		<td>Pause the rotation when the mouse is hovered on the parent element. <i>Boolean; Default value: true</i></td>
	</tr>
	<tr>
		<td><b>rotationDelay</b></td>
		<td>The number of milliseconds before the next rotation begins. <i>Number; Default value: 2000 (2 seconds)</i></td>
	</tr>
	<tr>
		<td><b>transition</b></td>
		<td>The rotation transition type ('fadeIn', 'fadeOut', 'slide') <i>String; Default value: 'fadeIn'</i></td>
	</tr>
	<tr>
		<td><b>transitionDir</b></td>
		<td>The transition direction - different options available depending on the value of `transition` ('top', 'right', 'bottom', 'left', 'none') <i>String; Default value: 'none'</i></td>
	</tr>
	<tr>
		<td><b>transitionDuration</b></td>
		<td>The number of milliseconds each transition will take to complete. <i>Number; Default value: 1000 (1 second)</i></td>
	</tr>
	<tr>
		<td><b>afterLoad</b></td>
		<td>Callback function to be fired once Revolver has successfully completed initializing. Is passed internal variables. <i>Function, String; Default value: (empty function)</i></td>
	</tr>
	<tr>
		<td><b>afterChange</b></td>
		<td>Callback function to be fired each time Revolver completes a rotation. Is passed internal variables. <i>Function, String; Default value: (empty function)</i></td>
	</tr>
	<tr>
		<td><b>beforeChange</b></td>
		<td>Callback function to be fired before Revolver rotates to the next slide. Is passed internal variables. <i>Function, String; Default value: (empty function)</i></td>
	</tr>
</table>
	
#More Examples

###Changing the state of an element based on the current slide:

Often, it's required to change the state of an element on the page according to which slide is visible at the moment. For example, when using manual transition buttons (like the classic dots that a user can click on to choose which slide they see), it's necessary that the button change color to reflect an "active" or "inactive" state.

Combining Revolver with some basic CSS, here is how we can achieve this:

	<!-- set up styles for inactive and active manual buttons -->
	<style>
		.manual-button {
			background-color:#666666;
			color:#000000;
		}
		
		.manual-button.active {
			background-color:#000000;
			color:#ffffff;
		}
	</style>
	
	<div id="revolver">
		<div class="revolver-slide">Revolver slide 1</div>
		<div class="revolver-slide">Revolver slide 2</div>
		<div class="revolver-slide">Revolver slide 3</div>
	</div>
	
	<!-- will advance Revolver to specific slides when clicked -->
	<a href="#" class="manual-button" data-slide="1">Show slide 1</a>
	<a href="#" class="manual-button" data-slide="2">Show slide 2</a>
	<a href="#" class="manual-button" data-slide="3">Show slide 3</a>
	
	<script>
	$(document).ready(function() {
		$('#revolver').revolver({
			manualButton	: '.manual-button', // the class or ID of the "manual" button(s)
			beforeChange	: function(data) {
				$('.manual-button').each(function() {
					if($(this).attr('data-slide') == data.currSlide) {
						$(this).addClass('active');
					}else{
						$(this).removeClass('active');
					}
				});
			}
		});
	});
	</script>

#Copyright

Copyright (c) 2013 by Wonderful Co. - http://letsgetwonderful.com

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php