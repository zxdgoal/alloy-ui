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
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].code=["AUI.add('aui-dialog', function(A) {","/**"," * The Dialog Utility - The Dialog component is an extension of Panel that is"," * meant to emulate the behavior of an dialog window using a floating,"," * draggable HTML element."," *"," * @module aui-dialog"," */","","var Lang = A.Lang,","	AObject = A.Object,","	isBoolean = Lang.isBoolean,","	isArray = Lang.isArray,","	isObject = Lang.isObject,","","	toInt = Lang.toInt,","","	WidgetStdMod = A.WidgetStdMod,","","	DOC = A.config.doc,","","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	BUTTON = 'button',","	BUTTONS = 'buttons',","	CLICK_OUTSIDE = 'clickoutside',","	CLOSE = 'close',","	CLOSETHICK = 'closethick',","	CONSTRAIN_TO_VIEWPORT = 'constrain2view',","	DATA_TABINDEX = 'data-tabindex',","	DD = 'dd',","	DESTROY_ON_CLOSE = 'destroyOnClose',","	DIALOG = 'dialog',","	DOT = '.',","	DRAG_CONFIG = 'dragConfig',","	DRAG_GUTTER = 5,","	DRAG_INSTANCE = 'dragInstance',","	DRAGGABLE = 'draggable',","	FOCUS_OUTSIDE = 'focusoutside',","	FOOTER_CONTENT = 'footerContent',","	HD = 'hd',","	HEIGHT = 'height',","	ICON = 'icon',","	ICONS = 'icons',","	IO = 'io',","	LOADING = 'loading',","	MODAL = 'modal',","	PROXY = 'proxy',","	RESIZABLE = 'resizable',","	RESIZABLE_CONFIG = 'resizableConfig',","	RESIZABLE_INSTANCE = 'resizableInstance',","	STACK = 'stack',","	TAB_INDEX = 'tabIndex',","	USE_ARIA = 'useARIA',","	VIEWPORT_REGION = 'viewportRegion',","	VISIBLE = 'visible',","	WIDTH = 'width',","	Z_INDEX = 'zIndex',","","	EV_RESIZE = 'resize:resize',","	EV_RESIZE_END = 'resize:end',","","	getCN = A.getClassName,","","	CSS_DIALOG = getCN(DIALOG),","	CSS_DIALOG_HD = getCN(DIALOG, HD),","","	NODE_BLANK_TEXT = DOC.createTextNode('');","","/**"," * <p><img src=\"assets/images/aui-dialog/main.png\"/></p>"," *"," * A base class for Dialog, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Emulate the behavior of an dialog window using a floating, draggable HTML element</li>"," *    <li>Interface for easily gathering information from the user without leaving the underlying page context</li>"," *    <li>Using the <a href=\"IOPlugin.html\">IOPlugin</a>, supports the submission of form data either through an XMLHttpRequest, through a normal form submission, or through a fully script-based response</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.Dialog({"," *  bodyContent: 'Dialog body',"," *  centered: true,"," *  constrain2view: true,"," *  destroyOnClose: true,"," *  draggable: true,"," *  height: 250,"," *  resizable: false,"," *  stack: true,"," *  title: 'Dialog title',"," *  width: 500"," *  }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"Dialog.html#configattributes\">Configuration Attributes</a> available for"," * Dialog."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class Dialog"," * @constructor"," * @extends Panel"," * @uses WidgetPosition"," * @uses WidgetStack"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," */","var Dialog = function(config) {","	if (!A.DialogMask) {","		A.DialogMask = new A.OverlayMask(","			{","				visible: true","			}","		).render();","	}","};","","A.mix(","	Dialog,","	{","		/**","		 * Static property used to define the default attribute","		 * configuration for the Dialog.","		 *","		 * @property Dialog.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * See <a href=\"WidgetStdMod.html#config_bodyContent\">WidgetStdMod bodyContent</a>.","			 *","			 * @attribute bodyContent","			 * @default HTMLTextNode","			 * @type Node | String","			 */","			bodyContent: {","				value: NODE_BLANK_TEXT","			},","","			/**","			 * <p>Array of object literals, each containing a set of properties","			 * defining a button to be appended into the Dialog's footer. Each","			 * button object in the buttons array can have two properties:</p>","			 *","			 * <dl>","			 *    <dt>text:</dt>","			 *    <dd>","			 *        The text that will display on the face of the button. The text can include","			 *        HTML, as long as it is compliant with HTML Button specifications.","			 *    </dd>","			 *    <dt>handler:</dt>","			 *    <dd>","			 *        A reference to a function that should fire when the button is clicked.","			 *        (In this case scope of this function is always its Dialog instance.)","			 *    </dd>","			 * </dl>","			 *","			 * @attribute buttons","			 * @default []","			 * @type Array","			 */","			buttons: {","				validator: isArray,","				value: []","			},","","			/**","			 * If <code>true</code> the close icon will be displayed on the","			 * Dialog header.","			 *","			 * @attribute close","			 * @default true","			 * @type boolean","			 */","			close: {","				value: true","			},","","			/**","			 * Will attempt to constrain the dialog to the boundaries of the","			 * viewport region.","			 *","			 * @attribute constrain2view","			 * @type Object","			 */","			constrain2view: {","				setter: '_setConstrain2view',","				validator: isBoolean,","				value: false","			},","","			/**","			 * Invoke the <a href=\"Dialog.html#method_destroy\">destroy</a>","			 * method when the dialog is closed (i.e., remove the Dialog","			 * <code>boundingBox</code> from the body, purge events etc).","			 *","			 * @attribute destroyOnClose","			 * @default false","			 * @type boolean","			 */","			destroyOnClose: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Drag configuration.","			 *","			 * @attribute dragConfig","			 * @type {}","			 */","			dragConfig: {","				setter: function(val) {","					var instance = this;","","					return A.merge(","						{","							bubbleTargets: instance,","							handles: [DOT + CSS_DIALOG_HD],","							node: instance.get(BOUNDING_BOX)","						},","						val || {}","					);","				},","				validator: isObject,","				value: {},","				writeOnce: true","			},","","			/**","			 * Boolean specifying if the Panel should be draggable.","			 *","			 * @attribute draggable","			 * @default true","			 * @type boolean","			 */","			draggable: {","				value: true","			},","","			/**","			 * Stores the Drag instance for the <code>A.DD.Drag</code> used by","			 * this Dialog.","			 *","			 * @attribute dragInstance","			 * @default null","			 * @type A.DD.Drag","			 */","			dragInstance: {","				setter: '_setDragInstance',","				value: null","			},","","			/**","			 * @attribute focusOn","			 * @type array","			 *","			 * @description An array of objects corresponding to the nodes and events that will trigger a re-focus back on the widget.","			 * The implementer can supply an array of objects, with each object having the following properties:","			 * <p>eventName: (string, required): The eventName to listen to.</p>","			 * <p>node: (Y.Node, optional): The Y.Node that will fire the event (defaults to the boundingBox of the widget)</p>","			 * <p>By default, this attribute consists of two objects which will cause the widget to re-focus if anything","			 * outside the widget is clicked on or focussed upon.</p>","			 */","			focusOn: {","				validator: A.Lang.isArray,","				valueFn: function() {","					return [","						{","							// node: this.get(BOUNDING_BOX),","							eventName: CLICK_OUTSIDE","						},","						{","							//node: this.get(BOUNDING_BOX),","							eventName: FOCUS_OUTSIDE","						}","					];","				}","			},","","			/**","			 * True if the Panel should be displayed in a modal fashion,","			 * automatically creating a transparent mask over the document that","			 * will not be removed until the Dialog is dismissed. Uses","			 * <a href=\"OverlayMask.html\">OverlayMask</a>.","			 *","			 * @attribute modal","			 * @default false","			 * @type boolean","			 */","			modal: {","				lazyAdd: false,","				validator: isBoolean,","				value: false","			},","","			/**","			 * Boolean specifying if the Panel should be resizable.","			 *","			 * @attribute resizable","			 * @default true","			 * @type boolean","			 */","			resizable: {","				value: true","			},","","			/**","			 * Resize configuration.","			 *","			 * @attribute resizableConfig","			 * @type {}","			 */","			resizableConfig: {","				setter: function(val) {","					var instance = this;","","					return A.merge(","						{","							after: {","								end: A.bind(instance._syncResizableDimentions, instance),","								resize: A.bind(instance._syncResizableDimentions, instance)","							},","							bubbleTargets: instance,","							constrain2view: true,","							handles: 'r,br,b',","							minHeight: 100,","							minWidth: 200,","							node: instance.get(BOUNDING_BOX),","							proxy: true","						},","						val || {}","					);","				},","				validator: isObject,","				value: {},","				writeOnce: true","			},","","			/**","			 * Stores the Resize instance for the <code>A.Resize</code> used by","			 * this Dialog.","			 *","			 * @attribute resizableInstance","			 * @default null","			 * @type A.DD.Drag","			 */","			resizableInstance: {","				setter: '_setResizableInstance',","				value: null","			},","","			/**","			 * If <code>true</code> give stacking habilities to the Dialog.","			 *","			 * @attribute stack","			 * @default true","			 * @type boolean","			 */","			stack: {","				setter: function(v) {","					return this._setStack(v);","				},","				validator: isBoolean,","				value: true","			},","","			/**","			 * @attribute strings","			 * @description Collection of strings used to label elements of the Dialog's UI.","			 * @default null","			 * @type Object","			 */","			strings: {","				value: {","					close: 'Close dialog'","				}","			}","		},","","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property Dialog.NAME","		 * @type String","		 * @static","		 */","		NAME: DIALOG","	}",");","","Dialog.prototype = {","	_uiHandlesModal: null,","","	/**","	 * Construction logic executed during Dialog instantiation. Lifecycle.","	 *","	 * @method initializer","	 * @protected","	 */","	initializer: function(config) {","		var instance = this;","","		var buttons = instance.get(BUTTONS);","		var close = instance.get(CLOSE);","		var icons = instance.get(ICONS);","","		if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {","			instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);","		}","","		if (close) {","			var closeId = A.guid();","","			var closeConfig = {","				handler: {","					context: instance,","					fn: instance.close","				},","				icon: CLOSETHICK,","				id: closeId,","				title: instance.get('strings').close","			};","","			if (icons) {","				icons.push(closeConfig);","			}","","			instance.set(ICONS, icons);","","			instance._closeId = closeId;","		}","","		instance.publish(","			'close',","			{","				defaultFn: instance._close","			}","		);","","		instance.addTarget(A.DialogManager);","","		instance.after('constrain2viewChange', instance._afterConstrain2viewChange);","		instance.after('drag:start', instance._afterDragStart);","		instance.after('draggableChange', instance._afterDraggableChange);","		instance.after('dragInstanceChange', instance._afterDragInstanceChange);","		instance.after('render', instance._afterRenderer);","		instance.after('resizableChange', instance._afterResizableChange);","		instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);","	},","","	/**","	 * Bind the events on the Dialog UI. Lifecycle.","	 *","	 * @method bindUI","	 * @protected","	 */","	bindUI: function() {","		var instance = this;","","		if (instance.get(MODAL)) {","			instance.after('focusOnChange', instance._afterFocusOnChange());","		}","","		instance._bindLazyComponents();","	},","","	/**","	 * Refreshes the rendered UI, based on Widget State","	 *","	 * @method syncUI","	 * @protected","	 *","	 */","	syncUI: function() {","		var instance = this;","","		if (instance.get(USE_ARIA)) {","			instance.plug(","				A.Plugin.Aria,","				{","					attributes: {","						visible: {","							ariaName: 'hidden',","							format: function(value) {","								return !value;","							}","						}","					}","				}","			);","		}","	},","","	/**","	 * Descructor lifecycle implementation for the Dialog class.","	 * Purges events attached to the node (and all child nodes).","	 *","	 * @method destructor","	 * @protected","	 */","	destructor: function() {","		var instance = this;","","		A.Event.purgeElement(instance.get(BOUNDING_BOX), true);","","		A.DialogManager.remove(instance);","	},","","	/**","	 * Aligns the Dialog to the viewport.","	 *","	 * @method alignToViewport","	 * @param int offsetLeft An offset number to be added to the left coordinate value.","	 * @param int offsetTop An offset number to be added to the top coordinate value.","	 */","	alignToViewport: function(offsetLeft, offsetTop) {","		var instance = this;","","		var viewportRegion = A.getDoc().get(VIEWPORT_REGION);","","		var viewportLeft = viewportRegion.left + toInt(offsetLeft);","		var viewportTop = viewportRegion.top + toInt(offsetTop);","","		instance.move([viewportLeft, viewportTop]);","	},","","	/**","	 * Fires the close event to close the Dialog.","	 *","	 * @method close","	 */","	close: function() {","		var instance = this;","","		instance.fire('close');","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_constrain2view\">constrain2view</a> attribute change.","	 *","	 * @method _afterConstrain2viewChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterConstrain2viewChange: function(event) {","		var instance = this;","","		instance._updateDDConstrain2view(","			instance.get(DRAG_INSTANCE)","		);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_draggable\">draggable</a> attribute change.","	 *","	 * @method _afterDraggableChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDraggableChange: function(event) {","		var instance = this;","","		instance.set(DRAG_INSTANCE, null);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_dragInstance\">dragInstance</a> attribute change.","	 *","	 * @method _afterDragInstanceChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDragInstanceChange: function(event) {","		var instance = this;","","		var prevVal = event.prevVal;","","		if (prevVal) {","			prevVal.destroy();","		}","	},","","	/**","	 * Handles the drag start event","	 * If \"constrain2view\" property is set to false this function will constrain the dialog to a region","	 * in order to prevent moving it to unreachable position","	 *","	 * @method _afterDragStart","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDragStart: function(event) {","		var instance = this;","","		var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);","","		if (!constrain2view) {","			var dragInstance = instance.get(DRAG_INSTANCE);","","			var dragNode = dragInstance.get('dragNode');","","			var dragNodeRegion = dragNode.get('region');","			var viewportRegion = dragNode.get('viewportRegion');","","			var defaultOffset = [0, 0];","","			var deltaXY = dragInstance.deltaXY || defaultOffset;","			var mouseXY = dragInstance.mouseXY || defaultOffset;","","			dragInstance.plug(","				A.Plugin.DDConstrained,","				{","					constrain: {","						bottom: viewportRegion.bottom + (dragNodeRegion.height - deltaXY[1]) - DRAG_GUTTER,","						left: viewportRegion.left - deltaXY[0] + DRAG_GUTTER,","						right: viewportRegion.right + (dragNodeRegion.right - mouseXY[0]) + DRAG_GUTTER,","						top: viewportRegion.top - deltaXY[1] + DRAG_GUTTER","					}","				}","			);","		}","	},","","	/**","	 * Default function called when focusOn Attribute is changed. Remove existing listeners and create new listeners.","	 *","	 * @method _afterFocusOnChange","	 */","	_afterFocusOnChange : function(event) {","		var instance = this;","","		instance._detachUIHandlesModal();","","		if (instance.get(VISIBLE)) {","			instance._attachUIHandlesModal();","		}","	},","","	/**","	 * Fires after the render phase. Invoke","	 * <a href=\"Dialog.html#method__initButtons\">_initButtons</a>.","	 *","	 * @method _afterRenderer","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterRenderer: function(event) {","		var instance = this;","","		instance._initButtons();","","		// forcing lazyAdd:true attrs call the setter","		instance.get(STACK);","		instance.get(IO);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_resizable\">resizable</a> attribute change.","	 *","	 * @method _afterResizableChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterResizableChange: function(event) {","		var instance = this;","","		instance.set(RESIZABLE_INSTANCE, null);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_resizableInstance\">resizableInstance</a> attribute change.","	 *","	 * @method _afterResizableInstanceChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterResizableInstanceChange: function(event) {","		var instance = this;","","		var prevVal = event.prevVal;","","		if (prevVal) {","			prevVal.destroy();","		}","	},","","	/**","	 * Attaches UI Listeners for \"clickoutside\" and \"focusoutside\" on the widget. When these events occur, and the widget is modal, focus is shifted back onto the widget.","	 *","	 * @method _attachUIHandlesModal","	 */","	_attachUIHandlesModal: function() {","		var instance = this;","","		var boundingBox = instance.get(BOUNDING_BOX);","		var focusOn = instance.get('focusOn');","		var maskNode = instance.get('maskNode');","","		var focus = A.bind(instance._focus, instance);","","		var uiHandles = [];","","		for (var i = 0; i < focusOn.length; i++) {","			var ev = focusOn[i].eventName;","			var keyCode = focusOn[i].keyCode;","			var node = focusOn[i].node;","","			//no keycode or node defined","			if (!node && !keyCode && ev) {","				uiHandles.push(boundingBox.on(ev, focus));","			}","","			//node defined, no keycode (not a keypress)","			else if (node && !keyCode && ev) {","				uiHandles.push(node.on(ev, focus));","			}","","			//node defined, keycode defined, event defined (its a key press)","			else if (node && keyCode && ev) {","				uiHandles.push(node.on(ev, focus, keyCode));","			}","","			else {","				A.log('focusOn ATTR Error: The event with name \"' + ev + '\" could not be attached.');","			}","		}","","		instance._uiHandlesModal = uiHandles;","	},","","	/**","	 * Bind a <code>mouseenter</code> listener to the <code>boundingBox</code>","	 * to invoke the","	 * <a href=\"Dialog.html#config__initLazyComponents\">_initLazyComponents</a>.","	 * Performance reasons.","	 *","	 * @method _bindLazyComponents","	 * @private","	 */","	_bindLazyComponents: function() {","		var instance = this;","","		var boundingBox = instance.get(BOUNDING_BOX);","","		boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));","	},","","	/**","	 * Handles the close event logic.","	 *","	 * @method _handleEvent","	 * @param {EventFacade} event close event facade","	 * @protected","	 */","	_close: function() {","		var instance = this;","","		if (instance.get(DESTROY_ON_CLOSE)) {","			instance.destroy();","		}","		else {","			instance.hide();","		}","	},","","	/**","	 * Detaches all UI Listeners that were set in _attachUIHandlesModal from the widget.","	 *","	 * @method _detachUIHandlesModal","	 */","	_detachUIHandlesModal: function() {","		var instance = this;","","		A.each(","			instance._uiHandlesModal,","			function(h) {","				h.detach();","			}","		);","","		instance._uiHandlesModal = null;","	},","","	/**","	 * Provides mouse and tab focus to the widget's bounding box.","	 *","	 * @method _focus","	 */","	_focus: function(event) {","		var instance = this;","","		var boundingBox = instance.get(BOUNDING_BOX);","","		var oldTI = boundingBox.get('tabIndex');","","		boundingBox.set('tabIndex', oldTI >= 0 ? oldTI : 0);","","		instance.focus();","	},","","	/**","	 * Render the buttons on the footer of the Dialog.","	 *","	 * @method _initButtons","	 * @protected","	 */","	_initButtons: function() {","		var instance = this;","","		var buttons = instance.get(BUTTONS);","","		if (buttons.length) {","			var footerButtons = new A.Toolbar(","				{","					children: buttons","				}","			);","","			footerButtons._DEFAULT_CONTEXT = instance;","","			footerButtons.render(instance.footerNode);","","			instance.fire('contentUpdate');","","			instance.buttons = footerButtons;","		}","	},","","	/**","	 * Forces <code>lazyAdd:true</code> attributtes invoke the setter methods.","	 *","	 * @method _initLazyComponents","	 * @private","	 */","	_initLazyComponents: function() {","		var instance = this;","","		// forcing lazyAdd:true attrs call the setter","		instance.get(DRAG_INSTANCE);","		instance.get(RESIZABLE_INSTANCE);","	},","","	/**","	 * Set default ARIA roles and attributes.","	 * @method _setDefaultARIAValues","	 * @protected","	 */","	_setDefaultARIAValues: function() {","		var instance = this;","","		var icons = instance.icons;","","		if (!instance.get(USE_ARIA)) {","			return;","		}","","		instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));","","		if (icons) {","			var closeThick = icons.item(instance._closeId) || null;","","			if (closeThick) {","				instance.aria.setAttribute('controls', instance.get('id'), closeThick.get(BOUNDING_BOX));","			}","		}","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_draggable\">draggable</a> attribute.","	 *","	 * @method _setDragInstance","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setDragInstance: function(val) {","		var instance = this;","","		if (instance.get(DRAGGABLE)) {","			val = new A.DD.Drag(","				instance.get(DRAG_CONFIG)","			);","","			instance._updateDDConstrain2view(val);","		}","","		return val;","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_resizable\">resizable</a> attribute.","	 *","	 * @method _setResizableInstance","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setResizableInstance: function(val) {","		var instance = this;","","		if (instance.get(RESIZABLE)) {","			val = new A.Resize(","				instance.get(RESIZABLE_CONFIG)","			);","		}","","		return val;","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_stack\">stack</a>","	 * attribute.","	 *","	 * @method _setStack","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setStack: function(value) {","		var instance = this;","","		if (value) {","			A.DialogManager.register(instance);","		}","		else {","			A.DialogManager.remove(instance);","		}","","		return value;","	},","","	/**","	 * Sync dialog dimentions based on resizable end and resize events.","	 *","	 * @method _syncResizableDimentions","	 * @param {EventFacade} Resizable event","	 * @protected","	 */","	_syncResizableDimentions: function(event) {","		var instance = this;","","		var info = event.info;","		var type = event.type;","","		if ((type === EV_RESIZE_END) ||","			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {","				instance.set(HEIGHT, info.offsetHeight);","				instance.set(WIDTH, info.offsetWidth);","		}","	},","","	/**","	 * Set A.Plugin.DDConstrained constrain2view property to false or true","	 * depending on the value of constrain2view attribute.","	 *","	 * @param {A.DD.Drag} dragInstance","	 * @protected","	 */","	_updateDDConstrain2view: function(dragInstance) {","		var instance = this;","","		dragInstance.plug(","			A.Plugin.DDConstrained,","			{","				constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)","			}","		);","	}","};","","A.Dialog = A.Component.create(","	{","		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain],","		EXTENDS: A.Panel,","		NAME: DIALOG","	}",");","","/**"," * A base class for DialogManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class DialogManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","","var DialogManager = new A.OverlayManager(","	{","		zIndexBase: 1000","	}",");","","var MODALS = {};","","DialogManager._MODALS = MODALS;","","DialogManager.after(","	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],","	function(event) {","		var dialog = event.target;","","		if (dialog) {","			var id = dialog.get('id');","","			if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {","				MODALS[id] = true;","","				A.DialogMask.show();","","				DialogManager._blockIFrameFocus();","			}","			else {","				delete MODALS[id];","","				if (AObject.isEmpty(MODALS)) {","					A.DialogMask.hide();","","					DialogManager._unblockIFrameFocus();","				}","			}","		}","	}",");","","A.mix(","	DialogManager,","	{","		/**","		 * <p>Invoke the <a href=\"Dialog.html#method_close\">close</a> method from","		 * the Dialog which contains the <code>child</code> element.</p>","		 *","		 * Example:","		 *","		 * <pre><code>A.DialogManager.closeByChild('#dialogContent1');</code></pre>","		 *","		 * @method closeByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 * @return {Dialog}","		 */","		closeByChild: function(child) {","			return DialogManager.findByChild(child).close();","		},","","		/**","		 * Find the <a href=\"Widget.html\">Widget</a> instance based on a child","		 * element.","		 *","		 * @method findByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 * @return {Widget}","		 */","		findByChild: function(child) {","			return A.Widget.getByNode(","				A.one(child).ancestor(DOT + CSS_DIALOG, true)","			);","		},","","		/**","		 * <p>Invoke the <a href=\"IOPlugin.html#method_start\">start</a> method","		 * from the <a href=\"IOPlugin.html\">IOPlugin</a> plugged on this Dialog","		 * instance. If there is no IOPlugin plugged it does nothing.</p>","		 *","		 * Example:","		 *","		 * <pre><code>A.DialogManager.refreshByChild('#dialogContent1');</code></pre>","		 *","		 * @method refreshByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 */","		refreshByChild: function(child) {","			var dialog = DialogManager.findByChild(child);","","			if (dialog && dialog.io) {","				dialog.io.start();","			}","		},","","		/**","		 * Blocks iframes on the page from getting focused by setting their","		 * tabIndex attribute to -1. The previous value of tabIndex is saved","		 * so it can be restored later.","		 *","		 * @method _blockIFrameFocus","		 * @protected","		 */","		_blockIFrameFocus: function() {","			A.all('iframe').each(","				function() {","					if (this.ancestor(DOT + CSS_DIALOG) === null) {","						if (!this.hasAttribute(DATA_TABINDEX)) {","							this.setAttribute(DATA_TABINDEX, this.get(TAB_INDEX));","						}","","						this.set(TAB_INDEX, -1);","					}","				}","			);","		},","","		/**","		 * Unblocks focus for the iframes on the page by restoring their original","		 * tabIndex attributes (see the _blockIFrameFocus method).","		 *","		 * @method _unblockIFrameFocus","		 * @protected","		 */","		_unblockIFrameFocus: function() {","			A.all('iframe').each(","				function() {","					if (this.hasAttribute(DATA_TABINDEX)) {","						this.set(TAB_INDEX, this.getAttribute(DATA_TABINDEX));","					}","				}","			);","		}","	}",");","","A.DialogManager = DialogManager;","","/**"," * A base class for DialogMask - Controls the <a"," * href=\"Dialog.html#config_modal\">modal</a> attribute."," *"," * @class DialogMask"," * @constructor"," * @extends OverlayMask"," * @static"," */","","}, '@VERSION@' ,{requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true});"];
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].lines = {"1":0,"10":0,"110":0,"111":0,"112":0,"120":0,"217":0,"219":0,"271":0,"319":0,"321":0,"365":0,"395":0,"405":0,"407":0,"408":0,"409":0,"411":0,"412":0,"415":0,"416":0,"418":0,"428":0,"429":0,"432":0,"434":0,"437":0,"444":0,"446":0,"447":0,"448":0,"449":0,"450":0,"451":0,"452":0,"462":0,"464":0,"465":0,"468":0,"479":0,"481":0,"482":0,"489":0,"506":0,"508":0,"510":0,"521":0,"523":0,"525":0,"526":0,"528":0,"537":0,"539":0,"551":0,"553":0,"567":0,"569":0,"581":0,"583":0,"585":0,"586":0,"600":0,"602":0,"604":0,"605":0,"607":0,"609":0,"610":0,"612":0,"614":0,"615":0,"617":0,"637":0,"639":0,"641":0,"642":0,"655":0,"657":0,"660":0,"661":0,"673":0,"675":0,"687":0,"689":0,"691":0,"692":0,"702":0,"704":0,"705":0,"706":0,"708":0,"710":0,"712":0,"713":0,"714":0,"715":0,"718":0,"719":0,"723":0,"724":0,"728":0,"729":0,"733":0,"737":0,"750":0,"752":0,"754":0,"765":0,"767":0,"768":0,"771":0,"781":0,"783":0,"786":0,"790":0,"799":0,"801":0,"803":0,"805":0,"807":0,"817":0,"819":0,"821":0,"822":0,"828":0,"830":0,"832":0,"834":0,"845":0,"848":0,"849":0,"858":0,"860":0,"862":0,"863":0,"866":0,"868":0,"869":0,"871":0,"872":0,"886":0,"888":0,"889":0,"893":0,"896":0,"908":0,"910":0,"911":0,"916":0,"929":0,"931":0,"932":0,"935":0,"938":0,"949":0,"951":0,"952":0,"954":0,"956":0,"957":0,"969":0,"971":0,"980":0,"999":0,"1005":0,"1007":0,"1009":0,"1012":0,"1014":0,"1015":0,"1017":0,"1018":0,"1020":0,"1022":0,"1025":0,"1027":0,"1028":0,"1030":0,"1037":0,"1054":0,"1067":0,"1086":0,"1088":0,"1089":0,"1102":0,"1104":0,"1105":0,"1106":0,"1109":0,"1123":0,"1125":0,"1126":0,"1134":0};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].functions = {"Dialog:110":0,"setter:216":0,"valueFn:270":0,"setter:318":0,"setter:364":0,"initializer:404":0,"bindUI:461":0,"format:488":0,"syncUI:478":0,"destructor:505":0,"alignToViewport:520":0,"close:536":0,"_afterConstrain2viewChange:550":0,"_afterDraggableChange:566":0,"_afterDragInstanceChange:580":0,"_afterDragStart:599":0,"_afterFocusOnChange:636":0,"_afterRenderer:654":0,"_afterResizableChange:672":0,"_afterResizableInstanceChange:686":0,"_attachUIHandlesModal:701":0,"_bindLazyComponents:749":0,"_close:764":0,"(anonymous 2):785":0,"_detachUIHandlesModal:780":0,"_focus:798":0,"_initButtons:816":0,"_initLazyComponents:844":0,"_setDefaultARIAValues:857":0,"_setDragInstance:885":0,"_setResizableInstance:907":0,"_setStack:928":0,"_syncResizableDimentions:948":0,"_updateDDConstrain2view:968":0,"(anonymous 3):1011":0,"closeByChild:1053":0,"findByChild:1066":0,"refreshByChild:1085":0,"(anonymous 4):1103":0,"_blockIFrameFocus:1101":0,"(anonymous 5):1124":0,"_unblockIFrameFocus:1122":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].coveredLines = 193;
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].coveredFunctions = 43;
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
	CLICK_OUTSIDE = 'clickoutside',
	CLOSE = 'close',
	CLOSETHICK = 'closethick',
	CONSTRAIN_TO_VIEWPORT = 'constrain2view',
	DATA_TABINDEX = 'data-tabindex',
	DD = 'dd',
	DESTROY_ON_CLOSE = 'destroyOnClose',
	DIALOG = 'dialog',
	DOT = '.',
	DRAG_CONFIG = 'dragConfig',
	DRAG_GUTTER = 5,
	DRAG_INSTANCE = 'dragInstance',
	DRAGGABLE = 'draggable',
	FOCUS_OUTSIDE = 'focusoutside',
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
	TAB_INDEX = 'tabIndex',
	USE_ARIA = 'useARIA',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',
	WIDTH = 'width',
	Z_INDEX = 'zIndex',

	EV_RESIZE = 'resize:resize',
	EV_RESIZE_END = 'resize:end',

	getCN = A.getClassName,

	CSS_DIALOG = getCN(DIALOG),
	CSS_DIALOG_HD = getCN(DIALOG, HD),

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
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 110);
var Dialog = function(config) {
	_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "Dialog", 110);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 111);
