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
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].code=["AUI.add('aui-toggler-base', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isUndefined = Lang.isUndefined,","","	toNumber = function(val) {","		return parseInt(val, 10) || 0;","	},","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	PIXEL = 'px',","	SPACE = ' ',","","	ANIMATED = 'animated',","	ANIMATING = 'animating',","	BIND_DOM_EVENTS = 'bindDOMEvents',","	CLICK = 'click',","	COLLAPSED = 'collapsed',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	DOWN = 'down',","	ENTER = 'enter',","	ESC = 'esc',","	EXPANDED = 'expanded',","	EXPANDED_CHANGE = 'expandedChange',","	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',","	GUTTER = 'gutter',","	HEADER = 'header',","	HELPER = 'helper',","	KEYDOWN = 'keydown',","	LEFT = 'left',","	LINEAR = 'linear',","	MARGIN_TOP = 'marginTop',","	MINUS = 'minus',","	NUM_MINUS = 'num_minus',","	NUM_PLUS = 'num_plus',","	PARENT_NODE = 'parentNode',","	PLUS = 'plus',","	RIGHT = 'right',","	SPACE = 'space',","	TOGGLER = 'toggler',","	TRANSITION = 'transition',","	TRANSITION_END = 'transitionEnd',","	TRANSITION_START = 'transitionStart',","	UP = 'up',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT = getCN(TOGGLER, CONTENT),","	CSS_TOGGLER_CONTENT_COLLAPSED = getCN(TOGGLER, CONTENT, COLLAPSED),","	CSS_TOGGLER_CONTENT_EXPANDED = getCN(TOGGLER, CONTENT, EXPANDED),","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),","	CSS_TOGGLER_HEADER = getCN(TOGGLER, HEADER),","	CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),","	CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED),","","	CSS_TOGGLER_CONTENT_STATE = {","		'false': CSS_TOGGLER_CONTENT_COLLAPSED,","		'true': CSS_TOGGLER_CONTENT_EXPANDED","	},","","	CSS_TOGGLER_HEADER_STATE = {","		'false': CSS_TOGGLER_HEADER_COLLAPSED,","		'true': CSS_TOGGLER_HEADER_EXPANDED","	},","","	TPL_CONTENT_WRAPPER = '<div class=\"' + CSS_TOGGLER_CONTENT_WRAPPER + '\"></div>';","","var Toggler = A.Component.create({","	NAME: TOGGLER,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		animating: {","			validator: isBoolean,","			value: false","		},","","		bindDOMEvents: {","			validator: isBoolean,","			value: true,","			writeOnce: true","		},","","		content: {","			setter: A.one","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			setter: A.one","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	headerEventHandler: function(event, instance) {","		if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {","			event.preventDefault();","","			return instance.toggle();","		}","		else if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {","			event.preventDefault();","","			return instance.expand();","		}","		else if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {","			event.preventDefault();","","			return instance.collapse();","		}","	},","","	prototype: {","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.syncUI();","","			instance._uiSetExpanded(instance.get(EXPANDED));","		},","","		bindUI: function() {","			var instance = this;","			var header = instance.get(HEADER);","","			header.setData(TOGGLER, instance);","","			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));","","			if (instance.get(BIND_DOM_EVENTS)) {","				header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));","			}","		},","","		syncUI: function() {","			var instance = this;","","			instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);","			instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);","		},","","		animate: function(config, fn) {","			var instance = this;","","			instance._uiSetExpanded(true);","","			var transition = A.merge(config, instance.get(TRANSITION));","","			instance.get(CONTENT).transition(transition, A.bind(fn, instance));","		},","","		collapse: function() {","			var instance = this;","","			return instance.toggle(false);","		},","","		expand: function() {","			var instance = this;","","			return instance.toggle(true);","		},","","		getContentHeight: function() {","			var instance = this;","			var content = instance.get(CONTENT);","			var expanded = instance.get(EXPANDED), height;","","			if (!expanded) {","				instance._uiSetExpanded(true);","			}","","			if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {","				var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);","","				if (preciseRegion) {","					height = preciseRegion.bottom - preciseRegion.top;","				}","			}","			else {","				height = content.get(OFFSET_HEIGHT);","			}","","			if (!expanded) {","				instance._uiSetExpanded(false);","			}","","			return height;","		},","","		toggle: function(expand) {","			var instance = this;","","			if (isUndefined(expand)) {","				expand = !instance.get(EXPANDED);","			}","","			if (instance.get(ANIMATED)) {","				if (instance.get(ANIMATING)) {","					return expand;","				}","","				var content = instance.get(CONTENT);","","				var height = instance.getContentHeight();","				var gutter = toNumber(content.getStyle(MARGIN_TOP));","","				if (!instance.wrapped) {","					content.wrap(TPL_CONTENT_WRAPPER);","","					if (expand) {","						gutter = -(height + gutter);","","						content.setStyle(MARGIN_TOP, gutter);","					}","","					instance.wrapped = true;","				}","","				instance.set(ANIMATING, true);","","				instance.animate(","					{","						marginTop: -(height + gutter) + PIXEL","					},","					function() {","						instance.set(ANIMATING, false);","","						instance.set(EXPANDED, expand);","					}","				);","			}","			else {","				instance.set(EXPANDED, expand);","			}","","			return expand;","		},","","		_onExpandedChange: function(event) {","			var instance = this;","","			instance._uiSetExpanded(event.newVal);","		},","","		_uiSetExpanded: function(val) {","			var instance = this;","","			instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);","			instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);","		}","","	}","});","","A.Toggler = Toggler;","","}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});"];
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].lines = {"1":0,"2":0,"8":0,"73":0,"121":0,"122":0,"124":0,"126":0,"127":0,"129":0,"131":0,"132":0,"134":0,"141":0,"143":0,"144":0,"146":0,"150":0,"151":0,"153":0,"155":0,"157":0,"158":0,"163":0,"165":0,"166":0,"170":0,"172":0,"174":0,"176":0,"180":0,"182":0,"186":0,"188":0,"192":0,"193":0,"194":0,"196":0,"197":0,"200":0,"201":0,"203":0,"204":0,"208":0,"211":0,"212":0,"215":0,"219":0,"221":0,"222":0,"225":0,"226":0,"227":0,"230":0,"232":0,"233":0,"235":0,"236":0,"238":0,"239":0,"241":0,"244":0,"247":0,"249":0,"254":0,"256":0,"261":0,"264":0,"268":0,"270":0,"274":0,"276":0,"277":0,"283":0};
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].functions = {"toNumber:7":0,"headerEventHandler:120":0,"initializer:140":0,"bindUI:149":0,"syncUI:162":0,"animate:169":0,"collapse:179":0,"expand:185":0,"getContentHeight:191":0,"(anonymous 2):253":0,"toggle:218":0,"_onExpandedChange:267":0,"_uiSetExpanded:273":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].coveredLines = 74;
_yuitest_coverage["/build/aui-toggler-base/aui-toggler-base.js"].coveredFunctions = 14;
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 1);
AUI.add('aui-toggler-base', function(A) {
_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 2);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isUndefined = Lang.isUndefined,

	toNumber = function(val) {
		_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "toNumber", 7);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 8);
