AUI.add("aui-dialog",function(p){var aa=p.Lang,v=p.Object,K=aa.isBoolean,C=aa.isArray,P=aa.isObject,j=aa.toInt,E=p.WidgetStdMod,M=p.config.doc,u="",U="boundingBox",X="button",c="buttons",V="close",Q="closethick",L="constrain2view",d="dd",R="default",W="destroyOnClose",x="dialog",y=".",D="dragConfig",Y=5,l="dragInstance",n="draggable",g="footerContent",S="hd",J="height",H="icon",b="icons",s="io",w="loading",B="modal",Z="proxy",e="resizable",G="resizableConfig",m="resizableInstance",F="stack",i="useARIA",O="viewportRegion",f="width",q="resize:resize",N="resize:end",h=p.getClassName,z=h(x),a=h(x,S),t=h(H,w),o=h(d),I=M.createTextNode("");var r=function(A){if(!p.DialogMask){p.DialogMask=new p.OverlayMask({visible:true}).render();}};p.mix(r,{NAME:x,ATTRS:{bodyContent:{value:I},buttons:{value:[],validator:C},close:{value:true},constrain2view:{setter:"_setConstrain2view",value:false,validator:K},destroyOnClose:{value:false,validator:K},draggable:{value:true},dragConfig:{setter:function(ab){var A=this;return p.merge({bubbleTargets:A,node:A.get(U),handles:[y+a]},ab||{});},writeOnce:true,value:{},validator:P},dragInstance:{setter:"_setDragInstance",value:null},modal:{lazyAdd:false,validator:K,value:false},resizableConfig:{setter:function(ab){var A=this;return p.merge({bubbleTargets:A,handles:"r,br,b",minHeight:100,minWidth:200,constrain2view:true,node:A.get(U),proxy:true,after:{end:p.bind(A._syncResizableDimentions,A),resize:p.bind(A._syncResizableDimentions,A)}},ab||{});},writeOnce:true,value:{},validator:P},resizableInstance:{setter:"_setResizableInstance",value:null},resizable:{value:true},stack:{value:true,setter:function(A){return this._setStack(A);},validator:K},strings:{value:{close:"Close dialog"}}}});r.prototype={initializer:function(ac){var A=this;var ae=A.get(b);var ag=A.get(V);var af=A.get(c);if(af&&af.length&&!A.get(g)){A.set(g,I);}if(ag){var ad=p.guid();var ab={icon:Q,id:ad,handler:{fn:A.close,context:A},title:A.get("strings").close};if(ae){ae.push(ab);}A.set(b,ae);A._closeId=ad;}A.publish("close",{defaultFn:A._close});A.addTarget(p.DialogManager);A.after("constrain2viewChange",A._afterConstrain2viewChange);A.after("drag:start",A._afterDragStart);A.after("draggableChange",A._afterDraggableChange);A.after("dragInstanceChange",A._afterDragInstanceChange);A.after("render",A._afterRenderer);A.after("resizableChange",A._afterResizableChange);A.after("resizableInstanceChange",A._afterResizableInstanceChange);},bindUI:function(){var A=this;A._bindLazyComponents();},syncUI:function(){var A=this;if(A.get(i)){A.plug(p.Plugin.Aria,{attributes:{visible:{ariaName:"hidden",format:function(ab){return !ab;}}}});}},destructor:function(){var A=this;var ab=A.get(U);p.Event.purgeElement(ab,true);p.DialogManager.remove(A);},alignToViewport:function(ac,ab){var A=this;var ad=p.getDoc().get(O);A.move([ad.left+j(ac),ad.top+j(ab)]);},_bindLazyComponents:function(){var A=this;var ab=A.get(U);ab.on("mouseenter",p.bind(A._initLazyComponents,A));},close:function(){var A=this;A.fire("close");},_afterRenderer:function(ab){var A=this;A._initButtons();A.get(F);A.get(s);},_close:function(){var A=this;if(A.get(W)){A.destroy();}else{A.hide();}},_initButtons:function(){var A=this;var ac=A.get(c);if(ac.length){var ab=new p.Toolbar({children:ac});ab._DEFAULT_CONTEXT=A;ab.render(A.footerNode);A.fire("contentUpdate");A.buttons=ab;}},_initLazyComponents:function(){var A=this;A.get(l);A.get(m);},_setDefaultARIAValues:function(){var A=this;var ab=A.icons;if(!A.get(i)){return;}A.aria.setRole("dialog",A.get(U));if(ab){var ac=ab.item(A._closeId)||null;if(ac){A.aria.setAttribute("controls",A.get("id"),ac.get(U));}}},_setDragInstance:function(ab){var A=this;if(A.get(n)){ab=new p.DD.Drag(A.get(D));A._updateDDConstrain2view(ab);}return ab;},_setResizableInstance:function(ab){var A=this;if(A.get(e)){ab=new p.Resize(A.get(G));}return ab;},_setStack:function(ab){var A=this;if(ab){p.DialogManager.register(A);}else{p.DialogManager.remove(A);}return ab;},_syncResizableDimentions:function(ac){var A=this;var ab=ac.type;var ad=ac.info;if((ab===N)||((ab===q)&&!ac.currentTarget.get(Z))){A.set(J,ad.offsetHeight);A.set(f,ad.offsetWidth);}},_updateDDConstrain2view:function(ab){var A=this;ab.plug(p.Plugin.DDConstrained,{constrain2view:A.get(L)});},_afterConstrain2viewChange:function(ab){var A=this;A._updateDDConstrain2view(A.get(l));},_afterDraggableChange:function(ab){var A=this;A.set(l,null);},_afterDragInstanceChange:function(ab){var A=this;if(ab.prevVal){ab.prevVal.destroy();}},_afterDragStart:function(A){var aj=this;var af=aj.get(L);if(!af){var ai=aj.get(l);var ad=ai.get("dragNode");var ae=ad.get("viewportRegion");var ac=ad.get("region");var ah=[0,0];var ab=ai.deltaXY||ah;var ag=ai.mouseXY||ah;ai.plug(p.Plugin.DDConstrained,{constrain:{bottom:ae.bottom+(ac.height-ab[1])-Y,left:ae.left-ab[0]+Y,right:ae.right+(ac.right-ag[0])+Y,top:ae.top-ab[1]+Y}});}},_afterResizableChange:function(ab){var A=this;A.set(m,null);},_afterResizableInstanceChange:function(ab){var A=this;if(ab.prevVal){ab.prevVal.destroy();}}};p.Dialog=p.Component.create({NAME:x,EXTENDS:p.Panel,AUGMENTS:[r,p.WidgetPosition,p.WidgetStack,p.WidgetPositionAlign,p.WidgetPositionConstrain]});var k=new p.OverlayManager({zIndexBase:1000});var T={};k._MODALS=T;k.after(["dialog:destroy","dialog:modalChange","dialog:render","dialog:visibleChange"],function(ab){var A=ab.target;if(A){var ac=A.get("id");if(ab.type!=="dialog:destroy"&&A.get("visible")&&A.get("modal")){T[ac]=true;p.DialogMask.show();}else{delete T[ac];if(v.isEmpty(T)){p.DialogMask.hide();}}}});p.mix(k,{findByChild:function(A){return p.Widget.getByNode(p.one(A).ancestor(y+z,true));},closeByChild:function(A){return k.findByChild(A).close();},refreshByChild:function(ab){var A=k.findByChild(ab);if(A&&A.io){A.io.start();}}});p.DialogManager=k;},"@VERSION@",{requires:["aui-panel","dd-constrain","aui-button-item","aui-overlay-manager","aui-overlay-mask","aui-io-plugin","aui-resize"],skinnable:true});