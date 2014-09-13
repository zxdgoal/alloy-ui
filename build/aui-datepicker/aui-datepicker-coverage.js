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
_yuitest_coverage["/build/aui-datepicker/aui-datepicker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-datepicker/aui-datepicker.js",
    code: []
};
_yuitest_coverage["/build/aui-datepicker/aui-datepicker.js"].code=["AUI.add('aui-datepicker-base', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isFunction = Lang.isFunction,","","	CALENDAR = 'calendar',","	CONTENT_BOX = 'contentBox',","	CURRENT_NODE = 'currentNode',","	FORMATTER = 'formatter',","	SELECT_MULTIPLE_DATES = 'selectMultipleDates',","	SET_VALUE = 'setValue',","","	DATEPICKER = 'date-picker';","","var DatePicker = A.Component.create({","	NAME: DATEPICKER,","","	ATTRS: {","		/**","		 * <a href=\"Calendar.html\">Calendar</a> configuration Object.</a>","		 *","		 * @attribute calendar","		 * @default {}","		 * @type Object","		 */","		calendar: {","			setter: '_setCalendar',","			value: {}","		},","","		/**","		 * Function to format the array of the selected dates before set the","         * value of the input.","		 *","		 * @attribute formatter","		 * @default function(dates) { return dates.formatted.join(','); }","		 * @type function","		 */","		formatter: {","			value: function(dates) {","				return dates.formatted.join(',');","			},","			validator: isFunction","		},","","		/**","		 * If true set the selected date with the correct","		 * <a href=\"Calendar.html#config_dateFormat\">dateFormat</a> to the","		 * value of the input field which is hosting the Calendar.","		 *","		 * @attribute setValue","		 * @default true","		 * @type boolean","		 */","		setValue: {","			value: true,","			validator: isBoolean","		},","","		/**","		 * If true is able to do stacking with another overlays.","		 *","		 * @attribute stack","		 * @default true","		 * @type boolean","		 */","		stack: {","			lazyAdd: false,","			value: true,","			setter: '_setStack',","			validator: isBoolean","		},","","		showOn: {","			value: 'mousedown'","		},","","		hideOn: {","			value: 'mousedown'","		}","	},","","	EXTENDS: A.OverlayContext,","","	prototype: {","		/**","		 * Construction logic executed during Datepicker instantiation. Lifecycle.","		 *","		 * @method initializer","		 * @protected","		 */","		initializer: function() {","			var instance = this;","","			instance.calendar = new A.Calendar(","				instance.get(CALENDAR)","			);","		},","","		/**","		 * Bind the events on the Datepicker UI. Lifecycle.","		 *","		 * @method bindUI","		 * @protected","		 */","		bindUI: function() {","			var instance = this;","","			DatePicker.superclass.bindUI.apply(this, arguments);","","			instance.on('show', instance._onShowOverlay);","			instance.after('calendar:select', instance._afterSelectDate);","","			// Set the value of the trigger with the Calendar current date","			if (instance.get(SET_VALUE)) {","				instance._setTriggerValue(","					instance.calendar._getSelectEventData().date","				);","			}","		},","","		/**","		 * Descructor lifecycle implementation for the Datepicker class.","		 * Purges events attached to the node (and all child nodes).","		 *","		 * @method destructor","		 * @protected","		 */","		destructor: function() {","			var instance = this;","","			instance.calendar.destroy();","		},","","		/**","		 * Fires when a date is selected on the Calendar.","		 *","		 * @method _afterSelectDate","		 * @param {Event} event","		 * @protected","		 */","		_afterSelectDate: function(event) {","			var instance = this;","","			if (!instance.calendar.get(SELECT_MULTIPLE_DATES)) {","				instance.hide();","			}","","			if (instance.get(SET_VALUE)) {","				instance._setTriggerValue(event.date);","			}","		},","","		/**","		* Fires before the DatePicker overlay show. Responsible to invoke the","		* render phase of the Calendar.","		 *","		 * @method _onShowOverlay","		 * @param {Event} event","		 * @protected","		 */","		_onShowOverlay: function(event) {","			var instance = this;","","			instance._renderCalendar();","		},","","		/**","		 * Render the Calendar used inside the DatePicker.","		 *","		 * @method _renderCalendar","		 * @protected","		 */","		_renderCalendar: function() {","			var instance = this;","","			instance.calendar.render(","				instance.get(CONTENT_BOX)","			);","		},","","		/**","		 * Setter for the <a href=\"DatePicker.html#calendar\">calendar</a>","	     * attribute.","		 *","		 * @method _setCalendar","		 * @param {String} eventType Event type","		 * @protected","		 * @return {}","		 */","		_setCalendar: function(val) {","			var instance = this;","","			A.mix(val, {","				bubbleTargets: instance","			});","","			return val;","		},","","		/**","		 * Setter for the <a href=\"Calendar.html#config_stack\">stack</a> attribute.","		 *","		 * @method _setStack","		 * @param {boolean} value","		 * @protected","		 * @return {boolean}","		 */","		_setStack: function(value) {","			var instance = this;","","			if (value) {","				A.DatepickerManager.register(instance);","			}","			else {","				A.DatepickerManager.remove(instance);","			}","","			return value;","		},","","		/**","		 * Set the value of the trigger input with the date information.","		 *","		 * @method _setTriggerValue","		 * @param {Object} dateObj Object containing date information","		 * @protected","		 */","		_setTriggerValue: function(dateObj) {","			var instance = this;","","			var value = instance.get(FORMATTER).apply(instance, [dateObj]);","","			instance.get(CURRENT_NODE).val(value);","		}","	}","});","","A.DatePicker = DatePicker;","","/**"," * A base class for DatepickerManager:"," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class DatepickerManager"," * @constructor"," * @extends OverlayManager"," * @static"," */","A.DatepickerManager = new A.OverlayManager({","	/**","	 * ZIndex default value passed to the","     * <a href=\"OverlayManager.html#config_zIndexBase\">zIndexBase</a> of","     * <a href=\"OverlayManager.html\">OverlayManager</a>.","	 *","	 * @attribute zIndexBase","	 * @default 1000","	 * @type Number","	 */","	zIndexBase: 1000","});","","}, '@VERSION@' ,{requires:['aui-calendar','aui-overlay-context'], skinnable:true});","AUI.add('aui-datepicker-select', function(A) {","/**"," * The DatePickerSelect Utility"," *"," * @module aui-calendar"," * @submodule aui-calendar-datepicker-select"," */","","var Lang = A.Lang,","	isArray = Lang.isArray,","","	nodeSetter = function(v) {","		return A.one(v);","	},","","	createSelect = function() {","		return A.Node.create(SELECT_TPL);","	},","","	DOC = A.config.doc,","","	APPEND_ORDER = 'appendOrder',","	BLANK = '',","	BODY = 'body',","	BOUNDING_BOX = 'boundingBox',","	BUTTON = 'button',","	BUTTONITEM = 'buttonitem',","	BUTTON_NODE = 'buttonNode',","	CALENDAR = 'calendar',","	CLEARFIX = 'clearfix',","	CONTENT_BOX = 'contentBox',","	CONTENT = 'content',","	CURRENT_DAY = 'currentDay',","	CURRENT_MONTH = 'currentMonth',","	CURRENT_YEAR = 'currentYear',","	DATA_COMPONENT_ID = 'data-auiComponentID',","	DATEPICKER = 'datepicker',","	DAY = 'day',","	DAY_NODE = 'dayNode',","	DAY_NODE_NAME = 'dayNodeName',","	DISPLAY = 'display',","	DOT = '.',","	HELPER = 'helper',","	ID = 'id',","	MAX_DATE = 'maxDate',","	MIN_DATE = 'minDate',","	MONTH = 'month',","	MONTH_NODE = 'monthNode',","	MONTH_NODE_NAME = 'monthNodeName',","	NAME = 'name',","	NULLABLE_DAY = 'nullableDay',","	NULLABLE_MONTH = 'nullableMonth',","	NULLABLE_YEAR = 'nullableYear',","	OPTION = 'option',","	POPULATE_DAY = 'populateDay',","	POPULATE_MONTH = 'populateMonth',","	POPULATE_YEAR = 'populateYear',","	SELECT = 'select',","	SELECTED = 'selected',","	SELECT_WRAPPER_NODE = 'selectWrapperNode',","	SPACE = ' ',","	SRC_NODE = 'srcNode',","	TRIGGER = 'trigger',","	WRAPPER = 'wrapper',","	YEAR = 'year',","	YEAR_NODE = 'yearNode',","	YEAR_NODE_NAME = 'yearNodeName',","	YEAR_RANGE = 'yearRange',","","	getClassName = A.getClassName,","","	CSS_BUTTONITEM = getClassName(BUTTONITEM),","	CSS_DATEPICKER = getClassName(DATEPICKER),","	CSS_DATEPICKER_BUTTON_WRAPPER = getClassName(DATEPICKER, BUTTON, WRAPPER),","	CSS_DATEPICKER_DAY = getClassName(DATEPICKER, DAY),","	CSS_DATEPICKER_DISPLAY = getClassName(DATEPICKER, DISPLAY),","	CSS_DATEPICKER_DISPLAY_CONTENT = getClassName(DATEPICKER, DISPLAY, CONTENT),","	CSS_DATEPICKER_MONTH = getClassName(DATEPICKER, MONTH),","	CSS_DATEPICKER_SELECT_WRAPPER = getClassName(DATEPICKER, SELECT, WRAPPER),","	CSS_DATEPICKER_YEAR = getClassName(DATEPICKER, YEAR),","	CSS_HELPER_CLEARFIX = getClassName(HELPER, CLEARFIX),","","	SELECT_TPL = '<select></select>',","	SELECT_OPTION_TPL = '<option></option>',","	WRAPPER_BUTTON_TPL = '<div class=\"'+ CSS_DATEPICKER_BUTTON_WRAPPER +'\"></div>',","	WRAPPER_SELECT_TPL = '<div class='+ CSS_DATEPICKER_SELECT_WRAPPER +'></div>';","","/**"," * <p><img src=\"assets/images/aui-calendar-datepicker-select/main.png\"/></p>"," *"," * A base class for DatePickerSelect, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Select a date from Calendar to select elements</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.DatePickerSelect({"," *  srcNode: '#srcNodeId',"," *  calendar: {"," *      // locale: 'pt-br',"," *      dateFormat: '%m/%d/%y',"," *      yearRange: [ 1970, 2009 ]"," *	}"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"DatePickerSelect.html#configattributes\">Configuration Attributes</a> available for"," * DatePickerSelect."," *"," * @class DatePickerSelect"," * @param config {Object} Object literal specifying widget configuration properties."," * @constructor"," * @extends Component"," */","var DatePickerSelect = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property DatePickerSelect.NAME","		 * @type String","		 * @static","		 */","		NAME: DATEPICKER,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the DatePickerSelect.","		 *","		 * @property DatePickerSelect.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * The order the selects elements are appended to the","			 * <a href=\"DatePickerSelect.html#config_srcNode\">srcNode</a>.","			 *","			 * @attribute appendOrder","			 * @default [ 'm', 'd', 'y' ]","			 * @type Array","			 */","			appendOrder: {","				validator: isArray,","				value: [ 'm', 'd', 'y' ]","			},","","			/**","			 * DOM Node to display the button of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-buttonitem</code>.","			 *","			 * @attribute buttonNode","			 * @default Generated div element.","			 * @type String","			 */","			buttonNode: {},","","			/**","			 * <a href=\"Calendar.html\">Calendar</a> configuration Object.</a>","			 *","			 * @attribute calendar","			 * @default {}","			 * @type Object","			 */","			calendar: {","				value: {}","			},","","			/**","			 * DOM Node to display the day of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-year</code>.","			 *","			 * @attribute dayNode","			 * @default Generated div element.","			 * @type String | Node","			 */","			dayNode: {","				setter: nodeSetter,","				valueFn: createSelect","			},","","			/**","			 * Name attribute used on the","			 * <a href=\"DatePickerSelect.html#config_dayNode\">dayNode</a>.","			 *","			 * @attribute dayNodeName","			 * @default day","			 * @type String","			 */","			dayNodeName: {","				valueFn: function() {","					return this.get(DAY_NODE).get(NAME) || DAY;","				}","			},","","			/**","			 * DOM Node to display the month of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-year</code>.","			 *","			 * @attribute monthNode","			 * @default Generated div element.","			 * @type String | Node","			 */","			monthNode: {","				setter: nodeSetter,","				valueFn: createSelect","			},","","			/**","			 * Name attribute used on the","			 * <a href=\"DatePickerSelect.html#config_monthNode\">monthNode</a>.","			 *","			 * @attribute monthNodeName","			 * @default month","			 * @type String","			 */","			monthNodeName: {","				valueFn: function() {","					return this.get(MONTH_NODE).get(NAME) || MONTH;","				}","			},","","			/**","			 * If true the select element for the day will be nullable","			 *","			 * @attribute nullableDay","			 * @default false","			 * @type boolean","			 */","			nullableDay: {","				value: false","			},","","			/**","			 * If true the select element for the month will be nullable","			 *","			 * @attribute nullableMonth","			 * @default false","			 * @type boolean","			 */","			nullableMonth: {","				value: false","			},","","			/**","			 * If true the select element for the year will be nullable","			 *","			 * @attribute nullableYear","			 * @default false","			 * @type boolean","			 */","			nullableYear: {","				value: false","			},","","			/**","			 * If true the select element for the days will be automatic","			 * populated.","			 *","			 * @attribute populateDay","			 * @default true","			 * @type boolean","			 */","			populateDay: {","				value: true","			},","","			/**","			 * If true the select element for the month will be automatic","			 * populated.","			 *","			 * @attribute populateMonth","			 * @default true","			 * @type boolean","			 */","			populateMonth: {","				value: true","			},","","			/**","			 * If true the select element for the year will be automatic","			 * populated.","			 *","			 * @attribute populateYear","			 * @default true","			 * @type boolean","			 */","			populateYear: {","				value: true","			},","","			/**","			 * DOM Node to display the selects of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-select-wrapper</code>.","			 *","			 * @attribute selectWrapperNode","			 * @default Generated div element.","			 * @type String","			 */","			selectWrapperNode: {","				valueFn: function() {","					return A.Node.create(WRAPPER_SELECT_TPL);","				}","			},","","			/**","			 * Trigger element to open the calendar. Inherited from","			 * <a href=\"OverlayContext.html#config_trigger\">OverlayContext</a>.","			 *","			 * @attribute trigger","			 * @default Generated HTLM div element","			 * @type {Node | String}","			 */","			trigger: {","				setter: function(value) {","					if (value instanceof A.NodeList) {","						return value;","					}","					else if (Lang.isString(value)) {","						return A.all(value);","					}","","					return new A.NodeList(value);","				},","				valueFn: function() {","					return A.NodeList.create(WRAPPER_BUTTON_TPL);","				}","			},","","			/**","			 * DOM Node to display the year of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-year</code>.","			 *","			 * @attribute yearNode","			 * @default Generated div element.","			 * @type String | Node","			 */","			yearNode: {","				setter: nodeSetter,","				valueFn: createSelect","			},","","			/**","			 * Name attribute used on the","			 * <a href=\"DatePickerSelect.html#config_yearNode\">yearNode</a>.","			 *","			 * @attribute yearNodeName","			 * @default year","			 * @type String","			 */","			yearNodeName: {","				valueFn: function() {","					return this.get(YEAR_NODE).get(NAME) || YEAR;","				}","			},","","			/**","			 * Year range to be displayed on the year select element. By default","			 * it displays from -10 to +10 years from the current year.","			 *","			 * @attribute yearRange","			 * @default [ year - 10, year + 10 ]","			 * @type Array","			 */","			yearRange: {","				validator: isArray,","				valueFn: function() {","					var year = new Date().getFullYear();","","					return [ year - 10, year + 10 ];","				}","			}","		},","","		/**","		 * Object hash, defining how attribute values are to be parsed from","		 * markup contained in the widget's content box.","		 *","		 * @property DatePickerSelect.HTML_PARSER","		 * @type Object","		 * @static","		 */","		HTML_PARSER: {","			buttonNode: DOT + CSS_BUTTONITEM,","			dayNode: DOT + CSS_DATEPICKER_DAY,","			monthNode: DOT + CSS_DATEPICKER_MONTH,","			selectWrapperNode: DOT + CSS_DATEPICKER_SELECT_WRAPPER,","			trigger: DOT + CSS_DATEPICKER_BUTTON_WRAPPER,","			yearNode: DOT + CSS_DATEPICKER_YEAR","		},","","		EXTENDS: A.Component,","","		prototype: {","			/**","			 * Bind the events on the DatePickerSelect UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance._bindSelectEvents();","","				instance.after('calendar:select', instance._afterSelectDate);","			},","","			/**","			 * Descructor lifecycle implementation for the Datepicker class.","			 * Purges events attached to the node (and all child nodes).","			 *","			 * @method destructor","			 * @protected","			 */","			destructor: function() {","				var instance = this;","","				instance.datePicker.destroy();","			},","","			/**","			 * Create the DOM structure for the DatePickerSelect. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderElements();","				instance._renderTriggerButton();","				instance._renderCalendar();","			},","","			/**","			 * Sync the DatePickerSelect UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance._syncSelectsUI();","			},","","			/**","			 * Fires when a date is selected on the Calendar.","			 *","			 * @method _afterSelectDate","			 * @param {Event} event","			 * @protected","			 */","			_afterSelectDate: function(event) {","				var instance = this;","","				if (event.date.normal.length) {","					instance._syncSelectsUI();","				}","			},","","			/**","			 * Bind events on each select element (change, keypress, etc).","			 *","			 * @method _bindSelectEvents","			 * @protected","			 */","			_bindSelectEvents: function() {","				var instance = this;","","				var selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);","","				selects.on('change', instance._onSelectChange, instance);","				selects.on('keypress', instance._onSelectChange, instance);","			},","","			/**","			 * Gets an Array with the field elements in the correct order defined","			 * on <a href=\"DatePickerSelect.html#config_appendOrder\">appendOrder</a>.","			 *","			 * @method _getAppendOrder","			 * @protected","			 * @return {Array}","			 */","			_getAppendOrder: function() {","				var instance = this;","","				var appendOrder = instance.get(APPEND_ORDER);","				var id = instance.get(ID);","","				var mapping = {","					d: instance.get(DAY_NODE),","					m: instance.get(MONTH_NODE),","					y: instance.get(YEAR_NODE)","				};","","				var firstField = mapping[ appendOrder[0] ];","				var secondField = mapping[ appendOrder[1] ];","				var thirdField = mapping[ appendOrder[2] ];","","				firstField.setAttribute(DATA_COMPONENT_ID, id);","				secondField.setAttribute(DATA_COMPONENT_ID, id);","				thirdField.setAttribute(DATA_COMPONENT_ID, id);","","				return [ firstField, secondField, thirdField ];","			},","","			/**","			 * Fired on any select change.","			 *","			 * @method _onSelectChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_onSelectChange: function(event) {","				var instance = this;","","				var target = event.currentTarget || event.target;","","				var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);","","				var currentDay = instance.get(DAY_NODE).val();","				var currentMonth = instance.get(MONTH_NODE).val();","				var currentYear = instance.get(YEAR_NODE).val();","","				var validDay = (currentDay > -1);","				var validMonth = (currentMonth > -1);","				var validYear = (currentYear > -1);","","				if (validDay) {","					instance.calendar.set(CURRENT_DAY, currentDay);","				}","","				if (validMonth) {","					instance.calendar.set(CURRENT_MONTH, currentMonth);","				}","","				if (validYear) {","					instance.calendar.set(CURRENT_YEAR, currentYear);","				}","","				if (monthChanged) {","					instance._uiSetCurrentMonth();","","					if (validDay) {","						instance._selectCurrentDay();","					}","				}","","				if (validDay) {","					instance.calendar.selectCurrentDate();","				}","","				if (!validDay || !validMonth || !validYear) {","					instance.calendar.clear();","				}","			},","","			/**","			 * Populate the day select element with the correct data.","			 *","			 * @method _populateDays","			 * @protected","			 */","			_populateDays: function() {","				var instance = this;","","				if (instance.get(POPULATE_DAY)) {","					instance._populateSelect(","						instance.get(DAY_NODE),","						1,","						instance.calendar.getDaysInMonth(),","						null,","						null,","						instance.get(NULLABLE_DAY)","					);","				}","			},","","			/**","			 * Populate the month select element with the correct data.","			 *","			 * @method _populateMonths","			 * @protected","			 */","			_populateMonths: function() {","				var instance = this;","","				var localeMap = instance.calendar._getLocaleMap();","				var monthLabels = localeMap.B;","","				if (instance.get(POPULATE_MONTH)) {","					instance._populateSelect(","						instance.get(MONTH_NODE),","						0,","						(monthLabels.length - 1),","						monthLabels,","						null,","						instance.get(NULLABLE_MONTH)","					);","				}","			},","","			/**","			 * Populate the year select element with the correct data.","			 *","			 * @method _populateYears","			 * @protected","			 */","			_populateYears: function() {","				var instance = this;","","				var yearRange = instance.get(YEAR_RANGE);","","				if (instance.get(POPULATE_YEAR)) {","					instance._populateSelect(","						instance.get(YEAR_NODE),","						yearRange[0],","						yearRange[1],","						null,","						null,","						instance.get(NULLABLE_YEAR)","					);","				}","			},","","			/**","			 * Populate a select element with the data passed on the params.","			 *","			 * @method _populateSelect","			 * @param {HTMLSelectElement} select Select to be populated","			 * @param {Number} fromIndex Index to start","			 * @param {Number} toIndex Index to end","			 * @param {Object} values Object with labels to be used as content of each","			 * option. Optional.","			 * @protected","			 * @return {String}","			 */","			_populateSelect: function(select, fromIndex, toIndex, labels, values, nullable) {","				var i = 0;","				var index = fromIndex;","","				var selectEl = A.Node.getDOMNode(select);","","				select.empty();","				labels = labels || [];","				values = values || [];","","				if (nullable) {","					selectEl.options[0] = new Option(BLANK, -1);","","					i++;","				}","","				while (index <= toIndex) {","					var value = values[index] || index;","					var label = labels[index] || index;","","					selectEl.options[i] = new Option(label, index);","","					i++;","					index++;","				}","			},","","			/**","			 * Populate each select element with the correct data for the day, month","			 * and year.","			 *","			 * @method _populateSelects","			 * @protected","			 */","			_populateSelects: function() {","				var instance = this;","","				instance._populateDays();","				instance._populateMonths();","				instance._populateYears();","","				// restricting dates based on the selects values","				var monthOptions = instance.get(MONTH_NODE).all(OPTION);","				var yearOptions = instance.get(YEAR_NODE).all(OPTION);","","				var mLength = monthOptions.size() - 1;","				var yLength = yearOptions.size() - 1;","","				var firstMonth = monthOptions.item(0).val();","				var firstYear = yearOptions.item(0).val();","				var lastMonth = monthOptions.item(mLength).val();","				var lastYear = yearOptions.item(yLength).val();","","				var maxMonthDays = instance.calendar.getDaysInMonth(lastYear, lastMonth);","","				var minDate = new Date(firstYear, firstMonth, 1);","				var maxDate = new Date(lastYear, lastMonth, maxMonthDays);","","				instance.calendar.set(MAX_DATE, maxDate);","				instance.calendar.set(MIN_DATE, minDate);","			},","","			_renderCalendar: function() {","				var instance = this;","","				var datePickerConfig = {","					calendar: instance.get(CALENDAR),","					trigger: instance.get(TRIGGER).item(0)","				};","","				var datePicker = new A.DatePicker(datePickerConfig).render();","","				datePicker.addTarget(instance);","","				instance.datePicker = datePicker;","				instance.calendar = datePicker.calendar;","			},","","			/**","			 * Render DOM elements for the DatePickerSelect.","			 *","			 * @method _renderElements","			 * @protected","			 */","			_renderElements: function() {","				var instance = this;","","				var boundingBox = instance.get(BOUNDING_BOX);","				var contentBox = instance.get(CONTENT_BOX);","","				var dayNode = instance.get(DAY_NODE);","				var monthNode = instance.get(MONTH_NODE);","				var yearNode = instance.get(YEAR_NODE);","","				dayNode.addClass(CSS_DATEPICKER_DAY);","				monthNode.addClass(CSS_DATEPICKER_MONTH);","				yearNode.addClass(CSS_DATEPICKER_YEAR);","","				boundingBox.addClass(CSS_DATEPICKER_DISPLAY);","				boundingBox.addClass(CSS_HELPER_CLEARFIX);","","				contentBox.addClass(CSS_DATEPICKER_DISPLAY_CONTENT);","","				// setting name of the fields","				monthNode.set(NAME, instance.get(MONTH_NODE_NAME));","				yearNode.set(NAME, instance.get(YEAR_NODE_NAME));","				dayNode.set(NAME, instance.get(DAY_NODE_NAME));","","				if (!monthNode.inDoc(A.config.doc)) {","					// append elements","					var selectWrapper = instance.get(SELECT_WRAPPER_NODE);","					var orderedFields = instance._getAppendOrder();","","					// this textNode is to prevent layout shifting only","					// simulate the default browser space between inputs/selects on re-append","					var textNode = A.one(","						DOC.createTextNode(SPACE)","					);","","					selectWrapper.append(orderedFields[0]);","					selectWrapper.append( textNode.clone() );","					selectWrapper.append(orderedFields[1]);","					selectWrapper.append( textNode );","					selectWrapper.append(orderedFields[2]);","","					contentBox.append(selectWrapper);","				}","			},","","			/**","			 * Render DOM element for the trigger button of the DatePickerSelect.","			 *","			 * @method _renderTriggerButton","			 * @protected","			 */","			_renderTriggerButton: function() {","				var instance = this;","","				var trigger = instance.get(TRIGGER).item(0);","","				instance._buttonItem = new A.ButtonItem(","					{","						boundingBox: instance.get(BUTTON_NODE),","						icon: CALENDAR","					}","				);","","				instance.get(CONTENT_BOX).append(trigger);","","				trigger.setAttribute(DATA_COMPONENT_ID, instance.get(ID));","","				if ( trigger.test(DOT + CSS_DATEPICKER_BUTTON_WRAPPER) ) {","					// use Button if the user doesn't specify a trigger","					instance._buttonItem.render(trigger);","				}","			},","","			/**","			 * Select the current day on the respective input field.","			 *","			 * @method _selectCurrentDay","			 * @protected","			 */","			_selectCurrentDay: function() {","				var instance = this;","","				var currentDate = instance.calendar.getCurrentDate();","","				instance.get(DAY_NODE).val(","					String(currentDate.getDate())","				);","			},","","			/**","			 * Select the current month on the respective input field.","			 *","			 * @method _selectCurrentMonth","			 * @protected","			 */","			_selectCurrentMonth: function() {","				var instance = this;","","				var currentDate = instance.calendar.getCurrentDate();","","				instance.get(MONTH_NODE).val(","					String(currentDate.getMonth())","				);","			},","","			/**","			 * Select the current year on the respective input field.","			 *","			 * @method _selectCurrentYear","			 * @protected","			 */","			_selectCurrentYear: function() {","				var instance = this;","","				var currentDate = instance.calendar.getCurrentDate();","","				instance.get(YEAR_NODE).val(","					String(currentDate.getFullYear())","				);","			},","","			/**","			 * Sync the UI of each DOM Select element.","			 *","			 * @method _syncSelectsUI","			 * @protected","			 */","			_syncSelectsUI: function() {","				var instance = this;","","				instance._populateSelects();","				instance._selectCurrentDay();","				instance._selectCurrentMonth();","				instance._selectCurrentYear();","			},","","			/**","			 * Fired after","			 * <a href=\"DatePickerSelect.html#config_currentMonth\">currentMonth</a> is set.","			 *","			 * @method _uiSetCurrentMonth","			 * @param {EventFacade} event","			 * @protected","			 */","			_uiSetCurrentMonth: function(value) {","				var instance = this;","","				instance._populateDays();","			},","","			/**","			 * Fired after","			 * <a href=\"DatePickerSelect.html#config_disabled\">disabled</a> is set.","			 *","			 * @method _afterDisabledChangeDatePicker","			 * @param {EventFacade} event","			 * @protected","			 */","			_uiSetDisabled: function(disabled) {","				var instance = this;","","				DatePickerSelect.superclass._uiSetDisabled.apply(instance, arguments);","","				instance.get(DAY_NODE).set('disabled', disabled);","				instance.get(MONTH_NODE).set('disabled', disabled);","				instance.get(YEAR_NODE).set('disabled', disabled);","			}","		}","	}",");","","A.DatePickerSelect = DatePickerSelect;","","}, '@VERSION@' ,{requires:['aui-datepicker-base','aui-button-item'], skinnable:true});","","","AUI.add('aui-datepicker', function(A){}, '@VERSION@' ,{use:['aui-datepicker-base','aui-datepicker-select'], skinnable:true});",""];
_yuitest_coverage["/build/aui-datepicker/aui-datepicker.js"].lines = {"1":0,"2":0,"15":0,"41":0,"93":0,"95":0,"107":0,"109":0,"111":0,"112":0,"115":0,"116":0,"130":0,"132":0,"143":0,"145":0,"146":0,"149":0,"150":0,"163":0,"165":0,"175":0,"177":0,"192":0,"194":0,"198":0,"210":0,"212":0,"213":0,"216":0,"219":0,"230":0,"232":0,"234":0,"239":0,"251":0,"265":0,"273":0,"277":0,"281":0,"381":0,"460":0,"488":0,"572":0,"586":0,"587":0,"589":0,"590":0,"593":0,"596":0,"624":0,"639":0,"641":0,"673":0,"675":0,"677":0,"688":0,"690":0,"700":0,"702":0,"703":0,"704":0,"714":0,"716":0,"727":0,"729":0,"730":0,"741":0,"743":0,"745":0,"746":0,"758":0,"760":0,"761":0,"763":0,"769":0,"770":0,"771":0,"773":0,"774":0,"775":0,"777":0,"788":0,"790":0,"792":0,"794":0,"795":0,"796":0,"798":0,"799":0,"800":0,"802":0,"803":0,"806":0,"807":0,"810":0,"811":0,"814":0,"815":0,"817":0,"818":0,"822":0,"823":0,"826":0,"827":0,"838":0,"840":0,"841":0,"859":0,"861":0,"862":0,"864":0,"865":0,"883":0,"885":0,"887":0,"888":0,"912":0,"913":0,"915":0,"917":0,"918":0,"919":0,"921":0,"922":0,"924":0,"927":0,"928":0,"929":0,"931":0,"933":0,"934":0,"946":0,"948":0,"949":0,"950":0,"953":0,"954":0,"956":0,"957":0,"959":0,"960":0,"961":0,"962":0,"964":0,"966":0,"967":0,"969":0,"970":0,"974":0,"976":0,"981":0,"983":0,"985":0,"986":0,"996":0,"998":0,"999":0,"1001":0,"1002":0,"1003":0,"1005":0,"1006":0,"1007":0,"1009":0,"1010":0,"1012":0,"1015":0,"1016":0,"1017":0,"1019":0,"1021":0,"1022":0,"1026":0,"1030":0,"1031":0,"1032":0,"1033":0,"1034":0,"1036":0,"1047":0,"1049":0,"1051":0,"1058":0,"1060":0,"1062":0,"1064":0,"1075":0,"1077":0,"1079":0,"1091":0,"1093":0,"1095":0,"1107":0,"1109":0,"1111":0,"1123":0,"1125":0,"1126":0,"1127":0,"1128":0,"1140":0,"1142":0,"1154":0,"1156":0,"1158":0,"1159":0,"1160":0,"1166":0,"1171":0};
_yuitest_coverage["/build/aui-datepicker/aui-datepicker.js"].functions = {"value:40":0,"initializer:92":0,"bindUI:106":0,"destructor:129":0,"_afterSelectDate:142":0,"_onShowOverlay:162":0,"_renderCalendar:174":0,"_setCalendar:191":0,"_setStack:209":0,"_setTriggerValue:229":0,"(anonymous 1):1":0,"nodeSetter:276":0,"createSelect:280":0,"valueFn:459":0,"valueFn:487":0,"valueFn:571":0,"setter:585":0,"valueFn:595":0,"valueFn:623":0,"valueFn:638":0,"bindUI:672":0,"destructor:687":0,"renderUI:699":0,"syncUI:713":0,"_afterSelectDate:726":0,"_bindSelectEvents:740":0,"_getAppendOrder:757":0,"_onSelectChange:787":0,"_populateDays:837":0,"_populateMonths:858":0,"_populateYears:882":0,"_populateSelect:911":0,"_populateSelects:945":0,"_renderCalendar:973":0,"_renderElements:995":0,"_renderTriggerButton:1046":0,"_selectCurrentDay:1074":0,"_selectCurrentMonth:1090":0,"_selectCurrentYear:1106":0,"_syncSelectsUI:1122":0,"_uiSetCurrentMonth:1139":0,"_uiSetDisabled:1153":0,"(anonymous 2):265":0};
_yuitest_coverage["/build/aui-datepicker/aui-datepicker.js"].coveredLines = 210;
_yuitest_coverage["/build/aui-datepicker/aui-datepicker.js"].coveredFunctions = 43;
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1);
AUI.add('aui-datepicker-base', function(A) {
_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 2);
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

_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 15);
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
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "value", 40);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 41);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "initializer", 92);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 93);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 95);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "bindUI", 106);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 107);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 109);
DatePicker.superclass.bindUI.apply(this, arguments);

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 111);
instance.on('show', instance._onShowOverlay);
			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 112);
