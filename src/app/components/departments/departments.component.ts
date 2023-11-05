import { Component, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  public caderCols: any = [
    {
      header: 'Name',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'cdname'
    },
    {
      header: 'Code',
      style: { 'width': '10rem' },
      showSort: true,
      field: 'code'
    },
    {
      header: 'Status',
      style: { 'width': '10rem' },
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
  ]

  ngOnInit(): void {
  }

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
