/*
 * Countdown jQuery Plug In
 *
 * Copyright (c) 2011 Art & Soul
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */

(function($){
	
	var options = {
		
	};
	
	var tick_interval;
	var element;
	var seconds_remaining;
	var separator = ':';
	
	$.fn.counter = function (config)
	{
		
		var initialise = function (end, container)
		{
			element = container;
			
			var date_elements = end.split(':');
		
			var end_date = new Date (date_elements[0], date_elements[1] - 1, date_elements[2], date_elements[3], date_elements[4]);
			var start_date = new Date();
			
			seconds_remaining = (end_date.getTime() - start_date.getTime()) * .001;
						
			tick_interval = setInterval(tick, 1000);
		};
	
		var tick = function ()
		{
			seconds_remaining --;
			
			if (seconds_remaining >= 0) {
				update();
			} else {
				clearInterval(tick_interval);
			}		
		};
		
		var update = function()
		{
			time_array = new Array();
			
			time_array.push(Math.floor(seconds_remaining / 86400));
			time_array.push(Math.floor((seconds_remaining % 86400) / 3600));
			time_array.push(Math.floor((seconds_remaining % 3600) / 60));
			time_array.push(Math.floor(seconds_remaining % 60));
			
			 element.html(time_array.join(separator));
		};
		
		initialise(config.end, this);
		
	
	};
		
})(jQuery);