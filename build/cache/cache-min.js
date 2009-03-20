YUI.add("cache",function(C){var A=C.Lang,B=function(){B.superclass.constructor.apply(this,arguments);};C.mix(B,{NAME:"cache",ATTRS:{size:{value:0,validator:function(D){return(A.isNumber(D)&&(D>=0));},set:function(E){var D=this._entries;if(A.isNumber(E)&&E>0){if(D){while(D.length>E){D.shift();}}return E;}else{this._entries=[];return 0;}}}}});C.extend(B,C.Base,{_entries:null,initializer:function(){this.publish("add",{defaultFn:this._defAdd});this.publish("flush",{defaultFn:this._defFlush});this._entries=[];},destructor:function(){this._entries=null;},_defAdd:function(G,F){var E=this._entries,D=this.get("size");if(!E||(D===0)){G.stopImmediatePropagation();return;}while(E.length>=(D)){E.shift();}E[E.length]=F;},_defFlush:function(D){this._entries=[];},getEntries:function(){return this._entries;},isMatch:function(E,D){return(E===D.request);},add:function(E,D,F){this.fire("add",null,{request:E,response:D,payload:F});},flush:function(){this.fire("flush");},retrieve:function(I){var D=this._entries,H=D.length,E=null,G=null,F=H-1;if((this.get("size")>0)&&(H>0)){this.fire("request",{request:I});for(;F>=0;F--){G=D[F];if(this.isMatch(I,G)){this.fire("retrieve",{entry:G});if(F<H-1){D.splice(F,1);D[D.length]=G;break;}}}return G;}return null;}});C.namespace("Cache");C.Cache=B;},"@VERSION@",{requires:["base"]});