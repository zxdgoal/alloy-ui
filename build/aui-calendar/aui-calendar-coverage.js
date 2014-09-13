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
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].code=["AUI.add('aui-calendar', function(A) {","/**"," * The Calendar component is a UI control that enables users to choose one or"," * more dates from a graphical calendar presented in a single month or multi"," * month interface. Calendars are generated entirely via script and can be"," * navigated without any page refreshes."," *"," * @module aui-calendar"," * @submodule aui-calendar-base"," */","","var L = A.Lang,","	isDate = L.isDate,","	isString = L.isString,","	isArray = L.isArray,","	isBoolean = L.isBoolean,","	isValue = L.isValue,","	isNumber = L.isNumber,","","	toInt = L.toInt,","","	DateMath = A.DataType.DateMath,","	WidgetStdMod = A.WidgetStdMod,","","	EMPTY_STR = '',","	SPACE = ' ',","","	ACTIVE = 'active',","	ALLOW_NONE = 'allowNone',","	ANCHOR = 'a',","	BLANK = 'blank',","	BLANK_DAYS = 'blankDays',","	BOUNDING_BOX = 'boundingBox',","	CALENDAR = 'calendar',","	CHILDREN = 'children',","	CIRCLE = 'circle',","	CLEARFIX = 'clearfix',","	CURRENT_DAY = 'currentDay',","	CURRENT_MONTH = 'currentMonth',","	CURRENT_YEAR = 'currentYear',","	DATA_DAY = 'data-day',","	DATA_MONTH = 'data-month',","	DATA_YEAR = 'data-year',","	DATES = 'dates',","	DATE_FORMAT = 'dateFormat',","	DAY = 'day',","	DEFAULT = 'default',","	DISABLED = 'disabled',","	DOT = '.',","	END = 'end',","	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',","	HEADER = 'hd',","	HEADER_CONTENT_NODE = 'headerContentNode',","	HEADER_TITLE_NODE = 'headerTitleNode',","	HELPER = 'helper',","	HIDDEN = 'hidden',","	HOVER = 'hover',","	ICON = 'icon',","	ICON_NEXT_NODE = 'iconNextNode',","	ICON_PREV_NODE = 'iconPrevNode',","	LINK = 'link',","	LOCALE = 'locale',","	MAX_DATE = 'maxDate',","	MIN_DATE = 'minDate',","	MONTH = 'month',","	MONTHDAYS = 'monthdays',","	MONTH_DAYS = 'monthDays',","	MONTH_DAYS_NODE = 'monthDaysNode',","	NEXT = 'next',","	NONE = 'none',","	NONE_LINK_NODE = 'noneLinkNode',","	PADDING = 'padding',","	PADDING_DAYS_END = 'paddingDaysEnd',","	PADDING_DAYS_START = 'paddingDaysStart',","	PREV = 'prev',","	SELECT_MULTIPLE_DATES = 'selectMultipleDates',","	SHOW_OTHER_MONTH = 'showOtherMonth',","	SHOW_TODAY = 'showToday',","	START = 'start',","	STATE = 'state',","	TITLE = 'title',","	TODAY = 'today',","	TODAY_LINK_NODE = 'todayLinkNode',","	TRIANGLE = 'triangle',","	WEEK = 'week',","	WEEKDAYS = 'weekdays',","	WEEK_DAYS = 'weekDays',","	WEEK_DAYS_NODE = 'weekDaysNode',","","	EV_CALENDAR_SELECT = 'calendar:select',","","	getCN = A.getClassName,","","	CSS_CALENDAR_DISABLED = getCN(CALENDAR, DISABLED),","	CSS_CALENDAR_LINK = getCN(CALENDAR, LINK),","	CSS_CALENDAR_LINK_NONE = getCN(CALENDAR, LINK, NONE),","	CSS_CALENDAR_LINK_TODAY = getCN(CALENDAR, LINK, TODAY),","	CSS_DAY = getCN(CALENDAR, DAY),","	CSS_DAY_MONTH = getCN(CALENDAR, DAY, MONTH),","	CSS_DAY_BLANK = getCN(CALENDAR, DAY, BLANK),","	CSS_DAY_PADDING_END = getCN(CALENDAR, DAY, PADDING, END),","	CSS_DAY_PADDING_START = getCN(CALENDAR, DAY, PADDING, START),","	CSS_HEADER = getCN(CALENDAR, HEADER),","	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),","	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),","	CSS_ICON = getCN(ICON),","	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, 'l'),","	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, 'r'),","	CSS_MONTHDAYS = getCN(CALENDAR, MONTHDAYS),","	CSS_NEXT = getCN(CALENDAR, NEXT),","	CSS_PREV = getCN(CALENDAR, PREV),","	CSS_STATE_ACTIVE = getCN(STATE, ACTIVE),","	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),","	CSS_STATE_HOVER = getCN(STATE, HOVER),","	CSS_TITLE = getCN(CALENDAR, TITLE),","	CSS_WEEK = getCN(CALENDAR, WEEK),","	CSS_WEEKDAYS = getCN(CALENDAR, WEEKDAYS),","","	EMPTY_DATES = [],","","	INT_MATRIX_DAYS_LENGTH = 42,","	INT_MAX_PADDING_END = 14,","","	TPL_CALENDAR_NONE_LINK = '<a href=\"#\" class=\"'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_NONE ].join(SPACE)+'\">None</a>',","","	TPL_CALENDAR_TODAY_LINK = '<a href=\"#\" class=\"'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_TODAY ].join(SPACE)+'\">Today</a>',","","	TPL_CALENDAR_HEADER = '<div class=\"'+[ CSS_HEADER, CSS_STATE_DEFAULT, CSS_HELPER_CLEARFIX ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_PREV = '<a href=\"\" class=\"'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L, CSS_PREV ].join(SPACE)+'\">Back</a>',","","	TPL_CALENDAR_NEXT = '<a href=\"\" class=\"'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R, CSS_NEXT ].join(SPACE)+'\">Prev</a>',","","	TPL_CALENDAR_DAY_BLANK = '<div class=\"'+[ CSS_DAY_BLANK, CSS_HELPER_HIDDEN ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_DAY_PADDING_START = '<div class=\"'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_START, CSS_HELPER_HIDDEN ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_DAY_PADDING_END = ['<div class=\"'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_END, CSS_HELPER_HIDDEN ].join(SPACE)+'\">', 0, '</div>'],","","	TPL_CALENDAR_HEADER_TITLE = '<div class=\"'+CSS_TITLE+'\"></div>',","","	TPL_CALENDAR_MONTHDAYS = '<div class=\"'+[ CSS_MONTHDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'\"></div>',","","	TPL_CALENDAR_WEEKDAYS = '<div class=\"'+[ CSS_WEEKDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'\"></div>',","","	TPL_BUFFER_WEEKDAYS = ['<div class=\"'+CSS_WEEK+'\">', 0, '</div>'],","","	TPL_BUFFER_MONTH_DAYS = ['<a href=\"#\" class=\"'+[ CSS_DAY, CSS_DAY_MONTH, CSS_STATE_DEFAULT ].join(SPACE)+'\">', 0, '</a>'];","","/**"," * <p><img src=\"assets/images/aui-calendar/main.png\"/></p>"," *"," * A base class for Calendar, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Setting Configuration Options</li>"," *    <li>Obtaining Selected Dates</li>"," *    <li>Creating International Calendars</li>"," *    <li>Customizing the Calendar</li>"," * </ul>"," *"," * Quick Example:"," *"," * <pre><code>var instance = new A.Calendar({"," *  trigger: '#input1',"," *  dates: ['09/14/2009', '09/15/2009'],"," *  dateFormat: '%d/%m/%y %A',"," *  setValue: true,"," *  selectMultipleDates: true"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"Calendar.html#configattributes\">Configuration Attributes</a> available for"," * Calendar."," *"," * @class Calendar"," * @param config {Object} Object literal specifying widget configuration properties."," * @constructor"," * @extends OverlayContext"," */","var Calendar = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property Calendar.NAME","		 * @type String","		 * @static","		 */","		NAME: CALENDAR,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the Calendar.","		 *","		 * @property Calendar.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Wheather displays the \"none\" link on the Calendar footer.","			 *","			 * @attribute allowNone","			 * @default true","			 * @type boolean","			 */","			allowNone: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * NodeList containing all the DOM elements for","			 * each blank day. If not specified try to query using HTML_PARSER","			 * an element inside contentBox which matches","			 * <code>aui-calendar-day-blank</code>.","			 *","			 * @attribute blankDays","			 * @default Generated div element.","			 * @type NodeList","			 */","			blankDays: {","				valueFn: '_valueBlankDays'","			},","","			/**","			 * Current day number.","			 *","			 * @attribute currentDay","			 * @default Current day","			 * @type Number","			 */","			currentDay: {","				setter: '_setDay',","				value: (new Date()).getDate()","			},","","			/**","			 * Current month number.","			 *","			 * @attribute currentMonth","			 * @default Current month","			 * @type Number","			 */","			currentMonth: {","				setter: '_setMonth',","				value: (new Date()).getMonth()","			},","","			/**","			 * Current year number.","			 *","			 * @attribute currentYear","			 * @default Current year","			 * @type Number","			 */","			currentYear: {","				setter: '_setYear',","				value: (new Date()).getFullYear()","			},","","			/**","			 * The default date format string which can be overriden for","			 * localization support. The format must be valid according to","			 * <a href=\"DataType.Date.html\">A.DataType.Date.format</a>.","			 *","			 * @attribute dateFormat","			 * @default %m/%d/%Y","			 * @type String","			 */","			dateFormat: {","				value: '%m/%d/%Y',","				validator: isString","			},","","			/**","			 * Dates which the calendar will show as selected by default.","			 *","			 * @attribute dates","			 * @default Current date","			 * @type Array","			 */","			dates: {","				lazyAdd: false,","				value: [ new Date() ],","				validator: isArray,","				setter: '_setDates'","			},","","			/**","			 * First day of the week: Sunday is 0, Monday is 1.","			 *","			 * @attribute firstDayOfWeek","			 * @default 0","			 * @type Number","			 */","			firstDayOfWeek: {","				value: 0,","				validator: isNumber","			},","","			/**","			 * DOM node reference to be the header of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-hd</code>.","			 *","			 * @attribute headerContentNode","			 * @default Generated div element.","			 * @type Node","			 */","			headerContentNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_HEADER);","				}","			},","","			/**","			 * DOM node reference to be the title of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-title</code>.","			 *","			 * @attribute headerTitleNode","			 * @default Generated div element.","			 * @type Node","			 */","			headerTitleNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_HEADER_TITLE);","				}","			},","","			/**","			 * DOM node reference to be the icon next of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-prev</code>.","			 *","			 * @attribute iconNextNode","			 * @default Generated div element.","			 * @type Node","			 */","			iconNextNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_NEXT);","				}","			},","","			/**","			 * DOM node reference to be the icon prev of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-prev</code>.","			 *","			 * @attribute iconPrevNode","			 * @default Generated div element.","			 * @type Node","			 */","			iconPrevNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_PREV);","				}","			},","","			/**","			 * Maximum allowable date. Values supported by the Date","			 * constructor are supported.","			 *","			 * @attribute maxDate","			 * @default null","			 * @type String | Date","			 */","			maxDate: {","				value: null,","				setter: '_setMinMaxDate'","			},","","			/**","			 * Minimum allowable date. Values supported by the Date","			 * constructor are supported.","			 *","			 * @attribute minDate","			 * @default null","			 * @type Date | String","			 */","			minDate: {","				value: null,","				setter: '_setMinMaxDate'","			},","","			/**","			 * NodeList reference containing the days of the month of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-day</code>.","			 *","			 * @attribute monthDays","			 * @default Generated div element.","			 * @type NodeList","			 */","			monthDays: {","				valueFn: '_valueMonthDays'","			},","","			/**","			 * DOM node reference which contains all month days nodes of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-monthdays</code>.","			 *","			 * @attribute monthDaysNode","			 * @default Generated div element.","			 * @type Node","			 */","			monthDaysNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_MONTHDAYS);","				}","			},","","			/**","			 * DOM node reference to be the \"none\" link of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-title</code>.","			 *","			 * @attribute noneLinkNode","			 * @default Generated div element.","			 * @type Node","			 */","			noneLinkNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_NONE_LINK);","				}","			},","","			/**","			 * NodeList containing all the DOM elements for","			 * each blank day. If not specified try to query using HTML_PARSER","			 * an element inside contentBox which matches","			 * <code>aui-calendar-day-blank</code>.","			 *","			 * @attribute paddingDaysEnd","			 * @default Generated div element.","			 * @type NodeList","			 */","			paddingDaysEnd: {","				valueFn: '_valuePaddingDaysEnd'","			},","","			/**","			 * NodeList containing all the DOM elements for","			 * each blank day. If not specified try to query using HTML_PARSER","			 * an element inside contentBox which matches","			 * <code>aui-calendar-day-blank</code>.","			 *","			 * @attribute paddingDaysStart","			 * @default Generated div element.","			 * @type NodeList","			 */","			paddingDaysStart: {","				valueFn: '_valuePaddingDaysStart'","			},","","			/**","			 * Wether accepts to select multiple dates.","			 *","			 * @attribute selectMultipleDates","			 * @default false","			 * @type boolean","			 */","			selectMultipleDates: {","				value: false","			},","","			/**","			 * If true set the selected date with the correct","			 * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a> to the","			 * value of the input field which is hosting the Calendar.","			 *","			 * @attribute setValue","			 * @default true","			 * @type boolean","			 */","			setValue: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * Wheather displays the days for the other months.","			 *","			 * @attribute showOtherMonth","			 * @default true","			 * @type boolean","			 */","			showOtherMonth: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * Wheather displays the \"today\" link on the Calendar footer.","			 *","			 * @attribute showToday","			 * @default true","			 * @type boolean","			 */","			showToday: {","				value: true,","				validator: isBoolean","			},","","			/**","			 * DOM node reference to be the \"today\" link of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-title</code>.","			 *","			 * @attribute todayLinkNode","			 * @default Generated div element.","			 * @type Node","			 */","			todayLinkNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_TODAY_LINK);","				}","			},","","			/**","			 * NodeList reference containing the days of the week of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-week</code>.","			 *","			 * @attribute weekDays","			 * @default Generated div element.","			 * @type NodeList","			 */","			weekDays: {","				valueFn: '_valueWeekDays'","			},","","			/**","			 * DOM node reference which contains all week days nodes of the Calendar. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-calendar-weekdays</code>.","			 *","			 * @attribute weekDaysNode","			 * @default Generated div element.","			 * @type Node","			 */","			weekDaysNode: {","				valueFn: function() {","					return A.Node.create(TPL_CALENDAR_WEEKDAYS);","				}","			}","		},","","		/**","		 * Object hash, defining how attribute values are to be parsed from","		 * markup contained in the widget's content box.","		 *","		 * @property ProgressBar.HTML_PARSER","		 * @type Object","		 * @static","		 */","		HTML_PARSER: {","			blankDays: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_BLANK);","","				return nodes.size() ? nodes : null;","			},","","			monthDays: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_MONTH);","","				return nodes.size() ? nodes : null;","			},","","			paddingDaysEnd: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_PADDING_END);","","				return nodes.size() ? nodes : null;","			},","","			paddingDaysStart: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_DAY_PADDING_START);","","				return nodes.size() ? nodes : null;","			},","","			weekDays: function(srcNode) {","				var nodes = srcNode.all(DOT+CSS_WEEK);","","				return nodes.size() ? nodes : null;","			},","","			headerTitleNode: DOT+CSS_TITLE,","","			headerContentNode: DOT+CSS_HEADER,","","			iconNextNode: DOT+CSS_NEXT,","","			iconPrevNode: DOT+CSS_PREV,","","			monthDaysNode: DOT+CSS_MONTHDAYS,","","			noneLinkNode: DOT+CSS_CALENDAR_LINK_NONE,","","			todayLinkNode: DOT+CSS_CALENDAR_LINK_TODAY,","","			weekDaysNode: DOT+CSS_WEEKDAYS","		},","","		UI_ATTRS: [DATES, SHOW_TODAY, ALLOW_NONE],","","		BIND_UI_ATTRS: [SHOW_OTHER_MONTH],","","		prototype: {","			/**","			 * Construction logic executed during Calendar instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				instance._createEvents();","			},","","			/**","			 * Bind the events on the Calendar UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","","				boundingBox.once('mousemove', A.bind(instance._bindDelegate, instance));","			},","","			/**","			 * Clear all selected dates on the Calendar.","			 *","			 * @method clear","			 */","			clear: function() {","				var instance = this;","","				instance.set(DATES, Calendar.EMPTY_DATES);","			},","","			/**","			 * Loop each date from <a href=\"Calendar.html#config_dates\">dates</a> and","		     * executes a callback.","			 *","			 * @method eachSelectedDate","			 * @param {function} fn Callback to be executed for each date.","			 * @param {Dates} dates Optional dates Array to loop through. If not passed it will use","			 * the <a href=\"Calendar.html#config_dates\">dates</a>.","			 */","			eachSelectedDate: function(fn, dates) {","				var instance = this;","","				A.Array.each(dates || instance.get(DATES), fn, instance);","			},","","			/**","			 * Get the first day of the month of the passed year.","			 *","			 * @method findMonthStart","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @return {Number}","			 */","			findMonthStart: function(year, month) {","				var instance = this;","				var date = instance._normalizeYearMonth(year, month);","","				return DateMath.findMonthStart(DateMath.getDate(date.year, date.month));","			},","","			/**","			 * Format a date with the passed mask. Used on","		     * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a>.","			 *","			 * @method formatDate","			 * @param {Date} date","			 * @param {String} mask See <a href=\"Calendar.html#config_dateFormat\">dateFormat</a>.","			 * @return {String}","			 */","			formatDate: function (date, mask) {","				var instance = this;","				var locale = instance.get(LOCALE);","","				return A.DataType.Date.format(date, { format: mask, locale: locale });","			},","","			/**","			 * Get current date.","			 *","			 * @method getCurrentDate","			 * @return {Date}","			 */","			getCurrentDate: function(offsetYear, offsetMonth, offsetDay) {","				var instance = this;","				var date = instance._normalizeYearMonth();","				var newDay = date.day + toInt(offsetDay);","				var newMonth = date.month + toInt(offsetMonth);","				var newYear = date.year + toInt(offsetYear);","","				var totalMonthDays = instance.getDaysInMonth(date.year, newMonth);","","				if (newDay > totalMonthDays) {","					newDay = totalMonthDays;","				}","","				return DateMath.getDate(newYear, newMonth, newDay);","			},","","			/**","			 * Get the number of days in the passed year and month.","			 *","			 * @method getDaysInMonth","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @return {Number}","			 */","			getDaysInMonth: function(year, month) {","				var instance = this;","				var date = instance._normalizeYearMonth(year, month);","","		        return DateMath.getDaysInMonth(date.year, date.month);","		    },","","			/**","			 * Get an Array with selected dates with detailed information (day, month, year).","			 *<pre><code>[{","			 *    year: date.getFullYear(),","			 *    month: date.getMonth(),","			 *    day: date.getDate()","			 * }]</code></pre>","			 *","			 * @method getDetailedSelectedDates","			 * @return {Array}","			 */","			getDetailedSelectedDates: function() {","				var instance = this;","				var dates = [];","","				instance.eachSelectedDate(function(date) {","					dates.push({","						year: date.getFullYear(),","						month: date.getMonth(),","						day: date.getDate()","					});","				});","","				return dates;","			},","","			/**","			 * Get the first day of week of the passed year and month.","			 *","			 * @method getFirstDayOfWeek","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @return {Number}","			 */","			getFirstDayOfWeek: function() {","				var instance = this;","				var firstDayOfWeek = instance.get(FIRST_DAY_OF_WEEK);","","				return DateMath.getFirstDayOfWeek(instance.findMonthStart(), firstDayOfWeek);","			},","","			/**","			 * Get the selected dates formatted by the","		     * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a>.","			 *","			 * @method getFormattedSelectedDates","			 * @return {Array}","			 */","			getFormattedSelectedDates: function() {","				var instance = this;","				var dates = [];","","				instance.eachSelectedDate(function(date) {","					dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );","				});","","				return dates;","			},","","			/**","			 * Get the selected dates.","			 *","			 * @method getSelectedDates","			 * @return {Array}","			 */","			getSelectedDates: function() {","				var instance = this;","","				return instance.get(DATES);","			},","","			/**","			 * Check if a date is already selected.","			 *","			 * @method isAlreadySelected","			 * @param {Date} date Date to be checked.","			 * @return {boolean}","			 */","			isAlreadySelected: function(date) {","				var instance = this;","				var isAlreadySelected = false;","","				instance.eachSelectedDate(function(d, index) {","					if (instance._compareDates(d, date)) {","						isAlreadySelected = true;","					}","				});","","				return isAlreadySelected;","			},","","			/**","			 * Check if the passed date is out of range. Compared with the","		     * <a href=\"Calendar.html#config_minDate\">minDate</a> and","		     * <a href=\"Calendar.html#config_maxDate\">maxDate</a>.","			 *","			 * @method isOutOfRangeDate","			 * @param {Date} date Date to be checked.","			 */","			isOutOfRangeDate: function(date) {","				var instance = this;","				var maxDate = instance.get(MAX_DATE);","				var minDate = instance.get(MIN_DATE);","","				if ((!minDate && !maxDate) ||","					instance._compareDates(date, minDate) ||","					instance._compareDates(date, maxDate)) {","","					return false;","				}","","				return !DateMath.between(date, minDate, maxDate);","			},","","			/**","			 * Navigate through months and re-sync the UI.","			 *","			 * @method navigateMonth","			 * @param {Number} offset Offset of the number of months to navigate.","		     * Could be a positive or a negative offset.","			 */","			navigateMonth: function(offset) {","				var instance = this;","				var date = instance.getCurrentDate(0, offset);","","				// when navigate by month update the year also","				instance.set(CURRENT_MONTH, date.getMonth());","				instance.set(CURRENT_YEAR, date.getFullYear());","","				instance._syncView();","			},","","			/**","			 * Remove the passed date from","		     * <a href=\"Calendar.html#config_dates\">dates</a>.","			 *","			 * @method removeDate","			 * @param {Date} date Date to remove","			 */","			removeDate: function(date) {","				var instance = this;","				var dates = [];","","				instance.eachSelectedDate(","					function(d, index) {","						if (!instance._compareDates(d, date)) {","							dates.push(d);","						}","					}","				);","","				instance.set(DATES, dates);","			},","","","			/**","			 * Create the DOM structure for the Calendar. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				// creating properties references for performance","				instance.blankDays = instance.get(BLANK_DAYS);","				instance.headerContentNode = instance.get(HEADER_CONTENT_NODE);","				instance.headerTitleNode = instance.get(HEADER_TITLE_NODE);","				instance.iconNextNode = instance.get(ICON_NEXT_NODE);","				instance.iconPrevNode = instance.get(ICON_PREV_NODE);","				instance.monthDays = instance.get(MONTH_DAYS);","				instance.monthDaysNode = instance.get(MONTH_DAYS_NODE);","				instance.noneLinkNode = instance.get(NONE_LINK_NODE);","				instance.paddingDaysEnd = instance.get(PADDING_DAYS_END);","				instance.paddingDaysStart = instance.get(PADDING_DAYS_START);","				instance.todayLinkNode = instance.get(TODAY_LINK_NODE);","				instance.weekDays = instance.get(WEEK_DAYS);","				instance.weekDaysNode = instance.get(WEEK_DAYS_NODE);","","				instance._renderWeekDays();","				instance._renderBlankDays();","				instance._renderPaddingDaysStart();","				instance._renderMonthDays();","				instance._renderPaddingDaysEnd();","				instance._renderIconControls();","				instance._renderTitleNode();","			},","","			/**","			 * Select the current date returned by","		     * <a href=\"Calendar.html#method_getCurrentDate\">getCurrentDate</a>.","			 *","			 * @method selectCurrentDate","			 * @protected","			 */","			selectCurrentDate: function() {","				var instance = this;","				var currentDate = instance.getCurrentDate();","","				if (!instance.isAlreadySelected(currentDate)) {","					var dates = instance.get(DATES);","","					// if is single selection reset the selected dates","					if (!instance.get(SELECT_MULTIPLE_DATES)) {","						dates = [];","					}","","					dates.push(currentDate);","					instance.set(DATES, dates);","				}","			},","","			/**","			 * Navigate to the next month. Fired from the next icon on the Calendar","		     * header.","			 *","			 * @method selectNextMonth","			 */","			selectNextMonth: function() {","				var instance = this;","","				instance.navigateMonth(+1);","			},","","			/**","			 * Navigate to the previous month. Fired from the previous icon on the","			 * Calendar header.","			 *","			 * @method selectPrevMonth","			 */","			selectPrevMonth: function() {","				var instance = this;","","				instance.navigateMonth(-1);","			},","","			/**","			 * Select today date on the Calendar.","			 *","			 * @method selectToday","			 */","			selectToday: function() {","				var instance = this;","","				instance.set(DATES, [ new Date() ]);","			},","","		    /**","		     * Update the currentDay, currentMonth and currentYear values.","		     *","		     * @method setCurrentDate","		     * @param {Date} date","		     */","			setCurrentDate: function(date) {","				var instance = this;","","				if (isDate(date)) {","					// update the current values to the last selected date","					instance.set(CURRENT_DAY, date.getDate());","					instance.set(CURRENT_MONTH, date.getMonth());","					instance.set(CURRENT_YEAR, date.getFullYear());","				}","			},","","			/**","			 * Sync the Calendar UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance._syncStdContent();","			},","","			/**","			 * Bind DOM events to the UI.","			 *","			 * @method _bindDelegate","			 * @private","			 */","			_bindDelegate: function() {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","				var headerContentNode = instance.headerContentNode;","","				headerContentNode.delegate('click', instance.selectNextMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_R, instance);","				headerContentNode.delegate('click', instance.selectPrevMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_L, instance);","","				boundingBox.delegate('click', instance._preventDefaultFn, ANCHOR);","				boundingBox.delegate('click', A.bind(instance.selectToday, instance), DOT+CSS_CALENDAR_LINK_TODAY);","				boundingBox.delegate('click', A.bind(instance.clear, instance), DOT+CSS_CALENDAR_LINK_NONE);","				boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);","				boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);","				boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);","","				instance.after('datesChange', instance._handleSelectEvent);","			},","","			_bindDataAttrs: function(node, date) {","				node.attr(DATA_YEAR, date.getFullYear());","				node.attr(DATA_MONTH, date.getMonth());","			},","","			_checkNodeRange: function(node, date) {","				var instance = this;","","				node.toggleClass(","					CSS_CALENDAR_DISABLED,","					instance.isOutOfRangeDate(date)","				);","			},","","			/**","			 * Compare two dates.","			 *","			 * @method _compareDates","			 * @param {Date} d1","			 * @param {Date} d2","			 * @protected","			 * @return {boolean}","			 */","			_compareDates: function(d1, d2) {","				return ( d1 && d2 && (d1.getTime() == d2.getTime()) );","			},","","			_conditionalToggle: function(node, show) {","				var instance = this;","","				if (show) {","					node.show();","				}","				else {","					node.hide();","				}","			},","","		    /**","		     * Create the custom events used on the Calendar.","		     *","		     * @method _createEvents","		     * @private","		     */","			_createEvents: function() {","				var instance = this;","","				// create publish function for kweight optimization","				var publish = function(name, fn) {","					instance.publish(name, {","			            defaultFn: fn,","			            queuable: false,","			            emitFacade: true,","			            bubbles: true,","			            prefix: CALENDAR","			        });","				};","","				publish(EV_CALENDAR_SELECT);","			},","","			_getDateValue: function(value, methodName) {","				var instance = this;","","				if (value == -1) {","					value = A.Attribute.INVALID_VALUE;","				}","				else {","					value = toInt(value);","				}","","				return value;","			},","","			/**","			 * Get the day name of the passed weekDay from the locale map.","			 *","			 * @method _getDayName","			 * @param {Number} weekDay","			 * @protected","			 * @return {String}","			 */","			_getDayName: function(weekDay) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.A[weekDay];","			},","","			/**","			 * Get a short day name of the passed weekDay from the locale map.","			 *","			 * @method _getDayNameShort","			 * @param {Number} weekDay","			 * @protected","			 * @return {String}","			 */","			_getDayNameShort: function(weekDay) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.a[weekDay];","			},","","			/**","			 * Get a very short day name of the passed weekDay from the locale map.","			 *","			 * @method _getDayNameMin","			 * @param {Number} weekDay","			 * @protected","			 * @return {String}","			 */","			_getDayNameMin: function(weekDay) {","				var instance = this;","				var name = instance._getDayNameShort(weekDay);","","				return name.slice(0, name.length-1);","			},","","			 /**","			  * Get the locale map containing the respective values for the","		      * <a href=\"Widget.html#config_locale\">locale</a> used.","			  *","			  * <pre><code>A.DataType.Date.Locale['pt-br'] = A.merge(","			  *	A.DataType.Date.Locale['en'], {","			  *		a: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Fri', 'Sat'],","			  *		A: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],","			  *		b: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],","			  *		B: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],","			  *		c: '%a %d %b %Y %T %Z',","			  *		p: ['AM', 'PM'],","			  *		P: ['am', 'pm'],","			  *		r: '%I:%M:%S %p',","			  *		x: '%d/%m/%y',","			  *		X: '%T'","			  *	}","			  *);</code></pre>","			  *","			  * @method _getLocaleMap","			  * @protected","			  * @return {Object}","			  */","			_getLocaleMap: function() {","				var instance = this;","","				return A.DataType.Date.Locale[ instance.get(LOCALE) ];","			},","","			/**","			 * Get a month name of the passed month from the locale map.","			 *","			 * @method _getMonthName","			 * @param {Number} month","			 * @protected","			 * @return {String}","			 */","			_getMonthName: function(month) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.B[month];","			},","","			/**","			 * Get a short month name of the passed month from the locale map.","			 *","			 * @method _getMonthNameShort","			 * @param {Number} month","			 * @protected","			 * @return {String}","			 */","			_getMonthNameShort: function(month) {","				var instance = this;","				var localeMap = instance._getLocaleMap();","","				return localeMap.b[month];","			},","","			/**","			 * Get the number of days with overlaps the first day of the month and the first day of the first week of the month.","			 *","			 * @method _getMonthOverlapDaysOffset","			 * @protected","			 * @return number","			 */","			_getMonthOverlapDaysOffset: function() {","				var instance = this;","","				return Math.abs(DateMath.getDayOffset(instance.getFirstDayOfWeek(), instance.findMonthStart()));","			},","","			/**","			 * Object data containing all the information needed to the select event.","			 *","			 * @method _getSelectEventData","			 * @protected","			 * @return {}","			 */","			_getSelectEventData: function() {","				var instance = this;","","				return {","					date: {","						detailed: instance.getDetailedSelectedDates(),","						formatted: instance.getFormattedSelectedDates(),","						normal: instance.getSelectedDates()","					}","				};","			},","","		    /**","		     * Fires the calendar:select event.","		     *","		     * @method _handleSelectEvent","		     * @param {EventFacade} event calendar:select event facade","		     * @protected","		     */","			_handleSelectEvent: function(event) {","				var instance = this;","","				instance.fire(EV_CALENDAR_SELECT, instance._getSelectEventData());","			},","","			/**","			 * Returns an Object with the current day, month and year.","			 *","			 * @method _normalizeYearMonth","			 * @param {Number} year Year in the format YYYY.","			 * @param {Number} month 0 for January 11 for December.","			 * @param {Number} day","			 * @protected","			 * @return {Object}","			 */","			_normalizeYearMonth: function(year, month, day) {","				var instance = this;","","				if (!isValue(day)) {","					day = instance.get(CURRENT_DAY);","				}","","				if (!isValue(month)) {","					month = instance.get(CURRENT_MONTH);","				}","","				if (!isValue(year)) {","					year = instance.get(CURRENT_YEAR);","				}","","				return { year: year, month: month, day: day };","			},","","		    /**","		     * Fires on click days elements.","		     *","		     * @method _onClickDays","		     * @param {EventFacade} event","		     * @protected","		     */","			_onClickDays: function(event) {","				var instance = this;","				var target  = event.currentTarget || event.target;","				var disabled = target.test(DOT+CSS_CALENDAR_DISABLED);","","				if (!disabled) {","					var day = target.attr(DATA_DAY) || target.text();","					var month = target.attr(DATA_MONTH);","					var year = target.attr(DATA_YEAR);","","					if (year) {","						instance.set(CURRENT_YEAR, year);","					}","					if (month) {","						instance.set(CURRENT_MONTH, month);","					}","					if (day) {","						instance.set(CURRENT_DAY, day);","					}","","					var currentDate = instance.getCurrentDate();","","					if (instance.isAlreadySelected(currentDate)) {","						instance.removeDate(currentDate);","					}","					else {","						instance.selectCurrentDate();","					}","				}","			},","","		    /**","		     * Fires on mouseenter days elements.","		     *","		     * @method _onMouseEnterDays","		     * @param {EventFacade} event","		     * @protected","		     */","			_onMouseEnterDays: function(event) {","				var instance = this;","				var target  = event.currentTarget || event.target;","","				target.replaceClass(CSS_STATE_DEFAULT, CSS_STATE_HOVER);","			},","","		    /**","		     * Fires on mouseleave days elements.","		     *","		     * @method _onMouseLeaveDays","		     * @param {EventFacade} event","		     * @protected","		     */","			_onMouseLeaveDays: function(event) {","				var instance = this;","				var target  = event.currentTarget || event.target;","","				target.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);","			},","","			_preventDefaultFn: function(event) {","				event.preventDefault();","			},","","			/**","			 * Render Calendar DOM blank days elements. Blank days are used to align","		     * with the week day column.","			 *","			 * @method _renderBlankDays","			 * @protected","			 */","			_renderBlankDays: function() {","				var instance = this;","","				instance.blankDays.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar icon controls elements.","			 *","			 * @method _renderIconControls","			 * @protected","			 */","			_renderIconControls: function() {","				var instance = this;","","				instance.headerContentNode.append(","					instance.iconNextNode","				);","","				instance.headerContentNode.append(","					instance.iconPrevNode","				);","			},","","			/**","			 * Render Calendar DOM month days elements.","			 *","			 * @method _renderMonthDays","			 * @protected","			 */","			_renderMonthDays: function() {","				var instance = this;","","				instance.monthDays.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.","			 *","			 * @method _renderPaddingDaysEnd","			 * @protected","			 */","			_renderPaddingDaysEnd: function() {","				var instance = this;","","				instance.paddingDaysEnd.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.","			 *","			 * @method _renderPaddingDaysStart","			 * @protected","			 */","			_renderPaddingDaysStart: function() {","				var instance = this;","","				instance.paddingDaysStart.appendTo(","					instance.monthDaysNode","				);","			},","","			/**","			 * Render Calendar title node element.","			 *","			 * @method _renderTitleNode","			 * @protected","			 */","			_renderTitleNode: function() {","				var instance = this;","","				instance.headerContentNode.append(","					instance.headerTitleNode","				);","			},","","			/**","			 * Render Calendar DOM week days elements.","			 *","			 * @method _renderWeekDays","			 * @protected","			 */","			_renderWeekDays: function() {","				var instance = this;","","				instance.weekDays.appendTo(","					instance.weekDaysNode","				);","			},","","			_repeateTemplate: function(template, times) {","				var instance = this;","				var buffer = [];","","				while (times--) {","					buffer.push(template);","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">dates</a> attribute.","			 *","			 * @method _setDates","			 * @param {Array} value","			 * @protected","			 * @return {Array}","			 */","			_setDates: function(value) {","				var instance = this;","","				A.Array.each(value, function(date, index) {","					if (isString(date)) {","						value[index] = A.DataType.Date.parse( date );","					}","				});","","				// Set current date to be the last passed date","				instance.setCurrentDate(","					value[value.length - 1]","				);","","				return value;","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">currentDay</a> attribute.","			 *","			 * @method _setDay","			 * @param int value","			 * @protected","			 * @return number","			 */","			_setDay: function(value) {","				var instance = this;","","				return instance._getDateValue(value, 'getDate');","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_maxDates\">maxDates</a> or","		     * <a href=\"Calendar.html#config_mainDates\">minDates</a> attributes.","			 *","			 * @method _setMinMaxDate","			 * @param {Date} value","			 * @protected","			 * @return {Date}","			 */","			_setMinMaxDate: function(value) {","				var instance = this;","","				if (isString(value)) {","					value = A.DataType.Date.parse( value );","				}","","				return value;","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">currentMonth</a> attribute.","			 *","			 * @method _setMonth","			 * @param int value","			 * @protected","			 * @return number","			 */","			_setMonth: function(value) {","				var instance = this;","","				return instance._getDateValue(value, 'getMonth');","			},","","			/**","			 * Setter for the <a href=\"Calendar.html#config_dates\">currentYear</a> attribute.","			 *","			 * @method _setYear","			 * @param int value","			 * @protected","			 * @return number","			 */","			_setYear: function(value) {","				var instance = this;","","				return instance._getDateValue(value, 'getFullYear');","			},","","			/**","			 * Sync Calendar header UI.","			 *","			 * @method _syncHeader","			 * @protected","			 */","			_syncHeader: function() {","				var instance = this;","				var currentMonth = instance.get(CURRENT_MONTH);","				var currentYear = instance.get(CURRENT_YEAR);","","				var title = [ instance._getMonthName(currentMonth), currentYear ].join(SPACE);","","				instance.headerTitleNode.html(title);","			},","","			/**","			 * Sync Calendar month days UI.","			 *","			 * @method _syncMonthDays","			 * @protected","			 */","			_syncMonthDays: function() {","				var instance = this;","				var daysInMonth = instance.getDaysInMonth();","				var rangeDate = instance.getCurrentDate();","","				// Sync month days","				instance.monthDays.each(","					function(node, index) {","						node.toggleClass(CSS_HELPER_HIDDEN, (index >= daysInMonth));","","						rangeDate.setDate(index + 1);","						instance._checkNodeRange(node, rangeDate);","					}","				);","			},","","			/**","			 * Sync Calendar padding end days UI.","			 *","			 * @method _syncPaddingEnd","			 * @protected","			 */","			_syncPaddingEnd: function() {","				var instance = this;","","				// Sync padding end nodes","				if (instance.get(SHOW_OTHER_MONTH)) {","					var nextMonthDate = instance.getCurrentDate(0, +1);","					var totalVisiblePaddingEnd = (INT_MATRIX_DAYS_LENGTH - (instance._getMonthOverlapDaysOffset() + instance.getDaysInMonth()));","","","					// Sync blank or padding start nodes","					instance.paddingDaysEnd.each(","						function(node, index) {","							node.toggleClass(CSS_HELPER_HIDDEN, (index >= totalVisiblePaddingEnd));","","							nextMonthDate.setDate(index + 1);","							instance._bindDataAttrs(node, nextMonthDate);","							instance._checkNodeRange(node, nextMonthDate);","						}","					);","				}","			},","","			/**","			 * Sync Calendar padding start days UI.","			 *","			 * @method _syncPaddingStart","			 * @protected","			 */","			_syncPaddingStart: function() {","				var instance = this;","				var showOtherMonth = instance.get(SHOW_OTHER_MONTH);","				var prevMonthDate = instance.getCurrentDate(0, -1);","				var totalPrevMonthDays = instance.getDaysInMonth(null, prevMonthDate.getMonth());","				var paddingNodes = (showOtherMonth ? instance.paddingDaysStart : instance.blankDays);","				var totalPadding = paddingNodes.size();","				var totalVisible = instance._getMonthOverlapDaysOffset();","","				// Sync blank or padding start nodes","				paddingNodes.each(","					function(node, index) {","						var totalHidden = (totalPadding - totalVisible);","","						node.toggleClass(CSS_HELPER_HIDDEN, (index < totalHidden));","","						if (showOtherMonth) {","							var dayNumber = (totalPrevMonthDays - totalPadding) + (index + 1);","","							node.html(dayNumber);","							prevMonthDate.setDate(dayNumber);","							instance._bindDataAttrs(node, prevMonthDate);","							instance._checkNodeRange(node, prevMonthDate);","						}","					}","				);","			},","","			/**","			 * Sync Calendar selected days UI.","			 *","			 * @method _syncSelectedDays","			 * @protected","			 */","			_syncSelectedDays: function(dates) {","				var instance = this;","				var currentMonth = instance.get(CURRENT_MONTH);","				var currentYear = instance.get(CURRENT_YEAR);","","				instance.monthDays.replaceClass(CSS_STATE_ACTIVE, CSS_STATE_DEFAULT);","				instance.monthDays.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);","","				instance.eachSelectedDate(","					function(date, index) {","						var canSelectDays = (currentMonth == date.getMonth()) && (currentYear == date.getFullYear());","","						if (canSelectDays) {","							var dayNode = instance.monthDays.item( date.getDate() - 1 );","","							dayNode.addClass(CSS_STATE_ACTIVE);","","							try {","								// focus the last selected date","								// IE doesn't support focus on hidden elements","								dayNode.focus();","							}","							catch (err) {}","						}","					},","					dates","				);","			},","","			/**","			 * Sync Calendar StdContent.","			 *","			 * @method _syncStdContent","			 * @protected","			 */","			_syncStdContent: function() {","				var instance = this;","				var bodyContent = A.Node.create('<div></div>');","				var footContent = A.Node.create('<div class=\"' + CSS_HELPER_CLEARFIX + '\"></div>');","","				bodyContent.append(instance.weekDaysNode);","				bodyContent.append(instance.monthDaysNode);","","				footContent.append(instance.todayLinkNode);","				footContent.append(instance.noneLinkNode);","","				instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode.getDOM());","				instance.setStdModContent(WidgetStdMod.BODY, bodyContent);","				instance.setStdModContent(WidgetStdMod.FOOTER, footContent);","			},","","			/**","			 * Sync Calendar header, days and selected days UI.","			 *","			 * @method _syncView","			 * @protected","			 */","			_syncView: function() {","				var instance = this;","","				instance._syncMonthDays();","				instance._syncHeader();","				instance._syncSelectedDays();","","				instance._uiSetShowOtherMonth(","					instance.get(SHOW_OTHER_MONTH)","				);","			},","","			/**","			 * Sync the UI of the Calendar when showToday attribute change.","			 *","			 * @method _uiSetShowToday","			 * @protected","			 */","			_uiSetAllowNone: function(val) {","				var instance = this;","","				instance._conditionalToggle(instance.noneLinkNode, val);","			},","","			/**","			 * Sync the UI of the Calendar when dates attribute change.","			 *","			 * @method _uiSetDates","			 * @protected","			 */","			_uiSetDates: function(val) {","				var instance = this;","","				instance._syncView();","			},","","			/**","			 * Sync the UI of the Calendar when showOtherMonth attribute change.","			 *","			 * @method _uiSetShowOtherMonth","			 * @protected","			 */","			_uiSetShowOtherMonth: function(val) {","				var instance = this;","","				if (val) {","					instance.blankDays.hide();","				}","				else {","					instance.paddingDaysEnd.hide();","					instance.paddingDaysStart.hide();","				}","","				instance._syncPaddingEnd();","				instance._syncPaddingStart();","			},","","			/**","			 * Sync the UI of the Calendar when showToday attribute change.","			 *","			 * @method _uiSetShowToday","			 * @protected","			 */","			_uiSetShowToday: function(val) {","				var instance = this;","","				instance._conditionalToggle(instance.todayLinkNode, val);","			},","","			/**","			 * Default value for blankDays attribute, passed as valueFn.","			 *","			 * @method _valueBlankDays","			 * @protected","			 */","			_valueBlankDays: function() {","				return this._repeateTemplate(TPL_CALENDAR_DAY_BLANK, DateMath.WEEK_LENGTH);","			},","","			/**","			 * Default value for monthDays attribute, passed as valueFn.","			 *","			 * @method _valueMonthDays","			 * @protected","			 */","			_valueMonthDays: function() {","				var instance = this;","","				var day = 0;","				var buffer = [];","","				while (day++ < DateMath.MAX_MONTH_LENGTH) {","					TPL_BUFFER_MONTH_DAYS[1] = day;","","					buffer.push(TPL_BUFFER_MONTH_DAYS.join(EMPTY_STR));","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			},","","			/**","			 * Default value for paddingDaysEnd attribute, passed as valueFn.","			 *","			 * @method _valuePaddingDaysEnd","			 * @protected","			 */","			_valuePaddingDaysEnd: function() {","				var instance = this;","				var buffer = [];","				var day = 0;","","				while (day++ <= INT_MAX_PADDING_END) {","					TPL_CALENDAR_DAY_PADDING_END[1] = day;","","					buffer.push(TPL_CALENDAR_DAY_PADDING_END.join(EMPTY_STR));","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			},","","			/**","			 * Default value for paddingDaysStart attribute, passed as valueFn.","			 *","			 * @method _valuePaddingDaysStart","			 * @protected","			 */","			_valuePaddingDaysStart: function() {","				return this._repeateTemplate(TPL_CALENDAR_DAY_PADDING_START, DateMath.WEEK_LENGTH);","			},","","			/**","			 * Default value for weekDays attribute, passed as valueFn.","			 *","			 * @method _valueWeekDays","			 * @protected","			 */","			_valueWeekDays: function() {","				var instance = this;","				var day = 0;","				var buffer = [];","				var firstWeekDay = instance.get(FIRST_DAY_OF_WEEK);","","				while(day < DateMath.WEEK_LENGTH) {","					var fixedDay = (day++ + firstWeekDay) % DateMath.WEEK_LENGTH;","","					TPL_BUFFER_WEEKDAYS[1] = instance._getDayNameMin(fixedDay);","","					buffer.push(TPL_BUFFER_WEEKDAYS.join(EMPTY_STR));","				}","","				return A.NodeList.create(buffer.join(EMPTY_STR));","			}","		}","	}",");","","Calendar.EMPTY_DATES = EMPTY_DATES;","","A.Calendar = A.Base.create(CALENDAR, Calendar, [A.WidgetStdMod]);","","}, '@VERSION@' ,{requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale'], skinnable:true});"];
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].lines = {"1":0,"12":0,"181":0,"314":0,"329":0,"344":0,"359":0,"413":0,"428":0,"520":0,"548":0,"563":0,"565":0,"569":0,"571":0,"575":0,"577":0,"581":0,"583":0,"587":0,"589":0,"621":0,"623":0,"633":0,"634":0,"636":0,"645":0,"647":0,"660":0,"662":0,"674":0,"675":0,"677":0,"690":0,"691":0,"693":0,"703":0,"704":0,"705":0,"706":0,"707":0,"709":0,"711":0,"712":0,"715":0,"727":0,"728":0,"730":0,"745":0,"746":0,"748":0,"749":0,"756":0,"768":0,"769":0,"771":0,"782":0,"783":0,"785":0,"786":0,"789":0,"799":0,"801":0,"812":0,"813":0,"815":0,"816":0,"817":0,"821":0,"833":0,"834":0,"835":0,"837":0,"841":0,"844":0,"855":0,"856":0,"859":0,"860":0,"862":0,"873":0,"874":0,"876":0,"878":0,"879":0,"884":0,"895":0,"898":0,"899":0,"900":0,"901":0,"902":0,"903":0,"904":0,"905":0,"906":0,"907":0,"908":0,"909":0,"910":0,"912":0,"913":0,"914":0,"915":0,"916":0,"917":0,"918":0,"929":0,"930":0,"932":0,"933":0,"936":0,"937":0,"940":0,"941":0,"952":0,"954":0,"964":0,"966":0,"975":0,"977":0,"987":0,"989":0,"991":0,"992":0,"993":0,"1004":0,"1006":0,"1016":0,"1017":0,"1018":0,"1020":0,"1021":0,"1023":0,"1024":0,"1025":0,"1026":0,"1027":0,"1028":0,"1030":0,"1034":0,"1035":0,"1039":0,"1041":0,"1057":0,"1061":0,"1063":0,"1064":0,"1067":0,"1078":0,"1081":0,"1082":0,"1091":0,"1095":0,"1097":0,"1098":0,"1101":0,"1104":0,"1116":0,"1117":0,"1119":0,"1131":0,"1132":0,"1134":0,"1146":0,"1147":0,"1149":0,"1176":0,"1178":0,"1190":0,"1191":0,"1193":0,"1205":0,"1206":0,"1208":0,"1219":0,"1221":0,"1232":0,"1234":0,"1251":0,"1253":0,"1267":0,"1269":0,"1270":0,"1273":0,"1274":0,"1277":0,"1278":0,"1281":0,"1292":0,"1293":0,"1294":0,"1296":0,"1297":0,"1298":0,"1299":0,"1301":0,"1302":0,"1304":0,"1305":0,"1307":0,"1308":0,"1311":0,"1313":0,"1314":0,"1317":0,"1330":0,"1331":0,"1333":0,"1344":0,"1345":0,"1347":0,"1351":0,"1362":0,"1364":0,"1376":0,"1378":0,"1382":0,"1394":0,"1396":0,"1408":0,"1410":0,"1422":0,"1424":0,"1436":0,"1438":0,"1450":0,"1452":0,"1458":0,"1459":0,"1461":0,"1462":0,"1465":0,"1477":0,"1479":0,"1480":0,"1481":0,"1486":0,"1490":0,"1502":0,"1504":0,"1517":0,"1519":0,"1520":0,"1523":0,"1535":0,"1537":0,"1549":0,"1551":0,"1561":0,"1562":0,"1563":0,"1565":0,"1567":0,"1577":0,"1578":0,"1579":0,"1582":0,"1584":0,"1586":0,"1587":0,"1599":0,"1602":0,"1603":0,"1604":0,"1608":0,"1610":0,"1612":0,"1613":0,"1614":0,"1627":0,"1628":0,"1629":0,"1630":0,"1631":0,"1632":0,"1633":0,"1636":0,"1638":0,"1640":0,"1642":0,"1643":0,"1645":0,"1646":0,"1647":0,"1648":0,"1661":0,"1662":0,"1663":0,"1665":0,"1666":0,"1668":0,"1670":0,"1672":0,"1673":0,"1675":0,"1677":0,"1680":0,"1696":0,"1697":0,"1698":0,"1700":0,"1701":0,"1703":0,"1704":0,"1706":0,"1707":0,"1708":0,"1718":0,"1720":0,"1721":0,"1722":0,"1724":0,"1736":0,"1738":0,"1748":0,"1750":0,"1760":0,"1762":0,"1763":0,"1766":0,"1767":0,"1770":0,"1771":0,"1781":0,"1783":0,"1793":0,"1803":0,"1805":0,"1806":0,"1808":0,"1809":0,"1811":0,"1814":0,"1824":0,"1825":0,"1826":0,"1828":0,"1829":0,"1831":0,"1834":0,"1844":0,"1854":0,"1855":0,"1856":0,"1857":0,"1859":0,"1860":0,"1862":0,"1864":0,"1867":0,"1873":0,"1875":0};
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].functions = {"valueFn:313":0,"valueFn:328":0,"valueFn:343":0,"valueFn:358":0,"valueFn:412":0,"valueFn:427":0,"valueFn:519":0,"valueFn:547":0,"blankDays:562":0,"monthDays:568":0,"paddingDaysEnd:574":0,"paddingDaysStart:580":0,"weekDays:586":0,"initializer:620":0,"bindUI:632":0,"clear:644":0,"eachSelectedDate:659":0,"findMonthStart:673":0,"formatDate:689":0,"getCurrentDate:702":0,"getDaysInMonth:726":0,"(anonymous 2):748":0,"getDetailedSelectedDates:744":0,"getFirstDayOfWeek:767":0,"(anonymous 3):785":0,"getFormattedSelectedDates:781":0,"getSelectedDates:798":0,"(anonymous 4):815":0,"isAlreadySelected:811":0,"isOutOfRangeDate:832":0,"navigateMonth:854":0,"(anonymous 5):877":0,"removeDate:872":0,"renderUI:894":0,"selectCurrentDate:928":0,"selectNextMonth:951":0,"selectPrevMonth:963":0,"selectToday:974":0,"setCurrentDate:986":0,"syncUI:1003":0,"_bindDelegate:1015":0,"_bindDataAttrs:1033":0,"_checkNodeRange:1038":0,"_compareDates:1056":0,"_conditionalToggle:1060":0,"publish:1081":0,"_createEvents:1077":0,"_getDateValue:1094":0,"_getDayName:1115":0,"_getDayNameShort:1130":0,"_getDayNameMin:1145":0,"_getLocaleMap:1175":0,"_getMonthName:1189":0,"_getMonthNameShort:1204":0,"_getMonthOverlapDaysOffset:1218":0,"_getSelectEventData:1231":0,"_handleSelectEvent:1250":0,"_normalizeYearMonth:1266":0,"_onClickDays:1291":0,"_onMouseEnterDays:1329":0,"_onMouseLeaveDays:1343":0,"_preventDefaultFn:1350":0,"_renderBlankDays:1361":0,"_renderIconControls:1375":0,"_renderMonthDays:1393":0,"_renderPaddingDaysEnd:1407":0,"_renderPaddingDaysStart:1421":0,"_renderTitleNode:1435":0,"_renderWeekDays:1449":0,"_repeateTemplate:1457":0,"(anonymous 6):1479":0,"_setDates:1476":0,"_setDay:1501":0,"_setMinMaxDate:1516":0,"_setMonth:1534":0,"_setYear:1548":0,"_syncHeader:1560":0,"(anonymous 7):1583":0,"_syncMonthDays:1576":0,"(anonymous 8):1609":0,"_syncPaddingEnd:1598":0,"(anonymous 9):1637":0,"_syncPaddingStart:1626":0,"(anonymous 10):1669":0,"_syncSelectedDays:1660":0,"_syncStdContent:1695":0,"_syncView:1717":0,"_uiSetAllowNone:1735":0,"_uiSetDates:1747":0,"_uiSetShowOtherMonth:1759":0,"_uiSetShowToday:1780":0,"_valueBlankDays:1792":0,"_valueMonthDays:1802":0,"_valuePaddingDaysEnd:1823":0,"_valuePaddingDaysStart:1843":0,"_valueWeekDays:1853":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-calendar/aui-calendar.js"].coveredLines = 353;
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
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 705);
var newDay = date.day + toInt(offsetDay);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 706);
var newMonth = date.month + toInt(offsetMonth);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 707);
var newYear = date.year + toInt(offsetYear);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 709);
var totalMonthDays = instance.getDaysInMonth(date.year, newMonth);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 711);
if (newDay > totalMonthDays) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 712);
newDay = totalMonthDays;
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 715);
return DateMath.getDate(newYear, newMonth, newDay);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getDaysInMonth", 726);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 727);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 728);
var date = instance._normalizeYearMonth(year, month);

		        _yuitest_coverline("/build/aui-calendar/aui-calendar.js", 730);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getDetailedSelectedDates", 744);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 745);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 746);
