import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlComponent } from './gl.component';


import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: GlComponent
  }
]


@NgModule({
  declarations: [
    GlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class GlModule { }
