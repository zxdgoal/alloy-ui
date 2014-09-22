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
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-toggler-base/aui-toggler-base.js",
    code: []
};
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].code=["AUI.add('aui-toggler-base', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isUndefined = Lang.isUndefined,","","	toInt = Lang.toInt,","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	PIXEL = 'px',","	SPACE = ' ',","","	ANIMATED = 'animated',","	ANIMATING = 'animating',","	BIND_DOM_EVENTS = 'bindDOMEvents',","	CLICK = 'click',","	COLLAPSED = 'collapsed',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	DOWN = 'down',","	ENTER = 'enter',","	ESC = 'esc',","	EXPANDED = 'expanded',","	EXPANDED_CHANGE = 'expandedChange',","	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',","	GUTTER = 'gutter',","	HEADER = 'header',","	HELPER = 'helper',","	KEYDOWN = 'keydown',","	LEFT = 'left',","	LINEAR = 'linear',","	MARGIN_TOP = 'marginTop',","	MINUS = 'minus',","	NUM_MINUS = 'num_minus',","	NUM_PLUS = 'num_plus',","	PARENT_NODE = 'parentNode',","	PLUS = 'plus',","	RIGHT = 'right',","	SPACE = 'space',","	TOGGLER = 'toggler',","	TRANSITION = 'transition',","	TRANSITION_END = 'transitionEnd',","	TRANSITION_START = 'transitionStart',","	UP = 'up',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT = getCN(TOGGLER, CONTENT),","	CSS_TOGGLER_CONTENT_COLLAPSED = getCN(TOGGLER, CONTENT, COLLAPSED),","	CSS_TOGGLER_CONTENT_EXPANDED = getCN(TOGGLER, CONTENT, EXPANDED),","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),","	CSS_TOGGLER_HEADER = getCN(TOGGLER, HEADER),","	CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),","	CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED),","","	CSS_TOGGLER_CONTENT_STATE = {","		'false': CSS_TOGGLER_CONTENT_COLLAPSED,","		'true': CSS_TOGGLER_CONTENT_EXPANDED","	},","","	CSS_TOGGLER_HEADER_STATE = {","		'false': CSS_TOGGLER_HEADER_COLLAPSED,","		'true': CSS_TOGGLER_HEADER_EXPANDED","	},","","	TPL_CONTENT_WRAPPER = '<div class=\"' + CSS_TOGGLER_CONTENT_WRAPPER + '\"></div>';","","var Toggler = A.Component.create({","	NAME: TOGGLER,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		animating: {","			validator: isBoolean,","			value: false","		},","","		bindDOMEvents: {","			validator: isBoolean,","			value: true,","			writeOnce: true","		},","","		content: {","			setter: A.one","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			setter: A.one","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	headerEventHandler: function(event, instance) {","		if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {","			event.preventDefault();","","			return instance.toggle();","		}","		else if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {","			event.preventDefault();","","			return instance.expand();","		}","		else if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {","			event.preventDefault();","","			return instance.collapse();","		}","	},","","	prototype: {","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.syncUI();","","			instance._uiSetExpanded(instance.get(EXPANDED));","		},","","		bindUI: function() {","			var instance = this;","			var header = instance.get(HEADER);","","			header.setData(TOGGLER, instance);","","			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));","","			if (instance.get(BIND_DOM_EVENTS)) {","				header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));","			}","		},","","		syncUI: function() {","			var instance = this;","","			instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);","			instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);","		},","","		animate: function(config, fn) {","			var instance = this;","","			instance._uiSetExpanded(true);","","			var transition = A.merge(config, instance.get(TRANSITION));","","			instance.get(CONTENT).transition(transition, A.bind(fn, instance));","		},","","		collapse: function() {","			var instance = this;","","			return instance.toggle(false);","		},","","		expand: function() {","			var instance = this;","","			return instance.toggle(true);","		},","","		getContentHeight: function() {","			var instance = this;","			var content = instance.get(CONTENT);","			var expanded = instance.get(EXPANDED), height;","","			if (!expanded) {","				instance._uiSetExpanded(true);","			}","","			if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {","				var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);","","				if (preciseRegion) {","					height = preciseRegion.bottom - preciseRegion.top;","				}","			}","			else {","				height = content.get(OFFSET_HEIGHT);","			}","","			if (!expanded) {","				instance._uiSetExpanded(false);","			}","","			return height;","		},","","		toggle: function(expand) {","			var instance = this;","","			if (isUndefined(expand)) {","				expand = !instance.get(EXPANDED);","			}","","			if (instance.get(ANIMATED)) {","				if (instance.get(ANIMATING)) {","					return expand;","				}","","				var content = instance.get(CONTENT);","","				var height = instance.getContentHeight();","				var gutter = toInt(content.getStyle(MARGIN_TOP));","","				if (!instance.wrapped) {","					content.wrap(TPL_CONTENT_WRAPPER);","","					if (expand) {","						gutter = -(height + gutter);","","						content.setStyle(MARGIN_TOP, gutter);","					}","","					instance.wrapped = true;","				}","","				instance.set(ANIMATING, true);","","				instance.animate(","					{","						marginTop: -(height + gutter) + PIXEL","					},","					function() {","						instance.set(ANIMATING, false);","","						instance.set(EXPANDED, expand);","					}","				);","			}","			else {","				instance.set(EXPANDED, expand);","			}","","			return expand;","		},","","		_onExpandedChange: function(event) {","			var instance = this;","","			instance._uiSetExpanded(event.newVal);","		},","","		_uiSetExpanded: function(val) {","			var instance = this;","","			instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);","			instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);","		}","","	}","});","","A.Toggler = Toggler;","","}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});"];
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].lines = {"1":0,"2":0,"71":0,"119":0,"120":0,"122":0,"124":0,"125":0,"127":0,"129":0,"130":0,"132":0,"139":0,"141":0,"142":0,"144":0,"148":0,"149":0,"151":0,"153":0,"155":0,"156":0,"161":0,"163":0,"164":0,"168":0,"170":0,"172":0,"174":0,"178":0,"180":0,"184":0,"186":0,"190":0,"191":0,"192":0,"194":0,"195":0,"198":0,"199":0,"201":0,"202":0,"206":0,"209":0,"210":0,"213":0,"217":0,"219":0,"220":0,"223":0,"224":0,"225":0,"228":0,"230":0,"231":0,"233":0,"234":0,"236":0,"237":0,"239":0,"242":0,"245":0,"247":0,"252":0,"254":0,"259":0,"262":0,"266":0,"268":0,"272":0,"274":0,"275":0,"281":0};
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].functions = {"headerEventHandler:118":0,"initializer:138":0,"bindUI:147":0,"syncUI:160":0,"animate:167":0,"collapse:177":0,"expand:183":0,"getContentHeight:189":0,"(anonymous 2):251":0,"toggle:216":0,"_onExpandedChange:265":0,"_uiSetExpanded:271":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].coveredLines = 73;
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].coveredFunctions = 13;
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 1);
AUI.add('aui-toggler-base', function(A) {
_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 2);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isUndefined = Lang.isUndefined,

	toInt = Lang.toInt,

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	PIXEL = 'px',
	SPACE = ' ',

	ANIMATED = 'animated',
	ANIMATING = 'animating',
	BIND_DOM_EVENTS = 'bindDOMEvents',
	CLICK = 'click',
	COLLAPSED = 'collapsed',
	CONTENT = 'content',
	CUBIC_BEZIER = 'cubic-bezier',
	DOWN = 'down',
	ENTER = 'enter',
	ESC = 'esc',
	EXPANDED = 'expanded',
	EXPANDED_CHANGE = 'expandedChange',
	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',
	GUTTER = 'gutter',
	HEADER = 'header',
	HELPER = 'helper',
	KEYDOWN = 'keydown',
	LEFT = 'left',
	LINEAR = 'linear',
	MARGIN_TOP = 'marginTop',
	MINUS = 'minus',
	NUM_MINUS = 'num_minus',
	NUM_PLUS = 'num_plus',
	PARENT_NODE = 'parentNode',
	PLUS = 'plus',
	RIGHT = 'right',
	SPACE = 'space',
	TOGGLER = 'toggler',
	TRANSITION = 'transition',
	TRANSITION_END = 'transitionEnd',
	TRANSITION_START = 'transitionStart',
	UP = 'up',
	WRAPPER = 'wrapper',

	getCN = A.getClassName,

	CSS_TOGGLER_CONTENT = getCN(TOGGLER, CONTENT),
	CSS_TOGGLER_CONTENT_COLLAPSED = getCN(TOGGLER, CONTENT, COLLAPSED),
	CSS_TOGGLER_CONTENT_EXPANDED = getCN(TOGGLER, CONTENT, EXPANDED),
	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),
	CSS_TOGGLER_HEADER = getCN(TOGGLER, HEADER),
	CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),
	CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED),

	CSS_TOGGLER_CONTENT_STATE = {
		'false': CSS_TOGGLER_CONTENT_COLLAPSED,
		'true': CSS_TOGGLER_CONTENT_EXPANDED
	},

	CSS_TOGGLER_HEADER_STATE = {
		'false': CSS_TOGGLER_HEADER_COLLAPSED,
		'true': CSS_TOGGLER_HEADER_EXPANDED
	},

	TPL_CONTENT_WRAPPER = '<div class="' + CSS_TOGGLER_CONTENT_WRAPPER + '"></div>';

