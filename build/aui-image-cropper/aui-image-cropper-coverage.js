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
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].code=["AUI.add('aui-image-cropper', function(A) {","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isNumber = Lang.isNumber,","","	toInt = Lang.toInt,","","	NAME = 'image-cropper',","","	CSS_CROP = A.getClassName(NAME, 'crop'),","	CSS_CROP_OUTLINE = A.getClassName(NAME, 'crop', 'outline'),","	CSS_OVERLAY = A.getClassName(NAME, 'overlay');","	CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');","","var ImageCropper = A.Component.create(","	{","		NAME: NAME,","","		ATTRS: {","			cropHeight: {","				value: 100,","				validator: isNumber","			},","","			cropWidth: {","				value: 100,","				validator: isNumber","			},","","			minWidth: {","				value: undefined","			},","","			minHeight: {","				value: undefined","			},","","			movable: {","				value: true,","				validator: isBoolean","			},","","			preserveRatio: {","				value: false,","				validator: isBoolean","			},","","			region: {","				getter: '_getCropRegion',","				value: {}","			},","","			resizable: {","				value: true,","				validator: isBoolean","			},","","			x: {","				value: 0,","				setter: Math.round,","				validator: isNumber","			},","","			y: {","				value: 0,","				setter: Math.round,","				validator: isNumber","			}","		},","","		UI_ATTRS: [","			'cropHeight',","			'cropWidth',","			'minWidth',","			'minHeight',","			'movable',","			'resizable',","			'x',","			'y'","		],","","		prototype: {","			renderUI: function() {","				var instance = this;","","				var boundingBox = instance.get('boundingBox');","				var imageNode = instance.get('srcNode');","","				instance.cropNode = A.Node.create('<div class=\"' + CSS_CROP + '\"></div>');","				instance.cropNode.append(A.Node.create('<div class=\"' + CSS_CROP_OUTLINE + '\"></div>'));","","				instance.overlay = A.Node.create('<div class=\"' + CSS_OVERLAY + '\"></div>');","","				A.all([instance.cropNode, instance.overlay]).appendTo(boundingBox);","","				instance._boundingBox = boundingBox;","","				instance._renderDrag();","				instance._renderResize();","			},","","			bindUI: function() {","				var instance = this;","","				instance._fireCropEventTask = A.debounce(instance._fireCropEvent, 10, instance);","","				instance.publish(","					'crop',","					{","						defaultFn: instance._defCropFn","					}","				);","","				instance.on(['drag:start', 'resize:start'], A.debounce(instance._syncRegion, 25));","","				instance.after(['drag:drag', 'resize:resize'], instance._fireCropEvent, instance);","","				instance.after(","					['xChange', 'yChange', 'cropWidthChange', 'cropHeightChange'],","					function(event) {","						instance._fireCropEventTask(event);","","						instance._syncCropNodeUI();","					}","				);","","				instance._createHover();","			},","","			syncUI: function() {","				var instance = this;","","				instance._uiSetPreserveRatio(instance.get('preserveRatio'));","","				instance.syncImageUI();","				instance._syncCropNodeUI();","			},","","			destructor: function() {","				var instance = this;","","				instance._destroyDrag();","				instance._destroyResize();","			},","","			syncImageUI: function() {","				var instance = this;","","				var imageNode = instance.get('srcNode');","				var overlayNode = instance.overlay;","","				instance.cropNode.setStyle('backgroundImage', 'url(' + imageNode.attr('src') + ')');","","				instance._constrainValues();","				instance._syncXY();","","				var origRegion = instance._getConstraintRegion();","","				var drag = instance.drag;","				var resize = instance.resize;","","				if (drag) {","					drag.con.set('constrain', origRegion);","				}","","				if (resize) {","					resize.con.set('constrain', origRegion);","				}","			},","","			_constrainValues: function() {","				var instance = this;","","				var imageNode = instance.get('srcNode');","","				var cropHeight = instance.get('cropHeight');","				var cropWidth = instance.get('cropWidth');","","				var x = instance.get('x');","				var y = instance.get('y');","","				var imageWidth = imageNode.width();","				var imageHeight = imageNode.height();","","				// Find valid y","","				y = Math.max(y, 0);","","				if (y + cropHeight > imageHeight) {","					y = Math.max(imageHeight - cropHeight, 0);","				}","","				instance.set('y', y);","","				// Find valid cropHeight","","				if (y + cropHeight > imageHeight) {","					cropHeight = Math.max(imageHeight - y, 0);","				}","","				instance.set('cropHeight', cropHeight);","","				// Find valid x","","				x = Math.max(x, 0);","","				if (x + cropWidth > imageWidth) {","					x = Math.max(imageWidth - cropWidth, 0);","				}","","				instance.set('x', x);","","				// Find valid cropWidth","","				if (x + cropWidth > imageWidth) {","					cropWidth = Math.max(imageWidth - x, 0);","				}","","				instance.set('cropWidth', cropWidth);","			},","","			_createHover: function() {","				var instance = this;","","				instance._destroyHover();","","				instance._hoverHandles = instance.cropNode.on(","					'hover',","					instance._hoverOverlay,","					instance._unHoverOverlay,","					instance","				);","			},","","			_defCropFn: function(event) {","				var instance = this;","","				var cropType = event.cropType;","","				if (cropType == 'drag:drag') {","					instance._syncXY();","				}","				else if (cropType == 'resize:resize') {","					instance._syncCropSize();","				}","			},","","			_destroyDrag: function(object) {","				var instance = this;","","				if (instance.drag) {","					instance.drag.destroy();","","					delete instance.drag;","				}","			},","","			_destroyHover: function() {","				var instance = this;","","				if (instance._hoverHandles) {","					instance._hoverHandles.detach();","","					instance._hoverHandles = null;","				}","			},","","			_destroyResize: function(object) {","				var instance = this;","","				if (instance.resize) {","					instance.resize.destroy();","","					delete instance.resize;","				}","			},","","			_fireCropEvent: function(event) {","				var instance = this;","","				instance.fire('crop', {cropType: event.type});","			},","","			_getConstraintRegion: function(force) {","				var instance = this;","","				var region = !force ? instance._origRegion : null;","","				if (!region) {","					var imageNode = instance.get('srcNode');","","					var cropNode = instance.cropNode;","","					var imageXY = imageNode.getXY();","","					var imageX = imageXY[0];","					var imageY = imageXY[1];","","					region = {","						bottom: imageY + imageNode.height() + cropNode.getBorderWidth('b'),","						left: imageX - cropNode.getBorderWidth('l'),","						right: imageX + imageNode.width() + cropNode.getBorderWidth('r'),","						top: imageY - cropNode.getBorderWidth('t')","					};","","					if (!instance._origRegion) {","						instance._origRegion = region;","					}","				}","","				return region;","			},","","			_getCropRegion: function() {","				var instance = this;","","				return {","					height: instance.get('cropHeight'),","					width: instance.get('cropWidth'),","					x: instance.get('x'),","					y: instance.get('y')","				};","			},","","			_hoverOverlay: function() {","				var instance = this;","","				if (!instance._isDragging() && !instance._isResizing()) {","					instance._boundingBox.addClass(CSS_OVERLAY_HOVER);","				}","			},","","			_isDragging: function() {","				var instance = this;","","				var drag = instance.drag;","","				return drag && drag.get('dragging');","			},","","			_isResizing: function() {","				var instance = this;","","				var resize = instance.resize;","","				return resize && resize.get('resizing');","			},","","			_renderDrag: function() {","				var instance = this;","","				var drag = new A.DD.Drag(","					{","						node: instance.cropNode","					}","				).plug(","					A.Plugin.DDConstrained,","					{","						constrain: instance._getConstraintRegion()","					}","				);","","				drag.addTarget(instance);","","				instance.drag = drag;","			},","","			_renderResize: function() {","				var instance = this;","","				var resize = new A.Resize(","					{","						node: instance.cropNode","					}","				).plug(","					A.Plugin.ResizeConstrained,","					{","						constrain: instance._getConstraintRegion(),","						preserveRatio: instance.get('preserveRatio'),","						minHeight: instance.get('minHeight'),","						minWidth: instance.get('minWidth')","					}","				);","","				resize.addTarget(instance);","","				instance.resize = resize;","			},","","			_syncCropNodeUI: function() {","				var instance = this;","","				instance.cropNode.setStyle('backgroundPosition', (-instance.get('x')) + 'px ' + (-instance.get('y')) + 'px');","			},","","			_syncCropSize: function(event) {","				var instance = this;","","				var cropNode = instance.cropNode;","","				instance.set('cropHeight', cropNode.height());","				instance.set('cropWidth', cropNode.width());","			},","","			_syncRegion: function(event) {","				var instance = this;","","				var region = instance._getConstraintRegion(true);","","				var origRegion = instance._origRegion;","","				if (","					region.bottom != origRegion.bottom ||","					region.left != origRegion.left ||","					region.right != origRegion.right ||","					region.top != origRegion.top","				) {","","					var drag = instance.drag;","					var resize = instance.resize;","","					if (drag) {","						drag.con.set('constrain', region);","					}","","					if (resize) {","						resize.con.set('constrain', region);","					}","","					instance._origRegion = region;","				}","			},","","			_syncXY: function(event) {","				var instance = this;","","				var cropNode = instance.cropNode;","","				instance.set('x', toInt(cropNode.getStyle('left')) + cropNode.getBorderWidth('l'));","				instance.set('y', toInt(cropNode.getStyle('top')) + cropNode.getBorderWidth('t'));","			},","","			_uiSetCropHeight: function(value) {","				var instance = this;","","				instance.cropNode.height(value);","			},","","			_uiSetCropWidth: function(value) {","				var instance = this;","","				instance.cropNode.width(value);","			},","","			_uiSetDisabled: function(value) {","				var instance = this;","","				ImageCropper.superclass._uiSetDisabled.apply(instance, arguments);","","				var enabled = !value;","","				instance.cropNode.toggle(enabled);","","				if (enabled) {","					instance._createHover();","				}","				else {","					instance._destroyHover();","				}","			},","","			_uiSetMinHeight: function(value) {","				var instance = this;","","				var resize = instance.resize;","","				if (resize) {","					resize.con.set('minHeight', value);","				}","			},","","			_uiSetMinWidth: function(value) {","				var instance = this;","","				var resize = instance.resize;","","				if (resize) {","					resize.con.set('minWidth', value);","				}","			},","","			_uiSetMovable: function(value) {","				var instance = this;","","				instance.drag.set('lock', !value);","			},","","			_uiSetPreserveRatio: function(value) {","				var instance = this;","","				var resize = instance.resize;","","				if (resize) {","					resize.con.set('preserveRatio', value);","				}","			},","","			_uiSetResizable: function(value) {","				var instance = this;","","				if (value) {","					if (instance._stopResizeHandle) {","						instance._stopResizeHandle.detach();","					}","				}","				else if (!instance._stopResizeHandle) {","					instance._stopResizeHandle = instance.resize.on(","						'resize:resize',","						function (event) {","							event.halt();","						}","					);","				}","			},","","			_uiSetX: function(value) {","				var instance = this;","","				var imageNode = instance.get('srcNode');","				var cropNode = instance.cropNode;","","				cropNode.setStyle('left', value - cropNode.getBorderWidth('l'));","			},","","			_uiSetY: function(value) {","				var instance = this;","","				var imageNode = instance.get('srcNode');","				var cropNode = instance.cropNode;","","				cropNode.setStyle('top', value - cropNode.getBorderWidth('t'));","			},","","			_unHoverOverlay: function() {","				var instance = this;","","				if (!instance._isDragging() && !instance._isResizing()) {","					instance._boundingBox.removeClass(CSS_OVERLAY_HOVER);","				}","			}","		}","	}",");","","A.ImageCropper = ImageCropper;","","}, '@VERSION@' ,{requires:['widget','aui-base','resize','dd-constrain'], skinnable:true});"];
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].lines = {"1":0,"2":0,"13":0,"15":0,"84":0,"86":0,"87":0,"89":0,"90":0,"92":0,"94":0,"96":0,"98":0,"99":0,"103":0,"105":0,"107":0,"114":0,"116":0,"118":0,"121":0,"123":0,"127":0,"131":0,"133":0,"135":0,"136":0,"140":0,"142":0,"143":0,"147":0,"149":0,"150":0,"152":0,"154":0,"155":0,"157":0,"159":0,"160":0,"162":0,"163":0,"166":0,"167":0,"172":0,"174":0,"176":0,"177":0,"179":0,"180":0,"182":0,"183":0,"187":0,"189":0,"190":0,"193":0,"197":0,"198":0,"201":0,"205":0,"207":0,"208":0,"211":0,"215":0,"216":0,"219":0,"223":0,"225":0,"227":0,"236":0,"238":0,"240":0,"241":0,"243":0,"244":0,"249":0,"251":0,"252":0,"254":0,"259":0,"261":0,"262":0,"264":0,"269":0,"271":0,"272":0,"274":0,"279":0,"281":0,"285":0,"287":0,"289":0,"290":0,"292":0,"294":0,"296":0,"297":0,"299":0,"306":0,"307":0,"311":0,"315":0,"317":0,"326":0,"328":0,"329":0,"334":0,"336":0,"338":0,"342":0,"344":0,"346":0,"350":0,"352":0,"363":0,"365":0,"369":0,"371":0,"385":0,"387":0,"391":0,"393":0,"397":0,"399":0,"401":0,"402":0,"406":0,"408":0,"410":0,"412":0,"419":0,"420":0,"422":0,"423":0,"426":0,"427":0,"430":0,"435":0,"437":0,"439":0,"440":0,"444":0,"446":0,"450":0,"452":0,"456":0,"458":0,"460":0,"462":0,"464":0,"465":0,"468":0,"473":0,"475":0,"477":0,"478":0,"483":0,"485":0,"487":0,"488":0,"493":0,"495":0,"499":0,"501":0,"503":0,"504":0,"509":0,"511":0,"512":0,"513":0,"516":0,"517":0,"520":0,"527":0,"529":0,"530":0,"532":0,"536":0,"538":0,"539":0,"541":0,"545":0,"547":0,"548":0,"555":0};
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].functions = {"renderUI:83":0,"(anonymous 2):120":0,"bindUI:102":0,"syncUI:130":0,"destructor:139":0,"syncImageUI:146":0,"_constrainValues:171":0,"_createHover:222":0,"_defCropFn:235":0,"_destroyDrag:248":0,"_destroyHover:258":0,"_destroyResize:268":0,"_fireCropEvent:278":0,"_getConstraintRegion:284":0,"_getCropRegion:314":0,"_hoverOverlay:325":0,"_isDragging:333":0,"_isResizing:341":0,"_renderDrag:349":0,"_renderResize:368":0,"_syncCropNodeUI:390":0,"_syncCropSize:396":0,"_syncRegion:405":0,"_syncXY:434":0,"_uiSetCropHeight:443":0,"_uiSetCropWidth:449":0,"_uiSetDisabled:455":0,"_uiSetMinHeight:472":0,"_uiSetMinWidth:482":0,"_uiSetMovable:492":0,"_uiSetPreserveRatio:498":0,"(anonymous 3):519":0,"_uiSetResizable:508":0,"_uiSetX:526":0,"_uiSetY:535":0,"_unHoverOverlay:544":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].coveredLines = 184;
_yuitest_coverage["/build/aui-image-cropper/aui-image-cropper.js"].coveredFunctions = 37;
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 1);
AUI.add('aui-image-cropper', function(A) {
_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 2);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	toInt = Lang.toInt,

	NAME = 'image-cropper',

	CSS_CROP = A.getClassName(NAME, 'crop'),
	CSS_CROP_OUTLINE = A.getClassName(NAME, 'crop', 'outline'),
	CSS_OVERLAY = A.getClassName(NAME, 'overlay');
	_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 13);
CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');

_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 15);
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
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "renderUI", 83);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 84);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 86);
var boundingBox = instance.get('boundingBox');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 87);
var imageNode = instance.get('srcNode');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 89);
instance.cropNode = A.Node.create('<div class="' + CSS_CROP + '"></div>');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 90);
instance.cropNode.append(A.Node.create('<div class="' + CSS_CROP_OUTLINE + '"></div>'));

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 92);
instance.overlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 94);
A.all([instance.cropNode, instance.overlay]).appendTo(boundingBox);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 96);
instance._boundingBox = boundingBox;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 98);
instance._renderDrag();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 99);
instance._renderResize();
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "bindUI", 102);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 103);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 105);
instance._fireCropEventTask = A.debounce(instance._fireCropEvent, 10, instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 107);
instance.publish(
					'crop',
					{
						defaultFn: instance._defCropFn
					}
				);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 114);
instance.on(['drag:start', 'resize:start'], A.debounce(instance._syncRegion, 25));

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 116);
instance.after(['drag:drag', 'resize:resize'], instance._fireCropEvent, instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 118);
instance.after(
					['xChange', 'yChange', 'cropWidthChange', 'cropHeightChange'],
					function(event) {
						_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "(anonymous 2)", 120);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 121);
instance._fireCropEventTask(event);

						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 123);
