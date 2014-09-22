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
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].code=["AUI.add('aui-dialog', function(A) {","/**"," * The Dialog Utility - The Dialog component is an extension of Panel that is"," * meant to emulate the behavior of an dialog window using a floating,"," * draggable HTML element."," *"," * @module aui-dialog"," */","","var Lang = A.Lang,","	AObject = A.Object,","	isBoolean = Lang.isBoolean,","	isArray = Lang.isArray,","	isObject = Lang.isObject,","","	toInt = Lang.toInt,","","	WidgetStdMod = A.WidgetStdMod,","","	DOC = A.config.doc,","","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	BUTTON = 'button',","	BUTTONS = 'buttons',","	CLOSE = 'close',","	CLOSETHICK = 'closethick',","	CONSTRAIN_TO_VIEWPORT = 'constrain2view',","	DD = 'dd',","	DEFAULT = 'default',","	DESTROY_ON_CLOSE = 'destroyOnClose',","	DIALOG = 'dialog',","	DOT = '.',","	DRAGGABLE = 'draggable',","	DRAG_CONFIG = 'dragConfig',","	DRAG_INSTANCE = 'dragInstance',","	FOOTER_CONTENT = 'footerContent',","	HD = 'hd',","	HEIGHT = 'height',","	ICON = 'icon',","	ICONS = 'icons',","	IO = 'io',","	LOADING = 'loading',","	MODAL = 'modal',","	PROXY = 'proxy',","	RESIZABLE = 'resizable',","	RESIZABLE_CONFIG = 'resizableConfig',","	RESIZABLE_INSTANCE = 'resizableInstance',","	STACK = 'stack',","	USE_ARIA = 'useARIA',","	VIEWPORT_REGION = 'viewportRegion',","	WIDTH = 'width',","","	EV_RESIZE = 'resize:resize',","	EV_RESIZE_END = 'resize:end',","","	getCN = A.getClassName,","","	CSS_DIALOG = getCN(DIALOG),","	CSS_DIALOG_HD = getCN(DIALOG, HD),","	CSS_ICON_LOADING = getCN(ICON, LOADING),","	CSS_PREFIX = getCN(DD),","","	NODE_BLANK_TEXT = DOC.createTextNode('');","","/**"," * <p><img src=\"assets/images/aui-dialog/main.png\"/></p>"," *"," * A base class for Dialog, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Emulate the behavior of an dialog window using a floating, draggable HTML element</li>"," *    <li>Interface for easily gathering information from the user without leaving the underlying page context</li>"," *    <li>Using the <a href=\"IOPlugin.html\">IOPlugin</a>, supports the submission of form data either through an XMLHttpRequest, through a normal form submission, or through a fully script-based response</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.Dialog({"," *  bodyContent: 'Dialog body',"," *  centered: true,"," *  constrain2view: true,"," *  destroyOnClose: true,"," *  draggable: true,"," *  height: 250,"," *  resizable: false,"," *  stack: true,"," *  title: 'Dialog title',"," *  width: 500"," *  }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"Dialog.html#configattributes\">Configuration Attributes</a> available for"," * Dialog."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class Dialog"," * @constructor"," * @extends Panel"," * @uses WidgetPosition"," * @uses WidgetStack"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," */","var Dialog = function(config) {","	if (!A.DialogMask) {","		A.DialogMask = new A.OverlayMask().render();","	}","};","","A.mix(","	Dialog,","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property Dialog.NAME","		 * @type String","		 * @static","		 */","		NAME: DIALOG,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the Dialog.","		 *","		 * @property Dialog.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * See <a href=\"WidgetStdMod.html#config_bodyContent\">WidgetStdMod bodyContent</a>.","			 *","			 * @attribute bodyContent","			 * @default HTMLTextNode","			 * @type Node | String","			 */","			bodyContent: {","				value: NODE_BLANK_TEXT","			},","","			/**","			 * <p>Array of object literals, each containing a set of properties","             * defining a button to be appended into the Dialog's footer. Each","             * button object in the buttons array can have two properties:</p>","			 *","			 * <dl>","			 *    <dt>text:</dt>","			 *    <dd>","			 *        The text that will display on the face of the button. The text can include","			 *        HTML, as long as it is compliant with HTML Button specifications.","			 *    </dd>","			 *    <dt>handler:</dt>","			 *    <dd>","			 *        A reference to a function that should fire when the button is clicked.","	         *        (In this case scope of this function is always its Dialog instance.)","			 *    </dd>","			 * </dl>","			 *","			 * @attribute buttons","			 * @default []","			 * @type Array","			 */","			buttons: {","				value: [],","				validator: isArray","			},","","			/**","			 * If <code>true</code> the close icon will be displayed on the","             * Dialog header.","			 *","			 * @attribute close","			 * @default true","			 * @type boolean","			 */","			close: {","				value: true","			},","","			/**","	         * Will attempt to constrain the dialog to the boundaries of the","	         * viewport region.","	         *","	         * @attribute constrain2view","	         * @type Object","	         */","			constrain2view: {","				setter: '_setConstrain2view',","				value: false,","				validator: isBoolean","			},","","			/**","			 * Invoke the <a href=\"Dialog.html#method_destroy\">destroy</a>","             * method when the dialog is closed (i.e., remove the Dialog","             * <code>boundingBox</code> from the body, purge events etc).","			 *","			 * @attribute destroyOnClose","			 * @default false","			 * @type boolean","			 */","			destroyOnClose: {","				value: false,","				validator: isBoolean","			},","","			/**","			 * Boolean specifying if the Panel should be draggable.","			 *","			 * @attribute draggable","			 * @default true","			 * @type boolean","			 */","			draggable: {","				value: true","			},","","			/**","			 * Drag configuration.","			 *","			 * @attribute dragConfig","			 * @type {}","			 */","			dragConfig: {","				setter: function(val) {","					var instance = this;","","					return A.merge(","						{","							bubbleTargets: instance,","							node: instance.get(BOUNDING_BOX),","							handles: [ DOT + CSS_DIALOG_HD ]","						},","						val || {}","					);","				},","				writeOnce: true,","				value: {},","				validator: isObject","			},","","			/**","			 * Stores the Drag instance for the <code>A.DD.Drag</code> used by","             * this Dialog.","			 *","			 * @attribute dragInstance","			 * @default null","			 * @type A.DD.Drag","			 */","			dragInstance: {","				setter: '_setDragInstance',","				value: null","			},","","			/**","			 * True if the Panel should be displayed in a modal fashion,","             * automatically creating a transparent mask over the document that","             * will not be removed until the Dialog is dismissed. Uses","             * <a href=\"OverlayMask.html\">OverlayMask</a>.","			 *","			 * @attribute modal","			 * @default false","			 * @type boolean","			 */","			modal: {","				lazyAdd: false,","				validator: isBoolean,","				value: false","			},","","			/**","			 * Resize configuration.","			 *","			 * @attribute resizableConfig","			 * @type {}","			 */","			resizableConfig: {","				setter: function(val) {","					var instance = this;","","					return A.merge(","						{","							bubbleTargets: instance,","							handles: 'r,br,b',","							minHeight: 100,","							minWidth: 200,","							constrain2view: true,","							node: instance.get(BOUNDING_BOX),","							proxy: true,","							after: {","								end: A.bind(instance._syncResizableDimentions, instance),","								resize: A.bind(instance._syncResizableDimentions, instance)","							}","						},","						val || {}","					);","				},","				writeOnce: true,","				value: {},","				validator: isObject","			},","","			/**","			 * Stores the Resize instance for the <code>A.Resize</code> used by","             * this Dialog.","			 *","			 * @attribute resizableInstance","			 * @default null","			 * @type A.DD.Drag","			 */","			resizableInstance: {","				setter: '_setResizableInstance',","				value: null","			},","","			/**","			 * Boolean specifying if the Panel should be resizable.","			 *","			 * @attribute resizable","			 * @default true","			 * @type boolean","			 */","			resizable: {","				value: true","			},","","			/**","			 * If <code>true</code> give stacking habilities to the Dialog.","			 *","			 * @attribute stack","			 * @default true","			 * @type boolean","			 */","			stack: {","				value: true,","				setter: function(v) {","					return this._setStack(v);","				},","				validator: isBoolean","			},","","			/**","			 * @attribute strings","			 * @description Collection of strings used to label elements of the Dialog's UI.","			 * @default null","			 * @type Object","			 */","			strings: {","				value: {","					close: 'Close dialog'","				}","			}","		}","	}",");","","Dialog.prototype = {","	/**","	 * Construction logic executed during Dialog instantiation. Lifecycle.","	 *","	 * @method initializer","	 * @protected","	 */","	initializer: function(config) {","		var instance = this;","		var icons = instance.get(ICONS);","		var close = instance.get(CLOSE);","		var buttons = instance.get(BUTTONS);","","		if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {","			instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);","		}","","		if (close) {","			var closeConfig = {","				icon: CLOSETHICK,","				id: CLOSETHICK,","				handler: {","					fn: instance.close,","					context: instance","				},","				title: instance.get('strings').close","			};","","			if (icons) {","				icons.push(closeConfig);","			}","","			instance.set(ICONS, icons);","		}","","		instance.publish(","			'close',","			{","				defaultFn: instance._close","			}","		);","","		instance.addTarget(A.DialogManager);","","		instance.after('constrain2viewChange', instance._afterConstrain2viewChange);","		instance.after('draggableChange', instance._afterDraggableChange);","		instance.after('dragInstanceChange', instance._afterDragInstanceChange);","		instance.after('render', instance._afterRenderer);","		instance.after('resizableChange', instance._afterResizableChange);","		instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);","	},","","	/**","	 * Bind the events on the Dialog UI. Lifecycle.","	 *","	 * @method bindUI","	 * @protected","	 */","	bindUI: function() {","		var instance = this;","","		instance._bindLazyComponents();","	},","","	/**","     * Refreshes the rendered UI, based on Widget State","     *","     * @method syncUI","     * @protected","     *","     */","	syncUI: function() {","		var instance = this;","","		if (instance.get(USE_ARIA)) {","			instance.plug(A.Plugin.Aria, {","				attributes: {","					visible: {","						ariaName: 'hidden',","						format: function(value) {","							return !value;","						}","					}","				}","			});","		}","	},","","	/**","	 * Descructor lifecycle implementation for the Dialog class.","	 * Purges events attached to the node (and all child nodes).","	 *","	 * @method destructor","	 * @protected","	 */","	destructor: function() {","		var instance = this;","		var boundingBox = instance.get(BOUNDING_BOX);","","		A.Event.purgeElement(boundingBox, true);","		A.DialogManager.remove(instance);","	},","","    /**","     * Aligns the Dialog to the viewport.","     *","     * @method alignToViewport","     * @param int offsetLeft An offset number to be added to the left coordinate value.","     * @param int offsetTop An offset number to be added to the top coordinate value.","     */","	alignToViewport: function(offsetLeft, offsetTop) {","		var instance = this;","		var viewportRegion = A.getDoc().get(VIEWPORT_REGION);","","		instance.move([ viewportRegion.left + toInt(offsetLeft), viewportRegion.top + toInt(offsetTop) ]);","	},","","	/**","	 * Bind a <code>mouseenter</code> listener to the <code>boundingBox</code>","     * to invoke the","     * <a href=\"Dialog.html#config__initLazyComponents\">_initLazyComponents</a>.","     * Performance reasons.","	 *","	 * @method _bindLazyComponents","	 * @private","	 */","	_bindLazyComponents: function() {","		var instance = this;","		var boundingBox = instance.get(BOUNDING_BOX);","","		boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));","	},","","	/**","	 * Fires the close event to close the Dialog.","	 *","	 * @method close","	 */","	close: function() {","		var instance = this;","","		instance.fire('close');","	},","","	/**","	 * Fires after the render phase. Invoke","     * <a href=\"Dialog.html#method__initButtons\">_initButtons</a>.","	 *","	 * @method _afterRenderer","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterRenderer: function(event) {","		var instance = this;","","		instance._initButtons();","","		// forcing lazyAdd:true attrs call the setter","		instance.get(STACK);","		instance.get(IO);","	},","","	/**","	 * Handles the close event logic.","	 *","	 * @method _handleEvent","	 * @param {EventFacade} event close event facade","	 * @protected","	 */","	_close: function() {","		var instance = this;","","		if (instance.get(DESTROY_ON_CLOSE)) {","			instance.destroy();","		}","		else {","			instance.hide();","		}","	},","","	/**","	 * Render the buttons on the footer of the Dialog.","	 *","	 * @method _initButtons","	 * @protected","	 */","	_initButtons: function() {","		var instance = this;","","		var buttons = instance.get(BUTTONS);","","		if (buttons.length) {","			var footerButtons = new A.Toolbar(","				{","					children: buttons","				}","			);","","			footerButtons._DEFAULT_CONTEXT = instance;","","			footerButtons.render(instance.footerNode);","","			instance.fire('contentUpdate');","","			instance.buttons = footerButtons;","		}","	},","","	/**","	 * Forces <code>lazyAdd:true</code> attributtes invoke the setter methods.","	 *","	 * @method _initLazyComponents","	 * @private","	 */","	_initLazyComponents: function() {","		var instance = this;","","		// forcing lazyAdd:true attrs call the setter","		instance.get(DRAG_INSTANCE);","		instance.get(RESIZABLE_INSTANCE);","	},","","	/**","	 * Set default ARIA roles and attributes.","	 * @method _setDefaultARIAValues","	 * @protected","	 */","	_setDefaultARIAValues: function() {","		var instance = this;","","		if (!instance.get(USE_ARIA)) {","			return;","		}","","		instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));","","		if (instance.icons) {","			var closeThick = instance.icons.item(CLOSETHICK);","","			if (closeThick){","				instance.aria.setAttribute('controls', instance.get('id'), closeThick.get(BOUNDING_BOX));","			}","		}","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_draggable\">draggable</a> attribute.","	 *","	 * @method _setDragInstance","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setDragInstance: function(val) {","		var instance = this;","","		if (instance.get(DRAGGABLE)) {","			val = new A.DD.Drag(","				instance.get(DRAG_CONFIG)","			);","","			instance._updateDDConstrain2view(val);","		}","","		return val;","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_resizable\">resizable</a> attribute.","	 *","	 * @method _setResizableInstance","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setResizableInstance: function(val) {","		var instance = this;","","		if (instance.get(RESIZABLE)) {","			val = new A.Resize(","				instance.get(RESIZABLE_CONFIG)","			);","		}","","		return val;","	},","","	/**","	 * Setter for the <a href=\"Dialog.html#config_stack\">stack</a>","     * attribute.","	 *","	 * @method _setStack","	 * @param {boolean} value","	 * @protected","	 * @return {boolean}","	 */","	_setStack: function(value) {","		var instance = this;","","		if (value) {","			A.DialogManager.register(instance);","		}","		else {","			A.DialogManager.remove(instance);","		}","","		return value;","	},","","	/**","	 * Sync dialog dimentions based on resizable end and resize events.","	 *","	 * @method _syncResizableDimentions","	 * @param {EventFacade} Resizable event","	 * @protected","	 */","	_syncResizableDimentions: function(event) {","		var instance = this;","","		var type = event.type;","		var info = event.info;","","		if ((type === EV_RESIZE_END) ||","			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {","				instance.set(HEIGHT, info.offsetHeight);","				instance.set(WIDTH, info.offsetWidth);","		}","	},","","	/**","	 * Plug and Unplug A.Plugin.DDConstrained to the dragInstance depending on","	 * the value of constrain2view attribute.","	 *","	 * @param {A.DD.Drag} dragInstance","	 * @protected","	 */","	_updateDDConstrain2view: function(dragInstance) {","		var instance = this;","		var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);","","		if (constrain2view) {","			dragInstance.plug(","				A.Plugin.DDConstrained,","				{","					constrain2view: constrain2view","				}","			);","		}","		else {","			dragInstance.unplug(A.Plugin.DDConstrained);","		}","	},","","	/**","	 * Fires after the value of the","     * <a href=\"Overlay.html#config_constrain2view\">constrain2view</a> attribute change.","	 *","	 * @method _afterConstrain2viewChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterConstrain2viewChange: function(event) {","		var instance = this;","","		instance._updateDDConstrain2view(","			instance.get(DRAG_INSTANCE)","		);","	},","","	/**","	 * Fires after the value of the","     * <a href=\"Overlay.html#config_draggable\">draggable</a> attribute change.","	 *","	 * @method _afterDraggableChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDraggableChange: function(event) {","		var instance = this;","","		instance.set(DRAG_INSTANCE, null);","	},","","	/**","	 * Fires after the value of the","     * <a href=\"Overlay.html#config_dragInstance\">dragInstance</a> attribute change.","	 *","	 * @method _afterDragInstanceChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterDragInstanceChange: function(event) {","		var instance = this;","","		if (event.prevVal) {","			event.prevVal.destroy();","		}","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_resizable\">resizable</a> attribute change.","	 *","	 * @method _afterResizableChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterResizableChange: function(event) {","		var instance = this;","","		instance.set(RESIZABLE_INSTANCE, null);","	},","","	/**","	 * Fires after the value of the","	 * <a href=\"Overlay.html#config_resizableInstance\">resizableInstance</a> attribute change.","	 *","	 * @method _afterResizableInstanceChange","	 * @param {EventFacade} event","	 * @protected","	 */","	_afterResizableInstanceChange: function(event) {","		var instance = this;","","		if (event.prevVal) {","			event.prevVal.destroy();","		}","	}","};","","A.Dialog = A.Component.create(","	{","		NAME: DIALOG,","		EXTENDS: A.Panel,","		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain]","	}",");","","/**"," * A base class for DialogManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class DialogManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","","var DialogManager = new A.OverlayManager(","	{","		zIndexBase: 1000","	}",");","","var MODALS = {};","","DialogManager._MODALS = MODALS;","","DialogManager.after(","	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],","	function(event) {","		var dialog = event.target;","","		if (dialog) {","			var id = dialog.get('id');","","			if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {","				MODALS[id] = true;","","				A.DialogMask.show();","			}","			else {","				delete MODALS[id];","","				if (AObject.isEmpty(MODALS)) {","					A.DialogMask.hide();","				}","			}","		}","	}",");","","A.mix(","	DialogManager,","	{","		/**","		 * Find the <a href=\"Widget.html\">Widget</a> instance based on a child","         * element.","		 *","		 * @method findByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 * @return {Widget}","		 */","		findByChild: function(child) {","			return A.Widget.getByNode(","				A.one(child).ancestor(DOT + CSS_DIALOG, true)","			);","		},","","		/**","		 * <p>Invoke the <a href=\"Dialog.html#method_close\">close</a> method from","         * the Dialog which contains the <code>child</code> element.</p>","		 *","		 * Example:","		 *","		 * <pre><code>A.DialogManager.closeByChild('#dialogContent1');</code></pre>","		 *","		 * @method closeByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 * @return {Dialog}","		 */","		closeByChild: function(child) {","			return DialogManager.findByChild(child).close();","		},","","		/**","		 * <p>Invoke the <a href=\"IOPlugin.html#method_start\">start</a> method","         * from the <a href=\"IOPlugin.html\">IOPlugin</a> plugged on this Dialog","         * instance. If there is no IOPlugin plugged it does nothing.</p>","         *","		 * Example:","		 *","		 * <pre><code>A.DialogManager.refreshByChild('#dialogContent1');</code></pre>","		 *","		 * @method refreshByChild","		 * @for DialogManager","		 * @param {Node | String} child Child node of the Dialog.","		 */","		refreshByChild: function(child) {","			var dialog = DialogManager.findByChild(child);","","			if (dialog && dialog.io) {","				dialog.io.start();","			}","		}","	}",");","","A.DialogManager = DialogManager;","","/**"," * A base class for DialogMask - Controls the <a"," * href=\"Dialog.html#config_modal\">modal</a> attribute."," *"," * @class DialogMask"," * @constructor"," * @extends OverlayMask"," * @static"," */","","}, '@VERSION@' ,{requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true});"];
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].lines = {"1":0,"10":0,"106":0,"107":0,"108":0,"112":0,"229":0,"231":0,"282":0,"284":0,"340":0,"360":0,"368":0,"369":0,"370":0,"371":0,"373":0,"374":0,"377":0,"378":0,"388":0,"389":0,"392":0,"395":0,"402":0,"404":0,"405":0,"406":0,"407":0,"408":0,"409":0,"419":0,"421":0,"432":0,"434":0,"435":0,"440":0,"456":0,"457":0,"459":0,"460":0,"471":0,"472":0,"474":0,"487":0,"488":0,"490":0,"499":0,"501":0,"513":0,"515":0,"518":0,"519":0,"530":0,"532":0,"533":0,"536":0,"547":0,"549":0,"551":0,"552":0,"558":0,"560":0,"562":0,"564":0,"575":0,"578":0,"579":0,"588":0,"590":0,"591":0,"594":0,"596":0,"597":0,"599":0,"600":0,"614":0,"616":0,"617":0,"621":0,"624":0,"636":0,"638":0,"639":0,"644":0,"657":0,"659":0,"660":0,"663":0,"666":0,"677":0,"679":0,"680":0,"682":0,"684":0,"685":0,"697":0,"698":0,"700":0,"701":0,"709":0,"722":0,"724":0,"738":0,"740":0,"752":0,"754":0,"755":0,"768":0,"770":0,"782":0,"784":0,"785":0,"790":0,"809":0,"815":0,"817":0,"819":0,"822":0,"824":0,"825":0,"827":0,"828":0,"830":0,"833":0,"835":0,"836":0,"843":0,"856":0,"875":0,"892":0,"894":0,"895":0,"901":0};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].functions = {"Dialog:106":0,"setter:228":0,"setter:281":0,"setter:339":0,"initializer:367":0,"bindUI:418":0,"format:439":0,"syncUI:431":0,"destructor:455":0,"alignToViewport:470":0,"_bindLazyComponents:486":0,"close:498":0,"_afterRenderer:512":0,"_close:529":0,"_initButtons:546":0,"_initLazyComponents:574":0,"_setDefaultARIAValues:587":0,"_setDragInstance:613":0,"_setResizableInstance:635":0,"_setStack:656":0,"_syncResizableDimentions:676":0,"_updateDDConstrain2view:696":0,"_afterConstrain2viewChange:721":0,"_afterDraggableChange:737":0,"_afterDragInstanceChange:751":0,"_afterResizableChange:767":0,"_afterResizableInstanceChange:781":0,"(anonymous 2):821":0,"findByChild:855":0,"closeByChild:874":0,"refreshByChild:891":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].coveredLines = 134;
_yuitest_coverage["/build/aui-dialog/aui-dialog.js"].coveredFunctions = 32;
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
	DRAGGABLE = 'draggable',
	DRAG_CONFIG = 'dragConfig',
	DRAG_INSTANCE = 'dragInstance',
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
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 106);
var Dialog = function(config) {
	_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "Dialog", 106);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 107);
