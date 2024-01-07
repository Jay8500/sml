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
                    { path: 'sml-dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                ]
            },
            { path: '**', redirectTo: 'sml-signin' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
