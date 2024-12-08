import{a as y}from"./chunk-KEDPSKOD.js";import{$c as I,Cc as L,Ec as E,Fc as b,Gb as d,Rb as n,Sb as i,Z as g,ab as r,ac as c,ad as _,ca as f,da as u,fd as S,jd as A,mc as h,nc as o,oc as l,pb as x,pc as v,pd as C,wb as m}from"./chunk-HB3EFGHP.js";import"./chunk-JKOY2XUY.js";var F=(()=>{class t{constructor(e){this.http=e,this.baseUrl=`${y.apiUrl}/logs`}getAuditLogs(){return this.http.get(this.baseUrl)}static{this.\u0275fac=function(a){return new(a||t)(f(C))}}static{this.\u0275prov=g({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function D(t,s){if(t&1&&(n(0,"div",4),o(1),i()),t&2){let e=c();r(),v(" ",e.errorMessage," ")}}function j(t,s){if(t&1&&(n(0,"tr")(1,"td"),o(2),i(),n(3,"td"),o(4),i(),n(5,"td"),o(6),i(),n(7,"td"),o(8),i(),n(9,"td"),o(10),L(11,"date"),i()()),t&2){let e=s.$implicit,a=s.index;r(2),l(a+1),r(2),l(e.actionType),r(2),l(e.description),r(2),l(e.userId),r(2),l(E(11,5,e.actionDate,"medium"))}}function O(t,s){if(t&1&&(n(0,"table",5)(1,"thead")(2,"tr")(3,"th"),o(4,"#"),i(),n(5,"th"),o(6,"Action Type"),i(),n(7,"th"),o(8,"Description"),i(),n(9,"th"),o(10,"User"),i(),n(11,"th"),o(12,"Date"),i()()(),n(13,"tbody"),m(14,j,12,8,"tr",6),i()()),t&2){let e=c();r(14),d("ngForOf",e.auditLogs)}}function U(t,s){t&1&&(n(0,"p"),o(1,"No audit logs available."),i())}var q=(()=>{class t{constructor(){this.auditLogs=[],this.errorMessage="",this.auditLogService=u(F)}ngOnInit(){this.fetchAuditLogs()}fetchAuditLogs(){this.auditLogService.getAuditLogs().subscribe(e=>{this.auditLogs=e},e=>{console.error("Error fetching audit logs:",e),this.errorMessage="Failed to load audit logs."})}static{this.\u0275fac=function(a){return new(a||t)}}static{this.\u0275cmp=x({type:t,selectors:[["app-audit-logs"]],decls:7,vars:3,consts:[["noLogs",""],[1,"container"],["class","error",4,"ngIf"],["class","table table-bordered",4,"ngIf","ngIfElse"],[1,"error"],[1,"table","table-bordered"],[4,"ngFor","ngForOf"]],template:function(a,p){if(a&1&&(n(0,"div",1)(1,"h2"),o(2,"Audit Logs"),i(),m(3,D,2,1,"div",2)(4,O,15,1,"table",3)(5,U,2,0,"ng-template",null,0,b),i()),a&2){let M=h(6);r(3),d("ngIf",p.errorMessage),r(),d("ngIf",p.auditLogs.length>0)("ngIfElse",M)}},dependencies:[A,I,_,S],encapsulation:2})}}return t})();export{q as AuditLogsComponent};
