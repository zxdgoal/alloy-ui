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
_yuitest_coverage["/build/aui-node-html5/aui-node-html5.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-node-html5/aui-node-html5.js",
    code: []
};
_yuitest_coverage["/build/aui-node-html5/aui-node-html5.js"].code=["AUI.add('aui-node-html5', function(A) {","/**"," * aui-node-html5 provides support for HTML shiv natively on the Alloy dom"," * methods. The HTML5 shiv just affects IE."," *"," * @module aui-node"," * @submodule aui-node-html5"," */","","if (A.UA.ie) {","	/**","	 * <p>An object that encapsulates util methods for HTML5 shiving.</p>","	 * <h2>What is a \"shiv\"?</h1>","	 * <p>To the world, a shiv is a slang term for a sharp object used as a","     * knife-like weapon. To Internet Explorer, a shiv is a script that, when","     * executed, forces the browser to recognize HTML5 elements.</p>","	 *","	 * @class A.HTML5","	 */","	var HTML5 = A.namespace('HTML5'),","		DOM_create = A.DOM._create;","","	if (!HTML5._fragHTML5Shived) {","		/**","		 * A global DocumentFragment already HTML5 shived, for performance","         * reasons. (i.e., all nodes and its HTML5 children appended to this","         * fragment iherits the styles on IE).","		 *","		 * @property A.HTML._fragHTML5Shived","		 * @type DocumentFragment (shived)","		 * @protected","		 */","		HTML5._fragHTML5Shived = YUI.AUI.html5shiv(","			A.config.doc.createDocumentFragment()","		);","	}","","	A.mix(","		HTML5,","		{","			/**","			 * Receives a <code>frag</code> and a HTML content. This method","             * shivs the HTML5 nodes appended to a Node or fragment which is not","             * on the document yet.","			 *","			 * @method IECreateFix","			 * @param {Node | DocumentFragment} frag Fragment to be fixed.","			 * @param {String} content HTML to be set (using innerHTML) on the <code>frag</code>.","			 * @return {Node | DocumentFragment}","			 */","			IECreateFix: function(frag, content) {","				var shivedFrag = HTML5._fragHTML5Shived;","","				shivedFrag.appendChild(frag);","","				frag.innerHTML = content;","","				shivedFrag.removeChild(frag);","","				return frag;","			},","","			/**","			 * AOP listener to the A.DOM._create method. This method","             * intercepts all the calls to the A.DOM._create and append the","             * generated fragment to <a","             * href=\"A.HTML5.html#property_A.HTML._fragHTML5Shived\">A.HTML._fragHTML5Shived</a>,","             * this fixes the IE bug for painting the HTML5 nodes on the HTML","             * fragment.","			 *","			 * @method _doBeforeCreate","			 * @param {String} html HTML content","			 * @param {String} doc","			 * @param {String} tag","			 * @protected","			 * @return {DocumentFragment}","			 */","			_doBeforeCreate: function(html, doc, tag) {","				var createdFrag = DOM_create.apply(this, arguments);","","				var shivedFrag = HTML5.IECreateFix(createdFrag, html);","","				return new A.Do.Halt(null, shivedFrag);","			}","		}","	);","","	A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);","}","","}, '@VERSION@' ,{requires:['collection','aui-base']});"];
_yuitest_coverage["/build/aui-node-html5/aui-node-html5.js"].lines = {"1":0,"10":0,"20":0,"23":0,"33":0,"38":0,"52":0,"54":0,"56":0,"58":0,"60":0,"79":0,"81":0,"83":0,"88":0};
_yuitest_coverage["/build/aui-node-html5/aui-node-html5.js"].functions = {"IECreateFix:51":0,"_doBeforeCreate:78":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-node-html5/aui-node-html5.js"].coveredLines = 15;
_yuitest_coverage["/build/aui-node-html5/aui-node-html5.js"].coveredFunctions = 3;
_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 1);
AUI.add('aui-node-html5', function(A) {
/**
 * aui-node-html5 provides support for HTML shiv natively on the Alloy dom
 * methods. The HTML5 shiv just affects IE.
 *
 * @module aui-node
 * @submodule aui-node-html5
 */

_yuitest_coverfunc("/build/aui-node-html5/aui-node-html5.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 10);
if (A.UA.ie) {
	/**
	 * <p>An object that encapsulates util methods for HTML5 shiving.</p>
	 * <h2>What is a "shiv"?</h1>
	 * <p>To the world, a shiv is a slang term for a sharp object used as a
     * knife-like weapon. To Internet Explorer, a shiv is a script that, when
     * executed, forces the browser to recognize HTML5 elements.</p>
	 *
	 * @class A.HTML5
	 */
	_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 20);
var HTML5 = A.namespace('HTML5'),
		DOM_create = A.DOM._create;

	_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 23);
if (!HTML5._fragHTML5Shived) {
		/**
		 * A global DocumentFragment already HTML5 shived, for performance
         * reasons. (i.e., all nodes and its HTML5 children appended to this
         * fragment iherits the styles on IE).
		 *
		 * @property A.HTML._fragHTML5Shived
		 * @type DocumentFragment (shived)
		 * @protected
		 */
		_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 33);
HTML5._fragHTML5Shived = YUI.AUI.html5shiv(
			A.config.doc.createDocumentFragment()
		);
	}

	_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 38);
A.mix(
		HTML5,
		{
			/**
			 * Receives a <code>frag</code> and a HTML content. This method
             * shivs the HTML5 nodes appended to a Node or fragment which is not
             * on the document yet.
			 *
			 * @method IECreateFix
			 * @param {Node | DocumentFragment} frag Fragment to be fixed.
			 * @param {String} content HTML to be set (using innerHTML) on the <code>frag</code>.
			 * @return {Node | DocumentFragment}
			 */
			IECreateFix: function(frag, content) {
				_yuitest_coverfunc("/build/aui-node-html5/aui-node-html5.js", "IECreateFix", 51);
_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 52);
var shivedFrag = HTML5._fragHTML5Shived;

				_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 54);
shivedFrag.appendChild(frag);

				_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 56);
frag.innerHTML = content;

				_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 58);
shivedFrag.removeChild(frag);

				_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 60);
return frag;
			},

			/**
			 * AOP listener to the A.DOM._create method. This method
             * intercepts all the calls to the A.DOM._create and append the
             * generated fragment to <a
             * href="A.HTML5.html#property_A.HTML._fragHTML5Shived">A.HTML._fragHTML5Shived</a>,
             * this fixes the IE bug for painting the HTML5 nodes on the HTML
             * fragment.
			 *
			 * @method _doBeforeCreate
			 * @param {String} html HTML content
			 * @param {String} doc
			 * @param {String} tag
			 * @protected
			 * @return {DocumentFragment}
			 */
			_doBeforeCreate: function(html, doc, tag) {
				_yuitest_coverfunc("/build/aui-node-html5/aui-node-html5.js", "_doBeforeCreate", 78);
_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 79);
var createdFrag = DOM_create.apply(this, arguments);

				_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 81);
var shivedFrag = HTML5.IECreateFix(createdFrag, html);

				_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 83);
return new A.Do.Halt(null, shivedFrag);
			}
		}
	);

	_yuitest_coverline("/build/aui-node-html5/aui-node-html5.js", 88);
A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);
}

}, '@VERSION@' ,{requires:['collection','aui-base']});
