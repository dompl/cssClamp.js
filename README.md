
# CSS Clamp Functionality

## Overview

This repository contains JavaScript functions to implement CSS clamp functionality. It dynamically adjusts the font size of elements based on specified minimum, preferred, and maximum values.

## Functions

### `cssClamp(element)`

#### Description

This function takes an HTML element as a parameter and applies the clamp functionality to it.

#### How it works

- Retrieves the `data-clamp` attribute value from the element.
- Validates the number of values in the `data-clamp` attribute.
- Trims and assigns the values of `min`, `preferred`, and `max` from the `data-clamp` attribute.
- Calculates the viewport width (`vw`) and viewport height (`vh`).
- Retrieves the root font size of the document.
- Converts the `min`, `preferred`, and `max` values to pixels.
- Returns the clamped font size.

### `applyClamp()`

#### Description

This function applies the clamp functionality to all elements with the `data-clamp` attribute.

#### How it works

- Selects all elements with the `data-clamp` attribute.
- Iterates over the selected elements.
- Calls `cssClamp()` for each element and assigns the returned clamped font size.

## Usage

### Applying the Clamp Initially

Call `applyClamp()` to apply the clamp functionality when the page loads.

### Re-applying the Clamp on Window Resize

Add an event listener to the window object for the resize event to call `applyClamp()` whenever the window is resized.
