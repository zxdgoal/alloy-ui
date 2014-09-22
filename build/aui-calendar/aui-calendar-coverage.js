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
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-calendar/aui-calendar.js",
    code: []
};
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].code=["AUI.add('aui-calendar', function(A) {","/**"," * The Calendar component is a UI control that enables users to choose one or"," * more dates from a graphical calendar presented in a single month or multi"," * month interface. Calendars are generated entirely via script and can be"," * navigated without any page refreshes."," *"," * @module aui-calendar"," * @submodule aui-calendar-base"," */","","var L = A.Lang,","	isDate = L.isDate,","	isString = L.isString,","	isArray = L.isArray,","	isBoolean = L.isBoolean,","	isValue = L.isValue,","	isNumber = L.isNumber,","","	toInt = L.toInt,","","	DateMath = A.DataType.DateMath,","	WidgetStdMod = A.WidgetStdMod,","","	EMPTY_STR = '',","	SPACE = ' ',","","	ACTIVE = 'active',","	ALLOW_NONE = 'allowNone',","	ANCHOR = 'a',","	BLANK = 'blank',","	BLANK_DAYS = 'blankDays',","	BOUNDING_BOX = 'boundingBox',","	CALENDAR = 'calendar',","	CHILDREN = 'children',","	CIRCLE = 'circle',","	CLEARFIX = 'clearfix',","	CURRENT_DAY = 'currentDay',","	CURRENT_MONTH = 'currentMonth',","	CURRENT_YEAR = 'currentYear',","	DATA_DAY = 'data-day',","	DATA_MONTH = 'data-month',","	DATA_YEAR = 'data-year',","	DATES = 'dates',","	DATE_FORMAT = 'dateFormat',","	DAY = 'day',","	DEFAULT = 'default',","	DISABLED = 'disabled',","	DOT = '.',","	END = 'end',","	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',","	HEADER = 'hd',","	HEADER_CONTENT_NODE = 'headerContentNode',","	HEADER_TITLE_NODE = 'headerTitleNode',","	HELPER = 'helper',","	HIDDEN = 'hidden',","	HOVER = 'hover',","	ICON = 'icon',","	ICON_NEXT_NODE = 'iconNextNode',","	ICON_PREV_NODE = 'iconPrevNode',","	LINK = 'link',","	LOCALE = 'locale',","	MAX_DATE = 'maxDate',","	MIN_DATE = 'minDate',","	MONTH = 'month',","	MONTHDAYS = 'monthdays',","	MONTH_DAYS = 'monthDays',","	MONTH_DAYS_NODE = 'monthDaysNode',","	NEXT = 'next',","	NONE = 'none',","	NONE_LINK_NODE = 'noneLinkNode',","	PADDING = 'padding',","	PADDING_DAYS_END = 'paddingDaysEnd',","	PADDING_DAYS_START = 'paddingDaysStart',","	PREV = 'prev',","	SELECT_MULTIPLE_DATES = 'selectMultipleDates',","	SHOW_OTHER_MONTH = 'showOtherMonth',","	SHOW_TODAY = 'showToday',","	START = 'start',","	STATE = 'state',","	TITLE = 'title',","	TODAY = 'today',","	TODAY_LINK_NODE = 'todayLinkNode',","	TRIANGLE = 'triangle',","	WEEK = 'week',","	WEEKDAYS = 'weekdays',","	WEEK_DAYS = 'weekDays',","	WEEK_DAYS_NODE = 'weekDaysNode',","","	EV_CALENDAR_SELECT = 'calendar:select',","","	getCN = A.getClassName,","","	CSS_CALENDAR_DISABLED = getCN(CALENDAR, DISABLED),","	CSS_CALENDAR_LINK = getCN(CALENDAR, LINK),","	CSS_CALENDAR_LINK_NONE = getCN(CALENDAR, LINK, NONE),","	CSS_CALENDAR_LINK_TODAY = getCN(CALENDAR, LINK, TODAY),","	CSS_DAY = getCN(CALENDAR, DAY),","	CSS_DAY_MONTH = getCN(CALENDAR, DAY, MONTH),","	CSS_DAY_BLANK = getCN(CALENDAR, DAY, BLANK),","	CSS_DAY_PADDING_END = getCN(CALENDAR, DAY, PADDING, END),","	CSS_DAY_PADDING_START = getCN(CALENDAR, DAY, PADDING, START),","	CSS_HEADER = getCN(CALENDAR, HEADER),","	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),","	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),","	CSS_ICON = getCN(ICON),","	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, 'l'),","	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, 'r'),","	CSS_MONTHDAYS = getCN(CALENDAR, MONTHDAYS),","	CSS_NEXT = getCN(CALENDAR, NEXT),","	CSS_PREV = getCN(CALENDAR, PREV),","	CSS_STATE_ACTIVE = getCN(STATE, ACTIVE),","	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),","	CSS_STATE_HOVER = getCN(STATE, HOVER),","	CSS_TITLE = getCN(CALENDAR, TITLE),","	CSS_WEEK = getCN(CALENDAR, WEEK),","	CSS_WEEKDAYS = getCN(CALENDAR, WEEKDAYS),","","	EMPTY_DATES = [],","","	INT_MATRIX_DAYS_LENGTH = 42,","	INT_MAX_PADDING_END = 14,","","	TPL_CALENDAR_NONE_LINK = '<a href=\"#\" class=\"'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_NONE ].join(SPACE)+'\">None</a>',","","	TPL_CALENDAR_TODAY_LINK = '<a href=\"#\" class=\"'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_TODAY ].join(SPACE)+'\">Today</a>',","","	TPL_CALENDAR_HEADER = '<div class=\"'+[ CSS_HEADER, CSS_STATE_DEFAULT, CSS_HELPER_CLEARFIX ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_PREV = '<a href=\"\" class=\"'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L, CSS_PREV ].join(SPACE)+'\">Back</a>',","","	TPL_CALENDAR_NEXT = '<a href=\"\" class=\"'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R, CSS_NEXT ].join(SPACE)+'\">Prev</a>',","","	TPL_CALENDAR_DAY_BLANK = '<div class=\"'+[ CSS_DAY_BLANK, CSS_HELPER_HIDDEN ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_DAY_PADDING_START = '<div class=\"'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_START, CSS_HELPER_HIDDEN ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_DAY_PADDING_END = ['<div class=\"'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_END, CSS_HELPER_HIDDEN ].join(SPACE)+'\">', 0, '</div>'],","","	TPL_CALENDAR_HEADER_TITLE = '<div class=\"'+CSS_TITLE+'\"></div>',","","	TPL_CALENDAR_MONTHDAYS = '<div class=\"'+[ CSS_MONTHDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_WEEKDAYS = '<div class=\"'+[ CSS_WEEKDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'\"></div>',","","	TPL_BUFFER_WEEKDAYS = ['<div class=\"'+CSS_WEEK+'\">', 0, '</div>'],","","	TPL_BUFFER_MONTH_DAYS = ['<a href=\"#\" class=\"'+[ CSS_DAY, CSS_DAY_MONTH, CSS_STATE_DEFAULT ].join(SPACE)+'\">', 0, '</a>'];","","/**"," * <p><img src=\"assets/images/aui-calendar/main.png\"/></p>"," *"," * A base class for Calendar, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Setting Configuration Options</li>"," *    <li>Obtaining Selected Dates</li>"," *    <li>Creating International Calendars</li>"," *    <li>Customizing the Calendar</li>"," * </ul>"," *"," * Quick Example:"," *"," * <pre><code>var instance = new A.Calendar({"," *  trigger: '#input1',"," *  dates: ['09/14/2009', '09/15/2009'],"," *  dateFormat: '%d/%m/%y %A',"," *  setValue: true,"," *  selectMultipleDates: true"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"Calendar.html#configattributes\">Configuration Attributes</a> available for"," * Calendar."," *"," * @class Calendar"," * @param config {Object} Object literal specifying widget configuration properties."," * @constructor"," * @extends OverlayContext"," */","var Calendar = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property Calendar.NAME","		 * @type String","		 * @static","		 */","		NAME: CALENDAR,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the Calendar.","		 *","		 * @property Calendar.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Wheather displays the \"none\" link on the Calendar footer.","			 *","			 * @attribute allowNone","			 * @default true","			 * @type boolean","			 */","			allowNone: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * NodeList containing all the DOM elements for","			 * each blank day. If not specified try to query using HTML_PARSER","			 * an element inside contentBox which matches","			 * <code>aui-calendar-day-blank</code>.","			 *","			 * @attribute blankDays","			 * @default Generated div element.","			 * @type NodeList","			 */","			blankDays: {","				valueFn: '_valueBlankDays'","			},","","			/**","			 * Current day number.","			 *","			 * @attribute currentDay","			 * @default Current day","			 * @type Number","			 */","			currentDay: {","				setter: '_setDay',","				value: (new Date()).getDate()","			},","","			/**","			 * Current month number.","			 *","			 * @attribute currentMonth","			 * @default Current month","			 * @type Number","			 */","			currentMonth: {","				setter: '_setMonth',","				value: (new Date()).getMonth()","			},","","			/**","			 * Current year number.","			 *","			 * @attribute currentYear","			 * @default Current year","			 * @type Number","			 */","			currentYear: {","				setter: '_setYear',","				value: (new Date()).getFullYear()","			},","","			/**","			 * The default date format string which can be overriden for","			 * localization support. The format must be valid according to","			 * <a href=\"DataType.Date.html\">A.DataType.Date.format</a>.","			 *","			 * @attribute dateFormat","			 * @default %m/%d/%Y","			 * @type String","			 */","			dateFormat: {","				value: '%m/%d/%Y',","				validator: isString","			},","","			/**","			 * Dates which the calendar will show as selected by default.","			 *","			 * @attribute dates","			 * @default Current date","			 * @type Array","			 */","			dates: {","				lazyAdd: false,","				value: [ new Date() ],","				validator: isArray,","				setter: '_setDates'","			},","","			/**","			 * First day of the week: Sunday is 0, Monday is 1.","			 *","			 * @attribute firstDayOfWeek","			 * @default 0","			 * @type Number","			 */","			firstDayOfWeek: {","				value: 0,","				validator: isNumber","			},","","			/**","			 * DOM node reference to be the header of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-hd</code>.","			 *","			 * @attribute headerContentNode","			 * @default Generated div element.","			 * @type Node","			 */","			headerContentNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_HEADER);","				}","			},","","			/**","			 * DOM node reference to be the title of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-title</code>.","			 *","			 * @attribute headerTitleNode","			 * @default Generated div element.","			 * @type Node","			 */","			headerTitleNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_HEADER_TITLE);","				}","			},","","			/**","			 * DOM node reference to be the icon next of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-prev</code>.","			 *","			 * @attribute iconNextNode","			 * @default Generated div element.","			 * @type Node","			 */","			iconNextNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_NEXT);","				}","			},","","			/**","			 * DOM node reference to be the icon prev of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-prev</code>.","			 *","			 * @attribute iconPrevNode","			 * @default Generated div element.","			 * @type Node","			 */","			iconPrevNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_PREV);","				}","			},","","			/**","			 * Maximum allowable date. Values supported by the Date","			 * constructor are supported.","			 *","			 * @attribute maxDate","			 * @default null","			 * @type String | Date","			 */","			maxDate: {","				value: null,","				setter: '_setMinMaxDate'","			},","","			/**","			 * Minimum allowable date. Values supported by the Date","			 * constructor are supported.","			 *","			 * @attribute minDate","			 * @default null","			 * @type Date | String","			 */","			minDate: {","				value: null,","				setter: '_setMinMaxDate'","			},","","			/**","			 * NodeList reference containing the days of the month of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-day</code>.","			 *","			 * @attribute monthDays","			 * @default Generated div element.","			 * @type NodeList","			 */","			monthDays: {","				valueFn: '_valueMonthDays'","			},","","			/**","			 * DOM node reference which contains all month days nodes of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-monthdays</code>.","			 *","			 * @attribute monthDaysNode","			 * @default Generated div element.","			 * @type Node","			 */","			monthDaysNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_MONTHDAYS);","				}","			},","","			/**","			 * DOM node reference to be the \"none\" link of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-title</code>.","			 *","			 * @attribute noneLinkNode","			 * @default Generated div element.","			 * @type Node","			 */","			noneLinkNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_NONE_LINK);","				}","			},","","			/**","			 * NodeList containing all the DOM elements for","			 * each blank day. If not specified try to query using HTML_PARSER","			 * an element inside contentBox which matches","			 * <code>aui-calendar-day-blank</code>.","			 *","			 * @attribute paddingDaysEnd","			 * @default Generated div element.","			 * @type NodeList","			 */","			paddingDaysEnd: {","				valueFn: '_valuePaddingDaysEnd'","			},","","			/**","			 * NodeList containing all the DOM elements for","			 * each blank day. If not specified try to query using HTML_PARSER","			 * an element inside contentBox which matches","			 * <code>aui-calendar-day-blank</code>.","			 *","			 * @attribute paddingDaysStart","			 * @default Generated div element.","			 * @type NodeList","			 */","			paddingDaysStart: {","				valueFn: '_valuePaddingDaysStart'","			},","","			/**","			 * Wether accepts to select multiple dates.","			 *","			 * @attribute selectMultipleDates","			 * @default false","			 * @type boolean","			 */","			selectMultipleDates: {","				value: false","			},","","			/**","			 * If true set the selected date with the correct","			 * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a> to the","			 * value of the input field which is hosting the Calendar.","			 *","			 * @attribute setValue","			 * @default true","			 * @type boolean","			 */","			setValue: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * Wheather displays the days for the other months.","			 *","			 * @attribute showOtherMonth","			 * @default true","			 * @type boolean","			 */","			showOtherMonth: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * Wheather displays the \"today\" link on the Calendar footer.","			 *","			 * @attribute showToday","			 * @default true","			 * @type boolean","			 */","			showToday: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * DOM node reference to be the \"today\" link of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-title</code>.","			 *","			 * @attribute todayLinkNode","			 * @default Generated div element.","			 * @type Node","			 */","			todayLinkNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_TODAY_LINK);","				}","			},","","			/**","			 * NodeList reference containing the days of the week of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-week</code>.","			 *","			 * @attribute weekDays","			 * @default Generated div element.","			 * @type NodeList","			 */","			weekDays: {","				valueFn: '_valueWeekDays'","			},","","			/**","			 * DOM node reference which contains all week days nodes of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-weekdays</code>.","			 *","			 * @attribute weekDaysNode","			 * @default Generated div element.","			 * @type Node","			 */","			weekDaysNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_WEEKDAYS);","				}","			}","		},","","		/**","		 * Object hash, defining how attribute values are to be parsed from","		 * markup contained in the widget's content box.","		 *","		 * @property ProgressBar.HTML_PARSER","		 * @type Object","		 * @static","		 */","		HTML_PARSER: {","			blankDays: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_BLANK);","","				return nodes.size() ? nodes : null;","			},","","			monthDays: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_MONTH);","","				return nodes.size() ? nodes : null;","			},","","			paddingDaysEnd: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_PADDING_END);","","				return nodes.size() ? nodes : null;","			},","","			paddingDaysStart: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_PADDING_START);","","				return nodes.size() ? nodes : null;","			},","","			weekDays: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_WEEK);","","				return nodes.size() ? nodes : null;","			},","","			headerTitleNode: DOT+CSS_TITLE,","","			headerContentNode: DOT+CSS_HEADER,","","			iconNextNode: DOT+CSS_NEXT,","","			iconPrevNode: DOT+CSS_PREV,","","			monthDaysNode: DOT+CSS_MONTHDAYS,","","			noneLinkNode: DOT+CSS_CALENDAR_LINK_NONE,","","			todayLinkNode: DOT+CSS_CALENDAR_LINK_TODAY,","","			weekDaysNode: DOT+CSS_WEEKDAYS","		},","","		UI_ATTRS: [DATES, SHOW_TODAY, ALLOW_NONE],","","		BIND_UI_ATTRS: [SHOW_OTHER_MONTH],","","		prototype: {","			/**","			 * Construction logic executed during Calendar instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				instance._createEvents();","			},","","			/**","			 * Bind the events on the Calendar UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","","				boundingBox.once('mousemove', A.bind(instance._bindDelegate, instance));","			},","","			/**","			 * Clear all selected dates on the Calendar.","			 *","			 * @method clear","			 */","			clear: function() {","				var instance = this;","","				instance.set(DATES, Calendar.EMPTY_DATES);","			},","","			/**","			 * Loop each date from <a href=\"Calendar.html#config_dates\">dates</a> and","		     * executes a callback.","			 *","			 * @method eachSelectedDate","			 * @param {function} fn Callback to be executed for each date.","			 * @param {Dates} dates Optional dates Array to loop through. If not passed it will use","			 * the <a href=\"Calendar.html#config_dates\">dates</a>.","			 */","			eachSelectedDate: function(fn, dates) {","				var instance = this;","","				A.Array.each(dates || instance.get(DATES), fn, instance);","			},","","			/**","			 * Get the first day of the month of the passed year.","			 *","			 * @method findMonthStart","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @return {Number}","			 */","			findMonthStart: function(year, month) {","				var instance = this;","				var date = instance._normalizeYearMonth(year, month);","","				return DateMath.findMonthStart(DateMath.getDate(date.year, date.month));","			},","","			/**","			 * Format a date with the passed mask. Used on","		     * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a>.","			 *","			 * @method formatDate","			 * @param {Date} date","			 * @param {String} mask See <a href=\"Calendar.html#config_dateFormat\">dateFormat</a>.","			 * @return {String}","			 */","			formatDate: function (date, mask) {","				var instance = this;","				var locale = instance.get(LOCALE);","","				return A.DataType.Date.format(date, { format: mask, locale: locale });","			},","","			/**","			 * Get current date.","			 *","			 * @method getCurrentDate","			 * @return {Date}","			 */","			getCurrentDate: function(offsetYear, offsetMonth, offsetDay) {","				var instance = this;","				var date = instance._normalizeYearMonth();","","				return DateMath.getDate(date.year + toInt(offsetYear), date.month + toInt(offsetMonth), date.day + toInt(offsetDay));","			},","","			/**","			 * Get the number of days in the passed year and month.","			 *","			 * @method getDaysInMonth","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @return {Number}","			 */","			getDaysInMonth: function(year, month) {","				var instance = this;","				var date = instance._normalizeYearMonth(year, month);","","		        return DateMath.getDaysInMonth(date.year, date.month);","		    },","","			/**","			 * Get an Array with selected dates with detailed information (day, month, year).","			 *<pre><code>[{","			 *    year: date.getFullYear(),","			 *    month: date.getMonth(),","			 *    day: date.getDate()","			 * }]</code></pre>","			 *","			 * @method getDetailedSelectedDates","			 * @return {Array}","			 */","			getDetailedSelectedDates: function() {","				var instance = this;","				var dates = [];","","				instance.eachSelectedDate(function(date) {","					dates.push({","						year: date.getFullYear(),","						month: date.getMonth(),","						day: date.getDate()","					});","				});","","				return dates;","			},","","			/**","			 * Get the first day of week of the passed year and month.","			 *","			 * @method getFirstDayOfWeek","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @return {Number}","			 */","			getFirstDayOfWeek: function() {","				var instance = this;","				var firstDayOfWeek = instance.get(FIRST_DAY_OF_WEEK);","","				return DateMath.getFirstDayOfWeek(instance.findMonthStart(), firstDayOfWeek);","			},","","			/**","			 * Get the selected dates formatted by the","		     * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a>.","			 *","			 * @method getFormattedSelectedDates","			 * @return {Array}","			 */","			getFormattedSelectedDates: function() {","				var instance = this;","				var dates = [];","","				instance.eachSelectedDate(function(date) {","					dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );","				});","","				return dates;","			},","","			/**","			 * Get the selected dates.","			 *","			 * @method getSelectedDates","			 * @return {Array}","			 */","			getSelectedDates: function() {","				var instance = this;","","				return instance.get(DATES);","			},","","			/**","			 * Check if a date is already selected.","			 *","			 * @method isAlreadySelected","			 * @param {Date} date Date to be checked.","			 * @return {boolean}","			 */","			isAlreadySelected: function(date) {","				var instance = this;","				var isAlreadySelected = false;","","				instance.eachSelectedDate(function(d, index) {","					if (instance._compareDates(d, date)) {","						isAlreadySelected = true;","					}","				});","","				return isAlreadySelected;","			},","","			/**","			 * Check if the passed date is out of range. Compared with the","		     * <a href=\"Calendar.html#config_minDate\">minDate</a> and","		     * <a href=\"Calendar.html#config_maxDate\">maxDate</a>.","			 *","			 * @method isOutOfRangeDate","			 * @param {Date} date Date to be checked.","			 */","			isOutOfRangeDate: function(date) {","				var instance = this;","				var maxDate = instance.get(MAX_DATE);","				var minDate = instance.get(MIN_DATE);","","				if ((!minDate && !maxDate) ||","					instance._compareDates(date, minDate) ||","					instance._compareDates(date, maxDate)) {","","					return false;","				}","","				return !DateMath.between(date, minDate, maxDate);","			},","","			/**","			 * Navigate through months and re-sync the UI.","			 *","			 * @method navigateMonth","			 * @param {Number} offset Offset of the number of months to navigate.","		     * Could be a positive or a negative offset.","			 */","			navigateMonth: function(offset) {","				var instance = this;","				var date = instance.getCurrentDate(0, offset);","","				// when navigate by month update the year also","				instance.set(CURRENT_MONTH, date.getMonth());","				instance.set(CURRENT_YEAR, date.getFullYear());","","				instance._syncView();","			},","","			/**","			 * Remove the passed date from","		     * <a href=\"Calendar.html#config_dates\">dates</a>.","			 *","			 * @method removeDate","			 * @param {Date} date Date to remove","			 */","			removeDate: function(date) {","				var instance = this;","				var dates = [];","","				instance.eachSelectedDate(","					function(d, index) {","						if (!instance._compareDates(d, date)) {","							dates.push(d);","						}","					}","				);","","				instance.set(DATES, dates);","			},","","","			/**","			 * Create the DOM structure for the Calendar. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				// creating properties references for performance","				instance.blankDays = instance.get(BLANK_DAYS);","				instance.headerContentNode = instance.get(HEADER_CONTENT_NODE);","				instance.headerTitleNode = instance.get(HEADER_TITLE_NODE);","				instance.iconNextNode = instance.get(ICON_NEXT_NODE);","				instance.iconPrevNode = instance.get(ICON_PREV_NODE);","				instance.monthDays = instance.get(MONTH_DAYS);","				instance.monthDaysNode = instance.get(MONTH_DAYS_NODE);","				instance.noneLinkNode = instance.get(NONE_LINK_NODE);","				instance.paddingDaysEnd = instance.get(PADDING_DAYS_END);","				instance.paddingDaysStart = instance.get(PADDING_DAYS_START);","				instance.todayLinkNode = instance.get(TODAY_LINK_NODE);","				instance.weekDays = instance.get(WEEK_DAYS);","				instance.weekDaysNode = instance.get(WEEK_DAYS_NODE);","","				instance._renderWeekDays();","				instance._renderBlankDays();","				instance._renderPaddingDaysStart();","				instance._renderMonthDays();","				instance._renderPaddingDaysEnd();","				instance._renderIconControls();","				instance._renderTitleNode();","			},","","			/**","			 * Select the current date returned by","		     * <a href=\"Calendar.html#method_getCurrentDate\">getCurrentDate</a>.","			 *","			 * @method selectCurrentDate","			 * @protected","			 */","			selectCurrentDate: function() {","				var instance = this;","				var currentDate = instance.getCurrentDate();","","				if (!instance.isAlreadySelected(currentDate)) {","					var dates = instance.get(DATES);","","					// if is single selection reset the selected dates","					if (!instance.get(SELECT_MULTIPLE_DATES)) {","						dates = [];","					}","","					dates.push(currentDate);","					instance.set(DATES, dates);","				}","			},","","			/**","			 * Navigate to the next month. Fired from the next icon on the Calendar","		     * header.","			 *","			 * @method selectNextMonth","			 */","			selectNextMonth: function() {","				var instance = this;","","				instance.navigateMonth(+1);","			},","","			/**","			 * Navigate to the previous month. Fired from the previous icon on the","			 * Calendar header.","			 *","			 * @method selectPrevMonth","			 */","			selectPrevMonth: function() {","				var instance = this;","","				instance.navigateMonth(-1);","			},","","			/**","			 * Select today date on the Calendar.","			 *","			 * @method selectToday","			 */","			selectToday: function() {","				var instance = this;","","				instance.set(DATES, [ new Date() ]);","			},","","		    /**","		     * Update the currentDay, currentMonth and currentYear values.","		     *","		     * @method setCurrentDate","		     * @param {Date} date","		     */","			setCurrentDate: function(date) {","				var instance = this;","","				if (isDate(date)) {","					// update the current values to the last selected date","					instance.set(CURRENT_DAY, date.getDate());","					instance.set(CURRENT_MONTH, date.getMonth());","					instance.set(CURRENT_YEAR, date.getFullYear());","				}","			},","","			/**","			 * Sync the Calendar UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance._syncStdContent();","			},","","			/**","			 * Bind DOM events to the UI.","			 *","			 * @method _bindDelegate","			 * @private","			 */","			_bindDelegate: function() {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","				var headerContentNode = instance.headerContentNode;","","				headerContentNode.delegate('click', instance.selectNextMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_R, instance);","				headerContentNode.delegate('click', instance.selectPrevMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_L, instance);","","				boundingBox.delegate('click', instance._preventDefaultFn, ANCHOR);","				boundingBox.delegate('click', A.bind(instance.selectToday, instance), DOT+CSS_CALENDAR_LINK_TODAY);","				boundingBox.delegate('click', A.bind(instance.clear, instance), DOT+CSS_CALENDAR_LINK_NONE);","				boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);","				boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);","				boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);","","				instance.after('datesChange', instance._handleSelectEvent);","			},","","			_bindDataAttrs: function(node, date) {","				node.attr(DATA_YEAR, date.getFullYear());","				node.attr(DATA_MONTH, date.getMonth());","			},","","			_checkNodeRange: function(node, date) {","				var instance = this;","","				node.toggleClass(","					CSS_CALENDAR_DISABLED,","					instance.isOutOfRangeDate(date)","				);","			},","","			/**","			 * Compare two dates.","			 *","			 * @method _compareDates","			 * @param {Date} d1","			 * @param {Date} d2","			 * @protected","			 * @return {boolean}","			 */","			_compareDates: function(d1, d2) {","				return ( d1 && d2 && (d1.getTime() == d2.getTime()) );","			},","","			_conditionalToggle: function(node, show) {","				var instance = this;","","				if (show) {","					node.show();","				}","				else {","					node.hide();","				}","			},","","		    /**","		     * Create the custom events used on the Calendar.","		     *","		     * @method _createEvents","		     * @private","		     */","			_createEvents: function() {","				var instance = this;","","				// create publish function for kweight optimization","				var publish = function(name, fn) {","					instance.publish(name, {","			            defaultFn: fn,","			            queuable: false,","			            emitFacade: true,","			            bubbles: true,","			            prefix: CALENDAR","			        });","				};","","				publish(EV_CALENDAR_SELECT);","			},","","			_getDateValue: function(value, methodName) {","				var instance = this;","","				if (value == -1) {","					value = A.Attribute.INVALID_VALUE;","				}","				else {","					value = toInt(value);","				}","","				return value;","			},","","			/**","			 * Get the day name of the passed weekDay from the locale map.","			 *","			 * @method _getDayName","			 * @param {Number} weekDay","			 * @protected","			 * @return {String}","			 */","			_getDayName: function(weekDay) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.A[weekDay];","			},","","			/**","			 * Get a short day name of the passed weekDay from the locale map.","			 *","			 * @method _getDayNameShort","			 * @param {Number} weekDay","			 * @protected","			 * @return {String}","			 */","			_getDayNameShort: function(weekDay) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.a[weekDay];","			},","","			/**","			 * Get a very short day name of the passed weekDay from the locale map.","			 *","			 * @method _getDayNameMin","			 * @param {Number} weekDay","			 * @protected","			 * @return {String}","			 */","			_getDayNameMin: function(weekDay) {","				var instance = this;","				var name = instance._getDayNameShort(weekDay);","","				return name.slice(0, name.length-1);","			},","","			 /**","			  * Get the locale map containing the respective values for the","		      * <a href=\"Widget.html#config_locale\">locale</a> used.","			  *","			  * <pre><code>A.DataType.Date.Locale['pt-br'] = A.merge(","			  *	A.DataType.Date.Locale['en'], {","			  *		a: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Fri', 'Sat'],","			  *		A: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],","			  *		b: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],","			  *		B: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],","			  *		c: '%a %d %b %Y %T %Z',","			  *		p: ['AM', 'PM'],","			  *		P: ['am', 'pm'],","			  *		r: '%I:%M:%S %p',","			  *		x: '%d/%m/%y',","			  *		X: '%T'","			  *	}","			  *);</code></pre>","			  *","			  * @method _getLocaleMap","			  * @protected","			  * @return {Object}","			  */","			_getLocaleMap: function() {","				var instance = this;","","				return A.DataType.Date.Locale[ instance.get(LOCALE) ];","			},","","			/**","			 * Get a month name of the passed month from the locale map.","			 *","			 * @method _getMonthName","			 * @param {Number} month","			 * @protected","			 * @return {String}","			 */","			_getMonthName: function(month) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.B[month];","			},","","			/**","			 * Get a short month name of the passed month from the locale map.","			 *","			 * @method _getMonthNameShort","			 * @param {Number} month","			 * @protected","			 * @return {String}","			 */","			_getMonthNameShort: function(month) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.b[month];","			},","","			/**","			 * Get the number of days with overlaps the first day of the month and the first day of the first week of the month.","			 *","			 * @method _getMonthOverlapDaysOffset","			 * @protected","			 * @return number","			 */","			_getMonthOverlapDaysOffset: function() {","				var instance = this;","","				return Math.abs(DateMath.getDayOffset(instance.getFirstDayOfWeek(), instance.findMonthStart()));","			},","","			/**","			 * Object data containing all the information needed to the select event.","			 *","			 * @method _getSelectEventData","			 * @protected","			 * @return {}","			 */","			_getSelectEventData: function() {","				var instance = this;","","				return {","					date: {","						detailed: instance.getDetailedSelectedDates(),","						formatted: instance.getFormattedSelectedDates(),","						normal: instance.getSelectedDates()","					}","				};","			},","","		    /**","		     * Fires the calendar:select event.","		     *","		     * @method _handleSelectEvent","		     * @param {EventFacade} event calendar:select event facade","		     * @protected","		     */","			_handleSelectEvent: function(event) {","				var instance = this;","","				instance.fire(EV_CALENDAR_SELECT, instance._getSelectEventData());","			},","","			/**","			 * Returns an Object with the current day, month and year.","			 *","			 * @method _normalizeYearMonth","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @param {Number} day","			 * @protected","			 * @return {Object}","			 */","			_normalizeYearMonth: function(year, month, day) {","				var instance = this;","","				if (!isValue(day)) {","					day = instance.get(CURRENT_DAY);","				}","","				if (!isValue(month)) {","					month = instance.get(CURRENT_MONTH);","				}","","				if (!isValue(year)) {","					year = instance.get(CURRENT_YEAR);","				}","","				return { year: year, month: month, day: day };","			},","","		    /**","		     * Fires on click days elements.","		     *","		     * @method _onClickDays","		     * @param {EventFacade} event","		     * @protected","		     */","			_onClickDays: function(event) {","				var instance = this;","				var target  = event.currentTarget || event.target;","				var disabled = target.test(DOT+CSS_CALENDAR_DISABLED);","","				if (!disabled) {","					var day = target.attr(DATA_DAY) || target.text();","					var month = target.attr(DATA_MONTH);","					var year = target.attr(DATA_YEAR);","","					if (year) {","						instance.set(CURRENT_YEAR, year);","					}","					if (month) {","						instance.set(CURRENT_MONTH, month);","					}","					if (day) {","						instance.set(CURRENT_DAY, day);","					}","","					var currentDate = instance.getCurrentDate();","","					if (instance.isAlreadySelected(currentDate)) {","						instance.removeDate(currentDate);","					}","					else {","						instance.selectCurrentDate();","					}","				}","			},","","		    /**","		     * Fires on mouseenter days elements.","		     *","		     * @method _onMouseEnterDays","		     * @param {EventFacade} event","		     * @protected","		     */","			_onMouseEnterDays: function(event) {","				var instance = this;","				var target  = event.currentTarget || event.target;","","				target.replaceClass(CSS_STATE_DEFAULT, CSS_STATE_HOVER);","			},","","		    /**","		     * Fires on mouseleave days elements.","		     *","		     * @method _onMouseLeaveDays","		     * @param {EventFacade} event","		     * @protected","		     */","			_onMouseLeaveDays: function(event) {","				var instance = this;","				var target  = event.currentTarget || event.target;","","				target.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);","			},","","			_preventDefaultFn: function(event) {","				event.preventDefault();","			},","","			/**","			 * Render Calendar DOM blank days elements. Blank days are used to align","		     * with the week day column.","			 *","			 * @method _renderBlankDays","			 * @protected","			 */","			_renderBlankDays: function() {","				var instance = this;","","				instance.blankDays.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar icon controls elements.","			 *","			 * @method _renderIconControls","			 * @protected","			 */","			_renderIconControls: function() {","				var instance = this;","","				instance.headerContentNode.append(","					instance.iconNextNode","				);","","				instance.headerContentNode.append(","					instance.iconPrevNode","				);","			},","","			/**","			 * Render Calendar DOM month days elements.","			 *","			 * @method _renderMonthDays","			 * @protected","			 */","			_renderMonthDays: function() {","				var instance = this;","","				instance.monthDays.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.","			 *","			 * @method _renderPaddingDaysEnd","			 * @protected","			 */","			_renderPaddingDaysEnd: function() {","				var instance = this;","","				instance.paddingDaysEnd.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.","			 *","			 * @method _renderPaddingDaysStart","			 * @protected","			 */","			_renderPaddingDaysStart: function() {","				var instance = this;","","				instance.paddingDaysStart.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar title node element.","			 *","			 * @method _renderTitleNode","			 * @protected","			 */","			_renderTitleNode: function() {","				var instance = this;","","				instance.headerContentNode.append(","					instance.headerTitleNode","				);","			},","","			/**","			 * Render Calendar DOM week days elements.","			 *","			 * @method _renderWeekDays","			 * @protected","			 */","			_renderWeekDays: function() {","				var instance = this;","","				instance.weekDays.appendTo(","					instance.weekDaysNode","				);","			},","","			_repeateTemplate: function(template, times) {","				var instance = this;","				var buffer = [];","","				while (times--) {","					buffer.push(template);","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">dates</a> attribute.","			 *","			 * @method _setDates","			 * @param {Array} value","			 * @protected","			 * @return {Array}","			 */","			_setDates: function(value) {","				var instance = this;","","				A.Array.each(value, function(date, index) {","					if (isString(date)) {","						value[index] = A.DataType.Date.parse( date );","					}","				});","","				// Set current date to be the last passed date","				instance.setCurrentDate(","					value[value.length - 1]","				);","","				return value;","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">currentDay</a> attribute.","			 *","			 * @method _setDay","			 * @param int value","			 * @protected","			 * @return number","			 */","			_setDay: function(value) {","				var instance = this;","","				return instance._getDateValue(value, 'getDate');","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_maxDates\">maxDates</a> or","		     * <a href=\"Calendar.html#config_mainDates\">minDates</a> attributes.","			 *","			 * @method _setMinMaxDate","			 * @param {Date} value","			 * @protected","			 * @return {Date}","			 */","			_setMinMaxDate: function(value) {","				var instance = this;","","				if (isString(value)) {","					value = A.DataType.Date.parse( value );","				}","","				return value;","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">currentMonth</a> attribute.","			 *","			 * @method _setMonth","			 * @param int value","			 * @protected","			 * @return number","			 */","			_setMonth: function(value) {","				var instance = this;","","				return instance._getDateValue(value, 'getMonth');","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">currentYear</a> attribute.","			 *","			 * @method _setYear","			 * @param int value","			 * @protected","			 * @return number","			 */","			_setYear: function(value) {","				var instance = this;","","				return instance._getDateValue(value, 'getFullYear');","			},","","			/**","			 * Sync Calendar header UI.","			 *","			 * @method _syncHeader","			 * @protected","			 */","			_syncHeader: function() {","				var instance = this;","				var currentMonth = instance.get(CURRENT_MONTH);","				var currentYear = instance.get(CURRENT_YEAR);","","				var title = [ instance._getMonthName(currentMonth), currentYear ].join(SPACE);","","				instance.headerTitleNode.html(title);","			},","","			/**","			 * Sync Calendar month days UI.","			 *","			 * @method _syncMonthDays","			 * @protected","			 */","			_syncMonthDays: function() {","				var instance = this;","				var daysInMonth = instance.getDaysInMonth();","				var rangeDate = instance.getCurrentDate();","","				// Sync month days","				instance.monthDays.each(","					function(node, index) {","						node.toggleClass(CSS_HELPER_HIDDEN, (index >= daysInMonth));","","						rangeDate.setDate(index + 1);","						instance._checkNodeRange(node, rangeDate);","					}","				);","			},","","			/**","			 * Sync Calendar padding end days UI.","			 *","			 * @method _syncPaddingEnd","			 * @protected","			 */","			_syncPaddingEnd: function() {","				var instance = this;","","				// Sync padding end nodes","				if (instance.get(SHOW_OTHER_MONTH)) {","					var nextMonthDate = instance.getCurrentDate(0, +1);","					var totalVisiblePaddingEnd = (INT_MATRIX_DAYS_LENGTH - (instance._getMonthOverlapDaysOffset() + instance.getDaysInMonth()));","","","					// Sync blank or padding start nodes","					instance.paddingDaysEnd.each(","						function(node, index) {","							node.toggleClass(CSS_HELPER_HIDDEN, (index >= totalVisiblePaddingEnd));","","							nextMonthDate.setDate(index + 1);","							instance._bindDataAttrs(node, nextMonthDate);","							instance._checkNodeRange(node, nextMonthDate);","						}","					);","				}","			},","","			/**","			 * Sync Calendar padding start days UI.","			 *","			 * @method _syncPaddingStart","			 * @protected","			 */","			_syncPaddingStart: function() {","				var instance = this;","				var showOtherMonth = instance.get(SHOW_OTHER_MONTH);","				var prevMonthDate = instance.getCurrentDate(0, -1);","				var totalPrevMonthDays = instance.getDaysInMonth(null, prevMonthDate.getMonth());","				var paddingNodes = (showOtherMonth ? instance.paddingDaysStart : instance.blankDays);","				var totalPadding = paddingNodes.size();","				var totalVisible = instance._getMonthOverlapDaysOffset();","","				// Sync blank or padding start nodes","				paddingNodes.each(","					function(node, index) {","						var totalHidden = (totalPadding - totalVisible);","","						node.toggleClass(CSS_HELPER_HIDDEN, (index < totalHidden));","","						if (showOtherMonth) {","							var dayNumber = (totalPrevMonthDays - totalPadding) + (index + 1);","","							node.html(dayNumber);","							prevMonthDate.setDate(dayNumber);","							instance._bindDataAttrs(node, prevMonthDate);","							instance._checkNodeRange(node, prevMonthDate);","						}","					}","				);","			},","","			/**","			 * Sync Calendar selected days UI.","			 *","			 * @method _syncSelectedDays","			 * @protected","			 */","			_syncSelectedDays: function(dates) {","				var instance = this;","				var currentMonth = instance.get(CURRENT_MONTH);","				var currentYear = instance.get(CURRENT_YEAR);","","				instance.monthDays.replaceClass(CSS_STATE_ACTIVE, CSS_STATE_DEFAULT);","				instance.monthDays.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);","","				instance.eachSelectedDate(","					function(date, index) {","						var canSelectDays = (currentMonth == date.getMonth()) && (currentYear == date.getFullYear());","","						if (canSelectDays) {","							var dayNode = instance.monthDays.item( date.getDate() - 1 );","","							dayNode.addClass(CSS_STATE_ACTIVE);","","							try {","								// focus the last selected date","								// IE doesn't support focus on hidden elements","								dayNode.focus();","							}","							catch (err) {}","						}","					},","					dates","				);","			},","","			/**","			 * Sync Calendar StdContent.","			 *","			 * @method _syncStdContent","			 * @protected","			 */","			_syncStdContent: function() {","				var instance = this;","				var bodyContent = A.Node.create('<div></div>');","				var footContent = A.Node.create('<div class=\"' + CSS_HELPER_CLEARFIX + '\"></div>');","","				bodyContent.append(instance.weekDaysNode);","				bodyContent.append(instance.monthDaysNode);","","				footContent.append(instance.todayLinkNode);","				footContent.append(instance.noneLinkNode);","","				instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode.getDOM());","				instance.setStdModContent(WidgetStdMod.BODY, bodyContent);","				instance.setStdModContent(WidgetStdMod.FOOTER, footContent);","			},","","			/**","			 * Sync Calendar header, days and selected days UI.","			 *","			 * @method _syncView","			 * @protected","			 */","			_syncView: function() {","				var instance = this;","","				instance._syncMonthDays();","				instance._syncHeader();","				instance._syncSelectedDays();","","				instance._uiSetShowOtherMonth(","					instance.get(SHOW_OTHER_MONTH)","				);","			},","","			/**","			 * Sync the UI of the Calendar when showToday attribute change.","			 *","			 * @method _uiSetShowToday","			 * @protected","			 */","			_uiSetAllowNone: function(val) {","				var instance = this;","","				instance._conditionalToggle(instance.noneLinkNode, val);","			},","","			/**","			 * Sync the UI of the Calendar when dates attribute change.","			 *","			 * @method _uiSetDates","			 * @protected","			 */","			_uiSetDates: function(val) {","				var instance = this;","","				instance._syncView();","			},","","			/**","			 * Sync the UI of the Calendar when showOtherMonth attribute change.","			 *","			 * @method _uiSetShowOtherMonth","			 * @protected","			 */","			_uiSetShowOtherMonth: function(val) {","				var instance = this;","","				if (val) {","					instance.blankDays.hide();","				}","				else {","					instance.paddingDaysEnd.hide();","					instance.paddingDaysStart.hide();","				}","","				instance._syncPaddingEnd();","				instance._syncPaddingStart();","			},","","			/**","			 * Sync the UI of the Calendar when showToday attribute change.","			 *","			 * @method _uiSetShowToday","			 * @protected","			 */","			_uiSetShowToday: function(val) {","				var instance = this;","","				instance._conditionalToggle(instance.todayLinkNode, val);","			},","","			/**","			 * Default value for blankDays attribute, passed as valueFn.","			 *","			 * @method _valueBlankDays","			 * @protected","			 */","			_valueBlankDays: function() {","				return this._repeateTemplate(TPL_CALENDAR_DAY_BLANK, DateMath.WEEK_LENGTH);","			},","","			/**","			 * Default value for monthDays attribute, passed as valueFn.","			 *","			 * @method _valueMonthDays","			 * @protected","			 */","			_valueMonthDays: function() {","				var instance = this;","","				var day = 0;","				var buffer = [];","","				while (day++ < DateMath.MAX_MONTH_LENGTH) {","					TPL_BUFFER_MONTH_DAYS[1] = day;","","					buffer.push(TPL_BUFFER_MONTH_DAYS.join(EMPTY_STR));","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			},","","			/**","			 * Default value for paddingDaysEnd attribute, passed as valueFn.","			 *","			 * @method _valuePaddingDaysEnd","			 * @protected","			 */","			_valuePaddingDaysEnd: function() {","				var instance = this;","				var buffer = [];","				var day = 0;","","				while (day++ <= INT_MAX_PADDING_END) {","					TPL_CALENDAR_DAY_PADDING_END[1] = day;","","					buffer.push(TPL_CALENDAR_DAY_PADDING_END.join(EMPTY_STR));","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			},","","			/**","			 * Default value for paddingDaysStart attribute, passed as valueFn.","			 *","			 * @method _valuePaddingDaysStart","			 * @protected","			 */","			_valuePaddingDaysStart: function() {","				return this._repeateTemplate(TPL_CALENDAR_DAY_PADDING_START, DateMath.WEEK_LENGTH);","			},","","			/**","			 * Default value for weekDays attribute, passed as valueFn.","			 *","			 * @method _valueWeekDays","			 * @protected","			 */","			_valueWeekDays: function() {","				var instance = this;","				var day = 0;","				var buffer = [];","				var firstWeekDay = instance.get(FIRST_DAY_OF_WEEK);","","				while(day < DateMath.WEEK_LENGTH) {","					var fixedDay = (day++ + firstWeekDay) % DateMath.WEEK_LENGTH;","","					TPL_BUFFER_WEEKDAYS[1] = instance._getDayNameMin(fixedDay);","","					buffer.push(TPL_BUFFER_WEEKDAYS.join(EMPTY_STR));","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			}","		}","	}",");","","Calendar.EMPTY_DATES = EMPTY_DATES;","","A.Calendar = A.Base.create(CALENDAR, Calendar, [A.WidgetStdMod]);","","}, '@VERSION@' ,{requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale'], skinnable:true});"];
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].lines = {"1":0,"12":0,"181":0,"314":0,"329":0,"344":0,"359":0,"413":0,"428":0,"520":0,"548":0,"563":0,"565":0,"569":0,"571":0,"575":0,"577":0,"581":0,"583":0,"587":0,"589":0,"621":0,"623":0,"633":0,"634":0,"636":0,"645":0,"647":0,"660":0,"662":0,"674":0,"675":0,"677":0,"690":0,"691":0,"693":0,"703":0,"704":0,"706":0,"718":0,"719":0,"721":0,"736":0,"737":0,"739":0,"740":0,"747":0,"759":0,"760":0,"762":0,"773":0,"774":0,"776":0,"777":0,"780":0,"790":0,"792":0,"803":0,"804":0,"806":0,"807":0,"808":0,"812":0,"824":0,"825":0,"826":0,"828":0,"832":0,"835":0,"846":0,"847":0,"850":0,"851":0,"853":0,"864":0,"865":0,"867":0,"869":0,"870":0,"875":0,"886":0,"889":0,"890":0,"891":0,"892":0,"893":0,"894":0,"895":0,"896":0,"897":0,"898":0,"899":0,"900":0,"901":0,"903":0,"904":0,"905":0,"906":0,"907":0,"908":0,"909":0,"920":0,"921":0,"923":0,"924":0,"927":0,"928":0,"931":0,"932":0,"943":0,"945":0,"955":0,"957":0,"966":0,"968":0,"978":0,"980":0,"982":0,"983":0,"984":0,"995":0,"997":0,"1007":0,"1008":0,"1009":0,"1011":0,"1012":0,"1014":0,"1015":0,"1016":0,"1017":0,"1018":0,"1019":0,"1021":0,"1025":0,"1026":0,"1030":0,"1032":0,"1048":0,"1052":0,"1054":0,"1055":0,"1058":0,"1069":0,"1072":0,"1073":0,"1082":0,"1086":0,"1088":0,"1089":0,"1092":0,"1095":0,"1107":0,"1108":0,"1110":0,"1122":0,"1123":0,"1125":0,"1137":0,"1138":0,"1140":0,"1167":0,"1169":0,"1181":0,"1182":0,"1184":0,"1196":0,"1197":0,"1199":0,"1210":0,"1212":0,"1223":0,"1225":0,"1242":0,"1244":0,"1258":0,"1260":0,"1261":0,"1264":0,"1265":0,"1268":0,"1269":0,"1272":0,"1283":0,"1284":0,"1285":0,"1287":0,"1288":0,"1289":0,"1290":0,"1292":0,"1293":0,"1295":0,"1296":0,"1298":0,"1299":0,"1302":0,"1304":0,"1305":0,"1308":0,"1321":0,"1322":0,"1324":0,"1335":0,"1336":0,"1338":0,"1342":0,"1353":0,"1355":0,"1367":0,"1369":0,"1373":0,"1385":0,"1387":0,"1399":0,"1401":0,"1413":0,"1415":0,"1427":0,"1429":0,"1441":0,"1443":0,"1449":0,"1450":0,"1452":0,"1453":0,"1456":0,"1468":0,"1470":0,"1471":0,"1472":0,"1477":0,"1481":0,"1493":0,"1495":0,"1508":0,"1510":0,"1511":0,"1514":0,"1526":0,"1528":0,"1540":0,"1542":0,"1552":0,"1553":0,"1554":0,"1556":0,"1558":0,"1568":0,"1569":0,"1570":0,"1573":0,"1575":0,"1577":0,"1578":0,"1590":0,"1593":0,"1594":0,"1595":0,"1599":0,"1601":0,"1603":0,"1604":0,"1605":0,"1618":0,"1619":0,"1620":0,"1621":0,"1622":0,"1623":0,"1624":0,"1627":0,"1629":0,"1631":0,"1633":0,"1634":0,"1636":0,"1637":0,"1638":0,"1639":0,"1652":0,"1653":0,"1654":0,"1656":0,"1657":0,"1659":0,"1661":0,"1663":0,"1664":0,"1666":0,"1668":0,"1671":0,"1687":0,"1688":0,"1689":0,"1691":0,"1692":0,"1694":0,"1695":0,"1697":0,"1698":0,"1699":0,"1709":0,"1711":0,"1712":0,"1713":0,"1715":0,"1727":0,"1729":0,"1739":0,"1741":0,"1751":0,"1753":0,"1754":0,"1757":0,"1758":0,"1761":0,"1762":0,"1772":0,"1774":0,"1784":0,"1794":0,"1796":0,"1797":0,"1799":0,"1800":0,"1802":0,"1805":0,"1815":0,"1816":0,"1817":0,"1819":0,"1820":0,"1822":0,"1825":0,"1835":0,"1845":0,"1846":0,"1847":0,"1848":0,"1850":0,"1851":0,"1853":0,"1855":0,"1858":0,"1864":0,"1866":0};
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].functions = {"valueFn:313":0,"valueFn:328":0,"valueFn:343":0,"valueFn:358":0,"valueFn:412":0,"valueFn:427":0,"valueFn:519":0,"valueFn:547":0,"blankDays:562":0,"monthDays:568":0,"paddingDaysEnd:574":0,"paddingDaysStart:580":0,"weekDays:586":0,"initializer:620":0,"bindUI:632":0,"clear:644":0,"eachSelectedDate:659":0,"findMonthStart:673":0,"formatDate:689":0,"getCurrentDate:702":0,"getDaysInMonth:717":0,"(anonymous 2):739":0,"getDetailedSelectedDates:735":0,"getFirstDayOfWeek:758":0,"(anonymous 3):776":0,"getFormattedSelectedDates:772":0,"getSelectedDates:789":0,"(anonymous 4):806":0,"isAlreadySelected:802":0,"isOutOfRangeDate:823":0,"navigateMonth:845":0,"(anonymous 5):868":0,"removeDate:863":0,"renderUI:885":0,"selectCurrentDate:919":0,"selectNextMonth:942":0,"selectPrevMonth:954":0,"selectToday:965":0,"setCurrentDate:977":0,"syncUI:994":0,"_bindDelegate:1006":0,"_bindDataAttrs:1024":0,"_checkNodeRange:1029":0,"_compareDates:1047":0,"_conditionalToggle:1051":0,"publish:1072":0,"_createEvents:1068":0,"_getDateValue:1085":0,"_getDayName:1106":0,"_getDayNameShort:1121":0,"_getDayNameMin:1136":0,"_getLocaleMap:1166":0,"_getMonthName:1180":0,"_getMonthNameShort:1195":0,"_getMonthOverlapDaysOffset:1209":0,"_getSelectEventData:1222":0,"_handleSelectEvent:1241":0,"_normalizeYearMonth:1257":0,"_onClickDays:1282":0,"_onMouseEnterDays:1320":0,"_onMouseLeaveDays:1334":0,"_preventDefaultFn:1341":0,"_renderBlankDays:1352":0,"_renderIconControls:1366":0,"_renderMonthDays:1384":0,"_renderPaddingDaysEnd:1398":0,"_renderPaddingDaysStart:1412":0,"_renderTitleNode:1426":0,"_renderWeekDays:1440":0,"_repeateTemplate:1448":0,"(anonymous 6):1470":0,"_setDates:1467":0,"_setDay:1492":0,"_setMinMaxDate:1507":0,"_setMonth:1525":0,"_setYear:1539":0,"_syncHeader:1551":0,"(anonymous 7):1574":0,"_syncMonthDays:1567":0,"(anonymous 8):1600":0,"_syncPaddingEnd:1589":0,"(anonymous 9):1628":0,"_syncPaddingStart:1617":0,"(anonymous 10):1660":0,"_syncSelectedDays:1651":0,"_syncStdContent:1686":0,"_syncView:1708":0,"_uiSetAllowNone:1726":0,"_uiSetDates:1738":0,"_uiSetShowOtherMonth:1750":0,"_uiSetShowToday:1771":0,"_valueBlankDays:1783":0,"_valueMonthDays:1793":0,"_valuePaddingDaysEnd:1814":0,"_valuePaddingDaysStart:1834":0,"_valueWeekDays:1844":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].coveredLines = 347;
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].coveredFunctions = 97;
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1);
AUI.add('aui-calendar', function(A) {
/**
 * The Calendar component is a UI control that enables users to choose one or
 * more dates from a graphical calendar presented in a single month or multi
 * month interface. Calendars are generated entirely via script and can be
 * navigated without any page refreshes.
 *
 * @module aui-calendar
 * @submodule aui-calendar-base
 */

_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 12);
var L = A.Lang,
	isDate = L.isDate,
	isString = L.isString,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isValue = L.isValue,
	isNumber = L.isNumber,

	toInt = L.toInt,

	DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	EMPTY_STR = '',
	SPACE = ' ',

	ACTIVE = 'active',
	ALLOW_NONE = 'allowNone',
	ANCHOR = 'a',
	BLANK = 'blank',
	BLANK_DAYS = 'blankDays',
	BOUNDING_BOX = 'boundingBox',
	CALENDAR = 'calendar',
	CHILDREN = 'children',
	CIRCLE = 'circle',
	CLEARFIX = 'clearfix',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_YEAR = 'currentYear',
	DATA_DAY = 'data-day',
	DATA_MONTH = 'data-month',
	DATA_YEAR = 'data-year',
	DATES = 'dates',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	DEFAULT = 'default',
	DISABLED = 'disabled',
	DOT = '.',
	END = 'end',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	HEADER = 'hd',
	HEADER_CONTENT_NODE = 'headerContentNode',
	HEADER_TITLE_NODE = 'headerTitleNode',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HOVER = 'hover',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
	ICON_PREV_NODE = 'iconPrevNode',
	LINK = 'link',
	LOCALE = 'locale',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
	MONTH = 'month',
	MONTHDAYS = 'monthdays',
	MONTH_DAYS = 'monthDays',
	MONTH_DAYS_NODE = 'monthDaysNode',
	NEXT = 'next',
	NONE = 'none',
	NONE_LINK_NODE = 'noneLinkNode',
	PADDING = 'padding',
	PADDING_DAYS_END = 'paddingDaysEnd',
	PADDING_DAYS_START = 'paddingDaysStart',
	PREV = 'prev',
	SELECT_MULTIPLE_DATES = 'selectMultipleDates',
	SHOW_OTHER_MONTH = 'showOtherMonth',
	SHOW_TODAY = 'showToday',
	START = 'start',
	STATE = 'state',
	TITLE = 'title',
	TODAY = 'today',
	TODAY_LINK_NODE = 'todayLinkNode',
	TRIANGLE = 'triangle',
	WEEK = 'week',
	WEEKDAYS = 'weekdays',
	WEEK_DAYS = 'weekDays',
	WEEK_DAYS_NODE = 'weekDaysNode',

	EV_CALENDAR_SELECT = 'calendar:select',

	getCN = A.getClassName,

	CSS_CALENDAR_DISABLED = getCN(CALENDAR, DISABLED),
	CSS_CALENDAR_LINK = getCN(CALENDAR, LINK),
	CSS_CALENDAR_LINK_NONE = getCN(CALENDAR, LINK, NONE),
	CSS_CALENDAR_LINK_TODAY = getCN(CALENDAR, LINK, TODAY),
	CSS_DAY = getCN(CALENDAR, DAY),
	CSS_DAY_MONTH = getCN(CALENDAR, DAY, MONTH),
	CSS_DAY_BLANK = getCN(CALENDAR, DAY, BLANK),
	CSS_DAY_PADDING_END = getCN(CALENDAR, DAY, PADDING, END),
	CSS_DAY_PADDING_START = getCN(CALENDAR, DAY, PADDING, START),
	CSS_HEADER = getCN(CALENDAR, HEADER),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
	CSS_ICON = getCN(ICON),
	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, 'l'),
	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, 'r'),
	CSS_MONTHDAYS = getCN(CALENDAR, MONTHDAYS),
	CSS_NEXT = getCN(CALENDAR, NEXT),
	CSS_PREV = getCN(CALENDAR, PREV),
	CSS_STATE_ACTIVE = getCN(STATE, ACTIVE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_STATE_HOVER = getCN(STATE, HOVER),
	CSS_TITLE = getCN(CALENDAR, TITLE),
	CSS_WEEK = getCN(CALENDAR, WEEK),
	CSS_WEEKDAYS = getCN(CALENDAR, WEEKDAYS),

	EMPTY_DATES = [],

	INT_MATRIX_DAYS_LENGTH = 42,
	INT_MAX_PADDING_END = 14,

	TPL_CALENDAR_NONE_LINK = '<a href="#" class="'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_NONE ].join(SPACE)+'">None</a>',

	TPL_CALENDAR_TODAY_LINK = '<a href="#" class="'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_TODAY ].join(SPACE)+'">Today</a>',

	TPL_CALENDAR_HEADER = '<div class="'+[ CSS_HEADER, CSS_STATE_DEFAULT, CSS_HELPER_CLEARFIX ].join(SPACE)+'"></div>',

	TPL_CALENDAR_PREV = '<a href="" class="'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L, CSS_PREV ].join(SPACE)+'">Back</a>',

	TPL_CALENDAR_NEXT = '<a href="" class="'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R, CSS_NEXT ].join(SPACE)+'">Prev</a>',

	TPL_CALENDAR_DAY_BLANK = '<div class="'+[ CSS_DAY_BLANK, CSS_HELPER_HIDDEN ].join(SPACE)+'"></div>',

	TPL_CALENDAR_DAY_PADDING_START = '<div class="'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_START, CSS_HELPER_HIDDEN ].join(SPACE)+'"></div>',

	TPL_CALENDAR_DAY_PADDING_END = ['<div class="'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_END, CSS_HELPER_HIDDEN ].join(SPACE)+'">', 0, '</div>'],

	TPL_CALENDAR_HEADER_TITLE = '<div class="'+CSS_TITLE+'"></div>',

	TPL_CALENDAR_MONTHDAYS = '<div class="'+[ CSS_MONTHDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'"></div>',

	TPL_CALENDAR_WEEKDAYS = '<div class="'+[ CSS_WEEKDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'"></div>',

	TPL_BUFFER_WEEKDAYS = ['<div class="'+CSS_WEEK+'">', 0, '</div>'],

	TPL_BUFFER_MONTH_DAYS = ['<a href="#" class="'+[ CSS_DAY, CSS_DAY_MONTH, CSS_STATE_DEFAULT ].join(SPACE)+'">', 0, '</a>'];

/**
 * <p><img src="assets/images/aui-calendar/main.png"/></p>
 *
 * A base class for Calendar, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Setting Configuration Options</li>
 *    <li>Obtaining Selected Dates</li>
 *    <li>Creating International Calendars</li>
 *    <li>Customizing the Calendar</li>
 * </ul>
 *
 * Quick Example:
 *
 * <pre><code>var instance = new A.Calendar({
 *  trigger: '#input1',
 *  dates: ['09/14/2009', '09/15/2009'],
 *  dateFormat: '%d/%m/%y %A',
 *  setValue: true,
 *  selectMultipleDates: true
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="Calendar.html#configattributes">Configuration Attributes</a> available for
 * Calendar.
 *
 * @class Calendar
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 * @extends OverlayContext
 */
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 181);
var Calendar = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Calendar.NAME
		 * @type String
		 * @static
		 */
		NAME: CALENDAR,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Calendar.
		 *
		 * @property Calendar.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Wheather displays the "none" link on the Calendar footer.
			 *
			 * @attribute allowNone
			 * @default true
			 * @type boolean
			 */
			allowNone: {
				value: true,
				validator: isBoolean
			},

			/**
			 * NodeList containing all the DOM elements for
			 * each blank day. If not specified try to query using HTML_PARSER
			 * an element inside contentBox which matches
			 * <code>aui-calendar-day-blank</code>.
			 *
			 * @attribute blankDays
			 * @default Generated div element.
			 * @type NodeList
			 */
			blankDays: {
				valueFn: '_valueBlankDays'
			},

			/**
			 * Current day number.
			 *
			 * @attribute currentDay
			 * @default Current day
			 * @type Number
			 */
			currentDay: {
				setter: '_setDay',
				value: (new Date()).getDate()
			},

			/**
			 * Current month number.
			 *
			 * @attribute currentMonth
			 * @default Current month
			 * @type Number
			 */
			currentMonth: {
				setter: '_setMonth',
				value: (new Date()).getMonth()
			},

			/**
			 * Current year number.
			 *
			 * @attribute currentYear
			 * @default Current year
			 * @type Number
			 */
			currentYear: {
				setter: '_setYear',
				value: (new Date()).getFullYear()
			},

			/**
			 * The default date format string which can be overriden for
			 * localization support. The format must be valid according to
			 * <a href="DataType.Date.html">A.DataType.Date.format</a>.
			 *
			 * @attribute dateFormat
			 * @default %m/%d/%Y
			 * @type String
			 */
			dateFormat: {
				value: '%m/%d/%Y',
				validator: isString
			},

			/**
			 * Dates which the calendar will show as selected by default.
			 *
			 * @attribute dates
			 * @default Current date
			 * @type Array
			 */
			dates: {
				lazyAdd: false,
				value: [ new Date() ],
				validator: isArray,
				setter: '_setDates'
			},

			/**
			 * First day of the week: Sunday is 0, Monday is 1.
			 *
			 * @attribute firstDayOfWeek
			 * @default 0
			 * @type Number
			 */
			firstDayOfWeek: {
				value: 0,
				validator: isNumber
			},

			/**
			 * DOM node reference to be the header of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-hd</code>.
			 *
			 * @attribute headerContentNode
			 * @default Generated div element.
			 * @type Node
			 */
			headerContentNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 313);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 314);
