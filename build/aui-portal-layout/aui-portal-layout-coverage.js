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
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-portal-layout/aui-portal-layout.js",
    code: []
};
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].code=["AUI.add('aui-portal-layout', function(A) {","/**"," * The PortalLayout Utility - Full documentation coming soon."," *"," * @module aui-portal-layout"," */","","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isFunction = Lang.isFunction,","	isObject = Lang.isObject,","	isString = Lang.isString,","	isValue = Lang.isValue,","","	toInt = Lang.toInt,","","	ceil = Math.ceil,","","	DDM = A.DD.DDM,","","	APPEND = 'append',","	CIRCLE = 'circle',","	DELEGATE_CONFIG = 'delegateConfig',","	DOWN = 'down',","	DRAG = 'drag',","	DRAG_NODE = 'dragNode',","	DRAG_NODES = 'dragNodes',","	DROP_CONTAINER = 'dropContainer',","	DROP_NODES = 'dropNodes',","	GROUPS = 'groups',","	ICON = 'icon',","	INDICATOR = 'indicator',","	L = 'l',","	LAZY_START = 'lazyStart',","	LEFT = 'left',","	MARGIN_BOTTOM = 'marginBottom',","	MARGIN_TOP = 'marginTop',","	NODE = 'node',","	OFFSET_HEIGHT = 'offsetHeight',","	OFFSET_WIDTH = 'offsetWidth',","	PLACEHOLDER = 'placeholder',","	PLACE_AFTER = 'placeAfter',","	PLACE_BEFORE = 'placeBefore',","	PORTAL_LAYOUT = 'portal-layout',","	PREPEND = 'prepend',","	PROXY = 'proxy',","	PROXY_NODE = 'proxyNode',","	R = 'r',","	REGION = 'region',","	RIGHT = 'right',","	SPACE = ' ',","	TARGET = 'target',","	TRIANGLE = 'triangle',","	UP = 'up',","","	EV_PLACEHOLDER_ALIGN = 'placeholderAlign',","	EV_QUADRANT_ENTER = 'quadrantEnter',","	EV_QUADRANT_EXIT = 'quadrantExit',","	EV_QUADRANT_OVER = 'quadrantOver',","","	// caching these values for performance","	PLACEHOLDER_MARGIN_BOTTOM = 0,","	PLACEHOLDER_MARGIN_TOP = 0,","	PLACEHOLDER_TARGET_MARGIN_BOTTOM = 0,","	PLACEHOLDER_TARGET_MARGIN_TOP = 0,","","	isNodeList = function(v) {","		return (v instanceof A.NodeList);","	},","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	nodeListSetter = function(val) {","		return isNodeList(val) ? val : A.all(val);","	},","","	getNumStyle = function(elem, styleName) {","		return toInt(elem.getStyle(styleName));","	},","","	getCN = A.getClassName,","","	CSS_DRAG_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, INDICATOR),","	CSS_DRAG_INDICATOR_ICON = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON),","	CSS_DRAG_INDICATOR_ICON_LEFT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, LEFT),","	CSS_DRAG_INDICATOR_ICON_RIGHT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, RIGHT),","	CSS_DRAG_TARGET_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, TARGET, INDICATOR),","	CSS_ICON = getCN(ICON),","	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, L),","	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, R),","","	TPL_PLACEHOLDER = '<div class=\"'+CSS_DRAG_INDICATOR+'\">' +","							'<div class=\"'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_LEFT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R)+'\"></div>' +","							'<div class=\"'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_RIGHT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L)+'\"></div>' +","						'<div>';","","/**"," * A base class for PortalLayout, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>DragDrop utility for drag lists, portal layouts (portlets)</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var portalLayout = new A.PortalLayout({"," *  	dragNodes: '.portlet',"," *  	dropNodes: '.column',"," *  	proxyNode: A.Node.create('<div class=\"aui-portal-layout-proxy\"></div>'),"," *  	lazyStart: true"," * </code></pre>"," *"," * Check the list of <a href=\"PortalLayout.html#configattributes\">Configuration Attributes</a> available for"," * PortalLayout."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class PortalLayout"," * @constructor"," * @extends Base"," */","var PortalLayout = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property PortalLayout.NAME","		 * @type String","		 * @static","		 */","		NAME: PORTAL_LAYOUT,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the PortalLayout.","		 *","		 * @property PortalLayout.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			delegateConfig: {","				value: null,","				setter: function(val) {","					var instance = this;","","					var config = A.merge(","						{","							bubbleTargets: instance,","							dragConfig: {},","							nodes: instance.get(DRAG_NODES),","							target: true","						},","						val","					);","","					A.mix(config.dragConfig, {","						groups: instance.get(GROUPS),","						startCentered: true","					});","","					return config;","				},","				validator: isObject","			},","","			proxyNode: {","				setter: function(val) {","					return isString(val) ? A.Node.create(val) : val;","				}","			},","","			dragNodes: {","				validator: isString","			},","","			dropContainer: {","				value: function(dropNode) {","					return dropNode;","				},","				validator: isFunction","			},","","			dropNodes: {","				setter: '_setDropNodes'","			},","","			groups: {","				value: [PORTAL_LAYOUT]","			},","","			lazyStart: {","				value: false,","				validator: isBoolean","			},","","			placeholder: {","				value: TPL_PLACEHOLDER,","				setter: function(val) {","					var placeholder = isString(val) ? A.Node.create(val) : val;","","					if (!placeholder.inDoc()) {","						A.getBody().prepend(","							placeholder.hide()","						);","					}","","					PLACEHOLDER_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);","					PLACEHOLDER_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);","","					placeholder.addClass(CSS_DRAG_TARGET_INDICATOR);","","					PLACEHOLDER_TARGET_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);","					PLACEHOLDER_TARGET_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);","","					return placeholder;","				}","			},","","			proxy: {","				value: null,","				setter: function(val) {","					var instance = this;","","					var defaults = {","						moveOnEnd: false,","						positionProxy: false","					};","","					// if proxyNode is set remove the border from the default proxy","					if (instance.get(PROXY_NODE)) {","						defaults.borderStyle = null;","					}","","					return A.merge(defaults, val || {});","				}","			}","		},","","		EXTENDS: A.Base,","","		prototype: {","			/**","			 * Construction logic executed during PortalLayout instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				instance.bindUI();","			},","","			bindUI: function() {","				var instance = this;","","				// publishing placeholderAlign event","				instance.publish(EV_PLACEHOLDER_ALIGN, {","		            defaultFn: instance._defPlaceholderAlign,","		            queuable: false,","		            emitFacade: true,","		            bubbles: true","		        });","","				instance._bindDDEvents();","				instance._bindDropZones();","			},","","			/*","			* Methods","			*/","			addDropNode: function(node, config) {","				var instance = this;","","				node = A.one(node);","","				if (!DDM.getDrop(node)) {","					instance.addDropTarget(","						// Do not use DropPlugin to create the DropZones on","                        // this component, the \".drop\" namespace is used to check","                        // for the DD.Delegate target nodes","						new A.DD.Drop(","							A.merge(","								{","									bubbleTargets: instance,","									node: node","								},","								config","							)","						)","					);","				}","			},","","			addDropTarget: function(drop) {","				var instance = this;","","				drop.addToGroup(","					instance.get(GROUPS)","				);","			},","","			alignPlaceholder: function(region, isTarget) {","				var instance = this;","				var placeholder = instance.get(PLACEHOLDER);","","				if (!instance.lazyEvents) {","					placeholder.show();","				}","","				// sync placeholder size","				instance._syncPlaceholderSize();","","				placeholder.setXY(","					instance.getPlaceholderXY(region, isTarget)","				);","			},","","			calculateDirections: function(drag) {","				var instance = this;","				var lastY = instance.lastY;","				var lastX = instance.lastX;","","				var x = drag.lastXY[0];","				var y = drag.lastXY[1];","","				// if the x change","				if (x != lastX) {","					// set the drag direction","					instance.XDirection = (x < lastX) ? LEFT : RIGHT;","				}","","				// if the y change","				if (y != lastY) {","					// set the drag direction","					instance.YDirection = (y < lastY) ? UP : DOWN;","				}","","				instance.lastX = x;","				instance.lastY = y;","			},","","			calculateQuadrant: function(drag, drop) {","				var instance = this;","				var quadrant = 1;","				var region = drop.get(NODE).get(REGION);","				var mouseXY = drag.mouseXY;","				var mouseX = mouseXY[0];","				var mouseY = mouseXY[1];","","				var top = region.top;","				var left = region.left;","","				// (region.bottom - top) finds the height of the region","				var vCenter = top + (region.bottom - top)/2;","				// (region.right - left) finds the width of the region","				var hCenter = left + (region.right - left)/2;","","				if (mouseY < vCenter) {","					quadrant = (mouseX > hCenter) ? 1 : 2;","				}","				else {","					quadrant = (mouseX < hCenter) ? 3 : 4;","				}","","				instance.quadrant = quadrant;","","				return quadrant;","			},","","			getPlaceholderXY: function(region, isTarget) {","				var instance = this;","				var placeholder = instance.get(PLACEHOLDER);","				var marginBottom = PLACEHOLDER_MARGIN_BOTTOM;","				var marginTop = PLACEHOLDER_MARGIN_TOP;","","				if (isTarget) {","					// update the margin values in case of the target placeholder has a different margin","					marginBottom = PLACEHOLDER_TARGET_MARGIN_BOTTOM;","					marginTop = PLACEHOLDER_TARGET_MARGIN_TOP;","				}","","				// update the className of the placeholder when interact with target (drag/drop) elements","				placeholder.toggleClass(CSS_DRAG_TARGET_INDICATOR, isTarget);","","				var regionBottom = ceil(region.bottom);","				var regionLeft = ceil(region.left);","				var regionTop = ceil(region.top);","","				var x = regionLeft;","","				// 1 and 2 quadrants are the top quadrants, so align to the region.top when quadrant < 3","				var y = (instance.quadrant < 3) ?","							(regionTop - (placeholder.get(OFFSET_HEIGHT) + marginBottom)) : (regionBottom + marginTop);","","				return [ x, y ];","			},","","			removeDropTarget: function(drop) {","				var instance = this;","","				drop.removeFromGroup(","					instance.get(GROUPS)","				);","			},","","			_alignCondition: function() {","				var instance = this;","				var activeDrag = DDM.activeDrag;","				var activeDrop = instance.activeDrop;","","				if (activeDrag && activeDrop) {","					var dragNode = activeDrag.get(NODE);","					var dropNode = activeDrop.get(NODE);","","					return !dragNode.contains(dropNode);","				}","","				return true;","			},","","			_bindDDEvents: function() {","				var instance = this;","				var delegateConfig = instance.get(DELEGATE_CONFIG);","				var proxy = instance.get(PROXY);","","				// creating DD.Delegate instance","				instance.delegate = new A.DD.Delegate(delegateConfig);","","				// plugging the DDProxy","				instance.delegate.dd.plug(A.Plugin.DDProxy, proxy);","","				instance.on('drag:end', A.bind(instance._onDragEnd, instance));","				instance.on('drag:enter', A.bind(instance._onDragEnter, instance));","				instance.on('drag:exit', A.bind(instance._onDragExit, instance));","				instance.on('drag:over', A.bind(instance._onDragOver, instance));","				instance.on('drag:start', A.bind(instance._onDragStart, instance));","				instance.after('drag:start', A.bind(instance._afterDragStart, instance));","","				instance.on(EV_QUADRANT_ENTER, instance._syncPlaceholderUI);","				instance.on(EV_QUADRANT_EXIT, instance._syncPlaceholderUI);","			},","","			_bindDropZones: function() {","				var instance = this;","				var dropNodes = instance.get(DROP_NODES);","","				if (dropNodes) {","					dropNodes.each(function(node, i) {","						instance.addDropNode(node);","					});","				}","			},","","			_defPlaceholderAlign: function(event) {","				var instance = this;","				var activeDrop = instance.activeDrop;","				var placeholder = instance.get(PLACEHOLDER);","","				if (activeDrop && placeholder) {","					var node = activeDrop.get('node');","					// DD.Delegate use the Drop Plugin on its \"target\" items. Using Drop Plugin a \"node.drop\" namespace is created.","					// Using the .drop namespace to detect when the node is also a \"target\" DD.Delegate node","					var isTarget = !!node.drop;","","					instance.lastAlignDrop = activeDrop;","","					instance.alignPlaceholder(","						activeDrop.get(NODE).get(REGION),","						isTarget","					);","				}","			},","","			_evOutput: function() {","				var instance = this;","","				return {","					drag: DDM.activeDrag,","					drop: instance.activeDrop,","					quadrant: instance.quadrant,","					XDirection: instance.XDirection,","					YDirection: instance.YDirection","				};","			},","","			_fireQuadrantEvents: function() {","				var instance = this;","				var evOutput = instance._evOutput();","				var lastQuadrant = instance.lastQuadrant;","				var quadrant = instance.quadrant;","","				if (quadrant != lastQuadrant) {","					// only trigger exit if it has previously entered in any quadrant","					if (lastQuadrant) {","						// merging event with the \"last\" information","						instance.fire(","							EV_QUADRANT_EXIT,","							A.merge(","								{","									lastDrag: instance.lastDrag,","									lastDrop: instance.lastDrop,","									lastQuadrant: instance.lastQuadrant,","									lastXDirection: instance.lastXDirection,","									lastYDirection: instance.lastYDirection","								},","								evOutput","							)","						);","					}","","					// firing EV_QUADRANT_ENTER event","					instance.fire(EV_QUADRANT_ENTER, evOutput);","				}","","				// firing EV_QUADRANT_OVER, align event fires like the drag over without bubbling for performance reasons","				instance.fire(EV_QUADRANT_OVER, evOutput);","","				// updating \"last\" information","				instance.lastDrag = DDM.activeDrag;","				instance.lastDrop = instance.activeDrop;","				instance.lastQuadrant = quadrant;","				instance.lastXDirection = instance.XDirection;","				instance.lastYDirection = instance.YDirection;","			},","","			_getAppendNode: function() {","				return DDM.activeDrag.get(NODE);","			},","","			_positionNode: function(event) {","				var instance = this;","				var activeDrop = instance.lastAlignDrop || instance.activeDrop;","","				if (activeDrop) {","					var dragNode = instance._getAppendNode();","					var dropNode = activeDrop.get(NODE);","","					// detects if the activeDrop is a dd target (portlet) or a drop area only (column)","					// DD.Delegate use the Drop Plugin on its \"target\" items. Using Drop Plugin a \"node.drop\" namespace is created.","					// Using the .drop namespace to detect when the node is also a \"target\" DD.Delegate node","					var isTarget = isValue(dropNode.drop);","					var topQuadrants = (instance.quadrant < 3);","","					if (instance._alignCondition()) {","						if (isTarget) {","							dropNode[ topQuadrants ? PLACE_BEFORE : PLACE_AFTER ](dragNode);","						}","						// interacting with the columns (drop areas only)","						else {","							// find the dropContainer of the dropNode, the default DROP_CONTAINER function returns the dropNode","							var dropContainer = instance.get(DROP_CONTAINER).apply(instance, [dropNode]);","","							dropContainer[ topQuadrants ? PREPEND : APPEND ](dragNode);","						}","					}","				}","			},","","			_syncPlaceholderUI: function(event) {","				var instance = this;","","				if (instance._alignCondition()) {","					// firing placeholderAlign event","					instance.fire(EV_PLACEHOLDER_ALIGN, {","						drop: instance.activeDrop,","						originalEvent: event","					});","				}","			},","","			_syncPlaceholderSize: function() {","				var instance = this;","				var node = instance.activeDrop.get(NODE);","","				var placeholder = instance.get(PLACEHOLDER);","","				if (placeholder) {","					placeholder.set(","						OFFSET_WIDTH,","						node.get(OFFSET_WIDTH)","					);","				}","			},","","			_syncProxyNodeUI: function(event) {","				var instance = this;","				var dragNode = DDM.activeDrag.get(DRAG_NODE);","				var proxyNode = instance.get(PROXY_NODE);","","				if (proxyNode && !proxyNode.compareTo(dragNode)) {","					dragNode.append(proxyNode);","","					instance._syncProxyNodeSize();","				}","			},","","			_syncProxyNodeSize: function() {","				var instance = this;","				var node = DDM.activeDrag.get(NODE);","				var proxyNode = instance.get(PROXY_NODE);","","				if (node && proxyNode) {","					proxyNode.set(","						OFFSET_HEIGHT,","						node.get(OFFSET_HEIGHT)","					);","","					proxyNode.set(","						OFFSET_WIDTH,","						node.get(OFFSET_WIDTH)","					);","				}","			},","","			/*","			* Listeners","			*/","			_afterDragStart: function(event) {","				var instance = this;","","				if (instance.get(PROXY)) {","					instance._syncProxyNodeUI(event);","				}","			},","","			_onDragEnd: function(event) {","				var instance = this;","				var placeholder = instance.get(PLACEHOLDER);","				var proxyNode = instance.get(PROXY_NODE);","","				if (!instance.lazyEvents) {","					instance._positionNode(event);","				}","","				if (proxyNode) {","					proxyNode.remove();","				}","","				if (placeholder) {","					placeholder.hide();","				}","","				// reset the last information","				instance.lastQuadrant = null;","				instance.lastXDirection = null;","				instance.lastYDirection = null;","			},","","			// fires after drag:start","			_onDragEnter: function(event) {","				var instance = this;","","				instance.activeDrop = DDM.activeDrop;","","				// check if lazyEvents is true and if there is a lastActiveDrop","				// the checking for lastActiveDrop prevents fire the _syncPlaceholderUI when quadrant* events fires","				if (instance.lazyEvents && instance.lastActiveDrop) {","					instance.lazyEvents = false;","","					instance._syncPlaceholderUI(event);","				}","","				// lastActiveDrop is always updated by the drag exit,","				// but if there is no lastActiveDrop update it on drag enter update it","				if (!instance.lastActiveDrop) {","					instance.lastActiveDrop = DDM.activeDrop;","				}","			},","","			_onDragExit: function(event) {","				var instance = this;","","				instance._syncPlaceholderUI(event);","","				instance.activeDrop = DDM.activeDrop;","","				instance.lastActiveDrop = DDM.activeDrop;","			},","","			_onDragOver: function(event) {","				var instance = this;","				var drag = event.drag;","","				// prevent drag over bubbling, filtering the top most element","				if (instance.activeDrop == DDM.activeDrop) {","					instance.calculateDirections(drag);","","					instance.calculateQuadrant(drag, instance.activeDrop);","","					instance._fireQuadrantEvents();","				}","			},","","			// fires before drag:enter","			_onDragStart: function(event) {","				var instance = this;","","				if (instance.get(LAZY_START)) {","					instance.lazyEvents = true;","				}","","				instance.lastActiveDrop = null;","","				instance.activeDrop = DDM.activeDrop;","			},","","			_setDropNodes: function(val) {","				var instance = this;","","				if (isFunction(val)) {","					val = val.call(instance);","				}","","				return nodeListSetter(val);","			}","		}","	}",");","","A.PortalLayout = PortalLayout;","","}, '@VERSION@' ,{requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy'], skinnable:true});"];
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].lines = {"1":0,"8":0,"68":0,"72":0,"76":0,"80":0,"124":0,"147":0,"149":0,"159":0,"164":0,"171":0,"181":0,"202":0,"204":0,"205":0,"210":0,"211":0,"213":0,"215":0,"216":0,"218":0,"225":0,"227":0,"233":0,"234":0,"237":0,"252":0,"254":0,"258":0,"261":0,"268":0,"269":0,"276":0,"278":0,"280":0,"281":0,"299":0,"301":0,"307":0,"308":0,"310":0,"311":0,"315":0,"317":0,"323":0,"324":0,"325":0,"327":0,"328":0,"331":0,"333":0,"337":0,"339":0,"342":0,"343":0,"347":0,"348":0,"349":0,"350":0,"351":0,"352":0,"354":0,"355":0,"358":0,"360":0,"362":0,"363":0,"366":0,"369":0,"371":0,"375":0,"376":0,"377":0,"378":0,"380":0,"382":0,"383":0,"387":0,"389":0,"390":0,"391":0,"393":0,"396":0,"399":0,"403":0,"405":0,"411":0,"412":0,"413":0,"415":0,"416":0,"417":0,"419":0,"422":0,"426":0,"427":0,"428":0,"431":0,"434":0,"436":0,"437":0,"438":0,"439":0,"440":0,"441":0,"443":0,"444":0,"448":0,"449":0,"451":0,"452":0,"453":0,"459":0,"460":0,"461":0,"463":0,"464":0,"467":0,"469":0,"471":0,"479":0,"481":0,"491":0,"492":0,"493":0,"494":0,"496":0,"498":0,"500":0,"516":0,"520":0,"523":0,"524":0,"525":0,"526":0,"527":0,"531":0,"535":0,"536":0,"538":0,"539":0,"540":0,"545":0,"546":0,"548":0,"549":0,"550":0,"555":0,"557":0,"564":0,"566":0,"568":0,"576":0,"577":0,"579":0,"581":0,"582":0,"590":0,"591":0,"592":0,"594":0,"595":0,"597":0,"602":0,"603":0,"604":0,"606":0,"607":0,"612":0,"623":0,"625":0,"626":0,"631":0,"632":0,"633":0,"635":0,"636":0,"639":0,"640":0,"643":0,"644":0,"648":0,"649":0,"650":0,"655":0,"657":0,"661":0,"662":0,"664":0,"669":0,"670":0,"675":0,"677":0,"679":0,"681":0,"685":0,"686":0,"689":0,"690":0,"692":0,"694":0,"700":0,"702":0,"703":0,"706":0,"708":0,"712":0,"714":0,"715":0,"718":0,"724":0};
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].functions = {"isNodeList:67":0,"concat:71":0,"nodeListSetter:75":0,"getNumStyle:79":0,"setter:146":0,"setter:170":0,"value:180":0,"setter:201":0,"setter:224":0,"initializer:251":0,"bindUI:257":0,"addDropNode:275":0,"addDropTarget:298":0,"alignPlaceholder:306":0,"calculateDirections:322":0,"calculateQuadrant:346":0,"getPlaceholderXY:374":0,"removeDropTarget:402":0,"_alignCondition:410":0,"_bindDDEvents:425":0,"(anonymous 2):452":0,"_bindDropZones:447":0,"_defPlaceholderAlign:458":0,"_evOutput:478":0,"_fireQuadrantEvents:490":0,"_getAppendNode:530":0,"_positionNode:534":0,"_syncPlaceholderUI:563":0,"_syncPlaceholderSize:575":0,"_syncProxyNodeUI:589":0,"_syncProxyNodeSize:601":0,"_afterDragStart:622":0,"_onDragEnd:630":0,"_onDragEnter:654":0,"_onDragExit:674":0,"_onDragOver:684":0,"_onDragStart:699":0,"_setDropNodes:711":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].coveredLines = 212;
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].coveredFunctions = 39;
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 1);
AUI.add('aui-portal-layout', function(A) {
/**
 * The PortalLayout Utility - Full documentation coming soon.
 *
 * @module aui-portal-layout
 */

_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 8);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isValue = Lang.isValue,

	toInt = Lang.toInt,

	ceil = Math.ceil,

	DDM = A.DD.DDM,

	APPEND = 'append',
	CIRCLE = 'circle',
	DELEGATE_CONFIG = 'delegateConfig',
	DOWN = 'down',
	DRAG = 'drag',
	DRAG_NODE = 'dragNode',
	DRAG_NODES = 'dragNodes',
	DROP_CONTAINER = 'dropContainer',
	DROP_NODES = 'dropNodes',
	GROUPS = 'groups',
	ICON = 'icon',
	INDICATOR = 'indicator',
	L = 'l',
	LAZY_START = 'lazyStart',
	LEFT = 'left',
	MARGIN_BOTTOM = 'marginBottom',
	MARGIN_TOP = 'marginTop',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	PLACEHOLDER = 'placeholder',
	PLACE_AFTER = 'placeAfter',
	PLACE_BEFORE = 'placeBefore',
	PORTAL_LAYOUT = 'portal-layout',
	PREPEND = 'prepend',
	PROXY = 'proxy',
	PROXY_NODE = 'proxyNode',
	R = 'r',
	REGION = 'region',
	RIGHT = 'right',
	SPACE = ' ',
	TARGET = 'target',
	TRIANGLE = 'triangle',
	UP = 'up',

	EV_PLACEHOLDER_ALIGN = 'placeholderAlign',
	EV_QUADRANT_ENTER = 'quadrantEnter',
	EV_QUADRANT_EXIT = 'quadrantExit',
	EV_QUADRANT_OVER = 'quadrantOver',

	// caching these values for performance
	PLACEHOLDER_MARGIN_BOTTOM = 0,
	PLACEHOLDER_MARGIN_TOP = 0,
	PLACEHOLDER_TARGET_MARGIN_BOTTOM = 0,
	PLACEHOLDER_TARGET_MARGIN_TOP = 0,

	isNodeList = function(v) {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "isNodeList", 67);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 68);
