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
_yuitest_coverage["/build/aui-node-html5-print/aui-node-html5-print.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-node-html5-print/aui-node-html5-print.js",
    code: []
};
_yuitest_coverage["/build/aui-node-html5-print/aui-node-html5-print.js"].code=["AUI.add('aui-node-html5-print', function(A) {","var CONFIG = A.config,","	DOC = CONFIG.doc,","	WIN = CONFIG.win,","	UA = A.UA,","	IE = UA.ie,","","	isShivDisabled = function() {","		return WIN.AUI_HTML5_IE === false;","	};","","if (!IE || IE >= 9 || isShivDisabled()) {","	return;","}","","var BUFFER_CSS_TEXT = [],","","	CSS_PRINTFIX = 'aui-printfix',","	CSS_PRINTFIX_PREFIX = 'aui-printfix-',","","	LOCATION = WIN.location,","","	DOMAIN = LOCATION.protocol + '//' + LOCATION.host,","","	GLOBAL_AUI = YUI.AUI,","","	HTML = DOC.documentElement,","","	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,","	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,","	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),","","	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),","	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),","	REGEX_ELEMENTS_FAST = new RegExp('\\\\b(' + HTML5_ELEMENTS_LIST + ')\\\\b', 'i'),","","	REGEX_PRINT_MEDIA = /print|all/,","","	REGEX_RULE = new RegExp('(^|[^\\\\n{}]*?\\\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),","	REGEX_TAG = new RegExp('<(\\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),","","	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',","","	STR_ALL = 'all',","	STR_BLANK = ' ',","	STR_EMPTY = '',","","	STR_BRACKET_OPEN = '{',","	STR_BRACKET_CLOSE = '}',","","	STR_CHECKBOX = 'checkbox',","	STR_CHECKED = 'checked',","	STR_HTTPS = 'https',","	STR_INPUT = 'INPUT',","	STR_OPTION = 'OPTION',","	STR_RADIO = 'radio',","	STR_SELECTED = 'selected',","	STR_STAR = '*',","	STR_URL = 'url(',","	STR_URL_DOMAIN = STR_URL + DOMAIN,","","	TAG_REPLACE_ORIGINAL = '<$1$2',","	TAG_REPLACE_FONT = '<$1font';","","var html5shiv = GLOBAL_AUI.html5shiv,","	// Yes, IE does this wackiness; converting an object","	// to a string should never result in undefined, but","	// IE's styleSheet object sometimes becomes inaccessible","	// after trying to print the second time","	isStylesheetDefined = function(obj) {","		return obj && (obj + STR_EMPTY !== undefined);","	},","","	toggleNode = function(node, origNode, prop) {","		var state = origNode[prop];","","		if (state) {","			node.setAttribute(prop, state);","		}","		else {","			node.removeAttribute(prop);","		}","	};","","	html5shiv(DOC);","","var PrintFix = function() {","	var afterPrint = function() {","		if (isShivDisabled()) {","			destroy();","		}","		else {","			PrintFix.onAfterPrint();","		}","	};","","	var beforePrint = function() {","		if (isShivDisabled()) {","			destroy();","		}","		else {","			PrintFix.onBeforePrint();","		}","	};","","	var destroy = function() {","		WIN.detachEvent('onafterprint', afterPrint);","		WIN.detachEvent('onbeforeprint', beforePrint);","	};","","	var init = function() {","		WIN.attachEvent('onafterprint', afterPrint);","		WIN.attachEvent('onbeforeprint', beforePrint);","	};","","	init();","","	PrintFix.destroy = destroy;","	PrintFix.init = init;","};","","A.mix(","	PrintFix,","	{","		onAfterPrint: function() {","			var instance = this;","","			instance.restoreHTML();","","			var styleSheet = instance._getStyleSheet();","","			styleSheet.styleSheet.cssText = STR_EMPTY;","		},","","		onBeforePrint: function() {","			var instance = this;","","			var styleSheet = instance._getStyleSheet();","			var cssRules = instance._getAllCSSText();","","			styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);","","			instance.writeHTML();","		},","","		parseCSS: function(cssText) {","			var instance = this;","","			var css = STR_EMPTY;","			var rules = cssText.match(REGEX_RULE);","","			if (rules) {","				css = rules.join('\\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);","			}","","			return css;","		},","","		restoreHTML: function() {","			var instance = this;","","			var bodyClone = instance._getBodyClone();","			var bodyEl = instance._getBodyEl();","","			bodyClone.innerHTML = STR_EMPTY;","","			HTML.removeChild(bodyClone);","			HTML.appendChild(bodyEl);","		},","","		writeHTML: function() {","			var instance = this;","","			var i = -1;","			var j;","","			var bodyEl = instance._getBodyEl();","","			var html5Element;","","			var cssClass;","","			var nodeList;","			var nodeListLength;","			var node;","			var buffer = [];","","			while (++i < HTML5_ELEMENTS_LENGTH) {","				html5Element = HTML5_ELEMENTS[i];","","				nodeList = DOC.getElementsByTagName(html5Element);","				nodeListLength = nodeList.length;","","				j = -1;","","				while (++j < nodeListLength) {","					node = nodeList[j];","","					cssClass = node.className;","","					if (cssClass.indexOf(CSS_PRINTFIX_PREFIX) == -1) {","						buffer[0] = CSS_PRINTFIX_PREFIX + html5Element;","						buffer[1] = cssClass;","","						node.className = buffer.join(STR_BLANK);","					}","				}","			}","","			var docFrag = instance._getDocFrag();","			var bodyClone = instance._getBodyClone();","","			docFrag.appendChild(bodyEl);","			HTML.appendChild(bodyClone);","","			bodyClone.className = bodyEl.className;","			bodyClone.id = bodyEl.id;","","			var originalNodes = bodyEl.getElementsByTagName(STR_STAR);","			var length = originalNodes.length;","","			// IE will throw a mixed content warning when using https","			// and calling clone node if the body contains elements with","			// an inline background-image style that is relative to the domain.","			if (UA.secure) {","				var bodyElStyle = bodyEl.style;","","				var elStyle;","				var backgroundImage;","","				bodyElStyle.display = 'none';","","				for (i = 0; i < length; i++) {","					elStyle = originalNodes[i].style;","","					backgroundImage = elStyle.backgroundImage;","","					if (backgroundImage &&","						backgroundImage.indexOf(STR_URL) > -1 &&","						backgroundImage.indexOf(STR_HTTPS) == -1) {","","						elStyle.backgroundImage = backgroundImage.replace(STR_URL, STR_URL_DOMAIN);","					}","				}","","				bodyElStyle.display = STR_EMPTY;","			}","","			var bodyElClone = bodyEl.cloneNode(true);","","			var newNodes = bodyElClone.getElementsByTagName(STR_STAR);","","			if (length == newNodes.length) {","				while (length--) {","					var newNode = newNodes[length];","					var newNodeName = newNode.nodeName;","","					if (newNodeName == STR_INPUT || newNodeName == STR_OPTION) {","						var originalNode = originalNodes[length];","						var originalNodeName = originalNode.nodeName;","","						if (originalNodeName == newNodeName) {","							var prop = null;","","							if (newNodeName == STR_OPTION) {","								prop = STR_SELECTED;","							}","							else if (newNodeName == STR_INPUT && (newNode.type == STR_CHECKBOX || newNode.type == STR_RADIO)) {","								prop = STR_CHECKED;","							}","","							if (prop !== null) {","								toggleNode(newNode, originalNode, prop);","							}","						}","					}","				}","			}","","			var bodyHTML = bodyElClone.innerHTML;","","			bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);","","			bodyClone.innerHTML = bodyHTML;","		},","","		_getAllCSSText: function() {","			var instance = this;","","			var buffer = [];","			var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, STR_ALL);","			var rule;","			var cssText;","","			for (var i = 0; styleSheet = styleSheets[i]; i++) {","				var rules = styleSheet.rules;","","				if (rules && rules.length) {","					for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {","						rule = rules[j];","","						if (!rule.href) {","							cssText = instance._getCSSTextFromRule(rule);","","							buffer.push(cssText);","						}","					}","				}","			}","","			return buffer.join(STR_BLANK);","		},","","		_getCSSTextFromRule: function(rule) {","			var instance = this;","","			var cssText = STR_EMPTY;","","			var ruleStyle = rule.style;","			var ruleCSSText;","			var ruleSelectorText;","","			if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) && REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {","				BUFFER_CSS_TEXT.length = 0;","","				BUFFER_CSS_TEXT.push(ruleSelectorText, STR_BRACKET_OPEN, ruleCSSText, STR_BRACKET_CLOSE);","","				cssText = BUFFER_CSS_TEXT.join(STR_BLANK);","			}","","			return cssText;","		},","","		_getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {","			var instance = this;","","			level = level || 1;","","			buffer = buffer || [];","","			var i;","","			if (isStylesheetDefined(styleSheet)) {","				var imports = styleSheet.imports;","","				mediaType = styleSheet.mediaType || mediaType;","","				if (REGEX_PRINT_MEDIA.test(mediaType)) {","					var length;","","					// IE can crash when trying to access imports more than 3 levels deep","					if (level <= 3 && isStylesheetDefined(imports) && imports.length) {","						for (i = 0, length = imports.length; i < length; i++) {","							instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);","						}","					}","					else if (styleSheet.length) {","						for (i = 0, length = styleSheet.length; i < length; i++) {","							instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);","						}","					}","					else {","						var rules = styleSheet.rules;","						var ruleStyleSheet;","","						if (rules && rules.length) {","							for (i = 0, length = rules.length; i < length; i++) {","								ruleStyleSheet = rules[i].styleSheet;","","								if (ruleStyleSheet) {","									instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);","								}","							}","						}","					}","","					if (!styleSheet.disabled && styleSheet.rules) {","						buffer.push(styleSheet);","					}","				}","			}","","			mediaType = STR_ALL;","","			return buffer;","		},","","		_getBodyEl: function() {","			var instance = this;","","			var bodyEl = instance._bodyEl;","","			if (!bodyEl) {","				bodyEl = DOC.body;","","				instance._bodyEl = bodyEl;","			}","","			return bodyEl;","		},","","		_getBodyClone: function() {","			var instance = this;","","			var bodyClone = instance._bodyClone;","","			if (!bodyClone) {","				bodyClone = DOC.createElement('body');","","				instance._bodyClone = bodyClone;","			}","","			return bodyClone;","		},","","		_getDocFrag: function() {","			var instance = this;","","			var docFrag = instance._docFrag;","","			if (!docFrag) {","				docFrag = DOC.createDocumentFragment();","","				html5shiv(docFrag);","","				instance._docFrag = docFrag;","			}","","			return docFrag;","		},","","		_getStyleSheet: function() {","			var instance = this;","","			var styleSheet = instance._styleSheet;","","			if (!styleSheet) {","				styleSheet = DOC.createElement('style');","","				var head = DOC.documentElement.firstChild;","","				head.insertBefore(styleSheet, head.firstChild);","","				styleSheet.media = 'print';","				styleSheet.className = CSS_PRINTFIX;","","				instance._styleSheet = styleSheet;","			}","","			return styleSheet;","		}","	}",");","","A.namespace('HTML5').PrintFix = PrintFix;","","PrintFix();","","}, '@VERSION@' ,{requires:['aui-node-html5']});"];
_yuitest_coverage["/build/aui-node-html5-print/aui-node-html5-print.js"].lines = {"1":0,"2":0,"9":0,"12":0,"13":0,"16":0,"65":0,"71":0,"75":0,"77":0,"78":0,"81":0,"85":0,"87":0,"88":0,"89":0,"90":0,"93":0,"97":0,"98":0,"99":0,"102":0,"106":0,"107":0,"108":0,"111":0,"112":0,"113":0,"116":0,"118":0,"119":0,"122":0,"126":0,"128":0,"130":0,"132":0,"136":0,"138":0,"139":0,"141":0,"143":0,"147":0,"149":0,"150":0,"152":0,"153":0,"156":0,"160":0,"162":0,"163":0,"165":0,"167":0,"168":0,"172":0,"174":0,"175":0,"177":0,"179":0,"181":0,"183":0,"184":0,"185":0,"186":0,"188":0,"189":0,"191":0,"192":0,"194":0,"196":0,"197":0,"199":0,"201":0,"202":0,"203":0,"205":0,"210":0,"211":0,"213":0,"214":0,"216":0,"217":0,"219":0,"220":0,"225":0,"226":0,"228":0,"229":0,"231":0,"233":0,"234":0,"236":0,"238":0,"242":0,"246":0,"249":0,"251":0,"253":0,"254":0,"255":0,"256":0,"258":0,"259":0,"260":0,"262":0,"263":0,"265":0,"266":0,"268":0,"269":0,"272":0,"273":0,"280":0,"282":0,"284":0,"288":0,"290":0,"291":0,"292":0,"293":0,"295":0,"296":0,"298":0,"299":0,"300":0,"302":0,"303":0,"305":0,"311":0,"315":0,"317":0,"319":0,"320":0,"321":0,"323":0,"324":0,"326":0,"328":0,"331":0,"335":0,"337":0,"339":0,"341":0,"343":0,"344":0,"346":0,"348":0,"349":0,"352":0,"353":0,"354":0,"357":0,"358":0,"359":0,"363":0,"364":0,"366":0,"367":0,"368":0,"370":0,"371":0,"377":0,"378":0,"383":0,"385":0,"389":0,"391":0,"393":0,"394":0,"396":0,"399":0,"403":0,"405":0,"407":0,"408":0,"410":0,"413":0,"417":0,"419":0,"421":0,"422":0,"424":0,"426":0,"429":0,"433":0,"435":0,"437":0,"438":0,"440":0,"442":0,"444":0,"445":0,"447":0,"450":0,"455":0,"457":0};
_yuitest_coverage["/build/aui-node-html5-print/aui-node-html5-print.js"].functions = {"isShivDisabled:8":0,"isStylesheetDefined:70":0,"toggleNode:74":0,"afterPrint:88":0,"beforePrint:97":0,"destroy:106":0,"init:111":0,"PrintFix:87":0,"onAfterPrint:125":0,"onBeforePrint:135":0,"parseCSS:146":0,"restoreHTML:159":0,"writeHTML:171":0,"_getAllCSSText:287":0,"_getCSSTextFromRule:314":0,"_getAllStyleSheets:334":0,"_getBodyEl:388":0,"_getBodyClone:402":0,"_getDocFrag:416":0,"_getStyleSheet:432":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-node-html5-print/aui-node-html5-print.js"].coveredLines = 195;
_yuitest_coverage["/build/aui-node-html5-print/aui-node-html5-print.js"].coveredFunctions = 21;
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 1);
AUI.add('aui-node-html5-print', function(A) {
_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 2);
var CONFIG = A.config,
	DOC = CONFIG.doc,
	WIN = CONFIG.win,
	UA = A.UA,
	IE = UA.ie,

	isShivDisabled = function() {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "isShivDisabled", 8);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 9);
