[![Travis CI Build Status](https://img.shields.io/travis/rockabox/Auxilium.js/master.svg)](https://travis-ci.org/rockabox/Auxilium.js)
[![Coverage Status](https://img.shields.io/coveralls/rockabox/Auxilium.js/master.svg)](https://coveralls.io/r/rockabox/Auxilium.js?branch=master)
![Bower version](https://img.shields.io/bower/v/Auxilium.js.svg)
[![NPM devDependencies](https://img.shields.io/david/dev/rockabox/Auxilium.js.svg)](https://david-dm.org/rockabox/Auxilium.js#info=devDependencies)

# Auxilium.js
Rockabox's AMD utility helpers, which work with IE7+.

Primarily this project is used in conjunction with [webpack](http://webpack.github.io/) builds being included in via bower, however this should work with any AMD loaders such as Require. Documentation for the modules can be found [here](#all-modules).

# Using within your project

This project is downloadable via bower using
```sh
bower install Auxilium.js
```

## Using with webpack

Within this project the file ``webpack.base.config.js`` provides an Object of aliases to use with Webpack.

```js
var aliases = require('./<YOUR_BOWER_FILE>/Auxilium.js/webpack.base.config.js');
wepback.resolve.alias = aliases;
```

This will now mean that within your own project using ``aux/`` will now straight alias to this project allowing all modules to be used such as:

```js
define([
    'aux/attach-events'
], function (attachEvents) {
    // Attach events module will now be accessible within your Webpack module.
});
```

<a name="all-modules"></a>

# ajax
  A module to allow for cross-browser AJAX calls

**Members**

* [ajax](#module_ajax)
  * [ajax.load(url, method, onload, onerror)](#module_ajax.load)
  * [ajax.getRequest()](#module_ajax.getRequest)
  * [ajax.loadJson(url, method, onload, onerror)](#module_ajax.loadJson)

<a name="module_ajax.load"></a>
####ajax.load(url, method, onload, onerror)
Execute ajax request

**Params**

- url `string` - Location of json file  
- method `string` - Defaults to get  
- onload `function` - Success callback  
- onerror `function` - Error callback  

**Returns**: `object` - XMLHTTP request object  
<a name="module_ajax.getRequest"></a>
####ajax.getRequest()
Retrieves the correct XMLHTTP object

**Returns**: `object` - XMLHTTP request object  
<a name="module_ajax.loadJson"></a>
####ajax.loadJson(url, method, onload, onerror)
Exactly the same as load but will parse the response
into a JSON object.

**Params**

- url `string` - Location of json file  
- method `string` - Defaults to get  
- onload `function` - Success callback  
- onerror `function` - Error callback  

**Returns**: `object` - XMLHTTP request object  


# attach-attr
  A module which attaches DOM attribles to an element.

**Params**

- ele `object` - A DOM Element in which to add the CSS to.  
- attrs `object` - Attributes in which to add to the Element in an object  

**Returns**: `object` - ele  Passes the element with attributes attached.  
**Example**  
```js
var imgEle = document.createElement('img'),
		attr = {
			'src': 'http://example.com/something.gif',
   		'width': '100',
   		'height': '200'
  	};

attachAttr(imgEle, attr);

// Returns imgEle (<img src="http://example.com/something.gif" width="100" height="200" />)
```



# attach-class
  Add CSS Classes to an element if there is an array passed or a singular class name if a string

**Params**

- ele `object` - Element in which to add the class/classes.  
- names `string` | `array` - The class name or names in which to add.  

**Returns**: `object` - Element with added class or classes  
**Example**  
```js
// Attach mulitple classes to an element
var ele = document.createElement('div'),
		names = ['IP', 'Freely'];

attachClass(ele, names);
// Returns ele
// (<div class="IP Freely"></div>)

// Attach a single class to an element
var ele = document.createElement('div'),
		names = 'barney-stinson';

attachClass(ele, names);
// Returns ele
// (<div class="barney-stinson"></div>)
```



# attach-css
  A module which attaches inline styling to an html element.

**Params**

- ele `object` - A DOM Element in which to add the CSS to.  
- css `object` - CSS in which to add to the Element in an object  

**Returns**: `object` - ele  Passes the element with css attached to style attribute.  
**Example**  
```js
 var div = document.createElement('div'),
		css = {
			'position': 'relative',
   		'backgroundColor': 'black'
  	};
 attachCss(ele, css);
 // Returns div (<div style="position: relative; background-colour: black"></div>)
 ```



# attach-events
  Attaches multiple events to an element using the Auxilium Events system.

**Params**

- ele `Object` - The DOM Element in which to attach the events to.  
- handlers `Object` - An object containing all of the different event types in which to attach a function to.  

**Returns**:  - ele  
**Example**  
```js
var div = document.createElement('div'),
		handlers = {
			click: function () {
				console.log('Fire me when theres a click on the element');
			},
			load: function () {
				console.log('Fire me when the element has loaded');
			}
		};

// Returns div
// clicking on the div will result in a console.log and the function within handlers.click to fire.
```



# clone
  Clones an object or array.

**Params**

- obj `object` - The base object which to make a fresh copy of  

**Returns**: `object` - A fresh instance of the object originally passed  


# console-logger
  Using the browsers console logging options, allowing to use console.error if accessible otherwise fallsback to
console.log (again if accessible).

**Params**

- message `*` - Message to log out  
- type `String` - What logging system to use error, log (defaults to log).  



# create-element
  Creates an element and returns the element

**Params**

- tag `string` - The HTML tag type in which to create  
- params `object` - Contains paramaters to be used for the creation of the element  
- doc `object` - Optionally pass the document in which to create the element apart of  

**Properties**

  - params.attr `object` - Contains the attributes and values for the HTMLNode  
  - params.css `object` - Contains the css styling to be added to the element  
  - params.cssNames `string` | `array` - Contains css class name or names in which to attach to an element.  
  - params.events `object` - Contains event handlers to be attached to an element  
  - params.innerHTML `string` - A string representation of DOM elements to attach as children to the ele  
  - params.nodes `array` - An array containing elements to create as children  
  - params.children `array` - An array of HTMLNodes to append as children to the element  

**Returns**:  - ele The HTML element created with css and attributes added to passed from params  
**Example**  
```js
var childEle = createElement('div'),
	params = {
		attr: {
			'id': 'some-div'
		}
		events: {
			click: function () {
				console.log('Fire me when I am clicked');
		  }
	   },
	   css: {
		  border: '1px solid black',
		  backgroundColor: 'red'
	   },
	   cssNames: ['legen', 'wait-for-it', 'dary'],
	   innerHTML: '<div class="simpsons"><span class="bart"></span></div>',
	   nodes: [
	   	{
	   		tag: 'div',
	   		cssNames: 'family-guy',
	   		nodes: {
	   			tag: 'span',
				cssNames: 'peter'
			}
		}
	   ],
	   children: [
	   	childEle
	   ]
    },
    ele = createElement('div', params, top.document);
// Ele becomes
// <div style="border: 1px solid black; background-color: red;" class="legen wait-for-it dary">
//   <div class="simpsons"><span class="bart"></span></div>
//   <div class="family-guy"><span class="peter"></span></div>
//   <div></div>
// </div>
// Clicking on the main div will console log
```



# css-events
  A module to add and remove CSS events to an element.

**Members**

* [css-events](#module_css-events)
  * [css-events.cssEvents#addEvent(ele, eventType, callback)](#module_css-events.cssEvents#addEvent)
  * [css-events.cssEvents#removeEvent(ele, eventType, callback)](#module_css-events.cssEvents#removeEvent)

<a name="module_css-events.cssEvents#addEvent"></a>
####css-events.cssEvents#addEvent(ele, eventType, callback)
Attach CSS Events on to an element (cross browser for Chrome, Firefox, IE and Opera)

- AnimationStart
- AnimationIteration
- AnimationEnd
- TransitionStart
- TransitionEnd

**Params**

- ele `object` - The DOM Element in which to attach the CSS event handler to  
- eventType `string` - Which type of css event to listen for.  
- callback `function` - A function in which to trigger once the CSS animation / transition has been triggered  

**Example**  
```js
var cssEvents = new CssEvents();
cssEvents.addEvent('<div></div>', 'AnimationEnd', function () {
	console.log('hi there');
});

// The console log (hi there) will trigger once the Animation has ended.
```

<a name="module_css-events.cssEvents#removeEvent"></a>
####css-events.cssEvents#removeEvent(ele, eventType, callback)
Removes CSS Events on to an element (cross browser for Chrome, Firefox, IE and Opera)

- AnimationStart
- AnimationIteration
- AnimationEnd
- TransitionStart
- TransitionEnd

**Params**

- ele `object` - The DOM Element in which to attach the CSS event handler to  
- eventType `string` - Which type of css event to listen for.  
- callback `function` - The function in which to no longer trigger.  

**Example**  
```js
var cssEvents = new CssEvents();
cssEvents.removeEvent('<div></div>', 'AnimationEnd', function () {
	console.log('hi there');
});

// The original event that was listening to AnimationEnd in all browsers would be removed.
```



# error
  A module which deals with handling errors (helper to throw error's).

**Params**

- message `string` - Error message  



# events
  A module to attach and fire events on an element.

**Members**

* [events](#module_events)
  * [events.Events#addListeners(ele, eventTypes, handler)](#module_events.Events#addListeners)
  * [events.Events#addListener(ele, eventType, handler)](#module_events.Events#addListener)
  * [events.Events#handleEvent(ele, event, data)](#module_events.Events#handleEvent)
  * [events.Events#removeEvent(ele, eventType, handler)](#module_events.Events#removeEvent)
  * [events.triggerEvent(ele, eventType, data)](#module_events#triggerEvent)

<a name="module_events.Events#addListeners"></a>
####events.Events#addListeners(ele, eventTypes, handler)
Registers multiple events to an element with callback.

**Params**

- ele `object` - Element to listener on  
- eventTypes `string` - Event names separated by spaces  
- handler `function` - Function that will be called when the
                          events are triggered.  

**Example**  
```js
var ele = '<div>Some element</div>',
	type = 'click mouseover',
	eventHandler = function () {
		console.log('Log on click and mouse over')
	};

events.addListeners(ele, type, eventHandler);
```

<a name="module_events.Events#addListener"></a>
####events.Events#addListener(ele, eventType, handler)
Registers event to an element with callback. If an event already
exists on the element, we add the function to our own event system.

**Params**

- ele `object` - Element to listener on  
- eventType `string` - Event name  
- handler `function` - Function that will be called when this event is triggered.  

<a name="module_events.Events#handleEvent"></a>
####events.Events#handleEvent(ele, event, data)
Fires any registered events.

**Params**

- ele `object` - Element to fire registered events from  
- event `object` - Event object  
- data `object` - Data to pass with event  

**Access**: protected  
<a name="module_events.Events#removeEvent"></a>
####events.Events#removeEvent(ele, eventType, handler)
Remove a registered event from an element

**Params**

- ele `object` - Element to remove a registered event from  
- eventType `string` - Event name  
- handler `function` - Function that was originally called when this event is triggered.  

<a name="module_events#triggerEvent"></a>
####events.triggerEvent(ele, eventType, data)
Trigger an event on a given element.

**Params**

- ele `object` - Element to trigger an event from  
- eventType `string` - Event name  
- data `object` - Data to pass with event  



# generate-uuid
  Generate a UUID v4 in JavaScript

**Returns**: `String` - A random generated uuid  
**Example**  
```js
var uuid = generateUUID();
// Returns 110ec58a-a0f2-4ac4-8393-c866d813b8d1
```



# get-element-by-tag
  Get all elements with a certain tag name within an element and fire a callback passing the element.

**Params**

- ele `object` - The containing object in which to search within  
- tag `string` - The type of tag name in which should be looked for  
- callback `function` - A function in which to be fired being passed the element found  

**Returns**:  - All of the elements found with the tag specified inside the ele  
**Example**  
```js
// Within the DOM
<div id="muppets">
		<div id="kermit"></div>
		<div id="gonzo"></div>
		<span id="fuzzy"></span>
</div>
// JS
var ele = document.getElementById('muppets'),
		logEle = function (ele) {
			console.log(ele);
		},
		eles = getElementByTag(ele, 'div', logEle);
// Returns <div id="kermit"></div> <div id="gonzo"></div>
// Will console log both elements div elements with id gonzo and kermit
```



# get-elements-by-class
  A cross-browser function usable for IE7+, Chrome, Firefox & Safari in order to search within
an element for all elements with a specific class name.

**Params**

- parent `object` - The parent element in which to search through for the element.  
- className `string` - A string representation of the class name in which to search for.  
- \[tagName\] `string` - A string representation of the tag name the class is assigned to.  

**Returns**: `object` - result An array of elements found within the element with the class passed through.  
**Example**  
```js
// DOM
<div id="main-content">
		<div class="muppets" id="kermit">
			<span class="muppets" id="miss-piggy"></span>
   </div>
   <div class="muppets" id="gonzo">
	  		<span class="muppets" id="rat"></span>
     </div>
     <div class="muppets" id="fuzzy"></div>
</div>

// JS
var eles = getElementByClassName(document.body, 'muppets');
// Returns
// All elements with class muppets, id's:
// - kermit
// - miss-piggy
// - gonzo
// - rat
// - fuzzy

var mainContent = document.getElementById('main-content'),
		eleSpan = getElementByClassName(mainContent, 'muppets', 'span');
// Returns
// Elements with class muppets and is a span tag
// - miss-piggy
// - rat
```



# get-highest-accessible-window
  Get the highest accessible window

**Params**

- \[win\] `object` - The window in which to get the parent of (defaults to current window)  

**Returns**: `object` - Accessible window object  
**Example**  
```js
var topWindow = false,
	win = {
		top: topWindow,
 	parent: {
 		document: {
 			domain: 'this'
 		}
 	}
};
getHighestAccessibleWindow(win);
// Will return the window (parent win.parent), as we do not have access to the top window
```



# get-orientation
  **Params**

- orientation `Number` - The orientation of the device (will fallback to use window.orientation).  

**Example**  
```js
getOrientation(90);
// Returns 'landscape'

getOrientation(0);
// Returns 'portrait'

getOrientation();
// Returns portrait (if no orientation can be found)
```



# get-parameter-by-name
  Get a parameter from the URL

**Params**

- url `string` - The URL containing the params  
- name `string` - The name to get the param for  

**Returns**: `string` - Containing a decoded URI version of the param  
**Example**  
```js
var urlPath = 'http://www.example.com?id=921',
	id = getParameterByName(urlPath, 'id');
// id is 921

var name = getParameterByName(urlPath, 'name');
// name is ''
```



# get-url-info
  Gets information from about a url. Domain, Port, Protocol etc.

**Params**

- url `String` - The URL in which to check  

**Properties**

  - info.hash `string` - The part of the url that is hashed (#someValue)  
  - info.host `string` - The domain with the port attached  
  - info.hostname `string` - The domain with no port or protocol  
  - info.href `string` - The original URL passed to the function  
  - info.pathname `string` - The path of the url (/search)  
  - info.port `string` - The portnumber of the url (912) - can be blank if none specified  
  - info.protocol `string` - The protocol of the url (http: or https:)  
  - info.search `string` - The query paramaters of the url (?a=foo&b=bar)  

**Returns**: `Object` - info The information about the URL within an Object  
**Example**  
```js
var info = getUrlInfo('https://www.some-example.com:912/my-page?a=foo&b=bar#somehash');
// Returns
{
	hash: '#somehash',
	host: 'www.some-example.com:912',
	hostname: 'www.some-example.com',
	href: 'https://www.some-example.com:912/my-page?a=foo&b=bar#somehash',
	pathname: '/my-page',
	port: '912',
	protocol: 'https:',
	search: '?a=foo&b=bar'
}
```



# has-class
  Checks whether or not an element has a specific class name.

**Params**

- ele `object` - Element to test.  
- name `string` - Class name you want to see if the element contains.  

**Returns**: `boolean` - Whether or not the element has the class name.  
**Example**  
```js
ele = <div class="kermit gonzo"></div>
hasClass(div, 'gonzo');
// Returns true

ele = <div class="cookiemonster"></div>
hasClass(div, 'kermit');
// Returns false
```



# has-property
  Checks whether an object has the given properties

**Params**

- obj `Object` - Object to check  
- path `String` - Properties to check  

**Returns**: `Boolean` - True if the given object contains the properties  
**Example**  
```js
var testObj = {
		'cartoons': {
			'simpsons': {
				'Barney': 'I am here!'
			}
		}
};

// Returns true (that Barney key exists on the simpons object key).
hasProperty(testObj, 'cartoons.simpsons.Barney');

// Returns false (that Ash key does not exist on the simpons object key).
hasProperty(testObj, 'cartoons.simpsons.Ash');
```



# hyphen-to-camel
  Converts a hyphen string into camel case

**Params**

- string `String` - String to convert  

**Returns**: `String` - Camel cased string  
**Example**  
```js
hyphenToCamel('barney-stinson');
// Returns
// barneyStinson
```



# in-array
  Returns whether or not a value is within an array (IE8 helper)

**Params**

- arr `Array` - The array in which to check contains a particular value.  
- value `*` - The value in which to check the array contains.  

**Returns**: `Boolean` - Whether or not the value is within the array.  
**Example**  
```js
var arr = [0, 9, 2];

inArray(arr, 9);
// Returns true;

inArray(arr, 1);
// Returns false;
```



# inner-html
  Attaches a string representation of a DOM to an element ensuring that a script tag is created rather than
simply using innerHTML to ensure it will be executable when attached to the DOM.
NOTE: When invalid HTML is passed to the function it will throw an error

**Params**

- node `Object` - The HTML DOMNode in which to attach the html to  
- html `String` - The string representation of the DOM  

**Returns**: `Object` - node The HTML DOMNode with the string representation attached (inside).  
**Example**  
```js
var div = document.createElement('div');
div = innerHTML(div, '<span></span>');
// Returns '<div><span></span></div>'

div = innerHTML(div, '<script>console.log("log something");</script>');
// Returns '<div><script>console.log("log something");</script></div>'
// Executing the script tag once attached to the document body
```



# is-defined
  **Params**

- check `*` - The variable to check that is defined  
- type `String` - The type your expecting the variable to be defined as.  

**Returns**: `Boolean` - When the variable is undefined it will pass back false otherwise pass back true.  
**Example**  
```js
var barney;
isDefined(barney);
// Returns false

var barney = 'stinson';
isDefined(barney);
// Returns true

isDefined(barney, 'string');
// Returns true

isDefined(barney, 'function');
// Returns false
```



# is-trusted
  **Params**

- event `Event` - The variable containing an event  

**Returns**: `Boolean` - When the event is not trusted it will pass back false otherwise pass back true.  
**Example**  
```js
isTrusted(MouseEvent);
// Returns true/false
```



# load-script
  A loader for Javascript files on the page using a script tag.

**Members**

* [load-script](#module_load-script)
  * [load-script.this.addListeners(onload, onerror)](#module_load-script.this.addListeners)
  * [load-script.this.init()](#module_load-script.this.init)
  * [load-script.this.load(src)](#module_load-script.this.load)
  * [load-script.this.render()](#module_load-script.this.render)
  * [load-script.this.getScript()](#module_load-script.this.getScript)

<a name="module_load-script.this.addListeners"></a>
####load-script.this.addListeners(onload, onerror)
Adds load and error listeners on to the script tag.

**Params**

- onload `function` - A callback function which should be called when the file has loaded.  
- onerror `function` - A callback fired when an error occurs loading the file.  

**Returns**: `Object` - Script DOM node.  
<a name="module_load-script.this.init"></a>
####load-script.this.init()
Set's up the constructor calling the getScript method.

**Returns**: `Object` - script The script DOM node.  
<a name="module_load-script.this.load"></a>
####load-script.this.load(src)
Load's the file via the script tag on to the page.

**Params**

- src `String` - The URL to the file in which to load.  

**Returns**: `Object` - script The script DOM node.  
<a name="module_load-script.this.render"></a>
####load-script.this.render()
Renders the script node to the page via a script tag.

**Returns**: `Object` - script The script DOM node.  
<a name="module_load-script.this.getScript"></a>
####load-script.this.getScript()
Creates a DOM element for the script tag.

**Returns**: `Object` - s The script DOM node.  


# merge
  Combines two objects where the values on the first object is replaced. Will modify the first object!

**Params**

- obj1 `object` - Base object which will be updated  
- obj2 `object` - Extra values  

**Returns**: `object` - Merged object  


# multi-ajax
  A module to perform several AJAX calls

**Members**

* [multi-ajax](#module_multi-ajax)
  * [multi-ajax.MultiAjax#_loadJsonCallbackGenerator(urls, index, method, onload, onerror, responses)](#module_multi-ajax.MultiAjax#_loadJsonCallbackGenerator)
  * [multi-ajax.MultiAjax#_loadJson(urls, index, method, onload, onerror, responses)](#module_multi-ajax.MultiAjax#_loadJson)
  * [multi-ajax.MultiAjax#loadJson(urls, method, onload, onerror)](#module_multi-ajax.MultiAjax#loadJson)

<a name="module_multi-ajax.MultiAjax#_loadJsonCallbackGenerator"></a>
####multi-ajax.MultiAjax#_loadJsonCallbackGenerator(urls, index, method, onload, onerror, responses)
Return a function that can be used as a callback for the Json loading requests.

**Params**

- urls `Array.<string>` - Location of json files  
- index `integer` - Index of the url being processed  
- method `string` - Defaults to get  
- onload `function` - Success callback  
- onerror `function` - Error callback  
- responses `Array.<Object>` - Partial response, array containing all the responses collected by previous requests  

**Access**: protected  
<a name="module_multi-ajax.MultiAjax#_loadJson"></a>
####multi-ajax.MultiAjax#_loadJson(urls, index, method, onload, onerror, responses)
Request and parse a single Json object, using a generated callback to collect the response.

**Params**

- urls `Array.<string>` - Location of json files  
- index `integer` - Index of the url being processed  
- method `string` - Defaults to get  
- onload `function` - Success callback  
- onerror `function` - Error callback  
- responses `Array.<Object>` - Partial response, array containing all the responses collected by previous requests  

**Access**: protected  
<a name="module_multi-ajax.MultiAjax#loadJson"></a>
####multi-ajax.MultiAjax#loadJson(urls, method, onload, onerror)
Execute several ajax requests parsing the responses into a list of JSON objects.

**Params**

- urls `Array.<string>` - Location of json files  
- method `string` - Defaults to get  
- onload `function` - Success callback  
- onerror `function` - Error callback  



# offset
  Gets the X and Y offset of an element to the current window and whether or not the element is positioned within
a fixed element.

**Params**

- ele `Object` - The HTMLNode in which to get the axis of.  

**Properties**

  - offset.x `Number` - The X axis of the offset from the window (top).  
  - offset.y `Number` - The Y axis of the offset from the window (left).  
  - offset.fixed `Boolean` - Whether or not the element is nested within a fixed element.  

**Returns**: `Object` - offset The X and Y axis of the offset from the window  
**Example**  
```js
var ele = '<div style="margin-top: 10px; margin-left: 140px;"></div>',
	testEle = '<div></div>';

ele.appendChild(testEle);

offset(testEle);
// Returns
{
	x: 10,
	y: 140,
	fixed: true
}
```



# offset-rect
  A module to get the X and Y offset of an element to the passed window.

**Example**  
```js
var offsetRect = new OffsetRect(),
 ele = '<div style="margin-top: 10px; margin-left: 140px;"></div>',
	testEle = '<div></div>'
 win = top.window;

ele.appendChild(testEle);

offsetRect.getOffsetRect(testEle, win);
// Returns
{
	x: 10,
	y: 140
}
```

<a name="module_offset-rect.OffsetRect#getOffsetRect"></a>
####offset-rect.OffsetRect#getOffsetRect(ele, wind)
Get get the X and Y offset of an element to the passed window.

**Params**

- ele `Object` - The HTMLNode in which to get the axis of.  
- wind `Object` - The window in which to get the offset  

**Properties**

  - offset.x `Number` - The X axis of the offset from the window (top).  
  - offset.y `Number` - The Y axis of the offset from the window (left).  

**Returns**: `Object` - offset The X and Y axis of the offset from the window  


# parallax-scrolling
  Scroll an HTML element at a different rate to the browsers scroll ensuring that all of the element's content
is displayed whilst it's in view of the viewport

NOTE: It is required that the element is positioned with absoulte relative to it's wrapper.

**Example**  
```js
var parallaxScrolling = new ParallaxScrolling(),
	parallaxHelper = parallaxScrolling.init(ele, 300, 100, true, window);

// When the window is scrolled we want to fire the parallax handler
events.addListener(window, 'scroll', function () {
	parallaxHelper();
});

// When the window is resized we want to fire the parallax helper
events.addListener(window, 'resize', function () {
	parallaxHelper();
});
```

**Members**

* [parallax-scrolling](#module_parallax-scrolling)
  * [parallax-scrolling._events](#module_parallax-scrolling#_events)
  * [parallax-scrolling.ParallaxScrolling#_scrollPercentTriggers(ele, percentage)](#module_parallax-scrolling.ParallaxScrolling#_scrollPercentTriggers)
  * [parallax-scrolling.ParallaxScrolling#init(ele, container, eleHeight, viewableHeight, [win])](#module_parallax-scrolling.ParallaxScrolling#init)
  * [parallax-scrolling~handler(overrideWin, overrideOffset)](#module_parallax-scrolling..handler)
  * [parallax-scrolling~resetOffset()](#module_parallax-scrolling..resetOffset)

<a name="module_parallax-scrolling#_events"></a>
####parallax-scrolling._events
The Auxillium event system used by the Parallax scrolling module

**Type**: `Object`  
<a name="module_parallax-scrolling.ParallaxScrolling#_scrollPercentTriggers"></a>
####parallax-scrolling.ParallaxScrolling#_scrollPercentTriggers(ele, percentage)
Trigger an event of aux.scroll-percent with the percentage when a tenth percentile, ensuring that it does not
trigger more than once for a percent.

**Params**

- ele `Object` - The element in which to trigger the event on.  
- percentage `Number` - The percentage (rounded) in which to trigger.  

**Returns**: `Boolean` - Whether the percentage was triggered or not.  
**Access**: protected  
<a name="module_parallax-scrolling.ParallaxScrolling#init"></a>
####parallax-scrolling.ParallaxScrolling#init(ele, container, eleHeight, viewableHeight, [win])
Initialise the a new parallax scrolling handler

**Params**

- ele `Object` - The element in which to scroll  
- container `Object` - The container of the element in which to take into consideration for scroll points  
- eleHeight `Number` - The full size of the element  
- viewableHeight `Number` - The amount of the element in which should be viewable at any one time  
- \[win\] `Object` - Optionally pass the window in which should be checked for the size of the viewport  

**Returns**: `Object` - An object of helper functions to be used the main handler function to be fire.  
<a name="module_parallax-scrolling..handler"></a>
####parallax-scrolling~handler(overrideWin, overrideOffset)
A handler in which to fire when scrolling.
Allows passing a new window object through the handler and the offset of the container.

**Params**

- overrideWin `Object` - A new window object to be used (useful for iFrame neseting).  
- overrideOffset `Object` - Manually override the offset of the container (iframe nesting again).  

**Scope**: inner function of [parallax-scrolling](#module_parallax-scrolling)  
**Returns**: `Number` - The scrollY position of the what the element should be.  
<a name="module_parallax-scrolling..resetOffset"></a>
####parallax-scrolling~resetOffset()
Reset the offset top that is used by the handler this is to be used by scroll or resize events for
example.

**Scope**: inner function of [parallax-scrolling](#module_parallax-scrolling)  
**Returns**: `Number` - The top offset of the container element.  


# prepend
  Prepend a DOM element before another

**Params**

- parent `Object` - The DOM Element we will be inserting `node` after  
- node `Object` - The DOM Element we will be inserting after `parent`  

**Example**  
```js
ele = <div class="elmo"></div>
parent = <div class="sesamestreet"></div>
prepend(parent, ele)
```



# remove-class
  Remove a single class from an element.

**Params**

- ele `object` - Element to remove class from.  
- name `string` - Class name in which to remove.  

**Returns**: `object` - Element with class removed.  
**Example**  
```js
var element = '<div class="red-dwarf lister">';
element = removeClass('lister');

// Returns
// element (<div class="red-dwarf"></div>)
```



# remove-element
  Removes an elements child node and optionally the node itself.

**Params**

- node `Object` - HTML node to act upon  
- self `Boolean` - Optional: Remove the entire node

return {Object} Original HTML node  

**Example**  
```html
<body>
<div class="my-parent">
		<div>
			<span></span>
	 	</div>
		<img />
 </div>
</body>
```
```js
removeElement(myParent);
// Returns <body> (containing <div class="my-parent"></div>)
```
```js
removeElement(myParent, true)
// Returns <body></body (no longer containing <div class="my-parent"></div>)
```



# scale
  **Members**

* [scale](#module_scale)
  * [scale.init(win, node, width, height, fullscreen)](#module_scale.init)
  * [scale._scaleHandler(win, node, width, height, fullscreen)](#module_scale._scaleHandler)

<a name="module_scale.init"></a>
####scale.init(win, node, width, height, fullscreen)
Will scale the element to the size of the window, ensuring that it doesn't exceed the max
width and height.

**Params**

- win `Object` - Window object that we will resize to  
- node `Object` - Element to apply scale to  
- width `Number` - The elements max-width  
- height `Number` - The elements max-height  
- fullscreen `Boolean` - Whether to scale to the fullscreen (going over the original width and height)  

**Example**  
```js
var htmlNode = document.createElement('div');
scale.init(htmlNode, 600, 400);

// Will make the htmlNode element scale when scrolling or the window is resized to the
// size of the window with a max of 600px wide and 400px tall.
```

<a name="module_scale._scaleHandler"></a>
####scale._scaleHandler(win, node, width, height, fullscreen)
Returns a function to be used for listening to events.

**Params**

- win `Object` - Window object that we will resize to  
- node `Object` - Element to apply scale to  
- width `Number` - Node width  
- height `Number` - Node height  
- fullscreen `Boolean` - Whether to scale to the fullscreen (going over the original width and height)  

**Returns**: `function` - Event handler  
**Access**: protected  


# serialize
  Serialize's an object into query params for a URL
Passes & between params (? or & not prefixed)

**Params**

- queryParams `object` - The different params to serialize (key becomes &param value becomes =value)  

**Returns**: `string` - Passes back a serialized version from the object ready to be used for a URL  
**Example**  
```js
var queryParams = {
	'first_name': 'Bart',
 'last_name': 'Simpson'
};
serialize(queryParams);
// returns
// first_name=Bart&last_name=Simpson
```



# style-tag
  A module helper to create, attach and get the contents of a style tag

**Members**

* [style-tag](#module_style-tag)
  * [style-tag~attach(params)](#module_style-tag..attach)
  * [style-tag~contents(node)](#module_style-tag..contents)
  * [style-tag~generate(params)](#module_style-tag..generate)

<a name="module_style-tag..attach"></a>
####style-tag~attach(params)
Attaches a css to a specific document

**Params**

- params `Object` - The paramaters for the style tag  

**Properties**

  - params.css `String` - The css text in which to attach to the Style tag  
  - params.document `Object` - The specific document to attach the Style tag (Optional)  
  - params.id `String` - A specific unique identifier of the style tag  

**Scope**: inner function of [style-tag](#module_style-tag)  
**Returns**: `Object` - The style tag with the css attached (and attached to the document)  
**Example**  
```js
var css = 'body { margin: 0 auto; };',
 styleAttached = styleTag.attach({
   css: css,
   document: document,
   id: 'fred-flinston'
 });
// Returns a style tag with it attached to the document body
styleAttached = styleTag.attach({
   css: css,
   document: document,
   id: 'fred-flinston'
 });
// Running a second time will return the first instance of the style tag
```

<a name="module_style-tag..contents"></a>
####style-tag~contents(node)
Retrieves the contents of a given style tag

**Params**

- node `Object` - The style HTMLNode in which to get the contents  

**Scope**: inner function of [style-tag](#module_style-tag)  
**Returns**: `Object` - The text within the style tag (the CSS).

```js
style = '<style>body { margin: 0; }',
styleContents = styleTag.contents(style);
// Returns 'body { margin: 0; }'
```  
<a name="module_style-tag..generate"></a>
####style-tag~generate(params)
Creates a Style tag and attaches the css, checking if the script tag with the specific ID exists already.

**Params**

- params `Object` - The paramaters for the style tag  

**Properties**

  - params.css `String` - The css text in which to attach to the Style tag  
  - params.document `Object` - The specific document to attach the Style tag (Optional)  
  - params.id `String` - A specific unique identifier of the style tag  

**Scope**: inner function of [style-tag](#module_style-tag)  
**Returns**: `Object` - The style tag with the css attached  
**Example**  
```js
var css = 'body { margin: 0 auto; };',
 styleAttached = styleTag.generate({
   css: css,
   document: document,
   id: 'fred-flinston'
 });
// Returns a style tag with css contents attached
```