return (v instanceof A.NodeList);
	},

	concat = function() {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "concat", 71);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 72);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	nodeListSetter = function(val) {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "nodeListSetter", 75);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 76);
return isNodeList(val) ? val : A.all(val);
	},

	getNumStyle = function(elem, styleName) {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "getNumStyle", 79);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 80);
return toInt(elem.getStyle(styleName));
	},

	getCN = A.getClassName,

	CSS_DRAG_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, INDICATOR),
	CSS_DRAG_INDICATOR_ICON = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON),
	CSS_DRAG_INDICATOR_ICON_LEFT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, LEFT),
	CSS_DRAG_INDICATOR_ICON_RIGHT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, RIGHT),
	CSS_DRAG_TARGET_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, TARGET, INDICATOR),
	CSS_ICON = getCN(ICON),
	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, L),
	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, R),

	TPL_PLACEHOLDER = '<div class="'+CSS_DRAG_INDICATOR+'">' +
							'<div class="'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_LEFT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R)+'"></div>' +
							'<div class="'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_RIGHT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L)+'"></div>' +
						'<div>';

/**
 * A base class for PortalLayout, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>DragDrop utility for drag lists, portal layouts (portlets)</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var portalLayout = new A.PortalLayout({
 *  	dragNodes: '.portlet',
 *  	dropNodes: '.column',
 *  	proxyNode: A.Node.create('<div class="aui-portal-layout-proxy"></div>'),
 *  	lazyStart: true
 * </code></pre>
 *
 * Check the list of <a href="PortalLayout.html#configattributes">Configuration Attributes</a> available for
 * PortalLayout.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class PortalLayout
 * @constructor
 * @extends Base
 */
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 124);
var PortalLayout = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property PortalLayout.NAME
		 * @type String
		 * @static
		 */
		NAME: PORTAL_LAYOUT,

		/**
		 * Static property used to define the default attribute
		 * configuration for the PortalLayout.
		 *
		 * @property PortalLayout.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			delegateConfig: {
				value: null,
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 146);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 147);
var instance = this;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 149);
var config = A.merge(
						{
							bubbleTargets: instance,
							dragConfig: {},
							nodes: instance.get(DRAG_NODES),
							target: true
						},
						val
					);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 159);
A.mix(config.dragConfig, {
						groups: instance.get(GROUPS),
						startCentered: true
					});

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 164);
return config;
				},
				validator: isObject
			},

			proxyNode: {
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 170);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 171);
return isString(val) ? A.Node.create(val) : val;
				}
			},

			dragNodes: {
				validator: isString
			},

			dropContainer: {
				value: function(dropNode) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "value", 180);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 181);
return dropNode;
				},
				validator: isFunction
			},

			dropNodes: {
				setter: '_setDropNodes'
			},

			groups: {
				value: [PORTAL_LAYOUT]
			},

			lazyStart: {
				value: false,
				validator: isBoolean
			},

			placeholder: {
				value: TPL_PLACEHOLDER,
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 201);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 202);
var placeholder = isString(val) ? A.Node.create(val) : val;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 204);
if (!placeholder.inDoc()) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 205);
A.getBody().prepend(
							placeholder.hide()
						);
					}

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 210);
PLACEHOLDER_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 211);
PLACEHOLDER_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 213);
placeholder.addClass(CSS_DRAG_TARGET_INDICATOR);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 215);
PLACEHOLDER_TARGET_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 216);
PLACEHOLDER_TARGET_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 218);
return placeholder;
				}
			},

			proxy: {
				value: null,
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 224);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 225);
var instance = this;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 227);
var defaults = {
						moveOnEnd: false,
						positionProxy: false
					};

					// if proxyNode is set remove the border from the default proxy
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 233);
if (instance.get(PROXY_NODE)) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 234);
defaults.borderStyle = null;
					}

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 237);
return A.merge(defaults, val || {});
				}
			}
		},

		EXTENDS: A.Base,

		prototype: {
			/**
			 * Construction logic executed during PortalLayout instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "initializer", 251);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 252);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 254);
instance.bindUI();
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "bindUI", 257);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 258);
var instance = this;

				// publishing placeholderAlign event
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 261);
instance.publish(EV_PLACEHOLDER_ALIGN, {
		            defaultFn: instance._defPlaceholderAlign,
		            queuable: false,
		            emitFacade: true,
		            bubbles: true
		        });

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 268);
instance._bindDDEvents();
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 269);
instance._bindDropZones();
			},

			/*
			* Methods
			*/
			addDropNode: function(node, config) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "addDropNode", 275);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 276);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 278);
