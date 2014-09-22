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
_yuitest_coverage["/build/aui-overlay-base/aui-overlay-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-overlay-base/aui-overlay-base.js",
    code: []
};
_yuitest_coverage["/build/aui-overlay-base/aui-overlay-base.js"].code=["AUI.add('aui-overlay-base', function(A) {","/**"," * Provides a basic Overlay widget, with Standard Module content support. The Overlay widget"," * provides Page XY positioning support, alignment and centering support along with basic "," * stackable support (z-index and shimming)."," *"," * @module aui-overlay"," * @submodule aui-overlay-base"," */","","/**"," * A basic Overlay Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support)."," * It also provides alignment and centering support and uses a standard module format for it's content, with header,"," * body and footer section support."," *"," * @class OverlayBase"," * @constructor"," * @extends Component"," * @uses WidgetStdMod"," * @uses WidgetPosition"," * @uses WidgetStack"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @param {Object} object The user configuration for the instance."," */","A.OverlayBase = A.Component.create(","	{","		NAME: 'overlay',","		AUGMENTS: [A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain, A.WidgetStdMod]","	}",");","","}, '@VERSION@' ,{requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']});"];
_yuitest_coverage["/build/aui-overlay-base/aui-overlay-base.js"].lines = {"1":0,"26":0};
_yuitest_coverage["/build/aui-overlay-base/aui-overlay-base.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-overlay-base/aui-overlay-base.js"].coveredLines = 2;
_yuitest_coverage["/build/aui-overlay-base/aui-overlay-base.js"].coveredFunctions = 1;
_yuitest_coverline("/build/aui-overlay-base/aui-overlay-base.js", 1);
AUI.add('aui-overlay-base', function(A) {
/**
 * Provides a basic Overlay widget, with Standard Module content support. The Overlay widget
 * provides Page XY positioning support, alignment and centering support along with basic 
 * stackable support (z-index and shimming).
 *
 * @module aui-overlay
 * @submodule aui-overlay-base
 */

/**
 * A basic Overlay Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support).
 * It also provides alignment and centering support and uses a standard module format for it's content, with header,
 * body and footer section support.
 *
 * @class OverlayBase
 * @constructor
 * @extends Component
 * @uses WidgetStdMod
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @param {Object} object The user configuration for the instance.
 */
_yuitest_coverfunc("/build/aui-overlay-base/aui-overlay-base.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-overlay-base/aui-overlay-base.js", 26);
A.OverlayBase = A.Component.create(
	{
		NAME: 'overlay',
		AUGMENTS: [A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain, A.WidgetStdMod]
	}
);

}, '@VERSION@' ,{requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']});
