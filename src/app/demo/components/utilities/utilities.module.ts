import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons/icons.component';
import { UtilitiesRoutingModule } from './utilities-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UtilitiesRoutingModule,
        InputMaskModule,
        InputTextModule,
        KeyFilterModule
    ],
    declarations: [IconsComponent]
})
export class UtilitiesModule { }
