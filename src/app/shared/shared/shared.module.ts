import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { SkeletonModule } from 'primeng/skeleton';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { CrudgridviewComponent } from 'src/app/layouts/crudgridview/crudgridview.component';
import { BlockuiComponent } from 'src/app/layouts/blockui/blockui.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CrudgridviewComponent,
    BlockuiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    SelectButtonModule,
    AvatarModule,
    AvatarGroupModule,
    TabMenuModule,
    TabViewModule,
    CardModule,
    FileUploadModule,
    DividerModule,
    InputTextareaModule,
    TableModule,
    ConfirmDialogModule,
    TagModule,
    DropdownModule,
    ToolbarModule,
    ToastModule,
    RatingModule,
    DialogModule,
    BlockUIModule,
    ProgressSpinnerModule,
    SkeletonModule,
    BadgeModule,
    ChipModule,
    SidebarModule,
    OverlayPanelModule
  ],
  exports: [
    ButtonModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    SelectButtonModule,
    AvatarModule,
    AvatarGroupModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BlockuiComponent,
    CrudgridviewComponent,
    TabMenuModule,
    TabViewModule,
    CardModule,
    FileUploadModule,
    DividerModule,
    InputTextareaModule,
    TableModule,
    ConfirmDialogModule,
    TagModule,
    DropdownModule,
    ToolbarModule,
    ToastModule,
    RatingModule,
    DialogModule,
    BlockUIModule,
    ProgressSpinnerModule,
    SkeletonModule,
    BadgeModule,
    ChipModule,
    SidebarModule,
    FormsModule,
    OverlayPanelModule
  ]
})
export class SharedModule { }
