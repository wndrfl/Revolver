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
		<a id="prev">Prev</a>
		<a id="next">Next</a>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

        <script src="js/jquery.wonderful-slider.js"></script>

		<script type="text/javascript">
		$(document).ready(function() {
			$('#slider').beef({
				autoplay			: true,
				debug				: true,
				hideInactiveSlides 	: true,
				nextButton			: '#next',
				prevButton			: '#prev',
				pauseOnHover		: true,
				transition			: 'slide',
				transitionDir		: 'bottom'
			});
		});
		</script>
    </body>
</html>