var dates = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 748);
instance.eachSelectedDate(function(date) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 2)", 748);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 749);
dates.push({
						year: date.getFullYear(),
						month: date.getMonth(),
						day: date.getDate()
					});
				});

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 756);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getFirstDayOfWeek", 767);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 768);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 769);
var firstDayOfWeek = instance.get(FIRST_DAY_OF_WEEK);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 771);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getFormattedSelectedDates", 781);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 782);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 783);
var dates = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 785);
instance.eachSelectedDate(function(date) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 3)", 785);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 786);
dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );
				});

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 789);
return dates;
			},

			/**
			 * Get the selected dates.
			 *
			 * @method getSelectedDates
			 * @return {Array}
			 */
			getSelectedDates: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "getSelectedDates", 798);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 799);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 801);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "isAlreadySelected", 811);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 812);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 813);
var isAlreadySelected = false;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 815);
instance.eachSelectedDate(function(d, index) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 4)", 815);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 816);
if (instance._compareDates(d, date)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 817);
isAlreadySelected = true;
					}
				});

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 821);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "isOutOfRangeDate", 832);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 833);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 834);
var maxDate = instance.get(MAX_DATE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 835);
var minDate = instance.get(MIN_DATE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 837);
if ((!minDate && !maxDate) ||
					instance._compareDates(date, minDate) ||
					instance._compareDates(date, maxDate)) {

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 841);
return false;
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 844);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "navigateMonth", 854);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 855);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 856);
var date = instance.getCurrentDate(0, offset);

				// when navigate by month update the year also
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 859);
instance.set(CURRENT_MONTH, date.getMonth());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 860);
instance.set(CURRENT_YEAR, date.getFullYear());

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 862);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "removeDate", 872);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 873);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 874);
var dates = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 876);
instance.eachSelectedDate(
					function(d, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 5)", 877);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 878);
if (!instance._compareDates(d, date)) {
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 879);
dates.push(d);
						}
					}
				);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 884);
