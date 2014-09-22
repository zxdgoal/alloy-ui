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
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-toggler/aui-toggler.js",
    code: []
};
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].code=["AUI.add('aui-toggler-base', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isUndefined = Lang.isUndefined,","","	toInt = Lang.toInt,","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	PIXEL = 'px',","	SPACE = ' ',","","	ANIMATED = 'animated',","	ANIMATING = 'animating',","	BIND_DOM_EVENTS = 'bindDOMEvents',","	CLICK = 'click',","	COLLAPSED = 'collapsed',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	DOWN = 'down',","	ENTER = 'enter',","	ESC = 'esc',","	EXPANDED = 'expanded',","	EXPANDED_CHANGE = 'expandedChange',","	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',","	GUTTER = 'gutter',","	HEADER = 'header',","	HELPER = 'helper',","	KEYDOWN = 'keydown',","	LEFT = 'left',","	LINEAR = 'linear',","	MARGIN_TOP = 'marginTop',","	MINUS = 'minus',","	NUM_MINUS = 'num_minus',","	NUM_PLUS = 'num_plus',","	PARENT_NODE = 'parentNode',","	PLUS = 'plus',","	RIGHT = 'right',","	SPACE = 'space',","	TOGGLER = 'toggler',","	TRANSITION = 'transition',","	TRANSITION_END = 'transitionEnd',","	TRANSITION_START = 'transitionStart',","	UP = 'up',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT = getCN(TOGGLER, CONTENT),","	CSS_TOGGLER_CONTENT_COLLAPSED = getCN(TOGGLER, CONTENT, COLLAPSED),","	CSS_TOGGLER_CONTENT_EXPANDED = getCN(TOGGLER, CONTENT, EXPANDED),","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),","	CSS_TOGGLER_HEADER = getCN(TOGGLER, HEADER),","	CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),","	CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED),","","	CSS_TOGGLER_CONTENT_STATE = {","		'false': CSS_TOGGLER_CONTENT_COLLAPSED,","		'true': CSS_TOGGLER_CONTENT_EXPANDED","	},","","	CSS_TOGGLER_HEADER_STATE = {","		'false': CSS_TOGGLER_HEADER_COLLAPSED,","		'true': CSS_TOGGLER_HEADER_EXPANDED","	},","","	TPL_CONTENT_WRAPPER = '<div class=\"' + CSS_TOGGLER_CONTENT_WRAPPER + '\"></div>';","","var Toggler = A.Component.create({","	NAME: TOGGLER,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		animating: {","			validator: isBoolean,","			value: false","		},","","		bindDOMEvents: {","			validator: isBoolean,","			value: true,","			writeOnce: true","		},","","		content: {","			setter: A.one","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			setter: A.one","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	headerEventHandler: function(event, instance) {","		if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {","			event.preventDefault();","","			return instance.toggle();","		}","		else if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {","			event.preventDefault();","","			return instance.expand();","		}","		else if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {","			event.preventDefault();","","			return instance.collapse();","		}","	},","","	prototype: {","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.syncUI();","","			instance._uiSetExpanded(instance.get(EXPANDED));","		},","","		bindUI: function() {","			var instance = this;","			var header = instance.get(HEADER);","","			header.setData(TOGGLER, instance);","","			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));","","			if (instance.get(BIND_DOM_EVENTS)) {","				header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));","			}","		},","","		syncUI: function() {","			var instance = this;","","			instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);","			instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);","		},","","		animate: function(config, fn) {","			var instance = this;","","			instance._uiSetExpanded(true);","","			var transition = A.merge(config, instance.get(TRANSITION));","","			instance.get(CONTENT).transition(transition, A.bind(fn, instance));","		},","","		collapse: function() {","			var instance = this;","","			return instance.toggle(false);","		},","","		expand: function() {","			var instance = this;","","			return instance.toggle(true);","		},","","		getContentHeight: function() {","			var instance = this;","			var content = instance.get(CONTENT);","			var expanded = instance.get(EXPANDED), height;","","			if (!expanded) {","				instance._uiSetExpanded(true);","			}","","			if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {","				var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);","","				if (preciseRegion) {","					height = preciseRegion.bottom - preciseRegion.top;","				}","			}","			else {","				height = content.get(OFFSET_HEIGHT);","			}","","			if (!expanded) {","				instance._uiSetExpanded(false);","			}","","			return height;","		},","","		toggle: function(expand) {","			var instance = this;","","			if (isUndefined(expand)) {","				expand = !instance.get(EXPANDED);","			}","","			if (instance.get(ANIMATED)) {","				if (instance.get(ANIMATING)) {","					return expand;","				}","","				var content = instance.get(CONTENT);","","				var height = instance.getContentHeight();","				var gutter = toInt(content.getStyle(MARGIN_TOP));","","				if (!instance.wrapped) {","					content.wrap(TPL_CONTENT_WRAPPER);","","					if (expand) {","						gutter = -(height + gutter);","","						content.setStyle(MARGIN_TOP, gutter);","					}","","					instance.wrapped = true;","				}","","				instance.set(ANIMATING, true);","","				instance.animate(","					{","						marginTop: -(height + gutter) + PIXEL","					},","					function() {","						instance.set(ANIMATING, false);","","						instance.set(EXPANDED, expand);","					}","				);","			}","			else {","				instance.set(EXPANDED, expand);","			}","","			return expand;","		},","","		_onExpandedChange: function(event) {","			var instance = this;","","			instance._uiSetExpanded(event.newVal);","		},","","		_uiSetExpanded: function(val) {","			var instance = this;","","			instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);","			instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);","		}","","	}","});","","A.Toggler = Toggler;","","}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});","AUI.add('aui-toggler-delegate', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isString = Lang.isString,","","	AArray = A.Array,","","	DOC = A.config.doc,","","	Toggler = A.Toggler,","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	SPACE = ' ',","","	ANIMATED = 'animated',","	CLICK = 'click',","	CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',","	CONTAINER = 'container',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	EXPANDED = 'expanded',","	FIRST_CHILD = 'firstChild',","	HEADER = 'header',","	KEYDOWN = 'keydown',","	LINEAR = 'linear',","	TOGGLER = 'toggler',","	TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',","	TOGGLER_DELEGATE = 'toggler-delegate',","	TRANSITION = 'transition',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER);","","var TogglerDelegate = A.Component.create({","	NAME: TOGGLER_DELEGATE,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		closeAllOnExpand: {","			validator: isBoolean,","			value: false","		},","","		container: {","			setter: A.one,","			value: DOC","		},","","		content: {","			validator: isString","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			validator: isString","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	prototype: {","","		items: null,","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.renderUI();","		},","","		renderUI: function() {","			var instance = this;","","			if (instance.get(CLOSE_ALL_ON_EXPAND)) {","				instance.items = [];","","				instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {","					instance.items.push(","						instance._create(header)","					);","				});","			}","		},","","		bindUI: function() {","			var instance = this;","			var container = instance.get(CONTAINER);","			var header = instance.get(HEADER);","","			instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));","","			container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);","		},","","		findContentNode: function(header) {","			var instance = this;","			var content = instance.get(CONTENT);","","			var contentNode = header.next(content) || header.one(content);","","			if (!contentNode) {","				var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); ","","				if (wrapper) {","					contentNode = wrapper.get(FIRST_CHILD);","				}","			}","","			return contentNode;","		},","","		headerEventHandler: function(event) {","			var instance = this;","","			if (instance.animating) {","				return false;","			}","","			var target = event.currentTarget;","			var toggler = target.getData(TOGGLER) || instance._create(target);","","			if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {","				AArray.each(","					instance.items,","					function(item, index, collection) {","						if (item !== toggler && item.get(EXPANDED)) {","							item.collapse();","						}","					}","				);","			}","		},","","		_create: function(header) {","			var instance = this;","","			var toggler = new Toggler({","				animated: instance.get(ANIMATED),","				bindDOMEvents: false,","				bubbleTargets: [ instance ],","				content: instance.findContentNode(header),","				expanded: instance.get(EXPANDED),","				header: header,","				transition: instance.get(TRANSITION)","			});","","			return toggler;","		},","","		_onAnimatingChange: function(event) {","			var instance = this;","","			instance.animating = event.newVal;","		}","","	}","});","","A.TogglerDelegate = TogglerDelegate;","","}, '@VERSION@' ,{skinnable:false, requires:['aui-toggler-base']});","","","AUI.add('aui-toggler', function(A){}, '@VERSION@' ,{use:['aui-toggler-base','aui-toggler-delegate'], skinnable:true});",""];
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].lines = {"1":0,"2":0,"71":0,"119":0,"120":0,"122":0,"124":0,"125":0,"127":0,"129":0,"130":0,"132":0,"139":0,"141":0,"142":0,"144":0,"148":0,"149":0,"151":0,"153":0,"155":0,"156":0,"161":0,"163":0,"164":0,"168":0,"170":0,"172":0,"174":0,"178":0,"180":0,"184":0,"186":0,"190":0,"191":0,"192":0,"194":0,"195":0,"198":0,"199":0,"201":0,"202":0,"206":0,"209":0,"210":0,"213":0,"217":0,"219":0,"220":0,"223":0,"224":0,"225":0,"228":0,"230":0,"231":0,"233":0,"234":0,"236":0,"237":0,"239":0,"242":0,"245":0,"247":0,"252":0,"254":0,"259":0,"262":0,"266":0,"268":0,"272":0,"274":0,"275":0,"281":0,"284":0,"285":0,"322":0,"373":0,"375":0,"376":0,"380":0,"382":0,"383":0,"385":0,"386":0,"394":0,"395":0,"396":0,"398":0,"400":0,"404":0,"405":0,"407":0,"409":0,"410":0,"412":0,"413":0,"417":0,"421":0,"423":0,"424":0,"427":0,"428":0,"430":0,"431":0,"434":0,"435":0,"443":0,"445":0,"455":0,"459":0,"461":0,"467":0,"472":0};
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].functions = {"headerEventHandler:118":0,"initializer:138":0,"bindUI:147":0,"syncUI:160":0,"animate:167":0,"collapse:177":0,"expand:183":0,"getContentHeight:189":0,"(anonymous 2):251":0,"toggle:216":0,"_onExpandedChange:265":0,"_uiSetExpanded:271":0,"(anonymous 1):1":0,"initializer:372":0,"(anonymous 4):385":0,"renderUI:379":0,"bindUI:393":0,"findContentNode:403":0,"(anonymous 5):433":0,"headerEventHandler:420":0,"_create:442":0,"_onAnimatingChange:458":0,"(anonymous 3):284":0};
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].coveredLines = 113;
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].coveredFunctions = 23;
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 1);
AUI.add('aui-toggler-base', function(A) {
_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 2);
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

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 71);
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
		_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "headerEventHandler", 118);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 119);
