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
_yuitest_coverage["/build/aui-overlay-context/aui-overlay-context.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-overlay-context/aui-overlay-context.js",
    code: []
};
_yuitest_coverage["/build/aui-overlay-context/aui-overlay-context.js"].code=["AUI.add('aui-overlay-context', function(A) {","/**"," * The OverlayContext Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-context"," */","","var L = A.Lang,","	isString = L.isString,","	isNumber = L.isNumber,","	isObject = L.isObject,","	isBoolean = L.isBoolean,","","	isNodeList = function(v) {","		return (v instanceof A.NodeList);","	},","","	ALIGN = 'align',","	BL = 'bl',","	BOUNDING_BOX = 'boundingBox',","	CANCELLABLE_HIDE = 'cancellableHide',","	OVERLAY_CONTEXT = 'overlaycontext',","	CURRENT_NODE = 'currentNode',","	FOCUSED = 'focused',","	HIDE = 'hide',","	HIDE_DELAY = 'hideDelay',","	HIDE_ON = 'hideOn',","	HIDE_ON_DOCUMENT_CLICK = 'hideOnDocumentClick',","	MOUSEDOWN = 'mousedown',","	SHOW = 'show',","	SHOW_DELAY = 'showDelay',","	SHOW_ON = 'showOn',","	TL = 'tl',","	TRIGGER = 'trigger',","	USE_ARIA = 'useARIA',","	VISIBLE = 'visible';","","/**"," * <p><img src=\"assets/images/aui-overlay-context/main.png\"/></p>"," *"," * A base class for OverlayContext, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Able to display an <a href=\"Overlay.html\">Overlay</a> at a specified corner of an element <a href=\"OverlayContext.html#config_trigger\">trigger</a></li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.OverlayContext({"," *  boundingBox: '#OverlayBoundingBox',"," *  hideOn: 'mouseleave',"," *  showOn: 'mouseenter',"," *	trigger: '.menu-trigger'"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"OverlayContext.html#configattributes\">Configuration Attributes</a> available for"," * OverlayContext."," *"," * @class OverlayContext"," * @constructor"," * @extends OverlayBase"," * @param config {Object} Object literal specifying widget configuration properties."," */","var OverlayContext = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property OverlayContext.NAME","		 * @type String","		 * @static","		 */","		NAME: OVERLAY_CONTEXT,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the OverlayContext.","		 *","		 * @property OverlayContext.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Inherited from <a href=\"Overlay.html#config_align\">Overlay</a>.","			 *","			 * @attribute align","			 * @default { node: null, points: [ TL, BL ] }","			 * @type Object","			 */","			align: {","	            value: { node: null, points: [ TL, BL ] }","	        },","","			/**","			 * Cancel auto hide delay if the user interact with the Overlay","	         * (focus, click, mouseover)","			 *","			 * @attribute cancellableHide","			 * @default true","			 * @type boolean","			 */","			cancellableHide: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * OverlayContext allow multiple elements to be the","	         * <a href=\"OverlayContext.html#config_trigger\">trigger</a>, the","	         * currentNode stores the current active one.","			 *","			 * @attribute currentNode","			 * @default First item of the","	         * <a href=\"OverlayContext.html#config_trigger\">trigger</a> NodeList.","			 * @type Node","			 */","			currentNode: {","				valueFn: function() {","					// define default currentNode as the first item from trigger","					return this.get(TRIGGER).item(0);","				}","			},","","			delay: {","				value: null,","				validator: isObject","			},","","			/**","			 * The event which is responsible to hide the OverlayContext.","			 *","			 * @attribute hideOn","			 * @default mouseout","			 * @type String","			 */","			hideOn: {","				lazyAdd: false,","				value: 'mouseout',","				setter: function(v) {","					return this._setHideOn(v);","				}","			},","","			/**","			 * If true the instance is registered on the","	         * <a href=\"OverlayContextManager.html\">OverlayContextManager</a> static","	         * class and will be hide when the user click on document.","			 *","			 * @attribute hideOnDocumentClick","			 * @default true","			 * @type boolean","			 */","			hideOnDocumentClick: {","				lazyAdd: false,","				setter: function(v) {","					return this._setHideOnDocumentClick(v);","				},","				value: true,","				validator: isBoolean","			},","","			/**","			 * Number of milliseconds after the hide method is invoked to hide the","	         * OverlayContext.","			 *","			 * @attribute hideDelay","			 * @default 0","			 * @type Number","			 */","			hideDelay: {","				lazyAdd: false,","				setter: '_setHideDelay',","				value: 0,","				validator: isNumber","			},","","			/**","			 * The event which is responsible to show the OverlayContext.","			 *","			 * @attribute showOn","			 * @default mouseover","			 * @type String","			 */","			showOn: {","				lazyAdd: false,","				value: 'mouseover',","				setter: function(v) {","					return this._setShowOn(v);","				}","			},","","			/**","			 * Number of milliseconds after the show method is invoked to show the","	         * OverlayContext.","			 *","			 * @attribute showDelay","			 * @default 0","			 * @type Number","			 */","			showDelay: {","				lazyAdd: false,","				setter: '_setShowDelay',","				value: 0,","				validator: isNumber","			},","","			/**","			 * Node, NodeList or Selector which will be used as trigger elements","	         * to show or hide the OverlayContext.","			 *","			 * @attribute trigger","			 * @default null","			 * @type {Node | NodeList | String}","			 */","			trigger: {","				lazyAdd: false,","				setter: function(v) {","					if (isNodeList(v)) {","						return v;","					}","					else if (isString(v)) {","						return A.all(v);","					}","","					return new A.NodeList([v]);","				}","			},","","			/**","			 * True if Overlay should use ARIA plugin","			 *","			 * @attribute useARIA","			 * @default true","			 * @type Boolean","			 */","			useARIA: {","				value: true","			},","","			/**","			 * If true the OverlayContext is visible by default after the render phase.","	         * Inherited from <a href=\"Overlay.html\">Overlay</a>.","			 *","			 * @attribute visible","			 * @default false","			 * @type boolean","			 */","			visible: {","				value: false","			}","		},","","		EXTENDS: A.OverlayBase,","","		constructor: function(config) {","			var instance = this;","","			instance._showCallback = null;","			instance._hideCallback = null;","","			OverlayContext.superclass.constructor.apply(this, arguments);","		},","","		prototype: {","			/**","			 * Construction logic executed during OverlayContext instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				var trigger = instance.get(TRIGGER);","","				if (trigger && trigger.size()) {","					instance.set('align.node', trigger.item(0));","				}","			},","","			/**","			 * Bind the events on the OverlayContext UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function(){","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","","				boundingBox.on(MOUSEDOWN, instance._stopTriggerEventPropagation);","","				instance.before('triggerChange', instance._beforeTriggerChange);","				instance.before('showOnChange', instance._beforeShowOnChange);","				instance.before('hideOnChange', instance._beforeHideOnChange);","","				instance.after('triggerChange', instance._afterTriggerChange);","				instance.after('showOnChange', instance._afterShowOnChange);","				instance.after('hideOnChange', instance._afterHideOnChange);","","				boundingBox.on('click', A.bind(instance._cancelAutoHide, instance));","				boundingBox.on('mouseenter', A.bind(instance._cancelAutoHide, instance));","				boundingBox.on('mouseleave', A.bind(instance._invokeHideTaskOnInteraction, instance));","				instance.after('focusedChange', A.bind(instance._invokeHideTaskOnInteraction, instance));","","				instance.on('visibleChange', instance._onVisibleChangeOverlayContext);","			},","","			/**","			 * Hides the OverlayContext.","			 *","			 * @method hide","			 */","			hide: function() {","				var instance = this;","","				instance.clearIntervals();","","				instance.fire('hide');","","				OverlayContext.superclass.hide.apply(instance, arguments);","			},","","			/**","			 * Shows the OverlayContext.","			 *","			 * @method hide","			 */","			show: function(event) {","				var instance = this;","","				instance.clearIntervals();","","				instance.updateCurrentNode(event);","","				instance.fire('show');","","				OverlayContext.superclass.show.apply(instance, arguments);","","				instance.refreshAlign();","			},","","			/**","			 * Refreshes the rendered UI, based on Widget State","			 *","			 * @method syncUI","			 * @protected","			 *","			 */","			syncUI: function() {","				var instance = this;","","				if (instance.get(USE_ARIA)) {","					instance.plug(A.Plugin.Aria, {","						attributes: {","							trigger: {","								ariaName: 'controls',","								format: function(value) {","									var id = instance.get(BOUNDING_BOX).generateID();","","									return id;","								},","								node: function() {","									return instance.get(TRIGGER);","								}","							},","							visible: {","								ariaName: 'hidden',","								format: function(value) {","									return !value;","								}","							}","						},","						roleName: 'dialog'","					});","				}","			},","","			/**","			 * Toggles visibility of the OverlayContext.","			 *","			 * @method toggle","			 * @param {EventFacade} event","			 */","			toggle: function(event) {","				var instance = this;","","				if (instance.get(VISIBLE)) {","					instance._hideTask(event);","				}","				else {","					instance._showTask(event);","				}","			},","","			/**","			 * Clear the intervals to show or hide the OverlayContext. See","		     * <a href=\"OverlayContext.html#config_hideDelay\">hideDelay</a> and","		     * <a href=\"OverlayContext.html#config_showDelay\">showDelay</a>.","			 *","			 * @method clearIntervals","			 */","			clearIntervals: function() {","				this._hideTask.cancel();","				this._showTask.cancel();","			},","","			/**","			 * Refreshes the alignment of the OverlayContext with the","		     * <a href=\"OverlayContext.html#config_currentNode\">currentNode</a>. See","		     * also <a href=\"OverlayContext.html#config_align\">align</a>.","			 *","			 * @method refreshAlign","			 */","			refreshAlign: function() {","				var instance = this;","				var align = instance.get(ALIGN);","				var currentNode = instance.get(CURRENT_NODE);","","				if (currentNode) {","					instance._uiSetAlign(currentNode, align.points);","				}","			},","","			/**","			 * Update the","		     * <a href=\"OverlayContext.html#config_currentNode\">currentNode</a> with the","		     * <a href=\"OverlayContext.html#config_align\">align</a> node or the","		     * event.currentTarget and in last case with the first item of the","		     * <a href=\"OverlayContext.html#config_trigger\">trigger</a>.","			 *","			 * @method updateCurrentNode","			 * @param {EventFacade} event","			 */","			updateCurrentNode: function(event) {","				var instance = this;","				var align = instance.get(ALIGN);","				var trigger = instance.get(TRIGGER);","				var currentTarget = null;","","				if (event) {","					currentTarget = event.currentTarget;","				}","","				var node = currentTarget || trigger.item(0) || align.node;","","				if (node) {","					instance.set(CURRENT_NODE, node);","				}","			},","","			/**","			 * Handles the logic for the","		     * <a href=\"OverlayContext.html#method_toggle\">toggle</a>.","			 *","			 * @method _toggle","			 * @param {EventFacade} event","			 * @protected","			 */","			_toggle: function(event) {","				var instance = this;","				var currentTarget = event.currentTarget;","","				// check if the target is different and simulate a .hide() before toggle","				if (instance._lastTarget != currentTarget) {","					instance.hide();","				}","","				instance.toggle(event);","","				event.stopPropagation();","","				instance._lastTarget = currentTarget;","			},","","			/**","			 * Fires after the <a href=\"OverlayContext.html#config_showOn\">showOn</a>","		     * attribute change.","			 *","			 * @method _afterShowOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterShowOnChange: function(event) {","				var instance = this;","				var wasToggle = event.prevVal == instance.get(HIDE_ON);","","				if (wasToggle) {","					var trigger = instance.get(TRIGGER);","","					// if wasToggle remove the toggle callback","					trigger.detach(event.prevVal, instance._hideCallback);","					// and re attach the hide event","					instance._setHideOn( instance.get(HIDE_ON) );","				}","			},","","			/**","			 * Fires after the <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>","		     * attribute change.","			 *","			 * @method _afterHideOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterHideOnChange: function(event) {","				var instance = this;","				var wasToggle = event.prevVal == instance.get(SHOW_ON);","","				if (wasToggle) {","					var trigger = instance.get(TRIGGER);","","					// if wasToggle remove the toggle callback","					trigger.detach(event.prevVal, instance._showCallback);","					// and re attach the show event","					instance._setShowOn( instance.get(SHOW_ON) );","				}","			},","","			/**","			 * Fires after the <a href=\"OverlayContext.html#config_trigger\">trigger</a>","		     * attribute change.","			 *","			 * @method _afterTriggerChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterTriggerChange: function(event) {","				var instance = this;","","				instance._setShowOn( instance.get(SHOW_ON) );","				instance._setHideOn( instance.get(HIDE_ON) );","			},","","			/**","			 * Fires before the <a href=\"OverlayContext.html#config_showOn\">showOn</a>","		     * attribute change.","			 *","			 * @method _beforeShowOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeShowOnChange: function(event) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","","				// detach the old callback","				trigger.detach(event.prevVal, instance._showCallback);","			},","","			/**","			 * Fires before the <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>","		     * attribute change.","			 *","			 * @method _beforeHideOnChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeHideOnChange: function(event) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","","				// detach the old callback","				trigger.detach(event.prevVal, instance._hideCallback);","			},","","			/**","			 * Fires before the <a href=\"OverlayContext.html#config_trigger\">trigger</a>","		     * attribute change.","			 *","			 * @method _beforeTriggerChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeTriggerChange: function(event) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","				var showOn = instance.get(SHOW_ON);","				var hideOn = instance.get(HIDE_ON);","","				trigger.detach(showOn, instance._showCallback);","				trigger.detach(hideOn, instance._hideCallback);","				trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);","			},","","			/**","			 * Cancel hide event if the user does some interaction with the","		     * OverlayContext (focus, click or mouseover).","			 *","			 * @method _cancelAutoHide","			 * @param {EventFacade} event","			 * @protected","			 */","			_cancelAutoHide: function(event) {","				var instance = this;","","				if (instance.get(CANCELLABLE_HIDE)) {","					instance.clearIntervals();","				}","","				event.stopPropagation();","			},","","			/**","			 * Invoke the hide event when the OverlayContext looses the focus.","			 *","			 * @method _invokeHideTaskOnInteraction","			 * @param {EventFacade} event","			 * @protected","			 */","			_invokeHideTaskOnInteraction: function(event) {","				var instance = this;","				var cancellableHide = instance.get(CANCELLABLE_HIDE);","				var focused = instance.get(FOCUSED);","","				if (!focused && !cancellableHide) {","					instance._hideTask();","				}","			},","","			/**","			 * Fires when the <a href=\"OverlayContext.html#config_visible\">visible</a>","		     * attribute changes.","			 *","			 * @method _onVisibleChangeOverlayContext","			 * @param {EventFacade} event","			 * @protected","			 */","			_onVisibleChangeOverlayContext: function(event) {","				var instance = this;","","				if (event.newVal && instance.get('disabled')) {","					event.preventDefault();","				}","			},","","			/**","			 * Helper method to invoke event.stopPropagation().","			 *","			 * @method _stopTriggerEventPropagation","			 * @param {EventFacade} event","			 * @protected","			 */","			_stopTriggerEventPropagation: function(event) {","				event.stopPropagation();","			},","","			/**","			 * Setter for the","		     * <a href=\"OverlayContext.html#config_hideDelay\">hideDelay</a>","		     * attribute.","			 *","			 * @method _setHideDelay","			 * @param {number} val","			 * @protected","			 * @return {number}","			 */","			_setHideDelay: function(val) {","				var instance = this;","","				instance._hideTask = A.debounce(instance.hide, val, instance);","","				return val;","			},","","			/**","			 * Setter for the <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>","		     * attribute.","			 *","			 * @method _setHideOn","			 * @param {String} eventType Event type","			 * @protected","			 * @return {String}","			 */","			_setHideOn: function(eventType) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","				var toggle = eventType == instance.get(SHOW_ON);","","				if (toggle) {","					instance._hideCallback = A.bind(instance._toggle, instance);","","					// only one attached event is enough for toggle","					trigger.detach(eventType, instance._showCallback);","				}","				else {","					var delay = instance.get(HIDE_DELAY);","","					instance._hideCallback = function(event) {","						instance._hideTask(event);","","						event.stopPropagation();","					};","				}","","				trigger.on(eventType, instance._hideCallback);","","				return eventType;","			},","","			/**","			 * Setter for the","		     * <a href=\"OverlayContext.html#config_hideOnDocumentClick\">hideOnDocumentClick</a>","		     * attribute.","			 *","			 * @method _setHideOn","			 * @param {boolean} value","			 * @protected","			 * @return {boolean}","			 */","			_setHideOnDocumentClick: function(value) {","				var instance = this;","","				if (value) {","					A.OverlayContextManager.register(instance);","				}","				else {","					A.OverlayContextManager.remove(instance);","				}","","				return value;","			},","","			/**","			 * Setter for the","		     * <a href=\"OverlayContext.html#config_showDelay\">showDelay</a>","		     * attribute.","			 *","			 * @method _setShowDelay","			 * @param {number} val","			 * @protected","			 * @return {number}","			 */","			_setShowDelay: function(val) {","				var instance = this;","","				instance._showTask = A.debounce(instance.show, val, instance);","","				return val;","			},","","			/**","			 * Setter for the <a href=\"OverlayContext.html#config_showOn\">showOn</a>","		     * attribute.","			 *","			 * @method _setShowOn","			 * @param {String} eventType Event type","			 * @protected","			 * @return {String}","			 */","			_setShowOn: function(eventType) {","				var instance = this;","				var trigger = instance.get(TRIGGER);","				var toggle = eventType == instance.get(HIDE_ON);","","				if (toggle) {","					instance._showCallback = A.bind(instance._toggle, instance);","","					// only one attached event is enough for toggle","					trigger.detach(eventType, instance._hideCallback);","				}","				else {","					var delay = instance.get(SHOW_DELAY);","","					instance._showCallback = function(event) {","						instance._showTask(event);","","						event.stopPropagation();","					};","				}","","				if (eventType != MOUSEDOWN) {","					trigger.on(MOUSEDOWN, instance._stopTriggerEventPropagation);","				}","				else {","					trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);","				}","","				trigger.on(eventType, instance._showCallback);","","				return eventType;","			}","		}","	}",");","","A.OverlayContext = OverlayContext;","","/**"," * A base class for OverlayContextManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayContextManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","A.OverlayContextManager = new A.OverlayManager({});","","A.on(MOUSEDOWN, function() { A.OverlayContextManager.hideAll(); }, A.getDoc());","","}, '@VERSION@' ,{requires:['aui-overlay-manager','aui-delayed-task','aui-aria']});"];
_yuitest_coverage["/build/aui-overlay-context/aui-overlay-context.js"].lines = {"1":0,"9":0,"16":0,"66":0,"123":0,"143":0,"159":0,"191":0,"221":0,"222":0,"224":0,"225":0,"228":0,"259":0,"261":0,"262":0,"264":0,"275":0,"277":0,"279":0,"280":0,"291":0,"292":0,"294":0,"296":0,"297":0,"298":0,"300":0,"301":0,"302":0,"304":0,"305":0,"306":0,"307":0,"309":0,"318":0,"320":0,"322":0,"324":0,"333":0,"335":0,"337":0,"339":0,"341":0,"343":0,"354":0,"356":0,"357":0,"362":0,"364":0,"367":0,"373":0,"389":0,"391":0,"392":0,"395":0,"407":0,"408":0,"419":0,"420":0,"421":0,"423":0,"424":0,"439":0,"440":0,"441":0,"442":0,"444":0,"445":0,"448":0,"450":0,"451":0,"464":0,"465":0,"468":0,"469":0,"472":0,"474":0,"476":0,"488":0,"489":0,"491":0,"492":0,"495":0,"497":0,"510":0,"511":0,"513":0,"514":0,"517":0,"519":0,"532":0,"534":0,"535":0,"547":0,"548":0,"551":0,"563":0,"564":0,"567":0,"579":0,"580":0,"581":0,"582":0,"584":0,"585":0,"586":0,"598":0,"600":0,"601":0,"604":0,"615":0,"616":0,"617":0,"619":0,"620":0,"633":0,"635":0,"636":0,"648":0,"662":0,"664":0,"666":0,"679":0,"680":0,"681":0,"683":0,"684":0,"687":0,"690":0,"692":0,"693":0,"695":0,"699":0,"701":0,"715":0,"717":0,"718":0,"721":0,"724":0,"738":0,"740":0,"742":0,"755":0,"756":0,"757":0,"759":0,"760":0,"763":0,"766":0,"768":0,"769":0,"771":0,"775":0,"776":0,"779":0,"782":0,"784":0,"790":0,"802":0,"804":0};
_yuitest_coverage["/build/aui-overlay-context/aui-overlay-context.js"].functions = {"isNodeList:15":0,"valueFn:121":0,"setter:142":0,"setter:158":0,"setter:190":0,"setter:220":0,"constructor:258":0,"initializer:274":0,"bindUI:290":0,"hide:317":0,"show:332":0,"format:361":0,"node:366":0,"format:372":0,"syncUI:353":0,"toggle:388":0,"clearIntervals:406":0,"refreshAlign:418":0,"updateCurrentNode:438":0,"_toggle:463":0,"_afterShowOnChange:487":0,"_afterHideOnChange:509":0,"_afterTriggerChange:531":0,"_beforeShowOnChange:546":0,"_beforeHideOnChange:562":0,"_beforeTriggerChange:578":0,"_cancelAutoHide:597":0,"_invokeHideTaskOnInteraction:614":0,"_onVisibleChangeOverlayContext:632":0,"_stopTriggerEventPropagation:647":0,"_setHideDelay:661":0,"_hideCallback:692":0,"_setHideOn:678":0,"_setHideOnDocumentClick:714":0,"_setShowDelay:737":0,"_showCallback:768":0,"_setShowOn:754":0,"(anonymous 2):804":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-overlay-context/aui-overlay-context.js"].coveredLines = 161;
_yuitest_coverage["/build/aui-overlay-context/aui-overlay-context.js"].coveredFunctions = 39;
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 1);
AUI.add('aui-overlay-context', function(A) {
/**
 * The OverlayContext Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-context
 */

_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 9);
var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isBoolean = L.isBoolean,

	isNodeList = function(v) {
		_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "isNodeList", 15);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 16);
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
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 66);
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
					_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "valueFn", 121);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 123);
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
					_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "setter", 142);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 143);
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
					_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "setter", 158);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 159);
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
					_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "setter", 190);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 191);
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
					_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "setter", 220);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 221);