if (!A.DialogMask) {
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 112);
A.DialogMask = new A.OverlayMask(
			{
				visible: true
			}
		).render();
	}
};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 120);
A.mix(
	Dialog,
	{
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
				validator: isArray,
				value: []
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
				validator: isBoolean,
				value: false
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
				validator: isBoolean,
				value: false
			},

			/**
			 * Drag configuration.
			 *
			 * @attribute dragConfig
			 * @type {}
			 */
			dragConfig: {
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 216);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 217);
var instance = this;

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 219);
return A.merge(
						{
							bubbleTargets: instance,
							handles: [DOT + CSS_DIALOG_HD],
							node: instance.get(BOUNDING_BOX)
						},
						val || {}
					);
				},
				validator: isObject,
				value: {},
				writeOnce: true
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
			 * @attribute focusOn
			 * @type array
			 *
			 * @description An array of objects corresponding to the nodes and events that will trigger a re-focus back on the widget.
			 * The implementer can supply an array of objects, with each object having the following properties:
			 * <p>eventName: (string, required): The eventName to listen to.</p>
			 * <p>node: (Y.Node, optional): The Y.Node that will fire the event (defaults to the boundingBox of the widget)</p>
			 * <p>By default, this attribute consists of two objects which will cause the widget to re-focus if anything
			 * outside the widget is clicked on or focussed upon.</p>
			 */
			focusOn: {
				validator: A.Lang.isArray,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "valueFn", 270);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 271);