instance.set(DATES, dates);
			},


			/**
			 * Create the DOM structure for the Calendar. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "renderUI", 894);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 895);
var instance = this;

				// creating properties references for performance
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 898);
instance.blankDays = instance.get(BLANK_DAYS);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 899);
instance.headerContentNode = instance.get(HEADER_CONTENT_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 900);
instance.headerTitleNode = instance.get(HEADER_TITLE_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 901);
instance.iconNextNode = instance.get(ICON_NEXT_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 902);
instance.iconPrevNode = instance.get(ICON_PREV_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 903);
instance.monthDays = instance.get(MONTH_DAYS);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 904);
instance.monthDaysNode = instance.get(MONTH_DAYS_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 905);
instance.noneLinkNode = instance.get(NONE_LINK_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 906);
instance.paddingDaysEnd = instance.get(PADDING_DAYS_END);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 907);
instance.paddingDaysStart = instance.get(PADDING_DAYS_START);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 908);
instance.todayLinkNode = instance.get(TODAY_LINK_NODE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 909);
instance.weekDays = instance.get(WEEK_DAYS);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 910);
instance.weekDaysNode = instance.get(WEEK_DAYS_NODE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 912);
instance._renderWeekDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 913);
instance._renderBlankDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 914);
instance._renderPaddingDaysStart();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 915);
instance._renderMonthDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 916);
instance._renderPaddingDaysEnd();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 917);
instance._renderIconControls();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 918);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectCurrentDate", 928);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 929);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 930);
var currentDate = instance.getCurrentDate();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 932);
if (!instance.isAlreadySelected(currentDate)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 933);
var dates = instance.get(DATES);

					// if is single selection reset the selected dates
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 936);
if (!instance.get(SELECT_MULTIPLE_DATES)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 937);
dates = [];
					}

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 940);
dates.push(currentDate);
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 941);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectNextMonth", 951);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 952);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 954);
instance.navigateMonth(+1);
			},

			/**
			 * Navigate to the previous month. Fired from the previous icon on the
			 * Calendar header.
			 *
			 * @method selectPrevMonth
			 */
			selectPrevMonth: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectPrevMonth", 963);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 964);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 966);