if (isNodeList(v)) {
						_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 222);
return v;
					}
					else {_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 224);
if (isString(v)) {
						_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 225);
return A.all(v);
					}}

					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 228);
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
			_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "constructor", 258);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 259);
var instance = this;

			_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 261);
instance._showCallback = null;
			_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 262);
instance._hideCallback = null;

			_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 264);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "initializer", 274);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 275);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 277);
var trigger = instance.get(TRIGGER);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 279);
if (trigger && trigger.size()) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 280);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "bindUI", 290);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 291);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 292);
var boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 294);
boundingBox.on(MOUSEDOWN, instance._stopTriggerEventPropagation);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 296);
instance.before('triggerChange', instance._beforeTriggerChange);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 297);
instance.before('showOnChange', instance._beforeShowOnChange);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 298);
instance.before('hideOnChange', instance._beforeHideOnChange);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 300);
instance.after('triggerChange', instance._afterTriggerChange);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 301);
instance.after('showOnChange', instance._afterShowOnChange);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 302);
instance.after('hideOnChange', instance._afterHideOnChange);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 304);
boundingBox.on('click', A.bind(instance._cancelAutoHide, instance));
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 305);
boundingBox.on('mouseenter', A.bind(instance._cancelAutoHide, instance));
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 306);
boundingBox.on('mouseleave', A.bind(instance._invokeHideTaskOnInteraction, instance));
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 307);
instance.after('focusedChange', A.bind(instance._invokeHideTaskOnInteraction, instance));

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 309);
instance.on('visibleChange', instance._onVisibleChangeOverlayContext);
			},

			/**
			 * Hides the OverlayContext.
			 *
			 * @method hide
			 */
			hide: function() {
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "hide", 317);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 318);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 320);
instance.clearIntervals();

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 322);
instance.fire('hide');

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 324);
OverlayContext.superclass.hide.apply(instance, arguments);
			},

			/**
			 * Shows the OverlayContext.
			 *
			 * @method hide
			 */
			show: function(event) {
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "show", 332);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 333);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 335);
instance.clearIntervals();

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 337);
instance.updateCurrentNode(event);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 339);
instance.fire('show');

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 341);
OverlayContext.superclass.show.apply(instance, arguments);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 343);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "syncUI", 353);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 354);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 356);
if (instance.get(USE_ARIA)) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 357);
instance.plug(A.Plugin.Aria, {
						attributes: {
							trigger: {
								ariaName: 'controls',
								format: function(value) {
									_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "format", 361);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 362);
var id = instance.get(BOUNDING_BOX).generateID();

									_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 364);
return id;
								},
								node: function() {
									_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "node", 366);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 367);
