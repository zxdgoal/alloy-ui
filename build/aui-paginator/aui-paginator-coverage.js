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
_yuitest_coverage["/build/aui-paginator/aui-paginator.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-paginator/aui-paginator.js",
    code: []
};
_yuitest_coverage["/build/aui-paginator/aui-paginator.js"].code=["AUI.add('aui-paginator', function(A) {","/**"," * The Paginator Utility - The Paginator widget provides a set of controls to navigate through paged data."," *"," * @module aui-paginator"," */","","var L = A.Lang,","	isArray = L.isArray,","	isBoolean = L.isBoolean,","	isFunction = L.isFunction,","	isNumber = L.isNumber,","	isObject = L.isObject,","	isString = L.isString,","","	toInt = L.toInt,","","	ALWAYS_VISIBLE = 'alwaysVisible',","	BOUNDING_BOX = 'boundingBox',","	CIRCULAR = 'circular',","	CONTAINER = 'container',","	CONTAINERS = 'containers',","	CONTENT = 'content',","	CURRENT = 'current',","	DOT = '.',","	FIRST = 'first',","	FIRST_PAGE_LINK = 'firstPageLink',","	FIRST_PAGE_LINK_LABEL = 'firstPageLinkLabel',","	LAST = 'last',","	LAST_PAGE_LINK = 'lastPageLink',","	LAST_PAGE_LINK_LABEL = 'lastPageLinkLabel',","	LINK = 'link',","	MAX_PAGE_LINKS = 'maxPageLinks',","	NEXT = 'next',","	NEXT_PAGE_LINK = 'nextPageLink',","	NEXT_PAGE_LINK_LABEL = 'nextPageLinkLabel',","	OPTION = 'option',","	PAGE = 'page',","	PAGE_CONTAINER_TEMPLATE = 'pageContainerTemplate',","	PAGE_LINK_CONTENT = 'pageLinkContent',","	PAGE_LINK_TEMPLATE = 'pageLinkTemplate',","	PAGE_REPORT_EL = 'pageReportEl',","	PAGE_REPORT_LABEL_TEMPLATE = 'pageReportLabelTemplate',","	PAGINATOR = 'paginator',","	PER = 'per',","	PREV = 'prev',","	PREV_PAGE_LINK = 'prevPageLink',","	PREV_PAGE_LINK_LABEL = 'prevPageLinkLabel',","	REPORT = 'report',","	ROWS = 'rows',","	ROWS_PER_PAGE = 'rowsPerPage',","	ROWS_PER_PAGE_EL = 'rowsPerPageEl',","	ROWS_PER_PAGE_OPTIONS = 'rowsPerPageOptions',","	SELECT = 'select',","	SELECTED = 'selected',","	SPACE = ' ',","	STATE = 'state',","	TEMPLATE = 'template',","	TOTAL = 'total',","	TOTAL_EL = 'totalEl',","	TOTAL_LABEL = 'totalLabel',","	TOTAL_PAGES = 'totalPages',","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	isNodeList = function(v) {","		return (v instanceof A.NodeList);","	},","","	getCN = A.getClassName,","","	IE = A.UA.ie,","","	CSS_PAGINATOR = getCN(PAGINATOR),","	CSS_PAGINATOR_CONTAINER = getCN(PAGINATOR, CONTAINER),","	CSS_PAGINATOR_CONTENT = getCN(PAGINATOR, CONTENT),","	CSS_PAGINATOR_CURRENT_PAGE = getCN(PAGINATOR, CURRENT, PAGE),","	CSS_PAGINATOR_FIRST_LINK = getCN(PAGINATOR, FIRST, LINK),","	CSS_PAGINATOR_LAST_LINK = getCN(PAGINATOR, LAST, LINK),","	CSS_PAGINATOR_LINK = getCN(PAGINATOR, LINK),","	CSS_PAGINATOR_NEXT_LINK = getCN(PAGINATOR, NEXT, LINK),","	CSS_PAGINATOR_PAGE_CONTAINER = getCN(PAGINATOR, PAGE, CONTAINER),","	CSS_PAGINATOR_PAGE_LINK = getCN(PAGINATOR, PAGE, LINK),","	CSS_PAGINATOR_PAGE_REPORT = getCN(PAGINATOR, CURRENT, PAGE, REPORT),","	CSS_PAGINATOR_PREV_LINK = getCN(PAGINATOR, PREV, LINK),","	CSS_PAGINATOR_ROWS_PER_PAGE = getCN(PAGINATOR, ROWS, PER, PAGE),","	CSS_PAGINATOR_TOTAL = getCN(PAGINATOR, TOTAL),","","	TOTAL_LABEL_TPL = '(Total {total})',","	PAGE_REPORT_LABEL_TPL = '({page} of {totalPages})',","	DEFAULT_OUTPUT_TPL = '{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}',","","	GT_TPL = '&gt;',","	LT_TPL = '&lt;',","	FIRST_LINK_TPL = '<a href=\"#\" class=\"'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_FIRST_LINK)+'\"></a>',","	LAST_LINK_TPL = '<a href=\"#\" class=\"'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_LAST_LINK)+'\"></a>',","	NEXT_LINK_TPL = '<a href=\"#\" class=\"'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_NEXT_LINK)+'\"></a>',","	PAGE_CONTAINER_TPL = '<span></span>',","	PAGE_LINK_TPL = '<a href=\"#\"></a>',","	PAGE_REPORT_TPL = '<span class=\"'+concat(CSS_PAGINATOR_PAGE_REPORT)+'\"></span>',","	PREV_LINK_TPL = '<a href=\"#\" class=\"'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_PREV_LINK)+'\"></a>',","	ROWS_PER_PAGE_TPL = '<select class=\"'+CSS_PAGINATOR_ROWS_PER_PAGE+'\"></select>',","	TOTAL_TPL = '<span class=\"'+concat(CSS_PAGINATOR_TOTAL)+'\"></span>';","","/**"," * <p><img src=\"assets/images/aui-paginator/main.png\"/></p>"," *"," * A base class for Paginator, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Set of controls to navigate through paged data</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.Paginator({"," *	containers: '.paginatorA',"," *	total: 10,"," *	maxPageLinks: 10,"," *	rowsPerPage: 1,"," *	rowsPerPageOptions: [ 1, 3, 5, 7 ]"," * }).render();"," * </code></pre>"," *"," * Check the list of <a href=\"Paginator.html#configattributes\">Configuration Attributes</a> available for"," * Paginator."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class Paginator"," * @constructor"," * @extends Base"," */","var Paginator = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property Paginator.NAME","		 * @type String","		 * @static","		 */","		NAME: PAGINATOR,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the Paginator.","		 *","		 * @property Paginator.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * If true the Paginator will be always visible, even when the number","	         * of pages is 0. To hide the paginator controls automatically when","	         * there is no pages to display use <code>false</code>.","			 *","			 * @attribute alwaysVisible","			 * @default true","			 * @type boolean","			 */","			alwaysVisible: {","				value: true,","				validator: isBoolean","			},","","			circular: {","				value: false,","				validator: isBoolean","			},","","			/**","			 * The Paginator controls UI could be displayed in more than one","	         * container (i.e., in the header and footer of a list). Pass a","	         * <a href=\"NodeList.html\">NodeList</a> or a selector to grab the","	         * containers.","			 *","			 * @attribute containers","			 * @default null","			 * @type Node | String","			 */","			containers: {","				writeOnce: true,","				setter: function(v) {","					var instance = this;","","					if (isNodeList(v)) {","						return v;","					}","					else if (isString(v)) {","						return A.all(v);","					}","","					return new A.NodeList([v]);","				}","			},","","			/**","			 * The <a href=\"Node.html\">Node</a> or template to be used as the","	         * first link element.","			 *","			 * @attribute firstPageLink","			 * @default Generated anchor element.","			 * @type Node | String","			 */","			firstPageLink: {","				setter: A.one,","				valueFn: function() {","					var label = this.get(FIRST_PAGE_LINK_LABEL);","","					return A.Node.create(FIRST_LINK_TPL).html(label);","				}","			},","","			/**","			 * The label used as content of the","	         * <a href=\"Paginator.html#config_firstPageLink\">firstPageLink</a> element.","			 *","			 * @attribute firstPageLinkLabel","			 * @default 'first'","			 * @type String","			 */","			firstPageLinkLabel: {","				value: FIRST,","				validator: isString","			},","","			/**","			 * The <a href=\"Node.html\">Node</a> or template to be used as the","	         * last link element.","			 *","			 * @attribute lastPageLink","			 * @default Generated anchor element.","			 * @type Node | String","			 */","			lastPageLink: {","				setter: A.one,","				valueFn: function() {","					var label = this.get(LAST_PAGE_LINK_LABEL);","","					return A.Node.create(LAST_LINK_TPL).html(label);","				}","			},","","			/**","			 * The label used as content of the","	         * <a href=\"Paginator.html#config_lastPageLink\">lastPageLink</a> element.","			 *","			 * @attribute lastPageLinkLabel","			 * @default 'last'","			 * @type String","			 */","			lastPageLinkLabel: {","				value: LAST,","				validator: isString","			},","","			/**","			 * The max number of page links to be displayed. If lower than the","	         * total number of pages they are still navigable using next and prev","	         * links.","			 *","			 * @attribute maxPageLinks","			 * @default 10","			 * @type Number","			 */","			maxPageLinks: {","				value: 10,","				getter: function(v) {","					var totalPages = this.get(TOTAL_PAGES);","","					// maxPageLinks cannot be bigger than totalPages","					return Math.min(totalPages, v);","				},","				validator: isNumber","			},","","			/**","			 * The <a href=\"Node.html\">Node</a> or template to be used as the","	         * next link element.","			 *","			 * @attribute nextPageLink","			 * @default Generated anchor element.","			 * @type Node | String","			 */","			nextPageLink: {","				setter: A.one,","				valueFn: function() {","					var label = this.get(NEXT_PAGE_LINK_LABEL);","","					return A.Node.create(NEXT_LINK_TPL).html(label);","				}","			},","","			/**","			 * The label used as content of the","	         * <a href=\"Paginator.html#config_nextPageLink\">nextPageLink</a> element.","			 *","			 * @attribute nextPageLinkLabel","			 * @default 'next &gt;'","			 * @type String","			 */","			nextPageLinkLabel: {","				value: concat(NEXT, GT_TPL),","				validator: isString","			},","","			/**","			 * Page to display on initial paint.","			 *","			 * @attribute page","			 * @default 1","			 * @type Number","			 */","			page: {","				setter: toInt,","				value: 1","			},","","			/**","			 * HTML Template for the page links container.","			 *","			 * @attribute pageContainerTemplate","			 * @default Generated span HTML element.","			 * @type String","			 */","			pageContainerTemplate: {","				getter: function(v) {","					return A.Node.create(v).addClass(CSS_PAGINATOR_PAGE_CONTAINER);","				},","				value: PAGE_CONTAINER_TPL,","				validator: isString","			},","","			/**","			 * <p>Function which set the content of the each page element. The passed","	         * function receive as arguments the reference for the page element","	         * node, the page number and the index of the page element.</p>","	         *","	         * Example:","	         *","	         * <pre><code>function(pageEl, pageNumber, index) {","			 *	 pageEl.html(pageNumber);","			 *	}</code></pre>","			 *","			 * @attribute pageLinkContent","			 * @default Basic function to set the html of the page element with the page number.","			 * @type function","			 */","			pageLinkContent: {","				value: function(pageEl, pageNumber, index) {","					pageEl.html(pageNumber);","				},","				validator: isFunction","			},","","			/**","			 * HTML Template for the link elements.","			 *","			 * @attribute pageLinkTemplate","			 * @default Generated anchor HTML element.","			 * @type String","			 */","			pageLinkTemplate: {","				getter: function(v) {","					var node = A.Node.create(v);","","					return node.addClass(","						concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_PAGE_LINK)","					);","				},","				value: PAGE_LINK_TPL,","				validator: isString","			},","","			/**","			 * Node element to display the page report (i.e., (1 of 100)).","			 *","			 * @attribute pageReportEl","			 * @default Generated span HTML element.","			 * @type String","			 */","			pageReportEl: {","				setter: A.one,","				valueFn: function() {","					var label = this.get(PAGE_REPORT_LABEL_TEMPLATE);","","					return A.Node.create(PAGE_REPORT_TPL).html(label);","				}","			},","","			/**","			 * Template for the","	         * <a href=\"Paginator.html#config_pageReportEl\">pageReportEl</a> content.","	         * Note the placeholders for the page {page} and the total pages","	         * {totalPages}.","			 *","			 * @attribute pageReportLabelTemplate","			 * @default '({page} of {totalPages})'","			 * @type String","			 */","			pageReportLabelTemplate: {","				getter: function() {","					var instance = this;","","					return L.sub(PAGE_REPORT_LABEL_TPL, {","						page: instance.get(PAGE),","						totalPages: instance.get(TOTAL_PAGES)","					});","				},","				validator: isString","			},","","			/**","			 * The <a href=\"Node.html\">Node</a> or template to be used as the","	         * prev link element.","			 *","			 * @attribute prevPageLink","			 * @default Generated anchor element.","			 * @type Node | String","			 */","			prevPageLink: {","				setter: A.one,","				valueFn: function() {","					var label = this.get(PREV_PAGE_LINK_LABEL);","","					return A.Node.create(PREV_LINK_TPL).html(label);","				}","			},","","			/**","			 * The label used as content of the","	         * <a href=\"Paginator.html#config_prevPageLink\">prevPageLink</a> element.","			 *","			 * @attribute prevPageLinkLabel","			 * @default '&lt; prev'","			 * @type String","			 */","			prevPageLinkLabel: {","				value: concat(LT_TPL, PREV),","				validator: isString","			},","","			/**","			 * Array to be displayed on the generated HTML Select element with the","	         * <a href=\"Paginator.html#config_rowsPerPage\">rowsPerPage</a>","	         * information. (i.e., [1,3,5,7], will display these values on the","	         * select)","			 *","			 * @attribute rowsPerPageOptions","			 * @default []","			 * @type Array","			 */","			rowsPerPageOptions: {","				value: {},","				validator: isArray","			},","","			/**","			 * Number of records constituting a \"page\".","			 *","			 * @attribute rowsPerPage","			 * @default 1","			 * @type Number","			 */","			rowsPerPage: {","				setter: toInt,","				value: 1","			},","","			/**","			 * Node element to display the","	         * <a href=\"Paginator.html#config_rowsPerPage\">rowsPerPage</a>.","			 *","			 * @attribute rowsPerPageEl","			 * @default Generated select HTML element.","			 * @type Node | String","			 */","			rowsPerPageEl: {","				setter: A.one,","				getter: function(val) {","					var instance = this;","					var options = val.all(OPTION);","","					options.removeAttribute(SELECTED);","","					var selected = options.filter('[value=' + instance.get(ROWS_PER_PAGE) + ']');","","					if (selected) {","						selected.setAttribute(SELECTED, SELECTED);","					}","","					return val;","				},","				valueFn: function() {","					return A.Node.create(ROWS_PER_PAGE_TPL);","				}","			},","","			/**","			 * Generates information to the <code>changeRequest</code> event. See","	         * <a href=\"Paginator.html#method_changeRequest\">changeRequest</a>.","			 *","			 * @attribute state","			 * @default {}","			 * @type Object","			 */","			state: {","				setter: '_setState',","				getter: '_getState',","				value: {},","				validator: isObject","			},","","			/**","			 * Template used to render controls. The string will be used as","	         * innerHTML on all specified container nodes. Bracketed keys (e.g.","	         * {pageLinks}) in the string will be replaced with an instance of the","	         * so named ui component.","			 *","			 * @attribute template","			 * @default '{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}'","			 * @type String","			 */","			template: {","				getter: '_getTemplate',","				writeOnce: true,","				value: DEFAULT_OUTPUT_TPL,","				validator: isString","			},","","			/**","			 * Total number of records to paginate through.","			 *","			 * @attribute total","			 * @default 0","			 * @type Number","			 */","			total: {","				setter: '_setTotal',","				value: 0,","				validator: isNumber","			},","","			/**","			 * Node element to display the total information.","			 *","			 * @attribute totalEl","			 * @default Generated span HTML element.","			 * @type String","			 */","			totalEl: {","				setter: A.one,","				getter: function() {","					var label = this.get(TOTAL_LABEL);","","					return A.Node.create(TOTAL_TPL).html(label);","				}","			},","","			/**","			 * The label markup to the total information.","			 *","			 * @attribute totalLabel","			 * @default '(Total {total})'","			 * @type String","			 */","			totalLabel: {","				getter: function() {","					var instance = this;","","					return L.sub(TOTAL_LABEL_TPL, {","						total: instance.get(TOTAL)","					});","				},","				validator: isString","			},","","			/**","			 * Number of pages. Calculated based on the","	         * <a href=\"Paginator.html#config_total\">total</a> divided by the","	         * <a href=\"Paginator.html#config_rowsPerPage\">rowsPerPage</a>.","			 *","			 * @attribute totalPages","			 * @default 0","			 * @type Number","			 */","			totalPages: {","				readOnly: true,","				getter: function(v) {","					return Math.ceil(","						this.get(TOTAL) / this.get(ROWS_PER_PAGE)","					);","				}","			}","		},","","		prototype: {","			/**","			 * Store the last state object used on the <a href=\"Paginator.html#method_changeRequest\">changeRequest</a> event.","			 *","			 * @property lastState","			 * @type Object | null","			 * @protected","			 */","			lastState: null,","","			/**","			 * Cached template after <a href=\"YUI.html#method_substitute\">YUI","		     * substitute</a> were applied.","			 *","			 * @property templatesCache","			 * @type String","			 * @protected","			 */","			templatesCache: null,","","			/**","			 * Create the DOM structure for the Paginator. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","				var containers = instance.get(CONTAINERS);","","				containers.unselectable();","","				instance._renderRowsPerPageOptions();","","				instance._renderTemplateUI();","","				containers.addClass(CSS_PAGINATOR_CONTAINER);","			},","","			/**","			 * Bind the events on the Paginator UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance._delegateDOM();","","				instance.publish('changeRequest');","				instance.after('stateChange', A.bind(instance._afterSetState, instance));","				instance.before('stateChange', A.bind(instance._beforeSetState, instance));","","				// invoke _renderTemplateUI to recreate the template markup","				instance.after('maxPageLinksChange', A.bind(instance._renderTemplateUI, instance));","				instance.after('rowsPerPageChange', A.bind(instance._renderTemplateUI, instance));","				instance.after('totalChange', A.bind(instance._renderTemplateUI, instance));","			},","","			/**","			 * Sync the Paginator UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				// fire changeRequest to the first state","				instance.changeRequest();","			},","","			/**","			 * Descructor lifecycle implementation for the Paginator class.","			 * Purges events attached to the node (and all child nodes).","			 *","			 * @method destructor","			 * @protected","			 */","			destructor: function() {","				var instance = this;","","				instance.get(CONTAINERS).remove(true);","			},","","			/**","			 * Sync the Paginator links UI.","			 *","			 * @method _syncPageLinksUI","			 * @protected","			 */","			_syncPageLinksUI: function() {","				var instance = this;","				var containers = instance.get(CONTAINERS);","				var page = instance.get(PAGE);","","				// creating range to show on the pageLinks, keep the current page on center","				var range = instance.calculateRange(page);","","				// loop all containers","				containers.each(function(node) {","					var index = 0;","					var pageNumber = range.start;","					// query all anchor that represents the page links","					var pageLinks = node.all(DOT+CSS_PAGINATOR_PAGE_LINK);","","					if (pageLinks) {","						pageLinks.removeClass(CSS_PAGINATOR_CURRENT_PAGE);","","						// loop all pages from range.start to range.end","						while (pageNumber <= range.end) {","							// get the anchor pageEl and set the label to be the number of the current page","							var pageEl = pageLinks.item(index);","","							// invoke the handler to set the page link content","							instance.get(PAGE_LINK_CONTENT).apply(instance, [pageEl, pageNumber, index]);","","							// uset an attribute page on the anchor to retrieve later when _onClickPageLinkEl fires","							pageEl.setAttribute(PAGE, pageNumber);","","							if (pageNumber == page) {","								// search for the current page and addClass saying it's the current","								pageEl.addClass(CSS_PAGINATOR_CURRENT_PAGE);","							}","","							index++;","							pageNumber++;","						}","					}","				});","			},","","			/**","			 * Sync the Paginator page report UI.","			 *","			 * @method _syncPageLinksUI","			 * @protected","			 */","			_syncPageReportUI: function(event) {","				var instance = this;","				var containers = instance.get(CONTAINERS);","","				containers.each(function(node) {","					// search for the respective pageReportEl","					var pageReportEl = node.one(DOT+CSS_PAGINATOR_PAGE_REPORT);","","					if (pageReportEl) {","						// update its label with the page report template, eg. (1 of 100)","						pageReportEl.html(","							instance.get(PAGE_REPORT_LABEL_TEMPLATE)","						);","					}","				});","			},","","			/**","			 * Create a range to display on the pageLinks, keep the current page on","		     * center.","			 *","			 * @method calculateRange","			 * @param {Type} name description","			 * @return {Object} Object containing the start and end information.","			 */","			calculateRange: function(page) {","				var instance = this;","				var totalPages = instance.get(TOTAL_PAGES);","				var maxPageLinks = instance.get(MAX_PAGE_LINKS);","				// calculates the center page link index","				var offset = Math.ceil(maxPageLinks/2);","","				// find the start range to show on the page links","				// Math.min pick the minimum value when the page number is near totalPages value","				// this fixes when the offset is small and generates less than [maxPageLinks] page links","				var start = Math.min(","					// Math.max(x, 1) doesn't allow negative or zero values","					Math.max(page - offset, 1), (totalPages - maxPageLinks + 1)","				);","","				// find the end range, the range has always maxPageLinks size","				// so, (start + maxPageLinks - 1) try to find the end range","				// Math.min with totalPages doesn't allow values bigger than totalPages","				var end = Math.min(start + maxPageLinks - 1, totalPages);","","				return {","					start: start,","					end: end","				};","			},","","			/**","			 * Fires <a href=\"Paginator.html#event_changeRequest\">changeRequest</a>","		     * event. This is the most important event because it's responsible to","		     * update the UI, invoked <code>.setState(newState)</code> to update the","		     * UI.","			 *","			 * @method changeRequest","			 */","			changeRequest: function() {","				var instance = this;","				var state = instance.get(STATE);","","				if (instance.get(CIRCULAR)) {","					var page = state.page;","					var totalPages = state.totalPages;","","					if (state.before && (state.before.page == page)) {","						if (page <= 1) {","							state.page = totalPages;","						}","						else if (page >= totalPages) {","							state.page = 1;","						}","","						instance.set(STATE, state);","					}","				}","","				instance.fire('changeRequest', { state: state });","			},","","			/**","			 * Loop through all","		     * <a href=\"Paginator.html#config_containers\">containers</a> and execute the","		     * passed callback.","			 *","			 * @method eachContainer","			 * @param {function} fn Callback","			 */","			eachContainer: function(fn) {","				var instance = this;","","				instance.get(CONTAINERS).each(function(node) {","					if (node) {","						fn.apply(instance, arguments);","					}","				});","			},","","			/**","			 * Check if there is a next page.","			 *","			 * @method hasNextPage","			 * @return {boolean}","			 */","			hasNextPage: function() {","				var instance = this;","","				return instance.hasPage(","					instance.get(PAGE) + 1","				);","			},","","			/**","			 * Check if the <code>page</code> exists.","			 *","			 * @method hasPage","			 * @param {Number} page","			 * @return {boolean}","			 */","			hasPage: function(page) {","				var instance = this;","				var totalPages = instance.get(TOTAL_PAGES);","","				return ( (page > 0) && (page <= totalPages) );","			},","","			/**","			 * Check if there is a previous page.","			 *","			 * @method hasPrevPage","			 * @return {boolean}","			 */","			hasPrevPage: function() {","				var instance = this;","","				return instance.hasPage(","					instance.get(PAGE) - 1","				);","			},","","			/**","			 * Render rows per page options.","			 *","			 * @method _renderRowsPerPageOptions","			 * @protected","			 */","			_renderRowsPerPageOptions: function() {","				var instance = this;","				var i = 0;","				var rowsPerPageEl = instance.get(ROWS_PER_PAGE_EL);","				var rowsPerPageOptions = instance.get(ROWS_PER_PAGE_OPTIONS);","","				A.each(rowsPerPageOptions, function(value) {","					rowsPerPageEl.getDOM().options[i++] = new Option(value, value);","				});","			},","","			/**","			 * Render the UI controls based on the","		     * <a href=\"Paginator.html#config_template\">template</a>.","			 *","			 * @method _renderTemplateUI","			 * @protected","			 */","			_renderTemplateUI: function() {","				var instance = this;","				var containers = instance.get(CONTAINERS);","","				instance.templatesCache = null;","","				// loading HTML template on the containers","				containers.html(","					instance.get(TEMPLATE)","				);","","				// sync pageLinks","				instance._syncPageLinksUI();","","				// sync page report, eg. (1 of 100)","				instance._syncPageReportUI();","","				// bind the DOM events after _renderTemplateUI","				instance._bindDOMEvents();","			},","","			/**","			 * Public setter for <a href=\"Paginator.html#config_state\">state</a>.","			 *","			 * @method setState","			 * @param {Object} v New state object.","			 */","			setState: function(v) {","				var instance = this;","","				instance.set(STATE, v);","			},","","			/**","			 * Private getter for <a href=\"Paginator.html#config_state\">state</a>.","			 *","			 * @method _getState","			 * @param {Object} v Current state object.","			 * @protected","			 * @return {Object} State object.","			 */","			_getState: function(v) {","				var instance = this;","","				return {","					before: instance.lastState,","					paginator: instance,","					page: instance.get(PAGE),","					total: instance.get(TOTAL),","					totalPages: instance.get(TOTAL_PAGES),","					rowsPerPage: instance.get(ROWS_PER_PAGE)","				};","			},","","			/**","			 * Getter for <a href=\"Paginator.html#config_template\">template</a>.","			 *","			 * @method _getTemplate","			 * @param {String} v Current template.","			 * @protected","			 * @return {String} Current template.","			 */","			_getTemplate: function(v) {","				var instance = this;","","				// if template is not cached...","				if (!instance.templatesCache) {","					var page = 0;","","					var maxPageLinks = instance.get(MAX_PAGE_LINKS);","","					var pageContainer = instance.get(PAGE_CONTAINER_TEMPLATE);","","					// crate the anchor to be the page links","					while (page++ < maxPageLinks) {","						pageContainer.append(","							instance.get(PAGE_LINK_TEMPLATE)","						);","					}","","					var outer = function(key) {","						return instance.get(key).outerHTML();","					};","","					var rowsPerPageSelect = outer(ROWS_PER_PAGE_EL);","","					if (IE >= 9) {","						rowsPerPageSelect = rowsPerPageSelect.replace(/selected=\"\"/gi, '');","					}","","					// substitute the {keys} on the templates with the real outerHTML templates","					instance.templatesCache = L.sub(v,","						{","							CurrentPageReport: outer(PAGE_REPORT_EL),","							FirstPageLink: outer(FIRST_PAGE_LINK),","							LastPageLink: outer(LAST_PAGE_LINK),","							NextPageLink: outer(NEXT_PAGE_LINK),","							PageLinks: pageContainer.outerHTML(),","							PrevPageLink: outer(PREV_PAGE_LINK),","							RowsPerPageSelect: rowsPerPageSelect,","							Total: outer(TOTAL_EL)","						}","					);","				}","","				return instance.templatesCache;","			},","","			/**","			 * Private setter for <a href=\"Paginator.html#config_state\">state</a>.","			 *","			 * @method _setState","			 * @param {Object} v New state object.","			 * @protected","			 * @return {Object}","			 */","			_setState: function(v) {","				var instance = this;","","				A.each(v, function(value, key) {","					instance.set(key, value);","				});","","				return v;","			},","","			/**","			 * Setter for <a href=\"Paginator.html#config_total\">total</a>.","			 *","			 * @method _setTotal","			 * @param {Number} v","			 * @protected","			 * @return {Number}","			 */","			_setTotal: function(v) {","				var instance = this;","","				var alwaysVisible = instance.get(ALWAYS_VISIBLE);","				var containers = instance.get(CONTAINERS);","","				// if !alwaysVisible and there is nothing to show, hide it","				var visible = (alwaysVisible || (v !== 0 && v > instance.get(ROWS_PER_PAGE)));","","				containers.toggle(visible);","","				return v;","			},","","			/**","			 * Fires after the value of the","		     * <a href=\"Paginator.html#config_state\">state</a> attribute change.","			 *","			 * @method _afterSetState","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterSetState: function(event) {","				var instance = this;","","				instance._syncPageLinksUI();","				instance._syncPageReportUI();","			},","","			/**","			 * Fires before the value of the","			 * <a href=\"Paginator.html#config_state\">state</a> attribute change.","			 *","			 * @method _beforeSetState","			 * @param {EventFacade} event","			 * @protected","			 */","			_beforeSetState: function(event) {","				var instance = this;","","				instance.lastState = event.prevVal;","			},","","			/**","			 * Click event handler for the","		     * <a href=\"Paginator.html#config_firstLinkEl\">firstLinkEl</a>.","			 *","			 * @method _onClickFirstLinkEl","		     * @param {EventFacade} event","			 * @protected","			 */","			_onClickFirstLinkEl: function(event) {","				var instance = this;","","				instance.set(PAGE, 1);","","				instance.changeRequest();","","				event.halt();","			},","","			/**","			 * Click event handler for the","		     * <a href=\"Paginator.html#config_prevLinkEl\">prevLinkEl</a>.","			 *","			 * @method _onClickPrevLinkEl","		     * @param {EventFacade} event","			 * @protected","			 */","			_onClickPrevLinkEl: function(event) {","				var instance = this;","","				var page = instance.get(PAGE);","","				instance.set(PAGE, (instance.hasPrevPage() ? page - 1 : page));","","				instance.changeRequest();","","				event.halt();","			},","","			/**","			 * Click event handler for the","		     * <a href=\"Paginator.html#config_pageLinkEl\">pageLinkEl</a>.","			 *","			 * @method _onClickPageLinkEl","		     * @param {EventFacade} event","			 * @protected","			 */","			_onClickPageLinkEl: function(event) {","				var instance = this;","				var pageNumber = event.currentTarget.attr(PAGE);","","				instance.set(PAGE, pageNumber);","","				instance.changeRequest();","","				event.halt();","			},","","			/**","			 * Click event handler for the","		     * <a href=\"Paginator.html#config_nextLinkEl\">nextLinkEl</a>.","			 *","			 * @method _onClickNextLinkEl","		     * @param {EventFacade} event","			 * @protected","			 */","			_onClickNextLinkEl: function(event) {","				var instance = this;","","				var page = instance.get(PAGE);","","				instance.set(PAGE, (instance.hasNextPage() ? page + 1 : page));","","				instance.changeRequest();","","				event.halt();","			},","","			/**","			 * Click event handler for the","		     * <a href=\"Paginator.html#config_lastLinkEl\">lastLinkEl</a>.","			 *","			 * @method _onClickLastLinkEl","		     * @param {EventFacade} event","			 * @protected","			 */","			_onClickLastLinkEl: function(event) {","				var instance = this;","				var totalPages = instance.get(TOTAL_PAGES);","","				instance.set(PAGE, totalPages);","","				instance.changeRequest();","","				event.halt();","			},","","			/**","			 * Bind DOM events on the Paginator UI.","			 *","			 * @method _bindDOMEvents","			 * @protected","			 */","			_bindDOMEvents: function() {","				var instance = this;","","				// loop all containers...","				instance.eachContainer(function(node) {","					// search for selects rows per page elements","					var rowsPerPageEl = node.one(DOT+CSS_PAGINATOR_ROWS_PER_PAGE);","","					if (rowsPerPageEl) {","						// update the value with the current rowsPerPage","						rowsPerPageEl.val(","							instance.get(ROWS_PER_PAGE)","						);","","						// detach change event","						rowsPerPageEl.detach('change');","","						// bind change event to update the rowsPerPage","						rowsPerPageEl.on('change', function(event) {","							var rowsPerPage = instance.get(ROWS_PER_PAGE);","","							try {","								// prevent IE error when first access .val() on A.Node when wraps a SELECT","								rowsPerPage = event.target.val();","							}","							catch(e) {}","","							// reset the page before render the pageLinks again","							instance.set(PAGE, 1);","","							// set rowsPerPage, this will render the UI again","							instance.set(ROWS_PER_PAGE, rowsPerPage);","","							instance.changeRequest();","						});","					}","				});","			},","","			/**","			 * Delegate DOM events on the Paginator UI.","			 *","			 * @method _delegateDOM","			 * @protected","			 */","			_delegateDOM: function() {","				var instance = this;","","				instance.eachContainer(function(node, i) {","					node.delegate('click', A.bind(instance._onClickFirstLinkEl, instance), DOT+CSS_PAGINATOR_FIRST_LINK);","					node.delegate('click', A.bind(instance._onClickPrevLinkEl, instance), DOT+CSS_PAGINATOR_PREV_LINK);","					node.delegate('click', A.bind(instance._onClickPageLinkEl, instance), DOT+CSS_PAGINATOR_PAGE_LINK);","					node.delegate('click', A.bind(instance._onClickNextLinkEl, instance), DOT+CSS_PAGINATOR_NEXT_LINK);","					node.delegate('click', A.bind(instance._onClickLastLinkEl, instance), DOT+CSS_PAGINATOR_LAST_LINK);","				});","			}","		}","	}",");","","A.Paginator = Paginator;","","}, '@VERSION@' ,{requires:['aui-base'], skinnable:true});"];
_yuitest_coverage["/build/aui-paginator/aui-paginator.js"].lines = {"1":0,"8":0,"65":0,"69":0,"136":0,"188":0,"190":0,"191":0,"193":0,"194":0,"197":0,"212":0,"214":0,"242":0,"244":0,"273":0,"276":0,"292":0,"294":0,"332":0,"355":0,"369":0,"371":0,"389":0,"391":0,"407":0,"409":0,"428":0,"430":0,"485":0,"486":0,"488":0,"490":0,"492":0,"493":0,"496":0,"499":0,"558":0,"560":0,"573":0,"575":0,"594":0,"628":0,"629":0,"631":0,"633":0,"635":0,"637":0,"647":0,"649":0,"651":0,"652":0,"653":0,"656":0,"657":0,"658":0,"668":0,"671":0,"682":0,"684":0,"694":0,"695":0,"696":0,"699":0,"702":0,"703":0,"704":0,"706":0,"708":0,"709":0,"712":0,"714":0,"717":0,"720":0,"722":0,"724":0,"727":0,"728":0,"741":0,"742":0,"744":0,"746":0,"748":0,"750":0,"766":0,"767":0,"768":0,"770":0,"775":0,"783":0,"785":0,"800":0,"801":0,"803":0,"804":0,"805":0,"807":0,"808":0,"809":0,"811":0,"812":0,"815":0,"819":0,"831":0,"833":0,"834":0,"835":0,"847":0,"849":0,"862":0,"863":0,"865":0,"875":0,"877":0,"889":0,"890":0,"891":0,"892":0,"894":0,"895":0,"907":0,"908":0,"910":0,"913":0,"918":0,"921":0,"924":0,"934":0,"936":0,"948":0,"950":0,"969":0,"972":0,"973":0,"975":0,"977":0,"980":0,"981":0,"986":0,"987":0,"990":0,"992":0,"993":0,"997":0,"1011":0,"1023":0,"1025":0,"1026":0,"1029":0,"1041":0,"1043":0,"1044":0,"1047":0,"1049":0,"1051":0,"1063":0,"1065":0,"1066":0,"1078":0,"1080":0,"1092":0,"1094":0,"1096":0,"1098":0,"1110":0,"1112":0,"1114":0,"1116":0,"1118":0,"1130":0,"1131":0,"1133":0,"1135":0,"1137":0,"1149":0,"1151":0,"1153":0,"1155":0,"1157":0,"1169":0,"1170":0,"1172":0,"1174":0,"1176":0,"1186":0,"1189":0,"1191":0,"1193":0,"1195":0,"1200":0,"1203":0,"1204":0,"1206":0,"1208":0,"1213":0,"1216":0,"1218":0,"1231":0,"1233":0,"1234":0,"1235":0,"1236":0,"1237":0,"1238":0,"1245":0};
_yuitest_coverage["/build/aui-paginator/aui-paginator.js"].functions = {"concat:64":0,"isNodeList:68":0,"setter:187":0,"valueFn:211":0,"valueFn:241":0,"getter:272":0,"valueFn:291":0,"getter:331":0,"value:354":0,"getter:368":0,"valueFn:388":0,"getter:406":0,"valueFn:427":0,"getter:484":0,"valueFn:498":0,"getter:557":0,"getter:572":0,"getter:593":0,"renderUI:627":0,"bindUI:646":0,"syncUI:667":0,"destructor:681":0,"(anonymous 2):702":0,"_syncPageLinksUI:693":0,"(anonymous 3):744":0,"_syncPageReportUI:740":0,"calculateRange:765":0,"changeRequest:799":0,"(anonymous 4):833":0,"eachContainer:830":0,"hasNextPage:846":0,"hasPage:861":0,"hasPrevPage:874":0,"(anonymous 5):894":0,"_renderRowsPerPageOptions:888":0,"_renderTemplateUI:906":0,"setState:933":0,"_getState:947":0,"outer:986":0,"_getTemplate:968":0,"(anonymous 6):1025":0,"_setState:1022":0,"_setTotal:1040":0,"_afterSetState:1062":0,"_beforeSetState:1077":0,"_onClickFirstLinkEl:1091":0,"_onClickPrevLinkEl:1109":0,"_onClickPageLinkEl:1129":0,"_onClickNextLinkEl:1148":0,"_onClickLastLinkEl:1168":0,"(anonymous 8):1203":0,"(anonymous 7):1189":0,"_bindDOMEvents:1185":0,"(anonymous 9):1233":0,"_delegateDOM:1230":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-paginator/aui-paginator.js"].coveredLines = 205;
_yuitest_coverage["/build/aui-paginator/aui-paginator.js"].coveredFunctions = 56;
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1);
AUI.add('aui-paginator', function(A) {
/**
 * The Paginator Utility - The Paginator widget provides a set of controls to navigate through paged data.
 *
 * @module aui-paginator
 */

_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 8);
var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isFunction = L.isFunction,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isString = L.isString,

	toInt = L.toInt,

	ALWAYS_VISIBLE = 'alwaysVisible',
	BOUNDING_BOX = 'boundingBox',
	CIRCULAR = 'circular',
	CONTAINER = 'container',
	CONTAINERS = 'containers',
	CONTENT = 'content',
	CURRENT = 'current',
	DOT = '.',
	FIRST = 'first',
	FIRST_PAGE_LINK = 'firstPageLink',
	FIRST_PAGE_LINK_LABEL = 'firstPageLinkLabel',
	LAST = 'last',
	LAST_PAGE_LINK = 'lastPageLink',
	LAST_PAGE_LINK_LABEL = 'lastPageLinkLabel',
	LINK = 'link',
	MAX_PAGE_LINKS = 'maxPageLinks',
	NEXT = 'next',
	NEXT_PAGE_LINK = 'nextPageLink',
	NEXT_PAGE_LINK_LABEL = 'nextPageLinkLabel',
	OPTION = 'option',
	PAGE = 'page',
	PAGE_CONTAINER_TEMPLATE = 'pageContainerTemplate',
	PAGE_LINK_CONTENT = 'pageLinkContent',
	PAGE_LINK_TEMPLATE = 'pageLinkTemplate',
	PAGE_REPORT_EL = 'pageReportEl',
	PAGE_REPORT_LABEL_TEMPLATE = 'pageReportLabelTemplate',
	PAGINATOR = 'paginator',
	PER = 'per',
	PREV = 'prev',
	PREV_PAGE_LINK = 'prevPageLink',
	PREV_PAGE_LINK_LABEL = 'prevPageLinkLabel',
	REPORT = 'report',
	ROWS = 'rows',
	ROWS_PER_PAGE = 'rowsPerPage',
	ROWS_PER_PAGE_EL = 'rowsPerPageEl',
	ROWS_PER_PAGE_OPTIONS = 'rowsPerPageOptions',
	SELECT = 'select',
	SELECTED = 'selected',
	SPACE = ' ',
	STATE = 'state',
	TEMPLATE = 'template',
	TOTAL = 'total',
	TOTAL_EL = 'totalEl',
	TOTAL_LABEL = 'totalLabel',
	TOTAL_PAGES = 'totalPages',

	concat = function() {
		_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "concat", 64);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 65);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isNodeList = function(v) {
		_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "isNodeList", 68);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 69);
return (v instanceof A.NodeList);
	},

	getCN = A.getClassName,

	IE = A.UA.ie,

	CSS_PAGINATOR = getCN(PAGINATOR),
	CSS_PAGINATOR_CONTAINER = getCN(PAGINATOR, CONTAINER),
	CSS_PAGINATOR_CONTENT = getCN(PAGINATOR, CONTENT),
	CSS_PAGINATOR_CURRENT_PAGE = getCN(PAGINATOR, CURRENT, PAGE),
	CSS_PAGINATOR_FIRST_LINK = getCN(PAGINATOR, FIRST, LINK),
	CSS_PAGINATOR_LAST_LINK = getCN(PAGINATOR, LAST, LINK),
	CSS_PAGINATOR_LINK = getCN(PAGINATOR, LINK),
	CSS_PAGINATOR_NEXT_LINK = getCN(PAGINATOR, NEXT, LINK),
	CSS_PAGINATOR_PAGE_CONTAINER = getCN(PAGINATOR, PAGE, CONTAINER),
	CSS_PAGINATOR_PAGE_LINK = getCN(PAGINATOR, PAGE, LINK),
	CSS_PAGINATOR_PAGE_REPORT = getCN(PAGINATOR, CURRENT, PAGE, REPORT),
	CSS_PAGINATOR_PREV_LINK = getCN(PAGINATOR, PREV, LINK),
	CSS_PAGINATOR_ROWS_PER_PAGE = getCN(PAGINATOR, ROWS, PER, PAGE),
	CSS_PAGINATOR_TOTAL = getCN(PAGINATOR, TOTAL),

	TOTAL_LABEL_TPL = '(Total {total})',
	PAGE_REPORT_LABEL_TPL = '({page} of {totalPages})',
	DEFAULT_OUTPUT_TPL = '{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}',

	GT_TPL = '&gt;',
	LT_TPL = '&lt;',
	FIRST_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_FIRST_LINK)+'"></a>',
	LAST_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_LAST_LINK)+'"></a>',
	NEXT_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_NEXT_LINK)+'"></a>',
	PAGE_CONTAINER_TPL = '<span></span>',
	PAGE_LINK_TPL = '<a href="#"></a>',
	PAGE_REPORT_TPL = '<span class="'+concat(CSS_PAGINATOR_PAGE_REPORT)+'"></span>',
	PREV_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_PREV_LINK)+'"></a>',
	ROWS_PER_PAGE_TPL = '<select class="'+CSS_PAGINATOR_ROWS_PER_PAGE+'"></select>',
	TOTAL_TPL = '<span class="'+concat(CSS_PAGINATOR_TOTAL)+'"></span>';

