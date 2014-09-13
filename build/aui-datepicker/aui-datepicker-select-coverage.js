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
_yuitest_coverage["/build/aui-datepicker-select/aui-datepicker-select.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-datepicker-select/aui-datepicker-select.js",
    code: []
};
_yuitest_coverage["/build/aui-datepicker-select/aui-datepicker-select.js"].code=["AUI.add('aui-datepicker-select', function(A) {","/**"," * The DatePickerSelect Utility"," *"," * @module aui-calendar"," * @submodule aui-calendar-datepicker-select"," */","","var Lang = A.Lang,","	isArray = Lang.isArray,","","	nodeSetter = function(v) {","		return A.one(v);","	},","","	createSelect = function() {","		return A.Node.create(SELECT_TPL);","	},","","	DOC = A.config.doc,","","	APPEND_ORDER = 'appendOrder',","	BLANK = '',","	BODY = 'body',","	BOUNDING_BOX = 'boundingBox',","	BUTTON = 'button',","	BUTTONITEM = 'buttonitem',","	BUTTON_NODE = 'buttonNode',","	CALENDAR = 'calendar',","	CLEARFIX = 'clearfix',","	CONTENT_BOX = 'contentBox',","	CONTENT = 'content',","	CURRENT_DAY = 'currentDay',","	CURRENT_MONTH = 'currentMonth',","	CURRENT_YEAR = 'currentYear',","	DATA_COMPONENT_ID = 'data-auiComponentID',","	DATEPICKER = 'datepicker',","	DAY = 'day',","	DAY_NODE = 'dayNode',","	DAY_NODE_NAME = 'dayNodeName',","	DISPLAY = 'display',","	DOT = '.',","	HELPER = 'helper',","	ID = 'id',","	MAX_DATE = 'maxDate',","	MIN_DATE = 'minDate',","	MONTH = 'month',","	MONTH_NODE = 'monthNode',","	MONTH_NODE_NAME = 'monthNodeName',","	NAME = 'name',","	NULLABLE_DAY = 'nullableDay',","	NULLABLE_MONTH = 'nullableMonth',","	NULLABLE_YEAR = 'nullableYear',","	OPTION = 'option',","	POPULATE_DAY = 'populateDay',","	POPULATE_MONTH = 'populateMonth',","	POPULATE_YEAR = 'populateYear',","	SELECT = 'select',","	SELECTED = 'selected',","	SELECT_WRAPPER_NODE = 'selectWrapperNode',","	SPACE = ' ',","	SRC_NODE = 'srcNode',","	TRIGGER = 'trigger',","	WRAPPER = 'wrapper',","	YEAR = 'year',","	YEAR_NODE = 'yearNode',","	YEAR_NODE_NAME = 'yearNodeName',","	YEAR_RANGE = 'yearRange',","","	getClassName = A.getClassName,","","	CSS_BUTTONITEM = getClassName(BUTTONITEM),","	CSS_DATEPICKER = getClassName(DATEPICKER),","	CSS_DATEPICKER_BUTTON_WRAPPER = getClassName(DATEPICKER, BUTTON, WRAPPER),","	CSS_DATEPICKER_DAY = getClassName(DATEPICKER, DAY),","	CSS_DATEPICKER_DISPLAY = getClassName(DATEPICKER, DISPLAY),","	CSS_DATEPICKER_DISPLAY_CONTENT = getClassName(DATEPICKER, DISPLAY, CONTENT),","	CSS_DATEPICKER_MONTH = getClassName(DATEPICKER, MONTH),","	CSS_DATEPICKER_SELECT_WRAPPER = getClassName(DATEPICKER, SELECT, WRAPPER),","	CSS_DATEPICKER_YEAR = getClassName(DATEPICKER, YEAR),","	CSS_HELPER_CLEARFIX = getClassName(HELPER, CLEARFIX),","","	SELECT_TPL = '<select></select>',","	SELECT_OPTION_TPL = '<option></option>',","	WRAPPER_BUTTON_TPL = '<div class=\"'+ CSS_DATEPICKER_BUTTON_WRAPPER +'\"></div>',","	WRAPPER_SELECT_TPL = '<div class='+ CSS_DATEPICKER_SELECT_WRAPPER +'></div>';","","/**"," * <p><img src=\"assets/images/aui-calendar-datepicker-select/main.png\"/></p>"," *"," * A base class for DatePickerSelect, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Select a date from Calendar to select elements</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.DatePickerSelect({"," *  srcNode: '#srcNodeId',"," *  calendar: {"," *      // locale: 'pt-br',"," *      dateFormat: '%m/%d/%y',"," *      yearRange: [ 1970, 2009 ]"," *	}"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"DatePickerSelect.html#configattributes\">Configuration Attributes</a> available for"," * DatePickerSelect."," *"," * @class DatePickerSelect"," * @param config {Object} Object literal specifying widget configuration properties."," * @constructor"," * @extends Component"," */","var DatePickerSelect = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property DatePickerSelect.NAME","		 * @type String","		 * @static","		 */","		NAME: DATEPICKER,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the DatePickerSelect.","		 *","		 * @property DatePickerSelect.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * The order the selects elements are appended to the","			 * <a href=\"DatePickerSelect.html#config_srcNode\">srcNode</a>.","			 *","			 * @attribute appendOrder","			 * @default [ 'm', 'd', 'y' ]","			 * @type Array","			 */","			appendOrder: {","				validator: isArray,","				value: [ 'm', 'd', 'y' ]","			},","","			/**","			 * DOM Node to display the button of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-buttonitem</code>.","			 *","			 * @attribute buttonNode","			 * @default Generated div element.","			 * @type String","			 */","			buttonNode: {},","","			/**","			 * <a href=\"Calendar.html\">Calendar</a> configuration Object.</a>","			 *","			 * @attribute calendar","			 * @default {}","			 * @type Object","			 */","			calendar: {","				value: {}","			},","","			/**","			 * DOM Node to display the day of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-year</code>.","			 *","			 * @attribute dayNode","			 * @default Generated div element.","			 * @type String | Node","			 */","			dayNode: {","				setter: nodeSetter,","				valueFn: createSelect","			},","","			/**","			 * Name attribute used on the","			 * <a href=\"DatePickerSelect.html#config_dayNode\">dayNode</a>.","			 *","			 * @attribute dayNodeName","			 * @default day","			 * @type String","			 */","			dayNodeName: {","				valueFn: function() {","					return this.get(DAY_NODE).get(NAME) || DAY;","				}","			},","","			/**","			 * DOM Node to display the month of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-year</code>.","			 *","			 * @attribute monthNode","			 * @default Generated div element.","			 * @type String | Node","			 */","			monthNode: {","				setter: nodeSetter,","				valueFn: createSelect","			},","","			/**","			 * Name attribute used on the","			 * <a href=\"DatePickerSelect.html#config_monthNode\">monthNode</a>.","			 *","			 * @attribute monthNodeName","			 * @default month","			 * @type String","			 */","			monthNodeName: {","				valueFn: function() {","					return this.get(MONTH_NODE).get(NAME) || MONTH;","				}","			},","","			/**","			 * If true the select element for the day will be nullable","			 *","			 * @attribute nullableDay","			 * @default false","			 * @type boolean","			 */","			nullableDay: {","				value: false","			},","","			/**","			 * If true the select element for the month will be nullable","			 *","			 * @attribute nullableMonth","			 * @default false","			 * @type boolean","			 */","			nullableMonth: {","				value: false","			},","","			/**","			 * If true the select element for the year will be nullable","			 *","			 * @attribute nullableYear","			 * @default false","			 * @type boolean","			 */","			nullableYear: {","				value: false","			},","","			/**","			 * If true the select element for the days will be automatic","			 * populated.","			 *","			 * @attribute populateDay","			 * @default true","			 * @type boolean","			 */","			populateDay: {","				value: true","			},","","			/**","			 * If true the select element for the month will be automatic","			 * populated.","			 *","			 * @attribute populateMonth","			 * @default true","			 * @type boolean","			 */","			populateMonth: {","				value: true","			},","","			/**","			 * If true the select element for the year will be automatic","			 * populated.","			 *","			 * @attribute populateYear","			 * @default true","			 * @type boolean","			 */","			populateYear: {","				value: true","			},","","			/**","			 * DOM Node to display the selects of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-select-wrapper</code>.","			 *","			 * @attribute selectWrapperNode","			 * @default Generated div element.","			 * @type String","			 */","			selectWrapperNode: {","				valueFn: function() {","					return A.Node.create(WRAPPER_SELECT_TPL);","				}","			},","","			/**","			 * Trigger element to open the calendar. Inherited from","			 * <a href=\"OverlayContext.html#config_trigger\">OverlayContext</a>.","			 *","			 * @attribute trigger","			 * @default Generated HTLM div element","			 * @type {Node | String}","			 */","			trigger: {","				setter: function(value) {","					if (value instanceof A.NodeList) {","						return value;","					}","					else if (Lang.isString(value)) {","						return A.all(value);","					}","","					return new A.NodeList(value);","				},","				valueFn: function() {","					return A.NodeList.create(WRAPPER_BUTTON_TPL);","				}","			},","","			/**","			 * DOM Node to display the year of the DatePickerSelect. If not","			 * specified try to query using HTML_PARSER an element inside","			 * contentBox which matches <code>aui-datepicker-year</code>.","			 *","			 * @attribute yearNode","			 * @default Generated div element.","			 * @type String | Node","			 */","			yearNode: {","				setter: nodeSetter,","				valueFn: createSelect","			},","","			/**","			 * Name attribute used on the","			 * <a href=\"DatePickerSelect.html#config_yearNode\">yearNode</a>.","			 *","			 * @attribute yearNodeName","			 * @default year","			 * @type String","			 */","			yearNodeName: {","				valueFn: function() {","					return this.get(YEAR_NODE).get(NAME) || YEAR;","				}","			},","","			/**","			 * Year range to be displayed on the year select element. By default","			 * it displays from -10 to +10 years from the current year.","			 *","			 * @attribute yearRange","			 * @default [ year - 10, year + 10 ]","			 * @type Array","			 */","			yearRange: {","				validator: isArray,","				valueFn: function() {","					var year = new Date().getFullYear();","","					return [ year - 10, year + 10 ];","				}","			}","		},","","		/**","		 * Object hash, defining how attribute values are to be parsed from","		 * markup contained in the widget's content box.","		 *","		 * @property DatePickerSelect.HTML_PARSER","		 * @type Object","		 * @static","		 */","		HTML_PARSER: {","			buttonNode: DOT + CSS_BUTTONITEM,","			dayNode: DOT + CSS_DATEPICKER_DAY,","			monthNode: DOT + CSS_DATEPICKER_MONTH,","			selectWrapperNode: DOT + CSS_DATEPICKER_SELECT_WRAPPER,","			trigger: DOT + CSS_DATEPICKER_BUTTON_WRAPPER,","			yearNode: DOT + CSS_DATEPICKER_YEAR","		},","","		EXTENDS: A.Component,","","		prototype: {","			/**","			 * Bind the events on the DatePickerSelect UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance._bindSelectEvents();","","				instance.after('calendar:select', instance._afterSelectDate);","			},","","			/**","			 * Descructor lifecycle implementation for the Datepicker class.","			 * Purges events attached to the node (and all child nodes).","			 *","			 * @method destructor","			 * @protected","			 */","			destructor: function() {","				var instance = this;","","				instance.datePicker.destroy();","			},","","			/**","			 * Create the DOM structure for the DatePickerSelect. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderElements();","				instance._renderTriggerButton();","				instance._renderCalendar();","			},","","			/**","			 * Sync the DatePickerSelect UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance._syncSelectsUI();","			},","","			/**","			 * Fires when a date is selected on the Calendar.","			 *","			 * @method _afterSelectDate","			 * @param {Event} event","			 * @protected","			 */","			_afterSelectDate: function(event) {","				var instance = this;","","				if (event.date.normal.length) {","					instance._syncSelectsUI();","				}","			},","","			/**","			 * Bind events on each select element (change, keypress, etc).","			 *","			 * @method _bindSelectEvents","			 * @protected","			 */","			_bindSelectEvents: function() {","				var instance = this;","","				var selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);","","				selects.on('change', instance._onSelectChange, instance);","				selects.on('keypress', instance._onSelectChange, instance);","			},","","			/**","			 * Gets an Array with the field elements in the correct order defined","			 * on <a href=\"DatePickerSelect.html#config_appendOrder\">appendOrder</a>.","			 *","			 * @method _getAppendOrder","			 * @protected","			 * @return {Array}","			 */","			_getAppendOrder: function() {","				var instance = this;","","				var appendOrder = instance.get(APPEND_ORDER);","				var id = instance.get(ID);","","				var mapping = {","					d: instance.get(DAY_NODE),","					m: instance.get(MONTH_NODE),","					y: instance.get(YEAR_NODE)","				};","","				var firstField = mapping[ appendOrder[0] ];","				var secondField = mapping[ appendOrder[1] ];","				var thirdField = mapping[ appendOrder[2] ];","","				firstField.setAttribute(DATA_COMPONENT_ID, id);","				secondField.setAttribute(DATA_COMPONENT_ID, id);","				thirdField.setAttribute(DATA_COMPONENT_ID, id);","","				return [ firstField, secondField, thirdField ];","			},","","			/**","			 * Fired on any select change.","			 *","			 * @method _onSelectChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_onSelectChange: function(event) {","				var instance = this;","","				var target = event.currentTarget || event.target;","","				var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);","","				var currentDay = instance.get(DAY_NODE).val();","				var currentMonth = instance.get(MONTH_NODE).val();","				var currentYear = instance.get(YEAR_NODE).val();","","				var validDay = (currentDay > -1);","				var validMonth = (currentMonth > -1);","				var validYear = (currentYear > -1);","","				if (validDay) {","					instance.calendar.set(CURRENT_DAY, currentDay);","				}","","				if (validMonth) {","					instance.calendar.set(CURRENT_MONTH, currentMonth);","				}","","				if (validYear) {","					instance.calendar.set(CURRENT_YEAR, currentYear);","				}","","				if (monthChanged) {","					instance._uiSetCurrentMonth();","","					if (validDay) {","						instance._selectCurrentDay();","					}","				}","","				if (validDay) {","					instance.calendar.selectCurrentDate();","				}","","				if (!validDay || !validMonth || !validYear) {","					instance.calendar.clear();","				}","			},","","			/**","			 * Populate the day select element with the correct data.","			 *","			 * @method _populateDays","			 * @protected","			 */","			_populateDays: function() {","				var instance = this;","","				if (instance.get(POPULATE_DAY)) {","					instance._populateSelect(","						instance.get(DAY_NODE),","						1,","						instance.calendar.getDaysInMonth(),","						null,","						null,","						instance.get(NULLABLE_DAY)","					);","				}","			},","","			/**","			 * Populate the month select element with the correct data.","			 *","			 * @method _populateMonths","			 * @protected","			 */","			_populateMonths: function() {","				var instance = this;","","				var localeMap = instance.calendar._getLocaleMap();","				var monthLabels = localeMap.B;","","				if (instance.get(POPULATE_MONTH)) {","					instance._populateSelect(","						instance.get(MONTH_NODE),","						0,","						(monthLabels.length - 1),","						monthLabels,","						null,","						instance.get(NULLABLE_MONTH)","					);","				}","			},","","			/**","			 * Populate the year select element with the correct data.","			 *","			 * @method _populateYears","			 * @protected","			 */","			_populateYears: function() {","				var instance = this;","","				var yearRange = instance.get(YEAR_RANGE);","","				if (instance.get(POPULATE_YEAR)) {","					instance._populateSelect(","						instance.get(YEAR_NODE),","						yearRange[0],","						yearRange[1],","						null,","						null,","						instance.get(NULLABLE_YEAR)","					);","				}","			},","","			/**","			 * Populate a select element with the data passed on the params.","			 *","			 * @method _populateSelect","			 * @param {HTMLSelectElement} select Select to be populated","			 * @param {Number} fromIndex Index to start","			 * @param {Number} toIndex Index to end","			 * @param {Object} values Object with labels to be used as content of each","			 * option. Optional.","			 * @protected","			 * @return {String}","			 */","			_populateSelect: function(select, fromIndex, toIndex, labels, values, nullable) {","				var i = 0;","				var index = fromIndex;","","				var selectEl = A.Node.getDOMNode(select);","","				select.empty();","				labels = labels || [];","				values = values || [];","","				if (nullable) {","					selectEl.options[0] = new Option(BLANK, -1);","","					i++;","				}","","				while (index <= toIndex) {","					var value = values[index] || index;","					var label = labels[index] || index;","","					selectEl.options[i] = new Option(label, index);","","					i++;","					index++;","				}","			},","","			/**","			 * Populate each select element with the correct data for the day, month","			 * and year.","			 *","			 * @method _populateSelects","			 * @protected","			 */","			_populateSelects: function() {","				var instance = this;","","				instance._populateDays();","				instance._populateMonths();","				instance._populateYears();","","				// restricting dates based on the selects values","				var monthOptions = instance.get(MONTH_NODE).all(OPTION);","				var yearOptions = instance.get(YEAR_NODE).all(OPTION);","","				var mLength = monthOptions.size() - 1;","				var yLength = yearOptions.size() - 1;","","				var firstMonth = monthOptions.item(0).val();","				var firstYear = yearOptions.item(0).val();","				var lastMonth = monthOptions.item(mLength).val();","				var lastYear = yearOptions.item(yLength).val();","","				var maxMonthDays = instance.calendar.getDaysInMonth(lastYear, lastMonth);","","				var minDate = new Date(firstYear, firstMonth, 1);","				var maxDate = new Date(lastYear, lastMonth, maxMonthDays);","","				instance.calendar.set(MAX_DATE, maxDate);","				instance.calendar.set(MIN_DATE, minDate);","			},","","			_renderCalendar: function() {","				var instance = this;","","				var datePickerConfig = {","					calendar: instance.get(CALENDAR),","					trigger: instance.get(TRIGGER).item(0)","				};","","				var datePicker = new A.DatePicker(datePickerConfig).render();","","				datePicker.addTarget(instance);","","				instance.datePicker = datePicker;","				instance.calendar = datePicker.calendar;","			},","","			/**","			 * Render DOM elements for the DatePickerSelect.","			 *","			 * @method _renderElements","			 * @protected","			 */","			_renderElements: function() {","				var instance = this;","","				var boundingBox = instance.get(BOUNDING_BOX);","				var contentBox = instance.get(CONTENT_BOX);","","				var dayNode = instance.get(DAY_NODE);","				var monthNode = instance.get(MONTH_NODE);","				var yearNode = instance.get(YEAR_NODE);","","				dayNode.addClass(CSS_DATEPICKER_DAY);","				monthNode.addClass(CSS_DATEPICKER_MONTH);","				yearNode.addClass(CSS_DATEPICKER_YEAR);","","				boundingBox.addClass(CSS_DATEPICKER_DISPLAY);","				boundingBox.addClass(CSS_HELPER_CLEARFIX);","","				contentBox.addClass(CSS_DATEPICKER_DISPLAY_CONTENT);","","				// setting name of the fields","				monthNode.set(NAME, instance.get(MONTH_NODE_NAME));","				yearNode.set(NAME, instance.get(YEAR_NODE_NAME));","				dayNode.set(NAME, instance.get(DAY_NODE_NAME));","","				if (!monthNode.inDoc(A.config.doc)) {","					// append elements","					var selectWrapper = instance.get(SELECT_WRAPPER_NODE);","					var orderedFields = instance._getAppendOrder();","","					// this textNode is to prevent layout shifting only","					// simulate the default browser space between inputs/selects on re-append","					var textNode = A.one(","						DOC.createTextNode(SPACE)","					);","","					selectWrapper.append(orderedFields[0]);","					selectWrapper.append( textNode.clone() );","					selectWrapper.append(orderedFields[1]);","					selectWrapper.append( textNode );","					selectWrapper.append(orderedFields[2]);","","					contentBox.append(selectWrapper);","				}","			},","","			/**","			 * Render DOM element for the trigger button of the DatePickerSelect.","			 *","			 * @method _renderTriggerButton","			 * @protected","			 */","			_renderTriggerButton: function() {","				var instance = this;","","				var trigger = instance.get(TRIGGER).item(0);","","				instance._buttonItem = new A.ButtonItem(","					{","						boundingBox: instance.get(BUTTON_NODE),","						icon: CALENDAR","					}","				);","","				instance.get(CONTENT_BOX).append(trigger);","","				trigger.setAttribute(DATA_COMPONENT_ID, instance.get(ID));","","				if ( trigger.test(DOT + CSS_DATEPICKER_BUTTON_WRAPPER) ) {","					// use Button if the user doesn't specify a trigger","					instance._buttonItem.render(trigger);","				}","			},","","			/**","			 * Select the current day on the respective input field.","			 *","			 * @method _selectCurrentDay","			 * @protected","			 */","			_selectCurrentDay: function() {","				var instance = this;","","				var currentDate = instance.calendar.getCurrentDate();","","				instance.get(DAY_NODE).val(","					String(currentDate.getDate())","				);","			},","","			/**","			 * Select the current month on the respective input field.","			 *","			 * @method _selectCurrentMonth","			 * @protected","			 */","			_selectCurrentMonth: function() {","				var instance = this;","","				var currentDate = instance.calendar.getCurrentDate();","","				instance.get(MONTH_NODE).val(","					String(currentDate.getMonth())","				);","			},","","			/**","			 * Select the current year on the respective input field.","			 *","			 * @method _selectCurrentYear","			 * @protected","			 */","			_selectCurrentYear: function() {","				var instance = this;","","				var currentDate = instance.calendar.getCurrentDate();","","				instance.get(YEAR_NODE).val(","					String(currentDate.getFullYear())","				);","			},","","			/**","			 * Sync the UI of each DOM Select element.","			 *","			 * @method _syncSelectsUI","			 * @protected","			 */","			_syncSelectsUI: function() {","				var instance = this;","","				instance._populateSelects();","				instance._selectCurrentDay();","				instance._selectCurrentMonth();","				instance._selectCurrentYear();","			},","","			/**","			 * Fired after","			 * <a href=\"DatePickerSelect.html#config_currentMonth\">currentMonth</a> is set.","			 *","			 * @method _uiSetCurrentMonth","			 * @param {EventFacade} event","			 * @protected","			 */","			_uiSetCurrentMonth: function(value) {","				var instance = this;","","				instance._populateDays();","			},","","			/**","			 * Fired after","			 * <a href=\"DatePickerSelect.html#config_disabled\">disabled</a> is set.","			 *","			 * @method _afterDisabledChangeDatePicker","			 * @param {EventFacade} event","			 * @protected","			 */","			_uiSetDisabled: function(disabled) {","				var instance = this;","","				DatePickerSelect.superclass._uiSetDisabled.apply(instance, arguments);","","				instance.get(DAY_NODE).set('disabled', disabled);","				instance.get(MONTH_NODE).set('disabled', disabled);","				instance.get(YEAR_NODE).set('disabled', disabled);","			}","		}","	}",");","","A.DatePickerSelect = DatePickerSelect;","","}, '@VERSION@' ,{requires:['aui-datepicker-base','aui-button-item'], skinnable:true});"];
_yuitest_coverage["/build/aui-datepicker-select/aui-datepicker-select.js"].lines = {"1":0,"9":0,"13":0,"17":0,"117":0,"196":0,"224":0,"308":0,"322":0,"323":0,"325":0,"326":0,"329":0,"332":0,"360":0,"375":0,"377":0,"409":0,"411":0,"413":0,"424":0,"426":0,"436":0,"438":0,"439":0,"440":0,"450":0,"452":0,"463":0,"465":0,"466":0,"477":0,"479":0,"481":0,"482":0,"494":0,"496":0,"497":0,"499":0,"505":0,"506":0,"507":0,"509":0,"510":0,"511":0,"513":0,"524":0,"526":0,"528":0,"530":0,"531":0,"532":0,"534":0,"535":0,"536":0,"538":0,"539":0,"542":0,"543":0,"546":0,"547":0,"550":0,"551":0,"553":0,"554":0,"558":0,"559":0,"562":0,"563":0,"574":0,"576":0,"577":0,"595":0,"597":0,"598":0,"600":0,"601":0,"619":0,"621":0,"623":0,"624":0,"648":0,"649":0,"651":0,"653":0,"654":0,"655":0,"657":0,"658":0,"660":0,"663":0,"664":0,"665":0,"667":0,"669":0,"670":0,"682":0,"684":0,"685":0,"686":0,"689":0,"690":0,"692":0,"693":0,"695":0,"696":0,"697":0,"698":0,"700":0,"702":0,"703":0,"705":0,"706":0,"710":0,"712":0,"717":0,"719":0,"721":0,"722":0,"732":0,"734":0,"735":0,"737":0,"738":0,"739":0,"741":0,"742":0,"743":0,"745":0,"746":0,"748":0,"751":0,"752":0,"753":0,"755":0,"757":0,"758":0,"762":0,"766":0,"767":0,"768":0,"769":0,"770":0,"772":0,"783":0,"785":0,"787":0,"794":0,"796":0,"798":0,"800":0,"811":0,"813":0,"815":0,"827":0,"829":0,"831":0,"843":0,"845":0,"847":0,"859":0,"861":0,"862":0,"863":0,"864":0,"876":0,"878":0,"890":0,"892":0,"894":0,"895":0,"896":0,"902":0};
_yuitest_coverage["/build/aui-datepicker-select/aui-datepicker-select.js"].functions = {"nodeSetter:12":0,"createSelect:16":0,"valueFn:195":0,"valueFn:223":0,"valueFn:307":0,"setter:321":0,"valueFn:331":0,"valueFn:359":0,"valueFn:374":0,"bindUI:408":0,"destructor:423":0,"renderUI:435":0,"syncUI:449":0,"_afterSelectDate:462":0,"_bindSelectEvents:476":0,"_getAppendOrder:493":0,"_onSelectChange:523":0,"_populateDays:573":0,"_populateMonths:594":0,"_populateYears:618":0,"_populateSelect:647":0,"_populateSelects:681":0,"_renderCalendar:709":0,"_renderElements:731":0,"_renderTriggerButton:782":0,"_selectCurrentDay:810":0,"_selectCurrentMonth:826":0,"_selectCurrentYear:842":0,"_syncSelectsUI:858":0,"_uiSetCurrentMonth:875":0,"_uiSetDisabled:889":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-datepicker-select/aui-datepicker-select.js"].coveredLines = 173;
_yuitest_coverage["/build/aui-datepicker-select/aui-datepicker-select.js"].coveredFunctions = 32;
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 1);
AUI.add('aui-datepicker-select', function(A) {
/**
 * The DatePickerSelect Utility
 *
 * @module aui-calendar
 * @submodule aui-calendar-datepicker-select
 */

_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 9);
var Lang = A.Lang,
	isArray = Lang.isArray,

	nodeSetter = function(v) {
		_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "nodeSetter", 12);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 13);
