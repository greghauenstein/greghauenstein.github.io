jQuery(document).ready(function($) {
	'use strict';
	
	var Minimalist = {
		/*
		 *	Define your subpage here:
		 *	If you use mod_rewrite for SEO, feel free to change
		 *	"subpage" to "yourseoname". Don't forget to also
		 * 	change it in Line 66 (important!).
		 */
		backandforth: {
			'': 'hideOverlay',
			'subpage': 'showOverlay'
		},
	
		backgroundPhoto: function() {
			if($(window).width() <= 1000 ) {
				$('.background').width('100%');
			} 
			else {
				var windowWidth 	= $(window).outerWidth();
				var contentWidth 	= $('.content-area').outerWidth();
				$('.background').outerWidth(windowWidth - contentWidth);
			}
		},
	
		/*
		 *	Adds the animation for fading.
		 */
		showOverlay: function() {
			$('main').addClass('noscroll');
			$('.transition').addClass('transform-transformed');
			$('.hidden-content').addClass('hidden-content-shown');
		},
	
		hideOverlay: function() {
			$('main').removeClass('noscroll');
			$('.transition').removeClass('transform-transformed');
			$('.hidden-content').removeClass('hidden-content-shown');
		},
	
		/*
		 *	Uses history.js to navigate back and forth.
		 */
		navigate: function( path ) {
			History.pushState( {}, '', History.getBasePageUrl() + path.replace( /^\//, '' ) );
		},
	
		/*
		 *	Checks if either the subpage or index is active.
		 */
		runBackandforth: function() {
			var backorforth = window.location.href.replace(History.getBasePageUrl(), '');
	
			if(backorforth in Minimalist.backandforth) {
				Minimalist[Minimalist.backandforth[backorforth]]();
			}
		},
	
		startBackandforth: function() {
			Minimalist.runBackandforth();
			History.Adapter.bind( window, 'statechange', Minimalist.runBackandforth );
		},
	
		init:function() {
			Minimalist.backgroundPhoto();
	
			$('#readmore').on( 'click', function() {
				Minimalist.navigate( '/subpage' );
				return false;
			} );
	
			$('.dummy, .moreinformation .button').on( 'click', function() {
				Minimalist.navigate( '/' );
				return false;
			} );
	
			$( document ).on( 'keyup', function( evt ) {
				if( evt.which === 27 ) {
					Minimalist.navigate( '/' );
				}
			} );
	
			/*
			 *	Updates the background photo when window sizes changes.
			 */
			$( window ).on( 'resize', Minimalist.backgroundPhoto );
	
			$( 'main' ).on( 'scroll', function() {
				if( $( window ).width() >= 900 ) {
					var scrollPos = $( 'main' ).scrollTop(),
						scrollHeight = $( 'main' )[0].scrollHeight - $( window ).height(),
						backgroundPos = ( ( Math.pow((scrollPos / scrollHeight), 0.6)) * 85 );
	
					backgroundPos = Math.min( Math.max( backgroundPos, 0 ), 100 );
					$( '.background' ).css( 'background-position', '0 ' + backgroundPos + '%' );
				}
			});
	
			$('.hidden-content').show();
	
			Minimalist.startBackandforth();
		}
	};

	/*
	 * 	Runs the whole script after the website has loaded.
	 */
	Minimalist.init();
	
	/*
	 *	Google Maps API Settings
	 */ 
	var yourLocation	= new google.maps.LatLng(41.669740, -93.707630);
	var yourMapType 	= 'greyscale';
	var map; 
	 
	function initialize() {
		var styleOptions = 
			[
			  {
				"stylers": [
				  { "saturation": -25 }
				]
			  }
			];
		
		var mapOptions = {
			center: yourLocation,
			zoom: 13,
			mapTypeId: yourMapType
		};
		
		map = new google.maps.Map(document.getElementById("location-map"), mapOptions);
		
		var styledMapOptions = {
			name: 'Custom Style'
		};
		
		var customMapType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
		
		map.mapTypes.set(yourMapType, customMapType);
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);
});