return WIN.AUI_HTML5_IE === false;
	};

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 12);
if (!IE || IE >= 9 || isShivDisabled()) {
	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 13);
return;
}

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 16);
var BUFFER_CSS_TEXT = [],

	CSS_PRINTFIX = 'aui-printfix',
	CSS_PRINTFIX_PREFIX = 'aui-printfix-',

	LOCATION = WIN.location,

	DOMAIN = LOCATION.protocol + '//' + LOCATION.host,

	GLOBAL_AUI = YUI.AUI,

	HTML = DOC.documentElement,

	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,
	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,
	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),

	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS_FAST = new RegExp('\\b(' + HTML5_ELEMENTS_LIST + ')\\b', 'i'),

	REGEX_PRINT_MEDIA = /print|all/,

	REGEX_RULE = new RegExp('(^|[^\\n{}]*?\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),
	REGEX_TAG = new RegExp('<(\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',

	STR_ALL = 'all',
	STR_BLANK = ' ',
	STR_EMPTY = '',

	STR_BRACKET_OPEN = '{',
	STR_BRACKET_CLOSE = '}',

	STR_CHECKBOX = 'checkbox',
	STR_CHECKED = 'checked',
	STR_HTTPS = 'https',
	STR_INPUT = 'INPUT',
	STR_OPTION = 'OPTION',
	STR_RADIO = 'radio',
	STR_SELECTED = 'selected',
	STR_STAR = '*',
	STR_URL = 'url(',
	STR_URL_DOMAIN = STR_URL + DOMAIN,

	TAG_REPLACE_ORIGINAL = '<$1$2',
	TAG_REPLACE_FONT = '<$1font';

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 65);
var html5shiv = GLOBAL_AUI.html5shiv,
	// Yes, IE does this wackiness; converting an object
	// to a string should never result in undefined, but
	// IE's styleSheet object sometimes becomes inaccessible
	// after trying to print the second time
	isStylesheetDefined = function(obj) {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "isStylesheetDefined", 70);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 71);