instance.after('calendar:select', instance._afterSelectDate);

			// Set the value of the trigger with the Calendar current date
			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 115);
if (instance.get(SET_VALUE)) {
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 116);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "destructor", 129);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 130);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 132);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_afterSelectDate", 142);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 143);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 145);
if (!instance.calendar.get(SELECT_MULTIPLE_DATES)) {
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 146);
instance.hide();
			}

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 149);
if (instance.get(SET_VALUE)) {
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 150);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_onShowOverlay", 162);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 163);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 165);
instance._renderCalendar();
		},

		/**
		 * Render the Calendar used inside the DatePicker.
		 *
		 * @method _renderCalendar
		 * @protected
		 */
		_renderCalendar: function() {
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_renderCalendar", 174);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 175);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 177);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_setCalendar", 191);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 192);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 194);
A.mix(val, {
				bubbleTargets: instance
			});

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 198);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_setStack", 209);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 210);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 212);
if (value) {
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 213);
A.DatepickerManager.register(instance);
			}
			else {
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 216);
A.DatepickerManager.remove(instance);
			}

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 219);
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
			_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_setTriggerValue", 229);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 230);
var instance = this;

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 232);
var value = instance.get(FORMATTER).apply(instance, [dateObj]);

			_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 234);
instance.get(CURRENT_NODE).val(value);
		}
	}
});

