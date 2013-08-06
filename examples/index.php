<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Revolver Slider</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>

        <div id="slider" class="slider">
			<div class="slide" style='background-image:url("http://placehold.it/1500x500&text=This+is+the+Revolver+Slider...");'></div>
			<div class="slide" style='background-image:url("http://placehold.it/1500x500&text=...it+is+easy+to+use...");'></div>
			<div class="slide" style='background-image:url("http://placehold.it/1500x500&text=...and+looks+sweet.");'></div>
		</div>
		<a id="prev">Prev</a>
		<a class="manual-advance" data-slide="1">1</a>
		<a class="manual-advance" data-slide="2">2</a>
		<a class="manual-advance" data-slide="3">3</a>
		<a id="next">Next</a>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery-1.10.1.min.js"><\/script>')</script>

        <script src="js/jquery.revolver.js"></script>

		<script type="text/javascript">
		$(document).ready(function() {
			$('#slider').revolver({
				autoplay			: true,
				hideInactiveSlides 	: true,
				manualButton		: '.manual-advance',
				nextButton			: '#next',
				prevButton			: '#prev',
				pauseOnHover		: true,
				transition			: 'fadeIn',
				transitionDir		: 'left'
			});
		});
		</script>
    </body>
</html>
