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
_yuitest_coverage["/build/aui-overlay-context-panel/aui-overlay-context-panel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-overlay-context-panel/aui-overlay-context-panel.js",
    code: []
};
_yuitest_coverage["/build/aui-overlay-context-panel/aui-overlay-context-panel.js"].code=["AUI.add('aui-overlay-context-panel', function(A) {","/**"," * The OverlayContextPanel Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-context-panel"," */","","var L = A.Lang,","	isBoolean = L.isBoolean,","	isString = L.isString,","	isObject = L.isObject,","","	ALIGN = 'align',","	ANIM = 'anim',","	ARROW = 'arrow',","	BACKGROUND_COLOR = 'backgroundColor',","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	CLICK = 'click',","	CONTENT_BOX = 'contentBox',","	CONTEXTPANEL = 'overlaycontextpanel',","	DEFAULT = 'default',","	DOT = '.',","	END = 'end',","	HIDDEN = 'hidden',","	INNER = 'inner',","	OPACITY = 'opacity',","	POINTER = 'pointer',","	SHOW_ARROW = 'showArrow',","	STATE = 'state',","	STYLE = 'style',","	VISIBLE = 'visible',","","	BC = 'bc',","	BL = 'bl',","	BR = 'br',","	CC = 'cc',","	LB = 'lb',","	LC = 'lc',","	LT = 'lt',","	RB = 'rb',","	RC = 'rc',","	RL = 'rl',","","	getCN = A.getClassName,","","	CSS_CONTEXTPANEL = getCN(CONTEXTPANEL),","	CSS_CONTEXTPANEL_ARROW = getCN(CONTEXTPANEL, ARROW, BLANK),","	CSS_CONTEXTPANEL_HIDDEN = getCN(CONTEXTPANEL, HIDDEN),","	CSS_CONTEXTPANEL_POINTER = getCN(CONTEXTPANEL, POINTER),","	CSS_CONTEXTPANEL_POINTER_INNER = getCN(CONTEXTPANEL, POINTER, INNER),","	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),","","	TPL_POINTER = '<div class=\"' + [ CSS_STATE_DEFAULT, CSS_CONTEXTPANEL_POINTER ].join(' ') + '\"></div>',","	TPL_POINTER_INNER = '<div class=\"' + CSS_CONTEXTPANEL_POINTER_INNER + '\"></div>';","","/**"," * <p><img src=\"assets/images/aui-overlay-context-panel/main.png\"/></p>"," *"," * A base class for OverlayContextPanel, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>Customizable arrow</li>"," *	<li>Optional animation when show or hide</li>"," * </ul>"," *"," * Quick Example:<br/>"," * "," * <pre><code>var instance = new A.OverlayContextPanel({"," *  bodyContent: 'Here s a sample OverlayContextPanel.',"," *  boundingBox: '#overlay-context-panel',"," *  trigger: '#triggerButton',"," *  cancellableHide: true,"," *  hideDelay: 200,"," *  hideOnDocumentClick: false,"," *  anim: true"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"OverlayContextPanel.html#configattributes\">Configuration Attributes</a> available for"," * OverlayContextPanel."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayContextPanel"," * @constructor"," * @extends OverlayContext"," */","var OverlayContextPanel = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property OverlayContextPanel.NAME","		 * @type String","		 * @static","		 */","		NAME: CONTEXTPANEL,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the OverlayContextPanel.","		 *","		 * @property OverlayContextPanel.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Enable or disable the animation for hide and show. Used as the","			 * <a href=\"Anim.html\">Anim</a> configuration attributes.","			 *","			 * <pre><code>anim: {","			 *  show: {","			 *  	duration: .9","			 *  },","			 *  hide: {","			 *  	duration: .2","			 *  }","			 * }","			 * </code></pre>","			 * ","			 * @attribute anim","			 * @default { show: false }","			 * @type Object","			 */","			anim: {","				lazyAdd: false,","				value: {","					show: false","				},","				setter: function(v) {","					return this._setAnim(v);","				}","			},","","			/**","			 * Position where the arrow will be placed. See","			 * <a href=\"OverlayContextPanel.html#config_showArrow\">showArrow</a>. If it's","			 * not set, it will get the value set on the","			 * <a href=\"OverlayContext.html#config_align\">align</a> point. Here is a","			 * list of valid arrows 'bc', 'bl', 'br', 'cc', 'lb', 'lc', 'lt', 'rb',","			 * 'rc', 'rl'.","			 *","			 * @attribute arrow","			 * @default null","			 * @type String","			 */","			arrow: {","				value: null,","				validator: isString","			},","","			/**","			 * See <a href=\"OverlayContext.html#config_hideOn\">hideOn</a>.","			 *","			 * @attribute hideOn","			 * @default click","			 * @type String","			 */","			hideOn: {","				value: CLICK","			},","","			/**","			 * See <a href=\"OverlayContext.html#config_showOn\">showOn</a>.","			 *","			 * @attribute showOn","			 * @default click","			 * @type String","			 */","			showOn: {","				value: CLICK","			},","","			/**","			 * If true the OverlayContextPanel will show an arrow positioned on the","			 * <a href=\"OverlayContextPanel.html#config_arrow\">arrow</a> point.","			 *","			 * @attribute showArrow","			 * @default true","			 * @type boolean","			 */","			showArrow: {","				lazyAdd: false,","				value: true,","				validator: isBoolean","			},","","			/**","			 * Gives stacking habilities to the OverlayContextPanel.","			 *","			 * @attribute stack","			 * @default true","			 * @type boolean","			 */","			stack: {","				lazyAdd: false,","				value: true,","				setter: function(v) {","					return this._setStack(v);","				},","				validator: isBoolean","			}","		},","","		EXTENDS: A.OverlayContext,","","		prototype: {","			/**","			 * Bind the events on the OverlayContextPanel UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance.after('showArrowChange', instance._afterShowArrowChange);","","				instance.before('show', instance._beforeShow);","","				OverlayContextPanel.superclass.bindUI.apply(instance, arguments);","			},","","			/**","			 * Create the DOM structure for the OverlayContextPanel. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderElements();","			},","","			/**","			 * Sync the OverlayContextPanel UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				OverlayContextPanel.superclass.syncUI.apply(instance, arguments);","","				instance._syncElements();","			},","","			/**","			 * Aligns the OverlayContextPanel to the provided node (or viewport) using the","			 * provided points. Inherited from","			 * <a href=\"Overlay.html#method_align\">Overlay</a>.","			 *","			 * @method align","			 * @param {Node | String | null} node A reference (or selector string) for","			 * the Node which with the OverlayContextPanel is to be aligned.","			 * @param {Array[2]} points A two element array, specifying the points on","			 * the OverlayContextPanel and node/viewport which need to be aligned.","			 */","			align: function (node, points) {","				var instance = this;","","				OverlayContextPanel.superclass.align.apply(this, arguments);","","				instance._syncElements();","			},","","			/**","			 * OverlayContextPanel uses a imageless arrow, which involves some CSS technics.","			 * This method is meant to fix the color of the borders of the arrow.","			 *","			 * @method fixPointerColor","			 */","			fixPointerColor: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var pointer = contentBox.one(DOT+CSS_CONTEXTPANEL_POINTER_INNER);","","				pointer.removeAttribute(STYLE);","","				var bColor = contentBox.getStyle(BACKGROUND_COLOR);","				var border = 'borderBottomColor';","","				var right = [","					DOT+CSS_CONTEXTPANEL_ARROW+RB,","						DOT+CSS_CONTEXTPANEL_ARROW+RC,","							DOT+CSS_CONTEXTPANEL_ARROW+RL","				]","				.join(',');","","				var bottom = [","					DOT+CSS_CONTEXTPANEL_ARROW+BR,","						DOT+CSS_CONTEXTPANEL_ARROW+BC,","							DOT+CSS_CONTEXTPANEL_ARROW+BL","				]","				.join(',');","","				var left = [","					DOT+CSS_CONTEXTPANEL_ARROW+LB,","						DOT+CSS_CONTEXTPANEL_ARROW+LC,","							DOT+CSS_CONTEXTPANEL_ARROW+LT","				]","				.join(',');","","				if (contentBox.test(right)) {","					border = 'borderLeftColor';","				}","				else if (contentBox.test(bottom)) {","					border = 'borderTopColor';","				}","				else if (contentBox.test(left)) {","					border = 'borderRightColor';","				}","","				pointer.setStyle(border, bColor);","			},","","			/**","			 * Normalize the align point value. The align point 'cc' is not a valid","			 * position for the arrow and then it's normalized to the 'bc' point.","			 *","			 * @method getAlignPoint","			 * @return {String}","			 */","			getAlignPoint: function() {","				var instance = this;","				var overlayPoint = instance.get(ALIGN).points[0];","","				if (overlayPoint == CC) {","					// CC is not a valid position for the arrow","					overlayPoint = BC;","				}","","				return instance.get(ARROW) || overlayPoint;","			},","","			/**","			 * Hides the OverlayContextPanel.","			 *","			 * @method hide","			 * @param {EventFacade} event ","			 */","			hide: function(event) {","				var instance = this;","","				if(instance._hideAnim) {","					var visible = instance.get(VISIBLE);","","					if (visible) {","						instance._hideAnim.once(END, function() {","							OverlayContextPanel.superclass.hide.apply(instance, arguments);","						});","","						instance._hideAnim.run();","					}","				}","				else {","					OverlayContextPanel.superclass.hide.apply(instance, arguments);","				}","			},","","			/**","			 * Render DOM elements for the OverlayContextPanel.","			 *","			 * @method _renderElements","			 * @protected","			 */","			_renderElements: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var align = instance.get(ALIGN);","				var overlayPoint = align.points[0];","","				contentBox.addClass(CSS_STATE_DEFAULT);","","				instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);","","				contentBox.append(","					instance._pointerNode","				);","			},","","			/**","			 * Sync the UI of the OverlayContextPanel elements.","			 *","			 * @method _syncElements","			 * @protected","			 */","			_syncElements: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var pointerNode = instance._pointerNode;","				var overlayPoint = instance.getAlignPoint();","","				if (instance.get(SHOW_ARROW)) {","					pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);","					contentBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);","					contentBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);","","					instance.fixPointerColor();","				}","				else {","					pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);","				}","","				instance._lastOverlayPoint = overlayPoint;","			},","","			/**","			 * Setter for the","			 * <a href=\"OverlayContextPanel.html#config_stack\">stack</a> attribute.","			 *","			 * @method _setStack","			 * @param {boolean} value","			 * @protected","			 * @return {boolean}","			 */","			_setStack: function(value) {","				var instance = this;","","				if (value) {","					A.OverlayContextPanelManager.register(instance);","				}","				else {","					A.OverlayContextPanelManager.remove(instance);","				}","","				return value;","			},","","			/**","			 * Setter for the","			 * <a href=\"OverlayContextPanel.html#config_anim\">anim</a> attribute.","			 *","			 * @method _setAnim","			 * @param {Object} value","			 * @protected","			 * @return {Object}","			 */","			_setAnim: function(value) {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","","				if (value) {","					var defaults = {","						node: boundingBox,","						duration: 0.1","					};","","					var showOptions = A.merge(defaults, {","						from: { opacity: 0 },","						to: { opacity: 1 }","					});","","					var hideOptions = A.merge(defaults, {","						from: { opacity: 1 },","						to: { opacity: 0 }","					});","","					if (isObject(value)) {","						// loading user settings for animation","						showOptions = A.merge(showOptions, value.show);","						hideOptions = A.merge(hideOptions, value.hide);","					}","","					instance._showAnim = new A.Anim(showOptions);","					instance._hideAnim = new A.Anim(hideOptions);","","					// if anim.show or anim.hide === false, cancel respective animation","					if (isObject(value)) {","						if (value.show === false) {","							instance._showAnim = null;","						}","","						if (value.hide === false) {","							instance._hideAnim = null;","						}","					}","				}","","				return value;","			},","","			/**","			 * Fires before show the OverlayContextPanel.","			 *","			 * @method _beforeShow","			 * @param {EventFacade} event ","			 * @protected","			 */","			_beforeShow: function(event) {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","				var visible = instance.get(VISIBLE);","","				if(!visible && instance._showAnim) {","					boundingBox.setStyle(OPACITY, 0);","","					instance._showAnim.run();","				}","				else {","					boundingBox.setStyle(OPACITY, 1);","				}","			},","","			/**","			 * Fires after showArrow attribute changes.","			 *","			 * @method _afterShowArrowChange","			 * @param {EventFacade} event ","			 * @protected","			 */","			_afterShowArrowChange: function() {","				var instance = this;","","				instance._syncElements();","			}","		}","	}",");","","A.OverlayContextPanel = OverlayContextPanel;","","/**"," * A base class for OverlayContextPanelManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayContextPanelManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","A.OverlayContextPanelManager = new A.OverlayManager({","	zIndexBase: 1000","});","","}, '@VERSION@' ,{requires:['aui-overlay-context','anim'], skinnable:true});"];
_yuitest_coverage["/build/aui-overlay-context-panel/aui-overlay-context-panel.js"].lines = {"1":0,"9":0,"90":0,"134":0,"202":0,"218":0,"220":0,"222":0,"224":0,"234":0,"236":0,"246":0,"248":0,"250":0,"265":0,"267":0,"269":0,"279":0,"280":0,"281":0,"283":0,"285":0,"286":0,"288":0,"295":0,"302":0,"309":0,"310":0,"312":0,"313":0,"315":0,"316":0,"319":0,"330":0,"331":0,"333":0,"335":0,"338":0,"348":0,"350":0,"351":0,"353":0,"354":0,"355":0,"358":0,"362":0,"373":0,"374":0,"375":0,"376":0,"378":0,"380":0,"382":0,"394":0,"395":0,"396":0,"397":0,"399":0,"400":0,"401":0,"402":0,"404":0,"407":0,"410":0,"423":0,"425":0,"426":0,"429":0,"432":0,"445":0,"446":0,"448":0,"449":0,"454":0,"459":0,"464":0,"466":0,"467":0,"470":0,"471":0,"474":0,"475":0,"476":0,"479":0,"480":0,"485":0,"496":0,"497":0,"498":0,"500":0,"501":0,"503":0,"506":0,"518":0,"520":0,"526":0,"538":0};
_yuitest_coverage["/build/aui-overlay-context-panel/aui-overlay-context-panel.js"].functions = {"setter:133":0,"setter:201":0,"bindUI:217":0,"renderUI:233":0,"syncUI:245":0,"align:264":0,"fixPointerColor:278":0,"getAlignPoint:329":0,"(anonymous 2):354":0,"hide:347":0,"_renderElements:372":0,"_syncElements:393":0,"_setStack:422":0,"_setAnim:444":0,"_beforeShow:495":0,"_afterShowArrowChange:517":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-overlay-context-panel/aui-overlay-context-panel.js"].coveredLines = 97;
_yuitest_coverage["/build/aui-overlay-context-panel/aui-overlay-context-panel.js"].coveredFunctions = 17;
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 1);
AUI.add('aui-overlay-context-panel', function(A) {
/**
 * The OverlayContextPanel Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-context-panel
 */

_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 9);
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
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 90);
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
					_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "setter", 133);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 134);
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
					_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "setter", 201);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 202);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "bindUI", 217);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 218);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 220);
