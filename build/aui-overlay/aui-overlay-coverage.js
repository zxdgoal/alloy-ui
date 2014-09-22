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
_yuitest_coverage["/build/aui-overlay/aui-overlay.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-overlay/aui-overlay.js",
    code: []
};
_yuitest_coverage["/build/aui-overlay/aui-overlay.js"].code=["AUI.add('aui-overlay-base', function(A) {","/**"," * Provides a basic Overlay widget, with Standard Module content support. The Overlay widget"," * provides Page XY positioning support, alignment and centering support along with basic "," * stackable support (z-index and shimming)."," *"," * @module aui-overlay"," * @submodule aui-overlay-base"," */","","/**"," * A basic Overlay Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support)."," * It also provides alignment and centering support and uses a standard module format for it's content, with header,"," * body and footer section support."," *"," * @class OverlayBase"," * @constructor"," * @extends Component"," * @uses WidgetStdMod"," * @uses WidgetPosition"," * @uses WidgetStack"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @param {Object} object The user configuration for the instance."," */","A.OverlayBase = A.Component.create(","	{","		NAME: 'overlay',","		AUGMENTS: [A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain, A.WidgetStdMod]","	}",");","","}, '@VERSION@' ,{requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']});","AUI.add('aui-overlay-context', function(A) {","/**"," * The OverlayContext Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-context"," */","","var L = A.Lang,","	isString = L.isString,","	isNumber = L.isNumber,","	isObject = L.isObject,","	isBoolean = L.isBoolean,","","	isNodeList = function(v) {","		return (v instanceof A.NodeList);","	},","","	ALIGN = 'align',","	BL = 'bl',","	BOUNDING_BOX = 'boundingBox',","	CANCELLABLE_HIDE = 'cancellableHide',","	OVERLAY_CONTEXT = 'overlaycontext',","	CURRENT_NODE = 'currentNode',","	FOCUSED = 'focused',","	HIDE = 'hide',","	HIDE_DELAY = 'hideDelay',","	HIDE_ON = 'hideOn',","	HIDE_ON_DOCUMENT_CLICK = 'hideOnDocumentClick',","	MOUSEDOWN = 'mousedown',","	SHOW = 'show',","	SHOW_DELAY = 'showDelay',","	SHOW_ON = 'showOn',","	TL = 'tl',","	TRIGGER = 'trigger',","	USE_ARIA = 'useARIA',","	VISIBLE = 'visible';","","/**"," * <p><img src=\"assets/images/aui-overlay-context/main.png\"/></p>"," *"," * A base class for OverlayContext, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Able to display an <a href=\"Overlay.html\">Overlay</a> at a specified corner of an element <a href=\"OverlayContext.html#config_trigger\">trigger</a></li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.OverlayContext({"," *  boundingBox: '#OverlayBoundingBox',"," *  hideOn: 'mouseleave',"," *  showOn: 'mouseenter',"," *	trigger: '.menu-trigger'"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"OverlayContext.html#configattributes\">Configuration Attributes</a> available for"," * OverlayContext."," *"," * @class OverlayContext"," * @constructor"," * @extends OverlayBase"," * @param config {Object} Object literal specifying widget configuration properties."," */","var OverlayContext = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property OverlayContext.NAME","		 * @type String","		 * @static","		 */","		NAME: OVERLAY_CONTEXT,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the OverlayContext.","		 *","		 * @property OverlayContext.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Inherited from <a href=\"Overlay.html#config_align\">Overlay</a>.","			 *","			 * @attribute align","			 * @default { node: null, points: [ TL, BL ] }","			 * @type Object","			 */","			align: {","	            value: { node: null, points: [ TL, BL ] }","	        },","","			/**","			 * Cancel auto hide delay if the user interact with the Overlay","	         * (focus, click, mouseover)","			 *","			 * @attribute cancellableHide","			 * @default true","			 * @type boolean","			 */","			cancellableHide: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * OverlayContext allow multiple elements to be the","	         * <a href=\"OverlayContext.html#config_trigger\">trigger</a>, the","	         * currentNode stores the current active one.","			 *","			 * @attribute currentNode","			 * @default First item of the","	         * <a href=\"OverlayContext.html#config_trigger\">trigger</a> NodeList.","			 * @type Node","			 */","			currentNode: {","				valueFn: function() {","					// define default currentNode as the first item from trigger","					return this.get(TRIGGER).item(0);","				}","			},","","			delay: {","				value: null,","				validator: isObject","			},","","			/**","			 * The event which is responsible to hide the OverlayContext.","			 *","			 * @attribute hideOn","			 * @default mouseout","			 * @type String","			 */","			hideOn: {","				lazyAdd: false,","				value: 'mouseout',","				setter: function(v) {","					return this._setHideOn(v);","				}","			},","","			/**","			 * If true the instance is registered on the","	         * <a href=\"OverlayContextManager.html\">OverlayContextManager</a> static","	         * class and will be hide when the user click on document.","			 *","			 * @attribute hideOnDocumentClick","			 * @default true","			 * @type boolean","			 */","			hideOnDocumentClick: {","				lazyAdd: false,","				setter: function(v) {","					return this._setHideOnDocumentClick(v);","				},","				value: true,","				validator: isBoolean","			},","","			/**","			 * Number of milliseconds after the hide method is invoked to hide the","	         * OverlayContext.","			 *","			 * @attribute hideDelay","			 * @default 0","			 * @type Number","			 */","			hideDelay: {","				lazyAdd: false,","				setter: '_setHideDelay',","				value: 0,","				validator: isNumber","			},","","			/**","			 * The event which is responsible to show the OverlayContext.","			 *","			 * @attribute showOn","			 * @default mouseover","			 * @type String","			 */","			showOn: {","				lazyAdd: false,","				value: 'mouseover',","				setter: function(v) {","					return this._setShowOn(v);","				}","			},","","			/**","			 * Number of milliseconds after the show method is invoked to show the","	         * OverlayContext.","			 *","			 * @attribute showDelay","			 * @default 0","			 * @type Number","			 */","			showDelay: {","				lazyAdd: false,","				setter: '_setShowDelay',","				value: 0,","				validator: isNumber","			},","","			/**","			 * Node, NodeList or Selector which will be used as trigger elements","	         * to show or hide the OverlayContext.","			 *","			 * @attribute trigger","			 * @default null","			 * @type {Node | NodeList | String}","			 */","			trigger: {","				lazyAdd: false,","				setter: function(v) {","					if (isNodeList(v)) {","						return v;","					}","					else if (isString(v)) {","						return A.all(v);","					}","","					return new A.NodeList([v]);","				}","			},","","			/**","			 * True if Overlay should use ARIA plugin","			 *","			 * @attribute useARIA","			 * @default true","			 * @type Boolean","			 */","			useARIA: {","				value: true","			},","","			/**","			 * If true the OverlayContext is visible by default after the render phase.","	         * Inherited from <a href=\"Overlay.html\">Overlay</a>.","			 *","			 * @attribute visible","			 * @default false","			 * @type boolean","			 */","			visible: {","				value: false","			}","		},","","		EXTENDS: A.OverlayBase,","","		constructor: function(config) {","			var instance = this;","","			instance._showCallback = null;","			instance._hideCallback = null;","","			OverlayContext.superclass.constructor.apply(this, arguments);","		},","","		prototype: {","			/**","			 * Construction logic executed during OverlayContext instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				var trigger = instance.get(TRIGGER);","","				if (trigger && trigger.size()) {","					instance.set('align.node', trigger.item(0));","				}","			},","","			/**","			 * Bind the events on the OverlayContext UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function(){","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","","				boundingBox.on(MOUSEDOWN, instance._stopTriggerEventPropagation);","","				instance.before('triggerChange', instance._beforeTriggerChange);","				instance.before('showOnChange', instance._beforeShowOnChange);","				instance.before('hideOnChange', instance._beforeHideOnChange);","","				instance.after('triggerChange', instance._afterTriggerChange);","				instance.after('showOnChange', instance._afterShowOnChange);","				instance.after('hideOnChange', instance._afterHideOnChange);","","				boundingBox.on('click', A.bind(instance._cancelAutoHide, instance));","				boundingBox.on('mouseenter', A.bind(instance._cancelAutoHide, instance));","				boundingBox.on('mouseleave', A.bind(instance._invokeHideTaskOnInteraction, instance));","				instance.after('focusedChange', A.bind(instance._invokeHideTaskOnInteraction, instance));","","				instance.on('visibleChange', instance._onVisibleChangeOverlayContext);","			},","","			/**","			 * Hides the OverlayContext.","			 *","			 * @method hide","			 */","			hide: function() {","				var instance = this;","","				instance.clearIntervals();","","				instance.fire('hide');","","				OverlayContext.superclass.hide.apply(instance, arguments);","			},","","			/**","			 * Shows the OverlayContext.","			 *","			 * @method hide","			 */","			show: function(event) {","				var instance = this;","","				instance.clearIntervals();","","				instance.updateCurrentNode(event);","","				instance.fire('show');","","				OverlayContext.superclass.show.apply(instance, arguments);","","				instance.refreshAlign();","			},","","			/**","			 * Refreshes the rendered UI, based on Widget State","			 *","			 * @method syncUI","			 * @protected","			 *","			 */","			syncUI: function() {","				var instance = this;","","				if (instance.get(USE_ARIA)) {","					instance.plug(A.Plugin.Aria, {","						attributes: {","							trigger: {","								ariaName: 'controls',","								format: function(value) {","									var id = instance.get(BOUNDING_BOX).generateID();","","									return id;","								},","								node: function() {","									return instance.get(TRIGGER);","								}","							},","							visible: {","								ariaName: 'hidden',","								format: function(value) {","									return !value;","								}","							}","						},","						roleName: 'dialog'","					});","				}","			},","","			/**","			 * Toggles visibility of the OverlayContext.","			 *","			 * @method toggle","			 * @param {EventFacade} event","			 */","			toggle: function(event) {","				var instance = this;","","				if (instance.get(VISIBLE)) {","					instance._hideTask(event);","				}","				else {","					instance._showTask(event);","				}","			},","","			/**","			 * Clear the intervals to show or hide the OverlayContext. See","		     * <a href=\"OverlayContext.html#config_hideDelay\">hideDelay</a> and","		     * <a href=\"OverlayContext.html#config_showDelay\">showDelay</a>.","			 *","			 * @method clearIntervals","			 */","			clearIntervals: function() {","				this._hideTask.cancel();","				this._showTask.cancel();","			},","","			/**","			 * Refreshes the alignment of the OverlayContext with the","		     * <a href=\"OverlayContext.html#config_currentNode\">currentNode</a>. See","		     * also <a href=\"OverlayContext.html#config_align\">align</a>.","			 *","			 * @method refreshAlign","			 */","			refreshAlign: function() {","				var instance = this;","				var align = instance.get(ALIGN);","				var currentNode = instance.get(CURRENT_NODE);","","				if (currentNode) {","					instance._uiSetAlign(currentNode, align.points);","				}","			},","","			/**","			 * Update the","		     * <a href=\"OverlayContext.html#config_currentNode\">currentNode</a> with the","		     * <a href=\"OverlayContext.html#config_align\">align</a> node or the","		     * event.currentTarget and in last case with the first item of the","		     * <a href=\"OverlayContext.html#config_trigger\">trigger</a>.","			 *","			 * @method updateCurrentNode","			 * @param {EventFacade} event","			 */","			updateCurrentNode: function(event) {","				var instance = this;","				var align = instance.get(ALIGN);","				var trigger = instance.get(TRIGGER);","				var currentTarget = null;","","				if (event) {","					currentTarget = event.currentTarget;","				}","","				var node = currentTarget || trigger.item(0) || align.node;","","				if (node) {","					instance.set(CURRENT_NODE, node);","				}","			},","","			/**","			 * Handles the logic for the","		     * <a href=\"OverlayContext.html#method_toggle\">toggle</a>.","			 *","			 * @method _toggle","			 * @param {EventFacade} event","			 * @protected","			 */","			_toggle: function(event) {","				var instance = this;","				var currentTarget = event.currentTarget;","","				// check if the target is different and simulate a .hide() before toggle","				if (instance._lastTarget != currentTarget) {","					instance.hide();","				}","","				instance.toggle(event);","","				event.stopPropagation();","","				instance._lastTarget = currentTarget;","			},","","			/**","			 * Fires after the <a href=\"OverlayContext.html#config_showOn\">showOn</a>","		     * attribute change.","			 *","			 * @method _afterShowOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterShowOnChange: function(event) {","				var instance = this;","				var wasToggle = event.prevVal == instance.get(HIDE_ON);","","				if (wasToggle) {","					var trigger = instance.get(TRIGGER);","","					// if wasToggle remove the toggle callback","					trigger.detach(event.prevVal, instance._hideCallback);","					// and re attach the hide event","					instance._setHideOn( instance.get(HIDE_ON) );","				}","			},","","			/**","			 * Fires after the <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>","		     * attribute change.","			 *","			 * @method _afterHideOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterHideOnChange: function(event) {","				var instance = this;","				var wasToggle = event.prevVal == instance.get(SHOW_ON);","","				if (wasToggle) {","					var trigger = instance.get(TRIGGER);","","					// if wasToggle remove the toggle callback","					trigger.detach(event.prevVal, instance._showCallback);","					// and re attach the show event","					instance._setShowOn( instance.get(SHOW_ON) );","				}","			},","","			/**","			 * Fires after the <a href=\"OverlayContext.html#config_trigger\">trigger</a>","		     * attribute change.","			 *","			 * @method _afterTriggerChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterTriggerChange: function(event) {","				var instance = this;","","				instance._setShowOn( instance.get(SHOW_ON) );","				instance._setHideOn( instance.get(HIDE_ON) );","			},","","			/**","			 * Fires before the <a href=\"OverlayContext.html#config_showOn\">showOn</a>","		     * attribute change.","			 *","			 * @method _beforeShowOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeShowOnChange: function(event) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","","				// detach the old callback","				trigger.detach(event.prevVal, instance._showCallback);","			},","","			/**","			 * Fires before the <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>","		     * attribute change.","			 *","			 * @method _beforeHideOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeHideOnChange: function(event) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","","				// detach the old callback","				trigger.detach(event.prevVal, instance._hideCallback);","			},","","			/**","			 * Fires before the <a href=\"OverlayContext.html#config_trigger\">trigger</a>","		     * attribute change.","			 *","			 * @method _beforeTriggerChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeTriggerChange: function(event) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","				var showOn = instance.get(SHOW_ON);","				var hideOn = instance.get(HIDE_ON);","","				trigger.detach(showOn, instance._showCallback);","				trigger.detach(hideOn, instance._hideCallback);","				trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);","			},","","			/**","			 * Cancel hide event if the user does some interaction with the","		     * OverlayContext (focus, click or mouseover).","			 *","			 * @method _cancelAutoHide","			 * @param {EventFacade} event","			 * @protected","			 */","			_cancelAutoHide: function(event) {","				var instance = this;","","				if (instance.get(CANCELLABLE_HIDE)) {","					instance.clearIntervals();","				}","","				event.stopPropagation();","			},","","			/**","			 * Invoke the hide event when the OverlayContext looses the focus.","			 *","			 * @method _invokeHideTaskOnInteraction","			 * @param {EventFacade} event","			 * @protected","			 */","			_invokeHideTaskOnInteraction: function(event) {","				var instance = this;","				var cancellableHide = instance.get(CANCELLABLE_HIDE);","				var focused = instance.get(FOCUSED);","","				if (!focused && !cancellableHide) {","					instance._hideTask();","				}","			},","","			/**","			 * Fires when the <a href=\"OverlayContext.html#config_visible\">visible</a>","		     * attribute changes.","			 *","			 * @method _onVisibleChangeOverlayContext","			 * @param {EventFacade} event","			 * @protected","			 */","			_onVisibleChangeOverlayContext: function(event) {","				var instance = this;","","				if (event.newVal && instance.get('disabled')) {","					event.preventDefault();","				}","			},","","			/**","			 * Helper method to invoke event.stopPropagation().","			 *","			 * @method _stopTriggerEventPropagation","			 * @param {EventFacade} event","			 * @protected","			 */","			_stopTriggerEventPropagation: function(event) {","				event.stopPropagation();","			},","","			/**","			 * Setter for the","		     * <a href=\"OverlayContext.html#config_hideDelay\">hideDelay</a>","		     * attribute.","			 *","			 * @method _setHideDelay","			 * @param {number} val","			 * @protected","			 * @return {number}","			 */","			_setHideDelay: function(val) {","				var instance = this;","","				instance._hideTask = A.debounce(instance.hide, val, instance);","","				return val;","			},","","			/**","			 * Setter for the <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>","		     * attribute.","			 *","			 * @method _setHideOn","			 * @param {String} eventType Event type","			 * @protected","			 * @return {String}","			 */","			_setHideOn: function(eventType) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","				var toggle = eventType == instance.get(SHOW_ON);","","				if (toggle) {","					instance._hideCallback = A.bind(instance._toggle, instance);","","					// only one attached event is enough for toggle","					trigger.detach(eventType, instance._showCallback);","				}","				else {","					var delay = instance.get(HIDE_DELAY);","","					instance._hideCallback = function(event) {","						instance._hideTask(event);","","						event.stopPropagation();","					};","				}","","				trigger.on(eventType, instance._hideCallback);","","				return eventType;","			},","","			/**","			 * Setter for the","		     * <a href=\"OverlayContext.html#config_hideOnDocumentClick\">hideOnDocumentClick</a>","		     * attribute.","			 *","			 * @method _setHideOn","			 * @param {boolean} value","			 * @protected","			 * @return {boolean}","			 */","			_setHideOnDocumentClick: function(value) {","				var instance = this;","","				if (value) {","					A.OverlayContextManager.register(instance);","				}","				else {","					A.OverlayContextManager.remove(instance);","				}","","				return value;","			},","","			/**","			 * Setter for the","		     * <a href=\"OverlayContext.html#config_showDelay\">showDelay</a>","		     * attribute.","			 *","			 * @method _setShowDelay","			 * @param {number} val","			 * @protected","			 * @return {number}","			 */","			_setShowDelay: function(val) {","				var instance = this;","","				instance._showTask = A.debounce(instance.show, val, instance);","","				return val;","			},","","			/**","			 * Setter for the <a href=\"OverlayContext.html#config_showOn\">showOn</a>","		     * attribute.","			 *","			 * @method _setShowOn","			 * @param {String} eventType Event type","			 * @protected","			 * @return {String}","			 */","			_setShowOn: function(eventType) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","				var toggle = eventType == instance.get(HIDE_ON);","","				if (toggle) {","					instance._showCallback = A.bind(instance._toggle, instance);","","					// only one attached event is enough for toggle","					trigger.detach(eventType, instance._hideCallback);","				}","				else {","					var delay = instance.get(SHOW_DELAY);","","					instance._showCallback = function(event) {","						instance._showTask(event);","","						event.stopPropagation();","					};","				}","","				if (eventType != MOUSEDOWN) {","					trigger.on(MOUSEDOWN, instance._stopTriggerEventPropagation);","				}","				else {","					trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);","				}","","				trigger.on(eventType, instance._showCallback);","","				return eventType;","			}","		}","	}",");","","A.OverlayContext = OverlayContext;","","/**"," * A base class for OverlayContextManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayContextManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","A.OverlayContextManager = new A.OverlayManager({});","","A.on(MOUSEDOWN, function() { A.OverlayContextManager.hideAll(); }, A.getDoc());","","}, '@VERSION@' ,{requires:['aui-overlay-manager','aui-delayed-task','aui-aria']});","AUI.add('aui-overlay-context-panel', function(A) {","/**"," * The OverlayContextPanel Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-context-panel"," */","","var L = A.Lang,","	isBoolean = L.isBoolean,","	isString = L.isString,","	isObject = L.isObject,","","	ALIGN = 'align',","	ANIM = 'anim',","	ARROW = 'arrow',","	BACKGROUND_COLOR = 'backgroundColor',","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	CLICK = 'click',","	CONTENT_BOX = 'contentBox',","	CONTEXTPANEL = 'overlaycontextpanel',","	DEFAULT = 'default',","	DOT = '.',","	END = 'end',","	HIDDEN = 'hidden',","	INNER = 'inner',","	OPACITY = 'opacity',","	POINTER = 'pointer',","	SHOW_ARROW = 'showArrow',","	STATE = 'state',","	STYLE = 'style',","	VISIBLE = 'visible',","","	BC = 'bc',","	BL = 'bl',","	BR = 'br',","	CC = 'cc',","	LB = 'lb',","	LC = 'lc',","	LT = 'lt',","	RB = 'rb',","	RC = 'rc',","	RL = 'rl',","","	getCN = A.getClassName,","","	CSS_CONTEXTPANEL = getCN(CONTEXTPANEL),","	CSS_CONTEXTPANEL_ARROW = getCN(CONTEXTPANEL, ARROW, BLANK),","	CSS_CONTEXTPANEL_HIDDEN = getCN(CONTEXTPANEL, HIDDEN),","	CSS_CONTEXTPANEL_POINTER = getCN(CONTEXTPANEL, POINTER),","	CSS_CONTEXTPANEL_POINTER_INNER = getCN(CONTEXTPANEL, POINTER, INNER),","	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),","","	TPL_POINTER = '<div class=\"' + [ CSS_STATE_DEFAULT, CSS_CONTEXTPANEL_POINTER ].join(' ') + '\"></div>',","	TPL_POINTER_INNER = '<div class=\"' + CSS_CONTEXTPANEL_POINTER_INNER + '\"></div>';","","/**"," * <p><img src=\"assets/images/aui-overlay-context-panel/main.png\"/></p>"," *"," * A base class for OverlayContextPanel, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>Customizable arrow</li>"," *	<li>Optional animation when show or hide</li>"," * </ul>"," *"," * Quick Example:<br/>"," * "," * <pre><code>var instance = new A.OverlayContextPanel({"," *  bodyContent: 'Here s a sample OverlayContextPanel.',"," *  boundingBox: '#overlay-context-panel',"," *  trigger: '#triggerButton',"," *  cancellableHide: true,"," *  hideDelay: 200,"," *  hideOnDocumentClick: false,"," *  anim: true"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"OverlayContextPanel.html#configattributes\">Configuration Attributes</a> available for"," * OverlayContextPanel."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayContextPanel"," * @constructor"," * @extends OverlayContext"," */","var OverlayContextPanel = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property OverlayContextPanel.NAME","		 * @type String","		 * @static","		 */","		NAME: CONTEXTPANEL,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the OverlayContextPanel.","		 *","		 * @property OverlayContextPanel.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Enable or disable the animation for hide and show. Used as the","			 * <a href=\"Anim.html\">Anim</a> configuration attributes.","			 *","			 * <pre><code>anim: {","			 *  show: {","			 *  	duration: .9","			 *  },","			 *  hide: {","			 *  	duration: .2","			 *  }","			 * }","			 * </code></pre>","			 * ","			 * @attribute anim","			 * @default { show: false }","			 * @type Object","			 */","			anim: {","				lazyAdd: false,","				value: {","					show: false","				},","				setter: function(v) {","					return this._setAnim(v);","				}","			},","","			/**","			 * Position where the arrow will be placed. See","			 * <a href=\"OverlayContextPanel.html#config_showArrow\">showArrow</a>. If it's","			 * not set, it will get the value set on the","			 * <a href=\"OverlayContext.html#config_align\">align</a> point. Here is a","			 * list of valid arrows 'bc', 'bl', 'br', 'cc', 'lb', 'lc', 'lt', 'rb',","			 * 'rc', 'rl'.","			 *","			 * @attribute arrow","			 * @default null","			 * @type String","			 */","			arrow: {","				value: null,","				validator: isString","			},","","			/**","			 * See <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>.","			 *","			 * @attribute hideOn","			 * @default click","			 * @type String","			 */","			hideOn: {","				value: CLICK","			},","","			/**","			 * See <a href=\"OverlayContext.html#config_showOn\">showOn</a>.","			 *","			 * @attribute showOn","			 * @default click","			 * @type String","			 */","			showOn: {","				value: CLICK","			},","","			/**","			 * If true the OverlayContextPanel will show an arrow positioned on the","			 * <a href=\"OverlayContextPanel.html#config_arrow\">arrow</a> point.","			 *","			 * @attribute showArrow","			 * @default true","			 * @type boolean","			 */","			showArrow: {","				lazyAdd: false,","				value: true,","				validator: isBoolean","			},","","			/**","			 * Gives stacking habilities to the OverlayContextPanel.","			 *","			 * @attribute stack","			 * @default true","			 * @type boolean","			 */","			stack: {","				lazyAdd: false,","				value: true,","				setter: function(v) {","					return this._setStack(v);","				},","				validator: isBoolean","			}","		},","","		EXTENDS: A.OverlayContext,","","		prototype: {","			/**","			 * Bind the events on the OverlayContextPanel UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance.after('showArrowChange', instance._afterShowArrowChange);","","				instance.before('show', instance._beforeShow);","","				OverlayContextPanel.superclass.bindUI.apply(instance, arguments);","			},","","			/**","			 * Create the DOM structure for the OverlayContextPanel. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderElements();","			},","","			/**","			 * Sync the OverlayContextPanel UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				OverlayContextPanel.superclass.syncUI.apply(instance, arguments);","","				instance._syncElements();","			},","","			/**","			 * Aligns the OverlayContextPanel to the provided node (or viewport) using the","			 * provided points. Inherited from","			 * <a href=\"Overlay.html#method_align\">Overlay</a>.","			 *","			 * @method align","			 * @param {Node | String | null} node A reference (or selector string) for","			 * the Node which with the OverlayContextPanel is to be aligned.","			 * @param {Array[2]} points A two element array, specifying the points on","			 * the OverlayContextPanel and node/viewport which need to be aligned.","			 */","			align: function (node, points) {","				var instance = this;","","				OverlayContextPanel.superclass.align.apply(this, arguments);","","				instance._syncElements();","			},","","			/**","			 * OverlayContextPanel uses a imageless arrow, which involves some CSS technics.","			 * This method is meant to fix the color of the borders of the arrow.","			 *","			 * @method fixPointerColor","			 */","			fixPointerColor: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var pointer = contentBox.one(DOT+CSS_CONTEXTPANEL_POINTER_INNER);","","				pointer.removeAttribute(STYLE);","","				var bColor = contentBox.getStyle(BACKGROUND_COLOR);","				var border = 'borderBottomColor';","","				var right = [","					DOT+CSS_CONTEXTPANEL_ARROW+RB,","						DOT+CSS_CONTEXTPANEL_ARROW+RC,","							DOT+CSS_CONTEXTPANEL_ARROW+RL","				]","				.join(',');","","				var bottom = [","					DOT+CSS_CONTEXTPANEL_ARROW+BR,","						DOT+CSS_CONTEXTPANEL_ARROW+BC,","							DOT+CSS_CONTEXTPANEL_ARROW+BL","				]","				.join(',');","","				var left = [","					DOT+CSS_CONTEXTPANEL_ARROW+LB,","						DOT+CSS_CONTEXTPANEL_ARROW+LC,","							DOT+CSS_CONTEXTPANEL_ARROW+LT","				]","				.join(',');","","				if (contentBox.test(right)) {","					border = 'borderLeftColor';","				}","				else if (contentBox.test(bottom)) {","					border = 'borderTopColor';","				}","				else if (contentBox.test(left)) {","					border = 'borderRightColor';","				}","","				pointer.setStyle(border, bColor);","			},","","			/**","			 * Normalize the align point value. The align point 'cc' is not a valid","			 * position for the arrow and then it's normalized to the 'bc' point.","			 *","			 * @method getAlignPoint","			 * @return {String}","			 */","			getAlignPoint: function() {","				var instance = this;","				var overlayPoint = instance.get(ALIGN).points[0];","","				if (overlayPoint == CC) {","					// CC is not a valid position for the arrow","					overlayPoint = BC;","				}","","				return instance.get(ARROW) || overlayPoint;","			},","","			/**","			 * Hides the OverlayContextPanel.","			 *","			 * @method hide","			 * @param {EventFacade} event ","			 */","			hide: function(event) {","				var instance = this;","","				if(instance._hideAnim) {","					var visible = instance.get(VISIBLE);","","					if (visible) {","						instance._hideAnim.once(END, function() {","							OverlayContextPanel.superclass.hide.apply(instance, arguments);","						});","","						instance._hideAnim.run();","					}","				}","				else {","					OverlayContextPanel.superclass.hide.apply(instance, arguments);","				}","			},","","			/**","			 * Render DOM elements for the OverlayContextPanel.","			 *","			 * @method _renderElements","			 * @protected","			 */","			_renderElements: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var align = instance.get(ALIGN);","				var overlayPoint = align.points[0];","","				contentBox.addClass(CSS_STATE_DEFAULT);","","				instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);","","				contentBox.append(","					instance._pointerNode","				);","			},","","			/**","			 * Sync the UI of the OverlayContextPanel elements.","			 *","			 * @method _syncElements","			 * @protected","			 */","			_syncElements: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var pointerNode = instance._pointerNode;","				var overlayPoint = instance.getAlignPoint();","","				if (instance.get(SHOW_ARROW)) {","					pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);","					contentBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);","					contentBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);","","					instance.fixPointerColor();","				}","				else {","					pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);","				}","","				instance._lastOverlayPoint = overlayPoint;","			},","","			/**","			 * Setter for the","			 * <a href=\"OverlayContextPanel.html#config_stack\">stack</a> attribute.","			 *","			 * @method _setStack","			 * @param {boolean} value","			 * @protected","			 * @return {boolean}","			 */","			_setStack: function(value) {","				var instance = this;","","				if (value) {","					A.OverlayContextPanelManager.register(instance);","				}","				else {","					A.OverlayContextPanelManager.remove(instance);","				}","","				return value;","			},","","			/**","			 * Setter for the","			 * <a href=\"OverlayContextPanel.html#config_anim\">anim</a> attribute.","			 *","			 * @method _setAnim","			 * @param {Object} value","			 * @protected","			 * @return {Object}","			 */","			_setAnim: function(value) {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","","				if (value) {","					var defaults = {","						node: boundingBox,","						duration: 0.1","					};","","					var showOptions = A.merge(defaults, {","						from: { opacity: 0 },","						to: { opacity: 1 }","					});","","					var hideOptions = A.merge(defaults, {","						from: { opacity: 1 },","						to: { opacity: 0 }","					});","","					if (isObject(value)) {","						// loading user settings for animation","						showOptions = A.merge(showOptions, value.show);","						hideOptions = A.merge(hideOptions, value.hide);","					}","","					instance._showAnim = new A.Anim(showOptions);","					instance._hideAnim = new A.Anim(hideOptions);","","					// if anim.show or anim.hide === false, cancel respective animation","					if (isObject(value)) {","						if (value.show === false) {","							instance._showAnim = null;","						}","","						if (value.hide === false) {","							instance._hideAnim = null;","						}","					}","				}","","				return value;","			},","","			/**","			 * Fires before show the OverlayContextPanel.","			 *","			 * @method _beforeShow","			 * @param {EventFacade} event ","			 * @protected","			 */","			_beforeShow: function(event) {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","				var visible = instance.get(VISIBLE);","","				if(!visible && instance._showAnim) {","					boundingBox.setStyle(OPACITY, 0);","","					instance._showAnim.run();","				}","				else {","					boundingBox.setStyle(OPACITY, 1);","				}","			},","","			/**","			 * Fires after showArrow attribute changes.","			 *","			 * @method _afterShowArrowChange","			 * @param {EventFacade} event ","			 * @protected","			 */","			_afterShowArrowChange: function() {","				var instance = this;","","				instance._syncElements();","			}","		}","	}",");","","A.OverlayContextPanel = OverlayContextPanel;","","/**"," * A base class for OverlayContextPanelManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayContextPanelManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","A.OverlayContextPanelManager = new A.OverlayManager({","	zIndexBase: 1000","});","","}, '@VERSION@' ,{requires:['aui-overlay-context','anim'], skinnable:true});","AUI.add('aui-overlay-manager', function(A) {","/**"," * The OverlayManager Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-manager"," */","","var Lang = A.Lang,","	isArray = Lang.isArray,","	isBoolean = Lang.isBoolean,","	isNumber = Lang.isNumber,","	isString = Lang.isString,","","	BOUNDING_BOX = 'boundingBox',","	DEFAULT = 'default',","	HOST = 'host',","	OVERLAY_MANAGER = 'OverlayManager',","	GROUP = 'group',","	Z_INDEX = 'zIndex',","	Z_INDEX_BASE = 'zIndexBase';","","	/**","	 * <p><img src=\"assets/images/aui-overlay-manager/main.png\"/></p>","	 *","	 * A base class for OverlayManager, providing:","	 * <ul>","	 *    <li>Grouping overlays</li>","	 *    <li>Show or hide the entire group of registered overlays</li>","	 *    <li>Basic Overlay Stackability (zIndex support)</li>","	 * </ul>","	 *","	 * Quick Example:<br/>","	 *","	 * <pre><code>var groupOverlayManager = new A.OverlayManager();","	 * groupOverlayManager.register([overlay1, overlay2, overlay3]);","     * groupOverlayManager.hideAll();","	 * </code></pre>","	 *","	 * Check the list of <a href=\"OverlayManager.html#configattributes\">Configuration Attributes</a> available for","	 * OverlayManager.","	 *","	 * @param config {Object} Object literal specifying widget configuration properties.","	 *","	 * @class OverlayManager","	 * @constructor","	 * @extends Base","	 */","	var OverlayManager = A.Component.create(","		{","			/**","			 * Static property provides a string to identify the class.","			 *","			 * @property OverlayManager.NAME","			 * @type String","			 * @static","			 */","			NAME: OVERLAY_MANAGER.toLowerCase(),","","			/**","			 * Static property used to define the default attribute","			 * configuration for the OverlayManager.","			 *","			 * @property OverlayManager.ATTRS","			 * @type Object","			 * @static","			 */","			ATTRS: {","				/**","				 * The zIndex base to be used on the stacking for all overlays","                 * registered on the OverlayManager.","				 *","				 * @attribute zIndexBase","				 * @default 1000","				 * @type Number","				 */","				zIndexBase: {","					value: 1000,","					validator: isNumber,","					setter: Lang.toInt","				}","			},","","			EXTENDS: A.Base,","","			prototype: {","				/**","				 * Construction logic executed during OverlayManager instantiation. Lifecycle.","				 *","				 * @method initializer","				 * @protected","				 */","				initializer: function() {","					var instance = this;","","					instance._overlays = [];","				},","","				/**","				 * Set the passed overlay zIndex to the highest value.","				 *","				 * @method bringToTop","				 * @param {Overlay} overlay Instance of","		         * <a href=\"Overlay.html\">Overlay</a>.","				 */","				bringToTop: function(overlay) {","					var instance = this;","","					var overlays = instance._overlays.sort(instance.sortByZIndexDesc);","","					var highest = overlays[0];","","					if (highest !== overlay) {","						var overlayZ = overlay.get(Z_INDEX);","						var highestZ = highest.get(Z_INDEX);","","						overlay.set(Z_INDEX, highestZ + 1);","","						overlay.set('focused', true);","					}","				},","","				/**","				 * Descructor lifecycle implementation for the OverlayManager class.","				 * Purges events attached to the node (and all child nodes).","				 *","				 * @method destructor","				 * @protected","				 */","				destructor: function() {","					var instance = this;","","					instance._overlays = [];","				},","","				/**","				 * Register the passed <a href=\"Overlay.html\">Overlay</a> to this","		         * OverlayManager.","				 *","				 * @method register","				 * @param {Overlay} overlay <a href=\"Overlay.html\">Overlay</a> instance to be registered","				 * @return {Array} Registered overlays","				 */","				register: function (overlay) {","					var instance = this;","","					var overlays = instance._overlays;","","					if (isArray(overlay)) {","						A.Array.each(overlay, function(o) {","							instance.register(o);","						});","					}","					else {","						var zIndexBase = instance.get(Z_INDEX_BASE);","						var registered = instance._registered(overlay);","","						if (","							!registered && overlay &&","							((overlay instanceof A.Overlay) ||","							(A.Component && overlay instanceof A.Component))","						) {","							var boundingBox = overlay.get(BOUNDING_BOX);","","							overlays.push(overlay);","","							var zIndex = overlay.get(Z_INDEX) || 0;","							var newZIndex = overlays.length + zIndex + zIndexBase;","","							overlay.set(Z_INDEX, newZIndex);","","							overlay.on('focusedChange', instance._onFocusedChange, instance);","							boundingBox.on('mousedown', instance._onMouseDown, instance);","						}","					}","","					return overlays;","				},","","				/**","				 * Remove the passed <a href=\"Overlay.html\">Overlay</a> from this","		         * OverlayManager.","				 *","				 * @method remove","				 * @param {Overlay} overlay <a href=\"Overlay.html\">Overlay</a> instance to be removed","				 * @return {null}","				 */","				remove: function (overlay) {","					var instance = this;","","					var overlays = instance._overlays;","","					if (overlays.length) {","						return A.Array.removeItem(overlays, overlay);","					}","","					return null;","				},","","				/**","				 * Loop through all registered <a href=\"Overlay.html\">Overlay</a> and","		         * execute a callback.","				 *","				 * @method each","				 * @param {function} fn Callback to be executed on the","		         * <a href=\"Array.html#method_each\">Array.each</a>","				 * @return {null}","				 */","				each: function(fn) {","					var instance = this;","","					var overlays = instance._overlays;","","					A.Array.each(overlays, fn);","				},","","				/**","				 * Invoke the <a href=\"Overlay.html#method_show\">show</a> method from","		         * all registered Overlays.","				 *","				 * @method showAll","				 */","				showAll: function() {","					this.each(","						function(overlay) {","							overlay.show();","						}","					);","				},","","				/**","				 * Invoke the <a href=\"Overlay.html#method_hide\">hide</a> method from","		         * all registered Overlays.","				 *","				 * @method hideAll","				 */","				hideAll: function() {","					this.each(","						function(overlay) {","							overlay.hide();","						}","					);","				},","","				/**","				 * zIndex comparator. Used on Array.sort.","				 *","				 * @method sortByZIndexDesc","				 * @param {Overlay} a Overlay","				 * @param {Overlay} b Overlay","				 * @return {Number}","				 */","				sortByZIndexDesc: function(a, b) {","					if (!a || !b || !a.hasImpl(A.WidgetStack) || !b.hasImpl(A.WidgetStack)) {","						return 0;","					}","					else {","						var aZ = a.get(Z_INDEX);","						var bZ = b.get(Z_INDEX);","","						if (aZ > bZ) {","							return -1;","						} else if (aZ < bZ) {","							return 1;","						} else {","							return 0;","						}","					}","				},","","				/**","				 * Check if the overlay is registered.","				 *","				 * @method _registered","				 * @param {Overlay} overlay Overlay","				 * @protected","				 * @return {boolean}","				 */","				_registered: function(overlay) {","					var instance = this;","","					return A.Array.indexOf(instance._overlays, overlay) != -1;","				},","","				/**","				 * Mousedown event handler, used to invoke","		         * <a href=\"OverlayManager.html#method_bringToTop\">bringToTop</a>.","				 *","				 * @method _onMouseDown","				 * @param {EventFacade} event","				 * @protected","				 */","				_onMouseDown: function(event) {","					var instance = this;","					var overlay = A.Widget.getByNode(event.currentTarget || event.target);","					var registered = instance._registered(overlay);","","					if (overlay && registered) {","						instance.bringToTop(overlay);","					}","				},","","				/**","				 * Fires when the <a href=\"Widget.html#config_focused\">focused</a>","		         * attribute change. Used to invoke","		         * <a href=\"OverlayManager.html#method_bringToTop\">bringToTop</a>.","				 *","				 * @method _onFocusedChange","				 * @param {EventFacade} event","				 * @protected","				 */","				_onFocusedChange: function(event) {","					var instance = this;","","					if (event.newVal) {","						var overlay = event.currentTarget || event.target;","						var registered = instance._registered(overlay);","","						if (overlay && registered) {","							instance.bringToTop(overlay);","						}","					}","				}","			}","		}","	);","","	A.OverlayManager = OverlayManager;","","}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','overlay','plugin']});","AUI.add('aui-overlay-mask', function(A) {","/**"," * The OverlayMask Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-mask"," */","","var L = A.Lang,","	isArray = L.isArray,","	isString = L.isString,","	isNumber = L.isNumber,","	isValue = L.isValue,","","	CONFIG = A.config,","","	UA = A.UA,","","	IE6 = (UA.ie && UA.version.major <= 6),","","	ABSOLUTE = 'absolute',","	ALIGN_POINTS = 'alignPoints',","	BACKGROUND = 'background',","	BOUNDING_BOX = 'boundingBox',","	CONTENT_BOX = 'contentBox',","	FIXED = 'fixed',","	HEIGHT = 'height',","	OFFSET_HEIGHT = 'offsetHeight',","	OFFSET_WIDTH = 'offsetWidth',","	OPACITY = 'opacity',","	OVERLAY_MASK = 'overlaymask',","	POSITION = 'position',","	TARGET = 'target',","	WIDTH = 'width';","","/**"," * A base class for OverlayMask, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Cross browser mask functionality to cover an element or the entire page</li>"," *    <li>Customizable mask (i.e., background, opacity)</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.OverlayMask().render();</code></pre>"," *"," * Check the list of <a href=\"OverlayMask.html#configattributes\">Configuration Attributes</a> available for"," * OverlayMask."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayMask"," * @constructor"," * @extends OverlayBase"," */","var OverlayMask = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property OverlayMask.NAME","		 * @type String","		 * @static","		 */","		NAME: OVERLAY_MASK,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the OverlayMask.","		 *","		 * @property OverlayMask.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Points to align the <a href=\"Overlay.html\">Overlay</a> used as","	         * mask.","			 *","			 * @attribute alignPoints","			 * @default [ 'tl', 'tl' ]","			 * @type Array","			 */","			alignPoints: {","				value: [ 'tl', 'tl' ],","				validator: isArray","	        },","","			/**","			 * Background color of the mask.","			 *","			 * @attribute background","			 * @default null","			 * @type String","			 */","			background: {","				lazyAdd: false,","				value: null,","				validator: isString,","				setter: function(v) {","					if (v) {","						this.get(CONTENT_BOX).setStyle(BACKGROUND, v);","					}","","					return v;","				}","			},","","			/**","			 * Node where the mask will be positioned and re-dimensioned. The","	         * default is the document, which means that if not specified the mask","	         * takes the full screen.","			 *","			 * @attribute target","			 * @default document","			 * @type Node | String","			 */","			target: {","				cloneDefaultValue: false,","				lazyAdd: false,","				value: CONFIG.doc,","				setter: function(v) {","					var instance = this;","","					var target = A.one(v);","","					var isDoc = instance._isDoc = target.compareTo(CONFIG.doc);","					var isWin = instance._isWin = target.compareTo(CONFIG.win);","","					instance._fullPage = isDoc || isWin;","","					return target;","				}","			},","","			/**","			 * CSS opacity of the mask.","			 *","			 * @attribute opacity","			 * @default .5","			 * @type Number","			 */","			opacity: {","				value: 0.5,","				validator: isNumber,","				setter: function(v) {","					return this._setOpacity(v);","				}","			},","","			/**","			 * Use shim option.","			 *","			 * @attribute shim","			 * @default True on IE.","			 * @type boolean","			 */","			shim: {","				value: A.UA.ie","			},","","			/**","			 * If true the Overlay is visible by default after the render phase.","	         * Inherited from <a href=\"Overlay.html\">Overlay</a>.","			 *","			 * @attribute visible","			 * @default false","			 * @type boolean","			 */","			visible: {","				value: false","			},","","			/**","			 * zIndex of the OverlayMask.","			 *","			 * @attribute zIndex","			 * @default 1000","			 * @type Number","			 */","			zIndex: {","				value: 1000","			}","		},","","		EXTENDS: A.OverlayBase,","","		prototype: {","			/**","			 * Bind the events on the OverlayMask UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				OverlayMask.superclass.bindUI.apply(this, arguments);","","				instance.after('targetChange', instance._afterTargetChange);","				instance.after('visibleChange', instance._afterVisibleChange);","","				// window:resize YUI normalized event is not working, bug?","				A.on('windowresize', A.bind(instance.refreshMask, instance));","			},","","			/**","			 * Sync the OverlayMask UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance.refreshMask();","			},","","			/**","			 * Get the size of the","		     * <a href=\"OverlayMask.html#config_target\">target</a>. Used to dimension","		     * the mask node.","			 *","			 * @method getTargetSize","			 * @return {Object} Object containing the { height: height, width: width }.","			 */","			getTargetSize: function() {","				var instance = this;","				var target = instance.get(TARGET);","","				var isDoc = instance._isDoc;","				var isWin = instance._isWin;","","				var height = target.get(OFFSET_HEIGHT);","				var width = target.get(OFFSET_WIDTH);","","				if (IE6) {","					// IE6 doesn't support height/width 100% on doc/win","					if (isWin) {","						width = A.DOM.winWidth();","						height = A.DOM.winHeight();","					}","					else if (isDoc) {","						width = A.DOM.docWidth();","						height = A.DOM.docHeight();","					}","				}","				// good browsers...","				else if (instance._fullPage) {","					height = '100%';","					width = '100%';","				}","","				return { height: height, width: width };","			},","","			/**","			 * Repaint the OverlayMask UI, respecting the","		     * <a href=\"OverlayMask.html#config_target\">target</a> size and the","		     * <a href=\"OverlayMask.html#config_alignPoints\">alignPoints</a>.","			 *","			 * @method refreshMask","			 */","			refreshMask: function() {","				var instance = this;","				var alignPoints = instance.get(ALIGN_POINTS);","				var target = instance.get(TARGET);","				var boundingBox = instance.get(BOUNDING_BOX);","				var targetSize = instance.getTargetSize();","","				var fullPage = instance._fullPage;","","				boundingBox.setStyles({","					position: (IE6 || !fullPage) ? ABSOLUTE : FIXED,","					left: 0,","					top: 0","				});","","				var height = targetSize.height;","				var width = targetSize.width;","","				if (isValue(height)) {","					instance.set(HEIGHT, height);","				}","","				if (isValue(width)) {","					instance.set(WIDTH, width);","				}","","				// if its not a full mask...","				if ( !fullPage ) {","					// if the target is not document|window align the overlay","					instance.align(target, alignPoints);","				}","			},","","			/**","			 * Setter for <a href=\"Paginator.html#config_opacity\">opacity</a>.","			 *","			 * @method _setOpacity","			 * @protected","			 * @param {Number} v","			 * @return {Number}","			 */","			_setOpacity: function(v) {","				var instance = this;","","				instance.get(CONTENT_BOX).setStyle(OPACITY, v);","","				return v;","			},","","			/**","			 * Invoke the <code>OverlayMask.superclass._uiSetVisible</code>. Used to","		     * reset the <code>opacity</code> to work around IE bugs when set opacity","		     * of hidden elements.","			 *","			 * @method _uiSetVisible","			 * @param {boolean} val","			 * @protected","			 */","			_uiSetVisible: function(val) {","				var instance = this;","","				OverlayMask.superclass._uiSetVisible.apply(this, arguments);","","				if (val) {","					instance._setOpacity(","						instance.get(OPACITY)","					);","				}","			},","","			/**","			 * Fires after the value of the","			 * <a href=\"Paginator.html#config_target\">target</a> attribute change.","			 *","			 * @method _afterTargetChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterTargetChange: function(event) {","				var instance = this;","","				instance.refreshMask();","			},","","			/**","			 * Fires after the value of the","			 * <a href=\"Paginator.html#config_visible\">visible</a> attribute change.","			 *","			 * @method _afterVisibleChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterVisibleChange: function(event) {","				var instance = this;","","				instance._uiSetVisible(event.newVal);","			},","","			/**","			 * UI Setter for the ","			 * <a href=\"Paginator.html#config_xy\">XY</a> attribute.","			 *","			 * @method _uiSetXY","			 * @param {EventFacade} event","			 * @protected","			 */","			_uiSetXY: function() {","				var instance = this;","","				if (!instance._fullPage || IE6) {","					OverlayMask.superclass._uiSetXY.apply(instance, arguments);","				}","			}","		}","	}",");","","A.OverlayMask = OverlayMask;","","}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true});","","","AUI.add('aui-overlay', function(A){}, '@VERSION@' ,{use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask'], skinnable:true});",""];
_yuitest_coverage["/build/aui-overlay/aui-overlay.js"].lines = {"1":0,"26":0,"34":0,"42":0,"49":0,"99":0,"156":0,"176":0,"192":0,"224":0,"254":0,"255":0,"257":0,"258":0,"261":0,"292":0,"294":0,"295":0,"297":0,"308":0,"310":0,"312":0,"313":0,"324":0,"325":0,"327":0,"329":0,"330":0,"331":0,"333":0,"334":0,"335":0,"337":0,"338":0,"339":0,"340":0,"342":0,"351":0,"353":0,"355":0,"357":0,"366":0,"368":0,"370":0,"372":0,"374":0,"376":0,"387":0,"389":0,"390":0,"395":0,"397":0,"400":0,"406":0,"422":0,"424":0,"425":0,"428":0,"440":0,"441":0,"452":0,"453":0,"454":0,"456":0,"457":0,"472":0,"473":0,"474":0,"475":0,"477":0,"478":0,"481":0,"483":0,"484":0,"497":0,"498":0,"501":0,"502":0,"505":0,"507":0,"509":0,"521":0,"522":0,"524":0,"525":0,"528":0,"530":0,"543":0,"544":0,"546":0,"547":0,"550":0,"552":0,"565":0,"567":0,"568":0,"580":0,"581":0,"584":0,"596":0,"597":0,"600":0,"612":0,"613":0,"614":0,"615":0,"617":0,"618":0,"619":0,"631":0,"633":0,"634":0,"637":0,"648":0,"649":0,"650":0,"652":0,"653":0,"666":0,"668":0,"669":0,"681":0,"695":0,"697":0,"699":0,"712":0,"713":0,"714":0,"716":0,"717":0,"720":0,"723":0,"725":0,"726":0,"728":0,"732":0,"734":0,"748":0,"750":0,"751":0,"754":0,"757":0,"771":0,"773":0,"775":0,"788":0,"789":0,"790":0,"792":0,"793":0,"796":0,"799":0,"801":0,"802":0,"804":0,"808":0,"809":0,"812":0,"815":0,"817":0,"823":0,"835":0,"837":0,"840":0,"848":0,"929":0,"973":0,"1041":0,"1057":0,"1059":0,"1061":0,"1063":0,"1073":0,"1075":0,"1085":0,"1087":0,"1089":0,"1104":0,"1106":0,"1108":0,"1118":0,"1119":0,"1120":0,"1122":0,"1124":0,"1125":0,"1127":0,"1134":0,"1141":0,"1148":0,"1149":0,"1151":0,"1152":0,"1154":0,"1155":0,"1158":0,"1169":0,"1170":0,"1172":0,"1174":0,"1177":0,"1187":0,"1189":0,"1190":0,"1192":0,"1193":0,"1194":0,"1197":0,"1201":0,"1212":0,"1213":0,"1214":0,"1215":0,"1217":0,"1219":0,"1221":0,"1233":0,"1234":0,"1235":0,"1236":0,"1238":0,"1239":0,"1240":0,"1241":0,"1243":0,"1246":0,"1249":0,"1262":0,"1264":0,"1265":0,"1268":0,"1271":0,"1284":0,"1285":0,"1287":0,"1288":0,"1293":0,"1298":0,"1303":0,"1305":0,"1306":0,"1309":0,"1310":0,"1313":0,"1314":0,"1315":0,"1318":0,"1319":0,"1324":0,"1335":0,"1336":0,"1337":0,"1339":0,"1340":0,"1342":0,"1345":0,"1357":0,"1359":0,"1365":0,"1377":0,"1382":0,"1390":0,"1430":0,"1475":0,"1477":0,"1488":0,"1490":0,"1492":0,"1494":0,"1495":0,"1496":0,"1498":0,"1500":0,"1512":0,"1514":0,"1526":0,"1528":0,"1530":0,"1531":0,"1532":0,"1536":0,"1537":0,"1539":0,"1544":0,"1546":0,"1548":0,"1549":0,"1551":0,"1553":0,"1554":0,"1558":0,"1570":0,"1572":0,"1574":0,"1575":0,"1578":0,"1591":0,"1593":0,"1595":0,"1605":0,"1607":0,"1619":0,"1621":0,"1635":0,"1636":0,"1639":0,"1640":0,"1642":0,"1643":0,"1644":0,"1645":0,"1647":0,"1661":0,"1663":0,"1675":0,"1676":0,"1677":0,"1679":0,"1680":0,"1694":0,"1696":0,"1697":0,"1698":0,"1700":0,"1701":0,"1709":0,"1712":0,"1720":0,"1768":0,"1813":0,"1814":0,"1817":0,"1835":0,"1837":0,"1839":0,"1840":0,"1842":0,"1844":0,"1859":0,"1908":0,"1910":0,"1912":0,"1913":0,"1916":0,"1926":0,"1928":0,"1940":0,"1941":0,"1943":0,"1944":0,"1946":0,"1947":0,"1949":0,"1951":0,"1952":0,"1953":0,"1955":0,"1956":0,"1957":0,"1961":0,"1962":0,"1963":0,"1966":0,"1977":0,"1978":0,"1979":0,"1980":0,"1981":0,"1983":0,"1985":0,"1991":0,"1992":0,"1994":0,"1995":0,"1998":0,"1999":0,"2003":0,"2005":0,"2018":0,"2020":0,"2022":0,"2035":0,"2037":0,"2039":0,"2040":0,"2055":0,"2057":0,"2069":0,"2071":0,"2083":0,"2085":0,"2086":0,"2093":0,"2098":0};
_yuitest_coverage["/build/aui-overlay/aui-overlay.js"].functions = {"(anonymous 1):1":0,"isNodeList:48":0,"valueFn:154":0,"setter:175":0,"setter:191":0,"setter:223":0,"setter:253":0,"constructor:291":0,"initializer:307":0,"bindUI:323":0,"hide:350":0,"show:365":0,"format:394":0,"node:399":0,"format:405":0,"syncUI:386":0,"toggle:421":0,"clearIntervals:439":0,"refreshAlign:451":0,"updateCurrentNode:471":0,"_toggle:496":0,"_afterShowOnChange:520":0,"_afterHideOnChange:542":0,"_afterTriggerChange:564":0,"_beforeShowOnChange:579":0,"_beforeHideOnChange:595":0,"_beforeTriggerChange:611":0,"_cancelAutoHide:630":0,"_invokeHideTaskOnInteraction:647":0,"_onVisibleChangeOverlayContext:665":0,"_stopTriggerEventPropagation:680":0,"_setHideDelay:694":0,"_hideCallback:725":0,"_setHideOn:711":0,"_setHideOnDocumentClick:747":0,"_setShowDelay:770":0,"_showCallback:801":0,"_setShowOn:787":0,"(anonymous 3):837":0,"(anonymous 2):34":0,"setter:972":0,"setter:1040":0,"bindUI:1056":0,"renderUI:1072":0,"syncUI:1084":0,"align:1103":0,"fixPointerColor:1117":0,"getAlignPoint:1168":0,"(anonymous 5):1193":0,"hide:1186":0,"_renderElements:1211":0,"_syncElements:1232":0,"_setStack:1261":0,"_setAnim:1283":0,"_beforeShow:1334":0,"_afterShowArrowChange:1356":0,"(anonymous 4):840":0,"initializer:1474":0,"bringToTop:1487":0,"destructor:1511":0,"(anonymous 7):1531":0,"register:1525":0,"remove:1569":0,"each:1590":0,"(anonymous 8):1606":0,"showAll:1604":0,"(anonymous 9):1620":0,"hideAll:1618":0,"sortByZIndexDesc:1634":0,"_registered:1660":0,"_onMouseDown:1674":0,"_onFocusedChange:1693":0,"(anonymous 6):1382":0,"setter:1812":0,"setter:1834":0,"setter:1858":0,"bindUI:1907":0,"syncUI:1925":0,"getTargetSize:1939":0,"refreshMask:1976":0,"_setOpacity:2017":0,"_uiSetVisible:2034":0,"_afterTargetChange:2054":0,"_afterVisibleChange:2068":0,"_uiSetXY:2082":0,"(anonymous 10):1712":0};
_yuitest_coverage["/build/aui-overlay/aui-overlay.js"].coveredLines = 394;
_yuitest_coverage["/build/aui-overlay/aui-overlay.js"].coveredFunctions = 86;
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1);
AUI.add('aui-overlay-base', function(A) {
/**
 * Provides a basic Overlay widget, with Standard Module content support. The Overlay widget
 * provides Page XY positioning support, alignment and centering support along with basic 
 * stackable support (z-index and shimming).
 *
 * @module aui-overlay
 * @submodule aui-overlay-base
 */

/**
 * A basic Overlay Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support).
 * It also provides alignment and centering support and uses a standard module format for it's content, with header,
 * body and footer section support.
 *
 * @class OverlayBase
 * @constructor
 * @extends Component
 * @uses WidgetStdMod
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @param {Object} object The user configuration for the instance.
 */
_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 26);
A.OverlayBase = A.Component.create(
	{
		NAME: 'overlay',
		AUGMENTS: [A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain, A.WidgetStdMod]
	}
);

}, '@VERSION@' ,{requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']});
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 34);
AUI.add('aui-overlay-context', function(A) {
/**
 * The OverlayContext Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-context
 */

_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 2)", 34);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 42);
var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isBoolean = L.isBoolean,

	isNodeList = function(v) {
		_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "isNodeList", 48);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 49);
