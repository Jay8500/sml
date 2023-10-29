import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-createmodule',
  templateUrl: './createmodule.component.html',
  styleUrls: ['./createmodule.component.css'],
  providers: [MessageService]
})
export class CreatemoduleComponent {
  private _service = inject(ServicesService);
  private destroy$: Subject<void> = new Subject<void>();
  public MessageService = inject(MessageService);
  public onlyGenderProps = {
    active
      :
      null,
    code
      :
      null,
    create_by
      :
      null,
    create_dt
      :
      null,
    icon
      :
      null,
    modify_by
      :
      null,
    modify_dt
      :
      null,
    routerLink
      :
      null,
    submdname
      :
      null,
    _id
      :
      null
  };
  public caderCols: any = [
    {
      header: 'Name',
      style: 'width:6rem',
      showSort: true,
      field: 'submdname'
    },
    {
      header: 'Code',
      style: 'width:2rem',
      showSort: true,
      field: 'code'
    },
    {
      header: 'Link',
      style: 'width:2rem',
      showSort: true,
      field: 'routerLink'
    },
    {
      header: 'Status',
      style: 'width:2rem',
      showSort: false,
      field: 'active'
    }
  ];
  public isClicked = false;
  public createMaster: any = {

    "submdname": "",
    "icon": "",
    "routerLink": "",
    "active": true
  };
  public defaultMaster = JSON.stringify(this.createMaster);

  isEnabled(event: any) {
    this.isClicked = event
  }

  hideDialog() {
    this.MessageService.clear();
    this.isClicked = false;
  }

  public loading = false;

  saveProduct() {
    let savePayload = JSON.parse(JSON.stringify(this.createMaster));
    savePayload['flag'] = 'S';
    this.loading = true;
    let loginJson = this._service.postApi('createMaster', 'postEndPoint', savePayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.S_CODE == 200) {
            this.MessageService.add({ severity: 'success', summary: 'Success', detail: `${data['S_MSG']}` });
            this.loading = false;
            this.createMaster = JSON.parse(this.defaultMaster);
          } else if (data.S_CODE == 400) {
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
