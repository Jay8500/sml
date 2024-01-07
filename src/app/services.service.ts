import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import _config from 'src/assets/config.json';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';
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
    // this._configClone['apiHostUrl'] = this._configClone['isBuild'] == 'Y' ? "https://smlservices.onrender.com/" : `http://localhost:${this._configClone['nodePortNumber']}/`;
  }

  getApi(mstrApiParentKey: string, srvcApiChildKey: string, params: any): Observable<any> {
    let createHdrs: any = {
      'Content-Type': 'application/json', // Example content type
      'isCrypto': this._configClone['isCrypto']
    };
    const httpHeaders = new HttpHeaders(createHdrs);
    let apiHostUrl = this._configClone['apiHostUrl'] +
      this._configClone[mstrApiParentKey][srvcApiChildKey];
    return this._httpClient.get<any>(apiHostUrl)
  }

  postApi(mstrApiParentKey: string, srvcApiChildKey: string, postData: any): Observable<any> {
    let createHdrs: any = {
      'Content-Type': 'application/json', // Example content type
      'isCrypto': this._configClone['isCrypto']
    };
    // if (!localStorage.getItem('userInfo') != null) {
    //   createHdrs['Authorization'] = `Bearer ${ localStorage.getItem('userInfo') } `
    // };
    const httpHeaders = new HttpHeaders(createHdrs);
    let apiHostUrl = this._configClone['apiHostUrl'] +
      this._configClone[mstrApiParentKey][srvcApiChildKey];
    return this._httpClient.post<any>(apiHostUrl, {
      secure: this._configClone['isCrypto'] == 'Y' ?
        this.encrypt(JSON.stringify(postData)) : postData
    }, { headers: httpHeaders });
  }

  startTimer(): void {
    this.timer = setTimeout(() => {
      this._router.navigate(['/sml-signin'])
    }, this.timer)
  }

  clearTimer(): void {
    try {
      clearInterval(this.timer);
      this.startTimer();
    } catch (e) { }
  }

  encrypt(data: string) {
    let encrypt: any;
    try {
      encrypt = CryptoJS.AES.encrypt(data, this._configClone['tokenSecretKey']).toString();
    } catch (e) {
    }
    return encrypt;
  }

  decrypt(data: string) {
    let decryptedData = "";
    try {
      let decrypt = CryptoJS.AES.decrypt(data, this._configClone['tokenSecretKey']);
      decryptedData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    } catch (e) { }
    return decryptedData;
  }

  getUserInfo(keyName: string) {
    let getUserInfo: any;
    try {
      getUserInfo = window.localStorage.getItem('userInfo');
      if (![undefined, null].includes(getUserInfo)) {
        let decryptData: any = this.decrypt(getUserInfo);
        // console.log("getUserInfo", decryptData);
        getUserInfo = decryptData[keyName];
       
      };
    } catch (e) {
    }
    return getUserInfo;
  }

  setPreRoutes(ctlPath: string) {
    let appendPath: string = "";;
    let appednded;
    switch (ctlPath) {
      case "DASH": // new change of routes
        appendPath = (this._configClone['isBuild'] == 'N' ? '/home/sml-dashboard' : '/sml/home/sml-dashboard');
        break;
      case "REDIRECTLOGIN":
        appendPath = (this._configClone['isBuild'] == 'N' ? '/sml-signin' : '/sml/sml-signin');
        break;

    }
    return appendPath;
  }

  enableCryptoForResponse() {
    return this._configClone['isCrypto'] == "Y"
  }

  fileMaxSize() {
    return this._configClone['fileUploadSize'];
  }

  getCodeLength() {
    return this._configClone['autoCode'] || 0;
  }

}
