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
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].code=["AUI.add('aui-toggler-base', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isUndefined = Lang.isUndefined,","","	toNumber = function(val) {","		return parseInt(val, 10) || 0;","	},","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	PIXEL = 'px',","	SPACE = ' ',","","	ANIMATED = 'animated',","	ANIMATING = 'animating',","	BIND_DOM_EVENTS = 'bindDOMEvents',","	CLICK = 'click',","	COLLAPSED = 'collapsed',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	DOWN = 'down',","	ENTER = 'enter',","	ESC = 'esc',","	EXPANDED = 'expanded',","	EXPANDED_CHANGE = 'expandedChange',","	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',","	GUTTER = 'gutter',","	HEADER = 'header',","	HELPER = 'helper',","	KEYDOWN = 'keydown',","	LEFT = 'left',","	LINEAR = 'linear',","	MARGIN_TOP = 'marginTop',","	MINUS = 'minus',","	NUM_MINUS = 'num_minus',","	NUM_PLUS = 'num_plus',","	PARENT_NODE = 'parentNode',","	PLUS = 'plus',","	RIGHT = 'right',","	SPACE = 'space',","	TOGGLER = 'toggler',","	TRANSITION = 'transition',","	TRANSITION_END = 'transitionEnd',","	TRANSITION_START = 'transitionStart',","	UP = 'up',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT = getCN(TOGGLER, CONTENT),","	CSS_TOGGLER_CONTENT_COLLAPSED = getCN(TOGGLER, CONTENT, COLLAPSED),","	CSS_TOGGLER_CONTENT_EXPANDED = getCN(TOGGLER, CONTENT, EXPANDED),","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),","	CSS_TOGGLER_HEADER = getCN(TOGGLER, HEADER),","	CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),","	CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED),","","	CSS_TOGGLER_CONTENT_STATE = {","		'false': CSS_TOGGLER_CONTENT_COLLAPSED,","		'true': CSS_TOGGLER_CONTENT_EXPANDED","	},","","	CSS_TOGGLER_HEADER_STATE = {","		'false': CSS_TOGGLER_HEADER_COLLAPSED,","		'true': CSS_TOGGLER_HEADER_EXPANDED","	},","","	TPL_CONTENT_WRAPPER = '<div class=\"' + CSS_TOGGLER_CONTENT_WRAPPER + '\"></div>';","","var Toggler = A.Component.create({","	NAME: TOGGLER,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		animating: {","			validator: isBoolean,","			value: false","		},","","		bindDOMEvents: {","			validator: isBoolean,","			value: true,","			writeOnce: true","		},","","		content: {","			setter: A.one","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			setter: A.one","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	headerEventHandler: function(event, instance) {","		if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {","			event.preventDefault();","","			return instance.toggle();","		}","		else if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {","			event.preventDefault();","","			return instance.expand();","		}","		else if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {","			event.preventDefault();","","			return instance.collapse();","		}","	},","","	prototype: {","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.syncUI();","","			instance._uiSetExpanded(instance.get(EXPANDED));","		},","","		bindUI: function() {","			var instance = this;","			var header = instance.get(HEADER);","","			header.setData(TOGGLER, instance);","","			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));","","			if (instance.get(BIND_DOM_EVENTS)) {","				header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));","			}","		},","","		syncUI: function() {","			var instance = this;","","			instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);","			instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);","		},","","		animate: function(config, fn) {","			var instance = this;","","			instance._uiSetExpanded(true);","","			var transition = A.merge(config, instance.get(TRANSITION));","","			instance.get(CONTENT).transition(transition, A.bind(fn, instance));","		},","","		collapse: function() {","			var instance = this;","","			return instance.toggle(false);","		},","","		expand: function() {","			var instance = this;","","			return instance.toggle(true);","		},","","		getContentHeight: function() {","			var instance = this;","			var content = instance.get(CONTENT);","			var expanded = instance.get(EXPANDED), height;","","			if (!expanded) {","				instance._uiSetExpanded(true);","			}","","			if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {","				var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);","","				if (preciseRegion) {","					height = preciseRegion.bottom - preciseRegion.top;","				}","			}","			else {","				height = content.get(OFFSET_HEIGHT);","			}","","			if (!expanded) {","				instance._uiSetExpanded(false);","			}","","			return height;","		},","","		toggle: function(expand) {","			var instance = this;","","			if (isUndefined(expand)) {","				expand = !instance.get(EXPANDED);","			}","","			if (instance.get(ANIMATED)) {","				if (instance.get(ANIMATING)) {","					return expand;","				}","","				var content = instance.get(CONTENT);","","				var height = instance.getContentHeight();","				var gutter = toNumber(content.getStyle(MARGIN_TOP));","","				if (!instance.wrapped) {","					content.wrap(TPL_CONTENT_WRAPPER);","","					if (expand) {","						gutter = -(height + gutter);","","						content.setStyle(MARGIN_TOP, gutter);","					}","","					instance.wrapped = true;","				}","","				instance.set(ANIMATING, true);","","				instance.animate(","					{","						marginTop: -(height + gutter) + PIXEL","					},","					function() {","						instance.set(ANIMATING, false);","","						instance.set(EXPANDED, expand);","					}","				);","			}","			else {","				instance.set(EXPANDED, expand);","			}","","			return expand;","		},","","		_onExpandedChange: function(event) {","			var instance = this;","","			instance._uiSetExpanded(event.newVal);","		},","","		_uiSetExpanded: function(val) {","			var instance = this;","","			instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);","			instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);","		}","","	}","});","","A.Toggler = Toggler;","","}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});","AUI.add('aui-toggler-delegate', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isString = Lang.isString,","","	AArray = A.Array,","","	DOC = A.config.doc,","","	Toggler = A.Toggler,","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	SPACE = ' ',","","	ANIMATED = 'animated',","	CLICK = 'click',","	CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',","	CONTAINER = 'container',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	EXPANDED = 'expanded',","	FIRST_CHILD = 'firstChild',","	HEADER = 'header',","	KEYDOWN = 'keydown',","	LINEAR = 'linear',","	TOGGLER = 'toggler',","	TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',","	TOGGLER_DELEGATE = 'toggler-delegate',","	TRANSITION = 'transition',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER);","","var TogglerDelegate = A.Component.create({","	NAME: TOGGLER_DELEGATE,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		closeAllOnExpand: {","			validator: isBoolean,","			value: false","		},","","		container: {","			setter: A.one,","			value: DOC","		},","","		content: {","			validator: isString","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			validator: isString","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	prototype: {","","		items: null,","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.renderUI();","		},","","		renderUI: function() {","			var instance = this;","","			if (instance.get(CLOSE_ALL_ON_EXPAND)) {","				instance.items = [];","","				instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {","					instance.items.push(","						instance._create(header)","					);","				});","			}","		},","","		bindUI: function() {","			var instance = this;","			var container = instance.get(CONTAINER);","			var header = instance.get(HEADER);","","			instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));","","			container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);","		},","","		findContentNode: function(header) {","			var instance = this;","			var content = instance.get(CONTENT);","","			var contentNode = header.next(content) || header.one(content);","","			if (!contentNode) {","				var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); ","","				if (wrapper) {","					contentNode = wrapper.get(FIRST_CHILD);","				}","			}","","			return contentNode;","		},","","		headerEventHandler: function(event) {","			var instance = this;","","			if (instance.animating) {","				return false;","			}","","			var target = event.currentTarget;","			var toggler = target.getData(TOGGLER) || instance._create(target);","","			if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {","				AArray.each(","					instance.items,","					function(item, index, collection) {","						if (item !== toggler && item.get(EXPANDED)) {","							item.collapse();","						}","					}","				);","			}","		},","","		_create: function(header) {","			var instance = this;","","			var toggler = new Toggler({","				animated: instance.get(ANIMATED),","				bindDOMEvents: false,","				bubbleTargets: [ instance ],","				content: instance.findContentNode(header),","				expanded: instance.get(EXPANDED),","				header: header,","				transition: instance.get(TRANSITION)","			});","","			return toggler;","		},","","		_onAnimatingChange: function(event) {","			var instance = this;","","			instance.animating = event.newVal;","		}","","	}","});","","A.TogglerDelegate = TogglerDelegate;","","}, '@VERSION@' ,{skinnable:false, requires:['aui-toggler-base']});","","","AUI.add('aui-toggler', function(A){}, '@VERSION@' ,{use:['aui-toggler-base','aui-toggler-delegate'], skinnable:true});",""];
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].lines = {"1":0,"2":0,"8":0,"73":0,"121":0,"122":0,"124":0,"126":0,"127":0,"129":0,"131":0,"132":0,"134":0,"141":0,"143":0,"144":0,"146":0,"150":0,"151":0,"153":0,"155":0,"157":0,"158":0,"163":0,"165":0,"166":0,"170":0,"172":0,"174":0,"176":0,"180":0,"182":0,"186":0,"188":0,"192":0,"193":0,"194":0,"196":0,"197":0,"200":0,"201":0,"203":0,"204":0,"208":0,"211":0,"212":0,"215":0,"219":0,"221":0,"222":0,"225":0,"226":0,"227":0,"230":0,"232":0,"233":0,"235":0,"236":0,"238":0,"239":0,"241":0,"244":0,"247":0,"249":0,"254":0,"256":0,"261":0,"264":0,"268":0,"270":0,"274":0,"276":0,"277":0,"283":0,"286":0,"287":0,"324":0,"375":0,"377":0,"378":0,"382":0,"384":0,"385":0,"387":0,"388":0,"396":0,"397":0,"398":0,"400":0,"402":0,"406":0,"407":0,"409":0,"411":0,"412":0,"414":0,"415":0,"419":0,"423":0,"425":0,"426":0,"429":0,"430":0,"432":0,"433":0,"436":0,"437":0,"445":0,"447":0,"457":0,"461":0,"463":0,"469":0,"474":0};
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].functions = {"toNumber:7":0,"headerEventHandler:120":0,"initializer:140":0,"bindUI:149":0,"syncUI:162":0,"animate:169":0,"collapse:179":0,"expand:185":0,"getContentHeight:191":0,"(anonymous 2):253":0,"toggle:218":0,"_onExpandedChange:267":0,"_uiSetExpanded:273":0,"(anonymous 1):1":0,"initializer:374":0,"(anonymous 4):387":0,"renderUI:381":0,"bindUI:395":0,"findContentNode:405":0,"(anonymous 5):435":0,"headerEventHandler:422":0,"_create:444":0,"_onAnimatingChange:460":0,"(anonymous 3):286":0};
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].coveredLines = 114;
_yuitest_coverage["/build/aui-toggler/aui-toggler.js"].coveredFunctions = 24;
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 1);
AUI.add('aui-toggler-base', function(A) {
_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 2);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isUndefined = Lang.isUndefined,

	toNumber = function(val) {
		_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "toNumber", 7);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 8);
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

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 73);
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
		_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "headerEventHandler", 120);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 121);
