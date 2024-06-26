// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Sidebar } from 'primeng/sidebar';

import * as _ from 'lodash';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [DatePipe]
})
export class AppTopBarComponent implements OnInit {
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;
    @Input() companyName: string = "SML";
    @Input() branchName: string = "";
    private router = inject(Router);
    items!: MenuItem[];
    model: any[] = [];

    public visibles = false;
    public Visible = false;
    public service = inject(ServicesService);
    public datePipe = inject(DatePipe)
    public userInfo: any = {};
    constructor() { }

    ngOnInit() {
        try {
            // console.log(window.localStorage.getItem('userInfo'))
            // setInterval(() => {
            //     if ([undefined, null, ''].includes(window.localStorage.getItem('userInfo'))) {
            //         this.router.navigate(['/sml-signin']);
            //     }
            // }, 1000);

            if (![undefined, null, ''].includes(window.localStorage.getItem('userInfo'))) {
                this.companyName = this.service.getUserInfo('companyname') || 'Spoorthi MACS Ltd.'
                this.branchName = this.service.getUserInfo('branchname') || 'Head Office'
                let getCaders = this.service.getUserInfo('userCader');
                this.userInfo = {
                    uname: this.service.getUserInfo('uname'),
                    gender: this.service.getUserInfo('gendername') == 'Male' ? 'Mr.' : 'Mrs.',
                    cader: getCaders['cdname'],
                    caderCode: getCaders['code'],
                    loggedInTime: this.datePipe.transform(new Date(this.service.getUserInfo('loggTime') || ''), 'dd-MMM-yyyy hh:mm a'),
                    profilePicture: this.service.getUserInfo('A')
                };
            }
            // this.model = [

            // {
            //     label: 'Modules',
            //     items: [
            //         // { label: 'Assign Permissions', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/permissions'] },
            //         // { label: 'Create Users', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/users'] },
            //         // { label: 'Create Company', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/company'] },
            //         // { label: 'Create Branches', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/branches'] },
            //         // { label: 'Create Team', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/teams'] },
            //         // { label: 'Create Borrower', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/createborrower'] },
            //         // { label: 'Generate Loans', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/generateloans'] },
            //         // { label: 'Loan Approvals', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/loanapprovals'] },
            //         // { label: 'Disbursement', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/loandisbursement'] },
            //         // { label: 'Recovery Postings', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/recoverypostings'] },

            //     ]
            // },

            // ];
            this.getPermissions();
        } catch (e) {
        }
    }
    public _service = inject(ServicesService);
    private destroy$: Subject<void> = new Subject<void>();


    getPermissions() {

        try {
            this.model = [];
            // this.loading = true;
            let cader = this._service.getUserInfo('userCader');
            this._service.postApi('getnewPagePermissionsList', 'postEndPoint', { code: cader['code'] })
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                        if (data['S_CODE'] == 200) {
                            // this.blocUI = false;
                            if (data['DATA'].length > 0) {
                                // let dashboardData = {
                                //     label: 'Home',
                                //     items: [
                                //         {
                                //             label: 'Dashboard',
                                //             icon: 'pi pi-fw pi-home',
                                //             routerLink: ['/home/sml-dashboard'],
                                //             pat: '/home/sml-dashboard'
                                //         },
                                //         {
                                //             label: 'Employee Create',
                                //             icon: 'pi pi-fw pi-home',
                                //             routerLink: ['/home/smlemployee'],
                                //             pat: '/home/smlemployee'
                                //         }
                                //     ]
                                // };
                                let moduleList: any = {
                                    label: 'Modules',
                                    items: [
                                    ]
                                };

                                let filterMod = _.filter(data['DATA'][0]['modules'], (per, pin) => per.isCanDo == 'Y');
                                // console.log(filterMod);
                                if (filterMod.length > 0) {
                                    _.forEach(filterMod, (p, pin) => {
                                        let createPages: any =
                                        {
                                            // label: "Modules",
                                            // items: []
                                            pat: p.path,
                                            label: p.name,
                                            icon: 'pi pi-fw pi-id-card',
                                            routerLink: []
                                        };
                                        createPages.routerLink.push(p.path);
                                        moduleList.items.push(createPages)
                                        // this.model.push(dashboardData, { label: 'Modules', items: [createPages] })
                                        // this.model[1]['items'].push(createPages);
                                    });
                                    this.model.push(moduleList)
                                };

                                // isCanDo
                                // :
                                // "Y"
                                // name
                                // :
                                // "Create Users"
                                // path
                                // :
                                // "/home/uikit/users"

                                // this.permissionJSON = data['DATA'];
                            };
                            // this.loading = false;
                        } else if (data['S_CODE'] == 300) {
                            // this.blocUI = false;
                            // this.loading = false;
                        }
                    },
                    error: () => {
                        // this.blocUI = false;
                        // this.myModels = [];
                        // console.log('error')
                    }
                });
        } catch (e) {
            // this.blocUI = false;
        }
    }

    onSignOutClick() {
        window.localStorage.removeItem('userInfo');
        this.router.navigate(['/home/sml-signin']);
        // window.location.href = '/sml/sml-signin'  //this.service.setPreRoutes('REDIRECTLOGIN');// '/sml/sml-signin';
    }


    onClick(tabs: any) {
        this.Visible = false;
        // setTimeout(() => {
        this.router.navigateByUrl(tabs.pat);
        // }, 1200)

    }

    onSideBarClick() {
        this.Visible = !this.Visible;
    }

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }
}