return [
						{
							// node: this.get(BOUNDING_BOX),
							eventName: CLICK_OUTSIDE
						},
						{
							//node: this.get(BOUNDING_BOX),
							eventName: FOCUS_OUTSIDE
						}
					];
				}
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
			 * Resize configuration.
			 *
			 * @attribute resizableConfig
			 * @type {}
			 */
			resizableConfig: {
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 318);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 319);
var instance = this;

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 321);
return A.merge(
						{
							after: {
								end: A.bind(instance._syncResizableDimentions, instance),
								resize: A.bind(instance._syncResizableDimentions, instance)
							},
							bubbleTargets: instance,
							constrain2view: true,
							handles: 'r,br,b',
							minHeight: 100,
							minWidth: 200,
							node: instance.get(BOUNDING_BOX),
							proxy: true
						},
						val || {}
					);
				},
				validator: isObject,
				value: {},
				writeOnce: true
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
			 * If <code>true</code> give stacking habilities to the Dialog.
			 *
			 * @attribute stack
			 * @default true
			 * @type boolean
			 */
			stack: {
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 364);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 365);
return this._setStack(v);
				},
				validator: isBoolean,
				value: true
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
		},

		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Dialog.NAME
		 * @type String
		 * @static
		 */
		NAME: DIALOG
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 395);
Dialog.prototype = {
	_uiHandlesModal: null,

	/**
	 * Construction logic executed during Dialog instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "initializer", 404);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 405);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 407);
var buttons = instance.get(BUTTONS);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 408);
var close = instance.get(CLOSE);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 409);
var icons = instance.get(ICONS);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 411);
if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 412);
instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 415);
if (close) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 416);
var closeId = A.guid();

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 418);
var closeConfig = {
				handler: {
					context: instance,
					fn: instance.close
				},
				icon: CLOSETHICK,
				id: closeId,
				title: instance.get('strings').close
			};

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 428);
if (icons) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 429);
icons.push(closeConfig);
			}

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 432);
instance.set(ICONS, icons);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 434);
instance._closeId = closeId;
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 437);
instance.publish(
			'close',
			{
				defaultFn: instance._close
			}
		);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 444);
instance.addTarget(A.DialogManager);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 446);
instance.after('constrain2viewChange', instance._afterConstrain2viewChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 447);
instance.after('drag:start', instance._afterDragStart);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 448);
instance.after('draggableChange', instance._afterDraggableChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 449);
instance.after('dragInstanceChange', instance._afterDragInstanceChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 450);
instance.after('render', instance._afterRenderer);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 451);
instance.after('resizableChange', instance._afterResizableChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 452);
instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);
	},

	/**
	 * Bind the events on the Dialog UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "bindUI", 461);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 462);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 464);
if (instance.get(MODAL)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 465);
instance.after('focusOnChange', instance._afterFocusOnChange());
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 468);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "syncUI", 478);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 479);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 481);
if (instance.get(USE_ARIA)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 482);
instance.plug(
				A.Plugin.Aria,
				{
					attributes: {
						visible: {
							ariaName: 'hidden',
							format: function(value) {
								_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "format", 488);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 489);
return !value;
							}
						}
					}
				}
			);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "destructor", 505);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 506);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 508);
A.Event.purgeElement(instance.get(BOUNDING_BOX), true);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 510);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "alignToViewport", 520);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 521);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 523);
var viewportRegion = A.getDoc().get(VIEWPORT_REGION);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 525);
var viewportLeft = viewportRegion.left + toInt(offsetLeft);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 526);
var viewportTop = viewportRegion.top + toInt(offsetTop);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 528);
instance.move([viewportLeft, viewportTop]);
	},

	/**
	 * Fires the close event to close the Dialog.
	 *
	 * @method close
	 */
	close: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "close", 536);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 537);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 539);
