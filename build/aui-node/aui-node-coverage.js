if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/aui-node/aui-node.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-node/aui-node.js",
    code: []
};
_yuitest_coverage["/build/aui-node/aui-node.js"].code=["AUI.add('aui-node-base', function(A) {","/**"," * aui-node-base A set of utility methods to the Node."," *"," * @module aui-node"," * @submodule aui-node-base"," */","","var Lang = A.Lang,","	isArray = Lang.isArray,","	isFunction = Lang.isFunction,","	isObject = Lang.isObject,","	isString = Lang.isString,","	isUndefined = Lang.isUndefined,","	isValue = Lang.isValue,","","	AArray = A.Array,","	Node = A.Node,","	NodeList = A.NodeList,","","	getClassName = A.getClassName,","	getRegExp = A.DOM._getRegExp,","","	prefix = Lang.String.prefix,","","	CONFIG = A.config,","	DOC = CONFIG.doc,","	WIN = CONFIG.win,","","	NODE_PROTO = Node.prototype,","	NODELIST_PROTO = NodeList.prototype,","","	STR_EMPTY = '',","","	ARRAY_EMPTY_STRINGS = [STR_EMPTY, STR_EMPTY],","","	HELPER = 'helper',","	OFFSET = 'offset',","","	CSS_HELPER_FORCE_OFFSET = getClassName(HELPER, 'force', OFFSET),","	CSS_HELPER_HIDDEN = getClassName(HELPER, 'hidden'),","	CSS_HELPER_UNSELECTABLE = getClassName(HELPER, 'unselectable'),","","	CHILD_NODES = 'childNodes',","	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',","	INNER = 'inner',","	INNER_HTML = 'innerHTML',","	NEXT_SIBLING = 'nextSibling',","	NONE = 'none',","	OUTER = 'outer',","	PARENT_NODE = 'parentNode',","	REGION = 'region',","	SCRIPT = 'script',","","	SUPPORT_CLONED_EVENTS = false,","","	VALUE = 'value',","","	MAP_BORDER = {","		b: 'borderBottomWidth',","		l: 'borderLeftWidth',","		r: 'borderRightWidth',","		t: 'borderTopWidth'","	},","	MAP_MARGIN = {","		b: 'marginBottom',","		l: 'marginLeft',","		r: 'marginRight',","		t: 'marginTop'","	},","	MAP_PADDING = {","		b: 'paddingBottom',","		l: 'paddingLeft',","		r: 'paddingRight',","		t: 'paddingTop'","	},","","	prefixSelector = function(ns, id) {","		return '#' + prefix(ns, id);","	},","","	formatSelectorNS = function(ns, selector) {","		return selector.replace(getRegExp('(#|\\\\[id=(\\\\\\\"|\\\\\\'))(?!' + ns + ')', 'g'), '$1' + ns);","	};","","	/*","		Parts of this file are used from jQuery (http://jquery.com)","		Dual-licensed under MIT/GPL","	*/","	var div = DOC.createElement('div');","","	div.style.display = 'none';","	div.innerHTML = '   <table></table>&nbsp;';","","	if (div.attachEvent && div.fireEvent) {","		div.attachEvent(","			'onclick',","			function(){","				SUPPORT_CLONED_EVENTS = true;","","				div.detachEvent('onclick', arguments.callee);","			}","		);","","		div.cloneNode(true).fireEvent('onclick');","	}","","	var SUPPORT_OPTIONAL_TBODY = !div.getElementsByTagName('tbody').length;","","	var REGEX_LEADING_WHITE_SPACE = /^\\s+/,","		REGEX_IE8_ACTION = /=([^=\\x27\\x22>\\s]+\\/)>/g,","		REGEX_TAGNAME = /<([\\w:]+)/;","","	div = null;","","	Node.cssId = prefixSelector;","","	Node.formatSelectorNS = formatSelectorNS;","","/**"," * Augment the <a href=\"Node.html\">YUI3 Node</a> with more util methods."," *"," * Check the list of <a href=\"Node.html#methods\">Methods</a> available for"," * AUI Node."," *"," * @class A.Node"," * @constructor"," * @uses Node"," */","A.mix(NODE_PROTO, {","	allNS: function(ns, selector) {","		var instance = this;","","		return instance.all(formatSelectorNS(ns, selector));","	},","","	/**","	 * <p>Returns the current ancestors of the node element. If a selector is","	 * specified, the ancestors are filtered to match the selector.</p>","     *","     * Example:","     *","	 * <pre><code>","	 * A.one('#nodeId').ancestors('div');","	 * </code></pre>","	 *","	 * @method ancestors","	 * @param {String} selector A selector to filter the ancestor elements against.","	 * @return {NodeList}","	 */","	ancestors: function(selector) {","		var instance = this;","","		var ancestors = [];","		var currentEl = instance.getDOM();","","		while (currentEl && currentEl.nodeType !== 9) {","			if (currentEl.nodeType === 1) {","				ancestors.push(currentEl);","			}","","			currentEl = currentEl.parentNode;","		}","","		var nodeList = new A.all(ancestors);","","		if (selector) {","			nodeList = nodeList.filter(selector);","		}","","		return nodeList;","	},","","	/**","	 * <p>Returns the current ancestors of the node element filtered by a className.","	 * This is an optimized method for finding ancestors by a specific CSS class name.</p>","     *","     * Example:","     *","	 * <pre><code>","	 * A.one('#nodeId').ancestorsByClassName('aui-helper-hidden');","	 * </code></pre>","	 *","	 * @method ancestors","	 * @param {String} selector A selector to filter the ancestor elements against.","	 * @return {NodeList}","	 */","	ancestorsByClassName: function(className) {","		var instance = this;","","		var ancestors = [];","		var cssRE = new RegExp('\\\\b' + className + '\\\\b');","		var currentEl = instance.getDOM();","","		while (currentEl && currentEl.nodeType !== 9) {","			if (currentEl.nodeType === 1 && cssRE.test(currentEl.className)) {","				ancestors.push(currentEl);","			}","","			currentEl = currentEl.parentNode;","		}","","		return A.all(ancestors);","	},","","	/**","	 * <p>Insert the node instance to the end of the <code>selector</code>","     * element.</p>","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * // using another Node instance","	 * var body = A.one('body');","	 * node.appendTo(body);","	 * // using a CSS selector","	 * node.appendTo('#container');","	 * </code></pre>","	 *","	 * @method appendTo","	 * @chainable","	 * @param {Node | String} selector A selector, element, HTML string, Node","	 * @return {String}","	 */","	appendTo: function(selector) {","		var instance = this;","","		A.one(selector).append(instance);","","		return instance;","	},","","	/**","	 * <p>Get or Set the value of an attribute for the first element in the","     * set of matched elements. If only the <code>name</code> is passed it","     * works as a getter.</p>","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * node.attr('title', 'Setting a new title attribute');","	 * // Alert the value of the title attribute: 'Setting a new title attribute'","	 * alert( node.attr('title') );","	 * </code></pre>","	 *","	 * @method attr","	 * @param {String} name The name of the attribute","	 * @param {String} value The value of the attribute to be set. Optional.","	 * @return {String}","	 */","	attr: function(name, value) {","		var instance = this;","","		if (!isUndefined(value)) {","			var el = instance.getDOM();","","			if (name in el) {","				instance.set(name, value);","			}","			else {","				instance.setAttribute(name, value);","			}","","			return instance;","		}","		else {","			if (isObject(name)) {","				for (var i in name) {","					instance.attr(i, name[i]);","				}","","				return instance;","			}","","			var currentValue = instance.get(name);","","			if (!Lang.isValue(currentValue)) {","				currentValue = instance.getAttribute(name);","			}","","			return currentValue;","		}","	},","","	/**","	 * Normalizes the behavior of cloning a node, which by default should not clone","	 * the events that are attached to it.","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * node.clone().appendTo('body');","	 * </code></pre>","	 *","	 * @method clone","	 * @return {Node}","	 */","	clone: (function() {","		var clone;","","		if (SUPPORT_CLONED_EVENTS) {","			clone = function() {","				var el = this.getDOM();","				var clone;","","				if (el.nodeType != 3) {","					var outerHTML = this.outerHTML();","","					outerHTML = outerHTML.replace(REGEX_IE8_ACTION, '=\"$1\">').replace(REGEX_LEADING_WHITE_SPACE, STR_EMPTY);","","					clone = Node.create(outerHTML);","				}","				else {","					clone = A.one(el.cloneNode());","				}","","				return clone;","			};","		}","		else {","			clone = function() {","				return this.cloneNode(true);","			};","		}","","		return clone;","	})(),","","	/**","	 * <p>Centralize the current Node instance with the passed","     * <code>val</code> Array, Node, String, or Region, if not specified, the body will be","     * used.</p>","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * // Center the <code>node</code> with the <code>#container</code>.","	 * node.center('#container');","	 * </code></pre>","	 *","	 * @method center","	 * @chainable","	 * @param {Array | Node | Region | String} val Array, Node, String, or Region to center with","	 */","	center: function(val) {","		var instance = this,","			nodeRegion = instance.get(REGION),","			x,","			y;","","		if (isArray(val)) {","			x = val[0];","			y = val[1];","		}","		else {","			var region;","","			if (isObject(val) && !A.instanceOf(val, A.Node)) {","				region = val;","			}","			else {","				region = (A.one(val) || A.getBody()).get(REGION);","			}","","			x = region.left + (region.width / 2);","			y = region.top + (region.height / 2);","		}","","		instance.setXY([x - (nodeRegion.width / 2), y - (nodeRegion.height / 2)]);","	},","","	/**","	 * <p>This method removes not only child (and other descendant) elements,","     * but also any text within the set of matched elements. This is because,","     * according to the DOM specification, any string of text within an element","     * is considered a child node of that element.</p>","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * node.empty();","	 * </code></pre>","	 *","	 * @method empty","	 * @chainable","	 */","	empty: function() {","		var instance = this;","","		instance.all('>*').remove().purge();","","		var el = Node.getDOMNode(instance);","","		while (el.firstChild) {","			el.removeChild(el.firstChild);","		}","","		return instance;","	},","","	/**","	 * Retrieves the DOM node bound to a Node instance. See","     * <a href=\"Node.html#method_getDOMNode\">getDOMNode</a>.","	 *","	 * @method getDOM","	 * @return {HTMLNode} The DOM node bound to the Node instance.","	 */","	getDOM: function() {","		var instance = this;","","		return Node.getDOMNode(instance);","	},","","	/**","     * Return the combined width of the border for the specified sides.","     *","     * @method getBorderWidth","     * @param {string} sides Can be t, r, b, l or any combination of","     * those to represent the top, right, bottom, or left sides.","     * @return {number}","     */","	getBorderWidth: function(sides) {","		var instance = this;","","		return instance._getBoxStyleAsNumber(sides, MAP_BORDER);","	},","","	/**","	 * Gets the current center position of the node in page coordinates.","	 * @method getCenterXY","	 * @for Node","	 * @return {Array} The XY position of the node","	*/","	getCenterXY: function() {","		var instance = this;","		var region = instance.get(REGION);","","		return [(region.left + region.width/2), (region.top + region.height/2)];","	},","","	/**","     * Return the combined size of the margin for the specified sides.","     *","     * @method getMargin","     * @param {string} sides Can be t, r, b, l or any combination of","     * those to represent the top, right, bottom, or left sides.","     * @return {number}","     */","	getMargin: function(sides) {","		var instance = this;","","		return instance._getBoxStyleAsNumber(sides, MAP_MARGIN);","	},","","	/**","     * Return the combined width of the border for the specified sides.","     *","     * @method getPadding","     * @param {string} sides Can be t, r, b, l or any combination of","     * those to represent the top, right, bottom, or left sides.","     * @return {number}","     */","	getPadding: function(sides) {","		var instance = this;","","		return instance._getBoxStyleAsNumber(sides, MAP_PADDING);","	},","","    /**","     * Set the id of the Node instance if the object does not have one. The","     * generated id is based on a guid created by the","     * <a href=\"YUI.html#method_stamp\">stamp</a> method.","     *","     * @method guid","     * @param {string} prefix optional guid prefix","     * @return {String} The current id of the node","     */","	guid: function(prefix) {","		var instance = this;","		var currentId = instance.get('id');","","		if (!currentId) {","			currentId = A.stamp(instance);","","			instance.set('id', currentId);","		}","","		return currentId;","	},","","    /**","     * Create a hover interaction.","     *","     * @method hover","     * @param {string} overFn","     * @param {string} outFn","     * @return {Node} The current Node instance","     */","	hover: function(overFn, outFn) {","		var instance = this;","","		var hoverOptions;","		var defaultHoverOptions = instance._defaultHoverOptions;","","		if (isObject(overFn, true)) {","			hoverOptions = overFn;","","			hoverOptions = A.mix(hoverOptions, defaultHoverOptions);","","			overFn = hoverOptions.over;","			outFn = hoverOptions.out;","		}","		else {","			hoverOptions = A.mix(","				{","					over: overFn,","					out: outFn","				},","				defaultHoverOptions","			);","		}","","		instance._hoverOptions = hoverOptions;","","		hoverOptions.overTask = A.debounce(instance._hoverOverTaskFn, null, instance);","		hoverOptions.outTask = A.debounce(instance._hoverOutTaskFn, null, instance);","","		instance.on(hoverOptions.overEventType, instance._hoverOverHandler, instance);","		instance.on(hoverOptions.outEventType, instance._hoverOutHandler, instance);","	},","","	/**","     * <p>Get or Set the HTML contents of the node. If the <code>value</code>","     * is passed it's set the content of the element, otherwise it works as a","     * getter for the current content.</p>","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * node.html('Setting new HTML');","	 * // Alert the value of the current content","	 * alert( node.html() );","	 * </code></pre>","     *","     * @method html","     * @param {string} value A string of html to set as the content of the node instance.","     */","	html: function() {","		var args = arguments, length = args.length;","","		if (length) {","			this.set(INNER_HTML, args[0]);","		}","		else {","			return this.get(INNER_HTML);","		}","","		return this;","	},","","	oneNS: function(ns, selector) {","		var instance = this;","","		return instance.one(formatSelectorNS(ns, selector));","	},","","	/**","	 * Gets the outerHTML of a node, which islike innerHTML, except that it","	 * actually contains the HTML of the node itself.","	 *","	 * @return {string} The outerHTML of the given element.","	 */","	outerHTML: function() {","		var instance = this;","		var domEl = instance.getDOM();","","		// IE, Opera and WebKit all have outerHTML.","		if ('outerHTML' in domEl) {","			return domEl.outerHTML;","		}","","		var temp = Node.create('<div></div>').append(","			this.clone()","		);","","		try {","			return temp.html();","		}","		catch(e) {}","		finally {","			temp = null;","		}","	},","","	/**","	 * <p>Inserts a <code>newNode</code> after the node instance (i.e., as the next","	 * sibling). If the reference node has no parent, then does nothing.</p>","	 *","	 * Example:","     *","	 * <pre><code>var titleNode = A.one('#titleNode');","	 * var descriptionNode = A.one('#descriptionNode');","	 * // the description is usually shown after the title","	 * titleNode.placeAfter(descriptionNode);","	 * </code></pre>","	 *","	 * @method placeAfter","	 * @chainable","	 * @param {Node} newNode Node to insert.","	 */","	placeAfter: function(newNode) {","		var instance = this;","","		return instance._place(newNode, instance.get(NEXT_SIBLING));","	},","","	/**","	 * <p>Inserts a <code>newNode</code> before the node instance (i.e., as the previous","	 * sibling). If the reference node has no parent, then does nothing.</p>","	 *","	 * Example:","     *","	 * <pre><code>var descriptionNode = A.one('#descriptionNode');","	 * var titleNode = A.one('#titleNode');","	 * // the title is usually shown before the description","	 * descriptionNode.placeBefore(titleNode);","	 * </code></pre>","	 *","	 * @method placeBefore","	 * @chainable","	 * @param {Node} newNode Node to insert.","	 */","	placeBefore: function(newNode) {","		var instance = this;","","		return instance._place(newNode, instance);","	},","","	/**","	 * <p>Inserts the node instance to the begining of the <code>selector</code>","     * node (i.e., insert before the <code>firstChild</code> of the","     * <code>selector</code>).</p>","	 *","	 * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * node.prependTo('body');","	 * </code></pre>","	 *","	 * @method prependTo","	 * @chainable","	 * @param {Node | String} selector A selector, element, HTML string, Node","	 */","	prependTo: function(selector) {","		var instance = this;","","		A.one(selector).prepend(instance);","","		return instance;","	},","","	/**","	 * Add one or more CSS classes to an element and remove the class(es)","     * from the siblings of the element.","	 *","	 * @method radioClass","	 * @chainable","	 * @param {String} cssClass","	 */","	radioClass: function(cssClass) {","		var instance = this;","","		var siblings = instance.siblings();","","		if (isString(cssClass)) {","			siblings.removeClass(cssClass);","","			instance.addClass(cssClass);","		}","		else if (isArray(cssClass)) {","			var siblingNodes = siblings.getDOM();","","			var regex = getRegExp('(?:^|\\\\s+)(?:' + cssClass.join('|') + ')(?=\\\\s+|$)', 'g');","			var node;","","			for (var i = siblingNodes.length - 1; i >= 0; i--) {","				node = siblingNodes[i];","				node.className = node.className.replace(regex, '');","			}","","			instance.addClass(cssClass.join(' '));","		}","","		return instance;","	},","","	/**","	 * Generate an unique identifier and reset the id attribute of the node","     * instance using the new value. Invokes the","     * <a href=\"Node.html#method_guid\">guid</a>.","	 *","	 * @method resetId","	 * @chainable","	 * @param {String} prefix Optional prefix for the guid.","	 */","	resetId: function(prefix) {","		var instance = this;","","		instance.attr('id', A.guid(prefix));","","		return instance;","	},","","	/**","	 * Selects a substring of text inside of the input element.","	 *","	 * @method selectText","	 * @param {Number} start The index to start the selection range from","	 * @param {Number} end The index to end the selection range at","	 */","	selectText: function(start, end) {","		var instance = this;","","		var textField = instance.getDOM();","		var length = instance.val().length;","","		end = isValue(end) ? end : length;","		start = isValue(start) ? start : 0;","","		// Some form elements could throw a (NS_ERROR_FAILURE)","        // [nsIDOMNSHTMLInputElement.setSelectionRange] error when invoke the","        // setSelectionRange on firefox. Wrapping in a try/catch to prevent the error be thrown","		try {","			if (textField.setSelectionRange) {","				textField.setSelectionRange(start, end);","			}","			else if (textField.createTextRange) {","				var range = textField.createTextRange();","","				range.moveStart('character', start);","				range.moveEnd('character', end - length);","","				range.select();","			}","			else {","				textField.select();","			}","","			if (textField != DOC.activeElement) {","				textField.focus();","			}","		}","		catch(e) {}","","		return instance;","	},","","	/**","	 * Enables text selection for this element (normalized across browsers).","	 *","	 * @method selectable","	 * @chainable","	 */","	selectable: function() {","		var instance = this;","","		instance.getDOM().unselectable = 'off';","		instance.detach('selectstart');","","		instance.setStyles(","			{","				'MozUserSelect': STR_EMPTY,","				'KhtmlUserSelect': STR_EMPTY","			}","		);","","		instance.removeClass(CSS_HELPER_UNSELECTABLE);","","		return instance;","	},","","    /**","     * <p>Stops the specified event(s) from bubbling and optionally prevents the","     * default action.</p>","     *","     * Example:","     *","     * <pre><code>var anchor = A.one('a#anchorId');","     * anchor.swallowEvent('click');","     * </code></pre>","     *","     * @method swallowEvent","     * @chainable","     * @param {String/Array} eventName an event or array of events to stop from bubbling","     * @param {Boolean} preventDefault (optional) true to prevent the default action too","     */","	swallowEvent: function(eventName, preventDefault) {","		var instance = this;","","		var fn = function(event) {","			event.stopPropagation();","","			if (preventDefault) {","				event.preventDefault();","","				event.halt();","			}","","			return false;","		};","","		if(isArray(eventName)) {","			AArray.each(","				eventName,","				function(name) {","					instance.on(name, fn);","				}","			);","","			return this;","		}","		else {","			instance.on(eventName, fn);","		}","","		return instance;","	},","","    /**","     * <p>Get or Set the combined text contents of the node instance,","     * including it's descendants. If the <code>text</code>","     * is passed it's set the content of the element, otherwise it works as a","     * getter for the current content.</p>","     *","     * Example:","     *","	 * <pre><code>var node = A.one('#nodeId');","	 * node.text('Setting new text content');","	 * // Alert the value of the current content","	 * alert( node.text() );","	 * </code></pre>","	 *","     * @method text","     * @param {String} text A string of text to set as the content of the node instance.","     */","	text: function(text) {","		var instance = this;","		var el = instance.getDOM();","","		if (!isUndefined(text)) {","			text = A.DOM._getDoc(el).createTextNode(text);","","			return instance.empty().append(text);","		}","","		return instance._getText(el.childNodes);","	},","","    /**","     * <p>Displays or hide the node instance.</p>","	 *","	 * <p><string>NOTE:</string> This method assume that your node were hidden","     * because of the 'aui-helper-hidden' css class were being used. This won't","     * manipulate the inline <code>style.display</code> property.</p>","	 *","     * @method toggle","     * @chainable","     * @param {Boolean} on Whether to force the toggle. Optional.","     * @param {Function} callback A function to run after the visibility change. Optional.","     */","	toggle: function(on, callback) {","		var instance = this;","","		instance._toggleView.apply(instance, arguments);","","		return instance;","	},","","	/**","	 * Disables text selection for this element (normalized across browsers).","	 *","	 * @method unselectable","	 * @chainable","	 */","	unselectable: function() {","		var instance = this;","","		instance.getDOM().unselectable = 'on';","","		instance.swallowEvent('selectstart', true);","","		instance.setStyles(","			{","				'MozUserSelect': NONE,","				'KhtmlUserSelect': NONE","			}","		);","","		instance.addClass(CSS_HELPER_UNSELECTABLE);","","		return instance;","	},","","    /**","     * <p>Get or Set the value attribute of the node instance. If the","     * <code>value</code> is passed it's set the value of the element,","     * otherwise it works as a getter for the current value.</p>","     *","     * Example:","     *","	 * <pre><code>var input = A.one('#inputId');","	 * input.val('Setting new input value');","	 * // Alert the value of the input","	 * alert( input.val() );","	 * </code></pre>","	 *","     * @method val","     * @param {string} value Value to be set. Optional.","     */","	val: function(value) {","		var instance = this;","","		if (isUndefined(value)) {","			return instance.get(VALUE);","		}","		else {","			return instance.set(VALUE, value);","		}","	},","","	/**","     * Return the combined size of the box style for the specified sides.","     *","     * @method _getBoxStyleAsNumber","     * @param {string} sides Can be t, r, b, l or any combination of","     * those to represent the top, right, bottom, or left sides.","     * @param {string} map An object mapping mapping the \"sides\" param to the a CSS value to retrieve","     * @return {number}","     */","	_getBoxStyleAsNumber: function(sides, map) {","		var instance = this;","","		var sidesArray = sides.match(/\\w/g);","		var value = 0;","		var side;","		var sideKey;","","		for (var i = sidesArray.length - 1; i >= 0; i--) {","			sideKey = sidesArray[i];","			side = 0;","","			if (sideKey) {","				side = parseFloat(instance.getComputedStyle(map[sideKey]));","				side = Math.abs(side);","","				value += side || 0;","			}","		}","","		return value;","	},","","    /**","     * Extract text content from the passed nodes.","	 *","     * @method _getText","     * @private","     * @param {Native NodeList} childNodes","     */","	_getText: function(childNodes) {","		var instance = this;","","		var length = childNodes.length;","		var childNode;","","		var str = [];","","		for (var i = 0; i < length; i++) {","			childNode = childNodes[i];","","			if (childNode && childNode.nodeType != 8) {","				if (childNode.nodeType != 1) {","					str.push(childNode.nodeValue);","				}","","				if (childNode.childNodes) {","					str.push(instance._getText(childNode.childNodes));","				}","			}","		}","","		return str.join(STR_EMPTY);","	},","","	/**","     * The event handler for the \"out\" function that is fired for events attached via the hover method.","	 *","     * @method _hoverOutHandler","     * @private","     * @param {EventFacade} event","     */","	_hoverOutHandler: function(event) {","		var instance = this;","","		var hoverOptions = instance._hoverOptions;","","		hoverOptions.outTask.delay(hoverOptions.outDelay, event);","	},","","	/**","     * The event handler for the \"over\" function that is fired for events attached via the hover method.","	 *","     * @method _hoverOverHandler","     * @private","     * @param {EventFacade} event","     */","	_hoverOverHandler: function(event) {","		var instance = this;","","		var hoverOptions = instance._hoverOptions;","","		hoverOptions.overTask.delay(hoverOptions.overDelay, event);","	},","","	/**","     * Cancels the over task, and fires the users custom \"out\" function for the hover method","	 *","     * @method _hoverOverHandler","     * @private","     * @param {EventFacade} event","     */","	_hoverOutTaskFn: function(event) {","		var instance = this;","","		var hoverOptions = instance._hoverOptions;","","		hoverOptions.overTask.cancel();","","		hoverOptions.out.apply(hoverOptions.context || event.currentTarget, arguments);","	},","","	/**","     * Cancels the out task, and fires the users custom \"over\" function for the hover method","	 *","     * @method _hoverOverHandler","     * @private","     * @param {EventFacade} event","     */","	_hoverOverTaskFn: function(event) {","		var instance = this;","","		var hoverOptions = instance._hoverOptions;","","		hoverOptions.outTask.cancel();","","		hoverOptions.over.apply(hoverOptions.context || event.currentTarget, arguments);","	},","","	/**","     * Place a node or html string at a specific location","	 *","     * @method _place","     * @private","     * @param {Node|String} newNode","     * @param {Node} refNode","     */","	_place: function(newNode, refNode) {","		var instance = this;","","		var parent = instance.get(PARENT_NODE);","","		if (parent) {","			if (isString(newNode)) {","				newNode = Node.create(newNode);","			}","","			parent.insertBefore(newNode, refNode);","		}","","		return instance;","	},","","	_defaultHoverOptions: {","		overEventType: 'mouseenter',","		outEventType: 'mouseleave',","		overDelay: 0,","		outDelay: 0,","		over: Lang.emptyFn,","		out: Lang.emptyFn","	}","}, true);","","NODE_PROTO.__show = NODE_PROTO._show;","NODE_PROTO.__hide = NODE_PROTO._hide;","NODE_PROTO.__isHidden = NODE_PROTO._isHidden;","","NODE_PROTO._isHidden = function() {","	var instance = this;","","	return NODE_PROTO.__isHidden.call(instance) || instance.hasClass(instance._hideClass || CSS_HELPER_HIDDEN);","};","/**"," * <p>Hide the node adding a css class on it. If <code>cssClass</code> is not"," * passed as argument, the className 'aui-helper-hidden' will be used by"," * default.</p>"," *"," * <p><string>NOTE:</string> This method assume that your node were visible"," * because the absence of 'aui-helper-hidden' css class. This won't"," * manipulate the inline <code>style.display</code> property.</p>"," *"," * @method hide"," * @chainable"," * @param {string} cssClass Class name to hide the element. Optional."," */","NODE_PROTO._hide = function() {","	var instance = this;","","	instance.addClass(instance._hideClass || CSS_HELPER_HIDDEN);","","	return instance;","};","","/**"," * <p>Show the node removing a css class used to hide it. Use the same"," * className added using the <a href=\"A.Node.html#method_hide\">hide</a>"," * method. If <code>cssClass</code> is not passed as argument, the"," * className 'aui-helper-hidden' will be used by default.</p>"," *"," * <p><string>NOTE:</string> This method assume that your node were hidden"," * because of the 'aui-helper-hidden' css class were being used. This won't"," * manipulate the inline <code>style.display</code> property.</p>"," *"," * @method show"," * @chainable"," * @param {string} cssClass Class name to hide the element. Optional."," */","NODE_PROTO._show = function() {","	var instance = this;","","	instance.removeClass(instance._hideClass || CSS_HELPER_HIDDEN);","","	return instance;","};","","/**"," * Returns the width of the content, not including"," * the padding, border or margin. If a width is passed,"," * the node's overall width is set to that size."," *"," * Example:"," *"," * <pre><code>var node = A.one('#nodeId');"," * node.width(); //returns content width"," * node.width(100); // sets box width"," * </code></pre>"," *"," * @method width"," * @return {number}"," */","","/**"," * Returns the height of the content, not including"," * the padding, border or margin. If a height is passed,"," * the node's overall height is set to that size."," *"," * Example:"," *"," * <pre><code>var node = A.one('#nodeId');"," * node.height(); //returns content height"," * node.height(100); // sets box height"," * </code></pre>"," *"," * @method height"," * @return {number}"," */","","/**"," * Returns the size of the box from inside of the border,"," * which is the offsetWidth plus the padding on the left and right."," *"," * Example:"," *"," * <pre><code>var node = A.one('#nodeId');"," * node.innerWidth();"," * </code></pre>"," *"," * @method innerWidth"," * @return {number}"," */","","/**"," * Returns the size of the box from inside of the border,"," * which is offsetHeight plus the padding on the top and bottom."," *"," * Example:"," *"," * <pre><code>var node = A.one('#nodeId');"," * node.innerHeight();"," * </code></pre>"," *"," * @method innerHeight"," * @return {number}"," */","","/**"," * Returns the outer width of the box including the border,"," * if true is passed as the first argument, the margin is included."," *"," * Example:"," *"," * <pre><code>var node = A.one('#nodeId');"," * node.outerWidth();"," * node.outerWidth(true); // includes margin"," * </code></pre>"," *"," * @method outerWidth"," * @return {number}"," */","","/**"," * Returns the outer height of the box including the border,"," * if true is passed as the first argument, the margin is included."," *"," * Example:"," *"," * <pre><code>var node = A.one('#nodeId');"," * node.outerHeight();"," * node.outerHeight(true); // includes margin"," * </code></pre>"," *"," * @method outerHeight"," * @return {number}"," */","","A.each(","	['Height', 'Width'],","	function(item, index, collection) {","		var sides = index ? 'lr' : 'tb';","","		var dimensionType = item.toLowerCase();","","		NODE_PROTO[dimensionType] = function(size) {","			var instance = this;","","			var returnValue = instance;","","			if (isUndefined(size)) {","				var node = instance._node;","				var dimension;","","				if (node) {","					if ((!node.tagName && node.nodeType === 9) || node.alert) {","						dimension = instance.get(REGION)[dimensionType];","					}","					else {","						dimension = instance.get(OFFSET + item);","","						var previous = {};","						var styleObj = node.style;","","						if (!dimension) {","							instance.addClass(CSS_HELPER_FORCE_OFFSET);","","							dimension = instance.get(OFFSET + item);","","							instance.removeClass(CSS_HELPER_FORCE_OFFSET);","						}","","						if (dimension) {","							dimension -= (instance.getPadding(sides) + instance.getBorderWidth(sides));","						}","					}","				}","","				returnValue = dimension;","			}","			else {","				instance.setStyle(dimensionType, size);","			}","","			return returnValue;","		};","","		NODE_PROTO[INNER + item] = function() {","			var instance = this;","","			return instance[dimensionType]() + instance.getPadding(sides);","		};","","		NODE_PROTO[OUTER + item] = function(margin) {","			var instance = this;","","			var innerSize = instance[INNER + item]();","			var borderSize = instance.getBorderWidth(sides);","","			var size = innerSize + borderSize;","","			if (margin) {","				size += instance.getMargin(sides);","			}","","			return size;","		};","	}",");","","if (!SUPPORT_OPTIONAL_TBODY) {","	A.DOM._ADD_HTML = A.DOM.addHTML;","","	A.DOM.addHTML = function(node, content, where) {","		var nodeName = (node.nodeName && node.nodeName.toLowerCase()) || STR_EMPTY;","","		var tagName = STR_EMPTY;","","		if (!isUndefined(content)) {","			if (isString(content)) {","				tagName = (REGEX_TAGNAME.exec(content) || ARRAY_EMPTY_STRINGS)[1];","			}","			else if (content.nodeType && content.nodeType == 11 && content.childNodes.length) { // a doc frag","				tagName = content.childNodes[0].nodeName;","			}","			else if (content.nodeName) { // a node","				tagName = content.nodeName;","			}","","			tagName = tagName && tagName.toLowerCase();","		}","","		if (nodeName == 'table' && tagName == 'tr') {","			node = node.getElementsByTagName('tbody')[0] || node.appendChild(node.ownerDocument.createElement('tbody'));","","			var whereNodeName = ((where && where.nodeName) || STR_EMPTY).toLowerCase();","","			// Assuming if the \"where\" is a tbody node,","			// we're trying to prepend to a table. Attempt to","			// grab the first child of the tbody.","			if (whereNodeName == 'tbody' && where.childNodes.length > 0) {","				where = where.firstChild;","			}","		}","","		return A.DOM._ADD_HTML(node, content, where);","	};","}","","/**"," * Augment the <a href=\"NodeList.html\">YUI3 NodeList</a> with more util methods."," *"," * Check the list of <a href=\"NodeList.html#methods\">Methods</a> available for"," * AUI NodeList."," *"," * @class A.NodeList"," * @constructor"," * @uses A.Node"," */","NodeList.importMethod(","	NODE_PROTO,","	[","		'after',","","		'appendTo',","","		'attr',","","		'before',","","		'empty',","","		'hover',","","		'html',","","		'innerHeight',","","		'innerWidth',","","		'outerHeight',","","		'outerHTML',","","		'outerWidth',","","		'prepend',","","		'prependTo',","","		'purge',","","		'selectText',","","		'selectable',","","		'text',","","		'toggle',","","		'unselectable',","","		'val'","	]",");","","A.mix(","	NODELIST_PROTO,","	{","		/**","	     * See <a href=\"Node.html#method_all\">Node all</a>.","	     *","	     * @method all","	     */","		all: function(selector) {","			var instance = this;","","			var newNodeList = [];","			var nodes = instance._nodes;","			var length = nodes.length;","","			var subList;","","			for (var i = 0; i < length; i++) {","				subList = A.Selector.query(selector, nodes[i]);","","				if (subList && subList.length) {","					newNodeList.push.apply(newNodeList, subList);","				}","			}","","			newNodeList = AArray.unique(newNodeList);","","			return A.all(newNodeList);","		},","","		allNS: function(ns, selector) {","			var instance = this;","","			return instance.all(formatSelectorNS(ns, selector));","		},","","		/**","		 * Returns the first element in the node list collection.","		 *","		 * @method first","		 * @return {Node}","		 */","		first: function() {","			var instance = this;","","			return instance.item(0);","		},","","		/**","	     * See <a href=\"Node.html#method_getDOM\">Node getDOM</a>.","	     *","	     * @method getDOM","	     */","		getDOM: function() {","			var instance = this;","","			return NodeList.getDOMNodes(this);","		},","","		/**","		 * Returns the last element in the node list collection.","		 *","		 * @method last","		 * @return {Node}","		 */","		last: function() {","			var instance = this;","","			return instance.item(instance._nodes.length - 1);","		},","","		/**","	     * See <a href=\"Node.html#method_one\">Node one</a>.","	     *","	     * @method one","	     */","		one: function(selector) {","			var instance = this;","","			var newNode = null;","","			var nodes = instance._nodes;","			var length = nodes.length;","","			for (var i = 0; i < length; i++) {","				newNode = A.Selector.query(selector, nodes[i], true);","","				if (newNode) {","					newNode = A.one(newNode);","","					break;","				}","			}","","			return newNode;","		},","","		oneNS: function(ns, selector) {","			var instance = this;","","			return instance.one(formatSelectorNS(ns, selector));","		}","	}",");","","NODELIST_PROTO.__filter = NODELIST_PROTO.filter;","","NODELIST_PROTO.filter = function(value, context) {","	var instance = this;","","	var newNodeList;","","	if (isFunction(value)) {","		var nodes = [];","","		instance.each(","			function(item, index, collection) {","				if (value.call(context || item, item, index, collection)) {","					nodes.push(item._node);","				}","			}","		);","","		newNodeList = A.all(nodes);","	}","	else {","		newNodeList = NODELIST_PROTO.__filter.call(instance, value);","	}","","	return newNodeList;","};","","A.mix(","	NodeList,","	{","		create: function(html) {","			var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT);","","			return docFrag.append(html).get(CHILD_NODES);","		}","	}",");","","A.mix(","	A,","	{","		/**","	     * Get the body node. Shortcut to <code>A.one('body')</code>.","		 *","	     * @method getBody","	     */","		getBody: function() {","			var instance = this;","","			if (!instance._bodyNode) {","				instance._bodyNode = A.one(DOC.body);","			}","","			return instance._bodyNode;","		},","","		/**","	     * Get the document node. Shortcut to <code>A.one(document)</code>.","		 *","	     * @method getDoc","	     */","		getDoc: function() {","			var instance = this;","","			if (!instance._documentNode) {","				instance._documentNode = A.one(DOC);","			}","","			return instance._documentNode;","		},","","		/**","	     * Get the window node. Shortcut to <code>A.one(window)</code>.","		 *","	     * @method getWin","	     */","		getWin: function() {","			var instance = this;","","			if (!instance._windowNode) {","				instance._windowNode = A.one(WIN);","			}","","			return instance._windowNode;","		}","	}",");","","A.queryNS = function(ns, selector, methodName) {","	return A[methodName || 'one'](formatSelectorNS(ns, selector));","};","","A.oneNS = A.queryNS;","","A.allNS = function(ns, selector) {","	return A.queryNS(ns, selector, 'all');","}","","A.byIdNS = function(ns, id) {","	return A.one(prefixSelector(ns, id));","};","","// Patch for http://yuilibrary.com/projects/yui3/ticket/2531537","","var addMethod = NodeList.addMethod;","","AArray.each(","	['hide', 'show'],","	function(item, index, collection) {","		addMethod(","			item,","			function() {","				return this[item].apply(this, arguments);","			}","		);","	}",");","","}, '@VERSION@' ,{requires:['aui-base-lang','aui-classnamemanager','node']});","AUI.add('aui-node-html5', function(A) {","/**"," * aui-node-html5 provides support for HTML shiv natively on the Alloy dom"," * methods. The HTML5 shiv just affects IE."," *"," * @module aui-node"," * @submodule aui-node-html5"," */","","if (A.UA.ie) {","	/**","	 * <p>An object that encapsulates util methods for HTML5 shiving.</p>","	 * <h2>What is a \"shiv\"?</h1>","	 * <p>To the world, a shiv is a slang term for a sharp object used as a","     * knife-like weapon. To Internet Explorer, a shiv is a script that, when","     * executed, forces the browser to recognize HTML5 elements.</p>","	 *","	 * @class A.HTML5","	 */","	var HTML5 = A.namespace('HTML5'),","		DOM_create = A.DOM._create;","","	if (!HTML5._fragHTML5Shived) {","		/**","		 * A global DocumentFragment already HTML5 shived, for performance","         * reasons. (i.e., all nodes and its HTML5 children appended to this","         * fragment iherits the styles on IE).","		 *","		 * @property A.HTML._fragHTML5Shived","		 * @type DocumentFragment (shived)","		 * @protected","		 */","		HTML5._fragHTML5Shived = YUI.AUI.html5shiv(","			A.config.doc.createDocumentFragment()","		);","	}","","	A.mix(","		HTML5,","		{","			/**","			 * Receives a <code>frag</code> and a HTML content. This method","             * shivs the HTML5 nodes appended to a Node or fragment which is not","             * on the document yet.","			 *","			 * @method IECreateFix","			 * @param {Node | DocumentFragment} frag Fragment to be fixed.","			 * @param {String} content HTML to be set (using innerHTML) on the <code>frag</code>.","			 * @return {Node | DocumentFragment}","			 */","			IECreateFix: function(frag, content) {","				var shivedFrag = HTML5._fragHTML5Shived;","","				shivedFrag.appendChild(frag);","","				frag.innerHTML = content;","","				shivedFrag.removeChild(frag);","","				return frag;","			},","","			/**","			 * AOP listener to the A.DOM._create method. This method","             * intercepts all the calls to the A.DOM._create and append the","             * generated fragment to <a","             * href=\"A.HTML5.html#property_A.HTML._fragHTML5Shived\">A.HTML._fragHTML5Shived</a>,","             * this fixes the IE bug for painting the HTML5 nodes on the HTML","             * fragment.","			 *","			 * @method _doBeforeCreate","			 * @param {String} html HTML content","			 * @param {String} doc","			 * @param {String} tag","			 * @protected","			 * @return {DocumentFragment}","			 */","			_doBeforeCreate: function(html, doc, tag) {","				var createdFrag = DOM_create.apply(this, arguments);","","				var shivedFrag = HTML5.IECreateFix(createdFrag, html);","","				return new A.Do.Halt(null, shivedFrag);","			}","		}","	);","","	A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);","}","","}, '@VERSION@' ,{requires:['collection','aui-base']});","AUI.add('aui-node-html5-print', function(A) {","var CONFIG = A.config,","	DOC = CONFIG.doc,","	WIN = CONFIG.win,","	UA = A.UA,","	IE = UA.ie,","","	isShivDisabled = function() {","		return WIN.AUI_HTML5_IE === false;","	};","","if (!IE || IE >= 9 || isShivDisabled()) {","	return;","}","","var BUFFER_CSS_TEXT = [],","","	CSS_PRINTFIX = 'aui-printfix',","	CSS_PRINTFIX_PREFIX = 'aui-printfix-',","","	LOCATION = WIN.location,","","	DOMAIN = LOCATION.protocol + '//' + LOCATION.host,","","	GLOBAL_AUI = YUI.AUI,","","	HTML = DOC.documentElement,","","	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,","	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,","	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),","","	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),","	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),","	REGEX_ELEMENTS_FAST = new RegExp('\\\\b(' + HTML5_ELEMENTS_LIST + ')\\\\b', 'i'),","","	REGEX_PRINT_MEDIA = /print|all/,","","	REGEX_RULE = new RegExp('(^|[^\\\\n{}]*?\\\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),","	REGEX_TAG = new RegExp('<(\\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),","","	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',","","	STR_ALL = 'all',","	STR_BLANK = ' ',","	STR_EMPTY = '',","","	STR_BRACKET_OPEN = '{',","	STR_BRACKET_CLOSE = '}',","","	STR_CHECKBOX = 'checkbox',","	STR_CHECKED = 'checked',","	STR_HTTPS = 'https',","	STR_INPUT = 'INPUT',","	STR_OPTION = 'OPTION',","	STR_RADIO = 'radio',","	STR_SELECTED = 'selected',","	STR_STAR = '*',","	STR_URL = 'url(',","	STR_URL_DOMAIN = STR_URL + DOMAIN,","","	TAG_REPLACE_ORIGINAL = '<$1$2',","	TAG_REPLACE_FONT = '<$1font';","","var html5shiv = GLOBAL_AUI.html5shiv,","	// Yes, IE does this wackiness; converting an object","	// to a string should never result in undefined, but","	// IE's styleSheet object sometimes becomes inaccessible","	// after trying to print the second time","	isStylesheetDefined = function(obj) {","		return obj && (obj + STR_EMPTY !== undefined);","	},","","	toggleNode = function(node, origNode, prop) {","		var state = origNode[prop];","","		if (state) {","			node.setAttribute(prop, state);","		}","		else {","			node.removeAttribute(prop);","		}","	};","","	html5shiv(DOC);","","var PrintFix = function() {","	var afterPrint = function() {","		if (isShivDisabled()) {","			destroy();","		}","		else {","			PrintFix.onAfterPrint();","		}","	};","","	var beforePrint = function() {","		if (isShivDisabled()) {","			destroy();","		}","		else {","			PrintFix.onBeforePrint();","		}","	};","","	var destroy = function() {","		WIN.detachEvent('onafterprint', afterPrint);","		WIN.detachEvent('onbeforeprint', beforePrint);","	};","","	var init = function() {","		WIN.attachEvent('onafterprint', afterPrint);","		WIN.attachEvent('onbeforeprint', beforePrint);","	};","","	init();","","	PrintFix.destroy = destroy;","	PrintFix.init = init;","};","","A.mix(","	PrintFix,","	{","		onAfterPrint: function() {","			var instance = this;","","			instance.restoreHTML();","","			var styleSheet = instance._getStyleSheet();","","			styleSheet.styleSheet.cssText = STR_EMPTY;","		},","","		onBeforePrint: function() {","			var instance = this;","","			var styleSheet = instance._getStyleSheet();","			var cssRules = instance._getAllCSSText();","","			styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);","","			instance.writeHTML();","		},","","		parseCSS: function(cssText) {","			var instance = this;","","			var css = STR_EMPTY;","			var rules = cssText.match(REGEX_RULE);","","			if (rules) {","				css = rules.join('\\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);","			}","","			return css;","		},","","		restoreHTML: function() {","			var instance = this;","","			var bodyClone = instance._getBodyClone();","			var bodyEl = instance._getBodyEl();","","			bodyClone.innerHTML = STR_EMPTY;","","			HTML.removeChild(bodyClone);","			HTML.appendChild(bodyEl);","		},","","		writeHTML: function() {","			var instance = this;","","			var i = -1;","			var j;","","			var bodyEl = instance._getBodyEl();","","			var html5Element;","","			var cssClass;","","			var nodeList;","			var nodeListLength;","			var node;","			var buffer = [];","","			while (++i < HTML5_ELEMENTS_LENGTH) {","				html5Element = HTML5_ELEMENTS[i];","","				nodeList = DOC.getElementsByTagName(html5Element);","				nodeListLength = nodeList.length;","","				j = -1;","","				while (++j < nodeListLength) {","					node = nodeList[j];","","					cssClass = node.className;","","					if (cssClass.indexOf(CSS_PRINTFIX_PREFIX) == -1) {","						buffer[0] = CSS_PRINTFIX_PREFIX + html5Element;","						buffer[1] = cssClass;","","						node.className = buffer.join(STR_BLANK);","					}","				}","			}","","			var docFrag = instance._getDocFrag();","			var bodyClone = instance._getBodyClone();","","			docFrag.appendChild(bodyEl);","			HTML.appendChild(bodyClone);","","			bodyClone.className = bodyEl.className;","			bodyClone.id = bodyEl.id;","","			var originalNodes = bodyEl.getElementsByTagName(STR_STAR);","			var length = originalNodes.length;","","			// IE will throw a mixed content warning when using https","			// and calling clone node if the body contains elements with","			// an inline background-image style that is relative to the domain.","			if (UA.secure) {","				var bodyElStyle = bodyEl.style;","","				var elStyle;","				var backgroundImage;","","				bodyElStyle.display = 'none';","","				for (i = 0; i < length; i++) {","					elStyle = originalNodes[i].style;","","					backgroundImage = elStyle.backgroundImage;","","					if (backgroundImage &&","						backgroundImage.indexOf(STR_URL) > -1 &&","						backgroundImage.indexOf(STR_HTTPS) == -1) {","","						elStyle.backgroundImage = backgroundImage.replace(STR_URL, STR_URL_DOMAIN);","					}","				}","","				bodyElStyle.display = STR_EMPTY;","			}","","			var bodyElClone = bodyEl.cloneNode(true);","","			var newNodes = bodyElClone.getElementsByTagName(STR_STAR);","","			if (length == newNodes.length) {","				while (length--) {","					var newNode = newNodes[length];","					var newNodeName = newNode.nodeName;","","					if (newNodeName == STR_INPUT || newNodeName == STR_OPTION) {","						var originalNode = originalNodes[length];","						var originalNodeName = originalNode.nodeName;","","						if (originalNodeName == newNodeName) {","							var prop = null;","","							if (newNodeName == STR_OPTION) {","								prop = STR_SELECTED;","							}","							else if (newNodeName == STR_INPUT && (newNode.type == STR_CHECKBOX || newNode.type == STR_RADIO)) {","								prop = STR_CHECKED;","							}","","							if (prop !== null) {","								toggleNode(newNode, originalNode, prop);","							}","						}","					}","				}","			}","","			var bodyHTML = bodyElClone.innerHTML;","","			bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);","","			bodyClone.innerHTML = bodyHTML;","		},","","		_getAllCSSText: function() {","			var instance = this;","","			var buffer = [];","			var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, STR_ALL);","			var rule;","			var cssText;","","			for (var i = 0; styleSheet = styleSheets[i]; i++) {","				var rules = styleSheet.rules;","","				if (rules && rules.length) {","					for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {","						rule = rules[j];","","						if (!rule.href) {","							cssText = instance._getCSSTextFromRule(rule);","","							buffer.push(cssText);","						}","					}","				}","			}","","			return buffer.join(STR_BLANK);","		},","","		_getCSSTextFromRule: function(rule) {","			var instance = this;","","			var cssText = STR_EMPTY;","","			var ruleStyle = rule.style;","			var ruleCSSText;","			var ruleSelectorText;","","			if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) && REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {","				BUFFER_CSS_TEXT.length = 0;","","				BUFFER_CSS_TEXT.push(ruleSelectorText, STR_BRACKET_OPEN, ruleCSSText, STR_BRACKET_CLOSE);","","				cssText = BUFFER_CSS_TEXT.join(STR_BLANK);","			}","","			return cssText;","		},","","		_getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {","			var instance = this;","","			level = level || 1;","","			buffer = buffer || [];","","			var i;","","			if (isStylesheetDefined(styleSheet)) {","				var imports = styleSheet.imports;","","				mediaType = styleSheet.mediaType || mediaType;","","				if (REGEX_PRINT_MEDIA.test(mediaType)) {","					var length;","","					// IE can crash when trying to access imports more than 3 levels deep","					if (level <= 3 && isStylesheetDefined(imports) && imports.length) {","						for (i = 0, length = imports.length; i < length; i++) {","							instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);","						}","					}","					else if (styleSheet.length) {","						for (i = 0, length = styleSheet.length; i < length; i++) {","							instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);","						}","					}","					else {","						var rules = styleSheet.rules;","						var ruleStyleSheet;","","						if (rules && rules.length) {","							for (i = 0, length = rules.length; i < length; i++) {","								ruleStyleSheet = rules[i].styleSheet;","","								if (ruleStyleSheet) {","									instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);","								}","							}","						}","					}","","					if (!styleSheet.disabled && styleSheet.rules) {","						buffer.push(styleSheet);","					}","				}","			}","","			mediaType = STR_ALL;","","			return buffer;","		},","","		_getBodyEl: function() {","			var instance = this;","","			var bodyEl = instance._bodyEl;","","			if (!bodyEl) {","				bodyEl = DOC.body;","","				instance._bodyEl = bodyEl;","			}","","			return bodyEl;","		},","","		_getBodyClone: function() {","			var instance = this;","","			var bodyClone = instance._bodyClone;","","			if (!bodyClone) {","				bodyClone = DOC.createElement('body');","","				instance._bodyClone = bodyClone;","			}","","			return bodyClone;","		},","","		_getDocFrag: function() {","			var instance = this;","","			var docFrag = instance._docFrag;","","			if (!docFrag) {","				docFrag = DOC.createDocumentFragment();","","				html5shiv(docFrag);","","				instance._docFrag = docFrag;","			}","","			return docFrag;","		},","","		_getStyleSheet: function() {","			var instance = this;","","			var styleSheet = instance._styleSheet;","","			if (!styleSheet) {","				styleSheet = DOC.createElement('style');","","				var head = DOC.documentElement.firstChild;","","				head.insertBefore(styleSheet, head.firstChild);","","				styleSheet.media = 'print';","				styleSheet.className = CSS_PRINTFIX;","","				instance._styleSheet = styleSheet;","			}","","			return styleSheet;","		}","	}",");","","A.namespace('HTML5').PrintFix = PrintFix;","","PrintFix();","","}, '@VERSION@' ,{requires:['aui-node-html5']});","","","AUI.add('aui-node', function(A){}, '@VERSION@' ,{use:['aui-node-base','aui-node-html5','aui-node-html5-print'], skinnable:false});",""];
_yuitest_coverage["/build/aui-node/aui-node.js"].lines = {"1":0,"9":0,"79":0,"83":0,"90":0,"92":0,"93":0,"95":0,"96":0,"99":0,"101":0,"105":0,"108":0,"110":0,"114":0,"116":0,"118":0,"130":0,"132":0,"134":0,"152":0,"154":0,"155":0,"157":0,"158":0,"159":0,"162":0,"165":0,"167":0,"168":0,"171":0,"189":0,"191":0,"192":0,"193":0,"195":0,"196":0,"197":0,"200":0,"203":0,"226":0,"228":0,"230":0,"252":0,"254":0,"255":0,"257":0,"258":0,"261":0,"264":0,"267":0,"268":0,"269":0,"272":0,"275":0,"277":0,"278":0,"281":0,"299":0,"301":0,"302":0,"303":0,"304":0,"306":0,"307":0,"309":0,"311":0,"314":0,"317":0,"321":0,"322":0,"326":0,"346":0,"351":0,"352":0,"353":0,"356":0,"358":0,"359":0,"362":0,"365":0,"366":0,"369":0,"388":0,"390":0,"392":0,"394":0,"395":0,"398":0,"409":0,"411":0,"423":0,"425":0,"435":0,"436":0,"438":0,"450":0,"452":0,"464":0,"466":0,"479":0,"480":0,"482":0,"483":0,"485":0,"488":0,"500":0,"502":0,"503":0,"505":0,"506":0,"508":0,"510":0,"511":0,"514":0,"523":0,"525":0,"526":0,"528":0,"529":0,"549":0,"551":0,"552":0,"555":0,"558":0,"562":0,"564":0,"574":0,"575":0,"578":0,"579":0,"582":0,"586":0,"587":0,"591":0,"612":0,"614":0,"634":0,"636":0,"655":0,"657":0,"659":0,"671":0,"673":0,"675":0,"676":0,"678":0,"680":0,"681":0,"683":0,"684":0,"686":0,"687":0,"688":0,"691":0,"694":0,"707":0,"709":0,"711":0,"722":0,"724":0,"725":0,"727":0,"728":0,"733":0,"734":0,"735":0,"737":0,"738":0,"740":0,"741":0,"743":0,"746":0,"749":0,"750":0,"755":0,"765":0,"767":0,"768":0,"770":0,"777":0,"779":0,"798":0,"800":0,"801":0,"803":0,"804":0,"806":0,"809":0,"812":0,"813":0,"816":0,"820":0,"823":0,"826":0,"847":0,"848":0,"850":0,"851":0,"853":0,"856":0,"872":0,"874":0,"876":0,"886":0,"888":0,"890":0,"892":0,"899":0,"901":0,"921":0,"923":0,"924":0,"927":0,"941":0,"943":0,"944":0,"945":0,"946":0,"948":0,"949":0,"950":0,"952":0,"953":0,"954":0,"956":0,"960":0,"971":0,"973":0,"974":0,"976":0,"978":0,"979":0,"981":0,"982":0,"983":0,"986":0,"987":0,"992":0,"1003":0,"1005":0,"1007":0,"1018":0,"1020":0,"1022":0,"1033":0,"1035":0,"1037":0,"1039":0,"1050":0,"1052":0,"1054":0,"1056":0,"1068":0,"1070":0,"1072":0,"1073":0,"1074":0,"1077":0,"1080":0,"1093":0,"1094":0,"1095":0,"1097":0,"1098":0,"1100":0,"1115":0,"1116":0,"1118":0,"1120":0,"1137":0,"1138":0,"1140":0,"1142":0,"1235":0,"1238":0,"1240":0,"1242":0,"1243":0,"1245":0,"1247":0,"1248":0,"1249":0,"1251":0,"1252":0,"1253":0,"1256":0,"1258":0,"1259":0,"1261":0,"1262":0,"1264":0,"1266":0,"1269":0,"1270":0,"1275":0,"1278":0,"1281":0,"1284":0,"1285":0,"1287":0,"1290":0,"1291":0,"1293":0,"1294":0,"1296":0,"1298":0,"1299":0,"1302":0,"1307":0,"1308":0,"1310":0,"1311":0,"1313":0,"1315":0,"1316":0,"1317":0,"1319":0,"1320":0,"1322":0,"1323":0,"1326":0,"1329":0,"1330":0,"1332":0,"1337":0,"1338":0,"1342":0,"1356":0,"1403":0,"1412":0,"1414":0,"1415":0,"1416":0,"1418":0,"1420":0,"1421":0,"1423":0,"1424":0,"1428":0,"1430":0,"1434":0,"1436":0,"1446":0,"1448":0,"1457":0,"1459":0,"1469":0,"1471":0,"1480":0,"1482":0,"1484":0,"1485":0,"1487":0,"1488":0,"1490":0,"1491":0,"1493":0,"1497":0,"1501":0,"1503":0,"1508":0,"1510":0,"1511":0,"1513":0,"1515":0,"1516":0,"1518":0,"1520":0,"1521":0,"1526":0,"1529":0,"1532":0,"1535":0,"1539":0,"1541":0,"1546":0,"1555":0,"1557":0,"1558":0,"1561":0,"1570":0,"1572":0,"1573":0,"1576":0,"1585":0,"1587":0,"1588":0,"1591":0,"1596":0,"1597":0,"1600":0,"1602":0,"1603":0,"1606":0,"1607":0,"1612":0,"1614":0,"1617":0,"1620":0,"1627":0,"1636":0,"1646":0,"1649":0,"1659":0,"1664":0,"1678":0,"1680":0,"1682":0,"1684":0,"1686":0,"1705":0,"1707":0,"1709":0,"1714":0,"1718":0,"1719":0,"1726":0,"1729":0,"1730":0,"1733":0,"1782":0,"1788":0,"1792":0,"1794":0,"1795":0,"1798":0,"1802":0,"1804":0,"1805":0,"1806":0,"1807":0,"1810":0,"1814":0,"1815":0,"1816":0,"1819":0,"1823":0,"1824":0,"1825":0,"1828":0,"1829":0,"1830":0,"1833":0,"1835":0,"1836":0,"1839":0,"1843":0,"1845":0,"1847":0,"1849":0,"1853":0,"1855":0,"1856":0,"1858":0,"1860":0,"1864":0,"1866":0,"1867":0,"1869":0,"1870":0,"1873":0,"1877":0,"1879":0,"1880":0,"1882":0,"1884":0,"1885":0,"1889":0,"1891":0,"1892":0,"1894":0,"1896":0,"1898":0,"1900":0,"1901":0,"1902":0,"1903":0,"1905":0,"1906":0,"1908":0,"1909":0,"1911":0,"1913":0,"1914":0,"1916":0,"1918":0,"1919":0,"1920":0,"1922":0,"1927":0,"1928":0,"1930":0,"1931":0,"1933":0,"1934":0,"1936":0,"1937":0,"1942":0,"1943":0,"1945":0,"1946":0,"1948":0,"1950":0,"1951":0,"1953":0,"1955":0,"1959":0,"1963":0,"1966":0,"1968":0,"1970":0,"1971":0,"1972":0,"1973":0,"1975":0,"1976":0,"1977":0,"1979":0,"1980":0,"1982":0,"1983":0,"1985":0,"1986":0,"1989":0,"1990":0,"1997":0,"1999":0,"2001":0,"2005":0,"2007":0,"2008":0,"2009":0,"2010":0,"2012":0,"2013":0,"2015":0,"2016":0,"2017":0,"2019":0,"2020":0,"2022":0,"2028":0,"2032":0,"2034":0,"2036":0,"2037":0,"2038":0,"2040":0,"2041":0,"2043":0,"2045":0,"2048":0,"2052":0,"2054":0,"2056":0,"2058":0,"2060":0,"2061":0,"2063":0,"2065":0,"2066":0,"2069":0,"2070":0,"2071":0,"2074":0,"2075":0,"2076":0,"2080":0,"2081":0,"2083":0,"2084":0,"2085":0,"2087":0,"2088":0,"2094":0,"2095":0,"2100":0,"2102":0,"2106":0,"2108":0,"2110":0,"2111":0,"2113":0,"2116":0,"2120":0,"2122":0,"2124":0,"2125":0,"2127":0,"2130":0,"2134":0,"2136":0,"2138":0,"2139":0,"2141":0,"2143":0,"2146":0,"2150":0,"2152":0,"2154":0,"2155":0,"2157":0,"2159":0,"2161":0,"2162":0,"2164":0,"2167":0,"2172":0,"2174":0,"2179":0};
_yuitest_coverage["/build/aui-node/aui-node.js"].functions = {"prefixSelector:78":0,"formatSelectorNS:82":0,"(anonymous 2):98":0,"allNS:131":0,"ancestors:151":0,"ancestorsByClassName:188":0,"appendTo:225":0,"attr:251":0,"clone:302":0,"clone:321":0,"(anonymous 3):298":0,"center:345":0,"empty:387":0,"getDOM:408":0,"getBorderWidth:422":0,"getCenterXY:434":0,"getMargin:449":0,"getPadding:463":0,"guid:478":0,"hover:499":0,"html:548":0,"oneNS:561":0,"outerHTML:573":0,"placeAfter:611":0,"placeBefore:633":0,"prependTo:654":0,"radioClass:670":0,"resetId:706":0,"selectText:721":0,"selectable:764":0,"fn:800":0,"(anonymous 4):815":0,"swallowEvent:797":0,"text:846":0,"toggle:871":0,"unselectable:885":0,"val:920":0,"_getBoxStyleAsNumber:940":0,"_getText:970":0,"_hoverOutHandler:1002":0,"_hoverOverHandler:1017":0,"_hoverOutTaskFn:1032":0,"_hoverOverTaskFn:1049":0,"_place:1067":0,"_isHidden:1097":0,"_hide:1115":0,"_show:1137":0,"]:1242":0,"]:1284":0,"]:1290":0,"(anonymous 5):1237":0,"addHTML:1310":0,"all:1411":0,"allNS:1433":0,"first:1445":0,"getDOM:1456":0,"last:1468":0,"one:1479":0,"oneNS:1500":0,"(anonymous 6):1519":0,"filter:1510":0,"create:1538":0,"getBody:1554":0,"getDoc:1569":0,"getWin:1584":0,"queryNS:1596":0,"allNS:1602":0,"byIdNS:1606":0,"(anonymous 8):1619":0,"(anonymous 7):1616":0,"(anonymous 1):1":0,"IECreateFix:1677":0,"_doBeforeCreate:1704":0,"(anonymous 9):1627":0,"isShivDisabled:1725":0,"isStylesheetDefined:1787":0,"toggleNode:1791":0,"afterPrint:1805":0,"beforePrint:1814":0,"destroy:1823":0,"init:1828":0,"PrintFix:1804":0,"onAfterPrint:1842":0,"onBeforePrint:1852":0,"parseCSS:1863":0,"restoreHTML:1876":0,"writeHTML:1888":0,"_getAllCSSText:2004":0,"_getCSSTextFromRule:2031":0,"_getAllStyleSheets:2051":0,"_getBodyEl:2105":0,"_getBodyClone:2119":0,"_getDocFrag:2133":0,"_getStyleSheet:2149":0,"(anonymous 10):1718":0};
_yuitest_coverage["/build/aui-node/aui-node.js"].coveredLines = 611;
_yuitest_coverage["/build/aui-node/aui-node.js"].coveredFunctions = 95;
_yuitest_coverline("/build/aui-node/aui-node.js", 1);
AUI.add('aui-node-base', function(A) {
/**
 * aui-node-base A set of utility methods to the Node.
 *
 * @module aui-node
 * @submodule aui-node-base
 */

_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-node/aui-node.js", 9);
var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,
	isValue = Lang.isValue,

	AArray = A.Array,
	Node = A.Node,
	NodeList = A.NodeList,

	getClassName = A.getClassName,
	getRegExp = A.DOM._getRegExp,

	prefix = Lang.String.prefix,

	CONFIG = A.config,
	DOC = CONFIG.doc,
	WIN = CONFIG.win,

	NODE_PROTO = Node.prototype,
	NODELIST_PROTO = NodeList.prototype,

	STR_EMPTY = '',

	ARRAY_EMPTY_STRINGS = [STR_EMPTY, STR_EMPTY],

	HELPER = 'helper',
	OFFSET = 'offset',

	CSS_HELPER_FORCE_OFFSET = getClassName(HELPER, 'force', OFFSET),
	CSS_HELPER_HIDDEN = getClassName(HELPER, 'hidden'),
	CSS_HELPER_UNSELECTABLE = getClassName(HELPER, 'unselectable'),

	CHILD_NODES = 'childNodes',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	INNER = 'inner',
	INNER_HTML = 'innerHTML',
	NEXT_SIBLING = 'nextSibling',
	NONE = 'none',
	OUTER = 'outer',
	PARENT_NODE = 'parentNode',
	REGION = 'region',
	SCRIPT = 'script',

	SUPPORT_CLONED_EVENTS = false,

	VALUE = 'value',

	MAP_BORDER = {
		b: 'borderBottomWidth',
		l: 'borderLeftWidth',
		r: 'borderRightWidth',
		t: 'borderTopWidth'
	},
	MAP_MARGIN = {
		b: 'marginBottom',
		l: 'marginLeft',
		r: 'marginRight',
		t: 'marginTop'
	},
	MAP_PADDING = {
		b: 'paddingBottom',
		l: 'paddingLeft',
		r: 'paddingRight',
		t: 'paddingTop'
	},

	prefixSelector = function(ns, id) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "prefixSelector", 78);
_yuitest_coverline("/build/aui-node/aui-node.js", 79);
return '#' + prefix(ns, id);
	},

	formatSelectorNS = function(ns, selector) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "formatSelectorNS", 82);