instance._syncCropNodeUI();
					}
				);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 127);
instance._createHover();
			},

			syncUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "syncUI", 130);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 131);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 133);
instance._uiSetPreserveRatio(instance.get('preserveRatio'));

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 135);
instance.syncImageUI();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 136);
instance._syncCropNodeUI();
			},

			destructor: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "destructor", 139);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 140);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 142);
instance._destroyDrag();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 143);
instance._destroyResize();
			},

			syncImageUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "syncImageUI", 146);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 147);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 149);
var imageNode = instance.get('srcNode');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 150);
var overlayNode = instance.overlay;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 152);
instance.cropNode.setStyle('backgroundImage', 'url(' + imageNode.attr('src') + ')');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 154);
instance._constrainValues();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 155);
instance._syncXY();

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 157);
var origRegion = instance._getConstraintRegion();

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 159);
var drag = instance.drag;
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 160);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 162);
if (drag) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 163);
drag.con.set('constrain', origRegion);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 166);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 167);
resize.con.set('constrain', origRegion);
				}
			},

			_constrainValues: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_constrainValues", 171);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 172);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 174);
var imageNode = instance.get('srcNode');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 176);
var cropHeight = instance.get('cropHeight');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 177);
var cropWidth = instance.get('cropWidth');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 179);
var x = instance.get('x');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 180);
var y = instance.get('y');

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 182);
var imageWidth = imageNode.width();
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 183);
var imageHeight = imageNode.height();

				// Find valid y

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 187);
y = Math.max(y, 0);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 189);
if (y + cropHeight > imageHeight) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 190);
y = Math.max(imageHeight - cropHeight, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 193);
instance.set('y', y);

				// Find valid cropHeight

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 197);
if (y + cropHeight > imageHeight) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 198);
cropHeight = Math.max(imageHeight - y, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 201);
instance.set('cropHeight', cropHeight);

				// Find valid x

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 205);
x = Math.max(x, 0);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 207);
if (x + cropWidth > imageWidth) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 208);
x = Math.max(imageWidth - cropWidth, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 211);
instance.set('x', x);

				// Find valid cropWidth

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 215);
if (x + cropWidth > imageWidth) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 216);
cropWidth = Math.max(imageWidth - x, 0);
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 219);
instance.set('cropWidth', cropWidth);
			},

			_createHover: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_createHover", 222);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 223);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 225);