instance.fire('close');
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterConstrain2viewChange", 550);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 551);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 553);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDraggableChange", 566);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 567);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 569);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDragInstanceChange", 580);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 581);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 583);
var prevVal = event.prevVal;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 585);
if (prevVal) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 586);
prevVal.destroy();
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDragStart", 599);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 600);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 602);
var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 604);
if (!constrain2view) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 605);
var dragInstance = instance.get(DRAG_INSTANCE);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 607);
var dragNode = dragInstance.get('dragNode');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 609);
var dragNodeRegion = dragNode.get('region');
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 610);
var viewportRegion = dragNode.get('viewportRegion');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 612);
var defaultOffset = [0, 0];

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 614);
var deltaXY = dragInstance.deltaXY || defaultOffset;
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 615);
var mouseXY = dragInstance.mouseXY || defaultOffset;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 617);
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
	 * Default function called when focusOn Attribute is changed. Remove existing listeners and create new listeners.
	 *
	 * @method _afterFocusOnChange
	 */
	_afterFocusOnChange : function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterFocusOnChange", 636);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 637);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 639);
instance._detachUIHandlesModal();

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 641);
if (instance.get(VISIBLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 642);
instance._attachUIHandlesModal();
		}
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterRenderer", 654);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 655);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 657);
instance._initButtons();

		// forcing lazyAdd:true attrs call the setter
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 660);
instance.get(STACK);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 661);
instance.get(IO);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterResizableChange", 672);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 673);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 675);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterResizableInstanceChange", 686);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 687);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 689);
var prevVal = event.prevVal;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 691);
if (prevVal) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 692);
prevVal.destroy();
		}
	},

	/**
	 * Attaches UI Listeners for "clickoutside" and "focusoutside" on the widget. When these events occur, and the widget is modal, focus is shifted back onto the widget.
	 *
	 * @method _attachUIHandlesModal
	 */
	_attachUIHandlesModal: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_attachUIHandlesModal", 701);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 702);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 704);