instance.navigateMonth(-1);
			},

			/**
			 * Select today date on the Calendar.
			 *
			 * @method selectToday
			 */
			selectToday: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "selectToday", 974);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 975);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 977);
instance.set(DATES, [ new Date() ]);
			},

		    /**
		     * Update the currentDay, currentMonth and currentYear values.
		     *
		     * @method setCurrentDate
		     * @param {Date} date
		     */
			setCurrentDate: function(date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "setCurrentDate", 986);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 987);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 989);
if (isDate(date)) {
					// update the current values to the last selected date
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 991);
instance.set(CURRENT_DAY, date.getDate());
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 992);
instance.set(CURRENT_MONTH, date.getMonth());
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 993);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "syncUI", 1003);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1004);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1006);
instance._syncStdContent();
			},

			/**
			 * Bind DOM events to the UI.
			 *
			 * @method _bindDelegate
			 * @private
			 */
			_bindDelegate: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_bindDelegate", 1015);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1016);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1017);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1018);
var headerContentNode = instance.headerContentNode;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1020);
headerContentNode.delegate('click', instance.selectNextMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_R, instance);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1021);
headerContentNode.delegate('click', instance.selectPrevMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_L, instance);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1023);
boundingBox.delegate('click', instance._preventDefaultFn, ANCHOR);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1024);
boundingBox.delegate('click', A.bind(instance.selectToday, instance), DOT+CSS_CALENDAR_LINK_TODAY);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1025);
boundingBox.delegate('click', A.bind(instance.clear, instance), DOT+CSS_CALENDAR_LINK_NONE);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1026);
boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1027);
boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1028);
boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1030);
instance.after('datesChange', instance._handleSelectEvent);
			},

			_bindDataAttrs: function(node, date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_bindDataAttrs", 1033);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1034);
node.attr(DATA_YEAR, date.getFullYear());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1035);
node.attr(DATA_MONTH, date.getMonth());
			},

			_checkNodeRange: function(node, date) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_checkNodeRange", 1038);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1039);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1041);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_compareDates", 1056);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1057);
