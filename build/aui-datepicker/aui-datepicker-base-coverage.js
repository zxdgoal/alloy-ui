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
_yuitest_coverage["/build/aui-datepicker-base/aui-datepicker-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-datepicker-base/aui-datepicker-base.js",
    code: []
};
_yuitest_coverage["/build/aui-datepicker-base/aui-datepicker-base.js"].code=["AUI.add('aui-datepicker-base', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isFunction = Lang.isFunction,","","	CALENDAR = 'calendar',","	CONTENT_BOX = 'contentBox',","	CURRENT_NODE = 'currentNode',","	FORMATTER = 'formatter',","	SELECT_MULTIPLE_DATES = 'selectMultipleDates',","	SET_VALUE = 'setValue',","","	DATEPICKER = 'date-picker';","","var DatePicker = A.Component.create({","	NAME: DATEPICKER,","","	ATTRS: {","		/**","		 * <a href=\"Calendar.html\">Calendar</a> configuration Object.</a>","		 *","		 * @attribute calendar","		 * @default {}","		 * @type Object","		 */","		calendar: {","			setter: '_setCalendar',","			value: {}","		},","","		/**","		 * Function to format the array of the selected dates before set the","         * value of the input.","		 *","		 * @attribute formatter","		 * @default function(dates) { return dates.formatted.join(','); }","		 * @type function","		 */","		formatter: {","			value: function(dates) {","				return dates.formatted.join(',');","			},","			validator: isFunction","		},","","		/**","		 * If true set the selected date with the correct","		 * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a> to the","		 * value of the input field which is hosting the Calendar.","		 *","		 * @attribute setValue","		 * @default true","		 * @type boolean","		 */","		setValue: {","			value: true,","			validator: isBoolean","		},","","		/**","		 * If true is able to do stacking with another overlays.","		 *","		 * @attribute stack","		 * @default true","		 * @type boolean","		 */","		stack: {","			lazyAdd: false,","			value: true,","			setter: '_setStack',","			validator: isBoolean","		},","","		showOn: {","			value: 'mousedown'","		},","","		hideOn: {","			value: 'mousedown'","		}","	},","","	EXTENDS: A.OverlayContext,","","	prototype: {","		/**","		 * Construction logic executed during Datepicker instantiation. Lifecycle.","		 *","		 * @method initializer","		 * @protected","		 */","		initializer: function() {","			var instance = this;","","			instance.calendar = new A.Calendar(","				instance.get(CALENDAR)","			);","		},","","		/**","		 * Bind the events on the Datepicker UI. Lifecycle.","		 *","		 * @method bindUI","		 * @protected","		 */","		bindUI: function() {","			var instance = this;","","			DatePicker.superclass.bindUI.apply(this, arguments);","","			instance.on('show', instance._onShowOverlay);","			instance.after('calendar:select', instance._afterSelectDate);","","			// Set the value of the trigger with the Calendar current date","			if (instance.get(SET_VALUE)) {","				instance._setTriggerValue(","					instance.calendar._getSelectEventData().date","				);","			}","		},","","		/**","		 * Descructor lifecycle implementation for the Datepicker class.","		 * Purges events attached to the node (and all child nodes).","		 *","		 * @method destructor","		 * @protected","		 */","		destructor: function() {","			var instance = this;","","			instance.calendar.destroy();","		},","","		/**","		 * Fires when a date is selected on the Calendar.","		 *","		 * @method _afterSelectDate","		 * @param {Event} event","		 * @protected","		 */","		_afterSelectDate: function(event) {","			var instance = this;","","			if (!instance.calendar.get(SELECT_MULTIPLE_DATES)) {","				instance.hide();","			}","","			if (instance.get(SET_VALUE)) {","				instance._setTriggerValue(event.date);","			}","		},","","		/**","		* Fires before the DatePicker overlay show. Responsible to invoke the","		* render phase of the Calendar.","		 *","		 * @method _onShowOverlay","		 * @param {Event} event","		 * @protected","		 */","		_onShowOverlay: function(event) {","			var instance = this;","","			instance._renderCalendar();","		},","","		/**","		 * Render the Calendar used inside the DatePicker.","		 *","		 * @method _renderCalendar","		 * @protected","		 */","		_renderCalendar: function() {","			var instance = this;","","			instance.calendar.render(","				instance.get(CONTENT_BOX)","			);","		},","","		/**","		 * Setter for the <a href=\"DatePicker.html#calendar\">calendar</a>","	     * attribute.","		 *","		 * @method _setCalendar","		 * @param {String} eventType Event type","		 * @protected","		 * @return {}","		 */","		_setCalendar: function(val) {","			var instance = this;","","			A.mix(val, {","				bubbleTargets: instance","			});","","			return val;","		},","","		/**","		 * Setter for the <a href=\"Calendar.html#config_stack\">stack</a> attribute.","		 *","		 * @method _setStack","		 * @param {boolean} value","		 * @protected","		 * @return {boolean}","		 */","		_setStack: function(value) {","			var instance = this;","","			if (value) {","				A.DatepickerManager.register(instance);","			}","			else {","				A.DatepickerManager.remove(instance);","			}","","			return value;","		},","","		/**","		 * Set the value of the trigger input with the date information.","		 *","		 * @method _setTriggerValue","		 * @param {Object} dateObj Object containing date information","		 * @protected","		 */","		_setTriggerValue: function(dateObj) {","			var instance = this;","","			var value = instance.get(FORMATTER).apply(instance, [dateObj]);","","			instance.get(CURRENT_NODE).val(value);","		}","	}","});","","A.DatePicker = DatePicker;","","/**"," * A base class for DatepickerManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class DatepickerManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","A.DatepickerManager = new A.OverlayManager({","	/**","	 * ZIndex default value passed to the","     * <a href=\"OverlayManager.html#config_zIndexBase\">zIndexBase</a> of","     * <a href=\"OverlayManager.html\">OverlayManager</a>.","	 *","	 * @attribute zIndexBase","	 * @default 1000","	 * @type Number","	 */","	zIndexBase: 1000","});","","}, '@VERSION@' ,{requires:['aui-calendar','aui-overlay-context'], skinnable:true});"];
_yuitest_coverage["/build/aui-datepicker-base/aui-datepicker-base.js"].lines = {"1":0,"2":0,"15":0,"41":0,"93":0,"95":0,"107":0,"109":0,"111":0,"112":0,"115":0,"116":0,"130":0,"132":0,"143":0,"145":0,"146":0,"149":0,"150":0,"163":0,"165":0,"175":0,"177":0,"192":0,"194":0,"198":0,"210":0,"212":0,"213":0,"216":0,"219":0,"230":0,"232":0,"234":0,"239":0,"251":0};
_yuitest_coverage["/build/aui-datepicker-base/aui-datepicker-base.js"].functions = {"value:40":0,"initializer:92":0,"bindUI:106":0,"destructor:129":0,"_afterSelectDate:142":0,"_onShowOverlay:162":0,"_renderCalendar:174":0,"_setCalendar:191":0,"_setStack:209":0,"_setTriggerValue:229":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-datepicker-base/aui-datepicker-base.js"].coveredLines = 36;
_yuitest_coverage["/build/aui-datepicker-base/aui-datepicker-base.js"].coveredFunctions = 11;
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 1);
AUI.add('aui-datepicker-base', function(A) {
_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 2);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,

	CALENDAR = 'calendar',
	CONTENT_BOX = 'contentBox',
	CURRENT_NODE = 'currentNode',
	FORMATTER = 'formatter',
	SELECT_MULTIPLE_DATES = 'selectMultipleDates',
	SET_VALUE = 'setValue',

	DATEPICKER = 'date-picker';

_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 15);
var DatePicker = A.Component.create({
	NAME: DATEPICKER,

	ATTRS: {
		/**
		 * <a href="Calendar.html">Calendar</a> configuration Object.</a>
		 *
		 * @attribute calendar
		 * @default {}
		 * @type Object
		 */
		calendar: {
			setter: '_setCalendar',
			value: {}
		},

		/**
		 * Function to format the array of the selected dates before set the
         * value of the input.
		 *
		 * @attribute formatter
		 * @default function(dates) { return dates.formatted.join(','); }
		 * @type function
		 */
		formatter: {
			value: function(dates) {
				_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "value", 40);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 41);
return dates.formatted.join(',');
			},
			validator: isFunction
		},

		/**
		 * If true set the selected date with the correct
		 * <a href="Calendar.html#config_dateFormat">dateFormat</a> to the
		 * value of the input field which is hosting the Calendar.
		 *
		 * @attribute setValue
		 * @default true
		 * @type boolean
		 */
		setValue: {
			value: true,
			validator: isBoolean
		},

		/**
		 * If true is able to do stacking with another overlays.
		 *
		 * @attribute stack
		 * @default true
		 * @type boolean
		 */
		stack: {
			lazyAdd: false,
			value: true,
			setter: '_setStack',
			validator: isBoolean
		},

		showOn: {
			value: 'mousedown'
		},

		hideOn: {
			value: 'mousedown'
		}
	},

	EXTENDS: A.OverlayContext,

	prototype: {
		/**
		 * Construction logic executed during Datepicker instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "initializer", 92);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 93);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 95);
instance.calendar = new A.Calendar(
				instance.get(CALENDAR)
			);
		},

		/**
		 * Bind the events on the Datepicker UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "bindUI", 106);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 107);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 109);
DatePicker.superclass.bindUI.apply(this, arguments);

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 111);
instance.on('show', instance._onShowOverlay);
			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 112);
instance.after('calendar:select', instance._afterSelectDate);

			// Set the value of the trigger with the Calendar current date
			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 115);
if (instance.get(SET_VALUE)) {
				_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 116);
instance._setTriggerValue(
					instance.calendar._getSelectEventData().date
				);
			}
		},

		/**
		 * Descructor lifecycle implementation for the Datepicker class.
		 * Purges events attached to the node (and all child nodes).
		 *
		 * @method destructor
		 * @protected
		 */
		destructor: function() {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "destructor", 129);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 130);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 132);
