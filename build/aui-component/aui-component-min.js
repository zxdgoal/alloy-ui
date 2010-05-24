AUI.add("aui-component",function(C){var F=C.Lang,D=C.ClassNameManager.getClassName,K="component",G=D(K),I=D("helper","hidden"),B=Object.prototype.constructor;var J=function(L){var A=this;A._originalConfig=L;J.superclass.constructor.apply(this,arguments);E[A.get("id")]=A;};var E=J._INSTANCES={};J.NAME="component";J.ATTRS={cssClass:{lazyAdd:false,value:null},hideClass:{value:I},owner:{validator:function(L){var A=this;return L instanceof C.Widget||L===null;}},relayEvents:{value:true},render:{value:false,writeOnce:true}};C.extend(J,C.Widget,{initializer:function(L){var A=this;if(L&&L.cssClass){A._uiSetCssClass(L.cssClass);}A._setOwnerComponent(A.get("ownerComponent"));A._setRelayEvents(A.get("relayEvents"));A._setComponentClassNames();A.after("cssClassChange",A._afterCssClassChange);A.after("destroy",A._afterComponentDestroy);A.after("ownerChange",A._afterComponentOwnerChange);A.after("relayEventsChange",A._afterComponentRelayEventsChange);A.after("visibleChange",A._afterComponentVisibleChange);},clone:function(L){var A=this;L=L||{};L.id=L.id||C.guid();C.mix(L,A._originalConfig);return new A.constructor(L);},toggle:function(){var A=this;return A.set("visible",!A.get("visible"));},_afterComponentDestroy:function(L){var A=this;try{A.get("boundingBox").remove();}catch(M){}},_afterComponentOwnerChange:function(L){var A=this;A._setOwnerComponent(L.newVal);},_afterComponentRelayEventsChange:function(L){var A=this;A._setRelayEvents(L.newVal);},_afterComponentVisibleChange:function(M){var A=this;var O=A.get("hideClass");if(O!==false){var L=A.get("boundingBox");var N="addClass";if(M.newVal){N="removeClass";}L[N](O||I);}},_afterCssClassChange:function(L){var A=this;A._uiSetCssClass(L.newVal,L.prevVal);},_relayEvents:function(){var A=this;J.superclass.fire.apply(A,arguments);var L=A._ownerComponent;if(L){L.fire.apply(L,arguments);}},_setComponentClassNames:function(){var A=this;var O=A._getClasses();var M;var L=[];for(var N=O.length-4;N>=0;N--){M=O[N].NAME.toLowerCase();L.push(D(M,"content"));}A.get("contentBox").addClass(L.join(" "));},_setRelayEvents:function(L){var A=this;if(L){A.fire=A._relayEvents;}else{A.fire=J.superclass.fire;}},_setOwnerComponent:function(L){var A=this;A._ownerComponent=L;},_uiSetCssClass:function(O,Q){var L=this;var P=Q+"-content";var A=O+"-content";var N=L.get("boundingBox");var M=L.get("contentBox");N.replaceClass(Q,O);M.replaceClass(P,A);}});J.getById=function(A){return E[A];};var H=J.prototype;J.create=function(L){L=L||{};var M=L.EXTENDS||C.Component;var A=L.constructor;if(!A||A==B){A=function(){A.superclass.constructor.apply(this,arguments);};}var N=L.prototype;if(L.UI_ATTRS){N._BIND_UI_ATTRS=H._BIND_UI_ATTRS.concat(L.UI_ATTRS);N._SYNC_UI_ATTRS=H._SYNC_UI_ATTRS.concat(L.UI_ATTRS);}if(L.BIND_UI_ATTRS){N._BIND_UI_ATTRS=H._BIND_UI_ATTRS.concat(L.BIND_UI_ATTRS);}if(L.SYNC_UI_ATTRS){N._SYNC_UI_ATTRS=H._SYNC_UI_ATTRS.concat(L.SYNC_UI_ATTRS);}C.mix(A,L);delete A.prototype;C.extend(A,M,N);return A;};C.Component=J;},"@VERSION@",{requires:["widget"],skinnable:false});