instance.after('showArrowChange', instance._afterShowArrowChange);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 222);
instance.before('show', instance._beforeShow);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 224);
OverlayContextPanel.superclass.bindUI.apply(instance, arguments);
			},

			/**
			 * Create the DOM structure for the OverlayContextPanel. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "renderUI", 233);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 234);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 236);
instance._renderElements();
			},

			/**
			 * Sync the OverlayContextPanel UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "syncUI", 245);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 246);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 248);
OverlayContextPanel.superclass.syncUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 250);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "align", 264);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 265);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 267);
OverlayContextPanel.superclass.align.apply(this, arguments);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 269);
instance._syncElements();
			},

			/**
			 * OverlayContextPanel uses a imageless arrow, which involves some CSS technics.
			 * This method is meant to fix the color of the borders of the arrow.
			 *
			 * @method fixPointerColor
			 */
			fixPointerColor: function() {
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "fixPointerColor", 278);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 279);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 280);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 281);
var pointer = contentBox.one(DOT+CSS_CONTEXTPANEL_POINTER_INNER);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 283);
pointer.removeAttribute(STYLE);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 285);
var bColor = contentBox.getStyle(BACKGROUND_COLOR);
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 286);
var border = 'borderBottomColor';

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 288);
var right = [
					DOT+CSS_CONTEXTPANEL_ARROW+RB,
						DOT+CSS_CONTEXTPANEL_ARROW+RC,
							DOT+CSS_CONTEXTPANEL_ARROW+RL
				]
				.join(',');

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 295);
var bottom = [
					DOT+CSS_CONTEXTPANEL_ARROW+BR,
						DOT+CSS_CONTEXTPANEL_ARROW+BC,
							DOT+CSS_CONTEXTPANEL_ARROW+BL
				]
				.join(',');

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 302);
var left = [
					DOT+CSS_CONTEXTPANEL_ARROW+LB,
						DOT+CSS_CONTEXTPANEL_ARROW+LC,
							DOT+CSS_CONTEXTPANEL_ARROW+LT
				]
				.join(',');

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 309);
if (contentBox.test(right)) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 310);
border = 'borderLeftColor';
				}
				else {_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 312);