node = A.one(node);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 280);
if (!DDM.getDrop(node)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 281);
instance.addDropTarget(
						// Do not use DropPlugin to create the DropZones on
                        // this component, the ".drop" namespace is used to check
                        // for the DD.Delegate target nodes
						new A.DD.Drop(
							A.merge(
								{
									bubbleTargets: instance,
									node: node
								},
								config
							)
						)
					);
				}
			},

			addDropTarget: function(drop) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "addDropTarget", 298);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 299);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 301);
drop.addToGroup(
					instance.get(GROUPS)
				);
			},

			alignPlaceholder: function(region, isTarget) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "alignPlaceholder", 306);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 307);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 308);
var placeholder = instance.get(PLACEHOLDER);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 310);
if (!instance.lazyEvents) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 311);
placeholder.show();
				}

				// sync placeholder size
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 315);
instance._syncPlaceholderSize();

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 317);
placeholder.setXY(
					instance.getPlaceholderXY(region, isTarget)
				);
			},

			calculateDirections: function(drag) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "calculateDirections", 322);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 323);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 324);
var lastY = instance.lastY;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 325);
var lastX = instance.lastX;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 327);
var x = drag.lastXY[0];
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 328);
var y = drag.lastXY[1];

				// if the x change
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 331);
if (x != lastX) {
					// set the drag direction
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 333);
instance.XDirection = (x < lastX) ? LEFT : RIGHT;
				}

				// if the y change
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 337);
if (y != lastY) {
					// set the drag direction
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 339);
instance.YDirection = (y < lastY) ? UP : DOWN;
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 342);
instance.lastX = x;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 343);
instance.lastY = y;
			},

			calculateQuadrant: function(drag, drop) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "calculateQuadrant", 346);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 347);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 348);