instance.calendar.destroy();
		},

		/**
		 * Fires when a date is selected on the Calendar.
		 *
		 * @method _afterSelectDate
		 * @param {Event} event
		 * @protected
		 */
		_afterSelectDate: function(event) {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "_afterSelectDate", 142);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 143);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 145);
if (!instance.calendar.get(SELECT_MULTIPLE_DATES)) {
				_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 146);
instance.hide();
			}

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 149);
if (instance.get(SET_VALUE)) {
				_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 150);
instance._setTriggerValue(event.date);
			}
		},

		/**
		* Fires before the DatePicker overlay show. Responsible to invoke the
		* render phase of the Calendar.
		 *
		 * @method _onShowOverlay
		 * @param {Event} event
		 * @protected
		 */
		_onShowOverlay: function(event) {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "_onShowOverlay", 162);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 163);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 165);
instance._renderCalendar();
		},

		/**
		 * Render the Calendar used inside the DatePicker.
		 *
		 * @method _renderCalendar
		 * @protected
		 */
		_renderCalendar: function() {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "_renderCalendar", 174);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 175);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 177);
instance.calendar.render(
				instance.get(CONTENT_BOX)
			);
		},

		/**
		 * Setter for the <a href="DatePicker.html#calendar">calendar</a>
	     * attribute.
		 *
		 * @method _setCalendar
		 * @param {String} eventType Event type
		 * @protected
		 * @return {}
		 */
		_setCalendar: function(val) {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "_setCalendar", 191);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 192);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 194);
