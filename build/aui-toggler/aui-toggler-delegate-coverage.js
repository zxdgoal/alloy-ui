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
_yuitest_coverage["/build/aui-toggler-delegate/aui-toggler-delegate.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-toggler-delegate/aui-toggler-delegate.js",
    code: []
};
_yuitest_coverage["/build/aui-toggler-delegate/aui-toggler-delegate.js"].code=["AUI.add('aui-toggler-delegate', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isObject = Lang.isObject,","	isString = Lang.isString,","","	AArray = A.Array,","","	DOC = A.config.doc,","","	Toggler = A.Toggler,","","	DASH = '-',","	DOT = '.',","	EMPTY_STR = '',","	SPACE = ' ',","","	ANIMATED = 'animated',","	CLICK = 'click',","	CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',","	CONTAINER = 'container',","	CONTENT = 'content',","	CUBIC_BEZIER = 'cubic-bezier',","	EXPANDED = 'expanded',","	FIRST_CHILD = 'firstChild',","	HEADER = 'header',","	KEYDOWN = 'keydown',","	LINEAR = 'linear',","	TOGGLER = 'toggler',","	TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',","	TOGGLER_DELEGATE = 'toggler-delegate',","	TRANSITION = 'transition',","	WRAPPER = 'wrapper',","","	getCN = A.getClassName,","","	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER);","","var TogglerDelegate = A.Component.create({","	NAME: TOGGLER_DELEGATE,","","	ATTRS: {","","		animated: {","			validator: isBoolean,","			value: false,","			writeOnce: true","		},","","		closeAllOnExpand: {","			validator: isBoolean,","			value: false","		},","","		container: {","			setter: A.one,","			value: DOC","		},","","		content: {","			validator: isString","		},","","		expanded: {","			validator: isBoolean,","			value: true","		},","","		header: {","			validator: isString","		},","","		transition: {","			validator: isObject,","			value: {","				duration: 0.4,","			    easing: CUBIC_BEZIER","			}","		}","","	},","","	EXTENDS: A.Base,","","	prototype: {","","		items: null,","","		initializer: function() {","			var instance = this;","","			instance.bindUI();","			instance.renderUI();","		},","","		renderUI: function() {","			var instance = this;","","			if (instance.get(CLOSE_ALL_ON_EXPAND)) {","				instance.items = [];","","				instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {","					instance.items.push(","						instance._create(header)","					);","				});","			}","		},","","		bindUI: function() {","			var instance = this;","			var container = instance.get(CONTAINER);","			var header = instance.get(HEADER);","","			instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));","","			container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);","		},","","		findContentNode: function(header) {","			var instance = this;","			var content = instance.get(CONTENT);","","			var contentNode = header.next(content) || header.one(content);","","			if (!contentNode) {","				var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); ","","				if (wrapper) {","					contentNode = wrapper.get(FIRST_CHILD);","				}","			}","","			return contentNode;","		},","","		headerEventHandler: function(event) {","			var instance = this;","","			if (instance.animating) {","				return false;","			}","","			var target = event.currentTarget;","			var toggler = target.getData(TOGGLER) || instance._create(target);","","			if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {","				AArray.each(","					instance.items,","					function(item, index, collection) {","						if (item !== toggler && item.get(EXPANDED)) {","							item.collapse();","						}","					}","				);","			}","		},","","		_create: function(header) {","			var instance = this;","","			var toggler = new Toggler({","				animated: instance.get(ANIMATED),","				bindDOMEvents: false,","				bubbleTargets: [ instance ],","				content: instance.findContentNode(header),","				expanded: instance.get(EXPANDED),","				header: header,","				transition: instance.get(TRANSITION)","			});","","			return toggler;","		},","","		_onAnimatingChange: function(event) {","			var instance = this;","","			instance.animating = event.newVal;","		}","","	}","});","","A.TogglerDelegate = TogglerDelegate;","","}, '@VERSION@' ,{skinnable:false, requires:['aui-toggler-base']});"];
_yuitest_coverage["/build/aui-toggler-delegate/aui-toggler-delegate.js"].lines = {"1":0,"2":0,"39":0,"90":0,"92":0,"93":0,"97":0,"99":0,"100":0,"102":0,"103":0,"111":0,"112":0,"113":0,"115":0,"117":0,"121":0,"122":0,"124":0,"126":0,"127":0,"129":0,"130":0,"134":0,"138":0,"140":0,"141":0,"144":0,"145":0,"147":0,"148":0,"151":0,"152":0,"160":0,"162":0,"172":0,"176":0,"178":0,"184":0};
_yuitest_coverage["/build/aui-toggler-delegate/aui-toggler-delegate.js"].functions = {"initializer:89":0,"(anonymous 2):102":0,"renderUI:96":0,"bindUI:110":0,"findContentNode:120":0,"(anonymous 3):150":0,"headerEventHandler:137":0,"_create:159":0,"_onAnimatingChange:175":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-toggler-delegate/aui-toggler-delegate.js"].coveredLines = 39;
_yuitest_coverage["/build/aui-toggler-delegate/aui-toggler-delegate.js"].coveredFunctions = 10;
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 1);
AUI.add('aui-toggler-delegate', function(A) {
_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 2);
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

_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 39);
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
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "initializer", 89);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 90);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 92);
instance.bindUI();
			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 93);