/**
 * <p><img src="assets/images/aui-paginator/main.png"/></p>
 *
 * A base class for Paginator, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Set of controls to navigate through paged data</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.Paginator({
 *	containers: '.paginatorA',
 *	total: 10,
 *	maxPageLinks: 10,
 *	rowsPerPage: 1,
 *	rowsPerPageOptions: [ 1, 3, 5, 7 ]
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="Paginator.html#configattributes">Configuration Attributes</a> available for
 * Paginator.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Paginator
 * @constructor
 * @extends Base
 */
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 136);
var Paginator = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Paginator.NAME
		 * @type String
		 * @static
		 */
		NAME: PAGINATOR,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Paginator.
		 *
		 * @property Paginator.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * If true the Paginator will be always visible, even when the number
	         * of pages is 0. To hide the paginator controls automatically when
	         * there is no pages to display use <code>false</code>.
			 *
			 * @attribute alwaysVisible
			 * @default true
			 * @type boolean
			 */
			alwaysVisible: {
				value: true,
				validator: isBoolean
			},

			circular: {
				value: false,
				validator: isBoolean
			},

			/**
			 * The Paginator controls UI could be displayed in more than one
	         * container (i.e., in the header and footer of a list). Pass a
	         * <a href="NodeList.html">NodeList</a> or a selector to grab the
	         * containers.
			 *
			 * @attribute containers
			 * @default null
			 * @type Node | String
			 */
			containers: {
				writeOnce: true,
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "setter", 187);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 188);
var instance = this;

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 190);
if (isNodeList(v)) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 191);
return v;
					}
					else {_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 193);
