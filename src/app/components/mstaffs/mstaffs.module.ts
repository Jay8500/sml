import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MstaffsComponent } from './mstaffs.component';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: MstaffsComponent
  }
]


@NgModule({
  declarations: [
    MstaffsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class MstaffsModule { }
