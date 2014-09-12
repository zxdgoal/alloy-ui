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
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-image-cropper/aui-image-cropper.js",
    code: []
};
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].code=["AUI.add('aui-image-cropper', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isNumber = Lang.isNumber,","","	parseNumber = function(num) {","		return parseInt(num, 10) || 0;","	},","","	NAME = 'image-cropper',","","	CSS_CROP = A.getClassName(NAME, 'crop'),","	CSS_CROP_OUTLINE = A.getClassName(NAME, 'crop', 'outline'),","	CSS_OVERLAY = A.getClassName(NAME, 'overlay');","	CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');","","var ImageCropper = A.Component.create(","	{","		NAME: NAME,","","		ATTRS: {","			cropHeight: {","				value: 100,","				validator: isNumber","			},","","			cropWidth: {","				value: 100,","				validator: isNumber","			},","","			minWidth: {","				value: undefined","			},","","			minHeight: {","				value: undefined","			},","","			movable: {","				value: true,","				validator: isBoolean","			},","","			preserveRatio: {","				value: false,","				validator: isBoolean","			},","","			region: {","				getter: '_getCropRegion',","				value: {}","			},","","			resizable: {","				value: true,","				validator: isBoolean","			},","","			x: {","				value: 0,","				setter: Math.round,","				validator: isNumber","			},","","			y: {","				value: 0,","				setter: Math.round,","				validator: isNumber","			}","		},","","		UI_ATTRS: [","			'cropHeight',","			'cropWidth',","			'minWidth',","			'minHeight',","			'movable',","			'resizable',","			'x',","			'y'","		],","","		prototype: {","			renderUI: function() {","				var instance = this;","","				var boundingBox = instance.get('boundingBox');","				var imageNode = instance.get('srcNode');","","				instance.cropNode = A.Node.create('<div class=\"' + CSS_CROP + '\"></div>');","				instance.cropNode.append(A.Node.create('<div class=\"' + CSS_CROP_OUTLINE + '\"></div>'));","","				instance.overlay = A.Node.create('<div class=\"' + CSS_OVERLAY + '\"></div>');","","				A.all([instance.cropNode, instance.overlay]).appendTo(boundingBox);","","				instance._boundingBox = boundingBox;","","				instance._renderDrag();","				instance._renderResize();","			},","","			bindUI: function() {","				var instance = this;","","				instance._fireCropEventTask = A.debounce(instance._fireCropEvent, 10, instance);","","				instance.publish(","					'crop',","					{","						defaultFn: instance._defCropFn","					}","				);","","				instance.on(['drag:start', 'resize:start'], A.debounce(instance._syncRegion, 25));","","				instance.after(['drag:drag', 'resize:resize'], instance._fireCropEvent, instance);","","				instance.after(","					['xChange', 'yChange', 'cropWidthChange', 'cropHeightChange'],","					function(event) {","						instance._fireCropEventTask(event);","","						instance._syncCropNodeUI();","					}","				);","","				instance._createHover();","			},","","			syncUI: function() {","				var instance = this;","","				instance._uiSetPreserveRatio(instance.get('preserveRatio'));","","				instance.syncImageUI();","				instance._syncCropNodeUI();","			},","","			destructor: function() {","				var instance = this;","","				instance._destroyDrag();","				instance._destroyResize();","			},","","			syncImageUI: function() {","				var instance = this;","","				var imageNode = instance.get('srcNode');","				var overlayNode = instance.overlay;","","				instance.cropNode.setStyle('backgroundImage', 'url(' + imageNode.attr('src') + ')');","","				instance._constrainValues();","				instance._syncXY();","","				var origRegion = instance._getConstraintRegion();","","				var drag = instance.drag;","				var resize = instance.resize;","","				if (drag) {","					drag.con.set('constrain', origRegion);","				}","","				if (resize) {","					resize.con.set('constrain', origRegion);","				}","			},","","			_constrainValues: function() {","				var instance = this;","","				var imageNode = instance.get('srcNode');","","				var cropHeight = instance.get('cropHeight');","				var cropWidth = instance.get('cropWidth');","","				var x = instance.get('x');","				var y = instance.get('y');","","				var imageWidth = imageNode.width();","				var imageHeight = imageNode.height();","","				// Find valid y","","				y = Math.max(y, 0);","","				if (y + cropHeight > imageHeight) {","					y = Math.max(imageHeight - cropHeight, 0);","				}","","				instance.set('y', y);","","				// Find valid cropHeight","","				if (y + cropHeight > imageHeight) {","					cropHeight = Math.max(imageHeight - y, 0);","				}","","				instance.set('cropHeight', cropHeight);","","				// Find valid x","","				x = Math.max(x, 0);","","				if (x + cropWidth > imageWidth) {","					x = Math.max(imageWidth - cropWidth, 0);","				}","","				instance.set('x', x);","","				// Find valid cropWidth","","				if (x + cropWidth > imageWidth) {","					cropWidth = Math.max(imageWidth - x, 0);","				}","","				instance.set('cropWidth', cropWidth);","			},","","			_createHover: function() {","				var instance = this;","","				instance._destroyHover();","","				instance._hoverHandles = instance.cropNode.on(","					'hover',","					instance._hoverOverlay,","					instance._unHoverOverlay,","					instance","				);","			},","","			_defCropFn: function(event) {","				var instance = this;","","				var cropType = event.cropType;","","				if (cropType == 'drag:drag') {","					instance._syncXY();","				}","				else if (cropType == 'resize:resize') {","					instance._syncCropSize();","				}","			},","","			_destroyDrag: function(object) {","				var instance = this;","","				if (instance.drag) {","					instance.drag.destroy();","","					delete instance.drag;","				}","			},","","			_destroyHover: function() {","				var instance = this;","","				if (instance._hoverHandles) {","					instance._hoverHandles.detach();","","					instance._hoverHandles = null;","				}","			},","","			_destroyResize: function(object) {","				var instance = this;","","				if (instance.resize) {","					instance.resize.destroy();","","					delete instance.resize;","				}","			},","","			_fireCropEvent: function(event) {","				var instance = this;","","				instance.fire('crop', {cropType: event.type});","			},","","			_getConstraintRegion: function(force) {","				var instance = this;","","				var region = !force ? instance._origRegion : null;","","				if (!region) {","					var imageNode = instance.get('srcNode');","","					var cropNode = instance.cropNode;","","					var imageXY = imageNode.getXY();","","					var imageX = imageXY[0];","					var imageY = imageXY[1];","","					region = {","						bottom: imageY + imageNode.height() + cropNode.getBorderWidth('b'),","						left: imageX - cropNode.getBorderWidth('l'),","						right: imageX + imageNode.width() + cropNode.getBorderWidth('r'),","						top: imageY - cropNode.getBorderWidth('t')","					};","","					if (!instance._origRegion) {","						instance._origRegion = region;","					}","				}","","				return region;","			},","","			_getCropRegion: function() {","				var instance = this;","","				return {","					height: instance.get('cropHeight'),","					width: instance.get('cropWidth'),","					x: instance.get('x'),","					y: instance.get('y')","				};","			},","","			_hoverOverlay: function() {","				var instance = this;","","				if (!instance._isDragging() && !instance._isResizing()) {","					instance._boundingBox.addClass(CSS_OVERLAY_HOVER);","				}","			},","","			_isDragging: function() {","				var instance = this;","","				var drag = instance.drag;","","				return drag && drag.get('dragging');","			},","","			_isResizing: function() {","				var instance = this;","","				var resize = instance.resize;","","				return resize && resize.get('resizing');","			},","","			_renderDrag: function() {","				var instance = this;","","				var drag = new A.DD.Drag(","					{","						node: instance.cropNode","					}","				).plug(","					A.Plugin.DDConstrained,","					{","						constrain: instance._getConstraintRegion()","					}","				);","","				drag.addTarget(instance);","","				instance.drag = drag;","			},","","			_renderResize: function() {","				var instance = this;","","				var resize = new A.Resize(","					{","						node: instance.cropNode","					}","				).plug(","					A.Plugin.ResizeConstrained,","					{","						constrain: instance._getConstraintRegion(),","						preserveRatio: instance.get('preserveRatio'),","						minHeight: instance.get('minHeight'),","						minWidth: instance.get('minWidth')","					}","				);","","				resize.addTarget(instance);","","				instance.resize = resize;","			},","","			_syncCropNodeUI: function() {","				var instance = this;","","				instance.cropNode.setStyle('backgroundPosition', (-instance.get('x')) + 'px ' + (-instance.get('y')) + 'px');","			},","","			_syncCropSize: function(event) {","				var instance = this;","","				var cropNode = instance.cropNode;","","				instance.set('cropHeight', cropNode.height());","				instance.set('cropWidth', cropNode.width());","			},","","			_syncRegion: function(event) {","				var instance = this;","","				var region = instance._getConstraintRegion(true);","","				var origRegion = instance._origRegion;","","				if (","					region.bottom != origRegion.bottom ||","					region.left != origRegion.left ||","					region.right != origRegion.right ||","					region.top != origRegion.top","				) {","","					var drag = instance.drag;","					var resize = instance.resize;","","					if (drag) {","						drag.con.set('constrain', region);","					}","","					if (resize) {","						resize.con.set('constrain', region);","					}","","					instance._origRegion = region;","				}","			},","","			_syncXY: function(event) {","				var instance = this;","","				var cropNode = instance.cropNode;","","				instance.set('x', parseNumber(cropNode.getStyle('left')) + cropNode.getBorderWidth('l'));","				instance.set('y', parseNumber(cropNode.getStyle('top')) + cropNode.getBorderWidth('t'));","			},","","			_uiSetCropHeight: function(value) {","				var instance = this;","","				instance.cropNode.height(value);","			},","","			_uiSetCropWidth: function(value) {","				var instance = this;","","				instance.cropNode.width(value);","			},","","			_uiSetDisabled: function(value) {","				var instance = this;","","				ImageCropper.superclass._uiSetDisabled.apply(instance, arguments);","","				var enabled = !value;","","				instance.cropNode.toggle(enabled);","","				if (enabled) {","					instance._createHover();","				}","				else {","					instance._destroyHover();","				}","			},","","			_uiSetMinHeight: function(value) {","				var instance = this;","","				var resize = instance.resize;","","				if (resize) {","					resize.con.set('minHeight', value);","				}","			},","","			_uiSetMinWidth: function(value) {","				var instance = this;","","				var resize = instance.resize;","","				if (resize) {","					resize.con.set('minWidth', value);","				}","			},","","			_uiSetMovable: function(value) {","				var instance = this;","","				instance.drag.set('lock', !value);","			},","","			_uiSetPreserveRatio: function(value) {","				var instance = this;","","				var resize = instance.resize;","","				if (resize) {","					resize.con.set('preserveRatio', value);","				}","			},","","			_uiSetResizable: function(value) {","				var instance = this;","","				if (value) {","					if (instance._stopResizeHandle) {","						instance._stopResizeHandle.detach();","					}","				}","				else if (!instance._stopResizeHandle) {","					instance._stopResizeHandle = instance.resize.on(","						'resize:resize',","						function (event) {","							event.halt();","						}","					);","				}","			},","","			_uiSetX: function(value) {","				var instance = this;","","				var imageNode = instance.get('srcNode');","				var cropNode = instance.cropNode;","","				cropNode.setStyle('left', value - cropNode.getBorderWidth('l'));","			},","","			_uiSetY: function(value) {","				var instance = this;","","				var imageNode = instance.get('srcNode');","				var cropNode = instance.cropNode;","","				cropNode.setStyle('top', value - cropNode.getBorderWidth('t'));","			},","","			_unHoverOverlay: function() {","				var instance = this;","","				if (!instance._isDragging() && !instance._isResizing()) {","					instance._boundingBox.removeClass(CSS_OVERLAY_HOVER);","				}","			}","		}","	}",");","","A.ImageCropper = ImageCropper;","","}, '@VERSION@' ,{requires:['widget','aui-base','resize','dd-constrain'], skinnable:true});"];
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].lines = {"1":0,"2":0,"7":0,"15":0,"17":0,"86":0,"88":0,"89":0,"91":0,"92":0,"94":0,"96":0,"98":0,"100":0,"101":0,"105":0,"107":0,"109":0,"116":0,"118":0,"120":0,"123":0,"125":0,"129":0,"133":0,"135":0,"137":0,"138":0,"142":0,"144":0,"145":0,"149":0,"151":0,"152":0,"154":0,"156":0,"157":0,"159":0,"161":0,"162":0,"164":0,"165":0,"168":0,"169":0,"174":0,"176":0,"178":0,"179":0,"181":0,"182":0,"184":0,"185":0,"189":0,"191":0,"192":0,"195":0,"199":0,"200":0,"203":0,"207":0,"209":0,"210":0,"213":0,"217":0,"218":0,"221":0,"225":0,"227":0,"229":0,"238":0,"240":0,"242":0,"243":0,"245":0,"246":0,"251":0,"253":0,"254":0,"256":0,"261":0,"263":0,"264":0,"266":0,"271":0,"273":0,"274":0,"276":0,"281":0,"283":0,"287":0,"289":0,"291":0,"292":0,"294":0,"296":0,"298":0,"299":0,"301":0,"308":0,"309":0,"313":0,"317":0,"319":0,"328":0,"330":0,"331":0,"336":0,"338":0,"340":0,"344":0,"346":0,"348":0,"352":0,"354":0,"365":0,"367":0,"371":0,"373":0,"387":0,"389":0,"393":0,"395":0,"399":0,"401":0,"403":0,"404":0,"408":0,"410":0,"412":0,"414":0,"421":0,"422":0,"424":0,"425":0,"428":0,"429":0,"432":0,"437":0,"439":0,"441":0,"442":0,"446":0,"448":0,"452":0,"454":0,"458":0,"460":0,"462":0,"464":0,"466":0,"467":0,"470":0,"475":0,"477":0,"479":0,"480":0,"485":0,"487":0,"489":0,"490":0,"495":0,"497":0,"501":0,"503":0,"505":0,"506":0,"511":0,"513":0,"514":0,"515":0,"518":0,"519":0,"522":0,"529":0,"531":0,"532":0,"534":0,"538":0,"540":0,"541":0,"543":0,"547":0,"549":0,"550":0,"557":0};
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].functions = {"parseNumber:6":0,"renderUI:85":0,"(anonymous 2):122":0,"bindUI:104":0,"syncUI:132":0,"destructor:141":0,"syncImageUI:148":0,"_constrainValues:173":0,"_createHover:224":0,"_defCropFn:237":0,"_destroyDrag:250":0,"_destroyHover:260":0,"_destroyResize:270":0,"_fireCropEvent:280":0,"_getConstraintRegion:286":0,"_getCropRegion:316":0,"_hoverOverlay:327":0,"_isDragging:335":0,"_isResizing:343":0,"_renderDrag:351":0,"_renderResize:370":0,"_syncCropNodeUI:392":0,"_syncCropSize:398":0,"_syncRegion:407":0,"_syncXY:436":0,"_uiSetCropHeight:445":0,"_uiSetCropWidth:451":0,"_uiSetDisabled:457":0,"_uiSetMinHeight:474":0,"_uiSetMinWidth:484":0,"_uiSetMovable:494":0,"_uiSetPreserveRatio:500":0,"(anonymous 3):521":0,"_uiSetResizable:510":0,"_uiSetX:528":0,"_uiSetY:537":0,"_unHoverOverlay:546":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].coveredLines = 185;
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].coveredFunctions = 38;
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 1);
AUI.add('aui-image-cropper', function(A) {
_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 2);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	parseNumber = function(num) {
		_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "parseNumber", 6);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 7);