var boundingBox = instance.get(BOUNDING_BOX);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 705);
var focusOn = instance.get('focusOn');
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 706);
var maskNode = instance.get('maskNode');

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 708);
var focus = A.bind(instance._focus, instance);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 710);
var uiHandles = [];

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 712);
for (var i = 0; i < focusOn.length; i++) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 713);
var ev = focusOn[i].eventName;
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 714);
var keyCode = focusOn[i].keyCode;
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 715);
var node = focusOn[i].node;

			//no keycode or node defined
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 718);
if (!node && !keyCode && ev) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 719);
uiHandles.push(boundingBox.on(ev, focus));
			}

			//node defined, no keycode (not a keypress)
			else {_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 723);
if (node && !keyCode && ev) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 724);
uiHandles.push(node.on(ev, focus));
			}

			//node defined, keycode defined, event defined (its a key press)
			else {_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 728);
if (node && keyCode && ev) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 729);
uiHandles.push(node.on(ev, focus, keyCode));
			}

			else {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 733);
A.log('focusOn ATTR Error: The event with name "' + ev + '" could not be attached.');
			}}}
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 737);
instance._uiHandlesModal = uiHandles;
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_bindLazyComponents", 749);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 750);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 752);
var boundingBox = instance.get(BOUNDING_BOX);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 754);
boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));
	},

	/**
	 * Handles the close event logic.
	 *
	 * @method _handleEvent
	 * @param {EventFacade} event close event facade
	 * @protected
	 */
	_close: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_close", 764);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 765);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 767);
