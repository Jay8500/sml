import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  @Output() sideBarClicks = new EventEmitter();
  @Input() companyName: string = "SML";
  @Input() sidebarVisible: boolean = false;
  public service = inject(ServicesService);
  public datePipe = inject(DatePipe)
  public userInfo: any = {};
  ngOnInit() {
    let getCaders = this.service.getUserInfo('userCader');
    this.userInfo = {
      uname: this.service.getUserInfo('uname'),
      cader: getCaders['cdname'],
      caderCode: getCaders['code'],
      loggedInTime: this.datePipe.transform(new Date(this.service.getUserInfo('loggTime') || ''), 'dd-MMM-yyyy hh:mm a')
    }
  }

  onSignOutClick() {
    window.localStorage.removeItem('userInfo');
  }

  onBarClick() {
    this.sideBarClicks.emit(this.sidebarVisible);
  }
}
