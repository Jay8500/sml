import { Component, OnInit, HostListener, inject } from '@angular/core';
import { ServicesService } from './services.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Idle, Keepalive]
})
export class AppComponent implements OnInit {
  title = 'sml';
  private _serv = inject(ServicesService);
  private _router = inject(Router)
  public idleState: any;
  constructor() {

  }
  ngOnInit() {
    if (window.location.href.split('/')[3] == 'sml-signin') {
      window.localStorage.clear();
    }

    // this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // this.idle.setTimeout(5);
  }
}