_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 239);
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
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 251);
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
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 265);
AUI.add('aui-datepicker-select', function(A) {
/**
 * The DatePickerSelect Utility
 *
 * @module aui-calendar
 * @submodule aui-calendar-datepicker-select
 */

_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "(anonymous 2)", 265);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 273);
var Lang = A.Lang,
	isArray = Lang.isArray,

	nodeSetter = function(v) {
		_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "nodeSetter", 276);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 277);
return A.one(v);
	},

	createSelect = function() {
		_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "createSelect", 280);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 281);
return A.Node.create(SELECT_TPL);
	},

	DOC = A.config.doc,

	APPEND_ORDER = 'appendOrder',
	BLANK = '',
	BODY = 'body',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONITEM = 'buttonitem',
	BUTTON_NODE = 'buttonNode',
	CALENDAR = 'calendar',
	CLEARFIX = 'clearfix',
	CONTENT_BOX = 'contentBox',
	CONTENT = 'content',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_YEAR = 'currentYear',
	DATA_COMPONENT_ID = 'data-auiComponentID',
	DATEPICKER = 'datepicker',
	DAY = 'day',
	DAY_NODE = 'dayNode',
	DAY_NODE_NAME = 'dayNodeName',
	DISPLAY = 'display',
	DOT = '.',
	HELPER = 'helper',
	ID = 'id',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
	MONTH = 'month',
	MONTH_NODE = 'monthNode',
	MONTH_NODE_NAME = 'monthNodeName',
	NAME = 'name',
	NULLABLE_DAY = 'nullableDay',
	NULLABLE_MONTH = 'nullableMonth',
	NULLABLE_YEAR = 'nullableYear',
	OPTION = 'option',
	POPULATE_DAY = 'populateDay',
	POPULATE_MONTH = 'populateMonth',
	POPULATE_YEAR = 'populateYear',
	SELECT = 'select',
	SELECTED = 'selected',
	SELECT_WRAPPER_NODE = 'selectWrapperNode',
	SPACE = ' ',
	SRC_NODE = 'srcNode',
	TRIGGER = 'trigger',
	WRAPPER = 'wrapper',
	YEAR = 'year',
	YEAR_NODE = 'yearNode',
	YEAR_NODE_NAME = 'yearNodeName',
	YEAR_RANGE = 'yearRange',

	getClassName = A.getClassName,

	CSS_BUTTONITEM = getClassName(BUTTONITEM),
	CSS_DATEPICKER = getClassName(DATEPICKER),
	CSS_DATEPICKER_BUTTON_WRAPPER = getClassName(DATEPICKER, BUTTON, WRAPPER),
	CSS_DATEPICKER_DAY = getClassName(DATEPICKER, DAY),
	CSS_DATEPICKER_DISPLAY = getClassName(DATEPICKER, DISPLAY),
	CSS_DATEPICKER_DISPLAY_CONTENT = getClassName(DATEPICKER, DISPLAY, CONTENT),
	CSS_DATEPICKER_MONTH = getClassName(DATEPICKER, MONTH),
	CSS_DATEPICKER_SELECT_WRAPPER = getClassName(DATEPICKER, SELECT, WRAPPER),
	CSS_DATEPICKER_YEAR = getClassName(DATEPICKER, YEAR),
	CSS_HELPER_CLEARFIX = getClassName(HELPER, CLEARFIX),

	SELECT_TPL = '<select></select>',
	SELECT_OPTION_TPL = '<option></option>',
	WRAPPER_BUTTON_TPL = '<div class="'+ CSS_DATEPICKER_BUTTON_WRAPPER +'"></div>',
	WRAPPER_SELECT_TPL = '<div class='+ CSS_DATEPICKER_SELECT_WRAPPER +'></div>';

