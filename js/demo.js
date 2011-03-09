(function( $, undefined ){
	var allCircles = [],
		tweenUpdateInterval = undefined;

	function init() {
		createCircles();
		initStats();
		createTweenTimer();
	}

	function createTweenTimer() {
		tweenUpdateInterval = setInterval(function(){
			TWEEN.update();
		}, 1000 / 30); // Call update on TWEEN.js
	}

	/**
	 * Stats
	 * Create stats module, and attach to top left
	 */
	function initStats() {
		if( 'getContext' in document.createElement('canvas') ) {
			var stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.left = '0px';
			stats.domElement.style.top = '0px';

			$(stats.domElement).appendTo( 'body' );

			setInterval( function () {
				stats.update();
			}, 1000 / 30 );
		}
	}

	function createCircles() {
		while( allCircles.length < 10 ) {
			var newCircle = new DemoCircle()
			allCircles.push( newCircle );

			newCircle.startFade();
			newCircle.animatePosition();
			newCircle.animateSize();
		}

	}

//	$( init );
	$(window).load( init );
})(jQuery);