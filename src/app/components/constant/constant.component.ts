import { Component } from '@angular/core';

@Component({
  selector: 'app-constant',
  templateUrl: './constant.component.html',
  styleUrls: ['./constant.component.css']
})
export class ConstantComponent {
  public caderCols: any = [
    {
      header: 'Name',
      style: { 'width': '30rem' },
      showSort: true,
      field: 'cdname'
    },
    {
      header: 'Code',
      style: { 'width': '30rem' },
      showSort: true,
      field: 'code'
    },
    {
      header: 'Status',
      style: { 'width': '30rem' },
      showSort: false,
      field: 'cdname',
      "color": [
        {
          "width": '10rem', "color": '#FF0000'
        },
        {
          "width": '10rem', "color": '#00FF00'
        }
      ],
    },
  ];

  public isClicked = false;
  public createMaster: any = {
    master_name: "",
    description: "",
    code: "",
    active: true
  };
  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.isClicked = false;
  }

  saveProduct() {

  }
}