if (instance.get(DESTROY_ON_CLOSE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 768);
instance.destroy();
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 771);
instance.hide();
		}
	},

	/**
	 * Detaches all UI Listeners that were set in _attachUIHandlesModal from the widget.
	 *
	 * @method _detachUIHandlesModal
	 */
	_detachUIHandlesModal: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_detachUIHandlesModal", 780);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 781);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 783);
A.each(
			instance._uiHandlesModal,
			function(h) {
				_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 2)", 785);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 786);
h.detach();
			}
		);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 790);
instance._uiHandlesModal = null;
	},

	/**
	 * Provides mouse and tab focus to the widget's bounding box.
	 *
	 * @method _focus
	 */
	_focus: function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_focus", 798);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 799);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 801);
var boundingBox = instance.get(BOUNDING_BOX);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 803);
var oldTI = boundingBox.get('tabIndex');

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 805);
boundingBox.set('tabIndex', oldTI >= 0 ? oldTI : 0);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 807);
instance.focus();
	},

	/**
	 * Render the buttons on the footer of the Dialog.
	 *
	 * @method _initButtons
	 * @protected
	 */
	_initButtons: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_initButtons", 816);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 817);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 819);
var buttons = instance.get(BUTTONS);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 821);
if (buttons.length) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 822);
var footerButtons = new A.Toolbar(
				{
					children: buttons
				}
			);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 828);
