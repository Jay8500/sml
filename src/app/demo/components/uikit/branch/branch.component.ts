import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class BranchComponent {
  @ViewChild('aa', { static: false }) aa!: FileUpload;
  @ViewChild('ab', { static: false }) ab!: FileUpload;
  @ViewChild('ac', { static: false }) ac!: FileUpload;
  @ViewChild('ad', { static: false }) ad!: FileUpload;
  @ViewChild('ae', { static: false }) ae!: FileUpload;
  @ViewChild('af', { static: false }) af!: FileUpload;
  @ViewChild('ag', { static: false }) ag!: FileUpload;

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
  public companyList = [{
    label: "Select Company",
    value: null,
    branchCount: 0
  }];

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
    bname: null,
    bcode: null,
    desc: "",
    b_opn_dt: null,
    cId: null,
    state: null,
    district: null,
    pincode: null,
    contact_no: null,
    active: true
  };
  public defaultUser = JSON.stringify(this.createMaster);

  public errorMessages = {
    bname: "",
    bcode: "",
    desc: "",
    b_opn_dt: "",
    cId: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    contact_no: "",
    active: ""
  };
  public defErrs = JSON.stringify(this.errorMessages);

  getErrorMessages(ctrl: string) {
    switch (ctrl) {
      case "cId":
        this.errorMessages.cId = [undefined, null, ''].includes(this.createMaster.cId) ? 'Company is required' : "";
        break;
      case "bname":
        this.errorMessages.bname = [undefined, null, ''].includes(this.createMaster.bname) ? 'Name is required' : "";
        break;
      case "b_opn_dt":
        this.errorMessages.b_opn_dt = [undefined, null, ''].includes(this.createMaster.b_opn_dt) ? 'Opening date is required' : "";
        break;
      case "city":
        this.errorMessages.city = [undefined, null, ''].includes(this.createMaster.city) || typeof this.createMaster.city != 'object' ? 'City is required' : "";
        break;
      case "contact_no":
        this.errorMessages.contact_no = [undefined, null, ''].includes(this.createMaster.contact_no) ? 'Contact is required' : "";
        break;
      case "pincode":
        this.errorMessages.pincode = [undefined, null, ''].includes(this.createMaster.pincode) ? 'Pincode is required' : "";
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
    this._service.postApi('getBranch', 'postEndPoint', { filter: 'Drop' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.branches = [{
              label: "Select Branches",
              value: null,
              bcode: "",
              clientCount: 0
            }];
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

      this._service.postApi('getCompany', 'postEndPoint', { "filter": 'Drop' })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.companyList = [{
                label: "Select Company",
                value: null,
                branchCount: 0
              }];
              data['DATA'].forEach((prodcuts: any, prdIn: number) => {
                let products = {
                  label
                    :
                    prodcuts.cname,
                  value
                    :
                    prodcuts.id,
                  branchCount: prodcuts.branchCount
                };
                this.companyList.push(products)
              });
            };
          },
          error: (err) => {
            // this.blocUI = false;
            // this.myModels = [];
            // console.log('error')
          }
        });

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
      this._service.postApi('getBranch', 'postEndPoint', {})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.blocUI = false;
              data['DATA'].forEach((pros: any, prdIn: number) => {
                let createdBorrowers: any = {
                  active
                    :
                    pros.active,
                  b_opn_dt
                    :
                    pros.b_opn_dt,
                  bcode
                    :
                    pros.bcode,
                  bname
                    :
                    pros.bname,
                  cId
                    :
                    pros.cId,
                  city
                    :
                    pros.city,
                  cityname
                    :
                    pros.cityname,
                  cname
                    :
                    pros.cname,
                  contact_no
                    :
                    pros.contact_no,
                  countryname
                    :
                    pros.countryname,
                  create_by
                    :
                    pros.create_by,
                  create_dt
                    :
                    pros.create_dt,
                  desc
                    :
                    pros.desc,
                  modify_by
                    :
                    pros.modify_by,
                  modify_dt
                    :
                    pros.modify_dt,
                  pincode
                    :
                    pros.pincode,
                  state
                    :
                    pros.state,
                  id
                    :
                    pros._id,
                  dataKey: prdIn + 1,
                  branch_id: pros.branch_id,
                  status: (pros.active == true ? 'Qualified' : 'Unqualified')

                };
                this.crudGrid.push(createdBorrowers)
              });
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

  onSelect(event: any, ctrl: string) { // A, RC, HTR,LA, HP, PPC, OTHERS
    try {
      if (![undefined, null, ''].includes(event)) {
        if (Object.keys(event.files).length > 0) {
          const files = event.files[0];
          if (files) this.uploadFile(files, ctrl)
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
    this.aa.clear();
    this.ab.clear();
    this.ac.clear();
    this.ad.clear();
    this.ae.clear();
    this.af.clear();
    this.ag.clear();
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
        bname: event.bname,
        bcode: event.bcode,
        desc: event.desc,
        b_opn_dt: event.b_opn_dt,
        cId: event.cId,
        city: { "code": event.city, "cname": event.cityname },
        pincode: event.pincode,
        contact_no: event.contact_no,
        id: event.id,
        active: event.active ? true : false,

      };
    };
  }


  public submitloading = false;

  saveProduct() {

    try {
      let cols = [
        "cId",
        "bame",
        "b_opn_dt",
        "city",
        "contact_no",
        "pincode",
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
        let filterCities: any[] = [];
        _.forEach(this.addressList, (country) => {
          _.forEach(country['states'], (state) => {
            // Use _.filter on the array of cities and provide a predicate function
            const filteredCities = _.filter(state['cities'], (city) => {
              // Adjust the condition based on your filtering criteria
              return city.code === this.createMaster.city.code &&
                city.name === this.createMaster.city.name;
            });


            if (filteredCities.length > 0) {
              filterCities.push({
                country: country.name,
                state: state.name,
                cities: filteredCities,
              });
            }
          });
        });

        savePayload['countryname'] = filterCities[0]['country'];
        savePayload['state'] = filterCities[0]['state'];
        savePayload['cityname'] = filterCities[0]['cities'][0]['cname'];
        savePayload['cityname'] = filterCities[0]['cities'][0]['cname'];
        savePayload['city'] = this.createMaster['city']['code'];

        savePayload['create_by'] = this._service.getUserInfo('_id');
        delete savePayload.cader_id;
        let loginJson = this._service.postApi('createBranch', 'postEndPoint', savePayload)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data) => {
              data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
              if (data.S_CODE == 200) {
                this.isShowSidebarClose = false;
                this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
                this.isOk = true;
                this.createMaster = JSON.parse(this.defaultUser);
                this.submitloading = false;

              } else if (data.S_CODE == 300) {
                this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
                this.isShowSidebarClose = false;
                this.submitloading = false;
                // this.loading = false;
              }
            },
            error: (err) => {
              this.submitloading = false;
              // this.loading = false;
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
      // this.ngOnInit();
    }
  }

  generateCode(createMaster: any) {
    try {
      if (![undefined, null, ''].includes(createMaster['cId']) && ![undefined, null, ''].includes(createMaster['bname'])) {
        let getSlctdCpy = _.filter(this.companyList, { value: createMaster['cId'] });
        if (getSlctdCpy.length > 0) {
          createMaster['bcode'] =
            getSlctdCpy[0]['label'].slice(0, 1).toUpperCase() +
            createMaster['bname'].slice(0, 1).toUpperCase() +
            (getSlctdCpy[0]['branchCount'] + 1).toString().padStart(this._service.getCodeLength(), '0');
        };
      }
    } catch (e) {
    }
  }

  onCompanies(event: any) {
    try {
      this.createMaster.bcode = "";
      if (![undefined, null, ''].includes(this.createMaster['bname'])) {
        this.generateCode(this.createMaster);
      };
    } catch (e) { }
  }
}
