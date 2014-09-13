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
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-dialog/aui-dialog.js",
    code: []
};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].code=["AUI.add('aui-dialog', function(A) {","/**"," * The Dialog Utility - The Dialog component is an extension of Panel that is"," * meant to emulate the behavior of an dialog window using a floating,"," * draggable HTML element."," *"," * @module aui-dialog"," */","","var Lang = A.Lang,","	AObject = A.Object,","	isBoolean = Lang.isBoolean,","	isArray = Lang.isArray,","	isObject = Lang.isObject,","","	toInt = Lang.toInt,","","	WidgetStdMod = A.WidgetStdMod,","","	DOC = A.config.doc,","","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	BUTTON = 'button',","	BUTTONS = 'buttons',","	CLOSE = 'close',","	CLOSETHICK = 'closethick',","	CONSTRAIN_TO_VIEWPORT = 'constrain2view',","	DD = 'dd',","	DEFAULT = 'default',","	DESTROY_ON_CLOSE = 'destroyOnClose',","	DIALOG = 'dialog',","	DOT = '.',","	DRAG_CONFIG = 'dragConfig',","	DRAG_GUTTER = 5,","	DRAG_INSTANCE = 'dragInstance',","	DRAGGABLE = 'draggable',","	FOOTER_CONTENT = 'footerContent',","	HD = 'hd',","	HEIGHT = 'height',","	ICON = 'icon',","	ICONS = 'icons',","	IO = 'io',","	LOADING = 'loading',","	MODAL = 'modal',","	PROXY = 'proxy',","	RESIZABLE = 'resizable',","	RESIZABLE_CONFIG = 'resizableConfig',","	RESIZABLE_INSTANCE = 'resizableInstance',","	STACK = 'stack',","	USE_ARIA = 'useARIA',","	VIEWPORT_REGION = 'viewportRegion',","	WIDTH = 'width',","","	EV_RESIZE = 'resize:resize',","	EV_RESIZE_END = 'resize:end',","","	getCN = A.getClassName,","","	CSS_DIALOG = getCN(DIALOG),","	CSS_DIALOG_HD = getCN(DIALOG, HD),","	CSS_ICON_LOADING = getCN(ICON, LOADING),","	CSS_PREFIX = getCN(DD),","","	NODE_BLANK_TEXT = DOC.createTextNode('');","","/**"," * <p><img src=\"assets/images/aui-dialog/main.png\"/></p>"," *"," * A base class for Dialog, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Emulate the behavior of an dialog window using a floating, draggable HTML element</li>"," *    <li>Interface for easily gathering information from the user without leaving the underlying page context</li>"," *    <li>Using the <a href=\"IOPlugin.html\">IOPlugin</a>, supports the submission of form data either through an XMLHttpRequest, through a normal form submission, or through a fully script-based response</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.Dialog({"," *  bodyContent: 'Dialog body',"," *  centered: true,"," *  constrain2view: true,"," *  destroyOnClose: true,"," *  draggable: true,"," *  height: 250,"," *  resizable: false,"," *  stack: true,"," *  title: 'Dialog title',"," *  width: 500"," *  }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"Dialog.html#configattributes\">Configuration Attributes</a> available for"," * Dialog."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class Dialog"," * @constructor"," * @extends Panel"," * @uses WidgetPosition"," * @uses WidgetStack"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," */","var Dialog = function(config) {","	if (!A.DialogMask) {","		A.DialogMask = new A.OverlayMask(","			{","				visible: true","			}","		).render();","	}","};","","A.mix(","	Dialog,","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property Dialog.NAME","		 * @type String","		 * @static","		 */","		NAME: DIALOG,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the Dialog.","		 *","		 * @property Dialog.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * See <a href=\"WidgetStdMod.html#config_bodyContent\">WidgetStdMod bodyContent</a>.","			 *","			 * @attribute bodyContent","			 * @default HTMLTextNode","			 * @type Node | String","			 */","			bodyContent: {","				value: NODE_BLANK_TEXT","			},","","			/**","			 * <p>Array of object literals, each containing a set of properties","			 * defining a button to be appended into the Dialog's footer. Each","			 * button object in the buttons array can have two properties:</p>","			 *","			 * <dl>","			 *    <dt>text:</dt>","			 *    <dd>","			 *        The text that will display on the face of the button. The text can include","			 *        HTML, as long as it is compliant with HTML Button specifications.","			 *    </dd>","			 *    <dt>handler:</dt>","			 *    <dd>","			 *        A reference to a function that should fire when the button is clicked.","			 *        (In this case scope of this function is always its Dialog instance.)","			 *    </dd>","			 * </dl>","			 *","			 * @attribute buttons","			 * @default []","			 * @type Array","			 */","			buttons: {","				value: [],","				validator: isArray","			},","","			/**","			 * If <code>true</code> the close icon will be displayed on the","			 * Dialog header.","			 *","			 * @attribute close","			 * @default true","			 * @type boolean","			 */","			close: {","				value: true","			},","","			/**","			 * Will attempt to constrain the dialog to the boundaries of the","			 * viewport region.","			 *","			 * @attribute constrain2view","			 * @type Object","			 */","			constrain2view: {","				setter: '_setConstrain2view',","				value: false,","				validator: isBoolean","			},","","			/**","			 * Invoke the <a href=\"Dialog.html#method_destroy\">destroy</a>","			 * method when the dialog is closed (i.e., remove the Dialog","			 * <code>boundingBox</code> from the body, purge events etc).","			 *","			 * @attribute destroyOnClose","			 * @default false","			 * @type boolean","			 */","			destroyOnClose: {","				value: false,","				validator: isBoolean","			},","","			/**","			 * Boolean specifying if the Panel should be draggable.","			 *","			 * @attribute draggable","			 * @default true","			 * @type boolean","			 */","			draggable: {","				value: true","			},","","			/**","			 * Drag configuration.","			 *","			 * @attribute dragConfig","			 * @type {}","			 */","			dragConfig: {","				setter: function(val) {","					var instance = this;","","					return A.merge(","						{","							bubbleTargets: instance,","							node: instance.get(BOUNDING_BOX),","							handles: [ DOT + CSS_DIALOG_HD ]","						},","						val || {}","					);","				},","				writeOnce: true,","				value: {},","				validator: isObject","			},","","			/**","			 * Stores the Drag instance for the <code>A.DD.Drag</code> used by","			 * this Dialog.","			 *","			 * @attribute dragInstance","			 * @default null","			 * @type A.DD.Drag","			 */","			dragInstance: {","				setter: '_setDragInstance',","				value: null","			},","","			/**","			 * True if the Panel should be displayed in a modal fashion,","			 * automatically creating a transparent mask over the document that","			 * will not be removed until the Dialog is dismissed. Uses","			 * <a href=\"OverlayMask.html\">OverlayMask</a>.","			 *","			 * @attribute modal","			 * @default false","			 * @type boolean","			 */","			modal: {","				lazyAdd: false,","				validator: isBoolean,","				value: false","			},","","			/**","			 * Resize configuration.","			 *","			 * @attribute resizableConfig","			 * @type {}","			 */","			resizableConfig: {","				setter: function(val) {","					var instance = this;","","					return A.merge(","						{","							bubbleTargets: instance,","							handles: 'r,br,b',","							minHeight: 100,","							minWidth: 200,","							constrain2view: true,","							node: instance.get(BOUNDING_BOX),","							proxy: true,","							after: {","								end: A.bind(instance._syncResizableDimentions, instance),","								resize: A.bind(instance._syncResizableDimentions, instance)","							}","						},","						val || {}","					);","				},","				writeOnce: true,","				value: {},","				validator: isObject","			},","","			/**","			 * Stores the Resize instance for the <code>A.Resize</code> used by","			 * this Dialog.","			 *","			 * @attribute resizableInstance","			 * @default null","			 * @type A.DD.Drag","			 */","			resizableInstance: {","				setter: '_setResizableInstance',","				value: null","			},","","			/**","			 * Boolean specifying if the Panel should be resizable.","			 *","			 * @attribute resizable","			 * @default true","			 * @type boolean","			 */","			resizable: {","				value: true","			},","","			/**","			 * If <code>true</code> give stacking habilities to the Dialog.","			 *","			 * @attribute stack","			 * @default true","			 * @type boolean","			 */","			stack: {","				value: true,","				setter: function(v) {","					return this._setStack(v);","				},","				validator: isBoolean","			},","","			/**","			 * @attribute strings","			 * @description Collection of strings used to label elements of the Dialog's UI.","			 * @default null","			 * @type Object","			 */","			strings: {","				value: {","					close: 'Close dialog'","				}","			}","		}","	}",");","","Dialog.prototype = {","	/**","	 * Construction logic executed during Dialog instantiation. Lifecycle.","	 *","	 * @method initializer","	 * @protected","	 */","	initializer: function(config) {","		var instance = this;","","		var icons = instance.get(ICONS);","		var close = instance.get(CLOSE);","		var buttons = instance.get(BUTTONS);","","		if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {","			instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);","		}","","		if (close) {","			var closeId = A.guid();","","			var closeConfig = {","				icon: CLOSETHICK,","				id: closeId,","				handler: {","					fn: instance.close,","					context: instance","				},","				title: instance.get('strings').close","			};","","			if (icons) {","				icons.push(closeConfig);","			}","","			instance.set(ICONS, icons);","","			instance._closeId = closeId;","		}","","		instance.publish(","			'close',","			{","				defaultFn: instance._close","			}","		);","","		instance.addTarget(A.DialogManager);","","		instance.after('constrain2viewChange', instance._afterConstrain2viewChange);","		instance.after('drag:start', instance._afterDragStart);","		instance.after('draggableChange', instance._afterDraggableChange);","		instance.after('dragInstanceChange', instance._afterDragInstanceChange);","		instance.after('render', instance._afterRenderer);","		instance.after('resizableChange', instance._afterResizableChange);","		instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);","	},","","	/**","	 * Bind the events on the Dialog UI. Lifecycle.","	 *","	 * @method bindUI","	 * @protected","	 */","	bindUI: function() {","		var instance = this;","","		instance._bindLazyComponents();","	},","","	/**","	 * Refreshes the rendered UI, based on Widget State","	 *","	 * @method syncUI","	 * @protected","	 *","	 */","	syncUI: function() {","		var instance = this;","","		if (instance.get(USE_ARIA)) {","			instance.plug(A.Plugin.Aria, {","				attributes: {","					visible: {","						ariaName: 'hidden',","						format: function(value) {","							return !value;","						}","					}","				}","			});","		}","	},","","	/**","	 * Descructor lifecycle implementation for the Dialog class.","	 * Purges events attached to the node (and all child nodes).","	 *","	 * @method destructor","	 * @protected","	 */","	destructor: function() {","		var instance = this;","","		var boundingBox = instance.get(BOUNDING_BOX);","","		A.Event.purgeElement(boundingBox, true);","		A.DialogManager.remove(instance);","	},","","	/**","	 * Aligns the Dialog to the viewport.","	 *","	 * @method alignToViewport","	 * @param int offsetLeft An offset number to be added to the left coordinate value.","	 * @param int offsetTop An offset number to be added to the top coordinate value.","	 */","	alignToViewport: function(offsetLeft, offsetTop) {","		var instance = this;","","		var viewportRegion = A.getDoc().get(VIEWPORT_REGION);","","		instance.move([ viewportRegion.left + toInt(offsetLeft), viewportRegion.top + toInt(offsetTop) ]);","	},","","	/**","	 * Bind a <code>mouseenter</code> listener to the <code>boundingBox</code>","	 * to invoke the","	 * <a href=\"Dialog.html#config__initLazyComponents\">_initLazyComponents</a>.","	 * Performance reasons.","	 *","	 * @method _bindLazyComponents","	 * @private","	 */","	_bindLazyComponents: function() {","		var instance = this;","","		var boundingBox = instance.get(BOUNDING_BOX);","","		boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));","	},","","	/**","	 * Fires the close event to close the Dialog.","	 *","	 * @method close","	 */","	close: function() {","		var instance = this;","","		instance.fire('close');","	},","","	/**","	 * Fires after the render phase. Invoke","	 * <a href=\"Dialog.html#method__initButtons\">_initButtons</a>.","	 *","	 * @method _afterRenderer","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterRenderer: function(event) {","		var instance = this;","","		instance._initButtons();","","		// forcing lazyAdd:true attrs call the setter","		instance.get(STACK);","		instance.get(IO);","	},","","	/**","	 * Handles the close event logic.","	 *","	 * @method _handleEvent","	 * @param {EventFacade} event close event facade","	 * @protected","	 */","	_close: function() {","		var instance = this;","","		if (instance.get(DESTROY_ON_CLOSE)) {","			instance.destroy();","		}","		else {","			instance.hide();","		}","	},","","	/**","	 * Render the buttons on the footer of the Dialog.","	 *","	 * @method _initButtons","	 * @protected","	 */","	_initButtons: function() {","		var instance = this;","","		var buttons = instance.get(BUTTONS);","","		if (buttons.length) {","			var footerButtons = new A.Toolbar(","				{","					children: buttons","				}","			);","","			footerButtons._DEFAULT_CONTEXT = instance;","","			footerButtons.render(instance.footerNode);","","			instance.fire('contentUpdate');","","			instance.buttons = footerButtons;","		}","	},","","	/**","	 * Forces <code>lazyAdd:true</code> attributtes invoke the setter methods.","	 *","	 * @method _initLazyComponents","	 * @private","	 */","	_initLazyComponents: function() {","		var instance = this;","","		// forcing lazyAdd:true attrs call the setter","		instance.get(DRAG_INSTANCE);","		instance.get(RESIZABLE_INSTANCE);","	},","","	/**","	 * Set default ARIA roles and attributes.","	 * @method _setDefaultARIAValues","	 * @protected","	 */","	_setDefaultARIAValues: function() {","		var instance = this;","","		var icons = instance.icons;","","		if (!instance.get(USE_ARIA)) {","			return;","		}","","		instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));","","		if (icons) {","			var closeThick = icons.item(instance._closeId) || null;","","			if (closeThick){","				instance.aria.setAttribute('controls', instance.get('id'), closeThick.get(BOUNDING_BOX));","			}","		}","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_draggable\">draggable</a> attribute.","	 *","	 * @method _setDragInstance","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setDragInstance: function(val) {","		var instance = this;","","		if (instance.get(DRAGGABLE)) {","			val = new A.DD.Drag(","				instance.get(DRAG_CONFIG)","			);","","			instance._updateDDConstrain2view(val);","		}","","		return val;","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_resizable\">resizable</a> attribute.","	 *","	 * @method _setResizableInstance","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setResizableInstance: function(val) {","		var instance = this;","","		if (instance.get(RESIZABLE)) {","			val = new A.Resize(","				instance.get(RESIZABLE_CONFIG)","			);","		}","","		return val;","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_stack\">stack</a>","	 * attribute.","	 *","	 * @method _setStack","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setStack: function(value) {","		var instance = this;","","		if (value) {","			A.DialogManager.register(instance);","		}","		else {","			A.DialogManager.remove(instance);","		}","","		return value;","	},","","	/**","	 * Sync dialog dimentions based on resizable end and resize events.","	 *","	 * @method _syncResizableDimentions","	 * @param {EventFacade} Resizable event","	 * @protected","	 */","	_syncResizableDimentions: function(event) {","		var instance = this;","","		var type = event.type;","		var info = event.info;","","		if ((type === EV_RESIZE_END) ||","			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {","				instance.set(HEIGHT, info.offsetHeight);","				instance.set(WIDTH, info.offsetWidth);","		}","	},","","	/**","	 * Set A.Plugin.DDConstrained constrain2view property to false or true","	 * depending on the value of constrain2view attribute.","	 *","	 * @param {A.DD.Drag} dragInstance","	 * @protected","	 */","	_updateDDConstrain2view: function(dragInstance) {","		var instance = this;","","		dragInstance.plug(","			A.Plugin.DDConstrained,","			{","				constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)","			}","		);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_constrain2view\">constrain2view</a> attribute change.","	 *","	 * @method _afterConstrain2viewChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterConstrain2viewChange: function(event) {","		var instance = this;","","		instance._updateDDConstrain2view(","			instance.get(DRAG_INSTANCE)","		);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_draggable\">draggable</a> attribute change.","	 *","	 * @method _afterDraggableChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDraggableChange: function(event) {","		var instance = this;","","		instance.set(DRAG_INSTANCE, null);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_dragInstance\">dragInstance</a> attribute change.","	 *","	 * @method _afterDragInstanceChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDragInstanceChange: function(event) {","		var instance = this;","","		if (event.prevVal) {","			event.prevVal.destroy();","		}","	},","","	/**","	 * Handles the drag start event","	 * If \"constrain2view\" property is set to false this function will constrain the dialog to a region","	 * in order to prevent moving it to unreachable position","	 *","	 * @method _afterDragStart","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDragStart: function(event) {","		var instance = this;","","		var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);","","		if (!constrain2view) {","			var dragInstance = instance.get(DRAG_INSTANCE);","","			var dragNode = dragInstance.get('dragNode');","","			var viewportRegion = dragNode.get('viewportRegion');","","			var dragNodeRegion = dragNode.get('region');","","			var defaultOffset = [0, 0];","","			var deltaXY = dragInstance.deltaXY || defaultOffset;","","			var mouseXY = dragInstance.mouseXY || defaultOffset;","","			dragInstance.plug(","				A.Plugin.DDConstrained,","				{","					constrain: {","						bottom: viewportRegion.bottom + (dragNodeRegion.height - deltaXY[1]) - DRAG_GUTTER,","						left: viewportRegion.left - deltaXY[0] + DRAG_GUTTER,","						right: viewportRegion.right + (dragNodeRegion.right - mouseXY[0]) + DRAG_GUTTER,","						top: viewportRegion.top - deltaXY[1] + DRAG_GUTTER","					}","				}","			);","		}","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_resizable\">resizable</a> attribute change.","	 *","	 * @method _afterResizableChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterResizableChange: function(event) {","		var instance = this;","","		instance.set(RESIZABLE_INSTANCE, null);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_resizableInstance\">resizableInstance</a> attribute change.","	 *","	 * @method _afterResizableInstanceChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterResizableInstanceChange: function(event) {","		var instance = this;","","		if (event.prevVal) {","			event.prevVal.destroy();","		}","	}","};","","A.Dialog = A.Component.create(","	{","		NAME: DIALOG,","		EXTENDS: A.Panel,","		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain]","	}",");","","/**"," * A base class for DialogManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class DialogManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","","var DialogManager = new A.OverlayManager(","	{","		zIndexBase: 1000","	}",");","","var MODALS = {};","","DialogManager._MODALS = MODALS;","","DialogManager.after(","	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],","	function(event) {","		var dialog = event.target;","","		if (dialog) {","			var id = dialog.get('id');","","			if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {","				MODALS[id] = true;","","				A.DialogMask.show();","			}","			else {","				delete MODALS[id];","","				if (AObject.isEmpty(MODALS)) {","					A.DialogMask.hide();","				}","			}","		}","	}",");","","A.mix(","	DialogManager,","	{","		/**","		 * Find the <a href=\"Widget.html\">Widget</a> instance based on a child","		 * element.","		 *","		 * @method findByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 * @return {Widget}","		 */","		findByChild: function(child) {","			return A.Widget.getByNode(","				A.one(child).ancestor(DOT + CSS_DIALOG, true)","			);","		},","","		/**","		 * <p>Invoke the <a href=\"Dialog.html#method_close\">close</a> method from","		 * the Dialog which contains the <code>child</code> element.</p>","		 *","		 * Example:","		 *","		 * <pre><code>A.DialogManager.closeByChild('#dialogContent1');</code></pre>","		 *","		 * @method closeByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 * @return {Dialog}","		 */","		closeByChild: function(child) {","			return DialogManager.findByChild(child).close();","		},","","		/**","		 * <p>Invoke the <a href=\"IOPlugin.html#method_start\">start</a> method","		 * from the <a href=\"IOPlugin.html\">IOPlugin</a> plugged on this Dialog","		 * instance. If there is no IOPlugin plugged it does nothing.</p>","		 *","		 * Example:","		 *","		 * <pre><code>A.DialogManager.refreshByChild('#dialogContent1');</code></pre>","		 *","		 * @method refreshByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 */","		refreshByChild: function(child) {","			var dialog = DialogManager.findByChild(child);","","			if (dialog && dialog.io) {","				dialog.io.start();","			}","		}","	}",");","","A.DialogManager = DialogManager;","","/**"," * A base class for DialogMask - Controls the <a"," * href=\"Dialog.html#config_modal\">modal</a> attribute."," *"," * @class DialogMask"," * @constructor"," * @extends OverlayMask"," * @static"," */","","}, '@VERSION@' ,{requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true});"];
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].lines = {"1":0,"10":0,"107":0,"108":0,"109":0,"117":0,"234":0,"236":0,"287":0,"289":0,"345":0,"365":0,"373":0,"375":0,"376":0,"377":0,"379":0,"380":0,"383":0,"384":0,"386":0,"396":0,"397":0,"400":0,"402":0,"405":0,"412":0,"414":0,"415":0,"416":0,"417":0,"418":0,"419":0,"420":0,"430":0,"432":0,"443":0,"445":0,"446":0,"451":0,"467":0,"469":0,"471":0,"472":0,"483":0,"485":0,"487":0,"500":0,"502":0,"504":0,"513":0,"515":0,"527":0,"529":0,"532":0,"533":0,"544":0,"546":0,"547":0,"550":0,"561":0,"563":0,"565":0,"566":0,"572":0,"574":0,"576":0,"578":0,"589":0,"592":0,"593":0,"602":0,"604":0,"606":0,"607":0,"610":0,"612":0,"613":0,"615":0,"616":0,"630":0,"632":0,"633":0,"637":0,"640":0,"652":0,"654":0,"655":0,"660":0,"673":0,"675":0,"676":0,"679":0,"682":0,"693":0,"695":0,"696":0,"698":0,"700":0,"701":0,"713":0,"715":0,"732":0,"734":0,"748":0,"750":0,"762":0,"764":0,"765":0,"779":0,"781":0,"783":0,"784":0,"786":0,"788":0,"790":0,"792":0,"794":0,"796":0,"798":0,"821":0,"823":0,"835":0,"837":0,"838":0,"843":0,"862":0,"868":0,"870":0,"872":0,"875":0,"877":0,"878":0,"880":0,"881":0,"883":0,"886":0,"888":0,"889":0,"896":0,"909":0,"928":0,"945":0,"947":0,"948":0,"954":0};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].functions = {"Dialog:107":0,"setter:233":0,"setter:286":0,"setter:344":0,"initializer:372":0,"bindUI:429":0,"format:450":0,"syncUI:442":0,"destructor:466":0,"alignToViewport:482":0,"_bindLazyComponents:499":0,"close:512":0,"_afterRenderer:526":0,"_close:543":0,"_initButtons:560":0,"_initLazyComponents:588":0,"_setDefaultARIAValues:601":0,"_setDragInstance:629":0,"_setResizableInstance:651":0,"_setStack:672":0,"_syncResizableDimentions:692":0,"_updateDDConstrain2view:712":0,"_afterConstrain2viewChange:731":0,"_afterDraggableChange:747":0,"_afterDragInstanceChange:761":0,"_afterDragStart:778":0,"_afterResizableChange:820":0,"_afterResizableInstanceChange:834":0,"(anonymous 2):874":0,"findByChild:908":0,"closeByChild:927":0,"refreshByChild:944":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].coveredLines = 146;
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].coveredFunctions = 33;
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1);
AUI.add('aui-dialog', function(A) {
/**
 * The Dialog Utility - The Dialog component is an extension of Panel that is
 * meant to emulate the behavior of an dialog window using a floating,
 * draggable HTML element.
 *
 * @module aui-dialog
 */

_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 10);
var Lang = A.Lang,
	AObject = A.Object,
	isBoolean = Lang.isBoolean,
	isArray = Lang.isArray,
	isObject = Lang.isObject,

	toInt = Lang.toInt,

	WidgetStdMod = A.WidgetStdMod,

	DOC = A.config.doc,

	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	CLOSE = 'close',
	CLOSETHICK = 'closethick',
	CONSTRAIN_TO_VIEWPORT = 'constrain2view',
	DD = 'dd',
	DEFAULT = 'default',
	DESTROY_ON_CLOSE = 'destroyOnClose',
	DIALOG = 'dialog',
	DOT = '.',
	DRAG_CONFIG = 'dragConfig',
	DRAG_GUTTER = 5,
	DRAG_INSTANCE = 'dragInstance',
	DRAGGABLE = 'draggable',
	FOOTER_CONTENT = 'footerContent',
	HD = 'hd',
	HEIGHT = 'height',
	ICON = 'icon',
	ICONS = 'icons',
	IO = 'io',
	LOADING = 'loading',
	MODAL = 'modal',
	PROXY = 'proxy',
	RESIZABLE = 'resizable',
	RESIZABLE_CONFIG = 'resizableConfig',
	RESIZABLE_INSTANCE = 'resizableInstance',
	STACK = 'stack',
	USE_ARIA = 'useARIA',
	VIEWPORT_REGION = 'viewportRegion',
	WIDTH = 'width',

	EV_RESIZE = 'resize:resize',
	EV_RESIZE_END = 'resize:end',

	getCN = A.getClassName,

	CSS_DIALOG = getCN(DIALOG),
	CSS_DIALOG_HD = getCN(DIALOG, HD),
	CSS_ICON_LOADING = getCN(ICON, LOADING),
	CSS_PREFIX = getCN(DD),

	NODE_BLANK_TEXT = DOC.createTextNode('');

/**
 * <p><img src="assets/images/aui-dialog/main.png"/></p>
 *
 * A base class for Dialog, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Emulate the behavior of an dialog window using a floating, draggable HTML element</li>
 *    <li>Interface for easily gathering information from the user without leaving the underlying page context</li>
 *    <li>Using the <a href="IOPlugin.html">IOPlugin</a>, supports the submission of form data either through an XMLHttpRequest, through a normal form submission, or through a fully script-based response</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.Dialog({
 *  bodyContent: 'Dialog body',
 *  centered: true,
 *  constrain2view: true,
 *  destroyOnClose: true,
 *  draggable: true,
 *  height: 250,
 *  resizable: false,
 *  stack: true,
 *  title: 'Dialog title',
 *  width: 500
 *  }).render();
 * </code></pre>
 *
 * Check the list of <a href="Dialog.html#configattributes">Configuration Attributes</a> available for
 * Dialog.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Dialog
 * @constructor
 * @extends Panel
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 */
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 107);
var Dialog = function(config) {
	_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "Dialog", 107);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 108);