return (v instanceof A.NodeList);
	},

	ALIGN = 'align',
	BL = 'bl',
	BOUNDING_BOX = 'boundingBox',
	CANCELLABLE_HIDE = 'cancellableHide',
	OVERLAY_CONTEXT = 'overlaycontext',
	CURRENT_NODE = 'currentNode',
	FOCUSED = 'focused',
	HIDE = 'hide',
	HIDE_DELAY = 'hideDelay',
	HIDE_ON = 'hideOn',
	HIDE_ON_DOCUMENT_CLICK = 'hideOnDocumentClick',
	MOUSEDOWN = 'mousedown',
	SHOW = 'show',
	SHOW_DELAY = 'showDelay',
	SHOW_ON = 'showOn',
	TL = 'tl',
	TRIGGER = 'trigger',
	USE_ARIA = 'useARIA',
	VISIBLE = 'visible';

/**
 * <p><img src="assets/images/aui-overlay-context/main.png"/></p>
 *
 * A base class for OverlayContext, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Able to display an <a href="Overlay.html">Overlay</a> at a specified corner of an element <a href="OverlayContext.html#config_trigger">trigger</a></li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.OverlayContext({
 *  boundingBox: '#OverlayBoundingBox',
 *  hideOn: 'mouseleave',
 *  showOn: 'mouseenter',
 *	trigger: '.menu-trigger'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="OverlayContext.html#configattributes">Configuration Attributes</a> available for
 * OverlayContext.
 *
 * @class OverlayContext
 * @constructor
 * @extends OverlayBase
 * @param config {Object} Object literal specifying widget configuration properties.
 */
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 99);
var OverlayContext = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property OverlayContext.NAME
		 * @type String
		 * @static
		 */
		NAME: OVERLAY_CONTEXT,

		/**
		 * Static property used to define the default attribute
		 * configuration for the OverlayContext.
		 *
		 * @property OverlayContext.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Inherited from <a href="Overlay.html#config_align">Overlay</a>.
			 *
			 * @attribute align
			 * @default { node: null, points: [ TL, BL ] }
			 * @type Object
			 */
			align: {
	            value: { node: null, points: [ TL, BL ] }
	        },

			/**
			 * Cancel auto hide delay if the user interact with the Overlay
	         * (focus, click, mouseover)
			 *
			 * @attribute cancellableHide
			 * @default true
			 * @type boolean
			 */
			cancellableHide: {
				value: true,
				validator: isBoolean
			},

			/**
			 * OverlayContext allow multiple elements to be the
	         * <a href="OverlayContext.html#config_trigger">trigger</a>, the
	         * currentNode stores the current active one.
			 *
			 * @attribute currentNode
			 * @default First item of the
	         * <a href="OverlayContext.html#config_trigger">trigger</a> NodeList.
			 * @type Node
			 */
			currentNode: {
				valueFn: function() {
					// define default currentNode as the first item from trigger
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "valueFn", 154);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 156);
return this.get(TRIGGER).item(0);
				}
			},

			delay: {
				value: null,
				validator: isObject
			},

			/**
			 * The event which is responsible to hide the OverlayContext.
			 *
			 * @attribute hideOn
			 * @default mouseout
			 * @type String
			 */
			hideOn: {
				lazyAdd: false,
				value: 'mouseout',
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 175);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 176);
return this._setHideOn(v);
				}
			},

			/**
			 * If true the instance is registered on the
	         * <a href="OverlayContextManager.html">OverlayContextManager</a> static
	         * class and will be hide when the user click on document.
			 *
			 * @attribute hideOnDocumentClick
			 * @default true
			 * @type boolean
			 */
			hideOnDocumentClick: {
				lazyAdd: false,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 191);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 192);
