define([
    './attach-attr',
    './attach-class',
    './attach-css',
    './attach-events'
], function (attachAttr, attachClass, attachCss, attachEvents) {
    /**
     * Creates an element and returns the element
     * @exports create-element
     *
     * @requires module:attach-attr
     * @requires module:attach-class
     * @requires module:attach-css
     * @requires module:attach-events
     *
     * @param {string} tag The HTML tag type in which to create
     * @param {object} params Contains paramaters to be used for the creation of the element
     * @property {object} params.attr Contains the attributes and values for the HTMLNode
     * @property {object} params.css Contains the css styling to be added to the element
     * @property {string|array} params.cssNames Contains css class name or names in which to attach to an element.
     * @property {object} params.events Contains event handlers to be attached to an element
     * @property {string} params.innerHTML A string representation of DOM elements to attach as children to the ele
     * @property {array} params.nodes An array containing elements to create as children
     * @property {array} params.children An array of HTMLNodes to append as children to the element
     * @param {object} doc Optionally pass the document in which to create the element apart of
     *
     * @returns ele The HTML element created with css and attributes added to passed from params
     *
     * @example
     * ```js
     * var childEle = createElement('div'),
     * 	params = {
     * 		attr: {
     * 			'id': 'some-div'
     * 		}
     * 		events: {
     * 			click: function () {
     * 				console.log('Fire me when I am clicked');
     * 		  }
     * 	   },
     * 	   css: {
     * 		  border: '1px solid black',
     * 		  backgroundColor: 'red'
     * 	   },
     * 	   cssNames: ['legen', 'wait-for-it', 'dary'],
     * 	   innerHTML: '<div class="simpsons"><span class="bart"></span></div>',
     * 	   nodes: [
     * 	   	{
     * 	   		tag: 'div',
     * 	   		cssNames: 'family-guy',
     * 	   		nodes: {
     * 	   			tag: 'span',
     * 				cssNames: 'peter'
     * 			}
     * 		}
     * 	   ],
     * 	   children: [
     * 	   	childEle
     * 	   ]
     *     },
     *     ele = createElement('div', params, top.document);
     * // Ele becomes
     * // <div style="border: 1px solid black; background-color: red;" class="legen wait-for-it dary">
     * //   <div class="simpsons"><span class="bart"></span></div>
     * //   <div class="family-guy"><span class="peter"></span></div>
     * //   <div></div>
     * // </div>
     * // Clicking on the main div will console log
     * ```
     */
    function createElement (tag, params, doc) {
        doc = doc || document;
        var ele = doc.createElement(tag),
            inner;

        if (typeof params === 'undefined') {
            return ele;
        }

        attachEvents(ele, params.events);
        attachAttr(ele, params.attr);
        attachCss(ele, params.css);
        attachClass(ele, params.cssNames);

        if (params.innerHTML) {
            ele.innerHTML = params.innerHTML;
        }

        // Using an object create new elements with this same module
        if (params.nodes) {
            inner = params.nodes;

            for (var i = 0; i < inner.length; i++) {
                ele.appendChild(createElement(inner[i].tag, inner[i], doc));
            }
        }

        // Will add DOM elements which have already been created as children
        if (params.children) {
            for (var y = 0; y < params.children.length; y++) {
                ele.appendChild(params.children[y]);
            }
        }

        return ele;
    }

    return createElement;
});