if (!A.DialogMask) {
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 108);
A.DialogMask = new A.OverlayMask().render();
	}
};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 112);
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
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 228);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 229);
var instance = this;

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 231);
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
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 281);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 282);
var instance = this;

					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 284);
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
					_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "setter", 339);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 340);
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

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 360);
Dialog.prototype = {
	/**
	 * Construction logic executed during Dialog instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "initializer", 367);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 368);
var instance = this;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 369);
var icons = instance.get(ICONS);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 370);
var close = instance.get(CLOSE);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 371);
var buttons = instance.get(BUTTONS);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 373);
if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 374);
instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 377);
if (close) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 378);
var closeConfig = {
				icon: CLOSETHICK,
				id: CLOSETHICK,
				handler: {
					fn: instance.close,
					context: instance
				},
				title: instance.get('strings').close
			};

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 388);
if (icons) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 389);
icons.push(closeConfig);
			}

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 392);
instance.set(ICONS, icons);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 395);
instance.publish(
			'close',
			{
				defaultFn: instance._close
			}
		);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 402);
instance.addTarget(A.DialogManager);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 404);
instance.after('constrain2viewChange', instance._afterConstrain2viewChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 405);
instance.after('draggableChange', instance._afterDraggableChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 406);
instance.after('dragInstanceChange', instance._afterDragInstanceChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 407);
instance.after('render', instance._afterRenderer);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 408);
instance.after('resizableChange', instance._afterResizableChange);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 409);
instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);
	},

	/**
	 * Bind the events on the Dialog UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "bindUI", 418);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 419);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 421);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "syncUI", 431);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 432);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 434);
if (instance.get(USE_ARIA)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 435);
instance.plug(A.Plugin.Aria, {
				attributes: {
					visible: {
						ariaName: 'hidden',
						format: function(value) {
							_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "format", 439);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 440);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "destructor", 455);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 456);
var instance = this;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 457);
var boundingBox = instance.get(BOUNDING_BOX);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 459);
A.Event.purgeElement(boundingBox, true);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 460);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "alignToViewport", 470);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 471);
var instance = this;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 472);
var viewportRegion = A.getDoc().get(VIEWPORT_REGION);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 474);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_bindLazyComponents", 486);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 487);
var instance = this;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 488);
var boundingBox = instance.get(BOUNDING_BOX);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 490);
boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));
	},

	/**
	 * Fires the close event to close the Dialog.
	 *
	 * @method close
	 */
	close: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "close", 498);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 499);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 501);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterRenderer", 512);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 513);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 515);