if (contentBox.test(bottom)) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 313);
border = 'borderTopColor';
				}
				else {_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 315);
if (contentBox.test(left)) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 316);
border = 'borderRightColor';
				}}}

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 319);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "getAlignPoint", 329);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 330);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 331);
var overlayPoint = instance.get(ALIGN).points[0];

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 333);
if (overlayPoint == CC) {
					// CC is not a valid position for the arrow
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 335);
overlayPoint = BC;
				}

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 338);
return instance.get(ARROW) || overlayPoint;
			},

			/**
			 * Hides the OverlayContextPanel.
			 *
			 * @method hide
			 * @param {EventFacade} event 
			 */
			hide: function(event) {
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "hide", 347);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 348);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 350);
if(instance._hideAnim) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 351);
var visible = instance.get(VISIBLE);

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 353);
if (visible) {
						_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 354);
instance._hideAnim.once(END, function() {
							_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "(anonymous 2)", 354);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 355);
OverlayContextPanel.superclass.hide.apply(instance, arguments);
						});

						_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 358);
instance._hideAnim.run();
					}
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 362);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "_renderElements", 372);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 373);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 374);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 375);
var align = instance.get(ALIGN);
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 376);
var overlayPoint = align.points[0];

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 378);
contentBox.addClass(CSS_STATE_DEFAULT);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 380);
instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 382);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "_syncElements", 393);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 394);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 395);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 396);
var pointerNode = instance._pointerNode;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 397);
var overlayPoint = instance.getAlignPoint();

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 399);
if (instance.get(SHOW_ARROW)) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 400);
pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 401);
contentBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 402);
contentBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 404);
instance.fixPointerColor();
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 407);
pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);
				}

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 410);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "_setStack", 422);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 423);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 425);
if (value) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 426);
A.OverlayContextPanelManager.register(instance);
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 429);
A.OverlayContextPanelManager.remove(instance);
				}

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 432);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "_setAnim", 444);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 445);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 446);
var boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 448);
if (value) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 449);
var defaults = {
						node: boundingBox,
						duration: 0.1
					};

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 454);
var showOptions = A.merge(defaults, {
						from: { opacity: 0 },
						to: { opacity: 1 }
					});

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 459);
var hideOptions = A.merge(defaults, {
						from: { opacity: 1 },
						to: { opacity: 0 }
					});

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 464);
if (isObject(value)) {
						// loading user settings for animation
						_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 466);