return this._setHideOnDocumentClick(v);
				},
				value: true,
				validator: isBoolean
			},

			/**
			 * Number of milliseconds after the hide method is invoked to hide the
	         * OverlayContext.
			 *
			 * @attribute hideDelay
			 * @default 0
			 * @type Number
			 */
			hideDelay: {
				lazyAdd: false,
				setter: '_setHideDelay',
				value: 0,
				validator: isNumber
			},

			/**
			 * The event which is responsible to show the OverlayContext.
			 *
			 * @attribute showOn
			 * @default mouseover
			 * @type String
			 */
			showOn: {
				lazyAdd: false,
				value: 'mouseover',
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 223);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 224);
return this._setShowOn(v);
				}
			},

			/**
			 * Number of milliseconds after the show method is invoked to show the
	         * OverlayContext.
			 *
			 * @attribute showDelay
			 * @default 0
			 * @type Number
			 */
			showDelay: {
				lazyAdd: false,
				setter: '_setShowDelay',
				value: 0,
				validator: isNumber
			},

			/**
			 * Node, NodeList or Selector which will be used as trigger elements
	         * to show or hide the OverlayContext.
			 *
			 * @attribute trigger
			 * @default null
			 * @type {Node | NodeList | String}
			 */
			trigger: {
				lazyAdd: false,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 253);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 254);