return ( d1 && d2 && (d1.getTime() == d2.getTime()) );
			},

			_conditionalToggle: function(node, show) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_conditionalToggle", 1060);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1061);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1063);
if (show) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1064);
node.show();
				}
				else {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1067);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_createEvents", 1077);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1078);
var instance = this;

				// create publish function for kweight optimization
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1081);
var publish = function(name, fn) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "publish", 1081);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1082);
instance.publish(name, {
			            defaultFn: fn,
			            queuable: false,
			            emitFacade: true,
			            bubbles: true,
			            prefix: CALENDAR
			        });
				};

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1091);
publish(EV_CALENDAR_SELECT);
			},

			_getDateValue: function(value, methodName) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDateValue", 1094);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1095);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1097);
if (value == -1) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1098);
value = A.Attribute.INVALID_VALUE;
				}
				else {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1101);
value = toInt(value);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1104);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDayName", 1115);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1116);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1117);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1119);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDayNameShort", 1130);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1131);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1132);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1134);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getDayNameMin", 1145);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1146);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1147);
var name = instance._getDayNameShort(weekDay);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1149);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getLocaleMap", 1175);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1176);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1178);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getMonthName", 1189);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1190);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1191);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1193);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getMonthNameShort", 1204);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1205);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1206);
var localeMap = instance._getLocaleMap();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1208);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getMonthOverlapDaysOffset", 1218);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1219);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1221);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_getSelectEventData", 1231);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1232);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1234);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_handleSelectEvent", 1250);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1251);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1253);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_normalizeYearMonth", 1266);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1267);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1269);
if (!isValue(day)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1270);
day = instance.get(CURRENT_DAY);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1273);
if (!isValue(month)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1274);
month = instance.get(CURRENT_MONTH);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1277);
if (!isValue(year)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1278);
year = instance.get(CURRENT_YEAR);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1281);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_onClickDays", 1291);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1292);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1293);
var target  = event.currentTarget || event.target;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1294);
var disabled = target.test(DOT+CSS_CALENDAR_DISABLED);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1296);
if (!disabled) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1297);
var day = target.attr(DATA_DAY) || target.text();
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1298);
var month = target.attr(DATA_MONTH);
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1299);
var year = target.attr(DATA_YEAR);

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1301);
if (year) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1302);
instance.set(CURRENT_YEAR, year);
					}
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1304);
if (month) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1305);
instance.set(CURRENT_MONTH, month);
					}
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1307);
if (day) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1308);
instance.set(CURRENT_DAY, day);
					}

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1311);
var currentDate = instance.getCurrentDate();

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1313);
if (instance.isAlreadySelected(currentDate)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1314);
instance.removeDate(currentDate);
					}
					else {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1317);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_onMouseEnterDays", 1329);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1330);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1331);