return parseInt(val, 10) || 0;
	},

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

_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 73);
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
		_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "headerEventHandler", 120);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 121);
if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 122);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 124);
return instance.toggle();
		}
		else {_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 126);
if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 127);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 129);
return instance.expand();
		}
		else {_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 131);
if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 132);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 134);
return instance.collapse();
		}}}
	},

	prototype: {

		initializer: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "initializer", 140);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 141);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 143);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 144);
instance.syncUI();

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 146);
instance._uiSetExpanded(instance.get(EXPANDED));
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "bindUI", 149);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 150);
var instance = this;
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 151);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 153);
header.setData(TOGGLER, instance);

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 155);
instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 157);
if (instance.get(BIND_DOM_EVENTS)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 158);
header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "syncUI", 162);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 163);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 165);
instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 166);
instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);
		},

		animate: function(config, fn) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "animate", 169);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 170);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 172);
instance._uiSetExpanded(true);

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 174);
var transition = A.merge(config, instance.get(TRANSITION));

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 176);
instance.get(CONTENT).transition(transition, A.bind(fn, instance));
		},

		collapse: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "collapse", 179);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 180);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 182);
return instance.toggle(false);
		},

		expand: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "expand", 185);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 186);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 188);
return instance.toggle(true);
		},

		getContentHeight: function() {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "getContentHeight", 191);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 192);
var instance = this;
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 193);
var content = instance.get(CONTENT);
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 194);
var expanded = instance.get(EXPANDED), height;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 196);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 197);
instance._uiSetExpanded(true);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 200);
if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 201);
var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 203);
if (preciseRegion) {
					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 204);
height = preciseRegion.bottom - preciseRegion.top;
				}
			}
			else {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 208);
height = content.get(OFFSET_HEIGHT);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 211);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 212);
instance._uiSetExpanded(false);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 215);
return height;
		},

		toggle: function(expand) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "toggle", 218);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 219);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 221);
if (isUndefined(expand)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 222);
expand = !instance.get(EXPANDED);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 225);
if (instance.get(ANIMATED)) {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 226);
if (instance.get(ANIMATING)) {
					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 227);
return expand;
				}

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 230);
var content = instance.get(CONTENT);

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 232);
var height = instance.getContentHeight();
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 233);
var gutter = toNumber(content.getStyle(MARGIN_TOP));

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 235);
if (!instance.wrapped) {
					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 236);
content.wrap(TPL_CONTENT_WRAPPER);

					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 238);
if (expand) {
						_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 239);
gutter = -(height + gutter);

						_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 241);
content.setStyle(MARGIN_TOP, gutter);
					}

					_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 244);
instance.wrapped = true;
				}

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 247);
instance.set(ANIMATING, true);

				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 249);
instance.animate(
					{
						marginTop: -(height + gutter) + PIXEL
					},
					function() {
						_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "(anonymous 2)", 253);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 254);
instance.set(ANIMATING, false);

						_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 256);
instance.set(EXPANDED, expand);
					}
				);
			}
			else {
				_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 261);
instance.set(EXPANDED, expand);
			}

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 264);
return expand;
		},

		_onExpandedChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "_onExpandedChange", 267);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 268);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 270);
instance._uiSetExpanded(event.newVal);
		},

		_uiSetExpanded: function(val) {
			_yuitest_coverfunc("/build/aui-toggler-base/aui-toggler-base.js", "_uiSetExpanded", 273);
_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 274);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 276);
instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);
			_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 277);
instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);
		}

	}
});

_yuitest_coverline("/build/aui-toggler-base/aui-toggler-base.js", 283);
A.Toggler = Toggler;

}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});