_yuitest_coverline("/build/aui-node/aui-node.js", 83);
return selector.replace(getRegExp('(#|\\[id=(\\\"|\\\'))(?!' + ns + ')', 'g'), '$1' + ns);
	};

	/*
		Parts of this file are used from jQuery (http://jquery.com)
		Dual-licensed under MIT/GPL
	*/
	_yuitest_coverline("/build/aui-node/aui-node.js", 90);
var div = DOC.createElement('div');

	_yuitest_coverline("/build/aui-node/aui-node.js", 92);
div.style.display = 'none';
	_yuitest_coverline("/build/aui-node/aui-node.js", 93);
div.innerHTML = '   <table></table>&nbsp;';

	_yuitest_coverline("/build/aui-node/aui-node.js", 95);
if (div.attachEvent && div.fireEvent) {
		_yuitest_coverline("/build/aui-node/aui-node.js", 96);
div.attachEvent(
			'onclick',
			function(){
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 2)", 98);
_yuitest_coverline("/build/aui-node/aui-node.js", 99);
SUPPORT_CLONED_EVENTS = true;

				_yuitest_coverline("/build/aui-node/aui-node.js", 101);
div.detachEvent('onclick', arguments.callee);
			}
		);

		_yuitest_coverline("/build/aui-node/aui-node.js", 105);