return instance.get(TRIGGER);
								}
							},
							visible: {
								ariaName: 'hidden',
								format: function(value) {
									_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "format", 372);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 373);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "toggle", 388);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 389);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 391);
if (instance.get(VISIBLE)) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 392);
instance._hideTask(event);
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 395);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "clearIntervals", 406);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 407);
this._hideTask.cancel();
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 408);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "refreshAlign", 418);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 419);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 420);
var align = instance.get(ALIGN);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 421);
var currentNode = instance.get(CURRENT_NODE);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 423);
if (currentNode) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 424);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "updateCurrentNode", 438);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 439);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 440);
var align = instance.get(ALIGN);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 441);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 442);
var currentTarget = null;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 444);
if (event) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 445);
currentTarget = event.currentTarget;
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 448);
var node = currentTarget || trigger.item(0) || align.node;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 450);
if (node) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 451);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_toggle", 463);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 464);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 465);
var currentTarget = event.currentTarget;

				// check if the target is different and simulate a .hide() before toggle
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 468);
if (instance._lastTarget != currentTarget) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 469);
instance.hide();
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 472);
instance.toggle(event);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 474);
event.stopPropagation();

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 476);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_afterShowOnChange", 487);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 488);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 489);
var wasToggle = event.prevVal == instance.get(HIDE_ON);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 491);
if (wasToggle) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 492);
var trigger = instance.get(TRIGGER);

					// if wasToggle remove the toggle callback
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 495);
trigger.detach(event.prevVal, instance._hideCallback);
					// and re attach the hide event
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 497);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_afterHideOnChange", 509);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 510);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 511);
var wasToggle = event.prevVal == instance.get(SHOW_ON);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 513);
if (wasToggle) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 514);
var trigger = instance.get(TRIGGER);

					// if wasToggle remove the toggle callback
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 517);
trigger.detach(event.prevVal, instance._showCallback);
					// and re attach the show event
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 519);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_afterTriggerChange", 531);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 532);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 534);
instance._setShowOn( instance.get(SHOW_ON) );
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 535);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_beforeShowOnChange", 546);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 547);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 548);
var trigger = instance.get(TRIGGER);

				// detach the old callback
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 551);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_beforeHideOnChange", 562);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 563);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 564);
var trigger = instance.get(TRIGGER);

				// detach the old callback
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 567);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_beforeTriggerChange", 578);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 579);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 580);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 581);
var showOn = instance.get(SHOW_ON);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 582);
var hideOn = instance.get(HIDE_ON);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 584);
trigger.detach(showOn, instance._showCallback);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 585);
trigger.detach(hideOn, instance._hideCallback);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 586);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_cancelAutoHide", 597);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 598);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 600);
if (instance.get(CANCELLABLE_HIDE)) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 601);
instance.clearIntervals();
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 604);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_invokeHideTaskOnInteraction", 614);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 615);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 616);
var cancellableHide = instance.get(CANCELLABLE_HIDE);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 617);
var focused = instance.get(FOCUSED);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 619);
if (!focused && !cancellableHide) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 620);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_onVisibleChangeOverlayContext", 632);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 633);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 635);
if (event.newVal && instance.get('disabled')) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 636);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_stopTriggerEventPropagation", 647);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 648);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_setHideDelay", 661);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 662);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 664);
instance._hideTask = A.debounce(instance.hide, val, instance);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 666);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_setHideOn", 678);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 679);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 680);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 681);
var toggle = eventType == instance.get(SHOW_ON);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 683);
if (toggle) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 684);
instance._hideCallback = A.bind(instance._toggle, instance);

					// only one attached event is enough for toggle
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 687);
trigger.detach(eventType, instance._showCallback);
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 690);
var delay = instance.get(HIDE_DELAY);

					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 692);
