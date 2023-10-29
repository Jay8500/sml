import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HnrtitleComponent } from './hnrtitle.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: HnrtitleComponent
  }
]
@NgModule({
  declarations: [
    HnrtitleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class HnrtitleModule { }
