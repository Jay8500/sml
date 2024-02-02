import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverypostsRoutingModule } from './recoveryposts-routing.module';
import { RecoverypostsComponent } from './recoveryposts.component';
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
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    RecoverypostsComponent
  ],
  imports: [
    CommonModule,
    RecoverypostsRoutingModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    TooltipModule,
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
    ToastModule
  ]
})
export class RecoverypostsModule { }