if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 120);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 122);
return instance.toggle();
		}
		else {_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 124);
if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 125);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 127);
return instance.expand();
		}
		else {_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 129);
if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 130);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 132);
return instance.collapse();
		}}}
	},

	prototype: {

		initializer: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "initializer", 138);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 139);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 141);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 142);
instance.syncUI();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 144);
instance._uiSetExpanded(instance.get(EXPANDED));
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "bindUI", 147);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 148);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 149);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 151);
header.setData(TOGGLER, instance);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 153);
instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 155);
if (instance.get(BIND_DOM_EVENTS)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 156);
header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "syncUI", 160);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 161);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 163);
instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 164);
instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);
		},

		animate: function(config, fn) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "animate", 167);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 168);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 170);
instance._uiSetExpanded(true);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 172);
var transition = A.merge(config, instance.get(TRANSITION));

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 174);
instance.get(CONTENT).transition(transition, A.bind(fn, instance));
		},

		collapse: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "collapse", 177);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 178);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 180);
return instance.toggle(false);
		},

		expand: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "expand", 183);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 184);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 186);
return instance.toggle(true);
		},

		getContentHeight: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "getContentHeight", 189);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 190);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 191);
var content = instance.get(CONTENT);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 192);
var expanded = instance.get(EXPANDED), height;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 194);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 195);
instance._uiSetExpanded(true);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 198);
if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 199);
var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 201);
if (preciseRegion) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 202);
height = preciseRegion.bottom - preciseRegion.top;
				}
			}
			else {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 206);
