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
_yuitest_coverage["/build/aui-overlay-manager/aui-overlay-manager.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-overlay-manager/aui-overlay-manager.js",
    code: []
};
_yuitest_coverage["/build/aui-overlay-manager/aui-overlay-manager.js"].code=["AUI.add('aui-overlay-manager', function(A) {","/**"," * The OverlayManager Utility"," *"," * @module aui-overlay"," * @submodule aui-overlay-manager"," */","","var Lang = A.Lang,","	isArray = Lang.isArray,","	isBoolean = Lang.isBoolean,","	isNumber = Lang.isNumber,","	isString = Lang.isString,","","	BOUNDING_BOX = 'boundingBox',","	DEFAULT = 'default',","	HOST = 'host',","	OVERLAY_MANAGER = 'OverlayManager',","	GROUP = 'group',","	Z_INDEX = 'zIndex',","	Z_INDEX_BASE = 'zIndexBase';","","	/**","	 * <p><img src=\"assets/images/aui-overlay-manager/main.png\"/></p>","	 *","	 * A base class for OverlayManager, providing:","	 * <ul>","	 *    <li>Grouping overlays</li>","	 *    <li>Show or hide the entire group of registered overlays</li>","	 *    <li>Basic Overlay Stackability (zIndex support)</li>","	 * </ul>","	 *","	 * Quick Example:<br/>","	 *","	 * <pre><code>var groupOverlayManager = new A.OverlayManager();","	 * groupOverlayManager.register([overlay1, overlay2, overlay3]);","     * groupOverlayManager.hideAll();","	 * </code></pre>","	 *","	 * Check the list of <a href=\"OverlayManager.html#configattributes\">Configuration Attributes</a> available for","	 * OverlayManager.","	 *","	 * @param config {Object} Object literal specifying widget configuration properties.","	 *","	 * @class OverlayManager","	 * @constructor","	 * @extends Base","	 */","	var OverlayManager = A.Component.create(","		{","			/**","			 * Static property provides a string to identify the class.","			 *","			 * @property OverlayManager.NAME","			 * @type String","			 * @static","			 */","			NAME: OVERLAY_MANAGER.toLowerCase(),","","			/**","			 * Static property used to define the default attribute","			 * configuration for the OverlayManager.","			 *","			 * @property OverlayManager.ATTRS","			 * @type Object","			 * @static","			 */","			ATTRS: {","				/**","				 * The zIndex base to be used on the stacking for all overlays","                 * registered on the OverlayManager.","				 *","				 * @attribute zIndexBase","				 * @default 1000","				 * @type Number","				 */","				zIndexBase: {","					value: 1000,","					validator: isNumber,","					setter: Lang.toInt","				}","			},","","			EXTENDS: A.Base,","","			prototype: {","				/**","				 * Construction logic executed during OverlayManager instantiation. Lifecycle.","				 *","				 * @method initializer","				 * @protected","				 */","				initializer: function() {","					var instance = this;","","					instance._overlays = [];","				},","","				/**","				 * Set the passed overlay zIndex to the highest value.","				 *","				 * @method bringToTop","				 * @param {Overlay} overlay Instance of","		         * <a href=\"Overlay.html\">Overlay</a>.","				 */","				bringToTop: function(overlay) {","					var instance = this;","","					var overlays = instance._overlays.sort(instance.sortByZIndexDesc);","","					var highest = overlays[0];","","					if (highest !== overlay) {","						var overlayZ = overlay.get(Z_INDEX);","						var highestZ = highest.get(Z_INDEX);","","						overlay.set(Z_INDEX, highestZ + 1);","","						overlay.set('focused', true);","					}","				},","","				/**","				 * Descructor lifecycle implementation for the OverlayManager class.","				 * Purges events attached to the node (and all child nodes).","				 *","				 * @method destructor","				 * @protected","				 */","				destructor: function() {","					var instance = this;","","					instance._overlays = [];","				},","","				/**","				 * Register the passed <a href=\"Overlay.html\">Overlay</a> to this","		         * OverlayManager.","				 *","				 * @method register","				 * @param {Overlay} overlay <a href=\"Overlay.html\">Overlay</a> instance to be registered","				 * @return {Array} Registered overlays","				 */","				register: function (overlay) {","					var instance = this;","","					var overlays = instance._overlays;","","					if (isArray(overlay)) {","						A.Array.each(overlay, function(o) {","							instance.register(o);","						});","					}","					else {","						var zIndexBase = instance.get(Z_INDEX_BASE);","						var registered = instance._registered(overlay);","","						if (","							!registered && overlay &&","							((overlay instanceof A.Overlay) ||","							(A.Component && overlay instanceof A.Component))","						) {","							var boundingBox = overlay.get(BOUNDING_BOX);","","							overlays.push(overlay);","","							var zIndex = overlay.get(Z_INDEX) || 0;","							var newZIndex = overlays.length + zIndex + zIndexBase;","","							overlay.set(Z_INDEX, newZIndex);","","							overlay.on('focusedChange', instance._onFocusedChange, instance);","							boundingBox.on('mousedown', instance._onMouseDown, instance);","						}","					}","","					return overlays;","				},","","				/**","				 * Remove the passed <a href=\"Overlay.html\">Overlay</a> from this","		         * OverlayManager.","				 *","				 * @method remove","				 * @param {Overlay} overlay <a href=\"Overlay.html\">Overlay</a> instance to be removed","				 * @return {null}","				 */","				remove: function (overlay) {","					var instance = this;","","					var overlays = instance._overlays;","","					if (overlays.length) {","						return A.Array.removeItem(overlays, overlay);","					}","","					return null;","				},","","				/**","				 * Loop through all registered <a href=\"Overlay.html\">Overlay</a> and","		         * execute a callback.","				 *","				 * @method each","				 * @param {function} fn Callback to be executed on the","		         * <a href=\"Array.html#method_each\">Array.each</a>","				 * @return {null}","				 */","				each: function(fn) {","					var instance = this;","","					var overlays = instance._overlays;","","					A.Array.each(overlays, fn);","				},","","				/**","				 * Invoke the <a href=\"Overlay.html#method_show\">show</a> method from","		         * all registered Overlays.","				 *","				 * @method showAll","				 */","				showAll: function() {","					this.each(","						function(overlay) {","							overlay.show();","						}","					);","				},","","				/**","				 * Invoke the <a href=\"Overlay.html#method_hide\">hide</a> method from","		         * all registered Overlays.","				 *","				 * @method hideAll","				 */","				hideAll: function() {","					this.each(","						function(overlay) {","							overlay.hide();","						}","					);","				},","","				/**","				 * zIndex comparator. Used on Array.sort.","				 *","				 * @method sortByZIndexDesc","				 * @param {Overlay} a Overlay","				 * @param {Overlay} b Overlay","				 * @return {Number}","				 */","				sortByZIndexDesc: function(a, b) {","					if (!a || !b || !a.hasImpl(A.WidgetStack) || !b.hasImpl(A.WidgetStack)) {","						return 0;","					}","					else {","						var aZ = a.get(Z_INDEX);","						var bZ = b.get(Z_INDEX);","","						if (aZ > bZ) {","							return -1;","						} else if (aZ < bZ) {","							return 1;","						} else {","							return 0;","						}","					}","				},","","				/**","				 * Check if the overlay is registered.","				 *","				 * @method _registered","				 * @param {Overlay} overlay Overlay","				 * @protected","				 * @return {boolean}","				 */","				_registered: function(overlay) {","					var instance = this;","","					return A.Array.indexOf(instance._overlays, overlay) != -1;","				},","","				/**","				 * Mousedown event handler, used to invoke","		         * <a href=\"OverlayManager.html#method_bringToTop\">bringToTop</a>.","				 *","				 * @method _onMouseDown","				 * @param {EventFacade} event","				 * @protected","				 */","				_onMouseDown: function(event) {","					var instance = this;","					var overlay = A.Widget.getByNode(event.currentTarget || event.target);","					var registered = instance._registered(overlay);","","					if (overlay && registered) {","						instance.bringToTop(overlay);","					}","				},","","				/**","				 * Fires when the <a href=\"Widget.html#config_focused\">focused</a>","		         * attribute change. Used to invoke","		         * <a href=\"OverlayManager.html#method_bringToTop\">bringToTop</a>.","				 *","				 * @method _onFocusedChange","				 * @param {EventFacade} event","				 * @protected","				 */","				_onFocusedChange: function(event) {","					var instance = this;","","					if (event.newVal) {","						var overlay = event.currentTarget || event.target;","						var registered = instance._registered(overlay);","","						if (overlay && registered) {","							instance.bringToTop(overlay);","						}","					}","				}","			}","		}","	);","","	A.OverlayManager = OverlayManager;","","}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','overlay','plugin']});"];
_yuitest_coverage["/build/aui-overlay-manager/aui-overlay-manager.js"].lines = {"1":0,"9":0,"49":0,"94":0,"96":0,"107":0,"109":0,"111":0,"113":0,"114":0,"115":0,"117":0,"119":0,"131":0,"133":0,"145":0,"147":0,"149":0,"150":0,"151":0,"155":0,"156":0,"158":0,"163":0,"165":0,"167":0,"168":0,"170":0,"172":0,"173":0,"177":0,"189":0,"191":0,"193":0,"194":0,"197":0,"210":0,"212":0,"214":0,"224":0,"226":0,"238":0,"240":0,"254":0,"255":0,"258":0,"259":0,"261":0,"262":0,"263":0,"264":0,"266":0,"280":0,"282":0,"294":0,"295":0,"296":0,"298":0,"299":0,"313":0,"315":0,"316":0,"317":0,"319":0,"320":0,"328":0};
_yuitest_coverage["/build/aui-overlay-manager/aui-overlay-manager.js"].functions = {"initializer:93":0,"bringToTop:106":0,"destructor:130":0,"(anonymous 2):150":0,"register:144":0,"remove:188":0,"each:209":0,"(anonymous 3):225":0,"showAll:223":0,"(anonymous 4):239":0,"hideAll:237":0,"sortByZIndexDesc:253":0,"_registered:279":0,"_onMouseDown:293":0,"_onFocusedChange:312":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-overlay-manager/aui-overlay-manager.js"].coveredLines = 66;
_yuitest_coverage["/build/aui-overlay-manager/aui-overlay-manager.js"].coveredFunctions = 16;
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 1);
AUI.add('aui-overlay-manager', function(A) {
/**
 * The OverlayManager Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-manager
 */

_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 9);
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
	_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 49);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "initializer", 93);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 94);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 96);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "bringToTop", 106);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 107);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 109);