return A.Node.create(TPL_CALENDAR_HEADER);
				}
			},

			/**
			 * DOM node reference to be the title of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-title</code>.
			 *
			 * @attribute headerTitleNode
			 * @default Generated div element.
			 * @type Node
			 */
			headerTitleNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 328);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 329);
return A.Node.create(TPL_CALENDAR_HEADER_TITLE);
				}
			},

			/**
			 * DOM node reference to be the icon next of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-prev</code>.
			 *
			 * @attribute iconNextNode
			 * @default Generated div element.
			 * @type Node
			 */
			iconNextNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 343);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 344);
return A.Node.create(TPL_CALENDAR_NEXT);
				}
			},

			/**
			 * DOM node reference to be the icon prev of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-prev</code>.
			 *
			 * @attribute iconPrevNode
			 * @default Generated div element.
			 * @type Node
			 */
			iconPrevNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 358);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 359);
return A.Node.create(TPL_CALENDAR_PREV);
				}
			},

			/**
			 * Maximum allowable date. Values supported by the Date
			 * constructor are supported.
			 *
			 * @attribute maxDate
			 * @default null
			 * @type String | Date
			 */
			maxDate: {
				value: null,
				setter: '_setMinMaxDate'
			},

			/**
			 * Minimum allowable date. Values supported by the Date
			 * constructor are supported.
			 *
			 * @attribute minDate
			 * @default null
			 * @type Date | String
			 */
			minDate: {
				value: null,
				setter: '_setMinMaxDate'
			},

			/**
			 * NodeList reference containing the days of the month of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-day</code>.
			 *
			 * @attribute monthDays
			 * @default Generated div element.
			 * @type NodeList
			 */
			monthDays: {
				valueFn: '_valueMonthDays'
			},

			/**
			 * DOM node reference which contains all month days nodes of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-monthdays</code>.
			 *
			 * @attribute monthDaysNode
			 * @default Generated div element.
			 * @type Node
			 */
			monthDaysNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 412);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 413);
