import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverypostsComponent } from './recoveryposts.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: RecoverypostsComponent }])],
  exports: [RouterModule]
})
export class RecoverypostsRoutingModule { }
