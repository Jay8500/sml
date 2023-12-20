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
  public MessageService = inject(MessageService);
  public _service = inject(ServicesService);
  public loading: boolean = false;
  public showSubmit: boolean = true;
  public permissionJSON: any = [];
  ngOnInit(): void {
    this.getPermissions();
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

  public isOk = false;
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
}