return parseInt(num, 10) || 0;
	},

	NAME = 'image-cropper',

	CSS_CROP = A.getClassName(NAME, 'crop'),
	CSS_CROP_OUTLINE = A.getClassName(NAME, 'crop', 'outline'),
	CSS_OVERLAY = A.getClassName(NAME, 'overlay');
	_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 15);
CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');

_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 17);
var ImageCropper = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			cropHeight: {
				value: 100,
				validator: isNumber
			},

			cropWidth: {
				value: 100,
				validator: isNumber
			},

			minWidth: {
				value: undefined
			},

			minHeight: {
				value: undefined
			},

			movable: {
				value: true,
				validator: isBoolean
			},

			preserveRatio: {
				value: false,
				validator: isBoolean
			},

			region: {
				getter: '_getCropRegion',
				value: {}
			},

			resizable: {
				value: true,
				validator: isBoolean
			},

			x: {
				value: 0,
				setter: Math.round,
				validator: isNumber
			},

			y: {
				value: 0,
				setter: Math.round,
				validator: isNumber
			}
		},

		UI_ATTRS: [
			'cropHeight',
			'cropWidth',
			'minWidth',
			'minHeight',
			'movable',
			'resizable',
			'x',
			'y'
		],

		prototype: {
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "renderUI", 85);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 86);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 88);
var boundingBox = instance.get('boundingBox');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 89);
var imageNode = instance.get('srcNode');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 91);
instance.cropNode = A.Node.create('<div class="' + CSS_CROP + '"></div>');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 92);
instance.cropNode.append(A.Node.create('<div class="' + CSS_CROP_OUTLINE + '"></div>'));

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 94);
instance.overlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 96);
A.all([instance.cropNode, instance.overlay]).appendTo(boundingBox);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 98);
instance._boundingBox = boundingBox;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 100);
instance._renderDrag();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 101);
instance._renderResize();
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "bindUI", 104);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 105);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 107);
instance._fireCropEventTask = A.debounce(instance._fireCropEvent, 10, instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 109);
instance.publish(
					'crop',
					{
						defaultFn: instance._defCropFn
					}
				);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 116);
