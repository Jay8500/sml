import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigComponent } from './app.config.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        AppConfigComponent
    ],
    exports: [
        AppConfigComponent
    ]
})
export class AppConfigModule { }
