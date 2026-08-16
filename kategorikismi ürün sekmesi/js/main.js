(function(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["offers"] = factory();
	else
		root["og"] = root["og"] || {}, root["og"]["offers"] = factory();
})(window, function() {
  var module={}, exports={};(factory => {
if(typeof exports === 'object' && typeof module === 'object')
  module.exports = factory();
else {
  window.og = window.og || {};
  window.og['offers'] = factory();
}
})(()=>{ 
var lib=(()=>{var fc=Object.create;var _t=Object.defineProperty;var hc=Object.getOwnPropertyDescriptor;var mc=Object.getOwnPropertyNames;var gc=Object.getPrototypeOf,yc=Object.prototype.hasOwnProperty;var n=(t,e)=>_t(t,"name",{value:e,configurable:!0});var te=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),ei=(t,e)=>{for(var r in e)_t(t,r,{get:e[r],enumerable:!0})},ti=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of mc(e))!yc.call(t,i)&&i!==r&&_t(t,i,{get:()=>e[i],enumerable:!(o=hc(e,i))||o.enumerable});return t};var le=(t,e,r)=>(r=t!=null?fc(gc(t)):{},ti(e||!t||!t.__esModule?_t(r,"default",{value:t,enumerable:!0}):r,t)),bc=t=>ti(_t({},"__esModule",{value:!0}),t);var tr=te((er,li)=>{(function(t,e){typeof er=="object"&&typeof li<"u"?e(er):typeof define=="function"&&define.amd?define(["exports"],e):(t=t||self,e(t.throttleDebounce={}))})(er,function(t){"use strict";function e(o,i,s,a){var c,l=!1,p=0;function u(){c&&clearTimeout(c)}n(u,"clearExistingTimeout");function f(){u(),l=!0}n(f,"cancel"),typeof i!="boolean"&&(a=s,s=i,i=void 0);function h(){for(var w=arguments.length,P=new Array(w),g=0;g<w;g++)P[g]=arguments[g];var O=this,E=Date.now()-p;if(l)return;function y(){p=Date.now(),s.apply(O,P)}n(y,"exec");function v(){c=void 0}n(v,"clear"),a&&!c&&y(),u(),a===void 0&&E>o?y():i!==!0&&(c=setTimeout(a?v:y,a===void 0?o-E:o))}return n(h,"wrapper"),h.cancel=f,h}n(e,"throttle");function r(o,i,s){return s===void 0?e(o,i,!1):e(o,s,i!==!1)}n(r,"debounce"),t.debounce=r,t.throttle=e,Object.defineProperty(t,"__esModule",{value:!0})})});var Tt=te((Cd,Ri)=>{var Rc="Expected a function",Pi="__lodash_hash_undefined__",Ac="[object Function]",Ic="[object GeneratorFunction]",Nc=/[\\^$.*+?()[\]{}|]/g,kc=/^\[object .+?Constructor\]$/,Fc=typeof window=="object"&&window&&window.Object===Object&&window,Dc=typeof self=="object"&&self&&self.Object===Object&&self,Oi=Fc||Dc||Function("return this")();function qc(t,e){return t?.[e]}n(qc,"getValue");function Uc(t){var e=!1;if(t!=null&&typeof t.toString!="function")try{e=!!(t+"")}catch{}return e}n(Uc,"isHostObject");var Lc=Array.prototype,Mc=Function.prototype,vi=Object.prototype,No=Oi["__core-js_shared__"],xi=function(){var t=/[^.]+$/.exec(No&&No.keys&&No.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),Ti=Mc.toString,ko=vi.hasOwnProperty,$c=vi.toString,Vc=RegExp("^"+Ti.call(ko).replace(Nc,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),jc=Lc.splice,Gc=wi(Oi,"Map"),vt=wi(Object,"create");function Ae(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}n(Ae,"Hash");function Hc(){this.__data__=vt?vt(null):{}}n(Hc,"hashClear");function Bc(t){return this.has(t)&&delete this.__data__[t]}n(Bc,"hashDelete");function zc(t){var e=this.__data__;if(vt){var r=e[t];return r===Pi?void 0:r}return ko.call(e,t)?e[t]:void 0}n(zc,"hashGet");function Yc(t){var e=this.__data__;return vt?e[t]!==void 0:ko.call(e,t)}n(Yc,"hashHas");function Wc(t,e){var r=this.__data__;return r[t]=vt&&e===void 0?Pi:e,this}n(Wc,"hashSet");Ae.prototype.clear=Hc;Ae.prototype.delete=Bc;Ae.prototype.get=zc;Ae.prototype.has=Yc;Ae.prototype.set=Wc;function Ze(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}n(Ze,"ListCache");function Jc(){this.__data__=[]}n(Jc,"listCacheClear");function Kc(t){var e=this.__data__,r=_r(e,t);if(r<0)return!1;var o=e.length-1;return r==o?e.pop():jc.call(e,r,1),!0}n(Kc,"listCacheDelete");function Qc(t){var e=this.__data__,r=_r(e,t);return r<0?void 0:e[r][1]}n(Qc,"listCacheGet");function Zc(t){return _r(this.__data__,t)>-1}n(Zc,"listCacheHas");function Xc(t,e){var r=this.__data__,o=_r(r,t);return o<0?r.push([t,e]):r[o][1]=e,this}n(Xc,"listCacheSet");Ze.prototype.clear=Jc;Ze.prototype.delete=Kc;Ze.prototype.get=Qc;Ze.prototype.has=Zc;Ze.prototype.set=Xc;function Ie(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}n(Ie,"MapCache");function el(){this.__data__={hash:new Ae,map:new(Gc||Ze),string:new Ae}}n(el,"mapCacheClear");function tl(t){return Er(this,t).delete(t)}n(tl,"mapCacheDelete");function rl(t){return Er(this,t).get(t)}n(rl,"mapCacheGet");function ol(t){return Er(this,t).has(t)}n(ol,"mapCacheHas");function nl(t,e){return Er(this,t).set(t,e),this}n(nl,"mapCacheSet");Ie.prototype.clear=el;Ie.prototype.delete=tl;Ie.prototype.get=rl;Ie.prototype.has=ol;Ie.prototype.set=nl;function _r(t,e){for(var r=t.length;r--;)if(ll(t[r][0],e))return r;return-1}n(_r,"assocIndexOf");function il(t){if(!Ci(t)||al(t))return!1;var e=pl(t)||Uc(t)?Vc:kc;return e.test(cl(t))}n(il,"baseIsNative");function Er(t,e){var r=t.__data__;return sl(e)?r[typeof e=="string"?"string":"hash"]:r.map}n(Er,"getMapData");function wi(t,e){var r=qc(t,e);return il(r)?r:void 0}n(wi,"getNative");function sl(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}n(sl,"isKeyable");function al(t){return!!xi&&xi in t}n(al,"isMasked");function cl(t){if(t!=null){try{return Ti.call(t)}catch{}try{return t+""}catch{}}return""}n(cl,"toSource");function Fo(t,e){if(typeof t!="function"||e&&typeof e!="function")throw new TypeError(Rc);var r=n(function(){var o=arguments,i=e?e.apply(this,o):o[0],s=r.cache;if(s.has(i))return s.get(i);var a=t.apply(this,o);return r.cache=s.set(i,a),a},"memoized");return r.cache=new(Fo.Cache||Ie),r}n(Fo,"memoize");Fo.Cache=Ie;function ll(t,e){return t===e||t!==t&&e!==e}n(ll,"eq");function pl(t){var e=Ci(t)?$c.call(t):"";return e==Ac||e==Ic}n(pl,"isFunction");function Ci(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}n(Ci,"isObject");Ri.exports=Fo});var Ps=te((pf,Yo)=>{function jl(t,e){var r,o,i,s,a,c,l,p,u,f;for(r=t.length&3,o=t.length-r,i=e,a=3432918353,l=461845907,f=0;f<o;)u=t.charCodeAt(f)&255|(t.charCodeAt(++f)&255)<<8|(t.charCodeAt(++f)&255)<<16|(t.charCodeAt(++f)&255)<<24,++f,u=(u&65535)*a+(((u>>>16)*a&65535)<<16)&4294967295,u=u<<15|u>>>17,u=(u&65535)*l+(((u>>>16)*l&65535)<<16)&4294967295,i^=u,i=i<<13|i>>>19,s=(i&65535)*5+(((i>>>16)*5&65535)<<16)&4294967295,i=(s&65535)+27492+(((s>>>16)+58964&65535)<<16);switch(u=0,r){case 3:u^=(t.charCodeAt(f+2)&255)<<16;case 2:u^=(t.charCodeAt(f+1)&255)<<8;case 1:u^=t.charCodeAt(f)&255,u=(u&65535)*a+(((u>>>16)*a&65535)<<16)&4294967295,u=u<<15|u>>>17,u=(u&65535)*l+(((u>>>16)*l&65535)<<16)&4294967295,i^=u}return i^=t.length,i^=i>>>16,i=(i&65535)*2246822507+(((i>>>16)*2246822507&65535)<<16)&4294967295,i^=i>>>13,i=(i&65535)*3266489909+(((i>>>16)*3266489909&65535)<<16)&4294967295,i^=i>>>16,i>>>0}n(jl,"murmurhash3_32_gc");typeof Yo<"u"&&(Yo.exports=jl)});var Os=te((uf,Wo)=>{function Gl(t,e){for(var r=t.length,o=e^r,i=0,s;r>=4;)s=t.charCodeAt(i)&255|(t.charCodeAt(++i)&255)<<8|(t.charCodeAt(++i)&255)<<16|(t.charCodeAt(++i)&255)<<24,s=(s&65535)*1540483477+(((s>>>16)*1540483477&65535)<<16),s^=s>>>24,s=(s&65535)*1540483477+(((s>>>16)*1540483477&65535)<<16),o=(o&65535)*1540483477+(((o>>>16)*1540483477&65535)<<16)^s,r-=4,++i;switch(r){case 3:o^=(t.charCodeAt(i+2)&255)<<16;case 2:o^=(t.charCodeAt(i+1)&255)<<8;case 1:o^=t.charCodeAt(i)&255,o=(o&65535)*1540483477+(((o>>>16)*1540483477&65535)<<16)}return o^=o>>>13,o=(o&65535)*1540483477+(((o>>>16)*1540483477&65535)<<16),o^=o>>>15,o>>>0}n(Gl,"murmurhash2_32_gc");typeof Wo!==void 0&&(Wo.exports=Gl)});var Ts=te((df,Lr)=>{var vs=Ps(),Hl=Os();Lr.exports=vs;Lr.exports.murmur3=vs;Lr.exports.murmur2=Hl});var Wr=te((qh,Js)=>{var lp={PAR_OPEN:"(".charCodeAt(0),PAR_CLOSE:")".charCodeAt(0),OP_NOT:"!".charCodeAt(0),BINARY_AND:"&".charCodeAt(0),BINARY_OR:"|".charCodeAt(0),LITERAL:"LITERAL",END:"END",LEAF:"LEAF",ATOMIC:"ATOMIC"};Js.exports=lp});var Qs=te((Uh,Ks)=>{var Ue=Wr(),pp=n(t=>{let e="",r=[];for(let o of t){let i=o.charCodeAt(0);switch(i){case Ue.PAR_OPEN:case Ue.PAR_CLOSE:case Ue.OP_NOT:case Ue.BINARY_AND:case Ue.BINARY_OR:e&&(r.push({type:Ue.LITERAL,value:e}),e=""),r.push({type:i,value:o});break;default:e+=o}}return e&&r.push({type:Ue.LITERAL,value:e}),r},"Tokenizer");Ks.exports=pp});var Xs=te((Lh,Zs)=>{var Pe=Wr(),up=n(t=>{let e=[],r=[];return t.forEach(i=>{switch(i.type){case Pe.LITERAL:e.unshift(i);break;case Pe.BINARY_AND:case Pe.BINARY_OR:case Pe.OP_NOT:case Pe.PAR_OPEN:r.push(i);break;case Pe.PAR_CLOSE:for(;r.length&&r[r.length-1].type!==Pe.PAR_OPEN;)e.unshift(r.pop());r.pop(),r.length&&r[r.length-1].type===Pe.OP_NOT&&e.unshift(r.pop());break;default:break}}),r.length&&[...r.reverse(),...e]||e},"PolishNotation"),dp=n(function*(t){for(let e=0;e<t.length-1;e++)yield t[e];return t[t.length-1]},"PolishGenerator");Zs.exports={PolishNotation:up,PolishGenerator:dp}});var ta=te((Mh,ea)=>{var V=Wr(),Y=class{constructor(e,r,o,i){this.op=e,this.left=r,this.right=o,this.literal=i}isLeaf(){return this.op===V.LEAF}isAtomic(){return this.isLeaf()||this.op===V.OP_NOT&&this.left.isLeaf()}getLiteralValue(){return this.literal}static CreateAnd(e,r){return new Y(V.BINARY_AND,e,r)}static CreateNot(e){return new Y(V.OP_NOT,e)}static CreateOr(e,r){return new Y(V.BINARY_OR,e,r)}static CreateLiteral(e){return new Y(V.LEAF,null,null,e)}};n(Y,"ExpNode");var ht=n(t=>{let e=t.next().value;switch(e.type){case V.LITERAL:return Y.CreateLiteral(e.value);case V.OP_NOT:return Y.CreateNot(ht(t));case V.BINARY_AND:{let r=ht(t),o=ht(t);return Y.CreateAnd(r,o)}case V.BINARY_OR:{let r=ht(t),o=ht(t);return Y.CreateOr(r,o)}}return null},"make"),mt=n((t,e)=>{if(t.isLeaf())return e(t.getLiteralValue());if(t.op===V.OP_NOT)return!mt(t.left,e);if(t.op===V.BINARY_OR)return mt(t.left,e)||mt(t.right,e);if(t.op===V.BINARY_AND)return mt(t.left,e)&&mt(t.right,e)},"nodeEvaluator");ea.exports={make:ht,nodeEvaluator:mt}});var ia=te(($h,na)=>{var fp=Qs(),ra=Xs(),oa=ta(),hp=n((t,e)=>{let r=fp(t),o=ra.PolishNotation(r),i=ra.PolishGenerator(o),s=oa.make(i);return oa.nodeEvaluator(s,e)},"parse");na.exports={parse:hp}});var Sd={};ei(Sd,{addOptinChangedCallback:()=>Ku,addTemplate:()=>Qu,autoInit:()=>yd,clear:()=>Zu,config:()=>Xu,default:()=>bd,disableOptinChangedCallbacks:()=>ed,getOptins:()=>td,getProductsForPurchasePost:()=>rd,initialize:()=>od,isReady:()=>Ju,offers:()=>x,platform:()=>I,previewMode:()=>nd,register:()=>id,resolveSettings:()=>sd,setAuthUrl:()=>ad,setBenefitMessages:()=>cd,setEnvironment:()=>ld,setLocale:()=>pd,setMerchantId:()=>ud,setPublicPath:()=>dd,setTemplates:()=>fd,setupCart:()=>hd,setupProduct:()=>md,setupProducts:()=>gd,store:()=>uc});function vo(t){var e,r=t.Symbol;return typeof r=="function"?r.observable?e=r.observable:(e=r("observable"),r.observable=e):e="@@observable",e}n(vo,"symbolObservablePonyfill");var $e;typeof self<"u"?$e=self:typeof window<"u"||typeof window<"u"?$e=window:typeof module<"u"?$e=module:$e=Function("return this")();var Sc=vo($e),To=Sc;var wo=n(function(){return Math.random().toString(36).substring(7).split("").join(".")},"randomString"),Et={INIT:"@@redux/INIT"+wo(),REPLACE:"@@redux/REPLACE"+wo(),PROBE_UNKNOWN_ACTION:n(function(){return"@@redux/PROBE_UNKNOWN_ACTION"+wo()},"PROBE_UNKNOWN_ACTION")};function _c(t){if(typeof t!="object"||t===null)return!1;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}n(_c,"isPlainObject");function Co(t,e,r){var o;if(typeof e=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if(typeof e=="function"&&typeof r>"u"&&(r=e,e=void 0),typeof r<"u"){if(typeof r!="function")throw new Error("Expected the enhancer to be a function.");return r(Co)(t,e)}if(typeof t!="function")throw new Error("Expected the reducer to be a function.");var i=t,s=e,a=[],c=a,l=!1;function p(){c===a&&(c=a.slice())}n(p,"ensureCanMutateNextListeners");function u(){if(l)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return s}n(u,"getState");function f(g){if(typeof g!="function")throw new Error("Expected the listener to be a function.");if(l)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var O=!0;return p(),c.push(g),n(function(){if(!!O){if(l)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");O=!1,p();var y=c.indexOf(g);c.splice(y,1),a=null}},"unsubscribe")}n(f,"subscribe");function h(g){if(!_c(g))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(typeof g.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(l)throw new Error("Reducers may not dispatch actions.");try{l=!0,s=i(s,g)}finally{l=!1}for(var O=a=c,E=0;E<O.length;E++){var y=O[E];y()}return g}n(h,"dispatch");function w(g){if(typeof g!="function")throw new Error("Expected the nextReducer to be a function.");i=g,h({type:Et.REPLACE})}n(w,"replaceReducer");function P(){var g,O=f;return g={subscribe:n(function(y){if(typeof y!="object"||y===null)throw new TypeError("Expected the observer to be an object.");function v(){y.next&&y.next(u())}n(v,"observeState"),v();var Zt=O(v);return{unsubscribe:Zt}},"subscribe")},g[To]=function(){return this},g}return n(P,"observable"),h({type:Et.INIT}),o={dispatch:h,subscribe:f,getState:u,replaceReducer:w},o[To]=P,o}n(Co,"createStore");function Ec(t,e){var r=e&&e.type,o=r&&'action "'+String(r)+'"'||"an action";return"Given "+o+', reducer "'+t+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}n(Ec,"getUndefinedStateErrorMessage");function xc(t){Object.keys(t).forEach(function(e){var r=t[e],o=r(void 0,{type:Et.INIT});if(typeof o>"u")throw new Error('Reducer "'+e+`" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);if(typeof r(void 0,{type:Et.PROBE_UNKNOWN_ACTION()})>"u")throw new Error('Reducer "'+e+'" returned undefined when probed with a random type. '+("Don't try to handle "+Et.INIT+' or other actions in "redux/*" ')+"namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.")})}n(xc,"assertReducerShape");function Xt(t){for(var e=Object.keys(t),r={},o=0;o<e.length;o++){var i=e[o];typeof t[i]=="function"&&(r[i]=t[i])}var s=Object.keys(r),a,c;try{xc(r)}catch(l){c=l}return n(function(p,u){if(p===void 0&&(p={}),c)throw c;if(!1)var f;for(var h=!1,w={},P=0;P<s.length;P++){var g=s[P],O=r[g],E=p[g],y=O(E,u);if(typeof y>"u"){var v=Ec(g,u);throw new Error(v)}w[g]=y,h=h||y!==E}return h=h||s.length!==Object.keys(p).length,h?w:p},"combination")}n(Xt,"combineReducers");function ri(t,e){return function(){return e(t.apply(this,arguments))}}n(ri,"bindActionCreator");function ni(t,e){if(typeof t=="function")return ri(t,e);if(typeof t!="object"||t===null)throw new Error("bindActionCreators expected an object or a function, instead received "+(t===null?"null":typeof t)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');var r={};for(var o in t){var i=t[o];typeof i=="function"&&(r[o]=ri(i,e))}return r}n(ni,"bindActionCreators");function Pc(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}n(Pc,"_defineProperty");function oi(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),r}n(oi,"ownKeys");function Oc(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?oi(r,!0).forEach(function(o){Pc(t,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):oi(r).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(r,o))})}return t}n(Oc,"_objectSpread2");function Ro(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.length===0?function(o){return o}:e.length===1?e[0]:e.reduce(function(o,i){return function(){return o(i.apply(void 0,arguments))}})}n(Ro,"compose");function ii(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(o){return function(){var i=o.apply(void 0,arguments),s=n(function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},"dispatch"),a={getState:i.getState,dispatch:n(function(){return s.apply(void 0,arguments)},"dispatch")},c=e.map(function(l){return l(a)});return s=Ro.apply(void 0,c)(i.dispatch),Oc({},i,{dispatch:s})}}}n(ii,"applyMiddleware");function si(t){var e=n(function(o){var i=o.dispatch,s=o.getState;return function(a){return function(c){return typeof c=="function"?c(i,s,t):a(c)}}},"middleware");return e}n(si,"createThunkMiddleware");var ai=si();ai.withExtraArgument=si;var ci=ai;var us=le(tr());var pi=/^og_auth=/,vc=n((t=pi)=>(document.cookie.split(/;\s*/).find(e=>e.match(t))||"").replace(pi,""),"c"),rr=n(t=>{if(typeof t=="object")return t;let e=String(t||"").split("|");return e.length===3?{sig_field:e[0],ts:parseInt(e[1],10),sig:e[2]}:null},"r"),Tc=n(t=>new Promise((e,r)=>{let o=document.createElement("iframe");o.style.setProperty("display","none","important"),document.body.appendChild(o),o.onload=e,o.onerror=r,o.src=t}),"p"),wc=n(t=>(t.headers.get("content-type")||"").indexOf("application/json")!==-1,"d");function ui(){return typeof window.og_auth<"u"?rr(window.og_auth):null}n(ui,"a");async function Cc(t=100){return new Promise(e=>{setTimeout(()=>e(ui()),t)})}n(Cc,"f");async function di(t,e=vc,r=Tc){let o;if(o=rr(ui())||rr(e()),o)return o;if(t&&typeof t=="string"){let i=await fetch(t);i.status>=200&&i.status<300&&(o=e()||await(wc(i)?i.json():Promise.resolve(r(t)).then(e)))}else o||(o=await Cc());if(o=rr(o),o)return o;throw new Error("Unauthorized")}n(di,"u");var A="OPTIN_PRODUCT",D="OPTOUT_PRODUCT",q="PRODUCT_CHANGE_FREQUENCY",pe="PRODUCT_CHANGE_PREPAID_SHIPMENTS",Ve="SET_MERCHANT_ID",L="REQUEST_OFFER",T="RECEIVE_OFFER",xt="PRODUCT_HAS_CHANGED",je="CREATED_SESSION_ID",or="SET_AUTH_URL",fi="REQUEST_AUTH",nr="AUTHORIZE",Te="UNAUTHORIZED",hi="REQUEST_ORDERS",ir="RECEIVE_ORDERS",Pt="CART_PRODUCT_KEY_HAS_CHANGED",sr="RECEIVE_ORDER_ITEMS",mi="FETCH_RESPONSE_ERROR",Ge="SET_ENVIRONMENT_LOCAL",He="SET_ENVIRONMENT_STAGING",Be="SET_ENVIRONMENT_DEV",ze="SET_ENVIRONMENT_PROD",ar="READY",gi="CONCLUDE_UPSELL",yi="REQUEST_CREATE_IU_ORDER",cr="CREATE_ONE_TIME",bi="REQUEST_CONVERT_ONE_TIME",lr="CONVERT_ONE_TIME";var Ye="CHECKOUT",Si="RECEIVE_FETCH",pr="SET_LOCALE",We="SET_CONFIG",ur="SET_BENEFIT_MESSAGES",he="SET_PREVIEW_STANDARD_OFFER",Ot="SET_PREVIEW_UPSELL_OFFER",Ao="SET_PREVIEW_PREPAID_OFFER",dr="ADD_TEMPLATE",fr="SET_TEMPLATES",we="LOCAL_STORAGE_CHANGE",me="LOCAL_STORAGE_CLEAR",hr="SET_FIRST_ORDER_PLACE_DATE",mr="SET_PRODUCT_TO_SUBSCRIBE",Je="RECEIVE_PRODUCT_PLANS",U="SETUP_PRODUCT",ge="SETUP_CART",ue="RECEIVE_MERCHANT_SETTINGS",Io="SET_EXPERIMENT_VARIANT",Ke="pdp",_i="local",gr="dev",Ce="staging",Re="prod",yr="static.ordergroove.com",br="staging.static.ordergroove.com",ye={PSI:"PSI",PROGRAM_WIDE:"PROGRAM_WIDE"},Sr={PREPAID:"prepaid"},Ei="og-cart-updated";var xr=le(Tt());var Do=n((...t)=>JSON.stringify(t),"memoizeKey"),wt=n(t=>(...e)=>fetch(...t(...e)).then(r=>r.json()),"withFetchJson"),Ct=n(t=>(e,...r)=>{if(!e)throw Error("host required");let[o,i={}]=t(...r);return[`${e.replace(/\/+$/,"")}${o}`,i]},"withHost"),Pr=n(t=>(e,...r)=>{if(!e)throw Error("auth required");let[o,i={}]=t(...r);return[o,{...i,headers:{Authorization:JSON.stringify(e),...i.headers}}]},"withAuth"),Ai=n(t=>(...e)=>{let[r,o={}]=t(...e);return[r,{method:"POST",...o,body:JSON.stringify(o.body),headers:{"Content-type":"application/json",...o.headers}}]},"withJsonBody"),Ii=n((t=[])=>(Array.isArray(t)?t:Object.entries(t)).map(([e,r])=>[e,encodeURIComponent(r)].join("=")).join("&"),"toQuery"),ul=n(t=>JSON.stringify([].concat(t).map(e=>typeof e=="object"?e.id:e).filter(e=>e)),"toProductId"),dl=(0,xr.default)(wt(Ct((t,e,r,o="pdp",i={})=>{if(!t)throw Error("merchantId required");if(!e)throw Error("sessionId required");if(!r)throw Error("product required");let s=[["session_id",e],["page_type",1],["p",ul(r)],["module_view",JSON.stringify(["regular"])],...Object.entries(i)];return[`/offer/${t}/${o}?${Ii(s)}`]})),Do),fl=(0,xr.default)(wt(Ct(Pr((t=1,e="place")=>[`/orders/?${Ii([["status",t],["ordering",e],["exclude_prepaid_orders","true"]])}`]))),Do),hl=(0,xr.default)(wt(Ct(Pr(t=>{if(!t)throw Error("orderId required");return[`/items/?order=${t}`]}))),Do),ml=wt(Ct(Pr(Ai((t,e,r,o)=>{if(!t)throw Error("product required");if(!e)throw Error("order required");if(!r)throw Error("quantity required");if(r<=0)throw Error("quantity must be greater or equal than one");if(!o)throw Error("offer required");return["/items/iu/",{body:{product:t,order:e,quantity:r,offer:o}}]})))),Rt=n(t=>{if(typeof t=="object")return{...t};let[e,r]=(t||"").split(/_/).map(o=>parseInt(o,10));return e&&r&&{every:e,every_period:r}},"parseFrequency"),qo=n(t=>t.match(/^\d+_\d$/),"isFrequencyValid"),gl=n((t,e)=>String.prototype.localeCompare.call(t&&t.split("_").reverse().join("_"),e&&e.split("_").reverse().join("_")),"compareFrequencies"),Ni=n(t=>[...new Set(t&&t.split(/\s+/))].filter(qo).sort(gl),"parseFrequenciesList");var At=n(t=>{if(typeof t=="object"){let{every:e,period:r,every_period:o}=t;return`${e}_${r||o}`}return typeof t=="string"?t:""},"stringifyFrequency"),yl=wt(Ct(Pr(Ai((t,e,r,o)=>{if(!t)throw Error("item required");if(!e)throw Error("frequency required");let i=Rt(e);if(!i)throw Error("invalid frequency");return["/subscriptions/create_from_item/",{body:{item:t.public_id,offer:r,session_id:o,...i}}]})))),Xe={fetchOffer:dl,fetchOrders:fl,fetchItems:hl,createOneTime:ml,convertOneTimeToSubscription:yl},ki=Xe;var Uo=It(),I={shopify:typeof window.Shopify!="undefined",shopify_selling_plans:typeof(Uo==null?void 0:Uo.dataset.shopifySellingPlans)!="undefined"};function bl(t,e){return t===e}n(bl,"defaultEqualityCheck");function Sl(t,e,r){if(e===null||r===null||e.length!==r.length)return!1;for(var o=e.length,i=0;i<o;i++)if(!t(e[i],r[i]))return!1;return!0}n(Sl,"areArgumentsShallowlyEqual");function _l(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:bl,r=null,o=null;return function(){return Sl(e,r,arguments)||(o=t.apply(null,arguments)),r=arguments,o}}n(_l,"defaultMemoize");function El(t){var e=Array.isArray(t[0])?t[0]:t;if(!e.every(function(o){return typeof o=="function"})){var r=e.map(function(o){return typeof o}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, "+("instead received the following types: ["+r+"]"))}return e}n(El,"getDependencies");function xl(t){for(var e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];return function(){for(var i=arguments.length,s=Array(i),a=0;a<i;a++)s[a]=arguments[a];var c=0,l=s.pop(),p=El(s),u=t.apply(void 0,[function(){return c++,l.apply(null,arguments)}].concat(r)),f=t(function(){for(var h=[],w=p.length,P=0;P<w;P++)h.push(p[P].apply(null,arguments));return u.apply(null,h)});return f.resultFunc=l,f.dependencies=p,f.recomputations=function(){return c},f.resetRecomputations=function(){return c=0},f}}n(xl,"createSelectorCreator");var R=xl(_l);var k=le(Tt());var M=n((t,e)=>t===null?"":new Intl.NumberFormat(navigator.language,{style:"currency",currency:e}).format(t/100),"money"),et=n(t=>`${t}%`,"percentage"),Pl="Subscribe and Save",Ol="ordergroove-subscribe-and-save-",Nt=n((t=[])=>t.find(qi)||t.find(Di)||t.find(Or),"getPayAsYouGoSellingPlanGroup"),Fi=n((t=[])=>t.filter(e=>Di(e)||qi(e)||Or(e)),"getPayAsYouGoSellingPlanGroups"),Di=n(t=>t.name===Pl||t.app_id==="ordergroove-subscribe-and-save","isDefaultSellingPlanGroup"),qi=n(t=>t.name.startsWith("og_psfl")||t.app_id==="ordergroove-product-specific-frequency-list","isProductSpecificFrequencySellingPlanGroup"),Or=n(t=>{var e;return(e=t.app_id)==null?void 0:e.startsWith(Ol)},"isExperimentSellingPlanGroup"),Ui=n(t=>{let e=Nt(t.map(r=>r.group));return t.find(r=>r.group===e)},"getPayAsYouGoSellingPlan");function vr(t){var e;return(e=t==null?void 0:t.selling_plans)==null?void 0:e.map(({id:r})=>`${r}`)}n(vr,"sellingPlansToFrequencies");function Tr(t){var e;return(e=t==null?void 0:t.selling_plans)==null?void 0:e.map(({options:r})=>r||[]).flat().map(({value:r})=>vl(r))}n(Tr,"sellingPlansToEveryPeriod");function vl(t){let e=["day","week","month"].findIndex(o=>t.toLowerCase().includes(o))+1,r=(t.match(/(\d+)/)||["",1])[1];return r&&e?`${r}_${e}`:null}n(vl,"textToFreq");function wr(t){var r;let e=(r=t==null?void 0:t.options.find(({name:o})=>o==="Shipment amount"))==null?void 0:r.value.split(" ")[0];return e?Number(e):void 0}n(wr,"getPrepaidShipments");function kt(t){return t[1]||t[0]}n(kt,"getDefaultPrepaidOption");k.default.Cache=Map;function Tl(t,e){if(t===e)return!0;if(t===null||e===null||t.length!==e.length)return!1;for(let r=0;r<t.length;++r)if(t[r]!==e[r])return!1;return!0}n(Tl,"arraysEqual");function wl(t,e,r){let o=At(r);return I.shopify_selling_plans?Z(t,e,o):o}n(wl,"resolveFrequency");var N=n((t,e)=>!!(t===e||typeof t=="object"&&typeof e=="object"&&t&&e&&t.id===e.id&&(!(Array.isArray(t.components)&&Array.isArray(e.components))||Tl((t.components||[]).sort(),(e.components||[]).sort()))),"isSameProduct"),Ft=n(t=>t.optedin||[],"optedinSelector"),Li=n(t=>t.optedout||[],"optedoutSelector"),Lo=n(t=>t.autoshipByDefault||{},"autoshipSelector"),Cl=n(t=>t.defaultFrequencies||{},"defaultFrequenciesSelector"),Mo=n(t=>{var e;return((e=t==null?void 0:t.config)==null?void 0:e.prepaidSellingPlans)||[]},"prepaidSellingPlansSelector"),Rl=n(t=>(t==null?void 0:t.prepaidShipmentsSelected)||{},"prepaidShipmentsSelectedSelector"),re=(0,k.default)(t=>R(Ft,Li,Lo,(e,r,o)=>{let i=e.find(s=>N(t,s));return i||(r.find(s=>N(t,s))?!1:t&&o[t.id]?{id:t.id}:!1)}),t=>JSON.stringify(t)),Cr=(0,k.default)(t=>R(Ft,e=>{let r=e.find(o=>N(t,o));return r||!1}),t=>JSON.stringify(t)),Mi=(0,k.default)(t=>R(Ft,e=>e.some(r=>N(t,r)&&r.prepaidShipments)),t=>JSON.stringify(t)),oe=(0,k.default)(t=>R(Rl,e=>e[t.id]||null),t=>JSON.stringify(t)),Rr=(0,k.default)(t=>R(Li,e=>e.find(r=>N(t,r)))),ne=(0,k.default)(t=>R(re(t),e=>e&&"frequency"in e&&e.frequency||null),t=>JSON.stringify(t)),j=(0,k.default)(t=>R(re(t),e=>e&&"prepaidShipments"in e&&e.prepaidShipments||null),t=>JSON.stringify(t)),G=(0,k.default)(t=>R(Mo,e=>{var o;return(((o=e[S(t)])==null?void 0:o.map(({numberShipments:i})=>i))||[]).sort((i,s)=>i-s)})),tt=(0,k.default)(t=>R(Cl,Q(t),(e,{frequencies:r=[],frequenciesEveryPeriod:o=[]})=>e[S(t)]&&wl(r,o,e[S(t)])||null)),rt=(0,k.default)(t=>R(Q(t),e=>e.frequencies)),ie=(0,k.default)(t=>R(Q(t),e=>e.defaultFrequency)),Q=(0,k.default)(t=>R(e=>{var r;return(r=e==null?void 0:e.config)==null?void 0:r.productFrequencies},e=>{var r;return(r=e==null?void 0:e.config)==null?void 0:r.frequencies},e=>{var r;return(r=e==null?void 0:e.config)==null?void 0:r.frequenciesEveryPeriod},e=>{var r;return(r=e==null?void 0:e.config)==null?void 0:r.frequenciesText},e=>{var r;return(r=e==null?void 0:e.config)==null?void 0:r.defaultFrequency},(e,r,o,i,s)=>e?e[S(t)]||{}:{frequencies:r,frequenciesEveryPeriod:o,frequenciesText:i,defaultFrequency:s})),$i=n((t,e)=>R(Mo,Q(t.id),(r,{frequencies:o})=>{var i;if(e){let s=S(t.id),a=(i=r[s])==null?void 0:i.find(c=>c.numberShipments===e);return a?a.sellingPlan:null}return o[0]}),"makeFrequencyForPrepaidShipmentsSelector"),Vi=n(t=>R(Mo,e=>{let r=S(t);return e[r]||[]}),"makePrepaidSellingPlansSelector"),ji=(0,k.default)(t=>R(e=>e.price||{},e=>e.incentives||{},e=>e.config.storeCurrency,(e,r,o)=>{let i=e[S(t)];if(i==null||!o)return{};let s=i.value,a=s,c=s,l=r[S(t)],p=l==null?void 0:l.initial.find(Il),u="";return p&&(p.type==="Discount Percent"?(c=Math.round(s*(100-p.value)/100),u=et(p.value)):p.type==="Discount Amount"&&o==="USD"&&(c=Math.max(0,s-Math.round(p.value*100)))),{regularPrice:M(a,o),subscriptionPrice:M(c,o),discountRate:u||M(a-c,o)}})),Al=[ye.PROGRAM_WIDE,ye.PSI];function Il(t){return t.object==="item"&&(t.type==="Discount Percent"||t.type==="Discount Amount")&&t.criteria&&t.criteria.node_type==="PREMISE"&&Al.includes(t.criteria.standard)}n(Il,"findRelevantIncentive");var $o=n(t=>t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase(),"kebabCase"),H=n((t,e,r)=>t&&t.hasAttribute&&t.hasAttribute($o(e))&&t[e]||t.offer&&typeof(t.offer[e]!=="undefined")&&t.offer[e]||r,"getFallbackValue"),ot=n(t=>({templates:t.templates||[]}),"templatesSelector"),Gi=n(t=>{let e=Object.values(t.productPlans).flat();return e.length>0&&e.every(r=>r.hasPriceAdjustments===!1||r.prepaidShipments)},"isShopifyDiscountFunctionInUseSelector"),Nl=n(t=>{if(!t||typeof t!="object")return null;let e="en-US",r=(navigator==null?void 0:navigator.language)||e,o=r.split("-")[0],i=Object.keys(t).find(a=>a!==r&&a.split("-")[0]===o),s=t[r]||t[i]||t[e];return typeof s=="string"&&s.length>0?s:null},"resolveLocaleMessage"),Hi=(0,k.default)(t=>R(e=>(e.incentives||{})[S(t==null?void 0:t.id)],e=>e.benefitMessages||{},(e,r)=>{var a;if(!e)return{messages:[]};let o=(a=window==null?void 0:window.og)==null?void 0:a.previewMode,i=new Set,s=new Set;return[e.initial,e.ongoing].forEach(c=>{(c||[]).forEach(l=>{if(!o&&!(l!=null&&l.enhanced))return;let p=l.id;if(!p||i.has(p))return;i.add(p);let u=Nl(r[p]);!u||s.add(u)})}),{messages:[...s]}}),t=>JSON.stringify(t));function Ar(t){document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t()}n(Ar,"onReady");function It(){return document.querySelector([`script[src^="https://${yr}"]`,`script[src^="https://${br}"]`,`script[src^="http://${yr}"]`,`script[src^="http://${br}"]`].join(","))}n(It,"getMainJs");function Vo(){let t=It();if(!t)return[];let e=new URL(t.src),r=e.host.startsWith(Ce)?Ce:Re,o=e.pathname.split("/")[1];return!r&&!o?[]:[o,r,t]}n(Vo,"resolveEnvAndMerchant");var S=n(t=>{var r;if(!t)return"";let e=`${t.id||t}`;return(r=I)!=null&&r.shopify_selling_plans&&(e=e.split(":")[0]),e},"safeProductId"),Bi=n((t,e,r)=>{if(I.shopify_selling_plans){let o=e==null?void 0:e.indexOf(t);if(o>=0&&r[o])return r[o]}return t},"safeOgFrequency"),Dt=n((t,e)=>{if(!`${t}`.includes("_"))return t;let{frequencies:r,frequenciesEveryPeriod:o}=e,i=o==null?void 0:o.indexOf(t);return i>=0&&o[i]?r[i]:(r==null?void 0:r.length)>0&&(o==null?void 0:o.length)>0?(console.warn(`Unable to find selling plan match for frequency ${t}; falling back to first selling plan`),r[0]):t},"frequencyToSellingPlan");function zi(t){if(t.isReady())return;console.info("OG offers are auto initializing");let[e,r]=Vo();if(!r&&!e)return;let o=document.createElement("script");o.onload=()=>console.info("OG pull initialization chunk for merchant",e,r),o.onerror=()=>t.initialize(e,r),o.src=`${window.location.protocol}//${r===Re?yr:br}/${e}/main.js?initOnly=true`,document.head.appendChild(o)}n(zi,"autoInitializeOffers");var Yi=n(t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`},"clearCookie");function Wi(t){let e=document.cookie.match(`(^|;) ?${t}=([^;]*)(;|$)`);return e?e[2]:null}n(Wi,"getCookieValue");var Ne=n(t=>!!(t&&(t==null?void 0:t.includes("_"))),"isOgFrequency"),de=n((t=[])=>(t==null?void 0:t[0])||null,"getFirstSellingPlan"),Ir=n((t=[],e=[])=>{var r;return!!(((r=I)==null?void 0:r.shopify_selling_plans)&&t.length&&e.length)},"hasShopifySellingPlans"),Z=n((t,e,r)=>{if(t.length!==e.length)return null;let o=e.findIndex(i=>i===r);return o>=0?t[o]:null},"mapFrequencyToSellingPlan");function Nr(t,e,r){let o=t.querySelector(`[name="${e}"]`);if(o&&!r){o.remove();return}!o&&r&&(o=document.createElement("input"),o.type="hidden",o.name=e,t.appendChild(o)),o&&(o.value=r)}n(Nr,"getOrCreateHidden");function nt(t,e){let[[r],o]=t.reduce((i,s)=>i[N(e,s)?0:1].push(s)&&i,[[],[]]);return[r||{},o||[]]}n(nt,"getMatchingProductIfExists");var X=n((t,e,r)=>({type:A,payload:{product:t,frequency:e,offer:r}}),"optinProduct"),it=n((t,e)=>({type:D,payload:{product:t,offer:e}}),"optoutProduct"),Ji=n((t,e)=>({type:xt,payload:{newProduct:t,product:e}}),"productHasChangedComponents"),Fr=n((t,e,r)=>({type:q,payload:{product:t,frequency:e,offer:r}}),"productChangeFrequency"),be=n((t,e,r)=>(o,i)=>{let s=$i(t,e)(i());o({type:pe,payload:{product:t,prepaidShipments:e,offer:r,frequency:s}})},"productChangePrepaidShipments");var Dr=n(t=>({type:gi,payload:{product:t}}),"concludeUpsell"),Ki=n(t=>({type:Ve,payload:t}),"setMerchantId"),jo=n(t=>({type:je,payload:`${t}.${Math.floor(Math.random()*999999)}.${Math.round(new Date().getTime()/1e3)}`}),"createSessionId"),kl=n(t=>({type:fi,payload:t}),"requestAuth"),qt=n((t,e,r,o)=>({type:nr,payload:{public_id:t,sig_field:e,ts:r,sig:o}}),"authorize"),se=n(t=>({type:Te,payload:t}),"unauthorized"),Qi=n(t=>({type:or,payload:t}),"setAuthUrl"),Ut=n(t=>({type:Si,payload:t}),"fetchDone"),Zi=n((t=di)=>n(function(r,o){if(window.og&&window.og.previewMode)return r(se({message:"Offers are running in preview mode"}));let{merchantId:i,authUrl:s}=o(),a=kl(s);return r(a),t(s).then(({sig_field:c,ts:l,sig:p})=>r(qt(i,c,l,p)),c=>r(se(c))).finally(()=>r(Ut(a)))},"fetchAuthThunk"),"fetchAuth"),Fl=n((t,e)=>({type:hi,payload:{status:t,ordering:e}}),"requestOrders"),Go=n(t=>({type:ir,payload:t}),"receiveOrders"),Ho=n(t=>({type:sr,payload:t}),"receiveItems"),qr=n((t=1,e="place")=>n(function(o,i){let{environment:{legoUrl:s},auth:a}=i();if(!a)return o(se("No auth set."));let c=Fl(t,e);return o(c),Xe.fetchOrders(s,a,t,e).then(l=>{if(l.results){o(Go(l));let p=(l.results[0]||{}).public_id;if(p)return Xe.fetchItems(s,a,p).then(u=>o(Ho(u)))}return o(se(l.detail)),null},l=>o(se(l))).finally(()=>o(Ut(c)))},"fetchOrdersThunk"),"fetchOrders"),Xi=n(t=>{switch(t){case _i:return{type:Ge,payload:t};case gr:return{type:Be,payload:t};case Ce:return{type:He,payload:t};case Re:return{type:ze,payload:t};default:throw new Error(`${t} is not a supported environment`)}},"setEnvironment"),es=n(()=>(t,e)=>{let{merchantId:r,sessionId:o}=e();return(!o||r&&!o.startsWith(r))&&t(jo(r)),o},"requestSessionId"),Se=n((t,e,r)=>(o,i)=>{let s=i(),a=Q(r)(s),c=Vi(r)(s);o({type:T,payload:{...t,offer:e,frequencyConfig:a,prepaidSellingPlans:c}})},"receiveOffer"),kr=n(t=>({type:mi,payload:t}),"fetchResponseError"),Bo=n((t,e=Ke,r)=>({type:L,payload:{product:t,module:e,offer:r}}),"requestOffer"),ts=Bo,rs=n(()=>({type:Ye}),"checkout"),Dl=n((t,e,r,o)=>({type:yi,payload:{product:t,order:e,quantity:r,offerId:o}}),"requestCreateOneTime"),ql=n(t=>({type:cr,payload:t}),"receiveCreateOneTime"),Ul=n((t,e)=>({type:bi,payload:{item:t,frequency:e}}),"requestConvertOneTimeToSubscription"),Ll=n((t,e)=>({type:lr,payload:{response:t,product:e}}),"receiveConvertOneTime"),Ur=n((t,e,r,o=!1,i=null)=>n(function(a,c){let l=c(),{auth:p,environment:{legoUrl:u},previewUpsellOffer:f,offerId:h,sessionId:w}=l;if(!p)return a(se("No auth set."));let{frequencies:P,frequenciesEveryPeriod:g}=Q(t.id)(l),O=Bi(i,P,g),E=Dl(t,e,r,h);return a(E),(f?Promise.resolve({legoUrl:u,product:t,order:e,quantity:r,offer:h}):Xe.createOneTime(u,p,t.id,e,r,h)).then(y=>(a(ql(y)),o?(a(Ul(y,O)),(f?Promise.resolve({item:y,frequency:O}):Xe.convertOneTimeToSubscription(u,p,y,O,h,w)).then(v=>a(Ll(v,t)),v=>a(kr(v)))):y),y=>a(kr(y))).finally(()=>a(Ut(E)))},"createIuThunk"),"createIu"),os=n(t=>({type:pr,payload:t}),"setLocale"),ns=n(t=>({type:We,payload:t}),"setConfig"),st=n(t=>({type:ur,payload:t}),"setBenefitMessages"),is=n((t,e,r)=>({type:dr,payload:{selector:t,markup:e,config:r}}),"addTemplate"),ss=n(t=>({type:fr,payload:t}),"setTemplates"),as=n((t,e)=>({type:hr,payload:{product:t,firstOrderPlaceDate:e}}),"setFirstOrderPlaceDate"),cs=n((t,e)=>({type:mr,payload:{product:t,productToSubscribe:e}}),"setProductToSubscribe"),ls=n(t=>({type:ue,payload:t}),"receiveMerchantSettings");var Lt="OG_STATE",ds=n(t=>{try{return t===null?void 0:JSON.parse(t)}catch{return}},"safeParseState"),zo=n(()=>window.og&&window.og.previewMode,"isPreviewMode"),fs=n(()=>zo()?{}:ds(localStorage.getItem(Lt)),"loadState"),Ml=n(t=>!t||!t.sessionId?!1:JSON.stringify({sessionId:t.sessionId,optedin:t.optedin,optedout:t.optedout,productOffer:t.productOffer,firstOrderPlaceDate:t.firstOrderPlaceDate,productToSubscribe:t.productToSubscribe}),"serializeState"),hs=n(t=>{if(zo())return;t&&t.sessionId&&(document.cookie="og_session_id="+encodeURIComponent(t.sessionId)+"; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Lax");let e=Ml(t);e&&localStorage.getItem(Lt)!==e&&localStorage.setItem(Lt,e)},"saveState"),ms=n(t=>(0,us.throttle)(500,e=>{if(zo())return;let{key:r,newValue:o}=e;r===Lt&&o===null?(t.dispatch({type:me}),setTimeout(()=>t.dispatch(es()),0)):r===Lt&&t.dispatch({type:we,newValue:ds(o)})}),"listenLocalStorageChanges");var ys=le(tr());var $l=n((t,e,r=document)=>r.dispatchEvent(new CustomEvent(t,{detail:e})),"dispatchEvent"),gs=n(t=>({payload:{product:{id:e,components:r}={}}={}}={})=>setTimeout(()=>$l("optin-changed",{productId:e,components:r,optedIn:t}),0),"dispatchOptinChangedEvent"),Vl=[{expressions:[({type:t}={})=>t===A,({type:t}={})=>t===q],fn:gs(!0)},{expressions:[({type:t}={})=>t===D],fn:gs(!1)}],bs=n(t=>e=>r=>{let o=t.getState();Vl.forEach(i=>{i.expressions.some(s=>s(r,o))&&i.fn(r)}),e(r)},"dispatchMiddleware"),Ss=n(t=>e=>r=>{var i;let o;switch(r.type){case T:case D:case A:case q:o=new CustomEvent(`og-${r.type.toLowerCase().replace(/_/g,"-")}`,{bubbles:!0,cancelable:!0,detail:r.payload}),(((i=r.payload)==null?void 0:i.offer)||document).dispatchEvent(o);break;default:}o!=null&&o.defaultPrevented||e(r)},"offerEvents"),_s=n(t=>e=>r=>{e(r);let o=(0,ys.throttle)(500,()=>{hs({...t.getState()})});r.type!==we&&o()},"localStorageMiddleware");var Mt=n(()=>{let t,e;return[new Promise((r,o)=>{t=r,e=o}),t,e]},"waitFor");function Es(t){let[e,r]=Mt(),[o,i]=Mt(),[s,a]=Mt();o.then(l=>{let{sessionId:p}=t.getState();!p||l&&!p.startsWith(l)?t.dispatch(jo(l)):a(p)});let c=Promise.all([o,e,s]);return c.then(()=>{var l;t.dispatch({type:ar,payload:{}}),window.addEventListener("storage",ms(t)),(l=t.getState().auth)!=null&&l.ts||t.dispatch(Zi())}),l=>async p=>{Ge===p.type||Be===p.type||He===p.type||ze===p.type?r(p.payload):Ve===p.type?i(p.payload):je===p.type?a(p.payload):await c,l(p)}}n(Es,"waitUntilOffersReady");function xs(t){return e=>r=>{if(r.type===L){let{merchantId:o,sessionId:i,environment:{apiUrl:s}}=t.getState(),a=S(r.payload.product);a&&ki.fetchOffer(s,o,i,a,r.payload.module||Ke,r.payload.searchParams).then(c=>t.dispatch(Se(c,r.payload.offer,a)),c=>t.dispatch(kr(c))).finally(()=>t.dispatch(Ut(r)))}return e(r)}}n(xs,"offerRequestMiddleware");var ws=le(Ts());function Bl(t,e){e.map(a=>a.weight).reduce((a,c)=>a+c,0)!==100&&console.error("OG: Sum of weights for variants must be 100. Defaulting to last variant.");let i=ws.default.murmur3(t,0)%100,s=0;for(let a=0;a<e.length;a++){let c=e[a],l=s+c.weight;if(c.weight>0&&i<l)return a;s=l}return e.length-1}n(Bl,"getVariantIx");function Mr(t={},e){var r;switch(e.type){case ue:return{...t,...e.payload.experiments};case Io:return{...t,currentVariant:e.payload.index,offerProfileId:(r=e.payload.parameters)==null?void 0:r.offer_profile_public_id};default:return t}}n(Mr,"experimentsReducer");function zl(t,e,r){if(!t||r.variants.length===0)return;let o=e.selling_plan_groups.filter(Or);if(o.length!==r.variants.length)return;let i=o.find(({app_id:s})=>s.endsWith(t.public_id));if(!!i)return{...e,selling_plan_groups:[i],variants:e.variants.map(({selling_plan_allocations:s,...a})=>({...a,selling_plan_allocations:s.filter(({selling_plan_group_id:c})=>c===i.id)}))}}n(zl,"resolveShopifySetupProductWhenExperiment");function Yl(t,e){let r=t==null?void 0:t.public_id;if(!r)return null;let o=t.variants,i=Bl(`${r}|${e}`,o);return{...o[i],index:i}}n(Yl,"getAssignedExperimentVariant");function Cs(t){let[e,r]=Mt(),o,i;return s=>async a=>{if(a.type===ar)r();else if(a.type===ue){await e,i=a.payload.experiments;let{sessionId:c}=t.getState();o=Yl(i,c),o&&t.dispatch({type:Io,payload:o})}else if(a.type===L)await e,o&&(a.payload.searchParams={...a.payload.searchParams,variant:o.public_id});else if(a.type===U){await e;let c=zl(o,a.payload.product,i);if(c)return s({type:U,payload:{...a.payload,experiments:!0,originalPayload:a.payload,product:c}})}return s(a)}}n(Cs,"experimentsMiddleware");function Rs(t,...e){if(window.og&&window.og.store)return window.og.store;let r=window.og&&window.og.previewMode,o=typeof window=="object"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name:"Ordergroove Offers"}):Ro,i=[Es,ci,Cs,xs,bs,Ss],s={};if(!r)try{s=fs(),i.push(_s)}catch{}let a=o(ii(...i,...e.filter(l=>l))),c=Co(t,s,a);return window.og=window.og||{},window.og.store=c,c}n(Rs,"makeStore");var Wl=Object.defineProperty,$r=n((t,e)=>Wl(t,"name",{value:e,configurable:!0}),"i"),Jl=$r(t=>e=>t.indexOf(e.origin)>=0,"createIsMessageAllowed"),Is=["https://rc3.ordergroove.com","https://rc3.stg.ordergroove.com","https://rc3-beta.stg.ordergroove.com","http://localhost:3000","http://localhost:3010","http://0.0.0.0:3010",window.location.origin],As=$r(t=>(e,r)=>{Is.forEach(o=>t.postMessage({ogType:e,...r},o))},"createBroadcastMessage");function Jo(t=window.opener,e=window.og){let r=$r(o=>{let i=Jl(Is),s=As(o.source),a=o.data.options||{};if(i(o)&&o.data.ogType==="READY"){let c="//static.ordergroove.com/@ordergroove/offers-live-editor/0.6.9/dist/";c.startsWith("//")&&(c=window.location.protocol+c),c.endsWith("/")||(c+="/"),import(`${c}client.js`).then(({initializeClient:l})=>{l({isMessageAllowed:i,broadcastMessage:s,options:a,og:e}),window.removeEventListener("message",r)})}},"handleReady");t&&t!==window&&(window.addEventListener("message",r),As(t)("READY"))}n(Jo,"h");$r(Jo,"offersLiveEditor");var Vr=null,Kl=n(t=>({dispatch:t}),"defaultMapDispatchToProps"),Ns=n(t=>{if(!Vr)throw new Error("Missing redux store.");return Vr},"resolveStore"),Ql=n((t,e)=>r=>{let{getState:o,dispatch:i}=Ns(r),s=t?t(o(),r):{},a=e(i,r);Object.assign(r,s,a)},"createRecalcProps"),m=n((t,e=Kl)=>r=>{let i=Ql(t,typeof e=="function"?e:s=>ni(e,s));return class extends r{get store(){return Vr}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._storeUnsubscribe=Ns(this).subscribe(()=>i(this)),i(this)}attributeChangedCallback(s,a,c){super.attributeChangedCallback&&super.attributeChangedCallback(s,a,c),this._storeUnsubscribe&&a!==c&&i(this)}disconnectedCallback(){this._storeUnsubscribe(),super.disconnectedCallback&&super.disconnectedCallback()}}},"connect"),ks=n(t=>{Vr=t},"setStore");var Ko=n((t={},e=[])=>(t.optedin||[]).map(r=>{let o={product:r.id,subscription_info:{components:r.components||[]},tracking_override:{offer:((t.productOffer||{})[r.id]||[])[0],...t.sessionId&&{session_id:t.sessionId},...Rt(r.frequency)}};return t.firstOrderPlaceDate&&t.firstOrderPlaceDate[r.id]&&(o.subscription_info.first_order_place_date=t.firstOrderPlaceDate[r.id]),t.productToSubscribe&&t.productToSubscribe[r.id]&&(o.tracking_override.product=t.productToSubscribe[r.id]),o}).filter(r=>r.tracking_override.offer).filter(r=>e.length?e.includes(r.product):r),"getProductsForPurchasePost"),jr=n((t={})=>{let e={};return Object.entries(t).forEach(([r,o])=>{Object.entries(o).forEach(([i,s])=>{let a={};s&&!Array.isArray(s)?a=s:a={frequency:i,prepaidShipments:null,regularPrice:s[0],subscriptionPrice:s[2],discountRate:s[1]},e[r]?e[r].push(a):e[r]=[a]})}),e},"getObjectStructuredProductPlans");var Qo=typeof window<"u"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0;var ke=n((t,e,r=null)=>{for(;e!==r;){let o=e.nextSibling;t.removeChild(e),e=o}},"removeNodes");var B=`{{lit-${String(Math.random()).slice(2)}}}`,Zo=`<!--${B}-->`,Fs=new RegExp(`${B}|${Zo}`),at="$lit$",_e=class{constructor(e,r){this.parts=[],this.element=r;let o=[],i=[],s=document.createTreeWalker(r.content,133,null,!1),a=0,c=-1,l=0,{strings:p,values:{length:u}}=e;for(;l<u;){let f=s.nextNode();if(f===null){s.currentNode=i.pop();continue}if(c++,f.nodeType===1){if(f.hasAttributes()){let h=f.attributes,{length:w}=h,P=0;for(let g=0;g<w;g++)Ds(h[g].name,at)&&P++;for(;P-- >0;){let g=p[l],O=Gr.exec(g)[2],E=O.toLowerCase()+at,y=f.getAttribute(E);f.removeAttribute(E);let v=y.split(Fs);this.parts.push({type:"attribute",index:c,name:O,strings:v}),l+=v.length-1}}f.tagName==="TEMPLATE"&&(i.push(f),s.currentNode=f.content)}else if(f.nodeType===3){let h=f.data;if(h.indexOf(B)>=0){let w=f.parentNode,P=h.split(Fs),g=P.length-1;for(let O=0;O<g;O++){let E,y=P[O];if(y==="")E=ae();else{let v=Gr.exec(y);v!==null&&Ds(v[2],at)&&(y=y.slice(0,v.index)+v[1]+v[2].slice(0,-at.length)+v[3]),E=document.createTextNode(y)}w.insertBefore(E,f),this.parts.push({type:"node",index:++c})}P[g]===""?(w.insertBefore(ae(),f),o.push(f)):f.data=P[g],l+=g}}else if(f.nodeType===8)if(f.data===B){let h=f.parentNode;(f.previousSibling===null||c===a)&&(c++,h.insertBefore(ae(),f)),a=c,this.parts.push({type:"node",index:c}),f.nextSibling===null?f.data="":(o.push(f),c--),l++}else{let h=-1;for(;(h=f.data.indexOf(B,h+1))!==-1;)this.parts.push({type:"node",index:-1}),l++}}for(let f of o)f.parentNode.removeChild(f)}};n(_e,"Template");var Ds=n((t,e)=>{let r=t.length-e.length;return r>=0&&t.slice(r)===e},"endsWith"),$t=n(t=>t.index!==-1,"isTemplatePartActive"),ae=n(()=>document.createComment(""),"createMarker"),Gr=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;var Xo=133;function en(t,e){let{element:{content:r},parts:o}=t,i=document.createTreeWalker(r,Xo,null,!1),s=Vt(o),a=o[s],c=-1,l=0,p=[],u=null;for(;i.nextNode();){c++;let f=i.currentNode;for(f.previousSibling===u&&(u=null),e.has(f)&&(p.push(f),u===null&&(u=f)),u!==null&&l++;a!==void 0&&a.index===c;)a.index=u!==null?-1:a.index-l,s=Vt(o,s),a=o[s]}p.forEach(f=>f.parentNode.removeChild(f))}n(en,"removeNodesFromTemplate");var Xl=n(t=>{let e=t.nodeType===11?0:1,r=document.createTreeWalker(t,Xo,null,!1);for(;r.nextNode();)e++;return e},"countNodes"),Vt=n((t,e=-1)=>{for(let r=e+1;r<t.length;r++){let o=t[r];if($t(o))return r}return-1},"nextActiveIndexInTemplateParts");function qs(t,e,r=null){let{element:{content:o},parts:i}=t;if(r==null){o.appendChild(e);return}let s=document.createTreeWalker(o,Xo,null,!1),a=Vt(i),c=0,l=-1;for(;s.nextNode();)for(l++,s.currentNode===r&&(c=Xl(e),r.parentNode.insertBefore(e,r));a!==-1&&i[a].index===l;){if(c>0){for(;a!==-1;)i[a].index+=c,a=Vt(i,a);return}a=Vt(i,a)}}n(qs,"insertNodeIntoTemplate");var Us=new WeakMap,jt=n(t=>(...e)=>{let r=t(...e);return Us.set(r,!0),r},"directive"),Fe=n(t=>typeof t=="function"&&Us.has(t),"isDirective");var $={},Hr={};var fe=class{constructor(e,r,o){this.__parts=[],this.template=e,this.processor=r,this.options=o}update(e){let r=0;for(let o of this.__parts)o!==void 0&&o.setValue(e[r]),r++;for(let o of this.__parts)o!==void 0&&o.commit()}_clone(){let e=Qo?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),r=[],o=this.template.parts,i=document.createTreeWalker(e,133,null,!1),s=0,a=0,c,l=i.nextNode();for(;s<o.length;){if(c=o[s],!$t(c)){this.__parts.push(void 0),s++;continue}for(;a<c.index;)a++,l.nodeName==="TEMPLATE"&&(r.push(l),i.currentNode=l.content),(l=i.nextNode())===null&&(i.currentNode=r.pop(),l=i.nextNode());if(c.type==="node"){let p=this.processor.handleTextExpression(this.options);p.insertAfterNode(l.previousSibling),this.__parts.push(p)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,c.name,c.strings,this.options));s++}return Qo&&(document.adoptNode(e),customElements.upgrade(e)),e}};n(fe,"TemplateInstance");var Ls=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),tp=` ${B} `,ce=class{constructor(e,r,o,i){this.strings=e,this.values=r,this.type=o,this.processor=i}getHTML(){let e=this.strings.length-1,r="",o=!1;for(let i=0;i<e;i++){let s=this.strings[i],a=s.lastIndexOf("<!--");o=(a>-1||o)&&s.indexOf("-->",a+1)===-1;let c=Gr.exec(s);c===null?r+=s+(o?tp:Zo):r+=s.substr(0,c.index)+c[1]+c[2]+at+c[3]+B}return r+=this.strings[e],r}getTemplateElement(){let e=document.createElement("template"),r=this.getHTML();return Ls!==void 0&&(r=Ls.createHTML(r)),e.innerHTML=r,e}};n(ce,"TemplateResult");var ut=n(t=>t===null||!(typeof t=="object"||typeof t=="function"),"isPrimitive"),Br=n(t=>Array.isArray(t)||!!(t&&t[Symbol.iterator]),"isIterable"),De=class{constructor(e,r,o){this.dirty=!0,this.element=e,this.name=r,this.strings=o,this.parts=[];for(let i=0;i<o.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new Ee(this)}_getValue(){let e=this.strings,r=e.length-1,o=this.parts;if(r===1&&e[0]===""&&e[1]===""){let s=o[0].value;if(typeof s=="symbol")return String(s);if(typeof s=="string"||!Br(s))return s}let i="";for(let s=0;s<r;s++){i+=e[s];let a=o[s];if(a!==void 0){let c=a.value;if(ut(c)||!Br(c))i+=typeof c=="string"?c:String(c);else for(let l of c)i+=typeof l=="string"?l:String(l)}}return i+=e[r],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}};n(De,"AttributeCommitter");var Ee=class{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==$&&(!ut(e)||e!==this.value)&&(this.value=e,Fe(e)||(this.committer.dirty=!0))}commit(){for(;Fe(this.value);){let e=this.value;this.value=$,e(this)}this.value!==$&&this.committer.commit()}};n(Ee,"AttributePart");var z=class{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(ae()),this.endNode=e.appendChild(ae())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=ae()),e.__insert(this.endNode=ae())}insertAfterPart(e){e.__insert(this.startNode=ae()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;Fe(this.__pendingValue);){let r=this.__pendingValue;this.__pendingValue=$,r(this)}let e=this.__pendingValue;e!==$&&(ut(e)?e!==this.value&&this.__commitText(e):e instanceof ce?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):Br(e)?this.__commitIterable(e):e===Hr?(this.value=Hr,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){let r=this.startNode.nextSibling;e=e??"";let o=typeof e=="string"?e:String(e);r===this.endNode.previousSibling&&r.nodeType===3?r.data=o:this.__commitNode(document.createTextNode(o)),this.value=e}__commitTemplateResult(e){let r=this.options.templateFactory(e);if(this.value instanceof fe&&this.value.template===r)this.value.update(e.values);else{let o=new fe(r,e.processor,this.options),i=o._clone();o.update(e.values),this.__commitNode(i),this.value=o}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());let r=this.value,o=0,i;for(let s of e)i=r[o],i===void 0&&(i=new z(this.options),r.push(i),o===0?i.appendIntoPart(this):i.insertAfterPart(r[o-1])),i.setValue(s),i.commit(),o++;o<r.length&&(r.length=o,this.clear(i&&i.endNode))}clear(e=this.startNode){ke(this.startNode.parentNode,e.nextSibling,this.endNode)}};n(z,"NodePart");var ct=class{constructor(e,r,o){if(this.value=void 0,this.__pendingValue=void 0,o.length!==2||o[0]!==""||o[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=r,this.strings=o}setValue(e){this.__pendingValue=e}commit(){for(;Fe(this.__pendingValue);){let r=this.__pendingValue;this.__pendingValue=$,r(this)}if(this.__pendingValue===$)return;let e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=$}};n(ct,"BooleanAttributePart");var lt=class extends De{constructor(e,r,o){super(e,r,o),this.single=o.length===2&&o[0]===""&&o[1]===""}_createPart(){return new Gt(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}};n(lt,"PropertyCommitter");var Gt=class extends Ee{};n(Gt,"PropertyPart");var Ms=!1;(()=>{try{let t={get capture(){return Ms=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{}})();var pt=class{constructor(e,r,o){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=r,this.eventContext=o,this.__boundHandleEvent=i=>this.handleEvent(i)}setValue(e){this.__pendingValue=e}commit(){for(;Fe(this.__pendingValue);){let s=this.__pendingValue;this.__pendingValue=$,s(this)}if(this.__pendingValue===$)return;let e=this.__pendingValue,r=this.value,o=e==null||r!=null&&(e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive),i=e!=null&&(r==null||o);o&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=rp(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=$}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}};n(pt,"EventPart");var rp=n(t=>t&&(Ms?{capture:t.capture,passive:t.passive,once:t.once}:t.capture),"getOptions");function tn(t){let e=qe.get(t.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},qe.set(t.type,e));let r=e.stringsArray.get(t.strings);if(r!==void 0)return r;let o=t.strings.join(B);return r=e.keyString.get(o),r===void 0&&(r=new _e(t,t.getTemplateElement()),e.keyString.set(o,r)),e.stringsArray.set(t.strings,r),r}n(tn,"templateFactory");var qe=new Map;var xe=new WeakMap,rn=n((t,e,r)=>{let o=xe.get(e);o===void 0&&(ke(e,e.firstChild),xe.set(e,o=new z(Object.assign({templateFactory:tn},r))),o.appendInto(e)),o.setValue(t),o.commit()},"render");var Ht=class{handleAttributeExpressions(e,r,o,i){let s=r[0];return s==="."?new lt(e,r.slice(1),o).parts:s==="@"?[new pt(e,r.slice(1),i.eventContext)]:s==="?"?[new ct(e,r.slice(1),o)]:new De(e,r,o).parts}handleTextExpression(e){return new z(e)}};n(Ht,"DefaultTemplateProcessor");var on=new Ht;typeof window<"u"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");var d=n((t,...e)=>new ce(t,e,"html",on),"html");var Vs=n((t,e)=>`${t}--${e}`,"getTemplateCacheKey"),zr=!0;typeof window.ShadyCSS>"u"?zr=!1:typeof window.ShadyCSS.prepareTemplateDom>"u"&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),zr=!1);var np=n(t=>e=>{let r=Vs(e.type,t),o=qe.get(r);o===void 0&&(o={stringsArray:new WeakMap,keyString:new Map},qe.set(r,o));let i=o.stringsArray.get(e.strings);if(i!==void 0)return i;let s=e.strings.join(B);if(i=o.keyString.get(s),i===void 0){let a=e.getTemplateElement();zr&&window.ShadyCSS.prepareTemplateDom(a,t),i=new _e(e,a),o.keyString.set(s,i)}return o.stringsArray.set(e.strings,i),i},"shadyTemplateFactory"),ip=["html","svg"],sp=n(t=>{ip.forEach(e=>{let r=qe.get(Vs(e,t));r!==void 0&&r.keyString.forEach(o=>{let{element:{content:i}}=o,s=new Set;Array.from(i.querySelectorAll("style")).forEach(a=>{s.add(a)}),en(o,s)})})},"removeStylesFromLitTemplates"),js=new Set,ap=n((t,e,r)=>{js.add(t);let o=r?r.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:s}=i;if(s===0){window.ShadyCSS.prepareTemplateStyles(o,t);return}let a=document.createElement("style");for(let p=0;p<s;p++){let u=i[p];u.parentNode.removeChild(u),a.textContent+=u.textContent}sp(t);let c=o.content;r?qs(r,a,c.firstChild):c.insertBefore(a,c.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);let l=c.querySelector("style");if(window.ShadyCSS.nativeShadow&&l!==null)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(r){c.insertBefore(a,c.firstChild);let p=new Set;p.add(a),en(r,p)}},"prepareTemplateStyles"),Gs=n((t,e,r)=>{if(!r||typeof r!="object"||!r.scopeName)throw new Error("The `scopeName` option is required.");let o=r.scopeName,i=xe.has(e),s=zr&&e.nodeType===11&&!!e.host,a=s&&!js.has(o),c=a?document.createDocumentFragment():e;if(rn(t,c,Object.assign({templateFactory:np(o)},r)),a){let l=xe.get(c);xe.delete(c);let p=l.value instanceof fe?l.value.template:void 0;ap(o,c,p),ke(e,e.firstChild),e.appendChild(c),xe.set(e,l)}!i&&s&&window.ShadyCSS.styleElement(e.host)},"render");var Hs;window.JSCompiler_renameProperty=(t,e)=>t;var pn={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return t!==null;case Number:return t===null?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Bs=n((t,e)=>e!==t&&(e===e||t===t),"notEqual"),nn={attribute:!0,type:String,converter:pn,reflect:!1,hasChanged:Bs},sn=1,an=1<<2,cn=1<<3,ln=1<<4,un="finalized",dt=class extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();let e=[];return this._classProperties.forEach((r,o)=>{let i=this._attributeNameForProperty(o,r);i!==void 0&&(this._attributeToPropertyMap.set(i,o),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;let e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((r,o)=>this._classProperties.set(o,r))}}static createProperty(e,r=nn){if(this._ensureClassProperties(),this._classProperties.set(e,r),r.noAccessor||this.prototype.hasOwnProperty(e))return;let o=typeof e=="symbol"?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,o,r);i!==void 0&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,r,o){return{get(){return this[r]},set(i){let s=this[e];this[r]=i,this.requestUpdateInternal(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||nn}static finalize(){let e=Object.getPrototypeOf(this);if(e.hasOwnProperty(un)||e.finalize(),this[un]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){let r=this.properties,o=[...Object.getOwnPropertyNames(r),...typeof Object.getOwnPropertySymbols=="function"?Object.getOwnPropertySymbols(r):[]];for(let i of o)this.createProperty(i,r[i])}}static _attributeNameForProperty(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}static _valueHasChanged(e,r,o=Bs){return o(e,r)}static _propertyValueFromAttribute(e,r){let o=r.type,i=r.converter||pn,s=typeof i=="function"?i:i.fromAttribute;return s?s(e,o):e}static _propertyValueToAttribute(e,r){if(r.reflect===void 0)return;let o=r.type,i=r.converter;return(i&&i.toAttribute||pn.toAttribute)(e,o)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,r)=>{if(this.hasOwnProperty(r)){let o=this[r];delete this[r],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(r,o)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,r)=>this[r]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,r,o){r!==o&&this._attributeToProperty(e,o)}_propertyToAttribute(e,r,o=nn){let i=this.constructor,s=i._attributeNameForProperty(e,o);if(s!==void 0){let a=i._propertyValueToAttribute(r,o);if(a===void 0)return;this._updateState=this._updateState|cn,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._updateState=this._updateState&~cn}}_attributeToProperty(e,r){if(this._updateState&cn)return;let o=this.constructor,i=o._attributeToPropertyMap.get(e);if(i!==void 0){let s=o.getPropertyOptions(i);this._updateState=this._updateState|ln,this[i]=o._propertyValueFromAttribute(r,s),this._updateState=this._updateState&~ln}}requestUpdateInternal(e,r,o){let i=!0;if(e!==void 0){let s=this.constructor;o=o||s.getPropertyOptions(e),s._valueHasChanged(this[e],r,o.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,r),o.reflect===!0&&!(this._updateState&ln)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,o))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,r){return this.requestUpdateInternal(e,r),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|an;try{await this._updatePromise}catch{}let e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&an}get hasUpdated(){return this._updateState&sn}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1,r=this._changedProperties;try{e=this.shouldUpdate(r),e?this.update(r):this._markUpdated()}catch(o){throw e=!1,this._markUpdated(),o}e&&(this._updateState&sn||(this._updateState=this._updateState|sn,this.firstUpdated(r)),this.updated(r))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~an}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((r,o)=>this._propertyToAttribute(o,this[o],r)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}};n(dt,"UpdatingElement");Hs=un;dt[Hs]=!0;var zs=Element.prototype,vh=zs.msMatchesSelector||zs.webkitMatchesSelector;var Yr=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,dn=Symbol(),ft=class{constructor(e,r){if(r!==dn)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(Yr?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}};n(ft,"CSSResult");var Ys=n(t=>new ft(String(t),dn),"unsafeCSS"),cp=n(t=>{if(t instanceof ft)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},"textFromCSSResult"),b=n((t,...e)=>{let r=e.reduce((o,i,s)=>o+cp(i)+t[s+1],t[0]);return new ft(r,dn)},"css");(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");var Ws={},_=class extends dt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;let e=this.getStyles();if(Array.isArray(e)){let r=n((s,a)=>s.reduceRight((c,l)=>Array.isArray(l)?r(l,c):(c.add(l),c),a),"addStyles"),o=r(e,new Set),i=[];o.forEach(s=>i.unshift(s)),this._styles=i}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(r=>{if(r instanceof CSSStyleSheet&&!Yr){let o=Array.prototype.slice.call(r.cssRules).reduce((i,s)=>i+s.cssText,"");return Ys(o)}return r})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){let e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(r=>r.cssText),this.localName):Yr?this.renderRoot.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){let r=this.render();super.update(e),r!==Ws&&this.constructor.render(r,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(o=>{let i=document.createElement("style");i.textContent=o.cssText,this.renderRoot.appendChild(i)}))}render(){return Ws}};n(_,"LitElement");_.finalized=!0;_.render=Gs;var da=le(ia());var mp=n(t=>{let e=String(t||"").trim().match(/(\d+)\s*([dwm])/);return e?`${e[1]}_${{d:1,w:2,m:3}[e[2]]}`:t},"sanitizeFrequencyString"),sa=n(t=>t.hasAttribute("product")&&{id:t.getAttribute("product"),...t.hasAttribute("product-components")&&{components:JSON.parse(t.getAttribute("product-components"))}},"buildProduct");var Bt=n(t=>{let e=sa(t);if(!e){let r=t.offer;r&&(e=sa(r))}return e},"resolveProduct"),gp=n(t=>{let e=t;for(;e;){if(e.tagName==="OG-OFFER")return e;e=e.nodeType===11?e.host:e.parentNode}},"resolveOffer"),fn=n(t=>class extends t{get offer(){return gp(this)}connectedCallback(){super.connectedCallback(),this.offersChangeTemplate=this.offersChangeTemplate.bind(this),this.offer&&this.offer.addEventListener("template-changed",this.offersChangeTemplate)}disconnectedCallback(){super.disconnectedCallback(),this.offer&&this.offer.removeEventListener("template-changed",this.offersChangeTemplate)}offersChangeTemplate(){this._enqueueUpdate()}},"withOfferTemplate"),C=n(t=>class extends fn(t){get product(){return Bt(this)}},"withProduct"),Jr=n(t=>class extends t{get childOptions(){let e=[],r=null;return this.querySelectorAll("option").forEach(o=>{let i=mp(o.value),s=o.innerText.trim();e.push({value:i,text:s}),!r&&o.selected&&(r=i)}),{options:e,isSelected:r}}},"withChildOptions");var Kr={};ei(Kr,{autoshipByDefault:()=>yp,eligibilityGroups:()=>mn,eligible:()=>aa,hasPrepaidOptions:()=>xp,hasUpcomingOrder:()=>pa,hasUpsellGroup:()=>la,inStock:()=>hn,optedout:()=>_p,prepaidEligible:()=>bp,prepaidSubscribed:()=>Ep,regularEligible:()=>Op,subscribed:()=>Sp,subscriptionEligible:()=>ca,upcomingOrderContainsProduct:()=>Pp,upsellEligible:()=>ua});var hn=n((t,e)=>(t.inStock||{})[(e.product||{}).id],"inStock"),aa=n((t,e)=>(t.autoshipEligible||{})[(e.product||{}).id]||!1,"eligible"),yp=n((t,e)=>(t.autoshipByDefault||{})[(e.product||{}).id]||!1,"autoshipByDefault"),ca=n((t,e)=>(t.offerId&&t.offerId!=="0"||!1)&&aa(t,e)&&hn(t,e),"subscriptionEligible"),mn=n((t,e)=>{let r=S((e.product||{}).id);return(t.eligibilityGroups||{})[r]||null},"eligibilityGroups"),la=n((t,e)=>{let r=mn(t,e);return r===null||!!r.find(o=>o==="upsell"||o==="impulse_upsell")},"hasUpsellGroup"),bp=n((t,e)=>{let r=mn(t,e);return(r==null?void 0:r.some(o=>o===Sr.PREPAID))||!1},"prepaidEligible"),Sp=n((t,e)=>Cr(e.product)(t),"subscribed"),_p=n((t,e)=>Rr(e.product)(t),"optedout"),Ep=n((t,e)=>Mi(e.product)(t),"prepaidSubscribed"),xp=n((t,e)=>G(e.product.id)(t).length>0,"hasPrepaidOptions"),pa=n(t=>!!(t.nextUpcomingOrder&&t.nextUpcomingOrder.public_id),"hasUpcomingOrder"),Pp=n((t,e)=>(t.nextUpcomingOrder&&t.nextUpcomingOrder.products||[]).includes((e.product||{}).id),"upcomingOrderContainsProduct"),ua=n((t,e)=>{var r;return!((r=e.offer)!=null&&r.isCart)&&t.offerId&&t.offerId!=="0"&&t.auth&&hn(t,e)&&pa(t)&&la(t,e)},"upsellEligible"),Op=n((t,e)=>ca(t,e)&&!ua(t,e),"regularEligible");var vp=n(t=>t.replace(/(\r\n|\n|\r|\s)+/gm,""),"removeWhitespace"),Qr=class extends C(_){static get properties(){return{...super.properties,state:{type:Object,attribute:!1},test:{type:String}}}render(){if(!this.test)return d``;let e=vp(this.test);return e=e.replace(/(![a-zA-Z]+)/g,"($1)"),da.default.parse(e,o=>Kr[o]&&Kr[o](this.state,this))?d`
        <slot></slot>
      `:d``}shouldUpdate(e){return e.size&&(this.product&&this.product.id in this.state.autoshipEligible&&this.product.id in this.state.inStock||!this.product.id)}};n(Qr,"When");var Tp=n(t=>({state:t}),"mapStateToProps"),fa=m(Tp)(Qr);var ha={type:Object,converter:{toAttribute(t){return t==null?t:JSON.stringify(t)},fromAttribute(t){return t&&t.match(/[{[]/)?JSON.parse(t):{id:t}}}},Oe={type:String,attribute:"default-frequency",converter:{fromAttribute(t){return t&&qo(t)?t:null}}},Zr={type:Boolean,attribute:!0,reflect:!0},gt={type:Object,attribute:!1};var wp=n(t=>class extends t{applyTemplate(e){this.template=e;let r=typeof e.markup=="undefined"?this.constructor.initialTemplate:e.markup;r&&this._templateMarkup!==r&&(this._templateMarkup=r,this.innerHTML=r)}refreshTemplate(){if(this._templates&&this._templates.length){let e=this._templates.find(({selector:r})=>{try{return this.matches(r)}catch{return!1}});this.applyTemplate(e||{})}}set templates(e){this._templates=e,this.refreshTemplate()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.constructor.initialTemplate&&!this.innerHTML.trim()&&(this.innerHTML=this.constructor.initialTemplate)}},"withTemplate"),W=wp(_);var J=class extends C(W){static get properties(){return{subscribed:Zr,frequencyMatch:{type:Boolean,reflect:!0,attribute:"frequency-match"},productDefaultFrequency:{type:String},defaultFrequency:{type:String},frequencies:{type:Array}}}static get styles(){return b`
      :host {
        cursor: default;
        display: inline-block;
      }

      :host[hidden] {
        display: none;
      }

      .btn {
        position: relative;
        width: var(--og-radio-width, 1.4em);
        height: var(--og-radio-height, 1.4em);
        margin: var(--og-radio-margin, 0);
        padding: 0;
        border: 1px solid var(--og-primary-color, var(--og-border-color, black));
        background: #fff;
        border-radius: 100%;
        vertical-align: middle;
        color: var(--og-primary-color, var(--og-btn-color, black));
      }

      .radio {
        text-indent: -9999px;
        flex-shrink: 0;
      }

      .checkbox {
        border-radius: 3px;
      }

      .radio,
      .checkbox {
        border-color: var(--og-checkbox-border-color, black);
      }

      .checkbox.active::after,
      .radio.active::after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: var(--og-checkbox-border-color, black);
      }

      .radio.active::after {
        content: ' ';
        border-radius: 100%;
        border: 2px solid #fff;
      }

      .checkbox.active::after {
        border: none;
        border-radius: 0;
        background: #fff;
        content: '\\2714';
        line-height: 1;
        text-align: center;
        overflow: visible;
      }
    `}constructor(){super(),this.addEventListener("click",this.handleClick.bind(this))}updated(e){e.has("subscribed")&&(this.frequencyMatch=this.frequency===this.defaultFrequency)}handleClick(){}render(){return this.subscribed&&!this.defaultFrequency?d`
        <slot name="subscribed"></slot>
        <slot name="frequency-mismatch"></slot>
      `:this.subscribed&&this.defaultFrequency===this.frequency?d`
        <slot name="subscribed"></slot>
        <slot name="frequency-match"></slot>
      `:this.subscribed&&this.defaultFrequency!==this.frequency?d`
        <slot name="subscribed"></slot>
        <slot name="frequency-mismatch"></slot>
      `:d`
      <slot name="not-subscribed"></slot>
    `}};n(J,"OptinStatus");var ee=n((t,e={})=>{var r,o;return{subscribed:re(e.product)(t),frequency:ne(e.product)(t),productDefaultFrequency:tt((e.product||{}).id)(t),prepaidShipmentsOptedIn:j(e.product)(t),defaultFrequency:ie((r=e.product)==null?void 0:r.id)(t)||H(e,"defaultFrequency"),frequencies:rt((o=e.product)==null?void 0:o.id)(t)||H(e,"frequencies"),...ot(t,e),productFrequencies:Q(e.product)(t)}},"mapStateToProps"),ma=m(ee)(J);var yt=class extends J{static get properties(){return{...super.properties,frequency:{type:String,reflect:!0},defaultFrequency:Oe,optinButtonLabel:{type:String}}}updated(e){if(e.has("subscribed")||e.has("frequencies")){if(I.shopify_selling_plans&&this.store){let r=this.getAttribute("default-frequency");r=Dt(r,this.productFrequencies),this.sellingPlanFreq=r}this.frequencyMatch=this.frequency===this.optinFrequency}}get optinFrequency(){let e;return this.sellingPlanFreq?e=this.sellingPlanFreq:this.hasAttribute("default-frequency")?e=this.getAttribute("default-frequency"):e=this.offer?this.offer.defaultFrequency:this.defaultFrequency,I.shopify_selling_plans&&this.store&&(e=Dt(e,this.productFrequencies)),e}handleClick(e){this.optinProduct(Bt(this),this.optinFrequency,this.offer),e.preventDefault()}render(){return d`
      <slot name="default">
        <button
          aria-labelledby="ogOfferOptInLabel"
          role="radio"
          aria-checked="${!!this.subscribed}"
          class="btn radio ${this.subscribed?"active":""}"
        ></button>
        <label id="ogOfferOptInLabel">
          <slot>
            <slot name="label"><og-text key="offerOptInLabel"></og-text></slot>
          </slot>
        </label>
      </slot>
    `}};n(yt,"OptinButton");var ga=m(ee,{optinProduct:X})(yt);var Xr=class extends J{static get properties(){return{...super.properties,label:{type:String}}}handleClick(e){this.optoutProduct(this.product,this.offer),e.preventDefault()}render(){return d`
      <slot name="default">
        <button
          aria-labelledby="ogOfferOptOutLabel"
          role="radio"
          aria-checked="${!this.subscribed}"
          class="btn radio ${this.subscribed?"":"active"}"
        ></button>
        <label id="ogOfferOptOutLabel">
          <slot>
            <og-text key="offerOptOutLabel"></og-text>
          </slot>
        </label>
      </slot>
    `}};n(Xr,"OptoutButton");var ya=m(ee,{optoutProduct:it})(Xr);var Le=n((t,e)=>{let{every:r,every_period:o}=Rt(t);return r&&o?d`
        ${r}
        <og-text key="frequencyPeriods" variant="${o}" pluralize="${r}"></og-text>
        ${e&&e===t?d`
              <og-text key="defaultFrequencyCopy"></og-text>
            `:""}
      `:t},"frequencyText"),bt=class extends C(W){static get properties(){return{...super.properties,disabled:{type:Boolean},subscribed:Zr,frequency:{type:String},defaultFrequency:Oe,productDefaultFrequency:{type:String},config:{type:Object},frequencies:{converter:{fromAttribute:Ni}}}}static get styles(){return b`
      :host[hidden] {
        display: none;
      }
      :host {
        display: inline-block;
      }
    `}constructor(){super(),this.frequencies=[]}render(){let e=this.frequency||this.defaultFrequency;return d`
      <span>
        ${this.subscribed&&d`
            <slot name="subscribed">${Le(e)}</slot>
          `||""}
        ${!this.subscribed&&d`
            <slot name="not-subscribed"></slot>
          `||""}
        ${this.subscribed&&this.defaultFrequency&&this.defaultFrequency!==this.frequency&&d`
            <slot name="frequency-mismatch"></slot>
          `||""}
      </span>
    `}};n(bt,"FrequencyStatus");var zt=n((t,e)=>{var r,o;return{subscribed:re(e.product)(t),frequency:ne(e.product)(t),productDefaultFrequency:tt((e.product||{}).id)(t),frequencies:rt((r=e.product)==null?void 0:r.id)(t)||H(e,"frequencies"),defaultFrequency:ie((o=e.product)==null?void 0:o.id)(t)||H(e,"defaultFrequency"),...ot(t,e),productFrequencies:Q(e.product)(t)}},"mapStateToProps"),ba=m(zt)(bt);var eo=class extends Jr(J){static get properties(){return{...super.properties,frequencies:{type:Array,attribute:!1},frequency:{type:String},defaultFrequency:Oe,selectLabel:{type:String,attribute:"select-label"}}}static get styles(){return b`
      :host {
        display: inline-block;
        cursor: pointer;
        background-color: var(--og-select-bg-color, #fff);
        border: var(--og-select-border, 1px solid #aaa);
        border-radius: var(--og-select-border-radius, 0.5em);
        border-width: var(--og-select-border-width, 1px);
        box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
      }
    `}get currentFrequency(){return this.subscribed?this.frequency||this.productDefaultFrequency||this.defaultFrequency:"optedOut"}onOptinChange(e){e==="optedOut"?this.optoutProduct(this.product,this.offer):this.productChangeFrequency(this.product,e,this.offer)}render(){var o;let{options:e}=this.childOptions,r;if((o=this.frequencies)!=null&&o.length){let{frequenciesText:i}=this.productFrequencies;r=[e.find(s=>s.value==="optedOut"),...this.frequencies.map((s,a)=>({value:s,text:i&&a in i?i[a]:Le(s,this.defaultFrequency)}))]}else r=e;return d`
      <og-select
        .options="${r}"
        .selected="${this.currentFrequency}"
        .onChange="${({target:{value:i}})=>this.onOptinChange(i)}"
        .ariaLabel="${this.selectLabel}"
      ></og-select>
    `}};n(eo,"OptinSelect");var Sa=m((t,e)=>{var r;return{...ee(t,e),...zt(t,e),frequencies:rt((r=e.product)==null?void 0:r.id)(t)||H(e,"frequencies")}},{productChangeFrequency:Fr,optoutProduct:it})(eo);var to=class extends C(W){static get styles(){return b`
      :host[hidden] {
        display: none;
      }
      :host {
        display: inline-block;
      }
    `}static get properties(){return{...super.properties,upcomingOrderDate:{type:String,attribute:!1},auth:gt,isPreview:{type:Boolean,attribute:!1},target:{type:String},skipModal:{type:Boolean,attribute:"skip-modal"}}}constructor(){super(),this.fetchOrders=()=>0,this.createIu=()=>0,this.concludeUpsell=()=>0,this.addEventListener("click",this.handleClick.bind(this))}updated(e){e.has("auth")&&this.auth&&!this.upcomingOrderDate&&!this.isPreview&&this.fetchOrders()}handleClick(){let e;if(this.skipModal)this.createIu(this.product,this.nextUpcomingOrder.public_id,1,!1,null),this.concludeUpsell(this.product);else if(!this.target&&this.offer)e=this.offer.querySelector("og-upsell-modal"),e||(e=this.offer.shadowRoot.querySelector("og-upsell-modal"));else if(this.target)e=document.querySelector(this.target);else throw Error("You must specify a target attribute or place this element as child of og-offer");e&&e.setAttribute("show",!0)}render(){return d`
      <slot>
        <og-next-upcoming-order></og-next-upcoming-order>
      </slot>
    `}};n(to,"UpsellButton");var Cp=n(t=>({isPreview:t.previewUpsellOffer,nextUpcomingOrder:t.previewUpsellOffer?{public_id:"preview-order-id"}:t.nextUpcomingOrder}),"mapStateToProps"),_a=m(Cp,{fetchOrders:qr,createIu:Ur,concludeUpsell:Dr})(to);var ro=class extends C(W){static get properties(){return{...super.properties,defaultFrequency:Oe,auth:gt,subscribed:{type:Boolean,attribute:!1},frequency:{type:String,attribute:!1},nextUpcomingOrder:{type:Object,attribute:!1},show:{type:Boolean,attribute:"show"},offerId:{type:String}}}constructor(){super(),this.createIu=()=>0,this.concludeUpsell=()=>0}render(){return d`
      <og-modal ?show=${this.show} @close=${()=>this.close()} @confirm=${()=>this.confirm()}>
        <div slot="content">
          <slot>
            <slot name="content">
              <og-text key="upsellModalContent"></og-text>
            </slot>
            <slot name="offer">
              <br />

              <og-optout-button>
                <slot name="opt-out-label">
                  <og-text key="upsellModalOptOutLabel" slot="label"></og-text>
                </slot>
              </og-optout-button>
              <br />
              <og-optin-button default-frequency=${this.defaultFrequency}>
                <slot name="opt-in-label">
                  <og-text key="upsellModalOptInLabel" slot="label"></og-text>
                </slot>
              </og-optin-button>
              <br />
              <slot name="every-label">
                <og-text key="offerEveryLabel"></og-text>
              </slot>
              <og-select-frequency default-frequency=${this.defaultFrequency}></og-select-frequency>
            </slot>
          </slot>
        </div>
        <span slot="confirm">
          <slot name="confirm"><og-text key="upsellModalConfirmLabel"></og-text></slot>
        </span>
        <span slot="cancel">
          <slot name="cancel">
            <og-text key="upsellModalCancelLabel"></og-text>
          </slot>
        </span>
      </og-modal>
    `}set defaultFrequency(e){this._defaultFrequency=e}get defaultFrequency(){let e=this.querySelector("og-select-frequency");return e?e.defaultFrequency:this._defaultFrequency}confirm(){this.createIu(this.product,this.nextUpcomingOrder.public_id,1,this.subscribed,this.frequency||this.defaultFrequency),this.close()}close(){this.concludeUpsell(),this.removeAttribute("show")}};n(ro,"UpsellModal");var Rp=n((t,e)=>{var r;return{auth:t.auth,offerId:t.offerId,subscribed:re(e.product)(t),frequency:ne(e.product)(t),defaultFrequency:ie((r=e.product)==null?void 0:r.id)(t)||H(e,"defaultFrequency"),nextUpcomingOrder:t.previewUpsellOffer?{public_id:"preview-order-id"}:t.nextUpcomingOrder,isPreview:t.previewUpsellOffer}},"mapStateToProps"),Ea=m(Rp,{concludeUpsell:Dr,createIu:Ur})(ro);var oo=class extends J{static get properties(){return{...super.properties,frequency:{type:String}}}static get styles(){return b`
      :host {
        cursor: default;
        display: inline-block;
      }

      .btn {
        position: relative;
        width: var(--og-radio-width, 1.4em);
        height: var(--og-radio-height, 1.4em);
        margin: var(--og-radio-margin, 0);
        padding: 0;
        border: 1px solid var(--og-checkbox-border-color, black);
        background: #fff;
        vertical-align: middle;
        color: var(--og-primary-color, black);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
      }

      .btn.active {
        background: var(--og-checkbox-border-color, black);
      }

      .btn.active:after {
        content: '✓';
        color: #fff;
        transform: scale(1.6);
        margin-left: 2px;
      }
    `}handleClick(e){this.subscribed?this.optoutProduct(this.product,this.offer):this.optinProduct(this.product,this.frequency||this.productDefaultFrequency||this.defaultFrequency,this.offer),e.preventDefault()}render(){return d`
      <slot name="default">
        <button id="action-trigger" class="btn checkbox ${this.subscribed?"active":""}"></button>
        <label for="action-trigger">
          <slot>
            <slot name="label"><og-text key="offerOptInLabel"></og-text></slot>
          </slot>
        </label>
      </slot>
    `}};n(oo,"OptinToggle");var xa=m(ee,{optoutProduct:it,optinProduct:X})(oo);var Ap=n((t,e)=>`${t}${parseInt(e,10)>1?"s":""}`,"pluralize"),no=class extends fn(_){static get properties(){return{pluralize:{type:Number},variant:{type:Number},i18n:{type:Object,attribute:!1},locale:{type:Object,attribute:!1},key:{type:String}}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._textOverride=this.innerText.trim()}getText(){return this._textOverride?this._textOverride:this.getPluralizedText(this.getVariantText(this.key))}getVariantText(e){let r={...this.i18n,...this.offer&&this.offer.locale},o=typeof r[e]!="undefined"?r[e]:"";return typeof this.variant=="undefined"?o:o[this.variant]}getPluralizedText(e){return typeof this.pluralize=="undefined"?e:e&&Ap(e,this.pluralize)}render(){return d`
      ${this.getText()}
    `}};n(no,"Text");var Ip=n(t=>({i18n:t.locale||{}}),"mapStateToProps"),Pa=m(Ip)(no);var Me=class{constructor(e){this.value=e,this.className="DiscountAmount"}toString(){return`${this.value}`}};n(Me,"DiscountAmount");var St=class extends Me{constructor(e){super(e),this.className="DiscountPercent"}toString(){return`${super.toString()}%`}};n(St,"DiscountPercent");var io=class extends St{constructor(e){super(e),this.className="ShippingDiscountPercent"}toString(){return this.value===100?"free shipping":super.toString()}};n(io,"ShippingDiscountPercent");var gn="Discount Percent",yn="Discount Amount",Oa="total_price",va="shipping_total",Ta="sub_total",bn=n(({field:t,object:e,type:r,value:o})=>{let s=[[new St(o),{field:Oa,object:"item",type:gn}],[new Me(o),{field:Oa,object:"item",type:yn}],[new io(o),{field:va,object:"order",type:gn}],[new Me(o),{field:va,object:"order",type:yn}],[new St(o),{field:Ta,object:"order",type:gn}],[new Me(o),{field:Ta,object:"order",type:yn}]].find(([,a])=>a.field===t&&a.object===e&&a.type===r);return s&&s[0]},"discountBuilder");function Np(t,{incentiveValue:e,incentiveClass:r}){return!(bn(t).className!==r||e&&e.toString()!==t.value.toString())}n(Np,"isMatchingIncentive");var kp=[ye.PSI,ye.PROGRAM_WIDE],so=class extends C(_){static get properties(){return{...super.properties,incentives:{type:Object,attribute:!1},from:{type:String},label:{type:String},initial:{type:Boolean,default:!1},value:{type:Number}}}createRenderRoot(){return this}render(){let e=this.from,r=this.value,o=this.initial?"initial":"ongoing",i=this.incentives[o]||[],s=i.filter(c=>c.criteria&&c.criteria.node_type==="PREMISE"&&!c.threshold_field&&kp.includes(c.criteria.standard)),a=[...s,...i.filter(c=>!s.includes(c))].find(c=>Np(c,{incentiveClass:e,incentiveValue:r}));return d`
      ${this.label} ${a?bn(a):this.renderFallback()}
    `}renderFallback(){return d`
      ${bn({field:"sub_total",object:"order",type:"Discount Percent",value:this.value})}
    `}};n(so,"IncentiveText");var Fp=n((t,e)=>{var r;return{incentives:(t.incentives||{})[e&&(e==null?void 0:e.product)&&S((r=e==null?void 0:e.product)==null?void 0:r.id)]||{}}},"mapStateToProps"),wa=m(Fp)(so);var Ca=new WeakMap,Ra=jt(t=>e=>{if(!(e instanceof z))throw new Error("unsafeHTML can only be used in text bindings");let r=Ca.get(e);if(r!==void 0&&ut(t)&&t===r.value&&e.value===r.fragment)return;let o=document.createElement("template");o.innerHTML=t;let i=document.importNode(o.content,!0);e.setValue(i),Ca.set(e,{value:t,fragment:i})});var ao=class extends C(_){static get properties(){return{...super.properties,messages:{type:Array,attribute:!1}}}createRenderRoot(){return this}render(){var e;return(e=this.messages)!=null&&e.length?d`
      <ul class="og-benefit-messages">
        ${this.messages.map(r=>d`
            <li>${Ra(r)}</li>
          `)}
      </ul>
    `:d``}};n(ao,"BenefitMessages");var Dp=n((t,e)=>Hi(e==null?void 0:e.product)(t),"mapStateToProps"),Aa=m(Dp)(ao);var co=class extends Jr(bt){static get properties(){return{...super.properties,defaultText:{type:String,attribute:"default-text"},selectLabel:{type:String,attribute:"select-label"}}}static get styles(){return b`
      :host {
        display: inline-block;
        cursor: pointer;
        background-color: var(--og-select-bg-color, #fff);
        border: var(--og-select-border, 1px solid #aaa);
        border-radius: var(--og-select-border-radius, 0.5em);
        border-width: var(--og-select-border-width, 1px);
        box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
        z-index: 1;
      }
    `}set defaultFrequency(e){this._defaultFrequency=e}get defaultFrequency(){var i,s,a,c;let{options:e,isSelected:r}=this.childOptions,o;return this.productDefaultFrequency?o=this.productDefaultFrequency:r?o=r:e.length?o=e[0].value:o=this._defaultFrequency,((s=(i=this.productFrequencies)==null?void 0:i.frequencies)==null?void 0:s.length)&&o&&((c=(a=this.productFrequencies)==null?void 0:a.frequenciesEveryPeriod)==null?void 0:c.length)?Dt(o,this.productFrequencies):o}get currentFrequency(){return this.frequency?this.frequency:this.defaultFrequency}productChangeFrequency(e,r){this.frequency=r}render(){var o;let e,r=this.defaultFrequency;return(o=this.frequencies)!=null&&o.length?e=this.frequencies.map((i,s)=>{let a,{frequenciesEveryPeriod:c,frequenciesText:l}=this.productFrequencies;return c&&s in c?a=Le(c[s],r):l&&s in l?a=l[s]:a=Le(i,this.defaultFrequency),{value:i,text:a}}):{options:e}=this.childOptions,e.length||(e=(this.frequencies||[]).map(i=>({value:i,text:Le(i,r)}))),e=e.map(({text:i,value:s})=>({text:s===r?d`
              ${i} ${this.defaultText||""}
            `:i,value:s})),d`
      <og-select
        .ariaLabel="${this.selectLabel||"Deliver every"}"
        .options="${e}"
        .selected="${this.currentFrequency}"
        .onChange="${({target:{value:i}})=>{this.productChangeFrequency(this.product,i,this.offer)}}"
      ></og-select>
    `}};n(co,"SelectFrequency");var Ia=m(zt,{productChangeFrequency:Fr})(co);var qp={day:{day:"2-digit"},"day-numeric":{day:"numeric"},"day-short":{weekday:"short"},"day-long":{weekday:"long"},month:{month:"2-digit"},"month-numeric":{month:"numeric"},"month-short":{month:"short"},"month-long":{month:"long"},year:{year:"2-digit"},"year-numeric":{year:"numeric"}};var Na=n((t,e)=>t instanceof Date?(e||"").toString().replace(/\{\{([-\w]+)\}\}/g,r=>{let o=r.replace(/[{}]/g,""),i=qp[o];if(typeof i=="undefined")return o;let a=new Intl.DateTimeFormat("en-us",i).formatToParts(t),[{value:c}]=a;return c}):t,"formatDate");var lo=class extends _{static get properties(){return{value:{type:String,reflect:!0},format:{type:String}}}createRenderRoot(){return this}render(){return d`
      ${Na(this.value,this.format||"{{month-long}} {{day}}, {{year-numeric}}")}
    `}};n(lo,"FormattedDate");var Up=n(t=>({value:t.previewUpsellOffer?new Date:t.nextUpcomingOrder.place}),"mapStateToProps"),ka=m(Up)(lo);var qa=le(Tt());var Fa=n((t,e,r)=>n(async function(i){await i({type:he,payload:{isPreview:t,productId:e}}),await i({type:Te}),await i(st({"47c01e9aacbe40389b5c7325d79091aa":{"en-US":"Coffee products with 15% off"},e6534b9d877f41e586c37b7d8abc3a58:{"en-US":"Get a free gift on your 3rd order"},f35e842710b24929922db4a529eecd40:{"en-US":"Free shipping for your recurring orders"}})),await i(Se({in_stock:{[e]:!0},eligibility_groups:{[e]:["subscription","upsell"]},result:"success",autoship:{[e]:!0},autoship_by_default:{[e]:!1},modifiers:{},module_view:{regular:"096135e6650111e9a444bc764e106cf4"},incentives_display:{"47c01e9aacbe40389b5c7325d79091aa":{field:"sub_total",object:"order",type:"Discount Percent",value:5},e6534b9d877f41e586c37b7d8abc3a58:{field:"total_price",object:"item",type:"Discount Percent",value:10},f35e842710b24929922db4a529eecd40:{field:"total_price",object:"item",type:"Discount Percent",value:10},"5be321d7c17f4e18a757212b9a20bfcc":{field:"total_price",object:"item",type:"Discount Percent",value:1}},incentives:{[e]:{initial:["5be321d7c17f4e18a757212b9a20bfcc"],ongoing:["e6534b9d877f41e586c37b7d8abc3a58","47c01e9aacbe40389b5c7325d79091aa","f35e842710b24929922db4a529eecd40"]}}},r,e))},"setPreviewStandardOfferThunk"),"setPreviewStandardOffer"),Lp=n((t,e)=>(Object.entries(e).forEach(([r,o])=>{if(Object.prototype.hasOwnProperty.call(t,r)){let i=t[r].concat(o),s=[...new Set(i.map(a=>JSON.stringify(a)))];t[r]=s.map(a=>JSON.parse(a))}else t[r]=o}),t),"mergeProductPlansToState"),Mp=n((t,e,r)=>n(async function(i,s){await i({type:Ot,payload:{isPreview:t,productId:e}});let{merchantId:a}=s();t?(await i(st({"47c01e9aacbe40389b5c7325d79091aa":{"en-US":"Coffee products with 15% off"},e6534b9d877f41e586c37b7d8abc3a58:{"en-US":"Get a free gift on your 3rd order"}})),await i(Se({in_stock:{[e]:!0},module_view:{regular:"096135e6650111e9a444bc764e106cf4"},default_frequencies:{[e]:{every:1,every_period:3}},eligibility_groups:{[e]:["subscription","upsell"]},result:"success",autoship:{[e]:!0},autoship_by_default:{[e]:!1},modifiers:{}},r,e)),await i(Go({count:1,next:null,previous:null,results:[{merchant:"0e5de2bedc5e11e3a2e4bc764e106cf4",customer:"TestCust",payment:"e98e789aba0111e9b90fbc764e107990",shipping_address:"b3a5816ae59611e78937bc764e1043b0",public_id:"23322d4a83eb11ea9a1ebc764e101db1",sub_total:"206.98",tax_total:"0.00",shipping_total:"10.00",discount_total:"0.00",total:"216.98",created:"2020-04-21 11:14:11",place:"2020-06-24 00:00:00",cancelled:null,tries:0,generic_error_count:0,status:1,type:1,order_merchant_id:null,rejected_message:null,extra_data:null,locked:!1,oos_free_shipping:!1}]})),await i(qt(a,"sig_field","ts","sig"))):await i(se())},"setPreviewUpsellOfferThunk"),"setPreviewUpsellOffer"),$p=n((t,e,r)=>n(async function(i,s){let a=s().productPlans;await i({type:Ao,payload:{isPreview:t,productId:e}}),await i({type:Te}),await i(st({"47c01e9aacbe40389b5c7325d79091aa":{"en-US":"Coffee products with 15% off"},e6534b9d877f41e586c37b7d8abc3a58:{"en-US":"Get a free gift on your 3rd order"}})),await i(Se({in_stock:{[e]:!0},eligibility_groups:{[e]:["subscription","upsell","prepaid"]},result:"success",autoship:{[e]:!0},autoship_by_default:{[e]:!1},modifiers:{},module_view:{regular:"096135e6650111e9a444bc764e106cf4"},incentives_display:{"47c01e9aacbe40389b5c7325d79091aa":{field:"sub_total",object:"order",type:"Discount Percent",value:5},e6534b9d877f41e586c37b7d8abc3a58:{field:"total_price",object:"item",type:"Discount Percent",value:10},f35e842710b24929922db4a529eecd40:{field:"total_price",object:"item",type:"Discount Percent",value:10},"5be321d7c17f4e18a757212b9a20bfcc":{field:"total_price",object:"item",type:"Discount Percent",value:1}},incentives:{[e]:{initial:["5be321d7c17f4e18a757212b9a20bfcc"],ongoing:["e6534b9d877f41e586c37b7d8abc3a58","47c01e9aacbe40389b5c7325d79091aa","f35e842710b24929922db4a529eecd40"]}}},r,e)),await i({type:Je,payload:Lp(a,jr({[e]:[{frequency:"1_3",regularPrice:"$15.00",subscriptionPrice:"$12.00",discountRate:"25%",prepaidShipments:3,regularPrepaidPrice:"$36.00",prepaidSavingsPerShipment:"$3.00",prepaidSavingsTotal:"$9.00",prepaidExtraSavingsPercentage:"10%"},{frequency:"1_3",regularPrice:"$15.00",subscriptionPrice:"$12.00",discountRate:"20%",prepaidShipments:6,regularPrepaidPrice:"$72.00",prepaidSavingsPerShipment:"$3.00",prepaidSavingsTotal:"$18.00",prepaidExtraSavingsPercentage:"10%"},{frequency:"1_3",regularPrice:"$15.00",subscriptionPrice:"$12.00",discountRate:"20%",prepaidShipments:12,regularPrepaidPrice:"$144.00",prepaidSavingsPerShipment:"$3.00",prepaidSavingsTotal:"$36.00",prepaidExtraSavingsPercentage:"10%"}]}))}),await i({type:We,payload:{prepaidSellingPlans:{[e]:[{numberShipments:3,sellingPlan:"1_3"},{numberShipments:6,sellingPlan:"1_3"},{numberShipments:12,sellingPlan:"1_3"}]}}})},"setPreviewPrepaidThunk"),"setPreviewPrepaid"),Da=n((t,e,r)=>async function(o,i){switch(await o({type:me}),await o({type:he,payload:{isPreview:!1,productId:r.product.id}}),await o({type:Ot,payload:{isPreview:!1,productId:r.product.id}}),t){case"regular":o(Fa(!0,r.product.id,r));break;case"upsell":o(Mp(!0,r.product.id,r));break;case"subscribed":o(Fa(!0,r.product.id,r)),o(X(r.product,"2_2"));break;case"prepaid":o($p(!0,r.product.id,r)),o(X(r.product,"1_3"));break;default:}},"setPreview");var Vp=n((...t)=>JSON.stringify(t),"memoizeKey"),Ua=n(t=>{let e=!1;return(...r)=>{e||(console.warn(t(...r)),e=!0)}},"logOnce"),jp=Ua((t,e)=>`Hiding Ordergroove offer since the store currency ${t} does not match your configured currency ${e} and you are not set up for multicurrency. Contact your Ordergroove representative for next steps.`),Qg=Ua(()=>"Hiding Ordergroove offer since cart offers does not currently support product-specific frequency lists."),Gp=(0,qa.default)((t,e)=>Object.assign({components:e},t),Vp),po=class extends W{static get properties(){return{...super.properties,config:{type:Object,attribute:!1},product:ha,productComponents:{type:Array,attribute:"product-components"},offerId:{type:String,attribute:!1},auth:gt,preview:{type:String,attribute:"preview",reflect:"true"},location:{type:String},autoshipByDefault:{type:Boolean,attribute:"autoship-by-default"},productDefaultFrequency:{type:String,attribute:!1},locale:{type:Object,attribute:!0},firstOrderPlaceDate:{type:String,attribute:"first-order-place-date"},productToSubscribe:{type:String,attribute:"product-to-subscribe"},subscribed:{type:Boolean,reflect:!0},frequency:{type:String,reflect:!0},productFrequency:{type:String},isCart:{type:Boolean,attribute:"cart"},optedin:{type:Object},variationId:{type:String},overrideSellingPlanPrice:{type:Boolean,attribute:"dev-override-selling-plan-price"}}}firstUpdated(){try{let e=Array.from(this.getAttributeNames()).find(r=>r.startsWith("preview-"));e==="preview-standard-offer"?this.preview="regular":e==="preview-upsell-offer"?this.preview="upsell":e==="preview-subscribed-offer"?this.preview="subscribed":e==="preview-prepaid-offer"&&(this.preview="prepaid")}catch(e){console.warn("Unable to set preview property",e)}}static get styles(){return b`
      :host[hidden] {
        display: none;
      }

      :host {
        display: block;
      }

      :host {
        color: var(--og-global-color, #000);
        font-family: var(--og-global-family, inherit);
        font-size: var(--og-global-size, inherit);
        padding: var(--og-wrapper-padding, 10px 0);
        min-width: var(--og-wrapper-min-width, 0);
      }

      p {
        margin: 0 0 0.3em;
      }

      :host og-upsell-button button {
        font-family: var(--og-upsell-family, inherit);
        font-size: var(--og-upsell-size, inherit);
        background-color: var(--og-upsell-background, inherit);
        color: var(--og-upsell-color, inherit);
      }

      .og-modal__btn {
        font-size: var(--og-modal-button-size, 0.875rem);
        font-family: var(--og-modal-button-family, inherit);
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: var(--og-modal-button-background, #e6e6e6);
        color: var(--og-modal-button-color, rgba(0, 0, 0, 0.8));
        border-radius: 0.25rem;
        border-style: none;
        border-width: 0;
        cursor: pointer;
        -webkit-appearance: button;
        text-transform: none;
        overflow: visible;
        line-height: 1.15;
        margin: 0;
        will-change: transform;
        -moz-osx-font-smoothing: grayscale;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        transition: -webkit-transform 0.25s ease-out;
        transition: transform 0.25s ease-out;
        transition:
          transform 0.25s ease-out,
          -webkit-transform 0.25s ease-out;
      }

      .og-modal__btn:focus,
      .og-modal__btn:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
      }

      .og-modal__btn-primary {
        background-color: var(--og-confirm-button-background, #00449e);
        color: var(--og-confirm-button-color, #fff);
      }
    `}static get initialTemplate(){return`
    <og-when test="regularEligible">
      <div>

        <og-optout-button>
          <og-text key="offerOptOutLabel"></og-text>
        </og-optout-button>
      </div>
      <div>
        <og-optin-button>
          <og-price discount>
            <span slot="prepend">Subscribe and get</span>
            <span slot="append">off</span>
            <og-text key="offerOptInLabel" slot="fallback"></og-text> 
          </og-price>
          <og-price regular></og-price>
          <og-price subscription></og-price>
    
        </og-optin-button>
        <og-tooltip placement="bottom">
          <div slot="trigger">
            <og-text key="offerTooltipTrigger"></og-text>
          </div>
          <div slot="content">
            <og-text key="offerTooltipContent"></og-text>
          </div>
        </og-tooltip>
      </div>
      <div style="margin-left: 2.2em">
        <og-text key="offerEveryLabel"></og-text>
        <og-select-frequency>
          <option value="3_1" selected>3 Days</option>
          <option value="1_2">1 Week</option>
          <option value="1_3">1 Month</option>
        </og-select-frequency>
      </div>
    </og-when>

    <og-when test="upsellEligible">
      <og-when test="!upcomingOrderContainsProduct">
      <div class="og-iu-offer">
        <og-text key="upsellButtonLabel"></og-text>
        <og-upsell-button>
          <button type="button">
            <og-text key="upsellButtonContent"></og-text>
            <og-next-upcoming-order></og-next-upcoming-order>
          </button>
        </og-upsell-button>
        <og-upsell-modal>
          <og-text key="upsellModalContent"></og-text>
          <br />

          <og-optout-button>
            <og-text key="upsellModalOptOutLabel"></og-text>
          </og-optout-button>

          <br />

          <og-optin-button>
            <og-text key="upsellModalOptInLabel"></og-text>
          </og-optin-button>
          <br />

          <og-text key="offerEveryLabel"></og-text>
          <og-select-frequency>
            <option value="3_1" selected>3 Days</option>
            <option value="1_2">1 Week</option>
            <option value="1_3">1 Month</option>
          </og-select-frequency>

          <button slot="confirm" class="og-modal__btn og-modal__btn-primary">
            <og-text key="upsellModalConfirmLabel"></og-text>
          </button>
          <button slot="cancel" class="og-modal__btn"><og-text key="upsellModalCancelLabel"></og-text></button>
        </og-upsell-modal>
      </div>
      </og-when>
      <og-when test="upcomingOrderContainsProduct">
        The product is in your next upcomming order
      </og-when>
    </og-when>
    
    `}constructor(){super(),this.module="pdp",this.product={},this.productComponents=[],this.fetchOffer=()=>0,this.fetchOrders=()=>0,this.productHasChangedComponents=()=>0,this.setFirstOrderPlaceDate=()=>0,this.setProductToSubscribe=()=>0,this.productChangeFrequency=()=>0}applyTemplate(e){super.applyTemplate(e);let{id:r,locale:o}=e;this.variationId=r,this.locale=o;let i=new CustomEvent("template-changed");this.dispatchEvent(i)}updated(e){if(e.has("preview")&&this.setPreview(this.preview,e.get("preview"),this),this.frequency=this.defaultFrequency,e.has("product")&&!this.isPreview&&Ar(()=>this.fetchOffer(this.product.id,Ke,this)),e.has("firstOrderPlaceDate")&&this.product.id&&!this.isPreview&&this.setFirstOrderPlaceDate(this.product.id,this.firstOrderPlaceDate),e.has("productToSubscribe")&&this.product.id&&!this.isPreview&&this.setProductToSubscribe(this.product.id,this.productToSubscribe),e.has("auth")&&this.auth&&!this.isPreview&&this.fetchOrders(),e.has("productComponents")){let r=Gp(this.product,this.productComponents),o=Object.assign({},this.product,{components:e.get("productComponents")});N(r,o)||this.productHasChangedComponents(r,o)}(e.has("offerId")||e.has("autoshipByDefault")||e.has("location")||e.has("product"))&&this.offerId&&this.autoshipByDefault&&(this.location==="cart"||this.isCart)&&this.product.id&&this.optinProduct&&!(this.optedin||[]).find(r=>N(r,this.product))&&this.optinProduct({...this.product,...this.productComponents.length&&{components:this.productComponents}},this.defaultFrequency,this)}get isPreview(){return this.preview||window.og.previewMode}get shouldEnableOffer(){return this.config&&this.config.storeCurrency&&this.config.merchantSettings&&!(this.config.merchantSettings.multicurrency_enabled||this.config.storeCurrency===this.config.merchantSettings.currency_code)?(jp(this.config.storeCurrency,this.config.merchantSettings.currency_code),!1):!0}render(){return this.shouldEnableOffer?d`
          <slot></slot>
        `:null}get defaultFrequency(){let e=this.productFrequency||this.productDefaultFrequency;if(e)return e;let r=this.querySelector("og-select-frequency");if(r&&r.currentFrequency)return r.currentFrequency;let o=this.getValueFromAttribute("defaultFrequency");return o||(this.template&&this.template.config&&typeof this.template.config.defaultFrequency!="undefined"?this.template.config.defaultFrequency:this.configDefaultFrequency)}getValueFromAttribute(e){let r=$o(e);if(this.hasAttribute(r)){let o=this.getAttribute(r);return o.toString().toLowerCase()==="true"?!0:o.toString().toLowerCase()==="false"?!1:o}}};n(po,"Offer");var Hp=n((t,e)=>{var r;return{config:t.config,auth:t.auth,offerId:((t.productOffer||{})[(e.product||{}).id]||[])[0],configDefaultFrequency:ie((r=e.product)==null?void 0:r.id)(t),productFrequency:ne(e.product)(t),productDefaultFrequency:tt((e.product||{}).id)(t),autoshipByDefault:t.config&&t.config.autoshipByDefault||H(e,"autoshipByDefault",Lo(t)[(e.product||{}).id]),...Rr(e.product)(t)&&{autoshipByDefault:!1},optedin:Ft(t),subscribed:re(e.product)(t),...ot(t)}},"mapStateToProps"),La=m(Hp,{fetchOffer:ts,fetchOrders:qr,productHasChangedComponents:Ji,optinProduct:X,setFirstOrderPlaceDate:as,setProductToSubscribe:cs,setPreview:Da})(po);var Yt=class extends _{constructor(){super(),this.showCancelButton=!0,this.showConfirmButton=!0}static get properties(){return{title:{type:String,attribute:!1},content:{type:String,attribute:!1},confirmText:{type:String,attribute:!1},cancelText:{type:String,attribute:!1},showCancelButton:{type:Boolean},showConfirmButton:{type:Boolean},show:{type:Boolean,attribute:"show"}}}static get styles(){return b`
      :host[hidden] {
        display: none;
      }

      :host {
        display: block;
      }

      .og-modal {
        display: none;
      }

      .og-modal.is-open {
        display: block;
      }

      .og-modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .og-modal__container {
        background-color: var(--og-modal-background-color, #fff);
        padding: var(--og-modal-padding, 30px);
        max-width: 500px;
        max-height: 100vh;
        border-radius: var(--og-modal-border-radius, 4px);
        box-sizing: border-box;
      }

      .og-modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .og-modal__title {
        margin-top: 0;
        margin-bottom: 0;
        font-weight: 600;
        font-size: 1.25rem;
        line-height: 1.25;
        color: #00449e;
        box-sizing: border-box;
      }

      .og-modal__close {
        background: transparent;
        border: 0;
      }

      .og-modal__close:before {
        content: '✕';
      }

      .og-modal__content {
        margin-top: 2rem;
        margin-bottom: 2rem;
        line-height: 1.5;
      }

      .og-modal__btn {
        font-size: var(--og-modal-button-size, 0.875rem);
        font-family: var(--og-modal-button-family, inherit);
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: var(--og-modal-button-background, #e6e6e6);
        color: var(--og-modal-button-color, rgba(0, 0, 0, 0.8));
        border-radius: 0.25rem;
        border-style: none;
        border-width: 0;
        cursor: pointer;
        -webkit-appearance: button;
        text-transform: none;
        overflow: visible;
        line-height: 1.15;
        margin: 0;
        will-change: transform;
        -moz-osx-font-smoothing: grayscale;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        transition: -webkit-transform 0.25s ease-out;
        transition: transform 0.25s ease-out;
        transition:
          transform 0.25s ease-out,
          -webkit-transform 0.25s ease-out;
      }

      .og-modal__btn:focus,
      .og-modal__btn:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
      }

      .og-modal__btn-primary {
        background-color: var(--og-confirm-button-background, #00449e);
        color: var(--og-confirm-button-color, #fff);
      }
      .btn {
        cursor: pointer;
      }
    `}close(){this.removeAttribute("show"),this.dispatchEvent(new CustomEvent("close"))}confirm(){this.removeAttribute("show"),this.dispatchEvent(new CustomEvent("confirm"))}get confirmButton(){return this.showConfirmButton?d`
          <span @click="${()=>this.confirm()}">
            <slot name="confirm" class="btn">
              <button class="og-modal__btn og-modal__btn-primary og-modal__confirm" @click="${()=>this.confirm()}">
                ${this.confirmText}
              </button>
            </slot>
          </span>
        `:d``}get cancelButton(){return this.showCancelButton?d`
          <span @click="${()=>this.close()}" class="btn">
            <slot name="cancel">
              <button class="og-modal__btn og-modal__cancel" @click="${()=>this.close()}">${this.cancelText}</button>
            </slot>
          </span>
        `:d``}render(){return this.show?d`
      <div class="og-modal is-open" aria-hidden="true">
        <div class="og-modal__overlay" tabindex="-1">
          <div class="og-modal__container" role="dialog" aria-modal="true">
            <header class="og-modal__header">
              <h2 class="og-modal__title">
                <slot name="title">${this.title}</slot>
              </h2>
              <button class="og-modal__close" aria-label="Close" @click="${()=>this.close()}"></button>
            </header>
            <main class="og-modal__content">
              <slot name="content">${this.content}</slot>
            </main>
            <footer class="og-modal__footer">${this.confirmButton} ${this.cancelButton}</footer>
          </div>
        </div>
      </div>
    `:d``}};n(Yt,"Modal");var Sn=new WeakMap,Wt=jt(t=>e=>{let r=Sn.get(e);if(t===void 0&&e instanceof Ee){if(r!==void 0||!Sn.has(e)){let o=e.committer.name;e.committer.element.removeAttribute(o)}}else t!==r&&e.setValue(t);Sn.set(e,t)});var Jt=class extends _{static get styles(){return b`
      :host {
        display: inline-block;
        color: inherit;
        position: relative;
        height: 100%;
        cursor: inherit;
        font-family: inherit;
        font-weight: inherit;
      }
      select {
        font-weight: inherit;
        display: block;
        height: 100%;
        cursor: inherit;
        color: inherit;
        font-family: inherit;
        font-size: 1em;
        line-height: 1.3;
        padding: var(--og-select-padding, 0.4em 1.8em 0.3em 0.5em);
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        border: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
      }
      select::-ms-expand {
        display: none;
      }
      select:focus {
        outline: none;
      }
      select option {
        font-weight: inherit;
      }
      span {
        position: absolute;
        // background: white;
        color: inherit;
        fill: white;
        pointer-events: none;
        right: 0.3em;
        top: 50%;
        z-index: 1;
        font-size: 1em;
        line-height: 0.2em;
        transform: scaleY(0.5);
      }
    `}static get properties(){return{options:{type:Array},selected:{type:String},ariaLabel:{type:String}}}render(){return d`
      <select @change="${n(r=>this.onChange(r),"handleOnChange")}" aria-label="${Wt(this.ariaLabel)}">
        ${this.options.map(r=>d`
            <option
              value="${r.value}"
              ?selected=${r.value===this.selected}
              .selected=${r.value===this.selected}
            >
              ${r.text}
            </option>
          `)}
      </select>
      <span>&#9660;</span>
    `}};n(Jt,"Select");var ve={AUTOMATIC:"automatic",MANUAL:"manual"},Kt=class extends _{constructor(){super(),this.triggerLabel="Show tooltip",this.open=!1,this.activationType=ve.AUTOMATIC}static get properties(){return{placement:{type:String,default:"bottom"},triggerLabel:{type:String,attribute:"trigger-label"},activationType:{type:String,attribute:"activation-type"},open:{type:Boolean,attribute:!1}}}static get styles(){return b`
      :host[hidden] {
        display: none;
      }

      :host {
        display: inline-block;
        position: relative;
        z-index: 9;
      }

      /* reset default button styles */
      button.trigger {
        all: unset;
      }

      /* do not reset the button's default focus outline */
      button.trigger:focus {
        outline: revert;
      }

      .trigger {
        display: block;
        cursor: pointer;
      }

      /* for manual activation, hide the content completely from screen readers when the tooltip is closed */
      /* otherwise, interactive elements may receive focus even when they are not visible */
      [data-manual] .content {
        visibility: hidden;
      }

      .content {
        box-sizing: border-box;
        font-family: var(--og-tooltip-family, inherit);
        font-size: var(--og-tooltip-size, inherit);
        color: var(--og-tooltip-color, inherit);
        background-color: var(--og-tooltip-background, #ececec);
        box-shadow: var(--og-tooltip-box-shadow, 2px 2px 6px rgba(0, 0, 0, 0.28));
        display: block;
        opacity: 0;
        padding: var(--og-tooltip-padding, 0.5em);
        text-align: var(--og-tooltip-text-align, left);
        pointer-events: none;
        position: absolute;
        transform: translateY(10px);
        transition: transform 0.25s ease-out;
        z-index: 99999;
        border-radius: var(--og-tooltip-border-radius, 0);
      }

      .content:after {
        content: ' ';
        height: 0;
        position: absolute;
        width: 0;
      }

      .top {
        bottom: 100%;
        margin-bottom: 10px;
      }

      .bottom {
        top: 100%;
        margin-top: 10px;
      }

      .left {
        right: 100%;
        margin-right: 10px;
      }

      .right {
        left: 100%;
        margin-left: 10px;
      }

      .top-left {
        bottom: 100%;
        margin-bottom: 10px;
        right: 100%;
        margin-right: -16px;
      }

      .top-right {
        bottom: 100%;
        margin-bottom: 10px;
        left: 100%;
        margin-left: -16px;
      }

      .bottom-left {
        top: 100%;
        margin-top: 10px;
        right: 100%;
        margin-right: -16px;
      }

      .bottom-right {
        top: 100%;
        margin-top: 10px;
        left: 100%;
        margin-left: -16px;
      }

      .bottom-left:after,
      .bottom-right:after,
      .top-left:after,
      .top-right:after,
      .top:after,
      .bottom:after {
        margin-left: -10px;
        left: 50%;
        border-left: solid transparent 10px;
        border-right: solid transparent 10px;
      }

      .top-left:after,
      .top-right:after,
      .top:after {
        bottom: -10px;
        border-top: solid var(--og-tooltip-background, #ececec) 10px;
      }
      .bottom-left:after,
      .top-left:after {
        left: auto;
        right: 0;
      }

      .bottom-right:after,
      .top-right:after {
        left: 0;
        right: auto;
        margin-left: 0;
      }

      .bottom-left:after,
      .bottom-right:after,
      .bottom:after {
        top: -10px;
        border-bottom: solid var(--og-tooltip-background, #ececec) 10px;
      }

      .left:after,
      .right:after {
        margin-top: -10px;
        top: 50%;
        border-top: solid transparent 10px;
        border-bottom: solid transparent 10px;
      }
      .right:after {
        left: -10px;
        border-right: solid var(--og-tooltip-background, #ececec) 10px;
      }
      .left:after {
        right: -10px;
        border-left: solid var(--og-tooltip-background, #ececec) 10px;
      }

      .tooltip[data-open] .content {
        visibility: visible;
        opacity: 1;
        width: 200px;
        pointer-events: auto;
        transform: translateY(0px);
      }
    `}connectedCallback(){super.connectedCallback(),this.abortController=new AbortController;let e=this.abortController.signal;this.addEventListener("mouseenter",this.handleMouseEnter.bind(this),{signal:e}),this.addEventListener("mouseleave",this.handleMouseLeave.bind(this),{signal:e}),this.addEventListener("focusin",this.handleFocusIn.bind(this),{signal:e}),this.addEventListener("focusout",this.handleFocusOut.bind(this),{signal:e}),this.addEventListener("keydown",this.handleKeyDown.bind(this),{signal:e}),document.addEventListener("click",this.handleDocumentClick.bind(this),{signal:e})}async recalculatePosition(){if(await this.updateComplete,!this.open)return;let r=this.shadowRoot.querySelector(".trigger").getBoundingClientRect(),o=this.shadowRoot.querySelector(".content"),i=o.getBoundingClientRect();!this.placement||this.placement==="top"||this.placement==="bottom"?o.style.left=`${(-1*i.width+r.width)/2}px`:(this.placement==="left"||this.placement==="right")&&(o.style.top=`${(-1*i.height+r.height)/2}px`)}handleMouseEnter(){this.open=!0,this.recalculatePosition()}handleMouseLeave(){this.open=!1}handleFocusIn(){this.activationType===ve.AUTOMATIC&&(this.open=!0,this.recalculatePosition())}handleFocusOut(e){this.activationType===ve.AUTOMATIC&&(this.contains(e.relatedTarget)||(this.open=!1))}handleKeyDown(e){this.activationType===ve.MANUAL&&e.key==="Escape"&&this.open&&(this.open=!1,e.stopPropagation())}handleClick(){this.activationType===ve.MANUAL&&(this.open=!this.open,this.recalculatePosition())}handleDocumentClick(e){this.activationType!==ve.MANUAL||!this.open||this.contains(e.target)||(this.open=!1)}disconnectedCallback(){super.disconnectedCallback(),this.abortController.abort()}render(){let e=this.triggerLabel?this.triggerLabel:void 0;return d`
      <span class="tooltip" ?data-open="${this.open}" ?data-manual="${this.activationType===ve.MANUAL}">
        ${this.activationType===ve.MANUAL?d`
              <button
                class="trigger"
                aria-label="${Wt(e)}"
                aria-expanded="${this.open}"
                aria-controls="tooltip-content"
                @click="${this.handleClick}"
              >
                <slot name="trigger">${this.trigger}</slot>
              </button>
            `:d`
              <span class="trigger" tabindex="0" role="button" aria-label="${Wt(e)}">
                <slot name="trigger">${this.trigger}</slot>
              </span>
            `}
        <div class="content ${this.placement||"bottom"}" role="tooltip" id="tooltip-content">
          <slot name="content">${this.content}</slot>
        </div>
      </span>
    `}};n(Kt,"Tooltip");var K=class extends C(_){static get properties(){return{options:{type:Array},shipmentsOptedIn:{type:Number},prepaidShipmentsSelected:{type:Number},defaultPrepaidShipments:{type:Number,attribute:"default-prepaid-shipments"}}}get prepaidOptedIn(){return this.shipmentsOptedIn>1}get selectedNumberOfShipments(){return this.prepaidShipmentsSelected||this.shipmentsOptedIn||this.getDefaultPrepaidShipments()}getDefaultPrepaidShipments(){return this.options.includes(this.defaultPrepaidShipments)?this.defaultPrepaidShipments:kt(this.options)}handleSelect({target:{value:e}}){let r=+e;this.productChangePrepaidShipments(this.product,r,this.offer)}render(){return d``}};n(K,"PrepaidStatus");var Bp=n((t,e)=>({options:G(e.product.id)(t),shipmentsOptedIn:j(e.product)(t),prepaidShipmentsSelected:oe(e.product)(t)}),"mapStateToProps"),my=m(Bp,{productChangePrepaidShipments:be})(K);var uo=class extends K{constructor(){super(),this.options=[],this.text="shipments"}static get properties(){return{...super.properties,text:{type:String}}}static get styles(){return b`
      og-select {
        display: inline-block;
        cursor: pointer;
        background-color: var(--og-select-bg-color, #fff);
        border: var(--og-select-border, 1px solid #aaa);
        border-width: var(--og-select-border-width, 1px);
        box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
        z-index: 1;
      }

      input {
        width: 1.2em;
        height: 1.2em;
        accent-color: var(--og-prepaid-checkbox-color, black);
        border-radius: 4px;
      }
    `}handleChange(e){e.target.checked?this.productChangePrepaidShipments(this.product,this.selectedNumberOfShipments,this.offer):this.productChangePrepaidShipments(this.product,null,this.offer)}render(){if(this.options.length===0)return d``;let e=this.options.map(r=>({value:r,text:`${r} ${this.text}`}));return d`
      <div>
        <input id="cbx" type="checkbox" .checked=${this.prepaidOptedIn} @change=${this.handleChange} />
        <label for="cbx">
          <slot name="label">Prepay for</slot>
          ${this.options.length>1?d`
                <og-select
                  .options=${e}
                  .selected=${this.selectedNumberOfShipments}
                  .onChange="${r=>this.handleSelect(r)}"
                ></og-select>
              `:d`
                <span>${e[0].text}</span>
              `}
          <slot name="append"></slot>
        </label>
      </div>
    `}};n(uo,"PrepaidToggle");var zp=n((t,e)=>({options:G(e.product.id)(t),shipmentsOptedIn:j(e.product)(t),prepaidShipmentsSelected:oe(e.product)(t)}),"mapStateToProps"),Ma=m(zp,{productChangePrepaidShipments:be})(uo);var fo=class extends K{static get properties(){return{...super.properties,productPlans:{type:Object},prepaidShipmentsSelected:{type:Number},totalPrice:{type:Boolean,reflect:!0,attribute:"total-price"},perDeliveryPrice:{type:Boolean,reflect:!0,attribute:"per-delivery-price"},totalSavings:{type:Boolean,reflect:!0,attribute:"total-savings"},perDeliverySavings:{type:Boolean,reflect:!0,attribute:"per-delivery-savings"},percentageSavings:{type:Boolean,reflect:!0,attribute:"percentage-savings"},extraPercentageSavings:{type:Boolean,reflect:!0,attribute:"extra-percentage-savings"},numberOfShipments:{type:Boolean,reflect:!0,attribute:"number-of-shipments"}}}static get styles(){return b`
      :host {
        display: inline-block;
        text-indent: initial;
      }
    `}get value(){let e=S(this.product),r=this.productPlans[e]||[],o=this.selectedNumberOfShipments,i=r.find(h=>h.prepaidShipments>1&&h.prepaidShipments===o);if(!i&&(i=r.find(h=>h.prepaidShipments>1),!i))return"";let{discountRate:s,subscriptionPrice:a,prepaidShipments:c,regularPrepaidPrice:l,prepaidSavingsPerShipment:p,prepaidSavingsTotal:u,prepaidExtraSavingsPercentage:f}=i;return this.totalPrice?l:this.perDeliveryPrice?a:this.totalSavings?u:this.perDeliverySavings?p:this.percentageSavings?s:this.extraPercentageSavings?f:this.numberOfShipments?c:""}render(){let e=this.value;return e?d`
        <slot name="prepend"></slot>
        ${e}
        <slot name="append"></slot>
      `:d`
      <slot name="fallback"></slot>
    `}};n(fo,"PrepaidData");var Yp=n((t,e)=>({options:G(e.product.id)(t),shipmentsOptedIn:j(e.product)(t),prepaidShipmentsSelected:oe(e.product)(t),productPlans:t.productPlans}),"mapStateToProps"),$a=m(Yp)(fo);var ho=class extends K{constructor(){super(),this.addEventListener("click",this.handleClick.bind(this))}static get styles(){return b`
      :host {
        cursor: pointer;
        display: inline-block;
      }

      :host[hidden] {
        display: none;
      }

      .btn {
        position: relative;
        width: var(--og-radio-width, 1.4em);
        height: var(--og-radio-height, 1.4em);
        margin: var(--og-radio-margin, 0);
        padding: 0;
        border: 1px solid var(--og-primary-color, var(--og-border-color, black));
        background: #fff;
        border-radius: 100%;
        vertical-align: middle;
        color: var(--og-primary-color, var(--og-btn-color, black));
      }

      .radio {
        text-indent: -9999px;
        flex-shrink: 0;
      }

      .radio {
        border-color: var(--og-checkbox-border-color, black);
      }

      .radio.active::after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: var(--og-checkbox-border-color, black);
      }

      .radio.active::after {
        content: ' ';
        border-radius: 100%;
        border: 2px solid #fff;
      }
    `}handleClick(e){this.prepaidOptedIn||this.productChangePrepaidShipments(this.product,this.selectedNumberOfShipments,this.offer),e.preventDefault()}render(){return d`
      <slot name="default">
        <button id="action-trigger" class="btn radio ${this.prepaidOptedIn?"active":""}"></button>
        <label for="action-trigger">
          <slot name="label"><og-text key="prepaidOptInLabel"></og-text></slot>
        </label>
      </slot>
    `}};n(ho,"PrepaidButton");var Wp=n((t,e)=>({options:G(e.product.id)(t),shipmentsOptedIn:j(e.product)(t),prepaidShipmentsSelected:oe(e.product)(t)}),"mapStateToProps"),Va=m(Wp,{productChangePrepaidShipments:be})(ho);var mo=class extends K{constructor(){super(),this.options=[],this.text="shipments"}static get properties(){return{...super.properties,text:{type:String},selectLabel:{type:String,attribute:"select-label"}}}static get styles(){return b`
      og-select {
        display: inline-block;
        cursor: pointer;
        background-color: var(--og-select-bg-color, #fff);
        border: var(--og-select-border, 1px solid #aaa);
        border-width: var(--og-select-border-width, 1px);
        box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
        z-index: 1;
      }
    `}render(){if(this.options.length===0)return d``;let e=this.options.map(r=>({value:r,text:`${r} ${this.text}`}));return d`
      ${this.options.length>1?d`
            <og-select
              .options=${e}
              .selected=${this.selectedNumberOfShipments}
              .onChange="${r=>this.handleSelect(r)}"
              .ariaLabel="${this.selectLabel}"
            ></og-select>
          `:d`
            <span>${e[0].text}</span>
          `}
      <slot name="append"></slot>
    `}};n(mo,"PrepaidSelect");var Jp=n((t,e)=>({options:G(e.product.id)(t),shipmentsOptedIn:j(e.product)(t),prepaidShipmentsSelected:oe(e.product)(t)}),"mapStateToProps"),ja=m(Jp,{productChangePrepaidShipments:be})(mo);var go=class extends yt{static get properties(){return{...super.properties,prepaidShipmentsOptedIn:{type:Number}}}get isActive(){return this.prepaidShipmentsOptedIn>0?!1:this.subscribed}handleClick(e){if(!this.isActive){let r=this.frequencies&&this.frequencies.length>0?this.frequencies[0]:this.optinFrequency;this.optinProduct(Bt(this),r,this.offer)}e.preventDefault()}render(){return d`
      <slot name="default">
        <button id="action-trigger" class="btn radio ${this.isActive?" active":""}"></button>
        <label for="action-trigger">
          <slot>
            <slot name="label"><og-text key="offerOptInLabel"></og-text></slot>
          </slot>
        </label>
      </slot>
    `}};n(go,"SubscriptionButton");var Ga=m(ee,{optinProduct:X})(go);var Qt=class extends _{static get styles(){return b`
      :host {
        position: fixed;
        top: 5em;
        righit: 5em;
        background-color: rgba(255, 255, 255, 0.7);
        width: 400px;
        padding: 1em;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 0 0 #000;
      }

      button {
        margin: 0 0.5em 0.5em;
        background-color: gray;
        color: white;
        border: 0;
        border-radius: 3px;
        cursor: pointer;
        padding: 0.5em;
      }

      button.primary {
        background-color: blue;
        padding: 1em;
        color: white;
        border: 0;
        border-radius: 3px;
      }

      button[disabled] {
        background-color: #777;
      }

      div {
        margin-bottom: 0.5em;
      }

      .message {
        margin-left: 0.5em;
        margin: 1em;
      }

      .success {
        color: green;
      }

      .error {
        color: red;
      }

      .warning {
        color: orange;
      }
      a {
        color: white;
      }
    `}runTests(){this.results=[],this.disabled=!0,this.requestUpdate(),document.querySelectorAll("og-offer").forEach(r=>{let o=r.store.getState(),i=r.getAttribute("product"),s=r.getAttribute("location"),a={messages:this.getOfferAttributeMessages(i,s).concat(this.getOfferRequestMessages(i,o)),product:i};this.results.push(a)}),this.testsRan=!0,this.disabled=!1,this.requestUpdate()}getOfferAttributeMessages(e,r){let o=[];return e||o.push({name:"Offer element found but missing product attribute",type:"error"}),r||o.push({name:"Offer element found but missing location attribute",type:"warning"}),e&&r&&o.push({name:"Offer element found and properly tagged",type:"success"}),o}getOfferRequestMessages(e,r){let o=r.inStock[e],i=r.autoshipEligible[e],s=[];return e&&o===!1&&s.push({name:"This product is marked as out of stock in the OG database",type:"warning"}),e&&i===!1&&s.push({name:"This product is not eligible for autoship",type:"warning"}),e&&o===null&&i===null&&s.push({name:"This product does not exist in our database",type:"error"}),s}resultsCodeBlock(){return this.results.length===0?d`
          <div class="message error">No offer element found on the page</div>
        `:this.results.map((e,r)=>d`
            <div>For offer tag with product = "${e.product}"</div>
            ${e.messages.map(o=>d`
                <div class="message ${o.type}">${o.name}</div>
              `)}
            <button @click=${this.toggleProductFlags(r,{})}>Set inStock and eligible</button>
            <br />
            <button @click=${this.toggleProductFlags(r,{inStock:!1})}>Set to not inStock</button>
            <br />
            <button @click=${this.toggleProductFlags(r,{autoship:!1})}>Set to not eligible</button>
            <br />
            <button @click=${this.toggleProductFlags(r,{autoship:!1,inStock:!1})}>
              Set to not eligible and not in stock
            </button>
            <br />
            <button @click=${this.toggleUpsellPreview(r)}>Toggle upsell/regular in this offer</button>
            <br />
            <button @click=${this.toggleUpsellNextOrder(r)}>upsell product is in next order</button>
            <br />
          `)}toggleUpsellPreview(e){return r=>{r.preventDefault();let o=document.querySelectorAll("og-offer")[e];o.getAttribute("preview-upsell-offer")?o.removeAttribute("preview-upsell-offer"):o.setAttribute("preview-upsell-offer",!0),this.runTests()}}toggleProductFlags(e,{inStock:r=!0,autoship:o=!0,groups:i=["subscription","upsell"]}){return s=>{s.preventDefault();let a=document.querySelectorAll("og-offer")[e],c=a.product.id;a.store.dispatch(Se({in_stock:{[c]:r},eligibility_groups:{[c]:i},result:"success",autoship:{[c]:o},module_view:{regular:"58a01e9aacbe40389b5c7325d79091bb"},modifiers:{},incentives_display:{"47c01e9aacbe40389b5c7325d79091aa":{field:"sub_total",object:"order",type:"Discount Percent",value:5},e6534b9d877f41e586c37b7d8abc3a58:{field:"total_price",object:"item",type:"Discount Percent",value:5},f35e842710b24929922db4a529eecd40:{field:"total_price",object:"item",type:"Discount Percent",value:10},"5be321d7c17f4e18a757212b9a20bfcc":{field:"total_price",object:"item",type:"Discount Percent",value:1}},incentives:{[c]:{initial:["5be321d7c17f4e18a757212b9a20bfcc"],ongoing:["e6534b9d877f41e586c37b7d8abc3a58","47c01e9aacbe40389b5c7325d79091aa","f35e842710b24929922db4a529eecd40"]}}},{},c)),this.runTests()}}toggleUpsellNextOrder(e){return r=>{let o=document.querySelectorAll("og-offer")[e],i=o.product.id;r.preventDefault(),o.store.dispatch(Ho({count:1,next:null,previous:null,results:[{order:"24d50352579511ea806cbc764e100cfd",offer:null,subscription:"8a076b7a0ea011e7a5bcbc764e105eda",product:i,components:[],quantity:1,public_id:"24d6901e579511ea806cbc764e100cfd",product_attribute:null,price:"14.99",extra_cost:"0.00",total_price:"13.49",one_time:!1,frozen:!1,first_placed:null}]})),this.runTests()}}render(){return d`
      <div>
        ${this.testsRan?this.resultsCodeBlock():d`
              <div>Click the button to run tests</div>
            `}
        <button ?disabled=${this.disabled} @click="${this.runTests.bind(this)}" class="primary">Run Test</button>
      </div>
    `}};n(Qt,"TestWizard");function _n(){let t="og-test-wizard";customElements.get(t)||customElements.define(t,Qt);let e=document.createElement(t);document.body.appendChild(e)}n(_n,"default");var En=[79,71,68,69,86],Ha=n(()=>{if(window.OG_OFFERS_TEST_MODE_ENABLE)return;window.OG_OFFERS_TEST_MODE_ENABLE=!0;let t=0;document.addEventListener("keyup",async function(e){if(e.which===En[t]){let o=En[t];setTimeout(function(){t<=o&&(t=0)},5e3),t+=1,t>=En.length&&_n()}else t=0},!1)},"enable");var yo=class extends C(W){static get properties(){return{...super.properties,regular:{type:Boolean,reflect:!0},subscription:{type:Boolean,reflect:!0},discount:{type:Boolean,reflect:!0},payAsYouGo:{type:Boolean,reflect:!0,attribute:"pay-as-you-go"},frequency:{type:Object},productPlans:{type:Object},discountedProductPriceFromOffers:{type:Object}}}static get styles(){return b`
      :host::before {
        clip-path: inset(100%);
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      :host([subscription])::before {
        content: 'Discounted subscription price';
      }

      :host([regular])::before {
        content: 'Regular price';
      }
    `}get value(){var l,p;let e=S(this.product),r=this.frequency||this.configDefaultFrequency||((l=this.offer)==null?void 0:l.defaultFrequency),o=this.productPlans[e]||[],i=this.payAsYouGo?o.find(u=>u.prepaidShipments===null||u.prepaidShipments===void 0):o.find(u=>u.frequency===r);if(!i)return"";let{regularPrice:s,discountRate:a,subscriptionPrice:c}=i;return(i.hasPriceAdjustments===!1||((p=this.offer)==null?void 0:p.overrideSellingPlanPrice))&&!i.prepaidShipments&&({regularPrice:s,discountRate:a,subscriptionPrice:c}=this.discountedProductPriceFromOffers),c===s&&!this.payAsYouGo?"":this.regular?s:this.discount?a:c}render(){let e=this.value;return e?d`
        <slot name="prepend"></slot>
        ${e}
        <slot name="append"></slot>
      `:d`
      <slot name="fallback"></slot>
    `}};n(yo,"Price");var Qp=n((t,e)=>{var r,o;return{productPlans:t.productPlans,configDefaultFrequency:ie((r=e.product)==null?void 0:r.id)(t),frequency:ne(e.product)(t),discountedProductPriceFromOffers:ji((o=e.product)==null?void 0:o.id)(t)}},"mapStateToProps"),Ba=m(Qp)(yo);function xn(t){Ha(),ks(t);try{customElements.define("og-when",fa),customElements.define("og-text",Pa),customElements.define("og-incentive-text",wa),customElements.define("og-benefit-messages",Aa),customElements.define("og-offer",La),customElements.define("og-select-frequency",Ia),customElements.define("og-optout-button",ya),customElements.define("og-optin-toggle",xa),customElements.define("og-optin-status",ma),customElements.define("og-optin-button",ga),customElements.define("og-optin-select",Sa),customElements.define("og-upsell-button",_a),customElements.define("og-frequency-status",ba),customElements.define("og-modal",Yt),customElements.define("og-select",Jt),customElements.define("og-tooltip",Kt),customElements.define("og-upsell-modal",Ea),customElements.define("og-next-upcoming-order",ka),customElements.define("og-price",Ba),customElements.define("og-prepaid-toggle",Ma),customElements.define("og-prepaid-data",$a),customElements.define("og-prepaid-button",Va),customElements.define("og-prepaid-select",ja),customElements.define("og-subscription-button",Ga)}catch{console.info("OG WebComponents already registered, skipping.")}let e=!1,r={store:t,isReady:()=>e,setEnvironment(o){return t.dispatch(Xi(o)),this},setMerchantId(o){return t.dispatch(Ki(o)),this},setAuthUrl(o){return t.dispatch(Qi(o)),this},receiveMerchantSettings(o){return t.dispatch(ls(o)),this},getProductsForPurchasePost(o=[]){return Ko(t.getState(),o)},getOptins(o=[]){return Ko(t.getState(),o)},clear(){t.dispatch(rs())},addOptinChangedCallback(o){typeof o=="function"&&document.addEventListener("optin-changed",i=>o(i.detail))},disableOptinChangedCallbacks(){document.addEventListener("optin-changed",o=>o.stopPropagation(),!0)},register(){},previewMode(o){return window.og=window.og||{},o===!1?delete window.og:(window.og.previewMode=!0,console.log("OG Offers preview mode enabled")),this},config(o){return t.dispatch(ns(o)),this},setLocale(o){return t.dispatch(os(o)),this},setBenefitMessages(o){return t.dispatch(st(o)),this},addTemplate(o,i,s){return t.dispatch(is(o,i,s)),this},setTemplates(o){return t.dispatch(ss(o)),this},setPublicPath(o){return this},resolveSettings(o,i,s,a=t){if(!I.shopify_selling_plans&&o&&i&&s){let c=[];s.product?c.push(s.product):s.cart&&Array.isArray(s.cart.products)&&(c=c.concat(s.cart.products));let l=a.getState(),{sessionId:p}=l;p&&c.forEach(u=>a.dispatch(Bo(u))),s.product_discounts&&typeof s.product_discounts=="object"&&a.dispatch({type:Je,payload:s.product_discounts})}},initialize(o,i,s,a={}){var l;e&&console.warn("og.offers has been initialized already. Skipping.");let c=t.getState();return o&&o!==c.merchantId&&r.setMerchantId(o),i&&i!==((l=c.environment)==null?void 0:l.name)&&r.setEnvironment(i),r.receiveMerchantSettings(a),s&&r.setAuthUrl(s),e||r.resolveSettings(o,i,window.og_settings,t),e=!0,this}};return window.OG=window.OG||{},Object.assign(window.OG,r),Object.assign(r.initialize,r),Jo(window.opener,r),r}n(xn,"makeApi");var bo=n((t=[],e)=>{switch(e.type){case me:return[];case we:return e.newValue?e.newValue.optedin:t;case A:case q:{let[{prepaidShipments:r,...o},i]=nt(t,e.payload.product);return i.concat({...o,...e.payload.product,frequency:e.payload.frequency})}case pe:{let{payload:r}=e,[{prepaidShipments:o,...i},s]=nt(t,r.product),a={...i,...r.product};return r.prepaidShipments&&(a.prepaidShipments=r.prepaidShipments),s.concat(a)}case D:return t.filter(r=>!N(e.payload.product,r));case xt:return t.map(r=>N(e.payload.product,r)?{...r,...e.payload.newProduct}:r);case lr:return t.filter(r=>!N(e.payload.product,r));case Ye:return[];default:return t}},"optedin"),Pn=n((t=[],e)=>{switch(e.type){case me:return[];case we:return e.newValue?e.newValue.optedout:t;case A:case q:return t.filter(r=>!N(e.payload.product,r));case D:{let[r,o]=nt(t,e.payload.product);return o.concat({...r,...e.payload.product,frequency:e.payload.frequency})}case xt:return t.map(r=>N(e.payload.product,r)?{...r,...e.payload.newProduct}:r);case Ye:return[];default:return t}},"optedout"),On=n((t={},{type:e,payload:r})=>{switch(e){case ir:return r&&r.count>0?{...t,...r.results[0]&&{...r.results[0],place:new Date(Date.parse(r.results[0].place.replace(/-/gi,"/")))}}:t;case sr:return{...t,products:(r.results||[]).map(o=>o.product)};case cr:return{...t,...r,public_id:r.order,...r.product&&{products:(t.products||[]).concat(r.product)}};default:return t}},"nextUpcomingOrder"),Zp=n((t={},e)=>{switch(e.type){case T:return{...t,...e.payload.autoship};default:return t}},"autoshipEligible"),Xp=n((t={},e)=>{switch(e.type){case L:return{...t};case T:return{...t,...e.payload.in_stock};default:return t}},"inStock"),vn=n((t={},e)=>{switch(e.type){case T:return{...t,...e.payload.eligibility_groups};default:return t}},"eligibilityGroups"),za=n((t,e,r)=>t.map(o=>{let i=r==null?void 0:r[o];return{...e[o],...i?{enhanced:!0,criteria:i.criteria?i.criteria:{node_type:"PREMISE",standard:ye.PROGRAM_WIDE,premise_value:null},threshold_field:i.threshold_field,threshold_value:i.threshold_value}:{},id:[o][0]}}),"mapIncentive"),Tn=n((t={},e)=>{switch(e.type){case T:return{...t,...[...new Set(Object.keys(e.payload.incentives||{}))].reduce((r,o)=>({...r,[o]:Object.entries(e.payload.incentives).filter(([i])=>i===o).reduce((i,[,{initial:s,ongoing:a}])=>({...i,initial:[...i.initial||[],...za(s,e.payload.incentives_display,e.payload.incentives_display_enhanced)],ongoing:[...i.ongoing||[],...za(a,e.payload.incentives_display,e.payload.incentives_display_enhanced)]}),{})}),{})};default:return t}},"incentives"),eu=n((t={},e)=>{switch(e.type){case A:case q:return{...t,[S(e.payload.product)]:e.payload.frequency};case D:return{...t,[S(e.payload.product)]:void 0};default:return t}},"frequency"),wn=n((t=!1,e)=>{switch(e.type){case nr:return{...e.payload};case Te:return!1;default:return t}},"auth"),Cn=n((t="",e)=>{switch(e.type){case Ve:return e.payload;default:return t}},"merchantId"),Rn=n((t=null,e)=>{switch(e.type){case or:return e.payload;default:return t}},"authUrl"),tu=n((t={},e)=>{switch(e.type){case T:return{...t,offerId:(e.payload.module_view||{}).regular,...e.payload.modifiers};default:return t}},"offer"),An=n((t="",e)=>{switch(e.type){case T:return(e.payload.module_view||{}).regular||"";default:return t}},"offerId"),In=n((t=null,e)=>{switch(e.type){case me:return null;case je:return e.payload;default:return t}},"sessionId"),ru=n((t={},e)=>{switch(e.type){case T:return{...t,...Object.entries(e.payload.autoship).map(([r])=>({[r]:Object.keys(e.payload.modifiers)})).reduce((r,o)=>({...r,...o}),{})};case Ye:return{};default:return t}},"productOffer"),Nn=n((t={},e)=>{switch(e.type){case hr:return{...t,[S(e.payload.product)]:e.payload.firstOrderPlaceDate};default:return t}},"firstOrderPlaceDate"),kn=n((t={},e)=>{switch(e.type){case mr:return{...t,[S(e.payload.product)]:e.payload.productToSubscribe};default:return t}},"productToSubscribe"),Fn=n((t={},e)=>{switch(e.type){case Ge:return{...t,name:"local",apiUrl:"http://py3web.ordergroove.localhost",legoUrl:"http://py3lego.ordergroove.localhost"};case He:return{...t,name:Ce,apiUrl:"https://staging.offers.ordergroove.com",legoUrl:"https://staging.restapi.ordergroove.com"};case Be:return{...t,name:gr,apiUrl:"https://dev.offers.ordergroove.com",legoUrl:"https://dev.restapi.ordergroove.com"};case ze:return{...t,name:Re,apiUrl:"https://offers.ordergroove.com",legoUrl:"https://restapi.ordergroove.com"};default:return t}},"environment"),Dn=n((t={offerOptInLabel:"Subscribe to save",offerIncentiveText:"Save {{ogIncentive DiscountPercent}} when you subscribe",offerOptOutLabel:"Deliver one-time only",offerEveryLabel:"Delivery Every",offerTooltipTrigger:"[?]",offerTooltipContent:"Seems this is a great subscription offering. Many fun details about this program exist.",optinButtonLabel:"\u2022",optoutButtonLabel:"\u2022",optinStatusOptedInLabel:"You're opted in!",optinStatusOptedOutLabel:"You're not opted in.",optinToggleLabel:"\u2022",upsellButtonLabel:"Add item to order on ",upsellButtonPrefix:"",upsellModalContent:"Some upsell modal content",upsellModalOptInLabel:"Subscribe",upsellModalOptOutLabel:"Purchase one time",upsellModalTitle:"Impulse Upsell",upsellModalConfirmLabel:"Ok",upsellModalCancelLabel:"Cancel",defaultFrequencyCopy:"(Most Popular)",frequencyPeriods:{1:"day",2:"week",3:"month"},prepaidOptInLabel:"Prepaid Subscription",prepaidShipmentsLabel:"Number of prepaid shipments"},e)=>{switch(e.type){case pr:return{...t,...e.payload};default:return t}},"locale"),ou=n((t={offerType:"radio"},e)=>{switch(e.type){case We:return{...t,...e.payload,defaultFrequency:e.payload.defaultFrequency?At(e.payload.defaultFrequency):t.defaultFrequency,frequenciesEveryPeriod:[],frequencies:e.payload.frequencies?e.payload.frequencies.map(At):t.frequencies};case ue:return{...t,merchantSettings:{...e.payload}};default:return t}},"config"),qn=n((t=!1,e)=>{switch(e.type){case he:return e.payload.isPreview;default:return t}},"previewStandardOffer"),Un=n((t=!1,e)=>{switch(e.type){case Ot:return e.payload.isPreview;default:return t}},"previewUpsellOffer");var Ln=n((t={},e)=>{switch(e.type){case T:return{...t,...e.payload.autoship_by_default};default:return t}},"autoshipByDefault"),Mn=n((t=[],e)=>{switch(e.type){case T:return{...t,...e.payload.default_frequencies};default:return t}},"defaultFrequencies"),$n=n((t=[],e)=>{switch(e.type){case fr:return[...e.payload||[]];case dr:return[e.payload,...t];default:return t}},"templates"),nu=n((t={},e)=>{switch(e.type){case Je:return jr(e.payload);default:return t}},"productPlans"),Vn=n((t={},e)=>{switch(e.type){case Pt:{let{[e.payload.oldCartProductKey]:r,...o}=t;return{...o,[e.payload.newCartProductKey]:r}}case pe:return e.payload.prepaidShipments?{...t,[e.payload.product.id]:e.payload.prepaidShipments}:t;default:return t}},"prepaidShipmentsSelected"),iu=n((t={},e)=>t,"price"),jn=n((t={},e)=>{switch(e.type){case ur:return{...e.payload||{}};default:return t}},"benefitMessages"),So=Xt({optedin:bo,optedout:Pn,nextUpcomingOrder:On,autoshipEligible:Zp,inStock:Xp,eligibilityGroups:vn,incentives:Tn,frequency:eu,auth:wn,merchantId:Cn,authUrl:Rn,offer:tu,offerId:An,experiments:Mr,sessionId:In,productOffer:ru,firstOrderPlaceDate:Nn,productToSubscribe:kn,environment:Fn,locale:Dn,config:ou,previewStandardOffer:qn,previewUpsellOffer:Un,autoshipByDefault:Ln,defaultFrequencies:Mn,templates:$n,productPlans:nu,prepaidShipmentsSelected:Vn,price:iu,benefitMessages:jn});var _o=n(t=>{var e,r;return Array.isArray((e=t.selling_plan)==null?void 0:e.options)&&((r=t.selling_plan)==null?void 0:r.options.some(o=>(o==null?void 0:o.name)==="Shipment amount"))},"isPrepaidAllocation"),Eo=n(t=>{if(t&&t.length>1){let e=t.find(r=>(r==null?void 0:r.name)==="Shipment amount").value.split(" ");return e.length>0?+e[0]:null}return null},"getPrepaidShipmentsNumberFromOptions"),su=n(t=>{var e,r;return(t.selling_plan_id||((r=(e=t.selling_plan)==null?void 0:e.id)!=null?r:"")).toString()},"getAllocationFrequency"),au=n((t,e)=>M(t.compare_at_price,e),"getAllocationRegularPrice"),cu=n((t,e)=>{var r;if(_o(t)){let o=Eo((r=t.selling_plan)==null?void 0:r.options),i=Math.round(t.price/o);return M(i,e)}return M(t.price,e)},"getAllocationSubscriptionPrice"),Ya=n((t,e)=>Math.round((t.compare_at_price-e)*100/t.compare_at_price),"getPrepaidPercentage"),lu=n((t,e)=>{var o,i,s;if(_o(t)){let a=Eo((o=t.selling_plan)==null?void 0:o.options),c=t.price/a,l=Ya(t,c);return et(l)}let r="";return((i=t.price_adjustments[0])==null?void 0:i.value_type)==="percentage"?r=et(t.price_adjustments[0].value):(s=t.price_adjustments[0])!=null&&s.value?r=M(t.price_adjustments[0].value,e):t.compare_at_price&&(r=M(t.compare_at_price-t.price,e)),r},"getAllocationDiscountRate"),pu=n(t=>{var e;return _o(t)?Eo((e=t.selling_plan)==null?void 0:e.options):null},"getAllocationNumberOfShipments"),uu=n((t,e,r,o)=>{var u,f;let i=Eo((u=t.selling_plan)==null?void 0:u.options),s=t.price/i,a=t.compare_at_price-s,c=Ya(t,s),l=(f=r==null?void 0:r.price_adjustments)==null?void 0:f[0],p=l&&l.value_type==="percentage"?l.value:null;return e.regularPrepaidPrice=M(t.price,o),e.prepaidSavingsPerShipment=M(Math.round(a),o),e.prepaidSavingsTotal=M(Math.round(a*i),o),p&&c&&(e.prepaidExtraSavingsPercentage=et(c-p)),e},"addPrepaidPriceAndSavings"),du=n((t,e,r)=>{var i;t.selling_plan||(t.selling_plan=e.find(s=>s.id===t.selling_plan_id));let o={frequency:su(t),regularPrice:au(t,r),subscriptionPrice:cu(t,r),discountRate:lu(t,r),prepaidShipments:pu(t),hasPriceAdjustments:((i=t.price_adjustments)==null?void 0:i.length)>0};if(_o(t)){let s=Ui(e);return uu(t,o,s,r)}return o},"mapSellingPlanToDiscount"),Gn=n((t,e,r=[],o)=>[...t,du(e,r,o)],"sellingPlanAllocationsReducer"),Wa=n(t=>t.selling_plan_groups.reduce((e,r)=>[...e,...r.selling_plans.map(o=>({...o,group:r}))],[]),"getSellingPlans");var fu=n((t={offerType:"radio",productFrequencies:{},frequencies:[],frequenciesEveryPeriod:[]},e)=>{var r;if(U===e.type){let{payload:{product:o,currency:i}}=e,s={},a=(r=o.variants)==null?void 0:r.reduce((p,u)=>mu(p,u,o.selling_plan_groups,t),{}),c={...t.productFrequencies,...a};s={...s,productFrequencies:c,...Object.values(c)[0]};let l=Hn(o);return Object.keys(l).length&&(s={...s,prepaidSellingPlans:{...t.prepaidSellingPlans,...l}}),{...t,...s,storeCurrency:i}}if(T===e.type){let{payload:{offer:o}}=e,{defaultFrequency:i,product:s}=o||{},{prepaidSellingPlans:a={}}=t,c=S(s==null?void 0:s.id),l=t.productFrequencies[c],p={...t.productFrequencies,[c]:{...l,defaultFrequency:gu(c,i,a,l==null?void 0:l.frequencies,l==null?void 0:l.frequenciesEveryPeriod)}};return{...t,productFrequencies:p,...Object.values(p)[0]}}return ue===e.type?{...t,merchantSettings:{...e.payload}}:t},"config");function hu(t,e){var i,s;let r=Nt(t),o=vr(r);if(o!=null&&o.length){let a=Tr(r),c=((s=(i=r.options)==null?void 0:i[0])==null?void 0:s.values)||o,l=e==null?void 0:e.defaultFrequency;return l&&Ne(l)&&(l=Z(o,a,l)||de(o)||l),{frequencies:o,frequenciesEveryPeriod:a,frequenciesText:c,...l?{defaultFrequency:l}:{}}}return null}n(hu,"getFrequencies");function mu(t,e,r,o){let i=e.selling_plan_allocations.map(c=>c.selling_plan_group_id),s=r.filter(c=>i.includes(c.id)),a=hu(s,o.productFrequencies[e.id]);return a&&(t[e.id]=a),t}n(mu,"reduceSellingPlansToFrequencies");function gu(t,e,r,o=[],i=[]){var s;return(s=r[t])!=null&&s.some(({sellingPlan:a})=>a===e)?de(o)||e:Ne(e)&&(Z(o,i,e)||de(o))||e}n(gu,"getUpdatedDefaultFrequency");function Hn(t){let e=t==null?void 0:t.selling_plan_groups.filter(r=>/^Prepaid-.*/.test(r.name));return e.length?e.reduce((r,o)=>{let i=o.name.split("-")[1],s=o.selling_plans.map(a=>({numberShipments:wr(a),sellingPlan:String(a.id)}));return{...r,[i]:s}},{}):{}}n(Hn,"getPrepaidSellingPlans");var Ja=fu;var Qa=n((t,e,r)=>{let o=Object.keys(t).filter(i=>i.startsWith(e.toString()));return o.length?{...t,...o.reduce((i,s)=>({...i,[s]:r}),{})}:t},"overrideLineKey"),Ka=n((t,e,r)=>{if(!r)return null;if(!Ne(r))return r;if(Ir(t,e)){let o=Z(t,e,r);return o||de(t)}return r},"getDefaultSellingPlan"),yu=n((t,e,r)=>t.map(o=>Ne(o==null?void 0:o.frequency)?{...o,frequency:Ir(r==null?void 0:r.frequencies,r==null?void 0:r.frequenciesEveryPeriod)?Z(r==null?void 0:r.frequencies,r==null?void 0:r.frequenciesEveryPeriod,o.frequency)||Z(r==null?void 0:r.frequencies,r==null?void 0:r.frequenciesEveryPeriod,e==null?void 0:e.defaultFrequency)||de(r==null?void 0:r.frequencies):o.frequency}:o),"mapExistingOptinsFromOfferResponse"),bu=n(({autoship:t={},autoship_by_default:e={},default_frequencies:r={},in_stock:o={},eligibility_groups:i={}},s,a,c,l)=>Object.keys(t).reduce((p,u)=>{var f;if(!s.some(h=>h.id===u)&&e[u]&&o[u]){if(t[u])return p.concat({id:u,frequency:Su({frequencyConfig:c,offerEl:a,default_frequencies:r,id:u})});if((f=i[u])!=null&&f.includes(Sr.PREPAID)){let h=l?kt(l):null;return p.concat({id:u,frequency:(h==null?void 0:h.sellingPlan)||Bn,prepaidShipments:(h==null?void 0:h.numberShipments)||null})}}return p},[]),"reduceNewOptinsFromOfferResponse"),Su=n(({frequencyConfig:t,offerEl:e,default_frequencies:r,id:o})=>{let{frequencies:i,frequenciesEveryPeriod:s}=t,{defaultFrequency:a}=e||{},c=r[o],l;return r[o]&&Ir(i,s)?l=Z(i,s,`${c.every}_${c.every_period}`)||Ka(i,s,a)||de(i):r[o]?l=`${c.every}_${c.every_period}`:l=Ka(i,s,a)||"_",l},"getOptInDefaultFrequency"),_u=n((t,e)=>({...Qa(t,e.id,e.available),[e.id]:e.available}),"productOrVariantInStockReducer"),Za=n((t,e)=>{let r=S(e.key);return{...t,[e.key]:t[r]||null}},"reduceProductCartLine"),Eu=n((t={},e)=>{var r;if(ge===e.type){let{payload:o}=e;return o.items.reduce(Za,t)}if(U===e.type){let{payload:{product:o}}=e,i=Fi(o==null?void 0:o.selling_plan_groups),s=new Set((r=i.flatMap(a=>a.selling_plans.map(c=>c.id)))!=null?r:[]);return o.variants.reduce((a,c)=>{var u,f;let p=((f=(u=c==null?void 0:c.selling_plan_allocations)==null?void 0:u.filter(h=>s.has(h.selling_plan_id)))!=null?f:[]).length>0;return{...Qa(a,c.id,p),[c.id]:p}},t)}return he===e.type?e.payload.isPreview!==!0?t:{...t,[e.payload.productId]:!0}:t},"autoshipEligible"),xu=n((t={},e)=>{var r;if(ge===e.type)return e.payload.items.reduce(Za,t);if(U===e.type){let{payload:{product:o}}=e;return[o,...(r=o==null?void 0:o.variants)!=null?r:[]].reduce(_u,t)||t}return L===e.type&&e.payload.product===null?{...t}:he===e.type?e.payload.isPreview!==!0?t:{...t,[e.payload.productId]:!0}:t},"inStock"),Pu=n((t={},e)=>t,"offer");function Ou(t){let e=wr(t.selling_plan_allocation.selling_plan),r={id:t.key,frequency:`${t.selling_plan_allocation.selling_plan.id}`};return e&&(r.prepaidShipments=e),r}n(Ou,"getOptedInItem");var Bn="prepaid-replace-me",vu=n((t=[],e)=>{if(ge===e.type){let r=e.payload;return t.filter(o=>!o.id.includes(":")).concat(r.items.reduce((o,i)=>i.selling_plan_allocation?[...o,Ou(i)]:o,[]))}if(T===e.type){let r=e.payload,{offer:o={},frequencyConfig:i,prepaidSellingPlans:s}=r,a=yu(t,o,i),c=bu(r,a,o,i,s);return[...a,...c]}if(U===e.type){let{product:r}=e.payload,o=Nt(r==null?void 0:r.selling_plan_groups),i=Hn(r),s=o?vr(o):[],a=o?Tr(o):[];return t.map(c=>{let l=i[c.id];if(o&&Ne(c.frequency))return{...c,frequency:Z(s,a,c.frequency)||de(s)};if(c.frequency===Bn&&(l==null?void 0:l.length)>0){let{sellingPlan:p,numberShipments:u}=kt(l);return{...c,frequency:p,prepaidShipments:u}}return c}).filter(c=>c.frequency!==Bn)}if(pe===e.type){let{payload:r}=e,o=bo(t,e),[i,s]=nt(o,r.product);return s.concat({...i,...r.product,frequency:r.frequency})}return bo(t,e)},"optedin"),Tu=n((t={},e)=>{var r;if(U===e.type){let{payload:{product:o}}=e;return((r=o.variants)==null?void 0:r.reduce((i,s)=>({...i,[s.id]:{value:s.price}}),t))||t}return t},"price"),wu=n((t={},e)=>t,"productOffer"),Cu=n((t={},e)=>{if(U===e.type){let{payload:{product:r,currency:o}}=e,i=Wa(r);return r.variants.reduce((s,a)=>{var c;return{...s,[a.id]:(c=a.selling_plan_allocations)==null?void 0:c.reduce((l,p)=>Gn(l,p,i,o),[])}},t)||t}if(ge===e.type){let r=e.payload;return r.items.reduce((o,i)=>i.selling_plan_allocation?{...o,[i.key]:Gn([],i.selling_plan_allocation,[],r.currency)}:o,t)||t}return t},"productPlans"),Ru=Xt({auth:wn,authUrl:Rn,autoshipByDefault:Ln,autoshipEligible:Eu,config:Ja,defaultFrequencies:Mn,eligibilityGroups:vn,environment:Fn,firstOrderPlaceDate:Nn,incentives:Tn,inStock:xu,locale:Dn,merchantId:Cn,nextUpcomingOrder:On,offer:Pu,offerId:An,experiments:Mr,optedin:vu,optedout:Pn,previewStandardOffer:qn,previewUpsellOffer:Un,price:Tu,productOffer:wu,productPlans:Cu,productToSubscribe:kn,sessionId:In,templates:$n,prepaidShipmentsSelected:Vn,benefitMessages:jn});function zn(t,e){return window.og&&window.og.previewMode?So(t,e):Ru(t,e)}n(zn,"shopifyReducer");var rc=le(Tt()),oc=le(tr());function Xa(t,e,r){let o=`[name="id"][value="${t}"]`,i=`form[action="/cart/add"] option[value="${t}"]`;if(!e)return;let s=document.querySelectorAll(o);s.length||(s=document.querySelectorAll(i)),[...s].forEach(a=>{let c=a.form,l=c==null?void 0:c.querySelector(`[name="${e}"]`);l||(l=document.createElement("input"),l.type="hidden",l.name=`attributes[${e}]`,c==null||c.appendChild(l)),l.value=r})}n(Xa,"updateTrackingInputs");function Yn(){return`og__${Math.ceil(new Date().getTime()/1e3)}`}n(Yn,"getTrackingKey");function Au(t,e){var u,f,h,w;if(!((u=t.payload.offer)==null?void 0:u.autoshipByDefault))return;let o=(f=t.payload.offer)==null?void 0:f.product.id,i=Yn(),s=((h=t.payload.offer)==null?void 0:h.location)||"",a=((w=t.payload.offer)==null?void 0:w.variationId)||"",c=xo(o,e),p=[o,A.toLowerCase(),s,c,a].join(",");Xa(o,i,p)}n(Au,"addDefaultToSubTracking");function Wn(t){return e=>r=>{switch(e(r),r.type){case A:case D:case q:{let o=r.payload.offer,i=Jn(r);o&&!o.isCart&&Xa(o.product.id,i[0],i[1]);break}case T:Au(r,t);break;default:}}}n(Wn,"shopifyTrackingMiddleware");var ec,tc,Po=((tc=(ec=window.Shopify)==null?void 0:ec.routes)==null?void 0:tc.root)||"/",Iu="/cart",Nu=`${Po}cart.js`,ku=`${Po}cart/change.js`,Fu=`${Po}cart/update.js`,Du=`${Po}products/`,nc="__ordergroove_offer_id",qu='[id^="shopify-section-"][id$=__cart-items], [id^="shopify-section-"][id$="__cart-footer"],#cart-live-region-text,#cart-icon-bubble',Uu=n(t=>(0,oc.debounce)(100,!1,function(e){let{id:r}=Object.fromEntries([...new FormData(e).entries()]);r?t.setAttribute("product",r):t.removeAttribute("product")}),"makeSyncProductId");async function Lu(){var r,o;let t=(o=(r=window.Shopify)==null?void 0:r.currency)==null?void 0:o.active;return t||(await Kn()).currency}n(Lu,"getCurrency");async function Mu(t,e){let r=$u(e);if(r)try{let[i,s]=await Promise.all([ic(r),Lu()]),a={product:i,offer:e,currency:s};t.dispatch({type:U,payload:a})}catch(i){console.warn("OG: Unable to fetch product details for PDP",i)}let o=e.closest("form");if(!o){let i=e.parentElement;for(;i&&(o=i.querySelector('form[action$="/cart/add"]'),!(o||i.tagName.toLowerCase()==="body"));)i=i.parentElement}if(o){let i=Uu(e);o.addEventListener("change",()=>i(o)),new MutationObserver(a=>{a.every(c=>c.type==="attributes")?a.some(c=>c.target.name==="id")&&i(o):i(o)}).observe(o,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["value"]})}else console.info("no /cart/add form found for og-offer",e)}n(Mu,"setupPdp");async function Kn(){return(await fetch(Nu)).json()}n(Kn,"getCart");function $u(t){return[()=>t==null?void 0:t.dataset.shopifyProductHandle,()=>{var e,r;return(((r=(e=document.querySelector('[href$=".oembed"]'))==null?void 0:e.getAttribute("href"))==null?void 0:r.match(/\/([^/]+)\.oembed$/))||[])[1]},()=>{var e,r;return(document.querySelector('meta[property="og:type"][content="product"]')&&((r=(e=document.querySelector('meta[property="og:url"][content]'))==null?void 0:e.getAttribute("content"))==null?void 0:r.match(/\/([^/]+)$/))||[])[1]},()=>{var e;return(e=[...document.querySelectorAll("[type$=json]")].map(r=>JSON.parse(r.textContent||"{}")).find(r=>r.handle&&r.price))==null?void 0:e.handle}].reduce((e,r)=>e||r(),"")}n($u,"guessProductHandle");var ic=(0,rc.default)(async function(t){return(await fetch(`${Du}${t}.js`)).json()});async function Vu(t,e){let r=await Kn(),{items:o}=r,i=r;t.dispatch({type:ge,payload:i});let s=Number(e.product.id);s<=o.length&&e.setAttribute("product",o[s-1].key),(await Promise.all(Array.from(new Set(o.map(({handle:c})=>c))).map(ic))).forEach(c=>{let l={product:c,offer:e,currency:r.currency};t.dispatch({type:U,payload:l})})}n(Vu,"setupCart");async function ju(t,e){var s,a;let r=t.payload.offer,o=t.payload.frequency||xo(t.payload.product.id,e),i=Jn(t);if(!!(r!=null&&r.isCart))try{r.style.pointerEvents="none",r.style.opacity=".7";let c=Array.from(document.querySelectorAll(qu)),l=t.payload.product.id,p=await Kn(),u=(s=p==null?void 0:p.items)==null?void 0:s.findIndex(F=>F.key===l),f=p.items[u],h=f.quantity,w=S(l),P=sc(e),g={...Object.fromEntries([i]),...P?{[nc]:P}:{}};if(Object.keys(g).length>0&&(await fetch(Fu,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({attributes:g})})).status!==200)throw new Error("Cart attributes not updated");let O=await fetch(ku,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:l,quantity:h,properties:f.properties,selling_plan:o||null,sections:c.map(F=>F.id.replace(/^shopify-section-/,""))})});if(O.status!==200)throw new Error("Cart not updated");let E=await O.json(),y=p.items.length===E.items.length?E.items[u].key:(a=E.items.find(F=>F.quantity===h&&F.product_id===w&&(!o&&!F.selling_plan_allocation||(F==null?void 0:F.selling_plan_allocation.selling_plan.id)===o)))==null?void 0:a.key;y&&(e.dispatch({type:Pt,payload:{oldCartProductKey:l,newCartProductKey:y}}),r.setAttribute("product",y));let v=E;e.dispatch({type:ge,payload:v});let Zt=new CustomEvent(Ei,{bubbles:!0,cancelable:!0});if(r.dispatchEvent(Zt),Zt.defaultPrevented)return;let Oo=E.sections;Object.values(Oo).length?c.forEach(F=>{let Zn=F.id.replace(/^shopify-section-/,"");if(!(Zn in Oo))return;let dc=Oo[Zn],Xn=new DOMParser().parseFromString(dc.toString()||"","text/html").getElementById(F.id);Xn&&(F.innerHTML=Xn.innerHTML)}):window.location.pathname.startsWith(Iu)&&window.location.reload()}catch(c){console.log("OG Error updating cart",c)}finally{r.style.pointerEvents="auto",r.style.opacity="1"}}n(ju,"synchronizeCartOptin");function Jn(t){var a,c;let e=t.payload.product.id;if(!e)return[];let r=Yn(),o=((a=t.payload.offer)==null?void 0:a.location)||"",i=((c=t.payload.offer)==null?void 0:c.variationId)||"",s=[e,t.type.toLowerCase(),o];switch(t.type){case L:case D:s.push(""),s.push(i);break;case A:case q:s.push(t.payload.frequency),s.push(i);break;default:return[]}return[r,s.join(",")]}n(Jn,"getTrackingEvent");function xo(t,e){let o=Cr({id:t})(e.getState());return o?o.frequency:void 0}n(xo,"getSubscribedFrequency");function sc(t){let e=t.getState();return Gi(e)?e.offerId:null}n(sc,"getOfferIdAttribute");function Gu(t,e){e!=null&&e.isCart||!(e!=null&&e.shouldEnableOffer)||[...document.querySelectorAll('form[action$="/cart/add"] [name=id]')].forEach(r=>{let o=r.value,i=xo(o,t);Nr(r.form,"selling_plan",i),Nr(r.form,"attributes[og__session]",t.getState().sessionId);let s=sc(t);s&&Nr(r.form,`attributes[${nc}]`,s)})}n(Gu,"synchronizeSellingPlan");function Qn(t){return e=>r=>{var o;switch(r.type){case A:case D:case q:break;case L:(o=r.payload.offer)!=null&&o.isCart?Vu(t,r.payload.offer):Mu(t,r.payload.offer);break;default:}switch(e(r),r.type){case A:case D:case q:case pe:ju(r,t);case L:case T:case U:Gu(t,r.payload.offer);break;default:}}}n(Qn,"shopifyMiddleware");var Hu="/apps/subscriptions/auth/",ac="og_auth_begin",Bu="og_auth_end",zu=n(t=>{let[e,r,o,i]=atob(t).split("|");return{id:e,signature:o,timestamp:r,email:i}},"parseIntegrationTempAuth");async function cc({store:t}){var i;let[e]=Vo(),r=It(),o=r!=null&&r.dataset.customer?zu(r.dataset.customer):(i=window.ogShopifyConfig)==null?void 0:i.customer;if(o){let s=await Wu(o);if(s){let[a,c,l]=s.split("|");t.dispatch(qt(e,a,Number(c),l))}}else Yi("og_auth"),t.dispatch(se("No customer found"))}n(cc,"authorizeShopifyCustomer");async function Yu(t){try{let r=await(await fetch(`${Hu}?customer=${t.id}&customer_signature=${t.signature}&customer_timestamp=${t.timestamp}`)).text(),o=r.lastIndexOf(ac);if(o<0)throw"Invalid response from OG auth endpoint";return JSON.parse(r.substring(o+ac.length,r.lastIndexOf(Bu)))}catch(e){console.error(e)}}n(Yu,"fetchOGSignature");async function Wu(t){let e=Wi("og_auth");if(e)return e;let{customerId:r,timestamp:o,signature:i}=await Yu(t);if(!r)return"";let s=new Date,a=btoa(i);s.setTime(s.getTime()+2*60*60*1e3);let c=`${r}|${o}|${a}`;return document.cookie=`og_auth=${c};expires=${s.toUTCString()};secure;path=/`,c}n(Wu,"getOrCreateAuthCookie");var lc,uc=Rs(...(lc=I)!=null&&lc.shopify_selling_plans?[zn,Qn]:[So],I.shopify&&Wn),x=xn(uc),Ju=x.isReady,Ku=x.addOptinChangedCallback,Qu=x.addTemplate,Zu=x.clear,Xu=x.config,ed=x.disableOptinChangedCallbacks,td=x.getOptins,rd=x.getProductsForPurchasePost,od=x.initialize,nd=x.previewMode,id=x.register,sd=x.resolveSettings,ad=x.setAuthUrl,cd=x.setBenefitMessages,ld=x.setEnvironment,pd=x.setLocale,ud=x.setMerchantId,dd=x.setPublicPath,fd=x.setTemplates,hd=x.setupCart,md=x.setupProduct,gd=x.setupProducts,yd=n(()=>zi(x),"autoInit");var bd=x.initialize,pc;(pc=I)!=null&&pc.shopify_selling_plans&&Ar(()=>cc(x));return bc(Sd);})();
; return lib; });
//# sourceMappingURL=offers.js.map

var og=window.og||{};og.offers=og.offers||"undefined"!=typeof module&&module.exports,og.offers.initialize("7e9e3f89fff141eda37493096b1cc372","prod","",{currency_code:"USD",multicurrency_enabled:!1,round_up_totals:!1}).setTemplates([{id:"fe649254",markup:'<og-when test="regularEligible">\n    <div class="og-regular-offer-content">\n        <div class="og-offers-price-wrapper" style="display:inline-flex; justify-content: space-between;">\n            <og-optout-button>One Time Purchase</og-optout-button>\n            <div class="otp-purchase-option__price">\n              <og-price regular class="sales-price"></og-price>\n              <og-price regular class="promo-price line-through"></og-price>\n            </div>\n        </div>\n        <div class="og-offers-price-wrapper" style="display: inline-flex;  justify-content: space-between;">\n          <div class="og-purchase-options-section">\n            <og-optin-button>Subscribe to Save</og-optin-button>\n          </div>\n          <div class="subscription-purchase-option__price">\n            <og-price subscription class="promo-price"></og-price>\n            <og-price subscription class="sales-price line-through"></og-price>\n          </div>\n        </div>\n    </div>\n    <div class="optin-options">\n      <div class="og-frequency">\n        <og-text id="og-frequency-label" key="offerEveryLabel">Deliver every: </og-text>\n        <og-select-frequency default-text="- RECOMMENDED">\n          <option value="1_3" >\n            1 MONTH\n          </option>\n          <option value="2_3" >\n            2 MONTHS\n          </option>\n          <option value="3_3" >\n            3 MONTHS\n          </option>\n          <option value="4_3" >\n            4 MONTHS\n          </option>\n        </og-select-frequency>\n    </div>\n    </div>\n</og-when>',selector:'[location="cart"]'},{id:"a513d427",markup:'<og-when test="regularEligible">\n      <fieldset class="purchaseoption">\n        <legend class="sr-only">Purchase type</legend>\n        <div class="og-regular-offer-content">\n            <div class="field-wrapper purchase-option__select purchase-option__oneTime">\n                <og-optout-button>One Time Purchase</og-optout-button>\n                <div class="purchase-option__price">\n                    <og-price regular class="sales-price"></og-price>\n                    <og-price regular class="promo-price"></og-price>\n                </div>\n            </div>\n            <div class="field-wrapper purchase-option__select purchase-option__autoReplenish">\n                <div class="opt-in-purchase">\n                    <og-optin-button>Subscribe to Save</og-optin-button>\n                    <og-tooltip activation-type="manual" placement="bottom" >\n                        <span slot="trigger">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">\n                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#2B2B2B"/>\n                                <path d="M6.41379 8.08537V9.28505H5.38925V8.08537H6.41379ZM5.41552 7.22721L5.45055 7.20094C5.45055 7.04332 5.46806 6.90321 5.51185 6.77186C5.55563 6.64051 5.61693 6.51791 5.68698 6.41283C5.75703 6.30775 5.83585 6.20267 5.92341 6.10634C6.01098 6.01002 6.10731 5.9137 6.20363 5.81737L6.45758 5.56343C6.57141 5.44959 6.66774 5.31824 6.74655 5.17813C6.82536 5.03802 6.86914 4.86289 6.86914 4.64397C6.86914 4.36375 6.79033 4.14483 6.63271 3.98721C6.47509 3.82959 6.25617 3.75078 5.97595 3.75078C5.63444 3.75078 5.37174 3.82959 5.1966 3.98721C5.02147 4.14483 4.89012 4.39878 4.8113 4.74905L3.89185 4.62645C3.93563 4.39878 4.00568 4.17986 4.10201 3.9697C4.19833 3.75953 4.32968 3.57564 4.49606 3.41802C4.66244 3.2604 4.86385 3.1378 5.10904 3.05024C5.35422 2.96267 5.6432 2.91888 5.98471 2.91888C6.58893 2.91888 7.06179 3.06775 7.39455 3.36548C7.7273 3.66321 7.89368 4.04851 7.89368 4.53013C7.89368 4.81034 7.8499 5.04678 7.76233 5.23943C7.67476 5.43207 7.56968 5.59845 7.44709 5.7298L6.91293 6.26397C6.76406 6.41283 6.64147 6.57045 6.54514 6.72807C6.44882 6.8857 6.39628 7.06959 6.39628 7.27099V7.40234H5.41552V7.22721Z" fill="white"/>\n                            </svg>\n                        </span>\n                        <span slot="content">Save 10% on your favorite products and choose how often you would like to receive them. Cancel at any time.</span>\n                    </og-tooltip>\n                </div>\n                <div class="purchase-option__price">\n                  <og-price subscription class="sales-price line-through"></og-price>\n                  <og-price subscription class="promo-price"></og-price>\n                </div>\n            </div>\n        </div>\n        <div class="optin-options">\n            <div class="og-offer-incentive">\n                <svg\n                height="1em"\n                width="1em"\n                viewBox="0 0 24 24"\n                fill="none"\n                xmlns="http://www.w3.org/2000/svg"\n                >\n                    <path\n                        d="M20,8 C18.5343681,5.03213345 15.4860999,3 11.9637942,3 C7.01333514,3 3,7.02954545 3,12 M4,16 C5.4656319,18.9678666 8.51390007,21 12.0362058,21 C16.9866649,21 21,16.9704545 21,12 M9,16 L3,16 L3,22 M21,2 L21,8 L15,8"\n                        stroke="currentColor"\n                        stroke-width="2"\n                    ></path>\n                </svg>\n                <og-incentive-text from="DiscountPercent"></og-incentive-text>off , Free Shipping, and a free deluxe sample on $50+ subscription orders\n            </div>\n            <div class="option-dropdown">\n              <og-text id="og-frequency-label" key="offerEveryLabel">Delivery Every: </og-text>\n              <og-select-frequency default-text="- RECOMMENDED">\n                  <option value="1_3" >\n                      1 MONTH\n                  </option>\n                  <option value="2_3" >\n                      2 MONTHS\n                  </option>\n                  <option value="3_3" >\n                      3 MONTHS\n                  </option>\n                  <option value="4_3" >\n                      4 MONTHS\n                  </option>\n              </og-select-frequency>\n            </div>\n              <div class="optin-msg">Cancel or Manage your subscription in My Account at any time. You will automatically be charged, when your order ships, at the cadence selected above.</div>\n        </div>\n        <div class="og-cart-notification" id="ogCartNotification">\n            <div class="og-cart-notification__content">Cart Updated with Changes</div>\n        </div>\n    </fieldset>\n</og-when>',selector:'[location="pdp"]'},{id:"efdec57a",markup:'<og-when test="subscribed" class="replenishmentContainer">\n    AUTO REPLENISH: \n    <og-frequency-status></og-frequency-status>\n</og-when>',selector:'[location="mini-cart"]'},{id:"00b7b056",markup:'<og-when test="regularEligible">\n    <div class="og-quickview-widget">\n        <og-optin-select select-label="Deliver Every: ">\n            <option value="optedOut">Select Cycle</option>\n            <option value="1_3" >\n                1 MONTH\n            </option>\n            <option value="2_3" >\n                2 MONTHS\n            </option>\n            <option value="3_3" >\n                3 MONTHS\n            </option>\n            <option value="4_3" >\n                4 MONTHS\n            </option>\n        </og-optin-select>\n        <og-tooltip activation-type="manual" placement="bottom" >\n            <span slot="trigger"></span>\n            <span slot="content">Subscribe to this product and have it conveniently delivered to you at the frequency you choose. Promotion subject to change.</span>\n        </og-tooltip>\n        <div class="og-cart-notification" id="ogCartNotification">\n            <div class="og-cart-notification__content">Cart Updated with Changes</div>\n        </div>\n    </div>\n</og-when>\n<og-when test="upsellEligible">\n    <og-when test="!upcomingOrderContainsProduct">\n        Add to upcoming subscription order and receive 20% off\n        <og-upsell-button>\n            <button type="button">\n                Add to Next Order on \n                <og-next-upcoming-order format="{{month-short}} {{day}}, {{year-numeric}}">\n                    </og-nextupcoming-order>\n            </button>\n        </og-upsell-button>\n\n        <og-upsell-modal>\n            Subscribe to this product and have it conveniently delivered to you at the frequency you choose. Promotion subject to change.\n            <br />\n            <og-when test="subscriptionEligible">\n              <og-optout-button>\n                  Get one-time\n              </og-optout-button>\n              <br />\n              <og-optin-button>\n                  Subscribe and get 10% off on every order\n              </og-optin-button>\n              Deliver Every: \n              <og-select-frequency default-text="(Most Popular)">\n                <option value="1_3" >\n                  1 MONTH\n                </option>\n                <option value="2_3" >\n                  2 MONTHS\n                </option>\n                <option value="3_3" >\n                  3 MONTHS\n                </option>\n              </og-select-frequency>\n            </og-when>\n            <og-when test="!subscriptionEligible">\n              <og-next-upcoming-order format="{{month-short}} {{day}}, {{year-numeric}}">              \n            </og-when>\n            <br />\n            <span slot="confirm">\n                <button type="button">Add</button>\n            </span>\n            <span slot="cancel">\n                <button type="button">Cancel</button>\n            </span>\n        </og-upsell-modal>\n    </og-when>\n\n    <og-when test="upcomingOrderContainsProduct">\n       <og-next-upcoming-order format="{{month-short}} {{day}}, {{year-numeric}}">\n        </og-nextupcoming-order>\n    </og-when>\n</og-when>',selector:'[location="quickview"]'},{id:"8497498d",markup:'<og-when test="regularEligible">\n    <div class="og-regular-offer-content">\n        <div>\n            <og-optout-button>\n                Deliver one-time only\n            </og-optout-button>            <og-price regular></og-price>\n        </div>\n        <div>\n            <og-optin-button>\n                Subscribe to save\n            </og-optin-button>            <og-price regular class="italic line-through"></og-price>\n            <og-price subscription></og-price>\n            \n            <og-tooltip activation-type="manual" placement="bottom" >\n                <span slot="trigger"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\n    width="20" height="20"\n    viewBox="0 0 32 32"\n    style=" fill: #000000;"\n>\n    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z"></path>\n</svg></span>\n                <span slot="content">Subscribe to this product and have it conveniently delivered to you at the frequency you choose! Promotion subject to change.</span>\n            </og-tooltip>\n        </div>\n    </div>\n    <div style="margin-left: 2.2em">\n        <div class="og-offer-incentive">\n        \t<svg\n        \theight="1em"\n        \twidth="1em"\n        \tviewBox="0 0 24 24"\n        \tfill="none"\n        \txmlns="http://www.w3.org/2000/svg"\n        \t>\n        \t<path\n        \t\td="M20,8 C18.5343681,5.03213345 15.4860999,3 11.9637942,3 C7.01333514,3 3,7.02954545 3,12 M4,16 C5.4656319,18.9678666 8.51390007,21 12.0362058,21 C16.9866649,21 21,16.9704545 21,12 M9,16 L3,16 L3,22 M21,2 L21,8 L15,8"\n        \t\tstroke="currentColor"\n        \t\tstroke-width="2"\n        \t></path>\n        \t</svg>\n        \tSave <og-incentive-text from="DiscountPercent"></og-incentive-text> when you subscribe\n        </div>        <og-text key="offerEveryLabel">\n            Deliver Every\n        </og-text>\n        <og-select-frequency default-text="(Most Popular)">\n          <option value="1_3" selected="selected"\n            >\n            1 month\n          </option>\n          <option value="2_3" >\n            2 months\n          </option>\n          <option value="3_3" >\n            3 months\n          </option>\n        </og-select-frequency>\n    </div>\n</og-when>\n<og-when test="upsellEligible">\n    <og-when test="!upcomingOrderContainsProduct">\n        Add to upcoming subscription order and receive 20% off\n        <og-upsell-button>\n            <button type="button">\n                Add to Next Order on \n                <og-next-upcoming-order format="{{month-short}} {{day}}, {{year-numeric}}">\n                    </og-nextupcoming-order>\n            </button>\n        </og-upsell-button>\n\n        <og-upsell-modal>\n            Subscribe to this product and have it conveniently delivered to you at the frequency you choose! Read the FAQ here. Promotion subject to change.\n            <br />\n            <og-when test="subscriptionEligible">\n              <og-optout-button>\n                  Get one-time\n              </og-optout-button>\n              <br />\n              <og-optin-button>\n                  Subscribe and get 10% off on every order\n              </og-optin-button>\n              Deliver Every\n              <og-select-frequency default-text="(Most Popular)">\n                <option value="1_3" selected="selected"\n                  >\n                  1 month\n                </option>\n                <option value="2_3" >\n                  2 months\n                </option>\n                <option value="3_3" >\n                  3 months\n                </option>\n              </og-select-frequency>\n            </og-when>\n            <og-when test="!subscriptionEligible">\n              <og-next-upcoming-order format="{{month-short}} {{day}}, {{year-numeric}}">              \n            </og-when>\n            <br />\n            <span slot="confirm">\n                <button type="button">Add</button>\n            </span>\n            <span slot="cancel">\n                <button type="button"></button>\n            </span>\n        </og-upsell-modal>\n    </og-when>\n\n    <og-when test="upcomingOrderContainsProduct">\n       <og-next-upcoming-order format="{{month-short}} {{day}}, {{year-numeric}}">\n        </og-nextupcoming-order>\n    </og-when>\n</og-when>',selector:"og-offer"}]).setPublicPath("//static.ordergroove.com/@ordergroove/offers/2.50.0/dist/"),function(n){const o=n.createElement("style");o.type="text/css",o.appendChild(n.createTextNode('[location="cart"] {\r\n    --og-radio-width: 12px;\r\n    --og-radio-height: 12px;\r\n    --og-radio-margin: 0 10px 0 0;\r\n    --og-select-padding: 8px 13px 8px 13px;\r\n    --og-select-bg-color: #45474A1A;\r\n    --og-select-border: none;\r\n    --og-select-font-size: 12px;\r\n    --og-tooltip-family: BrownRegular, "sans-serif";\r\n    --og-tooltip-size: 12px;\r\n    --og-tooltip-color: #090909;\r\n    --og-tooltip-background: #ffffff;\r\n    --og-tooltip-border: 1px solid #cdcdcd;\r\n    --og-tooltip-border-radius: 5px;\r\n    --og-tooltip-padding: 1em;\r\n    --og-tooltip-text-align: center;\r\n    --og-tooltip-placement: bottom;\r\n    --og-tooltip-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n[location="cart"] .purchaseoption {\r\n    font-family: BrownRegular, "sans-serif";\r\n}\r\n\r\n[location="cart"] og-optout-button,\r\n[location="cart"] og-optin-button {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    font-size: 14px;\r\n    font-family: BrownRegular, "sans-serif";\r\n}\r\n\r\n[location="cart"] .incentive-text {\r\n    display: none;\r\n}\r\n\r\n[location="cart"] .og-purchase-options-section {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n\r\n[location="cart"] .otp-purchase-option__price {\r\n    display: flex;\r\n    flex-direction: row;\r\n    gap: 10px;\r\n}\r\n\r\n[location="cart"] og-optin-button {\r\n    font-weight: 400;\r\n}\r\n\r\n[location="cart"] og-optin-button .btn,\r\n[location="cart"] og-optin-button button {\r\n    transform: scale(2);\r\n}\r\n\r\n[location="cart"] og-tooltip {\r\n    vertical-align: middle;\r\n    transform: none;\r\n}\r\n\r\n[location="cart"] .og-offer-incentive {\r\n    font-size: var(--og-secondary-font-size, 11px);\r\n}\r\n\r\n[location="cart"] .og-offer-incentive svg {\r\n    transform: translateY(0.125em);\r\n}\r\n\r\n[location="cart"] .og-frequency {\r\n    position: relative;\r\n}\r\n\r\n[location="cart"] .og-offers-price-wrapper {\r\n    font-size: 14px;\r\n    font-weight: 400;\r\n    line-height: 1.2;\r\n    letter-spacing: 0;\r\n    color: #45474a;\r\n    color: rgb(69, 71, 74, 0.8);\r\n}\r\n\r\n[location="cart"] og-text[key=\'offerEveryLabel\'] {\r\n    font-weight: 400;\r\n    font-family: var(--og-global-family, BrownRegular, "sans-serif");\r\n    color: #45474a;\r\n    font-size: 12px;\r\n    margin: 0 0 5px;\r\n}\r\n\r\n[location="cart"] og-select-frequency {\r\n    position: relative;\r\n    border-radius: 5px;\r\n    font-size: 12px;\r\n    width: 100%;\r\n    box-shadow: none;\r\n}\r\n\r\n[location="cart"] og-select {\r\n    width: 100%;\r\n}\r\n\r\n[location="cart"] og-price {\r\n    display: inline-flex;\r\n}\r\n\r\n[location="cart"] og-price[regular],\r\n[location="cart"] og-price[subscription] {\r\n    font-size: 11px;\r\n}\r\n\r\n[location="cart"] .italic {\r\n    font-style: italic;\r\n}\r\n\r\n[location="cart"] .line-through {\r\n    text-decoration: line-through;\r\n}\r\n\r\n[location="cart"] .og-regular-offer-content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding-bottom: 8px;\r\n    gap: 0;\r\n}\r\n\r\n[location="cart"] .optin-options {\r\n    display: none;\r\n}\r\n\r\n[location="cart"] .optin-options.subscribed {\r\n    display: block;\r\n}\r\n\r\n[location="cart"] og-select-frequency:focus {\r\n    outline: 2px dotted #000;\r\n    outline-offset: 1px;\r\n}\r\n\r\n@media (min-width: 1024px) {\r\n    [location="cart"] .og-frequency {\r\n        width: 80%;\r\n    }\r\n\r\n    [location="cart"] .incentive-text {\r\n        font-family: BrownRegular, "sans-serif";\r\n        letter-spacing: 0;\r\n        font-size: 1.42712rem;\r\n        line-height: 1.4;\r\n        font-weight: 400;\r\n        padding: 0;\r\n        margin-right: 0;\r\n        color: #45474a;\r\n        display: block;\r\n    }\r\n}\r\n\r\n[location="cart"] {\r\n    --og-global-family: inherit;\r\n    --og-global-color: inherit;\r\n    --og-global-size: inherit;\r\n    --og-wrapper-padding: 0;\r\n    --og-tooltip-family: Arial, Helvetica, sans-serif;\r\n    --og-tooltip-color: #000;\r\n    --og-tooltip-size: 13px;\r\n    --og-tooltip-background: #fff;\r\n    --og-tooltip-placement: bottom;\r\n    --og-upsell-color: #c3e7c3;\r\n    --og-upsell-family: Arial, Helvetica, sans-serif;\r\n    --og-upsell-size: 13px;\r\n    --og-upsell-color: #298266;\r\n}\n[location="pdp"] {\r\n\t--og-radio-width: 12px;\r\n\t--og-radio-height: 12px;\r\n\t--og-radio-margin: 0 10px 0 0;\r\n\t--og-select-padding: 8px 13px 8px 13px;\r\n\t--og-select-bg-color: transparent;\r\n\t--og-font-color: #45474a;\r\n\t--og-select-border: 0.5px solid ##000;\r\n\t--og-select-font-size: 12px;\r\n\t--og-tooltip-size: 11px;\r\n\t--og-tooltip-color: --og-font-color;\r\n\t--og-tooltip-background: #ffffff;\r\n\t--og-tooltip-border: 1px solid #cdcdcd;\r\n\t--og-tooltip-border-radius: 5px;\r\n\t--og-tooltip-padding: 1em;\r\n\t--og-tooltip-text-align: center;\r\n\t--og-tooltip-placement: bottom;\r\n\t--og-tooltip-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);\r\n\t--og-wrapper-padding: 0;\r\n\t--og-tooltip-family: inherit;\r\n\t--og-global-family: inherit;\r\n\t--og-global-color: inherit;\r\n\t--og-global-size: 11px;\r\n}\r\n\r\n\r\n\r\n[location="pdp"] og-optin-button,\r\n[location="pdp"] og-optout-button,\r\n[location="pdp"] .opt-in-purchase {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tfont-family: BrownRegular, "sans-serif";\r\n\tfont-size:14px;\r\n}\r\n[location="pdp"] .purchase-option__select {\r\n\tfont-size: 14px;\r\n\tfont-weight: 400;\r\n  line-height: 1.2;\r\n  letter-spacing: 0;\r\n  color: #45474a;\r\n}\r\n\r\n[location="pdp"] .opt-in-purchase {\r\n\tgap: 10px;\r\n}\r\n\r\n[location="pdp"] og-optin-button .btn,\r\n[location="pdp"] og-optin-button button {\r\n\ttransform: scale(2);\r\n}\r\n\r\n[location="pdp"] og-tooltip {\r\n\tvertical-align: middle;\r\n}\r\n[location="pdp"] span[slot="content"] {\r\n  color: #45474A;\r\n}\r\n[location="pdp"] .og-offer-incentive {\r\n\tfont-size: var(--og-secondary-font-size, 10px);\r\n\tmargin: 12px 0 12px 0px;\r\n\tline-height: 1.4;\r\n\tcolor: #45474A;\r\n}\r\n\r\n[location="pdp"] .og-offer-incentive svg {\r\n\ttransform: translateY(0.125em);\r\n}\r\n\r\n[location="pdp"] og-text[key="offerEveryLabel"] {\r\n\tfont-weight: 400;\r\n\tcolor: var(--og-global-color, #45474a);\r\n\tfont-size: 14px;\r\n\tmargin: 0;\r\n\tdisplay: block;\r\n\tpadding-bottom: 10px;\r\n\tfont-family: BrownRegular,"sans-serif";\r\n}\r\n\r\n[location="pdp"] og-select-frequency {\r\n\tbox-shadow: none;\r\n\tborder-radius: 5px;\r\n\twidth: 80%;\r\n\tmax-width: 257px;\r\n\tbackground-color: #FFFFFF80;\r\n\tfont-size: 8px;\r\n\tletter-spacing: 0.6px;\r\n}\r\n\r\n[location="pdp"] og-price {\r\n\tdisplay: flex;\r\n\tgap: 5px;\r\n}\r\n\r\n[location="pdp"] .line-through {\r\n\tfont-weight: 400;\r\n\ttext-decoration: line-through;\r\n}\r\n\r\n[location="pdp"] .og-regular-offer-content {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\twidth: 100%;\r\n\tgap:0;\r\n}\r\n\r\n[location="pdp"] .og-regular-offer-content .field-wrapper {\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n}\r\n\r\n[location="pdp"] .og-regular-offer-content:not(.subscribed) .purchase-option__oneTime {\r\n\topacity: 1;\r\n}\r\n[location="pdp"] .og-regular-offer-content.subscribed .purchase-option__autoReplenish {\r\n\topacity: 1;\r\n}\r\n\r\n[location="pdp"] .optin-options {\r\n\tdisplay: none;\r\n}\r\n\r\n[location="pdp"] .optin-options.subscribed {\r\n\tdisplay: block;\r\n}\r\n\r\n[location="pdp"] .optin-msg {\r\n\tmargin-block: 14px 15px;\r\n\tfont-size: 9px;\r\n\tline-height: 1.4;\r\n\tcolor: #45474A;\r\n}\r\n\r\n[location="pdp"] .purchase-option__price {\r\n\tdisplay: flex;\r\n\tgap: 10px;\r\n\tfont-size: 18px;\r\n}\r\n\r\n[location="pdp"] .purchase-option__price .promo-price:not(.line-through) {\r\n  margin-right: 7px;\r\n}\r\n[location="pdp"] .purchaseoption {\r\n  font-family: BrownRegular, "sans-serif";\r\n}\r\n[location="pdp"] .purchaseoption .option-dropdown {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-start;  \r\n  line-height: 1.2;\r\n}\r\n\r\n[location="pdp"] og-select-frequency:focus {\r\n\toutline: 2px dotted #000;\r\n\toutline-offset: 1px;\r\n}\r\n\r\n[location="pdp"] og-price.sales-price.line-through:before {\r\n  content: \'Old Price\';\r\n}\r\n\r\n@media screen and (min-width: 1024px) {\r\n\t[location="pdp"] og-price {\r\n\t\tfont-size: 20px;\r\n\t\tline-height: 1.2;\r\n\t}\r\n\r\n\t[location="pdp"] .line-through {\r\n\t\tfont-weight: 500;\r\n\t}\r\n\t\r\n\t[location="pdp"] .purchaseoption .option-dropdown {\r\n    flex-direction: row;\r\n    column-gap: 1.01937rem;\r\n    align-items: center;\r\n    margin-bottom: 22px;\r\n  }\r\n  \r\n  [location="pdp"] og-select-frequency {\r\n    font-size: 12px;\r\n  }\r\n  \r\n  [location="pdp"] .optin-msg {\r\n  \tline-height: 1.5;\r\n  \tmargin-block: 10px 5px;\r\n  }\r\n  [location="pdp"] .purchase-option__price {\r\n\t  font-size: 20px;\r\n  }\r\n  [location="pdp"] og-text[key="offerEveryLabel"] { \r\n    padding-bottom:0;\r\n  }\r\n}\r\n\r\n[location="pdp"] .og-cart-notification {\r\n\tfont-size: 12px;\r\n\tdisplay: none;\r\n\tpointer-events: none;\r\n\toverflow: hidden;\r\n\tcolor: #e53244;\r\n}\r\n\r\n/* Show state */\r\n[location="pdp"] .og-cart-notification.show {\r\n\tdisplay: block;\r\n\tpointer-events: auto;\r\n\tmargin-top: 10px;\r\n\tline-height: normal;\r\n}\r\n[location="pdp"] og-price[subscription], [location="pdp"] og-optin-button, [location="pdp"] og-price[regular]{\r\n  font-weight:normal;\r\n  color:#45474A;\r\n  font-family: BrownRegular, "sans-serif";\r\n}\r\n[location="pdp"] og-price[regular]{\r\n  font-size:20px;\r\n  opacity: 1;\r\n}\r\n\n[location="mini-cart"] {\n--og-global-family: inherit;\n--og-global-color: inherit;\n--og-global-size: inherit;\n--og-wrapper-padding: 0;\n--og-tooltip-family: Arial, Helvetica, sans-serif;\n--og-tooltip-size: 13px;\n--og-tooltip-color: #000;\n}\n[location="quickview"] {\r\n--og-global-family: inherit;\r\n--og-global-color: inherit;\r\n--og-global-size: inherit;\r\n--og-wrapper-padding: 10px 0;\r\n--og-tooltip-family: Arial, Helvetica, sans-serif;\r\n--og-tooltip-color: #000;\r\n--og-tooltip-size: 13px;\r\n--og-tooltip-background: #fff;\r\n--og-tooltip-placement: bottom;\r\n--og-upsell-color: #c3e7c3;\r\n--og-upsell-family: Arial, Helvetica, sans-serif;\r\n--og-upsell-size: 13px;\r\n--og-upsell-color: #298266;\r\n}\r\n[location="quickview"] og-optin-select {\r\n  background: hsla(0,0%,100%,.501961);\r\n  color: #45474a;\r\n  border: none;\r\n  font-size: 12px;\r\n  height: 30px;\r\n  font-family: BrownBold;\r\n}\r\n\r\n[location="quickview"] .og-quickview-widget {\r\n  display: flex;\r\n  column-gap: 5px;\r\n}\r\n\r\n[location="quickview"] .og-cart-notification {\r\n\tfont-size: 12px;\r\n\tdisplay: none;\r\n\tpointer-events: none;\r\n\toverflow: hidden;\r\n  color: #e53244;\r\n}\r\n\r\n/* Show state */\r\n[location="quickview"] .og-cart-notification.show {\r\n\tdisplay: block;\r\n\tpointer-events: auto;\r\n\tmargin-top: 10px;\r\n} \nog-offer {\n  --og-radio-width: 22px;\n  --og-radio-height: 22px;\n  --og-radio-margin: 0 5px 0 0;\n  --og-select-padding: 0.4em 2.8em 0.4em 0.5em;\n  --og-select-bg-color: transparent;\n  --og-select-border: 1px solid #090909;\n  --og-select-font-size: 12px;\n  --og-tooltip-family: Roboto, Helvetica, sans-serif;\n  --og-tooltip-size: 12px;\n  --og-tooltip-color: #090909;\n  --og-tooltip-background: #ffffff;\n  --og-tooltip-border: 1px solid #cdcdcd;\n  --og-tooltip-border-radius: 5px;\n  --og-tooltip-padding: 1em;\n  --og-tooltip-text-align: center;\n  --og-tooltip-placement: bottom;\n  --og-tooltip-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);\n}\n\nog-offer og-optout-button,\nog-offer og-optin-button {\n  font-family: Roboto, Helvetica, sans-serif;\n  font-size: 16px;\n}\n\nog-offer og-optin-button {\n  font-weight: 700;\n}\n\nog-offer og-optin-button .btn,\nog-offer og-optin-button button {\n  transform: scale(2);\n}\n\nog-offer og-tooltip {\n  vertical-align: middle;\n}\n\nog-offer .og-offer-incentive {\n  font-size: var(--og-secondary-font-size, 12px);\n}\n\nog-offer .og-offer-incentive svg {\n  transform: translateY(0.125em);\n}\n\nog-offer og-text[key=\'offerEveryLabel\'] {\n  font-weight: 700;\n  font-family: var(--og-global-family, Roboto, sans-serif);\n  color: var(--og-global-color, #090909);\n  font-size: var(--og-select-font-size, 12px);\n  margin: 1em 0 0.3em;\n  display: block;\n}\n\nog-offer og-optin-button {\n  font-weight: 700;\n}\n\nog-offer og-select-frequency {\n  border-radius: 0;\n}\n\nog-offer og-price {\n  display: inline-flex;\n}\n\nog-offer og-price[regular] {\n  font-size: 14px;\n  opacity: 67.5%;\n}\n\nog-offer og-price[subscription] {\n  color: var(--og-global-color, #090909);\n  font-weight: 700;\n}\n\nog-offer .italic {\n  font-style: italic;\n}\n\nog-offer .line-through {\n  text-decoration: line-through;\n}\n\nog-offer .og-regular-offer-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1em;\n}\n\nog-offer .og-regular-offer-content > div {\n  line-height: 1em;\n}\n\nog-offer {\n--og-global-family: Arial, Helvetica, sans-serif;\n--og-global-size: 13px;\n--og-global-color: rgba(0,0,0,1);\n--og-wrapper-padding: 10px 0;\n--og-tooltip-family: inherit;\n--og-tooltip-size: 12px;\n--og-tooltip-color: rgba(0,0,0,1);\n--og-tooltip-background: rgba(255,255,255,1);\n--og-tooltip-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n--og-tooltip-placement: bottom;\n--og-upsell-family: Arial, Helvetica, sans-serif;\n--og-upsell-size: 13px;\n--og-upsell-color: rgba(99,119,219,1);\n}')),n.head.appendChild(o)}(document),(window.location.hash.includes("og_quick_action=")||window.location.search.includes("og_quick_action="))&&function(n){const o=n.createElement("script");o.type="text/javascript",o.src="//static.ordergroove.com/7e9e3f89fff141eda37493096b1cc372/oca.js",n.head.appendChild(o)}(document);return module.exports;});
//# sourceMappingURL=offers.js.map?v=2.50.0