instance._hideCallback = function(event) {
						_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_hideCallback", 692);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 693);
instance._hideTask(event);

						_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 695);
event.stopPropagation();
					};
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 699);
trigger.on(eventType, instance._hideCallback);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 701);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_setHideOnDocumentClick", 714);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 715);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 717);
if (value) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 718);
A.OverlayContextManager.register(instance);
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 721);
A.OverlayContextManager.remove(instance);
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 724);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_setShowDelay", 737);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 738);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 740);
instance._showTask = A.debounce(instance.show, val, instance);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 742);
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
				_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_setShowOn", 754);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 755);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 756);
var trigger = instance.get(TRIGGER);
				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 757);
var toggle = eventType == instance.get(HIDE_ON);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 759);
if (toggle) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 760);
instance._showCallback = A.bind(instance._toggle, instance);

					// only one attached event is enough for toggle
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 763);
trigger.detach(eventType, instance._hideCallback);
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 766);
var delay = instance.get(SHOW_DELAY);

					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 768);
instance._showCallback = function(event) {
						_yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "_showCallback", 768);
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 769);
instance._showTask(event);

						_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 771);
event.stopPropagation();
					};
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 775);
if (eventType != MOUSEDOWN) {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 776);
trigger.on(MOUSEDOWN, instance._stopTriggerEventPropagation);
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 779);
trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
				}

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 782);
trigger.on(eventType, instance._showCallback);

				_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 784);
return eventType;
			}
		}
	}
);

_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 790);
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
_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 802);
A.OverlayContextManager = new A.OverlayManager({});

_yuitest_coverline("/build/aui-overlay-context/aui-overlay-context.js", 804);
A.on(MOUSEDOWN, function() { _yuitest_coverfunc("/build/aui-overlay-context/aui-overlay-context.js", "(anonymous 2)", 804);
A.OverlayContextManager.hideAll(); }, A.getDoc());

}, '@VERSION@' ,{requires:['aui-overlay-manager','aui-delayed-task','aui-aria']});