/**
 * <p><img src="assets/images/aui-calendar-datepicker-select/main.png"/></p>
 *
 * A base class for DatePickerSelect, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Select a date from Calendar to select elements</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.DatePickerSelect({
 *  srcNode: '#srcNodeId',
 *  calendar: {
 *      // locale: 'pt-br',
 *      dateFormat: '%m/%d/%y',
 *      yearRange: [ 1970, 2009 ]
 *	}
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="DatePickerSelect.html#configattributes">Configuration Attributes</a> available for
 * DatePickerSelect.
 *
 * @class DatePickerSelect
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 * @extends Component
 */
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 381);
var DatePickerSelect = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property DatePickerSelect.NAME
		 * @type String
		 * @static
		 */
		NAME: DATEPICKER,

		/**
		 * Static property used to define the default attribute
		 * configuration for the DatePickerSelect.
		 *
		 * @property DatePickerSelect.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * The order the selects elements are appended to the
			 * <a href="DatePickerSelect.html#config_srcNode">srcNode</a>.
			 *
			 * @attribute appendOrder
			 * @default [ 'm', 'd', 'y' ]
			 * @type Array
			 */
			appendOrder: {
				validator: isArray,
				value: [ 'm', 'd', 'y' ]
			},

			/**
			 * DOM Node to display the button of the DatePickerSelect. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-buttonitem</code>.
			 *
			 * @attribute buttonNode
			 * @default Generated div element.
			 * @type String
			 */
			buttonNode: {},

			/**
			 * <a href="Calendar.html">Calendar</a> configuration Object.</a>
			 *
			 * @attribute calendar
			 * @default {}
			 * @type Object
			 */
			calendar: {
				value: {}
			},

			/**
			 * DOM Node to display the day of the DatePickerSelect. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-datepicker-year</code>.
			 *
			 * @attribute dayNode
			 * @default Generated div element.
			 * @type String | Node
			 */
			dayNode: {
				setter: nodeSetter,
				valueFn: createSelect
			},

			/**
			 * Name attribute used on the
			 * <a href="DatePickerSelect.html#config_dayNode">dayNode</a>.
			 *
			 * @attribute dayNodeName
			 * @default day
			 * @type String
			 */
			dayNodeName: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "valueFn", 459);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 460);