if (!A.DialogMask) {
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 109);
A.DialogMask = new A.OverlayMask(
			{
				visible: true
			}
		).render();
	}
};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 117);
A.mix(
	Dialog,
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Dialog.NAME
		 * @type String
		 * @static
		 */
		NAME: DIALOG,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Dialog.
		 *
		 * @property Dialog.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * See <a href="WidgetStdMod.html#config_bodyContent">WidgetStdMod bodyContent</a>.
			 *
			 * @attribute bodyContent
			 * @default HTMLTextNode
			 * @type Node | String
			 */
			bodyContent: {
				value: NODE_BLANK_TEXT
			},

			/**
			 * <p>Array of object literals, each containing a set of properties
			 * defining a button to be appended into the Dialog's footer. Each
			 * button object in the buttons array can have two properties:</p>
			 *
			 * <dl>
			 *    <dt>text:</dt>
			 *    <dd>
			 *        The text that will display on the face of the button. The text can include
			 *        HTML, as long as it is compliant with HTML Button specifications.
			 *    </dd>
			 *    <dt>handler:</dt>
			 *    <dd>
			 *        A reference to a function that should fire when the button is clicked.
			 *        (In this case scope of this function is always its Dialog instance.)
			 *    </dd>
			 * </dl>
			 *
			 * @attribute buttons
			 * @default []
			 * @type Array
			 */
			buttons: {
				value: [],
				validator: isArray
			},

			/**
			 * If <code>true</code> the close icon will be displayed on the
			 * Dialog header.
			 *
			 * @attribute close
			 * @default true
			 * @type boolean
			 */
			close: {
				value: true
			},

			/**
			 * Will attempt to constrain the dialog to the boundaries of the
			 * viewport region.
			 *
			 * @attribute constrain2view
			 * @type Object
			 */
			constrain2view: {
				setter: '_setConstrain2view',
				value: false,
				validator: isBoolean
			},

			/**
			 * Invoke the <a href="Dialog.html#method_destroy">destroy</a>
			 * method when the dialog is closed (i.e., remove the Dialog
			 * <code>boundingBox</code> from the body, purge events etc).
			 *
			 * @attribute destroyOnClose
			 * @default false
			 * @type boolean
			 */
			destroyOnClose: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Boolean specifying if the Panel should be draggable.
			 *
			 * @attribute draggable
			 * @default true
			 * @type boolean
			 */
			draggable: {
				value: true
			},

			/**
			 * Drag configuration.
			 *
			 * @attribute dragConfig
			 * @type {}
			 */
			dragConfig: {
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 233);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 234);
var instance = this;

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 236);
return A.merge(
						{
							bubbleTargets: instance,
							node: instance.get(BOUNDING_BOX),
							handles: [ DOT + CSS_DIALOG_HD ]
						},
						val || {}
					);
				},
				writeOnce: true,
				value: {},
				validator: isObject
			},

			/**
			 * Stores the Drag instance for the <code>A.DD.Drag</code> used by
			 * this Dialog.
			 *
			 * @attribute dragInstance
			 * @default null
			 * @type A.DD.Drag
			 */
			dragInstance: {
				setter: '_setDragInstance',
				value: null
			},

			/**
			 * True if the Panel should be displayed in a modal fashion,
			 * automatically creating a transparent mask over the document that
			 * will not be removed until the Dialog is dismissed. Uses
			 * <a href="OverlayMask.html">OverlayMask</a>.
			 *
			 * @attribute modal
			 * @default false
			 * @type boolean
			 */
			modal: {
				lazyAdd: false,
				validator: isBoolean,
				value: false
			},

			/**
			 * Resize configuration.
			 *
			 * @attribute resizableConfig
			 * @type {}
			 */
			resizableConfig: {
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 286);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 287);
var instance = this;

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 289);
return A.merge(
						{
							bubbleTargets: instance,
							handles: 'r,br,b',
							minHeight: 100,
							minWidth: 200,
							constrain2view: true,
							node: instance.get(BOUNDING_BOX),
							proxy: true,
							after: {
								end: A.bind(instance._syncResizableDimentions, instance),
								resize: A.bind(instance._syncResizableDimentions, instance)
							}
						},
						val || {}
					);
				},
				writeOnce: true,
				value: {},
				validator: isObject
			},

			/**
			 * Stores the Resize instance for the <code>A.Resize</code> used by
			 * this Dialog.
			 *
			 * @attribute resizableInstance
			 * @default null
			 * @type A.DD.Drag
			 */
			resizableInstance: {
				setter: '_setResizableInstance',
				value: null
			},

			/**
			 * Boolean specifying if the Panel should be resizable.
			 *
			 * @attribute resizable
			 * @default true
			 * @type boolean
			 */
			resizable: {
				value: true
			},

			/**
			 * If <code>true</code> give stacking habilities to the Dialog.
			 *
			 * @attribute stack
			 * @default true
			 * @type boolean
			 */
			stack: {
				value: true,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 344);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 345);