div.cloneNode(true).fireEvent('onclick');
	}

	_yuitest_coverline("/build/aui-node/aui-node.js", 108);
var SUPPORT_OPTIONAL_TBODY = !div.getElementsByTagName('tbody').length;

	_yuitest_coverline("/build/aui-node/aui-node.js", 110);
var REGEX_LEADING_WHITE_SPACE = /^\s+/,
		REGEX_IE8_ACTION = /=([^=\x27\x22>\s]+\/)>/g,
		REGEX_TAGNAME = /<([\w:]+)/;

	_yuitest_coverline("/build/aui-node/aui-node.js", 114);
div = null;

	_yuitest_coverline("/build/aui-node/aui-node.js", 116);
Node.cssId = prefixSelector;

	_yuitest_coverline("/build/aui-node/aui-node.js", 118);
Node.formatSelectorNS = formatSelectorNS;

/**
 * Augment the <a href="Node.html">YUI3 Node</a> with more util methods.
 *
 * Check the list of <a href="Node.html#methods">Methods</a> available for
 * AUI Node.
 *
 * @class A.Node
 * @constructor
 * @uses Node
 */
_yuitest_coverline("/build/aui-node/aui-node.js", 130);
A.mix(NODE_PROTO, {
	allNS: function(ns, selector) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "allNS", 131);
_yuitest_coverline("/build/aui-node/aui-node.js", 132);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 134);
return instance.all(formatSelectorNS(ns, selector));
	},

	/**
	 * <p>Returns the current ancestors of the node element. If a selector is
	 * specified, the ancestors are filtered to match the selector.</p>
     *
     * Example:
     *
	 * <pre><code>
	 * A.one('#nodeId').ancestors('div');
	 * </code></pre>
	 *
	 * @method ancestors
	 * @param {String} selector A selector to filter the ancestor elements against.
	 * @return {NodeList}
	 */
	ancestors: function(selector) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "ancestors", 151);
