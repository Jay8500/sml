import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [MessageService]
})
export class ClientsComponent implements OnInit {
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public caderCols: any = [
    {
      header: 'Borrower Name',
      style: { 'width': '25rem' },
      showSort: true,
      field: 'name'
    },
    {
      header: 'Aadhar',
      style: { 'width': '14rem' },
      showSort: true,
      field: 'aadhar'
    },
    {
      header: 'SML Code',
      style: { 'width': '15rem' },
      showSort: true,
      field: 'ccode'
    },
    {
      header: 'Description',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'description'
    },
    {
      header: 'Branch',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'branch_name'
    },
    {
      header: 'District',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'district'
    },
    {
      header: 'State',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'state'
    },
    {
      header: 'Pincode',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'pincode'
    },
    {
      header: 'Contact No.',
      style: { 'width': '12rem' },
      showSort: true,
      field: 'contact_no'
    },
    {
      header: 'Created By',
      style: { 'width': '13rem' },
      showSort: true,
      field: 'byemployeename'
    },
    {
      header: 'Status',
      style: { 'width': '10rem' },
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
  ];
  public isClicked = false;
  public createMaster: any = {
    name: "",
    aadhar: "",
    ccode: "",

    description: "",
    branch_id: null,
    cader_id: this._service.getUserInfo('cader'),
    district: null,
    state: null,
    pincode: null,
    contact_no: null,
    byemployee: this._service.getUserInfo('_id'),
    byemployeename: this._service.getUserInfo('uname'),
    active: true
  };
  public defaultMaster = JSON.stringify(this.createMaster);
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

  isEnabled(event: any) {
    this.isClicked = event
  }

  ngOnInit(): void {
    this._service.postApi('getBranch', 'postEndPoint', null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data['S_CODE'] == 200) {
            // this.companies = [{
            //   label: "Select Company",
            //   value: null
            // }];
            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products = {
                label
                  :
                  prodcuts.bname,
                value
                  :
                  prodcuts._id
              };
              this.branches.push(products)
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

  public loading = false;

  saveProduct() {
    this.loading = true;
    try {
      let savePayload = JSON.parse(JSON.stringify(this.createMaster));
      savePayload['flag'] = 'S';

      let loginJson = this._service.postApi('createBorrowers', 'postEndPoint', savePayload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if (data.S_CODE == 200) {
              this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
              this.loading = false;
              this.createMaster = JSON.parse(this.defaultMaster);
            } else if (data.S_CODE == 300) {
              this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
              this.loading = false;
            }
          },
          error: (err) => {
            // console.log('error', err);
            this.loading = false;
          }
        });
    } catch (e) {

    }


    this.loading = false;
  }

  hideDialog() {
    this.MessageService.clear();
    this.isClicked = false;
    this.createMaster = JSON.parse(this.defaultMaster);
  }
}