if (isNodeList(v)) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 255);
return v;
					}
					else {_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 257);
if (isString(v)) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 258);
return A.all(v);
					}}

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 261);
return new A.NodeList([v]);
				}
			},

			/**
			 * True if Overlay should use ARIA plugin
			 *
			 * @attribute useARIA
			 * @default true
			 * @type Boolean
			 */
			useARIA: {
				value: true
			},

			/**
			 * If true the OverlayContext is visible by default after the render phase.
	         * Inherited from <a href="Overlay.html">Overlay</a>.
			 *
			 * @attribute visible
			 * @default false
			 * @type boolean
			 */
			visible: {
				value: false
			}
		},

		EXTENDS: A.OverlayBase,

		constructor: function(config) {
			_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "constructor", 291);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 292);
var instance = this;

			_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 294);
instance._showCallback = null;
			_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 295);
instance._hideCallback = null;

			_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 297);
OverlayContext.superclass.constructor.apply(this, arguments);
		},

		prototype: {
			/**
			 * Construction logic executed during OverlayContext instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "initializer", 307);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 308);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 310);
var trigger = instance.get(TRIGGER);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 312);
if (trigger && trigger.size()) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 313);
instance.set('align.node', trigger.item(0));
				}
			},

			/**
			 * Bind the events on the OverlayContext UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function(){
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "bindUI", 323);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 324);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 325);
var boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 327);
boundingBox.on(MOUSEDOWN, instance._stopTriggerEventPropagation);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 329);
instance.before('triggerChange', instance._beforeTriggerChange);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 330);
instance.before('showOnChange', instance._beforeShowOnChange);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 331);
instance.before('hideOnChange', instance._beforeHideOnChange);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 333);
instance.after('triggerChange', instance._afterTriggerChange);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 334);
instance.after('showOnChange', instance._afterShowOnChange);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 335);
instance.after('hideOnChange', instance._afterHideOnChange);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 337);
boundingBox.on('click', A.bind(instance._cancelAutoHide, instance));
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 338);
boundingBox.on('mouseenter', A.bind(instance._cancelAutoHide, instance));
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 339);
boundingBox.on('mouseleave', A.bind(instance._invokeHideTaskOnInteraction, instance));
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 340);
instance.after('focusedChange', A.bind(instance._invokeHideTaskOnInteraction, instance));

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 342);
instance.on('visibleChange', instance._onVisibleChangeOverlayContext);
			},

			/**
			 * Hides the OverlayContext.
			 *
			 * @method hide
			 */
			hide: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "hide", 350);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 351);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 353);