var target  = event.currentTarget || event.target;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1333);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_onMouseLeaveDays", 1343);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1344);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1345);
var target  = event.currentTarget || event.target;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1347);
target.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);
			},

			_preventDefaultFn: function(event) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_preventDefaultFn", 1350);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1351);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderBlankDays", 1361);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1362);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1364);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderIconControls", 1375);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1376);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1378);
instance.headerContentNode.append(
					instance.iconNextNode
				);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1382);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderMonthDays", 1393);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1394);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1396);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderPaddingDaysEnd", 1407);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1408);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1410);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderPaddingDaysStart", 1421);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1422);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1424);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderTitleNode", 1435);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1436);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1438);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_renderWeekDays", 1449);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1450);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1452);
instance.weekDays.appendTo(
					instance.weekDaysNode
				);
			},

			_repeateTemplate: function(template, times) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_repeateTemplate", 1457);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1458);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1459);
var buffer = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1461);
while (times--) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1462);
buffer.push(template);
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1465);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setDates", 1476);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1477);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1479);
A.Array.each(value, function(date, index) {
					_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 6)", 1479);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1480);
if (isString(date)) {
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1481);
value[index] = A.DataType.Date.parse( date );
					}
				});

				// Set current date to be the last passed date
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1486);
instance.setCurrentDate(
					value[value.length - 1]
				);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1490);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setDay", 1501);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1502);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1504);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setMinMaxDate", 1516);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1517);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1519);