return obj && (obj + STR_EMPTY !== undefined);
	},

	toggleNode = function(node, origNode, prop) {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "toggleNode", 74);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 75);
var state = origNode[prop];

		_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 77);
if (state) {
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 78);
node.setAttribute(prop, state);
		}
		else {
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 81);
node.removeAttribute(prop);
		}
	};

	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 85);
html5shiv(DOC);

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 87);
var PrintFix = function() {
	_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "PrintFix", 87);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 88);
var afterPrint = function() {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "afterPrint", 88);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 89);
if (isShivDisabled()) {
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 90);
destroy();
		}
		else {
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 93);
PrintFix.onAfterPrint();
		}
	};

	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 97);
var beforePrint = function() {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "beforePrint", 97);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 98);
if (isShivDisabled()) {
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 99);
destroy();
		}
		else {
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 102);
PrintFix.onBeforePrint();
		}
	};

	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 106);
var destroy = function() {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "destroy", 106);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 107);
WIN.detachEvent('onafterprint', afterPrint);
		_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 108);
WIN.detachEvent('onbeforeprint', beforePrint);
	};

	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 111);
var init = function() {
		_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "init", 111);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 112);
WIN.attachEvent('onafterprint', afterPrint);
		_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 113);
WIN.attachEvent('onbeforeprint', beforePrint);
	};

	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 116);
