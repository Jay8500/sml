import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
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
    branch_id: null,
    cader_id: null,
    active: true
  };
  public branches = [
    {
      label: "Select Branches",
      value: null
    }
  ];
  public caders = [
    {
      label: "Select Caders",
      value: null
    }
  ];

  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.isClicked = false;
  }

  saveProduct() {

  }
}
