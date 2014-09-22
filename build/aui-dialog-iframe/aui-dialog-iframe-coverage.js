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
_yuitest_coverage["/build/aui-dialog-iframe/aui-dialog-iframe.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-dialog-iframe/aui-dialog-iframe.js",
    code: []
};
_yuitest_coverage["/build/aui-dialog-iframe/aui-dialog-iframe.js"].code=["AUI.add('aui-dialog-iframe', function(A) {","var Lang = A.Lang,","	getClassName = A.getClassName,","","	IFRAME = 'iframe',","","	CSS_IFRAME_BD = getClassName('dialog', IFRAME, 'bd'),","	CSS_IFRAME_NODE = getClassName('dialog', IFRAME, 'node'),","	CSS_IFRAME_ROOT_NODE = getClassName('dialog', IFRAME, 'root', 'node'),","","	BUFFER_CSS_CLASS = [CSS_IFRAME_NODE],","","	TPL_IFRAME = '<iframe class=\"{cssClass}\" frameborder=\"0\" id=\"{id}\" name=\"{id}\" src=\"{uri}\"></iframe>',","","	UI = A.Widget.UI_SRC,","	UI_SRC = {","		src: UI","	};","","var DialogIframePlugin = A.Component.create(","	{","		ATTRS: {","			bindLoadHandler: {","				validator: Lang.isFunction,","				value: function() {","					var instance = this;","","					instance.node.on('load', A.bind(instance.fire, instance, 'load'));","				}","			},","","			closeOnEscape: {","				value: true","			},","","			iframeCssClass: {","				value: '',","				setter: '_setIframeCssClass'","			},","","			iframeId: {","				valueFn: function() {","					var instance = this;","","					return instance.get('id') || A.guid();","				}","			},","","			uri: {","			}","		},","","		EXTENDS: A.Plugin.Base,","		NAME: IFRAME,","		NS: IFRAME,","		prototype: {","			initializer: function(config) {","				var instance = this;","","				instance._host = instance.get('host');","","				instance._eventHandles = [];","","				instance.publish(","					'load',","					{","						defaultFn: instance._defaultLoadIframeFn","					}","				);","","				instance.afterHostMethod(","					'renderUI',","					A.debounce(instance._afterRenderUI, 50, instance),","					instance","				);","			},","","			destructor: function() {","				var instance = this;","","				instance._detachEventHandles();","","				instance._host.set('bodyContent', instance._previousBodyContent);","","				instance.node.remove(true);","			},","","			_afterDialogVisibleChange: function(event) {","				var instance = this;","","				instance._uiSetMonitor(event.newVal);","			},","","			_afterMaskVisibleChange: function(event) {","				var instance = this;","","				instance._uiSetMonitor(!event.newVal);","			},","","			_afterRenderUI: function() {","				var instance = this;","				","				instance._plugIframe();","","				instance._bindEvents();","","				var bodyNode = instance._bodyNode;","","				bodyNode.plug(A.LoadingMask);","","				var loadingMask = bodyNode.loadingmask;","","				loadingMask.overlayMask.after('visibleChange', instance._afterMaskVisibleChange, instance);","","				loadingMask.show();","			},","","			_afterUriChange: function(event) {","				var instance = this;","","				if (event.src != UI) {","					instance._uiSetUri(event.newVal);","				}","			},","","			_bindEvents: function() {","				var instance = this;","","				instance.afterHostEvent('heightChange', instance._updateIframeSize, instance);","				instance.afterHostEvent('widthChange', instance._updateIframeSize, instance);","","				instance.afterHostEvent('visibleChange', instance._afterDialogVisibleChange);","","				instance.after('uriChange', instance._afterUriChange);","","				var bindLoadHandler = instance.get('bindLoadHandler');","","				bindLoadHandler.call(instance);","			},","","			_detachEventHandles: function() {","				var instance = this;","","				var eventHandles = instance._eventHandles;","","				A.Array.invoke(eventHandles, 'detach');","","				eventHandles.length = 0;","			},","","			_defaultLoadIframeFn: function(event) {","				var instance = this;","","				var node = instance.node;","","				try {","					var iframeWindow = node.get('contentWindow');","","					iframeWindow.once('unload', instance._detachEventHandles, instance);","","					var iframeDoc = iframeWindow.get('document');","","					iframeDoc.get('documentElement').addClass(CSS_IFRAME_ROOT_NODE);","","					instance.set('uri', iframeDoc.get('location.href'), UI_SRC);","","					if (instance.get('closeOnEscape')) {","						instance._eventHandles.push(","							A.on(","								'key',","								function(event) {","									instance._host.close();","								},","								[iframeDoc],","								'down:27'","							)","						);","					}","				}","				catch (e) {","				}","","				instance._bodyNode.loadingmask.hide();","			},","","			_plugIframe: function() {","				var instance = this;","","				instance._previousBodyContent = instance._host.get('bodyContent');","","				var iframeTpl = Lang.sub(","					TPL_IFRAME,","					{","						cssClass: instance.get('iframeCssClass'),","						id: instance.get('iframeId'),","						uri: instance.get('uri')","					}","				);","","				var node = A.Node.create(iframeTpl);","","				node.plug(A.Plugin.ResizeIframe);","","				node.resizeiframe.addTarget(instance);","","				instance._host.set('bodyContent', node);","","				var bodyNode = instance._host.bodyNode;","","				bodyNode.addClass(CSS_IFRAME_BD);","","				instance._bodyNode = bodyNode;","				instance.node = node;","			},","","			_setIframeCssClass: function(value) {","				BUFFER_CSS_CLASS[1] = value;","","				return BUFFER_CSS_CLASS.join(' ');","			},","","			_uiSetMonitor: function(value) {","				var instance = this;","","				var resizeIframe = instance.node.resizeiframe;","","				if (value) {","					resizeIframe.restartMonitor();","				}","				else {","					resizeIframe.pauseMonitor();","				}","			},","","			_uiSetUri: function(value) {","				var instance = this;","","				if (instance._bodyNode.loadingmask) {","					instance._bodyNode.loadingmask.show();","				}","","				instance.node.attr('src', value);","			},","","			_updateIframeSize: function(event) {","				var instance = this;","","				var bodyNode = instance._bodyNode;","				var node = instance.node;","","				var updateIframeSizeUI = instance._updateIframeSizeUI;","","				if (!updateIframeSizeUI) {","					updateIframeSizeUI = function() {","						var bodyHeight = bodyNode.getStyle('height');","","						node.resizeiframe.set('height', bodyHeight);","","						bodyNode.loadingmask.refreshMask();","					};","","					instance._updateIframeSizeUI = updateIframeSizeUI;","				}","","				A.setTimeout(updateIframeSizeUI, 50);","			}","		}","	}",");","","A.Plugin.DialogIframe = DialogIframePlugin;","","}, '@VERSION@' ,{requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin'], skinnable:true});"];
_yuitest_coverage["/build/aui-dialog-iframe/aui-dialog-iframe.js"].lines = {"1":0,"2":0,"20":0,"26":0,"28":0,"43":0,"45":0,"58":0,"60":0,"62":0,"64":0,"71":0,"79":0,"81":0,"83":0,"85":0,"89":0,"91":0,"95":0,"97":0,"101":0,"103":0,"105":0,"107":0,"109":0,"111":0,"113":0,"115":0,"119":0,"121":0,"122":0,"127":0,"129":0,"130":0,"132":0,"134":0,"136":0,"138":0,"142":0,"144":0,"146":0,"148":0,"152":0,"154":0,"156":0,"157":0,"159":0,"161":0,"163":0,"165":0,"167":0,"168":0,"172":0,"183":0,"187":0,"189":0,"191":0,"200":0,"202":0,"204":0,"206":0,"208":0,"210":0,"212":0,"213":0,"217":0,"219":0,"223":0,"225":0,"227":0,"228":0,"231":0,"236":0,"238":0,"239":0,"242":0,"246":0,"248":0,"249":0,"251":0,"253":0,"254":0,"255":0,"257":0,"259":0,"262":0,"265":0,"271":0};
_yuitest_coverage["/build/aui-dialog-iframe/aui-dialog-iframe.js"].functions = {"value:25":0,"valueFn:42":0,"initializer:57":0,"destructor:78":0,"_afterDialogVisibleChange:88":0,"_afterMaskVisibleChange:94":0,"_afterRenderUI:100":0,"_afterUriChange:118":0,"_bindEvents:126":0,"_detachEventHandles:141":0,"(anonymous 2):171":0,"_defaultLoadIframeFn:151":0,"_plugIframe:186":0,"_setIframeCssClass:216":0,"_uiSetMonitor:222":0,"_uiSetUri:235":0,"updateIframeSizeUI:254":0,"_updateIframeSize:245":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-dialog-iframe/aui-dialog-iframe.js"].coveredLines = 88;
_yuitest_coverage["/build/aui-dialog-iframe/aui-dialog-iframe.js"].coveredFunctions = 19;
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 1);
AUI.add('aui-dialog-iframe', function(A) {
_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 2);
var Lang = A.Lang,
	getClassName = A.getClassName,

	IFRAME = 'iframe',

	CSS_IFRAME_BD = getClassName('dialog', IFRAME, 'bd'),
	CSS_IFRAME_NODE = getClassName('dialog', IFRAME, 'node'),
	CSS_IFRAME_ROOT_NODE = getClassName('dialog', IFRAME, 'root', 'node'),

	BUFFER_CSS_CLASS = [CSS_IFRAME_NODE],

	TPL_IFRAME = '<iframe class="{cssClass}" frameborder="0" id="{id}" name="{id}" src="{uri}"></iframe>',

	UI = A.Widget.UI_SRC,
	UI_SRC = {
		src: UI
	};

_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 20);
var DialogIframePlugin = A.Component.create(
	{
		ATTRS: {
			bindLoadHandler: {
				validator: Lang.isFunction,
				value: function() {
					_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "value", 25);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 26);
var instance = this;

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 28);
instance.node.on('load', A.bind(instance.fire, instance, 'load'));
				}
			},

			closeOnEscape: {
				value: true
			},

			iframeCssClass: {
				value: '',
				setter: '_setIframeCssClass'
			},

			iframeId: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "valueFn", 42);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 43);