return A.Node.create(TPL_CALENDAR_MONTHDAYS);
				}
			},

			/**
			 * DOM node reference to be the "none" link of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-title</code>.
			 *
			 * @attribute noneLinkNode
			 * @default Generated div element.
			 * @type Node
			 */
			noneLinkNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 427);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 428);
return A.Node.create(TPL_CALENDAR_NONE_LINK);
				}
			},

			/**
			 * NodeList containing all the DOM elements for
			 * each blank day. If not specified try to query using HTML_PARSER
			 * an element inside contentBox which matches
			 * <code>aui-calendar-day-blank</code>.
			 *
			 * @attribute paddingDaysEnd
			 * @default Generated div element.
			 * @type NodeList
			 */
			paddingDaysEnd: {
				valueFn: '_valuePaddingDaysEnd'
			},

			/**
			 * NodeList containing all the DOM elements for
			 * each blank day. If not specified try to query using HTML_PARSER
			 * an element inside contentBox which matches
			 * <code>aui-calendar-day-blank</code>.
			 *
			 * @attribute paddingDaysStart
			 * @default Generated div element.
			 * @type NodeList
			 */
			paddingDaysStart: {
				valueFn: '_valuePaddingDaysStart'
			},

			/**
			 * Wether accepts to select multiple dates.
			 *
			 * @attribute selectMultipleDates
			 * @default false
			 * @type boolean
			 */
			selectMultipleDates: {
				value: false
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
			 * Wheather displays the days for the other months.
			 *
			 * @attribute showOtherMonth
			 * @default true
			 * @type boolean
			 */
			showOtherMonth: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Wheather displays the "today" link on the Calendar footer.
			 *
			 * @attribute showToday
			 * @default true
			 * @type boolean
			 */
			showToday: {
				value: true,
				validator: isBoolean
			},

			/**
			 * DOM node reference to be the "today" link of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-title</code>.
			 *
			 * @attribute todayLinkNode
			 * @default Generated div element.
			 * @type Node
			 */
			todayLinkNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 519);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 520);