if (isString(v)) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 194);
return A.all(v);
					}}

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 197);
return new A.NodeList([v]);
				}
			},

			/**
			 * The <a href="Node.html">Node</a> or template to be used as the
	         * first link element.
			 *
			 * @attribute firstPageLink
			 * @default Generated anchor element.
			 * @type Node | String
			 */
			firstPageLink: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "valueFn", 211);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 212);
var label = this.get(FIRST_PAGE_LINK_LABEL);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 214);
return A.Node.create(FIRST_LINK_TPL).html(label);
				}
			},

			/**
			 * The label used as content of the
	         * <a href="Paginator.html#config_firstPageLink">firstPageLink</a> element.
			 *
			 * @attribute firstPageLinkLabel
			 * @default 'first'
			 * @type String
			 */
			firstPageLinkLabel: {
				value: FIRST,
				validator: isString
			},

			/**
			 * The <a href="Node.html">Node</a> or template to be used as the
	         * last link element.
			 *
			 * @attribute lastPageLink
			 * @default Generated anchor element.
			 * @type Node | String
			 */
			lastPageLink: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "valueFn", 241);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 242);
var label = this.get(LAST_PAGE_LINK_LABEL);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 244);
return A.Node.create(LAST_LINK_TPL).html(label);
				}
			},

			/**
			 * The label used as content of the
	         * <a href="Paginator.html#config_lastPageLink">lastPageLink</a> element.
			 *
			 * @attribute lastPageLinkLabel
			 * @default 'last'
			 * @type String
			 */
			lastPageLinkLabel: {
				value: LAST,
				validator: isString
			},

			/**
			 * The max number of page links to be displayed. If lower than the
	         * total number of pages they are still navigable using next and prev
	         * links.
			 *
			 * @attribute maxPageLinks
			 * @default 10
			 * @type Number
			 */
			maxPageLinks: {
				value: 10,
				getter: function(v) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 272);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 273);
