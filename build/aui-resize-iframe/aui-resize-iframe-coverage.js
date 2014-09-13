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
_yuitest_coverage["/build/aui-resize-iframe/aui-resize-iframe.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-resize-iframe/aui-resize-iframe.js",
    code: []
};
_yuitest_coverage["/build/aui-resize-iframe/aui-resize-iframe.js"].code=["AUI.add('aui-resize-iframe', function(A) {","var Lang = A.Lang,","	isString = Lang.isString,","","	RESIZE_IFRAME = 'resizeiframe',","","	getClassName = A.getClassName,","","	HEIGHT = 'height',","	HIDDEN = 'hidden',","	NO = 'no',","	SCROLLING = 'scrolling',","	WIDTH = 'width',","","	CSS_RESIZE_IFRAME_MONITORED_HEIGHT = getClassName(RESIZE_IFRAME, 'monitored', HEIGHT);","","ResizeIframe = A.Component.create(","	{","		NAME: RESIZE_IFRAME,","		NS: RESIZE_IFRAME,","","		EXTENDS: A.Plugin.Base,","","		ATTRS: {","			height: {","				value: 0","			},","			monitorHeight: {","				value: true","			},","			width: {","				value: null","			}","		},","","		prototype: {","			initializer: function(config) {","				var instance = this;","","				var frame = instance.get('host');","","				instance.node = frame;","				instance._iframeEl = frame.getDOM();","","				instance._defaultHeight = config.height;","","				instance.bindUI();","				instance.syncUI();","			},","","			bindUI: function() {","				var instance = this;","","				instance.after('heightChange', instance._afterHeightChange);","				instance.after('monitorHeightChange', instance._afterMonitorHeightChange);","				instance.after('widthChange', instance._afterWidthChange);","			},","","			syncUI: function() {","				var instance = this;","","				instance._uiSetMonitorHeight(instance.get('monitorHeight'));","			},","","			destructor: function() {","				var instance = this;","","				instance._uiSetMonitorHeight(false);","			},","","			pauseMonitor: function() {","				var instance = this;","","				instance._clearInterval();","			},","","			restartMonitor: function() {","				var instance = this;","","				if (instance.get('monitorHeight')) {","					instance._setInterval();","				}","			},","","			_afterHeightChange: function(event) {","				var instance = this;","","				instance.set('monitorHeight', false);","","				instance._uiSetHeight(event.newVal);","			},","","			_afterMonitorHeightChange: function(event) {","				var instance = this;","","				instance._uiSetMonitorHeight(event.newVal);","			},","","			_afterWidthChange: function(event) {","				var instance = this;","","				instance._uiSetWidth(event.newVal);","			},","","			_clearInterval: function() {","				var instance = this;","","				var iframeDoc = instance._iframeDoc;","","				if (iframeDoc) {","					try {","						var docEl = iframeDoc.documentElement;","","						if (docEl) {","							docEl.style.overflowY = '';","						}","					}","					catch (e) {","					}","				}","","				if (instance._intervalId) {","					A.clearInterval(instance._intervalId);","","					instance._intervalId = null;","				}","			},","","			_onResize: function() {","				var instance = this;","","				instance._iframeDoc = null;","","				var newHeight = instance._iframeHeight;","				var iframeWin = instance._iframeEl.contentWindow;","","				var iframeDoc;","","				try {","					iframeDoc = iframeWin.document;","","					instance._iframeDoc = iframeDoc;","				}","				catch (e) {","				}","","				if (iframeDoc) {","					newHeight = ResizeIframe._getContentHeight(iframeWin, iframeDoc, instance._iframeHeight);","","					instance._uiSetHeight(newHeight);","				}","				else {","					instance._clearInterval();","","					instance._uiSetHeight(instance._defaultHeight);","				}","			},","","			_setInterval: function(event) {","				var instance = this;","","				if (!instance._intervalId) {","					instance._intervalId = A.setInterval(instance._onResize, 100, instance);","				}","			},","","			_uiSetHeight: function(value) {","				var instance = this;","","				if (instance._iframeHeight != value) {","					instance._iframeHeight = value;","","					instance.node.setStyle(HEIGHT, value);","				}","			},","","			_uiSetMonitorHeight: function(monitorHeight) {","				var instance = this;","","				var iframe = instance.node;","","				if (monitorHeight) {","					instance._setInterval();","","					instance._loadHandle = iframe.on('load', instance._setInterval, instance);","","					iframe.addClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);","				}","				else {","					instance._clearInterval();","","					if (instance._loadHandle) {","						instance._loadHandle.detach();","					}","","					iframe.removeClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);","				}","			},","","			_uiSetWidth: function(value) {","				var instance = this;","","				instance.node.setStyle(WIDTH, value);","			},","","			_iframeHeight: 0","		}","	}",");","","A.mix(","	ResizeIframe,","	{","		getContentHeight: function(iframeWin) {","			var contentHeight = null;","","			try {","				var iframeDoc;","","				if (iframeWin.nodeName && iframeWin.nodeName.toLowerCase() == 'iframe') {","					iframeWin = iframeWin.contentWindow;","				}","				else if (A.instanceOf(iframeWin, A.Node)) {","					iframeWin = iframeWin.getDOM().contentWindow;","				}","","				iframeDoc = iframeWin.document;","","				contentHeight = ResizeIframe._getContentHeight(iframeWin, iframeDoc);","			}","			catch (e) {","			}","","			return contentHeight;","		},","","		_getContentHeight: function(iframeWin, iframeDoc, fallbackHeight) {","			var contentHeight = null;","","			if (iframeDoc && iframeWin.location.href != 'about:blank') {","				var docEl = iframeDoc.documentElement;","				var iframeBody = iframeDoc.body;","","				if (docEl) {","					docEl.style.overflowY = HIDDEN;","				}","","				var docOffsetHeight = (iframeBody && iframeBody.offsetHeight) || 0;","","				var standardsMode = (iframeDoc.compatMode == 'CSS1Compat');","","				if (standardsMode && docOffsetHeight) {","					contentHeight = docOffsetHeight;","				}","				else {","					contentHeight = ResizeIframe._getQuirksHeight(iframeWin) || fallbackHeight;","				}","			}","","			return contentHeight;","		},","","		_getQuirksHeight: function(iframeWin) {","			var contentHeight = 0;","","			var iframeDoc = iframeWin.document;","			var docEl = iframeDoc && iframeDoc.documentElement;","			var iframeBody = iframeDoc && iframeDoc.body;","","			var viewPortHeight = 0;","","			if (iframeWin.innerHeight) {","				viewPortHeight = iframeWin.innerHeight;","			}","			else if (docEl && docEl.clientHeight) {","				viewPortHeight = docEl.clientHeight;","			}","			else if (iframeBody) {","				viewPortHeight = iframeBody.clientHeight;","			}","","			if (iframeDoc) {","				var docClientHeight;","				var docScrollHeight;","				var docOffsetHeight = (iframeBody && iframeBody.offsetHeight);","","				if (docEl) {","					docClientHeight = docEl.clientHeight;","					docScrollHeight = docEl.scrollHeight;","					docOffsetHeight = docEl.offsetHeight;","				}","","				if (docClientHeight != docOffsetHeight && iframeBody) {","					docOffsetHeight = iframeBody.offsetHeight;","					docScrollHeight = iframeBody.scrollHeight;","				}","","				var compareNum;","","				if (docScrollHeight > viewPortHeight) {","					compareNum = Math.max;","				}","				else {","					compareNum = Math.min;","				}","","				contentHeight = compareNum(docScrollHeight, docOffsetHeight);","			}","","			return contentHeight;","		}","	}",");","","A.Plugin.ResizeIframe = ResizeIframe;","","}, '@VERSION@' ,{requires:['aui-base','aui-task-manager','plugin'], skinnable:true});"];
_yuitest_coverage["/build/aui-resize-iframe/aui-resize-iframe.js"].lines = {"1":0,"2":0,"17":0,"38":0,"40":0,"42":0,"43":0,"45":0,"47":0,"48":0,"52":0,"54":0,"55":0,"56":0,"60":0,"62":0,"66":0,"68":0,"72":0,"74":0,"78":0,"80":0,"81":0,"86":0,"88":0,"90":0,"94":0,"96":0,"100":0,"102":0,"106":0,"108":0,"110":0,"111":0,"112":0,"114":0,"115":0,"122":0,"123":0,"125":0,"130":0,"132":0,"134":0,"135":0,"137":0,"139":0,"140":0,"142":0,"147":0,"148":0,"150":0,"153":0,"155":0,"160":0,"162":0,"163":0,"168":0,"170":0,"171":0,"173":0,"178":0,"180":0,"182":0,"183":0,"185":0,"187":0,"190":0,"192":0,"193":0,"196":0,"201":0,"203":0,"211":0,"215":0,"217":0,"218":0,"220":0,"221":0,"223":0,"224":0,"227":0,"229":0,"234":0,"238":0,"240":0,"241":0,"242":0,"244":0,"245":0,"248":0,"250":0,"252":0,"253":0,"256":0,"260":0,"264":0,"266":0,"267":0,"268":0,"270":0,"272":0,"273":0,"275":0,"276":0,"278":0,"279":0,"282":0,"283":0,"284":0,"285":0,"287":0,"288":0,"289":0,"290":0,"293":0,"294":0,"295":0,"298":0,"300":0,"301":0,"304":0,"307":0,"310":0,"315":0};
_yuitest_coverage["/build/aui-resize-iframe/aui-resize-iframe.js"].functions = {"initializer:37":0,"bindUI:51":0,"syncUI:59":0,"destructor:65":0,"pauseMonitor:71":0,"restartMonitor:77":0,"_afterHeightChange:85":0,"_afterMonitorHeightChange:93":0,"_afterWidthChange:99":0,"_clearInterval:105":0,"_onResize:129":0,"_setInterval:159":0,"_uiSetHeight:167":0,"_uiSetMonitorHeight:177":0,"_uiSetWidth:200":0,"getContentHeight:214":0,"_getContentHeight:237":0,"_getQuirksHeight:263":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-resize-iframe/aui-resize-iframe.js"].coveredLines = 124;
_yuitest_coverage["/build/aui-resize-iframe/aui-resize-iframe.js"].coveredFunctions = 19;
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 1);
AUI.add('aui-resize-iframe', function(A) {
_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 2);
var Lang = A.Lang,
	isString = Lang.isString,

	RESIZE_IFRAME = 'resizeiframe',

	getClassName = A.getClassName,

	HEIGHT = 'height',
	HIDDEN = 'hidden',
	NO = 'no',
	SCROLLING = 'scrolling',
	WIDTH = 'width',

	CSS_RESIZE_IFRAME_MONITORED_HEIGHT = getClassName(RESIZE_IFRAME, 'monitored', HEIGHT);

_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 17);
ResizeIframe = A.Component.create(
	{
		NAME: RESIZE_IFRAME,
		NS: RESIZE_IFRAME,

		EXTENDS: A.Plugin.Base,

		ATTRS: {
			height: {
				value: 0
			},
			monitorHeight: {
				value: true
			},
			width: {
				value: null
			}
		},

		prototype: {
			initializer: function(config) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "initializer", 37);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 38);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 40);