_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 71);
var Toggler = A.Component.create({
	NAME: TOGGLER,

	ATTRS: {

		animated: {
			validator: isBoolean,
			value: false,
			writeOnce: true
		},

		animating: {
			validator: isBoolean,
			value: false
		},

		bindDOMEvents: {
			validator: isBoolean,
			value: true,
			writeOnce: true
		},

		content: {
			setter: A.one
		},

		expanded: {
			validator: isBoolean,
			value: true
		},

		header: {
			setter: A.one
		},

		transition: {
			validator: isObject,
			value: {
				duration: 0.4,
			    easing: CUBIC_BEZIER
			}
		}

	},

	EXTENDS: A.Base,

	headerEventHandler: function(event, instance) {
		_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "headerEventHandler", 118);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 119);
if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 120);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 122);
return instance.toggle();
		}
		else {_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 124);
if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 125);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 127);
return instance.expand();
		}
		else {_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 129);
if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 130);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 132);
return instance.collapse();
		}}}
	},

	prototype: {

		initializer: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "initializer", 138);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 139);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 141);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 142);
instance.syncUI();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 144);
instance._uiSetExpanded(instance.get(EXPANDED));
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "bindUI", 147);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 148);
var instance = this;
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 149);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 151);
header.setData(TOGGLER, instance);

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 153);
instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 155);
if (instance.get(BIND_DOM_EVENTS)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 156);
header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "syncUI", 160);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 161);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 163);
instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 164);
instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);
		},

		animate: function(config, fn) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "animate", 167);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 168);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 170);
