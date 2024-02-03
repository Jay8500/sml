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
                ]
            },
            { path: '**', redirectTo: 'sml-signin' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
