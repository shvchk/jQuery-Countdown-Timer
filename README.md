jQuery Countdown Timer
======================
A lightweight (924B minified and gzipped) jQuery plug-in to display a digital clock which counts down to a specified time and date.

Display output can be rendered as simple text or wrapped in HTML to facilitate CSS styling. A sample CSS file is included along with accompanying sprite image.

The timer counts down to zero and stops.


Configuration Options
---------------------
Countdown Timer supports the following user definable options.

-   **display_as_text:** Boolean value. When set as "true" the remaining time is displayed in simple text. When set as the default "false" the remaining time is wrapped in HTML to facilitate CSS styling.

-   **to:** Date time string to count down to. String must be formatted as yyyy:mm:dd:mm:ss. Default value is "2111:11:11:11:11".

-   **separator:** If the display_as_text value is set to true, then this value will be used to separate the digits in the countdown display. If an empty or null value is passed the default colon (:) is used. If a string containing multiple characters is passed then only the first character will be used.

-   **significant_days:** If the number of days requires fewer digits than set here, then the vaule is left padded with zeros. Default number of day digits is 2.

-   **UTC:** Boolean value. When set as "true" the time to count down to is considered to be universal (UTC). When set as the default "false" the time to count down to is considered to be local.


Implementation
--------------
A sample implementation is provided in the accompanying HTML document "demo.html". Live demo: http://jsfiddle.net/Shevchuk/AghR3/

Countdown Timer requires the jQuery library to be loaded. Insert the following code into your HTML document where you would like the Countdown Timer to appear.

	<div id="clock">Counter goes here</div>

The content of the div element is arbitrary and will be overwritten by the Countdown Timer. The CSS identifier (i.e. "clock") is also arbitrary but should match the corresponding identifier in the jQuery function call. 

The jQuery "ready" function may then be used to instantiate the Countdown Timer within the page.

	<script type="text/javascript">
	$(document).ready(function() {
		$('#clock').countdown( { to : '2011:12:25:00:00' } );
	});
	</script>


HTML Output
-----------
If display_as_text is set as true the Countdown Timer will output the time remaining wrapped in HTML to facilitate CSS styling. The HTML prototype is as follows (without the white space).

	<div class="clock-bezel">
		<div class="unit">
			<div class="digits">
				<div class="digit number-9">9</div>
				<div class="digit number-8">7</div>
				<div class="digit number-7">7</div>
			</div>
			<div class="label">Days</div>
		</div>
		<div class="separator">:</div>
		<div class="unit">
			<div class="digits">
				<div class="digit number-0">0</div>
				<div class="digit number-1">1</div>
			</div>
			<div class="label">Hours</div>
		</div>
		<div class="separator">:</div>
		<div class="unit">
			<div class="digits">
				<div class="digit number-2">2</div>
				<div class="digit number-3">3</div>
			</div>
			<div class="label">Minutes</div>
		</div>
		<div class="separator">:</div>
		<div class="unit">
			<div class="digits">
				<div class="digit number-4">4</div>
				<div class="digit number-5">5</div>
			</div>
			<div class="label">Seconds</div>
		</div>
	</div>

License
-------
Author: Duncan McMillan

Copyright (c) January 2011 Art & Soul
http://www.artandsoul.co.uk

Released under the MIT license.
http://en.wikipedia.org/wiki/MIT_License