instance.clearIntervals();

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 355);
instance.fire('hide');

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 357);
OverlayContext.superclass.hide.apply(instance, arguments);
			},

			/**
			 * Shows the OverlayContext.
			 *
			 * @method hide
			 */
			show: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "show", 365);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 366);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 368);
instance.clearIntervals();

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 370);
instance.updateCurrentNode(event);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 372);
instance.fire('show');

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 374);
OverlayContext.superclass.show.apply(instance, arguments);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 376);
instance.refreshAlign();
			},

			/**
			 * Refreshes the rendered UI, based on Widget State
			 *
			 * @method syncUI
			 * @protected
			 *
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "syncUI", 386);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 387);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 389);
if (instance.get(USE_ARIA)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 390);
instance.plug(A.Plugin.Aria, {
						attributes: {
							trigger: {
								ariaName: 'controls',
								format: function(value) {
									_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "format", 394);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 395);
var id = instance.get(BOUNDING_BOX).generateID();

									_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 397);
return id;
								},
								node: function() {
									_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "node", 399);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 400);
return instance.get(TRIGGER);
								}
							},
							visible: {
								ariaName: 'hidden',
								format: function(value) {
									_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "format", 405);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 406);
return !value;
								}
							}
						},
						roleName: 'dialog'
					});
				}
			},

			/**
			 * Toggles visibility of the OverlayContext.
			 *
			 * @method toggle
			 * @param {EventFacade} event
			 */
			toggle: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "toggle", 421);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 422);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 424);
if (instance.get(VISIBLE)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 425);
instance._hideTask(event);
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 428);
instance._showTask(event);
				}
			},

			/**
			 * Clear the intervals to show or hide the OverlayContext. See
		     * <a href="OverlayContext.html#config_hideDelay">hideDelay</a> and
		     * <a href="OverlayContext.html#config_showDelay">showDelay</a>.
			 *
			 * @method clearIntervals
			 */
			clearIntervals: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "clearIntervals", 439);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 440);
this._hideTask.cancel();
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 441);
this._showTask.cancel();
			},

			/**
			 * Refreshes the alignment of the OverlayContext with the
		     * <a href="OverlayContext.html#config_currentNode">currentNode</a>. See
		     * also <a href="OverlayContext.html#config_align">align</a>.
			 *
			 * @method refreshAlign
			 */
			refreshAlign: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "refreshAlign", 451);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 452);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 453);
