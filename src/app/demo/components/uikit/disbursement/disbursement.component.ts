
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DisbursementComponent {

  public pymentType = [
    {
      label: "Online",
      value: "Online"
    },
    {
      label: "Cash",
      value: "Cash"
    }
  ]
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
  public usersList: any = [
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

  public borrwoersList = [
    {
      label: 'Select borrowers',
      value: null
    }
  ]
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

  public houseTypeList = [
    {
      label: "Own",
      value: 1
    },
    {
      label: "Rent",
      value: 2
    }
  ];
  public productTypeList = [
    {
      label: "Deposit",
      value: 1
    },
    {
      label: "Mortgage Loan",
      value: 2
    },
    {
      label: "Housing Loan",
      value: 3
    },
    {
      label: "LAP",
      value: 4
    },
    {
      label: "Gold Loan",
      value: 5
    },
    {
      label: "Personal Loan",
      value: 6
    },
    {
      label: "Third Party",
      value: 7
    },
    {
      label: "MEL",
      value: 8
    },
    {
      label: "Group Lending",
      value: 9
    },
    {
      label: "Individual Lending",
      value: 10
    },
  ];

  public loanShedule = [
    {
      label: "Weekly",
      value: 1
    },
    {
      label: "Daily",
      value: 1
    },
    {
      label: "Monthly",
      value: 3
    },
  ];

  public loanAmountList = [
    {
      label: "Rs.5,000",
      value: 5000
    },
    {
      label: "Rs.6,000",
      value: 6000
    },
    {
      label: "Rs.7,000",
      value: 7000
    },
    {
      label: "Rs.8,000",
      value: 8000
    },
    {
      label: "Rs.9,000",
      value: 9000
    },
    {
      label: "Rs.10,000",
      value: 10000
    },
    {
      label: "Rs.15,000",
      value: 15000
    },
    {
      label: "Rs.20,000",
      value: 20000
    },
    {
      label: "Rs.25,000",
      value: 25000
    },
    {
      label: "Rs.30,000",
      value: 30000
    },
    {
      label: "Rs.35,000",
      value: 35000
    },
    {
      label: "Rs.40,000",
      value: 40000
    },
    {
      label: "Rs.45,000",
      value: 40000
    },
    {
      label: "Rs.50,000",
      value: 50000
    },
    {
      label: "Rs.60,000",
      value: 60000
    },
    {
      label: "Rs.70,000",
      value: 70000
    },
    {
      label: "Rs.80,000",
      value: 80000
    },
    {
      label: "Rs.90,000",
      value: 90000
    },
    {
      label: "Rs.100,000",
      value: 100000
    },
  ]

  public despositList = [
    {
      label: "Daily",
      value: 1
    },
    {
      label: "Weekly",
      value: 2
    },
    {
      label: "Monthly",
      value: 3
    },
    {
      label: "Recuring Deposit",
      value: 4
    },
  ];
  public tenureList = [
    {
      label: "50",
      value: 1
    },
    {
      label: "40",
      value: 2
    },
    {
      label: "35",
      value: 3
    },
    {
      label: "30",
      value: 4
    },
    {
      label: "25",
      value: 5
    },
    {
      label: "12",
      value: 6
    },
  ]

  public createMaster: any = {
    smtcode: "",
    branch: this._service.getUserInfo('branchid'),
    borrowername: "",
    repaymenttype: null,
    housetype: "",
    prodtype: "",
    loanamount: "",
    loanschedule: "",
    tenure: "",
    bankname: "",
    accountno: "",
    accountname: "",
    ifsc: "",
    surityname: "",
    surityaadhar: "",
    surityhousetype: "",
    contactnumber: "",
    deposit: "",
    approvalstatus: "P",
    approvalremarks: "",
    approvalby: "P",
    active: true,
    paymenttype: "",
    disbursementstatus: "",
    disbursementstatusremarks: ""
  };
  public defaultUser = JSON.stringify(this.createMaster);

  public errorMessages = {
    borrowername: "",
    housetype: "",
    prodtype: "",
    loanamount: "",
    loanschedule: "",
    tenure: "",
    bankname: "",
    accountno: "",
    accountname: "",
    ifsc: "",
    surityname: "",
    surityaadhar: "",
    surityhousetype: "",
    contactnumber: "",
    deposit: "",
    active: true,
    paymenttype: "",
    disbursementstatus: "",
    disbursementstatusremarks: ""
  };
  public defErrs = JSON.stringify(this.errorMessages);

  getErrorMessages(ctrl: string) {
    switch (ctrl) {
      case "paymenttype":
        this.errorMessages.paymenttype = [undefined, null, ''].includes(this.createMaster.paymenttype) ? 'Payment Type is required' : "";
        break;
      case "disbursementstatus":
        this.errorMessages.disbursementstatus = [undefined, null, ''].includes(this.createMaster.disbursementstatus) ? 'Dibursement Status is required' : "";
        break;
      // case "prodtype":
      //   this.errorMessages.prodtype = [undefined, null, ''].includes(this.createMaster.prodtype) ? 'Product type is required' : "";
      //   break;
      // case "loanamount":
      //   this.errorMessages.loanamount = [undefined, null, ''].includes(this.createMaster.loanamount) ? 'Amount is required' : "";
      //   break;
      // case "loanschedule":
      //   this.errorMessages.loanschedule = [undefined, null, ''].includes(this.createMaster.loanschedule) ? 'Loan schedule is required' : "";
      //   break;

      // case "tenure":
      //   this.errorMessages.tenure = [undefined, null, ''].includes(this.createMaster.tenure) ? 'Tenure is required' : "";
      //   break;
      // case "bankname":
      //   this.errorMessages.bankname = [undefined, null, ''].includes(this.createMaster.bankname) ? 'Bank name is required' : "";
      //   break;
      // case "accountno":
      //   this.errorMessages.accountno = [undefined, null, ''].includes(this.createMaster.accountno) ? 'Account no. is required' : "";
      //   break;
      // case "accountname":
      //   this.errorMessages.accountname = [undefined, null, ''].includes(this.createMaster.accountname) ? 'Account name is required' : "";
      //   break;
      // case "ifsc":
      //   this.errorMessages.ifsc = [undefined, null, ''].includes(this.createMaster.ifsc) ? 'IFSC is required' : "";
      //   break;

      // case "surityname":
      //   this.errorMessages.surityname = [undefined, null, ''].includes(this.createMaster.surityname) ? 'Surity name is required' : "";
      //   break;
      // case "surityaadhar":
      //   this.errorMessages.surityaadhar = [undefined, null, ''].includes(this.createMaster.surityaadhar) ? 'Surity aadhar is required' : "";
      //   break;
      // case "surityhousetype":
      //   this.errorMessages.surityhousetype = [undefined, null, ''].includes(this.createMaster.surityhousetype) ? 'Surity House Type is required' : "";
      //   break;
      // case "contactnumber":
      //   this.errorMessages.contactnumber = [undefined, null, ''].includes(this.createMaster.contactnumber) ? 'Surity Contact no. is required' : "";
      //   break;
      // case "deposit":
      //   if (this.createMaster.prodtype == 1) {
      //     this.errorMessages.deposit = [undefined, null, ''].includes(this.createMaster.deposit) ? 'Deposit is required' : "";
      //   }
      //   break;
    }
  }
  public approvalsStatusList = [

    {
      "label": "Approved",
      "value": "A"
    },
    {
      "label": "Cancel",
      "value": "C"
    }
  ];
  public loanStatusRemarks = "Disbursement remarks";
  onloanStatusRemarks() {
    // this.loanStatusRemarks = _.filter(this.approvalsStatusList, { value: this.createMaster.approvalstatus })[0]['label']
  }

  public borrowersList: any = [
    {
      name: "Select borrower",
      value: null
    }
  ]

  onProducttype() {
    if (this.createMaster.prodtype != 1) this.createMaster.deposit = "";
  }
  async ngOnInit() {
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
    this._service.postApi('getBranch', 'postEndPoint', { filter: 'Drop', create_by: this._service.getUserInfo('_id') })
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
              this.branches.push(products);
            });
            this.generateCode(this.createMaster)
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });



    this._service.postApi('getOnlyCreatedBorrowers', 'postEndPoint', { create_by: this._service.getUserInfo('_id') })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            this.borrwoersList = [{
              label: "Select Branches",
              value: null
            }];
            if (data['DATA'].length > 0) {
              this.borrwoersList = data['DATA']
            }
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

  public headerText = "";
  gridData() {
    try {
      this._service.postApi('smlgetusers', 'postEndPoint', {
        code: 'HRPM',
        ctrl: 'nofilter'
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.usersList = _.filter(data['DATA'], (ac, acin) => ac.active == true
              )
            };
          },
          error: (err) => {
            // this.blocUI = false;
            // this.myModels = [];
            // console.log('error')
          }
        });
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
      this._service.postApi('gnloanslist', 'postEndPoint', this.params)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              this.blocUI = false;
              data['DATA'] = _.filter(data['DATA'], { approvalstatus: 'A' });
              if (data['DATA'].length > 0) {
                data['DATA'].forEach((pros: any, prdIn: number) => {
                  let createdBorrowers: any = {
                    OTHERS: pros.OTHERS,
                    accountname: pros.accountname,
                    accountno: pros.accountno,
                    disbursementstatus: pros.disbursementstatus,
                    disbursementstatusremarks: pros.disbursementstatusremarks,
                    paymenttype: pros.paymenttype,
                    approvalby: _.filter(this.usersList || [], { id: pros.approvalby }).length > 0 ? _.filter(this.usersList || [], { id: pros.approvalby })[0]['uname'] : "",
                    approvalremarks: pros.approvalremarks,
                    approvalstatus: pros.approvalstatus,
                    bankname: pros.bankname,
                    borrower: pros.borrower,
                    borrowername: pros.borrowername,
                    branch: pros.branch,
                    // branchName: pros.branchname,
                    branchName: pros.branchname,
                    contactnumber: pros.contactnumber,
                    create_by: pros.create_by,
                    create_dt: pros.create_dt,
                    deposit: pros.deposit,
                    depositName: ![undefined, null, "", "0"].includes(pros.deposit) ? _.filter(this.despositList, { value: parseInt(pros.deposit) })[0]['label'] : 'Not Selected',
                    description: pros.description,
                    housetype: pros.housetype,
                    housetypeName: ![undefined, null, ""].includes(pros.housetype) ? _.filter(this.houseTypeList, { value: parseInt(pros.housetype) })[0]['label'] : "",
                    ifsc: pros.ifsc,
                    loanamount: pros.loanamount,
                    loanAmountName: _.filter(this.loanAmountList || [], { value: parseInt(pros.loanamount) })[0]['label'], // ![undefined, null, ""].includes(pros.loanamount) ? _.filter(this.loanAmountList, { value: parseInt(pros.loanamount) })[0]['label'] : "",
                    loanschedule: pros.loanschedule,
                    loanscheduleName: ![undefined, null, ""].includes(pros.loanschedule) ? _.filter(this.tenureList, { value: parseInt(pros.loanschedule) })[0]['label'] : "",
                    modify_by: pros.modify_by,
                    modify_dt: pros.modify_dt,
                    prodtype: pros.prodtype,
                    prodtypeName: ![undefined, null, ""].includes(pros.prodtype) ? _.filter(this.productTypeList, { value: parseInt(pros.prodtype) })[0]['label'] : "",
                    smtcode: pros.smtcode,
                    surityaadhar: pros.surityaadhar,
                    surityhousetype: pros.surityhousetype,
                    surityhousetypeName: ![undefined, null, ""].includes(pros.surityhousetype) ? _.filter(this.houseTypeList, { value: parseInt(pros.surityhousetype) })[0]['label'] : "",
                    surityname: pros.surityname,
                    tenure: pros.tenure,
                    tenureName: ![undefined, null, ""].includes(pros.tenure) ? _.filter(this.tenureList, { value: parseInt(pros.tenure) })[0]['label'] : "",
                    _id: pros._id,
                    id: prdIn + 1,
                    active: pros.active,
                    status: (pros.active == true ? 'Active' : 'Inactive')

                  }
                  this.crudGrid.push(createdBorrowers)
                });
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
    this.headerText = "";
    this.isShowForm = true;
    this.submitloading = false;
    this.isShowSidebarClose = true;
    this.mode = mode;
    this.errorMessages = JSON.parse(this.defErrs);
    this.createMaster = JSON.parse(this.defaultUser);
    if (['NEW'].includes(mode)) {
      this.generateCode(this.createMaster)
    };

    if (['VIEW', 'EDIT'].includes(mode)) {
      //   this.isClicked = true;
      let filterName: any = _.filter(this.borrwoersList, { _id: event.borrowername });
      // this.headerText = filterName[0]['name'] || '';
      this.createMaster = {
        smtcode: event.smtcode,
        borrowername: event.borrowername,
        housetype: parseInt(event.housetype),
        prodtype: parseInt(event.prodtype),
        loanamount: parseInt(event.loanamount),
        loanschedule: parseInt(event.loanschedule),
        tenure: parseInt(event.tenure),
        branch: event.branch,
        bankname: event.bankname,
        accountno: event.accountno,
        accountname: event.accountname,
        ifsc: event.ifsc,
        surityname: event.surityname,
        surityaadhar: event.surityaadhar,
        surityhousetype: parseInt(event.surityhousetype),
        contactnumber: event.contactnumber,
        deposit: parseInt(event.deposit || "0"),
        approvalstatus: event.approvalstatus,
        approvalremarks: event.approvalremarks,
        approvalby: event.approvalby,
        description: event.description,
        id: event._id,
        active: event.active ? true : false,
      };
    };
  }


  public submitloading = false;

  saveProduct() {

    try {
      let cols: any = [
        "paymenttype",
        "disbursementstatus"
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
        savePayload['flag'] = 'DISBURSEMENT';
        savePayload['create_by'] = this._service.getUserInfo('_id');
        // let filterName: any = _.filter(this.borrwoersList, { _id: this.createMaster.borrowername });
        // savePayload['borrower'] = filterName[0]['name'];
        // console.log(savePayload)
        let loginJson = this._service.postApi('generateloans', 'postEndPoint', savePayload)
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

              } else if ([400, 300].includes(data.S_CODE)) {
                this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
                this.submitloading = false;
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
    try {
      if (this.isOk) {
        this.isShowSidebarClose = true;
        this.gridData();
        this.hideDialog();
      }
    } catch (e) {
    }
  }

  generateCode(createMaster: any) {
    try {
      if (![undefined, null, ''].includes(createMaster['branch'])) {
        let getSlctdCpy = _.filter(this.branches, { value: createMaster['branch'] });
        if (getSlctdCpy.length > 0) {
          createMaster['smtcode'] =
            getSlctdCpy[0]['bcode'] +
            (getSlctdCpy[0]['clientCount'] + 1).toString().padStart(this._service.getCodeLength(), '0');
        };
      }
    } catch (e) {
    }
  }

}
