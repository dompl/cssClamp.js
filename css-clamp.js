/**
The cssClamp function:
This function takes an element as a parameter, representing an HTML element to which the clamp functionality will be applied.
It retrieves the data-clamp attribute value from the element using getAttribute('data-clamp'). This attribute should contain three comma-separated values: min, preferred, and max.
It performs validation to ensure that the data-clamp attribute contains the correct number of values. If the length is not 3, it logs an error message to the console and returns.
It trims and assigns the values of min, preferred, and max from the data-clamp attribute.
It calculates the viewport width (vw) and viewport height (vh) of the browser window.
It retrieves the root font size of the document using getComputedStyle and parseFloat.
It converts the preferred value to pixels (preferredInPx) based on the provided units (vw, vh, or rem) or directly if no unit is specified.
It converts the min and max values to pixels (minValue and maxValue) based on the provided units (px, vw, or rem).
Finally, it returns the clamped font size, which is calculated as the maximum value between minValue, preferredInPx, and maxValue.
The applyClamp function:

This function is responsible for applying the clamp functionality to all elements with the data-clamp attribute.
It selects all elements with the data-clamp attribute using document.querySelectorAll('[data-clamp]').
It iterates over the selected elements using a for loop.
For each element, it calls the cssClamp function and assigns the returned clamped font size to the element's fontSize CSS property.
Applying the clamp initially:

The applyClamp function is called immediately to apply the clamp functionality to all elements on the page when the code is executed initially.
Re-applying the clamp on window resize:

An event listener is added to the window object for the resize event.
Whenever the window is resized, the applyClamp function is called again to reapply the clamp functionality to all elements, ensuring the font size adjusts dynamically to the new viewport dimensions.
 */

function cssClamp(element) {
	var clampValues = element.getAttribute('data-clamp').split(',');

	if (clampValues.length !== 3) {
		console.error('Invalid clamp values');
		return;
	}

	var min = clampValues[0].trim();
	var preferred = clampValues[1].trim();
	var max = clampValues[2].trim();

	var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

	var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

	var preferredInPx;
	if (preferred.endsWith('vw')) {
		preferredInPx = (parseFloat(preferred) / 100) * vw;
	} else if (preferred.endsWith('vh')) {
		preferredInPx = (parseFloat(preferred) / 100) * vh;
	} else if (preferred.endsWith('rem')) {
		preferredInPx = parseFloat(preferred) * rootFontSize;
	} else {
		preferredInPx = parseFloat(preferred);
	}

	var minValue;
	if (min.endsWith('px')) {
		minValue = parseFloat(min);
	} else if (min.endsWith('vw')) {
		minValue = (parseFloat(min) / 100) * vw;
	} else if (min.endsWith('rem')) {
		minValue = parseFloat(min) * rootFontSize;
	}

	var maxValue;
	if (max.endsWith('px')) {
		maxValue = parseFloat(max);
	} else if (max.endsWith('vw')) {
		maxValue = (parseFloat(max) / 100) * vw;
	} else if (max.endsWith('rem')) {
		maxValue = parseFloat(max) * rootFontSize;
	}

	return Math.max(minValue, Math.min(preferredInPx, maxValue));
}

function clampSupported() {
	return (
		CSS.supports('width', 'clamp(0px, 1vw, 1px)') &&
		CSS.supports('height', 'clamp(0px, 1vw, 1px)') &&
		CSS.supports('padding', 'clamp(0px, 1vw, 1px)') &&
		CSS.supports('font-size', 'clamp(0px, 1vw, 1px)')
	);
}

function applyClamp() {
	// Only run this code if CSS clamp() is not supported
	if (!clampSupported()) {
		var elements = document.querySelectorAll('[data-clamp]');

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			element.style.fontSize = cssClamp(element) + 'px';
		}
	}
}

// Apply initially
applyClamp();

// Re-apply whenever the window is resized
window.addEventListener('resize', applyClamp);