instance._initButtons();

		// forcing lazyAdd:true attrs call the setter
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 518);
instance.get(STACK);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 519);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_close", 529);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 530);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 532);
if (instance.get(DESTROY_ON_CLOSE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 533);
instance.destroy();
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 536);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_initButtons", 546);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 547);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 549);
var buttons = instance.get(BUTTONS);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 551);
if (buttons.length) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 552);
var footerButtons = new A.Toolbar(
				{
					children: buttons
				}
			);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 558);
footerButtons._DEFAULT_CONTEXT = instance;

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 560);
footerButtons.render(instance.footerNode);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 562);
instance.fire('contentUpdate');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 564);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_initLazyComponents", 574);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 575);
var instance = this;

		// forcing lazyAdd:true attrs call the setter
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 578);
instance.get(DRAG_INSTANCE);
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 579);
instance.get(RESIZABLE_INSTANCE);
	},

	/**
	 * Set default ARIA roles and attributes.
	 * @method _setDefaultARIAValues
	 * @protected
	 */
	_setDefaultARIAValues: function() {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setDefaultARIAValues", 587);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 588);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 590);
if (!instance.get(USE_ARIA)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 591);
return;
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 594);
instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 596);
if (instance.icons) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 597);
var closeThick = instance.icons.item(CLOSETHICK);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 599);
if (closeThick){
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 600);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setDragInstance", 613);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 614);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 616);
if (instance.get(DRAGGABLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 617);
val = new A.DD.Drag(
				instance.get(DRAG_CONFIG)
			);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 621);
