import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FgpwdComponent } from './fgpwd.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';

const route: Routes = [
  {
    path: "",
    component: FgpwdComponent
  }
]

@NgModule({
  declarations: [
    FgpwdComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class FgpwdModule { }
