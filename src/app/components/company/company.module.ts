import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const route: Routes = [
  {
    path: "",
    component: CompanyComponent
  }
]


@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class CompanyModule { }