init();

	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 118);
PrintFix.destroy = destroy;
	_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 119);
PrintFix.init = init;
};

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 122);
A.mix(
	PrintFix,
	{
		onAfterPrint: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "onAfterPrint", 125);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 126);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 128);
instance.restoreHTML();

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 130);
var styleSheet = instance._getStyleSheet();

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 132);
styleSheet.styleSheet.cssText = STR_EMPTY;
		},

		onBeforePrint: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "onBeforePrint", 135);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 136);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 138);
var styleSheet = instance._getStyleSheet();
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 139);
var cssRules = instance._getAllCSSText();

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 141);
styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 143);
instance.writeHTML();
		},

		parseCSS: function(cssText) {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "parseCSS", 146);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 147);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 149);
var css = STR_EMPTY;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 150);
var rules = cssText.match(REGEX_RULE);

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 152);
if (rules) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 153);
css = rules.join('\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 156);
return css;
		},

		restoreHTML: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "restoreHTML", 159);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 160);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 162);
var bodyClone = instance._getBodyClone();
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 163);
var bodyEl = instance._getBodyEl();

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 165);
bodyClone.innerHTML = STR_EMPTY;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 167);
HTML.removeChild(bodyClone);
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 168);
HTML.appendChild(bodyEl);
		},

		writeHTML: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "writeHTML", 171);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 172);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 174);