if (isString(value)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1520);
value = A.DataType.Date.parse( value );
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1523);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setMonth", 1534);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1535);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1537);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_setYear", 1548);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1549);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1551);
return instance._getDateValue(value, 'getFullYear');
			},

			/**
			 * Sync Calendar header UI.
			 *
			 * @method _syncHeader
			 * @protected
			 */
			_syncHeader: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncHeader", 1560);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1561);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1562);
var currentMonth = instance.get(CURRENT_MONTH);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1563);
var currentYear = instance.get(CURRENT_YEAR);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1565);
var title = [ instance._getMonthName(currentMonth), currentYear ].join(SPACE);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1567);
instance.headerTitleNode.html(title);
			},

			/**
			 * Sync Calendar month days UI.
			 *
			 * @method _syncMonthDays
			 * @protected
			 */
			_syncMonthDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncMonthDays", 1576);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1577);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1578);
var daysInMonth = instance.getDaysInMonth();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1579);
var rangeDate = instance.getCurrentDate();

				// Sync month days
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1582);
instance.monthDays.each(
					function(node, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 7)", 1583);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1584);
node.toggleClass(CSS_HELPER_HIDDEN, (index >= daysInMonth));

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1586);
rangeDate.setDate(index + 1);
						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1587);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncPaddingEnd", 1598);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1599);
