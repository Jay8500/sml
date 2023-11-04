import { Component } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
  public caderCols: any = [
    {
      "header": 'Name',
      "style": { "width": '30rem' },
      "showSort": true,
      "field": 'cdname'
    },
    {
      "header": 'Code',
      "style": { "width": '30rem' },
      "showSort": true,
      "field": 'code'
    },
    {
      "header": 'Status',
      "style": { "width": '10rem' },
      "showSort": false,
      "field": 'active',
      "color": [
        {
          "width": '10rem', "color": '#FF0000'
        },
        {
          "width": '10rem', "color": '#00FF00'
        }
      ],
    },
  ]
  public isClicked = false;
  public createMaster: any = {
    master_name: "",
    description: "",
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