var i = -1;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 175);
var j;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 177);
var bodyEl = instance._getBodyEl();

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 179);
var html5Element;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 181);
var cssClass;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 183);
var nodeList;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 184);
var nodeListLength;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 185);
var node;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 186);
var buffer = [];

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 188);
while (++i < HTML5_ELEMENTS_LENGTH) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 189);
html5Element = HTML5_ELEMENTS[i];

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 191);
nodeList = DOC.getElementsByTagName(html5Element);
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 192);
nodeListLength = nodeList.length;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 194);
j = -1;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 196);
while (++j < nodeListLength) {
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 197);
node = nodeList[j];

					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 199);
cssClass = node.className;

					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 201);
if (cssClass.indexOf(CSS_PRINTFIX_PREFIX) == -1) {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 202);
buffer[0] = CSS_PRINTFIX_PREFIX + html5Element;
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 203);
buffer[1] = cssClass;

						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 205);
node.className = buffer.join(STR_BLANK);
					}
				}
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 210);
var docFrag = instance._getDocFrag();
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 211);
var bodyClone = instance._getBodyClone();

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 213);
docFrag.appendChild(bodyEl);
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 214);
HTML.appendChild(bodyClone);

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 216);
bodyClone.className = bodyEl.className;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 217);
bodyClone.id = bodyEl.id;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 219);
var originalNodes = bodyEl.getElementsByTagName(STR_STAR);
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 220);
var length = originalNodes.length;

			// IE will throw a mixed content warning when using https
			// and calling clone node if the body contains elements with
			// an inline background-image style that is relative to the domain.
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 225);
if (UA.secure) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 226);
var bodyElStyle = bodyEl.style;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 228);
var elStyle;
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 229);
var backgroundImage;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 231);
bodyElStyle.display = 'none';

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 233);
for (i = 0; i < length; i++) {
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 234);
elStyle = originalNodes[i].style;

					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 236);
