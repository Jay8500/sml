import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { ButtonDemoComponent } from './buttondemo.component';
import { GenerateloansComponent } from './generateloans.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GenerateloansComponent }
	])],
	exports: [RouterModule]
})
export class GenerateLoansRoutingModule { }
