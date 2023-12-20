"use strict";(self.webpackChunksakiademo=self.webpackChunksakiademo||[]).push([[294],{7294:(E,m,o)=>{o.r(m),o.d(m,{MessagesDemoModule:()=>N});var c=o(6814),u=o(2129),g=o(5219),e=o(4769),p=o(9502),l=o(1180),d=o(2591),f=o(2736),v=o(3823),y=o(8468);function _(s,n){1&s&&e._UZ(0,"CheckIcon",4),2&s&&e.Q6J("styleClass","p-inline-message-icon")}function M(s,n){1&s&&e._UZ(0,"InfoCircleIcon",4),2&s&&e.Q6J("styleClass","p-inline-message-icon")}function I(s,n){1&s&&e._UZ(0,"TimesCircleIcon",4),2&s&&e.Q6J("styleClass","p-inline-message-icon")}function x(s,n){1&s&&e._UZ(0,"ExclamationTriangleIcon",4),2&s&&e.Q6J("styleClass","p-inline-message-icon")}function C(s,n){if(1&s&&e._UZ(0,"span",6),2&s){const i=e.oxw(2);e.Q6J("innerHTML",i.text,e.oJD)}}function A(s,n){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,C,1,1,"span",5),e.qZA()),2&s){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",!i.escape)}}function J(s,n){if(1&s&&(e.TgZ(0,"span",8),e._uU(1),e.qZA()),2&s){const i=e.oxw(2);e.xp6(1),e.Oqu(i.text)}}function b(s,n){if(1&s&&e.YNc(0,J,2,1,"span",7),2&s){const i=e.oxw();e.Q6J("ngIf",i.escape)}}const w=function(s,n,i,a,t){return{"p-inline-message-info":s,"p-inline-message-warn":n,"p-inline-message-error":i,"p-inline-message-success":a,"p-inline-message-icon-only":t}};let D=(()=>{var s;class n{constructor(){(0,l.Z)(this,"severity",void 0),(0,l.Z)(this,"text",void 0),(0,l.Z)(this,"escape",!0),(0,l.Z)(this,"style",void 0),(0,l.Z)(this,"styleClass",void 0)}get icon(){return this.severity&&this.severity.trim()?this.severity:"info"}}return s=n,(0,l.Z)(n,"\u0275fac",function(a){return new(a||s)}),(0,l.Z)(n,"\u0275cmp",e.Xpm({type:s,selectors:[["p-message"]],hostAttrs:[1,"p-element"],inputs:{severity:"severity",text:"text",escape:"escape",style:"style",styleClass:"styleClass"},decls:8,vars:16,consts:[["aria-live","polite",1,"p-inline-message","p-component","p-inline-message",3,"ngStyle","ngClass"],[3,"styleClass",4,"ngIf"],[4,"ngIf","ngIfElse"],["escapeOut",""],[3,"styleClass"],["class","p-inline-message-text",3,"innerHTML",4,"ngIf"],[1,"p-inline-message-text",3,"innerHTML"],["class","p-inline-message-text",4,"ngIf"],[1,"p-inline-message-text"]],template:function(a,t){if(1&a&&(e.TgZ(0,"div",0),e.YNc(1,_,1,1,"CheckIcon",1),e.YNc(2,M,1,1,"InfoCircleIcon",1),e.YNc(3,I,1,1,"TimesCircleIcon",1),e.YNc(4,x,1,1,"ExclamationTriangleIcon",1),e.YNc(5,A,2,1,"div",2),e.YNc(6,b,1,1,"ng-template",null,3,e.W1O),e.qZA()),2&a){const r=e.MAs(7);e.Tol(t.styleClass),e.Q6J("ngStyle",t.style)("ngClass",e.qbA(10,w,"info"===t.severity,"warn"===t.severity,"error"===t.severity,"success"===t.severity,null==t.text)),e.xp6(1),e.Q6J("ngIf","success"===t.icon),e.xp6(1),e.Q6J("ngIf","info"===t.icon),e.xp6(1),e.Q6J("ngIf","error"===t.icon),e.xp6(1),e.Q6J("ngIf","warn"===t.icon),e.xp6(1),e.Q6J("ngIf",!t.escape)("ngIfElse",r)}},dependencies:function(){return[c.mk,c.O5,c.PC,d.n,v.u,y.x,f.L]},styles:[".p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}\n"],encapsulation:2,changeDetection:0})),n})(),k=(()=>{var s;class n{}return s=n,(0,l.Z)(n,"\u0275fac",function(a){return new(a||s)}),(0,l.Z)(n,"\u0275mod",e.oAB({type:s})),(0,l.Z)(n,"\u0275inj",e.cJS({imports:[c.ez,d.n,v.u,y.x,f.L]})),n})();var h=o(707),T=o(4104),Z=o(3714);let U=(()=>{var s;class n{constructor(a){this.service=a,this.msgs=[]}showInfoViaToast(){this.service.add({key:"tst",severity:"info",summary:"Info Message",detail:"PrimeNG rocks"})}showWarnViaToast(){this.service.add({key:"tst",severity:"warn",summary:"Warn Message",detail:"There are unsaved changes"})}showErrorViaToast(){this.service.add({key:"tst",severity:"error",summary:"Error Message",detail:"Validation failed"})}showSuccessViaToast(){this.service.add({key:"tst",severity:"success",summary:"Success Message",detail:"Message sent"})}showInfoViaMessages(){this.msgs=[],this.msgs.push({severity:"info",summary:"Info Message",detail:"PrimeNG rocks"})}showWarnViaMessages(){this.msgs=[],this.msgs.push({severity:"warn",summary:"Warn Message",detail:"There are unsaved changes"})}showErrorViaMessages(){this.msgs=[],this.msgs.push({severity:"error",summary:"Error Message",detail:"Validation failed"})}showSuccessViaMessages(){this.msgs=[],this.msgs.push({severity:"success",summary:"Success Message",detail:"Message sent"})}}return(s=n).\u0275fac=function(a){return new(a||s)(e.Y36(g.ez))},s.\u0275cmp=e.Xpm({type:s,selectors:[["ng-component"]],features:[e._Bn([g.ez])],decls:47,vars:1,consts:[[1,"grid"],[1,"col-12","lg:col-6"],[1,"card"],["key","tst"],[1,"flex","flex-wrap","gap-2"],["type","button","pButton","","label","Success",1,"p-button-success",3,"click"],["type","button","pButton","","label","Info",1,"p-button-info",3,"click"],["type","button","pButton","","label","Warn",1,"p-button-warning",3,"click"],["type","button","pButton","","label","Error",1,"p-button-danger",3,"click"],[1,"card","z-3"],[3,"value"],[1,"col-12","lg:col-8"],[1,"flex","align-items-center","flex-wrap","gap-2","mb-3"],["for","username",1,"w-9rem"],["id","username","type","text","pInputText","","placeholder","Username",1,"ng-dirty","ng-invalid"],["username",""],["severity","error","text","Field is required"],[1,"flex","align-items-center","flex-wrap","gap-2"],["for","email",1,"w-9rem"],["type","text","pInputText","","placeholder","Email","label","email",1,"ng-dirty","ng-invalid"],["email",""],["severity","error"],[1,"col-12","lg:col-4"],[1,"field","p-fluid"],["for","username2"],["id","username2","type","username","aria-describedby","username-help","pInputText","",1,"ng-dirty","ng-invalid"],["id","username-help",1,"p-error"]],template:function(a,t){1&a&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h5"),e._uU(4,"Toast"),e.qZA(),e._UZ(5,"p-toast",3),e.TgZ(6,"div",4)(7,"button",5),e.NdJ("click",function(){return t.showSuccessViaToast()}),e.qZA(),e.TgZ(8,"button",6),e.NdJ("click",function(){return t.showInfoViaToast()}),e.qZA(),e.TgZ(9,"button",7),e.NdJ("click",function(){return t.showWarnViaToast()}),e.qZA(),e.TgZ(10,"button",8),e.NdJ("click",function(){return t.showErrorViaToast()}),e.qZA()()()(),e.TgZ(11,"div",1)(12,"div",9)(13,"h5"),e._uU(14,"Messages"),e.qZA(),e.TgZ(15,"div",4)(16,"button",5),e.NdJ("click",function(){return t.showSuccessViaMessages()}),e.qZA(),e.TgZ(17,"button",6),e.NdJ("click",function(){return t.showInfoViaMessages()}),e.qZA(),e.TgZ(18,"button",7),e.NdJ("click",function(){return t.showWarnViaMessages()}),e.qZA(),e.TgZ(19,"button",8),e.NdJ("click",function(){return t.showErrorViaMessages()}),e.qZA()(),e._UZ(20,"p-messages",10),e.qZA()(),e.TgZ(21,"div",11)(22,"div",2)(23,"h5"),e._uU(24,"Inline"),e.qZA(),e.TgZ(25,"div",12)(26,"label",13),e._uU(27,"Username"),e.qZA(),e._UZ(28,"input",14,15)(30,"p-message",16),e.qZA(),e.TgZ(31,"div",17)(32,"label",18),e._uU(33,"Email"),e.qZA(),e._UZ(34,"input",19,20)(36,"p-message",21),e.qZA()()(),e.TgZ(37,"div",22)(38,"div",2)(39,"h5"),e._uU(40,"Help Text"),e.qZA(),e.TgZ(41,"div",23)(42,"label",24),e._uU(43,"Username"),e.qZA(),e._UZ(44,"input",25),e.TgZ(45,"small",26),e._uU(46,"Enter your username to reset your password."),e.qZA()()()()()),2&a&&(e.xp6(20),e.Q6J("value",t.msgs))},dependencies:[p.V,D,h.Hq,T.FN,Z.o],encapsulation:2}),n})(),V=(()=>{var s;class n{}return(s=n).\u0275fac=function(a){return new(a||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[u.Bz.forChild([{path:"",component:U}]),u.Bz]}),n})(),N=(()=>{var s;class n{}return(s=n).\u0275fac=function(a){return new(a||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[c.ez,V,p.$,k,h.hJ,T.EV,Z.j]}),n})()}}]);