instance.on(['drag:start', 'resize:start'], A.debounce(instance._syncRegion, 25));

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 118);
instance.after(['drag:drag', 'resize:resize'], instance._fireCropEvent, instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 120);
instance.after(
					['xChange', 'yChange', 'cropWidthChange', 'cropHeightChange'],
					function(event) {
						_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "(anonymous 2)", 122);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 123);
instance._fireCropEventTask(event);

						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 125);
instance._syncCropNodeUI();
					}
				);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 129);
instance._createHover();
			},

			syncUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "syncUI", 132);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 133);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 135);
instance._uiSetPreserveRatio(instance.get('preserveRatio'));

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 137);
instance.syncImageUI();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 138);
instance._syncCropNodeUI();
			},

			destructor: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "destructor", 141);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 142);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 144);
instance._destroyDrag();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 145);
instance._destroyResize();
			},

			syncImageUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "syncImageUI", 148);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 149);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 151);
var imageNode = instance.get('srcNode');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 152);
var overlayNode = instance.overlay;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 154);
instance.cropNode.setStyle('backgroundImage', 'url(' + imageNode.attr('src') + ')');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 156);
instance._constrainValues();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 157);
instance._syncXY();

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 159);
var origRegion = instance._getConstraintRegion();

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 161);
var drag = instance.drag;
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 162);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 164);
if (drag) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 165);
drag.con.set('constrain', origRegion);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 168);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 169);
resize.con.set('constrain', origRegion);
				}
			},

			_constrainValues: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_constrainValues", 173);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 174);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 176);
