import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgtComponent } from './sgt.component';


import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: SgtComponent
  }
]

@NgModule({
  declarations: [
    SgtComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class SgtModule { }