var totalPages = this.get(TOTAL_PAGES);

					// maxPageLinks cannot be bigger than totalPages
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 276);
return Math.min(totalPages, v);
				},
				validator: isNumber
			},

			/**
			 * The <a href="Node.html">Node</a> or template to be used as the
	         * next link element.
			 *
			 * @attribute nextPageLink
			 * @default Generated anchor element.
			 * @type Node | String
			 */
			nextPageLink: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "valueFn", 291);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 292);
var label = this.get(NEXT_PAGE_LINK_LABEL);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 294);
return A.Node.create(NEXT_LINK_TPL).html(label);
				}
			},

			/**
			 * The label used as content of the
	         * <a href="Paginator.html#config_nextPageLink">nextPageLink</a> element.
			 *
			 * @attribute nextPageLinkLabel
			 * @default 'next &gt;'
			 * @type String
			 */
			nextPageLinkLabel: {
				value: concat(NEXT, GT_TPL),
				validator: isString
			},

			/**
			 * Page to display on initial paint.
			 *
			 * @attribute page
			 * @default 1
			 * @type Number
			 */
			page: {
				setter: toInt,
				value: 1
			},

			/**
			 * HTML Template for the page links container.
			 *
			 * @attribute pageContainerTemplate
			 * @default Generated span HTML element.
			 * @type String
			 */
			pageContainerTemplate: {
				getter: function(v) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 331);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 332);