var imageNode = instance.get('srcNode');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 178);
var cropHeight = instance.get('cropHeight');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 179);
var cropWidth = instance.get('cropWidth');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 181);
var x = instance.get('x');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 182);
var y = instance.get('y');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 184);
var imageWidth = imageNode.width();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 185);
var imageHeight = imageNode.height();

				// Find valid y

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 189);
y = Math.max(y, 0);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 191);
if (y + cropHeight > imageHeight) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 192);
y = Math.max(imageHeight - cropHeight, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 195);
instance.set('y', y);

				// Find valid cropHeight

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 199);
if (y + cropHeight > imageHeight) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 200);
cropHeight = Math.max(imageHeight - y, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 203);
instance.set('cropHeight', cropHeight);

				// Find valid x

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 207);
x = Math.max(x, 0);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 209);
if (x + cropWidth > imageWidth) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 210);
x = Math.max(imageWidth - cropWidth, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 213);
instance.set('x', x);

				// Find valid cropWidth

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 217);
if (x + cropWidth > imageWidth) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 218);
cropWidth = Math.max(imageWidth - x, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 221);
instance.set('cropWidth', cropWidth);
			},

			_createHover: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_createHover", 224);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 225);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 227);
instance._destroyHover();

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 229);
instance._hoverHandles = instance.cropNode.on(
					'hover',
					instance._hoverOverlay,
					instance._unHoverOverlay,
					instance
				);
			},

			_defCropFn: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_defCropFn", 237);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 238);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 240);