if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 122);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 124);
return instance.toggle();
		}
		else {_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 126);
if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 127);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 129);
return instance.expand();
		}
		else {_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 131);
if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 132);
event.preventDefault();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 134);
return instance.collapse();
		}}}
	},

	prototype: {

		initializer: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "initializer", 140);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 141);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 143);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 144);
instance.syncUI();

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 146);
instance._uiSetExpanded(instance.get(EXPANDED));
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "bindUI", 149);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 150);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 151);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 153);
header.setData(TOGGLER, instance);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 155);
instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 157);
if (instance.get(BIND_DOM_EVENTS)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 158);
header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "syncUI", 162);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 163);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 165);
instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 166);
instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);
		},

		animate: function(config, fn) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "animate", 169);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 170);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 172);
instance._uiSetExpanded(true);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 174);
var transition = A.merge(config, instance.get(TRANSITION));

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 176);
instance.get(CONTENT).transition(transition, A.bind(fn, instance));
		},

		collapse: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "collapse", 179);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 180);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 182);
return instance.toggle(false);
		},

		expand: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "expand", 185);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 186);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 188);
return instance.toggle(true);
		},

		getContentHeight: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "getContentHeight", 191);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 192);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 193);
var content = instance.get(CONTENT);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 194);
var expanded = instance.get(EXPANDED), height;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 196);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 197);
instance._uiSetExpanded(true);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 200);
if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 201);
var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 203);
if (preciseRegion) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 204);
height = preciseRegion.bottom - preciseRegion.top;
				}
			}
			else {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 208);
