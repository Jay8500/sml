import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatemoduleComponent } from './createmodule.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: CreatemoduleComponent
  }
]

@NgModule({
  declarations: [
    CreatemoduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class CreatemoduleModule { }
