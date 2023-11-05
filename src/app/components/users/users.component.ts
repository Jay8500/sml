import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  public onlyGenderProps = {
    active
      :
      null,
    cader
      :
      null,
    department
      :
      null,
    create_by
      :
      null,
    create_dt
      :
      null,
    modify_by
      :
      null,
    modify_dt
      :
      null,
    password
      :
      null,
    uname
      :
      null
  }
  public userCols: any = [
    {
      header: 'Name',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'uname'
    },
    {
      header: 'Cader',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'cader'
    },
    {
      header: 'Department',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'department'
    },
    {
      header: 'Status',
      style: 'width:10rem',
      showSort: false,
      field: 'active',
      "color": [
        {
          "width": '10rem', "color": '#FF0000'
        },
        {
          "width": '10rem', "color": '#00FF00'
        }
      ],
    },
  ]
  public isClicked = false;
  public createMaster: any = {
    master_name: "",
    password: "",
    description: "",
    branch_id: null,
    cader_id: null,
    dep_id: null,
    active: true
  };
  public branches = [
    {
      label: "Select Branches",
      value: null
    }
  ];
  public caders = [
    {
      label: "Select Caders",
      value: null
    }
  ];
  public departments = [
    {
      label: "Select Department",
      value: null
    }
  ];

  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  ngOnInit() {
    this._service.postApi('caders', 'postEndPoint', null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data['S_CODE'] == 200) {
            this.caders = [{
              label: "Select Caders",
              value: null
            }];
            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products = {
                label
                  :
                  prodcuts.cdname,
                value
                  :
                  prodcuts._id
              };
              this.caders.push(products)
            });
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });
  }

  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.isClicked = false;
  }

  public loading = false;

  saveProduct() {

    let savePayload = JSON.parse(JSON.stringify(this.createMaster));
    savePayload['flag'] = 'S';
    savePayload['uname'] = this.createMaster.master_name;
    savePayload['password'] = this.createMaster.password;
    savePayload['cader'] = this.createMaster.cader_id;
    savePayload['department'] = this.createMaster.dep_id;

    delete savePayload.master_name;
    delete savePayload.branch_id;
    delete savePayload.password;
    delete savePayload.cader_id;

    this.loading = true;
    let loginJson = this._service.postApi('smlusers', 'postEndPoint', savePayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.loading = false;
          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            this.loading = false;
          }
        },
        error: (err) => {
          console.log('error', err);
          this.loading = false;
        }
      });


  }
}
