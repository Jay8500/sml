import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateloanslistComponent } from './generateloanslist.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: GenerateloanslistComponent }])],
  exports: [RouterModule]
})
export class GenerateloanslistRoutingModule { }