return this._setStack(v);
				},
				validator: isBoolean
			},

			/**
			 * @attribute strings
			 * @description Collection of strings used to label elements of the Dialog's UI.
			 * @default null
			 * @type Object
			 */
			strings: {
				value: {
					close: 'Close dialog'
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 365);
Dialog.prototype = {
	/**
	 * Construction logic executed during Dialog instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "initializer", 372);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 373);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 375);
var icons = instance.get(ICONS);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 376);
var close = instance.get(CLOSE);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 377);
var buttons = instance.get(BUTTONS);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 379);
if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 380);
instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 383);
if (close) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 384);
var closeId = A.guid();

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 386);
var closeConfig = {
				icon: CLOSETHICK,
				id: closeId,
				handler: {
					fn: instance.close,
					context: instance
				},
				title: instance.get('strings').close
			};

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 396);
if (icons) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 397);
icons.push(closeConfig);
			}

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 400);
instance.set(ICONS, icons);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 402);
instance._closeId = closeId;
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 405);
instance.publish(
			'close',
			{
				defaultFn: instance._close
			}
		);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 412);
instance.addTarget(A.DialogManager);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 414);
instance.after('constrain2viewChange', instance._afterConstrain2viewChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 415);
instance.after('drag:start', instance._afterDragStart);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 416);
instance.after('draggableChange', instance._afterDraggableChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 417);
instance.after('dragInstanceChange', instance._afterDragInstanceChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 418);
instance.after('render', instance._afterRenderer);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 419);
instance.after('resizableChange', instance._afterResizableChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 420);
instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);
	},

	/**
	 * Bind the events on the Dialog UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "bindUI", 429);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 430);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 432);
instance._bindLazyComponents();
	},

	/**
	 * Refreshes the rendered UI, based on Widget State
	 *
	 * @method syncUI
	 * @protected
	 *
	 */
	syncUI: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "syncUI", 442);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 443);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 445);