return A.one(v);
	},

	createSelect = function() {
		_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "createSelect", 16);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 17);
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
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 117);
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
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "valueFn", 195);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 196);
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
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "valueFn", 223);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 224);
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
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "valueFn", 307);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 308);
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
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "setter", 321);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 322);
if (value instanceof A.NodeList) {
						_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 323);
return value;
					}
					else {_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 325);
if (Lang.isString(value)) {
						_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 326);
return A.all(value);
					}}

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 329);
return new A.NodeList(value);
				},
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "valueFn", 331);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 332);
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
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "valueFn", 359);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 360);
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
					_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "valueFn", 374);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 375);
var year = new Date().getFullYear();

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 377);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "bindUI", 408);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 409);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 411);
instance._bindSelectEvents();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 413);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "destructor", 423);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 424);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 426);
instance.datePicker.destroy();
			},

			/**
			 * Create the DOM structure for the DatePickerSelect. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "renderUI", 435);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 436);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 438);
instance._renderElements();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 439);
instance._renderTriggerButton();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 440);
instance._renderCalendar();
			},

			/**
			 * Sync the DatePickerSelect UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "syncUI", 449);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 450);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 452);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_afterSelectDate", 462);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 463);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 465);
if (event.date.normal.length) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 466);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_bindSelectEvents", 476);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 477);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 479);
var selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 481);
selects.on('change', instance._onSelectChange, instance);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 482);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_getAppendOrder", 493);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 494);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 496);
var appendOrder = instance.get(APPEND_ORDER);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 497);
var id = instance.get(ID);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 499);
var mapping = {
					d: instance.get(DAY_NODE),
					m: instance.get(MONTH_NODE),
					y: instance.get(YEAR_NODE)
				};

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 505);
var firstField = mapping[ appendOrder[0] ];
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 506);
var secondField = mapping[ appendOrder[1] ];
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 507);
var thirdField = mapping[ appendOrder[2] ];

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 509);
firstField.setAttribute(DATA_COMPONENT_ID, id);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 510);
secondField.setAttribute(DATA_COMPONENT_ID, id);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 511);
thirdField.setAttribute(DATA_COMPONENT_ID, id);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 513);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_onSelectChange", 523);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 524);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 526);
var target = event.currentTarget || event.target;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 528);
var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 530);
var currentDay = instance.get(DAY_NODE).val();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 531);
var currentMonth = instance.get(MONTH_NODE).val();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 532);
var currentYear = instance.get(YEAR_NODE).val();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 534);
var validDay = (currentDay > -1);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 535);
var validMonth = (currentMonth > -1);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 536);
var validYear = (currentYear > -1);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 538);
if (validDay) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 539);
instance.calendar.set(CURRENT_DAY, currentDay);
				}

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 542);
if (validMonth) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 543);
instance.calendar.set(CURRENT_MONTH, currentMonth);
				}

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 546);
if (validYear) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 547);
instance.calendar.set(CURRENT_YEAR, currentYear);
				}

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 550);
if (monthChanged) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 551);
instance._uiSetCurrentMonth();

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 553);
if (validDay) {
						_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 554);
instance._selectCurrentDay();
					}
				}

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 558);
if (validDay) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 559);
instance.calendar.selectCurrentDate();
				}

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 562);
if (!validDay || !validMonth || !validYear) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 563);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_populateDays", 573);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 574);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 576);
if (instance.get(POPULATE_DAY)) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 577);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_populateMonths", 594);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 595);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 597);
var localeMap = instance.calendar._getLocaleMap();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 598);
var monthLabels = localeMap.B;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 600);
if (instance.get(POPULATE_MONTH)) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 601);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_populateYears", 618);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 619);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 621);
var yearRange = instance.get(YEAR_RANGE);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 623);
if (instance.get(POPULATE_YEAR)) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 624);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_populateSelect", 647);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 648);
var i = 0;
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 649);
var index = fromIndex;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 651);
var selectEl = A.Node.getDOMNode(select);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 653);
select.empty();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 654);
labels = labels || [];
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 655);
values = values || [];

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 657);
if (nullable) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 658);
selectEl.options[0] = new Option(BLANK, -1);

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 660);
i++;
				}

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 663);
while (index <= toIndex) {
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 664);
var value = values[index] || index;
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 665);
var label = labels[index] || index;

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 667);
selectEl.options[i] = new Option(label, index);

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 669);
i++;
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 670);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_populateSelects", 681);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 682);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 684);
instance._populateDays();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 685);
instance._populateMonths();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 686);
instance._populateYears();

				// restricting dates based on the selects values
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 689);
var monthOptions = instance.get(MONTH_NODE).all(OPTION);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 690);
var yearOptions = instance.get(YEAR_NODE).all(OPTION);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 692);
var mLength = monthOptions.size() - 1;
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 693);
var yLength = yearOptions.size() - 1;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 695);
var firstMonth = monthOptions.item(0).val();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 696);
var firstYear = yearOptions.item(0).val();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 697);
var lastMonth = monthOptions.item(mLength).val();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 698);
var lastYear = yearOptions.item(yLength).val();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 700);
var maxMonthDays = instance.calendar.getDaysInMonth(lastYear, lastMonth);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 702);
var minDate = new Date(firstYear, firstMonth, 1);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 703);
var maxDate = new Date(lastYear, lastMonth, maxMonthDays);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 705);
instance.calendar.set(MAX_DATE, maxDate);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 706);
instance.calendar.set(MIN_DATE, minDate);
			},

			_renderCalendar: function() {
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_renderCalendar", 709);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 710);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 712);
var datePickerConfig = {
					calendar: instance.get(CALENDAR),
					trigger: instance.get(TRIGGER).item(0)
				};

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 717);
var datePicker = new A.DatePicker(datePickerConfig).render();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 719);
datePicker.addTarget(instance);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 721);
instance.datePicker = datePicker;
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 722);
instance.calendar = datePicker.calendar;
			},

			/**
			 * Render DOM elements for the DatePickerSelect.
			 *
			 * @method _renderElements
			 * @protected
			 */
			_renderElements: function() {
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_renderElements", 731);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 732);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 734);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 735);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 737);
var dayNode = instance.get(DAY_NODE);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 738);
var monthNode = instance.get(MONTH_NODE);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 739);
var yearNode = instance.get(YEAR_NODE);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 741);
dayNode.addClass(CSS_DATEPICKER_DAY);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 742);
monthNode.addClass(CSS_DATEPICKER_MONTH);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 743);
yearNode.addClass(CSS_DATEPICKER_YEAR);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 745);
boundingBox.addClass(CSS_DATEPICKER_DISPLAY);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 746);
boundingBox.addClass(CSS_HELPER_CLEARFIX);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 748);
contentBox.addClass(CSS_DATEPICKER_DISPLAY_CONTENT);

				// setting name of the fields
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 751);
monthNode.set(NAME, instance.get(MONTH_NODE_NAME));
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 752);
yearNode.set(NAME, instance.get(YEAR_NODE_NAME));
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 753);
dayNode.set(NAME, instance.get(DAY_NODE_NAME));

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 755);
if (!monthNode.inDoc(A.config.doc)) {
					// append elements
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 757);
var selectWrapper = instance.get(SELECT_WRAPPER_NODE);
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 758);
var orderedFields = instance._getAppendOrder();

					// this textNode is to prevent layout shifting only
					// simulate the default browser space between inputs/selects on re-append
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 762);
var textNode = A.one(
						DOC.createTextNode(SPACE)
					);

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 766);
selectWrapper.append(orderedFields[0]);
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 767);
selectWrapper.append( textNode.clone() );
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 768);
selectWrapper.append(orderedFields[1]);
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 769);
selectWrapper.append( textNode );
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 770);
selectWrapper.append(orderedFields[2]);

					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 772);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_renderTriggerButton", 782);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 783);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 785);
