import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateborrowerslistRoutingModule } from './createborrowerslist-routing.module';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from '@angular/forms';
import { CreateborrowerslistComponent } from './createborrowerslist.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
	declarations: [
		CreateborrowerslistComponent
	],
	imports: [
		CommonModule,
		CreateborrowerslistRoutingModule,
		FormsModule,
		SharedModule
	]
})
export class CreateborrowerslistModule { }
