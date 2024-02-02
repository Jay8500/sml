import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/login/login.component';
import { FgpwdComponent } from './demo/components/fgpwd/fgpwd.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'sml-signin',
                pathMatch: 'full'
            },
            {
                path: 'sml-signin',
                component: LoginComponent
            },
            {
                path: 'sml-request-on-forgot-passowrd',
                component: FgpwdComponent
            },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'sml-dashboard',
            //             loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'createborrower',
            //             loadChildren: () => import('../app/demo/components/uikit/createborrowers/createborrowers.module').then(m => m.CreateborrowersModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'users',
            //             loadChildren: () => import('../app/demo/components/uikit/users/users.module').then(m => m.UsersModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'company',
            //             loadChildren: () => import('../app/demo/components/uikit/company/company.module').then(m => m.CompanyModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'branches',
            //             loadChildren: () => import('../app/demo/components/uikit/branch/branch.module').then(m => m.BranchModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'teams',
            //             loadChildren: () => import('../app/demo/components/uikit/team/team.module').then(m => m.TeamModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'permissions',
            //             loadChildren: () => import('../app/demo/components/uikit/permissions/permissions.module').then(m => m.PermissionsModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'generateloans',
            //             loadChildren: () => import('../app/demo/components/uikit/generateloans/generateloans.module').then(m => m.GenerateloansModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'loanapprovals',
            //             loadChildren: () => import('../app/demo/components/uikit/approvals/approvals.module').then(m => m.ApprovalsModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'loandisbursement',
            //             loadChildren: () => import('../app/demo/components/uikit/disbursement/disbursement.module').then(m => m.DisbursementModule)
            //         }
            //     ]
            // },
            // {
            //     path: "home",
            //     component: AppLayoutComponent,
            //     children: [
            //         {
            //             path: 'recoverypostings',
            //             loadChildren: () => import('../app/demo/components/uikit/recoveryposts/recoveryposts.module').then(m => m.RecoverypostsModule)
            //         }
            //     ]
            // },
            {
                path: 'home', component: AppLayoutComponent,
                children: [
                    { path: "", redirectTo: 'home', pathMatch: 'full' },
                    { path: 'sml-dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'users', loadChildren: () => import('../app/demo/components/uikit/users/users.module').then(m => m.UsersModule) },
                    { path: 'company', data: { breadcrumb: 'Company' }, loadChildren: () => import('../app/demo/components/uikit/company/company.module').then(m => m.CompanyModule) },
                    { path: 'branches', data: { breadcrumb: 'Branches' }, loadChildren: () => import('../app/demo/components/uikit/branch/branch.module').then(m => m.BranchModule) },
                    { path: 'teams', data: { breadcrumb: 'Teams' }, loadChildren: () => import('../app/demo/components/uikit/team/team.module').then(m => m.TeamModule) },
                    { path: 'permissions', data: { breadcrumb: 'Permissions' }, loadChildren: () => import('../app/demo/components/uikit/permissions/permissions.module').then(m => m.PermissionsModule) },
                    { path: 'createborrower', loadChildren: () => import('../app/demo/components/uikit/createborrowers/createborrowers.module').then(m => m.CreateborrowersModule) },
                    { path: 'generateloans', data: { breadcrumb: 'Generate Loans' }, loadChildren: () => import('../app/demo/components/uikit/generateloans/generateloans.module').then(m => m.GenerateloansModule) },
                    { path: 'loanapprovals', data: { breadcrumb: 'Loan Approvals' }, loadChildren: () => import('../app/demo/components/uikit/approvals/approvals.module').then(m => m.ApprovalsModule) },
                    { path: 'loandisbursement', loadChildren: () => import('../app/demo/components/uikit/disbursement/disbursement.module').then(m => m.DisbursementModule) },
                    { path: 'recoverypostings', loadChildren: () => import('../app/demo/components/uikit/recoveryposts/recoveryposts.module').then(m => m.RecoverypostsModule) },

                    //  { path: 'generateloanslist', data: { breadcrumb: 'Loans List' }, loadChildren: () => import('./generateloanslist/generateloanslist.module').then(m => m.GenerateloanslistModule) },
                    //  { path: 'createborrowerlist', data: { breadcrumb: 'Borrower List' }, loadChildren: () => import('./createborrowerslist/createborrowerslist.module').then(m => m.CreateborrowerslistModule) },

                    // testing pages
                    // { path: 'button', data: { breadcrumb: 'Button' }, loadChildren: () => import('./button/buttondemo.module').then(m => m.ButtonDemoModule) },
                    // { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
                    // { path: 'file', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule) },
                    // { path: 'floatlabel', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./floatlabel/floatlabeldemo.module').then(m => m.FloatlabelDemoModule) },
                    // { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
                    // { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule) },
                    // { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
                    // { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule) },
                    // { path: 'media', data: { breadcrumb: 'Media' }, loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule) },
                    // { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
                    // { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule) },
                    // { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
                    // { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule) },
                    // { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
                    // { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule) },
                    // { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) }
                ]
            },
            { path: '**', redirectTo: 'sml-signin' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
