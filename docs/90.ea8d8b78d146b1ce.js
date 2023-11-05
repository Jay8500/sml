"use strict";(self.webpackChunksml=self.webpackChunksml||[]).push([[90],{1090:(w,d,l)=>{l.r(d),l.d(d,{ClientsModule:()=>y});var c=l(6814),e=l(4769),p=l(707),m=l(5219),g=l(7992),u=l(5359),C=l(6218),h=l(2352),f=l(7213),r=l(95);function v(i,A){if(1&i){const t=e.EpF();e.TgZ(0,"p-divider",5)(1,"span",6),e._uU(2,"Create Client"),e.qZA()(),e.TgZ(3,"div",7)(4,"div",8)(5,"div",9)(6,"label",10),e._uU(7,"Name"),e.qZA(),e.TgZ(8,"input",11),e.NdJ("ngModelChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.createMaster.master_name=n)}),e.qZA()(),e.TgZ(9,"div",9)(10,"label",10),e._uU(11,"Branch"),e.qZA(),e.TgZ(12,"p-dropdown",12),e.NdJ("ngModelChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.createMaster.branch_id=n)}),e.qZA()(),e.TgZ(13,"div",9)(14,"label",10),e._uU(15,"Description"),e.qZA(),e.TgZ(16,"textarea",13),e.NdJ("ngModelChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.createMaster.description=n)}),e.qZA()(),e.TgZ(17,"div",9)(18,"input",14),e.NdJ("ngModelChange",function(n){e.CHM(t);const a=e.oxw();return e.KtG(a.createMaster.active=n)}),e.qZA(),e.TgZ(19,"label",15),e._uU(20,"Active"),e.qZA()()()()}if(2&i){const t=e.oxw();e.xp6(8),e.Q6J("ngModel",t.createMaster.master_name),e.xp6(4),e.Q6J("options",t.branches)("ngModel",t.createMaster.branch_id),e.xp6(4),e.Q6J("ngModel",t.createMaster.description),e.xp6(2),e.Q6J("ngModel",t.createMaster.active)("disabled",!0)}}function M(i,A){if(1&i){const t=e.EpF();e.TgZ(0,"div",16)(1,"div",17)(2,"button",18),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.hideDialog())}),e.qZA()(),e.TgZ(3,"div",17)(4,"button",19),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.saveProduct())}),e.qZA()()()}}const _=function(){return{width:"50rem",height:"50rem"}};let x=(()=>{class i{constructor(){this.caderCols=[{header:"Name",style:{width:"30rem"},showSort:!0,field:"cdname"},{header:"Code",style:{width:"30rem"},showSort:!0,field:"code"},{header:"Status",style:{width:"30rem"},showSort:!1,field:"cdname",color:[{width:"10rem",color:"#FF0000"},{width:"10rem",color:"#00FF00"}]}],this.isClicked=!1,this.createMaster={master_name:"",description:"",branch_id:null,cader_id:null,active:!0},this.branches=[{label:"Select Branches",value:null}],this.caders=[{label:"Select Caders",value:null}]}isEnabled(t){this.isClicked=t}hideDialog(){this.isClicked=!1}saveProduct(){}static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-clients"]],decls:5,vars:8,consts:[[1,"grid"],[3,"headerName","masterApiKey","cols","isEnabled"],["styleClass","p-fluid",3,"visible","modal","visibleChange"],["pTemplate","content"],["pTemplate","footer"],["align","center"],[1,"p-tag","p-1"],[1,"flex","flex-colum","align-items-center","justify-content-center"],[1,"m-3"],[1,"field"],["for","firstname2"],["id","firstname2","type","text",1,"text-base","text-color","surface-overlay","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full",3,"ngModel","ngModelChange"],["styleClass","h-2.2rem w-full",3,"options","ngModel","ngModelChange"],["rows","5","cols","30","pInputTextarea","",3,"ngModel","ngModelChange"],["type","checkbox","name","master","id","1",3,"ngModel","disabled","ngModelChange"],["for","lastname2",1,"ml-2"],[1,"flex","align-items-center","justify-content-center","m-2"],[1,"p-1"],["pButton","","pRipple","","icon","pi pi-times","label","Cancel","styleClass","p-button-rounded ",1,"w-10rem","p-1","text-xl",3,"click"],["pButton","","pRipple","","label","Save","icon","pi pi-check","styleClass","p-button-rounded ",1,"w-10rem","p-1","text-xl",3,"click"]],template:function(o,n){1&o&&(e.TgZ(0,"div",0)(1,"crudgrid",1),e.NdJ("isEnabled",function(s){return n.isEnabled(s)}),e.qZA()(),e.TgZ(2,"p-dialog",2),e.NdJ("visibleChange",function(s){return n.isClicked=s}),e.YNc(3,v,21,6,"ng-template",3),e.YNc(4,M,5,0,"ng-template",4),e.qZA()),2&o&&(e.xp6(1),e.Q6J("headerName","Manage Clients")("masterApiKey","caders")("cols",n.caderCols),e.xp6(1),e.Akn(e.DdM(7,_)),e.Q6J("visible",n.isClicked)("modal",!0))},dependencies:[p.Hq,m.jx,g.w,u.i,C.g,h.Lt,f.V,r.Fj,r.Wl,r.JJ,r.On]})}return i})();var b=l(4670),T=l(7454);const Z=[{path:"",component:x}];let y=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#n=this.\u0275inj=e.cJS({imports:[c.ez,T.m,r.u5,b.Bz.forChild(Z)]})}return i})()}}]);