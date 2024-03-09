"use strict";(()=>{var e={};e.id=651,e.ids=[651],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},6647:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>v,originalPathname:()=>h,patchFetch:()=>w,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>x,staticGenerationBailout:()=>q});var s={};t.r(s),t.d(s,{DELETE:()=>l});var a=t(7377),o=t(41653),i=t(92668),n=t(49004),u=t(62017),p=t(11581);async function l(e){let r=await (0,n.P)();if(r?.user?.email){let e=r.user.email,t=await u.db.cart.findFirst({where:{User:{email:e}},include:{ProductCart:!0}});if(!t)return new Response("Cart not found",{status:404});let s=t.ProductCart.map(e=>e.productId);try{return await u.db.productCart.deleteMany({where:{cartId:t.id}}),await u.db.cart.delete({where:{id:t.id}}),p.Z.json({message:"All products removed from cart",removedProductIds:s})}catch(e){return console.error(e),new Response("Internal server error",{status:500})}}}let c=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/cartDeleteFull/route",pathname:"/api/cartDeleteFull",filename:"route",bundlePath:"app/api/cartDeleteFull/route"},resolvedPagePath:"C:\\Users\\Руслан и Анна\\Desktop\\Projects\\devNew\\eshop-next-main-devNew\\eshop-next-main-devNew\\app\\api\\cartDeleteFull\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:x,serverHooks:m,headerHooks:v,staticGenerationBailout:q}=c,h="/api/cartDeleteFull/route";function w(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:x})}},49004:(e,r,t)=>{t.d(r,{L:()=>n,P:()=>u});var s=t(62017),a=t(19805),o=t(63113),i=t(89320);let n={adapter:(0,a.N)(s.db),providers:[(0,i.Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET})]},u=()=>(0,o.getServerSession)(n)},62017:(e,r,t)=>{t.d(r,{db:()=>s});let s=new(require("@prisma/client")).PrismaClient}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[701,208,182,581],()=>t(6647));module.exports=s})();