var overlays = instance._overlays.sort(instance.sortByZIndexDesc);

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 111);
var highest = overlays[0];

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 113);
if (highest !== overlay) {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 114);
var overlayZ = overlay.get(Z_INDEX);
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 115);
var highestZ = highest.get(Z_INDEX);

						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 117);
overlay.set(Z_INDEX, highestZ + 1);

						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 119);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "destructor", 130);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 131);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 133);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "register", 144);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 145);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 147);
var overlays = instance._overlays;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 149);
if (isArray(overlay)) {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 150);
A.Array.each(overlay, function(o) {
							_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "(anonymous 2)", 150);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 151);
instance.register(o);
						});
					}
					else {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 155);
var zIndexBase = instance.get(Z_INDEX_BASE);
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 156);
var registered = instance._registered(overlay);

						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 158);
if (
							!registered && overlay &&
							((overlay instanceof A.Overlay) ||
							(A.Component && overlay instanceof A.Component))
						) {
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 163);
var boundingBox = overlay.get(BOUNDING_BOX);

							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 165);
overlays.push(overlay);

							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 167);
var zIndex = overlay.get(Z_INDEX) || 0;
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 168);
var newZIndex = overlays.length + zIndex + zIndexBase;

							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 170);
overlay.set(Z_INDEX, newZIndex);

							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 172);