showOptions = A.merge(showOptions, value.show);
						_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 467);
hideOptions = A.merge(hideOptions, value.hide);
					}

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 470);
instance._showAnim = new A.Anim(showOptions);
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 471);
instance._hideAnim = new A.Anim(hideOptions);

					// if anim.show or anim.hide === false, cancel respective animation
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 474);
if (isObject(value)) {
						_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 475);
if (value.show === false) {
							_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 476);
instance._showAnim = null;
						}

						_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 479);
if (value.hide === false) {
							_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 480);
instance._hideAnim = null;
						}
					}
				}

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 485);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "_beforeShow", 495);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 496);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 497);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 498);
var visible = instance.get(VISIBLE);

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 500);
if(!visible && instance._showAnim) {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 501);
boundingBox.setStyle(OPACITY, 0);

					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 503);
instance._showAnim.run();
				}
				else {
					_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 506);
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
				_yuitest_coverfunc("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", "_afterShowArrowChange", 517);
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 518);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 520);
instance._syncElements();
			}
		}
	}
);

_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 526);
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
_yuitest_coverline("/build/aui-overlay-context-panel/aui-overlay-context-panel.js", 538);
A.OverlayContextPanelManager = new A.OverlayManager({
	zIndexBase: 1000
});

}, '@VERSION@' ,{requires:['aui-overlay-context','anim'], skinnable:true});