var instance = this;

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 45);
return instance.get('id') || A.guid();
				}
			},

			uri: {
			}
		},

		EXTENDS: A.Plugin.Base,
		NAME: IFRAME,
		NS: IFRAME,
		prototype: {
			initializer: function(config) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "initializer", 57);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 58);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 60);
instance._host = instance.get('host');

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 62);
instance._eventHandles = [];

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 64);
instance.publish(
					'load',
					{
						defaultFn: instance._defaultLoadIframeFn
					}
				);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 71);
instance.afterHostMethod(
					'renderUI',
					A.debounce(instance._afterRenderUI, 50, instance),
					instance
				);
			},

			destructor: function() {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "destructor", 78);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 79);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 81);
instance._detachEventHandles();

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 83);
instance._host.set('bodyContent', instance._previousBodyContent);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 85);
instance.node.remove(true);
			},

			_afterDialogVisibleChange: function(event) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_afterDialogVisibleChange", 88);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 89);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 91);
instance._uiSetMonitor(event.newVal);
			},

			_afterMaskVisibleChange: function(event) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_afterMaskVisibleChange", 94);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 95);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 97);
instance._uiSetMonitor(!event.newVal);
			},

			_afterRenderUI: function() {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_afterRenderUI", 100);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 101);
var instance = this;
				
				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 103);