return A.Node.create(v).addClass(CSS_PAGINATOR_PAGE_CONTAINER);
				},
				value: PAGE_CONTAINER_TPL,
				validator: isString
			},

			/**
			 * <p>Function which set the content of the each page element. The passed
	         * function receive as arguments the reference for the page element
	         * node, the page number and the index of the page element.</p>
	         *
	         * Example:
	         *
	         * <pre><code>function(pageEl, pageNumber, index) {
			 *	 pageEl.html(pageNumber);
			 *	}</code></pre>
			 *
			 * @attribute pageLinkContent
			 * @default Basic function to set the html of the page element with the page number.
			 * @type function
			 */
			pageLinkContent: {
				value: function(pageEl, pageNumber, index) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "value", 354);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 355);
pageEl.html(pageNumber);
				},
				validator: isFunction
			},

			/**
			 * HTML Template for the link elements.
			 *
			 * @attribute pageLinkTemplate
			 * @default Generated anchor HTML element.
			 * @type String
			 */
			pageLinkTemplate: {
				getter: function(v) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 368);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 369);
var node = A.Node.create(v);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 371);
return node.addClass(
						concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_PAGE_LINK)
					);
				},
				value: PAGE_LINK_TPL,
				validator: isString
			},

			/**
			 * Node element to display the page report (i.e., (1 of 100)).
			 *
			 * @attribute pageReportEl
			 * @default Generated span HTML element.
			 * @type String
			 */
			pageReportEl: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "valueFn", 388);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 389);
