import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpcodeComponent } from './empcode.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const route: Routes = [
  {
    path: "",
    component: EmpcodeComponent
  }
]


@NgModule({
  declarations: [
    EmpcodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class EmpcodeModule { }