if (instance.get(USE_ARIA)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 446);
instance.plug(A.Plugin.Aria, {
				attributes: {
					visible: {
						ariaName: 'hidden',
						format: function(value) {
							_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "format", 450);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 451);
return !value;
						}
					}
				}
			});
		}
	},

	/**
	 * Descructor lifecycle implementation for the Dialog class.
	 * Purges events attached to the node (and all child nodes).
	 *
	 * @method destructor
	 * @protected
	 */
	destructor: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "destructor", 466);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 467);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 469);
var boundingBox = instance.get(BOUNDING_BOX);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 471);
A.Event.purgeElement(boundingBox, true);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 472);
A.DialogManager.remove(instance);
	},

	/**
	 * Aligns the Dialog to the viewport.
	 *
	 * @method alignToViewport
	 * @param int offsetLeft An offset number to be added to the left coordinate value.
	 * @param int offsetTop An offset number to be added to the top coordinate value.
	 */
	alignToViewport: function(offsetLeft, offsetTop) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "alignToViewport", 482);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 483);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 485);
var viewportRegion = A.getDoc().get(VIEWPORT_REGION);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 487);
instance.move([ viewportRegion.left + toInt(offsetLeft), viewportRegion.top + toInt(offsetTop) ]);
	},

	/**
	 * Bind a <code>mouseenter</code> listener to the <code>boundingBox</code>
	 * to invoke the
	 * <a href="Dialog.html#config__initLazyComponents">_initLazyComponents</a>.
	 * Performance reasons.
	 *
	 * @method _bindLazyComponents
	 * @private
	 */
	_bindLazyComponents: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_bindLazyComponents", 499);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 500);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 502);