var align = instance.get(ALIGN);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 454);
var currentNode = instance.get(CURRENT_NODE);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 456);
if (currentNode) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 457);
instance._uiSetAlign(currentNode, align.points);
				}
			},

			/**
			 * Update the
		     * <a href="OverlayContext.html#config_currentNode">currentNode</a> with the
		     * <a href="OverlayContext.html#config_align">align</a> node or the
		     * event.currentTarget and in last case with the first item of the
		     * <a href="OverlayContext.html#config_trigger">trigger</a>.
			 *
			 * @method updateCurrentNode
			 * @param {EventFacade} event
			 */
			updateCurrentNode: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "updateCurrentNode", 471);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 472);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 473);
var align = instance.get(ALIGN);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 474);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 475);
var currentTarget = null;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 477);
if (event) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 478);
currentTarget = event.currentTarget;
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 481);
var node = currentTarget || trigger.item(0) || align.node;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 483);
if (node) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 484);
instance.set(CURRENT_NODE, node);
				}
			},

			/**
			 * Handles the logic for the
		     * <a href="OverlayContext.html#method_toggle">toggle</a>.
			 *
			 * @method _toggle
			 * @param {EventFacade} event
			 * @protected
			 */
			_toggle: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_toggle", 496);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 497);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 498);
var currentTarget = event.currentTarget;

				// check if the target is different and simulate a .hide() before toggle
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 501);
if (instance._lastTarget != currentTarget) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 502);
instance.hide();
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 505);
instance.toggle(event);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 507);
event.stopPropagation();

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 509);
instance._lastTarget = currentTarget;
			},

			/**
			 * Fires after the <a href="OverlayContext.html#config_showOn">showOn</a>
		     * attribute change.
			 *
			 * @method _afterShowOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterShowOnChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_afterShowOnChange", 520);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 521);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 522);
var wasToggle = event.prevVal == instance.get(HIDE_ON);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 524);
if (wasToggle) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 525);
var trigger = instance.get(TRIGGER);

					// if wasToggle remove the toggle callback
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 528);
trigger.detach(event.prevVal, instance._hideCallback);
					// and re attach the hide event
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 530);
instance._setHideOn( instance.get(HIDE_ON) );
				}
			},

			/**
			 * Fires after the <a href="OverlayContext.html#config_hideOn">hideOn</a>
		     * attribute change.
			 *
			 * @method _afterHideOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterHideOnChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_afterHideOnChange", 542);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 543);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 544);
var wasToggle = event.prevVal == instance.get(SHOW_ON);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 546);
if (wasToggle) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 547);
var trigger = instance.get(TRIGGER);

					// if wasToggle remove the toggle callback
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 550);
trigger.detach(event.prevVal, instance._showCallback);
					// and re attach the show event
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 552);
instance._setShowOn( instance.get(SHOW_ON) );
				}
			},

			/**
			 * Fires after the <a href="OverlayContext.html#config_trigger">trigger</a>
		     * attribute change.
			 *
			 * @method _afterTriggerChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterTriggerChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_afterTriggerChange", 564);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 565);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 567);
instance._setShowOn( instance.get(SHOW_ON) );
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 568);
instance._setHideOn( instance.get(HIDE_ON) );
			},

			/**
			 * Fires before the <a href="OverlayContext.html#config_showOn">showOn</a>
		     * attribute change.
			 *
			 * @method _beforeShowOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeShowOnChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_beforeShowOnChange", 579);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 580);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 581);
var trigger = instance.get(TRIGGER);

				// detach the old callback
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 584);
trigger.detach(event.prevVal, instance._showCallback);
			},

			/**
			 * Fires before the <a href="OverlayContext.html#config_hideOn">hideOn</a>
		     * attribute change.
			 *
			 * @method _beforeHideOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeHideOnChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_beforeHideOnChange", 595);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 596);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 597);
var trigger = instance.get(TRIGGER);

				// detach the old callback
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 600);
trigger.detach(event.prevVal, instance._hideCallback);
			},

			/**
			 * Fires before the <a href="OverlayContext.html#config_trigger">trigger</a>
		     * attribute change.
			 *
			 * @method _beforeTriggerChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeTriggerChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_beforeTriggerChange", 611);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 612);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 613);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 614);
var showOn = instance.get(SHOW_ON);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 615);
var hideOn = instance.get(HIDE_ON);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 617);
trigger.detach(showOn, instance._showCallback);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 618);
trigger.detach(hideOn, instance._hideCallback);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 619);
trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
			},

			/**
			 * Cancel hide event if the user does some interaction with the
		     * OverlayContext (focus, click or mouseover).
			 *
			 * @method _cancelAutoHide
			 * @param {EventFacade} event
			 * @protected
			 */
			_cancelAutoHide: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_cancelAutoHide", 630);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 631);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 633);
if (instance.get(CANCELLABLE_HIDE)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 634);
instance.clearIntervals();
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 637);
event.stopPropagation();
			},

			/**
			 * Invoke the hide event when the OverlayContext looses the focus.
			 *
			 * @method _invokeHideTaskOnInteraction
			 * @param {EventFacade} event
			 * @protected
			 */
			_invokeHideTaskOnInteraction: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_invokeHideTaskOnInteraction", 647);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 648);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 649);
var cancellableHide = instance.get(CANCELLABLE_HIDE);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 650);
var focused = instance.get(FOCUSED);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 652);
if (!focused && !cancellableHide) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 653);
instance._hideTask();
				}
			},

			/**
			 * Fires when the <a href="OverlayContext.html#config_visible">visible</a>
		     * attribute changes.
			 *
			 * @method _onVisibleChangeOverlayContext
			 * @param {EventFacade} event
			 * @protected
			 */
			_onVisibleChangeOverlayContext: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_onVisibleChangeOverlayContext", 665);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 666);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 668);
if (event.newVal && instance.get('disabled')) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 669);
event.preventDefault();
				}
			},

			/**
			 * Helper method to invoke event.stopPropagation().
			 *
			 * @method _stopTriggerEventPropagation
			 * @param {EventFacade} event
			 * @protected
			 */
			_stopTriggerEventPropagation: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_stopTriggerEventPropagation", 680);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 681);
event.stopPropagation();
			},

			/**
			 * Setter for the
		     * <a href="OverlayContext.html#config_hideDelay">hideDelay</a>
		     * attribute.
			 *
			 * @method _setHideDelay
			 * @param {number} val
			 * @protected
			 * @return {number}
			 */
			_setHideDelay: function(val) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setHideDelay", 694);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 695);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 697);
instance._hideTask = A.debounce(instance.hide, val, instance);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 699);
return val;
			},

			/**
			 * Setter for the <a href="OverlayContext.html#config_hideOn">hideOn</a>
		     * attribute.
			 *
			 * @method _setHideOn
			 * @param {String} eventType Event type
			 * @protected
			 * @return {String}
			 */
			_setHideOn: function(eventType) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setHideOn", 711);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 712);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 713);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 714);
var toggle = eventType == instance.get(SHOW_ON);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 716);
if (toggle) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 717);
instance._hideCallback = A.bind(instance._toggle, instance);

					// only one attached event is enough for toggle
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 720);
trigger.detach(eventType, instance._showCallback);
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 723);
var delay = instance.get(HIDE_DELAY);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 725);
instance._hideCallback = function(event) {
						_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_hideCallback", 725);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 726);
instance._hideTask(event);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 728);
event.stopPropagation();
					};
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 732);
trigger.on(eventType, instance._hideCallback);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 734);
return eventType;
			},

			/**
			 * Setter for the
		     * <a href="OverlayContext.html#config_hideOnDocumentClick">hideOnDocumentClick</a>
		     * attribute.
			 *
			 * @method _setHideOn
			 * @param {boolean} value
			 * @protected
			 * @return {boolean}
			 */
			_setHideOnDocumentClick: function(value) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setHideOnDocumentClick", 747);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 748);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 750);
if (value) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 751);
A.OverlayContextManager.register(instance);
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 754);
A.OverlayContextManager.remove(instance);
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 757);
return value;
			},

			/**
			 * Setter for the
		     * <a href="OverlayContext.html#config_showDelay">showDelay</a>
		     * attribute.
			 *
			 * @method _setShowDelay
			 * @param {number} val
			 * @protected
			 * @return {number}
			 */
			_setShowDelay: function(val) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setShowDelay", 770);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 771);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 773);
instance._showTask = A.debounce(instance.show, val, instance);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 775);
return val;
			},

			/**
			 * Setter for the <a href="OverlayContext.html#config_showOn">showOn</a>
		     * attribute.
			 *
			 * @method _setShowOn
			 * @param {String} eventType Event type
			 * @protected
			 * @return {String}
			 */
			_setShowOn: function(eventType) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setShowOn", 787);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 788);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 789);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 790);
var toggle = eventType == instance.get(HIDE_ON);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 792);
if (toggle) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 793);
instance._showCallback = A.bind(instance._toggle, instance);

					// only one attached event is enough for toggle
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 796);
trigger.detach(eventType, instance._hideCallback);
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 799);
var delay = instance.get(SHOW_DELAY);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 801);
instance._showCallback = function(event) {
						_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_showCallback", 801);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 802);
instance._showTask(event);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 804);
event.stopPropagation();
					};
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 808);
if (eventType != MOUSEDOWN) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 809);
trigger.on(MOUSEDOWN, instance._stopTriggerEventPropagation);
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 812);
trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 815);
trigger.on(eventType, instance._showCallback);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 817);
return eventType;
			}
		}
	}
);

_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 823);
A.OverlayContext = OverlayContext;

/**
 * A base class for OverlayContextManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayContextManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 835);
A.OverlayContextManager = new A.OverlayManager({});

_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 837);
A.on(MOUSEDOWN, function() { _yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 3)", 837);
A.OverlayContextManager.hideAll(); }, A.getDoc());

}, '@VERSION@' ,{requires:['aui-overlay-manager','aui-delayed-task','aui-aria']});
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 840);
AUI.add('aui-overlay-context-panel', function(A) {
/**
 * The OverlayContextPanel Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-context-panel
 */

_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 4)", 840);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 848);
var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,
	isObject = L.isObject,

	ALIGN = 'align',
	ANIM = 'anim',
	ARROW = 'arrow',
	BACKGROUND_COLOR = 'backgroundColor',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CLICK = 'click',
	CONTENT_BOX = 'contentBox',
	CONTEXTPANEL = 'overlaycontextpanel',
	DEFAULT = 'default',
	DOT = '.',
	END = 'end',
	HIDDEN = 'hidden',
	INNER = 'inner',
	OPACITY = 'opacity',
	POINTER = 'pointer',
	SHOW_ARROW = 'showArrow',
	STATE = 'state',
	STYLE = 'style',
	VISIBLE = 'visible',

	BC = 'bc',
	BL = 'bl',
	BR = 'br',
	CC = 'cc',
	LB = 'lb',
	LC = 'lc',
	LT = 'lt',
	RB = 'rb',
	RC = 'rc',
	RL = 'rl',

	getCN = A.getClassName,

	CSS_CONTEXTPANEL = getCN(CONTEXTPANEL),
	CSS_CONTEXTPANEL_ARROW = getCN(CONTEXTPANEL, ARROW, BLANK),
	CSS_CONTEXTPANEL_HIDDEN = getCN(CONTEXTPANEL, HIDDEN),
	CSS_CONTEXTPANEL_POINTER = getCN(CONTEXTPANEL, POINTER),
	CSS_CONTEXTPANEL_POINTER_INNER = getCN(CONTEXTPANEL, POINTER, INNER),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_POINTER = '<div class="' + [ CSS_STATE_DEFAULT, CSS_CONTEXTPANEL_POINTER ].join(' ') + '"></div>',
	TPL_POINTER_INNER = '<div class="' + CSS_CONTEXTPANEL_POINTER_INNER + '"></div>';

/**
 * <p><img src="assets/images/aui-overlay-context-panel/main.png"/></p>
 *
 * A base class for OverlayContextPanel, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Customizable arrow</li>
 *	<li>Optional animation when show or hide</li>
 * </ul>
 *
 * Quick Example:<br/>
 * 
 * <pre><code>var instance = new A.OverlayContextPanel({
 *  bodyContent: 'Here s a sample OverlayContextPanel.',
 *  boundingBox: '#overlay-context-panel',
 *  trigger: '#triggerButton',
 *  cancellableHide: true,
 *  hideDelay: 200,
 *  hideOnDocumentClick: false,
 *  anim: true
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="OverlayContextPanel.html#configattributes">Configuration Attributes</a> available for
 * OverlayContextPanel.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayContextPanel
 * @constructor
 * @extends OverlayContext
 */
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 929);
var OverlayContextPanel = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property OverlayContextPanel.NAME
		 * @type String
		 * @static
		 */
		NAME: CONTEXTPANEL,

		/**
		 * Static property used to define the default attribute
		 * configuration for the OverlayContextPanel.
		 *
		 * @property OverlayContextPanel.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Enable or disable the animation for hide and show. Used as the
			 * <a href="Anim.html">Anim</a> configuration attributes.
			 *
			 * <pre><code>anim: {
			 *  show: {
			 *  	duration: .9
			 *  },
			 *  hide: {
			 *  	duration: .2
			 *  }
			 * }
			 * </code></pre>
			 * 
			 * @attribute anim
			 * @default { show: false }
			 * @type Object
			 */
			anim: {
				lazyAdd: false,
				value: {
					show: false
				},
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 972);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 973);
return this._setAnim(v);
				}
			},

			/**
			 * Position where the arrow will be placed. See
			 * <a href="OverlayContextPanel.html#config_showArrow">showArrow</a>. If it's
			 * not set, it will get the value set on the
			 * <a href="OverlayContext.html#config_align">align</a> point. Here is a
			 * list of valid arrows 'bc', 'bl', 'br', 'cc', 'lb', 'lc', 'lt', 'rb',
			 * 'rc', 'rl'.
			 *
			 * @attribute arrow
			 * @default null
			 * @type String
			 */
			arrow: {
				value: null,
				validator: isString
			},

			/**
			 * See <a href="OverlayContext.html#config_hideOn">hideOn</a>.
			 *
			 * @attribute hideOn
			 * @default click
			 * @type String
			 */
			hideOn: {
				value: CLICK
			},

			/**
			 * See <a href="OverlayContext.html#config_showOn">showOn</a>.
			 *
			 * @attribute showOn
			 * @default click
			 * @type String
			 */
			showOn: {
				value: CLICK
			},

			/**
			 * If true the OverlayContextPanel will show an arrow positioned on the
			 * <a href="OverlayContextPanel.html#config_arrow">arrow</a> point.
			 *
			 * @attribute showArrow
			 * @default true
			 * @type boolean
			 */
			showArrow: {
				lazyAdd: false,
				value: true,
				validator: isBoolean
			},

			/**
			 * Gives stacking habilities to the OverlayContextPanel.
			 *
			 * @attribute stack
			 * @default true
			 * @type boolean
			 */
			stack: {
				lazyAdd: false,
				value: true,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 1040);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1041);