var quadrant = 1;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 349);
var region = drop.get(NODE).get(REGION);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 350);
var mouseXY = drag.mouseXY;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 351);
var mouseX = mouseXY[0];
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 352);
var mouseY = mouseXY[1];

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 354);
var top = region.top;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 355);
var left = region.left;

				// (region.bottom - top) finds the height of the region
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 358);
var vCenter = top + (region.bottom - top)/2;
				// (region.right - left) finds the width of the region
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 360);
var hCenter = left + (region.right - left)/2;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 362);
if (mouseY < vCenter) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 363);
quadrant = (mouseX > hCenter) ? 1 : 2;
				}
				else {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 366);
quadrant = (mouseX < hCenter) ? 3 : 4;
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 369);
instance.quadrant = quadrant;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 371);
return quadrant;
			},

			getPlaceholderXY: function(region, isTarget) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "getPlaceholderXY", 374);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 375);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 376);
var placeholder = instance.get(PLACEHOLDER);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 377);
var marginBottom = PLACEHOLDER_MARGIN_BOTTOM;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 378);
var marginTop = PLACEHOLDER_MARGIN_TOP;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 380);
if (isTarget) {
					// update the margin values in case of the target placeholder has a different margin
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 382);
marginBottom = PLACEHOLDER_TARGET_MARGIN_BOTTOM;
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 383);
marginTop = PLACEHOLDER_TARGET_MARGIN_TOP;
				}

				// update the className of the placeholder when interact with target (drag/drop) elements
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 387);
placeholder.toggleClass(CSS_DRAG_TARGET_INDICATOR, isTarget);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 389);
var regionBottom = ceil(region.bottom);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 390);
var regionLeft = ceil(region.left);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 391);
var regionTop = ceil(region.top);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 393);
var x = regionLeft;

				// 1 and 2 quadrants are the top quadrants, so align to the region.top when quadrant < 3
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 396);
var y = (instance.quadrant < 3) ?
							(regionTop - (placeholder.get(OFFSET_HEIGHT) + marginBottom)) : (regionBottom + marginTop);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 399);
