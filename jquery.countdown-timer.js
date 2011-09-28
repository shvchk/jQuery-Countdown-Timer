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
 *
 * Version 1.0.2
 */

(function($){
	
	var options = {
		display_as_text		: false,
		to					: '2111:11:11:11:11',
		separator			: ':',
		significant_days	: 2,
		UTC					: false
	};
	
	var tick_interval;
	var element;
	var seconds_remaining;
	
	$.fn.countdown = function (config_options)
	{
		/*
		 * Initialise
		 *
		 * Prepare data and trigger regular execution of code
		 *
		 * @param	container	Reference to DOM element where counter will be displayed
		 */
		var initialise = function (container)
		{
			// Store a reference to the DOM element that will hold our counter display
			element = container;
			
			// Split the specified date/time string into an array
			var date_elements = options.to.split(':');
			
			// Create Date objects for start and end date/times
			if (options.UTC) {
				var end_date = new Date (Date.UTC(date_elements[0], date_elements[1] - 1, date_elements[2], date_elements[3], date_elements[4]));
			} else {
				var end_date = new Date (date_elements[0], date_elements[1] - 1, date_elements[2], date_elements[3], date_elements[4]);
			}
			
			var start_date = new Date();
			
			// Calculate number of seconds remain until end date/time
			seconds_remaining = (end_date.getTime() - start_date.getTime()) * .001;
			
			// If end point is already history there’s no point in continuing
			if (seconds_remaining < 0) {
				seconds_remaining = 0;
			}
			
			// Update the display
			update(seconds_remaining);
			
			// Trigger the regular execution of 
			tick_interval = setInterval(tick, 1000);
		};
		
		/*
		 * Tick
		 *
		 * Called at regular time interval to track time and trigger update of counter display.
		 * If end date/time is reached the interval is destroyed.
		 *
		 */
		var tick = function ()
		{
			seconds_remaining --;
			
			if (seconds_remaining >= 0) {
				update(seconds_remaining);
			} else {
				clearInterval(tick_interval);
			}		
		};
		
		/*
		 * Update
		 *
		 * Upadate counter display with either plain text display or time data wrapped in HTML for CSS formatting
		 *
		 * @param	seconds_remaining	Number of seconds remaining until end date/time
		 */
		var update = function (seconds_remaining)
		{
			var html;
			var time_str = assemble_time_str(seconds_remaining);
			
			if (options.display_as_text){
				html = time_str;
			} else {
				html = wrap_in_html(time_str);
			}
			
			// Insert HTML into DOM element
			element.html(html);
		}
		
		/*
		 * Assemble Time String
		 *
		 * Convert the number of remaining seconds into a string to
		 * represent the time remaining in dd:hh:mm:ss format
		 *
		 * @param	seconds_remaining	The number of seconds remaining until end date/time
		 *
		 * @return	int					Padded and formatted string with value of time remaining
		 */
		var assemble_time_str = function (seconds_remaining)
		{
			time_array = new Array();
			
			// Calculate number of days
			var day = String(Math.floor(seconds_remaining / 86400));
			
			// Truncate or pad day value to fit number of significant days as specified
			if (String(day).length > options.significant_days){
				time_array.push(day);
			} else {
				time_array.push(str_pad(day, options.significant_days, "0"));
			}
			
			// Calculate number of hours and pad to two digits if required
			var hrs = String(Math.floor((seconds_remaining % 86400) / 3600));
			time_array.push(str_pad(hrs, 2, "0"));
			
			// Calculate number of minutes and pad to two digits if required
			var min = String(Math.floor((seconds_remaining % 3600) / 60));
			time_array.push(str_pad(min, 2, "0"));
			
			// Calculate number of seconds and pad to two digits if required
			var sec = String(Math.floor(seconds_remaining % 60));
			time_array.push(str_pad(sec, 2, "0"));
			
			// Sanitise value of options.separator
			var safe_separator;
			
			switch (true)
			{
				case (options.separator == '') :
				case (options.separator == null) :
					// Empty value passed in by user so default to ':'
					safe_separator = ':';
					break;
					
				case (options.separator.length > 1) :
					// Too many characters passed in so just use first one
					safe_separator = options.separator.substr(0, 1);
					break;
					
				default :
					safe_separator = options.separator;
			}
			
			// Collapse entire array into a string and return
			return time_array.join(safe_separator);
		};
		
		/*
		 * Wrap IN HTML
		 *
		 * Dissassemble the formatted time string and wrap in HTML elements with label values for units
		 *
		 * @param	time_str	Time string formatted a ddd:hh:mm:ss
		 *
		 * @return	str			Time remaining in HTML format for CSS styling
		 */
		var wrap_in_html = function (time_str)
		{
			var css_class;
			var label;
			
			// Create opening container element
			var html_output = '<div class="clock-bezel">';
			
			// Iterate over characters in formatted time string
			for (i = 0; i < time_str.length; i ++)
			{				
				chr = time_str.substr(i, 1);
				
				// Determine whether character is a separator or a digit and set CSS class accordingly
				if (chr == options.separator){
					css_class = 'separator';
				} else {
					css_class = 'digit number-' + chr;
				}
				
				// Create container element to hold character and apply CSS clas
				var html = '<div class="' + css_class + '">' + chr + '</div>';
				
				// "Digit" divs are groped within a "unit" container which includes a label to display the type of
				// unit e.g. Days, Hours, Minutes etc. The position of the character in the time string allows us to
				// determine which group of units the digit belongs to and whether it is the first or last in its group
				switch (i)
				{
					// Deal with MOST significant digit of current unit
					case 0 :
					case time_str.length - 2 :
					case time_str.length - 5 :
					case time_str.length - 8 :
						// New group of units - open div and prepend to digit HTML
						html = '<div class="unit"><div class="digits">' + html;
						break;
						
					case time_str.length - 1 :
						// Append Seconds label and close unit group
						html += '</div><div class="label">Ñåêóíäû</div></div>';
						break;
						
					case time_str.length - 4 :
						// Append Minutes label and close unit group
						html += '</div><div class="label">Ìèíóòû</div></div>';
						break;
						
					case time_str.length - 7 :
						// Append Hours label and close unit group
						html += '</div><div class="label">×àñû</div></div>';
						break;
						
					case time_str.length - 9 :
						// Append Days label and close unit group
						html += '</div><div class="label">Äíè</div></div>';
						break;
						
					default :
						// Do nowt
				}
				
				// Append HTML for current character to output
				html_output += html;
			}
			
			// Close initial container element
			html_output += '</div>';
			
			// Return the assembled HTML
			return html_output;
		}
		
		/*
		 * String Pad
		 *
		 * Takes string and left pads it to desired length using character supplied. If padding 
		 * is more than one character in length only the first character will be used.
		 *
		 * @param	input	Original string
		 * @param	len		Desired length [optional: defaults to input length + 1]
		 * @param	str		Character with which input should be padded [optional: defaults to 0]
		 *
		 * @return	str		Input string left padded to desired lenght
		 */ 
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
				padding += str.substr(0, 1);
			}
			
			return padding + input;
		}
		
		$.extend(options, config_options);
		initialise(this);
		
		return (this);
	};
		
})(jQuery);