return this.get(DAY_NODE).get(NAME) || DAY;
				}
			},

			/**
			 * DOM Node to display the month of the DatePickerSelect. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-datepicker-year</code>.
			 *
			 * @attribute monthNode
			 * @default Generated div element.
			 * @type String | Node
			 */
			monthNode: {
				setter: nodeSetter,
				valueFn: createSelect
			},

			/**
			 * Name attribute used on the
			 * <a href="DatePickerSelect.html#config_monthNode">monthNode</a>.
			 *
			 * @attribute monthNodeName
			 * @default month
			 * @type String
			 */
			monthNodeName: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "valueFn", 487);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 488);
return this.get(MONTH_NODE).get(NAME) || MONTH;
				}
			},

			/**
			 * If true the select element for the day will be nullable
			 *
			 * @attribute nullableDay
			 * @default false
			 * @type boolean
			 */
			nullableDay: {
				value: false
			},

			/**
			 * If true the select element for the month will be nullable
			 *
			 * @attribute nullableMonth
			 * @default false
			 * @type boolean
			 */
			nullableMonth: {
				value: false
			},

			/**
			 * If true the select element for the year will be nullable
			 *
			 * @attribute nullableYear
			 * @default false
			 * @type boolean
			 */
			nullableYear: {
				value: false
			},

			/**
			 * If true the select element for the days will be automatic
			 * populated.
			 *
			 * @attribute populateDay
			 * @default true
			 * @type boolean
			 */
			populateDay: {
				value: true
			},

			/**
			 * If true the select element for the month will be automatic
			 * populated.
			 *
			 * @attribute populateMonth
			 * @default true
			 * @type boolean
			 */
			populateMonth: {
				value: true
			},

			/**
			 * If true the select element for the year will be automatic
			 * populated.
			 *
			 * @attribute populateYear
			 * @default true
			 * @type boolean
			 */
			populateYear: {
				value: true
			},

			/**
			 * DOM Node to display the selects of the DatePickerSelect. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-datepicker-select-wrapper</code>.
			 *
			 * @attribute selectWrapperNode
			 * @default Generated div element.
			 * @type String
			 */
			selectWrapperNode: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "valueFn", 571);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 572);