return this._setStack(v);
				},
				validator: isBoolean
			}
		},

		EXTENDS: A.OverlayContext,

		prototype: {
			/**
			 * Bind the events on the OverlayContextPanel UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "bindUI", 1056);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1057);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1059);
instance.after('showArrowChange', instance._afterShowArrowChange);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1061);
instance.before('show', instance._beforeShow);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1063);
OverlayContextPanel.superclass.bindUI.apply(instance, arguments);
			},

			/**
			 * Create the DOM structure for the OverlayContextPanel. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "renderUI", 1072);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1073);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1075);
instance._renderElements();
			},

			/**
			 * Sync the OverlayContextPanel UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "syncUI", 1084);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1085);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1087);
OverlayContextPanel.superclass.syncUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1089);
instance._syncElements();
			},

			/**
			 * Aligns the OverlayContextPanel to the provided node (or viewport) using the
			 * provided points. Inherited from
			 * <a href="Overlay.html#method_align">Overlay</a>.
			 *
			 * @method align
			 * @param {Node | String | null} node A reference (or selector string) for
			 * the Node which with the OverlayContextPanel is to be aligned.
			 * @param {Array[2]} points A two element array, specifying the points on
			 * the OverlayContextPanel and node/viewport which need to be aligned.
			 */
			align: function (node, points) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "align", 1103);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1104);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1106);
OverlayContextPanel.superclass.align.apply(this, arguments);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1108);
instance._syncElements();
			},

			/**
			 * OverlayContextPanel uses a imageless arrow, which involves some CSS technics.
			 * This method is meant to fix the color of the borders of the arrow.
			 *
			 * @method fixPointerColor
			 */
			fixPointerColor: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "fixPointerColor", 1117);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1118);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1119);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1120);
var pointer = contentBox.one(DOT+CSS_CONTEXTPANEL_POINTER_INNER);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1122);
pointer.removeAttribute(STYLE);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1124);
var bColor = contentBox.getStyle(BACKGROUND_COLOR);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1125);
var border = 'borderBottomColor';

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1127);
var right = [
					DOT+CSS_CONTEXTPANEL_ARROW+RB,
						DOT+CSS_CONTEXTPANEL_ARROW+RC,
							DOT+CSS_CONTEXTPANEL_ARROW+RL
				]
				.join(',');

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1134);
var bottom = [
					DOT+CSS_CONTEXTPANEL_ARROW+BR,
						DOT+CSS_CONTEXTPANEL_ARROW+BC,
							DOT+CSS_CONTEXTPANEL_ARROW+BL
				]
				.join(',');

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1141);
var left = [
					DOT+CSS_CONTEXTPANEL_ARROW+LB,
						DOT+CSS_CONTEXTPANEL_ARROW+LC,
							DOT+CSS_CONTEXTPANEL_ARROW+LT
				]
				.join(',');

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1148);
if (contentBox.test(right)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1149);
border = 'borderLeftColor';
				}
				else {_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1151);
if (contentBox.test(bottom)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1152);
border = 'borderTopColor';
				}
				else {_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1154);
if (contentBox.test(left)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1155);
border = 'borderRightColor';
				}}}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1158);
pointer.setStyle(border, bColor);
			},

			/**
			 * Normalize the align point value. The align point 'cc' is not a valid
			 * position for the arrow and then it's normalized to the 'bc' point.
			 *
			 * @method getAlignPoint
			 * @return {String}
			 */
			getAlignPoint: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "getAlignPoint", 1168);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1169);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1170);
var overlayPoint = instance.get(ALIGN).points[0];

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1172);
if (overlayPoint == CC) {
					// CC is not a valid position for the arrow
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1174);
overlayPoint = BC;
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1177);
return instance.get(ARROW) || overlayPoint;
			},

			/**
			 * Hides the OverlayContextPanel.
			 *
			 * @method hide
			 * @param {EventFacade} event 
			 */
			hide: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "hide", 1186);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1187);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1189);
if(instance._hideAnim) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1190);
var visible = instance.get(VISIBLE);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1192);
if (visible) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1193);
instance._hideAnim.once(END, function() {
							_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 5)", 1193);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1194);
OverlayContextPanel.superclass.hide.apply(instance, arguments);
						});

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1197);
instance._hideAnim.run();
					}
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1201);
OverlayContextPanel.superclass.hide.apply(instance, arguments);
				}
			},

			/**
			 * Render DOM elements for the OverlayContextPanel.
			 *
			 * @method _renderElements
			 * @protected
			 */
			_renderElements: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_renderElements", 1211);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1212);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1213);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1214);
var align = instance.get(ALIGN);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1215);
var overlayPoint = align.points[0];

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1217);
contentBox.addClass(CSS_STATE_DEFAULT);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1219);
instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1221);
contentBox.append(
					instance._pointerNode
				);
			},

			/**
			 * Sync the UI of the OverlayContextPanel elements.
			 *
			 * @method _syncElements
			 * @protected
			 */
			_syncElements: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_syncElements", 1232);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1233);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1234);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1235);
var pointerNode = instance._pointerNode;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1236);
var overlayPoint = instance.getAlignPoint();

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1238);
if (instance.get(SHOW_ARROW)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1239);
pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1240);
contentBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1241);
contentBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1243);
instance.fixPointerColor();
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1246);
pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1249);
instance._lastOverlayPoint = overlayPoint;
			},

			/**
			 * Setter for the
			 * <a href="OverlayContextPanel.html#config_stack">stack</a> attribute.
			 *
			 * @method _setStack
			 * @param {boolean} value
			 * @protected
			 * @return {boolean}
			 */
			_setStack: function(value) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setStack", 1261);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1262);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1264);
if (value) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1265);
A.OverlayContextPanelManager.register(instance);
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1268);
A.OverlayContextPanelManager.remove(instance);
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1271);
return value;
			},

			/**
			 * Setter for the
			 * <a href="OverlayContextPanel.html#config_anim">anim</a> attribute.
			 *
			 * @method _setAnim
			 * @param {Object} value
			 * @protected
			 * @return {Object}
			 */
			_setAnim: function(value) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setAnim", 1283);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1284);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1285);
var boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1287);
if (value) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1288);
var defaults = {
						node: boundingBox,
						duration: 0.1
					};

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1293);
var showOptions = A.merge(defaults, {
						from: { opacity: 0 },
						to: { opacity: 1 }
					});

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1298);
var hideOptions = A.merge(defaults, {
						from: { opacity: 1 },
						to: { opacity: 0 }
					});

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1303);
if (isObject(value)) {
						// loading user settings for animation
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1305);
showOptions = A.merge(showOptions, value.show);
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1306);
hideOptions = A.merge(hideOptions, value.hide);
					}

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1309);
instance._showAnim = new A.Anim(showOptions);
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1310);
instance._hideAnim = new A.Anim(hideOptions);

					// if anim.show or anim.hide === false, cancel respective animation
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1313);
if (isObject(value)) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1314);
if (value.show === false) {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1315);
instance._showAnim = null;
						}

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1318);
if (value.hide === false) {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1319);
instance._hideAnim = null;
						}
					}
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1324);
return value;
			},

			/**
			 * Fires before show the OverlayContextPanel.
			 *
			 * @method _beforeShow
			 * @param {EventFacade} event 
			 * @protected
			 */
			_beforeShow: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_beforeShow", 1334);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1335);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1336);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1337);
var visible = instance.get(VISIBLE);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1339);
if(!visible && instance._showAnim) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1340);
boundingBox.setStyle(OPACITY, 0);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1342);
instance._showAnim.run();
				}
				else {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1345);
boundingBox.setStyle(OPACITY, 1);
				}
			},

			/**
			 * Fires after showArrow attribute changes.
			 *
			 * @method _afterShowArrowChange
			 * @param {EventFacade} event 
			 * @protected
			 */
			_afterShowArrowChange: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_afterShowArrowChange", 1356);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1357);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1359);
instance._syncElements();
			}
		}
	}
);

_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1365);
A.OverlayContextPanel = OverlayContextPanel;

/**
 * A base class for OverlayContextPanelManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayContextPanelManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1377);
A.OverlayContextPanelManager = new A.OverlayManager({
	zIndexBase: 1000
});

}, '@VERSION@' ,{requires:['aui-overlay-context','anim'], skinnable:true});
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1382);
AUI.add('aui-overlay-manager', function(A) {
/**
 * The OverlayManager Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-manager
 */

_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 6)", 1382);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1390);
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	BOUNDING_BOX = 'boundingBox',
	DEFAULT = 'default',
	HOST = 'host',
	OVERLAY_MANAGER = 'OverlayManager',
	GROUP = 'group',
	Z_INDEX = 'zIndex',
	Z_INDEX_BASE = 'zIndexBase';

	/**
	 * <p><img src="assets/images/aui-overlay-manager/main.png"/></p>
	 *
	 * A base class for OverlayManager, providing:
	 * <ul>
	 *    <li>Grouping overlays</li>
	 *    <li>Show or hide the entire group of registered overlays</li>
	 *    <li>Basic Overlay Stackability (zIndex support)</li>
	 * </ul>
	 *
	 * Quick Example:<br/>
	 *
	 * <pre><code>var groupOverlayManager = new A.OverlayManager();
	 * groupOverlayManager.register([overlay1, overlay2, overlay3]);
     * groupOverlayManager.hideAll();
	 * </code></pre>
	 *
	 * Check the list of <a href="OverlayManager.html#configattributes">Configuration Attributes</a> available for
	 * OverlayManager.
	 *
	 * @param config {Object} Object literal specifying widget configuration properties.
	 *
	 * @class OverlayManager
	 * @constructor
	 * @extends Base
	 */
	_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1430);
var OverlayManager = A.Component.create(
		{
			/**
			 * Static property provides a string to identify the class.
			 *
			 * @property OverlayManager.NAME
			 * @type String
			 * @static
			 */
			NAME: OVERLAY_MANAGER.toLowerCase(),

			/**
			 * Static property used to define the default attribute
			 * configuration for the OverlayManager.
			 *
			 * @property OverlayManager.ATTRS
			 * @type Object
			 * @static
			 */
			ATTRS: {
				/**
				 * The zIndex base to be used on the stacking for all overlays
                 * registered on the OverlayManager.
				 *
				 * @attribute zIndexBase
				 * @default 1000
				 * @type Number
				 */
				zIndexBase: {
					value: 1000,
					validator: isNumber,
					setter: Lang.toInt
				}
			},

			EXTENDS: A.Base,

			prototype: {
				/**
				 * Construction logic executed during OverlayManager instantiation. Lifecycle.
				 *
				 * @method initializer
				 * @protected
				 */
				initializer: function() {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "initializer", 1474);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1475);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1477);
instance._overlays = [];
				},

				/**
				 * Set the passed overlay zIndex to the highest value.
				 *
				 * @method bringToTop
				 * @param {Overlay} overlay Instance of
		         * <a href="Overlay.html">Overlay</a>.
				 */
				bringToTop: function(overlay) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "bringToTop", 1487);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1488);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1490);
var overlays = instance._overlays.sort(instance.sortByZIndexDesc);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1492);
var highest = overlays[0];

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1494);
if (highest !== overlay) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1495);
var overlayZ = overlay.get(Z_INDEX);
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1496);
var highestZ = highest.get(Z_INDEX);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1498);
overlay.set(Z_INDEX, highestZ + 1);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1500);
overlay.set('focused', true);
					}
				},

				/**
				 * Descructor lifecycle implementation for the OverlayManager class.
				 * Purges events attached to the node (and all child nodes).
				 *
				 * @method destructor
				 * @protected
				 */
				destructor: function() {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "destructor", 1511);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1512);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1514);
instance._overlays = [];
				},

				/**
				 * Register the passed <a href="Overlay.html">Overlay</a> to this
		         * OverlayManager.
				 *
				 * @method register
				 * @param {Overlay} overlay <a href="Overlay.html">Overlay</a> instance to be registered
				 * @return {Array} Registered overlays
				 */
				register: function (overlay) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "register", 1525);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1526);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1528);
var overlays = instance._overlays;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1530);
if (isArray(overlay)) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1531);
A.Array.each(overlay, function(o) {
							_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 7)", 1531);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1532);
instance.register(o);
						});
					}
					else {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1536);