return [ x, y ];
			},

			removeDropTarget: function(drop) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "removeDropTarget", 402);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 403);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 405);
drop.removeFromGroup(
					instance.get(GROUPS)
				);
			},

			_alignCondition: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_alignCondition", 410);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 411);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 412);
var activeDrag = DDM.activeDrag;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 413);
var activeDrop = instance.activeDrop;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 415);
if (activeDrag && activeDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 416);
var dragNode = activeDrag.get(NODE);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 417);
var dropNode = activeDrop.get(NODE);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 419);
return !dragNode.contains(dropNode);
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 422);
return true;
			},

			_bindDDEvents: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_bindDDEvents", 425);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 426);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 427);
var delegateConfig = instance.get(DELEGATE_CONFIG);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 428);
var proxy = instance.get(PROXY);

				// creating DD.Delegate instance
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 431);
instance.delegate = new A.DD.Delegate(delegateConfig);

				// plugging the DDProxy
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 434);
instance.delegate.dd.plug(A.Plugin.DDProxy, proxy);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 436);
instance.on('drag:end', A.bind(instance._onDragEnd, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 437);
instance.on('drag:enter', A.bind(instance._onDragEnter, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 438);
instance.on('drag:exit', A.bind(instance._onDragExit, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 439);
instance.on('drag:over', A.bind(instance._onDragOver, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 440);
instance.on('drag:start', A.bind(instance._onDragStart, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 441);
instance.after('drag:start', A.bind(instance._afterDragStart, instance));

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 443);
instance.on(EV_QUADRANT_ENTER, instance._syncPlaceholderUI);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 444);
instance.on(EV_QUADRANT_EXIT, instance._syncPlaceholderUI);
			},

			_bindDropZones: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_bindDropZones", 447);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 448);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 449);
var dropNodes = instance.get(DROP_NODES);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 451);
if (dropNodes) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 452);
dropNodes.each(function(node, i) {
						_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "(anonymous 2)", 452);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 453);
