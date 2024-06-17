import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  providers: [MessageService]
})
export class PermissionsComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public roles = [
    { header: 'Admin', field: 'Admin' },
    { header: 'Manager', field: 'Manager' },
    { header: 'User', field: 'User' }
  ];
  public permissions: any = [];
  public products: any = [];
  public clonedProducts: any = {};
  public documentsJSON: any = [];
  public clonedDocuments: any = {};
  public isOk = false;
  public loadings = false;
  public blockUi = false;
  public usersList: any = [
  ];
  public createMaster = {
    uname: "",
    uid: ""
  };
  public MessageService = inject(MessageService);
  public _service = inject(ServicesService);
  public loading: boolean = false;
  public showSubmit: boolean = true;
  public permissionJSON: any = [];
  public userApprovals: any = [];
  public slectedItem: any;
  public caders = [{ label: "Select Cadre", value: null }];

  ngOnInit(): void {
    this.blockUi = true;
    this.permissions = [];
    this.products = [];
    this.documentsJSON = [];
    this._service.postApi('getAllCaders', 'postEndPoint', {})
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
                label: prodcuts.cdname,
                value: prodcuts._id,
                code: prodcuts.code
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



    this.permissions = [
      {
        name: 'Dashboard',
        permissions: {
          Admin: true,
          Manager: true,
          User: false
        }
      },
      {
        name: 'Settings',
        permissions: {
          Admin: true,
          Manager: true,
          User: false
        }
      },
      {
        name: 'Profile',
        permissions: {
          Admin: false,
          Manager: false,
          User: true
        }
      },
      // Add more pages as needed
    ];
    this.products.push(
      {
        _id: 0,
        pid: 0,
        category: "",
        product: "",
        suritystatus: "",
        tenure: null,
        roi: "",
        repayment: "",
        flag: 'S'
      }
    );
    this.documentsJSON.push(
      {
        _id: 0,
        pid: 0,
        documentName: "",
        route: "",
        description: "",
        flag: 'S'
      }
    );

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
            );

            _.forEach(this.usersList, (us, uIn) => {
              let permisions: any = {
                userId: us.id,
                username: us.uname,
                isCanDo: "N",
                name: "Loan Approvals",
                path: "/home/uikit/loanapprovals"
              };
              this.userApprovals.push(permisions)
            });
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });

    this.getAllDocuments();
    this.getPermissions();
    this.getAllProducts();

    // this.blockUi = false;
  }

  public activeDocumentPermissions: any = [];

  async getAllDocuments() {
    this._service.postApi('getAllDocuments', 'postEndPoint', {
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            if (data['DATA'].length > 0) {
              this.documentsJSON = [];
              _.forEach(data['DATA'], (us, uIn) => {
                let getAllDocuments: any = {
                  _id: us._id,
                  pid: parseInt(us.pid),
                  documentName: us.documentName,
                  route: us.route,
                  description: us.description,
                  flag: 'E',
                  active: us.active,
                  isCanDo: false
                };
                this.documentsJSON.push(getAllDocuments)
              });
              console.log(" this.documentsJSON", this.documentsJSON)
              this.activeDocumentPermissions = _.filter(this.documentsJSON, (fm, fl) => fm.active == true);
            };
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });
  }

  async getAllProducts() {

    this._service.postApi('getproducsts', 'postEndPoint', {
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data['S_CODE'] == 200) {
            if (data['DATA'].length > 0) {
              this.products = [];
              _.forEach(data['DATA'], (us, uIn) => {
                let permisions: any = {
                  _id: us._id,
                  pid: parseInt(us.pid),
                  category: us.category,
                  product: us.product,
                  suritystatus: us.suritystatus,
                  tenure: us.tenure,
                  roi: us.roi,
                  repayment: us.repayment,
                  flag: 'E'
                };
                this.products.push(permisions)
              });
            };
          };
        },
        error: (err) => {
          // this.blocUI = false;
          // this.myModels = [];
          // console.log('error')
        }
      });
  }

  getPermissions() {
    // this.permissionJSON = [
    //   {
    //     "cader": "Dev Admin",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Admin",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Super Admins",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Branch Manager",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Senior Sales Manager",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Sales Manager",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Team Lead",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Executive",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "Trainee Executive",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   },
    //   {
    //     "cader": "HRPM",
    //     "modules": [
    //       {
    //         "name": "Assign Permissions",
    //         "isCanDo": "N",
    //         "path": "/home/uikit/permissions"
    //       },
    //       {
    //         "name": "Create Users",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/users"
    //       },
    //       {
    //         "name": "Create Company",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/company"
    //       },
    //       {
    //         "name": "Create Branches",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/branches"
    //       },
    //       {
    //         "name": "Create Team",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/teams"
    //       },
    //       {
    //         "name": "Create Borrower",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/createborrower"
    //       },
    //       {
    //         "name": "Generate Loans",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/generateloans"
    //       },
    //       {
    //         "name": "Loan Approvals",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loanapprovals"
    //       },
    //       {
    //         "name": "Disbursement",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/loandisbursement"
    //       },
    //       {
    //         "name": "Recovery Postings",
    //         "isCanDo": "Y",
    //         "path": "/home/uikit/recoverypostings"
    //       }
    //     ]
    //   }
    // ];
    try {
      // this.loading = true;
      let cader = this._service.getUserInfo('userCader');

      // if (cader['code'] == 'DA') {
      //   this.params['code'] = 'DEV';
      // };

      // if (cader['code'] == 'SA') {
      //   this.params['code'] = 'SA';
      // };

      // if (cader['code'] == 'HRPM') {
      //   this.params['code'] = 'HRPM';
      // }
      // this.params['create_by'] = this._service.getUserInfo('_id');
      this.permissionJSON = [];
      this._service.postApi('pagepermissionsList', 'postEndPoint', {})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
            if (data['S_CODE'] == 200) {
              // this.blocUI = false;
              if (data['DATA'].length > 0) {
                this.permissionJSON = data['DATA'];
              };
              // this.loading = false;
            } else if (data['S_CODE'] == 300) {
              // this.blocUI = false;
              // this.loading = false;
            }
          },
          error: (err) => {
            // this.blocUI = false;
            // this.myModels = [];
            // console.log('error')
          }
        });
    } catch (e) {
      // this.blocUI = false;
    }
  }

  saveProduct() {
    // this.loading = true;
    let permissionSave: any = [];
    let savePayload = JSON.parse(JSON.stringify(this.permissionJSON));
    _.forEach(savePayload, (list, listIn) => {
      let createSave = {
        cader: list.cader,
        _id: list._id,
        modules: list.modules.filter((ele: any, eleIn: number) => ele.isSelected),
      };
      permissionSave.push(createSave)
    });

    permissionSave = _.filter(permissionSave, (cl, clIn) => cl.modules.length > 0)
    let loginJson = this._service.postApi('updatepermissions', 'postEndPoint', permissionSave)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data.S_CODE == 200) {
            this.getPermissions();
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.isOk = true;
            this.loading = false;

          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            this.isOk = true;
            // this.loading = false;
            //  this.isShowSidebarClose = false;
            this.loading = false;
          }
        },
        error: (err) => {
          this.loading = false;
          // this.loading = false;
        }
      });
  }

  savePermissionProduct() {
    // this.loading = true;
    let permissionSave: any = [];
    let savePayload = JSON.parse(JSON.stringify(this.userApprovals));

    permissionSave = _.filter(permissionSave, (cl, clIn) => cl.modules.length > 0)
    let loginJson = this._service.postApi('loanApprovalpermission', 'postEndPoint', permissionSave)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data.S_CODE == 200) {
            this.getPermissions();
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.isOk = true;
            this.loadings = false;

          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            this.isOk = true;
            // this.loading = false;
            //  this.isShowSidebarClose = false;
            this.loadings = false;
          }
        },
        error: (err) => {
          this.loadings = false;
          // this.loading = false;
        }
      });
  }

  onMessageClose() {
    try {
      // if (this.isOk) {
      //   this.getPermissions();
      // }
    } catch (e) { }
  }

  onPermissionClick(event: any, user: any) {
    try {
      if (event.value) {
        this.showSubmit = false;
        user['isSelected'] = true;
      }
    } catch (e) {

    }

  }

  onRowEditInit(product: any) {
    // product['flag'] = 'E';
    this.clonedProducts[product.pid as string] = { ...product };
  }

  onRowEditSave(product: any) {
    this.loadings = true;
    let savePayload = JSON.parse(JSON.stringify(product));
    savePayload['flag'] = savePayload['_id'] == 0 ? 'S' : 'E';
    let loginJson = this._service.postApi('producstssave', 'postEndPoint', savePayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            // this.isOk = true;
            this.loadings = false;
            this.getAllProducts();
          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            // this.isOk = true;
            // // this.loading = false;
            // //  this.isShowSidebarClose = false;
            // this.loadings = false;
          }
        },
        error: (err) => {
          this.loadings = false;
          // this.loading = false;
        }
      });
  }

  onRowEditCancel(product: any, ri: number) {
    product['active'] = false;


    if (product['_id'] == 0) {
      product['flag'] = 'S';
      this.products[ri] = this.clonedProducts[product.pid as string];
      delete this.clonedProducts[product.pid as string];
    } else {
      product['flag'] = 'E';
      this.onRowEditSave(product);
    };
  }

  onRowNewCancel(product: any) {
    let newProduct = JSON.parse(JSON.stringify(product));
    newProduct['pid'] = product['pid'] + 1;
    newProduct['category'] = 'New';
    newProduct['product'] = null;
    newProduct['suritystatus'] = null;
    newProduct['tenure'] = null;
    newProduct['roi'] = null;
    newProduct['repayment'] = null;
    newProduct['_id'] = 0;
    newProduct['active'] = true;

    this.products.splice(this.products.length, 0, newProduct);
  }

  onRowEditInitDoc(Documents: any) {
    this.clonedDocuments[Documents.pid as string] = { ...Documents };
  }

  onRowEditSaveDoc(Documents: any) {
    let savePayload = JSON.parse(JSON.stringify(Documents));
    savePayload['flag'] = savePayload['_id'] == 0 ? 'S' : 'E';
    let loginJson = this._service.postApi('documentssave', 'postEndPoint', savePayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            // this.isOk = true;
            // this.loadings = false;
            this.getAllDocuments();
          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            // this.isOk = true;
            // // this.loading = false;
            // //  this.isShowSidebarClose = false;
            // this.loadings = false;
          }
        },
        error: (err) => {
          this.loadings = false;
          // this.loading = false;
        }
      });
  }

  onRowEditCancelDoc(Documents: any, ri: number) {
    Documents['active'] = false;
    if (Documents['_id'] == 0) {
      Documents['flag'] = 'S';
      this.documentsJSON[ri] = this.clonedDocuments[Documents.pid as string];
      delete this.clonedDocuments[Documents.pid as string];
    } else {
      Documents['flag'] = 'E';
      this.onRowEditSave(Documents);
    };
  }

  onRowNewCancelDoc(product: any) {
    let newDocument = JSON.parse(JSON.stringify(product));
    newDocument['pid'] = product['pid'] + 1;
    newDocument['documentName'] = 'New';
    newDocument['route'] = null;
    newDocument['description'] = null;
    newDocument['_id'] = 0;
    newDocument['active'] = true;
    this.documentsJSON.splice(this.documentsJSON.length, 0, newDocument);
  }

  changePages() {
    try {
      this.loading = true;
      if (this.slectedItem == null) {
        this.activeDocumentPermissions = _.filter(this.documentsJSON, (fm, fl) => fm.active == true);
      } else {
        console.log(" this.activeDocumentPermissions", this.activeDocumentPermissions);
        this._service.postApi('getnewPagePermissionsList', 'postEndPoint', { code: this.slectedItem })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data) => {
              data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
              if (data['S_CODE'] == 200) {
                this.loading = false;
                if (data['DATA'].length > 0) {

                  this.activeDocumentPermissions = [];
                  _.forEach(data['DATA'][0]['modules'], (edit, edin) => {
                    let createEditDocuments = {
                      _id: edit._id,
                      documentName: edit.name,
                      route: edit.path,
                      isCanDo: edit.isCanDo == 'Y' ? true : false
                    };
                    this.activeDocumentPermissions.push(createEditDocuments);
                  });
                  
                } else {
                  this.activeDocumentPermissions = _.filter(this.documentsJSON, (fm, fl) => fm.active == true);
                }
              } else if (data['S_CODE'] == 300) {
                this.loading = false;
              }
            },
            error: () => {
              this.loading = false;
            }
          });
      }

    } catch (e) {
      // this.blocUI = false;
    }
  }

  async onChangeSave() {
    this.loading = true;
    // console.log(" getNewPagePermissions", this.activeDocumentPermissions)
    let createNew: any = [];
    let copyactiveDocumentPermissions = JSON.parse(JSON.stringify(this.activeDocumentPermissions));
    _.forEach(copyactiveDocumentPermissions, (prp, prpIn) => {
      let createNewInstance = {
        _id: prp._id, // document id
        name: prp.documentName,
        isCanDo: prp.isCanDo ? 'Y' : 'N',
        path: prp.route
      };
      createNew.push(createNewInstance)
    });

    let newPermissionsSchema: any = {
      code: this.slectedItem,
      modules: createNew
    };
    let loginJson = this._service.postApi('newCreatePagePermissionsList', 'postEndPoint', newPermissionsSchema)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (data) => {
          data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.isOk = true;

            this.slectedItem = null;
            this.changePages();
            await this.getAllDocuments();
            this.loading = false;
          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            this.isOk = true;
            this.loading = false;
          }
        },
        error: (err) => {
          this.loading = false;
        }
      });
    // this.loading = false;
  }
}