var trigger = instance.get(TRIGGER).item(0);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 787);
instance._buttonItem = new A.ButtonItem(
					{
						boundingBox: instance.get(BUTTON_NODE),
						icon: CALENDAR
					}
				);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 794);
instance.get(CONTENT_BOX).append(trigger);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 796);
trigger.setAttribute(DATA_COMPONENT_ID, instance.get(ID));

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 798);
if ( trigger.test(DOT + CSS_DATEPICKER_BUTTON_WRAPPER) ) {
					// use Button if the user doesn't specify a trigger
					_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 800);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_selectCurrentDay", 810);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 811);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 813);
var currentDate = instance.calendar.getCurrentDate();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 815);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_selectCurrentMonth", 826);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 827);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 829);
var currentDate = instance.calendar.getCurrentDate();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 831);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_selectCurrentYear", 842);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 843);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 845);
var currentDate = instance.calendar.getCurrentDate();

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 847);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_syncSelectsUI", 858);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 859);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 861);
instance._populateSelects();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 862);
instance._selectCurrentDay();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 863);
instance._selectCurrentMonth();
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 864);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_uiSetCurrentMonth", 875);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 876);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 878);
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
				_yuitest_coverfunc("/build/aui-datepicker-select/aui-datepicker-select.js", "_uiSetDisabled", 889);
_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 890);
var instance = this;

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 892);
DatePickerSelect.superclass._uiSetDisabled.apply(instance, arguments);

				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 894);
instance.get(DAY_NODE).set('disabled', disabled);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 895);
instance.get(MONTH_NODE).set('disabled', disabled);
				_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 896);
instance.get(YEAR_NODE).set('disabled', disabled);
			}
		}
	}
);

_yuitest_coverline("/build/aui-datepicker-select/aui-datepicker-select.js", 902);
A.DatePickerSelect = DatePickerSelect;

}, '@VERSION@' ,{requires:['aui-datepicker-base','aui-button-item'], skinnable:true});