footerButtons._DEFAULT_CONTEXT = instance;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 830);
footerButtons.render(instance.footerNode);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 832);
instance.fire('contentUpdate');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 834);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_initLazyComponents", 844);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 845);
var instance = this;

		// forcing lazyAdd:true attrs call the setter
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 848);
instance.get(DRAG_INSTANCE);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 849);
instance.get(RESIZABLE_INSTANCE);
	},

	/**
	 * Set default ARIA roles and attributes.
	 * @method _setDefaultARIAValues
	 * @protected
	 */
	_setDefaultARIAValues: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setDefaultARIAValues", 857);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 858);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 860);
var icons = instance.icons;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 862);
if (!instance.get(USE_ARIA)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 863);
return;
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 866);
instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 868);
if (icons) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 869);
var closeThick = icons.item(instance._closeId) || null;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 871);
if (closeThick) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 872);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setDragInstance", 885);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 886);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 888);
if (instance.get(DRAGGABLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 889);
val = new A.DD.Drag(
				instance.get(DRAG_CONFIG)
			);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 893);
instance._updateDDConstrain2view(val);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 896);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setResizableInstance", 907);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 908);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 910);
if (instance.get(RESIZABLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 911);
val = new A.Resize(
				instance.get(RESIZABLE_CONFIG)
			);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 916);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setStack", 928);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 929);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 931);
