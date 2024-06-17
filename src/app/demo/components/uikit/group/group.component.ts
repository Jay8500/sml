import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

  public isShowForm = false;
  public isShowSidebarClose = false;
  public isCloseOnEscape = false;
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public _service = inject(ServicesService);
  countries: any[] | undefined;
  public blocUI = false;
  selectedCity: any;
  selectedState: any = null;
  states: any[] = [
    { name: 'Arizona', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' }
  ];

  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  public statuses = [
    { label: 'Active', value: 'qualified' },
    { label: 'Inactive', value: 'unqualified' },
    { label: 'New', value: 'new' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Renewal', value: 'renewal' },
    { label: 'Proposal', value: 'proposal' }
  ];

  public branches = [
    {
      label: "Select Branches",
      value: null,
      bcode: "",
      clientCount: 0
    }
  ];
  public caders = [
    {
      label: "Select Caders",
      value: null
    }
  ];
  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;
  public mode = "";
  public addressList: any = [];

  public loading = false;
  public crudGrid: any = [];
  public params: any = {};
  public createMaster: any = {
    id: null,
    name: "",
    cLogo: null,
    ccode: "",
    cadress: "",
    city: "",
    decs: "",
    active: true
  };
  public defaultUser = JSON.stringify(this.createMaster);

  public errorMessages = {
    name: "",
    cadress: "",
    city: ""
  };
  public defErrs = JSON.stringify(this.errorMessages);

  getErrorMessages(ctrl: string) {
    switch (ctrl) {
      case "name":
        this.errorMessages.name = [undefined, null, ''].includes(this.createMaster.name) ? 'Name is required' : "";
        break;

    }
  }

  ngOnInit() {

    let cader = this._service.getUserInfo('userCader');

    if (cader['code'] == 'DA') {
      this.params['code'] = 'DEV';
    };

    if (cader['code'] == 'SA') {
      this.params['code'] = 'SA';
    };

    if (cader['code'] == 'HRPM') {
      this.params['code'] = 'HRPM';
    }
    this.params['create_by'] = this._service.getUserInfo('_id');
    this._service.postApi('grouplist', 'postEndPoint', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {

            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products = {
                label
                  :
                  prodcuts.bname,
                value
                  :
                  prodcuts.id,
                bcode
                  :
                  prodcuts.bcode,
                clientCount: prodcuts.clientCount
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

    //
    this.addressList = [];
    this._service.postApi('getAddressList', 'postEndPoint', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.addressList = data['DATA'][0]['data'];
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });
    this.gridData();
  }


  gridData() {
    try {
      this.loading = true;
      let cader = this._service.getUserInfo('userCader');

      if (cader['code'] == 'DA') {
        this.params['code'] = 'DEV';
      };

      if (cader['code'] == 'SA') {
        this.params['code'] = 'SA';
      };

      if (cader['code'] == 'HRPM') {
        this.params['code'] = 'HRPM';
      }
      this.params['create_by'] = this._service.getUserInfo('_id');
      this.crudGrid = [];
      this._service.postApi('grouplist', 'postEndPoint', {})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.blocUI = false;
              data['DATA'].forEach((pros: any, prdIn: number) => {
                let createCompanies: any = {
                  active: pros.active,
                  name
                    :
                    pros.name,
                  ccode
                    :
                    pros.ccode,
                  create_dt
                    :
                    pros.create_dt,
                  decs
                    :
                    pros.decs,
                  id
                    :
                    pros._id,
                  dataKey: prdIn + 1,
                  status: (pros.active == true ? 'Qualified' : 'Unqualified')

                };
                this.crudGrid.push(createCompanies)
              });
              // this.crudGrid = data['DATA'];
              this.loading = false;
            } else if (data['S_CODE'] == 300) {
              this.blocUI = false;
              this.loading = false;
            }
          },
          error: (err) => {
            this.blocUI = false;
            // this.myModels = [];
            // console.log('error')
          }
        });
    } catch (e) {
      this.blocUI = false;
    }
  }

  // onClick(ctrl: string, data: any) {
  //     this.isShowForm = true;
  // }


  public isOk = false;
  onClick(event: any, mode: any) {
    this.isShowForm = true;
    this.isShowSidebarClose = true;
    this.errorMessages = JSON.parse(this.defErrs);
    // console.log("event",event)
    this.createMaster = JSON.parse(this.defaultUser);
    this.mode = mode;
    if (['VIEW', 'EDIT'].includes(mode)) {
      //   this.isClicked = true;
      this.createMaster = {
        name: event.name,
        ccode: event.ccode,
        cLogo: event.cLogo,
        cadress: event.cadress,
        city: { "code": event.city, "name": event.cityname },
        decs: event.decs,
        id: event.id,
        active: event.active ? true : false,

      };
    };
  }


  public submitloading = false;

  saveProduct() {

    try {
      let cols = [
        "name",
        "city",
        "cadress"
      ];
      _.forEach(cols, (cols, colIn) => {
        this.getErrorMessages(cols);
      });

      let count = 0;
      let checkValues = Object.values(this.errorMessages).every((ele: any, eleIn: number) => {
        if (ele == '') {
          count++;
        }
      });

      if (count > 0) {
        this.submitloading = true;
        let savePayload = JSON.parse(JSON.stringify(this.createMaster));
        savePayload['flag'] = this.mode == 'NEW' || this.mode == '' ? 'S' : 'E';

        savePayload['create_by'] = this._service.getUserInfo('_id');
        // return;
        // this.loading = true;
        let loginJson = this._service.postApi('create-group', 'postEndPoint', savePayload)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data) => {
              data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
              if (data.S_CODE == 200) {
                this.isShowSidebarClose = false; this.isOk = true;
                this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
                this.submitloading = false;
                this.createMaster = JSON.parse(this.defaultUser);
              } else if (data.S_CODE == 300) {
                this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
                this.submitloading = false; this.isShowSidebarClose = false;
              }
            },
            error: (err) => {
              // console.log('error', err);
              this.submitloading = false;
            }
          });

      };

    } catch (e) {

    }
    // this.loading = false;
  }

  hideDialog() {
    // this.isShowForm = false;
    this.createMaster = JSON.parse(this.defaultUser);
    this.errorMessages = JSON.parse(this.defErrs);
  }


  onMessageClose() {
    if (this.isOk) {
      this.isShowSidebarClose = true;
      this.gridData();
      this.hideDialog();
    }
  }


}