instance._destroyHover();

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 227);
instance._hoverHandles = instance.cropNode.on(
					'hover',
					instance._hoverOverlay,
					instance._unHoverOverlay,
					instance
				);
			},

			_defCropFn: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_defCropFn", 235);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 236);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 238);
var cropType = event.cropType;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 240);
if (cropType == 'drag:drag') {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 241);
instance._syncXY();
				}
				else {_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 243);
if (cropType == 'resize:resize') {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 244);
instance._syncCropSize();
				}}
			},

			_destroyDrag: function(object) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_destroyDrag", 248);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 249);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 251);
if (instance.drag) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 252);
instance.drag.destroy();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 254);
delete instance.drag;
				}
			},

			_destroyHover: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_destroyHover", 258);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 259);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 261);
if (instance._hoverHandles) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 262);
instance._hoverHandles.detach();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 264);
instance._hoverHandles = null;
				}
			},

			_destroyResize: function(object) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_destroyResize", 268);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 269);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 271);
if (instance.resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 272);
instance.resize.destroy();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 274);
delete instance.resize;
				}
			},

			_fireCropEvent: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_fireCropEvent", 278);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 279);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 281);
instance.fire('crop', {cropType: event.type});
			},

			_getConstraintRegion: function(force) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_getConstraintRegion", 284);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 285);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 287);