var boundingBox = instance.get(BOUNDING_BOX);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 504);
boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));
	},

	/**
	 * Fires the close event to close the Dialog.
	 *
	 * @method close
	 */
	close: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "close", 512);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 513);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 515);
instance.fire('close');
	},

	/**
	 * Fires after the render phase. Invoke
	 * <a href="Dialog.html#method__initButtons">_initButtons</a>.
	 *
	 * @method _afterRenderer
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterRenderer: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterRenderer", 526);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 527);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 529);
instance._initButtons();

		// forcing lazyAdd:true attrs call the setter
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 532);
instance.get(STACK);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 533);
instance.get(IO);
	},

	/**
	 * Handles the close event logic.
	 *
	 * @method _handleEvent
	 * @param {EventFacade} event close event facade
	 * @protected
	 */
	_close: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_close", 543);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 544);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 546);
if (instance.get(DESTROY_ON_CLOSE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 547);
instance.destroy();
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 550);
instance.hide();
		}
	},

	/**
	 * Render the buttons on the footer of the Dialog.
	 *
	 * @method _initButtons
	 * @protected
	 */
	_initButtons: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_initButtons", 560);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 561);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 563);
var buttons = instance.get(BUTTONS);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 565);
if (buttons.length) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 566);
var footerButtons = new A.Toolbar(
				{
					children: buttons
				}
			);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 572);
