import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateborrowersComponent } from './createborrowers.component';

// const routes: Routes = [
//   { path: '', component: CreateborrowersComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: CreateborrowersComponent }])],
  exports: [RouterModule]
})
export class CreateborrowersRoutingModule { }
