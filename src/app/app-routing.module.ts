import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { PnfComponent } from './pnf/pnf.component';
import { HomeComponent } from './home/home.component';
import { SmldashboardComponent } from './components/smldashboard/smldashboard.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "sml-signin",
    pathMatch: 'full'
  },
  {
    path: 'sml-signin',
    component: SignComponent
  },
  {
    path: 'sml-request-on-forgot-passowrd',
    loadChildren: () => import('src/app/fgpwd/fgpwd.module').then(m => m.FgpwdModule)
  },
  {
    path: 'sml',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: "",
        component: DashboardComponent,
        children: [
          {
            path: 'sml-dashboard',
            loadChildren: () => import('src/app/components/smldashboard/smldashboard.module').then(m => m.SmldashboardModule),
          },
          {
            path: 'sml-caders',
            loadChildren: () => import('src/app/components/departments/departments.module').then(m => m.DepartmentsModule),
          },
          {
            path: 'sml-emp-registration',
            loadChildren: () => import('src/app/components/employeeregistration/employeeregistration.module').then(m => m.EmployeeregistrationModule),
          },
          // {
          //   path: 'sml-create-empcode',
          //   loadChildren: () => import('src/app/components/empcode/empcode.module').then(m => m.EmpcodeModule),
          // },
          {
            path: 'sml-create-cader-modules-mapping',
            loadChildren: () => import('src/app/components/cadermodulemapping/cadermodulemapping.module').then(m => m.CadermodulemappingModule),
          },
          {
            path: 'sml-branches',
            loadChildren: () => import('src/app/components/branches/branches.module').then(m => m.BranchesModule),
          },
          {
            path: 'sml-users',
            loadChildren: () => import('src/app/components/users/users.module').then(m => m.UsersModule),
          },
          {
            path: 'sml-clients',
            loadChildren: () => import('src/app/components/clients/clients.module').then(m => m.ClientsModule),
          },
          {
            path: 'sml-create-constant',
            loadChildren: () => import('src/app/components/constant/constant.module').then(m => m.ConstantModule),
          },
          {
            path: 'sml-create-honour-title',
            loadChildren: () => import('src/app/components/hnrtitle/hnrtitle.module').then(m => m.HnrtitleModule),
          },
          {
            path: 'sml-create-module',
            loadChildren: () => import('src/app/components/createmodule/createmodule.module').then(m => m.CreatemoduleModule),
          },
          {
            path: 'sml-create-gender',
            loadChildren: () => import('src/app/components/creategender/creategender.module').then(m => m.CreategenderModule),
          },
          {
            path: 'sml-create-units',
            loadChildren: () => import('src/app/components/createunits/createunits.module').then(m => m.CreateunitsModule),
          },
          {
            path: 'sml-create-company',
            loadChildren: () => import('src/app/components/company/company.module').then(m => m.CompanyModule),
          },
          {
            path: "**",
            redirectTo: "sml-signin",
            pathMatch: 'full'
          }
        ]
      }
    ]
  },

  {
    path: '**',
    component: PnfComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