footerButtons._DEFAULT_CONTEXT = instance;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 574);
footerButtons.render(instance.footerNode);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 576);
instance.fire('contentUpdate');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 578);
instance.buttons = footerButtons;
		}
	},

	/**
	 * Forces <code>lazyAdd:true</code> attributtes invoke the setter methods.
	 *
	 * @method _initLazyComponents
	 * @private
	 */
	_initLazyComponents: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_initLazyComponents", 588);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 589);
var instance = this;

		// forcing lazyAdd:true attrs call the setter
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 592);
instance.get(DRAG_INSTANCE);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 593);
instance.get(RESIZABLE_INSTANCE);
	},

	/**
	 * Set default ARIA roles and attributes.
	 * @method _setDefaultARIAValues
	 * @protected
	 */
	_setDefaultARIAValues: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setDefaultARIAValues", 601);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 602);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 604);
var icons = instance.icons;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 606);
if (!instance.get(USE_ARIA)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 607);
return;
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 610);
instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 612);
if (icons) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 613);
var closeThick = icons.item(instance._closeId) || null;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 615);
if (closeThick){
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 616);
instance.aria.setAttribute('controls', instance.get('id'), closeThick.get(BOUNDING_BOX));
			}
		}
	},

	/**
	 * Setter for the <a href="Dialog.html#config_draggable">draggable</a> attribute.
	 *
	 * @method _setDragInstance
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setDragInstance: function(val) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setDragInstance", 629);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 630);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 632);
if (instance.get(DRAGGABLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 633);
val = new A.DD.Drag(
				instance.get(DRAG_CONFIG)
			);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 637);
instance._updateDDConstrain2view(val);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 640);
return val;
	},

	/**
	 * Setter for the <a href="Dialog.html#config_resizable">resizable</a> attribute.
	 *
	 * @method _setResizableInstance
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setResizableInstance: function(val) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setResizableInstance", 651);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 652);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 654);
if (instance.get(RESIZABLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 655);
val = new A.Resize(
				instance.get(RESIZABLE_CONFIG)
			);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 660);
return val;
	},

	/**
	 * Setter for the <a href="Dialog.html#config_stack">stack</a>
	 * attribute.
	 *
	 * @method _setStack
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setStack: function(value) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setStack", 672);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 673);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 675);
if (value) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 676);
A.DialogManager.register(instance);
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 679);
A.DialogManager.remove(instance);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 682);
return value;
	},

	/**
	 * Sync dialog dimentions based on resizable end and resize events.
	 *
	 * @method _syncResizableDimentions
	 * @param {EventFacade} Resizable event
	 * @protected
	 */
	_syncResizableDimentions: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_syncResizableDimentions", 692);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 693);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 695);
