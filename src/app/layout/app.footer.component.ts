import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { ServicesService } from '../services.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    constructor(public layoutService: LayoutService, public appService: ServicesService) { }
}