instance._updateDDConstrain2view(val);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 624);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setResizableInstance", 635);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 636);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 638);
if (instance.get(RESIZABLE)) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 639);
val = new A.Resize(
				instance.get(RESIZABLE_CONFIG)
			);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 644);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_setStack", 656);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 657);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 659);
if (value) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 660);
A.DialogManager.register(instance);
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 663);
A.DialogManager.remove(instance);
		}

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 666);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_syncResizableDimentions", 676);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 677);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 679);
var type = event.type;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 680);
var info = event.info;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 682);
if ((type === EV_RESIZE_END) ||
			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 684);
instance.set(HEIGHT, info.offsetHeight);
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 685);
instance.set(WIDTH, info.offsetWidth);
		}
	},

	/**
	 * Plug and Unplug A.Plugin.DDConstrained to the dragInstance depending on
	 * the value of constrain2view attribute.
	 *
	 * @param {A.DD.Drag} dragInstance
	 * @protected
	 */
	_updateDDConstrain2view: function(dragInstance) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_updateDDConstrain2view", 696);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 697);
var instance = this;
		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 698);
var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 700);
if (constrain2view) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 701);
dragInstance.plug(
				A.Plugin.DDConstrained,
				{
					constrain2view: constrain2view
				}
			);
		}
		else {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 709);