var region = !force ? instance._origRegion : null;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 289);
if (!region) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 290);
var imageNode = instance.get('srcNode');

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 292);
var cropNode = instance.cropNode;

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 294);
var imageXY = imageNode.getXY();

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 296);
var imageX = imageXY[0];
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 297);
var imageY = imageXY[1];

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 299);
region = {
						bottom: imageY + imageNode.height() + cropNode.getBorderWidth('b'),
						left: imageX - cropNode.getBorderWidth('l'),
						right: imageX + imageNode.width() + cropNode.getBorderWidth('r'),
						top: imageY - cropNode.getBorderWidth('t')
					};

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 306);
if (!instance._origRegion) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 307);
instance._origRegion = region;
					}
				}

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 311);
return region;
			},

			_getCropRegion: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_getCropRegion", 314);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 315);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 317);
return {
					height: instance.get('cropHeight'),
					width: instance.get('cropWidth'),
					x: instance.get('x'),
					y: instance.get('y')
				};
			},

			_hoverOverlay: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_hoverOverlay", 325);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 326);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 328);
if (!instance._isDragging() && !instance._isResizing()) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 329);
instance._boundingBox.addClass(CSS_OVERLAY_HOVER);
				}
			},

			_isDragging: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_isDragging", 333);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 334);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 336);
