"use strict";(()=>{var e={};e.id=356,e.ids=[356],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},65910:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>v,originalPathname:()=>b,patchFetch:()=>w,requestAsyncStorage:()=>f,routeModule:()=>l,serverHooks:()=>p,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>h});var n={};r.r(n),r.d(n,{handler:()=>c});var o=r(7377),a=r(41653),s=r(92668),u=r(69975),i=r(62017);let c=async(e,t)=>{try{let r=await (0,u.getSession)({req:e});if(!r?.user)return t.status(401).json({error:"Unauthorized"});let n=r.user.id,o=await i.db.user.findUnique({where:{id:n}});if(!o)return t.status(404).json({error:"User not found"});return t.status(200).json({data:{user:o}})}catch(e){return console.error(e),t.status(500).json({error:"Internal server error"})}},l=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/user/route",pathname:"/api/user",filename:"route",bundlePath:"app/api/user/route"},resolvedPagePath:"C:\\Users\\Руслан и Анна\\Desktop\\Projects\\devNew\\eshop-next-main-devNew\\eshop-next-main-devNew\\app\\api\\user\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:f,staticGenerationAsyncStorage:d,serverHooks:p,headerHooks:v,staticGenerationBailout:h}=l,b="/api/user/route";function w(){return(0,s.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:d})}},62017:(e,t,r)=>{r.d(t,{db:()=>n});let n=new(require("@prisma/client")).PrismaClient},94707:(e,t,r)=>{var n=r(45898);Object.defineProperty(t,"__esModule",{value:!0}),t.BroadcastChannel=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"nextauth.message";return{receive:function(t){var r=function(r){if(r.key===e){var n,o=JSON.parse(null!==(n=r.newValue)&&void 0!==n?n:"{}");(null==o?void 0:o.event)==="session"&&null!=o&&o.data&&t(o)}};return window.addEventListener("storage",r),function(){return window.removeEventListener("storage",r)}},post:function(e){}}},t.apiBaseUrl=c,t.fetchData=function(e,t,r){return i.apply(this,arguments)},t.now=function(){return Math.floor(Date.now()/1e3)};var o=n(r(78307)),a=n(r(4500)),s=n(r(32160));function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function i(){return(i=(0,s.default)(o.default.mark(function e(t,r,n){var s,i,l,f,d,p,v,h,b,w=arguments;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=(s=w.length>3&&void 0!==w[3]?w[3]:{}).ctx,f=void 0===(l=s.req)?null==i?void 0:i.req:l,d="".concat(c(r),"/").concat(t),e.prev=2,v={headers:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){(0,a.default)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"Content-Type":"application/json"},null!=f&&null!==(p=f.headers)&&void 0!==p&&p.cookie?{cookie:f.headers.cookie}:{})},null!=f&&f.body&&(v.body=JSON.stringify(f.body),v.method="POST"),e.next=7,fetch(d,v);case 7:return h=e.sent,e.next=10,h.json();case 10:if(b=e.sent,h.ok){e.next=13;break}throw b;case 13:return e.abrupt("return",Object.keys(b).length>0?b:null);case 16:return e.prev=16,e.t0=e.catch(2),n.error("CLIENT_FETCH_ERROR",{error:e.t0,url:d}),e.abrupt("return",null);case 20:case"end":return e.stop()}},e,null,[[2,16]])}))).apply(this,arguments)}function c(e){return"".concat(e.baseUrlServer).concat(e.basePathServer)}},69975:(e,t,r)=>{var n,o,a,s,u,i=r(45898),c=r(18341);Object.defineProperty(t,"__esModule",{value:!0});var l={SessionContext:!0,useSession:!0,getSession:!0,getCsrfToken:!0,getProviders:!0,signIn:!0,signOut:!0,SessionProvider:!0};t.SessionContext=void 0,t.SessionProvider=function(e){if(!E)throw Error("React Context is unavailable in Server Components");var t,r,n,o,a,s,u=e.children,i=e.basePath,c=e.refetchInterval,l=e.refetchWhenOffline;i&&(j.basePath=i);var d=void 0!==e.session;j._lastSync=d?(0,y.now)():0;var b=h.useState(function(){return d&&(j._session=e.session),e.session}),w=(0,v.default)(b,2),x=w[0],O=w[1],m=h.useState(!d),_=(0,v.default)(m,2),S=_[0],R=_[1];h.useEffect(function(){return j._getSession=(0,p.default)(f.default.mark(function e(){var t,r,n=arguments;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(n.length>0&&void 0!==n[0]?n[0]:{}).event,e.prev=1,!((r="storage"===t)||void 0===j._session)){e.next=10;break}return j._lastSync=(0,y.now)(),e.next=7,U({broadcast:!r});case 7:return j._session=e.sent,O(j._session),e.abrupt("return");case 10:if(!(!t||null===j._session||(0,y.now)()<j._lastSync)){e.next=12;break}return e.abrupt("return");case 12:return j._lastSync=(0,y.now)(),e.next=15,U();case 15:j._session=e.sent,O(j._session),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(1),k.error("CLIENT_SESSION_ERROR",e.t0);case 22:return e.prev=22,R(!1),e.finish(22);case 25:case"end":return e.stop()}},e,null,[[1,19,22,25]])})),j._getSession(),function(){j._lastSync=0,j._session=void 0,j._getSession=function(){}}},[]),h.useEffect(function(){var e=P.receive(function(){return j._getSession({event:"storage"})});return function(){return e()}},[]),h.useEffect(function(){var t=e.refetchOnWindowFocus,r=void 0===t||t,n=function(){r&&"visible"===document.visibilityState&&j._getSession({event:"visibilitychange"})};return document.addEventListener("visibilitychange",n,!1),function(){return document.removeEventListener("visibilitychange",n,!1)}},[e.refetchOnWindowFocus]);var T=(t=h.useState("undefined"!=typeof navigator&&navigator.onLine),n=(r=(0,v.default)(t,2))[0],o=r[1],a=function(){return o(!0)},s=function(){return o(!1)},h.useEffect(function(){return window.addEventListener("online",a),window.addEventListener("offline",s),function(){window.removeEventListener("online",a),window.removeEventListener("offline",s)}},[]),n),C=!1!==l||T;h.useEffect(function(){if(c&&C){var e=setInterval(function(){j._session&&j._getSession({event:"poll"})},1e3*c);return function(){return clearInterval(e)}}},[c,C]);var M=h.useMemo(function(){return{data:x,status:S?"loading":x?"authenticated":"unauthenticated",update:function(e){return(0,p.default)(f.default.mark(function t(){var r;return f.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(S||!x)){t.next=2;break}return t.abrupt("return");case 2:return R(!0),t.t0=y.fetchData,t.t1=j,t.t2=k,t.next=8,L();case 8:return t.t3=t.sent,t.t4=e,t.t5={csrfToken:t.t3,data:t.t4},t.t6={body:t.t5},t.t7={req:t.t6},t.next=15,(0,t.t0)("session",t.t1,t.t2,t.t7);case 15:return r=t.sent,R(!1),r&&(O(r),P.post({event:"session",data:{trigger:"getSession"}})),t.abrupt("return",r);case 19:case"end":return t.stop()}},t)}))()}}},[x,S]);return(0,g.jsx)(E.Provider,{value:M,children:u})},t.getCsrfToken=L,t.getProviders=C,t.getSession=U,t.signIn=function(e,t,r){return A.apply(this,arguments)},t.signOut=function(e){return N.apply(this,arguments)},t.useSession=function(e){if(!E)throw Error("React Context is unavailable in Server Components");var t=h.useContext(E),r=null!=e?e:{},n=r.required,o=r.onUnauthenticated,a=n&&"unauthenticated"===t.status;return(h.useEffect(function(){if(a){var e="/api/auth/signin?".concat(new URLSearchParams({error:"SessionRequired",callbackUrl:window.location.href}));o?o():window.location.href=e}},[a,o]),a)?{data:t.data,update:t.update,status:"loading"}:t};var f=i(r(78307)),d=i(r(4500)),p=i(r(32160)),v=i(r(28950)),h=m(r(58647)),b=m(r(91410)),w=i(r(54271)),y=r(94707),g=r(46899),x=r(94113);function O(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(O=function(e){return e?r:t})(e)}function m(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==c(e)&&"function"!=typeof e)return{default:e};var r=O(t);if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=o?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(n,a,s):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(Object(r),!0).forEach(function(t){(0,d.default)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}Object.keys(x).forEach(function(e){!("default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(l,e))&&(e in t&&t[e]===x[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return x[e]}}))});var j={baseUrl:(0,w.default)(null!==(n=process.env.NEXTAUTH_URL)&&void 0!==n?n:process.env.VERCEL_URL).origin,basePath:(0,w.default)(process.env.NEXTAUTH_URL).path,baseUrlServer:(0,w.default)(null!==(o=null!==(a=process.env.NEXTAUTH_URL_INTERNAL)&&void 0!==a?a:process.env.NEXTAUTH_URL)&&void 0!==o?o:process.env.VERCEL_URL).origin,basePathServer:(0,w.default)(null!==(s=process.env.NEXTAUTH_URL_INTERNAL)&&void 0!==s?s:process.env.NEXTAUTH_URL).path,_lastSync:0,_session:void 0,_getSession:function(){}},P=(0,y.BroadcastChannel)(),k=(0,b.proxyLogger)(b.default,j.basePath),E=null===(u=h.createContext)||void 0===u?void 0:u.call(h,void 0);function U(e){return R.apply(this,arguments)}function R(){return(R=(0,p.default)(f.default.mark(function e(t){var r,n;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.fetchData)("session",j,k,t);case 2:return n=e.sent,(null===(r=null==t?void 0:t.broadcast)||void 0===r||r)&&P.post({event:"session",data:{trigger:"getSession"}}),e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}function L(e){return T.apply(this,arguments)}function T(){return(T=(0,p.default)(f.default.mark(function e(t){var r;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.fetchData)("csrf",j,k,t);case 2:return r=e.sent,e.abrupt("return",null==r?void 0:r.csrfToken);case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function C(){return M.apply(this,arguments)}function M(){return(M=(0,p.default)(f.default.mark(function e(){return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.fetchData)("providers",j,k);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function A(){return(A=(0,p.default)(f.default.mark(function e(t,r,n){var o,a,s,u,i,c,l,d,p,v,h,b,w,g,x,O,m;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=void 0===(a=(o=null!=r?r:{}).callbackUrl)?window.location.href:a,i=void 0===(u=o.redirect)||u,c=(0,y.apiBaseUrl)(j),e.next=4,C();case 4:if(l=e.sent){e.next=8;break}return window.location.href="".concat(c,"/error"),e.abrupt("return");case 8:if(!(!t||!(t in l))){e.next=11;break}return window.location.href="".concat(c,"/signin?").concat(new URLSearchParams({callbackUrl:s})),e.abrupt("return");case 11:return d="credentials"===l[t].type,p="email"===l[t].type,v=d||p,h="".concat(c,"/").concat(d?"callback":"signin","/").concat(t),b="".concat(h).concat(n?"?".concat(new URLSearchParams(n)):""),e.t0=fetch,e.t1=b,e.t2={"Content-Type":"application/x-www-form-urlencoded"},e.t3=URLSearchParams,e.t4=S,e.t5=S({},r),e.t6={},e.next=25,L();case 25:return e.t7=e.sent,e.t8=s,e.t9={csrfToken:e.t7,callbackUrl:e.t8,json:!0},e.t10=(0,e.t4)(e.t5,e.t6,e.t9),e.t11=new e.t3(e.t10),e.t12={method:"post",headers:e.t2,body:e.t11},e.next=33,(0,e.t0)(e.t1,e.t12);case 33:return w=e.sent,e.next=36,w.json();case 36:if(g=e.sent,!(i||!v)){e.next=42;break}return O=null!==(x=g.url)&&void 0!==x?x:s,window.location.href=O,O.includes("#")&&window.location.reload(),e.abrupt("return");case 42:if(m=new URL(g.url).searchParams.get("error"),!w.ok){e.next=46;break}return e.next=46,j._getSession({event:"storage"});case 46:return e.abrupt("return",{error:m,status:w.status,ok:w.ok,url:m?null:g.url});case 47:case"end":return e.stop()}},e)}))).apply(this,arguments)}function N(){return(N=(0,p.default)(f.default.mark(function e(t){var r,n,o,a,s,u,i,c,l;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=void 0===(n=(null!=t?t:{}).callbackUrl)?window.location.href:n,a=(0,y.apiBaseUrl)(j),e.t0={"Content-Type":"application/x-www-form-urlencoded"},e.t1=URLSearchParams,e.next=6,L();case 6:return e.t2=e.sent,e.t3=o,e.t4={csrfToken:e.t2,callbackUrl:e.t3,json:!0},e.t5=new e.t1(e.t4),s={method:"post",headers:e.t0,body:e.t5},e.next=13,fetch("".concat(a,"/signout"),s);case 13:return u=e.sent,e.next=16,u.json();case 16:if(i=e.sent,P.post({event:"session",data:{trigger:"signout"}}),!(null===(r=null==t?void 0:t.redirect)||void 0===r||r)){e.next=23;break}return l=null!==(c=i.url)&&void 0!==c?c:o,window.location.href=l,l.includes("#")&&window.location.reload(),e.abrupt("return");case 23:return e.next=25,j._getSession({event:"storage"});case 25:return e.abrupt("return",i);case 26:case"end":return e.stop()}},e)}))).apply(this,arguments)}t.SessionContext=E},94113:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},70070:(e,t,r)=>{e.exports=r(20399)},46899:(e,t,r)=>{e.exports=r(70070).vendored["react-rsc"].ReactJsxRuntime},58647:(e,t,r)=>{e.exports=r(70070).vendored["react-rsc"].React},38567:e=>{e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},89536:e=>{e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},24997:e=>{e.exports=function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,s,u=[],i=!0,c=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=a.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{if(!i&&null!=r.return&&(s=r.return(),Object(s)!==s))return}finally{if(c)throw o}}return u}},e.exports.__esModule=!0,e.exports.default=e.exports},52487:e=>{e.exports=function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},28950:(e,t,r)=>{var n=r(89536),o=r(24997),a=r(15083),s=r(52487);e.exports=function(e,t){return n(e)||o(e,t)||a(e,t)||s()},e.exports.__esModule=!0,e.exports.default=e.exports},15083:(e,t,r)=>{var n=r(38567);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}},e.exports.__esModule=!0,e.exports.default=e.exports}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[701,208],()=>r(65910));module.exports=n})();