height = content.get(OFFSET_HEIGHT);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 211);
if (!expanded) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 212);
instance._uiSetExpanded(false);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 215);
return height;
		},

		toggle: function(expand) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "toggle", 218);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 219);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 221);
if (isUndefined(expand)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 222);
expand = !instance.get(EXPANDED);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 225);
if (instance.get(ANIMATED)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 226);
if (instance.get(ANIMATING)) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 227);
return expand;
				}

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 230);
var content = instance.get(CONTENT);

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 232);
var height = instance.getContentHeight();
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 233);
var gutter = toNumber(content.getStyle(MARGIN_TOP));

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 235);
if (!instance.wrapped) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 236);
content.wrap(TPL_CONTENT_WRAPPER);

					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 238);
if (expand) {
						_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 239);
gutter = -(height + gutter);

						_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 241);
content.setStyle(MARGIN_TOP, gutter);
					}

					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 244);
instance.wrapped = true;
				}

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 247);
instance.set(ANIMATING, true);

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 249);
instance.animate(
					{
						marginTop: -(height + gutter) + PIXEL
					},
					function() {
						_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 2)", 253);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 254);
instance.set(ANIMATING, false);

						_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 256);
instance.set(EXPANDED, expand);
					}
				);
			}
			else {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 261);
instance.set(EXPANDED, expand);
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 264);
return expand;
		},

		_onExpandedChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_onExpandedChange", 267);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 268);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 270);
