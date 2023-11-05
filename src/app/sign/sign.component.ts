import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  providers: [DatePipe, MessageService]
})
export class SignComponent implements OnInit, OnDestroy {
  public siginJson = {
    flag: 'S',
    uname: "", //DEVADMIN
    password: ""
  };
  public comptSettings: any = {
    "cmpnyName": "Spoorthy Mactcs ltd."
  };
  private destroy$: Subject<void> = new Subject<void>();
  public loading = false;
  public password = "";
  public MessageService = inject(MessageService);
  private router = inject(Router);
  private _service = inject(ServicesService);
  // private _dateFormatPipe = inject(DatePipe);
  stateOptions: any[] = [{ label: 'Sign In', value: 'in' }, { label: 'Sign Up', value: 'up' }];
  checked: boolean = true;
  value: string = 'in';
  public test: any;
  public getCaders: any;

  constructor(public _dateFormatPipe: DatePipe) {

  }

  async ngOnInit() {



  }

  public errorMessages = {
    uname: "",
    pwd: ""
  };
  public isValidUname = false;
  public isValidPwd = false;
  signUpClick() {
    this.MessageService.clear();

    this.isValidUname = ['', undefined, null, 0].includes(this.siginJson.uname.trim()) ? true : false;
    this.errorMessages.uname = this.isValidUname ? 'Employee ID is required' : "";

    this.isValidPwd = ['', undefined, null, 0].includes(this.siginJson.password.trim()) ? true : false;
    this.errorMessages.pwd = this.isValidPwd ? 'Password is required' : "";

    if (this.isValidUname || this.isValidPwd) {
      this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `Please Check Below Errors` });
      return;
    }

    try {
      this.loading = true;
      let loginJson = this._service.postApi('usersignin', 'postEndPoint', this.siginJson)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if (data.S_CODE == 200) {
              localStorage.setItem('userInfo', JSON.stringify(data.DATA[0]['userInfo']));
              this.router.navigateByUrl('/sml');
            } else if (data.S_CODE == 300) {
              this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `${data['S_MSG']}` });
              this.loading = false;
            }
          },
          error: (err) => {
            // console.log('error', err);
            this.loading = false;
          }
        });
    } catch (e) {
      this.loading = false;
      this.MessageService.add({ severity: 'error', summary: 'Sign In Error', detail: `Unable To Process Request` });
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
