var ey=Object.defineProperty,aM=Object.defineProperties;var cM=Object.getOwnPropertyDescriptors;var K_=Object.getOwnPropertySymbols;var lM=Object.prototype.hasOwnProperty,uM=Object.prototype.propertyIsEnumerable;var Q_=(n,e,t)=>e in n?ey(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ot=(n,e)=>{for(var t in e||={})lM.call(e,t)&&Q_(n,t,e[t]);if(K_)for(var t of K_(e))uM.call(e,t)&&Q_(n,t,e[t]);return n},_t=(n,e)=>aM(n,cM(e));var dM=(n,e)=>{for(var t in e)ey(n,t,{get:e[t],enumerable:!0})};var vi=globalThis;function Wn(n){return(vi.__Zone_symbol_prefix||"__zone_symbol__")+n}function fM(){let n=vi.performance;function e(B){n&&n.mark&&n.mark(B)}function t(B,P){n&&n.measure&&n.measure(B,P)}e("Zone");let i=(()=>{class B{static __symbol__=Wn;static assertZonePatched(){if(vi.Promise!==z.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let T=B.current;for(;T.parent;)T=T.parent;return T}static get current(){return F.zone}static get currentTask(){return L}static __load_patch(T,D,ie=!1){if(z.hasOwnProperty(T)){let oe=vi[Wn("forceDuplicateZoneCheck")]===!0;if(!ie&&oe)throw Error("Already loaded patch: "+T)}else if(!vi["__Zone_disable_"+T]){let oe="Zone:"+T;e(oe),z[T]=D(vi,B,w),t(oe,oe)}}get parent(){return this._parent}get name(){return this._name}_parent;_name;_properties;_zoneDelegate;constructor(T,D){this._parent=T,this._name=D?D.name||"unnamed":"<root>",this._properties=D&&D.properties||{},this._zoneDelegate=new s(this,this._parent&&this._parent._zoneDelegate,D)}get(T){let D=this.getZoneWith(T);if(D)return D._properties[T]}getZoneWith(T){let D=this;for(;D;){if(D._properties.hasOwnProperty(T))return D;D=D._parent}return null}fork(T){if(!T)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,T)}wrap(T,D){if(typeof T!="function")throw new Error("Expecting function got: "+T);let ie=this._zoneDelegate.intercept(this,T,D),oe=this;return function(){return oe.runGuarded(ie,this,arguments,D)}}run(T,D,ie,oe){F={parent:F,zone:this};try{return this._zoneDelegate.invoke(this,T,D,ie,oe)}finally{F=F.parent}}runGuarded(T,D=null,ie,oe){F={parent:F,zone:this};try{try{return this._zoneDelegate.invoke(this,T,D,ie,oe)}catch(fe){if(this._zoneDelegate.handleError(this,fe))throw fe}}finally{F=F.parent}}runTask(T,D,ie){if(T.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(T.zone||g).name+"; Execution: "+this.name+")");let oe=T,{type:fe,data:{isPeriodic:ve=!1,isRefreshable:dt=!1}={}}=T;if(T.state===p&&(fe===b||fe===_))return;let ct=T.state!=M;ct&&oe._transitionTo(M,S);let te=L;L=oe,F={parent:F,zone:this};try{fe==_&&T.data&&!ve&&!dt&&(T.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,oe,D,ie)}catch(ue){if(this._zoneDelegate.handleError(this,ue))throw ue}}finally{let ue=T.state;if(ue!==p&&ue!==R)if(fe==b||ve||dt&&ue===x)ct&&oe._transitionTo(S,M,x);else{let G=oe._zoneDelegates;this._updateTaskCount(oe,-1),ct&&oe._transitionTo(p,M,p),dt&&(oe._zoneDelegates=G)}F=F.parent,L=te}}scheduleTask(T){if(T.zone&&T.zone!==this){let ie=this;for(;ie;){if(ie===T.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${T.zone.name}`);ie=ie.parent}}T._transitionTo(x,p);let D=[];T._zoneDelegates=D,T._zone=this;try{T=this._zoneDelegate.scheduleTask(this,T)}catch(ie){throw T._transitionTo(R,x,p),this._zoneDelegate.handleError(this,ie),ie}return T._zoneDelegates===D&&this._updateTaskCount(T,1),T.state==x&&T._transitionTo(S,x),T}scheduleMicroTask(T,D,ie,oe){return this.scheduleTask(new o(N,T,D,ie,oe,void 0))}scheduleMacroTask(T,D,ie,oe,fe){return this.scheduleTask(new o(_,T,D,ie,oe,fe))}scheduleEventTask(T,D,ie,oe,fe){return this.scheduleTask(new o(b,T,D,ie,oe,fe))}cancelTask(T){if(T.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(T.zone||g).name+"; Execution: "+this.name+")");if(!(T.state!==S&&T.state!==M)){T._transitionTo(A,S,M);try{this._zoneDelegate.cancelTask(this,T)}catch(D){throw T._transitionTo(R,A),this._zoneDelegate.handleError(this,D),D}return this._updateTaskCount(T,-1),T._transitionTo(p,A),T.runCount=-1,T}}_updateTaskCount(T,D){let ie=T._zoneDelegates;D==-1&&(T._zoneDelegates=null);for(let oe=0;oe<ie.length;oe++)ie[oe]._updateTaskCount(T.type,D)}}return B})(),r={name:"",onHasTask:(B,P,T,D)=>B.hasTask(T,D),onScheduleTask:(B,P,T,D)=>B.scheduleTask(T,D),onInvokeTask:(B,P,T,D,ie,oe)=>B.invokeTask(T,D,ie,oe),onCancelTask:(B,P,T,D)=>B.cancelTask(T,D)};class s{get zone(){return this._zone}_zone;_taskCounts={microTask:0,macroTask:0,eventTask:0};_parentDelegate;_forkDlgt;_forkZS;_forkCurrZone;_interceptDlgt;_interceptZS;_interceptCurrZone;_invokeDlgt;_invokeZS;_invokeCurrZone;_handleErrorDlgt;_handleErrorZS;_handleErrorCurrZone;_scheduleTaskDlgt;_scheduleTaskZS;_scheduleTaskCurrZone;_invokeTaskDlgt;_invokeTaskZS;_invokeTaskCurrZone;_cancelTaskDlgt;_cancelTaskZS;_cancelTaskCurrZone;_hasTaskDlgt;_hasTaskDlgtOwner;_hasTaskZS;_hasTaskCurrZone;constructor(P,T,D){this._zone=P,this._parentDelegate=T,this._forkZS=D&&(D&&D.onFork?D:T._forkZS),this._forkDlgt=D&&(D.onFork?T:T._forkDlgt),this._forkCurrZone=D&&(D.onFork?this._zone:T._forkCurrZone),this._interceptZS=D&&(D.onIntercept?D:T._interceptZS),this._interceptDlgt=D&&(D.onIntercept?T:T._interceptDlgt),this._interceptCurrZone=D&&(D.onIntercept?this._zone:T._interceptCurrZone),this._invokeZS=D&&(D.onInvoke?D:T._invokeZS),this._invokeDlgt=D&&(D.onInvoke?T:T._invokeDlgt),this._invokeCurrZone=D&&(D.onInvoke?this._zone:T._invokeCurrZone),this._handleErrorZS=D&&(D.onHandleError?D:T._handleErrorZS),this._handleErrorDlgt=D&&(D.onHandleError?T:T._handleErrorDlgt),this._handleErrorCurrZone=D&&(D.onHandleError?this._zone:T._handleErrorCurrZone),this._scheduleTaskZS=D&&(D.onScheduleTask?D:T._scheduleTaskZS),this._scheduleTaskDlgt=D&&(D.onScheduleTask?T:T._scheduleTaskDlgt),this._scheduleTaskCurrZone=D&&(D.onScheduleTask?this._zone:T._scheduleTaskCurrZone),this._invokeTaskZS=D&&(D.onInvokeTask?D:T._invokeTaskZS),this._invokeTaskDlgt=D&&(D.onInvokeTask?T:T._invokeTaskDlgt),this._invokeTaskCurrZone=D&&(D.onInvokeTask?this._zone:T._invokeTaskCurrZone),this._cancelTaskZS=D&&(D.onCancelTask?D:T._cancelTaskZS),this._cancelTaskDlgt=D&&(D.onCancelTask?T:T._cancelTaskDlgt),this._cancelTaskCurrZone=D&&(D.onCancelTask?this._zone:T._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let ie=D&&D.onHasTask,oe=T&&T._hasTaskZS;(ie||oe)&&(this._hasTaskZS=ie?D:r,this._hasTaskDlgt=T,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,D.onScheduleTask||(this._scheduleTaskZS=r,this._scheduleTaskDlgt=T,this._scheduleTaskCurrZone=this._zone),D.onInvokeTask||(this._invokeTaskZS=r,this._invokeTaskDlgt=T,this._invokeTaskCurrZone=this._zone),D.onCancelTask||(this._cancelTaskZS=r,this._cancelTaskDlgt=T,this._cancelTaskCurrZone=this._zone))}fork(P,T){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,P,T):new i(P,T)}intercept(P,T,D){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,P,T,D):T}invoke(P,T,D,ie,oe){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,P,T,D,ie,oe):T.apply(D,ie)}handleError(P,T){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,P,T):!0}scheduleTask(P,T){let D=T;if(this._scheduleTaskZS)this._hasTaskZS&&D._zoneDelegates.push(this._hasTaskDlgtOwner),D=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,P,T),D||(D=T);else if(T.scheduleFn)T.scheduleFn(T);else if(T.type==N)m(T);else throw new Error("Task is missing scheduleFn.");return D}invokeTask(P,T,D,ie){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,P,T,D,ie):T.callback.apply(D,ie)}cancelTask(P,T){let D;if(this._cancelTaskZS)D=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,P,T);else{if(!T.cancelFn)throw Error("Task is not cancelable");D=T.cancelFn(T)}return D}hasTask(P,T){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,P,T)}catch(D){this.handleError(P,D)}}_updateTaskCount(P,T){let D=this._taskCounts,ie=D[P],oe=D[P]=ie+T;if(oe<0)throw new Error("More tasks executed then were scheduled.");if(ie==0||oe==0){let fe={microTask:D.microTask>0,macroTask:D.macroTask>0,eventTask:D.eventTask>0,change:P};this.hasTask(this._zone,fe)}}}class o{type;source;invoke;callback;data;scheduleFn;cancelFn;_zone=null;runCount=0;_zoneDelegates=null;_state="notScheduled";constructor(P,T,D,ie,oe,fe){if(this.type=P,this.source=T,this.data=ie,this.scheduleFn=oe,this.cancelFn=fe,!D)throw new Error("callback is not defined");this.callback=D;let ve=this;P===b&&ie&&ie.useG?this.invoke=o.invokeTask:this.invoke=function(){return o.invokeTask.call(vi,ve,this,arguments)}}static invokeTask(P,T,D){P||(P=this),Y++;try{return P.runCount++,P.zone.runTask(P,T,D)}finally{Y==1&&E(),Y--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(p,x)}_transitionTo(P,T,D){if(this._state===T||this._state===D)this._state=P,P==p&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${P}', expecting state '${T}'${D?" or '"+D+"'":""}, was '${this._state}'.`)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}let a=Wn("setTimeout"),c=Wn("Promise"),l=Wn("then"),u=[],f=!1,d;function h(B){if(d||vi[c]&&(d=vi[c].resolve(0)),d){let P=d[l];P||(P=d.then),P.call(d,B)}else vi[a](B,0)}function m(B){Y===0&&u.length===0&&h(E),B&&u.push(B)}function E(){if(!f){for(f=!0;u.length;){let B=u;u=[];for(let P=0;P<B.length;P++){let T=B[P];try{T.zone.runTask(T,null,null)}catch(D){w.onUnhandledError(D)}}}w.microtaskDrainDone(),f=!1}}let g={name:"NO ZONE"},p="notScheduled",x="scheduling",S="scheduled",M="running",A="canceling",R="unknown",N="microTask",_="macroTask",b="eventTask",z={},w={symbol:Wn,currentZoneFrame:()=>F,onUnhandledError:H,microtaskDrainDone:H,scheduleMicroTask:m,showUncaughtError:()=>!i[Wn("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:H,patchMethod:()=>H,bindArguments:()=>[],patchThen:()=>H,patchMacroTask:()=>H,patchEventPrototype:()=>H,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>H,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>H,wrapWithCurrentZone:()=>H,filterProperties:()=>[],attachOriginToPatched:()=>H,_redefineProperty:()=>H,patchCallbacks:()=>H,nativeScheduleMicroTask:h},F={parent:null,zone:new i(null,null)},L=null,Y=0;function H(){}return t("Zone","Zone"),i}function hM(){let n=globalThis,e=n[Wn("forceDuplicateZoneCheck")]===!0;if(n.Zone&&(e||typeof n.Zone.__symbol__!="function"))throw new Error("Zone already loaded.");return n.Zone??=fM(),n.Zone}var ua=Object.getOwnPropertyDescriptor,oh=Object.defineProperty,ah=Object.getPrototypeOf,pM=Object.create,mM=Array.prototype.slice,ch="addEventListener",lh="removeEventListener",nh=Wn(ch),ih=Wn(lh),Wi="true",ji="false",da=Wn("");function uh(n,e){return Zone.current.wrap(n,e)}function dh(n,e,t,i,r){return Zone.current.scheduleMacroTask(n,e,t,i,r)}var vt=Wn,Yc=typeof window<"u",fa=Yc?window:void 0,Xt=Yc&&fa||globalThis,gM="removeAttribute";function fh(n,e){for(let t=n.length-1;t>=0;t--)typeof n[t]=="function"&&(n[t]=uh(n[t],e+"_"+t));return n}function _M(n,e){let t=n.constructor.name;for(let i=0;i<e.length;i++){let r=e[i],s=n[r];if(s){let o=ua(n,r);if(!ay(o))continue;n[r]=(a=>{let c=function(){return a.apply(this,fh(arguments,t+"."+r))};return qi(c,a),c})(s)}}}function ay(n){return n?n.writable===!1?!1:!(typeof n.get=="function"&&typeof n.set>"u"):!0}var cy=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Zc=!("nw"in Xt)&&typeof Xt.process<"u"&&Xt.process.toString()==="[object process]",hh=!Zc&&!cy&&!!(Yc&&fa.HTMLElement),ly=typeof Xt.process<"u"&&Xt.process.toString()==="[object process]"&&!cy&&!!(Yc&&fa.HTMLElement),Xc={},yM=vt("enable_beforeunload"),ty=function(n){if(n=n||Xt.event,!n)return;let e=Xc[n.type];e||(e=Xc[n.type]=vt("ON_PROPERTY"+n.type));let t=this||n.target||Xt,i=t[e],r;if(hh&&t===fa&&n.type==="error"){let s=n;r=i&&i.call(this,s.message,s.filename,s.lineno,s.colno,s.error),r===!0&&n.preventDefault()}else r=i&&i.apply(this,arguments),n.type==="beforeunload"&&Xt[yM]&&typeof r=="string"?n.returnValue=r:r!=null&&!r&&n.preventDefault();return r};function ny(n,e,t){let i=ua(n,e);if(!i&&t&&ua(t,e)&&(i={enumerable:!0,configurable:!0}),!i||!i.configurable)return;let r=vt("on"+e+"patched");if(n.hasOwnProperty(r)&&n[r])return;delete i.writable,delete i.value;let s=i.get,o=i.set,a=e.slice(2),c=Xc[a];c||(c=Xc[a]=vt("ON_PROPERTY"+a)),i.set=function(l){let u=this;if(!u&&n===Xt&&(u=Xt),!u)return;typeof u[c]=="function"&&u.removeEventListener(a,ty),o?.call(u,null),u[c]=l,typeof l=="function"&&u.addEventListener(a,ty,!1)},i.get=function(){let l=this;if(!l&&n===Xt&&(l=Xt),!l)return null;let u=l[c];if(u)return u;if(s){let f=s.call(this);if(f)return i.set.call(this,f),typeof l[gM]=="function"&&l.removeAttribute(e),f}return null},oh(n,e,i),n[r]=!0}function uy(n,e,t){if(e)for(let i=0;i<e.length;i++)ny(n,"on"+e[i],t);else{let i=[];for(let r in n)r.slice(0,2)=="on"&&i.push(r);for(let r=0;r<i.length;r++)ny(n,i[r],t)}}var ei=vt("originalInstance");function la(n){let e=Xt[n];if(!e)return;Xt[vt(n)]=e,Xt[n]=function(){let r=fh(arguments,n);switch(r.length){case 0:this[ei]=new e;break;case 1:this[ei]=new e(r[0]);break;case 2:this[ei]=new e(r[0],r[1]);break;case 3:this[ei]=new e(r[0],r[1],r[2]);break;case 4:this[ei]=new e(r[0],r[1],r[2],r[3]);break;default:throw new Error("Arg list too long.")}},qi(Xt[n],e);let t=new e(function(){}),i;for(i in t)n==="XMLHttpRequest"&&i==="responseBlob"||(function(r){typeof t[r]=="function"?Xt[n].prototype[r]=function(){return this[ei][r].apply(this[ei],arguments)}:oh(Xt[n].prototype,r,{set:function(s){typeof s=="function"?(this[ei][r]=uh(s,n+"."+r),qi(this[ei][r],s)):this[ei][r]=s},get:function(){return this[ei][r]}})})(i);for(i in e)i!=="prototype"&&e.hasOwnProperty(i)&&(Xt[n][i]=e[i])}function $i(n,e,t){let i=n;for(;i&&!i.hasOwnProperty(e);)i=ah(i);!i&&n[e]&&(i=n);let r=vt(e),s=null;if(i&&(!(s=i[r])||!i.hasOwnProperty(r))){s=i[r]=i[e];let o=i&&ua(i,e);if(ay(o)){let a=t(s,r,e);i[e]=function(){return a(this,arguments)},qi(i[e],s)}}return s}function vM(n,e,t){let i=null;function r(s){let o=s.data;return o.args[o.cbIdx]=function(){s.invoke.apply(this,arguments)},i.apply(o.target,o.args),s}i=$i(n,e,s=>function(o,a){let c=t(o,a);return c.cbIdx>=0&&typeof a[c.cbIdx]=="function"?dh(c.name,a[c.cbIdx],c,r):s.apply(o,a)})}function qi(n,e){n[vt("OriginalDelegate")]=e}var iy=!1,rh=!1;function xM(){if(iy)return rh;iy=!0;try{let n=fa.navigator.userAgent;(n.indexOf("MSIE ")!==-1||n.indexOf("Trident/")!==-1||n.indexOf("Edge/")!==-1)&&(rh=!0)}catch{}return rh}function ry(n){return typeof n=="function"}function sy(n){return typeof n=="number"}var EM={useG:!0},jn={},dy={},fy=new RegExp("^"+da+"(\\w+)(true|false)$"),hy=vt("propagationStopped");function py(n,e){let t=(e?e(n):n)+ji,i=(e?e(n):n)+Wi,r=da+t,s=da+i;jn[n]={},jn[n][ji]=r,jn[n][Wi]=s}function SM(n,e,t,i){let r=i&&i.add||ch,s=i&&i.rm||lh,o=i&&i.listeners||"eventListeners",a=i&&i.rmAll||"removeAllListeners",c=vt(r),l="."+r+":",u="prependListener",f="."+u+":",d=function(x,S,M){if(x.isRemoved)return;let A=x.callback;typeof A=="object"&&A.handleEvent&&(x.callback=_=>A.handleEvent(_),x.originalDelegate=A);let R;try{x.invoke(x,S,[M])}catch(_){R=_}let N=x.options;if(N&&typeof N=="object"&&N.once){let _=x.originalDelegate?x.originalDelegate:x.callback;S[s].call(S,M.type,_,N)}return R};function h(x,S,M){if(S=S||n.event,!S)return;let A=x||S.target||n,R=A[jn[S.type][M?Wi:ji]];if(R){let N=[];if(R.length===1){let _=d(R[0],A,S);_&&N.push(_)}else{let _=R.slice();for(let b=0;b<_.length&&!(S&&S[hy]===!0);b++){let z=d(_[b],A,S);z&&N.push(z)}}if(N.length===1)throw N[0];for(let _=0;_<N.length;_++){let b=N[_];e.nativeScheduleMicroTask(()=>{throw b})}}}let m=function(x){return h(this,x,!1)},E=function(x){return h(this,x,!0)};function g(x,S){if(!x)return!1;let M=!0;S&&S.useG!==void 0&&(M=S.useG);let A=S&&S.vh,R=!0;S&&S.chkDup!==void 0&&(R=S.chkDup);let N=!1;S&&S.rt!==void 0&&(N=S.rt);let _=x;for(;_&&!_.hasOwnProperty(r);)_=ah(_);if(!_&&x[r]&&(_=x),!_||_[c])return!1;let b=S&&S.eventNameToString,z={},w=_[c]=_[r],F=_[vt(s)]=_[s],L=_[vt(o)]=_[o],Y=_[vt(a)]=_[a],H;S&&S.prepend&&(H=_[vt(S.prepend)]=_[S.prepend]);function B(k,K){return K?typeof k=="boolean"?{capture:k,passive:!0}:k?typeof k=="object"&&k.passive!==!1?_t(ot({},k),{passive:!0}):k:{passive:!0}:k}let P=function(k){if(!z.isExisting)return w.call(z.target,z.eventName,z.capture?E:m,z.options)},T=function(k){if(!k.isRemoved){let K=jn[k.eventName],Me;K&&(Me=K[k.capture?Wi:ji]);let _e=Me&&k.target[Me];if(_e){for(let pe=0;pe<_e.length;pe++)if(_e[pe]===k){_e.splice(pe,1),k.isRemoved=!0,k.removeAbortListener&&(k.removeAbortListener(),k.removeAbortListener=null),_e.length===0&&(k.allRemoved=!0,k.target[Me]=null);break}}}if(k.allRemoved)return F.call(k.target,k.eventName,k.capture?E:m,k.options)},D=function(k){return w.call(z.target,z.eventName,k.invoke,z.options)},ie=function(k){return H.call(z.target,z.eventName,k.invoke,z.options)},oe=function(k){return F.call(k.target,k.eventName,k.invoke,k.options)},fe=M?P:D,ve=M?T:oe,dt=function(k,K){let Me=typeof K;return Me==="function"&&k.callback===K||Me==="object"&&k.originalDelegate===K},ct=S?.diff||dt,te=Zone[vt("UNPATCHED_EVENTS")],ue=n[vt("PASSIVE_EVENTS")];function G(k){if(typeof k=="object"&&k!==null){let K=ot({},k);return k.signal&&(K.signal=k.signal),K}return k}let Q=function(k,K,Me,_e,pe=!1,Ce=!1){return function(){let ye=this||n,Ne=arguments[0];S&&S.transferEventName&&(Ne=S.transferEventName(Ne));let I=arguments[1];if(!I)return k.apply(this,arguments);if(Zc&&Ne==="uncaughtException")return k.apply(this,arguments);let Ge=!1;if(typeof I!="function"){if(!I.handleEvent)return k.apply(this,arguments);Ge=!0}if(A&&!A(k,I,ye,arguments))return;let Qe=!!ue&&ue.indexOf(Ne)!==-1,st=G(B(arguments[2],Qe)),Te=st?.signal;if(Te?.aborted)return;if(te){for(let be=0;be<te.length;be++)if(Ne===te[be])return Qe?k.call(ye,Ne,I,st):k.apply(this,arguments)}let C=st?typeof st=="boolean"?!0:st.capture:!1,y=st&&typeof st=="object"?st.once:!1,U=Zone.current,ne=jn[Ne];ne||(py(Ne,b),ne=jn[Ne]);let ae=ne[C?Wi:ji],J=ye[ae],Ie=!1;if(J){if(Ie=!0,R){for(let be=0;be<J.length;be++)if(ct(J[be],I))return}}else J=ye[ae]=[];let he,ke=ye.constructor.name,Ve=dy[ke];Ve&&(he=Ve[Ne]),he||(he=ke+K+(b?b(Ne):Ne)),z.options=st,y&&(z.options.once=!1),z.target=ye,z.capture=C,z.eventName=Ne,z.isExisting=Ie;let ce=M?EM:void 0;ce&&(ce.taskData=z),Te&&(z.options.signal=void 0);let le=U.scheduleEventTask(he,I,ce,Me,_e);if(Te){z.options.signal=Te;let be=()=>le.zone.cancelTask(le);k.call(Te,"abort",be,{once:!0}),le.removeAbortListener=()=>Te.removeEventListener("abort",be)}if(z.target=null,ce&&(ce.taskData=null),y&&(z.options.once=!0),typeof le.options!="boolean"&&(le.options=st),le.target=ye,le.capture=C,le.eventName=Ne,Ge&&(le.originalDelegate=I),Ce?J.unshift(le):J.push(le),pe)return ye}};return _[r]=Q(w,l,fe,ve,N),H&&(_[u]=Q(H,f,ie,ve,N,!0)),_[s]=function(){let k=this||n,K=arguments[0];S&&S.transferEventName&&(K=S.transferEventName(K));let Me=arguments[2],_e=Me?typeof Me=="boolean"?!0:Me.capture:!1,pe=arguments[1];if(!pe)return F.apply(this,arguments);if(A&&!A(F,pe,k,arguments))return;let Ce=jn[K],ye;Ce&&(ye=Ce[_e?Wi:ji]);let Ne=ye&&k[ye];if(Ne)for(let I=0;I<Ne.length;I++){let Ge=Ne[I];if(ct(Ge,pe)){if(Ne.splice(I,1),Ge.isRemoved=!0,Ne.length===0&&(Ge.allRemoved=!0,k[ye]=null,!_e&&typeof K=="string")){let Qe=da+"ON_PROPERTY"+K;k[Qe]=null}return Ge.zone.cancelTask(Ge),N?k:void 0}}return F.apply(this,arguments)},_[o]=function(){let k=this||n,K=arguments[0];S&&S.transferEventName&&(K=S.transferEventName(K));let Me=[],_e=my(k,b?b(K):K);for(let pe=0;pe<_e.length;pe++){let Ce=_e[pe],ye=Ce.originalDelegate?Ce.originalDelegate:Ce.callback;Me.push(ye)}return Me},_[a]=function(){let k=this||n,K=arguments[0];if(K){S&&S.transferEventName&&(K=S.transferEventName(K));let Me=jn[K];if(Me){let _e=Me[ji],pe=Me[Wi],Ce=k[_e],ye=k[pe];if(Ce){let Ne=Ce.slice();for(let I=0;I<Ne.length;I++){let Ge=Ne[I],Qe=Ge.originalDelegate?Ge.originalDelegate:Ge.callback;this[s].call(this,K,Qe,Ge.options)}}if(ye){let Ne=ye.slice();for(let I=0;I<Ne.length;I++){let Ge=Ne[I],Qe=Ge.originalDelegate?Ge.originalDelegate:Ge.callback;this[s].call(this,K,Qe,Ge.options)}}}}else{let Me=Object.keys(k);for(let _e=0;_e<Me.length;_e++){let pe=Me[_e],Ce=fy.exec(pe),ye=Ce&&Ce[1];ye&&ye!=="removeListener"&&this[a].call(this,ye)}this[a].call(this,"removeListener")}if(N)return this},qi(_[r],w),qi(_[s],F),Y&&qi(_[a],Y),L&&qi(_[o],L),!0}let p=[];for(let x=0;x<t.length;x++)p[x]=g(t[x],i);return p}function my(n,e){if(!e){let s=[];for(let o in n){let a=fy.exec(o),c=a&&a[1];if(c&&(!e||c===e)){let l=n[o];if(l)for(let u=0;u<l.length;u++)s.push(l[u])}}return s}let t=jn[e];t||(py(e),t=jn[e]);let i=n[t[ji]],r=n[t[Wi]];return i?r?i.concat(r):i.slice():r?r.slice():[]}function bM(n,e){let t=n.Event;t&&t.prototype&&e.patchMethod(t.prototype,"stopImmediatePropagation",i=>function(r,s){r[hy]=!0,i&&i.apply(r,s)})}function MM(n,e){e.patchMethod(n,"queueMicrotask",t=>function(i,r){Zone.current.scheduleMicroTask("queueMicrotask",r[0])})}var qc=vt("zoneTask");function Js(n,e,t,i){let r=null,s=null;e+=i,t+=i;let o={};function a(l){let u=l.data;u.args[0]=function(){return l.invoke.apply(this,arguments)};let f=r.apply(n,u.args);return sy(f)?u.handleId=f:(u.handle=f,u.isRefreshable=ry(f.refresh)),l}function c(l){let{handle:u,handleId:f}=l.data;return s.call(n,u??f)}r=$i(n,e,l=>function(u,f){if(ry(f[0])){let d={isRefreshable:!1,isPeriodic:i==="Interval",delay:i==="Timeout"||i==="Interval"?f[1]||0:void 0,args:f},h=f[0];f[0]=function(){try{return h.apply(this,arguments)}finally{let{handle:M,handleId:A,isPeriodic:R,isRefreshable:N}=d;!R&&!N&&(A?delete o[A]:M&&(M[qc]=null))}};let m=dh(e,f[0],d,a,c);if(!m)return m;let{handleId:E,handle:g,isRefreshable:p,isPeriodic:x}=m.data;if(E)o[E]=m;else if(g&&(g[qc]=m,p&&!x)){let S=g.refresh;g.refresh=function(){let{zone:M,state:A}=m;return A==="notScheduled"?(m._state="scheduled",M._updateTaskCount(m,1)):A==="running"&&(m._state="scheduling"),S.call(this)}}return g??E??m}else return l.apply(n,f)}),s=$i(n,t,l=>function(u,f){let d=f[0],h;sy(d)?(h=o[d],delete o[d]):(h=d?.[qc],h?d[qc]=null:h=d),h?.type?h.cancelFn&&h.zone.cancelTask(h):l.apply(n,f)})}function CM(n,e){let{isBrowser:t,isMix:i}=e.getGlobalObjects();if(!t&&!i||!n.customElements||!("customElements"in n))return;let r=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"];e.patchCallbacks(e,n.customElements,"customElements","define",r)}function wM(n,e){if(Zone[e.symbol("patchEventTarget")])return;let{eventNames:t,zoneSymbolEventNames:i,TRUE_STR:r,FALSE_STR:s,ZONE_SYMBOL_PREFIX:o}=e.getGlobalObjects();for(let c=0;c<t.length;c++){let l=t[c],u=l+s,f=l+r,d=o+u,h=o+f;i[l]={},i[l][s]=d,i[l][r]=h}let a=n.EventTarget;if(!(!a||!a.prototype))return e.patchEventTarget(n,e,[a&&a.prototype]),!0}function TM(n,e){e.patchEventPrototype(n,e)}function gy(n,e,t){if(!t||t.length===0)return e;let i=t.filter(s=>s.target===n);if(i.length===0)return e;let r=i[0].ignoreProperties;return e.filter(s=>r.indexOf(s)===-1)}function oy(n,e,t,i){if(!n)return;let r=gy(n,e,t);uy(n,r,i)}function sh(n){return Object.getOwnPropertyNames(n).filter(e=>e.startsWith("on")&&e.length>2).map(e=>e.substring(2))}function DM(n,e){if(Zc&&!ly||Zone[n.symbol("patchEvents")])return;let t=e.__Zone_ignore_on_properties,i=[];if(hh){let r=window;i=i.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let s=[];oy(r,sh(r),t&&t.concat(s),ah(r))}i=i.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let r=0;r<i.length;r++){let s=e[i[r]];s?.prototype&&oy(s.prototype,sh(s.prototype),t)}}function AM(n){n.__load_patch("legacy",e=>{let t=e[n.__symbol__("legacyPatch")];t&&t()}),n.__load_patch("timers",e=>{let i="clear";Js(e,"set",i,"Timeout"),Js(e,"set",i,"Interval"),Js(e,"set",i,"Immediate")}),n.__load_patch("requestAnimationFrame",e=>{Js(e,"request","cancel","AnimationFrame"),Js(e,"mozRequest","mozCancel","AnimationFrame"),Js(e,"webkitRequest","webkitCancel","AnimationFrame")}),n.__load_patch("blocking",(e,t)=>{let i=["alert","prompt","confirm"];for(let r=0;r<i.length;r++){let s=i[r];$i(e,s,(o,a,c)=>function(l,u){return t.current.run(o,e,u,c)})}}),n.__load_patch("EventTarget",(e,t,i)=>{TM(e,i),wM(e,i);let r=e.XMLHttpRequestEventTarget;r&&r.prototype&&i.patchEventTarget(e,i,[r.prototype])}),n.__load_patch("MutationObserver",(e,t,i)=>{la("MutationObserver"),la("WebKitMutationObserver")}),n.__load_patch("IntersectionObserver",(e,t,i)=>{la("IntersectionObserver")}),n.__load_patch("FileReader",(e,t,i)=>{la("FileReader")}),n.__load_patch("on_property",(e,t,i)=>{DM(i,e)}),n.__load_patch("customElements",(e,t,i)=>{CM(e,i)}),n.__load_patch("XHR",(e,t)=>{l(e);let i=vt("xhrTask"),r=vt("xhrSync"),s=vt("xhrListener"),o=vt("xhrScheduled"),a=vt("xhrURL"),c=vt("xhrErrorBeforeScheduled");function l(u){let f=u.XMLHttpRequest;if(!f)return;let d=f.prototype;function h(w){return w[i]}let m=d[nh],E=d[ih];if(!m){let w=u.XMLHttpRequestEventTarget;if(w){let F=w.prototype;m=F[nh],E=F[ih]}}let g="readystatechange",p="scheduled";function x(w){let F=w.data,L=F.target;L[o]=!1,L[c]=!1;let Y=L[s];m||(m=L[nh],E=L[ih]),Y&&E.call(L,g,Y);let H=L[s]=()=>{if(L.readyState===L.DONE)if(!F.aborted&&L[o]&&w.state===p){let P=L[t.__symbol__("loadfalse")];if(L.status!==0&&P&&P.length>0){let T=w.invoke;w.invoke=function(){let D=L[t.__symbol__("loadfalse")];for(let ie=0;ie<D.length;ie++)D[ie]===w&&D.splice(ie,1);!F.aborted&&w.state===p&&T.call(w)},P.push(w)}else w.invoke()}else!F.aborted&&L[o]===!1&&(L[c]=!0)};return m.call(L,g,H),L[i]||(L[i]=w),b.apply(L,F.args),L[o]=!0,w}function S(){}function M(w){let F=w.data;return F.aborted=!0,z.apply(F.target,F.args)}let A=$i(d,"open",()=>function(w,F){return w[r]=F[2]==!1,w[a]=F[1],A.apply(w,F)}),R="XMLHttpRequest.send",N=vt("fetchTaskAborting"),_=vt("fetchTaskScheduling"),b=$i(d,"send",()=>function(w,F){if(t.current[_]===!0||w[r])return b.apply(w,F);{let L={target:w,url:w[a],isPeriodic:!1,args:F,aborted:!1},Y=dh(R,S,L,x,M);w&&w[c]===!0&&!L.aborted&&Y.state===p&&Y.invoke()}}),z=$i(d,"abort",()=>function(w,F){let L=h(w);if(L&&typeof L.type=="string"){if(L.cancelFn==null||L.data&&L.data.aborted)return;L.zone.cancelTask(L)}else if(t.current[N]===!0)return z.apply(w,F)})}}),n.__load_patch("geolocation",e=>{e.navigator&&e.navigator.geolocation&&_M(e.navigator.geolocation,["getCurrentPosition","watchPosition"])}),n.__load_patch("PromiseRejectionEvent",(e,t)=>{function i(r){return function(s){my(e,r).forEach(a=>{let c=e.PromiseRejectionEvent;if(c){let l=new c(r,{promise:s.promise,reason:s.rejection});a.invoke(l)}})}}e.PromiseRejectionEvent&&(t[vt("unhandledPromiseRejectionHandler")]=i("unhandledrejection"),t[vt("rejectionHandledHandler")]=i("rejectionhandled"))}),n.__load_patch("queueMicrotask",(e,t,i)=>{MM(e,i)})}function IM(n){n.__load_patch("ZoneAwarePromise",(e,t,i)=>{let r=Object.getOwnPropertyDescriptor,s=Object.defineProperty;function o(G){if(G&&G.toString===Object.prototype.toString){let Q=G.constructor&&G.constructor.name;return(Q||"")+": "+JSON.stringify(G)}return G?G.toString():Object.prototype.toString.call(G)}let a=i.symbol,c=[],l=e[a("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,u=a("Promise"),f=a("then"),d="__creationTrace__";i.onUnhandledError=G=>{if(i.showUncaughtError()){let Q=G&&G.rejection;Q?console.error("Unhandled Promise rejection:",Q instanceof Error?Q.message:Q,"; Zone:",G.zone.name,"; Task:",G.task&&G.task.source,"; Value:",Q,Q instanceof Error?Q.stack:void 0):console.error(G)}},i.microtaskDrainDone=()=>{for(;c.length;){let G=c.shift();try{G.zone.runGuarded(()=>{throw G.throwOriginal?G.rejection:G})}catch(Q){m(Q)}}};let h=a("unhandledPromiseRejectionHandler");function m(G){i.onUnhandledError(G);try{let Q=t[h];typeof Q=="function"&&Q.call(this,G)}catch{}}function E(G){return G&&typeof G.then=="function"}function g(G){return G}function p(G){return ve.reject(G)}let x=a("state"),S=a("value"),M=a("finally"),A=a("parentPromiseValue"),R=a("parentPromiseState"),N="Promise.then",_=null,b=!0,z=!1,w=0;function F(G,Q){return k=>{try{B(G,Q,k)}catch(K){B(G,!1,K)}}}let L=function(){let G=!1;return function(k){return function(){G||(G=!0,k.apply(null,arguments))}}},Y="Promise resolved with itself",H=a("currentTaskTrace");function B(G,Q,k){let K=L();if(G===k)throw new TypeError(Y);if(G[x]===_){let Me=null;try{(typeof k=="object"||typeof k=="function")&&(Me=k&&k.then)}catch(_e){return K(()=>{B(G,!1,_e)})(),G}if(Q!==z&&k instanceof ve&&k.hasOwnProperty(x)&&k.hasOwnProperty(S)&&k[x]!==_)T(k),B(G,k[x],k[S]);else if(Q!==z&&typeof Me=="function")try{Me.call(k,K(F(G,Q)),K(F(G,!1)))}catch(_e){K(()=>{B(G,!1,_e)})()}else{G[x]=Q;let _e=G[S];if(G[S]=k,G[M]===M&&Q===b&&(G[x]=G[R],G[S]=G[A]),Q===z&&k instanceof Error){let pe=t.currentTask&&t.currentTask.data&&t.currentTask.data[d];pe&&s(k,H,{configurable:!0,enumerable:!1,writable:!0,value:pe})}for(let pe=0;pe<_e.length;)D(G,_e[pe++],_e[pe++],_e[pe++],_e[pe++]);if(_e.length==0&&Q==z){G[x]=w;let pe=k;try{throw new Error("Uncaught (in promise): "+o(k)+(k&&k.stack?`
`+k.stack:""))}catch(Ce){pe=Ce}l&&(pe.throwOriginal=!0),pe.rejection=k,pe.promise=G,pe.zone=t.current,pe.task=t.currentTask,c.push(pe),i.scheduleMicroTask()}}}return G}let P=a("rejectionHandledHandler");function T(G){if(G[x]===w){try{let Q=t[P];Q&&typeof Q=="function"&&Q.call(this,{rejection:G[S],promise:G})}catch{}G[x]=z;for(let Q=0;Q<c.length;Q++)G===c[Q].promise&&c.splice(Q,1)}}function D(G,Q,k,K,Me){T(G);let _e=G[x],pe=_e?typeof K=="function"?K:g:typeof Me=="function"?Me:p;Q.scheduleMicroTask(N,()=>{try{let Ce=G[S],ye=!!k&&M===k[M];ye&&(k[A]=Ce,k[R]=_e);let Ne=Q.run(pe,void 0,ye&&pe!==p&&pe!==g?[]:[Ce]);B(k,!0,Ne)}catch(Ce){B(k,!1,Ce)}},k)}let ie="function ZoneAwarePromise() { [native code] }",oe=function(){},fe=e.AggregateError;class ve{static toString(){return ie}static resolve(Q){return Q instanceof ve?Q:B(new this(null),b,Q)}static reject(Q){return B(new this(null),z,Q)}static withResolvers(){let Q={};return Q.promise=new ve((k,K)=>{Q.resolve=k,Q.reject=K}),Q}static any(Q){if(!Q||typeof Q[Symbol.iterator]!="function")return Promise.reject(new fe([],"All promises were rejected"));let k=[],K=0;try{for(let pe of Q)K++,k.push(ve.resolve(pe))}catch{return Promise.reject(new fe([],"All promises were rejected"))}if(K===0)return Promise.reject(new fe([],"All promises were rejected"));let Me=!1,_e=[];return new ve((pe,Ce)=>{for(let ye=0;ye<k.length;ye++)k[ye].then(Ne=>{Me||(Me=!0,pe(Ne))},Ne=>{_e.push(Ne),K--,K===0&&(Me=!0,Ce(new fe(_e,"All promises were rejected")))})})}static race(Q){let k,K,Me=new this((Ce,ye)=>{k=Ce,K=ye});function _e(Ce){k(Ce)}function pe(Ce){K(Ce)}for(let Ce of Q)E(Ce)||(Ce=this.resolve(Ce)),Ce.then(_e,pe);return Me}static all(Q){return ve.allWithCallback(Q)}static allSettled(Q){return(this&&this.prototype instanceof ve?this:ve).allWithCallback(Q,{thenCallback:K=>({status:"fulfilled",value:K}),errorCallback:K=>({status:"rejected",reason:K})})}static allWithCallback(Q,k){let K,Me,_e=new this((Ne,I)=>{K=Ne,Me=I}),pe=2,Ce=0,ye=[];for(let Ne of Q){E(Ne)||(Ne=this.resolve(Ne));let I=Ce;try{Ne.then(Ge=>{ye[I]=k?k.thenCallback(Ge):Ge,pe--,pe===0&&K(ye)},Ge=>{k?(ye[I]=k.errorCallback(Ge),pe--,pe===0&&K(ye)):Me(Ge)})}catch(Ge){Me(Ge)}pe++,Ce++}return pe-=2,pe===0&&K(ye),_e}constructor(Q){let k=this;if(!(k instanceof ve))throw new Error("Must be an instanceof Promise.");k[x]=_,k[S]=[];try{let K=L();Q&&Q(K(F(k,b)),K(F(k,z)))}catch(K){B(k,!1,K)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return ve}then(Q,k){let K=this.constructor?.[Symbol.species];(!K||typeof K!="function")&&(K=this.constructor||ve);let Me=new K(oe),_e=t.current;return this[x]==_?this[S].push(_e,Me,Q,k):D(this,_e,Me,Q,k),Me}catch(Q){return this.then(null,Q)}finally(Q){let k=this.constructor?.[Symbol.species];(!k||typeof k!="function")&&(k=ve);let K=new k(oe);K[M]=M;let Me=t.current;return this[x]==_?this[S].push(Me,K,Q,Q):D(this,Me,K,Q,Q),K}}ve.resolve=ve.resolve,ve.reject=ve.reject,ve.race=ve.race,ve.all=ve.all;let dt=e[u]=e.Promise;e.Promise=ve;let ct=a("thenPatched");function te(G){let Q=G.prototype,k=r(Q,"then");if(k&&(k.writable===!1||!k.configurable))return;let K=Q.then;Q[f]=K,G.prototype.then=function(Me,_e){return new ve((Ce,ye)=>{K.call(this,Ce,ye)}).then(Me,_e)},G[ct]=!0}i.patchThen=te;function ue(G){return function(Q,k){let K=G.apply(Q,k);if(K instanceof ve)return K;let Me=K.constructor;return Me[ct]||te(Me),K}}return dt&&(te(dt),$i(e,"fetch",G=>ue(G))),Promise[t.__symbol__("uncaughtPromiseErrors")]=c,ve})}function RM(n){n.__load_patch("toString",e=>{let t=Function.prototype.toString,i=vt("OriginalDelegate"),r=vt("Promise"),s=vt("Error"),o=function(){if(typeof this=="function"){let u=this[i];if(u)return typeof u=="function"?t.call(u):Object.prototype.toString.call(u);if(this===Promise){let f=e[r];if(f)return t.call(f)}if(this===Error){let f=e[s];if(f)return t.call(f)}}return t.call(this)};o[i]=t,Function.prototype.toString=o;let a=Object.prototype.toString,c="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?c:a.call(this)}})}function NM(n,e,t,i,r){let s=Zone.__symbol__(i);if(e[s])return;let o=e[s]=e[i];e[i]=function(a,c,l){return c&&c.prototype&&r.forEach(function(u){let f=`${t}.${i}::`+u,d=c.prototype;try{if(d.hasOwnProperty(u)){let h=n.ObjectGetOwnPropertyDescriptor(d,u);h&&h.value?(h.value=n.wrapWithCurrentZone(h.value,f),n._redefineProperty(c.prototype,u,h)):d[u]&&(d[u]=n.wrapWithCurrentZone(d[u],f))}else d[u]&&(d[u]=n.wrapWithCurrentZone(d[u],f))}catch{}}),o.call(e,a,c,l)},n.attachOriginToPatched(e[i],o)}function PM(n){n.__load_patch("util",(e,t,i)=>{let r=sh(e);i.patchOnProperties=uy,i.patchMethod=$i,i.bindArguments=fh,i.patchMacroTask=vM;let s=t.__symbol__("BLACK_LISTED_EVENTS"),o=t.__symbol__("UNPATCHED_EVENTS");e[o]&&(e[s]=e[o]),e[s]&&(t[s]=t[o]=e[s]),i.patchEventPrototype=bM,i.patchEventTarget=SM,i.isIEOrEdge=xM,i.ObjectDefineProperty=oh,i.ObjectGetOwnPropertyDescriptor=ua,i.ObjectCreate=pM,i.ArraySlice=mM,i.patchClass=la,i.wrapWithCurrentZone=uh,i.filterProperties=gy,i.attachOriginToPatched=qi,i._redefineProperty=Object.defineProperty,i.patchCallbacks=NM,i.getGlobalObjects=()=>({globalSources:dy,zoneSymbolEventNames:jn,eventNames:r,isBrowser:hh,isMix:ly,isNode:Zc,TRUE_STR:Wi,FALSE_STR:ji,ZONE_SYMBOL_PREFIX:da,ADD_EVENT_LISTENER_STR:ch,REMOVE_EVENT_LISTENER_STR:lh})})}function FM(n){IM(n),RM(n),PM(n)}var _y=hM();FM(_y);AM(_y);var on=null,Jc=!1,ph=1,OM=null,xn=Symbol("SIGNAL");function He(n){let e=on;return on=n,e}function tl(){return on}var Ks={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function nl(n){if(Jc)throw new Error("");if(on===null)return;on.consumerOnSignalRead(n);let e=on.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=on.recomputing;if(i&&(t=e!==void 0?e.nextProducer:on.producers,t!==void 0&&t.producer===n)){on.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===on&&(!i||kM(r,on)))return;let s=Qs(on),o={producer:n,consumer:on,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};on.producersTail=o,e!==void 0?e.nextProducer=o:on.producers=o,s&&Ey(n,o)}function yy(){ph++}function il(n){if(!(Qs(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===ph)){if(!n.producerMustRecompute(n)&&!_h(n)){el(n);return}n.producerRecomputeValue(n),el(n)}}function mh(n){if(n.consumers===void 0)return;let e=Jc;Jc=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||LM(i)}}finally{Jc=e}}function gh(){return on?.consumerAllowSignalWrites!==!1}function LM(n){n.dirty=!0,mh(n),n.consumerMarkedDirty?.(n)}function el(n){n.dirty=!1,n.lastCleanEpoch=ph}function pa(n){return n&&vy(n),He(n)}function vy(n){n.producersTail=void 0,n.recomputing=!0}function rl(n,e){He(e),n&&xy(n)}function xy(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(Qs(n))do t=yh(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function _h(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(il(t),i!==t.version))return!0}return!1}function sl(n){if(Qs(n)){let e=n.producers;for(;e!==void 0;)e=yh(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function Ey(n,e){let t=n.consumersTail,i=Qs(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)Ey(r.producer,r)}function yh(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!Qs(e)){let s=e.producers;for(;s!==void 0;)s=yh(s)}return t}function Qs(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function ol(n){OM?.(n)}function kM(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function al(n,e){return Object.is(n,e)}function cl(n,e){let t=Object.create(UM);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(il(t),nl(t),t.value===ha)throw t.error;return t.value};return i[xn]=t,ol(t),i}var Kc=Symbol("UNSET"),Qc=Symbol("COMPUTING"),ha=Symbol("ERRORED"),UM=_t(ot({},Ks),{value:Kc,dirty:!0,error:null,equal:al,kind:"computed",producerMustRecompute(n){return n.value===Kc||n.value===Qc},producerRecomputeValue(n){if(n.value===Qc)throw new Error("");let e=n.value;n.value=Qc;let t=pa(n),i,r=!1;try{i=n.computation(),He(null),r=e!==Kc&&e!==ha&&i!==ha&&n.equal(e,i)}catch(s){i=ha,n.error=s}finally{rl(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function BM(){throw new Error}var Sy=BM;function by(n){Sy(n)}function vh(n){Sy=n}var VM=null;function xh(n,e){let t=Object.create(Cy);t.value=n,e!==void 0&&(t.equal=e);let i=()=>My(t);return i[xn]=t,ol(t),[i,o=>ll(t,o),o=>Eh(t,o)]}function My(n){return nl(n),n.value}function ll(n,e){gh()||by(n),n.equal(n.value,e)||(n.value=e,HM(n))}function Eh(n,e){gh()||by(n),ll(n,e(n.value))}var Cy=_t(ot({},Ks),{equal:al,value:void 0,kind:"signal"});function HM(n){n.version++,yy(),mh(n),VM?.(n)}function xt(n){return typeof n=="function"}function ul(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var dl=ul(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function ma(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var hn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(xt(i))try{i()}catch(s){e=s instanceof dl?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{wy(s)}catch(o){e=e??[],o instanceof dl?e=[...e,...o.errors]:e.push(o)}}if(e)throw new dl(e)}}add(e){var t;if(e&&e!==this)if(this.closed)wy(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&ma(t,e)}remove(e){let{_finalizers:t}=this;t&&ma(t,e),e instanceof n&&e._removeParent(this)}};hn.EMPTY=(()=>{let n=new hn;return n.closed=!0,n})();var Sh=hn.EMPTY;function fl(n){return n instanceof hn||n&&"closed"in n&&xt(n.remove)&&xt(n.add)&&xt(n.unsubscribe)}function wy(n){xt(n)?n():n.unsubscribe()}var ti={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var eo={setTimeout(n,e,...t){let{delegate:i}=eo;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=eo;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function hl(n){eo.setTimeout(()=>{let{onUnhandledError:e}=ti;if(e)e(n);else throw n})}function bh(){}var Ty=Mh("C",void 0,void 0);function Dy(n){return Mh("E",void 0,n)}function Ay(n){return Mh("N",n,void 0)}function Mh(n,e,t){return{kind:n,value:e,error:t}}var es=null;function to(n){if(ti.useDeprecatedSynchronousErrorHandling){let e=!es;if(e&&(es={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=es;if(es=null,t)throw i}}else n()}function Iy(n){ti.useDeprecatedSynchronousErrorHandling&&es&&(es.errorThrown=!0,es.error=n)}var ts=class extends hn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,fl(e)&&e.add(this)):this.destination=WM}static create(e,t,i){return new no(e,t,i)}next(e){this.isStopped?wh(Ay(e),this):this._next(e)}error(e){this.isStopped?wh(Dy(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?wh(Ty,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},zM=Function.prototype.bind;function Ch(n,e){return zM.call(n,e)}var Th=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){pl(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){pl(i)}else pl(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){pl(t)}}},no=class extends ts{constructor(e,t,i){super();let r;if(xt(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&ti.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Ch(e.next,s),error:e.error&&Ch(e.error,s),complete:e.complete&&Ch(e.complete,s)}):r=e}this.destination=new Th(r)}};function pl(n){ti.useDeprecatedSynchronousErrorHandling?Iy(n):hl(n)}function GM(n){throw n}function wh(n,e){let{onStoppedNotification:t}=ti;t&&eo.setTimeout(()=>t(n,e))}var WM={closed:!0,next:bh,error:GM,complete:bh};var io=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Ry(n){return n}function Ny(n){return n.length===0?Ry:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Gt=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=$M(t)?t:new no(t,i,r);return to(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=Py(i),new i((r,s)=>{let o=new no({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[io](){return this}pipe(...t){return Ny(t)(this)}toPromise(t){return t=Py(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function Py(n){var e;return(e=n??ti.Promise)!==null&&e!==void 0?e:Promise}function jM(n){return n&&xt(n.next)&&xt(n.error)&&xt(n.complete)}function $M(n){return n&&n instanceof ts||jM(n)&&fl(n)}function qM(n){return xt(n?.lift)}function ro(n){return e=>{if(qM(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function so(n,e,t,i,r){return new Dh(n,e,t,i,r)}var Dh=class extends ts{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var Fy=ul(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var xi=(()=>{class n extends Gt{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new ml(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new Fy}next(t){to(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){to(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){to(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?Sh:(this.currentObservers=null,s.push(t),new hn(()=>{this.currentObservers=null,ma(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Gt;return t.source=this,t}}return n.create=(e,t)=>new ml(e,t),n})(),ml=class extends xi{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:Sh}};var ga=class extends xi{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};function XM(n){return n[n.length-1]}function Oy(n){return xt(XM(n))?n.pop():void 0}function ky(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(f){o(f)}}function c(u){try{l(i.throw(u))}catch(f){o(f)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function Ly(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function ns(n){return this instanceof ns?(this.v=n,this):new ns(n)}function Uy(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(m){return Promise.resolve(m).then(h,f)}}function a(h,m){i[h]&&(r[h]=function(E){return new Promise(function(g,p){s.push([h,E,g,p])>1||c(h,E)})},m&&(r[h]=m(r[h])))}function c(h,m){try{l(i[h](m))}catch(E){d(s[0][3],E)}}function l(h){h.value instanceof ns?Promise.resolve(h.value.v).then(u,f):d(s[0][2],h)}function u(h){c("next",h)}function f(h){c("throw",h)}function d(h,m){h(m),s.shift(),s.length&&c(s[0][0],s[0][1])}}function By(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof Ly=="function"?Ly(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var gl=n=>n&&typeof n.length=="number"&&typeof n!="function";function _l(n){return xt(n?.then)}function yl(n){return xt(n[io])}function vl(n){return Symbol.asyncIterator&&xt(n?.[Symbol.asyncIterator])}function xl(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function YM(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var El=YM();function Sl(n){return xt(n?.[El])}function bl(n){return Uy(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield ns(t.read());if(r)return yield ns(void 0);yield yield ns(i)}}finally{t.releaseLock()}})}function Ml(n){return xt(n?.getReader)}function Er(n){if(n instanceof Gt)return n;if(n!=null){if(yl(n))return ZM(n);if(gl(n))return JM(n);if(_l(n))return KM(n);if(vl(n))return Vy(n);if(Sl(n))return QM(n);if(Ml(n))return eC(n)}throw xl(n)}function ZM(n){return new Gt(e=>{let t=n[io]();if(xt(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function JM(n){return new Gt(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function KM(n){return new Gt(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,hl)})}function QM(n){return new Gt(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function Vy(n){return new Gt(e=>{tC(n,e).catch(t=>e.error(t))})}function eC(n){return Vy(bl(n))}function tC(n,e){var t,i,r,s;return ky(this,void 0,void 0,function*(){try{for(t=By(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Ei(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function Cl(n,e=0){return ro((t,i)=>{t.subscribe(so(i,r=>Ei(i,n,()=>i.next(r),e),()=>Ei(i,n,()=>i.complete(),e),r=>Ei(i,n,()=>i.error(r),e)))})}function wl(n,e=0){return ro((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function Hy(n,e){return Er(n).pipe(wl(e),Cl(e))}function zy(n,e){return Er(n).pipe(wl(e),Cl(e))}function Gy(n,e){return new Gt(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function Wy(n,e){return new Gt(t=>{let i;return Ei(t,e,()=>{i=n[El](),Ei(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>xt(i?.return)&&i.return()})}function Tl(n,e){if(!n)throw new Error("Iterable cannot be null");return new Gt(t=>{Ei(t,e,()=>{let i=n[Symbol.asyncIterator]();Ei(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function jy(n,e){return Tl(bl(n),e)}function $y(n,e){if(n!=null){if(yl(n))return Hy(n,e);if(gl(n))return Gy(n,e);if(_l(n))return zy(n,e);if(vl(n))return Tl(n,e);if(Sl(n))return Wy(n,e);if(Ml(n))return jy(n,e)}throw xl(n)}function Ah(n,e){return e?$y(n,e):Er(n)}function is(n,e){return ro((t,i)=>{let r=0;t.subscribe(so(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:nC}=Array;function iC(n,e){return nC(e)?n(...e):n(e)}function qy(n){return is(e=>iC(n,e))}var{isArray:rC}=Array,{getPrototypeOf:sC,prototype:oC,keys:aC}=Object;function Xy(n){if(n.length===1){let e=n[0];if(rC(e))return{args:e,keys:null};if(cC(e)){let t=aC(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function cC(n){return n&&typeof n=="object"&&sC(n)===oC}function Yy(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function Ih(...n){let e=Oy(n),{args:t,keys:i}=Xy(n),r=new Gt(s=>{let{length:o}=t;if(!o){s.complete();return}let a=new Array(o),c=o,l=o;for(let u=0;u<o;u++){let f=!1;Er(t[u]).subscribe(so(s,d=>{f||(f=!0,l--),a[u]=d},()=>c--,void 0,()=>{(!c||!f)&&(l||s.next(i?Yy(i,a):a),s.complete())}))}});return e?r.pipe(qy(e)):r}var Rh;function Dl(){return Rh}function Si(n){let e=Rh;return Rh=n,e}var Zy=Symbol("NotFound");function oo(n){return n===Zy||n?.name==="\u0275NotFound"}function Jy(n){let e=He(null);try{return n()}finally{He(e)}}var $h="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",rt=class extends Error{code;constructor(e,t){super(qh(e,t)),this.code=e}};function dC(n){return`NG0${Math.abs(n)}`}function qh(n,e){return`${dC(n)}${e?": "+e:""}`}function Rt(n){for(let e in n)if(n[e]===Rt)return e;throw Error("")}function nv(n,e){for(let t in e)e.hasOwnProperty(t)&&!n.hasOwnProperty(t)&&(n[t]=e[t])}function Pl(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(Pl).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function Fl(n,e){return n?e?`${n} ${e}`:n:e||""}var fC=Rt({__forward_ref__:Rt});function $n(n){return n.__forward_ref__=$n,n}function nn(n){return Xh(n)?n():n}function Xh(n){return typeof n=="function"&&n.hasOwnProperty(fC)&&n.__forward_ref__===$n}function Lt(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function br(n){return{providers:n.providers||[],imports:n.imports||[]}}function Ol(n){return hC(n,Ll)}function hC(n,e){return n.hasOwnProperty(e)&&n[e]||null}function pC(n){let e=n?.[Ll]??null;return e||null}function Ph(n){return n&&n.hasOwnProperty(Il)?n[Il]:null}var Ll=Rt({\u0275prov:Rt}),Il=Rt({\u0275inj:Rt}),at=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Lt({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Yh(n){return n&&!!n.\u0275providers}var Zh=Rt({\u0275cmp:Rt}),Jh=Rt({\u0275dir:Rt}),Kh=Rt({\u0275pipe:Rt});var ya=Rt({\u0275fac:Rt}),us=Rt({__NG_ELEMENT_ID__:Rt}),Ky=Rt({__NG_ENV_ID__:Rt});function Sa(n){return ep(n,"@Component"),n[Zh]||null}function Qh(n){return ep(n,"@Directive"),n[Jh]||null}function iv(n){return ep(n,"@Pipe"),n[Kh]||null}function ep(n,e){if(n==null)throw new rt(-919,!1)}function ba(n){return typeof n=="string"?n:n==null?"":String(n)}var rv=Rt({ngErrorCode:Rt}),mC=Rt({ngErrorMessage:Rt}),gC=Rt({ngTokenPath:Rt});function tp(n,e){return sv("",-200,e)}function kl(n,e){throw new rt(-201,!1)}function sv(n,e,t){let i=new rt(e,n);return i[rv]=e,i[mC]=n,t&&(i[gC]=t),i}function _C(n){return n[rv]}var Fh;function ov(){return Fh}function Dn(n){let e=Fh;return Fh=n,e}function np(n,e,t){let i=Ol(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;kl(n,"")}var yC={},rs=yC,vC="__NG_DI_FLAG__",Oh=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=ss(t)||0;try{return this.injector.get(e,i&8?null:rs,i)}catch(r){if(oo(r))return r;throw r}}};function xC(n,e=0){let t=Dl();if(t===void 0)throw new rt(-203,!1);if(t===null)return np(n,void 0,e);{let i=EC(e),r=t.retrieve(n,i);if(oo(r)){if(i.optional)return null;throw r}return r}}function Ct(n,e=0){return(ov()||xC)(nn(n),e)}function nt(n,e){return Ct(n,ss(e))}function ss(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function EC(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function Lh(n){let e=[];for(let t=0;t<n.length;t++){let i=nn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new rt(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=SC(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(Ct(r,s))}else e.push(Ct(i))}return e}function SC(n){return n[vC]}function os(n,e){let t=n.hasOwnProperty(ya);return t?n[ya]:null}function Ul(n,e){n.forEach(t=>Array.isArray(t)?Ul(t,e):e(t))}function av(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function ip(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function cv(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function Bl(n,e,t){let i=co(n,e);return i>=0?n[i|1]=t:(i=~i,cv(n,i,e,t)),i}function Vl(n,e){let t=co(n,e);if(t>=0)return n[t|1]}function co(n,e){return bC(n,e,1)}function bC(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var Mr={},pn=[],Ma=new at(""),rp=new at("",-1),sp=new at(""),va=class{get(e,t=rs){if(t===rs){let r=sv("",-201);throw r.name="\u0275NotFound",r}return t}};function lv(...n){return{\u0275providers:op(!0,n),\u0275fromNgModule:!0}}function op(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Ul(e,o=>{let a=o;Rl(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&uv(r,s),t}function uv(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];ap(r,s=>{e(s,i)})}}function Rl(n,e,t,i){if(n=nn(n),!n)return!1;let r=null,s=Ph(n),o=!s&&Sa(n);if(!s&&!o){let c=n.ngModule;if(s=Ph(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)Rl(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;Ul(s.imports,u=>{Rl(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&uv(l,e)}if(!a){let l=os(r)||(()=>new r);e({provide:r,useFactory:l,deps:pn},r),e({provide:sp,useValue:r,multi:!0},r),e({provide:Ma,useValue:()=>Ct(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;ap(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function ap(n,e){for(let t of n)Yh(t)&&(t=t.\u0275providers),Array.isArray(t)?ap(t,e):e(t)}var MC=Rt({provide:String,useValue:Rt});function dv(n){return n!==null&&typeof n=="object"&&MC in n}function CC(n){return!!(n&&n.useExisting)}function wC(n){return!!(n&&n.useFactory)}function as(n){return typeof n=="function"}function fv(n){return!!n.useClass}var Ca=new at(""),Al={},Qy={},Nh;function wa(){return Nh===void 0&&(Nh=new va),Nh}var ni=class{},cs=class extends ni{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Uh(e,o=>this.processProvider(o)),this.records.set(rp,ao(void 0,this)),r.has("environment")&&this.records.set(ni,ao(void 0,this));let s=this.records.get(Ca);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(sp,pn,{self:!0}))}retrieve(e,t){let i=ss(t)||0;try{return this.get(e,rs,i)}catch(r){if(oo(r))return r;throw r}}destroy(){_a(this),this._destroyed=!0;let e=He(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),He(e)}}onDestroy(e){return _a(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){_a(this);let t=Si(this),i=Dn(void 0),r;try{return e()}finally{Si(t),Dn(i)}}get(e,t=rs,i){if(_a(this),e.hasOwnProperty(Ky))return e[Ky](this);let r=ss(i),s,o=Si(this),a=Dn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=RC(e)&&Ol(e);u&&this.injectableDefInScope(u)?l=ao(kh(e),Al):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?wa():this.parent;return t=r&8&&t===rs?null:t,c.get(e,t)}catch(c){let l=_C(c);throw l===-200||l===-201?new rt(l,null):c}finally{Dn(a),Si(o)}}resolveInjectorInitializers(){let e=He(null),t=Si(this),i=Dn(void 0),r;try{let s=this.get(Ma,pn,{self:!0});for(let o of s)o()}finally{Si(t),Dn(i),He(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=nn(e);let t=as(e)?e:nn(e&&e.provide),i=DC(e);if(!as(e)&&e.multi===!0){let r=this.records.get(t);r||(r=ao(void 0,Al,!0),r.factory=()=>Lh(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=He(null);try{if(t.value===Qy)throw tp("");return t.value===Al&&(t.value=Qy,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&IC(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{He(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=nn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function kh(n){let e=Ol(n),t=e!==null?e.factory:os(n);if(t!==null)return t;if(n instanceof at)throw new rt(-204,!1);if(n instanceof Function)return TC(n);throw new rt(-204,!1)}function TC(n){if(n.length>0)throw new rt(-204,!1);let t=pC(n);return t!==null?()=>t.factory(n):()=>new n}function DC(n){if(dv(n))return ao(void 0,n.useValue);{let e=cp(n);return ao(e,Al)}}function cp(n,e,t){let i;if(as(n)){let r=nn(n);return os(r)||kh(r)}else if(dv(n))i=()=>nn(n.useValue);else if(wC(n))i=()=>n.useFactory(...Lh(n.deps||[]));else if(CC(n))i=(r,s)=>Ct(nn(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=nn(n&&(n.useClass||n.provide));if(AC(n))i=()=>new r(...Lh(n.deps));else return os(r)||kh(r)}return i}function _a(n){if(n.destroyed)throw new rt(-205,!1)}function ao(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function AC(n){return!!n.deps}function IC(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function RC(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Uh(n,e){for(let t of n)Array.isArray(t)?Uh(t,e):t&&Yh(t)?Uh(t.\u0275providers,e):e(t)}function Hl(n,e){let t;n instanceof cs?(_a(n),t=n):t=new Oh(n);let i,r=Si(t),s=Dn(void 0);try{return e()}finally{Si(r),Dn(s)}}function hv(){return ov()!==void 0||Dl()!=null}var ii=0,qe=1,$e=2,mn=3,qn=4,ri=5,lo=6,uo=7,Wt=8,Zi=9,Mi=10,kt=11,fo=12,lp=13,ds=14,An=15,fs=16,hs=17,ps=18,Ji=19,up=20,Xi=21,zl=22,Ta=23,In=24,ms=25,Cr=26,an=27,pv=1,dp=6,ho=7,mv=8,Da=9,jt=10;function Ki(n){return Array.isArray(n)&&typeof n[pv]=="object"}function Qi(n){return Array.isArray(n)&&n[pv]===!0}function fp(n){return(n.flags&4)!==0}function er(n){return n.componentOffset>-1}function Gl(n){return(n.flags&1)===1}function Ci(n){return!!n.template}function po(n){return(n[$e]&512)!==0}function gs(n){return(n[$e]&256)===256}var hp="svg",gv="math";function si(n){for(;Array.isArray(n);)n=n[ii];return n}function pp(n,e){return si(e[n])}function wi(n,e){return si(e[n.index])}function Wl(n,e){return n.data[e]}function Xn(n,e){let t=e[n];return Ki(t)?t:t[ii]}function jl(n){return(n[$e]&128)===128}function wr(n,e){return e==null?null:n[e]}function mp(n){n[hs]=0}function gp(n){n[$e]&1024||(n[$e]|=1024,jl(n)&&mo(n))}function _v(n,e){for(;n>0;)e=e[ds],n--;return e}function Aa(n){return!!(n[$e]&9216||n[In]?.dirty)}function $l(n){n[Mi].changeDetectionScheduler?.notify(8),n[$e]&64&&(n[$e]|=1024),Aa(n)&&mo(n)}function mo(n){n[Mi].changeDetectionScheduler?.notify(0);let e=Sr(n);for(;e!==null&&!(e[$e]&8192||(e[$e]|=8192,!jl(e)));)e=Sr(e)}function _p(n,e){if(gs(n))throw new rt(911,!1);n[Xi]===null&&(n[Xi]=[]),n[Xi].push(e)}function yv(n,e){if(n[Xi]===null)return;let t=n[Xi].indexOf(e);t!==-1&&n[Xi].splice(t,1)}function Sr(n){let e=n[mn];return Qi(e)?e[mn]:e}function vv(n){return n[uo]??=[]}function xv(n){return n.cleanup??=[]}var it={lFrame:kv(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Bh=!1;function Ev(){return it.lFrame.elementDepthCount}function Sv(){it.lFrame.elementDepthCount++}function bv(){it.lFrame.elementDepthCount--}function Mv(){return it.bindingsEnabled}function Cv(){return it.skipHydrationRootTNode!==null}function wv(n){return it.skipHydrationRootTNode===n}function Tv(){it.skipHydrationRootTNode=null}function pt(){return it.lFrame.lView}function cn(){return it.lFrame.tView}function mt(n){return it.lFrame.contextLView=n,n[Wt]}function gt(n){return it.lFrame.contextLView=null,n}function Yn(){let n=yp();for(;n!==null&&n.type===64;)n=n.parent;return n}function yp(){return it.lFrame.currentTNode}function Dv(){let n=it.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function go(n,e){let t=it.lFrame;t.currentTNode=n,t.isParent=e}function vp(){return it.lFrame.isParent}function Av(){it.lFrame.isParent=!1}function xp(){return Bh}function Ep(n){let e=Bh;return Bh=n,e}function Iv(){return it.lFrame.bindingIndex}function Rv(n){return it.lFrame.bindingIndex=n}function _s(){return it.lFrame.bindingIndex++}function ql(n){let e=it.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function Nv(){return it.lFrame.inI18n}function Pv(n,e){let t=it.lFrame;t.bindingIndex=t.bindingRootIndex=n,Xl(e)}function Fv(){return it.lFrame.currentDirectiveIndex}function Xl(n){it.lFrame.currentDirectiveIndex=n}function Ov(n){let e=it.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function Sp(n){it.lFrame.currentQueryIndex=n}function NC(n){let e=n[qe];return e.type===2?e.declTNode:e.type===1?n[ri]:null}function bp(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=NC(s),r===null||(s=s[ds],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=it.lFrame=Lv();return i.currentTNode=e,i.lView=n,!0}function Yl(n){let e=Lv(),t=n[qe];it.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function Lv(){let n=it.lFrame,e=n===null?null:n.child;return e===null?kv(n):e}function kv(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function Uv(){let n=it.lFrame;return it.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Mp=Uv;function Zl(){let n=Uv();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function Bv(n){return(it.lFrame.contextLView=_v(n,it.lFrame.contextLView))[Wt]}function Ti(){return it.lFrame.selectedIndex}function Tr(n){it.lFrame.selectedIndex=n}function Jl(){let n=it.lFrame;return Wl(n.tView,n.selectedIndex)}function ys(){it.lFrame.currentNamespace=hp}function _o(){PC()}function PC(){it.lFrame.currentNamespace=null}function Vv(){return it.lFrame.currentNamespace}var Hv=!0;function Kl(){return Hv}function Ql(n){Hv=n}function Vh(n,e=null,t=null,i){let r=zv(n,e,t,i);return r.resolveInjectorInitializers(),r}function zv(n,e=null,t=null,i,r=new Set){let s=[t||pn,lv(n)],o;return new cs(s,e||wa(),o||null,r)}var Yi=class n{static THROW_IF_NOT_FOUND=rs;static NULL=new va;static create(e,t){if(Array.isArray(e))return Vh({name:""},t,e,"");{let i=e.name??"";return Vh({name:i},e.parent,e.providers,i)}}static \u0275prov=Lt({token:n,providedIn:"any",factory:()=>Ct(rp)});static __NG_ELEMENT_ID__=-1},oi=new at(""),vs=(()=>{class n{static __NG_ELEMENT_ID__=FC;static __NG_ENV_ID__=t=>t}return n})(),Hh=class extends vs{_lView;constructor(e){super(),this._lView=e}get destroyed(){return gs(this._lView)}onDestroy(e){let t=this._lView;return _p(t,e),()=>yv(t,e)}};function FC(){return new Hh(pt())}var Gv=!1,Wv=new at(""),yo=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ga(!1);debugTaskTracker=nt(Wv,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Gt(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Lt({token:n,providedIn:"root",factory:()=>new n})}return n})(),zh=class extends xi{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,hv()&&(this.destroyRef=nt(vs,{optional:!0})??void 0,this.pendingTasks=nt(yo,{optional:!0})??void 0)}emit(e){let t=He(null);try{super.next(e)}finally{He(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof hn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},En=zh;function Nl(...n){}function Cp(n){let e,t;function i(){n=Nl;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function jv(n){return queueMicrotask(()=>n()),()=>{n=Nl}}var wp="isAngularZone",xa=wp+"_ID",OC=0,gn=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new En(!1);onMicrotaskEmpty=new En(!1);onStable=new En(!1);onError=new En(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=Gv}=e;if(typeof Zone>"u")throw new rt(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,UC(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(wp)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new rt(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new rt(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,LC,Nl,Nl);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},LC={};function Tp(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function kC(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){Cp(()=>{n.callbackScheduled=!1,Gh(n),n.isCheckStableRunning=!0,Tp(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Gh(n)}function UC(n){let e=()=>{kC(n)},t=OC++;n._inner=n._inner.fork({name:"angular",properties:{[wp]:!0,[xa]:t,[xa+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(BC(c))return i.invokeTask(s,o,a,c);try{return ev(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),tv(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return ev(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!VC(c)&&e(),tv(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Gh(n),Tp(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Gh(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function ev(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function tv(n){n._nesting--,Tp(n)}var Ea=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new En;onMicrotaskEmpty=new En;onStable=new En;onError=new En;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function BC(n){return $v(n,"__ignore_ng_zone__")}function VC(n){return $v(n,"__scheduler_tick__")}function $v(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var bi=class{_console=console;handleError(e){this._console.error("ERROR",e)}},vo=new at("",{factory:()=>{let n=nt(gn),e=nt(ni),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(bi),t.handleError(i))})}}}),qv={provide:Ma,useValue:()=>{let n=nt(bi,{optional:!0})},multi:!0};function xs(n,e){let[t,i,r]=xh(n,e?.equal),s=t,o=s[xn];return s.set=i,s.update=r,s.asReadonly=Xv.bind(s),s}function Xv(){let n=this[xn];if(n.readonlyFn===void 0){let e=()=>this();e[xn]=n,n.readonlyFn=e}return n.readonlyFn}var eu=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=HC}return n})();function HC(){return new eu(pt(),Yn())}var ls=class{},Ia=new at("",{factory:()=>!0});var Dp=new at("");var Ap=(()=>{class n{static \u0275prov=Lt({token:n,providedIn:"root",factory:()=>new Wh})}return n})(),Wh=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},jh=class{[xn];constructor(e){this[xn]=e}destroy(){this[xn].destroy()}};function ka(n){return{toString:n}.toString()}function b0(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var su=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},Ua=(()=>{let n=()=>M0;return n.ngInherit=!0,n})();function M0(n){return n.type.prototype.ngOnChanges&&(n.setInput=QC),KC}function KC(){let n=w0(this),e=n?.current;if(e){let t=n.previous;if(t===Mr)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function QC(n,e,t,i,r){let s=this.declaredInputs[i],o=w0(n)||ew(n,{previous:Mr,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new su(l&&l.currentValue,t,c===Mr),b0(n,e,r,t)}var C0="__ngSimpleChanges__";function w0(n){return n[C0]||null}function ew(n,e){return n[C0]=e}var Yv=[];var Et=function(n,e=null,t){for(let i=0;i<Yv.length;i++){let r=Yv[i];r(n,e,t)}},ft=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ft||{});function tw(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=M0(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function nw(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function nu(n,e,t){T0(n,e,3,t)}function iu(n,e,t,i){(n[$e]&3)===t&&T0(n,e,t,i)}function Ip(n,e){let t=n[$e];(t&3)===e&&(t&=16383,t+=1,n[$e]=t)}function T0(n,e,t,i){let r=i!==void 0?n[hs]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[hs]+=65536),(a<s||s==-1)&&(iw(n,t,e,c),n[hs]=(n[hs]&4294901760)+c+2),c++}function Zv(n,e){Et(ft.LifecycleHookStart,n,e);let t=He(null);try{e.call(n)}finally{He(t),Et(ft.LifecycleHookEnd,n,e)}}function iw(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[$e]>>14<n[hs]>>16&&(n[$e]&3)===e&&(n[$e]+=16384,Zv(a,s)):Zv(a,s)}var Eo=-1,Es=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function rw(n){return(n.flags&8)!==0}function sw(n){return(n.flags&16)!==0}function ow(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];cw(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function aw(n){return n===3||n===4||n===6}function cw(n){return n.charCodeAt(0)===64}function Pa(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?Jv(n,t,r,null,e[++i]):Jv(n,t,r,null,null))}}return n}function Jv(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function lw(n){return n!==Eo}function Vp(n){return n&32767}function uw(n){return n>>16}function Hp(n,e){let t=uw(n),i=e;for(;t>0;)i=i[ds],t--;return i}var zp=!0;function Kv(n){let e=zp;return zp=n,e}var dw=256,D0=dw-1,A0=5,fw=0,Di={};function hw(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(us)&&(i=t[us]),i==null&&(i=t[us]=fw++);let r=i&D0,s=1<<r;e.data[n+(r>>A0)]|=s}function ou(n,e){let t=I0(n,e);if(t!==-1)return t;let i=e[qe];i.firstCreatePass&&(n.injectorIndex=e.length,Rp(i.data,n),Rp(e,null),Rp(i.blueprint,null));let r=R0(n,e),s=n.injectorIndex;if(lw(r)){let o=Vp(r),a=Hp(r,e),c=a[qe].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function Rp(n,e){n.push(0,0,0,0,0,0,0,0,e)}function I0(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function R0(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=L0(r),i===null)return Eo;if(t++,r=r[ds],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Eo}function Gp(n,e,t){hw(n,e,t)}function N0(n,e,t){if(t&8||n!==void 0)return n;kl(e,"NodeInjector")}function P0(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Zi],s=Dn(void 0);try{return r?r.get(e,i,t&8):np(e,i,t&8)}finally{Dn(s)}}return N0(i,e,t)}function F0(n,e,t,i=0,r){if(n!==null){if(e[$e]&2048&&!(i&2)){let o=yw(n,e,t,i,Di);if(o!==Di)return o}let s=O0(n,e,t,i,Di);if(s!==Di)return s}return P0(e,t,i,r)}function O0(n,e,t,i,r){let s=gw(t);if(typeof s=="function"){if(!bp(e,n,i))return i&1?N0(r,t,i):P0(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))kl(t);else return o}finally{Mp()}}else if(typeof s=="number"){let o=null,a=I0(n,e),c=Eo,l=i&1?e[An][ri]:null;for((a===-1||i&4)&&(c=a===-1?R0(n,e):e[a+8],c===Eo||!e0(i,!1)?a=-1:(o=e[qe],a=Vp(c),e=Hp(c,e)));a!==-1;){let u=e[qe];if(Qv(s,a,u.data)){let f=pw(a,e,t,o,i,l);if(f!==Di)return f}c=e[a+8],c!==Eo&&e0(i,e[qe].data[a+8]===l)&&Qv(s,a,e)?(o=u,a=Vp(c),e=Hp(c,e)):a=-1}}return r}function pw(n,e,t,i,r,s){let o=e[qe],a=o.data[n+8],c=i==null?er(a)&&zp:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=mw(a,o,t,c,l);return u!==null?au(e,o,u,a,r):Di}function mw(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,f=i?a:a+u,d=r?a+u:l;for(let h=f;h<d;h++){let m=o[h];if(h<c&&t===m||h>=c&&m.type===t)return h}if(r){let h=o[c];if(h&&Ci(h)&&h.type===t)return c}return null}function au(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof Es){let a=s;if(a.resolving)throw tp("");let c=Kv(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,f=a.injectImpl?Dn(a.injectImpl):null,d=bp(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&tw(t,o[t],e)}finally{f!==null&&Dn(f),Kv(c),a.resolving=!1,Mp()}}return s}function gw(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(us)?n[us]:void 0;return typeof e=="number"?e>=0?e&D0:_w:e}function Qv(n,e,t){let i=1<<n;return!!(t[e+(n>>A0)]&i)}function e0(n,e){return!(n&2)&&!(n&1&&e)}var cu=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return F0(this._tNode,this._lView,e,ss(i),t)}};function _w(){return new cu(Yn(),pt())}function Cs(n){return ka(()=>{let e=n.prototype.constructor,t=e[ya]||Wp(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[ya]||Wp(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function Wp(n){return Xh(n)?()=>{let e=Wp(nn(n));return e&&e()}:os(n)}function yw(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[$e]&2048&&!po(o);){let a=O0(s,o,t,i|2,Di);if(a!==Di)return a;let c=s.parent;if(!c){let l=o[up];if(l){let u=l.get(t,Di,i&-5);if(u!==Di)return u}c=L0(o),o=o[ds]}s=c}return r}function L0(n){let e=n[qe],t=e.type;return t===2?e.declTNode:t===1?n[ri]:null}function vw(){return k0(Yn(),pt())}function k0(n,e){return new Dr(wi(n,e))}var Dr=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=vw}return n})();function U0(n){return(n.flags&128)===128}var pm=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(pm||{}),B0=new Map,xw=0;function Ew(){return xw++}function Sw(n){B0.set(n[Ji],n)}function jp(n){B0.delete(n[Ji])}var t0="__ngContext__";function So(n,e){Ki(e)?(n[t0]=e[Ji],Sw(e)):n[t0]=e}function V0(n){return z0(n[fo])}function H0(n){return z0(n[qn])}function z0(n){for(;n!==null&&!Qi(n);)n=n[qn];return n}var bw;function mm(n){bw=n}var _u=new at("",{factory:()=>Mw}),Mw="ng";var yu=new at(""),Ba=new at("",{providedIn:"platform",factory:()=>"unknown"});var vu=new at("",{factory:()=>nt(oi).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var G0="r";var W0="di";var j0=!1,$0=new at("",{factory:()=>j0});var Cw=(n,e,t,i)=>{};function ww(n,e,t,i){Cw(n,e,t,i)}function gm(n){return(n.flags&32)===32}var Tw=()=>null;function q0(n,e,t=!1){return Tw(n,e,t)}function X0(n,e){let t=n.contentQueries;if(t!==null){let i=He(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Sp(s),a.contentQueries(2,e[o],o)}}}finally{He(i)}}}function $p(n,e,t){Sp(0);let i=He(null);try{e(n,t)}finally{He(i)}}function Y0(n,e,t){if(fp(e)){let i=He(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{He(i)}}}var li=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(li||{});var qp=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${$h})`}};function _m(n){return n instanceof qp?n.changingThisBreaksApplicationSecurity:n}function Dw(n,e){return n.createText(e)}function Aw(n,e,t){n.setValue(e,t)}function Z0(n,e,t){return n.createElement(e,t)}function Xp(n,e,t,i,r){n.insertBefore(e,t,i,r)}function J0(n,e,t){n.appendChild(e,t)}function n0(n,e,t,i,r){i!==null?Xp(n,e,t,i,r):J0(n,e,t)}function K0(n,e,t,i){n.removeChild(null,e,t,i)}function Iw(n,e,t){n.setAttribute(e,"style",t)}function Rw(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function Q0(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&ow(n,e,i),r!==null&&Rw(n,e,r),s!==null&&Iw(n,e,s)}function Nw(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var ex="ng-template";function Pw(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&Nw(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(ym(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function ym(n){return n.type===4&&n.value!==ex}function Fw(n,e,t){let i=n.type===4&&!t?ex:n.value;return e===i}function Ow(n,e,t){let i=4,r=n.attrs,s=r!==null?Uw(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!ai(i)&&!ai(c))return!1;if(o&&ai(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!Fw(n,c,t)||c===""&&e.length===1){if(ai(i))return!1;o=!0}}else if(i&8){if(r===null||!Pw(n,r,c,t)){if(ai(i))return!1;o=!0}}else{let l=e[++a],u=Lw(c,r,ym(n),t);if(u===-1){if(ai(i))return!1;o=!0;continue}if(l!==""){let f;if(u>s?f="":f=r[u+1].toLowerCase(),i&2&&l!==f){if(ai(i))return!1;o=!0}}}}return ai(i)||o}function ai(n){return(n&1)===0}function Lw(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return Bw(e,n)}function kw(n,e,t=!1){for(let i=0;i<e.length;i++)if(Ow(n,e[i],t))return!0;return!1}function Uw(n){for(let e=0;e<n.length;e++){let t=n[e];if(aw(t))return e}return n.length}function Bw(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function i0(n,e){return n?":not("+e.trim()+")":e}function Vw(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!ai(o)&&(e+=i0(s,r),r=""),i=o,s=s||!ai(i);t++}return r!==""&&(e+=i0(s,r)),e}function Hw(n){return n.map(Vw).join(",")}function zw(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!ai(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var Rn={};function vm(n,e,t,i,r,s,o,a,c,l,u){let f=an+i,d=f+r,h=Gw(f,d),m=typeof l=="function"?l():l;return h[qe]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:d,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function Gw(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Rn);return t}function Ww(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=vm(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function xm(n,e,t,i,r,s,o,a,c,l,u){let f=e.blueprint.slice();return f[ii]=r,f[$e]=i|4|128|8|64|1024,(l!==null||n&&n[$e]&2048)&&(f[$e]|=2048),mp(f),f[mn]=f[ds]=n,f[Wt]=t,f[Mi]=o||n&&n[Mi],f[kt]=a||n&&n[kt],f[Zi]=c||n&&n[Zi]||null,f[ri]=s,f[Ji]=Ew(),f[lo]=u,f[up]=l,f[An]=e.type==2?n[An]:f,f}function jw(n,e,t){let i=wi(e,n),r=Ww(t),s=n[Mi].rendererFactory,o=ix(n,xm(n,r,null,tx(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function tx(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function nx(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function ix(n,e){return n[fo]?n[lp][qn]=e:n[fo]=e,n[lp]=e,e}function re(n=1){rx(cn(),pt(),Ti()+n,!1)}function rx(n,e,t,i){if(!i)if((e[$e]&3)===3){let s=n.preOrderCheckHooks;s!==null&&nu(e,s,t)}else{let s=n.preOrderHooks;s!==null&&iu(e,s,0,t)}Tr(t)}var xu=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(xu||{});function Yp(n,e,t,i){let r=He(null);try{let[s,o,a]=n.inputs[t],c=null;(o&xu.SignalBased)!==0&&(c=e[s][xn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):b0(e,c,s,i)}finally{He(r)}}var tr=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(tr||{}),$w;function Em(n,e){return $w(n,e)}var mB=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Zp=new WeakMap,Jp=new WeakSet;function qw(n,e){let t=Zp.get(n);if(!t||t.length===0)return;let i=e.parentNode,r=e.previousSibling;for(let s=t.length-1;s>=0;s--){let o=t[s],a=o.parentNode;o===e?(t.splice(s,1),Jp.add(o),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&o===r||a&&i&&a!==i)&&(t.splice(s,1),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),o.parentNode?.removeChild(o))}}function Xw(n,e){let t=Zp.get(n);t?t.includes(e)||t.push(e):Zp.set(n,[e])}var Ss=new Set,Eu=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(Eu||{}),Ar=new at(""),r0=new Set;function ws(n){r0.has(n)||(r0.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var Sm=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Lt({token:n,providedIn:"root",factory:()=>new n})}return n})(),sx=[0,1,2,3],ox=(()=>{class n{ngZone=nt(gn);scheduler=nt(ls);errorHandler=nt(bi,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){nt(Ar,{optional:!0})}execute(){let t=this.sequences.size>0;t&&Et(ft.AfterRenderHooksStart),this.executing=!0;for(let i of sx)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let s=r.hooks[i];return s(r.pipelinedValue)},r.snapshot))}catch(s){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(s)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&Et(ft.AfterRenderHooksEnd)}register(t){let{view:i}=t;i!==void 0?((i[ms]??=[]).push(t),mo(i),i[$e]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,i){return i?i.run(Eu.AFTER_NEXT_RENDER,t):t()}static \u0275prov=Lt({token:n,providedIn:"root",factory:()=>new n})}return n})(),lu=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(e,t,i,r,s,o=null){this.impl=e,this.hooks=t,this.view=i,this.once=r,this.snapshot=o,this.unregisterOnDestroy=s?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let e=this.view?.[ms];e&&(this.view[ms]=e.filter(t=>t!==this))}};function bm(n,e){let t=e?.injector??nt(Yi);return ws("NgAfterNextRender"),Zw(n,t,e,!0)}function Yw(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function Zw(n,e,t,i){let r=e.get(Sm);r.impl??=e.get(ox);let s=e.get(Ar,null,{optional:!0}),o=t?.manualCleanup!==!0?e.get(vs):null,a=e.get(eu,null,{optional:!0}),c=new lu(r.impl,Yw(n),a?.view,i,o,s?.snapshot(null));return r.impl.register(c),c}var ax=new at("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:nt(ni)})});function cx(n,e,t){let i=n.get(ax);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function Jw(n,e){let t=n.get(ax);if(e.detachedLeaveAnimationFns){for(let i of e.detachedLeaveAnimationFns)t.queue.delete(i);e.detachedLeaveAnimationFns=void 0}}function Kw(n,e){for(let[t,i]of e)cx(n,i.animateFns)}function s0(n,e,t,i){let r=n?.[Cr]?.enter;e!==null&&r&&r.has(t.index)&&Kw(i,r)}function xo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;Qi(r)?c=r:Ki(r)&&(l=!0,r=r[ii]);let u=si(r);n===0&&i!==null?(s0(a,i,s,t),o==null?J0(e,i,u):Xp(e,i,u,o||null,!0)):n===1&&i!==null?(s0(a,i,s,t),Xp(e,i,u,o||null,!0),qw(s,u)):n===2?(a?.[Cr]?.leave?.has(s.index)&&Xw(s,u),o0(a,s,t,f=>{if(Jp.has(u)){Jp.delete(u);return}K0(e,u,l,f)})):n===3&&o0(a,s,t,()=>{e.destroyNode(u)}),c!=null&&dT(e,n,t,c,s,i,o)}}function Qw(n,e){lx(n,e),e[ii]=null,e[ri]=null}function eT(n,e,t,i,r,s){i[ii]=r,i[ri]=e,Su(n,i,t,1,r,s)}function lx(n,e){e[Mi].changeDetectionScheduler?.notify(9),Su(n,e,e[kt],2,null,null)}function tT(n){let e=n[fo];if(!e)return Np(n[qe],n);for(;e;){let t=null;if(Ki(e))t=e[fo];else{let i=e[jt];i&&(t=i)}if(!t){for(;e&&!e[qn]&&e!==n;)Ki(e)&&Np(e[qe],e),e=e[mn];e===null&&(e=n),Ki(e)&&Np(e[qe],e),t=e&&e[qn]}e=t}}function Mm(n,e){let t=n[Da],i=t.indexOf(e);t.splice(i,1)}function Cm(n,e){if(gs(e))return;let t=e[kt];t.destroyNode&&Su(n,e,t,3,null,null),tT(e)}function Np(n,e){if(gs(e))return;let t=He(null);try{e[$e]&=-129,e[$e]|=256,e[In]&&sl(e[In]),rT(n,e),iT(n,e),e[qe].type===1&&e[kt].destroy();let i=e[fs];if(i!==null&&Qi(e[mn])){i!==e[mn]&&Mm(i,e);let r=e[ps];r!==null&&r.detachView(n)}jp(e)}finally{He(t)}}function o0(n,e,t,i){let r=n?.[Cr];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&Ss.add(n[Ji]),cx(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),nT(n,i)}else n&&Ss.delete(n[Ji]),i(!1)},r)}function nT(n,e){let t=n[Cr]?.running;if(t){t.then(()=>{n[Cr].running=void 0,Ss.delete(n[Ji]),e(!0)});return}e(!1)}function iT(n,e){let t=n.cleanup,i=e[uo];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[uo]=null);let r=e[Xi];if(r!==null){e[Xi]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Ta];if(s!==null){e[Ta]=null;for(let o of s)o.destroy()}}function rT(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Es)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];Et(ft.LifecycleHookStart,a,c);try{c.call(a)}finally{Et(ft.LifecycleHookEnd,a,c)}}else{Et(ft.LifecycleHookStart,r,s);try{s.call(r)}finally{Et(ft.LifecycleHookEnd,r,s)}}}}}function sT(n,e,t){return oT(n,e.parent,t)}function oT(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[ii];if(er(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===li.None||r===li.Emulated)return null}return wi(i,t)}function aT(n,e,t){return lT(n,e,t)}function cT(n,e,t){return n.type&40?wi(n,t):null}var lT=cT,a0;function wm(n,e,t,i){let r=sT(n,i,e),s=e[kt],o=i.parent||e[ri],a=aT(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)n0(s,r,t[c],a,!1);else n0(s,r,t,a,!1);a0!==void 0&&a0(s,i,e,t,r)}function Ra(n,e){if(e!==null){let t=e.type;if(t&3)return wi(e,n);if(t&4)return Kp(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Ra(n,i);{let r=n[e.index];return Qi(r)?Kp(-1,r):si(r)}}else{if(t&128)return Ra(n,e.next);if(t&32)return Em(e,n)()||si(n[e.index]);{let i=ux(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Sr(n[An]);return Ra(r,i)}else return Ra(n,e.next)}}}return null}function ux(n,e){if(e!==null){let i=n[An][ri],r=e.projection;return i.projection[r]}return null}function Kp(n,e){let t=jt+n+1;if(t<e.length){let i=e[t],r=i[qe].firstChild;if(r!==null)return Ra(i,r)}return e[ho]}function Tm(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Zi];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&So(si(c),i),t.flags|=2),!gm(t))if(l&8)Tm(n,e,t.child,i,r,s,!1),xo(e,n,a,r,c,t,s,i);else if(l&32){let u=Em(t,i),f;for(;f=u();)xo(e,n,a,r,f,t,s,i);xo(e,n,a,r,c,t,s,i)}else l&16?uT(n,e,i,t,r,s):xo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function Su(n,e,t,i,r,s){Tm(t,i,n.firstChild,e,r,s,!1)}function uT(n,e,t,i,r,s){let o=t[An],c=o[ri].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];xo(e,n,t[Zi],r,u,i,s,t)}else{let l=c,u=o[mn];U0(i)&&(l.flags|=128),Tm(n,e,l,u,r,s,!0)}}function dT(n,e,t,i,r,s,o){let a=i[ho],c=si(i);a!==c&&xo(e,n,t,s,a,r,o);for(let l=jt;l<i.length;l++){let u=i[l];Su(u[qe],u,n,e,s,a)}}function fT(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:tr.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=tr.Important),n.setStyle(t,i,r,s))}}function dx(n,e,t,i,r){let s=Ti(),o=i&2;try{Tr(-1),o&&e.length>an&&rx(n,e,an,!1);let a=o?ft.TemplateUpdateStart:ft.TemplateCreateStart;Et(a,r,t),t(i,r)}finally{Tr(s);let a=o?ft.TemplateUpdateEnd:ft.TemplateCreateEnd;Et(a,r,t)}}function fx(n,e,t){vT(n,e,t),(t.flags&64)===64&&xT(n,e,t)}function hx(n,e,t=wi){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function hT(n,e,t,i){let s=i.get($0,j0)||t===li.ShadowDom||t===li.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return pT(o),o}function pT(n){mT(n)}var mT=()=>null;function gT(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function px(n,e,t,i,r,s){let o=e[qe];if(Dm(n,o,e,t,i)){er(n)&&yT(e,n.index);return}n.type&3&&(t=gT(t)),_T(n,e,t,i,r,s)}function _T(n,e,t,i,r,s){if(n.type&3){let o=wi(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function yT(n,e){let t=Xn(e,n);t[$e]&16||(t[$e]|=64)}function vT(n,e,t){let i=t.directiveStart,r=t.directiveEnd;er(t)&&jw(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||ou(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=au(e,n,o,t);if(So(c,e),s!==null&&CT(e,o-i,c,a,t,s),Ci(a)){let l=Xn(t.index,e);l[Wt]=au(e,n,o,t)}}}function xT(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=Fv();try{Tr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];Xl(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&ET(c,l)}}finally{Tr(-1),Xl(o)}}function ET(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function ST(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];kw(e,s.selectors,!1)&&(i??=[],Ci(s)?i.unshift(s):i.push(s))}return i}function bT(n,e,t,i,r,s){let o=wi(n,e);MT(e[kt],o,s,n.value,t,i,r)}function MT(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?ba(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function CT(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];Yp(i,t,c,l)}}function wT(n,e,t,i,r){let s=an+t,o=e[qe],a=r(o,e,n,i,t);e[s]=a,go(n,!0);let c=n.type===2;return c?(Q0(e[kt],a,n),(Ev()===0||Gl(n))&&So(a,e),Sv()):So(a,e),Kl()&&(!c||!gm(n))&&wm(o,e,a,n),n}function TT(n){let e=n;return vp()?Av():(e=e.parent,go(e,!1)),e}function DT(n,e){let t=n[Zi];if(!t)return;let i;try{i=t.get(vo,null)}catch{i=null}i?.(e)}function Dm(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],f=e.data[l];Yp(f,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];Yp(u,l,i,r),a=!0}return a}function AT(n,e){let t=Xn(e,n),i=t[qe];IT(i,t);let r=t[ii];r!==null&&t[lo]===null&&(t[lo]=q0(r,t[Zi])),Et(ft.ComponentStart);try{Am(i,t,t[Wt])}finally{Et(ft.ComponentEnd,t[Wt])}}function IT(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Am(n,e,t){Yl(e);try{let i=n.viewQuery;i!==null&&$p(1,i,t);let r=n.template;r!==null&&dx(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[ps]?.finishViewCreation(n),n.staticContentQueries&&X0(n,e),n.staticViewQueries&&$p(2,n.viewQuery,t);let s=n.components;s!==null&&RT(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[$e]&=-5,Zl()}}function RT(n,e){for(let t=0;t<e.length;t++)AT(n,e[t])}function Im(n,e,t,i){let r=He(null);try{let s=e.tView,a=n[$e]&4096?4096:16,c=xm(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[fs]=l;let u=n[ps];return u!==null&&(c[ps]=u.createEmbeddedView(s)),Am(s,c,t),c}finally{He(r)}}function Rm(n,e){return!e||e.firstChild===null||U0(n)}function Fa(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(si(s)),Qi(s)&&mx(s,i);let o=t.type;if(o&8)Fa(n,e,t.child,i);else if(o&32){let a=Em(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=ux(e,t);if(Array.isArray(a))i.push(...a);else{let c=Sr(e[An]);Fa(c[qe],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function mx(n,e){for(let t=jt;t<n.length;t++){let i=n[t],r=i[qe].firstChild;r!==null&&Fa(i[qe],i,r,e)}n[ho]!==n[ii]&&e.push(n[ho])}function gx(n){if(n[ms]!==null){for(let e of n[ms])e.impl.addSequence(e);n[ms].length=0}}var _x=[];function NT(n){return n[In]??PT(n)}function PT(n){let e=_x.pop()??Object.create(OT);return e.lView=n,e}function FT(n){n.lView[In]!==n&&(n.lView=null,_x.push(n))}var OT=_t(ot({},Ks),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{mo(n.lView)},consumerOnSignalRead(){this.lView[In]=this}});function LT(n){let e=n[In]??Object.create(kT);return e.lView=n,e}var kT=_t(ot({},Ks),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Sr(n.lView);for(;e&&!yx(e[qe]);)e=Sr(e);e&&gp(e)},consumerOnSignalRead(){this.lView[In]=this}});function yx(n){return n.type!==2}function vx(n){if(n[Ta]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Ta])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[$e]&8192)}}var UT=100;function xx(n,e=0){let i=n[Mi].rendererFactory,r=!1;r||i.begin?.();try{BT(n,e)}finally{r||i.end?.()}}function BT(n,e){let t=xp();try{Ep(!0),Qp(n,e);let i=0;for(;Aa(n);){if(i===UT)throw new rt(103,!1);i++,Qp(n,1)}}finally{Ep(t)}}function VT(n,e,t,i){if(gs(e))return;let r=e[$e],s=!1,o=!1;Yl(e);let a=!0,c=null,l=null;s||(yx(n)?(l=NT(e),c=pa(l)):tl()===null?(a=!1,l=LT(e),c=pa(l)):e[In]&&(sl(e[In]),e[In]=null));try{mp(e),Rv(n.bindingStartIndex),t!==null&&dx(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&nu(e,h,null)}else{let h=n.preOrderHooks;h!==null&&iu(e,h,0,null),Ip(e,0)}if(o||HT(e),vx(e),Ex(e,0),n.contentQueries!==null&&X0(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&nu(e,h)}else{let h=n.contentHooks;h!==null&&iu(e,h,1),Ip(e,1)}GT(n,e);let f=n.components;f!==null&&bx(e,f,0);let d=n.viewQuery;if(d!==null&&$p(2,d,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&nu(e,h)}else{let h=n.viewHooks;h!==null&&iu(e,h,2),Ip(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[zl]){for(let h of e[zl])h();e[zl]=null}s||(gx(e),e[$e]&=-73)}catch(u){throw s||mo(e),u}finally{l!==null&&(rl(l,c),a&&FT(l)),Zl()}}function Ex(n,e){for(let t=V0(n);t!==null;t=H0(t))for(let i=jt;i<t.length;i++){let r=t[i];Sx(r,e)}}function HT(n){for(let e=V0(n);e!==null;e=H0(e)){if(!(e[$e]&2))continue;let t=e[Da];for(let i=0;i<t.length;i++){let r=t[i];gp(r)}}}function zT(n,e,t){Et(ft.ComponentStart);let i=Xn(e,n);try{Sx(i,t)}finally{Et(ft.ComponentEnd,i[Wt])}}function Sx(n,e){jl(n)&&Qp(n,e)}function Qp(n,e){let i=n[qe],r=n[$e],s=n[In],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&_h(s)),o||=!1,s&&(s.dirty=!1),n[$e]&=-9217,o)VT(i,n,i.template,n[Wt]);else if(r&8192){let a=He(null);try{vx(n),Ex(n,1);let c=i.components;c!==null&&bx(n,c,1),gx(n)}finally{He(a)}}}function bx(n,e,t){for(let i=0;i<e.length;i++)zT(n,e[i],t)}function GT(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Tr(~r);else{let s=r,o=t[++i],a=t[++i];Pv(o,s);let c=e[s];Et(ft.HostBindingsUpdateStart,c);try{a(2,c)}finally{Et(ft.HostBindingsUpdateEnd,c)}}}}finally{Tr(-1)}}function Nm(n,e){let t=xp()?64:1088;for(n[Mi].changeDetectionScheduler?.notify(e);n;){n[$e]|=t;let i=Sr(n);if(po(n)&&!i)return n;n=i}return null}function WT(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function Mx(n,e){let t=jt+e;if(t<n.length)return n[t]}function Pm(n,e,t,i=!0){let r=e[qe];if(jT(r,e,n,t),i){let o=Kp(t,n),a=e[kt],c=a.parentNode(n[ho]);c!==null&&eT(r,n[ri],a,e,c,o)}let s=e[lo];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function Cx(n,e){let t=Fm(n,e);return t!==void 0&&Cm(t[qe],t),t}function Fm(n,e){if(n.length<=jt)return;let t=jt+e,i=n[t];if(i){let r=i[fs];r!==null&&r!==n&&Mm(r,i),e>0&&(n[t-1][qn]=i[qn]);let s=ip(n,jt+e);Qw(i[qe],i);let o=s[ps];o!==null&&o.detachView(s[qe]),i[mn]=null,i[qn]=null,i[$e]&=-129}return i}function jT(n,e,t,i){let r=jt+i,s=t.length;i>0&&(t[r-1][qn]=e),i<s-jt?(e[qn]=t[r],av(t,jt+i,e)):(t.push(e),e[qn]=null),e[mn]=t;let o=e[fs];o!==null&&t!==o&&wx(o,e);let a=e[ps];a!==null&&a.insertView(n),$l(e),e[$e]|=128}function wx(n,e){let t=n[Da],i=e[mn];if(Ki(i))n[$e]|=2;else{let r=i[mn][An];e[An]!==r&&(n[$e]|=2)}t===null?n[Da]=[e]:t.push(e)}var bo=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[qe];return Fa(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[Wt]}set context(e){this._lView[Wt]=e}get destroyed(){return gs(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[mn];if(Qi(e)){let t=e[mv],i=t?t.indexOf(this):-1;i>-1&&(Fm(e,i),ip(t,i))}this._attachedToViewContainer=!1}Cm(this._lView[qe],this._lView)}onDestroy(e){_p(this._lView,e)}markForCheck(){Nm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[$e]&=-129}reattach(){$l(this._lView),this._lView[$e]|=128}detectChanges(){this._lView[$e]|=1024,xx(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new rt(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=po(this._lView),t=this._lView[fs];t!==null&&!e&&Mm(t,this._lView),lx(this._lView[qe],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new rt(902,!1);this._appRef=e;let t=po(this._lView),i=this._lView[fs];i!==null&&!t&&wx(i,this._lView),$l(this._lView)}};function Om(n,e,t,i,r){let s=n.data[e];if(s===null)s=$T(n,e,t,i,r),Nv()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=Dv();s.injectorIndex=o===null?-1:o.injectorIndex}return go(s,!0),s}function $T(n,e,t,i,r){let s=yp(),o=vp(),a=o?s:s&&s.parent,c=n.data[e]=XT(n,a,t,e,i,r);return qT(n,c,s,o),c}function qT(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function XT(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return Cv()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function YT(n){let e=n[dp]??[],i=n[mn][kt],r=[];for(let s of e)s.data[W0]!==void 0?r.push(s):ZT(s,i);n[dp]=r}function ZT(n,e){let t=0,i=n.firstChild;if(i){let r=n.data[G0];for(;t<r;){let s=i.nextSibling;K0(e,i,!1),i=s,t++}}}var JT=()=>null,KT=()=>null;function QT(n,e){return JT(n,e)}function Tx(n,e,t){return KT(n,e,t)}var Dx=class{},bu=class{},em=class{resolveComponentFactory(e){throw new rt(917,!1)}},Mu=class{static NULL=new em},bs=class{},Ts=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>eD()}return n})();function eD(){let n=pt(),e=Yn(),t=Xn(e.index,n);return(Ki(t)?t:n)[kt]}var Ax=(()=>{class n{static \u0275prov=Lt({token:n,providedIn:"root",factory:()=>null})}return n})();var ru={},tm=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,ru,i);return r!==ru||t===ru?r:this.parentInjector.get(e,t,i)}};function c0(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=Fl(r,a);else if(s==2){let c=a,l=e[++o];i=Fl(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function Nt(n,e=0){let t=pt();if(t===null)return Ct(n,e);let i=Yn();return F0(i,t,nn(n),e)}function tD(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}rD(n,e,t,a,s,c,l)}s!==null&&i!==null&&nD(t,i,s)}function nD(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new rt(-301,!1);i.push(e[r],s)}}function iD(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function rD(n,e,t,i,r,s,o){let a=i.length,c=null;for(let d=0;d<a;d++){let h=i[d];c===null&&Ci(h)&&(c=h,iD(n,t,d)),Gp(ou(t,e),n,h.type)}uD(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let d=0;d<a;d++){let h=i[d];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,f=nx(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let d=0;d<a;d++){let h=i[d];if(t.mergedAttrs=Pa(t.mergedAttrs,h.hostAttrs),oD(n,t,e,f,h),lD(f,h,r),o!==null&&o.has(h)){let[E,g]=o.get(h);t.directiveToIndex.set(h.type,[f,E+t.directiveStart,g+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,f);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let m=h.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),f++}sD(n,t,s)}function sD(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))l0(0,e,r,i),l0(1,e,r,i),d0(e,i,!1);else{let s=t.get(r);u0(0,e,s,i),u0(1,e,s,i),d0(e,i,!0)}}}function l0(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),Ix(e,s)}}function u0(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),Ix(e,o)}}function Ix(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function d0(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||ym(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function oD(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=os(r.type,!0)),o=new Es(s,Ci(r),Nt,null);n.blueprint[i]=o,t[i]=o,aD(n,e,i,nx(n,t,r.hostVars,Rn),r)}function aD(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;cD(o)!=a&&o.push(a),o.push(t,i,s)}}function cD(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function lD(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Ci(e)&&(t[""]=n)}}function uD(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function Rx(n,e,t,i,r,s,o,a){let c=e[qe],l=c.consts,u=wr(l,o),f=Om(c,n,t,i,u);return s&&tD(c,e,f,wr(l,a),r),f.mergedAttrs=Pa(f.mergedAttrs,f.attrs),f.attrs!==null&&c0(f,f.attrs,!1),f.mergedAttrs!==null&&c0(f,f.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,f),f}function Nx(n,e){nw(n,e),fp(e)&&n.queries.elementEnd(e)}function Ai(n,e,t){if(t===Rn)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function dD(n,e,t,i){let r=Ai(n,e,t);return Ai(n,e+1,i)||r}function Pp(n,e,t){return function i(r){let s=er(n)?Xn(n.index,e):e;Nm(s,5);let o=e[Wt],a=f0(e,o,t,r),c=i.__ngNextListenerFn__;for(;c;)a=f0(e,o,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function f0(n,e,t,i){let r=He(null);try{return Et(ft.OutputStart,e,t),t(i)!==!1}catch(s){return DT(n,s),!1}finally{Et(ft.OutputEnd,e,t),He(r)}}function fD(n,e,t,i,r,s,o,a){let c=Gl(n),l=!1,u=null;if(!i&&c&&(u=pD(e,t,s,n.index)),u!==null){let f=u.__ngLastListenerFn__||u;f.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let f=wi(n,t),d=i?i(f):f;ww(t,d,s,a);let h=r.listen(d,s,a);if(!hD(s)){let m=i?E=>i(si(E[n.index])):n.index;Px(m,e,t,s,a,h,!1)}}return l}function hD(n){return n.startsWith("animation")||n.startsWith("transition")}function pD(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[uo],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function Px(n,e,t,i,r,s,o){let a=e.firstCreatePass?xv(e):null,c=vv(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}function h0(n,e,t,i,r,s){let o=e[t],a=e[qe],l=a.data[t].outputs[i],f=o[l].subscribe(s);Px(n.index,a,e,r,s,f,!0)}var nm=Symbol("BINDING");function Fx(n){return n.debugInfo?.className||n.type.name||null}var im=class extends Mu{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Sa(e);return new uu(t,this.ngModule)}};function mD(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&xu.SignalBased)!==0};return r&&(s.transform=r),s})}function gD(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function _D(n,e,t){let i=e instanceof ni?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new tm(t,i):t}function yD(n){let e=n.get(bs,null);if(e===null)throw new rt(407,!1);let t=n.get(Ax,null),i=n.get(ls,null),r=n.get(Ar,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function vD(n,e){let t=Ox(n);return Z0(e,t,t==="svg"?hp:t==="math"?gv:null)}function Ox(n){return(n.selectors[0][0]||"div").toLowerCase()}var uu=class extends bu{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=mD(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=gD(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=Hw(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){Et(ft.DynamicComponentStart);let a=He(null);try{let c=this.componentDef,l=_D(c,r||this.ngModule,e),u=yD(l),f=u.tracingService;return f&&f.componentCreate?f.componentCreate(Fx(c),()=>this.createComponentRef(u,l,t,i,s,o)):this.createComponentRef(u,l,t,i,s,o)}finally{He(a)}}createComponentRef(e,t,i,r,s,o){let a=this.componentDef,c=xD(r,a,o,s),l=e.rendererFactory.createRenderer(null,a),u=r?hT(l,r,a.encapsulation,t):vD(a,l),f=o?.some(p0)||s?.some(m=>typeof m!="function"&&m.bindings.some(p0)),d=xm(null,c,null,512|tx(a),null,null,e,l,t,null,q0(u,t,!0));d[an]=u,Yl(d);let h=null;try{let m=Rx(an,d,2,"#host",()=>c.directiveRegistry,!0,0);Q0(l,u,m),So(u,d),fx(c,d,m),Y0(c,m,d),Nx(c,m),i!==void 0&&SD(m,this.ngContentSelectors,i),h=Xn(m.index,d),d[Wt]=h[Wt],Am(c,d,null)}catch(m){throw h!==null&&jp(h),jp(d),m}finally{Et(ft.DynamicComponentEnd),Zl()}return new du(this.componentType,d,!!f)}};function xD(n,e,t,i){let r=n?["ng-version","21.2.4"]:zw(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[nm].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let f=i[u];if(typeof f!="function")for(let d of f.bindings){a+=d[nm].requiredVars;let h=u+1;d.create&&(d.targetIdx=h,(s??=[]).push(d)),d.update&&(d.targetIdx=h,(o??=[]).push(d))}}let c=[e];if(i)for(let u of i){let f=typeof u=="function"?u:u.type,d=Qh(f);c.push(d)}return vm(0,null,ED(s,o),1,a,c,null,null,null,[r],null)}function ED(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function p0(n){let e=n[nm].kind;return e==="input"||e==="twoWay"}var du=class extends Dx{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Wl(t[qe],an),this.location=k0(this._tNode,t),this.instance=Xn(this._tNode.index,t)[Wt],this.hostView=this.changeDetectorRef=new bo(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=Dm(i,r[qe],r,e,t);this.previousInputValues.set(e,t);let o=Xn(i.index,r);Nm(o,1)}get injector(){return new cu(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function SD(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var bD=()=>!1;function MD(n,e,t){return bD(n,e,t)}var fu=class{};var Oa=class extends fu{injector;componentFactoryResolver=new im(this);instance=null;constructor(e){super();let t=new cs([...e.providers,{provide:fu,useValue:this},{provide:Mu,useValue:this.componentFactoryResolver}],e.parent||wa(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function Lx(n,e,t=null){return new Oa({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var CD=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=op(!1,t.type),r=i.length>0?Lx([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Lt({token:n,providedIn:"environment",factory:()=>new n(Ct(ni))})}return n})();function Lm(n){return ka(()=>{let e=kx(n),t=_t(ot({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===pm.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(CD).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||li.Emulated,styles:n.styles||pn,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&ws("NgStandalone"),Ux(t);let i=n.dependencies;return t.directiveDefs=m0(i,wD),t.pipeDefs=m0(i,iv),t.id=AD(t),t})}function wD(n){return Sa(n)||Qh(n)}function Ds(n){return ka(()=>({type:n.type,bootstrap:n.bootstrap||pn,declarations:n.declarations||pn,imports:n.imports||pn,exports:n.exports||pn,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function TD(n,e){if(n==null)return Mr;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=xu.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function DD(n){if(n==null)return Mr;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function Kt(n){return ka(()=>{let e=kx(n);return Ux(e),e})}function kx(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Mr,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||pn,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:TD(n.inputs,e),outputs:DD(n.outputs),debugInfo:null}}function Ux(n){n.features?.forEach(e=>e(n))}function m0(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function AD(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function ID(n){return Object.getPrototypeOf(n.prototype).constructor}function Nn(n){let e=ID(n.type),t=!0,i=[n];for(;e;){let r;if(Ci(n))r=e.\u0275cmp||e.\u0275dir;else{if(e.\u0275cmp)throw new rt(903,!1);r=e.\u0275dir}if(r){if(t){i.push(r);let o=n;o.inputs=Fp(n.inputs),o.declaredInputs=Fp(n.declaredInputs),o.outputs=Fp(n.outputs);let a=r.hostBindings;a&&OD(n,a);let c=r.viewQuery,l=r.contentQueries;if(c&&PD(n,c),l&&FD(n,l),RD(n,r),nv(n.outputs,r.outputs),Ci(r)&&r.data.animation){let u=n.data;u.animation=(u.animation||[]).concat(r.data.animation)}}let s=r.features;if(s)for(let o=0;o<s.length;o++){let a=s[o];a&&a.ngInherit&&a(n),a===Nn&&(t=!1)}}e=Object.getPrototypeOf(e)}ND(i)}function RD(n,e){for(let t in e.inputs){if(!e.inputs.hasOwnProperty(t)||n.inputs.hasOwnProperty(t))continue;let i=e.inputs[t];i!==void 0&&(n.inputs[t]=i,n.declaredInputs[t]=e.declaredInputs[t])}}function ND(n){let e=0,t=null;for(let i=n.length-1;i>=0;i--){let r=n[i];r.hostVars=e+=r.hostVars,r.hostAttrs=Pa(r.hostAttrs,t=Pa(t,r.hostAttrs))}}function Fp(n){return n===Mr?{}:n===pn?[]:n}function PD(n,e){let t=n.viewQuery;t?n.viewQuery=(i,r)=>{e(i,r),t(i,r)}:n.viewQuery=e}function FD(n,e){let t=n.contentQueries;t?n.contentQueries=(i,r,s)=>{e(i,r,s),t(i,r,s)}:n.contentQueries=e}function OD(n,e){let t=n.hostBindings;t?n.hostBindings=(i,r)=>{e(i,r),t(i,r)}:n.hostBindings=e}function LD(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=Pa(n.mergedAttrs,n.attrs);let u=n.tView=vm(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),go(n,!1);let c=kD(t,e,n,i);Kl()&&wm(t,e,c,n),So(c,e);let l=WT(c,e,c,n);e[i+an]=l,ix(e,l),MD(l,n,e)}function hu(n,e,t,i,r,s,o,a,c,l,u){let f=t+an,d;if(e.firstCreatePass){if(d=Om(e,f,4,o||null,a||null),l!=null){let h=wr(e.consts,l);d.localNames=[];for(let m=0;m<h.length;m+=2)d.localNames.push(h[m],-1)}}else d=e.data[f];return LD(d,n,e,t,i,r,s,c),l!=null&&hx(n,d,u),d}var kD=UD;function UD(n,e,t,i){return Ql(!0),e[kt].createComment("")}function Bx(n){return typeof n=="function"&&n[xn]!==void 0}function km(n){return Bx(n)&&typeof n.set=="function"}var Um=new at("");function Va(n){return!!n&&typeof n.then=="function"}function Vx(n){return!!n&&typeof n.subscribe=="function"}var Hx=new at("");var Bm=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=nt(Hx,{optional:!0})??[];injector=nt(Yi);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=Hl(this.injector,r);if(Va(s))t.push(s);else if(Vx(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Lt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),zx=new at("");function Gx(){vh(()=>{let n="";throw new rt(600,n)})}function Wx(n){return n.isBoundToModule}var BD=10;var Co=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=nt(vo);afterRenderManager=nt(Sm);zonelessEnabled=nt(Ia);rootEffectScheduler=nt(Ap);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new xi;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=nt(yo);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(is(t=>!t))}constructor(){nt(Ar,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=nt(ni);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=Yi.NULL){return this._injector.get(gn).run(()=>{Et(ft.BootstrapComponentStart);let o=t instanceof bu;if(!this._injector.get(Bm).done){let m="";throw new rt(405,m)}let c;o?c=t:c=this._injector.get(Mu).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=Wx(c)?void 0:this._injector.get(fu),u=i||c.selector,f=c.create(r,[],u,l),d=f.location.nativeElement,h=f.injector.get(Um,null);return h?.registerApplication(d),f.onDestroy(()=>{this.detachView(f.hostView),Na(this.components,f),h?.unregisterApplication(d)}),this._loadComponent(f),Et(ft.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Et(ft.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Eu.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Et(ft.ChangeDetectionEnd),new rt(101,!1);let t=He(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,He(t),this.afterTick.next(),Et(ft.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(bs,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<BD;){Et(ft.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Et(ft.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Aa(r))continue;let s=i&&!this.zonelessEnabled?0:1;xx(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>Aa(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Na(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(zx,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Na(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new rt(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Lt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Na(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Pn(n,e,t,i){let r=pt(),s=_s();if(Ai(r,s,e)){let o=cn(),a=Jl();bT(a,r,n,e,t,i)}return Pn}var rm=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),s=this.detach(r);if(r-i>1){let o=this.detach(i);this.attach(i,s),this.attach(r,o)}else this.attach(i,s)}move(e,t){this.attach(t,this.detach(e))}};function Op(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function VD(n,e,t,i){let r,s,o=0,a=n.length-1,c=void 0;if(Array.isArray(e)){He(i);let l=e.length-1;for(He(null);o<=a&&o<=l;){let u=n.at(o),f=e[o],d=Op(o,u,o,f,t);if(d!==0){d<0&&n.updateValue(o,f),o++;continue}let h=n.at(a),m=e[l],E=Op(a,h,l,m,t);if(E!==0){E<0&&n.updateValue(a,m),a--,l--;continue}let g=t(o,u),p=t(a,h),x=t(o,f);if(Object.is(x,p)){let S=t(l,m);Object.is(S,g)?(n.swap(o,a),n.updateValue(a,m),l--,a--):n.move(a,o),n.updateValue(o,f),o++;continue}if(r??=new pu,s??=_0(n,o,a,t),sm(n,r,o,x))n.updateValue(o,f),o++,a++;else if(s.has(x))r.set(g,n.detach(o)),a--;else{let S=n.create(o,e[o]);n.attach(o,S),o++,a++}}for(;o<=l;)g0(n,r,t,o,e[o]),o++}else if(e!=null){He(i);let l=e[Symbol.iterator]();He(null);let u=l.next();for(;!u.done&&o<=a;){let f=n.at(o),d=u.value,h=Op(o,f,o,d,t);if(h!==0)h<0&&n.updateValue(o,d),o++,u=l.next();else{r??=new pu,s??=_0(n,o,a,t);let m=t(o,d);if(sm(n,r,o,m))n.updateValue(o,d),o++,a++,u=l.next();else if(!s.has(m))n.attach(o,n.create(o,d)),o++,a++,u=l.next();else{let E=t(o,f);r.set(E,n.detach(o)),a--}}}for(;!u.done;)g0(n,r,t,n.length,u.value),u=l.next()}for(;o<=a;)n.destroy(n.detach(a--));r?.forEach(l=>{n.destroy(l)})}function sm(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function g0(n,e,t,i,r){if(sm(n,e,i,t(i,r)))n.updateValue(i,r);else{let s=n.create(i,r);n.attach(i,s)}}function _0(n,e,t,i){let r=new Set;for(let s=e;s<=t;s++)r.add(i(s,n.at(s)));return r}var pu=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function wt(n,e,t,i,r,s,o,a){ws("NgControlFlow");let c=pt(),l=cn(),u=wr(l.consts,s);return hu(c,l,n,e,t,i,r,u,256,o,a),Vm}function Vm(n,e,t,i,r,s,o,a){ws("NgControlFlow");let c=pt(),l=cn(),u=wr(l.consts,s);return hu(c,l,n,e,t,i,r,u,512,o,a),Vm}function Tt(n,e){ws("NgControlFlow");let t=pt(),i=_s(),r=t[i]!==Rn?t[i]:-1,s=r!==-1?mu(t,an+r):void 0,o=0;if(Ai(t,i,n)){let a=He(null);try{if(s!==void 0&&Cx(s,o),n!==-1){let c=an+n,l=mu(t,c),u=lm(t[qe],c),f=Tx(l,u,t),d=Im(t,u,e,{dehydratedView:f});Pm(l,d,o,Rm(u,f))}}finally{He(a)}}else if(s!==void 0){let a=Mx(s,o);a!==void 0&&(a[Wt]=e)}}var om=class{lContainer;$implicit;$index;constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-jt}};function Ha(n,e){return e}var am=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function Fn(n,e,t,i,r,s,o,a,c,l,u,f,d){ws("NgControlFlow");let h=pt(),m=cn(),E=c!==void 0,g=pt(),p=a?o.bind(g[An][Wt]):o,x=new am(E,p);g[an+n]=x,hu(h,m,n+1,e,t,i,r,wr(m.consts,s),256),E&&hu(h,m,n+2,c,l,u,f,wr(m.consts,d),512)}var cm=class extends rm{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-jt}at(e){return this.getLView(e)[Wt].$implicit}attach(e,t){let i=t[lo];this.needsIndexUpdate||=e!==this.length,Pm(this.lContainer,t,e,Rm(this.templateTNode,i)),HD(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,zD(this.lContainer,e),GD(this.lContainer,e)}create(e,t){let i=QT(this.lContainer,this.templateTNode.tView.ssrId);return Im(this.hostLView,this.templateTNode,new om(this.lContainer,t,e),{dehydratedView:i})}destroy(e){Cm(e[qe],e)}updateValue(e,t){this.getLView(e)[Wt].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[Wt].$index=e}getLView(e){return WD(this.lContainer,e)}};function On(n){let e=He(null),t=Ti();try{let i=pt(),r=i[qe],s=i[t],o=t+1,a=mu(i,o);if(s.liveCollection===void 0){let l=lm(r,o);s.liveCollection=new cm(a,i,l)}else s.liveCollection.reset();let c=s.liveCollection;if(VD(c,n,s.trackByFn,e),c.updateIndexes(),s.hasEmptyBlock){let l=_s(),u=c.length===0;if(Ai(i,l,u)){let f=t+2,d=mu(i,f);if(u){let h=lm(r,f),m=Tx(d,h,i),E=Im(i,h,void 0,{dehydratedView:m});Pm(d,E,0,Rm(h,m))}else r.firstUpdatePass&&YT(d),Cx(d,0)}}}finally{He(e)}}function mu(n,e){return n[e]}function HD(n,e){if(n.length<=jt)return;let t=jt+e,i=n[t],r=i?i[Cr]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let s=i[Zi];Jw(s,r),Ss.delete(i[Ji]),r.detachedLeaveAnimationFns=void 0}}function zD(n,e){if(n.length<=jt)return;let t=jt+e,i=n[t],r=i?i[Cr]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function GD(n,e){return Fm(n,e)}function WD(n,e){return Mx(n,e)}function lm(n,e){return Wl(n,e)}function Ir(n,e,t){let i=pt(),r=_s();if(Ai(i,r,e)){let s=cn(),o=Jl();px(o,i,n,e,i[kt],t)}return Ir}function um(n,e,t,i,r){Dm(e,n,t,r?"class":"style",i)}function W(n,e,t,i){let r=pt(),s=r[qe],o=n+an,a=s.firstCreatePass?Rx(o,r,2,e,ST,Mv(),t,i):s.data[o];if(er(a)){let c=r[Mi].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate(Fx(l),()=>(y0(n,e,r,a,i),W))}}return y0(n,e,r,a,i),W}function y0(n,e,t,i,r){if(wT(i,t,n,e,jD),Gl(i)){let s=t[qe];fx(s,t,i),Y0(s,i,t)}r!=null&&hx(t,i)}function q(){let n=cn(),e=Yn(),t=TT(e);return n.firstCreatePass&&Nx(n,t),wv(t)&&Tv(),bv(),t.classesWithoutHost!=null&&rw(t)&&um(n,t,pt(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&sw(t)&&um(n,t,pt(),t.stylesWithoutHost,!1),q}function Sn(n,e,t,i){return W(n,e,t,i),q(),Sn}var jD=(n,e,t,i,r)=>(Ql(!0),Z0(e[kt],i,Vv()));function bn(){return pt()}var za="en-US";var $D=za;function jx(n){typeof n=="string"&&($D=n.toLowerCase().replace(/_/g,"-"))}function St(n,e,t){let i=pt(),r=cn(),s=Yn();return $x(r,i,i[kt],s,n,e,t),St}function $x(n,e,t,i,r,s,o){let a=!0,c=null;if((i.type&3||o)&&(c??=Pp(i,e,s),fD(i,n,e,o,t,r,s,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let f=0;f<u.length;f+=2){let d=u[f],h=u[f+1];c??=Pp(i,e,s),h0(i,e,d,h,r,c)}if(l&&l.length)for(let f of l)c??=Pp(i,e,s),h0(i,e,f,r,r,c)}}function Re(n=1){return Bv(n)}function tu(n,e){return n<<17|e<<2}function Ms(n){return n>>17&32767}function qD(n){return(n&2)==2}function XD(n,e){return n&131071|e<<17}function dm(n){return n|2}function Mo(n){return(n&131068)>>2}function Lp(n,e){return n&-131069|e<<2}function YD(n){return(n&1)===1}function fm(n){return n|1}function ZD(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=Ms(o),c=Mo(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let f=t;u=f[1],(u===null||co(f,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let d=Ms(n[a+1]);n[i+1]=tu(d,a),d!==0&&(n[d+1]=Lp(n[d+1],i)),n[a+1]=XD(n[a+1],i)}else n[i+1]=tu(a,0),a!==0&&(n[a+1]=Lp(n[a+1],i)),a=i;else n[i+1]=tu(c,0),a===0?a=i:n[c+1]=Lp(n[c+1],i),c=i;l&&(n[i+1]=dm(n[i+1])),v0(n,u,i,!0),v0(n,u,i,!1),JD(e,u,n,i,s),o=tu(a,c),s?e.classBindings=o:e.styleBindings=o}function JD(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&co(s,e)>=0&&(t[i+1]=fm(t[i+1]))}function v0(n,e,t,i){let r=n[t+1],s=e===null,o=i?Ms(r):Mo(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];KD(c,e)&&(a=!0,n[o+1]=i?fm(l):dm(l)),o=i?Ms(l):Mo(l)}a&&(n[t+1]=i?dm(r):fm(r))}function KD(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?co(n,e)>=0:!1}var ci={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function QD(n){return n.substring(ci.key,ci.keyEnd)}function eA(n){return tA(n),qx(n,Xx(n,0,ci.textEnd))}function qx(n,e){let t=ci.textEnd;return t===e?-1:(e=ci.keyEnd=nA(n,ci.key=e,t),Xx(n,e,t))}function tA(n){ci.key=0,ci.keyEnd=0,ci.value=0,ci.valueEnd=0,ci.textEnd=n.length}function Xx(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function nA(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function Cu(n,e,t){return Yx(n,e,t,!1),Cu}function Mn(n,e){return Yx(n,e,null,!0),Mn}function wu(n){rA(uA,iA,n,!0)}function iA(n,e){for(let t=eA(e);t>=0;t=qx(e,t))Bl(n,QD(e),!0)}function Yx(n,e,t,i){let r=pt(),s=cn(),o=ql(2);if(s.firstUpdatePass&&Jx(s,n,o,i),e!==Rn&&Ai(r,o,e)){let a=s.data[Ti()];Kx(s,a,r,r[kt],n,r[o+1]=fA(e,t),i,o)}}function rA(n,e,t,i){let r=cn(),s=ql(2);r.firstUpdatePass&&Jx(r,null,s,i);let o=pt();if(t!==Rn&&Ai(o,s,t)){let a=r.data[Ti()];if(Qx(a,i)&&!Zx(r,s)){let c=i?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=Fl(c,t||"")),um(r,a,o,t,i)}else dA(r,a,o,o[kt],o[s+1],o[s+1]=lA(n,e,t),i,s)}}function Zx(n,e){return e>=n.expandoStartIndex}function Jx(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[Ti()],o=Zx(n,t);Qx(s,i)&&e===null&&!o&&(e=!1),e=sA(r,s,e,i),ZD(r,s,e,t,o,i)}}function sA(n,e,t,i){let r=Ov(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=kp(null,n,e,t,i),t=La(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=kp(r,n,e,t,i),s===null){let c=oA(n,e,i);c!==void 0&&Array.isArray(c)&&(c=kp(null,n,e,c[1],i),c=La(c,e.attrs,i),aA(n,e,i,c))}else s=cA(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function oA(n,e,t){let i=t?e.classBindings:e.styleBindings;if(Mo(i)!==0)return n[Ms(i)]}function aA(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Ms(r)]=i}function cA(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=La(i,o,t)}return La(i,e.attrs,t)}function kp(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=La(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function La(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Bl(n,o,t?!0:e[++s]))}return n===void 0?null:n}function lA(n,e,t){if(t==null||t==="")return pn;let i=[],r=_m(t);if(Array.isArray(r))for(let s=0;s<r.length;s++)n(i,r[s],!0);else if(r instanceof Set)for(let s of r)n(i,s,!0);else if(typeof r=="object")for(let s in r)r.hasOwnProperty(s)&&n(i,s,r[s]);else typeof r=="string"&&e(i,r);return i}function uA(n,e,t){let i=String(e);i!==""&&!i.includes(" ")&&Bl(n,i,t)}function dA(n,e,t,i,r,s,o,a){r===Rn&&(r=pn);let c=0,l=0,u=0<r.length?r[0]:null,f=0<s.length?s[0]:null;for(;u!==null||f!==null;){let d=c<r.length?r[c+1]:void 0,h=l<s.length?s[l+1]:void 0,m=null,E;u===f?(c+=2,l+=2,d!==h&&(m=f,E=h)):f===null||u!==null&&u<f?(c+=2,m=u):(l+=2,m=f,E=h),m!==null&&Kx(n,e,t,i,m,E,o,a),u=c<r.length?r[c]:null,f=l<s.length?s[l]:null}}function Kx(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=YD(l)?x0(c,e,t,r,Mo(l),o):void 0;if(!gu(u)){gu(s)||qD(l)&&(s=x0(c,null,t,r,a,o));let f=pp(Ti(),t);fT(i,o,f,r,s)}}function x0(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,f=u===null,d=t[r+1];d===Rn&&(d=f?pn:void 0);let h=f?Vl(d,i):u===i?d:void 0;if(l&&!gu(h)&&(h=Vl(c,i)),gu(h)&&(a=h,o))return a;let m=n[r+1];r=o?Ms(m):Mo(m)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=Vl(c,i))}return a}function gu(n){return n!==void 0}function fA(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=Pl(_m(n)))),n}function Qx(n,e){return(n.flags&(e?8:16))!==0}function se(n,e=""){let t=pt(),i=cn(),r=n+an,s=i.firstCreatePass?Om(i,r,1,e,null):i.data[r],o=hA(i,t,s,e);t[r]=o,Kl()&&wm(i,t,o,s),go(s,!1)}var hA=(n,e,t,i)=>(Ql(!0),Dw(e[kt],i));function eE(n,e,t,i=""){return Ai(n,_s(),t)?e+ba(t)+i:Rn}function pA(n,e,t,i,r,s=""){let o=Iv(),a=dD(n,o,t,r);return ql(2),a?e+ba(t)+i+ba(r)+s:Rn}function Xe(n){return Ut("",n),Xe}function Ut(n,e,t){let i=pt(),r=eE(i,n,e,t);return r!==Rn&&tE(i,Ti(),r),Ut}function As(n,e,t,i,r){let s=pt(),o=pA(s,n,e,t,i,r);return o!==Rn&&tE(s,Ti(),o),As}function tE(n,e,t){let i=pp(e,n);Aw(n[kt],i,t)}function wo(n,e,t){km(e)&&(e=e());let i=pt(),r=_s();if(Ai(i,r,e)){let s=cn(),o=Jl();px(o,i,n,e,i[kt],t)}return wo}function Ga(n,e){let t=km(n);return t&&n.set(e),t}function To(n,e){let t=pt(),i=cn(),r=Yn();return $x(i,t,t[kt],r,n,e),To}function Tu(n,e,t=""){return eE(pt(),n,e,t)}function E0(n,e,t){let i=cn();i.firstCreatePass&&nE(e,i.data,i.blueprint,Ci(n),t)}function nE(n,e,t,i,r){if(n=nn(n),Array.isArray(n))for(let s=0;s<n.length;s++)nE(n[s],e,t,i,r);else{let s=cn(),o=pt(),a=Yn(),c=as(n)?n:nn(n.provide),l=cp(n),u=a.providerIndexes&1048575,f=a.directiveStart,d=a.providerIndexes>>20;if(as(n)||!n.multi){let h=new Es(l,r,Nt,null),m=Bp(c,e,r?u:u+d,f);m===-1?(Gp(ou(a,o),s,c),Up(s,n,e.length),e.push(c),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(h),o.push(h)):(t[m]=h,o[m]=h)}else{let h=Bp(c,e,u+d,f),m=Bp(c,e,u,u+d),E=h>=0&&t[h],g=m>=0&&t[m];if(r&&!g||!r&&!E){Gp(ou(a,o),s,c);let p=_A(r?gA:mA,t.length,r,i,l,n);!r&&g&&(t[m].providerFactory=p),Up(s,n,e.length,0),e.push(c),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(p),o.push(p)}else{let p=iE(t[r?m:h],l,!r&&i);Up(s,n,h>-1?h:m,p)}!r&&i&&g&&t[m].componentProviders++}}}function Up(n,e,t,i){let r=as(e),s=fv(e);if(r||s){let c=(s?nn(e.useClass):e).prototype.ngOnDestroy;if(c){let l=n.destroyHooks||(n.destroyHooks=[]);if(!r&&e.multi){let u=l.indexOf(t);u===-1?l.push(t,[i,c]):l[u+1].push(i,c)}else l.push(t,c)}}}function iE(n,e,t){return t&&n.componentProviders++,n.multi.push(e)-1}function Bp(n,e,t,i){for(let r=t;r<i;r++)if(e[r]===n)return r;return-1}function mA(n,e,t,i,r){return hm(this.multi,[])}function gA(n,e,t,i,r){let s=this.multi,o;if(this.providerFactory){let a=this.providerFactory.componentProviders,c=au(i,i[qe],this.providerFactory.index,r);o=c.slice(0,a),hm(s,o);for(let l=a;l<c.length;l++)o.push(c[l])}else o=[],hm(s,o);return o}function hm(n,e){for(let t=0;t<n.length;t++){let i=n[t];e.push(i())}return e}function _A(n,e,t,i,r,s){let o=new Es(n,t,Nt,null);return o.multi=[],o.index=e,o.componentProviders=0,iE(o,r,i&&!t),o}function nr(n,e){return t=>{t.providersResolver=(i,r)=>E0(i,r?r(n):n,!1),e&&(t.viewProvidersResolver=(i,r)=>E0(i,r?r(e):e,!0))}}var rE=(()=>{class n{applicationErrorHandler=nt(vo);appRef=nt(Co);taskService=nt(yo);ngZone=nt(gn);zonelessEnabled=nt(Ia);tracing=nt(Ar,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new hn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(xa):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(nt(Dp,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?jv:Cp;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(xa+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Lt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function sE(){return[{provide:ls,useExisting:rE},{provide:gn,useClass:Ea},{provide:Ia,useValue:!0}]}function yA(){return typeof $localize<"u"&&$localize.locale||za}var Hm=new at("",{factory:()=>nt(Hm,{optional:!0,skipSelf:!0})||yA()});function ir(n){return Jy(n)}function Do(n,e){return cl(n,e?.equal)}var zm=new at(""),DA=new at("");function Wa(n){return!n.moduleRef}function AA(n){let e=Wa(n)?n.r3Injector:n.moduleRef.injector,t=e.get(gn);return t.run(()=>{Wa(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(vo),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Wa(n)){let s=()=>e.destroy(),o=n.platformInjector.get(zm);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(zm);o.add(s),n.moduleRef.onDestroy(()=>{Na(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return RA(i,t,()=>{let s=e.get(yo),o=s.add(),a=e.get(Bm);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(Hm,za);if(jx(c||za),!e.get(DA,!0))return Wa(n)?e.get(Co):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Wa(n)){let u=e.get(Co);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return IA?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var IA;function RA(n,e,t){try{let i=t();return Va(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Du=null;function NA(n=[],e){return Yi.create({name:e,providers:[{provide:Ca,useValue:"platform"},{provide:zm,useValue:new Set([()=>Du=null])},...n]})}function PA(n=[]){if(Du)return Du;let e=NA(n);return Du=e,Gx(),FA(e),e}function FA(n){let e=n.get(yu,null);Hl(n,()=>{e?.forEach(t=>t())})}var OA=1e4;var S8=OA-1e3;var Ao=(()=>{class n{static __NG_ELEMENT_ID__=LA}return n})();function LA(n){return kA(Yn(),pt(),(n&16)===16)}function kA(n,e,t){if(er(n)&&!t){let i=Xn(n.index,e);return new bo(i,i)}else if(n.type&175){let i=e[An];return new bo(i,e)}return null}function oE(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;Et(ft.BootstrapApplicationStart);try{let s=r?.injector??PA(i),o=[sE(),qv,...t||[]],a=new Oa({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return AA({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{Et(ft.BootstrapApplicationEnd)}}function Gm(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}var aE=null;function Rr(){return aE}function Wm(n){aE??=n}var $a=class{};var Au=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ds({type:n});static \u0275inj=br({})}return n})();function jm(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var qa=class{};var cE="browser";var Xa=class{_doc;constructor(e){this._doc=e}manager},Iu=(()=>{class n extends Xa{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(Ct(oi))};static \u0275prov=Lt({token:n,factory:n.\u0275fac})}return n})(),Pu=new at(""),Ym=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof Iu));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof Iu);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new rt(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(Ct(Pu),Ct(gn))};static \u0275prov=Lt({token:n,factory:n.\u0275fac})}return n})(),$m="ng-app-id";function lE(n){for(let e of n)e.remove()}function uE(n,e){let t=e.createElement("style");return t.textContent=n,t}function BA(n,e,t,i){let r=n.head?.querySelectorAll(`style[${$m}="${e}"],link[${$m}="${e}"]`);if(r)for(let s of r)s.removeAttribute($m),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function Xm(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Zm=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,BA(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,uE);i?.forEach(r=>this.addUsage(r,this.external,Xm))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(lE(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])lE(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,uE(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Xm(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(Ct(oi),Ct(_u),Ct(vu,8),Ct(Ba))};static \u0275prov=Lt({token:n,factory:n.\u0275fac})}return n})(),qm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Jm=/%COMP%/g;var fE="%COMP%",VA=`_nghost-${fE}`,HA=`_ngcontent-${fE}`,zA=!0,GA=new at("",{factory:()=>zA});function WA(n){return HA.replace(Jm,n)}function jA(n){return VA.replace(Jm,n)}function hE(n,e){return e.map(t=>t.replace(Jm,n))}var Km=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,s,o,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Ya(t,o,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Nu?r.applyToHost(t):r instanceof Za&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case li.Emulated:s=new Nu(c,l,i,this.appId,u,o,a,f);break;case li.ShadowDom:return new Ru(c,t,i,o,a,this.nonce,f,l);case li.ExperimentalIsolatedShadowDom:return new Ru(c,t,i,o,a,this.nonce,f);default:s=new Za(c,l,i,u,o,a,f);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(Ct(Ym),Ct(Zm),Ct(_u),Ct(GA),Ct(oi),Ct(gn),Ct(vu),Ct(Ar,8))};static \u0275prov=Lt({token:n,factory:n.\u0275fac})}return n})(),Ya=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(qm[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(dE(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(dE(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new rt(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=qm[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=qm[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(tr.DashCase|tr.Important)?e.style.setProperty(t,i,r&tr.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&tr.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=Rr().getGlobalEventTarget(this.doc,e),!e))throw new rt(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function dE(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Ru=class extends Ya{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c){super(e,r,s,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=hE(i.id,l);for(let f of l){let d=document.createElement("style");o&&d.setAttribute("nonce",o),d.textContent=f,this.shadowRoot.appendChild(d)}let u=i.getExternalStyles?.();if(u)for(let f of u){let d=Xm(f,r);o&&d.setAttribute("nonce",o),this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Za=class extends Ya{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?hE(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Ss.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Nu=class extends Za{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c){let l=r+"-"+i.id;super(e,t,i,s,o,a,c,l),this.contentAttr=WA(l),this.hostAttr=jA(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var Fu=class n extends $a{supportsDOMEvents=!0;static makeCurrent(){Wm(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=$A();return t==null?null:qA(t)}resetBaseElement(){Ja=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return jm(document.cookie,e)}},Ja=null;function $A(){return Ja=Ja||document.head.querySelector("base"),Ja?Ja.getAttribute("href"):null}function qA(n){return new URL(n,document.baseURI).pathname}var XA=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Lt({token:n,factory:n.\u0275fac})}return n})(),pE=["alt","control","meta","shift"],YA={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},ZA={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},mE=(()=>{class n extends Xa{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Rr().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),pE.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=YA[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),pE.forEach(o=>{if(o!==r){let a=ZA[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(Ct(oi))};static \u0275prov=Lt({token:n,factory:n.\u0275fac})}return n})();async function Qm(n,e,t){let i=ot({rootComponent:n},JA(e,t));return oE(i)}function JA(n,e){return{platformRef:e?.platformRef,appProviders:[...nI,...n?.providers??[]],platformProviders:tI}}function KA(){Fu.makeCurrent()}function QA(){return new bi}function eI(){return mm(document),document}var tI=[{provide:Ba,useValue:cE},{provide:yu,useValue:KA,multi:!0},{provide:oi,useFactory:eI}];var nI=[{provide:Ca,useValue:"root"},{provide:bi,useFactory:QA},{provide:Pu,useClass:Iu,multi:!0},{provide:Pu,useClass:mE,multi:!0},Km,Zm,Ym,{provide:bs,useExisting:Km},{provide:qa,useClass:XA},[]];var CE=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,i){this._renderer=t,this._elementRef=i}setProperty(t,i){this._renderer.setProperty(this._elementRef.nativeElement,t,i)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(i){return new(i||n)(Nt(Ts),Nt(Dr))};static \u0275dir=Kt({type:n})}return n})(),ng=(()=>{class n extends CE{static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cs(n)))(r||n)}})();static \u0275dir=Kt({type:n,features:[Nn]})}return n})(),Gu=new at("");var iI={provide:Gu,useExisting:$n(()=>Wu),multi:!0};function rI(){let n=Rr()?Rr().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}var sI=new at(""),Wu=(()=>{class n extends CE{_compositionMode;_composing=!1;constructor(t,i,r){super(t,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!rI())}writeValue(t){let i=t??"";this.setProperty("value",i)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(i){return new(i||n)(Nt(Ts),Nt(Dr),Nt(sI,8))};static \u0275dir=Kt({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&St("input",function(o){return r._handleInput(o.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(o){return r._compositionEnd(o.target.value)})},standalone:!1,features:[nr([iI]),Nn]})}return n})();function oI(n){return n==null||wE(n)===0}function wE(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var ju=new at(""),TE=new at("");function aI(n){return oI(n.value)?{required:!0}:null}function cI(n){return e=>{let t=e.value?.length??wE(e.value);return t!==null&&t>n?{maxlength:{requiredLength:n,actualLength:t}}:null}}function gE(n){return null}function DE(n){return n!=null}function AE(n){return Va(n)?Ah(n):n}function IE(n){let e={};return n.forEach(t=>{e=t!=null?ot(ot({},e),t):e}),Object.keys(e).length===0?null:e}function RE(n,e){return e.map(t=>t(n))}function lI(n){return!n.validate}function NE(n){return n.map(e=>lI(e)?e:t=>e.validate(t))}function uI(n){if(!n)return null;let e=n.filter(DE);return e.length==0?null:function(t){return IE(RE(t,e))}}function ig(n){return n!=null?uI(NE(n)):null}function dI(n){if(!n)return null;let e=n.filter(DE);return e.length==0?null:function(t){let i=RE(t,e).map(AE);return Ih(i).pipe(is(IE))}}function rg(n){return n!=null?dI(NE(n)):null}function _E(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function fI(n){return n._rawValidators}function hI(n){return n._rawAsyncValidators}function eg(n){return n?Array.isArray(n)?n:[n]:[]}function Lu(n,e){return Array.isArray(n)?n.includes(e):n===e}function yE(n,e){let t=eg(e);return eg(n).forEach(r=>{Lu(t,r)||t.push(r)}),t}function vE(n,e){return eg(e).filter(t=>!Lu(n,t))}var ku=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=ig(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=rg(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control?.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}},No=class extends ku{name;get formDirective(){return null}get path(){return null}},ic=class extends ku{_parent=null;name=null;valueAccessor=null},Uu=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var PE=(()=>{class n extends Uu{constructor(t){super(t)}static \u0275fac=function(i){return new(i||n)(Nt(ic,2))};static \u0275dir=Kt({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&Mn("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[Nn]})}return n})(),FE=(()=>{class n extends Uu{constructor(t){super(t)}static \u0275fac=function(i){return new(i||n)(Nt(No,10))};static \u0275dir=Kt({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&Mn("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[Nn]})}return n})();var Ka="VALID",Ou="INVALID",Io="PENDING",Qa="DISABLED",Nr=class{},Bu=class extends Nr{value;source;constructor(e,t){super(),this.value=e,this.source=t}},tc=class extends Nr{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}},nc=class extends Nr{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}},Ro=class extends Nr{status;source;constructor(e,t){super(),this.status=e,this.source=t}},tg=class extends Nr{source;constructor(e){super(),this.source=e}},Vu=class extends Nr{source;constructor(e){super(),this.source=e}};function OE(n){return($u(n)?n.validators:n)||null}function pI(n){return Array.isArray(n)?ig(n):n||null}function LE(n,e){return($u(e)?e.asyncValidators:n)||null}function mI(n){return Array.isArray(n)?rg(n):n||null}function $u(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function gI(n,e,t){let i=n.controls;if(!(e?Object.keys(i):i).length)throw new rt(1e3,"");if(!i[t])throw new rt(1001,"")}function _I(n,e,t){n._forEachChild((i,r)=>{if(t[r]===void 0)throw new rt(1002,"")})}var Hu=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return ir(this.statusReactive)}set status(e){ir(()=>this.statusReactive.set(e))}_status=Do(()=>this.statusReactive());statusReactive=xs(void 0);get valid(){return this.status===Ka}get invalid(){return this.status===Ou}get pending(){return this.status==Io}get disabled(){return this.status===Qa}get enabled(){return this.status!==Qa}errors;get pristine(){return ir(this.pristineReactive)}set pristine(e){ir(()=>this.pristineReactive.set(e))}_pristine=Do(()=>this.pristineReactive());pristineReactive=xs(!0);get dirty(){return!this.pristine}get touched(){return ir(this.touchedReactive)}set touched(e){ir(()=>this.touchedReactive.set(e))}_touched=Do(()=>this.touchedReactive());touchedReactive=xs(!1);get untouched(){return!this.touched}_events=new xi;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(yE(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(yE(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(vE(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(vE(e,this._rawAsyncValidators))}hasValidator(e){return Lu(this._rawValidators,e)}hasAsyncValidator(e){return Lu(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let i=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched(_t(ot({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new nc(!0,i))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:i})}),e.onlySelf||this._parent?._updateTouched(e,i),t&&e.emitEvent!==!1&&this._events.next(new nc(!1,i))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let i=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty(_t(ot({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new tc(!1,i))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),e.onlySelf||this._parent?._updatePristine(e,i),t&&e.emitEvent!==!1&&this._events.next(new tc(!0,i))}markAsPending(e={}){this.status=Io;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Ro(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending(_t(ot({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Qa,this.errors=null,this._forEachChild(r=>{r.disable(_t(ot({},e),{onlySelf:!0}))}),this._updateValue();let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Bu(this.value,i)),this._events.next(new Ro(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(_t(ot({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Ka,this._forEachChild(i=>{i.enable(_t(ot({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(_t(ot({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Ka||this.status===Io)&&this._runAsyncValidator(i,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Bu(this.value,t)),this._events.next(new Ro(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity(_t(ot({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Qa:Ka}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=Io,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let i=AE(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((i,r)=>i&&i._find(r),this)}getError(e,t){let i=t?this.get(t):this;return i?.errors?i.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,i){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||i)&&this._events.next(new Ro(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,i)}_initObservables(){this.valueChanges=new En,this.statusChanges=new En}_calculateStatus(){return this._allControlsDisabled()?Qa:this.errors?Ou:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Io)?Io:this._anyControlsHaveStatus(Ou)?Ou:Ka}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,e.onlySelf||this._parent?._updatePristine(e,t),r&&this._events.next(new tc(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new nc(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){$u(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){return!e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=pI(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=mI(this._rawAsyncValidators)}},zu=class extends Hu{constructor(e,t,i){super(OE(t),LE(i,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(e,t){return this.controls[e]?this.controls[e]:(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,i={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(e,t={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(e,t,i={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(e){return this.controls.hasOwnProperty(e)&&this.controls[e].enabled}setValue(e,t={}){_I(this,!0,e),Object.keys(e).forEach(i=>{gI(this,!0,i),this.controls[i].setValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(i=>{let r=this.controls[i];r&&r.patchValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e={},t={}){this._forEachChild((i,r)=>{i.reset(e?e[r]:null,_t(ot({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new Vu(this))}getRawValue(){return this._reduceChildren({},(e,t,i)=>(e[i]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(t,i)=>i._syncPendingControls()?!0:t);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let i=this.controls[t];i&&e(i,t)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[t,i]of Object.entries(this.controls))if(this.contains(t)&&e(i))return!0;return!1}_reduceValue(){let e={};return this._reduceChildren(e,(t,i,r)=>((i.enabled||this.disabled)&&(t[r]=i.value),t))}_reduceChildren(e,t){let i=e;return this._forEachChild((r,s)=>{i=t(i,r,s)}),i}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return this.controls.hasOwnProperty(e)?this.controls[e]:null}};var sg=new at("",{factory:()=>og}),og="always";function yI(n,e){return[...e.path,n]}function kE(n,e,t=og){UE(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(n.disabled),xI(n,e),SI(n,e),EI(n,e),vI(n,e)}function xE(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function vI(n,e){if(e.valueAccessor.setDisabledState){let t=i=>{e.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function UE(n,e){let t=fI(n);e.validator!==null?n.setValidators(_E(t,e.validator)):typeof t=="function"&&n.setValidators([t]);let i=hI(n);e.asyncValidator!==null?n.setAsyncValidators(_E(i,e.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();xE(e._rawValidators,r),xE(e._rawAsyncValidators,r)}function xI(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&BE(n,e)})}function EI(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&BE(n,e),n.updateOn!=="submit"&&n.markAsTouched()})}function BE(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function SI(n,e){let t=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function bI(n,e){n==null,UE(n,e)}function MI(n,e){if(!n.hasOwnProperty("model"))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function CI(n){return Object.getPrototypeOf(n.constructor)===ng}function wI(n,e){n._syncPendingControls(),e.forEach(t=>{let i=t.control;i.updateOn==="submit"&&i._pendingChange&&(t.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function TI(n,e){if(!e)return null;Array.isArray(e);let t,i,r;return e.forEach(s=>{s.constructor===Wu?t=s:CI(s)?i=s:r=s}),r||i||t||null}var DI={provide:No,useExisting:$n(()=>ag)},ec=Promise.resolve(),ag=(()=>{class n extends No{callSetDisabledState;get submitted(){return ir(this.submittedReactive)}_submitted=Do(()=>this.submittedReactive());submittedReactive=xs(!1);_directives=new Set;form;ngSubmit=new En;options;constructor(t,i,r){super(),this.callSetDisabledState=r,this.form=new zu({},ig(t),rg(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){ec.then(()=>{let i=this._findContainer(t.path);t.control=i.registerControl(t.name,t.control),kE(t.control,t,this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){ec.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){ec.then(()=>{let i=this._findContainer(t.path),r=new zu({});bI(r,t),i.registerControl(t.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){ec.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,i){ec.then(()=>{this.form.get(t.path).setValue(i)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),wI(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new tg(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(i){return new(i||n)(Nt(ju,10),Nt(TE,10),Nt(sg,8))};static \u0275dir=Kt({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&St("submit",function(o){return r.onSubmit(o)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[nr([DI]),Nn]})}return n})();function EE(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function SE(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var AI=class extends Hu{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,i){super(OE(t),LE(i,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),$u(t)&&(t.nonNullable||t.initialValueIsDefault)&&(SE(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new Vu(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){EE(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){EE(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){SE(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var II={provide:ic,useExisting:$n(()=>cg)},bE=Promise.resolve(),cg=(()=>{class n extends ic{_changeDetectorRef;callSetDisabledState;control=new AI;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new En;constructor(t,i,r,s,o,a){super(),this._changeDetectorRef=o,this.callSetDisabledState=a,this._parent=t,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=TI(this,s)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let i=t.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),MI(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){kE(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){bE.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let i=t.isDisabled.currentValue,r=i!==0&&Gm(i);bE.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?yI(t,this._parent):[t]}static \u0275fac=function(i){return new(i||n)(Nt(No,9),Nt(ju,10),Nt(TE,10),Nt(Gu,10),Nt(Ao,8),Nt(sg,8))};static \u0275dir=Kt({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[nr([II]),Nn,Ua]})}return n})();var VE=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=Kt({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return n})();var RI={provide:Gu,useExisting:$n(()=>qu),multi:!0};function HE(n,e){return n==null?`${e}`:(e&&typeof e=="object"&&(e="Object"),`${n}: ${e}`.slice(0,50))}function NI(n){return n.split(":")[0]}var qu=(()=>{class n extends ng{value;_optionMap=new Map;_idCounter=0;set compareWith(t){this._compareWith=t}_compareWith=Object.is;appRefInjector=nt(Co).injector;destroyRef=nt(vs);cdr=nt(Ao);_queuedWrite=!1;_writeValueAfterRender(){this._queuedWrite||this.appRefInjector.destroyed||(this._queuedWrite=!0,bm({write:()=>{this.destroyRef.destroyed||(this._queuedWrite=!1,this.writeValue(this.value))}},{injector:this.appRefInjector}))}writeValue(t){this.cdr.markForCheck(),this.value=t;let i=this._getOptionId(t),r=HE(i,t);this.setProperty("value",r)}registerOnChange(t){this.onChange=i=>{this.value=this._getOptionValue(i),t(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(t){for(let i of this._optionMap.keys())if(this._compareWith(this._optionMap.get(i),t))return i;return null}_getOptionValue(t){let i=NI(t);return this._optionMap.has(i)?this._optionMap.get(i):t}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cs(n)))(r||n)}})();static \u0275dir=Kt({type:n,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(i,r){i&1&&St("change",function(o){return r.onChange(o.target.value)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},standalone:!1,features:[nr([RI]),Nn]})}return n})(),zE=(()=>{class n{_element;_renderer;_select;id;constructor(t,i,r){this._element=t,this._renderer=i,this._select=r,this._select&&(this.id=this._select._registerOption())}set ngValue(t){this._select!=null&&(this._select._optionMap.set(this.id,t),this._setElementValue(HE(this.id,t)),this._select._writeValueAfterRender())}set value(t){this._setElementValue(t),this._select?._writeValueAfterRender()}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}ngOnDestroy(){this._select?._optionMap.delete(this.id),this._select?._writeValueAfterRender()}static \u0275fac=function(i){return new(i||n)(Nt(Dr),Nt(Ts),Nt(qu,9))};static \u0275dir=Kt({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"},standalone:!1})}return n})(),PI={provide:Gu,useExisting:$n(()=>GE),multi:!0};function ME(n,e){return n==null?`${e}`:(typeof e=="string"&&(e=`'${e}'`),e&&typeof e=="object"&&(e="Object"),`${n}: ${e}`.slice(0,50))}function FI(n){return n.split(":")[0]}var GE=(()=>{class n extends ng{value;_optionMap=new Map;_idCounter=0;set compareWith(t){this._compareWith=t}_compareWith=Object.is;writeValue(t){this.value=t;let i;if(Array.isArray(t)){let r=t.map(s=>this._getOptionId(s));i=(s,o)=>{s._setSelected(r.indexOf(o.toString())>-1)}}else i=(r,s)=>{r._setSelected(!1)};this._optionMap.forEach(i)}registerOnChange(t){this.onChange=i=>{let r=[],s=i.selectedOptions;if(s!==void 0){let o=s;for(let a=0;a<o.length;a++){let c=o[a],l=this._getOptionValue(c.value);r.push(l)}}else{let o=i.options;for(let a=0;a<o.length;a++){let c=o[a];if(c.selected){let l=this._getOptionValue(c.value);r.push(l)}}}this.value=r,t(r)}}_registerOption(t){let i=(this._idCounter++).toString();return this._optionMap.set(i,t),i}_getOptionId(t){for(let i of this._optionMap.keys())if(this._compareWith(this._optionMap.get(i)._value,t))return i;return null}_getOptionValue(t){let i=FI(t);return this._optionMap.has(i)?this._optionMap.get(i)._value:t}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cs(n)))(r||n)}})();static \u0275dir=Kt({type:n,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(i,r){i&1&&St("change",function(o){return r.onChange(o.target)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},standalone:!1,features:[nr([PI]),Nn]})}return n})(),WE=(()=>{class n{_element;_renderer;_select;id;_value;constructor(t,i,r){this._element=t,this._renderer=i,this._select=r,this._select&&(this.id=this._select._registerOption(this))}set ngValue(t){this._select!=null&&(this._value=t,this._setElementValue(ME(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._select?(this._value=t,this._setElementValue(ME(this.id,t)),this._select.writeValue(this._select.value)):this._setElementValue(t)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}_setSelected(t){this._renderer.setProperty(this._element.nativeElement,"selected",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}static \u0275fac=function(i){return new(i||n)(Nt(Dr),Nt(Ts),Nt(GE,9))};static \u0275dir=Kt({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"},standalone:!1})}return n})();function OI(n){return typeof n=="number"?n:parseInt(n,10)}var jE=(()=>{class n{_validator=gE;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let i=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):gE,this._onChange?.()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Kt({type:n,features:[Ua]})}return n})();var LI={provide:ju,useExisting:$n(()=>lg),multi:!0};var lg=(()=>{class n extends jE{required;inputName="required";normalizeInput=Gm;createValidator=t=>aI;enabled(t){return t}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cs(n)))(r||n)}})();static \u0275dir=Kt({type:n,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,r){i&2&&Pn("required",r._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[nr([LI]),Nn]})}return n})();var kI={provide:ju,useExisting:$n(()=>ug),multi:!0},ug=(()=>{class n extends jE{maxlength;inputName="maxlength";normalizeInput=t=>OI(t);createValidator=t=>cI(t);static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cs(n)))(r||n)}})();static \u0275dir=Kt({type:n,selectors:[["","maxlength","","formControlName",""],["","maxlength","","formControl",""],["","maxlength","","ngModel",""]],hostVars:1,hostBindings:function(i,r){i&2&&Pn("maxlength",r._enabled?r.maxlength:null)},inputs:{maxlength:"maxlength"},standalone:!1,features:[nr([kI]),Nn]})}return n})();var UI=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ds({type:n});static \u0275inj=br({})}return n})();var $E=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:sg,useValue:t.callSetDisabledState??og}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=Ds({type:n});static \u0275inj=br({imports:[UI]})}return n})();var ui=Object.create(null);ui.open="0";ui.close="1";ui.ping="2";ui.pong="3";ui.message="4";ui.upgrade="5";ui.noop="6";var rc=Object.create(null);Object.keys(ui).forEach(n=>{rc[ui[n]]=n});var sc={type:"error",data:"parser error"};var YE=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",ZE=typeof ArrayBuffer=="function",JE=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,oc=({type:n,data:e},t,i)=>YE&&e instanceof Blob?t?i(e):qE(e,i):ZE&&(e instanceof ArrayBuffer||JE(e))?t?i(e):qE(new Blob([e]),i):i(ui[n]+(e||"")),qE=(n,e)=>{let t=new FileReader;return t.onload=function(){let i=t.result.split(",")[1];e("b"+(i||""))},t.readAsDataURL(n)};function XE(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}var dg;function KE(n,e){if(YE&&n.data instanceof Blob)return n.data.arrayBuffer().then(XE).then(e);if(ZE&&(n.data instanceof ArrayBuffer||JE(n.data)))return e(XE(n.data));oc(n,!1,t=>{dg||(dg=new TextEncoder),e(dg.encode(t))})}var QE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ac=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<QE.length;n++)ac[QE.charCodeAt(n)]=n;var eS=n=>{let e=n.length*.75,t=n.length,i,r=0,s,o,a,c;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);let l=new ArrayBuffer(e),u=new Uint8Array(l);for(i=0;i<t;i+=4)s=ac[n.charCodeAt(i)],o=ac[n.charCodeAt(i+1)],a=ac[n.charCodeAt(i+2)],c=ac[n.charCodeAt(i+3)],u[r++]=s<<2|o>>4,u[r++]=(o&15)<<4|a>>2,u[r++]=(a&3)<<6|c&63;return l};var VI=typeof ArrayBuffer=="function",cc=(n,e)=>{if(typeof n!="string")return{type:"message",data:tS(n,e)};let t=n.charAt(0);return t==="b"?{type:"message",data:HI(n.substring(1),e)}:rc[t]?n.length>1?{type:rc[t],data:n.substring(1)}:{type:rc[t]}:sc},HI=(n,e)=>{if(VI){let t=eS(n);return tS(t,e)}else return{base64:!0,data:n}},tS=(n,e)=>e==="blob"?n instanceof Blob?n:new Blob([n]):n instanceof ArrayBuffer?n:n.buffer;var nS="",iS=(n,e)=>{let t=n.length,i=new Array(t),r=0;n.forEach((s,o)=>{oc(s,!1,a=>{i[o]=a,++r===t&&e(i.join(nS))})})},rS=(n,e)=>{let t=n.split(nS),i=[];for(let r=0;r<t.length;r++){let s=cc(t[r],e);if(i.push(s),s.type==="error")break}return i};function sS(){return new TransformStream({transform(n,e){KE(n,t=>{let i=t.length,r;if(i<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,i);else if(i<65536){r=new Uint8Array(3);let s=new DataView(r.buffer);s.setUint8(0,126),s.setUint16(1,i)}else{r=new Uint8Array(9);let s=new DataView(r.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(i))}n.data&&typeof n.data!="string"&&(r[0]|=128),e.enqueue(r),e.enqueue(t)})}})}var fg;function Xu(n){return n.reduce((e,t)=>e+t.length,0)}function Yu(n,e){if(n[0].length===e)return n.shift();let t=new Uint8Array(e),i=0;for(let r=0;r<e;r++)t[r]=n[0][i++],i===n[0].length&&(n.shift(),i=0);return n.length&&i<n[0].length&&(n[0]=n[0].slice(i)),t}function oS(n,e){fg||(fg=new TextDecoder);let t=[],i=0,r=-1,s=!1;return new TransformStream({transform(o,a){for(t.push(o);;){if(i===0){if(Xu(t)<1)break;let c=Yu(t,1);s=(c[0]&128)===128,r=c[0]&127,r<126?i=3:r===126?i=1:i=2}else if(i===1){if(Xu(t)<2)break;let c=Yu(t,2);r=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),i=3}else if(i===2){if(Xu(t)<8)break;let c=Yu(t,8),l=new DataView(c.buffer,c.byteOffset,c.length),u=l.getUint32(0);if(u>Math.pow(2,21)-1){a.enqueue(sc);break}r=u*Math.pow(2,32)+l.getUint32(4),i=3}else{if(Xu(t)<r)break;let c=Yu(t,r);a.enqueue(cc(s?c:fg.decode(c),e)),i=0}if(r===0||r>n){a.enqueue(sc);break}}}})}var hg=4;function Ot(n){if(n)return zI(n)}function zI(n){for(var e in Ot.prototype)n[e]=Ot.prototype[e];return n}Ot.prototype.on=Ot.prototype.addEventListener=function(n,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(e),this};Ot.prototype.once=function(n,e){function t(){this.off(n,t),e.apply(this,arguments)}return t.fn=e,this.on(n,t),this};Ot.prototype.off=Ot.prototype.removeListener=Ot.prototype.removeAllListeners=Ot.prototype.removeEventListener=function(n,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+n];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var i,r=0;r<t.length;r++)if(i=t[r],i===e||i.fn===e){t.splice(r,1);break}return t.length===0&&delete this._callbacks["$"+n],this};Ot.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+n],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(t){t=t.slice(0);for(var i=0,r=t.length;i<r;++i)t[i].apply(this,e)}return this};Ot.prototype.emitReserved=Ot.prototype.emit;Ot.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};Ot.prototype.hasListeners=function(n){return!!this.listeners(n).length};var rr=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),_n=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),aS="arraybuffer";function Zu(n,...e){return e.reduce((t,i)=>(n.hasOwnProperty(i)&&(t[i]=n[i]),t),{})}var GI=_n.setTimeout,WI=_n.clearTimeout;function sr(n,e){e.useNativeTimers?(n.setTimeoutFn=GI.bind(_n),n.clearTimeoutFn=WI.bind(_n)):(n.setTimeoutFn=_n.setTimeout.bind(_n),n.clearTimeoutFn=_n.clearTimeout.bind(_n))}var jI=1.33;function cS(n){return typeof n=="string"?$I(n):Math.ceil((n.byteLength||n.size)*jI)}function $I(n){let e=0,t=0;for(let i=0,r=n.length;i<r;i++)e=n.charCodeAt(i),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(i++,t+=4);return t}function Ju(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function lS(n){let e="";for(let t in n)n.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t]));return e}function uS(n){let e={},t=n.split("&");for(let i=0,r=t.length;i<r;i++){let s=t[i].split("=");e[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return e}var Ku=class extends Error{constructor(e,t,i){super(e),this.description=t,this.context=i,this.type="TransportError"}},or=class extends Ot{constructor(e){super(),this.writable=!1,sr(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,i){return super.emitReserved("error",new Ku(e,t,i)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){let t=cc(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){let e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){let t=lS(e);return t.length?"?"+t:""}};var lc=class extends or{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";let t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let i=0;this._polling&&(i++,this.once("pollComplete",function(){--i||t()})),this.writable||(i++,this.once("drain",function(){--i||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){let t=i=>{if(this.readyState==="opening"&&i.type==="open"&&this.onOpen(),i.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(i)};rS(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){let e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,iS(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=Ju()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}};var dS=!1;try{dS=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}var fS=dS;function qI(){}var pg=class extends lc{constructor(e){if(super(e),typeof location<"u"){let t=location.protocol==="https:",i=location.port;i||(i=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||i!==e.port}}doWrite(e,t){let i=this.request({method:"POST",data:e});i.on("success",t),i.on("error",(r,s)=>{this.onError("xhr post error",r,s)})}doPoll(){let e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,i)=>{this.onError("xhr poll error",t,i)}),this.pollXhr=e}},Qu=(()=>{class n extends Ot{constructor(t,i,r){super(),this.createRequest=t,sr(this,r),this._opts=r,this._method=r.method||"GET",this._uri=i,this._data=r.data!==void 0?r.data:null,this._create()}_create(){var t;let i=Zu(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");i.xdomain=!!this._opts.xd;let r=this._xhr=this.createRequest(i);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&r.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(r),"withCredentials"in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var s;r.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(r.getResponseHeader("set-cookie"))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status=="number"?r.status:0)},0))},r.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=n.requestsCount++,n.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=qI,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete n.requests[this._index],this._xhr=null}}_onLoad(){let t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}return n.requestsCount=0,n.requests={},n})();if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",hS);else if(typeof addEventListener=="function"){let n="onpagehide"in _n?"pagehide":"unload";addEventListener(n,hS,!1)}}function hS(){for(let n in Qu.requests)Qu.requests.hasOwnProperty(n)&&Qu.requests[n].abort()}var XI=(function(){let n=pS({xdomain:!1});return n&&n.responseType!==null})(),Pr=class extends pg{constructor(e){super(e);let t=e&&e.forceBase64;this.supportsBinary=XI&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new Qu(pS,this.uri(),e)}};function pS(n){let e=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||fS))return new XMLHttpRequest}catch{}if(!e)try{return new _n[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}var mS=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative",gg=class extends or{get name(){return"websocket"}doOpen(){let e=this.uri(),t=this.opts.protocols,i=mS?{}:Zu(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,i)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let i=e[t],r=t===e.length-1;oc(i,this.supportsBinary,s=>{try{this.doWrite(i,s)}catch{}r&&rr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){let e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Ju()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}},mg=_n.WebSocket||_n.MozWebSocket,Fr=class extends gg{createSocket(e,t,i){return mS?new mg(e,t,i):t?new mg(e,t):new mg(e)}doWrite(e,t){this.ws.send(t)}};var Po=class extends or{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{let t=oS(Number.MAX_SAFE_INTEGER,this.socket.binaryType),i=e.readable.pipeThrough(t).getReader(),r=sS();r.readable.pipeTo(e.writable),this._writer=r.writable.getWriter();let s=()=>{i.read().then(({done:a,value:c})=>{a||(this.onPacket(c),s())}).catch(a=>{})};s();let o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let i=e[t],r=t===e.length-1;this._writer.write(i).then(()=>{r&&rr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}};var _g={websocket:Fr,webtransport:Po,polling:Pr};var YI=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ZI=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Fo(n){if(n.length>8e3)throw"URI too long";let e=n,t=n.indexOf("["),i=n.indexOf("]");t!=-1&&i!=-1&&(n=n.substring(0,t)+n.substring(t,i).replace(/:/g,";")+n.substring(i,n.length));let r=YI.exec(n||""),s={},o=14;for(;o--;)s[ZI[o]]=r[o]||"";return t!=-1&&i!=-1&&(s.source=e,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=JI(s,s.path),s.queryKey=KI(s,s.query),s}function JI(n,e){let t=/\/{2,9}/g,i=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&i.splice(0,1),e.slice(-1)=="/"&&i.splice(i.length-1,1),i}function KI(n,e){let t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(i,r,s){r&&(t[r]=s)}),t}var yg=typeof addEventListener=="function"&&typeof removeEventListener=="function",ed=[];yg&&addEventListener("offline",()=>{ed.forEach(n=>n())},!1);var td=(()=>{class n extends Ot{constructor(t,i){if(super(),this.binaryType=aS,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(i=t,t=null),t){let r=Fo(t);i.hostname=r.host,i.secure=r.protocol==="https"||r.protocol==="wss",i.port=r.port,r.query&&(i.query=r.query)}else i.host&&(i.hostname=Fo(i.host).host);sr(this,i),this.secure=i.secure!=null?i.secure:typeof location<"u"&&location.protocol==="https:",i.hostname&&!i.port&&(i.port=this.secure?"443":"80"),this.hostname=i.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=i.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},i.transports.forEach(r=>{let s=r.prototype.name;this.transports.push(s),this._transportsByName[s]=r}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},i),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=uS(this.opts.query)),yg&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},ed.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){let i=Object.assign({},this.opts.query);i.EIO=hg,i.transport=t,this.id&&(i.sid=this.id);let r=Object.assign({},this.opts,{query:i,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](r)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}let t=this.opts.rememberUpgrade&&n.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";let i=this.createTransport(t);i.open(),this.setTransport(i)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",i=>this._onClose("transport close",i))}onOpen(){this.readyState="open",n.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":let i=new Error("server error");i.code=t.data,this._onError(i);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);let t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){let t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let i=1;for(let r=0;r<this.writeBuffer.length;r++){let s=this.writeBuffer[r].data;if(s&&(i+=cS(s)),r>0&&i>this._maxPayload)return this.writeBuffer.slice(0,r);i+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;let t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,rr(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,i,r){return this._sendPacket("message",t,i,r),this}send(t,i,r){return this._sendPacket("message",t,i,r),this}_sendPacket(t,i,r,s){if(typeof i=="function"&&(s=i,i=void 0),typeof r=="function"&&(s=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;let o={type:t,data:i,options:r};this.emitReserved("packetCreate",o),this.writeBuffer.push(o),s&&this.once("flush",s),this.flush()}close(){let t=()=>{this._onClose("forced close"),this.transport.close()},i=()=>{this.off("upgrade",i),this.off("upgradeError",i),t()},r=()=>{this.once("upgrade",i),this.once("upgradeError",i)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():t()}):this.upgrading?r():t()),this}_onError(t){if(n.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,i){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),yg&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){let r=ed.indexOf(this._offlineEventListener);r!==-1&&ed.splice(r,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,i),this.writeBuffer=[],this._prevBufferLen=0}}}return n.protocol=hg,n})(),nd=class extends td{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),i=!1;td.priorWebsocketSuccess=!1;let r=()=>{i||(t.send([{type:"ping",data:"probe"}]),t.once("packet",f=>{if(!i)if(f.type==="pong"&&f.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;td.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{i||this.readyState!=="closed"&&(u(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{let d=new Error("probe error");d.transport=t.name,this.emitReserved("upgradeError",d)}}))};function s(){i||(i=!0,u(),t.close(),t=null)}let o=f=>{let d=new Error("probe error: "+f);d.transport=t.name,s(),this.emitReserved("upgradeError",d)};function a(){o("transport closed")}function c(){o("socket closed")}function l(f){t&&f.name!==t.name&&s()}let u=()=>{t.removeListener("open",r),t.removeListener("error",o),t.removeListener("close",a),this.off("close",c),this.off("upgrading",l)};t.once("open",r),t.once("error",o),t.once("close",a),this.once("close",c),this.once("upgrading",l),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{i||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){let t=[];for(let i=0;i<e.length;i++)~this.transports.indexOf(e[i])&&t.push(e[i]);return t}},Oo=class extends nd{constructor(e,t={}){let i=typeof e=="object"?e:t;(!i.transports||i.transports&&typeof i.transports[0]=="string")&&(i.transports=(i.transports||["polling","websocket","webtransport"]).map(r=>_g[r]).filter(r=>!!r)),super(e,i)}};var z6=Oo.protocol;function gS(n,e="",t){let i=n;t=t||typeof location<"u"&&location,n==null&&(n=t.protocol+"//"+t.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=t.protocol+n:n=t.host+n),/^(https?|wss?):\/\//.test(n)||(typeof t<"u"?n=t.protocol+"//"+n:n="https://"+n),i=Fo(n)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";let s=i.host.indexOf(":")!==-1?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+s+":"+i.port+e,i.href=i.protocol+"://"+s+(t&&t.port===i.port?"":":"+i.port),i}var Mg={};dM(Mg,{Decoder:()=>Sg,Encoder:()=>Eg,PacketType:()=>Je,isPacketValid:()=>a1,protocol:()=>ES});var e1=typeof ArrayBuffer=="function",t1=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,_S=Object.prototype.toString,n1=typeof Blob=="function"||typeof Blob<"u"&&_S.call(Blob)==="[object BlobConstructor]",i1=typeof File=="function"||typeof File<"u"&&_S.call(File)==="[object FileConstructor]";function dc(n){return e1&&(n instanceof ArrayBuffer||t1(n))||n1&&n instanceof Blob||i1&&n instanceof File}function uc(n,e){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let t=0,i=n.length;t<i;t++)if(uc(n[t]))return!0;return!1}if(dc(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return uc(n.toJSON(),!0);for(let t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&uc(n[t]))return!0;return!1}function yS(n){let e=[],t=n.data,i=n;return i.data=vg(t,e),i.attachments=e.length,{packet:i,buffers:e}}function vg(n,e){if(!n)return n;if(dc(n)){let t={_placeholder:!0,num:e.length};return e.push(n),t}else if(Array.isArray(n)){let t=new Array(n.length);for(let i=0;i<n.length;i++)t[i]=vg(n[i],e);return t}else if(typeof n=="object"&&!(n instanceof Date)){let t={};for(let i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=vg(n[i],e));return t}return n}function vS(n,e){return n.data=xg(n.data,e),delete n.attachments,n}function xg(n,e){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<e.length)return e[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let t=0;t<n.length;t++)n[t]=xg(n[t],e);else if(typeof n=="object")for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&(n[t]=xg(n[t],e));return n}var xS=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],ES=5,Je=(function(n){return n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK",n})(Je||{}),Eg=class{constructor(e){this.replacer=e}encode(e){return(e.type===Je.EVENT||e.type===Je.ACK)&&uc(e)?this.encodeAsBinary({type:e.type===Je.EVENT?Je.BINARY_EVENT:Je.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===Je.BINARY_EVENT||e.type===Je.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){let t=yS(e),i=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(i),r}},Sg=class n extends Ot{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);let i=t.type===Je.BINARY_EVENT;i||t.type===Je.BINARY_ACK?(t.type=i?Je.EVENT:Je.ACK,this.reconstructor=new bg(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(dc(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0,i={type:Number(e.charAt(0))};if(Je[i.type]===void 0)throw new Error("unknown packet type "+i.type);if(i.type===Je.BINARY_EVENT||i.type===Je.BINARY_ACK){let s=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);let o=e.substring(s,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");let a=Number(o);if(!SS(a)||a<0)throw new Error("Illegal attachments");if(a>this.opts.maxAttachments)throw new Error("too many attachments");i.attachments=a}if(e.charAt(t+1)==="/"){let s=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););i.nsp=e.substring(s,t)}else i.nsp="/";let r=e.charAt(t+1);if(r!==""&&Number(r)==r){let s=t+1;for(;++t;){let o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}i.id=Number(e.substring(s,t+1))}if(e.charAt(++t)){let s=this.tryParse(e.substr(t));if(n.isPayloadValid(i.type,s))i.data=s;else throw new Error("invalid payload")}return i}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case Je.CONNECT:return id(t);case Je.DISCONNECT:return t===void 0;case Je.CONNECT_ERROR:return typeof t=="string"||id(t);case Je.EVENT:case Je.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&xS.indexOf(t[0])===-1);case Je.ACK:case Je.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}},bg=class{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){let t=vS(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}};function r1(n){return typeof n=="string"}var SS=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function s1(n){return n===void 0||SS(n)}function id(n){return Object.prototype.toString.call(n)==="[object Object]"}function o1(n,e){switch(n){case Je.CONNECT:return e===void 0||id(e);case Je.DISCONNECT:return e===void 0;case Je.EVENT:return Array.isArray(e)&&(typeof e[0]=="number"||typeof e[0]=="string"&&xS.indexOf(e[0])===-1);case Je.ACK:return Array.isArray(e);case Je.CONNECT_ERROR:return typeof e=="string"||id(e);default:return!1}}function a1(n){return r1(n.nsp)&&s1(n.id)&&o1(n.type,n.data)}function Ln(n,e,t){return n.on(e,t),function(){n.off(e,t)}}var c1=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),Lo=class extends Ot{constructor(e,t,i){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,i&&i.auth&&(this.auth=i.auth),this._opts=Object.assign({},i),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;let e=this.io;this.subs=[Ln(e,"open",this.onopen.bind(this)),Ln(e,"packet",this.onpacket.bind(this)),Ln(e,"error",this.onerror.bind(this)),Ln(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var i,r,s;if(c1.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;let o={type:Je.EVENT,data:t};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){let u=this.ids++,f=t.pop();this._registerAckCallback(u,f),o.id=u}let a=(r=(i=this.io.engine)===null||i===void 0?void 0:i.transport)===null||r===void 0?void 0:r.writable,c=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!a||(c?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(e,t){var i;let r=(i=this.flags.timeout)!==null&&i!==void 0?i:this._opts.ackTimeout;if(r===void 0){this.acks[e]=t;return}let s=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===e&&this.sendBuffer.splice(a,1);t.call(this,new Error("operation has timed out"))},r),o=(...a)=>{this.io.clearTimeoutFn(s),t.apply(this,a)};o.withError=!0,this.acks[e]=o}emitWithAck(e,...t){return new Promise((i,r)=>{let s=(o,a)=>o?r(o):i(a);s.withError=!0,t.push(s),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());let i={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...s)=>(this._queue[0],r!==null?i.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(r)):(this._queue.shift(),t&&t(null,...s)),i.pending=!1,this._drainQueue())),this._queue.push(i),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;let t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:Je.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(i=>String(i.id)===e)){let i=this.acks[e];delete this.acks[e],i.withError&&i.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case Je.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Je.EVENT:case Je.BINARY_EVENT:this.onevent(e);break;case Je.ACK:case Je.BINARY_ACK:this.onack(e);break;case Je.DISCONNECT:this.ondisconnect();break;case Je.CONNECT_ERROR:this.destroy();let i=new Error(e.data.message);i.data=e.data.data,this.emitReserved("connect_error",i);break}}onevent(e){let t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){let t=this._anyListeners.slice();for(let i of t)i.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){let t=this,i=!1;return function(...r){i||(i=!0,t.packet({type:Je.ACK,id:e,data:r}))}}onack(e){let t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Je.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){let t=this._anyListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){let t=this._anyOutgoingListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){let t=this._anyOutgoingListeners.slice();for(let i of t)i.apply(this,e.data)}}};function Is(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}Is.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*n);n=(Math.floor(e*10)&1)==0?n-t:n+t}return Math.min(n,this.max)|0};Is.prototype.reset=function(){this.attempts=0};Is.prototype.setMin=function(n){this.ms=n};Is.prototype.setMax=function(n){this.max=n};Is.prototype.setJitter=function(n){this.jitter=n};var ko=class extends Ot{constructor(e,t){var i;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,sr(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((i=t.randomizationFactor)!==null&&i!==void 0?i:.5),this.backoff=new Is({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;let r=t.parser||Mg;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new Oo(this.uri,this.opts);let t=this.engine,i=this;this._readyState="opening",this.skipReconnect=!1;let r=Ln(t,"open",function(){i.onopen(),e&&e()}),s=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),e?e(a):this.maybeReconnectOnOpen()},o=Ln(t,"error",s);if(this._timeout!==!1){let a=this._timeout,c=this.setTimeoutFn(()=>{r(),s(new Error("timeout")),t.close()},a);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(r),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");let e=this.engine;this.subs.push(Ln(e,"ping",this.onping.bind(this)),Ln(e,"data",this.ondata.bind(this)),Ln(e,"error",this.onerror.bind(this)),Ln(e,"close",this.onclose.bind(this)),Ln(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){rr(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let i=this.nsps[e];return i?this._autoConnect&&!i.active&&i.connect():(i=new Lo(this,e,t),this.nsps[e]=i),i}_destroy(e){let t=Object.keys(this.nsps);for(let i of t)if(this.nsps[i].active)return;this._close()}_packet(e){let t=this.encoder.encode(e);for(let i=0;i<t.length;i++)this.engine.write(t[i],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var i;this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;let e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{let t=this.backoff.duration();this._reconnecting=!0;let i=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},t);this.opts.autoUnref&&i.unref(),this.subs.push(()=>{this.clearTimeoutFn(i)})}}onreconnect(){let e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}};var fc={};function hc(n,e){typeof n=="object"&&(e=n,n=void 0),e=e||{};let t=gS(n,e.path||"/socket.io"),i=t.source,r=t.id,s=t.path,o=fc[r]&&s in fc[r].nsps,a=e.forceNew||e["force new connection"]||e.multiplex===!1||o,c;return a?c=new ko(i,e):(fc[r]||(fc[r]=new ko(i,e)),c=fc[r]),t.query&&!e.query&&(e.query=t.queryKey),c.socket(t.path,e)}Object.assign(hc,{Manager:ko,Socket:Lo,io:hc,connect:hc});var VS=0,n_=1,HS=2;var Fc=1,zS=2,ia=3,pr=0,vn=1,Li=2,ki=0,Ls=1,i_=2,r_=3,s_=4,GS=5;var zr=100,WS=101,jS=102,$S=103,qS=104,XS=200,YS=201,ZS=202,JS=203,Cd=204,wd=205,KS=206,QS=207,eb=208,tb=209,nb=210,ib=211,rb=212,sb=213,ob=214,Td=0,Dd=1,Ad=2,ks=3,Id=4,Rd=5,Nd=6,Pd=7,o_=0,ab=1,cb=2,mi=0,a_=1,c_=2,l_=3,u_=4,d_=5,f_=6,h_=7;var Xg=300,Xr=301,zs=302,rf=303,sf=304,Oc=306,Fd=1e3,Ni=1001,Od=1002,en=1003,lb=1004;var Lc=1005;var rn=1006,of=1007;var Yr=1008;var Gn=1009,p_=1010,m_=1011,ra=1012,af=1013,gi=1014,_i=1015,Ui=1016,cf=1017,lf=1018,sa=1020,g_=35902,__=35899,y_=1021,v_=1022,Kn=1023,Pi=1026,Zr=1027,x_=1028,uf=1029,Gs=1030,df=1031;var ff=1033,kc=33776,Uc=33777,Bc=33778,Vc=33779,hf=35840,pf=35841,mf=35842,gf=35843,_f=36196,yf=37492,vf=37496,xf=37488,Ef=37489,Sf=37490,bf=37491,Mf=37808,Cf=37809,wf=37810,Tf=37811,Df=37812,Af=37813,If=37814,Rf=37815,Nf=37816,Pf=37817,Ff=37818,Of=37819,Lf=37820,kf=37821,Uf=36492,Bf=36494,Vf=36495,Hf=36283,zf=36284,Gf=36285,Wf=36286;var vc=2300,Ld=2301,Md=2302,Yg=2303,Zg=2400,Jg=2401,Kg=2402;var ub=3200;var db=0,fb=1,yr="",yn="srgb",Us="srgb-linear",xc="linear",bt="srgb";var Os=7680;var Qg=519,hb=512,pb=513,mb=514,jf=515,gb=516,_b=517,$f=518,yb=519,e_=35044;var E_="300 es",pi=2e3,Ec=2001;function l1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function u1(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Sc(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vb(){let n=Sc("canvas");return n.style.display="block",n}var bS={},Jo=null;function S_(...n){let e="THREE."+n.shift();Jo?Jo("log",e,...n):console.log(e,...n)}function xb(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function We(...n){n=xb(n);let e="THREE."+n.shift();if(Jo)Jo("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ze(...n){n=xb(n);let e="THREE."+n.shift();if(Jo)Jo("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function bc(...n){let e=n.join(" ");e in bS||(bS[e]=!0,We(...n))}function Eb(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var Sb={[Td]:Dd,[Ad]:Nd,[Id]:Pd,[ks]:Rd,[Dd]:Td,[Nd]:Ad,[Pd]:Id,[Rd]:ks},mr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Cg=Math.PI/180,kd=180/Math.PI;function Hc(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function d1(n,e){return(n%e+e)%e}function wg(n,e,t){return(1-t)*n+t*e}function pc(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Dt=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Fi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3],d=s[o+0],h=s[o+1],m=s[o+2],E=s[o+3];if(f!==E||c!==d||l!==h||u!==m){let g=c*d+l*h+u*m+f*E;g<0&&(d=-d,h=-h,m=-m,E=-E,g=-g);let p=1-a;if(g<.9995){let x=Math.acos(g),S=Math.sin(x);p=Math.sin(p*x)/S,a=Math.sin(a*x)/S,c=c*p+d*a,l=l*p+h*a,u=u*p+m*a,f=f*p+E*a}else{c=c*p+d*a,l=l*p+h*a,u=u*p+m*a,f=f*p+E*a;let x=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=x,l*=x,u*=x,f*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[o],d=s[o+1],h=s[o+2],m=s[o+3];return e[t]=a*m+u*f+c*h-l*d,e[t+1]=c*m+u*d+l*f-a*h,e[t+2]=l*m+u*h+a*d-c*f,e[t+3]=u*m-a*f-c*d-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),f=a(s/2),d=c(i/2),h=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=d*u*f+l*h*m,this._y=l*h*f-d*u*m,this._z=l*u*m+d*h*f,this._w=l*u*f-d*h*m;break;case"YXZ":this._x=d*u*f+l*h*m,this._y=l*h*f-d*u*m,this._z=l*u*m-d*h*f,this._w=l*u*f+d*h*m;break;case"ZXY":this._x=d*u*f-l*h*m,this._y=l*h*f+d*u*m,this._z=l*u*m+d*h*f,this._w=l*u*f-d*h*m;break;case"ZYX":this._x=d*u*f-l*h*m,this._y=l*h*f+d*u*m,this._z=l*u*m-d*h*f,this._w=l*u*f+d*h*m;break;case"YZX":this._x=d*u*f+l*h*m,this._y=l*h*f+d*u*m,this._z=l*u*m-d*h*f,this._w=l*u*f-d*h*m;break;case"XZY":this._x=d*u*f-l*h*m,this._y=l*h*f-d*u*m,this._z=l*u*m+d*h*f,this._w=l*u*f+d*h*m;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+a+f;if(d>0){let h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>f){let h=2*Math.sqrt(1+i-a-f);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>f){let h=2*Math.sqrt(1+a-i-f);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+f-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(MS.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(MS.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+c*l+o*f-a*u,this.y=i+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Tg.copy(this).projectOnVector(e),this.sub(Tg)}reflect(e){return this.sub(Tg.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Tg=new X,MS=new Fi,Ze=class n{constructor(e,t,i,r,s,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],h=i[5],m=i[8],E=r[0],g=r[3],p=r[6],x=r[1],S=r[4],M=r[7],A=r[2],R=r[5],N=r[8];return s[0]=o*E+a*x+c*A,s[3]=o*g+a*S+c*R,s[6]=o*p+a*M+c*N,s[1]=l*E+u*x+f*A,s[4]=l*g+u*S+f*R,s[7]=l*p+u*M+f*N,s[2]=d*E+h*x+m*A,s[5]=d*g+h*S+m*R,s[8]=d*p+h*M+m*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*o-a*l,d=a*c-u*s,h=l*s-o*c,m=t*f+i*d+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let E=1/m;return e[0]=f*E,e[1]=(r*l-u*i)*E,e[2]=(a*i-r*o)*E,e[3]=d*E,e[4]=(u*t-r*c)*E,e[5]=(r*s-a*t)*E,e[6]=h*E,e[7]=(i*c-l*t)*E,e[8]=(o*t-i*s)*E,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Dg.makeScale(e,t)),this}rotate(e){return this.premultiply(Dg.makeRotation(-e)),this}translate(e,t){return this.premultiply(Dg.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Dg=new Ze,CS=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wS=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function f1(){let n={enabled:!0,workingColorSpace:Us,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===bt&&(r.r=hr(r.r),r.g=hr(r.g),r.b=hr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=Zo(r.r),r.g=Zo(r.g),r.b=Zo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===yr?xc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return bc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return bc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Us]:{primaries:e,whitePoint:i,transfer:xc,toXYZ:CS,fromXYZ:wS,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yn},outputColorSpaceConfig:{drawingBufferColorSpace:yn}},[yn]:{primaries:e,whitePoint:i,transfer:bt,toXYZ:CS,fromXYZ:wS,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yn}}}),n}var ut=f1();function hr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Uo,Ud=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Uo===void 0&&(Uo=Sc("canvas")),Uo.width=e.width,Uo.height=e.height;let r=Uo.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Uo}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Sc("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=hr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(hr(t[i]/255)*255):t[i]=hr(t[i]);return{data:t,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},h1=0,Ko=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:h1++}),this.uuid=Hc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ag(r[o].image)):s.push(Ag(r[o]))}else s=Ag(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Ag(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ud.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}var p1=0,Ig=new X,Bi=(()=>{class n extends mr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=Ni,s=Ni,o=rn,a=Yr,c=Kn,l=Gn,u=n.DEFAULT_ANISOTROPY,f=yr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p1++}),this.uuid=Hc(),this.name="",this.source=new Ko(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ig).x}get height(){return this.source.getSize(Ig).y}get depth(){return this.source.getSize(Ig).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){We(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){We(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fd:t.x=t.x-Math.floor(t.x);break;case Ni:t.x=t.x<0?0:1;break;case Od:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fd:t.y=t.y-Math.floor(t.y);break;case Ni:t.y=t.y<0?0:1;break;case Od:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=Xg,n.DEFAULT_ANISOTROPY=1,n})(),Ht=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],h=c[5],m=c[9],E=c[2],g=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-E)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+E)<.1&&Math.abs(m+g)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,M=(h+1)/2,A=(p+1)/2,R=(u+d)/4,N=(f+E)/4,_=(m+g)/4;return S>M&&S>A?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=R/i,s=N/i):M>A?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=R/r,s=_/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=N/s,r=_/s),this.set(i,r,s,t),this}let x=Math.sqrt((g-m)*(g-m)+(f-E)*(f-E)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(f-E)/x,this.z=(d-u)/x,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bd=class extends mr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Bi(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ko(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends Bd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Mc=class extends Bi{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Vd=class extends Bi{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qt=class n{constructor(e,t,i,r,s,o,a,c,l,u,f,d,h,m,E,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,f,d,h,m,E,g)}set(e,t,i,r,s,o,a,c,l,u,f,d,h,m,E,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=d,p[3]=h,p[7]=m,p[11]=E,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Bo.setFromMatrixColumn(e,0).length(),s=1/Bo.setFromMatrixColumn(e,1).length(),o=1/Bo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let d=o*u,h=o*f,m=a*u,E=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=h+m*l,t[5]=d-E*l,t[9]=-a*c,t[2]=E-d*l,t[6]=m+h*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*u,h=c*f,m=l*u,E=l*f;t[0]=d+E*a,t[4]=m*a-h,t[8]=o*l,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=h*a-m,t[6]=E+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*u,h=c*f,m=l*u,E=l*f;t[0]=d-E*a,t[4]=-o*f,t[8]=m+h*a,t[1]=h+m*a,t[5]=o*u,t[9]=E-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*u,h=o*f,m=a*u,E=a*f;t[0]=c*u,t[4]=m*l-h,t[8]=d*l+E,t[1]=c*f,t[5]=E*l+d,t[9]=h*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,h=o*l,m=a*c,E=a*l;t[0]=c*u,t[4]=E-d*f,t[8]=m*f+h,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*f+m,t[10]=d-E*f}else if(e.order==="XZY"){let d=o*c,h=o*l,m=a*c,E=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+E,t[5]=o*u,t[9]=h*f-m,t[2]=m*f-h,t[6]=a*u,t[10]=E*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(m1,e,g1)}lookAt(e,t,i){let r=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),Or.crossVectors(i,kn),Or.lengthSq()===0&&(Math.abs(i.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),Or.crossVectors(i,kn)),Or.normalize(),rd.crossVectors(kn,Or),r[0]=Or.x,r[4]=rd.x,r[8]=kn.x,r[1]=Or.y,r[5]=rd.y,r[9]=kn.y,r[2]=Or.z,r[6]=rd.z,r[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],h=i[13],m=i[2],E=i[6],g=i[10],p=i[14],x=i[3],S=i[7],M=i[11],A=i[15],R=r[0],N=r[4],_=r[8],b=r[12],z=r[1],w=r[5],F=r[9],L=r[13],Y=r[2],H=r[6],B=r[10],P=r[14],T=r[3],D=r[7],ie=r[11],oe=r[15];return s[0]=o*R+a*z+c*Y+l*T,s[4]=o*N+a*w+c*H+l*D,s[8]=o*_+a*F+c*B+l*ie,s[12]=o*b+a*L+c*P+l*oe,s[1]=u*R+f*z+d*Y+h*T,s[5]=u*N+f*w+d*H+h*D,s[9]=u*_+f*F+d*B+h*ie,s[13]=u*b+f*L+d*P+h*oe,s[2]=m*R+E*z+g*Y+p*T,s[6]=m*N+E*w+g*H+p*D,s[10]=m*_+E*F+g*B+p*ie,s[14]=m*b+E*L+g*P+p*oe,s[3]=x*R+S*z+M*Y+A*T,s[7]=x*N+S*w+M*H+A*D,s[11]=x*_+S*F+M*B+A*ie,s[15]=x*b+S*L+M*P+A*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],h=e[14],m=e[3],E=e[7],g=e[11],p=e[15],x=c*h-l*d,S=a*h-l*f,M=a*d-c*f,A=o*h-l*u,R=o*d-c*u,N=o*f-a*u;return t*(E*x-g*S+p*M)-i*(m*x-g*A+p*R)+r*(m*S-E*A+p*N)-s*(m*M-E*R+g*N)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],h=e[11],m=e[12],E=e[13],g=e[14],p=e[15],x=t*a-i*o,S=t*c-r*o,M=t*l-s*o,A=i*c-r*a,R=i*l-s*a,N=r*l-s*c,_=u*E-f*m,b=u*g-d*m,z=u*p-h*m,w=f*g-d*E,F=f*p-h*E,L=d*p-h*g,Y=x*L-S*F+M*w+A*z-R*b+N*_;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/Y;return e[0]=(a*L-c*F+l*w)*H,e[1]=(r*F-i*L-s*w)*H,e[2]=(E*N-g*R+p*A)*H,e[3]=(d*R-f*N-h*A)*H,e[4]=(c*z-o*L-l*b)*H,e[5]=(t*L-r*z+s*b)*H,e[6]=(g*M-m*N-p*S)*H,e[7]=(u*N-d*M+h*S)*H,e[8]=(o*F-a*z+l*_)*H,e[9]=(i*z-t*F-s*_)*H,e[10]=(m*R-E*M+p*x)*H,e[11]=(f*M-u*R-h*x)*H,e[12]=(a*b-o*w-c*_)*H,e[13]=(t*w-i*b+r*_)*H,e[14]=(E*S-m*A-g*x)*H,e[15]=(u*A-f*S+d*x)*H,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,f=a+a,d=s*l,h=s*u,m=s*f,E=o*u,g=o*f,p=a*f,x=c*l,S=c*u,M=c*f,A=i.x,R=i.y,N=i.z;return r[0]=(1-(E+p))*A,r[1]=(h+M)*A,r[2]=(m-S)*A,r[3]=0,r[4]=(h-M)*R,r[5]=(1-(d+p))*R,r[6]=(g+x)*R,r[7]=0,r[8]=(m+S)*N,r[9]=(g-x)*N,r[10]=(1-(d+E))*N,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Bo.set(r[0],r[1],r[2]).length(),a=Bo.set(r[4],r[5],r[6]).length(),c=Bo.set(r[8],r[9],r[10]).length();s<0&&(o=-o),di.copy(this);let l=1/o,u=1/a,f=1/c;return di.elements[0]*=l,di.elements[1]*=l,di.elements[2]*=l,di.elements[4]*=u,di.elements[5]*=u,di.elements[6]*=u,di.elements[8]*=f,di.elements[9]*=f,di.elements[10]*=f,t.setFromRotationMatrix(di),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=pi,c=!1){let l=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r),m,E;if(c)m=s/(o-s),E=o*s/(o-s);else if(a===pi)m=-(o+s)/(o-s),E=-2*o*s/(o-s);else if(a===Ec)m=-o/(o-s),E=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=pi,c=!1){let l=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),h=-(i+r)/(i-r),m,E;if(c)m=1/(o-s),E=o/(o-s);else if(a===pi)m=-2/(o-s),E=-(o+s)/(o-s);else if(a===Ec)m=-1/(o-s),E=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Bo=new X,di=new qt,m1=new X(0,0,0),g1=new X(1,1,1),Or=new X,rd=new X,kn=new X,TS=new qt,DS=new Fi,Bs=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],f=s[9],d=s[2],h=s[6],m=s[10];switch(i){case"XYZ":this._y=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return TS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(TS,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return DS.setFromEuler(this),this.setFromQuaternion(DS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Cc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},_1=0,AS=new X,Vo=new Fi,ar=new qt,sd=new X,mc=new X,y1=new X,v1=new Fi,IS=new X(1,0,0),RS=new X(0,1,0),NS=new X(0,0,1),PS={type:"added"},x1={type:"removed"},Ho={type:"childadded",child:null},Rg={type:"childremoved",child:null},Ws=(()=>{class n extends mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_1++}),this.uuid=Hc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new X,i=new Bs,r=new Fi,s=new X(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qt},normalMatrix:{value:new Ze}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Vo.setFromAxisAngle(t,i),this.quaternion.multiply(Vo),this}rotateOnWorldAxis(t,i){return Vo.setFromAxisAngle(t,i),this.quaternion.premultiply(Vo),this}rotateX(t){return this.rotateOnAxis(IS,t)}rotateY(t){return this.rotateOnAxis(RS,t)}rotateZ(t){return this.rotateOnAxis(NS,t)}translateOnAxis(t,i){return AS.copy(t).applyQuaternion(this.quaternion),this.position.add(AS.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(IS,t)}translateY(t){return this.translateOnAxis(RS,t)}translateZ(t){return this.translateOnAxis(NS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ar.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?sd.copy(t):sd.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),mc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ar.lookAt(mc,sd,this.up):ar.lookAt(sd,mc,this.up),this.quaternion.setFromRotationMatrix(ar),s&&(ar.extractRotation(s.matrixWorld),Vo.setFromRotationMatrix(ar),this.quaternion.premultiply(Vo.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(ze("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(PS),Ho.child=t,this.dispatchEvent(Ho),Ho.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(x1),Rg.child=t,this.dispatchEvent(Rg),Rg.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ar.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ar.multiply(t.parent.matrixWorld)),t.applyMatrix4(ar),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(PS),Ho.child=t,this.dispatchEvent(Ho),Ho.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mc,t,y1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mc,v1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>_t(ot({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>ot({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){let d=l[u];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),f=a(t.images),d=a(t.shapes),h=a(t.skeletons),m=a(t.animations),E=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),f.length>0&&(r.images=f),d.length>0&&(r.shapes=d),h.length>0&&(r.skeletons=h),m.length>0&&(r.animations=m),E.length>0&&(r.nodes=E)}return r.object=s,r;function a(c){let l=[];for(let u in c){let f=c[u];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new X(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),fr=class extends Ws{constructor(){super(),this.isGroup=!0,this.type="Group"}},E1={type:"move"},Qo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let E of e.hand.values()){let g=t.getJointPose(E,i),p=this._getHandJoint(l,E);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,m=.005;l.inputState.pinching&&d>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(E1)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new fr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},bb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Lr={h:0,s:0,l:0},od={h:0,s:0,l:0};function Ng(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var yt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ut.workingColorSpace){if(e=d1(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ng(o,s,e+1/3),this.g=Ng(o,s,e),this.b=Ng(o,s,e-1/3)}return ut.colorSpaceToWorking(this,r),this}setStyle(e,t=yn){function i(s){s!==void 0&&parseFloat(s)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yn){let i=bb[e.toLowerCase()];return i!==void 0?this.setHex(i,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}copyLinearToSRGB(e){return this.r=Zo(e.r),this.g=Zo(e.g),this.b=Zo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yn){return ut.workingToColorSpace(un.copy(this),e),Math.round(lt(un.r*255,0,255))*65536+Math.round(lt(un.g*255,0,255))*256+Math.round(lt(un.b*255,0,255))}getHexString(e=yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(un.copy(this),t);let i=un.r,r=un.g,s=un.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=yn){ut.workingToColorSpace(un.copy(this),e);let t=un.r,i=un.g,r=un.b;return e!==yn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Lr),this.setHSL(Lr.h+e,Lr.s+t,Lr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Lr),e.getHSL(od);let i=wg(Lr.h,od.h,t),r=wg(Lr.s,od.s,t),s=wg(Lr.l,od.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new yt;yt.NAMES=bb;var wc=class extends Ws{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bs,this.environmentIntensity=1,this.environmentRotation=new Bs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},fi=new X,cr=new X,Pg=new X,lr=new X,zo=new X,Go=new X,FS=new X,Fg=new X,Og=new X,Lg=new X,kg=new Ht,Ug=new Ht,Bg=new Ht,Hr=class n{constructor(e=new X,t=new X,i=new X){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),fi.subVectors(e,t),r.cross(fi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){fi.subVectors(r,t),cr.subVectors(i,t),Pg.subVectors(e,t);let o=fi.dot(fi),a=fi.dot(cr),c=fi.dot(Pg),l=cr.dot(cr),u=cr.dot(Pg),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;let d=1/f,h=(l*c-a*u)*d,m=(o*u-a*c)*d;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,lr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,lr.x),c.addScaledVector(o,lr.y),c.addScaledVector(a,lr.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return kg.setScalar(0),Ug.setScalar(0),Bg.setScalar(0),kg.fromBufferAttribute(e,t),Ug.fromBufferAttribute(e,i),Bg.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(kg,s.x),o.addScaledVector(Ug,s.y),o.addScaledVector(Bg,s.z),o}static isFrontFacing(e,t,i,r){return fi.subVectors(i,t),cr.subVectors(e,t),fi.cross(cr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),fi.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;zo.subVectors(r,i),Go.subVectors(s,i),Fg.subVectors(e,i);let c=zo.dot(Fg),l=Go.dot(Fg);if(c<=0&&l<=0)return t.copy(i);Og.subVectors(e,r);let u=zo.dot(Og),f=Go.dot(Og);if(u>=0&&f<=u)return t.copy(r);let d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(zo,o);Lg.subVectors(e,s);let h=zo.dot(Lg),m=Go.dot(Lg);if(m>=0&&h<=m)return t.copy(s);let E=h*l-c*m;if(E<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(i).addScaledVector(Go,a);let g=u*m-h*f;if(g<=0&&f-u>=0&&h-m>=0)return FS.subVectors(s,r),a=(f-u)/(f-u+(h-m)),t.copy(r).addScaledVector(FS,a);let p=1/(g+E+d);return o=E*p,a=d*p,t.copy(i).addScaledVector(zo,o).addScaledVector(Go,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Gr=class{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,hi):hi.fromBufferAttribute(s,o),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ad.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ad.copy(i.boundingBox)),ad.applyMatrix4(e.matrixWorld),this.union(ad)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gc),cd.subVectors(this.max,gc),Wo.subVectors(e.a,gc),jo.subVectors(e.b,gc),$o.subVectors(e.c,gc),kr.subVectors(jo,Wo),Ur.subVectors($o,jo),Rs.subVectors(Wo,$o);let t=[0,-kr.z,kr.y,0,-Ur.z,Ur.y,0,-Rs.z,Rs.y,kr.z,0,-kr.x,Ur.z,0,-Ur.x,Rs.z,0,-Rs.x,-kr.y,kr.x,0,-Ur.y,Ur.x,0,-Rs.y,Rs.x,0];return!Vg(t,Wo,jo,$o,cd)||(t=[1,0,0,0,1,0,0,0,1],!Vg(t,Wo,jo,$o,cd))?!1:(ld.crossVectors(kr,Ur),t=[ld.x,ld.y,ld.z],Vg(t,Wo,jo,$o,cd))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ur[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ur[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ur[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ur[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ur[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ur[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ur[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ur[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ur),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ur=[new X,new X,new X,new X,new X,new X,new X,new X],hi=new X,ad=new Gr,Wo=new X,jo=new X,$o=new X,kr=new X,Ur=new X,Rs=new X,gc=new X,cd=new X,ld=new X,Ns=new X;function Vg(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ns.fromArray(n,s);let a=r.x*Math.abs(Ns.x)+r.y*Math.abs(Ns.y)+r.z*Math.abs(Ns.z),c=e.dot(Ns),l=t.dot(Ns),u=i.dot(Ns);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var $t=new X,ud=new Dt,S1=0,Bn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:S1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=e_,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ud.fromBufferAttribute(this,t),ud.applyMatrix3(e),this.setXY(t,ud.x,ud.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=pc(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pc(t,this.array)),t}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pc(t,this.array)),t}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pc(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pc(t,this.array)),t}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),i=Cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),i=Cn(i,this.array),r=Cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),i=Cn(i,this.array),r=Cn(r,this.array),s=Cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==e_&&(e.usage=this.usage),e}};var Tc=class extends Bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Dc=class extends Bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Jn=class extends Bn{constructor(e,t,i){super(new Float32Array(e),t,i)}},b1=new Gr,_c=new X,Hg=new X,ea=class{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):b1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_c.subVectors(e,this.center);let t=_c.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(_c,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hg.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_c.copy(e.center).add(Hg)),this.expandByPoint(_c.copy(e.center).sub(Hg))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},M1=0,Zn=new qt,zg=new Ws,qo=new X,Un=new Gr,yc=new Gr,Qt=new X,Oi=class n extends mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:M1++}),this.uuid=Hc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(l1(e)?Dc:Tc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,i){return Zn.makeTranslation(e,t,i),this.applyMatrix4(Zn),this}scale(e,t,i){return Zn.makeScale(e,t,i),this.applyMatrix4(Zn),this}lookAt(e){return zg.lookAt(e),zg.updateMatrix(),this.applyMatrix4(zg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qo).negate(),this.translate(qo.x,qo.y,qo.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Un.setFromBufferAttribute(s),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ea);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){let i=this.boundingSphere.center;if(Un.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];yc.setFromBufferAttribute(a),this.morphTargetsRelative?(Qt.addVectors(Un.min,yc.min),Un.expandByPoint(Qt),Qt.addVectors(Un.max,yc.max),Un.expandByPoint(Qt)):(Un.expandByPoint(yc.min),Un.expandByPoint(yc.max))}Un.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Qt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Qt.fromBufferAttribute(a,l),c&&(qo.fromBufferAttribute(e,l),Qt.add(qo)),r=Math.max(r,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let _=0;_<i.count;_++)a[_]=new X,c[_]=new X;let l=new X,u=new X,f=new X,d=new Dt,h=new Dt,m=new Dt,E=new X,g=new X;function p(_,b,z){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,z),d.fromBufferAttribute(s,_),h.fromBufferAttribute(s,b),m.fromBufferAttribute(s,z),u.sub(l),f.sub(l),h.sub(d),m.sub(d);let w=1/(h.x*m.y-m.x*h.y);isFinite(w)&&(E.copy(u).multiplyScalar(m.y).addScaledVector(f,-h.y).multiplyScalar(w),g.copy(f).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(w),a[_].add(E),a[b].add(E),a[z].add(E),c[_].add(g),c[b].add(g),c[z].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let _=0,b=x.length;_<b;++_){let z=x[_],w=z.start,F=z.count;for(let L=w,Y=w+F;L<Y;L+=3)p(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let S=new X,M=new X,A=new X,R=new X;function N(_){A.fromBufferAttribute(r,_),R.copy(A);let b=a[_];S.copy(b),S.sub(A.multiplyScalar(A.dot(b))).normalize(),M.crossVectors(R,b);let w=M.dot(c[_])<0?-1:1;o.setXYZW(_,S.x,S.y,S.z,w)}for(let _=0,b=x.length;_<b;++_){let z=x[_],w=z.start,F=z.count;for(let L=w,Y=w+F;L<Y;L+=3)N(e.getX(L+0)),N(e.getX(L+1)),N(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);let r=new X,s=new X,o=new X,a=new X,c=new X,l=new X,u=new X,f=new X;if(e)for(let d=0,h=e.count;d<h;d+=3){let m=e.getX(d+0),E=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,E),o.fromBufferAttribute(t,g),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,E),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(E,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,h=t.count;d<h;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u),h=0,m=0;for(let E=0,g=c.length;E<g;E++){a.isInterleavedBufferAttribute?h=c[E]*a.data.stride+a.offset:h=c[E]*u;for(let p=0;p<u;p++)d[m++]=l[h++]}return new Bn(d,u,f)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){let d=l[u],h=e(d,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){let h=l[f];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],f=s[l];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var C1=0,Vs=class extends mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:C1++}),this.uuid=Hc(),this.name="",this.type="Material",this.blending=Ls,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cd,this.blendDst=wd,this.blendEquation=zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){We(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(i.blending=this.blending),this.side!==pr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Cd&&(i.blendSrc=this.blendSrc),this.blendDst!==wd&&(i.blendDst=this.blendDst),this.blendEquation!==zr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var dr=new X,Gg=new X,dd=new X,Br=new X,Wg=new X,fd=new X,jg=new X,Hd=class{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=dr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dr.copy(this.origin).addScaledVector(this.direction,t),dr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Gg.copy(e).add(t).multiplyScalar(.5),dd.copy(t).sub(e).normalize(),Br.copy(this.origin).sub(Gg);let s=e.distanceTo(t)*.5,o=-this.direction.dot(dd),a=Br.dot(this.direction),c=-Br.dot(dd),l=Br.lengthSq(),u=Math.abs(1-o*o),f,d,h,m;if(u>0)if(f=o*c-a,d=o*a-c,m=s*u,f>=0)if(d>=-m)if(d<=m){let E=1/u;f*=E,d*=E,h=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-c),s),h=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-s,-c),s),h=d*(d+2*c)+l):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-c),s),h=-f*f+d*(d+2*c)+l);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Gg).addScaledVector(dd,d),h}intersectSphere(e,t){dr.subVectors(e.center,this.origin);let i=dr.dot(this.direction),r=dr.dot(dr)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,dr)!==null}intersectTriangle(e,t,i,r,s){Wg.subVectors(t,e),fd.subVectors(i,e),jg.crossVectors(Wg,fd);let o=this.direction.dot(jg),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Br.subVectors(this.origin,e);let c=a*this.direction.dot(fd.crossVectors(Br,fd));if(c<0)return null;let l=a*this.direction.dot(Wg.cross(Br));if(l<0||c+l>o)return null;let u=-a*Br.dot(jg);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gr=class extends Vs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bs,this.combine=o_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},OS=new qt,Ps=new Hd,hd=new ea,LS=new X,pd=new X,md=new X,gd=new X,$g=new X,_d=new X,kS=new X,yd=new X,dn=class extends Ws{constructor(e=new Oi,t=new gr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){_d.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],f=s[c];u!==0&&($g.fromBufferAttribute(f,e),o?_d.addScaledVector($g,u):_d.addScaledVector($g.sub(t),u))}t.add(_d)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hd.copy(i.boundingSphere),hd.applyMatrix4(s),Ps.copy(e.ray).recast(e.near),!(hd.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(hd,LS)===null||Ps.origin.distanceToSquared(LS)>(e.far-e.near)**2))&&(OS.copy(s).invert(),Ps.copy(e.ray).applyMatrix4(OS),!(i.boundingBox!==null&&Ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ps)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,E=d.length;m<E;m++){let g=d[m],p=o[g.materialIndex],x=Math.max(g.start,h.start),S=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let M=x,A=S;M<A;M+=3){let R=a.getX(M),N=a.getX(M+1),_=a.getX(M+2);r=vd(this,p,e,i,l,u,f,R,N,_),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),E=Math.min(a.count,h.start+h.count);for(let g=m,p=E;g<p;g+=3){let x=a.getX(g),S=a.getX(g+1),M=a.getX(g+2);r=vd(this,o,e,i,l,u,f,x,S,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,E=d.length;m<E;m++){let g=d[m],p=o[g.materialIndex],x=Math.max(g.start,h.start),S=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let M=x,A=S;M<A;M+=3){let R=M,N=M+1,_=M+2;r=vd(this,p,e,i,l,u,f,R,N,_),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),E=Math.min(c.count,h.start+h.count);for(let g=m,p=E;g<p;g+=3){let x=g,S=g+1,M=g+2;r=vd(this,o,e,i,l,u,f,x,S,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function w1(n,e,t,i,r,s,o,a){let c;if(e.side===vn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===pr,a),c===null)return null;yd.copy(a),yd.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(yd);return l<t.near||l>t.far?null:{distance:l,point:yd.clone(),object:n}}function vd(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,pd),n.getVertexPosition(c,md),n.getVertexPosition(l,gd);let u=w1(n,e,t,i,pd,md,gd,kS);if(u){let f=new X;Hr.getBarycoord(kS,pd,md,gd,f),r&&(u.uv=Hr.getInterpolatedAttribute(r,a,c,l,f,new Dt)),s&&(u.uv1=Hr.getInterpolatedAttribute(s,a,c,l,f,new Dt)),o&&(u.normal=Hr.getInterpolatedAttribute(o,a,c,l,f,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new X,materialIndex:0};Hr.getNormal(pd,md,gd,d.normal),u.face=d,u.barycoord=f}return u}var zd=class extends Bi{constructor(e=null,t=1,i=1,r,s,o,a,c,l=en,u=en,f,d){super(null,o,a,c,l,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qg=new X,T1=new X,D1=new Ze,Ri=class{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=qg.subVectors(i,t).cross(T1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(qg),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||D1.getNormalMatrix(e),r=this.coplanarPoint(qg).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fs=new ea,A1=new Dt(.5,.5),xd=new X,Ac=class{constructor(e=new Ri,t=new Ri,i=new Ri,r=new Ri,s=new Ri,o=new Ri){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=pi,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],f=s[5],d=s[6],h=s[7],m=s[8],E=s[9],g=s[10],p=s[11],x=s[12],S=s[13],M=s[14],A=s[15];if(r[0].setComponents(l-o,h-u,p-m,A-x).normalize(),r[1].setComponents(l+o,h+u,p+m,A+x).normalize(),r[2].setComponents(l+a,h+f,p+E,A+S).normalize(),r[3].setComponents(l-a,h-f,p-E,A-S).normalize(),i)r[4].setComponents(c,d,g,M).normalize(),r[5].setComponents(l-c,h-d,p-g,A-M).normalize();else if(r[4].setComponents(l-c,h-d,p-g,A-M).normalize(),t===pi)r[5].setComponents(l+c,h+d,p+g,A+M).normalize();else if(t===Ec)r[5].setComponents(c,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fs)}intersectsSprite(e){Fs.center.set(0,0,0);let t=A1.distanceTo(e.center);return Fs.radius=.7071067811865476+t,Fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fs)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(xd.x=r.normal.x>0?e.max.x:e.min.x,xd.y=r.normal.y>0?e.max.y:e.min.y,xd.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(xd)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ic=class extends Bi{constructor(e=[],t=Xr,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ta=class extends Bi{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Wr=class extends Bi{constructor(e,t,i=gi,r,s,o,a=en,c=en,l,u=Pi,f=1){if(u!==Pi&&u!==Zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Gd=class extends Wr{constructor(e,t=gi,i=Xr,r,s,o=en,a=en,c,l=Pi){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Rc=class extends Bi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},na=class n extends Oi{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],f=[],d=0,h=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Jn(l,3)),this.setAttribute("normal",new Jn(u,3)),this.setAttribute("uv",new Jn(f,2));function m(E,g,p,x,S,M,A,R,N,_,b){let z=M/N,w=A/_,F=M/2,L=A/2,Y=R/2,H=N+1,B=_+1,P=0,T=0,D=new X;for(let ie=0;ie<B;ie++){let oe=ie*w-L;for(let fe=0;fe<H;fe++){let ve=fe*z-F;D[E]=ve*x,D[g]=oe*S,D[p]=Y,l.push(D.x,D.y,D.z),D[E]=0,D[g]=0,D[p]=R>0?1:-1,u.push(D.x,D.y,D.z),f.push(fe/N),f.push(1-ie/_),P+=1}}for(let ie=0;ie<_;ie++)for(let oe=0;oe<N;oe++){let fe=d+oe+H*ie,ve=d+oe+H*(ie+1),dt=d+(oe+1)+H*(ie+1),ct=d+(oe+1)+H*ie;c.push(fe,ve,ct),c.push(ve,dt,ct),T+=6}a.addGroup(h,T,b),h+=T,d+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var _r=class n extends Oi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,f=e/a,d=t/c,h=[],m=[],E=[],g=[];for(let p=0;p<u;p++){let x=p*d-o;for(let S=0;S<l;S++){let M=S*f-s;m.push(M,-x,0),E.push(0,0,1),g.push(S/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){let S=x+l*p,M=x+l*(p+1),A=x+1+l*(p+1),R=x+1+l*p;h.push(S,M,R),h.push(M,A,R)}this.setIndex(h),this.setAttribute("position",new Jn(m,3)),this.setAttribute("normal",new Jn(E,3)),this.setAttribute("uv",new Jn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};function js(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function fn(n){let e={};for(let t=0;t<n.length;t++){let i=js(n[t]);for(let r in i)e[r]=i[r]}return e}function I1(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function b_(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var Mb={clone:js,merge:fn},R1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,N1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Hn=class extends Vs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=R1,this.fragmentShader=N1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=js(e.uniforms),this.uniformsGroups=I1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Wd=class extends Hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var jd=class extends Vs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ub,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},$d=class extends Vs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ed(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var jr=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},qd=class extends jr{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Zg,endingEnd:Zg}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Jg:s=e,a=2*t-i;break;case Kg:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Jg:o=e,c=2*i-t;break;case Kg:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,h=this._weightNext,m=(i-t)/(r-t),E=m*m,g=E*m,p=-d*g+2*d*E-d*m,x=(1+d)*g+(-1.5-2*d)*E+(-.5+d)*m+1,S=(-1-h)*g+(1.5+h)*E+.5*m,M=h*g-h*E;for(let A=0;A!==a;++A)s[A]=p*o[u+A]+x*o[l+A]+S*o[c+A]+M*o[f+A];return s}},Xd=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),f=1-u;for(let d=0;d!==a;++d)s[d]=o[l+d]*f+o[c+d]*u;return s}},Yd=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Zd=class extends jr{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,f=u.inTangents,d=u.outTangents;if(!f||!d){let E=(i-t)/(r-t),g=1-E;for(let p=0;p!==a;++p)s[p]=o[l+p]*g+o[c+p]*E;return s}let h=a*2,m=e-1;for(let E=0;E!==a;++E){let g=o[l+E],p=o[c+E],x=m*h+E*2,S=d[x],M=d[x+1],A=e*h+E*2,R=f[A],N=f[A+1],_=(i-t)/(r-t),b,z,w,F,L;for(let Y=0;Y<8;Y++){b=_*_,z=b*_,w=1-_,F=w*w,L=F*w;let B=L*t+3*F*_*S+3*w*b*R+z*r-i;if(Math.abs(B)<1e-10)break;let P=3*F*(S-t)+6*w*_*(R-S)+3*b*(r-R);if(Math.abs(P)<1e-10)break;_=_-B/P,_=Math.max(0,Math.min(1,_))}s[E]=L*g+3*F*_*M+3*w*b*N+z*p}return s}},zn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ed(t,this.TimeBufferType),this.values=Ed(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ed(e.times,Array),values:Ed(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Yd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Zd(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case vc:t=this.InterpolantFactoryMethodDiscrete;break;case Ld:t=this.InterpolantFactoryMethodLinear;break;case Md:t=this.InterpolantFactoryMethodSmooth;break;case Yg:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return We("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vc;case this.InterpolantFactoryMethodLinear:return Ld;case this.InterpolantFactoryMethodSmooth:return Md;case this.InterpolantFactoryMethodBezier:return Yg}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(ze("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){ze("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){ze("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&u1(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){ze("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Md,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let f=a*i,d=f-i,h=f+i;for(let m=0;m!==i;++m){let E=t[f+m];if(E!==t[d+m]||E!==t[h+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let f=a*i,d=o*i;for(let h=0;h!==i;++h)t[d+h]=t[f+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};zn.prototype.ValueTypeName="";zn.prototype.TimeBufferType=Float32Array;zn.prototype.ValueBufferType=Float32Array;zn.prototype.DefaultInterpolation=Ld;var $r=class extends zn{constructor(e,t,i){super(e,t,i)}};$r.prototype.ValueTypeName="bool";$r.prototype.ValueBufferType=Array;$r.prototype.DefaultInterpolation=vc;$r.prototype.InterpolantFactoryMethodLinear=void 0;$r.prototype.InterpolantFactoryMethodSmooth=void 0;var Jd=class extends zn{constructor(e,t,i,r){super(e,t,i,r)}};Jd.prototype.ValueTypeName="color";var Kd=class extends zn{constructor(e,t,i,r){super(e,t,i,r)}};Kd.prototype.ValueTypeName="number";var Qd=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Fi.slerpFlat(s,0,o,l-a,o,l,c);return s}},Nc=class extends zn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Qd(this.times,this.values,this.getValueSize(),e)}};Nc.prototype.ValueTypeName="quaternion";Nc.prototype.InterpolantFactoryMethodSmooth=void 0;var qr=class extends zn{constructor(e,t,i){super(e,t,i)}};qr.prototype.ValueTypeName="string";qr.prototype.ValueBufferType=Array;qr.prototype.DefaultInterpolation=vc;qr.prototype.InterpolantFactoryMethodLinear=void 0;qr.prototype.InterpolantFactoryMethodSmooth=void 0;var ef=class extends zn{constructor(e,t,i,r){super(e,t,i,r)}};ef.prototype.ValueTypeName="vector";var Sd=new X,bd=new Fi,Ii=new X,Pc=class extends Ws{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Sd,bd,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sd,bd,Ii.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Sd,bd,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sd,bd,Ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vr=new X,US=new Dt,BS=new Dt,wn=class extends Pc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=kd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Cg*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return kd*2*Math.atan(Math.tan(Cg*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vr.x,Vr.y).multiplyScalar(-e/Vr.z),Vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vr.x,Vr.y).multiplyScalar(-e/Vr.z)}getViewSize(e,t){return this.getViewBounds(e,US,BS),t.subVectors(BS,US)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Cg*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Hs=class extends Pc{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Xo=-90,Yo=1,tf=class extends Ws{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new wn(Xo,Yo,e,t);r.layers=this.layers,this.add(r);let s=new wn(Xo,Yo,e,t);s.layers=this.layers,this.add(s);let o=new wn(Xo,Yo,e,t);o.layers=this.layers,this.add(o);let a=new wn(Xo,Yo,e,t);a.layers=this.layers,this.add(a);let c=new wn(Xo,Yo,e,t);c.layers=this.layers,this.add(c);let l=new wn(Xo,Yo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ec)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},nf=class extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var M_="\\[\\]\\.:\\/",P1=new RegExp("["+M_+"]","g"),C_="[^"+M_+"]",F1="[^"+M_.replace("\\.","")+"]",O1=/((?:WC+[\/:])*)/.source.replace("WC",C_),L1=/(WCOD+)?/.source.replace("WCOD",F1),k1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",C_),U1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",C_),B1=new RegExp("^"+O1+L1+k1+U1+"$"),V1=["material","materials","bones","map"],t_=class{constructor(e,t,i){let r=i||Vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Vt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(P1,"")}static parseTrackName(t){let i=B1.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);V1.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){We("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===u){u=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;ze("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=t_,n})();Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var D$=new Float32Array(1);function w_(n,e,t,i){let r=H1(i);switch(t){case y_:return n*e;case x_:return n*e/r.components*r.byteLength;case uf:return n*e/r.components*r.byteLength;case Gs:return n*e*2/r.components*r.byteLength;case df:return n*e*2/r.components*r.byteLength;case v_:return n*e*3/r.components*r.byteLength;case Kn:return n*e*4/r.components*r.byteLength;case ff:return n*e*4/r.components*r.byteLength;case kc:case Uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Bc:case Vc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pf:case gf:return Math.max(n,16)*Math.max(e,8)/4;case hf:case mf:return Math.max(n,8)*Math.max(e,8)/2;case _f:case yf:case xf:case Ef:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vf:case Sf:case bf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Mf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cf:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case wf:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Tf:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Df:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Af:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case If:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Rf:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Nf:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Pf:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ff:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Of:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Lf:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case kf:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Uf:case Bf:case Vf:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Hf:case zf:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Gf:case Wf:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function H1(n){switch(n){case Gn:case p_:return{byteLength:1,components:1};case ra:case m_:case Ui:return{byteLength:2,components:1};case cf:case lf:return{byteLength:2,components:4};case gi:case af:case _i:return{byteLength:4,components:1};case g_:case __:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function qb(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function G1(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){let u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((h,m)=>h.start-m.start);let d=0;for(let h=1;h<f.length;h++){let m=f[d],E=f[h];E.start<=m.start+m.count+1?m.count=Math.max(m.count,E.start+E.count-m.start):(++d,f[d]=E)}f.length=d+1;for(let h=0,m=f.length;h<m;h++){let E=f[h];n.bufferSubData(l,E.start*u.BYTES_PER_ELEMENT,u,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var W1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,j1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,q1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,X1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Y1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Z1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,J1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,K1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Q1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eR=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tR=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nR=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iR=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rR=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,sR=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,oR=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,aR=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cR=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lR=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,uR=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dR=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fR=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,hR=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pR=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mR=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gR=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_R=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yR=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vR=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xR="gl_FragColor = linearToOutputTexel( gl_FragColor );",ER=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,SR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,bR=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,MR=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,CR=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,TR=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,DR=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AR=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IR=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RR=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,NR=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PR=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,FR=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,OR=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,LR=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kR=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UR=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BR=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,VR=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,HR=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zR=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,GR=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,WR=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jR=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$R=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ZR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,JR=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KR=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,QR=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eN=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tN=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nN=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,iN=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rN=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sN=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,oN=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aN=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cN=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lN=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uN=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dN=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fN=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hN=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pN=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mN=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gN=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_N=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yN=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,vN=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xN=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,EN=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,SN=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bN=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,MN=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,CN=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,wN=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,TN=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,DN=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,AN=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,IN=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,RN=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NN=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,PN=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FN=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ON=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LN=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kN=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UN=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,BN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,VN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,HN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zN=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,GN=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,WN=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$N=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ZN=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,JN=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,KN=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,QN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eP=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tP=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nP=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iP=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rP=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sP=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oP=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aP=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cP=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lP=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uP=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dP=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fP=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hP=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pP=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mP=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gP=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_P=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,yP=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vP=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xP=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,EP=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,SP=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:W1,alphahash_pars_fragment:j1,alphamap_fragment:$1,alphamap_pars_fragment:q1,alphatest_fragment:X1,alphatest_pars_fragment:Y1,aomap_fragment:Z1,aomap_pars_fragment:J1,batching_pars_vertex:K1,batching_vertex:Q1,begin_vertex:eR,beginnormal_vertex:tR,bsdfs:nR,iridescence_fragment:iR,bumpmap_pars_fragment:rR,clipping_planes_fragment:sR,clipping_planes_pars_fragment:oR,clipping_planes_pars_vertex:aR,clipping_planes_vertex:cR,color_fragment:lR,color_pars_fragment:uR,color_pars_vertex:dR,color_vertex:fR,common:hR,cube_uv_reflection_fragment:pR,defaultnormal_vertex:mR,displacementmap_pars_vertex:gR,displacementmap_vertex:_R,emissivemap_fragment:yR,emissivemap_pars_fragment:vR,colorspace_fragment:xR,colorspace_pars_fragment:ER,envmap_fragment:SR,envmap_common_pars_fragment:bR,envmap_pars_fragment:MR,envmap_pars_vertex:CR,envmap_physical_pars_fragment:LR,envmap_vertex:wR,fog_vertex:TR,fog_pars_vertex:DR,fog_fragment:AR,fog_pars_fragment:IR,gradientmap_pars_fragment:RR,lightmap_pars_fragment:NR,lights_lambert_fragment:PR,lights_lambert_pars_fragment:FR,lights_pars_begin:OR,lights_toon_fragment:kR,lights_toon_pars_fragment:UR,lights_phong_fragment:BR,lights_phong_pars_fragment:VR,lights_physical_fragment:HR,lights_physical_pars_fragment:zR,lights_fragment_begin:GR,lights_fragment_maps:WR,lights_fragment_end:jR,logdepthbuf_fragment:$R,logdepthbuf_pars_fragment:qR,logdepthbuf_pars_vertex:XR,logdepthbuf_vertex:YR,map_fragment:ZR,map_pars_fragment:JR,map_particle_fragment:KR,map_particle_pars_fragment:QR,metalnessmap_fragment:eN,metalnessmap_pars_fragment:tN,morphinstance_vertex:nN,morphcolor_vertex:iN,morphnormal_vertex:rN,morphtarget_pars_vertex:sN,morphtarget_vertex:oN,normal_fragment_begin:aN,normal_fragment_maps:cN,normal_pars_fragment:lN,normal_pars_vertex:uN,normal_vertex:dN,normalmap_pars_fragment:fN,clearcoat_normal_fragment_begin:hN,clearcoat_normal_fragment_maps:pN,clearcoat_pars_fragment:mN,iridescence_pars_fragment:gN,opaque_fragment:_N,packing:yN,premultiplied_alpha_fragment:vN,project_vertex:xN,dithering_fragment:EN,dithering_pars_fragment:SN,roughnessmap_fragment:bN,roughnessmap_pars_fragment:MN,shadowmap_pars_fragment:CN,shadowmap_pars_vertex:wN,shadowmap_vertex:TN,shadowmask_pars_fragment:DN,skinbase_vertex:AN,skinning_pars_vertex:IN,skinning_vertex:RN,skinnormal_vertex:NN,specularmap_fragment:PN,specularmap_pars_fragment:FN,tonemapping_fragment:ON,tonemapping_pars_fragment:LN,transmission_fragment:kN,transmission_pars_fragment:UN,uv_pars_fragment:BN,uv_pars_vertex:VN,uv_vertex:HN,worldpos_vertex:zN,background_vert:GN,background_frag:WN,backgroundCube_vert:jN,backgroundCube_frag:$N,cube_vert:qN,cube_frag:XN,depth_vert:YN,depth_frag:ZN,distance_vert:JN,distance_frag:KN,equirect_vert:QN,equirect_frag:eP,linedashed_vert:tP,linedashed_frag:nP,meshbasic_vert:iP,meshbasic_frag:rP,meshlambert_vert:sP,meshlambert_frag:oP,meshmatcap_vert:aP,meshmatcap_frag:cP,meshnormal_vert:lP,meshnormal_frag:uP,meshphong_vert:dP,meshphong_frag:fP,meshphysical_vert:hP,meshphysical_frag:pP,meshtoon_vert:mP,meshtoon_frag:gP,points_vert:_P,points_frag:yP,shadow_vert:vP,shadow_frag:xP,sprite_vert:EP,sprite_frag:SP},xe={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Hi={basic:{uniforms:fn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:fn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new yt(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:fn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:fn([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:fn([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new yt(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:fn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:fn([xe.points,xe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:fn([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:fn([xe.common,xe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:fn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:fn([xe.sprite,xe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:fn([xe.common,xe.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:fn([xe.lights,xe.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Hi.physical={uniforms:fn([Hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};var qf={r:0,b:0,g:0},$s=new Bs,bP=new qt;function MP(n,e,t,i,r,s){let o=new yt(0),a=r===!0?0:1,c,l,u=null,f=0,d=null;function h(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){let M=x.backgroundBlurriness>0;S=e.get(S,M)}return S}function m(x){let S=!1,M=h(x);M===null?g(o,a):M&&M.isColor&&(g(M,1),S=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function E(x,S){let M=h(S);M&&(M.isCubeTexture||M.mapping===Oc)?(l===void 0&&(l=new dn(new na(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:js(Hi.backgroundCube.uniforms),vertexShader:Hi.backgroundCube.vertexShader,fragmentShader:Hi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,R,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),$s.copy(S.backgroundRotation),$s.x*=-1,$s.y*=-1,$s.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&($s.y*=-1,$s.z*=-1),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(bP.makeRotationFromEuler($s)),l.material.toneMapped=ut.getTransfer(M.colorSpace)!==bt,(u!==M||f!==M.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new dn(new _r(2,2),new Hn({name:"BackgroundMaterial",uniforms:js(Hi.background.uniforms),vertexShader:Hi.background.vertexShader,fragmentShader:Hi.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ut.getTransfer(M.colorSpace)!==bt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function g(x,S){x.getRGB(qf,b_(n)),t.buffers.color.setClear(qf.r,qf.g,qf.b,S,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,S=1){o.set(x),a=S,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:m,addToRenderList:E,dispose:p}}function CP(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,o=!1;function a(w,F,L,Y,H){let B=!1,P=f(w,Y,L,F);s!==P&&(s=P,l(s.object)),B=h(w,Y,L,H),B&&m(w,Y,L,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,M(w,F,L,Y),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(w){return n.bindVertexArray(w)}function u(w){return n.deleteVertexArray(w)}function f(w,F,L,Y){let H=Y.wireframe===!0,B=i[F.id];B===void 0&&(B={},i[F.id]=B);let P=w.isInstancedMesh===!0?w.id:0,T=B[P];T===void 0&&(T={},B[P]=T);let D=T[L.id];D===void 0&&(D={},T[L.id]=D);let ie=D[H];return ie===void 0&&(ie=d(c()),D[H]=ie),ie}function d(w){let F=[],L=[],Y=[];for(let H=0;H<t;H++)F[H]=0,L[H]=0,Y[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:L,attributeDivisors:Y,object:w,attributes:{},index:null}}function h(w,F,L,Y){let H=s.attributes,B=F.attributes,P=0,T=L.getAttributes();for(let D in T)if(T[D].location>=0){let oe=H[D],fe=B[D];if(fe===void 0&&(D==="instanceMatrix"&&w.instanceMatrix&&(fe=w.instanceMatrix),D==="instanceColor"&&w.instanceColor&&(fe=w.instanceColor)),oe===void 0||oe.attribute!==fe||fe&&oe.data!==fe.data)return!0;P++}return s.attributesNum!==P||s.index!==Y}function m(w,F,L,Y){let H={},B=F.attributes,P=0,T=L.getAttributes();for(let D in T)if(T[D].location>=0){let oe=B[D];oe===void 0&&(D==="instanceMatrix"&&w.instanceMatrix&&(oe=w.instanceMatrix),D==="instanceColor"&&w.instanceColor&&(oe=w.instanceColor));let fe={};fe.attribute=oe,oe&&oe.data&&(fe.data=oe.data),H[D]=fe,P++}s.attributes=H,s.attributesNum=P,s.index=Y}function E(){let w=s.newAttributes;for(let F=0,L=w.length;F<L;F++)w[F]=0}function g(w){p(w,0)}function p(w,F){let L=s.newAttributes,Y=s.enabledAttributes,H=s.attributeDivisors;L[w]=1,Y[w]===0&&(n.enableVertexAttribArray(w),Y[w]=1),H[w]!==F&&(n.vertexAttribDivisor(w,F),H[w]=F)}function x(){let w=s.newAttributes,F=s.enabledAttributes;for(let L=0,Y=F.length;L<Y;L++)F[L]!==w[L]&&(n.disableVertexAttribArray(L),F[L]=0)}function S(w,F,L,Y,H,B,P){P===!0?n.vertexAttribIPointer(w,F,L,H,B):n.vertexAttribPointer(w,F,L,Y,H,B)}function M(w,F,L,Y){E();let H=Y.attributes,B=L.getAttributes(),P=F.defaultAttributeValues;for(let T in B){let D=B[T];if(D.location>=0){let ie=H[T];if(ie===void 0&&(T==="instanceMatrix"&&w.instanceMatrix&&(ie=w.instanceMatrix),T==="instanceColor"&&w.instanceColor&&(ie=w.instanceColor)),ie!==void 0){let oe=ie.normalized,fe=ie.itemSize,ve=e.get(ie);if(ve===void 0)continue;let dt=ve.buffer,ct=ve.type,te=ve.bytesPerElement,ue=ct===n.INT||ct===n.UNSIGNED_INT||ie.gpuType===af;if(ie.isInterleavedBufferAttribute){let G=ie.data,Q=G.stride,k=ie.offset;if(G.isInstancedInterleavedBuffer){for(let K=0;K<D.locationSize;K++)p(D.location+K,G.meshPerAttribute);w.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let K=0;K<D.locationSize;K++)g(D.location+K);n.bindBuffer(n.ARRAY_BUFFER,dt);for(let K=0;K<D.locationSize;K++)S(D.location+K,fe/D.locationSize,ct,oe,Q*te,(k+fe/D.locationSize*K)*te,ue)}else{if(ie.isInstancedBufferAttribute){for(let G=0;G<D.locationSize;G++)p(D.location+G,ie.meshPerAttribute);w.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let G=0;G<D.locationSize;G++)g(D.location+G);n.bindBuffer(n.ARRAY_BUFFER,dt);for(let G=0;G<D.locationSize;G++)S(D.location+G,fe/D.locationSize,ct,oe,fe*te,fe/D.locationSize*G*te,ue)}}else if(P!==void 0){let oe=P[T];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(D.location,oe);break;case 3:n.vertexAttrib3fv(D.location,oe);break;case 4:n.vertexAttrib4fv(D.location,oe);break;default:n.vertexAttrib1fv(D.location,oe)}}}}x()}function A(){b();for(let w in i){let F=i[w];for(let L in F){let Y=F[L];for(let H in Y){let B=Y[H];for(let P in B)u(B[P].object),delete B[P];delete Y[H]}}delete i[w]}}function R(w){if(i[w.id]===void 0)return;let F=i[w.id];for(let L in F){let Y=F[L];for(let H in Y){let B=Y[H];for(let P in B)u(B[P].object),delete B[P];delete Y[H]}}delete i[w.id]}function N(w){for(let F in i){let L=i[F];for(let Y in L){let H=L[Y];if(H[w.id]===void 0)continue;let B=H[w.id];for(let P in B)u(B[P].object),delete B[P];delete H[w.id]}}}function _(w){for(let F in i){let L=i[F],Y=w.isInstancedMesh===!0?w.id:0,H=L[Y];if(H!==void 0){for(let B in H){let P=H[B];for(let T in P)u(P[T].object),delete P[T];delete H[B]}delete L[Y],Object.keys(L).length===0&&delete i[F]}}}function b(){z(),o=!0,s!==r&&(s=r,l(s.object))}function z(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:z,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:_,releaseStatesOfProgram:N,initAttributes:E,enableAttribute:g,disableUnusedAttributes:x}}function wP(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,f){f!==0&&(n.drawArraysInstanced(i,l,u,f),t.update(u,i,f))}function a(l,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,f);let h=0;for(let m=0;m<f;m++)h+=u[m];t.update(h,i,1)}function c(l,u,f,d){if(f===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<l.length;m++)o(l[m],u[m],d[m]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,d,0,f);let m=0;for(let E=0;E<f;E++)m+=u[E]*d[E];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function TP(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let N=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(N){return!(N!==Kn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(N){let _=N===Ui&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==Gn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==_i&&!_)}function c(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(We("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:m,maxTextureSize:E,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:M,maxSamples:A,samples:R}}function DP(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Ri,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let h=f.length!==0||d||i!==0||r;return r=d,i=f.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){let m=f.clippingPlanes,E=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{let x=s?0:i,S=x*4,M=p.clippingState||null;c.value=M,M=u(m,d,S,h);for(let A=0;A!==S;++A)M[A]=t[A];p.clippingState=M,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,m){let E=f!==null?f.length:0,g=null;if(E!==0){if(g=c.value,m!==!0||g===null){let p=h+E*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,M=h;S!==E;++S,M+=4)o.copy(f[S]).applyMatrix4(x,a),o.normal.toArray(g,M),g[M+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,g}}var Jr=4,Cb=[.125,.215,.35,.446,.526,.582],Xs=20,AP=256,zc=new Hs,wb=new yt,T_=null,D_=0,A_=0,I_=!1,IP=new X,Yf=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=IP}=s;T_=this._renderer.getRenderTarget(),D_=this._renderer.getActiveCubeFace(),A_=this._renderer.getActiveMipmapLevel(),I_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ab(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Db(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(T_,D_,A_),this._renderer.xr.enabled=I_,e.scissorTest=!1,oa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xr||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),T_=this._renderer.getRenderTarget(),D_=this._renderer.getActiveCubeFace(),A_=this._renderer.getActiveMipmapLevel(),I_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:Ui,format:Kn,colorSpace:Us,depthBuffer:!1},r=Tb(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tb(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=RP(s)),this._blurMaterial=PP(s,e,t),this._ggxMaterial=NP(s,e,t)}return r}_compileMaterial(e){let t=new dn(new Oi,e);this._renderer.compile(t,zc)}_sceneToCubeUV(e,t,i,r,s){let c=new wn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(wb),f.toneMapping=mi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new dn(new na,new gr({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));let E=this._backgroundBox,g=E.material,p=!1,x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,p=!0):(g.color.copy(wb),p=!0);for(let S=0;S<6;S++){let M=S%3;M===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[S],s.y,s.z)):M===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[S]));let A=this._cubeSize;oa(r,M*A,S>2?A:0,A,A),f.setRenderTarget(r),p&&f.render(E,c),f.render(e,c)}f.toneMapping=h,f.autoClear=d,e.background=x}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Xr||e.mapping===zs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ab()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Db());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;oa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,zc)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=0+l*1.25,h=f*d,{_lodMax:m}=this,E=this._sizeLods[i],g=3*E*(i>m-Jr?i-m+Jr:0),p=4*(this._cubeSize-E);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=m-t,oa(s,g,p,3*E,2*E),r.setRenderTarget(s),r.render(a,zc),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-i,oa(e,g,p,3*E,2*E),r.setRenderTarget(e),r.render(a,zc)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ze("blur direction must be either latitudinal or longitudinal!");let u=3,f=this._lodMeshes[r];f.material=l;let d=l.uniforms,h=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Xs-1),E=s/m,g=isFinite(s)?1+Math.floor(u*E):Xs;g>Xs&&We(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Xs}`);let p=[],x=0;for(let N=0;N<Xs;++N){let _=N/E,b=Math.exp(-_*_/2);p.push(b),N===0?x+=b:N<g&&(x+=2*b)}for(let N=0;N<p.length;N++)p[N]=p[N]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-i;let M=this._sizeLods[r],A=3*M*(r>S-Jr?r-S+Jr:0),R=4*(this._cubeSize-M);oa(t,A,R,3*M,2*M),c.setRenderTarget(t),c.render(f,zc)}};function RP(n){let e=[],t=[],i=[],r=n,s=n-Jr+1+Cb.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let c=1/a;o>n-Jr?c=Cb[o-n+Jr-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],h=6,m=6,E=3,g=2,p=1,x=new Float32Array(E*m*h),S=new Float32Array(g*m*h),M=new Float32Array(p*m*h);for(let R=0;R<h;R++){let N=R%3*2/3-1,_=R>2?0:-1,b=[N,_,0,N+2/3,_,0,N+2/3,_+1,0,N,_,0,N+2/3,_+1,0,N,_+1,0];x.set(b,E*m*R),S.set(d,g*m*R);let z=[R,R,R,R,R,R];M.set(z,p*m*R)}let A=new Oi;A.setAttribute("position",new Bn(x,E)),A.setAttribute("uv",new Bn(S,g)),A.setAttribute("faceIndex",new Bn(M,p)),i.push(new dn(A,null)),r>Jr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Tb(n,e,t){let i=new Vn(n,e,t);return i.texture.mapping=Oc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function oa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function NP(n,e,t){return new Hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:AP,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Kf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function PP(n,e,t){let i=new Float32Array(Xs),r=new X(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:Xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Db(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Ab(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Kf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Zf=class extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ic(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new na(5,5,5),s=new Hn({name:"CubemapFromEquirect",uniforms:js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:ki});s.uniforms.tEquirect.value=t;let o=new dn(r,s),a=t.minFilter;return t.minFilter===Yr&&(t.minFilter=rn),new tf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function FP(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,h=!1){return d==null?null:h?o(d):s(d)}function s(d){if(d&&d.isTexture){let h=d.mapping;if(h===rf||h===sf)if(e.has(d)){let m=e.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let E=new Zf(m.height);return E.fromEquirectangularTexture(n,d),e.set(d,E),d.addEventListener("dispose",l),a(E.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let h=d.mapping,m=h===rf||h===sf,E=h===Xr||h===zs;if(m||E){let g=t.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new Yf(n)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let x=d.image;return m&&x&&x.height>0||E&&x&&c(x)?(i===null&&(i=new Yf(n)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function a(d,h){return h===rf?d.mapping=Xr:h===sf&&(d.mapping=zs),d}function c(d){let h=0,m=6;for(let E=0;E<m;E++)d[E]!==void 0&&h++;return h===m}function l(d){let h=d.target;h.removeEventListener("dispose",l);let m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(d){let h=d.target;h.removeEventListener("dispose",u);let m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function OP(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&bc("WebGLRenderer: "+i+" extension not supported."),r}}}function LP(n,e,t,i){let r={},s=new WeakMap;function o(f){let d=f.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete r[d.id];let h=s.get(d);h&&(e.remove(h),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function c(f){let d=f.attributes;for(let h in d)e.update(d[h],n.ARRAY_BUFFER)}function l(f){let d=[],h=f.index,m=f.attributes.position,E=0;if(m===void 0)return;if(h!==null){let x=h.array;E=h.version;for(let S=0,M=x.length;S<M;S+=3){let A=x[S+0],R=x[S+1],N=x[S+2];d.push(A,R,R,N,N,A)}}else{let x=m.array;E=m.version;for(let S=0,M=x.length/3-1;S<M;S+=3){let A=S+0,R=S+1,N=S+2;d.push(A,R,R,N,N,A)}}let g=new(m.count>=65535?Dc:Tc)(d,1);g.version=E;let p=s.get(f);p&&e.remove(p),s.set(f,g)}function u(f){let d=s.get(f);if(d){let h=f.index;h!==null&&d.version<h.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function kP(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,h){n.drawElements(i,h,s,d*o),t.update(h,i,1)}function l(d,h,m){m!==0&&(n.drawElementsInstanced(i,h,s,d*o,m),t.update(h,i,m))}function u(d,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=h[p];t.update(g,i,1)}function f(d,h,m,E){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/o,h[p],E[p]);else{g.multiDrawElementsInstancedWEBGL(i,h,0,s,d,0,E,0,m);let p=0;for(let x=0;x<m;x++)p+=h[x]*E[x];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function UP(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:ze("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function BP(n,e,t){let i=new WeakMap,r=new Ht;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,d=i.get(a);if(d===void 0||d.count!==f){let z=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",z)};var h=z;d!==void 0&&d.texture.dispose();let m=a.morphAttributes.position!==void 0,E=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],M=0;m===!0&&(M=1),E===!0&&(M=2),g===!0&&(M=3);let A=a.attributes.position.count*M,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);let N=new Float32Array(A*R*4*f),_=new Mc(N,A,R,f);_.type=_i,_.needsUpdate=!0;let b=M*4;for(let w=0;w<f;w++){let F=p[w],L=x[w],Y=S[w],H=A*R*4*w;for(let B=0;B<F.count;B++){let P=B*b;m===!0&&(r.fromBufferAttribute(F,B),N[H+P+0]=r.x,N[H+P+1]=r.y,N[H+P+2]=r.z,N[H+P+3]=0),E===!0&&(r.fromBufferAttribute(L,B),N[H+P+4]=r.x,N[H+P+5]=r.y,N[H+P+6]=r.z,N[H+P+7]=0),g===!0&&(r.fromBufferAttribute(Y,B),N[H+P+8]=r.x,N[H+P+9]=r.y,N[H+P+10]=r.z,N[H+P+11]=Y.itemSize===4?r.w:1)}}d={count:f,texture:_,size:new Dt(A,R)},i.set(a,d),a.addEventListener("dispose",z)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];let E=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",E),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function VP(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,f=l.geometry,d=e.get(l,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return d}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var HP={[a_]:"LINEAR_TONE_MAPPING",[c_]:"REINHARD_TONE_MAPPING",[l_]:"CINEON_TONE_MAPPING",[u_]:"ACES_FILMIC_TONE_MAPPING",[f_]:"AGX_TONE_MAPPING",[h_]:"NEUTRAL_TONE_MAPPING",[d_]:"CUSTOM_TONE_MAPPING"};function zP(n,e,t,i,r){let s=new Vn(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),o=new Vn(e,t,{type:Ui,depthBuffer:!1,stencilBuffer:!1}),a=new Oi;a.setAttribute("position",new Jn([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Jn([0,2,0,0,2,0],2));let c=new Wd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new dn(a,c),u=new Hs(-1,1,1,-1,0,1),f=null,d=null,h=!1,m,E=null,g=[],p=!1;this.setSize=function(x,S){s.setSize(x,S),o.setSize(x,S);for(let M=0;M<g.length;M++){let A=g[M];A.setSize&&A.setSize(x,S)}},this.setEffects=function(x){g=x,p=g.length>0&&g[0].isRenderPass===!0;let S=s.width,M=s.height;for(let A=0;A<g.length;A++){let R=g[A];R.setSize&&R.setSize(S,M)}},this.begin=function(x,S){if(h||x.toneMapping===mi&&g.length===0)return!1;if(E=S,S!==null){let M=S.width,A=S.height;(s.width!==M||s.height!==A)&&this.setSize(M,A)}return p===!1&&x.setRenderTarget(s),m=x.toneMapping,x.toneMapping=mi,!0},this.hasRenderPass=function(){return p},this.end=function(x,S){x.toneMapping=m,h=!0;let M=s,A=o;for(let R=0;R<g.length;R++){let N=g[R];if(N.enabled!==!1&&(N.render(x,A,M,S),N.needsSwap!==!1)){let _=M;M=A,A=_}}if(f!==x.outputColorSpace||d!==x.toneMapping){f=x.outputColorSpace,d=x.toneMapping,c.defines={},ut.getTransfer(f)===bt&&(c.defines.SRGB_TRANSFER="");let R=HP[d];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(E),x.render(l,u),E=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),c.dispose()}}var Xb=new Bi,P_=new Wr(1,1),Yb=new Mc,Zb=new Vd,Jb=new Ic,Ib=[],Rb=[],Nb=new Float32Array(16),Pb=new Float32Array(9),Fb=new Float32Array(4);function ca(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=Ib[r];if(s===void 0&&(s=new Float32Array(r),Ib[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Qf(n,e){let t=Rb[e];t===void 0&&(t=new Int32Array(e),Rb[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function GP(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function WP(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Zt(t,e)}}function jP(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Zt(t,e)}}function $P(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Zt(t,e)}}function qP(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Fb.set(i),n.uniformMatrix2fv(this.addr,!1,Fb),Zt(t,i)}}function XP(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Pb.set(i),n.uniformMatrix3fv(this.addr,!1,Pb),Zt(t,i)}}function YP(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Nb.set(i),n.uniformMatrix4fv(this.addr,!1,Nb),Zt(t,i)}}function ZP(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function JP(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Zt(t,e)}}function KP(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Zt(t,e)}}function QP(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Zt(t,e)}}function eF(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function tF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Zt(t,e)}}function nF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Zt(t,e)}}function iF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Zt(t,e)}}function rF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(P_.compareFunction=t.isReversedDepthBuffer()?$f:jf,s=P_):s=Xb,t.setTexture2D(e||s,r)}function sF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Zb,r)}function oF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Jb,r)}function aF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Yb,r)}function cF(n){switch(n){case 5126:return GP;case 35664:return WP;case 35665:return jP;case 35666:return $P;case 35674:return qP;case 35675:return XP;case 35676:return YP;case 5124:case 35670:return ZP;case 35667:case 35671:return JP;case 35668:case 35672:return KP;case 35669:case 35673:return QP;case 5125:return eF;case 36294:return tF;case 36295:return nF;case 36296:return iF;case 35678:case 36198:case 36298:case 36306:case 35682:return rF;case 35679:case 36299:case 36307:return sF;case 35680:case 36300:case 36308:case 36293:return oF;case 36289:case 36303:case 36311:case 36292:return aF}}function lF(n,e){n.uniform1fv(this.addr,e)}function uF(n,e){let t=ca(e,this.size,2);n.uniform2fv(this.addr,t)}function dF(n,e){let t=ca(e,this.size,3);n.uniform3fv(this.addr,t)}function fF(n,e){let t=ca(e,this.size,4);n.uniform4fv(this.addr,t)}function hF(n,e){let t=ca(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function pF(n,e){let t=ca(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function mF(n,e){let t=ca(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function gF(n,e){n.uniform1iv(this.addr,e)}function _F(n,e){n.uniform2iv(this.addr,e)}function yF(n,e){n.uniform3iv(this.addr,e)}function vF(n,e){n.uniform4iv(this.addr,e)}function xF(n,e){n.uniform1uiv(this.addr,e)}function EF(n,e){n.uniform2uiv(this.addr,e)}function SF(n,e){n.uniform3uiv(this.addr,e)}function bF(n,e){n.uniform4uiv(this.addr,e)}function MF(n,e,t){let i=this.cache,r=e.length,s=Qf(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=P_:o=Xb;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function CF(n,e,t){let i=this.cache,r=e.length,s=Qf(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Zb,s[o])}function wF(n,e,t){let i=this.cache,r=e.length,s=Qf(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Jb,s[o])}function TF(n,e,t){let i=this.cache,r=e.length,s=Qf(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Yb,s[o])}function DF(n){switch(n){case 5126:return lF;case 35664:return uF;case 35665:return dF;case 35666:return fF;case 35674:return hF;case 35675:return pF;case 35676:return mF;case 5124:case 35670:return gF;case 35667:case 35671:return _F;case 35668:case 35672:return yF;case 35669:case 35673:return vF;case 5125:return xF;case 36294:return EF;case 36295:return SF;case 36296:return bF;case 35678:case 36198:case 36298:case 36306:case 35682:return MF;case 35679:case 36299:case 36307:return CF;case 35680:case 36300:case 36308:case 36293:return wF;case 36289:case 36303:case 36311:case 36292:return TF}}var F_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=cF(t.type)}},O_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=DF(t.type)}},L_=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},R_=/(\w+)(\])?(\[|\.)?/g;function Ob(n,e){n.seq.push(e),n.map[e.id]=e}function AF(n,e,t){let i=n.name,r=i.length;for(R_.lastIndex=0;;){let s=R_.exec(i),o=R_.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ob(t,l===void 0?new F_(a,n,e):new O_(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new L_(a),Ob(t,f)),t=f}}}var aa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);AF(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function Lb(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var IF=37297,RF=0;function NF(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var kb=new Ze;function PF(n){ut._getMatrix(kb,ut.workingColorSpace,n);let e=`mat3( ${kb.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case xc:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ub(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+NF(n.getShaderSource(e),a)}else return s}function FF(n,e){let t=PF(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var OF={[a_]:"Linear",[c_]:"Reinhard",[l_]:"Cineon",[u_]:"ACESFilmic",[f_]:"AgX",[h_]:"Neutral",[d_]:"Custom"};function LF(n,e){let t=OF[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xf=new X;function kF(){ut.getLuminanceCoefficients(Xf);let n=Xf.x.toFixed(4),e=Xf.y.toFixed(4),t=Xf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function UF(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wc).join(`
`)}function BF(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function VF(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Wc(n){return n!==""}function Bb(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vb(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var HF=/^[ \t]*#include +<([\w\d./]+)>/gm;function k_(n){return n.replace(HF,GF)}var zF=new Map;function GF(n,e){let t=Ke[e];if(t===void 0){let i=zF.get(e);if(i!==void 0)t=Ke[i],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return k_(t)}var WF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hb(n){return n.replace(WF,jF)}function jF(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zb(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var $F={[Fc]:"SHADOWMAP_TYPE_PCF",[ia]:"SHADOWMAP_TYPE_VSM"};function qF(n){return $F[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var XF={[Xr]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE",[Oc]:"ENVMAP_TYPE_CUBE_UV"};function YF(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":XF[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var ZF={[zs]:"ENVMAP_MODE_REFRACTION"};function JF(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ZF[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var KF={[o_]:"ENVMAP_BLENDING_MULTIPLY",[ab]:"ENVMAP_BLENDING_MIX",[cb]:"ENVMAP_BLENDING_ADD"};function QF(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":KF[n.combine]||"ENVMAP_BLENDING_NONE"}function eO(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function tO(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=qF(t),l=YF(t),u=JF(t),f=QF(t),d=eO(t),h=UF(t),m=BF(s),E=r.createProgram(),g,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Wc).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Wc).join(`
`),p.length>0&&(p+=`
`)):(g=[zb(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wc).join(`
`),p=[zb(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==mi?LF("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,FF("linearToOutputTexel",t.outputColorSpace),kF(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wc).join(`
`)),o=k_(o),o=Bb(o,t),o=Vb(o,t),a=k_(a),a=Bb(a,t),a=Vb(a,t),o=Hb(o),a=Hb(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===E_?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===E_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=x+g+o,M=x+p+a,A=Lb(r,r.VERTEX_SHADER,S),R=Lb(r,r.FRAGMENT_SHADER,M);r.attachShader(E,A),r.attachShader(E,R),t.index0AttributeName!==void 0?r.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function N(w){if(n.debug.checkShaderErrors){let F=r.getProgramInfoLog(E)||"",L=r.getShaderInfoLog(A)||"",Y=r.getShaderInfoLog(R)||"",H=F.trim(),B=L.trim(),P=Y.trim(),T=!0,D=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(T=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,E,A,R);else{let ie=Ub(r,A,"vertex"),oe=Ub(r,R,"fragment");ze("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+H+`
`+ie+`
`+oe)}else H!==""?We("WebGLProgram: Program Info Log:",H):(B===""||P==="")&&(D=!1);D&&(w.diagnostics={runnable:T,programLog:H,vertexShader:{log:B,prefix:g},fragmentShader:{log:P,prefix:p}})}r.deleteShader(A),r.deleteShader(R),_=new aa(r,E),b=VF(r,E)}let _;this.getUniforms=function(){return _===void 0&&N(this),_};let b;this.getAttributes=function(){return b===void 0&&N(this),b};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(E,IF)),z},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=RF++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=A,this.fragmentShader=R,this}var nO=0,U_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new B_(e),t.set(e,i)),i}},B_=class{constructor(e){this.id=nO++,this.code=e,this.usedTimes=0}};function iO(n,e,t,i,r,s){let o=new Cc,a=new U_,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer,d=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return c.add(_),_===0?"uv":`uv${_}`}function E(_,b,z,w,F){let L=w.fog,Y=F.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?w.environment:null,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,P=e.get(_.envMap||H,B),T=P&&P.mapping===Oc?P.image.height:null,D=h[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&We("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));let ie=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,oe=ie!==void 0?ie.length:0,fe=0;Y.morphAttributes.position!==void 0&&(fe=1),Y.morphAttributes.normal!==void 0&&(fe=2),Y.morphAttributes.color!==void 0&&(fe=3);let ve,dt,ct,te;if(D){let Mt=Hi[D];ve=Mt.vertexShader,dt=Mt.fragmentShader}else ve=_.vertexShader,dt=_.fragmentShader,a.update(_),ct=a.getVertexShaderID(_),te=a.getFragmentShaderID(_);let ue=n.getRenderTarget(),G=n.state.buffers.depth.getReversed(),Q=F.isInstancedMesh===!0,k=F.isBatchedMesh===!0,K=!!_.map,Me=!!_.matcap,_e=!!P,pe=!!_.aoMap,Ce=!!_.lightMap,ye=!!_.bumpMap,Ne=!!_.normalMap,I=!!_.displacementMap,Ge=!!_.emissiveMap,Qe=!!_.metalnessMap,st=!!_.roughnessMap,Te=_.anisotropy>0,C=_.clearcoat>0,y=_.dispersion>0,U=_.iridescence>0,ne=_.sheen>0,ae=_.transmission>0,J=Te&&!!_.anisotropyMap,Ie=C&&!!_.clearcoatMap,he=C&&!!_.clearcoatNormalMap,ke=C&&!!_.clearcoatRoughnessMap,Ve=U&&!!_.iridescenceMap,ce=U&&!!_.iridescenceThicknessMap,le=ne&&!!_.sheenColorMap,be=ne&&!!_.sheenRoughnessMap,Fe=!!_.specularMap,we=!!_.specularColorMap,et=!!_.specularIntensityMap,O=ae&&!!_.transmissionMap,ge=ae&&!!_.thicknessMap,me=!!_.gradientMap,Ae=!!_.alphaMap,de=_.alphaTest>0,ee=!!_.alphaHash,Pe=!!_.extensions,je=mi;_.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(je=n.toneMapping);let Ft={shaderID:D,shaderType:_.type,shaderName:_.name,vertexShader:ve,fragmentShader:dt,defines:_.defines,customVertexShaderID:ct,customFragmentShaderID:te,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:k,batchingColor:k&&F._colorsTexture!==null,instancing:Q,instancingColor:Q&&F.instanceColor!==null,instancingMorph:Q&&F.morphTexture!==null,outputColorSpace:ue===null?n.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Us,alphaToCoverage:!!_.alphaToCoverage,map:K,matcap:Me,envMap:_e,envMapMode:_e&&P.mapping,envMapCubeUVHeight:T,aoMap:pe,lightMap:Ce,bumpMap:ye,normalMap:Ne,displacementMap:I,emissiveMap:Ge,normalMapObjectSpace:Ne&&_.normalMapType===fb,normalMapTangentSpace:Ne&&_.normalMapType===db,metalnessMap:Qe,roughnessMap:st,anisotropy:Te,anisotropyMap:J,clearcoat:C,clearcoatMap:Ie,clearcoatNormalMap:he,clearcoatRoughnessMap:ke,dispersion:y,iridescence:U,iridescenceMap:Ve,iridescenceThicknessMap:ce,sheen:ne,sheenColorMap:le,sheenRoughnessMap:be,specularMap:Fe,specularColorMap:we,specularIntensityMap:et,transmission:ae,transmissionMap:O,thicknessMap:ge,gradientMap:me,opaque:_.transparent===!1&&_.blending===Ls&&_.alphaToCoverage===!1,alphaMap:Ae,alphaTest:de,alphaHash:ee,combine:_.combine,mapUv:K&&m(_.map.channel),aoMapUv:pe&&m(_.aoMap.channel),lightMapUv:Ce&&m(_.lightMap.channel),bumpMapUv:ye&&m(_.bumpMap.channel),normalMapUv:Ne&&m(_.normalMap.channel),displacementMapUv:I&&m(_.displacementMap.channel),emissiveMapUv:Ge&&m(_.emissiveMap.channel),metalnessMapUv:Qe&&m(_.metalnessMap.channel),roughnessMapUv:st&&m(_.roughnessMap.channel),anisotropyMapUv:J&&m(_.anisotropyMap.channel),clearcoatMapUv:Ie&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:le&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(_.sheenRoughnessMap.channel),specularMapUv:Fe&&m(_.specularMap.channel),specularColorMapUv:we&&m(_.specularColorMap.channel),specularIntensityMapUv:et&&m(_.specularIntensityMap.channel),transmissionMapUv:O&&m(_.transmissionMap.channel),thicknessMapUv:ge&&m(_.thicknessMap.channel),alphaMapUv:Ae&&m(_.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Ne||Te),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(K||Ae),fog:!!L,useFog:_.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||Y.attributes.normal===void 0&&Ne===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:G,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:fe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,decodeVideoTexture:K&&_.map.isVideoTexture===!0&&ut.getTransfer(_.map.colorSpace)===bt,decodeVideoTextureEmissive:Ge&&_.emissiveMap.isVideoTexture===!0&&ut.getTransfer(_.emissiveMap.colorSpace)===bt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Li,flipSided:_.side===vn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Pe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&_.extensions.multiDraw===!0||k)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function g(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let z in _.defines)b.push(z),b.push(_.defines[z]);return _.isRawShaderMaterial===!1&&(p(b,_),x(b,_),b.push(n.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function p(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function x(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),_.push(o.mask)}function S(_){let b=h[_.type],z;if(b){let w=Hi[b];z=Mb.clone(w.uniforms)}else z=_.uniforms;return z}function M(_,b){let z=u.get(b);return z!==void 0?++z.usedTimes:(z=new tO(n,b,_,r),l.push(z),u.set(b,z)),z}function A(_){if(--_.usedTimes===0){let b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function R(_){a.remove(_)}function N(){a.dispose()}return{getParameters:E,getProgramCacheKey:g,getUniforms:S,acquireProgram:M,releaseProgram:A,releaseShaderCache:R,programs:l,dispose:N}}function rO(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function sO(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Gb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Wb(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function a(d,h,m,E,g,p){let x=n[e];return x===void 0?(x={id:d.id,object:d,geometry:h,material:m,materialVariant:o(d),groupOrder:E,renderOrder:d.renderOrder,z:g,group:p},n[e]=x):(x.id=d.id,x.object=d,x.geometry=h,x.material=m,x.materialVariant=o(d),x.groupOrder=E,x.renderOrder=d.renderOrder,x.z=g,x.group=p),e++,x}function c(d,h,m,E,g,p){let x=a(d,h,m,E,g,p);m.transmission>0?i.push(x):m.transparent===!0?r.push(x):t.push(x)}function l(d,h,m,E,g,p){let x=a(d,h,m,E,g,p);m.transmission>0?i.unshift(x):m.transparent===!0?r.unshift(x):t.unshift(x)}function u(d,h){t.length>1&&t.sort(d||sO),i.length>1&&i.sort(h||Gb),r.length>1&&r.sort(h||Gb)}function f(){for(let d=e,h=n.length;d<h;d++){let m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function oO(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Wb,n.set(i,[o])):r>=s.length?(o=new Wb,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function aO(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new yt};break;case"SpotLight":t={position:new X,direction:new X,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new X,halfWidth:new X,halfHeight:new X};break}return n[e.id]=t,t}}}function cO(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var lO=0;function uO(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function dO(n){let e=new aO,t=cO(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new X);let r=new X,s=new qt,o=new qt;function a(l){let u=0,f=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,m=0,E=0,g=0,p=0,x=0,S=0,M=0,A=0,R=0,N=0;l.sort(uO);for(let b=0,z=l.length;b<z;b++){let w=l[b],F=w.color,L=w.intensity,Y=w.distance,H=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Gs?H=w.shadow.map.texture:H=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)u+=F.r*L,f+=F.g*L,d+=F.b*L;else if(w.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(w.sh.coefficients[B],L);N++}else if(w.isDirectionalLight){let B=e.get(w);if(B.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let P=w.shadow,T=t.get(w);T.shadowIntensity=P.intensity,T.shadowBias=P.bias,T.shadowNormalBias=P.normalBias,T.shadowRadius=P.radius,T.shadowMapSize=P.mapSize,i.directionalShadow[h]=T,i.directionalShadowMap[h]=H,i.directionalShadowMatrix[h]=w.shadow.matrix,x++}i.directional[h]=B,h++}else if(w.isSpotLight){let B=e.get(w);B.position.setFromMatrixPosition(w.matrixWorld),B.color.copy(F).multiplyScalar(L),B.distance=Y,B.coneCos=Math.cos(w.angle),B.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),B.decay=w.decay,i.spot[E]=B;let P=w.shadow;if(w.map&&(i.spotLightMap[A]=w.map,A++,P.updateMatrices(w),w.castShadow&&R++),i.spotLightMatrix[E]=P.matrix,w.castShadow){let T=t.get(w);T.shadowIntensity=P.intensity,T.shadowBias=P.bias,T.shadowNormalBias=P.normalBias,T.shadowRadius=P.radius,T.shadowMapSize=P.mapSize,i.spotShadow[E]=T,i.spotShadowMap[E]=H,M++}E++}else if(w.isRectAreaLight){let B=e.get(w);B.color.copy(F).multiplyScalar(L),B.halfWidth.set(w.width*.5,0,0),B.halfHeight.set(0,w.height*.5,0),i.rectArea[g]=B,g++}else if(w.isPointLight){let B=e.get(w);if(B.color.copy(w.color).multiplyScalar(w.intensity),B.distance=w.distance,B.decay=w.decay,w.castShadow){let P=w.shadow,T=t.get(w);T.shadowIntensity=P.intensity,T.shadowBias=P.bias,T.shadowNormalBias=P.normalBias,T.shadowRadius=P.radius,T.shadowMapSize=P.mapSize,T.shadowCameraNear=P.camera.near,T.shadowCameraFar=P.camera.far,i.pointShadow[m]=T,i.pointShadowMap[m]=H,i.pointShadowMatrix[m]=w.shadow.matrix,S++}i.point[m]=B,m++}else if(w.isHemisphereLight){let B=e.get(w);B.skyColor.copy(w.color).multiplyScalar(L),B.groundColor.copy(w.groundColor).multiplyScalar(L),i.hemi[p]=B,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;let _=i.hash;(_.directionalLength!==h||_.pointLength!==m||_.spotLength!==E||_.rectAreaLength!==g||_.hemiLength!==p||_.numDirectionalShadows!==x||_.numPointShadows!==S||_.numSpotShadows!==M||_.numSpotMaps!==A||_.numLightProbes!==N)&&(i.directional.length=h,i.spot.length=E,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=M+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=N,_.directionalLength=h,_.pointLength=m,_.spotLength=E,_.rectAreaLength=g,_.hemiLength=p,_.numDirectionalShadows=x,_.numPointShadows=S,_.numSpotShadows=M,_.numSpotMaps=A,_.numLightProbes=N,i.version=lO++)}function c(l,u){let f=0,d=0,h=0,m=0,E=0,g=u.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){let S=l[p];if(S.isDirectionalLight){let M=i.directional[f];M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),f++}else if(S.isSpotLight){let M=i.spot[h];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),h++}else if(S.isRectAreaLight){let M=i.rectArea[m];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),o.identity(),s.copy(S.matrixWorld),s.premultiply(g),o.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),m++}else if(S.isPointLight){let M=i.point[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){let M=i.hemi[E];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(g),E++}}}return{setup:a,setupView:c,state:i}}function jb(n){let e=new dO(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function fO(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new jb(n),e.set(r,[a])):s>=o.length?(a=new jb(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var hO=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pO=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mO=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],gO=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],$b=new qt,Gc=new X,N_=new X;function _O(n,e,t){let i=new Ac,r=new Dt,s=new Dt,o=new Ht,a=new jd,c=new $d,l={},u=t.maxTextureSize,f={[pr]:vn,[vn]:pr,[Li]:Li},d=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:hO,fragmentShader:pO}),h=d.clone();h.defines.HORIZONTAL_PASS=1;let m=new Oi;m.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let E=new dn(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fc;let p=this.type;this.render=function(R,N,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===zS&&(We("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Fc);let b=n.getRenderTarget(),z=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),F=n.state;F.setBlending(ki),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let L=p!==this.type;L&&N.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(H=>H.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,H=R.length;Y<H;Y++){let B=R[Y],P=B.shadow;if(P===void 0){We("WebGLShadowMap:",B,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;r.copy(P.mapSize);let T=P.getFrameExtents();r.multiply(T),s.copy(P.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/T.x),r.x=s.x*T.x,P.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/T.y),r.y=s.y*T.y,P.mapSize.y=s.y));let D=n.state.buffers.depth.getReversed();if(P.camera._reversedDepth=D,P.map===null||L===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===ia){if(B.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new Vn(r.x,r.y,{format:Gs,type:Ui,minFilter:rn,magFilter:rn,generateMipmaps:!1}),P.map.texture.name=B.name+".shadowMap",P.map.depthTexture=new Wr(r.x,r.y,_i),P.map.depthTexture.name=B.name+".shadowMapDepth",P.map.depthTexture.format=Pi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=en,P.map.depthTexture.magFilter=en}else B.isPointLight?(P.map=new Zf(r.x),P.map.depthTexture=new Gd(r.x,gi)):(P.map=new Vn(r.x,r.y),P.map.depthTexture=new Wr(r.x,r.y,gi)),P.map.depthTexture.name=B.name+".shadowMap",P.map.depthTexture.format=Pi,this.type===Fc?(P.map.depthTexture.compareFunction=D?$f:jf,P.map.depthTexture.minFilter=rn,P.map.depthTexture.magFilter=rn):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=en,P.map.depthTexture.magFilter=en);P.camera.updateProjectionMatrix()}let ie=P.map.isWebGLCubeRenderTarget?6:1;for(let oe=0;oe<ie;oe++){if(P.map.isWebGLCubeRenderTarget)n.setRenderTarget(P.map,oe),n.clear();else{oe===0&&(n.setRenderTarget(P.map),n.clear());let fe=P.getViewport(oe);o.set(s.x*fe.x,s.y*fe.y,s.x*fe.z,s.y*fe.w),F.viewport(o)}if(B.isPointLight){let fe=P.camera,ve=P.matrix,dt=B.distance||fe.far;dt!==fe.far&&(fe.far=dt,fe.updateProjectionMatrix()),Gc.setFromMatrixPosition(B.matrixWorld),fe.position.copy(Gc),N_.copy(fe.position),N_.add(mO[oe]),fe.up.copy(gO[oe]),fe.lookAt(N_),fe.updateMatrixWorld(),ve.makeTranslation(-Gc.x,-Gc.y,-Gc.z),$b.multiplyMatrices(fe.projectionMatrix,fe.matrixWorldInverse),P._frustum.setFromProjectionMatrix($b,fe.coordinateSystem,fe.reversedDepth)}else P.updateMatrices(B);i=P.getFrustum(),M(N,_,P.camera,B,this.type)}P.isPointLightShadow!==!0&&this.type===ia&&x(P,_),P.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(b,z,w)};function x(R,N){let _=e.update(E);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,h.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Vn(r.x,r.y,{format:Gs,type:Ui})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(N,null,_,d,E,null),h.uniforms.shadow_pass.value=R.mapPass.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(N,null,_,h,E,null)}function S(R,N,_,b){let z=null,w=_.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(w!==void 0)z=w;else if(z=_.isPointLight===!0?c:a,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){let F=z.uuid,L=N.uuid,Y=l[F];Y===void 0&&(Y={},l[F]=Y);let H=Y[L];H===void 0&&(H=z.clone(),Y[L]=H,N.addEventListener("dispose",A)),z=H}if(z.visible=N.visible,z.wireframe=N.wireframe,b===ia?z.side=N.shadowSide!==null?N.shadowSide:N.side:z.side=N.shadowSide!==null?N.shadowSide:f[N.side],z.alphaMap=N.alphaMap,z.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,z.map=N.map,z.clipShadows=N.clipShadows,z.clippingPlanes=N.clippingPlanes,z.clipIntersection=N.clipIntersection,z.displacementMap=N.displacementMap,z.displacementScale=N.displacementScale,z.displacementBias=N.displacementBias,z.wireframeLinewidth=N.wireframeLinewidth,z.linewidth=N.linewidth,_.isPointLight===!0&&z.isMeshDistanceMaterial===!0){let F=n.properties.get(z);F.light=_}return z}function M(R,N,_,b,z){if(R.visible===!1)return;if(R.layers.test(N.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&z===ia)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,R.matrixWorld);let L=e.update(R),Y=R.material;if(Array.isArray(Y)){let H=L.groups;for(let B=0,P=H.length;B<P;B++){let T=H[B],D=Y[T.materialIndex];if(D&&D.visible){let ie=S(R,D,b,z);R.onBeforeShadow(n,R,N,_,L,ie,T),n.renderBufferDirect(_,null,L,ie,R,T),R.onAfterShadow(n,R,N,_,L,ie,T)}}}else if(Y.visible){let H=S(R,Y,b,z);R.onBeforeShadow(n,R,N,_,L,H,null),n.renderBufferDirect(_,null,L,H,R,null),R.onAfterShadow(n,R,N,_,L,H,null)}}let F=R.children;for(let L=0,Y=F.length;L<Y;L++)M(F[L],N,_,b,z)}function A(R){R.target.removeEventListener("dispose",A);for(let _ in l){let b=l[_],z=R.target.uuid;z in b&&(b[z].dispose(),delete b[z])}}}function yO(n,e){function t(){let O=!1,ge=new Ht,me=null,Ae=new Ht(0,0,0,0);return{setMask:function(de){me!==de&&!O&&(n.colorMask(de,de,de,de),me=de)},setLocked:function(de){O=de},setClear:function(de,ee,Pe,je,Ft){Ft===!0&&(de*=je,ee*=je,Pe*=je),ge.set(de,ee,Pe,je),Ae.equals(ge)===!1&&(n.clearColor(de,ee,Pe,je),Ae.copy(ge))},reset:function(){O=!1,me=null,Ae.set(-1,0,0,0)}}}function i(){let O=!1,ge=!1,me=null,Ae=null,de=null;return{setReversed:function(ee){if(ge!==ee){let Pe=e.get("EXT_clip_control");ee?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),ge=ee;let je=de;de=null,this.setClear(je)}},getReversed:function(){return ge},setTest:function(ee){ee?ue(n.DEPTH_TEST):G(n.DEPTH_TEST)},setMask:function(ee){me!==ee&&!O&&(n.depthMask(ee),me=ee)},setFunc:function(ee){if(ge&&(ee=Sb[ee]),Ae!==ee){switch(ee){case Td:n.depthFunc(n.NEVER);break;case Dd:n.depthFunc(n.ALWAYS);break;case Ad:n.depthFunc(n.LESS);break;case ks:n.depthFunc(n.LEQUAL);break;case Id:n.depthFunc(n.EQUAL);break;case Rd:n.depthFunc(n.GEQUAL);break;case Nd:n.depthFunc(n.GREATER);break;case Pd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ae=ee}},setLocked:function(ee){O=ee},setClear:function(ee){de!==ee&&(de=ee,ge&&(ee=1-ee),n.clearDepth(ee))},reset:function(){O=!1,me=null,Ae=null,de=null,ge=!1}}}function r(){let O=!1,ge=null,me=null,Ae=null,de=null,ee=null,Pe=null,je=null,Ft=null;return{setTest:function(Mt){O||(Mt?ue(n.STENCIL_TEST):G(n.STENCIL_TEST))},setMask:function(Mt){ge!==Mt&&!O&&(n.stencilMask(Mt),ge=Mt)},setFunc:function(Mt,zi,Gi){(me!==Mt||Ae!==zi||de!==Gi)&&(n.stencilFunc(Mt,zi,Gi),me=Mt,Ae=zi,de=Gi)},setOp:function(Mt,zi,Gi){(ee!==Mt||Pe!==zi||je!==Gi)&&(n.stencilOp(Mt,zi,Gi),ee=Mt,Pe=zi,je=Gi)},setLocked:function(Mt){O=Mt},setClear:function(Mt){Ft!==Mt&&(n.clearStencil(Mt),Ft=Mt)},reset:function(){O=!1,ge=null,me=null,Ae=null,de=null,ee=null,Pe=null,je=null,Ft=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},f={},d=new WeakMap,h=[],m=null,E=!1,g=null,p=null,x=null,S=null,M=null,A=null,R=null,N=new yt(0,0,0),_=0,b=!1,z=null,w=null,F=null,L=null,Y=null,H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,P=0,T=n.getParameter(n.VERSION);T.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(T)[1]),B=P>=1):T.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(T)[1]),B=P>=2);let D=null,ie={},oe=n.getParameter(n.SCISSOR_BOX),fe=n.getParameter(n.VIEWPORT),ve=new Ht().fromArray(oe),dt=new Ht().fromArray(fe);function ct(O,ge,me,Ae){let de=new Uint8Array(4),ee=n.createTexture();n.bindTexture(O,ee),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<me;Pe++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,Ae,0,n.RGBA,n.UNSIGNED_BYTE,de):n.texImage2D(ge+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,de);return ee}let te={};te[n.TEXTURE_2D]=ct(n.TEXTURE_2D,n.TEXTURE_2D,1),te[n.TEXTURE_CUBE_MAP]=ct(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[n.TEXTURE_2D_ARRAY]=ct(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),te[n.TEXTURE_3D]=ct(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(n.DEPTH_TEST),o.setFunc(ks),ye(!1),Ne(n_),ue(n.CULL_FACE),pe(ki);function ue(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function G(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function Q(O,ge){return f[O]!==ge?(n.bindFramebuffer(O,ge),f[O]=ge,O===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ge),O===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function k(O,ge){let me=h,Ae=!1;if(O){me=d.get(ge),me===void 0&&(me=[],d.set(ge,me));let de=O.textures;if(me.length!==de.length||me[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,Pe=de.length;ee<Pe;ee++)me[ee]=n.COLOR_ATTACHMENT0+ee;me.length=de.length,Ae=!0}}else me[0]!==n.BACK&&(me[0]=n.BACK,Ae=!0);Ae&&n.drawBuffers(me)}function K(O){return m!==O?(n.useProgram(O),m=O,!0):!1}let Me={[zr]:n.FUNC_ADD,[WS]:n.FUNC_SUBTRACT,[jS]:n.FUNC_REVERSE_SUBTRACT};Me[$S]=n.MIN,Me[qS]=n.MAX;let _e={[XS]:n.ZERO,[YS]:n.ONE,[ZS]:n.SRC_COLOR,[Cd]:n.SRC_ALPHA,[nb]:n.SRC_ALPHA_SATURATE,[eb]:n.DST_COLOR,[KS]:n.DST_ALPHA,[JS]:n.ONE_MINUS_SRC_COLOR,[wd]:n.ONE_MINUS_SRC_ALPHA,[tb]:n.ONE_MINUS_DST_COLOR,[QS]:n.ONE_MINUS_DST_ALPHA,[ib]:n.CONSTANT_COLOR,[rb]:n.ONE_MINUS_CONSTANT_COLOR,[sb]:n.CONSTANT_ALPHA,[ob]:n.ONE_MINUS_CONSTANT_ALPHA};function pe(O,ge,me,Ae,de,ee,Pe,je,Ft,Mt){if(O===ki){E===!0&&(G(n.BLEND),E=!1);return}if(E===!1&&(ue(n.BLEND),E=!0),O!==GS){if(O!==g||Mt!==b){if((p!==zr||M!==zr)&&(n.blendEquation(n.FUNC_ADD),p=zr,M=zr),Mt)switch(O){case Ls:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case i_:n.blendFunc(n.ONE,n.ONE);break;case r_:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case s_:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ze("WebGLState: Invalid blending: ",O);break}else switch(O){case Ls:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case i_:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case r_:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case s_:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",O);break}x=null,S=null,A=null,R=null,N.set(0,0,0),_=0,g=O,b=Mt}return}de=de||ge,ee=ee||me,Pe=Pe||Ae,(ge!==p||de!==M)&&(n.blendEquationSeparate(Me[ge],Me[de]),p=ge,M=de),(me!==x||Ae!==S||ee!==A||Pe!==R)&&(n.blendFuncSeparate(_e[me],_e[Ae],_e[ee],_e[Pe]),x=me,S=Ae,A=ee,R=Pe),(je.equals(N)===!1||Ft!==_)&&(n.blendColor(je.r,je.g,je.b,Ft),N.copy(je),_=Ft),g=O,b=!1}function Ce(O,ge){O.side===Li?G(n.CULL_FACE):ue(n.CULL_FACE);let me=O.side===vn;ge&&(me=!me),ye(me),O.blending===Ls&&O.transparent===!1?pe(ki):pe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);let Ae=O.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ge(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):G(n.SAMPLE_ALPHA_TO_COVERAGE)}function ye(O){z!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),z=O)}function Ne(O){O!==VS?(ue(n.CULL_FACE),O!==w&&(O===n_?n.cullFace(n.BACK):O===HS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):G(n.CULL_FACE),w=O}function I(O){O!==F&&(B&&n.lineWidth(O),F=O)}function Ge(O,ge,me){O?(ue(n.POLYGON_OFFSET_FILL),(L!==ge||Y!==me)&&(L=ge,Y=me,o.getReversed()&&(ge=-ge),n.polygonOffset(ge,me))):G(n.POLYGON_OFFSET_FILL)}function Qe(O){O?ue(n.SCISSOR_TEST):G(n.SCISSOR_TEST)}function st(O){O===void 0&&(O=n.TEXTURE0+H-1),D!==O&&(n.activeTexture(O),D=O)}function Te(O,ge,me){me===void 0&&(D===null?me=n.TEXTURE0+H-1:me=D);let Ae=ie[me];Ae===void 0&&(Ae={type:void 0,texture:void 0},ie[me]=Ae),(Ae.type!==O||Ae.texture!==ge)&&(D!==me&&(n.activeTexture(me),D=me),n.bindTexture(O,ge||te[O]),Ae.type=O,Ae.texture=ge)}function C(){let O=ie[D];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function ne(){try{n.texSubImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function ae(){try{n.texSubImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function Ie(){try{n.compressedTexSubImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function he(){try{n.texStorage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function ke(){try{n.texStorage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function Ve(){try{n.texImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function ce(){try{n.texImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function le(O){ve.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),ve.copy(O))}function be(O){dt.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),dt.copy(O))}function Fe(O,ge){let me=l.get(ge);me===void 0&&(me=new WeakMap,l.set(ge,me));let Ae=me.get(O);Ae===void 0&&(Ae=n.getUniformBlockIndex(ge,O.name),me.set(O,Ae))}function we(O,ge){let Ae=l.get(ge).get(O);c.get(ge)!==Ae&&(n.uniformBlockBinding(ge,Ae,O.__bindingPointIndex),c.set(ge,Ae))}function et(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},D=null,ie={},f={},d=new WeakMap,h=[],m=null,E=!1,g=null,p=null,x=null,S=null,M=null,A=null,R=null,N=new yt(0,0,0),_=0,b=!1,z=null,w=null,F=null,L=null,Y=null,ve.set(0,0,n.canvas.width,n.canvas.height),dt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ue,disable:G,bindFramebuffer:Q,drawBuffers:k,useProgram:K,setBlending:pe,setMaterial:Ce,setFlipSided:ye,setCullFace:Ne,setLineWidth:I,setPolygonOffset:Ge,setScissorTest:Qe,activeTexture:st,bindTexture:Te,unbindTexture:C,compressedTexImage2D:y,compressedTexImage3D:U,texImage2D:Ve,texImage3D:ce,updateUBOMapping:Fe,uniformBlockBinding:we,texStorage2D:he,texStorage3D:ke,texSubImage2D:ne,texSubImage3D:ae,compressedTexSubImage2D:J,compressedTexSubImage3D:Ie,scissor:le,viewport:be,reset:et}}function vO(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Dt,u=new WeakMap,f,d=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,y){return h?new OffscreenCanvas(C,y):Sc("canvas")}function E(C,y,U){let ne=1,ae=Te(C);if((ae.width>U||ae.height>U)&&(ne=U/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let J=Math.floor(ne*ae.width),Ie=Math.floor(ne*ae.height);f===void 0&&(f=m(J,Ie));let he=y?m(J,Ie):f;return he.width=J,he.height=Ie,he.getContext("2d").drawImage(C,0,0,J,Ie),We("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+J+"x"+Ie+")."),he}else return"data"in C&&We("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){n.generateMipmap(C)}function x(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(C,y,U,ne,ae=!1){if(C!==null){if(n[C]!==void 0)return n[C];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let J=y;if(y===n.RED&&(U===n.FLOAT&&(J=n.R32F),U===n.HALF_FLOAT&&(J=n.R16F),U===n.UNSIGNED_BYTE&&(J=n.R8)),y===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(J=n.R8UI),U===n.UNSIGNED_SHORT&&(J=n.R16UI),U===n.UNSIGNED_INT&&(J=n.R32UI),U===n.BYTE&&(J=n.R8I),U===n.SHORT&&(J=n.R16I),U===n.INT&&(J=n.R32I)),y===n.RG&&(U===n.FLOAT&&(J=n.RG32F),U===n.HALF_FLOAT&&(J=n.RG16F),U===n.UNSIGNED_BYTE&&(J=n.RG8)),y===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(J=n.RG8UI),U===n.UNSIGNED_SHORT&&(J=n.RG16UI),U===n.UNSIGNED_INT&&(J=n.RG32UI),U===n.BYTE&&(J=n.RG8I),U===n.SHORT&&(J=n.RG16I),U===n.INT&&(J=n.RG32I)),y===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(J=n.RGB8UI),U===n.UNSIGNED_SHORT&&(J=n.RGB16UI),U===n.UNSIGNED_INT&&(J=n.RGB32UI),U===n.BYTE&&(J=n.RGB8I),U===n.SHORT&&(J=n.RGB16I),U===n.INT&&(J=n.RGB32I)),y===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),U===n.UNSIGNED_INT&&(J=n.RGBA32UI),U===n.BYTE&&(J=n.RGBA8I),U===n.SHORT&&(J=n.RGBA16I),U===n.INT&&(J=n.RGBA32I)),y===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),y===n.RGBA){let Ie=ae?xc:ut.getTransfer(ne);U===n.FLOAT&&(J=n.RGBA32F),U===n.HALF_FLOAT&&(J=n.RGBA16F),U===n.UNSIGNED_BYTE&&(J=Ie===bt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function M(C,y){let U;return C?y===null||y===gi||y===sa?U=n.DEPTH24_STENCIL8:y===_i?U=n.DEPTH32F_STENCIL8:y===ra&&(U=n.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===gi||y===sa?U=n.DEPTH_COMPONENT24:y===_i?U=n.DEPTH_COMPONENT32F:y===ra&&(U=n.DEPTH_COMPONENT16),U}function A(C,y){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==en&&C.minFilter!==rn?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function R(C){let y=C.target;y.removeEventListener("dispose",R),_(y),y.isVideoTexture&&u.delete(y)}function N(C){let y=C.target;y.removeEventListener("dispose",N),z(y)}function _(C){let y=i.get(C);if(y.__webglInit===void 0)return;let U=C.source,ne=d.get(U);if(ne){let ae=ne[y.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&b(C),Object.keys(ne).length===0&&d.delete(U)}i.remove(C)}function b(C){let y=i.get(C);n.deleteTexture(y.__webglTexture);let U=C.source,ne=d.get(U);delete ne[y.__cacheKey],o.memory.textures--}function z(C){let y=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(y.__webglFramebuffer[ne]))for(let ae=0;ae<y.__webglFramebuffer[ne].length;ae++)n.deleteFramebuffer(y.__webglFramebuffer[ne][ae]);else n.deleteFramebuffer(y.__webglFramebuffer[ne]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[ne])}else{if(Array.isArray(y.__webglFramebuffer))for(let ne=0;ne<y.__webglFramebuffer.length;ne++)n.deleteFramebuffer(y.__webglFramebuffer[ne]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ne=0;ne<y.__webglColorRenderbuffer.length;ne++)y.__webglColorRenderbuffer[ne]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[ne]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let U=C.textures;for(let ne=0,ae=U.length;ne<ae;ne++){let J=i.get(U[ne]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),o.memory.textures--),i.remove(U[ne])}i.remove(C)}let w=0;function F(){w=0}function L(){let C=w;return C>=r.maxTextures&&We("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),w+=1,C}function Y(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function H(C,y){let U=i.get(C);if(C.isVideoTexture&&Qe(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&U.__version!==C.version){let ne=C.image;if(ne===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{te(U,C,y);return}}else C.isExternalTexture&&(U.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+y)}function B(C,y){let U=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&U.__version!==C.version){te(U,C,y);return}else C.isExternalTexture&&(U.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+y)}function P(C,y){let U=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&U.__version!==C.version){te(U,C,y);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+y)}function T(C,y){let U=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&U.__version!==C.version){ue(U,C,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+y)}let D={[Fd]:n.REPEAT,[Ni]:n.CLAMP_TO_EDGE,[Od]:n.MIRRORED_REPEAT},ie={[en]:n.NEAREST,[lb]:n.NEAREST_MIPMAP_NEAREST,[Lc]:n.NEAREST_MIPMAP_LINEAR,[rn]:n.LINEAR,[of]:n.LINEAR_MIPMAP_NEAREST,[Yr]:n.LINEAR_MIPMAP_LINEAR},oe={[hb]:n.NEVER,[yb]:n.ALWAYS,[pb]:n.LESS,[jf]:n.LEQUAL,[mb]:n.EQUAL,[$f]:n.GEQUAL,[gb]:n.GREATER,[_b]:n.NOTEQUAL};function fe(C,y){if(y.type===_i&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===rn||y.magFilter===of||y.magFilter===Lc||y.magFilter===Yr||y.minFilter===rn||y.minFilter===of||y.minFilter===Lc||y.minFilter===Yr)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,D[y.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,D[y.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,D[y.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ie[y.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ie[y.minFilter]),y.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,oe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===en||y.minFilter!==Lc&&y.minFilter!==Yr||y.type===_i&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ve(C,y){let U=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",R));let ne=y.source,ae=d.get(ne);ae===void 0&&(ae={},d.set(ne,ae));let J=Y(y);if(J!==C.__cacheKey){ae[J]===void 0&&(ae[J]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),ae[J].usedTimes++;let Ie=ae[C.__cacheKey];Ie!==void 0&&(ae[C.__cacheKey].usedTimes--,Ie.usedTimes===0&&b(y)),C.__cacheKey=J,C.__webglTexture=ae[J].texture}return U}function dt(C,y,U){return Math.floor(Math.floor(C/U)/y)}function ct(C,y,U,ne){let J=C.updateRanges;if(J.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,U,ne,y.data);else{J.sort((ce,le)=>ce.start-le.start);let Ie=0;for(let ce=1;ce<J.length;ce++){let le=J[Ie],be=J[ce],Fe=le.start+le.count,we=dt(be.start,y.width,4),et=dt(le.start,y.width,4);be.start<=Fe+1&&we===et&&dt(be.start+be.count-1,y.width,4)===we?le.count=Math.max(le.count,be.start+be.count-le.start):(++Ie,J[Ie]=be)}J.length=Ie+1;let he=n.getParameter(n.UNPACK_ROW_LENGTH),ke=n.getParameter(n.UNPACK_SKIP_PIXELS),Ve=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let ce=0,le=J.length;ce<le;ce++){let be=J[ce],Fe=Math.floor(be.start/4),we=Math.ceil(be.count/4),et=Fe%y.width,O=Math.floor(Fe/y.width),ge=we,me=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,et),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),t.texSubImage2D(n.TEXTURE_2D,0,et,O,ge,me,U,ne,y.data)}C.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,he),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ke),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ve)}}function te(C,y,U){let ne=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ne=n.TEXTURE_3D);let ae=ve(C,y),J=y.source;t.bindTexture(ne,C.__webglTexture,n.TEXTURE0+U);let Ie=i.get(J);if(J.version!==Ie.__version||ae===!0){t.activeTexture(n.TEXTURE0+U);let he=ut.getPrimaries(ut.workingColorSpace),ke=y.colorSpace===yr?null:ut.getPrimaries(y.colorSpace),Ve=y.colorSpace===yr||he===ke?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let ce=E(y.image,!1,r.maxTextureSize);ce=st(y,ce);let le=s.convert(y.format,y.colorSpace),be=s.convert(y.type),Fe=S(y.internalFormat,le,be,y.colorSpace,y.isVideoTexture);fe(ne,y);let we,et=y.mipmaps,O=y.isVideoTexture!==!0,ge=Ie.__version===void 0||ae===!0,me=J.dataReady,Ae=A(y,ce);if(y.isDepthTexture)Fe=M(y.format===Zr,y.type),ge&&(O?t.texStorage2D(n.TEXTURE_2D,1,Fe,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Fe,ce.width,ce.height,0,le,be,null));else if(y.isDataTexture)if(et.length>0){O&&ge&&t.texStorage2D(n.TEXTURE_2D,Ae,Fe,et[0].width,et[0].height);for(let de=0,ee=et.length;de<ee;de++)we=et[de],O?me&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,we.width,we.height,le,be,we.data):t.texImage2D(n.TEXTURE_2D,de,Fe,we.width,we.height,0,le,be,we.data);y.generateMipmaps=!1}else O?(ge&&t.texStorage2D(n.TEXTURE_2D,Ae,Fe,ce.width,ce.height),me&&ct(y,ce,le,be)):t.texImage2D(n.TEXTURE_2D,0,Fe,ce.width,ce.height,0,le,be,ce.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){O&&ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Fe,et[0].width,et[0].height,ce.depth);for(let de=0,ee=et.length;de<ee;de++)if(we=et[de],y.format!==Kn)if(le!==null)if(O){if(me)if(y.layerUpdates.size>0){let Pe=w_(we.width,we.height,y.format,y.type);for(let je of y.layerUpdates){let Ft=we.data.subarray(je*Pe/we.data.BYTES_PER_ELEMENT,(je+1)*Pe/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,je,we.width,we.height,1,le,Ft)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,we.width,we.height,ce.depth,le,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Fe,we.width,we.height,ce.depth,0,we.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?me&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,we.width,we.height,ce.depth,le,be,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Fe,we.width,we.height,ce.depth,0,le,be,we.data)}else{O&&ge&&t.texStorage2D(n.TEXTURE_2D,Ae,Fe,et[0].width,et[0].height);for(let de=0,ee=et.length;de<ee;de++)we=et[de],y.format!==Kn?le!==null?O?me&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,we.width,we.height,le,we.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Fe,we.width,we.height,0,we.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?me&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,we.width,we.height,le,be,we.data):t.texImage2D(n.TEXTURE_2D,de,Fe,we.width,we.height,0,le,be,we.data)}else if(y.isDataArrayTexture)if(O){if(ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Fe,ce.width,ce.height,ce.depth),me)if(y.layerUpdates.size>0){let de=w_(ce.width,ce.height,y.format,y.type);for(let ee of y.layerUpdates){let Pe=ce.data.subarray(ee*de/ce.data.BYTES_PER_ELEMENT,(ee+1)*de/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ee,ce.width,ce.height,1,le,be,Pe)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,le,be,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Fe,ce.width,ce.height,ce.depth,0,le,be,ce.data);else if(y.isData3DTexture)O?(ge&&t.texStorage3D(n.TEXTURE_3D,Ae,Fe,ce.width,ce.height,ce.depth),me&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,le,be,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Fe,ce.width,ce.height,ce.depth,0,le,be,ce.data);else if(y.isFramebufferTexture){if(ge)if(O)t.texStorage2D(n.TEXTURE_2D,Ae,Fe,ce.width,ce.height);else{let de=ce.width,ee=ce.height;for(let Pe=0;Pe<Ae;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Fe,de,ee,0,le,be,null),de>>=1,ee>>=1}}else if(et.length>0){if(O&&ge){let de=Te(et[0]);t.texStorage2D(n.TEXTURE_2D,Ae,Fe,de.width,de.height)}for(let de=0,ee=et.length;de<ee;de++)we=et[de],O?me&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,le,be,we):t.texImage2D(n.TEXTURE_2D,de,Fe,le,be,we);y.generateMipmaps=!1}else if(O){if(ge){let de=Te(ce);t.texStorage2D(n.TEXTURE_2D,Ae,Fe,de.width,de.height)}me&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le,be,ce)}else t.texImage2D(n.TEXTURE_2D,0,Fe,le,be,ce);g(y)&&p(ne),Ie.__version=J.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function ue(C,y,U){if(y.image.length!==6)return;let ne=ve(C,y),ae=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+U);let J=i.get(ae);if(ae.version!==J.__version||ne===!0){t.activeTexture(n.TEXTURE0+U);let Ie=ut.getPrimaries(ut.workingColorSpace),he=y.colorSpace===yr?null:ut.getPrimaries(y.colorSpace),ke=y.colorSpace===yr||Ie===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let Ve=y.isCompressedTexture||y.image[0].isCompressedTexture,ce=y.image[0]&&y.image[0].isDataTexture,le=[];for(let ee=0;ee<6;ee++)!Ve&&!ce?le[ee]=E(y.image[ee],!0,r.maxCubemapSize):le[ee]=ce?y.image[ee].image:y.image[ee],le[ee]=st(y,le[ee]);let be=le[0],Fe=s.convert(y.format,y.colorSpace),we=s.convert(y.type),et=S(y.internalFormat,Fe,we,y.colorSpace),O=y.isVideoTexture!==!0,ge=J.__version===void 0||ne===!0,me=ae.dataReady,Ae=A(y,be);fe(n.TEXTURE_CUBE_MAP,y);let de;if(Ve){O&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,et,be.width,be.height);for(let ee=0;ee<6;ee++){de=le[ee].mipmaps;for(let Pe=0;Pe<de.length;Pe++){let je=de[Pe];y.format!==Kn?Fe!==null?O?me&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,0,0,je.width,je.height,Fe,je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,et,je.width,je.height,0,je.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,0,0,je.width,je.height,Fe,we,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,et,je.width,je.height,0,Fe,we,je.data)}}}else{if(de=y.mipmaps,O&&ge){de.length>0&&Ae++;let ee=Te(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,et,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ce){O?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,le[ee].width,le[ee].height,Fe,we,le[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,et,le[ee].width,le[ee].height,0,Fe,we,le[ee].data);for(let Pe=0;Pe<de.length;Pe++){let Ft=de[Pe].image[ee].image;O?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,0,0,Ft.width,Ft.height,Fe,we,Ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,et,Ft.width,Ft.height,0,Fe,we,Ft.data)}}else{O?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Fe,we,le[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,et,Fe,we,le[ee]);for(let Pe=0;Pe<de.length;Pe++){let je=de[Pe];O?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,0,0,Fe,we,je.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,et,Fe,we,je.image[ee])}}}g(y)&&p(n.TEXTURE_CUBE_MAP),J.__version=ae.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function G(C,y,U,ne,ae,J){let Ie=s.convert(U.format,U.colorSpace),he=s.convert(U.type),ke=S(U.internalFormat,Ie,he,U.colorSpace),Ve=i.get(y),ce=i.get(U);if(ce.__renderTarget=y,!Ve.__hasExternalTextures){let le=Math.max(1,y.width>>J),be=Math.max(1,y.height>>J);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,J,ke,le,be,y.depth,0,Ie,he,null):t.texImage2D(ae,J,ke,le,be,0,Ie,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Ge(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,ae,ce.__webglTexture,0,I(y)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,ae,ce.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Q(C,y,U){if(n.bindRenderbuffer(n.RENDERBUFFER,C),y.depthBuffer){let ne=y.depthTexture,ae=ne&&ne.isDepthTexture?ne.type:null,J=M(y.stencilBuffer,ae),Ie=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ge(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(y),J,y.width,y.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(y),J,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,J,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ie,n.RENDERBUFFER,C)}else{let ne=y.textures;for(let ae=0;ae<ne.length;ae++){let J=ne[ae],Ie=s.convert(J.format,J.colorSpace),he=s.convert(J.type),ke=S(J.internalFormat,Ie,he,J.colorSpace);Ge(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(y),ke,y.width,y.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(y),ke,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ke,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function k(C,y,U){let ne=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ae=i.get(y.depthTexture);if(ae.__renderTarget=y,(!ae.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ne){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,y.depthTexture.addEventListener("dispose",R)),ae.__webglTexture===void 0){ae.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ae.__webglTexture),fe(n.TEXTURE_CUBE_MAP,y.depthTexture);let Ve=s.convert(y.depthTexture.format),ce=s.convert(y.depthTexture.type),le;y.depthTexture.format===Pi?le=n.DEPTH_COMPONENT24:y.depthTexture.format===Zr&&(le=n.DEPTH24_STENCIL8);for(let be=0;be<6;be++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,le,y.width,y.height,0,Ve,ce,null)}}else H(y.depthTexture,0);let J=ae.__webglTexture,Ie=I(y),he=ne?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,ke=y.depthTexture.format===Zr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===Pi)Ge(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ke,he,J,0,Ie):n.framebufferTexture2D(n.FRAMEBUFFER,ke,he,J,0);else if(y.depthTexture.format===Zr)Ge(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ke,he,J,0,Ie):n.framebufferTexture2D(n.FRAMEBUFFER,ke,he,J,0);else throw new Error("Unknown depthTexture format")}function K(C){let y=i.get(C),U=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let ne=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ne){let ae=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ne.removeEventListener("dispose",ae)};ne.addEventListener("dispose",ae),y.__depthDisposeCallback=ae}y.__boundDepthTexture=ne}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(U)for(let ne=0;ne<6;ne++)k(y.__webglFramebuffer[ne],C,ne);else{let ne=C.texture.mipmaps;ne&&ne.length>0?k(y.__webglFramebuffer[0],C,0):k(y.__webglFramebuffer,C,0)}else if(U){y.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[ne]),y.__webglDepthbuffer[ne]===void 0)y.__webglDepthbuffer[ne]=n.createRenderbuffer(),Q(y.__webglDepthbuffer[ne],C,!1);else{let ae=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer[ne];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,J)}}else{let ne=C.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Q(y.__webglDepthbuffer,C,!1);else{let ae=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,J)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Me(C,y,U){let ne=i.get(C);y!==void 0&&G(ne.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&K(C)}function _e(C){let y=C.texture,U=i.get(C),ne=i.get(y);C.addEventListener("dispose",N);let ae=C.textures,J=C.isWebGLCubeRenderTarget===!0,Ie=ae.length>1;if(Ie||(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=y.version,o.memory.textures++),J){U.__webglFramebuffer=[];for(let he=0;he<6;he++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[he]=[];for(let ke=0;ke<y.mipmaps.length;ke++)U.__webglFramebuffer[he][ke]=n.createFramebuffer()}else U.__webglFramebuffer[he]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let he=0;he<y.mipmaps.length;he++)U.__webglFramebuffer[he]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(Ie)for(let he=0,ke=ae.length;he<ke;he++){let Ve=i.get(ae[he]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&Ge(C)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let he=0;he<ae.length;he++){let ke=ae[he];U.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[he]);let Ve=s.convert(ke.format,ke.colorSpace),ce=s.convert(ke.type),le=S(ke.internalFormat,Ve,ce,ke.colorSpace,C.isXRRenderTarget===!0),be=I(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,be,le,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,U.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Q(U.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),fe(n.TEXTURE_CUBE_MAP,y);for(let he=0;he<6;he++)if(y.mipmaps&&y.mipmaps.length>0)for(let ke=0;ke<y.mipmaps.length;ke++)G(U.__webglFramebuffer[he][ke],C,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke);else G(U.__webglFramebuffer[he],C,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(y)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let he=0,ke=ae.length;he<ke;he++){let Ve=ae[he],ce=i.get(Ve),le=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(le=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ce.__webglTexture),fe(le,Ve),G(U.__webglFramebuffer,C,Ve,n.COLOR_ATTACHMENT0+he,le,0),g(Ve)&&p(le)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(he=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,ne.__webglTexture),fe(he,y),y.mipmaps&&y.mipmaps.length>0)for(let ke=0;ke<y.mipmaps.length;ke++)G(U.__webglFramebuffer[ke],C,y,n.COLOR_ATTACHMENT0,he,ke);else G(U.__webglFramebuffer,C,y,n.COLOR_ATTACHMENT0,he,0);g(y)&&p(he),t.unbindTexture()}C.depthBuffer&&K(C)}function pe(C){let y=C.textures;for(let U=0,ne=y.length;U<ne;U++){let ae=y[U];if(g(ae)){let J=x(C),Ie=i.get(ae).__webglTexture;t.bindTexture(J,Ie),p(J),t.unbindTexture()}}}let Ce=[],ye=[];function Ne(C){if(C.samples>0){if(Ge(C)===!1){let y=C.textures,U=C.width,ne=C.height,ae=n.COLOR_BUFFER_BIT,J=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ie=i.get(C),he=y.length>1;if(he)for(let Ve=0;Ve<y.length;Ve++)t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer);let ke=C.texture.mipmaps;ke&&ke.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ve=0;Ve<y.length;Ve++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),he){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ve]);let ce=i.get(y[Ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ce,0)}n.blitFramebuffer(0,0,U,ne,0,0,U,ne,ae,n.NEAREST),c===!0&&(Ce.length=0,ye.length=0,Ce.push(n.COLOR_ATTACHMENT0+Ve),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ce.push(J),ye.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ye)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ce))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let Ve=0;Ve<y.length;Ve++){t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ve]);let ce=i.get(y[Ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.TEXTURE_2D,ce,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function I(C){return Math.min(r.maxSamples,C.samples)}function Ge(C){let y=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Qe(C){let y=o.render.frame;u.get(C)!==y&&(u.set(C,y),C.update())}function st(C,y){let U=C.colorSpace,ne=C.format,ae=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||U!==Us&&U!==yr&&(ut.getTransfer(U)===bt?(ne!==Kn||ae!==Gn)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",U)),y}function Te(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=F,this.setTexture2D=H,this.setTexture2DArray=B,this.setTexture3D=P,this.setTextureCube=T,this.rebindTextures=Me,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=G,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function xO(n,e){function t(i,r=yr){let s,o=ut.getTransfer(r);if(i===Gn)return n.UNSIGNED_BYTE;if(i===cf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===lf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===g_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===__)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===p_)return n.BYTE;if(i===m_)return n.SHORT;if(i===ra)return n.UNSIGNED_SHORT;if(i===af)return n.INT;if(i===gi)return n.UNSIGNED_INT;if(i===_i)return n.FLOAT;if(i===Ui)return n.HALF_FLOAT;if(i===y_)return n.ALPHA;if(i===v_)return n.RGB;if(i===Kn)return n.RGBA;if(i===Pi)return n.DEPTH_COMPONENT;if(i===Zr)return n.DEPTH_STENCIL;if(i===x_)return n.RED;if(i===uf)return n.RED_INTEGER;if(i===Gs)return n.RG;if(i===df)return n.RG_INTEGER;if(i===ff)return n.RGBA_INTEGER;if(i===kc||i===Uc||i===Bc||i===Vc)if(o===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===kc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Uc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Bc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===kc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Uc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Bc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hf||i===pf||i===mf||i===gf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===hf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===mf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===gf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_f||i===yf||i===vf||i===xf||i===Ef||i===Sf||i===bf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_f||i===yf)return o===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===vf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===xf)return s.COMPRESSED_R11_EAC;if(i===Ef)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Sf)return s.COMPRESSED_RG11_EAC;if(i===bf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Mf||i===Cf||i===wf||i===Tf||i===Df||i===Af||i===If||i===Rf||i===Nf||i===Pf||i===Ff||i===Of||i===Lf||i===kf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Mf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Cf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Tf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Df)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Af)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===If)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Rf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Nf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Pf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ff)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Of)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kf)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uf||i===Bf||i===Vf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Uf)return o===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Bf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hf||i===zf||i===Gf||i===Wf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Hf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===zf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===sa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var EO=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SO=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,V_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Rc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Hn({vertexShader:EO,fragmentShader:SO,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dn(new _r(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},H_=class extends mr{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,h=null,m=null,E=typeof XRWebGLBinding<"u",g=new V_,p={},x=t.getContextAttributes(),S=null,M=null,A=[],R=[],N=new Dt,_=null,b=new wn;b.viewport=new Ht;let z=new wn;z.viewport=new Ht;let w=[b,z],F=new nf,L=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ue=A[te];return ue===void 0&&(ue=new Qo,A[te]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(te){let ue=A[te];return ue===void 0&&(ue=new Qo,A[te]=ue),ue.getGripSpace()},this.getHand=function(te){let ue=A[te];return ue===void 0&&(ue=new Qo,A[te]=ue),ue.getHandSpace()};function H(te){let ue=R.indexOf(te.inputSource);if(ue===-1)return;let G=A[ue];G!==void 0&&(G.update(te.inputSource,te.frame,l||o),G.dispatchEvent({type:te.type,data:te.inputSource}))}function B(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",P);for(let te=0;te<A.length;te++){let ue=R[te];ue!==null&&(R[te]=null,A[te].disconnect(ue))}L=null,Y=null,g.reset();for(let te in p)delete p[te];e.setRenderTarget(S),h=null,d=null,f=null,r=null,M=null,ct.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,i.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,i.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&E&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",B),r.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(N),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,Q=null,k=null;x.depth&&(k=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=x.stencil?Zr:Pi,Q=x.stencil?sa:gi);let K={colorFormat:t.RGBA8,depthFormat:k,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(K),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Vn(d.textureWidth,d.textureHeight,{format:Kn,type:Gn,depthTexture:new Wr(d.textureWidth,d.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let G={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),M=new Vn(h.framebufferWidth,h.framebufferHeight,{format:Kn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),ct.setContext(r),ct.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function P(te){for(let ue=0;ue<te.removed.length;ue++){let G=te.removed[ue],Q=R.indexOf(G);Q>=0&&(R[Q]=null,A[Q].disconnect(G))}for(let ue=0;ue<te.added.length;ue++){let G=te.added[ue],Q=R.indexOf(G);if(Q===-1){for(let K=0;K<A.length;K++)if(K>=R.length){R.push(G),Q=K;break}else if(R[K]===null){R[K]=G,Q=K;break}if(Q===-1)break}let k=A[Q];k&&k.connect(G)}}let T=new X,D=new X;function ie(te,ue,G){T.setFromMatrixPosition(ue.matrixWorld),D.setFromMatrixPosition(G.matrixWorld);let Q=T.distanceTo(D),k=ue.projectionMatrix.elements,K=G.projectionMatrix.elements,Me=k[14]/(k[10]-1),_e=k[14]/(k[10]+1),pe=(k[9]+1)/k[5],Ce=(k[9]-1)/k[5],ye=(k[8]-1)/k[0],Ne=(K[8]+1)/K[0],I=Me*ye,Ge=Me*Ne,Qe=Q/(-ye+Ne),st=Qe*-ye;if(ue.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(st),te.translateZ(Qe),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),k[10]===-1)te.projectionMatrix.copy(ue.projectionMatrix),te.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{let Te=Me+Qe,C=_e+Qe,y=I-st,U=Ge+(Q-st),ne=pe*_e/C*Te,ae=Ce*_e/C*Te;te.projectionMatrix.makePerspective(y,U,ne,ae,Te,C),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function oe(te,ue){ue===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ue.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let ue=te.near,G=te.far;g.texture!==null&&(g.depthNear>0&&(ue=g.depthNear),g.depthFar>0&&(G=g.depthFar)),F.near=z.near=b.near=ue,F.far=z.far=b.far=G,(L!==F.near||Y!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,Y=F.far),F.layers.mask=te.layers.mask|6,b.layers.mask=F.layers.mask&-5,z.layers.mask=F.layers.mask&-3;let Q=te.parent,k=F.cameras;oe(F,Q);for(let K=0;K<k.length;K++)oe(k[K],Q);k.length===2?ie(F,b,z):F.projectionMatrix.copy(b.projectionMatrix),fe(te,F,Q)};function fe(te,ue,G){G===null?te.matrix.copy(ue.matrixWorld):(te.matrix.copy(G.matrixWorld),te.matrix.invert(),te.matrix.multiply(ue.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ue.projectionMatrix),te.projectionMatrixInverse.copy(ue.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=kd*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&h===null))return c},this.setFoveation=function(te){c=te,d!==null&&(d.fixedFoveation=te),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(te){return p[te]};let ve=null;function dt(te,ue){if(u=ue.getViewerPose(l||o),m=ue,u!==null){let G=u.views;h!==null&&(e.setRenderTargetFramebuffer(M,h.framebuffer),e.setRenderTarget(M));let Q=!1;G.length!==F.cameras.length&&(F.cameras.length=0,Q=!0);for(let _e=0;_e<G.length;_e++){let pe=G[_e],Ce=null;if(h!==null)Ce=h.getViewport(pe);else{let Ne=f.getViewSubImage(d,pe);Ce=Ne.viewport,_e===0&&(e.setRenderTargetTextures(M,Ne.colorTexture,Ne.depthStencilTexture),e.setRenderTarget(M))}let ye=w[_e];ye===void 0&&(ye=new wn,ye.layers.enable(_e),ye.viewport=new Ht,w[_e]=ye),ye.matrix.fromArray(pe.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(pe.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),_e===0&&(F.matrix.copy(ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Q===!0&&F.cameras.push(ye)}let k=r.enabledFeatures;if(k&&k.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){f=i.getBinding();let _e=f.getDepthInformation(G[0]);_e&&_e.isValid&&_e.texture&&g.init(_e,r.renderState)}if(k&&k.includes("camera-access")&&E){e.state.unbindTexture(),f=i.getBinding();for(let _e=0;_e<G.length;_e++){let pe=G[_e].camera;if(pe){let Ce=p[pe];Ce||(Ce=new Rc,p[pe]=Ce);let ye=f.getCameraImage(pe);Ce.sourceTexture=ye}}}}for(let G=0;G<A.length;G++){let Q=R[G],k=A[G];Q!==null&&k!==void 0&&k.update(Q,ue,l||o)}ve&&ve(te,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),m=null}let ct=new qb;ct.setAnimationLoop(dt),this.setAnimationLoop=function(te){ve=te},this.dispose=function(){}}},qs=new Bs,bO=new qt;function MO(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,b_(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,x,S,M){p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),f(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&h(g,p,M)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),E(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,x,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===vn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===vn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let x=e.get(p),S=x.envMap,M=x.envMapRotation;S&&(g.envMap.value=S,qs.copy(M),qs.x*=-1,qs.y*=-1,qs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),g.envMapRotation.value.setFromMatrix4(bO.makeRotationFromEuler(qs)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,x,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===vn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function E(g,p){let x=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function CO(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,S){let M=S.program;i.uniformBlockBinding(x,M)}function l(x,S){let M=r[x.id];M===void 0&&(m(x),M=u(x),r[x.id]=M,x.addEventListener("dispose",g));let A=S.program;i.updateUBOMapping(x,A);let R=e.render.frame;s[x.id]!==R&&(d(x),s[x.id]=R)}function u(x){let S=f();x.__bindingPointIndex=S;let M=n.createBuffer(),A=x.__size,R=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,A,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,M),M}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let S=r[x.id],M=x.uniforms,A=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let R=0,N=M.length;R<N;R++){let _=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,z=_.length;b<z;b++){let w=_[b];if(h(w,R,b,A)===!0){let F=w.__offset,L=Array.isArray(w.value)?w.value:[w.value],Y=0;for(let H=0;H<L.length;H++){let B=L[H],P=E(B);typeof B=="number"||typeof B=="boolean"?(w.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,F+Y,w.__data)):B.isMatrix3?(w.__data[0]=B.elements[0],w.__data[1]=B.elements[1],w.__data[2]=B.elements[2],w.__data[3]=0,w.__data[4]=B.elements[3],w.__data[5]=B.elements[4],w.__data[6]=B.elements[5],w.__data[7]=0,w.__data[8]=B.elements[6],w.__data[9]=B.elements[7],w.__data[10]=B.elements[8],w.__data[11]=0):(B.toArray(w.__data,Y),Y+=P.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(x,S,M,A){let R=x.value,N=S+"_"+M;if(A[N]===void 0)return typeof R=="number"||typeof R=="boolean"?A[N]=R:A[N]=R.clone(),!0;{let _=A[N];if(typeof R=="number"||typeof R=="boolean"){if(_!==R)return A[N]=R,!0}else if(_.equals(R)===!1)return _.copy(R),!0}return!1}function m(x){let S=x.uniforms,M=0,A=16;for(let N=0,_=S.length;N<_;N++){let b=Array.isArray(S[N])?S[N]:[S[N]];for(let z=0,w=b.length;z<w;z++){let F=b[z],L=Array.isArray(F.value)?F.value:[F.value];for(let Y=0,H=L.length;Y<H;Y++){let B=L[Y],P=E(B),T=M%A,D=T%P.boundary,ie=T+D;M+=D,ie!==0&&A-ie<P.storage&&(M+=A-ie),F.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=P.storage}}}let R=M%A;return R>0&&(M+=A-R),x.__size=M,x.__cache={},this}function E(x){let S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):We("WebGLRenderer: Unsupported uniform value type.",x),S}function g(x){let S=x.target;S.removeEventListener("dispose",g);let M=o.indexOf(S.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(let x in r)n.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}var wO=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vi=null;function TO(){return Vi===null&&(Vi=new zd(wO,16,16,Gs,Ui),Vi.name="DFG_LUT",Vi.minFilter=rn,Vi.magFilter=rn,Vi.wrapS=Ni,Vi.wrapT=Ni,Vi.generateMipmaps=!1,Vi.needsUpdate=!0),Vi}var Jf=class{constructor(e={}){let{canvas:t=vb(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Gn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;let E=h,g=new Set([ff,df,uf]),p=new Set([Gn,gi,ra,sa,cf,lf]),x=new Uint32Array(4),S=new Int32Array(4),M=null,A=null,R=[],N=[],_=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let b=this,z=!1;this._outputColorSpace=yn;let w=0,F=0,L=null,Y=-1,H=null,B=new Ht,P=new Ht,T=null,D=new yt(0),ie=0,oe=t.width,fe=t.height,ve=1,dt=null,ct=null,te=new Ht(0,0,oe,fe),ue=new Ht(0,0,oe,fe),G=!1,Q=new Ac,k=!1,K=!1,Me=new qt,_e=new X,pe=new Ht,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function Ne(){return L===null?ve:1}let I=i;function Ge(v,V){return t.getContext(v,V)}try{let v={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"183"}`),t.addEventListener("webglcontextlost",Pe,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",Ft,!1),I===null){let V="webgl2";if(I=Ge(V,v),I===null)throw Ge(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw ze("WebGLRenderer: "+v.message),v}let Qe,st,Te,C,y,U,ne,ae,J,Ie,he,ke,Ve,ce,le,be,Fe,we,et,O,ge,me,Ae;function de(){Qe=new OP(I),Qe.init(),ge=new xO(I,Qe),st=new TP(I,Qe,e,ge),Te=new yO(I,Qe),st.reversedDepthBuffer&&d&&Te.buffers.depth.setReversed(!0),C=new UP(I),y=new rO,U=new vO(I,Qe,Te,y,st,ge,C),ne=new FP(b),ae=new G1(I),me=new CP(I,ae),J=new LP(I,ae,C,me),Ie=new VP(I,J,ae,me,C),we=new BP(I,st,U),le=new DP(y),he=new iO(b,ne,Qe,st,me,le),ke=new MO(b,y),Ve=new oO,ce=new fO(Qe),Fe=new MP(b,ne,Te,Ie,m,c),be=new _O(b,Ie,st),Ae=new CO(I,C,st,Te),et=new wP(I,Qe,C),O=new kP(I,Qe,C),C.programs=he.programs,b.capabilities=st,b.extensions=Qe,b.properties=y,b.renderLists=Ve,b.shadowMap=be,b.state=Te,b.info=C}de(),E!==Gn&&(_=new zP(E,t.width,t.height,r,s));let ee=new H_(b,I);this.xr=ee,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let v=Qe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Qe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(v){v!==void 0&&(ve=v,this.setSize(oe,fe,!1))},this.getSize=function(v){return v.set(oe,fe)},this.setSize=function(v,V,Z=!0){if(ee.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}oe=v,fe=V,t.width=Math.floor(v*ve),t.height=Math.floor(V*ve),Z===!0&&(t.style.width=v+"px",t.style.height=V+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,v,V)},this.getDrawingBufferSize=function(v){return v.set(oe*ve,fe*ve).floor()},this.setDrawingBufferSize=function(v,V,Z){oe=v,fe=V,ve=Z,t.width=Math.floor(v*Z),t.height=Math.floor(V*Z),this.setViewport(0,0,v,V)},this.setEffects=function(v){if(E===Gn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let V=0;V<v.length;V++)if(v[V].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(B)},this.getViewport=function(v){return v.copy(te)},this.setViewport=function(v,V,Z,$){v.isVector4?te.set(v.x,v.y,v.z,v.w):te.set(v,V,Z,$),Te.viewport(B.copy(te).multiplyScalar(ve).round())},this.getScissor=function(v){return v.copy(ue)},this.setScissor=function(v,V,Z,$){v.isVector4?ue.set(v.x,v.y,v.z,v.w):ue.set(v,V,Z,$),Te.scissor(P.copy(ue).multiplyScalar(ve).round())},this.getScissorTest=function(){return G},this.setScissorTest=function(v){Te.setScissorTest(G=v)},this.setOpaqueSort=function(v){dt=v},this.setTransparentSort=function(v){ct=v},this.getClearColor=function(v){return v.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(v=!0,V=!0,Z=!0){let $=0;if(v){let j=!1;if(L!==null){let Ee=L.texture.format;j=g.has(Ee)}if(j){let Ee=L.texture.type,De=p.has(Ee),Se=Fe.getClearColor(),Oe=Fe.getClearAlpha(),Ue=Se.r,Ye=Se.g,tt=Se.b;De?(x[0]=Ue,x[1]=Ye,x[2]=tt,x[3]=Oe,I.clearBufferuiv(I.COLOR,0,x)):(S[0]=Ue,S[1]=Ye,S[2]=tt,S[3]=Oe,I.clearBufferiv(I.COLOR,0,S))}else $|=I.COLOR_BUFFER_BIT}V&&($|=I.DEPTH_BUFFER_BIT),Z&&($|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&I.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Pe,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",Ft,!1),Fe.dispose(),Ve.dispose(),ce.dispose(),y.dispose(),ne.dispose(),Ie.dispose(),me.dispose(),Ae.dispose(),he.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",W_),ee.removeEventListener("sessionend",j_),Kr.stop()};function Pe(v){v.preventDefault(),S_("WebGLRenderer: Context Lost."),z=!0}function je(){S_("WebGLRenderer: Context Restored."),z=!1;let v=C.autoReset,V=be.enabled,Z=be.autoUpdate,$=be.needsUpdate,j=be.type;de(),C.autoReset=v,be.enabled=V,be.autoUpdate=Z,be.needsUpdate=$,be.type=j}function Ft(v){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Mt(v){let V=v.target;V.removeEventListener("dispose",Mt),zi(V)}function zi(v){Gi(v),y.remove(v)}function Gi(v){let V=y.get(v).programs;V!==void 0&&(V.forEach(function(Z){he.releaseProgram(Z)}),v.isShaderMaterial&&he.releaseShaderCache(v))}this.renderBufferDirect=function(v,V,Z,$,j,Ee){V===null&&(V=Ce);let De=j.isMesh&&j.matrixWorld.determinant()<0,Se=tM(v,V,Z,$,j);Te.setMaterial($,De);let Oe=Z.index,Ue=1;if($.wireframe===!0){if(Oe=J.getWireframeAttribute(Z),Oe===void 0)return;Ue=2}let Ye=Z.drawRange,tt=Z.attributes.position,Be=Ye.start*Ue,At=(Ye.start+Ye.count)*Ue;Ee!==null&&(Be=Math.max(Be,Ee.start*Ue),At=Math.min(At,(Ee.start+Ee.count)*Ue)),Oe!==null?(Be=Math.max(Be,0),At=Math.min(At,Oe.count)):tt!=null&&(Be=Math.max(Be,0),At=Math.min(At,tt.count));let zt=At-Be;if(zt<0||zt===1/0)return;me.setup(j,$,Se,Z,Oe);let Bt,It=et;if(Oe!==null&&(Bt=ae.get(Oe),It=O,It.setIndex(Bt)),j.isMesh)$.wireframe===!0?(Te.setLineWidth($.wireframeLinewidth*Ne()),It.setMode(I.LINES)):It.setMode(I.TRIANGLES);else if(j.isLine){let sn=$.linewidth;sn===void 0&&(sn=1),Te.setLineWidth(sn*Ne()),j.isLineSegments?It.setMode(I.LINES):j.isLineLoop?It.setMode(I.LINE_LOOP):It.setMode(I.LINE_STRIP)}else j.isPoints?It.setMode(I.POINTS):j.isSprite&&It.setMode(I.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)bc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),It.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(Qe.get("WEBGL_multi_draw"))It.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let sn=j._multiDrawStarts,Le=j._multiDrawCounts,Tn=j._multiDrawCount,ht=Oe?ae.get(Oe).bytesPerElement:1,Qn=y.get($).currentProgram.getUniforms();for(let yi=0;yi<Tn;yi++)Qn.setValue(I,"_gl_DrawID",yi),It.render(sn[yi]/ht,Le[yi])}else if(j.isInstancedMesh)It.renderInstances(Be,zt,j.count);else if(Z.isInstancedBufferGeometry){let sn=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Le=Math.min(Z.instanceCount,sn);It.renderInstances(Be,zt,Le)}else It.render(Be,zt)};function G_(v,V,Z){v.transparent===!0&&v.side===Li&&v.forceSinglePass===!1?(v.side=vn,v.needsUpdate=!0,$c(v,V,Z),v.side=pr,v.needsUpdate=!0,$c(v,V,Z),v.side=Li):$c(v,V,Z)}this.compile=function(v,V,Z=null){Z===null&&(Z=v),A=ce.get(Z),A.init(V),N.push(A),Z.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(A.pushLight(j),j.castShadow&&A.pushShadow(j))}),v!==Z&&v.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(A.pushLight(j),j.castShadow&&A.pushShadow(j))}),A.setupLights();let $=new Set;return v.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let Ee=j.material;if(Ee)if(Array.isArray(Ee))for(let De=0;De<Ee.length;De++){let Se=Ee[De];G_(Se,Z,j),$.add(Se)}else G_(Ee,Z,j),$.add(Ee)}),A=N.pop(),$},this.compileAsync=function(v,V,Z=null){let $=this.compile(v,V,Z);return new Promise(j=>{function Ee(){if($.forEach(function(De){y.get(De).currentProgram.isReady()&&$.delete(De)}),$.size===0){j(v);return}setTimeout(Ee,10)}Qe.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let eh=null;function eM(v){eh&&eh(v)}function W_(){Kr.stop()}function j_(){Kr.start()}let Kr=new qb;Kr.setAnimationLoop(eM),typeof self<"u"&&Kr.setContext(self),this.setAnimationLoop=function(v){eh=v,ee.setAnimationLoop(v),v===null?Kr.stop():Kr.start()},ee.addEventListener("sessionstart",W_),ee.addEventListener("sessionend",j_),this.render=function(v,V){if(V!==void 0&&V.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;let Z=ee.enabled===!0&&ee.isPresenting===!0,$=_!==null&&(L===null||Z)&&_.begin(b,L);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(V),V=ee.getCamera()),v.isScene===!0&&v.onBeforeRender(b,v,V,L),A=ce.get(v,N.length),A.init(V),N.push(A),Me.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Q.setFromProjectionMatrix(Me,pi,V.reversedDepth),K=this.localClippingEnabled,k=le.init(this.clippingPlanes,K),M=Ve.get(v,R.length),M.init(),R.push(M),ee.enabled===!0&&ee.isPresenting===!0){let De=b.xr.getDepthSensingMesh();De!==null&&th(De,V,-1/0,b.sortObjects)}th(v,V,0,b.sortObjects),M.finish(),b.sortObjects===!0&&M.sort(dt,ct),ye=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,ye&&Fe.addToRenderList(M,v),this.info.render.frame++,k===!0&&le.beginShadows();let j=A.state.shadowsArray;if(be.render(j,v,V),k===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset(),($&&_.hasRenderPass())===!1){let De=M.opaque,Se=M.transmissive;if(A.setupLights(),V.isArrayCamera){let Oe=V.cameras;if(Se.length>0)for(let Ue=0,Ye=Oe.length;Ue<Ye;Ue++){let tt=Oe[Ue];q_(De,Se,v,tt)}ye&&Fe.render(v);for(let Ue=0,Ye=Oe.length;Ue<Ye;Ue++){let tt=Oe[Ue];$_(M,v,tt,tt.viewport)}}else Se.length>0&&q_(De,Se,v,V),ye&&Fe.render(v),$_(M,v,V)}L!==null&&F===0&&(U.updateMultisampleRenderTarget(L),U.updateRenderTargetMipmap(L)),$&&_.end(b),v.isScene===!0&&v.onAfterRender(b,v,V),me.resetDefaultState(),Y=-1,H=null,N.pop(),N.length>0?(A=N[N.length-1],k===!0&&le.setGlobalState(b.clippingPlanes,A.state.camera)):A=null,R.pop(),R.length>0?M=R[R.length-1]:M=null};function th(v,V,Z,$){if(v.visible===!1)return;if(v.layers.test(V.layers)){if(v.isGroup)Z=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(V);else if(v.isLight)A.pushLight(v),v.castShadow&&A.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Q.intersectsSprite(v)){$&&pe.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Me);let De=Ie.update(v),Se=v.material;Se.visible&&M.push(v,De,Se,Z,pe.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Q.intersectsObject(v))){let De=Ie.update(v),Se=v.material;if($&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),pe.copy(v.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),pe.copy(De.boundingSphere.center)),pe.applyMatrix4(v.matrixWorld).applyMatrix4(Me)),Array.isArray(Se)){let Oe=De.groups;for(let Ue=0,Ye=Oe.length;Ue<Ye;Ue++){let tt=Oe[Ue],Be=Se[tt.materialIndex];Be&&Be.visible&&M.push(v,De,Be,Z,pe.z,tt)}}else Se.visible&&M.push(v,De,Se,Z,pe.z,null)}}let Ee=v.children;for(let De=0,Se=Ee.length;De<Se;De++)th(Ee[De],V,Z,$)}function $_(v,V,Z,$){let{opaque:j,transmissive:Ee,transparent:De}=v;A.setupLightsView(Z),k===!0&&le.setGlobalState(b.clippingPlanes,Z),$&&Te.viewport(B.copy($)),j.length>0&&jc(j,V,Z),Ee.length>0&&jc(Ee,V,Z),De.length>0&&jc(De,V,Z),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function q_(v,V,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[$.id]===void 0){let Be=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[$.id]=new Vn(1,1,{generateMipmaps:!0,type:Be?Ui:Gn,minFilter:Yr,samples:Math.max(4,st.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace})}let Ee=A.state.transmissionRenderTarget[$.id],De=$.viewport||B;Ee.setSize(De.z*b.transmissionResolutionScale,De.w*b.transmissionResolutionScale);let Se=b.getRenderTarget(),Oe=b.getActiveCubeFace(),Ue=b.getActiveMipmapLevel();b.setRenderTarget(Ee),b.getClearColor(D),ie=b.getClearAlpha(),ie<1&&b.setClearColor(16777215,.5),b.clear(),ye&&Fe.render(Z);let Ye=b.toneMapping;b.toneMapping=mi;let tt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),A.setupLightsView($),k===!0&&le.setGlobalState(b.clippingPlanes,$),jc(v,Z,$),U.updateMultisampleRenderTarget(Ee),U.updateRenderTargetMipmap(Ee),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let At=0,zt=V.length;At<zt;At++){let Bt=V[At],{object:It,geometry:sn,material:Le,group:Tn}=Bt;if(Le.side===Li&&It.layers.test($.layers)){let ht=Le.side;Le.side=vn,Le.needsUpdate=!0,X_(It,Z,$,sn,Le,Tn),Le.side=ht,Le.needsUpdate=!0,Be=!0}}Be===!0&&(U.updateMultisampleRenderTarget(Ee),U.updateRenderTargetMipmap(Ee))}b.setRenderTarget(Se,Oe,Ue),b.setClearColor(D,ie),tt!==void 0&&($.viewport=tt),b.toneMapping=Ye}function jc(v,V,Z){let $=V.isScene===!0?V.overrideMaterial:null;for(let j=0,Ee=v.length;j<Ee;j++){let De=v[j],{object:Se,geometry:Oe,group:Ue}=De,Ye=De.material;Ye.allowOverride===!0&&$!==null&&(Ye=$),Se.layers.test(Z.layers)&&X_(Se,V,Z,Oe,Ye,Ue)}}function X_(v,V,Z,$,j,Ee){v.onBeforeRender(b,V,Z,$,j,Ee),v.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),j.onBeforeRender(b,V,Z,$,v,Ee),j.transparent===!0&&j.side===Li&&j.forceSinglePass===!1?(j.side=vn,j.needsUpdate=!0,b.renderBufferDirect(Z,V,$,j,v,Ee),j.side=pr,j.needsUpdate=!0,b.renderBufferDirect(Z,V,$,j,v,Ee),j.side=Li):b.renderBufferDirect(Z,V,$,j,v,Ee),v.onAfterRender(b,V,Z,$,j,Ee)}function $c(v,V,Z){V.isScene!==!0&&(V=Ce);let $=y.get(v),j=A.state.lights,Ee=A.state.shadowsArray,De=j.state.version,Se=he.getParameters(v,j.state,Ee,V,Z),Oe=he.getProgramCacheKey(Se),Ue=$.programs;$.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?V.environment:null,$.fog=V.fog;let Ye=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;$.envMap=ne.get(v.envMap||$.environment,Ye),$.envMapRotation=$.environment!==null&&v.envMap===null?V.environmentRotation:v.envMapRotation,Ue===void 0&&(v.addEventListener("dispose",Mt),Ue=new Map,$.programs=Ue);let tt=Ue.get(Oe);if(tt!==void 0){if($.currentProgram===tt&&$.lightsStateVersion===De)return Z_(v,Se),tt}else Se.uniforms=he.getUniforms(v),v.onBeforeCompile(Se,b),tt=he.acquireProgram(Se,Oe),Ue.set(Oe,tt),$.uniforms=Se.uniforms;let Be=$.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Be.clippingPlanes=le.uniform),Z_(v,Se),$.needsLights=iM(v),$.lightsStateVersion=De,$.needsLights&&(Be.ambientLightColor.value=j.state.ambient,Be.lightProbe.value=j.state.probe,Be.directionalLights.value=j.state.directional,Be.directionalLightShadows.value=j.state.directionalShadow,Be.spotLights.value=j.state.spot,Be.spotLightShadows.value=j.state.spotShadow,Be.rectAreaLights.value=j.state.rectArea,Be.ltc_1.value=j.state.rectAreaLTC1,Be.ltc_2.value=j.state.rectAreaLTC2,Be.pointLights.value=j.state.point,Be.pointLightShadows.value=j.state.pointShadow,Be.hemisphereLights.value=j.state.hemi,Be.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Be.spotLightMatrix.value=j.state.spotLightMatrix,Be.spotLightMap.value=j.state.spotLightMap,Be.pointShadowMatrix.value=j.state.pointShadowMatrix),$.currentProgram=tt,$.uniformsList=null,tt}function Y_(v){if(v.uniformsList===null){let V=v.currentProgram.getUniforms();v.uniformsList=aa.seqWithValue(V.seq,v.uniforms)}return v.uniformsList}function Z_(v,V){let Z=y.get(v);Z.outputColorSpace=V.outputColorSpace,Z.batching=V.batching,Z.batchingColor=V.batchingColor,Z.instancing=V.instancing,Z.instancingColor=V.instancingColor,Z.instancingMorph=V.instancingMorph,Z.skinning=V.skinning,Z.morphTargets=V.morphTargets,Z.morphNormals=V.morphNormals,Z.morphColors=V.morphColors,Z.morphTargetsCount=V.morphTargetsCount,Z.numClippingPlanes=V.numClippingPlanes,Z.numIntersection=V.numClipIntersection,Z.vertexAlphas=V.vertexAlphas,Z.vertexTangents=V.vertexTangents,Z.toneMapping=V.toneMapping}function tM(v,V,Z,$,j){V.isScene!==!0&&(V=Ce),U.resetTextureUnits();let Ee=V.fog,De=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?V.environment:null,Se=L===null?b.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Us,Oe=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ue=ne.get($.envMap||De,Oe),Ye=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,tt=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Be=!!Z.morphAttributes.position,At=!!Z.morphAttributes.normal,zt=!!Z.morphAttributes.color,Bt=mi;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Bt=b.toneMapping);let It=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,sn=It!==void 0?It.length:0,Le=y.get($),Tn=A.state.lights;if(k===!0&&(K===!0||v!==H)){let Jt=v===H&&$.id===Y;le.setState($,v,Jt)}let ht=!1;$.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==Tn.state.version||Le.outputColorSpace!==Se||j.isBatchedMesh&&Le.batching===!1||!j.isBatchedMesh&&Le.batching===!0||j.isBatchedMesh&&Le.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Le.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Le.instancing===!1||!j.isInstancedMesh&&Le.instancing===!0||j.isSkinnedMesh&&Le.skinning===!1||!j.isSkinnedMesh&&Le.skinning===!0||j.isInstancedMesh&&Le.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Le.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Le.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Le.instancingMorph===!1&&j.morphTexture!==null||Le.envMap!==Ue||$.fog===!0&&Le.fog!==Ee||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==le.numPlanes||Le.numIntersection!==le.numIntersection)||Le.vertexAlphas!==Ye||Le.vertexTangents!==tt||Le.morphTargets!==Be||Le.morphNormals!==At||Le.morphColors!==zt||Le.toneMapping!==Bt||Le.morphTargetsCount!==sn)&&(ht=!0):(ht=!0,Le.__version=$.version);let Qn=Le.currentProgram;ht===!0&&(Qn=$c($,V,j));let yi=!1,Qr=!1,Ys=!1,Pt=Qn.getUniforms(),tn=Le.uniforms;if(Te.useProgram(Qn.program)&&(yi=!0,Qr=!0,Ys=!0),$.id!==Y&&(Y=$.id,Qr=!0),yi||H!==v){Te.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Pt.setValue(I,"projectionMatrix",v.projectionMatrix),Pt.setValue(I,"viewMatrix",v.matrixWorldInverse);let xr=Pt.map.cameraPosition;xr!==void 0&&xr.setValue(I,_e.setFromMatrixPosition(v.matrixWorld)),st.logarithmicDepthBuffer&&Pt.setValue(I,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Pt.setValue(I,"isOrthographic",v.isOrthographicCamera===!0),H!==v&&(H=v,Qr=!0,Ys=!0)}if(Le.needsLights&&(Tn.state.directionalShadowMap.length>0&&Pt.setValue(I,"directionalShadowMap",Tn.state.directionalShadowMap,U),Tn.state.spotShadowMap.length>0&&Pt.setValue(I,"spotShadowMap",Tn.state.spotShadowMap,U),Tn.state.pointShadowMap.length>0&&Pt.setValue(I,"pointShadowMap",Tn.state.pointShadowMap,U)),j.isSkinnedMesh){Pt.setOptional(I,j,"bindMatrix"),Pt.setOptional(I,j,"bindMatrixInverse");let Jt=j.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),Pt.setValue(I,"boneTexture",Jt.boneTexture,U))}j.isBatchedMesh&&(Pt.setOptional(I,j,"batchingTexture"),Pt.setValue(I,"batchingTexture",j._matricesTexture,U),Pt.setOptional(I,j,"batchingIdTexture"),Pt.setValue(I,"batchingIdTexture",j._indirectTexture,U),Pt.setOptional(I,j,"batchingColorTexture"),j._colorsTexture!==null&&Pt.setValue(I,"batchingColorTexture",j._colorsTexture,U));let vr=Z.morphAttributes;if((vr.position!==void 0||vr.normal!==void 0||vr.color!==void 0)&&we.update(j,Z,Qn),(Qr||Le.receiveShadow!==j.receiveShadow)&&(Le.receiveShadow=j.receiveShadow,Pt.setValue(I,"receiveShadow",j.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&V.environment!==null&&(tn.envMapIntensity.value=V.environmentIntensity),tn.dfgLUT!==void 0&&(tn.dfgLUT.value=TO()),Qr&&(Pt.setValue(I,"toneMappingExposure",b.toneMappingExposure),Le.needsLights&&nM(tn,Ys),Ee&&$.fog===!0&&ke.refreshFogUniforms(tn,Ee),ke.refreshMaterialUniforms(tn,$,ve,fe,A.state.transmissionRenderTarget[v.id]),aa.upload(I,Y_(Le),tn,U)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(aa.upload(I,Y_(Le),tn,U),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Pt.setValue(I,"center",j.center),Pt.setValue(I,"modelViewMatrix",j.modelViewMatrix),Pt.setValue(I,"normalMatrix",j.normalMatrix),Pt.setValue(I,"modelMatrix",j.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let Jt=$.uniformsGroups;for(let xr=0,Zs=Jt.length;xr<Zs;xr++){let J_=Jt[xr];Ae.update(J_,Qn),Ae.bind(J_,Qn)}}return Qn}function nM(v,V){v.ambientLightColor.needsUpdate=V,v.lightProbe.needsUpdate=V,v.directionalLights.needsUpdate=V,v.directionalLightShadows.needsUpdate=V,v.pointLights.needsUpdate=V,v.pointLightShadows.needsUpdate=V,v.spotLights.needsUpdate=V,v.spotLightShadows.needsUpdate=V,v.rectAreaLights.needsUpdate=V,v.hemisphereLights.needsUpdate=V}function iM(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(v,V,Z){let $=y.get(v);$.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),y.get(v.texture).__webglTexture=V,y.get(v.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Z,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,V){let Z=y.get(v);Z.__webglFramebuffer=V,Z.__useDefaultFramebuffer=V===void 0};let rM=I.createFramebuffer();this.setRenderTarget=function(v,V=0,Z=0){L=v,w=V,F=Z;let $=null,j=!1,Ee=!1;if(v){let Se=y.get(v);if(Se.__useDefaultFramebuffer!==void 0){Te.bindFramebuffer(I.FRAMEBUFFER,Se.__webglFramebuffer),B.copy(v.viewport),P.copy(v.scissor),T=v.scissorTest,Te.viewport(B),Te.scissor(P),Te.setScissorTest(T),Y=-1;return}else if(Se.__webglFramebuffer===void 0)U.setupRenderTarget(v);else if(Se.__hasExternalTextures)U.rebindTextures(v,y.get(v.texture).__webglTexture,y.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ye=v.depthTexture;if(Se.__boundDepthTexture!==Ye){if(Ye!==null&&y.has(Ye)&&(v.width!==Ye.image.width||v.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(v)}}let Oe=v.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Ee=!0);let Ue=y.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ue[V])?$=Ue[V][Z]:$=Ue[V],j=!0):v.samples>0&&U.useMultisampledRTT(v)===!1?$=y.get(v).__webglMultisampledFramebuffer:Array.isArray(Ue)?$=Ue[Z]:$=Ue,B.copy(v.viewport),P.copy(v.scissor),T=v.scissorTest}else B.copy(te).multiplyScalar(ve).floor(),P.copy(ue).multiplyScalar(ve).floor(),T=G;if(Z!==0&&($=rM),Te.bindFramebuffer(I.FRAMEBUFFER,$)&&Te.drawBuffers(v,$),Te.viewport(B),Te.scissor(P),Te.setScissorTest(T),j){let Se=y.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+V,Se.__webglTexture,Z)}else if(Ee){let Se=V;for(let Oe=0;Oe<v.textures.length;Oe++){let Ue=y.get(v.textures[Oe]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Oe,Ue.__webglTexture,Z,Se)}}else if(v!==null&&Z!==0){let Se=y.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Se.__webglTexture,Z)}Y=-1},this.readRenderTargetPixels=function(v,V,Z,$,j,Ee,De,Se=0){if(!(v&&v.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=y.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&De!==void 0&&(Oe=Oe[De]),Oe){Te.bindFramebuffer(I.FRAMEBUFFER,Oe);try{let Ue=v.textures[Se],Ye=Ue.format,tt=Ue.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Se),!st.textureFormatReadable(Ye)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!st.textureTypeReadable(tt)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=v.width-$&&Z>=0&&Z<=v.height-j&&I.readPixels(V,Z,$,j,ge.convert(Ye),ge.convert(tt),Ee)}finally{let Ue=L!==null?y.get(L).__webglFramebuffer:null;Te.bindFramebuffer(I.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(v,V,Z,$,j,Ee,De,Se=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=y.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&De!==void 0&&(Oe=Oe[De]),Oe)if(V>=0&&V<=v.width-$&&Z>=0&&Z<=v.height-j){Te.bindFramebuffer(I.FRAMEBUFFER,Oe);let Ue=v.textures[Se],Ye=Ue.format,tt=Ue.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Se),!st.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!st.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Be=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Be),I.bufferData(I.PIXEL_PACK_BUFFER,Ee.byteLength,I.STREAM_READ),I.readPixels(V,Z,$,j,ge.convert(Ye),ge.convert(tt),0);let At=L!==null?y.get(L).__webglFramebuffer:null;Te.bindFramebuffer(I.FRAMEBUFFER,At);let zt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Eb(I,zt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Be),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Ee),I.deleteBuffer(Be),I.deleteSync(zt),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,V=null,Z=0){let $=Math.pow(2,-Z),j=Math.floor(v.image.width*$),Ee=Math.floor(v.image.height*$),De=V!==null?V.x:0,Se=V!==null?V.y:0;U.setTexture2D(v,0),I.copyTexSubImage2D(I.TEXTURE_2D,Z,0,0,De,Se,j,Ee),Te.unbindTexture()};let sM=I.createFramebuffer(),oM=I.createFramebuffer();this.copyTextureToTexture=function(v,V,Z=null,$=null,j=0,Ee=0){let De,Se,Oe,Ue,Ye,tt,Be,At,zt,Bt=v.isCompressedTexture?v.mipmaps[Ee]:v.image;if(Z!==null)De=Z.max.x-Z.min.x,Se=Z.max.y-Z.min.y,Oe=Z.isBox3?Z.max.z-Z.min.z:1,Ue=Z.min.x,Ye=Z.min.y,tt=Z.isBox3?Z.min.z:0;else{let tn=Math.pow(2,-j);De=Math.floor(Bt.width*tn),Se=Math.floor(Bt.height*tn),v.isDataArrayTexture?Oe=Bt.depth:v.isData3DTexture?Oe=Math.floor(Bt.depth*tn):Oe=1,Ue=0,Ye=0,tt=0}$!==null?(Be=$.x,At=$.y,zt=$.z):(Be=0,At=0,zt=0);let It=ge.convert(V.format),sn=ge.convert(V.type),Le;V.isData3DTexture?(U.setTexture3D(V,0),Le=I.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(U.setTexture2DArray(V,0),Le=I.TEXTURE_2D_ARRAY):(U.setTexture2D(V,0),Le=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,V.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,V.unpackAlignment);let Tn=I.getParameter(I.UNPACK_ROW_LENGTH),ht=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Qn=I.getParameter(I.UNPACK_SKIP_PIXELS),yi=I.getParameter(I.UNPACK_SKIP_ROWS),Qr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Bt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Bt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ue),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ye),I.pixelStorei(I.UNPACK_SKIP_IMAGES,tt);let Ys=v.isDataArrayTexture||v.isData3DTexture,Pt=V.isDataArrayTexture||V.isData3DTexture;if(v.isDepthTexture){let tn=y.get(v),vr=y.get(V),Jt=y.get(tn.__renderTarget),xr=y.get(vr.__renderTarget);Te.bindFramebuffer(I.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Te.bindFramebuffer(I.DRAW_FRAMEBUFFER,xr.__webglFramebuffer);for(let Zs=0;Zs<Oe;Zs++)Ys&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(v).__webglTexture,j,tt+Zs),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(V).__webglTexture,Ee,zt+Zs)),I.blitFramebuffer(Ue,Ye,De,Se,Be,At,De,Se,I.DEPTH_BUFFER_BIT,I.NEAREST);Te.bindFramebuffer(I.READ_FRAMEBUFFER,null),Te.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(j!==0||v.isRenderTargetTexture||y.has(v)){let tn=y.get(v),vr=y.get(V);Te.bindFramebuffer(I.READ_FRAMEBUFFER,sM),Te.bindFramebuffer(I.DRAW_FRAMEBUFFER,oM);for(let Jt=0;Jt<Oe;Jt++)Ys?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,tn.__webglTexture,j,tt+Jt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,tn.__webglTexture,j),Pt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,vr.__webglTexture,Ee,zt+Jt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,vr.__webglTexture,Ee),j!==0?I.blitFramebuffer(Ue,Ye,De,Se,Be,At,De,Se,I.COLOR_BUFFER_BIT,I.NEAREST):Pt?I.copyTexSubImage3D(Le,Ee,Be,At,zt+Jt,Ue,Ye,De,Se):I.copyTexSubImage2D(Le,Ee,Be,At,Ue,Ye,De,Se);Te.bindFramebuffer(I.READ_FRAMEBUFFER,null),Te.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Pt?v.isDataTexture||v.isData3DTexture?I.texSubImage3D(Le,Ee,Be,At,zt,De,Se,Oe,It,sn,Bt.data):V.isCompressedArrayTexture?I.compressedTexSubImage3D(Le,Ee,Be,At,zt,De,Se,Oe,It,Bt.data):I.texSubImage3D(Le,Ee,Be,At,zt,De,Se,Oe,It,sn,Bt):v.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Ee,Be,At,De,Se,It,sn,Bt.data):v.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Ee,Be,At,Bt.width,Bt.height,It,Bt.data):I.texSubImage2D(I.TEXTURE_2D,Ee,Be,At,De,Se,It,sn,Bt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Tn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ht),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Qn),I.pixelStorei(I.UNPACK_SKIP_ROWS,yi),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Qr),Ee===0&&V.generateMipmaps&&I.generateMipmap(Le),Te.unbindTexture()},this.initRenderTarget=function(v){y.get(v).__webglFramebuffer===void 0&&U.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?U.setTextureCube(v,0):v.isData3DTexture?U.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?U.setTexture2DArray(v,0):U.setTexture2D(v,0),Te.unbindTexture()},this.resetState=function(){w=0,F=0,L=null,Te.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var Kb=(n,e)=>e.key,AO=(n,e)=>e.player.id,IO=(n,e)=>e.turn_index,z_=(n,e)=>e.id,RO=(n,e)=>e.card_id+"-"+e.player_id;function NO(n,e){n&1&&(W(0,"main",1)(1,"section",2)(2,"p"),se(3,"Loading mission state..."),q()()())}function PO(n,e){if(n&1&&(W(0,"section",4)(1,"span",16),se(2),q()()),n&2){let t=Re(2);re(2),Xe(t.noticeText)}}function FO(n,e){if(n&1&&(W(0,"option",14),se(1),q()),n&2){let t=e.$implicit,i=Re(2);Ir("value",t),re(),Xe(i.roleLabels[t])}}function OO(n,e){if(n&1){let t=bn();W(0,"main",1)(1,"section",3),wt(2,PO,3,1,"section",4),W(3,"div",5),Sn(4,"img",6),W(5,"div",7)(6,"h2"),se(7,"Silent Wake: Tactical Command"),q(),W(8,"p",8),se(9," A turn-based tactical naval card game. Coordinate with your fellow officers to survive the 10-turn campaign. "),q(),W(10,"div",9),se(11," Each role has unique capabilities. The Chief Officer (CO) manages the final strategy, while Officers provide the tactical solutions. Communication and timing are critical to success. "),q()()(),W(12,"div",10)(13,"h3"),se(14,"Join Session"),q(),W(15,"p"),se(16),q()(),W(17,"form",11,0),St("ngSubmit",function(){mt(t);let r=Re();return gt(r.join())}),W(19,"input",12),To("ngModelChange",function(r){mt(t);let s=Re();return Ga(s.joinName,r)||(s.joinName=r),gt(r)}),q(),W(20,"select",13),To("ngModelChange",function(r){mt(t);let s=Re();return Ga(s.joinRole,r)||(s.joinRole=r),gt(r)}),Fn(21,FO,2,2,"option",14,Ha),q(),W(23,"button",15),se(24,"Join"),q()()()()}if(n&2){let t=Re();re(2),Tt(t.noticeText?2:-1),re(14),Ut("Choose a role for room ",t.game.room.code,"."),re(3),wo("ngModel",t.joinName),re(),wo("ngModel",t.joinRole),re(),On(t.validRoles)}}function LO(n,e){if(n&1&&(W(0,"button",28),se(1),q(),W(2,"button",28),se(3),q()),n&2){let t=Re(4);re(),Ut("Played Cards ",t.game.turn_data.active_cards.length),re(2),Ut("Committed ",t.selectedCommitIds.length)}}function kO(n,e){if(n&1&&(W(0,"div",26)(1,"span",27),se(2),q(),W(3,"span",27),se(4),q(),wt(5,LO,4,2),q()),n&2){let t=Re(3);re(2),As("Turn ",t.game.game_metadata.current_turn,"/",t.totalTurns()),re(2),Ut("Timer ",t.fmtSeconds(t.game.turn_data.timer_remaining)),re(),Tt(t.player.role==="co"?5:-1)}}function UO(n,e){if(n&1&&(W(0,"div",23),se(1),q(),W(2,"section",24)(3,"div")(4,"div",25),se(5),q(),W(6,"h1"),se(7,"Silent Wake"),q(),W(8,"p"),se(9),q()(),wt(10,kO,6,4,"div",26),q()),n&2){let t=Re(2);re(),Xe(t.roleLabels[t.player.role]||t.player.role),re(4),As("",t.game.scenario_meta.title," \u2022 ",t.game.game_metadata.phase),re(4),Xe(t.game.scenario_meta.description),re(),Tt(t.game.room.hasStarted?10:-1)}}function BO(n,e){n&1&&(W(0,"span",16),se(1,"Realtime offline"),q())}function VO(n,e){if(n&1&&(W(0,"span",29),se(1),q()),n&2){let t=Re(3);re(),Xe(t.flashMessage)}}function HO(n,e){if(n&1&&(W(0,"span",16),se(1),q()),n&2){let t=Re(3);re(),Xe(t.noticeText)}}function zO(n,e){if(n&1&&(W(0,"section",4),wt(1,BO,2,0,"span",16),wt(2,VO,2,1,"span",29),wt(3,HO,2,1,"span",16),q()),n&2){let t=Re(2);re(),Tt(t.connectionStatus!=="online"?1:-1),re(),Tt(t.flashMessage?2:-1),re(),Tt(t.noticeText?3:-1)}}function GO(n,e){n&1&&Sn(0,"div",37)}function WO(n,e){if(n&1&&(W(0,"article",39)(1,"div"),se(2),q(),W(3,"div",40),se(4),q()()),n&2){let t=e.$implicit;re(),wu(Tu("system-icon status-",t.value.toLowerCase())),re(),Xe(t.icon),re(2),Xe(t.label)}}function jO(n,e){if(n&1&&(W(0,"section",30)(1,"div",31)(2,"div")(3,"h3"),se(4,"Stress"),q()(),W(5,"span",27),se(6),q()(),W(7,"div",32)(8,"span",33),se(9,"Cold"),q(),W(10,"div",34),Sn(11,"div",35),W(12,"div",36),Fn(13,GO,1,0,"div",37,Ha),q()(),W(15,"span",33),se(16,"Hot"),q()()(),W(17,"section",38),Fn(18,WO,5,5,"article",39,Kb),q()),n&2){let t=Re(2);re(6),Ut("Level ",t.game.game_metadata.stress_level,"/10"),re(5),Cu("width",t.game.game_metadata.stress_level*10,"%"),re(2),On(t.heatScale()),re(5),On(t.systemTiles())}}function $O(n,e){if(n&1&&(W(0,"div",43)(1,"strong"),se(2),q(),W(3,"div",47),se(4),q(),W(5,"div"),se(6),q(),W(7,"div"),se(8),q()()),n&2){let t=e.$implicit,i=Re(3);re(2),Xe(t.player.name),re(2),Xe(i.roleLabels[t.player.role]||t.player.role),re(2),Ut("Correct: ",t.correct),re(2),Ut("Incorrect: ",t.incorrect)}}function qO(n,e){if(n&1&&(W(0,"div",43)(1,"div",31)(2,"strong"),se(3),q(),W(4,"span",27),se(5),q()(),W(6,"div",47),se(7),q(),W(8,"div",47),se(9),q(),W(10,"div",47),se(11),q()()),n&2){let t=e.$implicit,i=Re(3);re(3),Ut("Turn ",t.turn_index),re(2),Xe(t.outcome),re(2),Ut("Matched: ",i.csv(t.matched)),re(2),Ut("Missed: ",i.csv(t.missed)),re(2),Ut("Bad: ",i.csv(t.bad_cards))}}function XO(n,e){if(n&1&&(W(0,"article",39)(1,"div"),se(2),q(),W(3,"div",40),se(4),q()()),n&2){let t=e.$implicit;re(),wu(Tu("system-icon status-",t.value.toLowerCase())),re(),Xe(t.icon),re(2),Xe(t.label)}}function YO(n,e){if(n&1){let t=bn();W(0,"div",48)(1,"button",49),St("click",function(){mt(t);let r=Re(3);return gt(r.resetRoom())}),se(2,"Start Next Scenario"),q(),W(3,"button",46),St("click",function(){mt(t);let r=Re(3);return gt(r.refresh())}),se(4,"Refresh State"),q()(),W(5,"form",50),St("ngSubmit",function(){mt(t);let r=Re(3);return gt(r.uploadScenario())}),W(6,"input",51),St("change",function(r){mt(t);let s=Re(3);return gt(s.onScenarioSelected(r))}),q(),W(7,"button",52),se(8,"Upload Scenario"),q()(),W(9,"div",41),se(10,"Reset the room to return everyone to the waiting room and launch the next run."),q()}}function ZO(n,e){n&1&&(W(0,"div",41),se(1,"Waiting for the Game Admin to reset the room for the next scenario."),q())}function JO(n,e){if(n&1){let t=bn();W(0,"section",17)(1,"section",2)(2,"h2"),se(3,"Mission Rating"),q(),W(4,"p"),se(5),q(),W(6,"div",41),se(7,"The scoring dashboard is triggered automatically after Turn 10."),q()(),W(8,"section",2)(9,"h2"),se(10,"Player Statistics"),q(),W(11,"div",42),Fn(12,$O,9,4,"div",43,AO),q()()(),W(14,"section",17)(15,"section",44)(16,"h3"),se(17,"Turn History"),q(),W(18,"div",42),Fn(19,qO,12,5,"div",43,IO),q()(),W(21,"section",44)(22,"h3"),se(23,"System Snapshot"),q(),W(24,"div",45),Fn(25,XO,5,5,"article",39,Kb),q()()(),W(27,"section",44),wt(28,YO,11,0)(29,ZO,2,0,"div",41),W(30,"button",46),St("click",function(){mt(t);let r=Re(2);return gt(r.clearSession())}),se(31,"Clear Local Session"),q()()}if(n&2){let t=Re(2);re(5),Xe(t.game.game_metadata.final_rating),re(7),On(t.playerStatistics()),re(7),On(t.reversedHistory()),re(6),On(t.systemTiles()),re(3),Tt(t.isAdmin()?28:29)}}function KO(n,e){if(n&1&&(W(0,"div",53)(1,"div",57)(2,"small"),se(3,"Phase"),q(),W(4,"strong"),se(5),q()(),W(6,"div",57)(7,"small"),se(8,"Turn"),q(),W(9,"strong"),se(10),q()(),W(11,"div",57)(12,"small"),se(13,"Timer"),q(),W(14,"strong"),se(15),q()(),W(16,"div",57)(17,"small"),se(18,"Score"),q(),W(19,"strong"),se(20),q()()()),n&2){let t=Re(3);re(5),Xe(t.game.game_metadata.phase),re(5),As("",t.game.game_metadata.current_turn,"/",t.totalTurns()),re(5),Xe(t.fmtSeconds(t.game.turn_data.timer_remaining)),re(5),Xe(t.game.game_metadata.mission_score)}}function QO(n,e){n&1&&(W(0,"span",29),se(1,"\u2713 scenario loaded"),q())}function eL(n,e){n&1&&(W(0,"span",47),se(1,"Upload required before countdown."),q())}function tL(n,e){if(n&1&&(W(0,"div",41),se(1),q()),n&2){let t=Re(4);re(),Xe(t.countdownBlockerMessage())}}function nL(n,e){if(n&1){let t=bn();W(0,"div",48)(1,"button",46),St("click",function(){mt(t);let r=Re(3);return gt(r.resetRoom())}),se(2,"Reset Room"),q(),W(3,"button",58),St("click",function(){mt(t);let r=Re(3);return gt(r.startCountdown())}),se(4,"Start Countdown"),q(),W(5,"button",46),St("click",function(){mt(t);let r=Re(3);return gt(r.refresh())}),se(6,"Refresh State"),q()(),W(7,"form",59),St("ngSubmit",function(){mt(t);let r=Re(3);return gt(r.uploadScenario())}),W(8,"input",51),St("change",function(r){mt(t);let s=Re(3);return gt(s.onScenarioSelected(r))}),q(),W(9,"button",52),se(10,"Upload Scenario"),q()(),W(11,"div",41),se(12," Scenario: "),wt(13,QO,2,0,"span",29)(14,eL,2,0,"span",47),q(),wt(15,tL,2,1,"div",41)}if(n&2){let t=Re(3);re(3),Ir("disabled",!t.canStartCountdown()),re(10),Tt(t.scenarioUploaded()?13:14),re(2),Tt(t.canStartCountdown()?-1:15)}}function iL(n,e){n&1&&(W(0,"p",47),se(1,"Waiting for Game Admin to initiate launch."),q())}function rL(n,e){if(n&1&&(W(0,"div",54),ys(),W(1,"svg",60),Sn(2,"path",61)(3,"path",62),q()()),n&2){let t=Re(3);re(3),Pn("stroke-dasharray",t.countdownRemaining()*10+", 100")}}function sL(n,e){if(n&1&&(W(0,"div",56)(1,"div")(2,"strong"),se(3),q(),W(4,"div",47),se(5),q()(),W(6,"span",27),se(7),q()()),n&2){let t=e.$implicit,i=Re(3);re(3),Xe(t.name),re(2),Xe(i.roleLabels[t.role]||t.role),re(2),Xe(t.connected?"online":"offline")}}function oL(n,e){if(n&1&&(W(0,"section",17)(1,"section",2)(2,"h2"),se(3),q(),W(4,"p"),se(5),q(),wt(6,KO,21,5,"div",53),wt(7,nL,16,3)(8,iL,2,0,"p",47),wt(9,rL,4,1,"div",54),q(),W(10,"section",2)(11,"h2"),se(12,"Roster"),q(),W(13,"div",55),Fn(14,sL,8,3,"div",56,z_),q()()()),n&2){let t=Re(2);re(3),Xe(t.isAdmin()?"Waiting Room":t.game.room.hasStarted?"Control Center":"Waiting Room"),re(2),Ut(" ",t.isAdmin()?"Players are staged here until the admin starts the 10 second countdown.":t.game.room.hasStarted?"Active Mission: "+t.game.scenario_meta.title:"Players are staged here until the admin starts the 10 second countdown."," "),re(),Tt(t.isAdmin()&&t.game.room.hasStarted?6:-1),re(),Tt(t.isAdmin()?7:8),re(2),Tt(t.game.room.startCountdownEndsAt?9:-1),re(5),On(t.game.players)}}function aL(n,e){n&1&&(W(0,"div",47),se(1,"No officers have played a card yet."),q())}function cL(n,e){if(n&1){let t=bn();W(0,"article",67),Sn(1,"div",68),W(2,"div",69)(3,"div",70),se(4),q(),W(5,"div",27),se(6),q()(),W(7,"div",71)(8,"h4"),se(9),q()(),W(10,"p"),se(11),q(),W(12,"div",72)(13,"div",73)(14,"button",49),St("click",function(){let r=mt(t).$implicit,s=Re(3);return gt(s.toggleCommitCard(r.card_id))}),se(15),q()()()()}if(n&2){let t=e.$implicit,i=Re(3);Mn("co-commit-card-selected",i.isCommittedCard(t.card_id)),re(4),Xe(i.roleLabels[t.role]||t.role),re(2),Xe(t.player_name),re(3),Xe((t.card==null?null:t.card.name)||t.card_id),re(2),Xe((t.card==null?null:t.card.desc)||"No card description available."),re(3),Mn("secondary",i.isCommittedCard(t.card_id)),re(),Ut(" ",i.isCommittedCard(t.card_id)?"Committed":"Commit Card"," ")}}function lL(n,e){if(n&1){let t=bn();W(0,"section",2)(1,"h2"),se(2,"Chief Officer Board"),q(),W(3,"p"),se(4),q(),W(5,"div",48)(6,"button",63),St("click",function(){mt(t);let r=Re(2);return gt(r.startTurn())}),se(7,"Start Turn"),q(),W(8,"button",58),St("click",function(){mt(t);let r=Re(2);return gt(r.commitTurn())}),se(9," Commit Final Answer "),q()(),W(10,"div",41),se(11,"Only the Chief Officer can commit the final answer."),q()(),W(12,"section",64)(13,"section",2)(14,"h3"),se(15,"Played Cards"),q(),W(16,"div",65),wt(17,aL,2,0,"div",47),Fn(18,cL,16,9,"article",66,RO),q()()()}if(n&2){let t,i=Re(2);re(4),Xe(((t=i.currentTurn())==null?null:t.context)||"Awaiting mission data."),re(2),Mn("start-turn-button-pulse",i.game.game_metadata.phase==="briefing"),Ir("disabled",i.game.game_metadata.phase!=="briefing"),re(2),Ir("disabled",i.game.game_metadata.phase!=="action"||i.game.turn_data.active_cards.length===0),re(9),Tt(i.game.turn_data.active_cards.length===0?17:-1),re(),On(i.activeCardsForCo())}}function uL(n,e){if(n&1){let t=bn();W(0,"div",83)(1,"article",85),St("dragstart",function(r){let s=mt(t),o=Re(4);return gt(o.onSlotCardDragStart(r,s.id))})("dragend",function(){mt(t);let r=Re(4);return gt(r.onCardDragEnd())}),W(2,"button",86),St("click",function(){let r=mt(t),s=Re(4);return gt(s.removeCard(r.id))}),se(3,"\xD7"),q(),Sn(4,"div",87),W(5,"div",70),se(6),q(),W(7,"strong"),se(8),q()()()}if(n&2){let t=e,i=Re(4);re(),Pn("data-card-id",t.id)("data-slot-card-id",t.id),re(5),Xe(i.roleLabels[i.player.role]),re(2),Xe(t.name)}}function dL(n,e){n&1&&Sn(0,"div",84)}function fL(n,e){if(n&1){let t=bn();W(0,"div",82),St("dragover",function(r){let s=mt(t).$implicit,o=Re(3);return gt(o.onSlotDragOver(r,s))})("drop",function(r){let s=mt(t).$implicit,o=Re(3);return gt(o.onSlotDrop(r,s))}),wt(1,uL,9,4,"div",83)(2,dL,1,0,"div",84),q()}if(n&2){let t,i=e.$implicit,r=Re(3);Mn("armed-slot-filled",r.slotCard(i))("armed-slot-drop-target",r.canDropIntoSlot(i)),Pn("data-slot-index",i),re(),Tt((t=r.slotCard(i))?1:2,t)}}function hL(n,e){n&1&&(W(0,"div",80)(1,"strong"),se(2,"Hand is full deployed"),q(),W(3,"div",47),se(4,"Drag a slotted card back here or use the remove icon."),q()())}function pL(n,e){if(n&1){let t=bn();W(0,"article",88),St("dragstart",function(r){let s=mt(t).$implicit,o=Re(3);return gt(o.onHandCardDragStart(r,s.id))})("dragend",function(){mt(t);let r=Re(3);return gt(r.onCardDragEnd())}),Sn(1,"div",68),W(2,"div",69)(3,"div",70),se(4),q()(),W(5,"div",71)(6,"h4"),se(7),q()(),W(8,"p"),se(9),q(),W(10,"div",72)(11,"div",73)(12,"button",58),St("click",function(){let r=mt(t).$implicit,s=Re(3);return gt(s.playCard(r.id,s.nextAvailableSlotIndex()))}),se(13,"Play"),q()()()()}if(n&2){let t=e.$implicit,i=Re(3);Mn("card-dragging",i.isLaunchingCard(t.id)),Pn("data-card-id",t.id)("data-hand-card-id",t.id),re(4),Xe(i.roleLabels[i.player.role]),re(3),Xe(t.name),re(2),Xe(t.desc),re(3),Ir("disabled",!i.canPlayCard(t.id))}}function mL(n,e){if(n&1){let t=bn();W(0,"section",18)(1,"section",2)(2,"h2"),se(3),q(),W(4,"p"),se(5),q(),W(6,"div",74)(7,"div",31)(8,"strong"),se(9,"Armed Cards"),q(),W(10,"span",27),se(11),q()(),W(12,"div",75),Fn(13,fL,3,6,"div",76,Ha),q(),W(15,"div",41),se(16,"Players can arm one, two, or three cards and still hot-swap while the timer is active. "),q()()(),W(17,"section",77)(18,"div",78)(19,"div")(20,"h3"),se(21,"Your Card Hand"),q(),W(22,"div",47),se(23,"Choose the one, two, or three cards you want to send upward."),q()()(),W(24,"div",79),St("dragover",function(r){mt(t);let s=Re(2);return gt(s.onHandDropZoneOver(r))})("drop",function(r){mt(t);let s=Re(2);return gt(s.onHandDrop(r))}),wt(25,hL,5,0,"div",80),Fn(26,pL,14,8,"article",81,z_),q()()()}if(n&2){let t,i=Re(2);re(3),Xe(i.roleLabels[i.player.role]),re(2),Xe(((t=i.currentTurn())==null?null:t.context)||"Awaiting mission data."),re(6),Ut("",i.activeSelections().length,"/3 selected"),re(2),On(i.cardSlots()),re(11),Mn("hand-drop-target",i.canDropIntoHand()),re(),Tt(i.availablePlayerCards().length===0?25:-1),re(),On(i.availablePlayerCards())}}function gL(n,e){n&1&&(W(0,"div",47),se(1,"No traffic yet."),q())}function _L(n,e){if(n&1&&(W(0,"div",92)(1,"strong"),se(2),q(),W(3,"div",47),se(4),q(),W(5,"div"),se(6),q()()),n&2){let t=e.$implicit,i=Re(4);re(2),Xe(t.player_name),re(2),Xe(i.roleLabels[t.role]||t.role),re(2),Xe(t.text)}}function yL(n,e){if(n&1){let t=bn();W(0,"div",91),wt(1,gL,2,0,"div",47),Fn(2,_L,7,3,"div",92,z_),q(),W(4,"form",93),St("ngSubmit",function(){mt(t);let r=Re(3);return gt(r.sendChat())}),W(5,"input",94),To("ngModelChange",function(r){mt(t);let s=Re(3);return Ga(s.chatDraft,r)||(s.chatDraft=r),gt(r)}),q(),W(6,"button",15),se(7,"Send"),q()()}if(n&2){let t=Re(3);re(),Tt(t.game.chat.length===0?1:-1),re(),On(t.game.chat),re(3),wo("ngModel",t.chatDraft)}}function vL(n,e){if(n&1){let t=bn();W(0,"aside",89)(1,"button",90),St("click",function(){mt(t);let r=Re(2);return gt(r.toggleChatPanel())}),se(2),q(),W(3,"div",31)(4,"h3"),se(5,"Chat"),q(),W(6,"span",47),se(7),q()(),wt(8,yL,8,2),q()}if(n&2){let t=Re(2);Mn("chat-drawer-collapsed",!t.chatPanelOpen),re(),Mn("chat-handle-pulse",t.chatHandlePulse&&!t.chatPanelOpen),re(),Ut(" ",t.chatPanelOpen?"Chat \u3009":"\u3008 Chat"," "),re(5),Xe(t.chatPanelOpen?"Room comms open":"Room comms closed"),re(),Tt(t.chatPanelOpen?8:-1)}}function xL(n,e){if(n&1&&(W(0,"div",20)(1,"div",95)(2,"div",25),se(3),q(),W(4,"h3"),se(5),q(),W(6,"p"),se(7),q(),W(8,"div",54),ys(),W(9,"svg",60),Sn(10,"path",61)(11,"path",62),q()(),_o(),W(12,"div",41),se(13),q()()()),n&2){let t=Re(2);re(3),Ut("Briefing \u2022 Turn ",t.currentTurn().turn_index),re(2),Xe(t.currentTurn().title),re(2),Xe(t.currentTurn().context),re(4),Pn("stroke-dasharray",t.briefingCountdownRemaining()*10+", 100"),re(2),Ut(" ",t.player.role==="co"?"Chief Officer starts the turn when ready.":"Timer remains paused until the Chief Officer starts the turn."," ")}}function EL(n,e){if(n&1&&(W(0,"div",21)(1,"div",96)(2,"div",25),se(3,"Action Window Closing"),q(),W(4,"div",54),ys(),W(5,"svg",60),Sn(6,"path",61)(7,"path",62),q()(),_o(),W(8,"p"),se(9,"Turn auto-resolves at zero, even without officer or Chief Officer responses."),q()()()),n&2){let t=Re(2);re(7),Pn("stroke-dasharray",t.actionCountdownRemaining()*10+", 100")}}function SL(n,e){if(n&1&&(W(0,"div",97)(1,"p",98),se(2),q(),W(3,"div",99),se(4),q()()),n&2){let t=Re(3);re(2),Ut('"',t.currentTransitionQuote.text,'"'),re(2),As("",t.currentTransitionQuote.author," \xB7 ",t.currentTransitionQuote.role)}}function bL(n,e){if(n&1&&(W(0,"div",22)(1,"div",95)(2,"div",25),se(3,"Transition"),q(),W(4,"div",54),ys(),W(5,"svg",60),Sn(6,"path",61)(7,"path",62),q()(),wt(8,SL,5,3,"div",97),_o(),W(9,"p"),se(10),q()()()),n&2){let t=Re(2);re(7),Pn("stroke-dasharray",t.game.transition_remaining*10+", 100"),re(),Tt(t.currentTransitionQuote?8:-1),re(2),Ut("Next turn in ",t.game.transition_remaining," seconds.")}}function ML(n,e){if(n&1&&(W(0,"main",1),wt(1,UO,11,5),wt(2,zO,4,3,"section",4),wt(3,jO,20,3),wt(4,JO,32,2)(5,oL,16,5,"section",17)(6,lL,20,6)(7,mL,28,6,"section",18),q(),wt(8,vL,9,7,"aside",19),wt(9,xL,14,5,"div",20),wt(10,EL,10,1,"div",21),wt(11,bL,11,3,"div",22)),n&2){let t=Re();re(),Tt(t.isAdmin()?-1:1),re(),Tt(t.connectionStatus!=="online"||t.noticeText||t.flashMessage?2:-1),re(),Tt(!t.isAdmin()&&t.game.room.hasStarted&&t.game.game_metadata.phase!=="game_over"?3:-1),re(),Tt(!t.isAdmin()&&t.game.game_metadata.phase==="game_over"?4:!t.game.room.hasStarted||t.isAdmin()?5:t.player.role==="co"?6:7),re(4),Tt(t.player?8:-1),re(),Tt(t.showBriefingOverlay()&&t.currentTurn()?9:-1),re(),Tt(t.showActionCountdownOverlay()?10:-1),re(),Tt(!t.isAdmin()&&t.game.game_metadata.phase==="transition"?11:-1)}}var Qb=(()=>{class n{cdr=nt(Ao);zone=nt(gn);transitionQuotes=[{text:"England expects that every man will do his duty.",author:"Horatio Nelson",role:"Vice Admiral"},{text:"I have not yet begun to fight!",author:"John Paul Jones",role:"Naval Captain"},{text:"Damn the torpedoes, full speed ahead!",author:"David Farragut",role:"Admiral"},{text:"Uncommon valor was a common virtue.",author:"Chester W. Nimitz",role:"Fleet Admiral"},{text:"We have met the enemy and they are ours.",author:"Oliver Hazard Perry",role:"Commodore"},{text:"A ship without Marines is like a garment without buttons.",author:"David Dixon Porter",role:"Admiral"},{text:"Those who seek death shall live, and those who seek life shall die.",author:"Yi Sun-sin",role:"Admiral"},{text:"It takes the Navy three years to build a ship; it will take three hundred to build a tradition.",author:"Andrew Cunningham",role:"Admiral"},{text:"There are no great people in this world, only great challenges which ordinary people rise to meet.",author:"William Halsey Jr.",role:"Fleet Admiral"},{text:"We're surrounded. That simplifies the problem.",author:"Chesty Puller",role:"Lieutenant General, USMC"},{text:"War is a racket.",author:"Smedley Butler",role:"Major General, USMC"},{text:"The deadliest weapon in the world is a Marine and his rifle.",author:"John A. Lejeune",role:"Lieutenant General, USMC"},{text:"The bended knee is not a tradition of our Corps.",author:"Alexander Vandegrift",role:"General, USMC"},{text:"War is merely the continuation of policy by other means.",author:"Carl von Clausewitz",role:"General"},{text:"No plan of operations extends with certainty beyond the first encounter with the enemy's main strength.",author:"Helmuth von Moltke the Elder",role:"Field Marshal"},{text:"In war, the moral is to the physical as three is to one.",author:"Napoleon Bonaparte",role:"General"},{text:"An army marches on its stomach.",author:"Napoleon Bonaparte",role:"General"},{text:"Never interrupt your enemy when he is making a mistake.",author:"Napoleon Bonaparte",role:"General"},{text:"Lead me, follow me, or get out of my way.",author:"George S. Patton",role:"General"},{text:"A good plan violently executed now is better than a perfect plan next week.",author:"George S. Patton",role:"General"},{text:"Courage is fear holding on a minute longer.",author:"George S. Patton",role:"General"},{text:"Never tell people how to do things. Tell them what to do and they will surprise you.",author:"George S. Patton",role:"General"},{text:"Old soldiers never die; they just fade away.",author:"Douglas MacArthur",role:"General of the Army"},{text:"There is no substitute for victory.",author:"Douglas MacArthur",role:"General of the Army"},{text:"It is fatal to enter any war without the will to win it.",author:"Douglas MacArthur",role:"General of the Army"},{text:"Plans are worthless, but planning is everything.",author:"Dwight D. Eisenhower",role:"General of the Army"},{text:"The supreme quality for leadership is unquestionably integrity.",author:"Dwight D. Eisenhower",role:"General of the Army"},{text:"The art of war is simple enough. Find out where your enemy is. Get at him as soon as you can.",author:"Ulysses S. Grant",role:"General"},{text:"War is cruelty, and you cannot refine it.",author:"William T. Sherman",role:"General"},{text:"War is hell.",author:"William T. Sherman",role:"General"},{text:"Nothing except a battle lost can be half so melancholy as a battle won.",author:"Arthur Wellesley",role:"Field Marshal"},{text:"The most powerful weapon on earth is the human soul on fire.",author:"Ferdinand Foch",role:"Marshal"},{text:"Don't fight a battle if you don't gain anything by winning.",author:"Erwin Rommel",role:"Field Marshal"},{text:"The best form of welfare for the troops is first-class training.",author:"Erwin Rommel",role:"Field Marshal"},{text:"Discipline is the soul of an army.",author:"George Washington",role:"General"},{text:"To be prepared for war is one of the most effective means of preserving peace.",author:"George Washington",role:"General"},{text:"Train hard, fight easy.",author:"Alexander Suvorov",role:"Generalissimo"},{text:"The bullet is a fool, the bayonet is a fine chap.",author:"Alexander Suvorov",role:"Generalissimo"},{text:"Know your enemy and know yourself, and you can fight a hundred battles without disaster.",author:"Sun Tzu",role:"General and Strategist"},{text:"To subdue the enemy without fighting is the acme of skill.",author:"Sun Tzu",role:"General and Strategist"},{text:"Victorious warriors win first and then go to war.",author:"Sun Tzu",role:"General and Strategist"},{text:"He will win who knows when to fight and when not to fight.",author:"Sun Tzu",role:"General and Strategist"},{text:"Attack him where he is unprepared, appear where you are not expected.",author:"Sun Tzu",role:"General and Strategist"},{text:"If a man says he is not afraid of dying, he is either lying or is a Gurkha.",author:"Sam Manekshaw",role:"Field Marshal"},{text:"There will be no withdrawal without written orders, and these orders shall never be issued.",author:"Sam Manekshaw",role:"Field Marshal"},{text:"The only thing harder than getting a new idea into the military mind is to get an old one out.",author:"B. H. Liddell Hart",role:"Captain and Military Historian"},{text:"The soldier's heart, the soldier's spirit, the soldier's soul are everything.",author:"George C. Marshall",role:"General of the Army"},{text:"When placed in command, take charge.",author:"Norman Schwarzkopf",role:"General"},{text:"The truth of the matter is that you always know the right thing to do. The hard part is doing it.",author:"Norman Schwarzkopf",role:"General"},{text:"If we come to a minefield, our infantry attacks exactly as if it were not there.",author:"Georgy Zhukov",role:"Marshal"},{text:"Leadership is intangible, and therefore no weapon ever designed can replace it.",author:"Omar Bradley",role:"General of the Army"},{text:"A leader is a dealer in hope.",author:"Napoleon Bonaparte",role:"General"}];systemMeta={NAV_RADAR:{label:"Nav Radar",icon:"\u25CE"},NAV_CONSOLE:{label:"Console",icon:"\u2318"},NAV_SENSORS:{label:"Sensors",icon:"\u25C9"},ASUW_TRACKING:{label:"Tracking",icon:"\u2316"},COMMS:{label:"Comms",icon:"\u2301"},AAW_RADAR:{label:"AAW Radar",icon:"\u2726"}};roleLabels={admin:"Game Admin",co:"Chief Officer",cyber_officer:"Cyber Officer",air_officer:"Air Officer",naval_officer:"Naval Officer",submarine_officer:"Submarine Officer"};validRoles=Object.keys(this.roleLabels);scenario=null;game=null;session=this.loadSession();selectedCommitIds=[];noticeText="";flashMessage="";connectionStatus="offline";joinName="";joinRole="admin";chatDraft="";selectedScenarioFile=null;chatPanelOpen=!1;currentTransitionQuote=null;chatHandlePulse=!1;draggedHandCardId=null;draggedSlotCardId=null;socket=null;flashTimeout=null;chatPulseTimeout=null;viewTicker=null;launchingCardIds=new Set;transferCanvas=null;transferRenderer=null;transferScene=null;transferCamera=null;transferFrame=null;lastTransitionQuoteKey=null;get player(){return this.session?.player||null}async ngOnInit(){try{this.startViewTicker(),await this.refreshScenario(),await this.refreshState(),await this.restoreSession(),this.session?.token&&this.connectSocket(),this.renderNow()}catch(t){this.noticeText=this.errorMessage(t),this.renderNow()}}ngOnDestroy(){this.viewTicker&&(clearInterval(this.viewTicker),this.viewTicker=null),this.chatPulseTimeout&&(clearTimeout(this.chatPulseTimeout),this.chatPulseTimeout=null),this.disposeTransferEffect(),this.disconnectSocket()}fmtSeconds(t){let i=Math.floor(t/60).toString().padStart(2,"0"),r=Math.max(0,t%60).toString().padStart(2,"0");return`${i}:${r}`}csv(t){return t.length?t.join(", "):"none"}currentTurn(){return!this.scenario||!this.game?null:this.scenario.turns.find(t=>t.turn_index===this.game.game_metadata.current_turn)||null}totalTurns(){return this.scenario?.turns.length||0}heatScale(){return[1,2,3,4,5,6,7,8,9,10]}systemEntries(){return Object.entries(this.game?.systems||{}).map(([t,i])=>({key:t,value:i}))}systemTiles(){return this.systemEntries().map(t=>_t(ot({},t),{label:this.systemMeta[t.key]?.label||t.key,icon:this.systemMeta[t.key]?.icon||"\u25CF"}))}reversedHistory(){return[...this.game?.turn_history||[]].reverse()}isAdmin(){return this.player?.role==="admin"}countdownRemaining(){return this.game?.room.startCountdownEndsAt?Math.max(0,Math.ceil((this.game.room.startCountdownEndsAt-Date.now())/1e3)):0}briefingCountdownRemaining(){let t=this.game?.turn_data.briefing_started_at;return t?Math.max(0,Math.ceil((t+1e4-Date.now())/1e3)):0}actionCountdownRemaining(){return this.game?.game_metadata.phase!=="action"?0:Math.max(0,this.game.turn_data.timer_remaining)}showBriefingOverlay(){return this.player?.role!=="admin"&&this.game?.game_metadata.phase==="briefing"&&this.briefingCountdownRemaining()>0}showActionCountdownOverlay(){return this.player?.role!=="admin"&&this.player?.role!=="co"&&this.game?.game_metadata.phase==="action"&&this.actionCountdownRemaining()>0&&this.actionCountdownRemaining()<=10}syncTransitionQuote(t){if(t.game_metadata.phase!=="transition"){this.currentTransitionQuote=null,this.lastTransitionQuoteKey=null;return}let i=String(t.game_metadata.current_turn);this.lastTransitionQuoteKey===i&&this.currentTransitionQuote||(this.lastTransitionQuoteKey=i,this.currentTransitionQuote=this.transitionQuotes[Math.floor(Math.random()*this.transitionQuotes.length)]||null)}scenarioUploaded(){return!!this.game?.game_metadata.scenario_uploaded}requiredRoles(){return this.scenario?["admin","co",...this.scenario.roles]:[]}missingRequiredRoles(){let t=new Set((this.game?.players||[]).map(i=>i.role));return this.requiredRoles().filter(i=>!t.has(i))}canStartCountdown(){return this.scenarioUploaded()&&this.missingRequiredRoles().length===0}countdownBlockerMessage(){if(!this.scenarioUploaded())return"Upload a scenario before starting the countdown.";let t=this.missingRequiredRoles();return t.length>0?`Missing required roles: ${t.map(i=>this.roleLabels[i]||i).join(", ")}.`:""}playerCards(){let t=this.currentTurn();return!t||!this.player?[]:t.cards[this.player.role]||[]}availablePlayerCards(){return this.playerCards().filter(t=>!this.hasActiveCard(t.id))}activeSelections(){return(this.game?.turn_data.active_cards||[]).filter(t=>t.player_id===this.player?.id).sort((t,i)=>t.played_at-i.played_at)}activeSelectionCards(){return this.activeSelections().map(t=>this.resolveCardById(t.card_id)).filter(t=>!!t)}slotCard(t){return this.activeSelectionCards()[t]||null}hasActiveCard(t){return this.activeSelections().some(i=>i.card_id===t)}cardSlots(){return[0,1,2]}nextAvailableSlotIndex(){return this.activeSelections().length}canPlayCard(t){return this.canInteract()&&!this.hasActiveCard(t)&&this.activeSelections().length<3}canDropIntoSlot(t){return this.canInteract()&&!!this.draggedHandCardId&&t===this.nextAvailableSlotIndex()}canDropIntoHand(){return this.canInteract()&&!!this.draggedSlotCardId}isLaunchingCard(t){return this.launchingCardIds.has(t)}canInteract(){return this.game?.game_metadata.phase==="action"&&this.connectionStatus==="online"}activeCardsForCo(){return(this.game?.turn_data.active_cards||[]).map(t=>_t(ot({},t),{card:this.resolveCardById(t.card_id)})).sort((t,i)=>t.role.localeCompare(i.role))}playerStatistics(){return(this.game?.players||[]).filter(i=>i.role!=="admin").map(i=>{let r=0,s=0;for(let o of this.game?.turn_history||[]){let a=o.summary.played_cards.find(c=>c.player_id===i.id);a&&(o.matched.includes(a.card_id)?r+=1:s+=1)}return{player:i,correct:r,incorrect:s}})}isCommittedCard(t){return this.selectedCommitIds.includes(t)}toggleCommitCard(t){this.selectedCommitIds=this.isCommittedCard(t)?this.selectedCommitIds.filter(i=>i!==t):[...new Set([...this.selectedCommitIds,t])]}toggleChatPanel(){this.chatPanelOpen=!this.chatPanelOpen,this.chatPanelOpen&&(this.chatHandlePulse=!1,this.chatPulseTimeout&&(clearTimeout(this.chatPulseTimeout),this.chatPulseTimeout=null)),this.renderNow()}syncChatHandlePulse(t,i){let r=t?.chat.at(-1)?.id||null,s=i.chat.at(-1)?.id||null;!s||r===s||this.chatPanelOpen||(this.chatHandlePulse=!0,this.chatPulseTimeout&&clearTimeout(this.chatPulseTimeout),this.chatPulseTimeout=setTimeout(()=>{this.zone.run(()=>{this.chatHandlePulse=!1,this.chatPulseTimeout=null,this.renderNow()})},4e3))}onScenarioSelected(t){let i=t.target;this.selectedScenarioFile=i.files?.[0]||null}async join(){try{this.noticeText="";let t=await this.api("/api/v1/join",{method:"POST",body:{name:this.joinName,role:this.joinRole}});this.session={player:t.player,token:t.session_token},this.saveSession(),this.connectSocket(),this.flash(`Joined as ${this.roleLabels[t.player.role]}.`)}catch(t){this.zone.run(()=>{this.noticeText=this.errorMessage(t)}),this.renderNow()}}async resetRoom(){await this.run(async()=>{await this.api("/api/v1/create_room",{method:"POST",body:{room_code:this.game?.room.code||"alpha-room"}}),this.selectedCommitIds=[],this.flash("Room reset.")})}async startCountdown(){await this.run(async()=>{if(!this.canStartCountdown())throw new Error(this.countdownBlockerMessage());await this.api("/api/v1/start_game_countdown",{method:"POST"}),this.flash("Countdown started.")})}async refresh(){await this.run(async()=>{await this.refreshScenario(),await this.refreshState(),this.flash("State refreshed.")})}async uploadScenario(){await this.run(async()=>{if(!this.selectedScenarioFile)throw new Error("Choose a scenario file first.");let t=new FormData;t.append("scenario",this.selectedScenarioFile),await this.api("/api/v1/load_scenario",{method:"POST",body:t}),await this.refreshScenario(),await this.refreshState(),this.flash("Scenario loaded."),this.selectedScenarioFile=null})}async startTurn(){await this.run(async()=>{await this.api("/api/v1/start_turn",{method:"POST"})})}async commitTurn(){await this.run(async()=>{await this.api("/api/v1/commit_turn",{method:"POST",body:{card_ids:this.selectedCommitIds}}),this.selectedCommitIds=[]})}async playCard(t,i=this.nextAvailableSlotIndex()){await this.run(async()=>{let r=this.createCardSnapshot(`[data-hand-card-id="${t}"]`);this.launchingCardIds.add(t),this.renderNow();try{await this.emitSocket("PLAY_CARD",{cardId:t}),await this.animateSnapshotTo(r,`[data-slot-index="${i}"]`)}catch(s){throw this.launchingCardIds.delete(t),this.renderNow(),s}})}async removeCard(t){await this.run(async()=>{await this.emitSocket("REMOVE_CARD",t?{cardId:t}:{})})}onHandCardDragStart(t,i){if(!this.canPlayCard(i)){t.preventDefault();return}this.draggedHandCardId=i,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",i)),this.renderNow()}onSlotCardDragStart(t,i){if(!this.canInteract()){t.preventDefault();return}this.draggedSlotCardId=i,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",i)),this.renderNow()}onCardDragEnd(){this.draggedHandCardId=null,this.draggedSlotCardId=null,this.renderNow()}onSlotDragOver(t,i){this.canDropIntoSlot(i)&&(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"))}async onSlotDrop(t,i){if(!this.draggedHandCardId||!this.canDropIntoSlot(i))return;t.preventDefault();let r=this.draggedHandCardId;this.draggedHandCardId=null,await this.playCard(r,i)}onHandDropZoneOver(t){this.canDropIntoHand()&&(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"))}async onHandDrop(t){if(!this.draggedSlotCardId)return;t.preventDefault();let i=this.draggedSlotCardId,r=this.createCardSnapshot(`[data-slot-card-id="${i}"]`);this.draggedSlotCardId=null,await this.run(async()=>{await this.emitSocket("REMOVE_CARD",{cardId:i}),await this.animateSnapshotTo(r,"[data-hand-dropzone='true']")})}async sendChat(){await this.run(async()=>{let t=this.chatDraft.trim();t&&(await this.emitSocket("CHAT_MESSAGE",{text:t}),this.chatDraft="")})}clearSession(){this.session=null,localStorage.removeItem("silent-wake-session"),this.disconnectSocket(),this.selectedCommitIds=[],this.zone.run(()=>{this.noticeText="",this.flashMessage=""})}resolveCardById(t){let i=this.currentTurn();if(!i)return null;for(let[r,s]of Object.entries(i.cards)){let o=s.find(a=>a.id===t);if(o)return _t(ot({},o),{role:r})}return null}loadSession(){try{let t=localStorage.getItem("silent-wake-session");return t?JSON.parse(t):null}catch{return null}}saveSession(){this.session&&localStorage.setItem("silent-wake-session",JSON.stringify(this.session))}async restoreSession(){if(this.session?.token)try{let t=await this.api("/api/v1/resume_session",{method:"POST"});this.session={player:t.player,token:this.session.token},this.saveSession()}catch{this.clearSession()}}connectSocket(){this.session?.token&&(this.disconnectSocket(),this.socket=hc({auth:{token:this.session.token},transports:["websocket"],timeout:2e3}),this.socket.on("connect",()=>{this.zone.run(()=>{this.connectionStatus="online",this.zone.run(()=>{this.noticeText=""}),this.renderNow()})}),this.socket.on("disconnect",()=>{this.zone.run(()=>{this.connectionStatus="offline",this.renderNow()})}),this.socket.on("connect_error",t=>{this.zone.run(()=>{this.connectionStatus="offline",this.noticeText=t.message||"Socket connection failed.",this.renderNow()})}),this.socket.on("STATE_UPDATE",async t=>{await this.zone.run(async()=>{this.syncChatHandlePulse(this.game,t),this.syncTransitionQuote(t),this.game=t;for(let i of t.turn_data.active_cards)this.launchingCardIds.delete(i.card_id);t.game_metadata.phase!=="action"&&this.launchingCardIds.clear(),this.scenario?.version!==t.scenario_version&&await this.refreshScenario(),this.renderNow()})}),this.socket.on("SCENARIO_UPDATED",t=>{this.zone.run(()=>{this.scenario=t,this.renderNow()})}),this.socket.on("TURN_RESOLVED",()=>{this.zone.run(()=>{this.selectedCommitIds=[],this.renderNow()})}),this.socket.on("SERVER_ERROR",t=>{this.zone.run(()=>{this.noticeText=t.message,this.renderNow()})}))}disconnectSocket(){this.socket&&(this.socket.removeAllListeners(),this.socket.disconnect(),this.socket=null),this.connectionStatus="offline"}async emitSocket(t,i){if(!this.socket||!this.socket.connected)throw new Error("Socket is not connected.");await new Promise((r,s)=>{this.socket.timeout(2e3).emit(t,i,(o,a)=>{if(o){s(new Error("Socket request timed out."));return}if(!a?.ok){s(new Error(a?.error||"Socket request failed."));return}r()})})}async refreshScenario(){this.scenario=await this.api("/api/v1/scenario")}async refreshState(){let t=await this.api("/api/v1/state");this.syncChatHandlePulse(this.game,t),this.syncTransitionQuote(t),this.game=t}async api(t,i={}){let r={},s=i.body instanceof FormData,o;i.body!==void 0&&(o=s?i.body:JSON.stringify(i.body)),s||(r["Content-Type"]="application/json"),this.session?.token&&(r["x-session-token"]=this.session.token);let a=await fetch(t,{method:i.method||"GET",headers:r,body:o}),c;try{c=await a.json()}catch{c={error:`HTTP ${a.status}: ${a.statusText}`}}if(!a.ok)throw new Error(c.error||"Request failed");return c}flash(t){this.flashMessage=t,this.renderNow(),this.flashTimeout&&clearTimeout(this.flashTimeout),this.flashTimeout=setTimeout(()=>{this.zone.run(()=>{this.flashMessage=""}),this.renderNow()},3e3)}async run(t){try{this.noticeText="",await t()}catch(i){this.noticeText=this.errorMessage(i),this.renderNow()}}errorMessage(t){return t instanceof Error?t.message:"Request failed"}renderNow(){this.cdr.detectChanges()}startViewTicker(){this.viewTicker&&clearInterval(this.viewTicker),this.viewTicker=setInterval(()=>{(this.game?.game_metadata.phase==="briefing"||this.game?.room.startCountdownEndsAt||this.showActionCountdownOverlay())&&this.renderNow()},1e3)}createCardSnapshot(t){let i=document.querySelector(t);return i?i.cloneNode(!0):null}async animateSnapshotTo(t,i){if(!t)return;let r=document.querySelector(i);if(!r)return;let s=t.getAttribute("data-card-id"),o=s?document.querySelector(`[data-card-id="${s}"]`):null;if(!o)return;let a=o.getBoundingClientRect(),c=r.getBoundingClientRect();await this.animateThreeCardTransfer(t,a,c)}async animateThreeCardTransfer(t,i,r){if(this.ensureTransferEffect(),!this.transferRenderer||!this.transferScene||!this.transferCamera)return;this.transferFrame!==null&&(cancelAnimationFrame(this.transferFrame),this.transferFrame=null),this.transferScene.clear();let s=t.querySelector("h4")?.textContent?.trim()||t.querySelector("strong")?.textContent?.trim()||"Card",o=t.querySelector(".role-label")?.textContent?.trim()||"",a=this.buildTransferTexture(s,o),c=new fr,l=i.width,u=i.height,f=new dn(new _r(l*.92,u*.92),new gr({color:132875,transparent:!0,opacity:.28}));f.position.set(10,-14,-6),c.add(f);let d=new dn(new _r(l*1.12,u*1.12),new gr({color:8378367,transparent:!0,opacity:.14}));d.position.z=-4,c.add(d);let h=new dn(new _r(l,u),new gr({map:a,transparent:!0}));c.add(h),this.transferScene.add(c);let m=window.innerWidth,E=window.innerHeight,g=i.left+i.width/2-m/2,p=E/2-(i.top+i.height/2),x=r.left+r.width/2-m/2,S=E/2-(r.top+r.height/2),M=900,A=performance.now();await new Promise(R=>{let N=_=>{if(!this.transferRenderer||!this.transferScene||!this.transferCamera){R();return}let b=Math.min(1,(_-A)/M),z=1-Math.pow(1-b,3),w=Math.sin(z*Math.PI)*92;if(c.position.x=g+(x-g)*z,c.position.y=p+(S-p)*z+w,c.position.z=Math.sin(z*Math.PI)*30,c.scale.set(1,1,1),c.rotation.x=.38-z*.28,c.rotation.y=-.34+z*.34,c.rotation.z=.045*Math.sin(z*Math.PI*1.2),f.material.opacity=.2+Math.sin(z*Math.PI)*.08,d.material.opacity=.1+Math.sin(z*Math.PI)*.12,this.transferRenderer.render(this.transferScene,this.transferCamera),b<1){this.transferFrame=requestAnimationFrame(N);return}a.dispose(),h.material.dispose(),f.material.dispose(),d.material.dispose(),h.geometry.dispose(),f.geometry.dispose(),d.geometry.dispose(),this.transferScene.clear(),this.transferRenderer.render(this.transferScene,this.transferCamera),this.transferFrame=null,R()};this.transferFrame=requestAnimationFrame(N)})}ensureTransferEffect(){this.transferRenderer&&this.transferScene&&this.transferCamera&&this.transferCanvas||(this.transferCanvas=document.createElement("canvas"),this.transferCanvas.className="floating-card-transfer",document.body.appendChild(this.transferCanvas),this.transferRenderer=new Jf({canvas:this.transferCanvas,alpha:!0,antialias:!0}),this.transferRenderer.setPixelRatio(window.devicePixelRatio||1),this.transferScene=new wc,this.transferCamera=new Hs,this.resizeTransferEffect(),window.addEventListener("resize",this.handleTransferResize))}buildTransferTexture(t,i){let r=document.createElement("canvas");r.width=512,r.height=720;let s=r.getContext("2d");if(!s)return new ta(r);let o=s.createLinearGradient(0,0,r.width,r.height);o.addColorStop(0,"#2d7fb8"),o.addColorStop(.55,"#13314b"),o.addColorStop(1,"#09141f"),s.fillStyle=o,s.fillRect(0,0,r.width,r.height);let a=s.createLinearGradient(0,0,r.width*.68,r.height*.4);a.addColorStop(0,"rgba(255,255,255,0.24)"),a.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=a,s.fillRect(0,0,r.width,r.height*.45),s.strokeStyle="rgba(225,245,255,0.18)",s.lineWidth=8,s.strokeRect(24,24,r.width-48,r.height-48),s.fillStyle="#9ed8ff",s.font="700 26px Trebuchet MS",s.fillText(i.toUpperCase(),44,64),s.fillStyle="#eef9ff",s.font="700 54px Trebuchet MS";let c=t.split(" "),l=[],u="";for(let d of c){let h=u?`${u} ${d}`:d;s.measureText(h).width>r.width-88?(l.push(u),u=d):u=h}u&&l.push(u),l.slice(0,3).forEach((d,h)=>{s.fillText(d,44,184+h*68)}),s.fillStyle="rgba(255,255,255,0.08)",s.fillRect(44,r.height-180,r.width-88,2),s.fillRect(44,r.height-142,r.width-148,2);let f=new ta(r);return f.colorSpace=yn,f}resizeTransferEffect(){if(!this.transferRenderer||!this.transferCamera)return;let t=window.innerWidth,i=window.innerHeight;this.transferRenderer.setSize(t,i,!1),this.transferCamera.left=-t/2,this.transferCamera.right=t/2,this.transferCamera.top=i/2,this.transferCamera.bottom=-i/2,this.transferCamera.near=-1e3,this.transferCamera.far=1e3,this.transferCamera.position.set(0,0,20),this.transferCamera.updateProjectionMatrix()}handleTransferResize=()=>{this.resizeTransferEffect()};disposeTransferEffect(){this.transferFrame!==null&&(cancelAnimationFrame(this.transferFrame),this.transferFrame=null),window.removeEventListener("resize",this.handleTransferResize),this.transferRenderer?.dispose(),this.transferCanvas?.remove(),this.transferRenderer=null,this.transferScene=null,this.transferCamera=null,this.transferCanvas=null}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Lm({type:n,selectors:[["app-root"]],decls:3,vars:1,consts:[["joinForm","ngForm"],[1,"shell"],[1,"panel"],[1,"panel","join-panel"],[1,"notice-row"],[1,"join-hero"],["src","ship.png","alt","Naval Command",1,"join-logo"],[1,"join-content"],[1,"join-description"],[1,"join-explanation"],[1,"join-form-header"],[1,"grid","two",3,"ngSubmit"],["name","playerName","maxlength","40","placeholder","Player name","required","",3,"ngModelChange","ngModel"],["name","playerRole",3,"ngModelChange","ngModel"],[3,"value"],["type","submit"],[1,"notice","error"],[1,"grid","two"],[1,"officer-stack"],[1,"chat-drawer","panel","compact",3,"chat-drawer-collapsed"],[1,"overlay"],[1,"action-countdown-overlay"],[1,"transition-overlay"],[1,"role-corner-badge"],[1,"hero"],[1,"turn-banner"],[1,"pill-row"],[1,"pill"],["type","button",1,"secondary","header-info-button"],[1,"notice","ok"],[1,"panel","compact","stress-strip"],[1,"row-between"],[1,"stress-scale"],[1,"stress-edge"],[1,"stress-bar-track"],[1,"stress-bar-fill"],[1,"stress-bar-markers"],[1,"stress-marker"],[1,"system-rail"],[1,"system-chip","panel","compact"],[1,"system-label"],[1,"footer-note"],[1,"history-list"],[1,"history-item"],[1,"panel","compact"],[1,"system-rail","system-rail-static"],[1,"secondary",3,"click"],[1,"muted"],[1,"toolbar"],[3,"click"],[1,"toolbar",3,"ngSubmit"],["type","file","accept",".json,application/json",3,"change"],["type","submit",1,"secondary"],[1,"stat-grid",2,"margin","20px 0"],[1,"countdown-timer-circle"],[1,"roster-list"],[1,"roster-item"],[1,"stat"],[3,"click","disabled"],[1,"toolbar",2,"margin-top","2rem",3,"ngSubmit"],["viewBox","0 0 36 36"],["d","M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",1,"circle-bg"],["d","M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",1,"circle"],[1,"start-turn-button",3,"click","disabled"],[1,"grid"],[1,"selection-list"],[1,"card","game-card","co-commit-card",3,"co-commit-card-selected"],[1,"card","game-card","co-commit-card"],[1,"card-shine"],[1,"card-topline"],[1,"role-label"],[1,"card-title-block"],[1,"card-actions"],[1,"card-button-row"],[1,"armed-board"],[1,"armed-slots"],[1,"armed-slot",3,"armed-slot-filled","armed-slot-drop-target"],[1,"panel","hand-panel"],[1,"row-between","hand-panel-header"],["data-hand-dropzone","true",1,"cards","card-hand",3,"dragover","drop"],[1,"empty-hand-dropzone"],["draggable","true",1,"card","game-card",3,"card-dragging"],[1,"armed-slot",3,"dragover","drop"],[1,"armed-slot-visual","armed-slot-visual-filled"],["aria-hidden","true",1,"armed-slot-visual"],["draggable","true",1,"slot-card-object",3,"dragstart","dragend"],["type","button","aria-label","Remove card from slot",1,"slot-card-remove",3,"click"],[1,"slot-card-sheen"],["draggable","true",1,"card","game-card",3,"dragstart","dragend"],[1,"chat-drawer","panel","compact"],["type","button",1,"chat-handle",3,"click"],[1,"chat-log"],[1,"chat-message"],[1,"chat-form",3,"ngSubmit"],["maxlength","400","name","chatDrawerDraft","placeholder","Send room message",3,"ngModelChange","ngModel"],[1,"modal-card"],[1,"modal-card","countdown-card"],[1,"transition-quote"],[1,"transition-quote-text"],[1,"transition-quote-attribution"]],template:function(i,r){i&1&&wt(0,NO,4,0,"main",1)(1,OO,25,4,"main",1)(2,ML,12,8),i&2&&Tt(!r.game||!r.scenario?0:r.player?2:1)},dependencies:[Au,$E,VE,zE,WE,Wu,qu,PE,FE,lg,ug,cg,ag],encapsulation:2})}return n})();Qm(Qb).catch(n=>{console.error(n)});