backgroundImage = elStyle.backgroundImage;

					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 238);
if (backgroundImage &&
						backgroundImage.indexOf(STR_URL) > -1 &&
						backgroundImage.indexOf(STR_HTTPS) == -1) {

						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 242);
elStyle.backgroundImage = backgroundImage.replace(STR_URL, STR_URL_DOMAIN);
					}
				}

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 246);
bodyElStyle.display = STR_EMPTY;
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 249);
var bodyElClone = bodyEl.cloneNode(true);

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 251);
var newNodes = bodyElClone.getElementsByTagName(STR_STAR);

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 253);
if (length == newNodes.length) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 254);
while (length--) {
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 255);
var newNode = newNodes[length];
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 256);
var newNodeName = newNode.nodeName;

					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 258);
if (newNodeName == STR_INPUT || newNodeName == STR_OPTION) {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 259);
var originalNode = originalNodes[length];
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 260);
var originalNodeName = originalNode.nodeName;

						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 262);
if (originalNodeName == newNodeName) {
							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 263);
var prop = null;

							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 265);
if (newNodeName == STR_OPTION) {
								_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 266);
prop = STR_SELECTED;
							}
							else {_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 268);
if (newNodeName == STR_INPUT && (newNode.type == STR_CHECKBOX || newNode.type == STR_RADIO)) {
								_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 269);
prop = STR_CHECKED;
							}}

							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 272);
if (prop !== null) {
								_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 273);
toggleNode(newNode, originalNode, prop);
							}
						}
					}
				}
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 280);
var bodyHTML = bodyElClone.innerHTML;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 282);
bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 284);
bodyClone.innerHTML = bodyHTML;
		},

		_getAllCSSText: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getAllCSSText", 287);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 288);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 290);
var buffer = [];
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 291);
var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, STR_ALL);
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 292);
var rule;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 293);
var cssText;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 295);
for (var i = 0; styleSheet = styleSheets[i]; i++) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 296);
var rules = styleSheet.rules;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 298);
if (rules && rules.length) {
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 299);
for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 300);
rule = rules[j];

						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 302);
if (!rule.href) {
							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 303);
cssText = instance._getCSSTextFromRule(rule);

							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 305);