height = content.get(OFFSET_HEIGHT);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 209);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 210);
instance._uiSetExpanded(false);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 213);
return height;
		},

		toggle: function(expand) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "toggle", 216);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 217);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 219);
if (isUndefined(expand)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 220);
expand = !instance.get(EXPANDED);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 223);
if (instance.get(ANIMATED)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 224);
if (instance.get(ANIMATING)) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 225);
return expand;
				}

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 228);
var content = instance.get(CONTENT);

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 230);
var height = instance.getContentHeight();
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 231);
var gutter = toInt(content.getStyle(MARGIN_TOP));

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 233);
if (!instance.wrapped) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 234);
content.wrap(TPL_CONTENT_WRAPPER);

					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 236);
if (expand) {
						_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 237);
gutter = -(height + gutter);

						_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 239);
content.setStyle(MARGIN_TOP, gutter);
					}

					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 242);
instance.wrapped = true;
				}

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 245);
instance.set(ANIMATING, true);

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 247);
instance.animate(
					{
						marginTop: -(height + gutter) + PIXEL
					},
					function() {
						_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 2)", 251);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 252);
instance.set(ANIMATING, false);

						_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 254);
instance.set(EXPANDED, expand);
					}
				);
			}
			else {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 259);
instance.set(EXPANDED, expand);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 262);
return expand;
		},

		_onExpandedChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_onExpandedChange", 265);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 266);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 268);
