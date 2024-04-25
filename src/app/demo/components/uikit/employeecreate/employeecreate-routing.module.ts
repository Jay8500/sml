import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeecreateComponent } from './employeecreate.component';

const routes: Routes = [
  {
    path : "",
    component : EmployeecreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeecreateRoutingModule { }
