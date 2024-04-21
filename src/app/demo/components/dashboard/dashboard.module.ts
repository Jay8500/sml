import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardsRoutingModule,
        SharedModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
