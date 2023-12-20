import { LayoutService } from './service/app.layout.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import * as _ from 'lodash';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    providers: [MessageService]
})
export class AppMenuComponent implements OnInit {
    private destroy$: Subject<void> = new Subject<void>();
    public MessageService = inject(MessageService);
    public _service = inject(ServicesService);
    public loading: boolean = false;
    public showSubmit: boolean = true;
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/sml-dashboard'] }
                ]
            },
            {
                label: 'Modules',
                items: [
                    // { label: 'Assign Permissions', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/permissions'] },
                    // { label: 'Create Users', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/users'] },
                    // { label: 'Create Company', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/company'] },
                    // { label: 'Create Branches', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/branches'] },
                    // { label: 'Create Team', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/teams'] },
                    // { label: 'Create Borrower', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/createborrower'] },
                    // { label: 'Generate Loans', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/generateloans'] },
                    // { label: 'Loan Approvals', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/loanapprovals'] },
                    // { label: 'Disbursement', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/loandisbursement'] },
                    // { label: 'Recovery Postings', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/recoverypostings'] },

                ]
            },
            // {
            //     label: 'Testing',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/home/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/home/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/home/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/home/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/home/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/home/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/home/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/home/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/home/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/home/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/home/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/home/uikit/misc'] }
            //     ]
            // }
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];

        this.getPermissions();
    }


    getPermissions() {

        try {
            // this.loading = true;
            let cader = this._service.getUserInfo('userCader');
            this._service.postApi('onlyPages', 'postEndPoint', { code: cader['code'] })
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        data = this._service.enableCryptoForResponse() ? this._service.decrypt(data) : data;
                        if (data['S_CODE'] == 200) {
                            // this.blocUI = false;
                            if (data['DATA'].length > 0) {
                                // console.log(data['DATA'])
                                let filterMod = _.filter(data['DATA'][0]['modules'], (per, pin) => per.isCanDo == 'Y');
                                // console.log(filterMod);
                                if (filterMod.length > 0) {
                                    _.forEach(filterMod, (p, pin) => {
                                        let createPages:any =
                                        {
                                            label: p.name,
                                            icon: 'pi pi-fw pi-id-card',
                                            routerLink: []
                                        };
                                        createPages.routerLink.push(p.path);
                                        this.model[1]['items'].push(createPages);
                                    });
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
}
