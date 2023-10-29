import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmldashboardComponent } from './smldashboard.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  {
    path: "",
    component: SmldashboardComponent
  }
]

@NgModule({
  declarations: [
    SmldashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class SmldashboardModule { }