return A.Node.create(WRAPPER_SELECT_TPL);
				}
			},

			/**
			 * Trigger element to open the calendar. Inherited from
			 * <a href="OverlayContext.html#config_trigger">OverlayContext</a>.
			 *
			 * @attribute trigger
			 * @default Generated HTLM div element
			 * @type {Node | String}
			 */
			trigger: {
				setter: function(value) {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "setter", 585);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 586);
if (value instanceof A.NodeList) {
						_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 587);
return value;
					}
					else {_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 589);
if (Lang.isString(value)) {
						_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 590);
return A.all(value);
					}}

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 593);
return new A.NodeList(value);
				},
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "valueFn", 595);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 596);
return A.NodeList.create(WRAPPER_BUTTON_TPL);
				}
			},

			/**
			 * DOM Node to display the year of the DatePickerSelect. If not
			 * specified try to query using HTML_PARSER an element inside
			 * contentBox which matches <code>aui-datepicker-year</code>.
			 *
			 * @attribute yearNode
			 * @default Generated div element.
			 * @type String | Node
			 */
			yearNode: {
				setter: nodeSetter,
				valueFn: createSelect
			},

			/**
			 * Name attribute used on the
			 * <a href="DatePickerSelect.html#config_yearNode">yearNode</a>.
			 *
			 * @attribute yearNodeName
			 * @default year
			 * @type String
			 */
			yearNodeName: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "valueFn", 623);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 624);
