<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Revolver Slider</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="examples/css/main.css">
    </head>
    <body>

        <div id="revolver" class="revolver-slider">
			<div class="slide" style='background-image:url("http://placehold.it/1500x500&amp;text=This+is+the+Revolver+Slider...");'></div>
			<div class="slide" style='background-image:url("http://placehold.it/1500x500&amp;text=...it+is+easy+to+use...");'></div>
			<div class="slide" style='background-image:url("http://placehold.it/1500x500&amp;text=...and+looks+sweet.");'></div>
			
			
			<a id="prev" class="revolver-prev revolver-button">&larr;</a>
			<div class="revolver-manual-buttons">
				<a class="manual-advance active" data-slide="1"></a>
				<a class="manual-advance" data-slide="2"></a>
				<a class="manual-advance" data-slide="3"></a>
			</div>
			<a id="next" class="revolver-next revolver-button">&rarr;</a>
		</div>


        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery-1.8.0.min.js"><\/script>')</script>

        <script src="source/jquery.revolver.js"></script>

		<script type="text/javascript">
		$(document).ready(function() {
			$('#revolver').revolver({
				autoplay			: true,
				childrenEls			: '.slide',
				manualButton		: '.manual-advance',
				nextButton			: '#next',
				prevButton			: '#prev',
				pauseOnHover		: true,
				transition			: 'slide',
				transitionDir		: 'right',
				afterChange			: function(data) {
					$('a.manual-advance').each(function() {
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
    </body>
</html>
