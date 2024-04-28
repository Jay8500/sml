import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-employeecreate',
  templateUrl: './employeecreate.component.html',
})
export class EmployeecreateComponent implements OnInit {
  @ViewChild('aa', { static: false }) aa!: FileUpload;
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
    empid: null,
    A: null,
    empname: null,
    empcode: null,
    qualifications: null,
    experience: null,
    noofyears: null,
    previouscompany: null,
    address: null,
    surity: null,
    reference: null,
    contactno: null,
    active: true
  };
  public defaultUser = JSON.stringify(this.createMaster);

  public errorMessages = {
    empname: "",
    contactno: "",
    experience: "",
    noofyears: "",
    qualifications: ""
  };
  public defErrs = JSON.stringify(this.errorMessages);

  getErrorMessages(ctrl: string) {
    switch (ctrl) {
      case "name":
        this.errorMessages.empname = [undefined, null, ''].includes(this.createMaster.empname) ? 'Name is required' : "";
        break;

      case "contactno":
        this.errorMessages.contactno = [undefined, null, ''].includes(this.createMaster.contactno) ? 'Contact is required' : this.createMaster.contactno.length != 10 ? 'Contact no. should have 10 digits' : "";
        break;
      case "experience":
        this.errorMessages.experience = [undefined, null, ''].includes(this.createMaster.experience) ? 'Address is required' : "";
        break;
    }
  }

  ngOnInit() {
    this.countries = [
      {
        name: 'Australia',
        code: 'AU',
        states: [
          {
            name: 'New South Wales',
            cities: [
              { cname: 'Sydney', code: 'A-SY' },
              { cname: 'Newcastle', code: 'A-NE' },
              { cname: 'Wollongong', code: 'A-WO' }
            ]
          },
          {
            name: 'Queensland',
            cities: [
              { cname: 'Brisbane', code: 'A-BR' },
              { cname: 'Townsville', code: 'A-TO' }
            ]
          }
        ]
      },
      {
        name: 'Canada',
        code: 'CA',
        states: [
          {
            name: 'Quebec',
            cities: [
              { cname: 'Montreal', code: 'C-MO' },
              { cname: 'Quebec City', code: 'C-QU' }
            ]
          },
          {
            name: 'Ontario',
            cities: [
              { cname: 'Ottawa', code: 'C-OT' },
              { cname: 'Toronto', code: 'C-TO' }
            ]
          }
        ]
      },
      {
        name: 'United States',
        code: 'US',
        states: [
          {
            name: 'California',
            cities: [
              { cname: 'Los Angeles', code: 'US-LA' },
              { cname: 'San Diego', code: 'US-SD' },
              { cname: 'San Francisco', code: 'US-SF' }
            ]
          },
          {
            name: 'Florida',
            cities: [
              { cname: 'Jacksonville', code: 'US-JA' },
              { cname: 'Miami', code: 'US-MI' },
              { cname: 'Tampa', code: 'US-TA' },
              { cname: 'Orlando', code: 'US-OR' }
            ]
          },
          {
            name: 'Texas',
            cities: [
              { cname: 'Austin', code: 'US-AU' },
              { cname: 'Dallas', code: 'US-DA' },
              { cname: 'Houston', code: 'US-HO' }
            ]
          }
        ]
      }
    ];
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
    this._service.postApi('getCompany', 'postEndPoint', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {

            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products: any = {
                empid: prodcuts.empid,
                empname: prodcuts.empname,
                empcode: prodcuts.empcode,
                qualifications: prodcuts.fications,
                experience: prodcuts.xperience,
                noofyears: prodcuts.noofyears,
                previouscompany: prodcuts.uscompany,
                address: prodcuts.address,
                surity: prodcuts.surity,
                reference: prodcuts.reference,
                contactno: prodcuts.contactno,
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
      this._service.postApi('getEmployee', 'postEndPoint', {})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.blocUI = false;
              data['DATA'].forEach((pros: any, prdIn: number) => {
                let createCompanies: any = {
                  active: pros.active,
                  create_dt: pros.create_dt,
                  empid: pros.empid,
                  empname: pros.empname,
                  empcode: pros.empcode,
                  qualifications: pros.qualifications,
                  experience: pros.experience,
                  noofyears: pros.noofyears,
                  previouscompany: pros.previouscompany,
                  address: pros.address,
                  surity: pros.surity,
                  reference: pros.reference,
                  contactno: pros.contactno,
                  A: pros.A,
                  id: pros._id,
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
  public image: any = [];
  onSelect(event: any, ctrl: string) { // A, RC, HTR,LA, HP, PPC, OTHERS
    try {
      if (![undefined, null, ''].includes(event)) {
        if (Object.keys(event.files).length > 0) {
          const files = event.files[0];
          if (files) {
            event.files[0]['ctrl'] = ctrl;
            this.image.push({ ctrl: ctrl, files: event.files[0] })
            this.createMaster[ctrl] = event.files[0]['name'];
            // if (files) this.uploadFile(files, ctrl)
            this.aa.clear();
          }
        };
      }
    } catch (e) {
    };
  }

  uploadFile(files: File, ctrl: string): void {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let base64 = e.target.result;
      this.createMaster[ctrl] = base64;
    };
    reader.readAsDataURL(files);

  }

  fileSize = () => this._service.fileMaxSize();
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
        create_dt: event.create_dt,
        empid: event.empid,
        empname: event.empname,
        empcode: event.empcode,
        qualifications: event.qualifications,
        experience: event.experience,
        noofyears: event.noofyears,
        previouscompany: event.previouscompany,
        address: event.address,
        surity: event.surity,
        reference: event.reference,
        contactno: event.contactno,
        id: event.id,
        active: event.active ? true : false,
      };
    };
  }


  public submitloading = false;

  saveProduct() {

    try {
      let cols = [
        "cname",
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

        const formData = new FormData();
        formData.append('secure', JSON.stringify(savePayload));
        if (this.image.length > 0) {

          this.image.forEach((item: any, index: number) => {
            formData.append('image', item.files);
            // formData.append(`image-${index}`, );
          });
        };
        let loginJson = this._service.formpostApi('createEmployee', 'postEndPoint', formData)
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