return A.Node.create(TPL_CALENDAR_TODAY_LINK);
				}
			},

			/**
			 * NodeList reference containing the days of the week of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-week</code>.
			 *
			 * @attribute weekDays
			 * @default Generated div element.
			 * @type NodeList
			 */
			weekDays: {
				valueFn: '_valueWeekDays'
			},

			/**
			 * DOM node reference which contains all week days nodes of the Calendar. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-calendar-weekdays</code>.
			 *
			 * @attribute weekDaysNode
			 * @default Generated div element.
			 * @type Node
			 */
			weekDaysNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "valueFn", 547);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 548);
return A.Node.create(TPL_CALENDAR_WEEKDAYS);
				}
			}
		},

		/**
		 * Object hash, defining how attribute values are to be parsed from
		 * markup contained in the widget's content box.
		 *
		 * @property ProgressBar.HTML_PARSER
		 * @type Object
		 * @static
		 */
		HTML_PARSER: {
			blankDays: function(srcNode) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "blankDays", 562);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 563);
var nodes = srcNode.all(DOT+CSS_DAY_BLANK);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 565);
return nodes.size() ? nodes : null;
			},

			monthDays: function(srcNode) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "monthDays", 568);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 569);
var nodes = srcNode.all(DOT+CSS_DAY_MONTH);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 571);
return nodes.size() ? nodes : null;
			},

			paddingDaysEnd: function(srcNode) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "paddingDaysEnd", 574);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 575);
