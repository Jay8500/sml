"use strict";(self.webpackChunksakiademo=self.webpackChunksakiademo||[]).push([[977],{977:(_,h,r)=>{r.r(h),r.d(h,{DashboardModule:()=>S});var l=r(6814),m=r(6223),g=r(4201),f=r(1122),C=r(9552),p=r(707),d=r(1180),e=r(4769);let y=(()=>{var t;class i{}return t=i,(0,d.Z)(i,"\u0275fac",function(n){return new(n||t)}),(0,d.Z)(i,"\u0275mod",e.oAB({type:t})),(0,d.Z)(i,"\u0275inj",e.cJS({imports:[l.ez]})),i})();var D=r(74),c=r(2129),x=r(5861),v=r(5219),b=r(8645),A=r(9773),L=r(4850);function T(t,i){if(1&t&&(e.TgZ(0,"div")(1,"span",8),e._uU(2),e.qZA(),e.TgZ(3,"span",9),e._uU(4,"new on today"),e.qZA()()),2&t){const s=e.oxw().$implicit;e.xp6(2),e.hij("",s.newCnt," ")}}function P(t,i){if(1&t&&(e.TgZ(0,"div")(1,"span",8),e._uU(2),e.qZA(),e.TgZ(3,"span",9),e._uU(4,"new last Week"),e.qZA()()),2&t){const s=e.oxw().$implicit;e.xp6(2),e.hij("",s.last7Cnt," ")}}function Z(t,i){if(1&t&&(e.TgZ(0,"div")(1,"span",8),e._uU(2),e.qZA(),e.TgZ(3,"span",9),e._uU(4,"Active"),e.qZA()()),2&t){const s=e.oxw().$implicit;e.xp6(2),e.hij("",s.activeCnt," ")}}function O(t,i){if(1&t&&(e.TgZ(0,"div")(1,"span",10),e._uU(2),e.qZA(),e.TgZ(3,"span",9),e._uU(4,"In Active"),e.qZA()()),2&t){const s=e.oxw().$implicit;e.xp6(2),e.hij("",s.inActiveCnt," ")}}const o=function(){return[void 0,null,""]};function k(t,i){if(1&t&&(e.TgZ(0,"div",2)(1,"div",3)(2,"div",4)(3,"div")(4,"span",5),e._uU(5),e.qZA(),e.TgZ(6,"span",6),e._uU(7),e.qZA()()(),e.YNc(8,T,5,1,"div",7),e.YNc(9,P,5,1,"div",7),e.YNc(10,Z,5,1,"div",7),e.YNc(11,O,5,1,"div",7),e.qZA()()),2&t){const s=i.$implicit;e.xp6(5),e.Oqu(s.header),e.xp6(2),e.hij("",s.cnt," "),e.xp6(1),e.Q6J("ngIf",!e.DdM(6,o).includes(s.newCnt)),e.xp6(1),e.Q6J("ngIf",!e.DdM(7,o).includes(s.last7Cnt)),e.xp6(1),e.Q6J("ngIf",!e.DdM(8,o).includes(s.activeCnt)),e.xp6(1),e.Q6J("ngIf",!e.DdM(9,o).includes(s.inActiveCnt))}}let H=(()=>{var t;class i{constructor(){this._service=(0,e.f3M)(L.r),this.destroy$=new b.x,this.dashboardData=[],this.blocUI=!1}ngOnInit(){var n=this;return(0,x.Z)(function*(){n.gridData()})()}gridData(){this.blocUI=!0;try{let n=this._service.getUserInfo("userCader");this._service.postApi("getDashboardDetails","postEndPoint",{cader:n.code,create_by:this._service.getUserInfo("_id")}).pipe((0,A.R)(this.destroy$)).subscribe({next:a=>{200==(a=this._service.enableCryptoForResponse()?this._service.decrypt(a):a).S_CODE&&(this.blocUI=!1,a.DATA.length>0&&(this.dashboardData=a.DATA))},error:a=>{this.blocUI=!1}})}catch{this.blocUI=!1}}}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["ng-component"]],features:[e._Bn([v.ez,v.YP])],decls:2,vars:1,consts:[[1,"grid"],["class","col-12 lg:col-6 xl:col-3",4,"ngFor","ngForOf"],[1,"col-12","lg:col-6","xl:col-3"],[1,"card","mb-0"],[1,"flex","justify-content-between","mb-3"],[1,"block","text-black-alpha-90","font-medium","mb-3","text-4xl"],[1,"text-orange-500","text-3xl"],[4,"ngIf"],[1,"text-green-500","text-2xl"],[1,"text-500","ml-4"],[1,"text-red-500","text-2xl"]],template:function(n,a){1&n&&(e.TgZ(0,"div",0),e.YNc(1,k,12,10,"div",1),e.qZA()),2&n&&(e.xp6(1),e.Q6J("ngForOf",a.dashboardData))},dependencies:[l.sg,l.O5],encapsulation:2}),i})(),E=(()=>{var t;class i{}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[c.Bz.forChild([{path:"",component:H}]),c.Bz]}),i})(),S=(()=>{var t;class i{}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,m.u5,g.S,f.$9,C.U$,y,D.ml,p.hJ,E]}),i})()}}]);