var drag = instance.drag;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 338);
return drag && drag.get('dragging');
			},

			_isResizing: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_isResizing", 341);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 342);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 344);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 346);
return resize && resize.get('resizing');
			},

			_renderDrag: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_renderDrag", 349);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 350);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 352);
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

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 363);
drag.addTarget(instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 365);
instance.drag = drag;
			},

			_renderResize: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_renderResize", 368);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 369);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 371);
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

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 385);
resize.addTarget(instance);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 387);
instance.resize = resize;
			},

			_syncCropNodeUI: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncCropNodeUI", 390);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 391);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 393);
instance.cropNode.setStyle('backgroundPosition', (-instance.get('x')) + 'px ' + (-instance.get('y')) + 'px');
			},

			_syncCropSize: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncCropSize", 396);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 397);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 399);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 401);
instance.set('cropHeight', cropNode.height());
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 402);
instance.set('cropWidth', cropNode.width());
			},

			_syncRegion: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncRegion", 405);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 406);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 408);
var region = instance._getConstraintRegion(true);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 410);
var origRegion = instance._origRegion;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 412);
if (
					region.bottom != origRegion.bottom ||
					region.left != origRegion.left ||
					region.right != origRegion.right ||
					region.top != origRegion.top
				) {

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 419);
var drag = instance.drag;
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 420);
var resize = instance.resize;

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 422);
if (drag) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 423);
drag.con.set('constrain', region);
					}

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 426);
if (resize) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 427);
resize.con.set('constrain', region);
					}

					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 430);