var nodes = srcNode.all(DOT+CSS_DAY_PADDING_END);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 577);
return nodes.size() ? nodes : null;
			},

			paddingDaysStart: function(srcNode) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "paddingDaysStart", 580);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 581);
var nodes = srcNode.all(DOT+CSS_DAY_PADDING_START);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 583);
return nodes.size() ? nodes : null;
			},

			weekDays: function(srcNode) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "weekDays", 586);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 587);
var nodes = srcNode.all(DOT+CSS_WEEK);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 589);
return nodes.size() ? nodes : null;
			},

			headerTitleNode: DOT+CSS_TITLE,

			headerContentNode: DOT+CSS_HEADER,

			iconNextNode: DOT+CSS_NEXT,

			iconPrevNode: DOT+CSS_PREV,

			monthDaysNode: DOT+CSS_MONTHDAYS,

			noneLinkNode: DOT+CSS_CALENDAR_LINK_NONE,

			todayLinkNode: DOT+CSS_CALENDAR_LINK_TODAY,

			weekDaysNode: DOT+CSS_WEEKDAYS
		},

		UI_ATTRS: [DATES, SHOW_TODAY, ALLOW_NONE],

		BIND_UI_ATTRS: [SHOW_OTHER_MONTH],

		prototype: {
			/**
			 * Construction logic executed during Calendar instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "initializer", 620);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 621);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 623);
instance._createEvents();
			},

			/**
			 * Bind the events on the Calendar UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "bindUI", 632);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 633);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 634);
var boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 636);
boundingBox.once('mousemove', A.bind(instance._bindDelegate, instance));
			},

			/**
			 * Clear all selected dates on the Calendar.
			 *
			 * @method clear
			 */
			clear: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "clear", 644);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 645);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 647);