_yuitest_coverline("/build/aui-node/aui-node.js", 152);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 154);
var ancestors = [];
		_yuitest_coverline("/build/aui-node/aui-node.js", 155);
var currentEl = instance.getDOM();

		_yuitest_coverline("/build/aui-node/aui-node.js", 157);
while (currentEl && currentEl.nodeType !== 9) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 158);
if (currentEl.nodeType === 1) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 159);
ancestors.push(currentEl);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 162);
currentEl = currentEl.parentNode;
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 165);
var nodeList = new A.all(ancestors);

		_yuitest_coverline("/build/aui-node/aui-node.js", 167);
if (selector) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 168);
nodeList = nodeList.filter(selector);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 171);
return nodeList;
	},

	/**
	 * <p>Returns the current ancestors of the node element filtered by a className.
	 * This is an optimized method for finding ancestors by a specific CSS class name.</p>
     *
     * Example:
     *
	 * <pre><code>
	 * A.one('#nodeId').ancestorsByClassName('aui-helper-hidden');
	 * </code></pre>
	 *
	 * @method ancestors
	 * @param {String} selector A selector to filter the ancestor elements against.
	 * @return {NodeList}
	 */
	ancestorsByClassName: function(className) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "ancestorsByClassName", 188);
_yuitest_coverline("/build/aui-node/aui-node.js", 189);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 191);
var ancestors = [];
		_yuitest_coverline("/build/aui-node/aui-node.js", 192);
var cssRE = new RegExp('\\b' + className + '\\b');
		_yuitest_coverline("/build/aui-node/aui-node.js", 193);
var currentEl = instance.getDOM();

		_yuitest_coverline("/build/aui-node/aui-node.js", 195);
