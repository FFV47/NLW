- [CSS](#css)
	- [inline dentro de FlexBox](#inline-dentro-de-flexbox)
	- [ID’s have special browser functionality](#ids-have-special-browser-functionality)
	- [JavaScript cares](#javascript-cares)

# CSS

## inline dentro de FlexBox

Elementos inline se tornam inline-blocl ou block dentro do flex container

## ID’s have special browser functionality

Classes have no special abilities in the browser, but ID’s do have one very important trick up their sleeve. This is the “hash value” in the URL. If you have a URL like http://yourdomain.com#comments, the browser will attempt to locate the element with an ID of “comments” and will automatically scroll the page to show that element. It is important to note here that the browser will scroll whatever element it needs to in order to show that element, so if you did something special like a scrollable DIV area within your regular body, that div will be scrolled too.

This is an important reason right here why having ID’s be absolutely unique is important. So your browser knows where to scroll!

## JavaScript cares

JavaScript people are already probably more in tune with the differences between classes and ID’s. JavaScript depends on there being only one page element with any particular id, or else the commonly used getElementById function wouldn’t be dependable. For those familiar with jQuery, you know how easy it is to add and remove classes to page elements. It is a native and built-in function of jQuery. Notice how no such function exists for ID’s. It is not the responsibility of JavaScript to manipulate these values, it would cause more problems than it would be worth.