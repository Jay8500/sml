import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MclientsComponent } from './mclients.component';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: MclientsComponent
  }
]

@NgModule({
  declarations: [
    MclientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class MclientsModule { }
