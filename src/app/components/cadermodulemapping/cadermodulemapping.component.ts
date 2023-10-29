import { Component, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-cadermodulemapping',
  templateUrl: './cadermodulemapping.component.html',
  styleUrls: ['./cadermodulemapping.component.css'],
  providers: [MessageService]
})
export class CadermodulemappingComponent implements OnInit {
  public caderMpngMdles: any = [];
  public getCaders: any = [];
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private messageService: MessageService) {

  }
  ngOnInit(): void {
    this._service.getApi('moduleCaderMapping', 'getEndPoint', null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data['S_CODE'] == 200) {
            this.caderMpngMdles = [];
            data['DATA']['getCaders'].forEach((list: any, listIn: number) => {
              list['isCdCkd'] = false
            });
            data['DATA']['getModules'].forEach((list: any, listIn: number) => {
              let createParent: any = {
                _mdId: list._id,
                mdname: list.mdname,
                "isParent": false,
                mdchild: [],
              };
              list['mdchilds'].forEach((cList: any, cLin: number) => {
                let createChild: any = {
                  _cId: cList._id,
                  mdname: cList.submdname,
                  icon: cList.icon,
                  routerLink: cList.routerLink,
                  "isChild": false,
                };
                createParent.mdchild.push(createChild);
              });
              this.caderMpngMdles.push(createParent);
            });

            this.caderMpngMdles.map((items: any, ind: number) => {
              items['getCaders'] = [];
              items['getCaders'] = JSON.parse(JSON.stringify(data['DATA']['getCaders']))
            }
            )


          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });
  }


  onParentModuleClick(event: any, mdIn: number) {  //mdls['isParent'] = 
    this.caderMpngMdles[mdIn]['mdchild'].forEach((chlds: any, clIn: number) => {
      chlds.isChild = event.target.checked;
    });
    this.show();
  }

  onChildModuleClick(event: any, mdIn: number, mdcIn: number) {
    let totalChilds = this.caderMpngMdles[mdIn]['mdchild'].length;
    let getAllCheckedLength = this.caderMpngMdles[mdIn]['mdchild'].filter((childs: any, childIn: number) => childs.isChild == true).length;
    this.caderMpngMdles[mdIn]['isParent'] = !(getAllCheckedLength <= totalChilds) || (totalChilds == getAllCheckedLength);
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
   // this.show();
  }

}
