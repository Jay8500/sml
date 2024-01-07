import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-fgpwd',
  templateUrl: './fgpwd.component.html',
  styleUrls: ['./fgpwd.component.css'],
  providers: [DatePipe, MessageService]
})
export class FgpwdComponent {
  public isValidUser = true;
  public siginJson = {
    flag: 'S',
    id: null,
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

  async ngOnInit() {

    setInterval(() => {
      if (![undefined, null, ''].includes(window.localStorage.getItem('userInfo'))) {
        window.location.href = this._service.setPreRoutes('DASH');// '/sml/home/sml-dashboard';
      };
    }, 1000);
  }

  public errorMessages = {
    uname: "",
    pwd: ""
  };
  public isValidUname = false;
  public isValidPwd = false;
  public isTrigger = false;

  checkForValidUser() {
    try {
      this.MessageService.clear();
      this.siginJson.password = "";
      this.isValidPwd = true;
      this.isValidUname = ['', undefined, null, 0].includes(this.siginJson.uname.trim()) ? true : false;
      this.errorMessages.uname = this.isValidUname ? 'Employee ID is required' : "";

      if (this.isValidUname) {
        this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `Please Check Below Errors` });
        return;
      };

      this.isTrigger = true;
      setTimeout(() => {
        if (![undefined, null, ''].includes(this.siginJson.uname)) this.siginJson.uname = this.siginJson.uname.trim();
        this._service.postApi('forgotpwd', 'postEndPoint', { flag: 'S', uname: this.siginJson.uname }).subscribe(res => {
          res = this._service.enableCryptoForResponse() ? this._service.decrypt(res) : res;
          if (res.S_CODE == 200) {
            this.siginJson.id = res['DATA'][0]['id'];
            this.isTrigger = false;
            this.isValidUser = false;
          } else if (res.S_CODE == 300) {
            this.isTrigger = false;
            this.isValidUser = true;
            this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `${res['S_MSG']}` });
            // this.loading = false;
          }
        });
      }, 2000);

    } catch (e) {

    }
  }

  async signUpClick() {
    try {
      this.MessageService.clear();

      this.isValidPwd = ['', undefined, null, 0].includes(this.siginJson.password.trim()) ? true : false;
      this.errorMessages.pwd = this.isValidPwd ? 'Password is required' : "";

      if (this.isValidUname || this.isValidPwd) {
        this.MessageService.add({ severity: 'error', summary: 'Reset Password Error', detail: `Please Check Below Errors` });
        return;
      };

      this.siginJson['flag'] = 'FP';
      this.loading = true;
      setTimeout(() => {
        this._service.postApi('smlusers', 'postEndPoint', this.siginJson).subscribe(res => {
          res = this._service.enableCryptoForResponse() ? this._service.decrypt(res) : res;
          if (res.S_CODE == 200) {
            this.loading = false;
            window.location.href = this._service.setPreRoutes('REDIRECTLOGIN');
          } else if (res.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `${res['S_MSG']}` });
            this.loading = false;
          }
        });
      }, 1000);

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