var frame = instance.get('host');

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 42);
instance.node = frame;
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 43);
instance._iframeEl = frame.getDOM();

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 45);
instance._defaultHeight = config.height;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 47);
instance.bindUI();
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 48);
instance.syncUI();
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "bindUI", 51);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 52);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 54);
instance.after('heightChange', instance._afterHeightChange);
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 55);
instance.after('monitorHeightChange', instance._afterMonitorHeightChange);
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 56);
instance.after('widthChange', instance._afterWidthChange);
			},

			syncUI: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "syncUI", 59);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 60);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 62);
instance._uiSetMonitorHeight(instance.get('monitorHeight'));
			},

			destructor: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "destructor", 65);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 66);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 68);
instance._uiSetMonitorHeight(false);
			},

			pauseMonitor: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "pauseMonitor", 71);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 72);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 74);
instance._clearInterval();
			},

			restartMonitor: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "restartMonitor", 77);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 78);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 80);
if (instance.get('monitorHeight')) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 81);
instance._setInterval();
				}
			},

			_afterHeightChange: function(event) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_afterHeightChange", 85);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 86);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 88);
instance.set('monitorHeight', false);

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 90);
instance._uiSetHeight(event.newVal);
			},

			_afterMonitorHeightChange: function(event) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_afterMonitorHeightChange", 93);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 94);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 96);