var label = this.get(PAGE_REPORT_LABEL_TEMPLATE);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 391);
return A.Node.create(PAGE_REPORT_TPL).html(label);
				}
			},

			/**
			 * Template for the
	         * <a href="Paginator.html#config_pageReportEl">pageReportEl</a> content.
	         * Note the placeholders for the page {page} and the total pages
	         * {totalPages}.
			 *
			 * @attribute pageReportLabelTemplate
			 * @default '({page} of {totalPages})'
			 * @type String
			 */
			pageReportLabelTemplate: {
				getter: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 406);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 407);
var instance = this;

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 409);
return L.sub(PAGE_REPORT_LABEL_TPL, {
						page: instance.get(PAGE),
						totalPages: instance.get(TOTAL_PAGES)
					});
				},
				validator: isString
			},

			/**
			 * The <a href="Node.html">Node</a> or template to be used as the
	         * prev link element.
			 *
			 * @attribute prevPageLink
			 * @default Generated anchor element.
			 * @type Node | String
			 */
			prevPageLink: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "valueFn", 427);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 428);
var label = this.get(PREV_PAGE_LINK_LABEL);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 430);
return A.Node.create(PREV_LINK_TPL).html(label);
				}
			},

			/**
			 * The label used as content of the
	         * <a href="Paginator.html#config_prevPageLink">prevPageLink</a> element.
			 *
			 * @attribute prevPageLinkLabel
			 * @default '&lt; prev'
			 * @type String
			 */
			prevPageLinkLabel: {
				value: concat(LT_TPL, PREV),
				validator: isString
			},

			/**
			 * Array to be displayed on the generated HTML Select element with the
	         * <a href="Paginator.html#config_rowsPerPage">rowsPerPage</a>
	         * information. (i.e., [1,3,5,7], will display these values on the
	         * select)
			 *
			 * @attribute rowsPerPageOptions
			 * @default []
			 * @type Array
			 */
			rowsPerPageOptions: {
				value: {},
				validator: isArray
			},

			/**
			 * Number of records constituting a "page".
			 *
			 * @attribute rowsPerPage
			 * @default 1
			 * @type Number
			 */
			rowsPerPage: {
				setter: toInt,
				value: 1
			},

			/**
			 * Node element to display the
	         * <a href="Paginator.html#config_rowsPerPage">rowsPerPage</a>.
			 *
			 * @attribute rowsPerPageEl
			 * @default Generated select HTML element.
			 * @type Node | String
			 */
			rowsPerPageEl: {
				setter: A.one,
				getter: function(val) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 484);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 485);
var instance = this;
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 486);
var options = val.all(OPTION);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 488);
options.removeAttribute(SELECTED);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 490);
var selected = options.filter('[value=' + instance.get(ROWS_PER_PAGE) + ']');

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 492);
if (selected) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 493);
selected.setAttribute(SELECTED, SELECTED);
					}

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 496);
return val;
				},
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "valueFn", 498);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 499);
return A.Node.create(ROWS_PER_PAGE_TPL);
				}
			},

			/**
			 * Generates information to the <code>changeRequest</code> event. See
	         * <a href="Paginator.html#method_changeRequest">changeRequest</a>.
			 *
			 * @attribute state
			 * @default {}
			 * @type Object
			 */
			state: {
				setter: '_setState',
				getter: '_getState',
				value: {},
				validator: isObject
			},

			/**
			 * Template used to render controls. The string will be used as
	         * innerHTML on all specified container nodes. Bracketed keys (e.g.
	         * {pageLinks}) in the string will be replaced with an instance of the
	         * so named ui component.
			 *
			 * @attribute template
			 * @default '{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}'
			 * @type String
			 */
			template: {
				getter: '_getTemplate',
				writeOnce: true,
				value: DEFAULT_OUTPUT_TPL,
				validator: isString
			},

			/**
			 * Total number of records to paginate through.
			 *
			 * @attribute total
			 * @default 0
			 * @type Number
			 */
			total: {
				setter: '_setTotal',
				value: 0,
				validator: isNumber
			},

			/**
			 * Node element to display the total information.
			 *
			 * @attribute totalEl
			 * @default Generated span HTML element.
			 * @type String
			 */
			totalEl: {
				setter: A.one,
				getter: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 557);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 558);
var label = this.get(TOTAL_LABEL);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 560);
return A.Node.create(TOTAL_TPL).html(label);
				}
			},

			/**
			 * The label markup to the total information.
			 *
			 * @attribute totalLabel
			 * @default '(Total {total})'
			 * @type String
			 */
			totalLabel: {
				getter: function() {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 572);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 573);
var instance = this;

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 575);
return L.sub(TOTAL_LABEL_TPL, {
						total: instance.get(TOTAL)
					});
				},
				validator: isString
			},

			/**
			 * Number of pages. Calculated based on the
	         * <a href="Paginator.html#config_total">total</a> divided by the
	         * <a href="Paginator.html#config_rowsPerPage">rowsPerPage</a>.
			 *
			 * @attribute totalPages
			 * @default 0
			 * @type Number
			 */
			totalPages: {
				readOnly: true,
				getter: function(v) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "getter", 593);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 594);
