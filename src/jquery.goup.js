/*
 *
 * Copyright (c) 2014 Daniele Lenares (https://github.com/Ryuk87)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 0.3.0
 *
 */
(function ( $ ) {
	
	$.goup = function(user_params) {
		
		/* Default Params */
		var params = $.extend({
				location : 'right',
				locationOffset : 20,
				bottomOffset : 10,
				containerRadius : 10,
				containerClass : 'goup-container',
				arrowClass : 'goup-arrow',
				alwaysVisible : false,
				trigger: 500,
				entryAnimation : 'fade',
				goupSpeed : 'slow',
				hideUnderWidth : 500,
				containerColor : '#000',
				arrowColor : '#fff',
                title : ''
			}, user_params);
		/* */
		
		
		$('body').append('<div style="display:none" class="'+params.containerClass+'"></div>');
		var container = $('.'+params.containerClass);
		$(container).html('<div class="'+params.arrowClass+'"></div>');
		var arrow = $('.'+params.arrowClass);
		
		/* Parameters check */
		var location = params.location;
		if (location != 'right' && location != 'left') {
			location = 'right';
		}
		
		var locationOffset = params.locationOffset;
		if (locationOffset < 0) {
			locationOffset = 0;
		}
		
		var bottomOffset = params.bottomOffset;
		if (bottomOffset < 0) {
			bottomOffset = 0;
		}
		
		var containerRadius = params.containerRadius
		if (containerRadius < 0) {
			containerRadius = 0;
		}
		
		var trigger = params.trigger;
		if (trigger < 0) {
			trigger = 0;
		}
		
		var hideUnderWidth = params.hideUnderWidth;
		if (hideUnderWidth < 0) {
			hideUnderWidth = 0;
		}
		
		var checkColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
		if (checkColor.test(params.containerColor)) {
			var containerColor = params.containerColor;
		} else {
			var containerColor = '#000';
		}
		if (checkColor.test(params.arrowColor)) {
			var arrowColor = params.arrowColor;
		} else {
			var arrowColor = '#fff';
		}
		/* */
		
		/* Container Style */
		var containerStyle = {};
		containerStyle = {
			position : 'fixed',
			width : 40,
			height : 40,
			background : containerColor,
			cursor: 'pointer'
		};
		containerStyle['bottom'] = bottomOffset;
		containerStyle[location] = locationOffset;
		containerStyle['border-radius'] = containerRadius;
		
		$(container).css(containerStyle);
        $(container).attr('title', params.title);
		
		/* Arrow Style */		
		var arrowStyle = {};
		arrowStyle = {
			width : 0,
			height : 0,
			margin : '0 auto',
			'padding-top' : 13,
			'border-style' : 'solid',
			'border-width' : '0 10px 10px 10px',
			'border-color' : 'transparent transparent '+arrowColor+' transparent' 
		};
		$(arrow).css(arrowStyle);
		/* */
		
		
		
		/* Trigger Hide under a certain width */
		var isHidden = false;
		$(window).resize(function(){
			if ($(window).outerWidth() <= hideUnderWidth) {
				isHidden = true;
				do_animation($(container), 'hide', params.entryAnimation);
			} else {
				isHidden = false;
				$(window).trigger('scroll');
			}
		});
		/* If i load the page under a certain width, i don't have the event 'resize' */
		if ($(window).outerWidth() <= hideUnderWidth) {
			isHidden = true;
			$(container).hide();
		}
		
		
		/* Trigger show event */
		if (!params.alwaysVisible) {
			$(window).scroll(function(){
				if ($(window).scrollTop() >= trigger && !isHidden) {
					do_animation($(container), 'show', params.entryAnimation);
				}
				
				if ($(window).scrollTop() < trigger && !isHidden) {
					do_animation($(container), 'hide', params.entryAnimation);
				}
			});
		} else {
			do_animation($(container), 'show', params.entryAnimation);
		}
		/* If i load the page and the scroll is over the trigger, i don't have immediately the event 'scroll' */
		if ($(window).scrollTop() >= trigger && !isHidden) {
			do_animation($(container), 'show', params.entryAnimation);
		}
		
		/* Click event */
		$(container).on('click', function(){
			$('html,body').animate({ scrollTop: 0 }, params.goupSpeed);
			return false;
		});
	};
	
	
	/* Private function for the animation */
	function do_animation(obj, type, animation) {
		if (type == 'show') {
			switch(animation) {
				case 'fade':
					obj.fadeIn();
				break;
				
				case 'slide':
					obj.slideDown();
				break;
				
				default:
					obj.fadeIn();
			}
		} else {
			switch(animation) {
				case 'fade':
					obj.fadeOut();
				break;
				
				case 'slide':
					obj.slideUp();
				break;
				
				default:
					obj.fadeOut();
			}
		}
	}
	
}( jQuery ));