instance.set(DATES, Calendar.EMPTY_DATES);
			},

			/**
			 * Loop each date from <a href="Calendar.html#config_dates">dates</a> and
		     * executes a callback.
			 *
			 * @method eachSelectedDate
			 * @param {function} fn Callback to be executed for each date.
			 * @param {Dates} dates Optional dates Array to loop through. If not passed it will use
			 * the <a href="Calendar.html#config_dates">dates</a>.
			 */
			eachSelectedDate: function(fn, dates) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "eachSelectedDate", 659);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 660);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 662);
A.Array.each(dates || instance.get(DATES), fn, instance);
			},

			/**
			 * Get the first day of the month of the passed year.
			 *
			 * @method findMonthStart
			 * @param {Number} year Year in the format YYYY.
			 * @param {Number} month 0 for January 11 for December.
			 * @return {Number}
			 */
			findMonthStart: function(year, month) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "findMonthStart", 673);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 674);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 675);
var date = instance._normalizeYearMonth(year, month);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 677);
return DateMath.findMonthStart(DateMath.getDate(date.year, date.month));
			},

			/**
			 * Format a date with the passed mask. Used on
		     * <a href="Calendar.html#config_dateFormat">dateFormat</a>.
			 *
			 * @method formatDate
			 * @param {Date} date
			 * @param {String} mask See <a href="Calendar.html#config_dateFormat">dateFormat</a>.
			 * @return {String}
			 */
			formatDate: function (date, mask) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "formatDate", 689);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 690);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 691);
var locale = instance.get(LOCALE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 693);
return A.DataType.Date.format(date, { format: mask, locale: locale });
			},

			/**
			 * Get current date.
			 *
			 * @method getCurrentDate
			 * @return {Date}
			 */
			getCurrentDate: function(offsetYear, offsetMonth, offsetDay) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getCurrentDate", 702);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 703);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 704);
var date = instance._normalizeYearMonth();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 706);
return DateMath.getDate(date.year + toInt(offsetYear), date.month + toInt(offsetMonth), date.day + toInt(offsetDay));
			},

			/**
			 * Get the number of days in the passed year and month.
			 *
			 * @method getDaysInMonth
			 * @param {Number} year Year in the format YYYY.
			 * @param {Number} month 0 for January 11 for December.
			 * @return {Number}
			 */
			getDaysInMonth: function(year, month) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getDaysInMonth", 717);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 718);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 719);
var date = instance._normalizeYearMonth(year, month);

		        _yuitest_coverline("/build/aui-calendar/aui-calendar.js", 721);
return DateMath.getDaysInMonth(date.year, date.month);
		    },

			/**
			 * Get an Array with selected dates with detailed information (day, month, year).
			 *<pre><code>[{
			 *    year: date.getFullYear(),
			 *    month: date.getMonth(),
			 *    day: date.getDate()
			 * }]</code></pre>
			 *
			 * @method getDetailedSelectedDates
			 * @return {Array}
			 */
			getDetailedSelectedDates: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getDetailedSelectedDates", 735);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 736);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 737);
var dates = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 739);
instance.eachSelectedDate(function(date) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 2)", 739);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 740);
dates.push({
						year: date.getFullYear(),
						month: date.getMonth(),
						day: date.getDate()
					});
				});

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 747);
return dates;
			},

			/**
			 * Get the first day of week of the passed year and month.
			 *
			 * @method getFirstDayOfWeek
			 * @param {Number} year Year in the format YYYY.
			 * @param {Number} month 0 for January 11 for December.
			 * @return {Number}
			 */
			getFirstDayOfWeek: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getFirstDayOfWeek", 758);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 759);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 760);
var firstDayOfWeek = instance.get(FIRST_DAY_OF_WEEK);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 762);
return DateMath.getFirstDayOfWeek(instance.findMonthStart(), firstDayOfWeek);
			},

			/**
			 * Get the selected dates formatted by the
		     * <a href="Calendar.html#config_dateFormat">dateFormat</a>.
			 *
			 * @method getFormattedSelectedDates
			 * @return {Array}
			 */
			getFormattedSelectedDates: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getFormattedSelectedDates", 772);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 773);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 774);
var dates = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 776);
instance.eachSelectedDate(function(date) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 3)", 776);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 777);
dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );
				});

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 780);
return dates;
			},

			/**
			 * Get the selected dates.
			 *
			 * @method getSelectedDates
			 * @return {Array}
			 */
			getSelectedDates: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getSelectedDates", 789);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 790);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 792);
return instance.get(DATES);
			},

			/**
			 * Check if a date is already selected.
			 *
			 * @method isAlreadySelected
			 * @param {Date} date Date to be checked.
			 * @return {boolean}
			 */
			isAlreadySelected: function(date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "isAlreadySelected", 802);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 803);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 804);
var isAlreadySelected = false;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 806);
instance.eachSelectedDate(function(d, index) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 4)", 806);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 807);
if (instance._compareDates(d, date)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 808);
isAlreadySelected = true;
					}
				});

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 812);
return isAlreadySelected;
			},

			/**
			 * Check if the passed date is out of range. Compared with the
		     * <a href="Calendar.html#config_minDate">minDate</a> and
		     * <a href="Calendar.html#config_maxDate">maxDate</a>.
			 *
			 * @method isOutOfRangeDate
			 * @param {Date} date Date to be checked.
			 */
			isOutOfRangeDate: function(date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "isOutOfRangeDate", 823);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 824);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 825);
var maxDate = instance.get(MAX_DATE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 826);
var minDate = instance.get(MIN_DATE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 828);
if ((!minDate && !maxDate) ||
					instance._compareDates(date, minDate) ||
					instance._compareDates(date, maxDate)) {

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 832);
return false;
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 835);
return !DateMath.between(date, minDate, maxDate);
			},

			/**
			 * Navigate through months and re-sync the UI.
			 *
			 * @method navigateMonth
			 * @param {Number} offset Offset of the number of months to navigate.
		     * Could be a positive or a negative offset.
			 */
			navigateMonth: function(offset) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "navigateMonth", 845);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 846);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 847);
var date = instance.getCurrentDate(0, offset);

				// when navigate by month update the year also
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 850);
instance.set(CURRENT_MONTH, date.getMonth());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 851);
instance.set(CURRENT_YEAR, date.getFullYear());

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 853);
instance._syncView();
			},

			/**
			 * Remove the passed date from
		     * <a href="Calendar.html#config_dates">dates</a>.
			 *
			 * @method removeDate
			 * @param {Date} date Date to remove
			 */
			removeDate: function(date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "removeDate", 863);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 864);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 865);
var dates = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 867);
instance.eachSelectedDate(
					function(d, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 5)", 868);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 869);
if (!instance._compareDates(d, date)) {
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 870);
dates.push(d);
						}
					}
				);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 875);
