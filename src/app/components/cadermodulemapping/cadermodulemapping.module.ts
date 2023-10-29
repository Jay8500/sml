import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadermodulemappingComponent } from './cadermodulemapping.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: "",
    component: CadermodulemappingComponent
  }
]


@NgModule({
  declarations: [
    CadermodulemappingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class CadermodulemappingModule { }
