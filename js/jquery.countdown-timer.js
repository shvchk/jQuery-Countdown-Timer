/*
 * Countdown Timer jQuery Plug-in
 * ==============================
 * Author: Duncan McMillan
 * 
 * Copyright (c) January 2011 Art & Soul
 * http://www.artandsoul.co.uk
 *
 * Released under the MIT license.
 * http://en.wikipedia.org/wiki/MIT_License
 */

(function($){
	
	var options = {
		display_as_text		: false,
		to					: '2025:06:14:00:01',
		separator			: ':',
		significant_days	: 3
	};
	
	var tick_interval;
	var element;
	var seconds_remaining;
	
	$.fn.countdown = function (config_options)
	{
		
		var initialise = function (container)
		{
			element = container;
			
			var date_elements = options.to.split(':');
		
			var end_date = new Date (date_elements[0], date_elements[1] - 1, date_elements[2], date_elements[3], date_elements[4]);
			var start_date = new Date();
			
			seconds_remaining = (end_date.getTime() - start_date.getTime()) * .001;
			
			update(seconds_remaining);
			tick_interval = setInterval(tick, 1000);
		};
	
		var tick = function ()
		{
			seconds_remaining --;
			
			if (seconds_remaining >= 0) {
				update(seconds_remaining);
			} else {
				clearInterval(tick_interval);
			}		
		};
		
		var update = function (seconds_remaining)
		{
			var html;
			var time_str = assemble_time_str(seconds_remaining);
			
			if (options.display_as_text){
				html = time_str;
			} else {
				html = wrap_in_html(time_str);
			}
			
			element.html(html);
		}
		
		var assemble_time_str = function (seconds_remaining)
		{
			time_array = new Array();
			
			var day = String(Math.floor(seconds_remaining / 86400));
			
			if (String(day).length > options.significant_days){
				time_array.push(day.substr(day.length - options.significant_days));
			} else {
				time_array.push(str_pad(day, options.significant_days, "0"));
			}
			
			var hrs = String(Math.floor((seconds_remaining % 86400) / 3600));
			time_array.push(str_pad(hrs, 2, "0"));
			
			var min = String(Math.floor((seconds_remaining % 3600) / 60));
			time_array.push(str_pad(min, 2, "0"));
			
			var sec = String(Math.floor(seconds_remaining % 60));
			time_array.push(str_pad(sec, 2, "0"));
			
			return time_array.join(options.separator);
		};
		
		var wrap_in_html = function (time_str)
		{
			var css_class;
			var label;
			
			var html_output = '<div class="clock-bezel">';
			
			for (i = 0; i < time_str.length; i ++)
			{				
				chr = time_str.substr(i, 1);
				
				if (chr == options.separator){
					css_class = 'separator';
				} else {
					css_class = 'digit number-' + chr;
				}
				
				var html = '<div class="' + css_class + '">' + chr + '</div>';
				
				switch (i)
				{
					// Deal with MOST significant digit of current unit
					case 0 :
					case time_str.length - 2 :
					case time_str.length - 5 :
					case time_str.length - 8 :
						html = '<div class="unit">' + html;
						break;
					
					// Deal with LEAST significant digit of current unit
					case options.significant_days - 1 :
						html += '<div class="label">Days</div></div>';
						break;
						
					case time_str.length - 1 :
						html += '<div class="label">Seconds</div></div>';
						break;
						
					case time_str.length - 4 :
						html += '<div class="label">Minutes</div></div>';
						break;
						
					case time_str.length - 7 :
						html += '<div class="label">Hours</div></div>';
						break;
						
					
					default :
						// Do nowt
				}
				
				html_output += html;
			}
			
			html_output += '</div>';
			
			return html_output;
		}
		
		var str_pad = function (input, len, str)
		{
			var padding = '';
			
			if (str == null) {
				str = "0";
			}
			
			if (len == null) {
				len = input.length + 1;
			}
			
			for (i = input.length; i < len; i++)
			{
				padding += str;
			}
			
			return padding + input;
		}
		
		$.extend(options, config_options);
		initialise(this);
		
	
	};
		
})(jQuery);