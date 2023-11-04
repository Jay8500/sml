import { Component, OnInit, inject } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: any = [];
  public blocUI = true;
  public sidebarVisible = false;
  public _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public myModels: any;
  public _route = inject(Router);
  constructor() {
    this.loadMenuData()
  }

  async ngOnInit() {


    this._route.navigate(['/sml/sml-dashboard'])
  }

  loadMenuData() {
    this.myModels = [
      {
        n: "b",
        c: [
          {
            n: "b",
          },
          {
            n: "b",
          },
          {
            n: "b",
          }
        ]
      },
      {
        n: "b",
        c: [
          {
            n: "b",
          },
          {
            n: "b",
          },
          {
            n: "b",
          },
          {
            n: "b",
          }
        ]
      }
    ];

    this._service.getApi('getDash', 'getEndPoint', null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data['S_CODE'] == 200) {
            //  this.model = [];
            if (data['DATA'].length > 0) {
              data['DATA'].forEach((list: any, listIn: number) => {
                let createParent: any = {
                  label: list.mdname,
                  items: []
                };
                let activeChilds = list['mdchilds'].filter((f: any) => f.active == true);
                activeChilds.forEach((cList: any, cLin: number) => {
                  let createChild: any = {
                    label: cList.submdname,
                    icon: cList.icon,
                    routerLink: cList.routerLink,
                    isToggle: cList.routerLink == '/sml/sml-dashboard' ? true : false,
                    code: cList.code
                  };
                  createParent.items.push(createChild);
                });
                this.model.push(createParent);
              });
            };
            this.blocUI = false;
            this.myModels = [];
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });
  }

  toggle(mi: any, ci: any) {
    this.model.forEach((md: any, mdIn: number) => {
      md.items.forEach((its: any, itIn: number) => {
        its.isToggle = false;
      });
    });
    this.model[mi]['items'][ci]['isToggle'] = !this.model[mi]['items'][ci]['isToggle']
  }


  sidebarClick(event: boolean) {
    this.sidebarVisible = true
  }
}
