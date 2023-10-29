import { Component } from '@angular/core';

@Component({
  selector: 'app-fgpwd',
  templateUrl: './fgpwd.component.html',
  styleUrls: ['./fgpwd.component.css']
})
export class FgpwdComponent {
  public loading: boolean = false;
  public siginJson: any = {
    uname: "",
    password: ""
  }


  resetClick() {

  }
}
