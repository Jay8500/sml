import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateborrowersComponent } from '../createborrowers/createborrowers.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: CreateborrowersComponent }])],
  exports: [RouterModule]
})
export class CreateborrowerslistRoutingModule { }
