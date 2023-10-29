import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
@Component({
  selector: 'app-creategender',
  templateUrl: './creategender.component.html',
  styleUrls: ['./creategender.component.css'],
  providers: [MessageService]
})
export class CreategenderComponent {
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public onlyGenderProps = {
    gname: null,
    active: null,
    // create_dt: null,
    // modify_by: null,
    // modify_dt: null,
    // __v: null,
    // _id: null
  };
  public genderCols: any = [
    {
      header: 'Name',
      style: 'width:30rem',
      showSort: true,
      field: 'gname'
    },
    {
      header: 'Status',
      style: 'width:30rem',
      showSort: false,
      field: 'active'
    },
    {
      header: 'Created Date',
      style: 'width:30rem',
      showSort: false,
      field: 'create_dt'
    },
    {
      header: 'Modify By',
      style: 'width:30rem',
      showSort: false,
      field: 'modify_by'
    },
    {
      header: 'Modify Date',
      style: 'width:30rem',
      showSort: false,
      field: 'modify_dt'
    },
    {
      header: 'DB CODE',
      style: 'width:30rem',
      showSort: false,
      field: '__v'
    },
    {
      header: 'DB ID',
      style: 'width:30rem',
      showSort: false,
      field: '_id'
    },
  ];

  public isClicked = false;
  public createMaster: any = {
    gname: "",
    active: true
  };
  public defaultMaster = JSON.stringify(this.createMaster);

  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.isClicked = false;
  }


  public loading = false;

  saveProduct() {
    let savePayload = JSON.parse(JSON.stringify(this.createMaster));
    savePayload['flag'] = 'S';
    this.loading = true;
    let loginJson = this._service.postApi('genders', 'postEndPoint', savePayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.createMaster = JSON.parse(this.defaultMaster);
            this.loading = false;
          } else if (data.S_CODE == 300) {
            this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${data['S_MSG']}` });
            this.loading = false;
          }
        },
        error: (err) => {
          console.log('error', err);
          this.loading = false;
        }
      });


  }
}