var cropType = event.cropType;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 242);
if (cropType == 'drag:drag') {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 243);
instance._syncXY();
				}
				else {_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 245);
if (cropType == 'resize:resize') {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 246);
instance._syncCropSize();
				}}
			},

			_destroyDrag: function(object) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_destroyDrag", 250);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 251);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 253);
if (instance.drag) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 254);
instance.drag.destroy();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 256);
delete instance.drag;
				}
			},

			_destroyHover: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_destroyHover", 260);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 261);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 263);
if (instance._hoverHandles) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 264);
instance._hoverHandles.detach();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 266);
instance._hoverHandles = null;
				}
			},

			_destroyResize: function(object) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_destroyResize", 270);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 271);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 273);
if (instance.resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 274);
instance.resize.destroy();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 276);
delete instance.resize;
				}
			},

			_fireCropEvent: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_fireCropEvent", 280);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 281);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 283);
instance.fire('crop', {cropType: event.type});
			},

			_getConstraintRegion: function(force) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_getConstraintRegion", 286);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 287);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 289);
var region = !force ? instance._origRegion : null;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 291);
if (!region) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 292);
var imageNode = instance.get('srcNode');

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 294);
var cropNode = instance.cropNode;

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 296);
var imageXY = imageNode.getXY();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 298);
var imageX = imageXY[0];
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 299);
var imageY = imageXY[1];

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 301);
region = {
						bottom: imageY + imageNode.height() + cropNode.getBorderWidth('b'),
						left: imageX - cropNode.getBorderWidth('l'),
						right: imageX + imageNode.width() + cropNode.getBorderWidth('r'),
						top: imageY - cropNode.getBorderWidth('t')
					};

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 308);
if (!instance._origRegion) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 309);
instance._origRegion = region;
					}
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 313);
return region;
			},

			_getCropRegion: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_getCropRegion", 316);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 317);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 319);
