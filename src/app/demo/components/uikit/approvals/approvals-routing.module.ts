import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsComponent } from './approvals.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: ApprovalsComponent }])],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
