import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateloanslistRoutingModule } from './generateloanslist-routing.module';
import { GenerateloanslistComponent } from './generateloanslist.component';

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
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    GenerateloanslistComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    GenerateloanslistRoutingModule,
    AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
    TableModule,
    SliderModule,
    ProgressBarModule
  ]
})
export class GenerateloanslistModule { }
