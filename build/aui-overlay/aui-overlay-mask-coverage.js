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
_yuitest_coverage["/build/aui-overlay-mask/aui-overlay-mask.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-overlay-mask/aui-overlay-mask.js",
    code: []
};
_yuitest_coverage["/build/aui-overlay-mask/aui-overlay-mask.js"].code=["AUI.add('aui-overlay-mask', function(A) {","/**"," * The OverlayMask Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-mask"," */","","var L = A.Lang,","	isArray = L.isArray,","	isString = L.isString,","	isNumber = L.isNumber,","	isValue = L.isValue,","","	CONFIG = A.config,","","	UA = A.UA,","","	IE6 = (UA.ie && UA.version.major <= 6),","","	ABSOLUTE = 'absolute',","	ALIGN_POINTS = 'alignPoints',","	BACKGROUND = 'background',","	BOUNDING_BOX = 'boundingBox',","	CONTENT_BOX = 'contentBox',","	FIXED = 'fixed',","	HEIGHT = 'height',","	OFFSET_HEIGHT = 'offsetHeight',","	OFFSET_WIDTH = 'offsetWidth',","	OPACITY = 'opacity',","	OVERLAY_MASK = 'overlaymask',","	POSITION = 'position',","	TARGET = 'target',","	WIDTH = 'width';","","/**"," * A base class for OverlayMask, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Cross browser mask functionality to cover an element or the entire page</li>"," *    <li>Customizable mask (i.e., background, opacity)</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.OverlayMask().render();</code></pre>"," *"," * Check the list of <a href=\"OverlayMask.html#configattributes\">Configuration Attributes</a> available for"," * OverlayMask."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class OverlayMask"," * @constructor"," * @extends OverlayBase"," */","var OverlayMask = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property OverlayMask.NAME","		 * @type String","		 * @static","		 */","		NAME: OVERLAY_MASK,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the OverlayMask.","		 *","		 * @property OverlayMask.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Points to align the <a href=\"Overlay.html\">Overlay</a> used as","	         * mask.","			 *","			 * @attribute alignPoints","			 * @default [ 'tl', 'tl' ]","			 * @type Array","			 */","			alignPoints: {","				value: [ 'tl', 'tl' ],","				validator: isArray","	        },","","			/**","			 * Background color of the mask.","			 *","			 * @attribute background","			 * @default null","			 * @type String","			 */","			background: {","				lazyAdd: false,","				value: null,","				validator: isString,","				setter: function(v) {","					if (v) {","						this.get(CONTENT_BOX).setStyle(BACKGROUND, v);","					}","","					return v;","				}","			},","","			/**","			 * Node where the mask will be positioned and re-dimensioned. The","	         * default is the document, which means that if not specified the mask","	         * takes the full screen.","			 *","			 * @attribute target","			 * @default document","			 * @type Node | String","			 */","			target: {","				cloneDefaultValue: false,","				lazyAdd: false,","				value: CONFIG.doc,","				setter: function(v) {","					var instance = this;","","					var target = A.one(v);","","					var isDoc = instance._isDoc = target.compareTo(CONFIG.doc);","					var isWin = instance._isWin = target.compareTo(CONFIG.win);","","					instance._fullPage = isDoc || isWin;","","					return target;","				}","			},","","			/**","			 * CSS opacity of the mask.","			 *","			 * @attribute opacity","			 * @default .5","			 * @type Number","			 */","			opacity: {","				value: 0.5,","				validator: isNumber,","				setter: function(v) {","					return this._setOpacity(v);","				}","			},","","			/**","			 * Use shim option.","			 *","			 * @attribute shim","			 * @default True on IE.","			 * @type boolean","			 */","			shim: {","				value: A.UA.ie","			},","","			/**","			 * If true the Overlay is visible by default after the render phase.","	         * Inherited from <a href=\"Overlay.html\">Overlay</a>.","			 *","			 * @attribute visible","			 * @default false","			 * @type boolean","			 */","			visible: {","				value: false","			},","","			/**","			 * zIndex of the OverlayMask.","			 *","			 * @attribute zIndex","			 * @default 1000","			 * @type Number","			 */","			zIndex: {","				value: 1000","			}","		},","","		EXTENDS: A.OverlayBase,","","		prototype: {","			/**","			 * Bind the events on the OverlayMask UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				OverlayMask.superclass.bindUI.apply(this, arguments);","","				instance.after('targetChange', instance._afterTargetChange);","				instance.after('visibleChange', instance._afterVisibleChange);","","				// window:resize YUI normalized event is not working, bug?","				A.on('windowresize', A.bind(instance.refreshMask, instance));","			},","","			/**","			 * Sync the OverlayMask UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance.refreshMask();","			},","","			/**","			 * Get the size of the","		     * <a href=\"OverlayMask.html#config_target\">target</a>. Used to dimension","		     * the mask node.","			 *","			 * @method getTargetSize","			 * @return {Object} Object containing the { height: height, width: width }.","			 */","			getTargetSize: function() {","				var instance = this;","				var target = instance.get(TARGET);","","				var isDoc = instance._isDoc;","				var isWin = instance._isWin;","","				var height = target.get(OFFSET_HEIGHT);","				var width = target.get(OFFSET_WIDTH);","","				if (IE6) {","					// IE6 doesn't support height/width 100% on doc/win","					if (isWin) {","						width = A.DOM.winWidth();","						height = A.DOM.winHeight();","					}","					else if (isDoc) {","						width = A.DOM.docWidth();","						height = A.DOM.docHeight();","					}","				}","				// good browsers...","				else if (instance._fullPage) {","					height = '100%';","					width = '100%';","				}","","				return { height: height, width: width };","			},","","			/**","			 * Repaint the OverlayMask UI, respecting the","		     * <a href=\"OverlayMask.html#config_target\">target</a> size and the","		     * <a href=\"OverlayMask.html#config_alignPoints\">alignPoints</a>.","			 *","			 * @method refreshMask","			 */","			refreshMask: function() {","				var instance = this;","				var alignPoints = instance.get(ALIGN_POINTS);","				var target = instance.get(TARGET);","				var boundingBox = instance.get(BOUNDING_BOX);","				var targetSize = instance.getTargetSize();","","				var fullPage = instance._fullPage;","","				boundingBox.setStyles({","					position: (IE6 || !fullPage) ? ABSOLUTE : FIXED,","					left: 0,","					top: 0","				});","","				var height = targetSize.height;","				var width = targetSize.width;","","				if (isValue(height)) {","					instance.set(HEIGHT, height);","				}","","				if (isValue(width)) {","					instance.set(WIDTH, width);","				}","","				// if its not a full mask...","				if ( !fullPage ) {","					// if the target is not document|window align the overlay","					instance.align(target, alignPoints);","				}","			},","","			/**","			 * Setter for <a href=\"Paginator.html#config_opacity\">opacity</a>.","			 *","			 * @method _setOpacity","			 * @protected","			 * @param {Number} v","			 * @return {Number}","			 */","			_setOpacity: function(v) {","				var instance = this;","","				instance.get(CONTENT_BOX).setStyle(OPACITY, v);","","				return v;","			},","","			/**","			 * Invoke the <code>OverlayMask.superclass._uiSetVisible</code>. Used to","		     * reset the <code>opacity</code> to work around IE bugs when set opacity","		     * of hidden elements.","			 *","			 * @method _uiSetVisible","			 * @param {boolean} val","			 * @protected","			 */","			_uiSetVisible: function(val) {","				var instance = this;","","				OverlayMask.superclass._uiSetVisible.apply(this, arguments);","","				if (val) {","					instance._setOpacity(","						instance.get(OPACITY)","					);","				}","			},","","			/**","			 * Fires after the value of the","			 * <a href=\"Paginator.html#config_target\">target</a> attribute change.","			 *","			 * @method _afterTargetChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterTargetChange: function(event) {","				var instance = this;","","				instance.refreshMask();","			},","","			/**","			 * Fires after the value of the","			 * <a href=\"Paginator.html#config_visible\">visible</a> attribute change.","			 *","			 * @method _afterVisibleChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterVisibleChange: function(event) {","				var instance = this;","","				instance._uiSetVisible(event.newVal);","			},","","			/**","			 * UI Setter for the ","			 * <a href=\"Paginator.html#config_xy\">XY</a> attribute.","			 *","			 * @method _uiSetXY","			 * @param {EventFacade} event","			 * @protected","			 */","			_uiSetXY: function() {","				var instance = this;","","				if (!instance._fullPage || IE6) {","					OverlayMask.superclass._uiSetXY.apply(instance, arguments);","				}","			}","		}","	}",");","","A.OverlayMask = OverlayMask;","","}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true});"];
_yuitest_coverage["/build/aui-overlay-mask/aui-overlay-mask.js"].lines = {"1":0,"9":0,"57":0,"102":0,"103":0,"106":0,"124":0,"126":0,"128":0,"129":0,"131":0,"133":0,"148":0,"197":0,"199":0,"201":0,"202":0,"205":0,"215":0,"217":0,"229":0,"230":0,"232":0,"233":0,"235":0,"236":0,"238":0,"240":0,"241":0,"242":0,"244":0,"245":0,"246":0,"250":0,"251":0,"252":0,"255":0,"266":0,"267":0,"268":0,"269":0,"270":0,"272":0,"274":0,"280":0,"281":0,"283":0,"284":0,"287":0,"288":0,"292":0,"294":0,"307":0,"309":0,"311":0,"324":0,"326":0,"328":0,"329":0,"344":0,"346":0,"358":0,"360":0,"372":0,"374":0,"375":0,"382":0};
_yuitest_coverage["/build/aui-overlay-mask/aui-overlay-mask.js"].functions = {"setter:101":0,"setter:123":0,"setter:147":0,"bindUI:196":0,"syncUI:214":0,"getTargetSize:228":0,"refreshMask:265":0,"_setOpacity:306":0,"_uiSetVisible:323":0,"_afterTargetChange:343":0,"_afterVisibleChange:357":0,"_uiSetXY:371":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-overlay-mask/aui-overlay-mask.js"].coveredLines = 67;
_yuitest_coverage["/build/aui-overlay-mask/aui-overlay-mask.js"].coveredFunctions = 13;
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 1);
AUI.add('aui-overlay-mask', function(A) {
/**
 * The OverlayMask Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-mask
 */

_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 9);
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
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 57);
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
					_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "setter", 101);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 102);