instance.addDropNode(node);
					});
				}
			},

			_defPlaceholderAlign: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_defPlaceholderAlign", 458);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 459);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 460);
var activeDrop = instance.activeDrop;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 461);
var placeholder = instance.get(PLACEHOLDER);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 463);
if (activeDrop && placeholder) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 464);
var node = activeDrop.get('node');
					// DD.Delegate use the Drop Plugin on its "target" items. Using Drop Plugin a "node.drop" namespace is created.
					// Using the .drop namespace to detect when the node is also a "target" DD.Delegate node
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 467);
var isTarget = !!node.drop;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 469);
instance.lastAlignDrop = activeDrop;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 471);
instance.alignPlaceholder(
						activeDrop.get(NODE).get(REGION),
						isTarget
					);
				}
			},

			_evOutput: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_evOutput", 478);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 479);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 481);
return {
					drag: DDM.activeDrag,
					drop: instance.activeDrop,
					quadrant: instance.quadrant,
					XDirection: instance.XDirection,
					YDirection: instance.YDirection
				};
			},

			_fireQuadrantEvents: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_fireQuadrantEvents", 490);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 491);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 492);
var evOutput = instance._evOutput();
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 493);
var lastQuadrant = instance.lastQuadrant;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 494);
var quadrant = instance.quadrant;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 496);
if (quadrant != lastQuadrant) {
					// only trigger exit if it has previously entered in any quadrant
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 498);
if (lastQuadrant) {
						// merging event with the "last" information
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 500);
instance.fire(
							EV_QUADRANT_EXIT,
							A.merge(
								{
									lastDrag: instance.lastDrag,
									lastDrop: instance.lastDrop,
									lastQuadrant: instance.lastQuadrant,
									lastXDirection: instance.lastXDirection,
									lastYDirection: instance.lastYDirection
								},
								evOutput
							)
						);
					}

					// firing EV_QUADRANT_ENTER event
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 516);
instance.fire(EV_QUADRANT_ENTER, evOutput);
				}

				// firing EV_QUADRANT_OVER, align event fires like the drag over without bubbling for performance reasons
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 520);
instance.fire(EV_QUADRANT_OVER, evOutput);

				// updating "last" information
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 523);
instance.lastDrag = DDM.activeDrag;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 524);
instance.lastDrop = instance.activeDrop;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 525);
instance.lastQuadrant = quadrant;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 526);
instance.lastXDirection = instance.XDirection;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 527);
instance.lastYDirection = instance.YDirection;
			},

			_getAppendNode: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_getAppendNode", 530);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 531);
