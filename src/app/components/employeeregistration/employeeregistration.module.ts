import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeregistrationComponent } from './employeeregistration.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const route: Routes = [
  {
    path: "",
    component: EmployeeregistrationComponent
  }
]


@NgModule({
  declarations: [
    EmployeeregistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class EmployeeregistrationModule { }