instance.renderUI();
		},

		renderUI: function() {
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "renderUI", 96);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 97);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 99);
if (instance.get(CLOSE_ALL_ON_EXPAND)) {
				_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 100);
instance.items = [];

				_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 102);
instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {
					_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "(anonymous 2)", 102);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 103);
instance.items.push(
						instance._create(header)
					);
				});
			}
		},

		bindUI: function() {
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "bindUI", 110);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 111);
var instance = this;
			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 112);
var container = instance.get(CONTAINER);
			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 113);
var header = instance.get(HEADER);

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 115);
instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 117);
container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
		},

		findContentNode: function(header) {
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "findContentNode", 120);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 121);
var instance = this;
			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 122);
var content = instance.get(CONTENT);

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 124);
var contentNode = header.next(content) || header.one(content);

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 126);
if (!contentNode) {
				_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 127);
var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); 

				_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 129);
if (wrapper) {
					_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 130);
contentNode = wrapper.get(FIRST_CHILD);
				}
			}

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 134);
return contentNode;
		},

		headerEventHandler: function(event) {
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "headerEventHandler", 137);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 138);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 140);
if (instance.animating) {
				_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 141);
return false;
			}

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 144);
var target = event.currentTarget;
			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 145);
var toggler = target.getData(TOGGLER) || instance._create(target);

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 147);
if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {
				_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 148);
AArray.each(
					instance.items,
					function(item, index, collection) {
						_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "(anonymous 3)", 150);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 151);
if (item !== toggler && item.get(EXPANDED)) {
							_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 152);
item.collapse();
						}
					}
				);
			}
		},

		_create: function(header) {
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "_create", 159);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 160);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 162);
var toggler = new Toggler({
				animated: instance.get(ANIMATED),
				bindDOMEvents: false,
				bubbleTargets: [ instance ],
				content: instance.findContentNode(header),
				expanded: instance.get(EXPANDED),
				header: header,
				transition: instance.get(TRANSITION)
			});

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 172);
return toggler;
		},

		_onAnimatingChange: function(event) {
			_yuitest_coverfunc("/build/aui-toggler-delegate/aui-toggler-delegate.js", "_onAnimatingChange", 175);
_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 176);
var instance = this;

			_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 178);
instance.animating = event.newVal;
		}

	}
});

_yuitest_coverline("/build/aui-toggler-delegate/aui-toggler-delegate.js", 184);
A.TogglerDelegate = TogglerDelegate;

}, '@VERSION@' ,{skinnable:false, requires:['aui-toggler-base']});