while (currentEl && currentEl.nodeType !== 9) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 196);
if (currentEl.nodeType === 1 && cssRE.test(currentEl.className)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 197);
ancestors.push(currentEl);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 200);
currentEl = currentEl.parentNode;
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 203);
return A.all(ancestors);
	},

	/**
	 * <p>Insert the node instance to the end of the <code>selector</code>
     * element.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * // using another Node instance
	 * var body = A.one('body');
	 * node.appendTo(body);
	 * // using a CSS selector
	 * node.appendTo('#container');
	 * </code></pre>
	 *
	 * @method appendTo
	 * @chainable
	 * @param {Node | String} selector A selector, element, HTML string, Node
	 * @return {String}
	 */
	appendTo: function(selector) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "appendTo", 225);
_yuitest_coverline("/build/aui-node/aui-node.js", 226);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 228);
A.one(selector).append(instance);

		_yuitest_coverline("/build/aui-node/aui-node.js", 230);
return instance;
	},

	/**
	 * <p>Get or Set the value of an attribute for the first element in the
     * set of matched elements. If only the <code>name</code> is passed it
     * works as a getter.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.attr('title', 'Setting a new title attribute');
	 * // Alert the value of the title attribute: 'Setting a new title attribute'
	 * alert( node.attr('title') );
	 * </code></pre>
	 *
	 * @method attr
	 * @param {String} name The name of the attribute
	 * @param {String} value The value of the attribute to be set. Optional.
	 * @return {String}
	 */
	attr: function(name, value) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "attr", 251);
_yuitest_coverline("/build/aui-node/aui-node.js", 252);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 254);
if (!isUndefined(value)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 255);
var el = instance.getDOM();

			_yuitest_coverline("/build/aui-node/aui-node.js", 257);
if (name in el) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 258);
instance.set(name, value);
			}
			else {
				_yuitest_coverline("/build/aui-node/aui-node.js", 261);
instance.setAttribute(name, value);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 264);
return instance;
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 267);
if (isObject(name)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 268);
for (var i in name) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 269);
instance.attr(i, name[i]);
				}

				_yuitest_coverline("/build/aui-node/aui-node.js", 272);
return instance;
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 275);
var currentValue = instance.get(name);

			_yuitest_coverline("/build/aui-node/aui-node.js", 277);
if (!Lang.isValue(currentValue)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 278);
currentValue = instance.getAttribute(name);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 281);
return currentValue;
		}
	},

	/**
	 * Normalizes the behavior of cloning a node, which by default should not clone
	 * the events that are attached to it.
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.clone().appendTo('body');
	 * </code></pre>
	 *
	 * @method clone
	 * @return {Node}
	 */
	clone: (function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 3)", 298);
_yuitest_coverline("/build/aui-node/aui-node.js", 299);
var clone;

		_yuitest_coverline("/build/aui-node/aui-node.js", 301);
if (SUPPORT_CLONED_EVENTS) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 302);
clone = function() {
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "clone", 302);
_yuitest_coverline("/build/aui-node/aui-node.js", 303);
var el = this.getDOM();
				_yuitest_coverline("/build/aui-node/aui-node.js", 304);
var clone;

				_yuitest_coverline("/build/aui-node/aui-node.js", 306);
if (el.nodeType != 3) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 307);
var outerHTML = this.outerHTML();

					_yuitest_coverline("/build/aui-node/aui-node.js", 309);
outerHTML = outerHTML.replace(REGEX_IE8_ACTION, '="$1">').replace(REGEX_LEADING_WHITE_SPACE, STR_EMPTY);

					_yuitest_coverline("/build/aui-node/aui-node.js", 311);
clone = Node.create(outerHTML);
				}
				else {
					_yuitest_coverline("/build/aui-node/aui-node.js", 314);
clone = A.one(el.cloneNode());
				}

				_yuitest_coverline("/build/aui-node/aui-node.js", 317);
return clone;
			};
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 321);
clone = function() {
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "clone", 321);
_yuitest_coverline("/build/aui-node/aui-node.js", 322);
return this.cloneNode(true);
			};
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 326);
return clone;
	})(),

	/**
	 * <p>Centralize the current Node instance with the passed
     * <code>val</code> Array, Node, String, or Region, if not specified, the body will be
     * used.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * // Center the <code>node</code> with the <code>#container</code>.
	 * node.center('#container');
	 * </code></pre>
	 *
	 * @method center
	 * @chainable
	 * @param {Array | Node | Region | String} val Array, Node, String, or Region to center with
	 */
	center: function(val) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "center", 345);
_yuitest_coverline("/build/aui-node/aui-node.js", 346);
var instance = this,
			nodeRegion = instance.get(REGION),
			x,
			y;

		_yuitest_coverline("/build/aui-node/aui-node.js", 351);
if (isArray(val)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 352);
x = val[0];
			_yuitest_coverline("/build/aui-node/aui-node.js", 353);
y = val[1];
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 356);
var region;

			_yuitest_coverline("/build/aui-node/aui-node.js", 358);
if (isObject(val) && !A.instanceOf(val, A.Node)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 359);
region = val;
			}
			else {
				_yuitest_coverline("/build/aui-node/aui-node.js", 362);
region = (A.one(val) || A.getBody()).get(REGION);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 365);
x = region.left + (region.width / 2);
			_yuitest_coverline("/build/aui-node/aui-node.js", 366);
y = region.top + (region.height / 2);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 369);
instance.setXY([x - (nodeRegion.width / 2), y - (nodeRegion.height / 2)]);
	},

	/**
	 * <p>This method removes not only child (and other descendant) elements,
     * but also any text within the set of matched elements. This is because,
     * according to the DOM specification, any string of text within an element
     * is considered a child node of that element.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.empty();
	 * </code></pre>
	 *
	 * @method empty
	 * @chainable
	 */
	empty: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "empty", 387);
_yuitest_coverline("/build/aui-node/aui-node.js", 388);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 390);
instance.all('>*').remove().purge();

		_yuitest_coverline("/build/aui-node/aui-node.js", 392);
var el = Node.getDOMNode(instance);

		_yuitest_coverline("/build/aui-node/aui-node.js", 394);
while (el.firstChild) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 395);
el.removeChild(el.firstChild);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 398);
return instance;
	},

	/**
	 * Retrieves the DOM node bound to a Node instance. See
     * <a href="Node.html#method_getDOMNode">getDOMNode</a>.
	 *
	 * @method getDOM
	 * @return {HTMLNode} The DOM node bound to the Node instance.
	 */
	getDOM: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "getDOM", 408);
_yuitest_coverline("/build/aui-node/aui-node.js", 409);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 411);
return Node.getDOMNode(instance);
	},

	/**
     * Return the combined width of the border for the specified sides.
     *
     * @method getBorderWidth
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @return {number}
     */
	getBorderWidth: function(sides) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "getBorderWidth", 422);
_yuitest_coverline("/build/aui-node/aui-node.js", 423);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 425);
return instance._getBoxStyleAsNumber(sides, MAP_BORDER);
	},

	/**
	 * Gets the current center position of the node in page coordinates.
	 * @method getCenterXY
	 * @for Node
	 * @return {Array} The XY position of the node
	*/
	getCenterXY: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "getCenterXY", 434);
_yuitest_coverline("/build/aui-node/aui-node.js", 435);
var instance = this;
		_yuitest_coverline("/build/aui-node/aui-node.js", 436);
var region = instance.get(REGION);

		_yuitest_coverline("/build/aui-node/aui-node.js", 438);
return [(region.left + region.width/2), (region.top + region.height/2)];
	},

	/**
     * Return the combined size of the margin for the specified sides.
     *
     * @method getMargin
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @return {number}
     */
	getMargin: function(sides) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "getMargin", 449);
_yuitest_coverline("/build/aui-node/aui-node.js", 450);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 452);
return instance._getBoxStyleAsNumber(sides, MAP_MARGIN);
	},

	/**
     * Return the combined width of the border for the specified sides.
     *
     * @method getPadding
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @return {number}
     */
	getPadding: function(sides) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "getPadding", 463);
_yuitest_coverline("/build/aui-node/aui-node.js", 464);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 466);
return instance._getBoxStyleAsNumber(sides, MAP_PADDING);
	},

    /**
     * Set the id of the Node instance if the object does not have one. The
     * generated id is based on a guid created by the
     * <a href="YUI.html#method_stamp">stamp</a> method.
     *
     * @method guid
     * @param {string} prefix optional guid prefix
     * @return {String} The current id of the node
     */
	guid: function(prefix) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "guid", 478);
_yuitest_coverline("/build/aui-node/aui-node.js", 479);
var instance = this;
		_yuitest_coverline("/build/aui-node/aui-node.js", 480);
var currentId = instance.get('id');

		_yuitest_coverline("/build/aui-node/aui-node.js", 482);
if (!currentId) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 483);
currentId = A.stamp(instance);

			_yuitest_coverline("/build/aui-node/aui-node.js", 485);
instance.set('id', currentId);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 488);
return currentId;
	},

    /**
     * Create a hover interaction.
     *
     * @method hover
     * @param {string} overFn
     * @param {string} outFn
     * @return {Node} The current Node instance
     */
	hover: function(overFn, outFn) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "hover", 499);
_yuitest_coverline("/build/aui-node/aui-node.js", 500);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 502);
var hoverOptions;
		_yuitest_coverline("/build/aui-node/aui-node.js", 503);
var defaultHoverOptions = instance._defaultHoverOptions;

		_yuitest_coverline("/build/aui-node/aui-node.js", 505);
if (isObject(overFn, true)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 506);
hoverOptions = overFn;

			_yuitest_coverline("/build/aui-node/aui-node.js", 508);
hoverOptions = A.mix(hoverOptions, defaultHoverOptions);

			_yuitest_coverline("/build/aui-node/aui-node.js", 510);
overFn = hoverOptions.over;
			_yuitest_coverline("/build/aui-node/aui-node.js", 511);
outFn = hoverOptions.out;
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 514);
hoverOptions = A.mix(
				{
					over: overFn,
					out: outFn
				},
				defaultHoverOptions
			);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 523);
instance._hoverOptions = hoverOptions;

		_yuitest_coverline("/build/aui-node/aui-node.js", 525);
hoverOptions.overTask = A.debounce(instance._hoverOverTaskFn, null, instance);
		_yuitest_coverline("/build/aui-node/aui-node.js", 526);
hoverOptions.outTask = A.debounce(instance._hoverOutTaskFn, null, instance);

		_yuitest_coverline("/build/aui-node/aui-node.js", 528);
instance.on(hoverOptions.overEventType, instance._hoverOverHandler, instance);
		_yuitest_coverline("/build/aui-node/aui-node.js", 529);
instance.on(hoverOptions.outEventType, instance._hoverOutHandler, instance);
	},

	/**
     * <p>Get or Set the HTML contents of the node. If the <code>value</code>
     * is passed it's set the content of the element, otherwise it works as a
     * getter for the current content.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.html('Setting new HTML');
	 * // Alert the value of the current content
	 * alert( node.html() );
	 * </code></pre>
     *
     * @method html
     * @param {string} value A string of html to set as the content of the node instance.
     */
	html: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "html", 548);
_yuitest_coverline("/build/aui-node/aui-node.js", 549);
var args = arguments, length = args.length;

		_yuitest_coverline("/build/aui-node/aui-node.js", 551);
if (length) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 552);
this.set(INNER_HTML, args[0]);
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 555);
return this.get(INNER_HTML);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 558);
return this;
	},

	oneNS: function(ns, selector) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "oneNS", 561);
_yuitest_coverline("/build/aui-node/aui-node.js", 562);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 564);
return instance.one(formatSelectorNS(ns, selector));
	},

	/**
	 * Gets the outerHTML of a node, which islike innerHTML, except that it
	 * actually contains the HTML of the node itself.
	 *
	 * @return {string} The outerHTML of the given element.
	 */
	outerHTML: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "outerHTML", 573);
_yuitest_coverline("/build/aui-node/aui-node.js", 574);
var instance = this;
		_yuitest_coverline("/build/aui-node/aui-node.js", 575);
var domEl = instance.getDOM();

		// IE, Opera and WebKit all have outerHTML.
		_yuitest_coverline("/build/aui-node/aui-node.js", 578);
if ('outerHTML' in domEl) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 579);
return domEl.outerHTML;
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 582);
var temp = Node.create('<div></div>').append(
			this.clone()
		);

		_yuitest_coverline("/build/aui-node/aui-node.js", 586);
try {
			_yuitest_coverline("/build/aui-node/aui-node.js", 587);
return temp.html();
		}
		catch(e) {}
		finally {
			_yuitest_coverline("/build/aui-node/aui-node.js", 591);
temp = null;
		}
	},

	/**
	 * <p>Inserts a <code>newNode</code> after the node instance (i.e., as the next
	 * sibling). If the reference node has no parent, then does nothing.</p>
	 *
	 * Example:
     *
	 * <pre><code>var titleNode = A.one('#titleNode');
	 * var descriptionNode = A.one('#descriptionNode');
	 * // the description is usually shown after the title
	 * titleNode.placeAfter(descriptionNode);
	 * </code></pre>
	 *
	 * @method placeAfter
	 * @chainable
	 * @param {Node} newNode Node to insert.
	 */
	placeAfter: function(newNode) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "placeAfter", 611);
_yuitest_coverline("/build/aui-node/aui-node.js", 612);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 614);
return instance._place(newNode, instance.get(NEXT_SIBLING));
	},

	/**
	 * <p>Inserts a <code>newNode</code> before the node instance (i.e., as the previous
	 * sibling). If the reference node has no parent, then does nothing.</p>
	 *
	 * Example:
     *
	 * <pre><code>var descriptionNode = A.one('#descriptionNode');
	 * var titleNode = A.one('#titleNode');
	 * // the title is usually shown before the description
	 * descriptionNode.placeBefore(titleNode);
	 * </code></pre>
	 *
	 * @method placeBefore
	 * @chainable
	 * @param {Node} newNode Node to insert.
	 */
	placeBefore: function(newNode) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "placeBefore", 633);
_yuitest_coverline("/build/aui-node/aui-node.js", 634);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 636);
return instance._place(newNode, instance);
	},

	/**
	 * <p>Inserts the node instance to the begining of the <code>selector</code>
     * node (i.e., insert before the <code>firstChild</code> of the
     * <code>selector</code>).</p>
	 *
	 * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.prependTo('body');
	 * </code></pre>
	 *
	 * @method prependTo
	 * @chainable
	 * @param {Node | String} selector A selector, element, HTML string, Node
	 */
	prependTo: function(selector) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "prependTo", 654);
_yuitest_coverline("/build/aui-node/aui-node.js", 655);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 657);
A.one(selector).prepend(instance);

		_yuitest_coverline("/build/aui-node/aui-node.js", 659);
return instance;
	},

	/**
	 * Add one or more CSS classes to an element and remove the class(es)
     * from the siblings of the element.
	 *
	 * @method radioClass
	 * @chainable
	 * @param {String} cssClass
	 */
	radioClass: function(cssClass) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "radioClass", 670);
_yuitest_coverline("/build/aui-node/aui-node.js", 671);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 673);
var siblings = instance.siblings();

		_yuitest_coverline("/build/aui-node/aui-node.js", 675);
if (isString(cssClass)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 676);
siblings.removeClass(cssClass);

			_yuitest_coverline("/build/aui-node/aui-node.js", 678);
instance.addClass(cssClass);
		}
		else {_yuitest_coverline("/build/aui-node/aui-node.js", 680);
if (isArray(cssClass)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 681);
var siblingNodes = siblings.getDOM();

			_yuitest_coverline("/build/aui-node/aui-node.js", 683);
var regex = getRegExp('(?:^|\\s+)(?:' + cssClass.join('|') + ')(?=\\s+|$)', 'g');
			_yuitest_coverline("/build/aui-node/aui-node.js", 684);
var node;

			_yuitest_coverline("/build/aui-node/aui-node.js", 686);
for (var i = siblingNodes.length - 1; i >= 0; i--) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 687);
node = siblingNodes[i];
				_yuitest_coverline("/build/aui-node/aui-node.js", 688);
node.className = node.className.replace(regex, '');
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 691);
instance.addClass(cssClass.join(' '));
		}}

		_yuitest_coverline("/build/aui-node/aui-node.js", 694);
return instance;
	},

	/**
	 * Generate an unique identifier and reset the id attribute of the node
     * instance using the new value. Invokes the
     * <a href="Node.html#method_guid">guid</a>.
	 *
	 * @method resetId
	 * @chainable
	 * @param {String} prefix Optional prefix for the guid.
	 */
	resetId: function(prefix) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "resetId", 706);
_yuitest_coverline("/build/aui-node/aui-node.js", 707);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 709);
instance.attr('id', A.guid(prefix));

		_yuitest_coverline("/build/aui-node/aui-node.js", 711);
return instance;
	},

	/**
	 * Selects a substring of text inside of the input element.
	 *
	 * @method selectText
	 * @param {Number} start The index to start the selection range from
	 * @param {Number} end The index to end the selection range at
	 */
	selectText: function(start, end) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "selectText", 721);
_yuitest_coverline("/build/aui-node/aui-node.js", 722);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 724);
var textField = instance.getDOM();
		_yuitest_coverline("/build/aui-node/aui-node.js", 725);
var length = instance.val().length;

		_yuitest_coverline("/build/aui-node/aui-node.js", 727);
end = isValue(end) ? end : length;
		_yuitest_coverline("/build/aui-node/aui-node.js", 728);
start = isValue(start) ? start : 0;

		// Some form elements could throw a (NS_ERROR_FAILURE)
        // [nsIDOMNSHTMLInputElement.setSelectionRange] error when invoke the
        // setSelectionRange on firefox. Wrapping in a try/catch to prevent the error be thrown
		_yuitest_coverline("/build/aui-node/aui-node.js", 733);