if (v) {
						_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 103);
this.get(CONTENT_BOX).setStyle(BACKGROUND, v);
					}

					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 106);
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
					_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "setter", 123);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 124);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 126);
var target = A.one(v);

					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 128);
var isDoc = instance._isDoc = target.compareTo(CONFIG.doc);
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 129);
var isWin = instance._isWin = target.compareTo(CONFIG.win);

					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 131);
instance._fullPage = isDoc || isWin;

					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 133);
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
					_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "setter", 147);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 148);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "bindUI", 196);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 197);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 199);
OverlayMask.superclass.bindUI.apply(this, arguments);

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 201);
instance.after('targetChange', instance._afterTargetChange);
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 202);
instance.after('visibleChange', instance._afterVisibleChange);

				// window:resize YUI normalized event is not working, bug?
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 205);
A.on('windowresize', A.bind(instance.refreshMask, instance));
			},

			/**
			 * Sync the OverlayMask UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "syncUI", 214);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 215);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 217);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "getTargetSize", 228);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 229);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 230);
var target = instance.get(TARGET);

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 232);
var isDoc = instance._isDoc;
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 233);
var isWin = instance._isWin;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 235);
var height = target.get(OFFSET_HEIGHT);
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 236);
var width = target.get(OFFSET_WIDTH);

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 238);
if (IE6) {
					// IE6 doesn't support height/width 100% on doc/win
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 240);
if (isWin) {
						_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 241);
width = A.DOM.winWidth();
						_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 242);
height = A.DOM.winHeight();
					}
					else {_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 244);
if (isDoc) {
						_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 245);
width = A.DOM.docWidth();
						_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 246);
height = A.DOM.docHeight();
					}}
				}
				// good browsers...
				else {_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 250);
if (instance._fullPage) {
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 251);
height = '100%';
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 252);
width = '100%';
				}}

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 255);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "refreshMask", 265);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 266);
var instance = this;
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 267);
var alignPoints = instance.get(ALIGN_POINTS);
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 268);
var target = instance.get(TARGET);
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 269);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 270);
var targetSize = instance.getTargetSize();

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 272);
var fullPage = instance._fullPage;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 274);
boundingBox.setStyles({
					position: (IE6 || !fullPage) ? ABSOLUTE : FIXED,
					left: 0,
					top: 0
				});

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 280);
var height = targetSize.height;
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 281);
var width = targetSize.width;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 283);
if (isValue(height)) {
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 284);
instance.set(HEIGHT, height);
				}

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 287);
if (isValue(width)) {
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 288);
instance.set(WIDTH, width);
				}

				// if its not a full mask...
				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 292);
if ( !fullPage ) {
					// if the target is not document|window align the overlay
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 294);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "_setOpacity", 306);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 307);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 309);
instance.get(CONTENT_BOX).setStyle(OPACITY, v);

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 311);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "_uiSetVisible", 323);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 324);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 326);
OverlayMask.superclass._uiSetVisible.apply(this, arguments);

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 328);
if (val) {
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 329);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "_afterTargetChange", 343);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 344);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 346);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "_afterVisibleChange", 357);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 358);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 360);
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
				_yuitest_coverfunc("/build/aui-overlay-mask/aui-overlay-mask.js", "_uiSetXY", 371);
_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 372);
var instance = this;

				_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 374);
if (!instance._fullPage || IE6) {
					_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 375);
OverlayMask.superclass._uiSetXY.apply(instance, arguments);
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-overlay-mask/aui-overlay-mask.js", 382);
A.OverlayMask = OverlayMask;

}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true});
