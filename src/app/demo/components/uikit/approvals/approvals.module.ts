import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

// import { BranchComponent } from './branch.component';

@NgModule({
  declarations: [
    ApprovalsComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    FormsModule,
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class ApprovalsModule { }