try {
			_yuitest_coverline("/build/aui-node/aui-node.js", 734);
if (textField.setSelectionRange) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 735);
textField.setSelectionRange(start, end);
			}
			else {_yuitest_coverline("/build/aui-node/aui-node.js", 737);
if (textField.createTextRange) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 738);
var range = textField.createTextRange();

				_yuitest_coverline("/build/aui-node/aui-node.js", 740);
range.moveStart('character', start);
				_yuitest_coverline("/build/aui-node/aui-node.js", 741);
range.moveEnd('character', end - length);

				_yuitest_coverline("/build/aui-node/aui-node.js", 743);
range.select();
			}
			else {
				_yuitest_coverline("/build/aui-node/aui-node.js", 746);
textField.select();
			}}

			_yuitest_coverline("/build/aui-node/aui-node.js", 749);
if (textField != DOC.activeElement) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 750);
textField.focus();
			}
		}
		catch(e) {}

		_yuitest_coverline("/build/aui-node/aui-node.js", 755);
return instance;
	},

	/**
	 * Enables text selection for this element (normalized across browsers).
	 *
	 * @method selectable
	 * @chainable
	 */
	selectable: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "selectable", 764);
_yuitest_coverline("/build/aui-node/aui-node.js", 765);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 767);
instance.getDOM().unselectable = 'off';
		_yuitest_coverline("/build/aui-node/aui-node.js", 768);
instance.detach('selectstart');

		_yuitest_coverline("/build/aui-node/aui-node.js", 770);
instance.setStyles(
			{
				'MozUserSelect': STR_EMPTY,
				'KhtmlUserSelect': STR_EMPTY
			}
		);

		_yuitest_coverline("/build/aui-node/aui-node.js", 777);
instance.removeClass(CSS_HELPER_UNSELECTABLE);

		_yuitest_coverline("/build/aui-node/aui-node.js", 779);
return instance;
	},

    /**
     * <p>Stops the specified event(s) from bubbling and optionally prevents the
     * default action.</p>
     *
     * Example:
     *
     * <pre><code>var anchor = A.one('a#anchorId');
     * anchor.swallowEvent('click');
     * </code></pre>
     *
     * @method swallowEvent
     * @chainable
     * @param {String/Array} eventName an event or array of events to stop from bubbling
     * @param {Boolean} preventDefault (optional) true to prevent the default action too
     */
	swallowEvent: function(eventName, preventDefault) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "swallowEvent", 797);
_yuitest_coverline("/build/aui-node/aui-node.js", 798);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 800);
var fn = function(event) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "fn", 800);
_yuitest_coverline("/build/aui-node/aui-node.js", 801);
event.stopPropagation();

			_yuitest_coverline("/build/aui-node/aui-node.js", 803);
if (preventDefault) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 804);
event.preventDefault();

				_yuitest_coverline("/build/aui-node/aui-node.js", 806);
event.halt();
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 809);
return false;
		};

		_yuitest_coverline("/build/aui-node/aui-node.js", 812);
if(isArray(eventName)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 813);
AArray.each(
				eventName,
				function(name) {
					_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 4)", 815);
_yuitest_coverline("/build/aui-node/aui-node.js", 816);
instance.on(name, fn);
				}
			);

			_yuitest_coverline("/build/aui-node/aui-node.js", 820);
return this;
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 823);
instance.on(eventName, fn);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 826);
return instance;
	},

    /**
     * <p>Get or Set the combined text contents of the node instance,
     * including it's descendants. If the <code>text</code>
     * is passed it's set the content of the element, otherwise it works as a
     * getter for the current content.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.text('Setting new text content');
	 * // Alert the value of the current content
	 * alert( node.text() );
	 * </code></pre>
	 *
     * @method text
     * @param {String} text A string of text to set as the content of the node instance.
     */
	text: function(text) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "text", 846);
_yuitest_coverline("/build/aui-node/aui-node.js", 847);
var instance = this;
		_yuitest_coverline("/build/aui-node/aui-node.js", 848);
var el = instance.getDOM();

		_yuitest_coverline("/build/aui-node/aui-node.js", 850);
if (!isUndefined(text)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 851);
text = A.DOM._getDoc(el).createTextNode(text);

			_yuitest_coverline("/build/aui-node/aui-node.js", 853);
return instance.empty().append(text);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 856);
return instance._getText(el.childNodes);
	},

    /**
     * <p>Displays or hide the node instance.</p>
	 *
	 * <p><string>NOTE:</string> This method assume that your node were hidden
     * because of the 'aui-helper-hidden' css class were being used. This won't
     * manipulate the inline <code>style.display</code> property.</p>
	 *
     * @method toggle
     * @chainable
     * @param {Boolean} on Whether to force the toggle. Optional.
     * @param {Function} callback A function to run after the visibility change. Optional.
     */
	toggle: function(on, callback) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "toggle", 871);
_yuitest_coverline("/build/aui-node/aui-node.js", 872);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 874);
instance._toggleView.apply(instance, arguments);

		_yuitest_coverline("/build/aui-node/aui-node.js", 876);
return instance;
	},

	/**
	 * Disables text selection for this element (normalized across browsers).
	 *
	 * @method unselectable
	 * @chainable
	 */
	unselectable: function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "unselectable", 885);
_yuitest_coverline("/build/aui-node/aui-node.js", 886);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 888);
instance.getDOM().unselectable = 'on';

		_yuitest_coverline("/build/aui-node/aui-node.js", 890);
instance.swallowEvent('selectstart', true);

		_yuitest_coverline("/build/aui-node/aui-node.js", 892);
instance.setStyles(
			{
				'MozUserSelect': NONE,
				'KhtmlUserSelect': NONE
			}
		);

		_yuitest_coverline("/build/aui-node/aui-node.js", 899);
instance.addClass(CSS_HELPER_UNSELECTABLE);

		_yuitest_coverline("/build/aui-node/aui-node.js", 901);
return instance;
	},

    /**
     * <p>Get or Set the value attribute of the node instance. If the
     * <code>value</code> is passed it's set the value of the element,
     * otherwise it works as a getter for the current value.</p>
     *
     * Example:
     *
	 * <pre><code>var input = A.one('#inputId');
	 * input.val('Setting new input value');
	 * // Alert the value of the input
	 * alert( input.val() );
	 * </code></pre>
	 *
     * @method val
     * @param {string} value Value to be set. Optional.
     */
	val: function(value) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "val", 920);
_yuitest_coverline("/build/aui-node/aui-node.js", 921);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 923);
if (isUndefined(value)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 924);
return instance.get(VALUE);
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 927);
return instance.set(VALUE, value);
		}
	},

	/**
     * Return the combined size of the box style for the specified sides.
     *
     * @method _getBoxStyleAsNumber
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @param {string} map An object mapping mapping the "sides" param to the a CSS value to retrieve
     * @return {number}
     */
	_getBoxStyleAsNumber: function(sides, map) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getBoxStyleAsNumber", 940);
_yuitest_coverline("/build/aui-node/aui-node.js", 941);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 943);
var sidesArray = sides.match(/\w/g);
		_yuitest_coverline("/build/aui-node/aui-node.js", 944);
var value = 0;
		_yuitest_coverline("/build/aui-node/aui-node.js", 945);
var side;
		_yuitest_coverline("/build/aui-node/aui-node.js", 946);
var sideKey;

		_yuitest_coverline("/build/aui-node/aui-node.js", 948);
for (var i = sidesArray.length - 1; i >= 0; i--) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 949);
sideKey = sidesArray[i];
			_yuitest_coverline("/build/aui-node/aui-node.js", 950);
side = 0;

			_yuitest_coverline("/build/aui-node/aui-node.js", 952);
if (sideKey) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 953);
side = parseFloat(instance.getComputedStyle(map[sideKey]));
				_yuitest_coverline("/build/aui-node/aui-node.js", 954);
side = Math.abs(side);

				_yuitest_coverline("/build/aui-node/aui-node.js", 956);
value += side || 0;
			}
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 960);
return value;
	},

    /**
     * Extract text content from the passed nodes.
	 *
     * @method _getText
     * @private
     * @param {Native NodeList} childNodes
     */
	_getText: function(childNodes) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getText", 970);
_yuitest_coverline("/build/aui-node/aui-node.js", 971);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 973);
var length = childNodes.length;
		_yuitest_coverline("/build/aui-node/aui-node.js", 974);
var childNode;

		_yuitest_coverline("/build/aui-node/aui-node.js", 976);
var str = [];

		_yuitest_coverline("/build/aui-node/aui-node.js", 978);
for (var i = 0; i < length; i++) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 979);
childNode = childNodes[i];

			_yuitest_coverline("/build/aui-node/aui-node.js", 981);
if (childNode && childNode.nodeType != 8) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 982);
if (childNode.nodeType != 1) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 983);
str.push(childNode.nodeValue);
				}

				_yuitest_coverline("/build/aui-node/aui-node.js", 986);
if (childNode.childNodes) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 987);
str.push(instance._getText(childNode.childNodes));
				}
			}
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 992);
return str.join(STR_EMPTY);
	},

	/**
     * The event handler for the "out" function that is fired for events attached via the hover method.
	 *
     * @method _hoverOutHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOutHandler: function(event) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_hoverOutHandler", 1002);
_yuitest_coverline("/build/aui-node/aui-node.js", 1003);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1005);
var hoverOptions = instance._hoverOptions;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1007);
hoverOptions.outTask.delay(hoverOptions.outDelay, event);
	},

	/**
     * The event handler for the "over" function that is fired for events attached via the hover method.
	 *
     * @method _hoverOverHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOverHandler: function(event) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_hoverOverHandler", 1017);
_yuitest_coverline("/build/aui-node/aui-node.js", 1018);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1020);
var hoverOptions = instance._hoverOptions;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1022);
hoverOptions.overTask.delay(hoverOptions.overDelay, event);
	},

	/**
     * Cancels the over task, and fires the users custom "out" function for the hover method
	 *
     * @method _hoverOverHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOutTaskFn: function(event) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_hoverOutTaskFn", 1032);
_yuitest_coverline("/build/aui-node/aui-node.js", 1033);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1035);
var hoverOptions = instance._hoverOptions;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1037);
hoverOptions.overTask.cancel();

		_yuitest_coverline("/build/aui-node/aui-node.js", 1039);
hoverOptions.out.apply(hoverOptions.context || event.currentTarget, arguments);
	},

	/**
     * Cancels the out task, and fires the users custom "over" function for the hover method
	 *
     * @method _hoverOverHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOverTaskFn: function(event) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_hoverOverTaskFn", 1049);
_yuitest_coverline("/build/aui-node/aui-node.js", 1050);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1052);
var hoverOptions = instance._hoverOptions;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1054);
hoverOptions.outTask.cancel();

		_yuitest_coverline("/build/aui-node/aui-node.js", 1056);
hoverOptions.over.apply(hoverOptions.context || event.currentTarget, arguments);
	},

	/**
     * Place a node or html string at a specific location
	 *
     * @method _place
     * @private
     * @param {Node|String} newNode
     * @param {Node} refNode
     */
	_place: function(newNode, refNode) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "_place", 1067);
_yuitest_coverline("/build/aui-node/aui-node.js", 1068);
var instance = this;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1070);
var parent = instance.get(PARENT_NODE);

		_yuitest_coverline("/build/aui-node/aui-node.js", 1072);
if (parent) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1073);
if (isString(newNode)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1074);
newNode = Node.create(newNode);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1077);
parent.insertBefore(newNode, refNode);
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 1080);
return instance;
	},

	_defaultHoverOptions: {
		overEventType: 'mouseenter',
		outEventType: 'mouseleave',
		overDelay: 0,
		outDelay: 0,
		over: Lang.emptyFn,
		out: Lang.emptyFn
	}
}, true);

_yuitest_coverline("/build/aui-node/aui-node.js", 1093);
NODE_PROTO.__show = NODE_PROTO._show;
_yuitest_coverline("/build/aui-node/aui-node.js", 1094);
NODE_PROTO.__hide = NODE_PROTO._hide;
_yuitest_coverline("/build/aui-node/aui-node.js", 1095);
NODE_PROTO.__isHidden = NODE_PROTO._isHidden;

_yuitest_coverline("/build/aui-node/aui-node.js", 1097);
NODE_PROTO._isHidden = function() {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "_isHidden", 1097);
_yuitest_coverline("/build/aui-node/aui-node.js", 1098);
var instance = this;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1100);
return NODE_PROTO.__isHidden.call(instance) || instance.hasClass(instance._hideClass || CSS_HELPER_HIDDEN);
};
/**
 * <p>Hide the node adding a css class on it. If <code>cssClass</code> is not
 * passed as argument, the className 'aui-helper-hidden' will be used by
 * default.</p>
 *
 * <p><string>NOTE:</string> This method assume that your node were visible
 * because the absence of 'aui-helper-hidden' css class. This won't
 * manipulate the inline <code>style.display</code> property.</p>
 *
 * @method hide
 * @chainable
 * @param {string} cssClass Class name to hide the element. Optional.
 */
_yuitest_coverline("/build/aui-node/aui-node.js", 1115);
NODE_PROTO._hide = function() {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "_hide", 1115);
_yuitest_coverline("/build/aui-node/aui-node.js", 1116);
var instance = this;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1118);
instance.addClass(instance._hideClass || CSS_HELPER_HIDDEN);

	_yuitest_coverline("/build/aui-node/aui-node.js", 1120);
return instance;
};

/**
 * <p>Show the node removing a css class used to hide it. Use the same
 * className added using the <a href="A.Node.html#method_hide">hide</a>
 * method. If <code>cssClass</code> is not passed as argument, the
 * className 'aui-helper-hidden' will be used by default.</p>
 *
 * <p><string>NOTE:</string> This method assume that your node were hidden
 * because of the 'aui-helper-hidden' css class were being used. This won't
 * manipulate the inline <code>style.display</code> property.</p>
 *
 * @method show
 * @chainable
 * @param {string} cssClass Class name to hide the element. Optional.
 */
_yuitest_coverline("/build/aui-node/aui-node.js", 1137);
NODE_PROTO._show = function() {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "_show", 1137);
_yuitest_coverline("/build/aui-node/aui-node.js", 1138);
var instance = this;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1140);
instance.removeClass(instance._hideClass || CSS_HELPER_HIDDEN);

	_yuitest_coverline("/build/aui-node/aui-node.js", 1142);
return instance;
};

/**
 * Returns the width of the content, not including
 * the padding, border or margin. If a width is passed,
 * the node's overall width is set to that size.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.width(); //returns content width
 * node.width(100); // sets box width
 * </code></pre>
 *
 * @method width
 * @return {number}
 */

/**
 * Returns the height of the content, not including
 * the padding, border or margin. If a height is passed,
 * the node's overall height is set to that size.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.height(); //returns content height
 * node.height(100); // sets box height
 * </code></pre>
 *
 * @method height
 * @return {number}
 */

/**
 * Returns the size of the box from inside of the border,
 * which is the offsetWidth plus the padding on the left and right.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.innerWidth();
 * </code></pre>
 *
 * @method innerWidth
 * @return {number}
 */

/**
 * Returns the size of the box from inside of the border,
 * which is offsetHeight plus the padding on the top and bottom.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.innerHeight();
 * </code></pre>
 *
 * @method innerHeight
 * @return {number}
 */

/**
 * Returns the outer width of the box including the border,
 * if true is passed as the first argument, the margin is included.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.outerWidth();
 * node.outerWidth(true); // includes margin
 * </code></pre>
 *
 * @method outerWidth
 * @return {number}
 */

/**
 * Returns the outer height of the box including the border,
 * if true is passed as the first argument, the margin is included.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.outerHeight();
 * node.outerHeight(true); // includes margin
 * </code></pre>
 *
 * @method outerHeight
 * @return {number}
 */

_yuitest_coverline("/build/aui-node/aui-node.js", 1235);
A.each(
	['Height', 'Width'],
	function(item, index, collection) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 5)", 1237);
_yuitest_coverline("/build/aui-node/aui-node.js", 1238);
var sides = index ? 'lr' : 'tb';

		_yuitest_coverline("/build/aui-node/aui-node.js", 1240);
var dimensionType = item.toLowerCase();

		_yuitest_coverline("/build/aui-node/aui-node.js", 1242);
NODE_PROTO[dimensionType] = function(size) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "]", 1242);
_yuitest_coverline("/build/aui-node/aui-node.js", 1243);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1245);
var returnValue = instance;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1247);
if (isUndefined(size)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1248);
var node = instance._node;
				_yuitest_coverline("/build/aui-node/aui-node.js", 1249);
var dimension;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1251);
if (node) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1252);
if ((!node.tagName && node.nodeType === 9) || node.alert) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 1253);
dimension = instance.get(REGION)[dimensionType];
					}
					else {
						_yuitest_coverline("/build/aui-node/aui-node.js", 1256);
dimension = instance.get(OFFSET + item);

						_yuitest_coverline("/build/aui-node/aui-node.js", 1258);
var previous = {};
						_yuitest_coverline("/build/aui-node/aui-node.js", 1259);
var styleObj = node.style;

						_yuitest_coverline("/build/aui-node/aui-node.js", 1261);
if (!dimension) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 1262);
instance.addClass(CSS_HELPER_FORCE_OFFSET);

							_yuitest_coverline("/build/aui-node/aui-node.js", 1264);
dimension = instance.get(OFFSET + item);

							_yuitest_coverline("/build/aui-node/aui-node.js", 1266);
instance.removeClass(CSS_HELPER_FORCE_OFFSET);
						}

						_yuitest_coverline("/build/aui-node/aui-node.js", 1269);
if (dimension) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 1270);
dimension -= (instance.getPadding(sides) + instance.getBorderWidth(sides));
						}
					}
				}

				_yuitest_coverline("/build/aui-node/aui-node.js", 1275);
