import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisbursementComponent } from './disbursement.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DisbursementComponent }])],
  exports: [RouterModule]
})
export class DisbursementRoutingModule { }