instance._plugIframe();

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 105);
instance._bindEvents();

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 107);
var bodyNode = instance._bodyNode;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 109);
bodyNode.plug(A.LoadingMask);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 111);
var loadingMask = bodyNode.loadingmask;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 113);
loadingMask.overlayMask.after('visibleChange', instance._afterMaskVisibleChange, instance);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 115);
loadingMask.show();
			},

			_afterUriChange: function(event) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_afterUriChange", 118);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 119);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 121);
if (event.src != UI) {
					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 122);
instance._uiSetUri(event.newVal);
				}
			},

			_bindEvents: function() {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_bindEvents", 126);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 127);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 129);
instance.afterHostEvent('heightChange', instance._updateIframeSize, instance);
				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 130);
instance.afterHostEvent('widthChange', instance._updateIframeSize, instance);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 132);
instance.afterHostEvent('visibleChange', instance._afterDialogVisibleChange);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 134);
instance.after('uriChange', instance._afterUriChange);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 136);
var bindLoadHandler = instance.get('bindLoadHandler');

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 138);
bindLoadHandler.call(instance);
			},

			_detachEventHandles: function() {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_detachEventHandles", 141);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 142);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 144);
var eventHandles = instance._eventHandles;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 146);
A.Array.invoke(eventHandles, 'detach');

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 148);
eventHandles.length = 0;
			},

			_defaultLoadIframeFn: function(event) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_defaultLoadIframeFn", 151);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 152);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 154);