var type = event.type;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 696);
var info = event.info;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 698);
if ((type === EV_RESIZE_END) ||
			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 700);
instance.set(HEIGHT, info.offsetHeight);
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 701);
instance.set(WIDTH, info.offsetWidth);
		}
	},

	/**
	 * Set A.Plugin.DDConstrained constrain2view property to false or true
	 * depending on the value of constrain2view attribute.
	 *
	 * @param {A.DD.Drag} dragInstance
	 * @protected
	 */
	_updateDDConstrain2view: function(dragInstance) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_updateDDConstrain2view", 712);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 713);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 715);
dragInstance.plug(
			A.Plugin.DDConstrained,
			{
				constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)
			}
		);
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_constrain2view">constrain2view</a> attribute change.
	 *
	 * @method _afterConstrain2viewChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterConstrain2viewChange: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterConstrain2viewChange", 731);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 732);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 734);
instance._updateDDConstrain2view(
			instance.get(DRAG_INSTANCE)
		);
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_draggable">draggable</a> attribute change.
	 *
	 * @method _afterDraggableChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterDraggableChange: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDraggableChange", 747);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 748);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 750);
instance.set(DRAG_INSTANCE, null);
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_dragInstance">dragInstance</a> attribute change.
	 *
	 * @method _afterDragInstanceChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterDragInstanceChange: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDragInstanceChange", 761);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 762);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 764);