if (value) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 932);
A.DialogManager.register(instance);
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 935);
A.DialogManager.remove(instance);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 938);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_syncResizableDimentions", 948);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 949);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 951);
var info = event.info;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 952);
var type = event.type;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 954);
if ((type === EV_RESIZE_END) ||
			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 956);
instance.set(HEIGHT, info.offsetHeight);
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 957);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_updateDDConstrain2view", 968);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 969);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 971);
dragInstance.plug(
			A.Plugin.DDConstrained,
			{
				constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)
			}
		);
	}
};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 980);
A.Dialog = A.Component.create(
	{
		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain],
		EXTENDS: A.Panel,
		NAME: DIALOG
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

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 999);
var DialogManager = new A.OverlayManager(
	{
		zIndexBase: 1000
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1005);
var MODALS = {};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1007);
DialogManager._MODALS = MODALS;

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1009);
DialogManager.after(
	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],
	function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 3)", 1011);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1012);
var dialog = event.target;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1014);
if (dialog) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1015);
var id = dialog.get('id');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1017);
if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1018);
MODALS[id] = true;

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1020);
A.DialogMask.show();

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1022);
DialogManager._blockIFrameFocus();
			}
			else {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1025);
delete MODALS[id];

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1027);
if (AObject.isEmpty(MODALS)) {
					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1028);
A.DialogMask.hide();

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1030);
DialogManager._unblockIFrameFocus();
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1037);
A.mix(
	DialogManager,
	{
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
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "closeByChild", 1053);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1054);
return DialogManager.findByChild(child).close();
		},

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
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "findByChild", 1066);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1067);
return A.Widget.getByNode(
				A.one(child).ancestor(DOT + CSS_DIALOG, true)
			);
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
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "refreshByChild", 1085);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1086);
var dialog = DialogManager.findByChild(child);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1088);
if (dialog && dialog.io) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1089);
dialog.io.start();
			}
		},

		/**
		 * Blocks iframes on the page from getting focused by setting their
		 * tabIndex attribute to -1. The previous value of tabIndex is saved
		 * so it can be restored later.
		 *
		 * @method _blockIFrameFocus
		 * @protected
		 */
		_blockIFrameFocus: function() {
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_blockIFrameFocus", 1101);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1102);
A.all('iframe').each(
				function() {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 4)", 1103);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1104);
if (this.ancestor(DOT + CSS_DIALOG) === null) {
						_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1105);
if (!this.hasAttribute(DATA_TABINDEX)) {
							_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1106);
this.setAttribute(DATA_TABINDEX, this.get(TAB_INDEX));
						}

						_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1109);
this.set(TAB_INDEX, -1);
					}
				}
			);
		},

		/**
		 * Unblocks focus for the iframes on the page by restoring their original
		 * tabIndex attributes (see the _blockIFrameFocus method).
		 *
		 * @method _unblockIFrameFocus
		 * @protected
		 */
		_unblockIFrameFocus: function() {
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_unblockIFrameFocus", 1122);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1123);
A.all('iframe').each(
				function() {
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 5)", 1124);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1125);
if (this.hasAttribute(DATA_TABINDEX)) {
						_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1126);
this.set(TAB_INDEX, this.getAttribute(DATA_TABINDEX));
					}
				}
			);
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 1134);
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