returnValue = dimension;
			}
			else {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1278);
instance.setStyle(dimensionType, size);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1281);
return returnValue;
		};

		_yuitest_coverline("/build/aui-node/aui-node.js", 1284);
NODE_PROTO[INNER + item] = function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "]", 1284);
_yuitest_coverline("/build/aui-node/aui-node.js", 1285);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1287);
return instance[dimensionType]() + instance.getPadding(sides);
		};

		_yuitest_coverline("/build/aui-node/aui-node.js", 1290);
NODE_PROTO[OUTER + item] = function(margin) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "]", 1290);
_yuitest_coverline("/build/aui-node/aui-node.js", 1291);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1293);
var innerSize = instance[INNER + item]();
			_yuitest_coverline("/build/aui-node/aui-node.js", 1294);
var borderSize = instance.getBorderWidth(sides);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1296);
var size = innerSize + borderSize;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1298);
if (margin) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1299);
size += instance.getMargin(sides);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1302);
return size;
		};
	}
);

_yuitest_coverline("/build/aui-node/aui-node.js", 1307);
if (!SUPPORT_OPTIONAL_TBODY) {
	_yuitest_coverline("/build/aui-node/aui-node.js", 1308);
A.DOM._ADD_HTML = A.DOM.addHTML;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1310);
A.DOM.addHTML = function(node, content, where) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "addHTML", 1310);
_yuitest_coverline("/build/aui-node/aui-node.js", 1311);
var nodeName = (node.nodeName && node.nodeName.toLowerCase()) || STR_EMPTY;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1313);
var tagName = STR_EMPTY;

		_yuitest_coverline("/build/aui-node/aui-node.js", 1315);
if (!isUndefined(content)) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1316);
if (isString(content)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1317);
tagName = (REGEX_TAGNAME.exec(content) || ARRAY_EMPTY_STRINGS)[1];
			}
			else {_yuitest_coverline("/build/aui-node/aui-node.js", 1319);
if (content.nodeType && content.nodeType == 11 && content.childNodes.length) { // a doc frag
				_yuitest_coverline("/build/aui-node/aui-node.js", 1320);
tagName = content.childNodes[0].nodeName;
			}
			else {_yuitest_coverline("/build/aui-node/aui-node.js", 1322);
if (content.nodeName) { // a node
				_yuitest_coverline("/build/aui-node/aui-node.js", 1323);
tagName = content.nodeName;
			}}}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1326);
tagName = tagName && tagName.toLowerCase();
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 1329);
if (nodeName == 'table' && tagName == 'tr') {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1330);
node = node.getElementsByTagName('tbody')[0] || node.appendChild(node.ownerDocument.createElement('tbody'));

			_yuitest_coverline("/build/aui-node/aui-node.js", 1332);
var whereNodeName = ((where && where.nodeName) || STR_EMPTY).toLowerCase();

			// Assuming if the "where" is a tbody node,
			// we're trying to prepend to a table. Attempt to
			// grab the first child of the tbody.
			_yuitest_coverline("/build/aui-node/aui-node.js", 1337);
if (whereNodeName == 'tbody' && where.childNodes.length > 0) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1338);
where = where.firstChild;
			}
		}

		_yuitest_coverline("/build/aui-node/aui-node.js", 1342);
return A.DOM._ADD_HTML(node, content, where);
	};
}

/**
 * Augment the <a href="NodeList.html">YUI3 NodeList</a> with more util methods.
 *
 * Check the list of <a href="NodeList.html#methods">Methods</a> available for
 * AUI NodeList.
 *
 * @class A.NodeList
 * @constructor
 * @uses A.Node
 */
_yuitest_coverline("/build/aui-node/aui-node.js", 1356);
NodeList.importMethod(
	NODE_PROTO,
	[
		'after',

		'appendTo',

		'attr',

		'before',

		'empty',

		'hover',

		'html',

		'innerHeight',

		'innerWidth',

		'outerHeight',

		'outerHTML',

		'outerWidth',

		'prepend',

		'prependTo',

		'purge',

		'selectText',

		'selectable',

		'text',

		'toggle',

		'unselectable',

		'val'
	]
);

_yuitest_coverline("/build/aui-node/aui-node.js", 1403);
A.mix(
	NODELIST_PROTO,
	{
		/**
	     * See <a href="Node.html#method_all">Node all</a>.
	     *
	     * @method all
	     */
		all: function(selector) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "all", 1411);
_yuitest_coverline("/build/aui-node/aui-node.js", 1412);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1414);
var newNodeList = [];
			_yuitest_coverline("/build/aui-node/aui-node.js", 1415);
var nodes = instance._nodes;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1416);
var length = nodes.length;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1418);
var subList;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1420);
for (var i = 0; i < length; i++) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1421);
subList = A.Selector.query(selector, nodes[i]);

				_yuitest_coverline("/build/aui-node/aui-node.js", 1423);
if (subList && subList.length) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1424);
newNodeList.push.apply(newNodeList, subList);
				}
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1428);
newNodeList = AArray.unique(newNodeList);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1430);
return A.all(newNodeList);
		},

		allNS: function(ns, selector) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "allNS", 1433);
_yuitest_coverline("/build/aui-node/aui-node.js", 1434);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1436);
return instance.all(formatSelectorNS(ns, selector));
		},

		/**
		 * Returns the first element in the node list collection.
		 *
		 * @method first
		 * @return {Node}
		 */
		first: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "first", 1445);
_yuitest_coverline("/build/aui-node/aui-node.js", 1446);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1448);
return instance.item(0);
		},

		/**
	     * See <a href="Node.html#method_getDOM">Node getDOM</a>.
	     *
	     * @method getDOM
	     */
		getDOM: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "getDOM", 1456);
_yuitest_coverline("/build/aui-node/aui-node.js", 1457);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1459);
return NodeList.getDOMNodes(this);
		},

		/**
		 * Returns the last element in the node list collection.
		 *
		 * @method last
		 * @return {Node}
		 */
		last: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "last", 1468);
_yuitest_coverline("/build/aui-node/aui-node.js", 1469);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1471);
return instance.item(instance._nodes.length - 1);
		},

		/**
	     * See <a href="Node.html#method_one">Node one</a>.
	     *
	     * @method one
	     */
		one: function(selector) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "one", 1479);
_yuitest_coverline("/build/aui-node/aui-node.js", 1480);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1482);
var newNode = null;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1484);
var nodes = instance._nodes;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1485);
var length = nodes.length;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1487);
for (var i = 0; i < length; i++) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1488);
newNode = A.Selector.query(selector, nodes[i], true);

				_yuitest_coverline("/build/aui-node/aui-node.js", 1490);
if (newNode) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1491);
newNode = A.one(newNode);

					_yuitest_coverline("/build/aui-node/aui-node.js", 1493);
break;
				}
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1497);
return newNode;
		},

		oneNS: function(ns, selector) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "oneNS", 1500);
_yuitest_coverline("/build/aui-node/aui-node.js", 1501);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1503);
return instance.one(formatSelectorNS(ns, selector));
		}
	}
);

_yuitest_coverline("/build/aui-node/aui-node.js", 1508);
NODELIST_PROTO.__filter = NODELIST_PROTO.filter;

_yuitest_coverline("/build/aui-node/aui-node.js", 1510);
NODELIST_PROTO.filter = function(value, context) {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "filter", 1510);
_yuitest_coverline("/build/aui-node/aui-node.js", 1511);
var instance = this;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1513);
var newNodeList;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1515);
if (isFunction(value)) {
		_yuitest_coverline("/build/aui-node/aui-node.js", 1516);
var nodes = [];

		_yuitest_coverline("/build/aui-node/aui-node.js", 1518);
instance.each(
			function(item, index, collection) {
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 6)", 1519);
_yuitest_coverline("/build/aui-node/aui-node.js", 1520);
if (value.call(context || item, item, index, collection)) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1521);
nodes.push(item._node);
				}
			}
		);

		_yuitest_coverline("/build/aui-node/aui-node.js", 1526);
newNodeList = A.all(nodes);
	}
	else {
		_yuitest_coverline("/build/aui-node/aui-node.js", 1529);
newNodeList = NODELIST_PROTO.__filter.call(instance, value);
	}

	_yuitest_coverline("/build/aui-node/aui-node.js", 1532);
return newNodeList;
};

_yuitest_coverline("/build/aui-node/aui-node.js", 1535);
A.mix(
	NodeList,
	{
		create: function(html) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "create", 1538);
_yuitest_coverline("/build/aui-node/aui-node.js", 1539);
var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1541);
return docFrag.append(html).get(CHILD_NODES);
		}
	}
);

_yuitest_coverline("/build/aui-node/aui-node.js", 1546);
A.mix(
	A,
	{
		/**
	     * Get the body node. Shortcut to <code>A.one('body')</code>.
		 *
	     * @method getBody
	     */
		getBody: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "getBody", 1554);
_yuitest_coverline("/build/aui-node/aui-node.js", 1555);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1557);
if (!instance._bodyNode) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1558);
instance._bodyNode = A.one(DOC.body);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1561);
return instance._bodyNode;
		},

		/**
	     * Get the document node. Shortcut to <code>A.one(document)</code>.
		 *
	     * @method getDoc
	     */
		getDoc: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "getDoc", 1569);
_yuitest_coverline("/build/aui-node/aui-node.js", 1570);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1572);
if (!instance._documentNode) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1573);
instance._documentNode = A.one(DOC);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1576);
return instance._documentNode;
		},

		/**
	     * Get the window node. Shortcut to <code>A.one(window)</code>.
		 *
	     * @method getWin
	     */
		getWin: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "getWin", 1584);
_yuitest_coverline("/build/aui-node/aui-node.js", 1585);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1587);
if (!instance._windowNode) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1588);
instance._windowNode = A.one(WIN);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1591);
return instance._windowNode;
		}
	}
);

_yuitest_coverline("/build/aui-node/aui-node.js", 1596);
A.queryNS = function(ns, selector, methodName) {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "queryNS", 1596);
_yuitest_coverline("/build/aui-node/aui-node.js", 1597);
return A[methodName || 'one'](formatSelectorNS(ns, selector));
};

_yuitest_coverline("/build/aui-node/aui-node.js", 1600);
A.oneNS = A.queryNS;

_yuitest_coverline("/build/aui-node/aui-node.js", 1602);
A.allNS = function(ns, selector) {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "allNS", 1602);
_yuitest_coverline("/build/aui-node/aui-node.js", 1603);
return A.queryNS(ns, selector, 'all');
}

_yuitest_coverline("/build/aui-node/aui-node.js", 1606);
A.byIdNS = function(ns, id) {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "byIdNS", 1606);
_yuitest_coverline("/build/aui-node/aui-node.js", 1607);
return A.one(prefixSelector(ns, id));
};

// Patch for http://yuilibrary.com/projects/yui3/ticket/2531537

_yuitest_coverline("/build/aui-node/aui-node.js", 1612);
var addMethod = NodeList.addMethod;

_yuitest_coverline("/build/aui-node/aui-node.js", 1614);
AArray.each(
	['hide', 'show'],
	function(item, index, collection) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 7)", 1616);
_yuitest_coverline("/build/aui-node/aui-node.js", 1617);
addMethod(
			item,
			function() {
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 8)", 1619);
_yuitest_coverline("/build/aui-node/aui-node.js", 1620);
return this[item].apply(this, arguments);
			}
		);
	}
);

}, '@VERSION@' ,{requires:['aui-base-lang','aui-classnamemanager','node']});
_yuitest_coverline("/build/aui-node/aui-node.js", 1627);
AUI.add('aui-node-html5', function(A) {
/**
 * aui-node-html5 provides support for HTML shiv natively on the Alloy dom
 * methods. The HTML5 shiv just affects IE.
 *
 * @module aui-node
 * @submodule aui-node-html5
 */

_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 9)", 1627);
_yuitest_coverline("/build/aui-node/aui-node.js", 1636);
if (A.UA.ie) {
	/**
	 * <p>An object that encapsulates util methods for HTML5 shiving.</p>
	 * <h2>What is a "shiv"?</h1>
	 * <p>To the world, a shiv is a slang term for a sharp object used as a
     * knife-like weapon. To Internet Explorer, a shiv is a script that, when
     * executed, forces the browser to recognize HTML5 elements.</p>
	 *
	 * @class A.HTML5
	 */
	_yuitest_coverline("/build/aui-node/aui-node.js", 1646);
var HTML5 = A.namespace('HTML5'),
		DOM_create = A.DOM._create;

	_yuitest_coverline("/build/aui-node/aui-node.js", 1649);
if (!HTML5._fragHTML5Shived) {
		/**
		 * A global DocumentFragment already HTML5 shived, for performance
         * reasons. (i.e., all nodes and its HTML5 children appended to this
         * fragment iherits the styles on IE).
		 *
		 * @property A.HTML._fragHTML5Shived
		 * @type DocumentFragment (shived)
		 * @protected
		 */
		_yuitest_coverline("/build/aui-node/aui-node.js", 1659);
HTML5._fragHTML5Shived = YUI.AUI.html5shiv(
			A.config.doc.createDocumentFragment()
		);
	}

	_yuitest_coverline("/build/aui-node/aui-node.js", 1664);
A.mix(
		HTML5,
		{
			/**
			 * Receives a <code>frag</code> and a HTML content. This method
             * shivs the HTML5 nodes appended to a Node or fragment which is not
             * on the document yet.
			 *
			 * @method IECreateFix
			 * @param {Node | DocumentFragment} frag Fragment to be fixed.
			 * @param {String} content HTML to be set (using innerHTML) on the <code>frag</code>.
			 * @return {Node | DocumentFragment}
			 */
			IECreateFix: function(frag, content) {
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "IECreateFix", 1677);
_yuitest_coverline("/build/aui-node/aui-node.js", 1678);
var shivedFrag = HTML5._fragHTML5Shived;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1680);
shivedFrag.appendChild(frag);

				_yuitest_coverline("/build/aui-node/aui-node.js", 1682);
frag.innerHTML = content;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1684);
shivedFrag.removeChild(frag);

				_yuitest_coverline("/build/aui-node/aui-node.js", 1686);
return frag;
			},

			/**
			 * AOP listener to the A.DOM._create method. This method
             * intercepts all the calls to the A.DOM._create and append the
             * generated fragment to <a
             * href="A.HTML5.html#property_A.HTML._fragHTML5Shived">A.HTML._fragHTML5Shived</a>,
             * this fixes the IE bug for painting the HTML5 nodes on the HTML
             * fragment.
			 *
			 * @method _doBeforeCreate
			 * @param {String} html HTML content
			 * @param {String} doc
			 * @param {String} tag
			 * @protected
			 * @return {DocumentFragment}
			 */
			_doBeforeCreate: function(html, doc, tag) {
				_yuitest_coverfunc("/build/aui-node/aui-node.js", "_doBeforeCreate", 1704);
_yuitest_coverline("/build/aui-node/aui-node.js", 1705);
var createdFrag = DOM_create.apply(this, arguments);

				_yuitest_coverline("/build/aui-node/aui-node.js", 1707);
var shivedFrag = HTML5.IECreateFix(createdFrag, html);

				_yuitest_coverline("/build/aui-node/aui-node.js", 1709);
return new A.Do.Halt(null, shivedFrag);
			}
		}
	);

	_yuitest_coverline("/build/aui-node/aui-node.js", 1714);
A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);
}

}, '@VERSION@' ,{requires:['collection','aui-base']});
_yuitest_coverline("/build/aui-node/aui-node.js", 1718);
AUI.add('aui-node-html5-print', function(A) {
_yuitest_coverfunc("/build/aui-node/aui-node.js", "(anonymous 10)", 1718);
_yuitest_coverline("/build/aui-node/aui-node.js", 1719);
var CONFIG = A.config,
	DOC = CONFIG.doc,
	WIN = CONFIG.win,
	UA = A.UA,
	IE = UA.ie,

	isShivDisabled = function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "isShivDisabled", 1725);
_yuitest_coverline("/build/aui-node/aui-node.js", 1726);
return WIN.AUI_HTML5_IE === false;
	};

_yuitest_coverline("/build/aui-node/aui-node.js", 1729);
if (!IE || IE >= 9 || isShivDisabled()) {
	_yuitest_coverline("/build/aui-node/aui-node.js", 1730);
return;
}

_yuitest_coverline("/build/aui-node/aui-node.js", 1733);
var BUFFER_CSS_TEXT = [],

	CSS_PRINTFIX = 'aui-printfix',
	CSS_PRINTFIX_PREFIX = 'aui-printfix-',

	LOCATION = WIN.location,

	DOMAIN = LOCATION.protocol + '//' + LOCATION.host,

	GLOBAL_AUI = YUI.AUI,

	HTML = DOC.documentElement,

	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,
	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,
	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),

	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS_FAST = new RegExp('\\b(' + HTML5_ELEMENTS_LIST + ')\\b', 'i'),

	REGEX_PRINT_MEDIA = /print|all/,

	REGEX_RULE = new RegExp('(^|[^\\n{}]*?\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),
	REGEX_TAG = new RegExp('<(\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',

	STR_ALL = 'all',
	STR_BLANK = ' ',
	STR_EMPTY = '',

	STR_BRACKET_OPEN = '{',
	STR_BRACKET_CLOSE = '}',

	STR_CHECKBOX = 'checkbox',
	STR_CHECKED = 'checked',
	STR_HTTPS = 'https',
	STR_INPUT = 'INPUT',
	STR_OPTION = 'OPTION',
	STR_RADIO = 'radio',
	STR_SELECTED = 'selected',
	STR_STAR = '*',
	STR_URL = 'url(',
	STR_URL_DOMAIN = STR_URL + DOMAIN,

	TAG_REPLACE_ORIGINAL = '<$1$2',
	TAG_REPLACE_FONT = '<$1font';

_yuitest_coverline("/build/aui-node/aui-node.js", 1782);
var html5shiv = GLOBAL_AUI.html5shiv,
	// Yes, IE does this wackiness; converting an object
	// to a string should never result in undefined, but
	// IE's styleSheet object sometimes becomes inaccessible
	// after trying to print the second time
	isStylesheetDefined = function(obj) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "isStylesheetDefined", 1787);
_yuitest_coverline("/build/aui-node/aui-node.js", 1788);
return obj && (obj + STR_EMPTY !== undefined);
	},

	toggleNode = function(node, origNode, prop) {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "toggleNode", 1791);