if (event.prevVal) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 765);
event.prevVal.destroy();
		}
	},

	/**
	 * Handles the drag start event
	 * If "constrain2view" property is set to false this function will constrain the dialog to a region
	 * in order to prevent moving it to unreachable position
	 *
	 * @method _afterDragStart
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterDragStart: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDragStart", 778);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 779);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 781);
var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 783);
if (!constrain2view) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 784);
var dragInstance = instance.get(DRAG_INSTANCE);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 786);
var dragNode = dragInstance.get('dragNode');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 788);
var viewportRegion = dragNode.get('viewportRegion');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 790);
var dragNodeRegion = dragNode.get('region');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 792);
var defaultOffset = [0, 0];

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 794);
var deltaXY = dragInstance.deltaXY || defaultOffset;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 796);
var mouseXY = dragInstance.mouseXY || defaultOffset;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 798);
dragInstance.plug(
				A.Plugin.DDConstrained,
				{
					constrain: {
						bottom: viewportRegion.bottom + (dragNodeRegion.height - deltaXY[1]) - DRAG_GUTTER,
						left: viewportRegion.left - deltaXY[0] + DRAG_GUTTER,
						right: viewportRegion.right + (dragNodeRegion.right - mouseXY[0]) + DRAG_GUTTER,
						top: viewportRegion.top - deltaXY[1] + DRAG_GUTTER
					}
				}
			);
		}
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_resizable">resizable</a> attribute change.
	 *
	 * @method _afterResizableChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterResizableChange: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterResizableChange", 820);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 821);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 823);
instance.set(RESIZABLE_INSTANCE, null);
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_resizableInstance">resizableInstance</a> attribute change.
	 *
	 * @method _afterResizableInstanceChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterResizableInstanceChange: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterResizableInstanceChange", 834);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 835);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 837);
if (event.prevVal) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 838);
event.prevVal.destroy();
		}
	}
};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 843);
A.Dialog = A.Component.create(
	{
		NAME: DIALOG,
		EXTENDS: A.Panel,
		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain]
	}
);

/**
 * A base class for DialogManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class DialogManager
 * @constructor
 * @extends OverlayManager
 * @static
 */

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 862);
var DialogManager = new A.OverlayManager(
	{
		zIndexBase: 1000
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 868);
var MODALS = {};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 870);
DialogManager._MODALS = MODALS;

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 872);
DialogManager.after(
	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],
	function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 2)", 874);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 875);
var dialog = event.target;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 877);
if (dialog) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 878);
var id = dialog.get('id');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 880);
if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 881);
MODALS[id] = true;

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 883);
A.DialogMask.show();
			}
			else {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 886);
delete MODALS[id];

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 888);
if (AObject.isEmpty(MODALS)) {
					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 889);
A.DialogMask.hide();
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 896);
A.mix(
	DialogManager,
	{
		/**
		 * Find the <a href="Widget.html">Widget</a> instance based on a child
		 * element.
		 *
		 * @method findByChild
		 * @for DialogManager
		 * @param {Node | String} child Child node of the Dialog.
		 * @return {Widget}
		 */
		findByChild: function(child) {
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "findByChild", 908);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 909);
return A.Widget.getByNode(
				A.one(child).ancestor(DOT + CSS_DIALOG, true)
			);
		},

		/**
		 * <p>Invoke the <a href="Dialog.html#method_close">close</a> method from
		 * the Dialog which contains the <code>child</code> element.</p>
		 *
		 * Example:
		 *
		 * <pre><code>A.DialogManager.closeByChild('#dialogContent1');</code></pre>
		 *
		 * @method closeByChild
		 * @for DialogManager
		 * @param {Node | String} child Child node of the Dialog.
		 * @return {Dialog}
		 */
		closeByChild: function(child) {
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "closeByChild", 927);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 928);
return DialogManager.findByChild(child).close();
		},

		/**
		 * <p>Invoke the <a href="IOPlugin.html#method_start">start</a> method
		 * from the <a href="IOPlugin.html">IOPlugin</a> plugged on this Dialog
		 * instance. If there is no IOPlugin plugged it does nothing.</p>
		 *
		 * Example:
		 *
		 * <pre><code>A.DialogManager.refreshByChild('#dialogContent1');</code></pre>
		 *
		 * @method refreshByChild
		 * @for DialogManager
		 * @param {Node | String} child Child node of the Dialog.
		 */
		refreshByChild: function(child) {
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "refreshByChild", 944);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 945);
var dialog = DialogManager.findByChild(child);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 947);
if (dialog && dialog.io) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 948);
dialog.io.start();
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 954);
A.DialogManager = DialogManager;

/**
 * A base class for DialogMask - Controls the <a
 * href="Dialog.html#config_modal">modal</a> attribute.
 *
 * @class DialogMask
 * @constructor
 * @extends OverlayMask
 * @static
 */

}, '@VERSION@' ,{requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true});
