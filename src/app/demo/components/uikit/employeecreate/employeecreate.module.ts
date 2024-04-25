import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeecreateRoutingModule } from './employeecreate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EmployeecreateComponent } from './employeecreate.component';


@NgModule({
  declarations: [
    EmployeecreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeecreateRoutingModule,
    SharedModule
  ]
})
export class EmployeecreateModule { }