buffer.push(cssText);
						}
					}
				}
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 311);
return buffer.join(STR_BLANK);
		},

		_getCSSTextFromRule: function(rule) {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getCSSTextFromRule", 314);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 315);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 317);
var cssText = STR_EMPTY;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 319);
var ruleStyle = rule.style;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 320);
var ruleCSSText;
			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 321);
var ruleSelectorText;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 323);
if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) && REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 324);
BUFFER_CSS_TEXT.length = 0;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 326);
BUFFER_CSS_TEXT.push(ruleSelectorText, STR_BRACKET_OPEN, ruleCSSText, STR_BRACKET_CLOSE);

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 328);
cssText = BUFFER_CSS_TEXT.join(STR_BLANK);
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 331);
return cssText;
		},

		_getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getAllStyleSheets", 334);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 335);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 337);
level = level || 1;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 339);
buffer = buffer || [];

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 341);
var i;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 343);
if (isStylesheetDefined(styleSheet)) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 344);
var imports = styleSheet.imports;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 346);
mediaType = styleSheet.mediaType || mediaType;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 348);
if (REGEX_PRINT_MEDIA.test(mediaType)) {
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 349);
var length;

					// IE can crash when trying to access imports more than 3 levels deep
					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 352);
if (level <= 3 && isStylesheetDefined(imports) && imports.length) {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 353);
for (i = 0, length = imports.length; i < length; i++) {
							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 354);
instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);
						}
					}
					else {_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 357);
if (styleSheet.length) {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 358);
for (i = 0, length = styleSheet.length; i < length; i++) {
							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 359);
instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);
						}
					}
					else {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 363);
var rules = styleSheet.rules;
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 364);
var ruleStyleSheet;

						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 366);
if (rules && rules.length) {
							_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 367);
for (i = 0, length = rules.length; i < length; i++) {
								_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 368);
ruleStyleSheet = rules[i].styleSheet;

								_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 370);
if (ruleStyleSheet) {
									_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 371);
instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);
								}
							}
						}
					}}

					_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 377);
if (!styleSheet.disabled && styleSheet.rules) {
						_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 378);
buffer.push(styleSheet);
					}
				}
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 383);
mediaType = STR_ALL;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 385);
return buffer;
		},

		_getBodyEl: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getBodyEl", 388);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 389);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 391);
var bodyEl = instance._bodyEl;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 393);
if (!bodyEl) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 394);
bodyEl = DOC.body;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 396);
instance._bodyEl = bodyEl;
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 399);
return bodyEl;
		},

		_getBodyClone: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getBodyClone", 402);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 403);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 405);
var bodyClone = instance._bodyClone;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 407);
if (!bodyClone) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 408);
bodyClone = DOC.createElement('body');

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 410);
instance._bodyClone = bodyClone;
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 413);
return bodyClone;
		},

		_getDocFrag: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getDocFrag", 416);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 417);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 419);
var docFrag = instance._docFrag;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 421);
if (!docFrag) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 422);
docFrag = DOC.createDocumentFragment();

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 424);
html5shiv(docFrag);

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 426);
instance._docFrag = docFrag;
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 429);
return docFrag;
		},

		_getStyleSheet: function() {
			_yuitest_coverfunc("/build/aui-node-html5-print/aui-node-html5-print.js", "_getStyleSheet", 432);
_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 433);
var instance = this;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 435);
var styleSheet = instance._styleSheet;

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 437);
if (!styleSheet) {
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 438);
styleSheet = DOC.createElement('style');

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 440);
var head = DOC.documentElement.firstChild;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 442);
head.insertBefore(styleSheet, head.firstChild);

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 444);
styleSheet.media = 'print';
				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 445);
styleSheet.className = CSS_PRINTFIX;

				_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 447);
instance._styleSheet = styleSheet;
			}

			_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 450);
return styleSheet;
		}
	}
);

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 455);
A.namespace('HTML5').PrintFix = PrintFix;

_yuitest_coverline("/build/aui-node-html5-print/aui-node-html5-print.js", 457);
PrintFix();

}, '@VERSION@' ,{requires:['aui-node-html5']});