return DDM.activeDrag.get(NODE);
			},

			_positionNode: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_positionNode", 534);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 535);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 536);
var activeDrop = instance.lastAlignDrop || instance.activeDrop;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 538);
if (activeDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 539);
var dragNode = instance._getAppendNode();
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 540);
var dropNode = activeDrop.get(NODE);

					// detects if the activeDrop is a dd target (portlet) or a drop area only (column)
					// DD.Delegate use the Drop Plugin on its "target" items. Using Drop Plugin a "node.drop" namespace is created.
					// Using the .drop namespace to detect when the node is also a "target" DD.Delegate node
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 545);
var isTarget = isValue(dropNode.drop);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 546);
var topQuadrants = (instance.quadrant < 3);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 548);
if (instance._alignCondition()) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 549);
if (isTarget) {
							_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 550);
dropNode[ topQuadrants ? PLACE_BEFORE : PLACE_AFTER ](dragNode);
						}
						// interacting with the columns (drop areas only)
						else {
							// find the dropContainer of the dropNode, the default DROP_CONTAINER function returns the dropNode
							_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 555);
var dropContainer = instance.get(DROP_CONTAINER).apply(instance, [dropNode]);

							_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 557);
dropContainer[ topQuadrants ? PREPEND : APPEND ](dragNode);
						}
					}
				}
			},

			_syncPlaceholderUI: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncPlaceholderUI", 563);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 564);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 566);
