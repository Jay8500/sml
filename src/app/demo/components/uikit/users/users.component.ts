import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent {
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

  public caders = [
    {
      label: "Select Cadre",
      value: null
    }
  ];
  public genderList = [
    {
      label: "Select Gender",
      value: null
    }
  ];
  public branchList = [
    {
      label: "Select Branch",
      value: null
    }
  ];

  public branches = [
    {
      label: "Select Branches",
      value: null,
      bcode: "",
      clientCount: 0
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
    empId: null,
    master_name: "",
    password: "",
    description: "",
    branchid: null,
    gender: null,
    cader_id: null,
    dep_id: null,
    active: true,
  };
  public defaultUser = JSON.stringify(this.createMaster);

  public errorMessages = {
    master_name: "",
    password: "",
    cader_id: "",
    branchid: "",
    gender: "",
  };
  public defErrs = JSON.stringify(this.errorMessages);

  getErrorMessages(ctrl: string) {
    switch (ctrl) {
      case "master_name":
        this.errorMessages.master_name = [undefined, null, ''].includes(this.createMaster.master_name) ? 'Name is required' : "";
        break;
      case "password":
        this.errorMessages.password = [undefined, null, ''].includes(this.createMaster.password) ? 'Password is required' : "";
        break;

      case "cader_id":
        this.errorMessages.cader_id = [undefined, null, ''].includes(this.createMaster.cader_id) ? 'Cader is required' : "";
        break;
      case "branchid":
        this.errorMessages.branchid = [undefined, null, ''].includes(this.createMaster.branchid) ? 'Branch is required' : "";
        break;
      case "gender":
        this.errorMessages.gender = [undefined, null, ''].includes(this.createMaster.gender) ? 'Gender is required' : "";
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
      this.params['ctrl'] = 'filter';
    }
    this.params['create_by'] = this._service.getUserInfo('_id');
    this._service.postApi('caders', 'postEndPoint', { cader: cader['code'] })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.caders = [{
              label: "Select Cadre",
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

    this._service.postApi('getGenders', 'postEndPoint', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.genderList = [{
              label: "Select Genders",
              value: null
            }];
            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products = {
                label
                  :
                  prodcuts.gname,
                value
                  :
                  prodcuts._id
              };
              this.genderList.push(products)
            });
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });

    this._service.postApi('getBranch', 'postEndPoint', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.branchList = [{
              label: "Select Branches",
              value: null
            }];
            data['DATA'] = _.filter(data['DATA'], { active: true });
            data['DATA'].forEach((prodcuts: any, prdIn: number) => {
              let products = {
                label
                  :
                  prodcuts.bname,
                value
                  :
                  prodcuts._id
              };
              this.branchList.push(products)
            });
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });

    this.gridData();
    this.employeesList();
  }

  public employeesListInfo: any = [];
  employeesList() {
    try {
      this.employeesListInfo = [];
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
      this.employeesListInfo = [];
      this._service.postApi('getEmployee', 'postEndPoint', {})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.blocUI = false;
              if (data['DATA'].length > 0) {
                data['DATA'] = _.filter(data['DATA'], (fl, flIn) => fl.active == true);
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
                  this.employeesListInfo.push(createCompanies)
                });
              }
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
      this._service.postApi('smlgetusers', 'postEndPoint', this.params)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.blocUI = false;
              if (data['DATA'].length > 0) {
                data['DATA'].forEach((pros: any, prdIn: number) => {
                  let createdBorrowers: any = {
                    active: pros.active,
                    cader
                      :
                      pros.cader,
                    cadername
                      :
                      pros.cadername,
                    desc
                      :
                      pros.desc,
                    gender
                      :
                      pros.gender,
                    gendername
                      :
                      pros.gendername,
                    id
                      :
                      pros.id,
                    branchname
                      :
                      pros.branchname,
                    branchid
                      :
                      pros.branchid,

                    uname
                      :
                      pros.uname,
                    dataKey: prdIn + 1,
                    branch_id: pros.branch_id,
                    status: (pros.active == true ? 'Active' : 'Inactive')

                  };
                  this.crudGrid.push(createdBorrowers)
                });
                this.crudGrid = data['DATA'];
              };
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
    this.submitloading = false;
    this.isShowForm = true;
    this.isShowSidebarClose = true;
    this.errorMessages = JSON.parse(this.defErrs);
    // console.log("event",event)
    this.createMaster = JSON.parse(this.defaultUser);
    this.mode = mode;
    if (['VIEW', 'EDIT'].includes(mode)) {
      //   this.isClicked = true;
      this.createMaster = {
        master_name: event.uname,
        password: null,//event.password,
        description: event.desc,
        branchid: event.branchid,
        branchname: event.branchname,
        gender: event.gender,
        cader_id: event.cader,
        id: event.id,
        active: event.active,

      };
    };
  }


  public submitloading = false;

  saveProduct() {

    try {
      let cols = [
        "master_name",
        "password",
        "gender",
        "cader_id",
        "branchid"
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

        savePayload['empid'] = this.createMaster.empId['id'];
        savePayload['A'] = this.createMaster.empId['A'];

        savePayload['uname'] = this.createMaster.master_name.trim();

        savePayload['uname'] = this.createMaster.master_name.trim();
        savePayload['password'] = this.createMaster.password;
        savePayload['cader'] = this.createMaster.cader_id;
        savePayload['department'] = this.createMaster.dep_id;
        savePayload['create_by'] = this._service.getUserInfo('_id');
        savePayload['branchname'] = _.filter(this.branchList, (b, bIn) => b.value == savePayload['branchid'])[0]['label'];
        delete savePayload.master_name;
        // delete savePayload.branch_id;
        // // delete savePayload.password;
        delete savePayload.cader_id;

        // console.log(savePayload)
        let loginJson = this._service.postApi('smlusers', 'postEndPoint', savePayload)
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
                // this.submitloading = false;
                this.isShowSidebarClose = false;
                this.submitloading = false;
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
    this.isShowForm = false;
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

  checkForValidUser() {
    this.MessageService.clear();
    try {
      let isValidUname = ['', undefined, null, 0].includes(this.createMaster.master_name.trim()) ? true : false;
      this.errorMessages.master_name = isValidUname ? 'User name  is required' : "";

      if (isValidUname) {
        // this.MessageService.add({ severity: 'error', summary: 'Duplication Error', detail: `Please Check Below Errors` });
        return;
      };

      if (![undefined, null, ''].includes(this.createMaster.master_name)) this.createMaster.master_name = this.createMaster.master_name.trim();
      this._service.postApi('forgotpwd', 'postEndPoint', { flag: 'S', uname: this.createMaster.master_name }).subscribe(res => {
        res = this._service.enableCryptoForResponse() ? this._service.decrypt(res) : res;
        if (res.S_CODE == 200) {
          this.errorMessages.master_name = 'User Already exists';
          // this.isValidPwd = true;
        } else if (res.S_CODE == 300) {
          this.errorMessages.master_name = '';
          // this.isValidPwd = false;
        };
      });

    } catch (e) {

    }
  }

  onEmployeeSelect() {

  }
}
