import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import _config from 'src/assets/config.json';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  private _configClone: any = {};
  private timer: any;
  private readonly constTimer = this._configClone['timer'];
  constructor() {
    this._configClone = _config;
  }

  getApi(mstrApiParentKey: string, srvcApiChildKey: string, params: any): Observable<any> {
    let createHdrs: any = {
      'Content-Type': 'application/json', // Example content type
    };

    // if (localStorage.key(0) == "userInfo") {
    //   alert('jay')
    //   // Code to execute if the item is present in local storage
    //   // For example:
    //   const itemValue = localStorage.getItem("yourItemName");
    //   createHdrs['Authorization'] = itemValue
    // } else {
    //   // Code to execute if the item is not present in local storage
    //   console.log("Item is not present in local storage.");
    // }
    // { headers: httpHeaders }

    const httpHeaders = new HttpHeaders(createHdrs);
    let apiHostUrl = this._configClone['apiHostUrl'] +
      this._configClone[mstrApiParentKey][srvcApiChildKey];
    return this._httpClient.get<any>(apiHostUrl,)
  }

  postApi(mstrApiParentKey: string, srvcApiChildKey: string, postData: any): Observable<any> {
    let createHdrs: any = {
      'Content-Type': 'application/json', // Example content type
    };
    // if (!localStorage.getItem('userInfo') != null) {
    //   createHdrs['Authorization'] = `Bearer ${ localStorage.getItem('userInfo') } `
    // };
    const httpHeaders = new HttpHeaders(createHdrs);
    let apiHostUrl = this._configClone['apiHostUrl'] +
      this._configClone[mstrApiParentKey][srvcApiChildKey];
    return this._httpClient.post<any>(apiHostUrl, { secure: btoa(JSON.stringify(postData)) }, { headers: httpHeaders });
  }

  startTimer(): void {
    this.timer = setTimeout(() => {
      this._router.navigate(['/sml-signin'])
    }, this.timer)
  }

  clearTimer(): void {
    clearInterval(this.timer);
    this.startTimer();
  }

  encrypt(data: string) {
    // let encrypt = AES.encrypt(data, this._configClone['tokenSecretKey']).toString();
    // return encrypt;
  }

  decrypt(data: string) {
    // let decrypt = CryptoJS.AES.decrypt(data, this._configClone['tokenSecretKey']).toString();
    // return decrypt;
  }

  getUserInfo(keyName: string) {
    let getUserInfo: any = window.localStorage.getItem('userInfo') || '';
    if (getUserInfo) {
      getUserInfo = JSON.parse(getUserInfo)[keyName];
    };
    return getUserInfo;
  }
}
