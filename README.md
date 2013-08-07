#Revolver slider

A jQuery content slider with built in, easy to customize transitions based on jQuery 1.3.2+.

#Requirements

Revolve requires jQuery 1.3.2+.

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
			transitionDuration		: 1000, // how fast the transition should be in milliseconds. Default: 1000 (1 second)
			afterLoad			: function() {}, // called after Revolver is initialized
			afterChange			: function() {}, // called after each slide rotation
			beforeChange		: function() {} // called before each slide rotation
		});
	});
	</script>

#Copyright

Copyright (c) 2013 by Wonderful Co. - http://letsgetwonderful.com

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php