var zIndexBase = instance.get(Z_INDEX_BASE);
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1537);
var registered = instance._registered(overlay);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1539);
if (
							!registered && overlay &&
							((overlay instanceof A.Overlay) ||
							(A.Component && overlay instanceof A.Component))
						) {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1544);
var boundingBox = overlay.get(BOUNDING_BOX);

							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1546);
overlays.push(overlay);

							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1548);
var zIndex = overlay.get(Z_INDEX) || 0;
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1549);
var newZIndex = overlays.length + zIndex + zIndexBase;

							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1551);
overlay.set(Z_INDEX, newZIndex);

							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1553);
overlay.on('focusedChange', instance._onFocusedChange, instance);
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1554);
boundingBox.on('mousedown', instance._onMouseDown, instance);
						}
					}

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1558);
return overlays;
				},

				/**
				 * Remove the passed <a href="Overlay.html">Overlay</a> from this
		         * OverlayManager.
				 *
				 * @method remove
				 * @param {Overlay} overlay <a href="Overlay.html">Overlay</a> instance to be removed
				 * @return {null}
				 */
				remove: function (overlay) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "remove", 1569);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1570);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1572);
var overlays = instance._overlays;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1574);
if (overlays.length) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1575);
return A.Array.removeItem(overlays, overlay);
					}

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1578);
return null;
				},

				/**
				 * Loop through all registered <a href="Overlay.html">Overlay</a> and
		         * execute a callback.
				 *
				 * @method each
				 * @param {function} fn Callback to be executed on the
		         * <a href="Array.html#method_each">Array.each</a>
				 * @return {null}
				 */
				each: function(fn) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "each", 1590);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1591);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1593);
var overlays = instance._overlays;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1595);
A.Array.each(overlays, fn);
				},

				/**
				 * Invoke the <a href="Overlay.html#method_show">show</a> method from
		         * all registered Overlays.
				 *
				 * @method showAll
				 */
				showAll: function() {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "showAll", 1604);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1605);
this.each(
						function(overlay) {
							_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 8)", 1606);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1607);
overlay.show();
						}
					);
				},

				/**
				 * Invoke the <a href="Overlay.html#method_hide">hide</a> method from
		         * all registered Overlays.
				 *
				 * @method hideAll
				 */
				hideAll: function() {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "hideAll", 1618);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1619);
this.each(
						function(overlay) {
							_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 9)", 1620);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1621);
overlay.hide();
						}
					);
				},

				/**
				 * zIndex comparator. Used on Array.sort.
				 *
				 * @method sortByZIndexDesc
				 * @param {Overlay} a Overlay
				 * @param {Overlay} b Overlay
				 * @return {Number}
				 */
				sortByZIndexDesc: function(a, b) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "sortByZIndexDesc", 1634);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1635);
if (!a || !b || !a.hasImpl(A.WidgetStack) || !b.hasImpl(A.WidgetStack)) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1636);
return 0;
					}
					else {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1639);
var aZ = a.get(Z_INDEX);
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1640);
var bZ = b.get(Z_INDEX);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1642);
if (aZ > bZ) {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1643);
return -1;
						} else {_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1644);
if (aZ < bZ) {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1645);
return 1;
						} else {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1647);
return 0;
						}}
					}
				},

				/**
				 * Check if the overlay is registered.
				 *
				 * @method _registered
				 * @param {Overlay} overlay Overlay
				 * @protected
				 * @return {boolean}
				 */
				_registered: function(overlay) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_registered", 1660);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1661);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1663);
return A.Array.indexOf(instance._overlays, overlay) != -1;
				},

				/**
				 * Mousedown event handler, used to invoke
		         * <a href="OverlayManager.html#method_bringToTop">bringToTop</a>.
				 *
				 * @method _onMouseDown
				 * @param {EventFacade} event
				 * @protected
				 */
				_onMouseDown: function(event) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_onMouseDown", 1674);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1675);
var instance = this;
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1676);
var overlay = A.Widget.getByNode(event.currentTarget || event.target);
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1677);
var registered = instance._registered(overlay);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1679);
if (overlay && registered) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1680);
instance.bringToTop(overlay);
					}
				},

				/**
				 * Fires when the <a href="Widget.html#config_focused">focused</a>
		         * attribute change. Used to invoke
		         * <a href="OverlayManager.html#method_bringToTop">bringToTop</a>.
				 *
				 * @method _onFocusedChange
				 * @param {EventFacade} event
				 * @protected
				 */
				_onFocusedChange: function(event) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_onFocusedChange", 1693);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1694);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1696);
if (event.newVal) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1697);
var overlay = event.currentTarget || event.target;
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1698);
var registered = instance._registered(overlay);

						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1700);
if (overlay && registered) {
							_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1701);
instance.bringToTop(overlay);
						}
					}
				}
			}
		}
	);

	_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1709);
A.OverlayManager = OverlayManager;

}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','overlay','plugin']});
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1712);
AUI.add('aui-overlay-mask', function(A) {
/**
 * The OverlayMask Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-mask
 */

_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "(anonymous 10)", 1712);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1720);
var L = A.Lang,
	isArray = L.isArray,
	isString = L.isString,
	isNumber = L.isNumber,
	isValue = L.isValue,

	CONFIG = A.config,

	UA = A.UA,

	IE6 = (UA.ie && UA.version.major <= 6),

	ABSOLUTE = 'absolute',
	ALIGN_POINTS = 'alignPoints',
	BACKGROUND = 'background',
	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	FIXED = 'fixed',
	HEIGHT = 'height',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OPACITY = 'opacity',
	OVERLAY_MASK = 'overlaymask',
	POSITION = 'position',
	TARGET = 'target',
	WIDTH = 'width';

/**
 * A base class for OverlayMask, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Cross browser mask functionality to cover an element or the entire page</li>
 *    <li>Customizable mask (i.e., background, opacity)</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.OverlayMask().render();</code></pre>
 *
 * Check the list of <a href="OverlayMask.html#configattributes">Configuration Attributes</a> available for
 * OverlayMask.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayMask
 * @constructor
 * @extends OverlayBase
 */
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1768);
var OverlayMask = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property OverlayMask.NAME
		 * @type String
		 * @static
		 */
		NAME: OVERLAY_MASK,

		/**
		 * Static property used to define the default attribute
		 * configuration for the OverlayMask.
		 *
		 * @property OverlayMask.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Points to align the <a href="Overlay.html">Overlay</a> used as
	         * mask.
			 *
			 * @attribute alignPoints
			 * @default [ 'tl', 'tl' ]
			 * @type Array
			 */
			alignPoints: {
				value: [ 'tl', 'tl' ],
				validator: isArray
	        },

			/**
			 * Background color of the mask.
			 *
			 * @attribute background
			 * @default null
			 * @type String
			 */
			background: {
				lazyAdd: false,
				value: null,
				validator: isString,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 1812);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1813);
if (v) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1814);
this.get(CONTENT_BOX).setStyle(BACKGROUND, v);
					}

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1817);
return v;
				}
			},

			/**
			 * Node where the mask will be positioned and re-dimensioned. The
	         * default is the document, which means that if not specified the mask
	         * takes the full screen.
			 *
			 * @attribute target
			 * @default document
			 * @type Node | String
			 */
			target: {
				cloneDefaultValue: false,
				lazyAdd: false,
				value: CONFIG.doc,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 1834);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1835);
var instance = this;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1837);
var target = A.one(v);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1839);
var isDoc = instance._isDoc = target.compareTo(CONFIG.doc);
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1840);
var isWin = instance._isWin = target.compareTo(CONFIG.win);

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1842);
instance._fullPage = isDoc || isWin;

					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1844);
return target;
				}
			},

			/**
			 * CSS opacity of the mask.
			 *
			 * @attribute opacity
			 * @default .5
			 * @type Number
			 */
			opacity: {
				value: 0.5,
				validator: isNumber,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "setter", 1858);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1859);
return this._setOpacity(v);
				}
			},

			/**
			 * Use shim option.
			 *
			 * @attribute shim
			 * @default True on IE.
			 * @type boolean
			 */
			shim: {
				value: A.UA.ie
			},

			/**
			 * If true the Overlay is visible by default after the render phase.
	         * Inherited from <a href="Overlay.html">Overlay</a>.
			 *
			 * @attribute visible
			 * @default false
			 * @type boolean
			 */
			visible: {
				value: false
			},

			/**
			 * zIndex of the OverlayMask.
			 *
			 * @attribute zIndex
			 * @default 1000
			 * @type Number
			 */
			zIndex: {
				value: 1000
			}
		},

		EXTENDS: A.OverlayBase,

		prototype: {
			/**
			 * Bind the events on the OverlayMask UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "bindUI", 1907);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1908);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1910);
OverlayMask.superclass.bindUI.apply(this, arguments);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1912);
instance.after('targetChange', instance._afterTargetChange);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1913);
instance.after('visibleChange', instance._afterVisibleChange);

				// window:resize YUI normalized event is not working, bug?
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1916);
A.on('windowresize', A.bind(instance.refreshMask, instance));
			},

			/**
			 * Sync the OverlayMask UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "syncUI", 1925);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1926);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1928);
instance.refreshMask();
			},

			/**
			 * Get the size of the
		     * <a href="OverlayMask.html#config_target">target</a>. Used to dimension
		     * the mask node.
			 *
			 * @method getTargetSize
			 * @return {Object} Object containing the { height: height, width: width }.
			 */
			getTargetSize: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "getTargetSize", 1939);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1940);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1941);
var target = instance.get(TARGET);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1943);
var isDoc = instance._isDoc;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1944);
var isWin = instance._isWin;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1946);
var height = target.get(OFFSET_HEIGHT);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1947);
var width = target.get(OFFSET_WIDTH);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1949);
if (IE6) {
					// IE6 doesn't support height/width 100% on doc/win
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1951);
if (isWin) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1952);
width = A.DOM.winWidth();
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1953);
height = A.DOM.winHeight();
					}
					else {_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1955);
if (isDoc) {
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1956);
width = A.DOM.docWidth();
						_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1957);
height = A.DOM.docHeight();
					}}
				}
				// good browsers...
				else {_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1961);
if (instance._fullPage) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1962);
height = '100%';
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1963);
width = '100%';
				}}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1966);
return { height: height, width: width };
			},

			/**
			 * Repaint the OverlayMask UI, respecting the
		     * <a href="OverlayMask.html#config_target">target</a> size and the
		     * <a href="OverlayMask.html#config_alignPoints">alignPoints</a>.
			 *
			 * @method refreshMask
			 */
			refreshMask: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "refreshMask", 1976);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1977);
var instance = this;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1978);
var alignPoints = instance.get(ALIGN_POINTS);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1979);
var target = instance.get(TARGET);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1980);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1981);
var targetSize = instance.getTargetSize();

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1983);
var fullPage = instance._fullPage;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1985);
boundingBox.setStyles({
					position: (IE6 || !fullPage) ? ABSOLUTE : FIXED,
					left: 0,
					top: 0
				});

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1991);
var height = targetSize.height;
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1992);
var width = targetSize.width;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1994);
if (isValue(height)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1995);
instance.set(HEIGHT, height);
				}

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1998);
if (isValue(width)) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 1999);
instance.set(WIDTH, width);
				}

				// if its not a full mask...
				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2003);
if ( !fullPage ) {
					// if the target is not document|window align the overlay
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2005);
instance.align(target, alignPoints);
				}
			},

			/**
			 * Setter for <a href="Paginator.html#config_opacity">opacity</a>.
			 *
			 * @method _setOpacity
			 * @protected
			 * @param {Number} v
			 * @return {Number}
			 */
			_setOpacity: function(v) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_setOpacity", 2017);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2018);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2020);
instance.get(CONTENT_BOX).setStyle(OPACITY, v);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2022);
return v;
			},

			/**
			 * Invoke the <code>OverlayMask.superclass._uiSetVisible</code>. Used to
		     * reset the <code>opacity</code> to work around IE bugs when set opacity
		     * of hidden elements.
			 *
			 * @method _uiSetVisible
			 * @param {boolean} val
			 * @protected
			 */
			_uiSetVisible: function(val) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_uiSetVisible", 2034);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2035);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2037);
OverlayMask.superclass._uiSetVisible.apply(this, arguments);

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2039);
if (val) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2040);
instance._setOpacity(
						instance.get(OPACITY)
					);
				}
			},

			/**
			 * Fires after the value of the
			 * <a href="Paginator.html#config_target">target</a> attribute change.
			 *
			 * @method _afterTargetChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterTargetChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_afterTargetChange", 2054);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2055);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2057);
instance.refreshMask();
			},

			/**
			 * Fires after the value of the
			 * <a href="Paginator.html#config_visible">visible</a> attribute change.
			 *
			 * @method _afterVisibleChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterVisibleChange: function(event) {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_afterVisibleChange", 2068);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2069);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2071);
instance._uiSetVisible(event.newVal);
			},

			/**
			 * UI Setter for the 
			 * <a href="Paginator.html#config_xy">XY</a> attribute.
			 *
			 * @method _uiSetXY
			 * @param {EventFacade} event
			 * @protected
			 */
			_uiSetXY: function() {
				_yuitest_coverfunc("/build/aui-overlay/aui-overlay.js", "_uiSetXY", 2082);
_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2083);
var instance = this;

				_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2085);
if (!instance._fullPage || IE6) {
					_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2086);
OverlayMask.superclass._uiSetXY.apply(instance, arguments);
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2093);
A.OverlayMask = OverlayMask;

}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true});


_yuitest_coverline("/build/aui-overlay/aui-overlay.js", 2098);
AUI.add('aui-overlay', function(A){}, '@VERSION@' ,{use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask'], skinnable:true});