var instance = this;

				// Sync padding end nodes
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1602);
if (instance.get(SHOW_OTHER_MONTH)) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1603);
var nextMonthDate = instance.getCurrentDate(0, +1);
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1604);
var totalVisiblePaddingEnd = (INT_MATRIX_DAYS_LENGTH - (instance._getMonthOverlapDaysOffset() + instance.getDaysInMonth()));


					// Sync blank or padding start nodes
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1608);
instance.paddingDaysEnd.each(
						function(node, index) {
							_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 8)", 1609);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1610);
node.toggleClass(CSS_HELPER_HIDDEN, (index >= totalVisiblePaddingEnd));

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1612);
nextMonthDate.setDate(index + 1);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1613);
instance._bindDataAttrs(node, nextMonthDate);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1614);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncPaddingStart", 1626);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1627);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1628);
var showOtherMonth = instance.get(SHOW_OTHER_MONTH);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1629);
var prevMonthDate = instance.getCurrentDate(0, -1);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1630);
var totalPrevMonthDays = instance.getDaysInMonth(null, prevMonthDate.getMonth());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1631);
var paddingNodes = (showOtherMonth ? instance.paddingDaysStart : instance.blankDays);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1632);
var totalPadding = paddingNodes.size();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1633);
var totalVisible = instance._getMonthOverlapDaysOffset();

				// Sync blank or padding start nodes
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1636);
paddingNodes.each(
					function(node, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 9)", 1637);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1638);
var totalHidden = (totalPadding - totalVisible);

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1640);
node.toggleClass(CSS_HELPER_HIDDEN, (index < totalHidden));

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1642);
if (showOtherMonth) {
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1643);
var dayNumber = (totalPrevMonthDays - totalPadding) + (index + 1);

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1645);
node.html(dayNumber);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1646);
prevMonthDate.setDate(dayNumber);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1647);
instance._bindDataAttrs(node, prevMonthDate);
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1648);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncSelectedDays", 1660);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1661);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1662);
var currentMonth = instance.get(CURRENT_MONTH);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1663);
var currentYear = instance.get(CURRENT_YEAR);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1665);
instance.monthDays.replaceClass(CSS_STATE_ACTIVE, CSS_STATE_DEFAULT);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1666);
instance.monthDays.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1668);
instance.eachSelectedDate(
					function(date, index) {
						_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "(anonymous 10)", 1669);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1670);
var canSelectDays = (currentMonth == date.getMonth()) && (currentYear == date.getFullYear());

						_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1672);
if (canSelectDays) {
							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1673);
var dayNode = instance.monthDays.item( date.getDate() - 1 );

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1675);
dayNode.addClass(CSS_STATE_ACTIVE);

							_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1677);
try {
								// focus the last selected date
								// IE doesn't support focus on hidden elements
								_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1680);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncStdContent", 1695);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1696);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1697);
var bodyContent = A.Node.create('<div></div>');
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1698);
var footContent = A.Node.create('<div class="' + CSS_HELPER_CLEARFIX + '"></div>');

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1700);
bodyContent.append(instance.weekDaysNode);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1701);
bodyContent.append(instance.monthDaysNode);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1703);
footContent.append(instance.todayLinkNode);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1704);
footContent.append(instance.noneLinkNode);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1706);
instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode.getDOM());
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1707);
instance.setStdModContent(WidgetStdMod.BODY, bodyContent);
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1708);
instance.setStdModContent(WidgetStdMod.FOOTER, footContent);
			},

			/**
			 * Sync Calendar header, days and selected days UI.
			 *
			 * @method _syncView
			 * @protected
			 */
			_syncView: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_syncView", 1717);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1718);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1720);
instance._syncMonthDays();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1721);
instance._syncHeader();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1722);
instance._syncSelectedDays();

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1724);
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
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetAllowNone", 1735);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1736);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1738);
instance._conditionalToggle(instance.noneLinkNode, val);
			},

			/**
			 * Sync the UI of the Calendar when dates attribute change.
			 *
			 * @method _uiSetDates
			 * @protected
			 */
			_uiSetDates: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetDates", 1747);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1748);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1750);
instance._syncView();
			},

			/**
			 * Sync the UI of the Calendar when showOtherMonth attribute change.
			 *
			 * @method _uiSetShowOtherMonth
			 * @protected
			 */
			_uiSetShowOtherMonth: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetShowOtherMonth", 1759);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1760);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1762);
if (val) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1763);
instance.blankDays.hide();
				}
				else {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1766);
instance.paddingDaysEnd.hide();
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1767);
instance.paddingDaysStart.hide();
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1770);
instance._syncPaddingEnd();
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1771);
instance._syncPaddingStart();
			},

			/**
			 * Sync the UI of the Calendar when showToday attribute change.
			 *
			 * @method _uiSetShowToday
			 * @protected
			 */
			_uiSetShowToday: function(val) {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_uiSetShowToday", 1780);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1781);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1783);
instance._conditionalToggle(instance.todayLinkNode, val);
			},

			/**
			 * Default value for blankDays attribute, passed as valueFn.
			 *
			 * @method _valueBlankDays
			 * @protected
			 */
			_valueBlankDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valueBlankDays", 1792);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1793);
return this._repeateTemplate(TPL_CALENDAR_DAY_BLANK, DateMath.WEEK_LENGTH);
			},

			/**
			 * Default value for monthDays attribute, passed as valueFn.
			 *
			 * @method _valueMonthDays
			 * @protected
			 */
			_valueMonthDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valueMonthDays", 1802);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1803);
var instance = this;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1805);
var day = 0;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1806);
var buffer = [];

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1808);
while (day++ < DateMath.MAX_MONTH_LENGTH) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1809);
TPL_BUFFER_MONTH_DAYS[1] = day;

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1811);
buffer.push(TPL_BUFFER_MONTH_DAYS.join(EMPTY_STR));
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1814);
return A.NodeList.create(buffer.join(EMPTY_STR));
			},

			/**
			 * Default value for paddingDaysEnd attribute, passed as valueFn.
			 *
			 * @method _valuePaddingDaysEnd
			 * @protected
			 */
			_valuePaddingDaysEnd: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valuePaddingDaysEnd", 1823);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1824);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1825);
var buffer = [];
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1826);
var day = 0;

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1828);
while (day++ <= INT_MAX_PADDING_END) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1829);
TPL_CALENDAR_DAY_PADDING_END[1] = day;

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1831);
buffer.push(TPL_CALENDAR_DAY_PADDING_END.join(EMPTY_STR));
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1834);
return A.NodeList.create(buffer.join(EMPTY_STR));
			},

			/**
			 * Default value for paddingDaysStart attribute, passed as valueFn.
			 *
			 * @method _valuePaddingDaysStart
			 * @protected
			 */
			_valuePaddingDaysStart: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valuePaddingDaysStart", 1843);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1844);
return this._repeateTemplate(TPL_CALENDAR_DAY_PADDING_START, DateMath.WEEK_LENGTH);
			},

			/**
			 * Default value for weekDays attribute, passed as valueFn.
			 *
			 * @method _valueWeekDays
			 * @protected
			 */
			_valueWeekDays: function() {
				_yuitest_coverfunc("/build/aui-calendar/aui-calendar.js", "_valueWeekDays", 1853);
_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1854);
var instance = this;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1855);
var day = 0;
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1856);
var buffer = [];
				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1857);
var firstWeekDay = instance.get(FIRST_DAY_OF_WEEK);

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1859);
while(day < DateMath.WEEK_LENGTH) {
					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1860);
var fixedDay = (day++ + firstWeekDay) % DateMath.WEEK_LENGTH;

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1862);
TPL_BUFFER_WEEKDAYS[1] = instance._getDayNameMin(fixedDay);

					_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1864);
buffer.push(TPL_BUFFER_WEEKDAYS.join(EMPTY_STR));
				}

				_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1867);
return A.NodeList.create(buffer.join(EMPTY_STR));
			}
		}
	}
);

_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1873);
Calendar.EMPTY_DATES = EMPTY_DATES;

_yuitest_coverline("/build/aui-calendar/aui-calendar.js", 1875);
A.Calendar = A.Base.create(CALENDAR, Calendar, [A.WidgetStdMod]);

}, '@VERSION@' ,{requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale'], skinnable:true});