return Math.ceil(
						this.get(TOTAL) / this.get(ROWS_PER_PAGE)
					);
				}
			}
		},

		prototype: {
			/**
			 * Store the last state object used on the <a href="Paginator.html#method_changeRequest">changeRequest</a> event.
			 *
			 * @property lastState
			 * @type Object | null
			 * @protected
			 */
			lastState: null,

			/**
			 * Cached template after <a href="YUI.html#method_substitute">YUI
		     * substitute</a> were applied.
			 *
			 * @property templatesCache
			 * @type String
			 * @protected
			 */
			templatesCache: null,

			/**
			 * Create the DOM structure for the Paginator. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "renderUI", 627);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 628);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 629);
var containers = instance.get(CONTAINERS);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 631);
containers.unselectable();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 633);
instance._renderRowsPerPageOptions();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 635);
instance._renderTemplateUI();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 637);
containers.addClass(CSS_PAGINATOR_CONTAINER);
			},

			/**
			 * Bind the events on the Paginator UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "bindUI", 646);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 647);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 649);
instance._delegateDOM();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 651);
instance.publish('changeRequest');
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 652);
instance.after('stateChange', A.bind(instance._afterSetState, instance));
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 653);
instance.before('stateChange', A.bind(instance._beforeSetState, instance));

				// invoke _renderTemplateUI to recreate the template markup
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 656);
instance.after('maxPageLinksChange', A.bind(instance._renderTemplateUI, instance));
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 657);
instance.after('rowsPerPageChange', A.bind(instance._renderTemplateUI, instance));
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 658);
instance.after('totalChange', A.bind(instance._renderTemplateUI, instance));
			},

			/**
			 * Sync the Paginator UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "syncUI", 667);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 668);
var instance = this;

				// fire changeRequest to the first state
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 671);
instance.changeRequest();
			},

			/**
			 * Descructor lifecycle implementation for the Paginator class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destructor
			 * @protected
			 */
			destructor: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "destructor", 681);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 682);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 684);
instance.get(CONTAINERS).remove(true);
			},

			/**
			 * Sync the Paginator links UI.
			 *
			 * @method _syncPageLinksUI
			 * @protected
			 */
			_syncPageLinksUI: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_syncPageLinksUI", 693);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 694);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 695);
var containers = instance.get(CONTAINERS);
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 696);
var page = instance.get(PAGE);

				// creating range to show on the pageLinks, keep the current page on center
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 699);
var range = instance.calculateRange(page);

				// loop all containers
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 702);
containers.each(function(node) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 2)", 702);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 703);
var index = 0;
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 704);
var pageNumber = range.start;
					// query all anchor that represents the page links
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 706);
var pageLinks = node.all(DOT+CSS_PAGINATOR_PAGE_LINK);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 708);
if (pageLinks) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 709);
pageLinks.removeClass(CSS_PAGINATOR_CURRENT_PAGE);

						// loop all pages from range.start to range.end
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 712);
while (pageNumber <= range.end) {
							// get the anchor pageEl and set the label to be the number of the current page
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 714);
var pageEl = pageLinks.item(index);

							// invoke the handler to set the page link content
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 717);
instance.get(PAGE_LINK_CONTENT).apply(instance, [pageEl, pageNumber, index]);

							// uset an attribute page on the anchor to retrieve later when _onClickPageLinkEl fires
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 720);
pageEl.setAttribute(PAGE, pageNumber);

							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 722);
if (pageNumber == page) {
								// search for the current page and addClass saying it's the current
								_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 724);
pageEl.addClass(CSS_PAGINATOR_CURRENT_PAGE);
							}

							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 727);
index++;
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 728);
pageNumber++;
						}
					}
				});
			},

			/**
			 * Sync the Paginator page report UI.
			 *
			 * @method _syncPageLinksUI
			 * @protected
			 */
			_syncPageReportUI: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_syncPageReportUI", 740);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 741);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 742);
var containers = instance.get(CONTAINERS);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 744);
containers.each(function(node) {
					// search for the respective pageReportEl
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 3)", 744);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 746);
var pageReportEl = node.one(DOT+CSS_PAGINATOR_PAGE_REPORT);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 748);
if (pageReportEl) {
						// update its label with the page report template, eg. (1 of 100)
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 750);
pageReportEl.html(
							instance.get(PAGE_REPORT_LABEL_TEMPLATE)
						);
					}
				});
			},

			/**
			 * Create a range to display on the pageLinks, keep the current page on
		     * center.
			 *
			 * @method calculateRange
			 * @param {Type} name description
			 * @return {Object} Object containing the start and end information.
			 */
			calculateRange: function(page) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "calculateRange", 765);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 766);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 767);
var totalPages = instance.get(TOTAL_PAGES);
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 768);
var maxPageLinks = instance.get(MAX_PAGE_LINKS);
				// calculates the center page link index
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 770);
var offset = Math.ceil(maxPageLinks/2);

				// find the start range to show on the page links
				// Math.min pick the minimum value when the page number is near totalPages value
				// this fixes when the offset is small and generates less than [maxPageLinks] page links
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 775);
var start = Math.min(
					// Math.max(x, 1) doesn't allow negative or zero values
					Math.max(page - offset, 1), (totalPages - maxPageLinks + 1)
				);

				// find the end range, the range has always maxPageLinks size
				// so, (start + maxPageLinks - 1) try to find the end range
				// Math.min with totalPages doesn't allow values bigger than totalPages
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 783);
var end = Math.min(start + maxPageLinks - 1, totalPages);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 785);
return {
					start: start,
					end: end
				};
			},

			/**
			 * Fires <a href="Paginator.html#event_changeRequest">changeRequest</a>
		     * event. This is the most important event because it's responsible to
		     * update the UI, invoked <code>.setState(newState)</code> to update the
		     * UI.
			 *
			 * @method changeRequest
			 */
			changeRequest: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "changeRequest", 799);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 800);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 801);
var state = instance.get(STATE);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 803);
if (instance.get(CIRCULAR)) {
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 804);
var page = state.page;
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 805);
var totalPages = state.totalPages;

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 807);
if (state.before && (state.before.page == page)) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 808);
if (page <= 1) {
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 809);
state.page = totalPages;
						}
						else {_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 811);
if (page >= totalPages) {
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 812);
state.page = 1;
						}}

						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 815);
instance.set(STATE, state);
					}
				}

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 819);
instance.fire('changeRequest', { state: state });
			},

			/**
			 * Loop through all
		     * <a href="Paginator.html#config_containers">containers</a> and execute the
		     * passed callback.
			 *
			 * @method eachContainer
			 * @param {function} fn Callback
			 */
			eachContainer: function(fn) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "eachContainer", 830);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 831);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 833);
instance.get(CONTAINERS).each(function(node) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 4)", 833);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 834);
if (node) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 835);
fn.apply(instance, arguments);
					}
				});
			},

			/**
			 * Check if there is a next page.
			 *
			 * @method hasNextPage
			 * @return {boolean}
			 */
			hasNextPage: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "hasNextPage", 846);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 847);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 849);
return instance.hasPage(
					instance.get(PAGE) + 1
				);
			},

			/**
			 * Check if the <code>page</code> exists.
			 *
			 * @method hasPage
			 * @param {Number} page
			 * @return {boolean}
			 */
			hasPage: function(page) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "hasPage", 861);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 862);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 863);
var totalPages = instance.get(TOTAL_PAGES);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 865);
return ( (page > 0) && (page <= totalPages) );
			},

			/**
			 * Check if there is a previous page.
			 *
			 * @method hasPrevPage
			 * @return {boolean}
			 */
			hasPrevPage: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "hasPrevPage", 874);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 875);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 877);
return instance.hasPage(
					instance.get(PAGE) - 1
				);
			},

			/**
			 * Render rows per page options.
			 *
			 * @method _renderRowsPerPageOptions
			 * @protected
			 */
			_renderRowsPerPageOptions: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_renderRowsPerPageOptions", 888);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 889);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 890);
var i = 0;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 891);
var rowsPerPageEl = instance.get(ROWS_PER_PAGE_EL);
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 892);
var rowsPerPageOptions = instance.get(ROWS_PER_PAGE_OPTIONS);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 894);
A.each(rowsPerPageOptions, function(value) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 5)", 894);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 895);
rowsPerPageEl.getDOM().options[i++] = new Option(value, value);
				});
			},

			/**
			 * Render the UI controls based on the
		     * <a href="Paginator.html#config_template">template</a>.
			 *
			 * @method _renderTemplateUI
			 * @protected
			 */
			_renderTemplateUI: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_renderTemplateUI", 906);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 907);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 908);
var containers = instance.get(CONTAINERS);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 910);
instance.templatesCache = null;

				// loading HTML template on the containers
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 913);
containers.html(
					instance.get(TEMPLATE)
				);

				// sync pageLinks
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 918);
instance._syncPageLinksUI();

				// sync page report, eg. (1 of 100)
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 921);
instance._syncPageReportUI();

				// bind the DOM events after _renderTemplateUI
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 924);
instance._bindDOMEvents();
			},

			/**
			 * Public setter for <a href="Paginator.html#config_state">state</a>.
			 *
			 * @method setState
			 * @param {Object} v New state object.
			 */
			setState: function(v) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "setState", 933);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 934);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 936);