A.mix(val, {
				bubbleTargets: instance
			});

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 198);
return val;
		},

		/**
		 * Setter for the <a href="Calendar.html#config_stack">stack</a> attribute.
		 *
		 * @method _setStack
		 * @param {boolean} value
		 * @protected
		 * @return {boolean}
		 */
		_setStack: function(value) {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "_setStack", 209);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 210);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 212);
if (value) {
				_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 213);
A.DatepickerManager.register(instance);
			}
			else {
				_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 216);
A.DatepickerManager.remove(instance);
			}

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 219);
return value;
		},

		/**
		 * Set the value of the trigger input with the date information.
		 *
		 * @method _setTriggerValue
		 * @param {Object} dateObj Object containing date information
		 * @protected
		 */
		_setTriggerValue: function(dateObj) {
			_yuitest_coverfunc("/build/aui-datepicker-base/aui-datepicker-base.js", "_setTriggerValue", 229);
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 230);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 232);
var value = instance.get(FORMATTER).apply(instance, [dateObj]);

			_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 234);
instance.get(CURRENT_NODE).val(value);
		}
	}
});

_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 239);
A.DatePicker = DatePicker;

/**
 * A base class for DatepickerManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class DatepickerManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
_yuitest_coverline("/build/aui-datepicker-base/aui-datepicker-base.js", 251);
A.DatepickerManager = new A.OverlayManager({
	/**
	 * ZIndex default value passed to the
     * <a href="OverlayManager.html#config_zIndexBase">zIndexBase</a> of
     * <a href="OverlayManager.html">OverlayManager</a>.
	 *
	 * @attribute zIndexBase
	 * @default 1000
	 * @type Number
	 */
	zIndexBase: 1000
});

}, '@VERSION@' ,{requires:['aui-calendar','aui-overlay-context'], skinnable:true});