instance._uiSetExpanded(true);

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 172);
var transition = A.merge(config, instance.get(TRANSITION));

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 174);
instance.get(CONTENT).transition(transition, A.bind(fn, instance));
		},

		collapse: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "collapse", 177);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 178);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 180);
return instance.toggle(false);
		},

		expand: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "expand", 183);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 184);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 186);
return instance.toggle(true);
		},

		getContentHeight: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "getContentHeight", 189);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 190);
var instance = this;
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 191);
var content = instance.get(CONTENT);
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 192);
var expanded = instance.get(EXPANDED), height;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 194);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 195);
instance._uiSetExpanded(true);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 198);
if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 199);
var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 201);
if (preciseRegion) {
					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 202);
height = preciseRegion.bottom - preciseRegion.top;
				}
			}
			else {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 206);
height = content.get(OFFSET_HEIGHT);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 209);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 210);
instance._uiSetExpanded(false);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 213);
return height;
		},

		toggle: function(expand) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "toggle", 216);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 217);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 219);
if (isUndefined(expand)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 220);
expand = !instance.get(EXPANDED);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 223);
if (instance.get(ANIMATED)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 224);
if (instance.get(ANIMATING)) {
					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 225);
return expand;
				}

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 228);
var content = instance.get(CONTENT);

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 230);
var height = instance.getContentHeight();
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 231);
var gutter = toInt(content.getStyle(MARGIN_TOP));

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 233);
if (!instance.wrapped) {
					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 234);
content.wrap(TPL_CONTENT_WRAPPER);

					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 236);
if (expand) {
						_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 237);
gutter = -(height + gutter);

						_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 239);
content.setStyle(MARGIN_TOP, gutter);
					}

					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 242);
instance.wrapped = true;
				}

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 245);
instance.set(ANIMATING, true);

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 247);
instance.animate(
					{
						marginTop: -(height + gutter) + PIXEL
					},
					function() {
						_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "(anonymous 2)", 251);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 252);
instance.set(ANIMATING, false);

						_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 254);
instance.set(EXPANDED, expand);
					}
				);
			}
			else {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 259);
instance.set(EXPANDED, expand);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 262);
return expand;
		},

		_onExpandedChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "_onExpandedChange", 265);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 266);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 268);
instance._uiSetExpanded(event.newVal);
		},

		_uiSetExpanded: function(val) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "_uiSetExpanded", 271);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 272);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 274);
instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 275);
instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);
		}

	}
});

_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 281);
A.Toggler = Toggler;

}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});