instance.set(STATE, v);
			},

			/**
			 * Private getter for <a href="Paginator.html#config_state">state</a>.
			 *
			 * @method _getState
			 * @param {Object} v Current state object.
			 * @protected
			 * @return {Object} State object.
			 */
			_getState: function(v) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_getState", 947);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 948);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 950);
return {
					before: instance.lastState,
					paginator: instance,
					page: instance.get(PAGE),
					total: instance.get(TOTAL),
					totalPages: instance.get(TOTAL_PAGES),
					rowsPerPage: instance.get(ROWS_PER_PAGE)
				};
			},

			/**
			 * Getter for <a href="Paginator.html#config_template">template</a>.
			 *
			 * @method _getTemplate
			 * @param {String} v Current template.
			 * @protected
			 * @return {String} Current template.
			 */
			_getTemplate: function(v) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_getTemplate", 968);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 969);
var instance = this;

				// if template is not cached...
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 972);
if (!instance.templatesCache) {
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 973);
var page = 0;

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 975);
var maxPageLinks = instance.get(MAX_PAGE_LINKS);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 977);
var pageContainer = instance.get(PAGE_CONTAINER_TEMPLATE);

					// crate the anchor to be the page links
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 980);
while (page++ < maxPageLinks) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 981);
pageContainer.append(
							instance.get(PAGE_LINK_TEMPLATE)
						);
					}

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 986);
var outer = function(key) {
						_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "outer", 986);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 987);
return instance.get(key).outerHTML();
					};

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 990);
var rowsPerPageSelect = outer(ROWS_PER_PAGE_EL);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 992);
if (IE >= 9) {
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 993);
rowsPerPageSelect = rowsPerPageSelect.replace(/selected=""/gi, '');
					}

					// substitute the {keys} on the templates with the real outerHTML templates
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 997);
instance.templatesCache = L.sub(v,
						{
							CurrentPageReport: outer(PAGE_REPORT_EL),
							FirstPageLink: outer(FIRST_PAGE_LINK),
							LastPageLink: outer(LAST_PAGE_LINK),
							NextPageLink: outer(NEXT_PAGE_LINK),
							PageLinks: pageContainer.outerHTML(),
							PrevPageLink: outer(PREV_PAGE_LINK),
							RowsPerPageSelect: rowsPerPageSelect,
							Total: outer(TOTAL_EL)
						}
					);
				}

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1011);
return instance.templatesCache;
			},

			/**
			 * Private setter for <a href="Paginator.html#config_state">state</a>.
			 *
			 * @method _setState
			 * @param {Object} v New state object.
			 * @protected
			 * @return {Object}
			 */
			_setState: function(v) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_setState", 1022);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1023);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1025);
A.each(v, function(value, key) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 6)", 1025);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1026);
instance.set(key, value);
				});

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1029);
return v;
			},

			/**
			 * Setter for <a href="Paginator.html#config_total">total</a>.
			 *
			 * @method _setTotal
			 * @param {Number} v
			 * @protected
			 * @return {Number}
			 */
			_setTotal: function(v) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_setTotal", 1040);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1041);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1043);
var alwaysVisible = instance.get(ALWAYS_VISIBLE);
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1044);
var containers = instance.get(CONTAINERS);

				// if !alwaysVisible and there is nothing to show, hide it
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1047);
var visible = (alwaysVisible || (v !== 0 && v > instance.get(ROWS_PER_PAGE)));

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1049);
containers.toggle(visible);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1051);
return v;
			},

			/**
			 * Fires after the value of the
		     * <a href="Paginator.html#config_state">state</a> attribute change.
			 *
			 * @method _afterSetState
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterSetState: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_afterSetState", 1062);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1063);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1065);
instance._syncPageLinksUI();
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1066);
instance._syncPageReportUI();
			},

			/**
			 * Fires before the value of the
			 * <a href="Paginator.html#config_state">state</a> attribute change.
			 *
			 * @method _beforeSetState
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeSetState: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_beforeSetState", 1077);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1078);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1080);
instance.lastState = event.prevVal;
			},

			/**
			 * Click event handler for the
		     * <a href="Paginator.html#config_firstLinkEl">firstLinkEl</a>.
			 *
			 * @method _onClickFirstLinkEl
		     * @param {EventFacade} event
			 * @protected
			 */
			_onClickFirstLinkEl: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_onClickFirstLinkEl", 1091);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1092);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1094);
instance.set(PAGE, 1);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1096);
instance.changeRequest();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1098);
event.halt();
			},

			/**
			 * Click event handler for the
		     * <a href="Paginator.html#config_prevLinkEl">prevLinkEl</a>.
			 *
			 * @method _onClickPrevLinkEl
		     * @param {EventFacade} event
			 * @protected
			 */
			_onClickPrevLinkEl: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_onClickPrevLinkEl", 1109);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1110);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1112);
var page = instance.get(PAGE);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1114);
instance.set(PAGE, (instance.hasPrevPage() ? page - 1 : page));

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1116);
instance.changeRequest();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1118);
event.halt();
			},

			/**
			 * Click event handler for the
		     * <a href="Paginator.html#config_pageLinkEl">pageLinkEl</a>.
			 *
			 * @method _onClickPageLinkEl
		     * @param {EventFacade} event
			 * @protected
			 */
			_onClickPageLinkEl: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_onClickPageLinkEl", 1129);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1130);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1131);
var pageNumber = event.currentTarget.attr(PAGE);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1133);
instance.set(PAGE, pageNumber);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1135);
instance.changeRequest();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1137);
event.halt();
			},

			/**
			 * Click event handler for the
		     * <a href="Paginator.html#config_nextLinkEl">nextLinkEl</a>.
			 *
			 * @method _onClickNextLinkEl
		     * @param {EventFacade} event
			 * @protected
			 */
			_onClickNextLinkEl: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_onClickNextLinkEl", 1148);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1149);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1151);
var page = instance.get(PAGE);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1153);
instance.set(PAGE, (instance.hasNextPage() ? page + 1 : page));

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1155);
instance.changeRequest();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1157);
event.halt();
			},

			/**
			 * Click event handler for the
		     * <a href="Paginator.html#config_lastLinkEl">lastLinkEl</a>.
			 *
			 * @method _onClickLastLinkEl
		     * @param {EventFacade} event
			 * @protected
			 */
			_onClickLastLinkEl: function(event) {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_onClickLastLinkEl", 1168);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1169);
var instance = this;
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1170);
var totalPages = instance.get(TOTAL_PAGES);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1172);
instance.set(PAGE, totalPages);

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1174);
instance.changeRequest();

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1176);
event.halt();
			},

			/**
			 * Bind DOM events on the Paginator UI.
			 *
			 * @method _bindDOMEvents
			 * @protected
			 */
			_bindDOMEvents: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_bindDOMEvents", 1185);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1186);
var instance = this;

				// loop all containers...
				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1189);
instance.eachContainer(function(node) {
					// search for selects rows per page elements
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 7)", 1189);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1191);
var rowsPerPageEl = node.one(DOT+CSS_PAGINATOR_ROWS_PER_PAGE);

					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1193);
if (rowsPerPageEl) {
						// update the value with the current rowsPerPage
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1195);
rowsPerPageEl.val(
							instance.get(ROWS_PER_PAGE)
						);

						// detach change event
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1200);
rowsPerPageEl.detach('change');

						// bind change event to update the rowsPerPage
						_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1203);
rowsPerPageEl.on('change', function(event) {
							_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 8)", 1203);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1204);
var rowsPerPage = instance.get(ROWS_PER_PAGE);

							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1206);
try {
								// prevent IE error when first access .val() on A.Node when wraps a SELECT
								_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1208);
rowsPerPage = event.target.val();
							}
							catch(e) {}

							// reset the page before render the pageLinks again
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1213);
instance.set(PAGE, 1);

							// set rowsPerPage, this will render the UI again
							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1216);
instance.set(ROWS_PER_PAGE, rowsPerPage);

							_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1218);
instance.changeRequest();
						});
					}
				});
			},

			/**
			 * Delegate DOM events on the Paginator UI.
			 *
			 * @method _delegateDOM
			 * @protected
			 */
			_delegateDOM: function() {
				_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "_delegateDOM", 1230);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1231);
var instance = this;

				_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1233);
instance.eachContainer(function(node, i) {
					_yuitest_coverfunc("/build/aui-paginator/aui-paginator.js", "(anonymous 9)", 1233);
_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1234);
node.delegate('click', A.bind(instance._onClickFirstLinkEl, instance), DOT+CSS_PAGINATOR_FIRST_LINK);
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1235);
node.delegate('click', A.bind(instance._onClickPrevLinkEl, instance), DOT+CSS_PAGINATOR_PREV_LINK);
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1236);
node.delegate('click', A.bind(instance._onClickPageLinkEl, instance), DOT+CSS_PAGINATOR_PAGE_LINK);
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1237);
node.delegate('click', A.bind(instance._onClickNextLinkEl, instance), DOT+CSS_PAGINATOR_NEXT_LINK);
					_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1238);
node.delegate('click', A.bind(instance._onClickLastLinkEl, instance), DOT+CSS_PAGINATOR_LAST_LINK);
				});
			}
		}
	}
);

_yuitest_coverline("/build/aui-paginator/aui-paginator.js", 1245);
A.Paginator = Paginator;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:true});