var node = instance.node;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 156);
try {
					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 157);
var iframeWindow = node.get('contentWindow');

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 159);
iframeWindow.once('unload', instance._detachEventHandles, instance);

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 161);
var iframeDoc = iframeWindow.get('document');

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 163);
iframeDoc.get('documentElement').addClass(CSS_IFRAME_ROOT_NODE);

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 165);
instance.set('uri', iframeDoc.get('location.href'), UI_SRC);

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 167);
if (instance.get('closeOnEscape')) {
						_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 168);
instance._eventHandles.push(
							A.on(
								'key',
								function(event) {
									_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "(anonymous 2)", 171);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 172);
instance._host.close();
								},
								[iframeDoc],
								'down:27'
							)
						);
					}
				}
				catch (e) {
				}

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 183);
instance._bodyNode.loadingmask.hide();
			},

			_plugIframe: function() {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_plugIframe", 186);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 187);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 189);
instance._previousBodyContent = instance._host.get('bodyContent');

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 191);
var iframeTpl = Lang.sub(
					TPL_IFRAME,
					{
						cssClass: instance.get('iframeCssClass'),
						id: instance.get('iframeId'),
						uri: instance.get('uri')
					}
				);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 200);
var node = A.Node.create(iframeTpl);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 202);
node.plug(A.Plugin.ResizeIframe);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 204);
node.resizeiframe.addTarget(instance);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 206);
instance._host.set('bodyContent', node);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 208);
var bodyNode = instance._host.bodyNode;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 210);
bodyNode.addClass(CSS_IFRAME_BD);

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 212);
instance._bodyNode = bodyNode;
				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 213);
instance.node = node;
			},

			_setIframeCssClass: function(value) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_setIframeCssClass", 216);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 217);
BUFFER_CSS_CLASS[1] = value;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 219);
return BUFFER_CSS_CLASS.join(' ');
			},

			_uiSetMonitor: function(value) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_uiSetMonitor", 222);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 223);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 225);
var resizeIframe = instance.node.resizeiframe;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 227);
if (value) {
					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 228);
resizeIframe.restartMonitor();
				}
				else {
					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 231);
resizeIframe.pauseMonitor();
				}
			},

			_uiSetUri: function(value) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_uiSetUri", 235);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 236);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 238);
if (instance._bodyNode.loadingmask) {
					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 239);
instance._bodyNode.loadingmask.show();
				}

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 242);
instance.node.attr('src', value);
			},

			_updateIframeSize: function(event) {
				_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "_updateIframeSize", 245);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 246);
var instance = this;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 248);
var bodyNode = instance._bodyNode;
				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 249);
var node = instance.node;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 251);
var updateIframeSizeUI = instance._updateIframeSizeUI;

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 253);
if (!updateIframeSizeUI) {
					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 254);
updateIframeSizeUI = function() {
						_yuitest_coverfunc("/build/aui-dialog-iframe/aui-dialog-iframe.js", "updateIframeSizeUI", 254);
_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 255);
var bodyHeight = bodyNode.getStyle('height');

						_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 257);
node.resizeiframe.set('height', bodyHeight);

						_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 259);
bodyNode.loadingmask.refreshMask();
					};

					_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 262);
instance._updateIframeSizeUI = updateIframeSizeUI;
				}

				_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 265);
A.setTimeout(updateIframeSizeUI, 50);
			}
		}
	}
);

_yuitest_coverline("/build/aui-dialog-iframe/aui-dialog-iframe.js", 271);
A.Plugin.DialogIframe = DialogIframePlugin;

}, '@VERSION@' ,{requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin'], skinnable:true});
