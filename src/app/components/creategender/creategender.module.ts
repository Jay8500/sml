import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreategenderComponent } from './creategender.component';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: CreategenderComponent
  }
]


@NgModule({
  declarations: [
    CreategenderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class CreategenderModule { }