return this.get(YEAR_NODE).get(NAME) || YEAR;
				}
			},

			/**
			 * Year range to be displayed on the year select element. By default
			 * it displays from -10 to +10 years from the current year.
			 *
			 * @attribute yearRange
			 * @default [ year - 10, year + 10 ]
			 * @type Array
			 */
			yearRange: {
				validator: isArray,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "valueFn", 638);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 639);
var year = new Date().getFullYear();

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 641);
return [ year - 10, year + 10 ];
				}
			}
		},

		/**
		 * Object hash, defining how attribute values are to be parsed from
		 * markup contained in the widget's content box.
		 *
		 * @property DatePickerSelect.HTML_PARSER
		 * @type Object
		 * @static
		 */
		HTML_PARSER: {
			buttonNode: DOT + CSS_BUTTONITEM,
			dayNode: DOT + CSS_DATEPICKER_DAY,
			monthNode: DOT + CSS_DATEPICKER_MONTH,
			selectWrapperNode: DOT + CSS_DATEPICKER_SELECT_WRAPPER,
			trigger: DOT + CSS_DATEPICKER_BUTTON_WRAPPER,
			yearNode: DOT + CSS_DATEPICKER_YEAR
		},

		EXTENDS: A.Component,

		prototype: {
			/**
			 * Bind the events on the DatePickerSelect UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "bindUI", 672);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 673);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 675);
instance._bindSelectEvents();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 677);
instance.after('calendar:select', instance._afterSelectDate);
			},

			/**
			 * Descructor lifecycle implementation for the Datepicker class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destructor
			 * @protected
			 */
			destructor: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "destructor", 687);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 688);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 690);
instance.datePicker.destroy();
			},

			/**
			 * Create the DOM structure for the DatePickerSelect. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "renderUI", 699);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 700);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 702);
instance._renderElements();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 703);
instance._renderTriggerButton();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 704);
instance._renderCalendar();
			},

			/**
			 * Sync the DatePickerSelect UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "syncUI", 713);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 714);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 716);
instance._syncSelectsUI();
			},

			/**
			 * Fires when a date is selected on the Calendar.
			 *
			 * @method _afterSelectDate
			 * @param {Event} event
			 * @protected
			 */
			_afterSelectDate: function(event) {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_afterSelectDate", 726);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 727);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 729);
if (event.date.normal.length) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 730);
instance._syncSelectsUI();
				}
			},

			/**
			 * Bind events on each select element (change, keypress, etc).
			 *
			 * @method _bindSelectEvents
			 * @protected
			 */
			_bindSelectEvents: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_bindSelectEvents", 740);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 741);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 743);
var selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 745);
selects.on('change', instance._onSelectChange, instance);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 746);
selects.on('keypress', instance._onSelectChange, instance);
			},

			/**
			 * Gets an Array with the field elements in the correct order defined
			 * on <a href="DatePickerSelect.html#config_appendOrder">appendOrder</a>.
			 *
			 * @method _getAppendOrder
			 * @protected
			 * @return {Array}
			 */
			_getAppendOrder: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_getAppendOrder", 757);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 758);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 760);
var appendOrder = instance.get(APPEND_ORDER);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 761);
var id = instance.get(ID);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 763);
var mapping = {
					d: instance.get(DAY_NODE),
					m: instance.get(MONTH_NODE),
					y: instance.get(YEAR_NODE)
				};

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 769);
var firstField = mapping[ appendOrder[0] ];
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 770);
var secondField = mapping[ appendOrder[1] ];
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 771);
var thirdField = mapping[ appendOrder[2] ];

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 773);
firstField.setAttribute(DATA_COMPONENT_ID, id);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 774);
secondField.setAttribute(DATA_COMPONENT_ID, id);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 775);
thirdField.setAttribute(DATA_COMPONENT_ID, id);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 777);
return [ firstField, secondField, thirdField ];
			},

			/**
			 * Fired on any select change.
			 *
			 * @method _onSelectChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_onSelectChange: function(event) {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_onSelectChange", 787);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 788);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 790);
var target = event.currentTarget || event.target;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 792);
var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 794);
var currentDay = instance.get(DAY_NODE).val();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 795);
var currentMonth = instance.get(MONTH_NODE).val();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 796);
var currentYear = instance.get(YEAR_NODE).val();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 798);
var validDay = (currentDay > -1);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 799);
var validMonth = (currentMonth > -1);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 800);
var validYear = (currentYear > -1);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 802);
if (validDay) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 803);
instance.calendar.set(CURRENT_DAY, currentDay);
				}

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 806);
if (validMonth) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 807);
instance.calendar.set(CURRENT_MONTH, currentMonth);
				}

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 810);
if (validYear) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 811);
instance.calendar.set(CURRENT_YEAR, currentYear);
				}

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 814);
if (monthChanged) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 815);
instance._uiSetCurrentMonth();

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 817);
if (validDay) {
						_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 818);
instance._selectCurrentDay();
					}
				}

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 822);
if (validDay) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 823);
instance.calendar.selectCurrentDate();
				}

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 826);
if (!validDay || !validMonth || !validYear) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 827);
instance.calendar.clear();
				}
			},

			/**
			 * Populate the day select element with the correct data.
			 *
			 * @method _populateDays
			 * @protected
			 */
			_populateDays: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_populateDays", 837);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 838);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 840);
if (instance.get(POPULATE_DAY)) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 841);
instance._populateSelect(
						instance.get(DAY_NODE),
						1,
						instance.calendar.getDaysInMonth(),
						null,
						null,
						instance.get(NULLABLE_DAY)
					);
				}
			},

			/**
			 * Populate the month select element with the correct data.
			 *
			 * @method _populateMonths
			 * @protected
			 */
			_populateMonths: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_populateMonths", 858);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 859);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 861);
var localeMap = instance.calendar._getLocaleMap();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 862);
var monthLabels = localeMap.B;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 864);
if (instance.get(POPULATE_MONTH)) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 865);
instance._populateSelect(
						instance.get(MONTH_NODE),
						0,
						(monthLabels.length - 1),
						monthLabels,
						null,
						instance.get(NULLABLE_MONTH)
					);
				}
			},

			/**
			 * Populate the year select element with the correct data.
			 *
			 * @method _populateYears
			 * @protected
			 */
			_populateYears: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_populateYears", 882);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 883);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 885);
var yearRange = instance.get(YEAR_RANGE);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 887);
if (instance.get(POPULATE_YEAR)) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 888);
instance._populateSelect(
						instance.get(YEAR_NODE),
						yearRange[0],
						yearRange[1],
						null,
						null,
						instance.get(NULLABLE_YEAR)
					);
				}
			},

			/**
			 * Populate a select element with the data passed on the params.
			 *
			 * @method _populateSelect
			 * @param {HTMLSelectElement} select Select to be populated
			 * @param {Number} fromIndex Index to start
			 * @param {Number} toIndex Index to end
			 * @param {Object} values Object with labels to be used as content of each
			 * option. Optional.
			 * @protected
			 * @return {String}
			 */
			_populateSelect: function(select, fromIndex, toIndex, labels, values, nullable) {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_populateSelect", 911);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 912);
var i = 0;
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 913);
var index = fromIndex;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 915);
var selectEl = A.Node.getDOMNode(select);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 917);
select.empty();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 918);
labels = labels || [];
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 919);
values = values || [];

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 921);
if (nullable) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 922);
selectEl.options[0] = new Option(BLANK, -1);

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 924);
i++;
				}

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 927);
while (index <= toIndex) {
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 928);
var value = values[index] || index;
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 929);
var label = labels[index] || index;

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 931);
selectEl.options[i] = new Option(label, index);

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 933);
i++;
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 934);
index++;
				}
			},

			/**
			 * Populate each select element with the correct data for the day, month
			 * and year.
			 *
			 * @method _populateSelects
			 * @protected
			 */
			_populateSelects: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_populateSelects", 945);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 946);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 948);