instance._uiSetExpanded(event.newVal);
		},

		_uiSetExpanded: function(val) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_uiSetExpanded", 271);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 272);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 274);
instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 275);
instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);
		}

	}
});

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 281);
A.Toggler = Toggler;

}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 284);
AUI.add('aui-toggler-delegate', function(A) {
_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 3)", 284);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 285);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	DOC = A.config.doc,

	Toggler = A.Toggler,

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',

	ANIMATED = 'animated',
	CLICK = 'click',
	CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',
	CONTAINER = 'container',
	CONTENT = 'content',
	CUBIC_BEZIER = 'cubic-bezier',
	EXPANDED = 'expanded',
	FIRST_CHILD = 'firstChild',
	HEADER = 'header',
	KEYDOWN = 'keydown',
	LINEAR = 'linear',
	TOGGLER = 'toggler',
	TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',
	TOGGLER_DELEGATE = 'toggler-delegate',
	TRANSITION = 'transition',
	WRAPPER = 'wrapper',

	getCN = A.getClassName,

	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER);

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 322);
var TogglerDelegate = A.Component.create({
	NAME: TOGGLER_DELEGATE,

	ATTRS: {

		animated: {
			validator: isBoolean,
			value: false,
			writeOnce: true
		},

		closeAllOnExpand: {
			validator: isBoolean,
			value: false
		},

		container: {
			setter: A.one,
			value: DOC
		},

		content: {
			validator: isString
		},

		expanded: {
			validator: isBoolean,
			value: true
		},

		header: {
			validator: isString
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

	prototype: {

		items: null,

		initializer: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "initializer", 372);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 373);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 375);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 376);
instance.renderUI();
		},

		renderUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "renderUI", 379);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 380);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 382);
if (instance.get(CLOSE_ALL_ON_EXPAND)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 383);
instance.items = [];

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 385);
instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {
					_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 4)", 385);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 386);
instance.items.push(
						instance._create(header)
					);
				});
			}
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "bindUI", 393);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 394);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 395);
var container = instance.get(CONTAINER);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 396);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 398);
instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 400);
container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
		},

		findContentNode: function(header) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "findContentNode", 403);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 404);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 405);
var content = instance.get(CONTENT);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 407);
var contentNode = header.next(content) || header.one(content);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 409);
if (!contentNode) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 410);
var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); 

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 412);
if (wrapper) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 413);
contentNode = wrapper.get(FIRST_CHILD);
				}
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 417);
return contentNode;
		},

		headerEventHandler: function(event) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "headerEventHandler", 420);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 421);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 423);
if (instance.animating) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 424);
return false;
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 427);
var target = event.currentTarget;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 428);
var toggler = target.getData(TOGGLER) || instance._create(target);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 430);
if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 431);
AArray.each(
					instance.items,
					function(item, index, collection) {
						_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 5)", 433);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 434);
if (item !== toggler && item.get(EXPANDED)) {
							_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 435);
item.collapse();
						}
					}
				);
			}
		},

		_create: function(header) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_create", 442);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 443);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 445);
var toggler = new Toggler({
				animated: instance.get(ANIMATED),
				bindDOMEvents: false,
				bubbleTargets: [ instance ],
				content: instance.findContentNode(header),
				expanded: instance.get(EXPANDED),
				header: header,
				transition: instance.get(TRANSITION)
			});

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 455);
return toggler;
		},

		_onAnimatingChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_onAnimatingChange", 458);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 459);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 461);
instance.animating = event.newVal;
		}

	}
});

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 467);
A.TogglerDelegate = TogglerDelegate;

}, '@VERSION@' ,{skinnable:false, requires:['aui-toggler-base']});


_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 472);
AUI.add('aui-toggler', function(A){}, '@VERSION@' ,{use:['aui-toggler-base','aui-toggler-delegate'], skinnable:true});