instance.set(DATES, dates);
			},


			/**
			 * Create the DOM structure for the Calendar. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "renderUI", 885);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 886);
var instance = this;

				// creating properties references for performance
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 889);
instance.blankDays = instance.get(BLANK_DAYS);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 890);
instance.headerContentNode = instance.get(HEADER_CONTENT_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 891);
instance.headerTitleNode = instance.get(HEADER_TITLE_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 892);
instance.iconNextNode = instance.get(ICON_NEXT_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 893);
instance.iconPrevNode = instance.get(ICON_PREV_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 894);
instance.monthDays = instance.get(MONTH_DAYS);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 895);
instance.monthDaysNode = instance.get(MONTH_DAYS_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 896);
instance.noneLinkNode = instance.get(NONE_LINK_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 897);
instance.paddingDaysEnd = instance.get(PADDING_DAYS_END);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 898);
instance.paddingDaysStart = instance.get(PADDING_DAYS_START);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 899);
instance.todayLinkNode = instance.get(TODAY_LINK_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 900);
instance.weekDays = instance.get(WEEK_DAYS);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 901);
instance.weekDaysNode = instance.get(WEEK_DAYS_NODE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 903);
instance._renderWeekDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 904);
instance._renderBlankDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 905);
instance._renderPaddingDaysStart();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 906);
instance._renderMonthDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 907);
instance._renderPaddingDaysEnd();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 908);
instance._renderIconControls();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 909);
instance._renderTitleNode();
			},

			/**
			 * Select the current date returned by
		     * <a href="Calendar.html#method_getCurrentDate">getCurrentDate</a>.
			 *
			 * @method selectCurrentDate
			 * @protected
			 */
			selectCurrentDate: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectCurrentDate", 919);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 920);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 921);
var currentDate = instance.getCurrentDate();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 923);
if (!instance.isAlreadySelected(currentDate)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 924);
var dates = instance.get(DATES);

					// if is single selection reset the selected dates
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 927);
if (!instance.get(SELECT_MULTIPLE_DATES)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 928);
dates = [];
					}

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 931);
dates.push(currentDate);
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 932);
instance.set(DATES, dates);
				}
			},

			/**
			 * Navigate to the next month. Fired from the next icon on the Calendar
		     * header.
			 *
			 * @method selectNextMonth
			 */
			selectNextMonth: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectNextMonth", 942);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 943);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 945);
instance.navigateMonth(+1);
			},

			/**
			 * Navigate to the previous month. Fired from the previous icon on the
			 * Calendar header.
			 *
			 * @method selectPrevMonth
			 */
			selectPrevMonth: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectPrevMonth", 954);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 955);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 957);
instance.navigateMonth(-1);
			},

			/**
			 * Select today date on the Calendar.
			 *
			 * @method selectToday
			 */
			selectToday: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectToday", 965);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 966);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 968);
instance.set(DATES, [ new Date() ]);
			},

		    /**
		     * Update the currentDay, currentMonth and currentYear values.
		     *
		     * @method setCurrentDate
		     * @param {Date} date
		     */
			setCurrentDate: function(date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "setCurrentDate", 977);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 978);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 980);
if (isDate(date)) {
					// update the current values to the last selected date
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 982);
instance.set(CURRENT_DAY, date.getDate());
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 983);
instance.set(CURRENT_MONTH, date.getMonth());
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 984);
instance.set(CURRENT_YEAR, date.getFullYear());
				}
			},

			/**
			 * Sync the Calendar UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "syncUI", 994);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 995);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 997);
instance._syncStdContent();
			},

			/**
			 * Bind DOM events to the UI.
			 *
			 * @method _bindDelegate
			 * @private
			 */
			_bindDelegate: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_bindDelegate", 1006);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1007);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1008);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1009);
var headerContentNode = instance.headerContentNode;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1011);
headerContentNode.delegate('click', instance.selectNextMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_R, instance);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1012);
headerContentNode.delegate('click', instance.selectPrevMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_L, instance);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1014);
boundingBox.delegate('click', instance._preventDefaultFn, ANCHOR);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1015);
boundingBox.delegate('click', A.bind(instance.selectToday, instance), DOT+CSS_CALENDAR_LINK_TODAY);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1016);
boundingBox.delegate('click', A.bind(instance.clear, instance), DOT+CSS_CALENDAR_LINK_NONE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1017);
boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1018);
boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1019);
boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1021);
instance.after('datesChange', instance._handleSelectEvent);
			},

			_bindDataAttrs: function(node, date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_bindDataAttrs", 1024);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1025);
node.attr(DATA_YEAR, date.getFullYear());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1026);
node.attr(DATA_MONTH, date.getMonth());
			},

			_checkNodeRange: function(node, date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_checkNodeRange", 1029);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1030);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1032);
node.toggleClass(
					CSS_CALENDAR_DISABLED,
					instance.isOutOfRangeDate(date)
				);
			},

			/**
			 * Compare two dates.
			 *
			 * @method _compareDates
			 * @param {Date} d1
			 * @param {Date} d2
			 * @protected
			 * @return {boolean}
			 */
			_compareDates: function(d1, d2) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_compareDates", 1047);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1048);
return ( d1 && d2 && (d1.getTime() == d2.getTime()) );
			},

			_conditionalToggle: function(node, show) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_conditionalToggle", 1051);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1052);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1054);
if (show) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1055);
node.show();
				}
				else {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1058);
node.hide();
				}
			},

		    /**
		     * Create the custom events used on the Calendar.
		     *
		     * @method _createEvents
		     * @private
		     */
			_createEvents: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_createEvents", 1068);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1069);
var instance = this;

				// create publish function for kweight optimization
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1072);
var publish = function(name, fn) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "publish", 1072);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1073);
instance.publish(name, {
			            defaultFn: fn,
			            queuable: false,
			            emitFacade: true,
			            bubbles: true,
			            prefix: CALENDAR
			        });
				};

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1082);
publish(EV_CALENDAR_SELECT);
			},

			_getDateValue: function(value, methodName) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDateValue", 1085);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1086);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1088);
if (value == -1) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1089);
value = A.Attribute.INVALID_VALUE;
				}
				else {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1092);
value = toInt(value);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1095);
return value;
			},

			/**
			 * Get the day name of the passed weekDay from the locale map.
			 *
			 * @method _getDayName
			 * @param {Number} weekDay
			 * @protected
			 * @return {String}
			 */
			_getDayName: function(weekDay) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDayName", 1106);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1107);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1108);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1110);
return localeMap.A[weekDay];
			},

			/**
			 * Get a short day name of the passed weekDay from the locale map.
			 *
			 * @method _getDayNameShort
			 * @param {Number} weekDay
			 * @protected
			 * @return {String}
			 */
			_getDayNameShort: function(weekDay) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDayNameShort", 1121);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1122);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1123);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1125);
return localeMap.a[weekDay];
			},

			/**
			 * Get a very short day name of the passed weekDay from the locale map.
			 *
			 * @method _getDayNameMin
			 * @param {Number} weekDay
			 * @protected
			 * @return {String}
			 */
			_getDayNameMin: function(weekDay) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDayNameMin", 1136);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1137);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1138);
var name = instance._getDayNameShort(weekDay);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1140);
return name.slice(0, name.length-1);
			},

			 /**
			  * Get the locale map containing the respective values for the
		      * <a href="Widget.html#config_locale">locale</a> used.
			  *
			  * <pre><code>A.DataType.Date.Locale['pt-br'] = A.merge(
			  *	A.DataType.Date.Locale['en'], {
			  *		a: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Fri', 'Sat'],
			  *		A: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
			  *		b: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],
			  *		B: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
			  *		c: '%a %d %b %Y %T %Z',
			  *		p: ['AM', 'PM'],
			  *		P: ['am', 'pm'],
			  *		r: '%I:%M:%S %p',
			  *		x: '%d/%m/%y',
			  *		X: '%T'
			  *	}
			  *);</code></pre>
			  *
			  * @method _getLocaleMap
			  * @protected
			  * @return {Object}
			  */
			_getLocaleMap: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getLocaleMap", 1166);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1167);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1169);
return A.DataType.Date.Locale[ instance.get(LOCALE) ];
			},

			/**
			 * Get a month name of the passed month from the locale map.
			 *
			 * @method _getMonthName
			 * @param {Number} month
			 * @protected
			 * @return {String}
			 */
			_getMonthName: function(month) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getMonthName", 1180);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1181);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1182);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1184);
return localeMap.B[month];
			},

			/**
			 * Get a short month name of the passed month from the locale map.
			 *
			 * @method _getMonthNameShort
			 * @param {Number} month
			 * @protected
			 * @return {String}
			 */
			_getMonthNameShort: function(month) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getMonthNameShort", 1195);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1196);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1197);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1199);
return localeMap.b[month];
			},

			/**
			 * Get the number of days with overlaps the first day of the month and the first day of the first week of the month.
			 *
			 * @method _getMonthOverlapDaysOffset
			 * @protected
			 * @return number
			 */
			_getMonthOverlapDaysOffset: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getMonthOverlapDaysOffset", 1209);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1210);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1212);
return Math.abs(DateMath.getDayOffset(instance.getFirstDayOfWeek(), instance.findMonthStart()));
			},

			/**
			 * Object data containing all the information needed to the select event.
			 *
			 * @method _getSelectEventData
			 * @protected
			 * @return {}
			 */
			_getSelectEventData: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getSelectEventData", 1222);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1223);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1225);
return {
					date: {
						detailed: instance.getDetailedSelectedDates(),
						formatted: instance.getFormattedSelectedDates(),
						normal: instance.getSelectedDates()
					}
				};
			},

		    /**
		     * Fires the calendar:select event.
		     *
		     * @method _handleSelectEvent
		     * @param {EventFacade} event calendar:select event facade
		     * @protected
		     */
			_handleSelectEvent: function(event) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_handleSelectEvent", 1241);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1242);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1244);
instance.fire(EV_CALENDAR_SELECT, instance._getSelectEventData());
			},

			/**
			 * Returns an Object with the current day, month and year.
			 *
			 * @method _normalizeYearMonth
			 * @param {Number} year Year in the format YYYY.
			 * @param {Number} month 0 for January 11 for December.
			 * @param {Number} day
			 * @protected
			 * @return {Object}
			 */
			_normalizeYearMonth: function(year, month, day) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_normalizeYearMonth", 1257);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1258);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1260);
if (!isValue(day)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1261);
day = instance.get(CURRENT_DAY);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1264);
if (!isValue(month)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1265);
month = instance.get(CURRENT_MONTH);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1268);
if (!isValue(year)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1269);
year = instance.get(CURRENT_YEAR);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1272);
return { year: year, month: month, day: day };
			},

		    /**
		     * Fires on click days elements.
		     *
		     * @method _onClickDays
		     * @param {EventFacade} event
		     * @protected
		     */
			_onClickDays: function(event) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_onClickDays", 1282);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1283);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1284);
var target  = event.currentTarget || event.target;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1285);
var disabled = target.test(DOT+CSS_CALENDAR_DISABLED);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1287);
if (!disabled) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1288);
var day = target.attr(DATA_DAY) || target.text();
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1289);
var month = target.attr(DATA_MONTH);
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1290);
var year = target.attr(DATA_YEAR);

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1292);
if (year) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1293);
instance.set(CURRENT_YEAR, year);
					}
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1295);
if (month) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1296);
instance.set(CURRENT_MONTH, month);
					}
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1298);
if (day) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1299);
instance.set(CURRENT_DAY, day);
					}

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1302);
var currentDate = instance.getCurrentDate();

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1304);
if (instance.isAlreadySelected(currentDate)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1305);
instance.removeDate(currentDate);
					}
					else {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1308);
instance.selectCurrentDate();
					}
				}
			},

		    /**
		     * Fires on mouseenter days elements.
		     *
		     * @method _onMouseEnterDays
		     * @param {EventFacade} event
		     * @protected
		     */
			_onMouseEnterDays: function(event) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_onMouseEnterDays", 1320);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1321);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1322);
var target  = event.currentTarget || event.target;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1324);
target.replaceClass(CSS_STATE_DEFAULT, CSS_STATE_HOVER);
			},

		    /**
		     * Fires on mouseleave days elements.
		     *
		     * @method _onMouseLeaveDays
		     * @param {EventFacade} event
		     * @protected
		     */
			_onMouseLeaveDays: function(event) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_onMouseLeaveDays", 1334);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1335);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1336);
var target  = event.currentTarget || event.target;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1338);
target.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);
			},

			_preventDefaultFn: function(event) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_preventDefaultFn", 1341);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1342);
event.preventDefault();
			},

			/**
			 * Render Calendar DOM blank days elements. Blank days are used to align
		     * with the week day column.
			 *
			 * @method _renderBlankDays
			 * @protected
			 */
			_renderBlankDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderBlankDays", 1352);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1353);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1355);
instance.blankDays.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar icon controls elements.
			 *
			 * @method _renderIconControls
			 * @protected
			 */
			_renderIconControls: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderIconControls", 1366);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1367);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1369);
instance.headerContentNode.append(
					instance.iconNextNode
				);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1373);
instance.headerContentNode.append(
					instance.iconPrevNode
				);
			},

			/**
			 * Render Calendar DOM month days elements.
			 *
			 * @method _renderMonthDays
			 * @protected
			 */
			_renderMonthDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderMonthDays", 1384);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1385);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1387);
instance.monthDays.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.
			 *
			 * @method _renderPaddingDaysEnd
			 * @protected
			 */
			_renderPaddingDaysEnd: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderPaddingDaysEnd", 1398);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1399);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1401);
instance.paddingDaysEnd.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.
			 *
			 * @method _renderPaddingDaysStart
			 * @protected
			 */
			_renderPaddingDaysStart: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderPaddingDaysStart", 1412);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1413);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1415);
