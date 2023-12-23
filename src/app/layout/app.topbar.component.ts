// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/services.service';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [DatePipe]
})
export class AppTopBarComponent implements OnInit {
    @Input() companyName: string = "SML";
    @Input() branchName: string = "";

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    @Output() sideBarClicks = new EventEmitter();
    @Input() sidebarVisible: boolean = false;
    public service = inject(ServicesService);
    public datePipe = inject(DatePipe)
    public userInfo: any = {};
    ngOnInit() {
        try {
            // console.log(window.localStorage.getItem('userInfo'))
            setInterval(() => {
                if ([undefined, null, ''].includes(window.localStorage.getItem('userInfo'))) {
                    window.location.href = this.service.setPreRoutes('REDIRECTLOGIN');// '/sml/sml-signin';
                }
            }, 1000);

            if (![undefined, null, ''].includes(window.localStorage.getItem('userInfo'))) {
                this.companyName = this.service.getUserInfo('companyname') || 'SML'
                this.branchName = this.service.getUserInfo('branchname') || 'NO BRANCH'
                let getCaders = this.service.getUserInfo('userCader');
                this.userInfo = {
                    uname: this.service.getUserInfo('uname'),
                    gender: this.service.getUserInfo('gendername') == 'Male' ? 'Mr.' : 'Mrs.',
                    cader: getCaders['cdname'],
                    caderCode: getCaders['code'],
                    loggedInTime: this.datePipe.transform(new Date(this.service.getUserInfo('loggTime') || ''), 'dd-MMM-yyyy hh:mm a')
                };
            }
        } catch (e) {
        }
    }

    onSignOutClick() {
        window.localStorage.removeItem('userInfo');
        window.location.href = this.service.setPreRoutes('REDIRECTLOGIN');// '/sml/sml-signin';
    }

    onBarClick() {
        this.sideBarClicks.emit(this.sidebarVisible);
    }
}
