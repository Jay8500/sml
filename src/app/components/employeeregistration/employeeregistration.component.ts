import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-employeeregistration',
  templateUrl: './employeeregistration.component.html',
  styleUrls: ['./employeeregistration.component.css']
})
export class EmployeeregistrationComponent implements OnInit {

  public maxFileSize = 1000000

  ngOnInit() {
    
  }

  onUpload(event:any) {
    // console.log("test",event)
  }
}
