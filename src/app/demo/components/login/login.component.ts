import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ServicesService } from 'src/app/services.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe, MessageService],
})
export class LoginComponent {
  public siginJson = {
    flag: 'S',
    uname: "", //DEVADMIN
    password: ""
  };
  public comptSettings: any = {
    "cmpnyName": "Spoorthy Mactcs ltd."
  };
  private destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  public password = "";
  public MessageService = inject(MessageService);
  private router = inject(Router);
  private _service = inject(ServicesService);

  stateOptions: any[] = [{ label: 'Sign In', value: 'in' }, { label: 'Sign Up', value: 'up' }];
  checked: boolean = true;
  value: string = 'in';
  public test: any;
  public getCaders: any;

  constructor(public _dateFormatPipe: DatePipe) {

  }

  getErrorMessages(ctrl: string) {
    switch (ctrl) {
      case "uname":
        this.errorMessages.uname = [undefined, null, ''].includes(this.siginJson.uname) ? 'Employee name is required' : "";
        break;
      case "password":
        this.errorMessages.pwd = [undefined, null, ''].includes(this.siginJson.password) ? 'Password is required' : "";
        break;
    }
  }

  async ngOnInit() {

    setInterval(() => {
      if (![undefined, null, ''].includes(window.localStorage.getItem('userInfo'))) {
        // window.location.href = this._service.setPreRoutes('DASH');// '/sml/home/sml-dashboard';
        window.location.href = '/home/sml-dashboard';// '/sml/home/sml-dashboard';
      };
    }, 1000);
  }

  public errorMessages = {
    uname: "",
    pwd: ""
  };
  public isValidUname = false;
  public isValidPwd = false;
  async signUpClick() {
    try {
      this.MessageService.clear();
      this.isValidUname = ['', undefined, null, 0].includes(this.siginJson.uname.trim()) ? true : false;
      this.errorMessages.uname = this.isValidUname ? 'Employee name is required' : "";

      this.isValidPwd = ['', undefined, null, 0].includes(this.siginJson.password.trim()) ? true : false;
      this.errorMessages.pwd = this.isValidPwd ? 'Password is required' : "";

      if (this.isValidUname || this.isValidPwd) {
        this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `Please Check Below Errors` });
        return;
      };

      this.loading = true;
      setTimeout(() => {
        this._service.postApi('usersignin', 'postEndPoint', this.siginJson).subscribe(res => {
          res = this._service.enableCryptoForResponse() ? this._service.decrypt(res) : res;
          if (res.S_CODE == 200) {
            // localStorage.setItem('userInfo', JSON.stringify(res.DATA[0]['userInfo']));
            localStorage.setItem('userInfo', this._service.encrypt(JSON.stringify(res.DATA[0]['userInfo'])));
            window.location.href = '/home/sml-dashboard'//this._service.setPreRoutes('DASH'); //'/sml/home/sml-dashboard'

          } else if (res.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `${res['S_MSG']}` });
            this.loading = false;
          }
        });
      }, 2000);

    } catch (e) {
      this.loading = false;
      this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `Unable To Process Request` });
    };

  }

  onKeyUp(event: KeyboardEvent) {
    try {
      if (event['key'] == 'Enter' && event.target instanceof HTMLInputElement)
        if (event['target']['type'] == 'password' && ![undefined, null, ''].includes(this.siginJson.password))
          this.signUpClick();
    } catch (e) {

    }

  }
}