instance._uiSetMonitorHeight(event.newVal);
			},

			_afterWidthChange: function(event) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_afterWidthChange", 99);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 100);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 102);
instance._uiSetWidth(event.newVal);
			},

			_clearInterval: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_clearInterval", 105);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 106);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 108);
var iframeDoc = instance._iframeDoc;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 110);
if (iframeDoc) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 111);
try {
						_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 112);
var docEl = iframeDoc.documentElement;

						_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 114);
if (docEl) {
							_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 115);
docEl.style.overflowY = '';
						}
					}
					catch (e) {
					}
				}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 122);
if (instance._intervalId) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 123);
A.clearInterval(instance._intervalId);

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 125);
instance._intervalId = null;
				}
			},

			_onResize: function() {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_onResize", 129);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 130);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 132);
instance._iframeDoc = null;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 134);
var newHeight = instance._iframeHeight;
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 135);
var iframeWin = instance._iframeEl.contentWindow;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 137);
var iframeDoc;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 139);
try {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 140);
iframeDoc = iframeWin.document;

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 142);
instance._iframeDoc = iframeDoc;
				}
				catch (e) {
				}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 147);
if (iframeDoc) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 148);
newHeight = ResizeIframe._getContentHeight(iframeWin, iframeDoc, instance._iframeHeight);

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 150);
instance._uiSetHeight(newHeight);
				}
				else {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 153);