dragInstance.unplug(A.Plugin.DDConstrained);
		}
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterConstrain2viewChange", 721);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 722);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 724);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDraggableChange", 737);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 738);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 740);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterDragInstanceChange", 751);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 752);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 754);
if (event.prevVal) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 755);
event.prevVal.destroy();
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterResizableChange", 767);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 768);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 770);
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
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "_afterResizableInstanceChange", 781);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 782);
var instance = this;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 784);
if (event.prevVal) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 785);
event.prevVal.destroy();
		}
	}
};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 790);
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

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 809);
var DialogManager = new A.OverlayManager(
	{
		zIndexBase: 1000
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 815);
var MODALS = {};

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 817);
DialogManager._MODALS = MODALS;

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 819);
DialogManager.after(
	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],
	function(event) {
		_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "(anonymous 2)", 821);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 822);
var dialog = event.target;

		_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 824);
if (dialog) {
			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 825);
var id = dialog.get('id');

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 827);
if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 828);
MODALS[id] = true;

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 830);
A.DialogMask.show();
			}
			else {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 833);
delete MODALS[id];

				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 835);
if (AObject.isEmpty(MODALS)) {
					_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 836);
A.DialogMask.hide();
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 843);
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
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "findByChild", 855);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 856);
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
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "closeByChild", 874);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 875);
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
			_yuitest_coverfunc("/build/aui-dialog/aui-dialog.js", "refreshByChild", 891);
_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 892);
var dialog = DialogManager.findByChild(child);

			_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 894);
if (dialog && dialog.io) {
				_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 895);
dialog.io.start();
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog/aui-dialog.js", 901);
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
