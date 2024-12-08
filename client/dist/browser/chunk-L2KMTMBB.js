import{a as U}from"./chunk-WQXPYHXR.js";import{A as T,Aa as V,Ba as R,Q as O,R as F,T as N,na as D,o as E,pa as G,va as B,xa as W,y as j,ya as q}from"./chunk-OXXXM4EK.js";import{b as P,c as A,d as H,g as z,j as J,k as K,u as Q,w as X}from"./chunk-YHGVW4GW.js";import"./chunk-KEDPSKOD.js";import{h as I}from"./chunk-OBMS4ODY.js";import{Gb as c,Rb as e,Sb as n,Tb as g,_b as C,ab as r,ac as _,ad as M,bd as L,da as f,jd as k,nc as i,oc as w,pa as s,pb as b,qa as p,sc as v,tc as h,uc as S,wb as d,zc as x}from"./chunk-HB3EFGHP.js";import"./chunk-JKOY2XUY.js";var Y=()=>({"minWidth.%":44});function Z(o,y){if(o&1&&(e(0,"c-alert",23),s(),e(1,"svg",24),g(2,"use",25),n(),p(),e(3,"div"),i(4),n()()),o&2){let a=_();r(4),w(a.errorMessage)}}function $(o,y){o&1&&(e(0,"div",26),i(1," Username is required. "),n())}function ee(o,y){o&1&&(e(0,"div",26),i(1," Password is required. "),n())}var ge=(()=>{class o{constructor(){this.loginObj={username:"",password:""},this.errorMessage="",this.authService=f(U),this.router=f(I)}onSubmit(){this.authService.login(this.loginObj).subscribe({next:a=>{let l=a.token;if(l){localStorage.setItem("token",l);let t=this.authService.getUser();console.log("login user:",t),localStorage.setItem("role",t.role),this.router.navigate(["/inventory"])}},error:a=>{console.error(a),this.errorMessage=`Login failed: ${a.error.message||"Invalid credentials"}`},complete:()=>{console.log("Login request complete")}})}static{this.\u0275fac=function(l){return new(l||o)}}static{this.\u0275cmp=b({type:o,selectors:[["app-login"]],decls:39,vars:8,consts:[[1,"bg-light","dark:bg-transparent","min-vh-100","d-flex","flex-row","align-items-center"],["breakpoint","md"],[1,"justify-content-center"],["lg","10","xl","8"],[1,"p-4"],["cForm",""],[1,"text-body-secondary"],["color","danger","class","d-flex align-items-center",4,"ngIf"],[1,"mb-3"],["cInputGroupText",""],["cIcon","","name","cilUser"],["autoComplete","username","name","username","cFormControl","","placeholder","Username","required","",3,"ngModelChange","ngModel"],["class","text-danger",4,"ngIf"],[1,"mb-4"],["cIcon","","name","cilLockLocked"],["autoComplete","current-password","cFormControl","","name","password","placeholder","Password","type","password","required","",3,"ngModelChange","ngModel"],["xs","6"],["cButton","","color","primary",1,"px-4",3,"click"],["xs","6",1,"text-right"],["cButton","","color","link",1,"px-0"],[1,"text-white","bg-primary","py-5",3,"ngStyle"],[1,"text-center"],["cButton","","color","primary","routerLink","/register",1,"mt-3",3,"click","active"],["color","danger",1,"d-flex","align-items-center"],["width","24","height","24","role","img","aria-label","Info:",1,"bi","flex-shrink-0","me-2"],[0,"xlink","href","#exclamation-triangle-fill"],[1,"text-danger"]],template:function(l,t){l&1&&(e(0,"div",0)(1,"c-container",1)(2,"c-row",2)(3,"c-col",3)(4,"c-card-group")(5,"c-card",4)(6,"c-card-body")(7,"form",5)(8,"h1"),i(9,"Login"),n(),e(10,"p",6),i(11," Sign In to your account "),n(),d(12,Z,5,1,"c-alert",7),e(13,"c-input-group",8)(14,"span",9),s(),g(15,"svg",10),n(),p(),e(16,"input",11),S("ngModelChange",function(m){return h(t.loginObj.username,m)||(t.loginObj.username=m),m}),n()(),d(17,$,2,0,"div",12),e(18,"c-input-group",13)(19,"span",9),s(),g(20,"svg",14),n(),p(),e(21,"input",15),S("ngModelChange",function(m){return h(t.loginObj.password,m)||(t.loginObj.password=m),m}),n()(),d(22,ee,2,0,"div",12),e(23,"c-row")(24,"c-col",16)(25,"button",17),C("click",function(){return t.onSubmit()}),i(26," Login "),n()(),e(27,"c-col",18)(28,"button",19),i(29," Forgot password? "),n()()()()()(),e(30,"c-card",20)(31,"c-card-body",21)(32,"div")(33,"h2"),i(34,"Sign up"),n(),e(35,"p"),i(36," New User? Register now to take full control of your warehouse! "),n(),e(37,"button",22),C("click",function(){return t.router.navigate(["/register"])}),i(38," Register Now! "),n()()()()()()()()()),l&2&&(r(12),c("ngIf",t.errorMessage),r(4),v("ngModel",t.loginObj.username),r(),c("ngIf",t.loginObj.username.touched&&t.loginObj.username.invalid),r(4),v("ngModel",t.loginObj.password),r(),c("ngIf",t.loginObj.password.touched&&t.loginObj.password.invalid),r(8),c("ngStyle",x(7,Y)),r(7),c("active",!0))},dependencies:[q,R,V,N,O,F,D,G,W,E,B,j,L,X,K,P,A,H,Q,J,z,T,k,M],encapsulation:2})}}return o})();export{ge as LoginComponent};
