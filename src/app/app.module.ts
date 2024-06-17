import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { LoginComponent } from './demo/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FgpwdComponent } from './demo/components/fgpwd/fgpwd.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SharedModule } from './shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, LoginComponent, FgpwdComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ToastModule,
        AppLayoutModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        OverlayPanelModule,
        AvatarModule,
        AvatarGroupModule,
        SharedModule,
        ProgressBarModule
    ],
    providers: [
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
