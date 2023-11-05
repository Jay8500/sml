import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
  providers: [MessageService]
})
export class BranchesComponent implements OnInit {
  public caderCols: any = [
    {
      "header": 'Company',
      "style": { "width": '15rem' },
      "showSort": true,
      "field": 'cname' //cname
    },
    {
      "header": 'Branch Name',
      "style": { "width": '15rem' },
      "showSort": true,
      "field": 'bname'
    },
    {
      "header": 'Branch Code',
      "style": { "width": '10rem' },
      "showSort": true,
      "field": 'bcode'
    },
    {
      "header": 'Description',
      "style": { "width": '10rem' },
      "showSort": true,
      "field": 'desc'
    },
    {
      "header": 'Branch Opened On',
      "style": { "width": '15rem' },
      "showSort": true,
      "field": 'b_opn_dt'
    },
    {
      "header": 'District',
      "style": { "width": '10rem' },
      "showSort": true,
      "field": 'district'
    },
    {
      "header": 'State',
      "style": { "width": '10rem' },
      "showSort": true,
      "field": 'state'
    },
    {
      "header": 'Pincode',
      "style": { "width": '10rem' },
      "showSort": true,
      "field": 'pincode'
    },
    {
      "header": 'Contact',
      "style": { "width": '10rem' },
      "showSort": true,
      "field": 'contact_no'
    },
    {
      "header": 'Status',
      "style": { "width": '10rem' },
      "showSort": false,
      "field": 'active',
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
  public companies: any = [
    // {
    //   label: "Select Company",
    //   value: null
    // }
  ];
  public isClicked = false;
  public createMaster: any = {
    bname: "",
    bcode: "",
    desc: "",
    cId: null,
    b_opn_dt: "",
    district: "",
    state: "",
    pincode: "",
    contact_no: "",
    active: true
  };
  public defaultMaster = JSON.stringify(this.createMaster);
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public onlyGenderProps = {
    cId: "",
    bname: "",
    bcode: "",
    desc: "",
    b_opn_dt: "",
    district: "",
    state: "",
    pincode: "",
    contact_no: "",
    active: true

  };
  ngOnInit(): void {
    this._service.postApi('getCompany', 'postEndPoint', null)
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
                  prodcuts.cname,
                value
                  :
                  prodcuts._id
              };
              this.companies.push(products)
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
    this.MessageService.clear();
    this.isClicked = false;
    this.createMaster = JSON.parse(this.defaultMaster);
  }

  public loading = false;

  saveProduct() {
    this.loading = true;
    try {
      let savePayload = JSON.parse(JSON.stringify(this.createMaster));
      savePayload['flag'] = 'S';

      let loginJson = this._service.postApi('createBranch', 'postEndPoint', savePayload)
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
}