instance._clearInterval();

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 155);
instance._uiSetHeight(instance._defaultHeight);
				}
			},

			_setInterval: function(event) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_setInterval", 159);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 160);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 162);
if (!instance._intervalId) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 163);
instance._intervalId = A.setInterval(instance._onResize, 100, instance);
				}
			},

			_uiSetHeight: function(value) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_uiSetHeight", 167);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 168);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 170);
if (instance._iframeHeight != value) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 171);
instance._iframeHeight = value;

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 173);
instance.node.setStyle(HEIGHT, value);
				}
			},

			_uiSetMonitorHeight: function(monitorHeight) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_uiSetMonitorHeight", 177);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 178);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 180);
var iframe = instance.node;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 182);
if (monitorHeight) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 183);
instance._setInterval();

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 185);
instance._loadHandle = iframe.on('load', instance._setInterval, instance);

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 187);
iframe.addClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);
				}
				else {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 190);
instance._clearInterval();

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 192);
if (instance._loadHandle) {
						_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 193);
instance._loadHandle.detach();
					}

					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 196);
iframe.removeClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);
				}
			},

			_uiSetWidth: function(value) {
				_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_uiSetWidth", 200);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 201);
var instance = this;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 203);
instance.node.setStyle(WIDTH, value);
			},

			_iframeHeight: 0
		}
	}
);