instance._populateDays();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 949);
instance._populateMonths();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 950);
instance._populateYears();

				// restricting dates based on the selects values
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 953);
var monthOptions = instance.get(MONTH_NODE).all(OPTION);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 954);
var yearOptions = instance.get(YEAR_NODE).all(OPTION);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 956);
var mLength = monthOptions.size() - 1;
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 957);
var yLength = yearOptions.size() - 1;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 959);
var firstMonth = monthOptions.item(0).val();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 960);
var firstYear = yearOptions.item(0).val();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 961);
var lastMonth = monthOptions.item(mLength).val();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 962);
var lastYear = yearOptions.item(yLength).val();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 964);
var maxMonthDays = instance.calendar.getDaysInMonth(lastYear, lastMonth);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 966);
var minDate = new Date(firstYear, firstMonth, 1);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 967);
var maxDate = new Date(lastYear, lastMonth, maxMonthDays);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 969);
instance.calendar.set(MAX_DATE, maxDate);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 970);
instance.calendar.set(MIN_DATE, minDate);
			},

			_renderCalendar: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_renderCalendar", 973);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 974);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 976);
var datePickerConfig = {
					calendar: instance.get(CALENDAR),
					trigger: instance.get(TRIGGER).item(0)
				};

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 981);
var datePicker = new A.DatePicker(datePickerConfig).render();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 983);
datePicker.addTarget(instance);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 985);
instance.datePicker = datePicker;
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 986);
instance.calendar = datePicker.calendar;
			},

			/**
			 * Render DOM elements for the DatePickerSelect.
			 *
			 * @method _renderElements
			 * @protected
			 */
			_renderElements: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_renderElements", 995);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 996);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 998);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 999);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1001);
var dayNode = instance.get(DAY_NODE);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1002);
var monthNode = instance.get(MONTH_NODE);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1003);
var yearNode = instance.get(YEAR_NODE);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1005);
dayNode.addClass(CSS_DATEPICKER_DAY);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1006);
monthNode.addClass(CSS_DATEPICKER_MONTH);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1007);
yearNode.addClass(CSS_DATEPICKER_YEAR);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1009);
boundingBox.addClass(CSS_DATEPICKER_DISPLAY);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1010);
boundingBox.addClass(CSS_HELPER_CLEARFIX);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1012);
contentBox.addClass(CSS_DATEPICKER_DISPLAY_CONTENT);

				// setting name of the fields
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1015);
monthNode.set(NAME, instance.get(MONTH_NODE_NAME));
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1016);
yearNode.set(NAME, instance.get(YEAR_NODE_NAME));
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1017);
dayNode.set(NAME, instance.get(DAY_NODE_NAME));

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1019);
if (!monthNode.inDoc(A.config.doc)) {
					// append elements
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1021);
var selectWrapper = instance.get(SELECT_WRAPPER_NODE);
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1022);
var orderedFields = instance._getAppendOrder();

					// this textNode is to prevent layout shifting only
					// simulate the default browser space between inputs/selects on re-append
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1026);
var textNode = A.one(
						DOC.createTextNode(SPACE)
					);

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1030);
selectWrapper.append(orderedFields[0]);
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1031);
selectWrapper.append( textNode.clone() );
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1032);
selectWrapper.append(orderedFields[1]);
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1033);
selectWrapper.append( textNode );
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1034);
selectWrapper.append(orderedFields[2]);

					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1036);
contentBox.append(selectWrapper);
				}
			},

			/**
			 * Render DOM element for the trigger button of the DatePickerSelect.
			 *
			 * @method _renderTriggerButton
			 * @protected
			 */
			_renderTriggerButton: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_renderTriggerButton", 1046);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1047);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1049);
var trigger = instance.get(TRIGGER).item(0);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1051);
instance._buttonItem = new A.ButtonItem(
					{
						boundingBox: instance.get(BUTTON_NODE),
						icon: CALENDAR
					}
				);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1058);
instance.get(CONTENT_BOX).append(trigger);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1060);
trigger.setAttribute(DATA_COMPONENT_ID, instance.get(ID));

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1062);
if ( trigger.test(DOT + CSS_DATEPICKER_BUTTON_WRAPPER) ) {
					// use Button if the user doesn't specify a trigger
					_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1064);
instance._buttonItem.render(trigger);
				}
			},

			/**
			 * Select the current day on the respective input field.
			 *
			 * @method _selectCurrentDay
			 * @protected
			 */
			_selectCurrentDay: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_selectCurrentDay", 1074);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1075);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1077);
var currentDate = instance.calendar.getCurrentDate();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1079);
instance.get(DAY_NODE).val(
					String(currentDate.getDate())
				);
			},

			/**
			 * Select the current month on the respective input field.
			 *
			 * @method _selectCurrentMonth
			 * @protected
			 */
			_selectCurrentMonth: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_selectCurrentMonth", 1090);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1091);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1093);
var currentDate = instance.calendar.getCurrentDate();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1095);
instance.get(MONTH_NODE).val(
					String(currentDate.getMonth())
				);
			},

			/**
			 * Select the current year on the respective input field.
			 *
			 * @method _selectCurrentYear
			 * @protected
			 */
			_selectCurrentYear: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_selectCurrentYear", 1106);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1107);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1109);
var currentDate = instance.calendar.getCurrentDate();

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1111);
instance.get(YEAR_NODE).val(
					String(currentDate.getFullYear())
				);
			},

			/**
			 * Sync the UI of each DOM Select element.
			 *
			 * @method _syncSelectsUI
			 * @protected
			 */
			_syncSelectsUI: function() {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_syncSelectsUI", 1122);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1123);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1125);
instance._populateSelects();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1126);
instance._selectCurrentDay();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1127);
instance._selectCurrentMonth();
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1128);
instance._selectCurrentYear();
			},

			/**
			 * Fired after
			 * <a href="DatePickerSelect.html#config_currentMonth">currentMonth</a> is set.
			 *
			 * @method _uiSetCurrentMonth
			 * @param {EventFacade} event
			 * @protected
			 */
			_uiSetCurrentMonth: function(value) {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_uiSetCurrentMonth", 1139);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1140);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1142);
instance._populateDays();
			},

			/**
			 * Fired after
			 * <a href="DatePickerSelect.html#config_disabled">disabled</a> is set.
			 *
			 * @method _afterDisabledChangeDatePicker
			 * @param {EventFacade} event
			 * @protected
			 */
			_uiSetDisabled: function(disabled) {
				_yuitest_coverfunc("/build/aui-datepicker/aui-datepicker.js", "_uiSetDisabled", 1153);
_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1154);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1156);
DatePickerSelect.superclass._uiSetDisabled.apply(instance, arguments);

				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1158);
instance.get(DAY_NODE).set('disabled', disabled);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1159);
instance.get(MONTH_NODE).set('disabled', disabled);
				_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1160);
instance.get(YEAR_NODE).set('disabled', disabled);
			}
		}
	}
);

_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1166);
A.DatePickerSelect = DatePickerSelect;

}, '@VERSION@' ,{requires:['aui-datepicker-base','aui-button-item'], skinnable:true});


_yuitest_coverline("/build/aui-datepicker/aui-datepicker.js", 1171);
AUI.add('aui-datepicker', function(A){}, '@VERSION@' ,{use:['aui-datepicker-base','aui-datepicker-select'], skinnable:true});