overlay.on('focusedChange', instance._onFocusedChange, instance);
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 173);
boundingBox.on('mousedown', instance._onMouseDown, instance);
						}
					}

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 177);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "remove", 188);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 189);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 191);
var overlays = instance._overlays;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 193);
if (overlays.length) {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 194);
return A.Array.removeItem(overlays, overlay);
					}

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 197);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "each", 209);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 210);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 212);
var overlays = instance._overlays;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 214);
A.Array.each(overlays, fn);
				},

				/**
				 * Invoke the <a href="Overlay.html#method_show">show</a> method from
		         * all registered Overlays.
				 *
				 * @method showAll
				 */
				showAll: function() {
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "showAll", 223);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 224);
this.each(
						function(overlay) {
							_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "(anonymous 3)", 225);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 226);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "hideAll", 237);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 238);
this.each(
						function(overlay) {
							_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "(anonymous 4)", 239);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 240);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "sortByZIndexDesc", 253);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 254);
if (!a || !b || !a.hasImpl(A.WidgetStack) || !b.hasImpl(A.WidgetStack)) {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 255);
return 0;
					}
					else {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 258);
var aZ = a.get(Z_INDEX);
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 259);
var bZ = b.get(Z_INDEX);

						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 261);
if (aZ > bZ) {
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 262);
return -1;
						} else {_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 263);
if (aZ < bZ) {
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 264);
return 1;
						} else {
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 266);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "_registered", 279);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 280);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 282);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "_onMouseDown", 293);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 294);
var instance = this;
					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 295);
var overlay = A.Widget.getByNode(event.currentTarget || event.target);
					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 296);
var registered = instance._registered(overlay);

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 298);
if (overlay && registered) {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 299);
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
					_yuitest_coverfunc("/build/aui-overlay-manager/aui-overlay-manager.js", "_onFocusedChange", 312);
_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 313);
var instance = this;

					_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 315);
if (event.newVal) {
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 316);
var overlay = event.currentTarget || event.target;
						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 317);
var registered = instance._registered(overlay);

						_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 319);
if (overlay && registered) {
							_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 320);
instance.bringToTop(overlay);
						}
					}
				}
			}
		}
	);

	_yuitest_coverline("/build/aui-overlay-manager/aui-overlay-manager.js", 328);
A.OverlayManager = OverlayManager;

}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','overlay','plugin']});
