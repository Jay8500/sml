import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisbursementRoutingModule } from './disbursement-routing.module';
// import { DisbursementComponent } from './disbursement/disbursement.component';

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
import { SidebarModule } from 'primeng/sidebar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DisbursementComponent } from './disbursement.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    DisbursementComponent
  ],
  imports: [
    CommonModule,
    DisbursementRoutingModule,
    CommonModule,
    FormsModule,
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
    ProgressBarModule,
    SidebarModule,
    KeyFilterModule,
    CascadeSelectModule,
    FileUploadModule,
    ImageModule,
    InputNumberModule,
    ToastModule,
    DialogModule
  ]
})
export class DisbursementModule { }