_yuitest_coverline("/build/aui-node/aui-node.js", 1792);
var state = origNode[prop];

		_yuitest_coverline("/build/aui-node/aui-node.js", 1794);
if (state) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1795);
node.setAttribute(prop, state);
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1798);
node.removeAttribute(prop);
		}
	};

	_yuitest_coverline("/build/aui-node/aui-node.js", 1802);
html5shiv(DOC);

_yuitest_coverline("/build/aui-node/aui-node.js", 1804);
var PrintFix = function() {
	_yuitest_coverfunc("/build/aui-node/aui-node.js", "PrintFix", 1804);
_yuitest_coverline("/build/aui-node/aui-node.js", 1805);
var afterPrint = function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "afterPrint", 1805);
_yuitest_coverline("/build/aui-node/aui-node.js", 1806);
if (isShivDisabled()) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1807);
destroy();
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1810);
PrintFix.onAfterPrint();
		}
	};

	_yuitest_coverline("/build/aui-node/aui-node.js", 1814);
var beforePrint = function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "beforePrint", 1814);
_yuitest_coverline("/build/aui-node/aui-node.js", 1815);
if (isShivDisabled()) {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1816);
destroy();
		}
		else {
			_yuitest_coverline("/build/aui-node/aui-node.js", 1819);
PrintFix.onBeforePrint();
		}
	};

	_yuitest_coverline("/build/aui-node/aui-node.js", 1823);
var destroy = function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "destroy", 1823);
_yuitest_coverline("/build/aui-node/aui-node.js", 1824);
WIN.detachEvent('onafterprint', afterPrint);
		_yuitest_coverline("/build/aui-node/aui-node.js", 1825);
WIN.detachEvent('onbeforeprint', beforePrint);
	};

	_yuitest_coverline("/build/aui-node/aui-node.js", 1828);
var init = function() {
		_yuitest_coverfunc("/build/aui-node/aui-node.js", "init", 1828);
_yuitest_coverline("/build/aui-node/aui-node.js", 1829);
WIN.attachEvent('onafterprint', afterPrint);
		_yuitest_coverline("/build/aui-node/aui-node.js", 1830);
WIN.attachEvent('onbeforeprint', beforePrint);
	};

	_yuitest_coverline("/build/aui-node/aui-node.js", 1833);
init();

	_yuitest_coverline("/build/aui-node/aui-node.js", 1835);
PrintFix.destroy = destroy;
	_yuitest_coverline("/build/aui-node/aui-node.js", 1836);
PrintFix.init = init;
};

_yuitest_coverline("/build/aui-node/aui-node.js", 1839);
A.mix(
	PrintFix,
	{
		onAfterPrint: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "onAfterPrint", 1842);
_yuitest_coverline("/build/aui-node/aui-node.js", 1843);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1845);
instance.restoreHTML();

			_yuitest_coverline("/build/aui-node/aui-node.js", 1847);
var styleSheet = instance._getStyleSheet();

			_yuitest_coverline("/build/aui-node/aui-node.js", 1849);
styleSheet.styleSheet.cssText = STR_EMPTY;
		},

		onBeforePrint: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "onBeforePrint", 1852);
_yuitest_coverline("/build/aui-node/aui-node.js", 1853);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1855);
var styleSheet = instance._getStyleSheet();
			_yuitest_coverline("/build/aui-node/aui-node.js", 1856);
var cssRules = instance._getAllCSSText();

			_yuitest_coverline("/build/aui-node/aui-node.js", 1858);
styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1860);
instance.writeHTML();
		},

		parseCSS: function(cssText) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "parseCSS", 1863);
_yuitest_coverline("/build/aui-node/aui-node.js", 1864);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1866);
var css = STR_EMPTY;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1867);
var rules = cssText.match(REGEX_RULE);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1869);
if (rules) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1870);
css = rules.join('\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1873);
return css;
		},

		restoreHTML: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "restoreHTML", 1876);
_yuitest_coverline("/build/aui-node/aui-node.js", 1877);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1879);
var bodyClone = instance._getBodyClone();
			_yuitest_coverline("/build/aui-node/aui-node.js", 1880);
var bodyEl = instance._getBodyEl();

			_yuitest_coverline("/build/aui-node/aui-node.js", 1882);
bodyClone.innerHTML = STR_EMPTY;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1884);
HTML.removeChild(bodyClone);
			_yuitest_coverline("/build/aui-node/aui-node.js", 1885);
HTML.appendChild(bodyEl);
		},

		writeHTML: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "writeHTML", 1888);
_yuitest_coverline("/build/aui-node/aui-node.js", 1889);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1891);
var i = -1;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1892);
var j;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1894);
var bodyEl = instance._getBodyEl();

			_yuitest_coverline("/build/aui-node/aui-node.js", 1896);
var html5Element;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1898);
var cssClass;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1900);
var nodeList;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1901);
var nodeListLength;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1902);
var node;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1903);
var buffer = [];

			_yuitest_coverline("/build/aui-node/aui-node.js", 1905);
while (++i < HTML5_ELEMENTS_LENGTH) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1906);
html5Element = HTML5_ELEMENTS[i];

				_yuitest_coverline("/build/aui-node/aui-node.js", 1908);
nodeList = DOC.getElementsByTagName(html5Element);
				_yuitest_coverline("/build/aui-node/aui-node.js", 1909);
nodeListLength = nodeList.length;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1911);
j = -1;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1913);
while (++j < nodeListLength) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1914);
node = nodeList[j];

					_yuitest_coverline("/build/aui-node/aui-node.js", 1916);
cssClass = node.className;

					_yuitest_coverline("/build/aui-node/aui-node.js", 1918);
if (cssClass.indexOf(CSS_PRINTFIX_PREFIX) == -1) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 1919);
buffer[0] = CSS_PRINTFIX_PREFIX + html5Element;
						_yuitest_coverline("/build/aui-node/aui-node.js", 1920);
buffer[1] = cssClass;

						_yuitest_coverline("/build/aui-node/aui-node.js", 1922);
node.className = buffer.join(STR_BLANK);
					}
				}
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1927);
var docFrag = instance._getDocFrag();
			_yuitest_coverline("/build/aui-node/aui-node.js", 1928);
var bodyClone = instance._getBodyClone();

			_yuitest_coverline("/build/aui-node/aui-node.js", 1930);
docFrag.appendChild(bodyEl);
			_yuitest_coverline("/build/aui-node/aui-node.js", 1931);
HTML.appendChild(bodyClone);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1933);
bodyClone.className = bodyEl.className;
			_yuitest_coverline("/build/aui-node/aui-node.js", 1934);
bodyClone.id = bodyEl.id;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1936);
var originalNodes = bodyEl.getElementsByTagName(STR_STAR);
			_yuitest_coverline("/build/aui-node/aui-node.js", 1937);
var length = originalNodes.length;

			// IE will throw a mixed content warning when using https
			// and calling clone node if the body contains elements with
			// an inline background-image style that is relative to the domain.
			_yuitest_coverline("/build/aui-node/aui-node.js", 1942);
if (UA.secure) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1943);
var bodyElStyle = bodyEl.style;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1945);
var elStyle;
				_yuitest_coverline("/build/aui-node/aui-node.js", 1946);
var backgroundImage;

				_yuitest_coverline("/build/aui-node/aui-node.js", 1948);
bodyElStyle.display = 'none';

				_yuitest_coverline("/build/aui-node/aui-node.js", 1950);
for (i = 0; i < length; i++) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1951);
elStyle = originalNodes[i].style;

					_yuitest_coverline("/build/aui-node/aui-node.js", 1953);
backgroundImage = elStyle.backgroundImage;

					_yuitest_coverline("/build/aui-node/aui-node.js", 1955);
if (backgroundImage &&
						backgroundImage.indexOf(STR_URL) > -1 &&
						backgroundImage.indexOf(STR_HTTPS) == -1) {

						_yuitest_coverline("/build/aui-node/aui-node.js", 1959);
elStyle.backgroundImage = backgroundImage.replace(STR_URL, STR_URL_DOMAIN);
					}
				}

				_yuitest_coverline("/build/aui-node/aui-node.js", 1963);
bodyElStyle.display = STR_EMPTY;
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1966);
var bodyElClone = bodyEl.cloneNode(true);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1968);
var newNodes = bodyElClone.getElementsByTagName(STR_STAR);

			_yuitest_coverline("/build/aui-node/aui-node.js", 1970);
if (length == newNodes.length) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 1971);
while (length--) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 1972);
var newNode = newNodes[length];
					_yuitest_coverline("/build/aui-node/aui-node.js", 1973);
var newNodeName = newNode.nodeName;

					_yuitest_coverline("/build/aui-node/aui-node.js", 1975);
if (newNodeName == STR_INPUT || newNodeName == STR_OPTION) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 1976);
var originalNode = originalNodes[length];
						_yuitest_coverline("/build/aui-node/aui-node.js", 1977);
var originalNodeName = originalNode.nodeName;

						_yuitest_coverline("/build/aui-node/aui-node.js", 1979);
if (originalNodeName == newNodeName) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 1980);
var prop = null;

							_yuitest_coverline("/build/aui-node/aui-node.js", 1982);
if (newNodeName == STR_OPTION) {
								_yuitest_coverline("/build/aui-node/aui-node.js", 1983);
prop = STR_SELECTED;
							}
							else {_yuitest_coverline("/build/aui-node/aui-node.js", 1985);
if (newNodeName == STR_INPUT && (newNode.type == STR_CHECKBOX || newNode.type == STR_RADIO)) {
								_yuitest_coverline("/build/aui-node/aui-node.js", 1986);
prop = STR_CHECKED;
							}}

							_yuitest_coverline("/build/aui-node/aui-node.js", 1989);
if (prop !== null) {
								_yuitest_coverline("/build/aui-node/aui-node.js", 1990);
toggleNode(newNode, originalNode, prop);
							}
						}
					}
				}
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 1997);
var bodyHTML = bodyElClone.innerHTML;

			_yuitest_coverline("/build/aui-node/aui-node.js", 1999);
bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);

			_yuitest_coverline("/build/aui-node/aui-node.js", 2001);
bodyClone.innerHTML = bodyHTML;
		},

		_getAllCSSText: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getAllCSSText", 2004);
_yuitest_coverline("/build/aui-node/aui-node.js", 2005);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2007);
var buffer = [];
			_yuitest_coverline("/build/aui-node/aui-node.js", 2008);
var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, STR_ALL);
			_yuitest_coverline("/build/aui-node/aui-node.js", 2009);
var rule;
			_yuitest_coverline("/build/aui-node/aui-node.js", 2010);
var cssText;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2012);
for (var i = 0; styleSheet = styleSheets[i]; i++) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2013);
var rules = styleSheet.rules;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2015);
if (rules && rules.length) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 2016);
for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 2017);
rule = rules[j];

						_yuitest_coverline("/build/aui-node/aui-node.js", 2019);
if (!rule.href) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 2020);
cssText = instance._getCSSTextFromRule(rule);

							_yuitest_coverline("/build/aui-node/aui-node.js", 2022);
buffer.push(cssText);
						}
					}
				}
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2028);
return buffer.join(STR_BLANK);
		},

		_getCSSTextFromRule: function(rule) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getCSSTextFromRule", 2031);
_yuitest_coverline("/build/aui-node/aui-node.js", 2032);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2034);
var cssText = STR_EMPTY;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2036);
var ruleStyle = rule.style;
			_yuitest_coverline("/build/aui-node/aui-node.js", 2037);
var ruleCSSText;
			_yuitest_coverline("/build/aui-node/aui-node.js", 2038);
var ruleSelectorText;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2040);
if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) && REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2041);
BUFFER_CSS_TEXT.length = 0;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2043);
BUFFER_CSS_TEXT.push(ruleSelectorText, STR_BRACKET_OPEN, ruleCSSText, STR_BRACKET_CLOSE);

				_yuitest_coverline("/build/aui-node/aui-node.js", 2045);
cssText = BUFFER_CSS_TEXT.join(STR_BLANK);
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2048);
return cssText;
		},

		_getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getAllStyleSheets", 2051);
_yuitest_coverline("/build/aui-node/aui-node.js", 2052);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2054);
level = level || 1;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2056);
buffer = buffer || [];

			_yuitest_coverline("/build/aui-node/aui-node.js", 2058);
var i;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2060);
if (isStylesheetDefined(styleSheet)) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2061);
var imports = styleSheet.imports;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2063);
mediaType = styleSheet.mediaType || mediaType;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2065);
if (REGEX_PRINT_MEDIA.test(mediaType)) {
					_yuitest_coverline("/build/aui-node/aui-node.js", 2066);
var length;

					// IE can crash when trying to access imports more than 3 levels deep
					_yuitest_coverline("/build/aui-node/aui-node.js", 2069);
if (level <= 3 && isStylesheetDefined(imports) && imports.length) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 2070);
for (i = 0, length = imports.length; i < length; i++) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 2071);
instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);
						}
					}
					else {_yuitest_coverline("/build/aui-node/aui-node.js", 2074);
if (styleSheet.length) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 2075);
for (i = 0, length = styleSheet.length; i < length; i++) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 2076);
instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);
						}
					}
					else {
						_yuitest_coverline("/build/aui-node/aui-node.js", 2080);
var rules = styleSheet.rules;
						_yuitest_coverline("/build/aui-node/aui-node.js", 2081);
var ruleStyleSheet;

						_yuitest_coverline("/build/aui-node/aui-node.js", 2083);
if (rules && rules.length) {
							_yuitest_coverline("/build/aui-node/aui-node.js", 2084);
for (i = 0, length = rules.length; i < length; i++) {
								_yuitest_coverline("/build/aui-node/aui-node.js", 2085);
ruleStyleSheet = rules[i].styleSheet;

								_yuitest_coverline("/build/aui-node/aui-node.js", 2087);
if (ruleStyleSheet) {
									_yuitest_coverline("/build/aui-node/aui-node.js", 2088);
instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);
								}
							}
						}
					}}

					_yuitest_coverline("/build/aui-node/aui-node.js", 2094);
if (!styleSheet.disabled && styleSheet.rules) {
						_yuitest_coverline("/build/aui-node/aui-node.js", 2095);
buffer.push(styleSheet);
					}
				}
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2100);
mediaType = STR_ALL;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2102);
return buffer;
		},

		_getBodyEl: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getBodyEl", 2105);
_yuitest_coverline("/build/aui-node/aui-node.js", 2106);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2108);
var bodyEl = instance._bodyEl;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2110);
if (!bodyEl) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2111);
bodyEl = DOC.body;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2113);
instance._bodyEl = bodyEl;
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2116);
return bodyEl;
		},

		_getBodyClone: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getBodyClone", 2119);
_yuitest_coverline("/build/aui-node/aui-node.js", 2120);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2122);
var bodyClone = instance._bodyClone;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2124);
if (!bodyClone) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2125);
bodyClone = DOC.createElement('body');

				_yuitest_coverline("/build/aui-node/aui-node.js", 2127);
instance._bodyClone = bodyClone;
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2130);
return bodyClone;
		},

		_getDocFrag: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getDocFrag", 2133);
_yuitest_coverline("/build/aui-node/aui-node.js", 2134);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2136);
var docFrag = instance._docFrag;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2138);
if (!docFrag) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2139);
docFrag = DOC.createDocumentFragment();

				_yuitest_coverline("/build/aui-node/aui-node.js", 2141);
html5shiv(docFrag);

				_yuitest_coverline("/build/aui-node/aui-node.js", 2143);
instance._docFrag = docFrag;
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2146);
return docFrag;
		},

		_getStyleSheet: function() {
			_yuitest_coverfunc("/build/aui-node/aui-node.js", "_getStyleSheet", 2149);
_yuitest_coverline("/build/aui-node/aui-node.js", 2150);
var instance = this;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2152);
var styleSheet = instance._styleSheet;

			_yuitest_coverline("/build/aui-node/aui-node.js", 2154);
if (!styleSheet) {
				_yuitest_coverline("/build/aui-node/aui-node.js", 2155);
styleSheet = DOC.createElement('style');

				_yuitest_coverline("/build/aui-node/aui-node.js", 2157);
var head = DOC.documentElement.firstChild;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2159);
head.insertBefore(styleSheet, head.firstChild);

				_yuitest_coverline("/build/aui-node/aui-node.js", 2161);
styleSheet.media = 'print';
				_yuitest_coverline("/build/aui-node/aui-node.js", 2162);
styleSheet.className = CSS_PRINTFIX;

				_yuitest_coverline("/build/aui-node/aui-node.js", 2164);
instance._styleSheet = styleSheet;
			}

			_yuitest_coverline("/build/aui-node/aui-node.js", 2167);
return styleSheet;
		}
	}
);

_yuitest_coverline("/build/aui-node/aui-node.js", 2172);
A.namespace('HTML5').PrintFix = PrintFix;

_yuitest_coverline("/build/aui-node/aui-node.js", 2174);
PrintFix();

}, '@VERSION@' ,{requires:['aui-node-html5']});


_yuitest_coverline("/build/aui-node/aui-node.js", 2179);
AUI.add('aui-node', function(A){}, '@VERSION@' ,{use:['aui-node-base','aui-node-html5','aui-node-html5-print'], skinnable:false});