return {
					height: instance.get('cropHeight'),
					width: instance.get('cropWidth'),
					x: instance.get('x'),
					y: instance.get('y')
				};
			},

			_hoverOverlay: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_hoverOverlay", 327);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 328);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 330);
if (!instance._isDragging() && !instance._isResizing()) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 331);
instance._boundingBox.addClass(CSS_OVERLAY_HOVER);
				}
			},

			_isDragging: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_isDragging", 335);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 336);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 338);
var drag = instance.drag;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 340);
return drag && drag.get('dragging');
			},

			_isResizing: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_isResizing", 343);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 344);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 346);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 348);
return resize && resize.get('resizing');
			},

			_renderDrag: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_renderDrag", 351);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 352);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 354);
var drag = new A.DD.Drag(
					{
						node: instance.cropNode
					}
				).plug(
					A.Plugin.DDConstrained,
					{
						constrain: instance._getConstraintRegion()
					}
				);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 365);
drag.addTarget(instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 367);
instance.drag = drag;
			},

			_renderResize: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_renderResize", 370);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 371);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 373);
var resize = new A.Resize(
					{
						node: instance.cropNode
					}
				).plug(
					A.Plugin.ResizeConstrained,
					{
						constrain: instance._getConstraintRegion(),
						preserveRatio: instance.get('preserveRatio'),
						minHeight: instance.get('minHeight'),
						minWidth: instance.get('minWidth')
					}
				);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 387);