instance._uiSetExpanded(event.newVal);
		},

		_uiSetExpanded: function(val) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_uiSetExpanded", 273);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 274);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 276);
instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 277);
instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);
		}

	}
});

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 283);
A.Toggler = Toggler;

}, '@VERSION@' ,{requires:['aui-base','transition'], skinnable:true});
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 286);
AUI.add('aui-toggler-delegate', function(A) {
_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 3)", 286);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 287);
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

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 324);
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
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "initializer", 374);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 375);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 377);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 378);
instance.renderUI();
		},

		renderUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "renderUI", 381);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 382);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 384);
if (instance.get(CLOSE_ALL_ON_EXPAND)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 385);
instance.items = [];

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 387);
instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {
					_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 4)", 387);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 388);
instance.items.push(
						instance._create(header)
					);
				});
			}
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "bindUI", 395);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 396);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 397);
var container = instance.get(CONTAINER);
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 398);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 400);
instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 402);
container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
		},

		findContentNode: function(header) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "findContentNode", 405);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 406);
var instance = this;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 407);
var content = instance.get(CONTENT);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 409);
var contentNode = header.next(content) || header.one(content);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 411);
if (!contentNode) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 412);
var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); 

				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 414);
if (wrapper) {
					_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 415);
contentNode = wrapper.get(FIRST_CHILD);
				}
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 419);
return contentNode;
		},

		headerEventHandler: function(event) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "headerEventHandler", 422);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 423);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 425);
if (instance.animating) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 426);
return false;
			}

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 429);
var target = event.currentTarget;
			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 430);
var toggler = target.getData(TOGGLER) || instance._create(target);

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 432);
if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {
				_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 433);
AArray.each(
					instance.items,
					function(item, index, collection) {
						_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "(anonymous 5)", 435);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 436);
if (item !== toggler && item.get(EXPANDED)) {
							_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 437);
item.collapse();
						}
					}
				);
			}
		},

		_create: function(header) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_create", 444);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 445);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 447);
var toggler = new Toggler({
				animated: instance.get(ANIMATED),
				bindDOMEvents: false,
				bubbleTargets: [ instance ],
				content: instance.findContentNode(header),
				expanded: instance.get(EXPANDED),
				header: header,
				transition: instance.get(TRANSITION)
			});

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 457);
return toggler;
		},

		_onAnimatingChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler/aui-toggler.js", "_onAnimatingChange", 460);
_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 461);
var instance = this;

			_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 463);
instance.animating = event.newVal;
		}

	}
});

_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 469);
A.TogglerDelegate = TogglerDelegate;

}, '@VERSION@' ,{skinnable:false, requires:['aui-toggler-base']});


_yuitest_coverline("/build/aui-toggler/aui-toggler.js", 474);
AUI.add('aui-toggler', function(A){}, '@VERSION@' ,{use:['aui-toggler-base','aui-toggler-delegate'], skinnable:true});