if (instance._alignCondition()) {
					// firing placeholderAlign event
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 568);
instance.fire(EV_PLACEHOLDER_ALIGN, {
						drop: instance.activeDrop,
						originalEvent: event
					});
				}
			},

			_syncPlaceholderSize: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncPlaceholderSize", 575);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 576);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 577);
var node = instance.activeDrop.get(NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 579);
var placeholder = instance.get(PLACEHOLDER);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 581);
if (placeholder) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 582);
placeholder.set(
						OFFSET_WIDTH,
						node.get(OFFSET_WIDTH)
					);
				}
			},

			_syncProxyNodeUI: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncProxyNodeUI", 589);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 590);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 591);
var dragNode = DDM.activeDrag.get(DRAG_NODE);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 592);
var proxyNode = instance.get(PROXY_NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 594);
if (proxyNode && !proxyNode.compareTo(dragNode)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 595);
dragNode.append(proxyNode);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 597);
instance._syncProxyNodeSize();
				}
			},

			_syncProxyNodeSize: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncProxyNodeSize", 601);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 602);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 603);
var node = DDM.activeDrag.get(NODE);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 604);
var proxyNode = instance.get(PROXY_NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 606);
if (node && proxyNode) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 607);
proxyNode.set(
						OFFSET_HEIGHT,
						node.get(OFFSET_HEIGHT)
					);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 612);
proxyNode.set(
						OFFSET_WIDTH,
						node.get(OFFSET_WIDTH)
					);
				}
			},

			/*
			* Listeners
			*/
			_afterDragStart: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_afterDragStart", 622);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 623);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 625);
if (instance.get(PROXY)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 626);
instance._syncProxyNodeUI(event);
				}
			},

			_onDragEnd: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragEnd", 630);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 631);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 632);
var placeholder = instance.get(PLACEHOLDER);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 633);
var proxyNode = instance.get(PROXY_NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 635);
if (!instance.lazyEvents) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 636);
instance._positionNode(event);
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 639);
if (proxyNode) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 640);
proxyNode.remove();
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 643);
if (placeholder) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 644);
placeholder.hide();
				}

				// reset the last information
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 648);
instance.lastQuadrant = null;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 649);
instance.lastXDirection = null;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 650);
instance.lastYDirection = null;
			},

			// fires after drag:start
			_onDragEnter: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragEnter", 654);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 655);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 657);
instance.activeDrop = DDM.activeDrop;

				// check if lazyEvents is true and if there is a lastActiveDrop
				// the checking for lastActiveDrop prevents fire the _syncPlaceholderUI when quadrant* events fires
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 661);
if (instance.lazyEvents && instance.lastActiveDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 662);
instance.lazyEvents = false;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 664);
instance._syncPlaceholderUI(event);
				}

				// lastActiveDrop is always updated by the drag exit,
				// but if there is no lastActiveDrop update it on drag enter update it
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 669);
if (!instance.lastActiveDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 670);
instance.lastActiveDrop = DDM.activeDrop;
				}
			},

			_onDragExit: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragExit", 674);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 675);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 677);
instance._syncPlaceholderUI(event);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 679);
instance.activeDrop = DDM.activeDrop;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 681);
instance.lastActiveDrop = DDM.activeDrop;
			},

			_onDragOver: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragOver", 684);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 685);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 686);
var drag = event.drag;

				// prevent drag over bubbling, filtering the top most element
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 689);
if (instance.activeDrop == DDM.activeDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 690);
instance.calculateDirections(drag);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 692);
instance.calculateQuadrant(drag, instance.activeDrop);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 694);
instance._fireQuadrantEvents();
				}
			},

			// fires before drag:enter
			_onDragStart: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragStart", 699);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 700);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 702);
if (instance.get(LAZY_START)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 703);
instance.lazyEvents = true;
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 706);
instance.lastActiveDrop = null;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 708);
instance.activeDrop = DDM.activeDrop;
			},

			_setDropNodes: function(val) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_setDropNodes", 711);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 712);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 714);
if (isFunction(val)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 715);
val = val.call(instance);
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 718);
return nodeListSetter(val);
			}
		}
	}
);

_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 724);
A.PortalLayout = PortalLayout;

}, '@VERSION@' ,{requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy'], skinnable:true});