resize.addTarget(instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 389);
instance.resize = resize;
			},

			_syncCropNodeUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncCropNodeUI", 392);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 393);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 395);
instance.cropNode.setStyle('backgroundPosition', (-instance.get('x')) + 'px ' + (-instance.get('y')) + 'px');
			},

			_syncCropSize: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncCropSize", 398);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 399);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 401);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 403);
instance.set('cropHeight', cropNode.height());
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 404);
instance.set('cropWidth', cropNode.width());
			},

			_syncRegion: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncRegion", 407);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 408);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 410);
var region = instance._getConstraintRegion(true);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 412);
var origRegion = instance._origRegion;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 414);
if (
					region.bottom != origRegion.bottom ||
					region.left != origRegion.left ||
					region.right != origRegion.right ||
					region.top != origRegion.top
				) {

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 421);
var drag = instance.drag;
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 422);
var resize = instance.resize;

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 424);
if (drag) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 425);
drag.con.set('constrain', region);
					}

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 428);
if (resize) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 429);
resize.con.set('constrain', region);
					}

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 432);
instance._origRegion = region;
				}
			},

			_syncXY: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncXY", 436);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 437);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 439);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 441);
instance.set('x', parseNumber(cropNode.getStyle('left')) + cropNode.getBorderWidth('l'));
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 442);
instance.set('y', parseNumber(cropNode.getStyle('top')) + cropNode.getBorderWidth('t'));
			},

			_uiSetCropHeight: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetCropHeight", 445);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 446);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 448);
instance.cropNode.height(value);
			},

			_uiSetCropWidth: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetCropWidth", 451);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 452);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 454);
instance.cropNode.width(value);
			},

			_uiSetDisabled: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetDisabled", 457);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 458);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 460);
ImageCropper.superclass._uiSetDisabled.apply(instance, arguments);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 462);
var enabled = !value;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 464);
instance.cropNode.toggle(enabled);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 466);
if (enabled) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 467);
instance._createHover();
				}
				else {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 470);
instance._destroyHover();
				}
			},

			_uiSetMinHeight: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetMinHeight", 474);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 475);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 477);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 479);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 480);
resize.con.set('minHeight', value);
				}
			},

			_uiSetMinWidth: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetMinWidth", 484);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 485);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 487);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 489);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 490);
resize.con.set('minWidth', value);
				}
			},

			_uiSetMovable: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetMovable", 494);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 495);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 497);
instance.drag.set('lock', !value);
			},

			_uiSetPreserveRatio: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetPreserveRatio", 500);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 501);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 503);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 505);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 506);
resize.con.set('preserveRatio', value);
				}
			},

			_uiSetResizable: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetResizable", 510);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 511);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 513);
if (value) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 514);
if (instance._stopResizeHandle) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 515);
instance._stopResizeHandle.detach();
					}
				}
				else {_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 518);
if (!instance._stopResizeHandle) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 519);
instance._stopResizeHandle = instance.resize.on(
						'resize:resize',
						function (event) {
							_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "(anonymous 3)", 521);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 522);
event.halt();
						}
					);
				}}
			},

			_uiSetX: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetX", 528);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 529);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 531);
var imageNode = instance.get('srcNode');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 532);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 534);
cropNode.setStyle('left', value - cropNode.getBorderWidth('l'));
			},

			_uiSetY: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetY", 537);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 538);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 540);
var imageNode = instance.get('srcNode');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 541);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 543);
cropNode.setStyle('top', value - cropNode.getBorderWidth('t'));
			},

			_unHoverOverlay: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_unHoverOverlay", 546);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 547);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 549);
if (!instance._isDragging() && !instance._isResizing()) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 550);
instance._boundingBox.removeClass(CSS_OVERLAY_HOVER);
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 557);
A.ImageCropper = ImageCropper;

}, '@VERSION@' ,{requires:['widget','aui-base','resize','dd-constrain'], skinnable:true});
