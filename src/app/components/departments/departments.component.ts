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
      style: 'width:30rem',
      showSort: true,
      field: 'cdname'
    },
    {
      header: 'Code',
      style: 'width:30rem',
      showSort: true,
      field: 'code'
    },
    {
      header: 'Status',
      style: 'width:30rem',
      showSort: false,
      field: 'cdname'
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