_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 211);
A.mix(
	ResizeIframe,
	{
		getContentHeight: function(iframeWin) {
			_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "getContentHeight", 214);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 215);
var contentHeight = null;

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 217);
try {
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 218);
var iframeDoc;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 220);
if (iframeWin.nodeName && iframeWin.nodeName.toLowerCase() == 'iframe') {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 221);
iframeWin = iframeWin.contentWindow;
				}
				else {_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 223);
if (A.instanceOf(iframeWin, A.Node)) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 224);
iframeWin = iframeWin.getDOM().contentWindow;
				}}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 227);
iframeDoc = iframeWin.document;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 229);
contentHeight = ResizeIframe._getContentHeight(iframeWin, iframeDoc);
			}
			catch (e) {
			}

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 234);
return contentHeight;
		},

		_getContentHeight: function(iframeWin, iframeDoc, fallbackHeight) {
			_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_getContentHeight", 237);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 238);
var contentHeight = null;

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 240);
if (iframeDoc && iframeWin.location.href != 'about:blank') {
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 241);
var docEl = iframeDoc.documentElement;
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 242);
var iframeBody = iframeDoc.body;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 244);
if (docEl) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 245);
docEl.style.overflowY = HIDDEN;
				}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 248);
var docOffsetHeight = (iframeBody && iframeBody.offsetHeight) || 0;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 250);
var standardsMode = (iframeDoc.compatMode == 'CSS1Compat');

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 252);
if (standardsMode && docOffsetHeight) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 253);
contentHeight = docOffsetHeight;
				}
				else {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 256);
contentHeight = ResizeIframe._getQuirksHeight(iframeWin) || fallbackHeight;
				}
			}

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 260);
return contentHeight;
		},

		_getQuirksHeight: function(iframeWin) {
			_yuitest_coverfunc("/build/aui-resize-iframe/aui-resize-iframe.js", "_getQuirksHeight", 263);
_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 264);
var contentHeight = 0;

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 266);
var iframeDoc = iframeWin.document;
			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 267);
var docEl = iframeDoc && iframeDoc.documentElement;
			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 268);
var iframeBody = iframeDoc && iframeDoc.body;

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 270);
var viewPortHeight = 0;

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 272);
if (iframeWin.innerHeight) {
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 273);
viewPortHeight = iframeWin.innerHeight;
			}
			else {_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 275);
if (docEl && docEl.clientHeight) {
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 276);
viewPortHeight = docEl.clientHeight;
			}
			else {_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 278);
if (iframeBody) {
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 279);
viewPortHeight = iframeBody.clientHeight;
			}}}

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 282);
if (iframeDoc) {
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 283);
var docClientHeight;
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 284);
var docScrollHeight;
				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 285);
var docOffsetHeight = (iframeBody && iframeBody.offsetHeight);

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 287);
if (docEl) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 288);
docClientHeight = docEl.clientHeight;
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 289);
docScrollHeight = docEl.scrollHeight;
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 290);
docOffsetHeight = docEl.offsetHeight;
				}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 293);
if (docClientHeight != docOffsetHeight && iframeBody) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 294);
docOffsetHeight = iframeBody.offsetHeight;
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 295);
docScrollHeight = iframeBody.scrollHeight;
				}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 298);
var compareNum;

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 300);
if (docScrollHeight > viewPortHeight) {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 301);
compareNum = Math.max;
				}
				else {
					_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 304);
compareNum = Math.min;
				}

				_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 307);
contentHeight = compareNum(docScrollHeight, docOffsetHeight);
			}

			_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 310);
return contentHeight;
		}
	}
);

_yuitest_coverline("/build/aui-resize-iframe/aui-resize-iframe.js", 315);
A.Plugin.ResizeIframe = ResizeIframe;

}, '@VERSION@' ,{requires:['aui-base','aui-task-manager','plugin'], skinnable:true});
