import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TabPanel, TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, MenuModule, MegaMenuModule, ChipModule, TooltipModule, RippleModule, DialogModule, BadgeModule, SidebarModule, RadioButtonModule,
    InputSwitchModule, ConfirmDialogModule, ButtonModule, ToastModule, PasswordModule, OverlayPanelModule, AvatarModule, AvatarGroupModule, InputTextModule,
    CascadeSelectModule, ChartModule, TableModule, StyleClassModule, PanelMenuModule, SkeletonModule, DividerModule, PanelModule, AutoCompleteModule,
    CalendarModule, DropdownModule, ChipsModule, InputMaskModule, InputNumberModule, MultiSelectModule, InputTextareaModule, KeyFilterModule, ScrollTopModule,
    ImageModule, FileUploadModule, TabViewModule, ProgressSpinnerModule, CardModule, CheckboxModule
  ],
  exports: [
    FormsModule, MenuModule, MegaMenuModule, ChipModule, TooltipModule, RippleModule, DialogModule, BadgeModule, SidebarModule, RadioButtonModule,
    InputSwitchModule, ConfirmDialogModule, ButtonModule, ToastModule, PasswordModule, OverlayPanelModule, AvatarModule, AvatarGroupModule, InputTextModule,
    CascadeSelectModule, ChartModule, TableModule, StyleClassModule, PanelMenuModule, SkeletonModule, DividerModule, PanelModule, AutoCompleteModule,
    CalendarModule, DropdownModule, ChipsModule, InputMaskModule, InputNumberModule, MultiSelectModule, InputTextareaModule, KeyFilterModule, ScrollTopModule,
    ImageModule, FileUploadModule, TabViewModule, ProgressSpinnerModule, CardModule, CheckboxModule
  ]
})
export class SharedModule { }
