import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const route: Routes = [
  {
    path: "",
    component: ClientsComponent
  }
]

@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class ClientsModule { }
