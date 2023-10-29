import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateunitsComponent } from './createunits.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: CreateunitsComponent
  }
]


@NgModule({
  declarations: [
    CreateunitsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class CreateunitsModule { }
