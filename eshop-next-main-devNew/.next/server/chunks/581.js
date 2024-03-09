"use strict";exports.id=581,exports.ids=[581],exports.modules={11581:(e,t,r)=>{Object.defineProperty(t,"Z",{enumerable:!0,get:function(){return n.NextResponse}});let n=r(83462)},17252:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NextURL",{enumerable:!0,get:function(){return h}});let n=r(60512),a=r(34507),o=r(93929),s=r(61673),i=/(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;function l(e,t){return new URL(String(e).replace(i,"localhost"),t&&String(t).replace(i,"localhost"))}let u=Symbol("NextURLInternal");class h{constructor(e,t,r){let n,a;"object"==typeof t&&"pathname"in t||"string"==typeof t?(n=t,a=r||{}):a=r||t||{},this[u]={url:l(e,n??a.base),options:a,basePath:""},this.analyze()}analyze(){var e,t,r,a,i;let l=(0,s.getNextPathnameInfo)(this[u].url.pathname,{nextConfig:this[u].options.nextConfig,parseData:!0,i18nProvider:this[u].options.i18nProvider}),h=(0,o.getHostname)(this[u].url,this[u].options.headers);this[u].domainLocale=this[u].options.i18nProvider?this[u].options.i18nProvider.detectDomainLocale(h):(0,n.detectDomainLocale)(null==(t=this[u].options.nextConfig)?void 0:null==(e=t.i18n)?void 0:e.domains,h);let d=(null==(r=this[u].domainLocale)?void 0:r.defaultLocale)||(null==(i=this[u].options.nextConfig)?void 0:null==(a=i.i18n)?void 0:a.defaultLocale);this[u].url.pathname=l.pathname,this[u].defaultLocale=d,this[u].basePath=l.basePath??"",this[u].buildId=l.buildId,this[u].locale=l.locale??d,this[u].trailingSlash=l.trailingSlash}formatPathname(){return(0,a.formatNextPathnameInfo)({basePath:this[u].basePath,buildId:this[u].buildId,defaultLocale:this[u].options.forceLocale?void 0:this[u].defaultLocale,locale:this[u].locale,pathname:this[u].url.pathname,trailingSlash:this[u].trailingSlash})}formatSearch(){return this[u].url.search}get buildId(){return this[u].buildId}set buildId(e){this[u].buildId=e}get locale(){return this[u].locale??""}set locale(e){var t,r;if(!this[u].locale||!(null==(r=this[u].options.nextConfig)?void 0:null==(t=r.i18n)?void 0:t.locales.includes(e)))throw TypeError(`The NextURL configuration includes no locale "${e}"`);this[u].locale=e}get defaultLocale(){return this[u].defaultLocale}get domainLocale(){return this[u].domainLocale}get searchParams(){return this[u].url.searchParams}get host(){return this[u].url.host}set host(e){this[u].url.host=e}get hostname(){return this[u].url.hostname}set hostname(e){this[u].url.hostname=e}get port(){return this[u].url.port}set port(e){this[u].url.port=e}get protocol(){return this[u].url.protocol}set protocol(e){this[u].url.protocol=e}get href(){let e=this.formatPathname(),t=this.formatSearch();return`${this.protocol}//${this.host}${e}${t}${this.hash}`}set href(e){this[u].url=l(e),this.analyze()}get origin(){return this[u].url.origin}get pathname(){return this[u].url.pathname}set pathname(e){this[u].url.pathname=e}get hash(){return this[u].url.hash}set hash(e){this[u].url.hash=e}get search(){return this[u].url.search}set search(e){this[u].url.search=e}get password(){return this[u].url.password}set password(e){this[u].url.password=e}get username(){return this[u].url.username}set username(e){this[u].url.username=e}get basePath(){return this[u].basePath}set basePath(e){this[u].basePath=e.startsWith("/")?e:`/${e}`}toString(){return this.href}toJSON(){return this.href}[Symbol.for("edge-runtime.inspect.custom")](){return{href:this.href,origin:this.origin,protocol:this.protocol,username:this.username,password:this.password,host:this.host,hostname:this.hostname,port:this.port,pathname:this.pathname,search:this.search,searchParams:this.searchParams,hash:this.hash}}clone(){return new h(String(this),this[u].options)}}},83462:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NextResponse",{enumerable:!0,get:function(){return u}});let n=r(17252),a=r(41522),o=r(24465),s=Symbol("internal response"),i=new Set([301,302,303,307,308]);function l(e,t){var r;if(null==e?void 0:null==(r=e.request)?void 0:r.headers){if(!(e.request.headers instanceof Headers))throw Error("request.headers must be an instance of Headers");let r=[];for(let[n,a]of e.request.headers)t.set("x-middleware-request-"+n,a),r.push(n);t.set("x-middleware-override-headers",r.join(","))}}class u extends Response{constructor(e,t={}){super(e,t),this[s]={cookies:new o.ResponseCookies(this.headers),url:t.url?new n.NextURL(t.url,{headers:(0,a.toNodeOutgoingHttpHeaders)(this.headers),nextConfig:t.nextConfig}):void 0}}[Symbol.for("edge-runtime.inspect.custom")](){return{cookies:this.cookies,url:this.url,body:this.body,bodyUsed:this.bodyUsed,headers:Object.fromEntries(this.headers),ok:this.ok,redirected:this.redirected,status:this.status,statusText:this.statusText,type:this.type}}get cookies(){return this[s].cookies}static json(e,t){let r=Response.json(e,t);return new u(r.body,r)}static redirect(e,t){let r="number"==typeof t?t:(null==t?void 0:t.status)??307;if(!i.has(r))throw RangeError('Failed to execute "redirect" on "response": Invalid status code');let n="object"==typeof t?t:{},o=new Headers(null==n?void 0:n.headers);return o.set("Location",(0,a.validateURL)(e)),new u(null,{...n,headers:o,status:r})}static rewrite(e,t){let r=new Headers(null==t?void 0:t.headers);return r.set("x-middleware-rewrite",(0,a.validateURL)(e)),l(t,r),new u(null,{...t,headers:r})}static next(e){let t=new Headers(null==e?void 0:e.headers);return t.set("x-middleware-next","1"),l(e,t),new u(null,{...e,headers:t})}}},41522:(e,t)=>{function r(e){let t=new Headers;for(let[r,n]of Object.entries(e))for(let e of Array.isArray(n)?n:[n])void 0!==e&&("number"==typeof e&&(e=e.toString()),t.append(r,e));return t}function n(e){var t,r,n,a,o,s=[],i=0;function l(){for(;i<e.length&&/\s/.test(e.charAt(i));)i+=1;return i<e.length}for(;i<e.length;){for(t=i,o=!1;l();)if(","===(r=e.charAt(i))){for(n=i,i+=1,l(),a=i;i<e.length&&"="!==(r=e.charAt(i))&&";"!==r&&","!==r;)i+=1;i<e.length&&"="===e.charAt(i)?(o=!0,i=a,s.push(e.substring(t,n)),t=i):i=n+1}else i+=1;(!o||i>=e.length)&&s.push(e.substring(t,e.length))}return s}function a(e){let t={},r=[];if(e)for(let[a,o]of e.entries())"set-cookie"===a.toLowerCase()?(r.push(...n(o)),t[a]=1===r.length?r[0]:r):t[a]=o;return t}function o(e){try{return String(new URL(String(e)))}catch(t){throw Error(`URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,{cause:t})}}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{fromNodeOutgoingHttpHeaders:function(){return r},splitCookiesString:function(){return n},toNodeOutgoingHttpHeaders:function(){return a},validateURL:function(){return o}})},93929:(e,t)=>{function r(e,t){let r;if((null==t?void 0:t.host)&&!Array.isArray(t.host))r=t.host.toString().split(":",1)[0];else{if(!e.hostname)return;r=e.hostname}return r.toLowerCase()}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getHostname",{enumerable:!0,get:function(){return r}})},60512:(e,t)=>{function r(e,t,r){if(e)for(let o of(r&&(r=r.toLowerCase()),e)){var n,a;if(t===(null==(n=o.domain)?void 0:n.split(":",1)[0].toLowerCase())||r===o.defaultLocale.toLowerCase()||(null==(a=o.locales)?void 0:a.some(e=>e.toLowerCase()===r)))return o}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"detectDomainLocale",{enumerable:!0,get:function(){return r}})},80063:(e,t)=>{function r(e,t){let r;let n=e.split("/");return(t||[]).some(t=>!!n[1]&&n[1].toLowerCase()===t.toLowerCase()&&(r=t,n.splice(1,1),e=n.join("/")||"/",!0)),{pathname:e,detectedLocale:r}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"normalizeLocalePath",{enumerable:!0,get:function(){return r}})},66888:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addLocale",{enumerable:!0,get:function(){return o}});let n=r(6258),a=r(33396);function o(e,t,r,o){if(!t||t===r)return e;let s=e.toLowerCase();return!o&&((0,a.pathHasPrefix)(s,"/api")||(0,a.pathHasPrefix)(s,"/"+t.toLowerCase()))?e:(0,n.addPathPrefix)(e,"/"+t)}},6258:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addPathPrefix",{enumerable:!0,get:function(){return a}});let n=r(92969);function a(e,t){if(!e.startsWith("/")||!t)return e;let{pathname:r,query:a,hash:o}=(0,n.parsePath)(e);return""+t+r+a+o}},33368:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addPathSuffix",{enumerable:!0,get:function(){return a}});let n=r(92969);function a(e,t){if(!e.startsWith("/")||!t)return e;let{pathname:r,query:a,hash:o}=(0,n.parsePath)(e);return""+r+t+a+o}},34507:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"formatNextPathnameInfo",{enumerable:!0,get:function(){return i}});let n=r(51350),a=r(6258),o=r(33368),s=r(66888);function i(e){let t=(0,s.addLocale)(e.pathname,e.locale,e.buildId?void 0:e.defaultLocale,e.ignorePrefix);return(e.buildId||!e.trailingSlash)&&(t=(0,n.removeTrailingSlash)(t)),e.buildId&&(t=(0,o.addPathSuffix)((0,a.addPathPrefix)(t,"/_next/data/"+e.buildId),"/"===e.pathname?"index.json":".json")),t=(0,a.addPathPrefix)(t,e.basePath),!e.buildId&&e.trailingSlash?t.endsWith("/")?t:(0,o.addPathSuffix)(t,"/"):(0,n.removeTrailingSlash)(t)}},61673:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getNextPathnameInfo",{enumerable:!0,get:function(){return s}});let n=r(80063),a=r(21661),o=r(33396);function s(e,t){var r,s;let{basePath:i,i18n:l,trailingSlash:u}=null!=(r=t.nextConfig)?r:{},h={pathname:e,trailingSlash:"/"!==e?e.endsWith("/"):u};i&&(0,o.pathHasPrefix)(h.pathname,i)&&(h.pathname=(0,a.removePathPrefix)(h.pathname,i),h.basePath=i);let d=h.pathname;if(h.pathname.startsWith("/_next/data/")&&h.pathname.endsWith(".json")){let e=h.pathname.replace(/^\/_next\/data\//,"").replace(/\.json$/,"").split("/"),r=e[0];h.buildId=r,d="index"!==e[1]?"/"+e.slice(1).join("/"):"/",!0===t.parseData&&(h.pathname=d)}if(l){let e=t.i18nProvider?t.i18nProvider.analyze(h.pathname):(0,n.normalizeLocalePath)(h.pathname,l.locales);h.locale=e.detectedLocale,h.pathname=null!=(s=e.pathname)?s:h.pathname,!e.detectedLocale&&h.buildId&&(e=t.i18nProvider?t.i18nProvider.analyze(d):(0,n.normalizeLocalePath)(d,l.locales)).detectedLocale&&(h.locale=e.detectedLocale)}return h}},92969:(e,t)=>{function r(e){let t=e.indexOf("#"),r=e.indexOf("?"),n=r>-1&&(t<0||r<t);return n||t>-1?{pathname:e.substring(0,n?r:t),query:n?e.substring(r,t>-1?t:void 0):"",hash:t>-1?e.slice(t):""}:{pathname:e,query:"",hash:""}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"parsePath",{enumerable:!0,get:function(){return r}})},33396:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"pathHasPrefix",{enumerable:!0,get:function(){return a}});let n=r(92969);function a(e,t){if("string"!=typeof e)return!1;let{pathname:r}=(0,n.parsePath)(e);return r===t||r.startsWith(t+"/")}},21661:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"removePathPrefix",{enumerable:!0,get:function(){return a}});let n=r(33396);function a(e,t){if(!(0,n.pathHasPrefix)(e,t))return e;let r=e.slice(t.length);return r.startsWith("/")?r:"/"+r}},51350:(e,t)=>{function r(e){return e.replace(/\/$/,"")||"/"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"removeTrailingSlash",{enumerable:!0,get:function(){return r}})}};