instance._origRegion = region;
				}
			},

			_syncXY: function(event) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_syncXY", 434);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 435);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 437);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 439);
instance.set('x', toInt(cropNode.getStyle('left')) + cropNode.getBorderWidth('l'));
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 440);
instance.set('y', toInt(cropNode.getStyle('top')) + cropNode.getBorderWidth('t'));
			},

			_uiSetCropHeight: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetCropHeight", 443);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 444);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 446);
instance.cropNode.height(value);
			},

			_uiSetCropWidth: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetCropWidth", 449);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 450);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 452);
instance.cropNode.width(value);
			},

			_uiSetDisabled: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetDisabled", 455);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 456);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 458);
ImageCropper.superclass._uiSetDisabled.apply(instance, arguments);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 460);
var enabled = !value;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 462);
instance.cropNode.toggle(enabled);

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 464);
if (enabled) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 465);
instance._createHover();
				}
				else {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 468);
instance._destroyHover();
				}
			},

			_uiSetMinHeight: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetMinHeight", 472);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 473);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 475);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 477);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 478);
resize.con.set('minHeight', value);
				}
			},

			_uiSetMinWidth: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetMinWidth", 482);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 483);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 485);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 487);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 488);
resize.con.set('minWidth', value);
				}
			},

			_uiSetMovable: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetMovable", 492);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 493);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 495);
instance.drag.set('lock', !value);
			},

			_uiSetPreserveRatio: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetPreserveRatio", 498);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 499);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 501);
var resize = instance.resize;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 503);
if (resize) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 504);
resize.con.set('preserveRatio', value);
				}
			},

			_uiSetResizable: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetResizable", 508);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 509);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 511);
if (value) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 512);
if (instance._stopResizeHandle) {
						_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 513);
instance._stopResizeHandle.detach();
					}
				}
				else {_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 516);
if (!instance._stopResizeHandle) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 517);
instance._stopResizeHandle = instance.resize.on(
						'resize:resize',
						function (event) {
							_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "(anonymous 3)", 519);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 520);
event.halt();
						}
					);
				}}
			},

			_uiSetX: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetX", 526);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 527);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 529);
var imageNode = instance.get('srcNode');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 530);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 532);
cropNode.setStyle('left', value - cropNode.getBorderWidth('l'));
			},

			_uiSetY: function(value) {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_uiSetY", 535);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 536);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 538);
var imageNode = instance.get('srcNode');
				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 539);
var cropNode = instance.cropNode;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 541);
cropNode.setStyle('top', value - cropNode.getBorderWidth('t'));
			},

			_unHoverOverlay: function() {
				_yuitest_coverfunc("/build/aui-image-cropper/aui-image-cropper.js", "_unHoverOverlay", 544);
_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 545);
var instance = this;

				_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 547);
if (!instance._isDragging() && !instance._isResizing()) {
					_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 548);
instance._boundingBox.removeClass(CSS_OVERLAY_HOVER);
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-image-cropper/aui-image-cropper.js", 555);
A.ImageCropper = ImageCropper;

}, '@VERSION@' ,{requires:['widget','aui-base','resize','dd-constrain'], skinnable:true});