instance.paddingDaysStart.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar title node element.
			 *
			 * @method _renderTitleNode
			 * @protected
			 */
			_renderTitleNode: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderTitleNode", 1426);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1427);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1429);
instance.headerContentNode.append(
					instance.headerTitleNode
				);
			},

			/**
			 * Render Calendar DOM week days elements.
			 *
			 * @method _renderWeekDays
			 * @protected
			 */
			_renderWeekDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderWeekDays", 1440);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1441);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1443);
instance.weekDays.appendTo(
					instance.weekDaysNode
				);
			},

			_repeateTemplate: function(template, times) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_repeateTemplate", 1448);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1449);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1450);
var buffer = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1452);
while (times--) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1453);
buffer.push(template);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1456);
return A.NodeList.create(buffer.join(EMPTY_STR));
			},

			/**
			 * Setter for the <a href="Calendar.html#config_dates">dates</a> attribute.
			 *
			 * @method _setDates
			 * @param {Array} value
			 * @protected
			 * @return {Array}
			 */
			_setDates: function(value) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setDates", 1467);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1468);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1470);
A.Array.each(value, function(date, index) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 6)", 1470);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1471);
if (isString(date)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1472);
value[index] = A.DataType.Date.parse( date );
					}
				});

				// Set current date to be the last passed date
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1477);
instance.setCurrentDate(
					value[value.length - 1]
				);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1481);
return value;
			},

			/**
			 * Setter for the <a href="Calendar.html#config_dates">currentDay</a> attribute.
			 *
			 * @method _setDay
			 * @param int value
			 * @protected
			 * @return number
			 */
			_setDay: function(value) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setDay", 1492);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1493);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1495);
return instance._getDateValue(value, 'getDate');
			},

			/**
			 * Setter for the <a href="Calendar.html#config_maxDates">maxDates</a> or
		     * <a href="Calendar.html#config_mainDates">minDates</a> attributes.
			 *
			 * @method _setMinMaxDate
			 * @param {Date} value
			 * @protected
			 * @return {Date}
			 */
			_setMinMaxDate: function(value) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setMinMaxDate", 1507);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1508);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1510);
if (isString(value)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1511);
value = A.DataType.Date.parse( value );
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1514);
return value;
			},

			/**
			 * Setter for the <a href="Calendar.html#config_dates">currentMonth</a> attribute.
			 *
			 * @method _setMonth
			 * @param int value
			 * @protected
			 * @return number
			 */
			_setMonth: function(value) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setMonth", 1525);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1526);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1528);
return instance._getDateValue(value, 'getMonth');
			},

			/**
			 * Setter for the <a href="Calendar.html#config_dates">currentYear</a> attribute.
			 *
			 * @method _setYear
			 * @param int value
			 * @protected
			 * @return number
			 */
			_setYear: function(value) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setYear", 1539);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1540);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1542);
return instance._getDateValue(value, 'getFullYear');
			},

			/**
			 * Sync Calendar header UI.
			 *
			 * @method _syncHeader
			 * @protected
			 */
			_syncHeader: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncHeader", 1551);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1552);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1553);
var currentMonth = instance.get(CURRENT_MONTH);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1554);
var currentYear = instance.get(CURRENT_YEAR);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1556);
var title = [ instance._getMonthName(currentMonth), currentYear ].join(SPACE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1558);
instance.headerTitleNode.html(title);
			},

			/**
			 * Sync Calendar month days UI.
			 *
			 * @method _syncMonthDays
			 * @protected
			 */
			_syncMonthDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncMonthDays", 1567);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1568);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1569);
var daysInMonth = instance.getDaysInMonth();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1570);
var rangeDate = instance.getCurrentDate();

				// Sync month days
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1573);
instance.monthDays.each(
					function(node, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 7)", 1574);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1575);
node.toggleClass(CSS_HELPER_HIDDEN, (index >= daysInMonth));

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1577);
rangeDate.setDate(index + 1);
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1578);
instance._checkNodeRange(node, rangeDate);
					}
				);
			},

			/**
			 * Sync Calendar padding end days UI.
			 *
			 * @method _syncPaddingEnd
			 * @protected
			 */
			_syncPaddingEnd: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncPaddingEnd", 1589);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1590);
var instance = this;

				// Sync padding end nodes
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1593);
if (instance.get(SHOW_OTHER_MONTH)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1594);
var nextMonthDate = instance.getCurrentDate(0, +1);
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1595);
var totalVisiblePaddingEnd = (INT_MATRIX_DAYS_LENGTH - (instance._getMonthOverlapDaysOffset() + instance.getDaysInMonth()));


					// Sync blank or padding start nodes
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1599);
instance.paddingDaysEnd.each(
						function(node, index) {
							_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 8)", 1600);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1601);
node.toggleClass(CSS_HELPER_HIDDEN, (index >= totalVisiblePaddingEnd));

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1603);
nextMonthDate.setDate(index + 1);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1604);
instance._bindDataAttrs(node, nextMonthDate);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1605);
instance._checkNodeRange(node, nextMonthDate);
						}
					);
				}
			},

			/**
			 * Sync Calendar padding start days UI.
			 *
			 * @method _syncPaddingStart
			 * @protected
			 */
			_syncPaddingStart: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncPaddingStart", 1617);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1618);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1619);
var showOtherMonth = instance.get(SHOW_OTHER_MONTH);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1620);
var prevMonthDate = instance.getCurrentDate(0, -1);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1621);
var totalPrevMonthDays = instance.getDaysInMonth(null, prevMonthDate.getMonth());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1622);
var paddingNodes = (showOtherMonth ? instance.paddingDaysStart : instance.blankDays);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1623);
var totalPadding = paddingNodes.size();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1624);
var totalVisible = instance._getMonthOverlapDaysOffset();

				// Sync blank or padding start nodes
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1627);
paddingNodes.each(
					function(node, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 9)", 1628);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1629);
var totalHidden = (totalPadding - totalVisible);

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1631);
node.toggleClass(CSS_HELPER_HIDDEN, (index < totalHidden));

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1633);
if (showOtherMonth) {
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1634);
var dayNumber = (totalPrevMonthDays - totalPadding) + (index + 1);

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1636);
node.html(dayNumber);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1637);
prevMonthDate.setDate(dayNumber);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1638);
instance._bindDataAttrs(node, prevMonthDate);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1639);
instance._checkNodeRange(node, prevMonthDate);
						}
					}
				);
			},

			/**
			 * Sync Calendar selected days UI.
			 *
			 * @method _syncSelectedDays
			 * @protected
			 */
			_syncSelectedDays: function(dates) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncSelectedDays", 1651);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1652);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1653);
var currentMonth = instance.get(CURRENT_MONTH);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1654);
var currentYear = instance.get(CURRENT_YEAR);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1656);
instance.monthDays.replaceClass(CSS_STATE_ACTIVE, CSS_STATE_DEFAULT);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1657);
instance.monthDays.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1659);
instance.eachSelectedDate(
					function(date, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 10)", 1660);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1661);
var canSelectDays = (currentMonth == date.getMonth()) && (currentYear == date.getFullYear());

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1663);
if (canSelectDays) {
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1664);
var dayNode = instance.monthDays.item( date.getDate() - 1 );

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1666);
dayNode.addClass(CSS_STATE_ACTIVE);

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1668);
try {
								// focus the last selected date
								// IE doesn't support focus on hidden elements
								_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1671);
dayNode.focus();
							}
							catch (err) {}
						}
					},
					dates
				);
			},

			/**
			 * Sync Calendar StdContent.
			 *
			 * @method _syncStdContent
			 * @protected
			 */
			_syncStdContent: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncStdContent", 1686);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1687);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1688);
var bodyContent = A.Node.create('<div></div>');
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1689);
var footContent = A.Node.create('<div class="' + CSS_HELPER_CLEARFIX + '"></div>');

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1691);
bodyContent.append(instance.weekDaysNode);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1692);
bodyContent.append(instance.monthDaysNode);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1694);
footContent.append(instance.todayLinkNode);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1695);
footContent.append(instance.noneLinkNode);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1697);
instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode.getDOM());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1698);
instance.setStdModContent(WidgetStdMod.BODY, bodyContent);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1699);
instance.setStdModContent(WidgetStdMod.FOOTER, footContent);
			},

			/**
			 * Sync Calendar header, days and selected days UI.
			 *
			 * @method _syncView
			 * @protected
			 */
			_syncView: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncView", 1708);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1709);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1711);
instance._syncMonthDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1712);
instance._syncHeader();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1713);
instance._syncSelectedDays();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1715);
instance._uiSetShowOtherMonth(
					instance.get(SHOW_OTHER_MONTH)
				);
			},

			/**
			 * Sync the UI of the Calendar when showToday attribute change.
			 *
			 * @method _uiSetShowToday
			 * @protected
			 */
			_uiSetAllowNone: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetAllowNone", 1726);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1727);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1729);
instance._conditionalToggle(instance.noneLinkNode, val);
			},

			/**
			 * Sync the UI of the Calendar when dates attribute change.
			 *
			 * @method _uiSetDates
			 * @protected
			 */
			_uiSetDates: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetDates", 1738);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1739);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1741);
instance._syncView();
			},

			/**
			 * Sync the UI of the Calendar when showOtherMonth attribute change.
			 *
			 * @method _uiSetShowOtherMonth
			 * @protected
			 */
			_uiSetShowOtherMonth: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetShowOtherMonth", 1750);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1751);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1753);
if (val) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1754);
instance.blankDays.hide();
				}
				else {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1757);
instance.paddingDaysEnd.hide();
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1758);
instance.paddingDaysStart.hide();
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1761);
instance._syncPaddingEnd();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1762);
instance._syncPaddingStart();
			},

			/**
			 * Sync the UI of the Calendar when showToday attribute change.
			 *
			 * @method _uiSetShowToday
			 * @protected
			 */
			_uiSetShowToday: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetShowToday", 1771);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1772);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1774);
instance._conditionalToggle(instance.todayLinkNode, val);
			},

			/**
			 * Default value for blankDays attribute, passed as valueFn.
			 *
			 * @method _valueBlankDays
			 * @protected
			 */
			_valueBlankDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valueBlankDays", 1783);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1784);
return this._repeateTemplate(TPL_CALENDAR_DAY_BLANK, DateMath.WEEK_LENGTH);
			},

			/**
			 * Default value for monthDays attribute, passed as valueFn.
			 *
			 * @method _valueMonthDays
			 * @protected
			 */
			_valueMonthDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valueMonthDays", 1793);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1794);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1796);
var day = 0;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1797);
var buffer = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1799);
while (day++ < DateMath.MAX_MONTH_LENGTH) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1800);
TPL_BUFFER_MONTH_DAYS[1] = day;

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1802);
buffer.push(TPL_BUFFER_MONTH_DAYS.join(EMPTY_STR));
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1805);
return A.NodeList.create(buffer.join(EMPTY_STR));
			},

			/**
			 * Default value for paddingDaysEnd attribute, passed as valueFn.
			 *
			 * @method _valuePaddingDaysEnd
			 * @protected
			 */
			_valuePaddingDaysEnd: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valuePaddingDaysEnd", 1814);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1815);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1816);
var buffer = [];
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1817);
var day = 0;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1819);
while (day++ <= INT_MAX_PADDING_END) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1820);
TPL_CALENDAR_DAY_PADDING_END[1] = day;

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1822);
buffer.push(TPL_CALENDAR_DAY_PADDING_END.join(EMPTY_STR));
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1825);
return A.NodeList.create(buffer.join(EMPTY_STR));
			},

			/**
			 * Default value for paddingDaysStart attribute, passed as valueFn.
			 *
			 * @method _valuePaddingDaysStart
			 * @protected
			 */
			_valuePaddingDaysStart: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valuePaddingDaysStart", 1834);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1835);
return this._repeateTemplate(TPL_CALENDAR_DAY_PADDING_START, DateMath.WEEK_LENGTH);
			},

			/**
			 * Default value for weekDays attribute, passed as valueFn.
			 *
			 * @method _valueWeekDays
			 * @protected
			 */
			_valueWeekDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valueWeekDays", 1844);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1845);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1846);
var day = 0;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1847);
var buffer = [];
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1848);
var firstWeekDay = instance.get(FIRST_DAY_OF_WEEK);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1850);
while(day < DateMath.WEEK_LENGTH) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1851);
var fixedDay = (day++ + firstWeekDay) % DateMath.WEEK_LENGTH;

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1853);
TPL_BUFFER_WEEKDAYS[1] = instance._getDayNameMin(fixedDay);

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1855);
buffer.push(TPL_BUFFER_WEEKDAYS.join(EMPTY_STR));
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1858);
return A.NodeList.create(buffer.join(EMPTY_STR));
			}
		}
	}
);

_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1864);
Calendar.EMPTY_DATES = EMPTY_DATES;

_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1866);
A.Calendar = A.Base.create(CALENDAR, Calendar, [A.WidgetStdMod]);

}, '@VERSION@' ,{requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale'], skinnable:true});
